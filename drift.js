// drift: procedural ocean, no samples, no loops. A line-for-line port of the C++ DSP in
// github.com/mi6uelange7/drift to an AudioWorklet. Each class mirrors one header there.

class Xorshift32 {
  constructor(seed) { this.s = seed >>> 0; }
  next() { let s = this.s; s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; return (this.s = s >>> 0); }
  f() { return this.next() * (2 / 4294967296) - 1; } // [-1, 1)
  u() { return this.next() / 4294967296; }           // [0, 1)
}

// Paul Kellet pink noise + leaky integrator for a brown (1/f²) spectrum.
class BrownNoise {
  constructor() { this.reset(); }
  reset() { this.b = new Float64Array(7); this.i = 0; }
  tick(w) {
    const b = this.b;
    b[0] = 0.99886 * b[0] + w * 0.0555179; b[1] = 0.99332 * b[1] + w * 0.0750759;
    b[2] = 0.96900 * b[2] + w * 0.1538520; b[3] = 0.86650 * b[3] + w * 0.3104856;
    b[4] = 0.55000 * b[4] + w * 0.5329522; b[5] = -0.7616 * b[5] - w * 0.0168980;
    const pink = (b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[6] + w * 0.5362) * 0.115926;
    b[6] = w * 0.115926;
    this.i = this.i * 0.9997 + pink * 0.0003;
    return this.i * 8;
  }
}

// Direct Form II biquad, lowpass or constant-peak bandpass.
class Biquad {
  constructor() { this.b0 = 1; this.b1 = this.b2 = this.a1 = this.a2 = this.z1 = this.z2 = 0; }
  set(sr, hz, q, bandpass) {
    const w = 2 * Math.PI * hz / sr, c = Math.cos(w), s = Math.sin(w), al = s / (2 * q), a0 = 1 + al;
    if (bandpass) { this.b0 = s * 0.5 / a0; this.b1 = 0; this.b2 = -s * 0.5 / a0; }
    else { this.b0 = (1 - c) * 0.5 / a0; this.b1 = (1 - c) / a0; this.b2 = (1 - c) * 0.5 / a0; }
    this.a1 = -2 * c / a0; this.a2 = (1 - al) / a0;
    return this;
  }
  reset() { this.z1 = this.z2 = 0; }
  tick(x) {
    const w = x - this.a1 * this.z1 - this.a2 * this.z2, y = this.b0 * w + this.b1 * this.z1 + this.b2 * this.z2;
    this.z2 = this.z1; this.z1 = w;
    return y;
  }
}

const IDLE = 0, ATTACK = 1, SUSTAIN = 2, DECAY = 3;

// One wave burst: bandpass-filtered brown noise under a smoothstep-shaped envelope.
class WaveBurst {
  constructor() { this.st = IDLE; this.nL = new BrownNoise(); this.nR = new BrownNoise(); this.fL = new Biquad(); this.fR = new Biquad(); }
  spawn(sr, r) {
    this.amp = 0.40 + r.u() * 0.15;
    const atk = 0.8 + r.u() * 1.2, sus = 1.5 + r.u() * 3.0, dec = 1.2 + r.u() * 2.0;
    this.ar = 1 / (atk * sr); this.dr = 1 / (dec * sr); this.ss = sus * sr;
    const hz = 150 + r.u() * 450, q = 0.6 + r.u() * 0.8;
    this.fL.set(sr, hz, q, true); this.fR.set(sr, hz * (1 + r.u() * 0.03), q, true);
    this.nL.reset(); this.nR.reset(); this.fL.reset(); this.fR.reset();
    this.env = 0; this.st = ATTACK;
  }
  tick(r, o) {
    if (this.st === IDLE) { o[0] = o[1] = 0; return; }
    if (this.st === ATTACK) { this.env += this.ar; if (this.env >= 1) { this.env = 1; this.st = SUSTAIN; } }
    else if (this.st === SUSTAIN) { if (--this.ss <= 0) this.st = DECAY; }
    else { this.env -= this.dr; if (this.env <= 0) { this.env = 0; this.st = IDLE; o[0] = o[1] = 0; return; } }
    const e = this.env, g = e * e * (3 - 2 * e) * this.amp; // smoothstep: no audible knee between stages
    o[0] = this.fL.tick(this.nL.tick(r.f())) * g;
    o[1] = this.fR.tick(this.nR.tick(r.f())) * g;
  }
}

// Up to 8 bursts; a replacement spawns the moment one starts decaying, so waves overlap.
class WavePool {
  constructor(sr) { this.sr = sr; this.pool = Array.from({ length: 8 }, () => new WaveBurst()); this.tc = 0; this.fd = 0; this.intensity = 0.5; this.o = [0, 0]; }
  healthy() { let n = 0; for (const b of this.pool) if (b.st === ATTACK || b.st === SUSTAIN) n++; return n; }
  spawnOne(r) { const b = this.pool.find((b) => b.st === IDLE); if (b) b.spawn(this.sr, r); }
  tick(r, out) {
    out[0] = out[1] = 0; this.tc--; this.fd--;
    if (this.tc <= 0) {
      const base = 10 - this.intensity * 8.5; // 1.5–10 s between timed waves
      this.tc = Math.max((base + r.u() * base * 0.4) * this.sr, this.sr);
      this.spawnOne(r);
      if (this.fd < 0) this.fd = this.sr * (0.1 + r.u() * 0.15);
    } else if (this.healthy() < 3 && this.fd <= 0) {
      this.spawnOne(r);
      this.fd = this.sr * (0.1 + r.u() * 0.15);
    }
    for (const b of this.pool) { b.tick(r, this.o); out[0] += this.o[0]; out[1] += this.o[1]; }
  }
}

// A crash: rumble (60–160 Hz), body (200–900 Hz) and foam (1.5–4 kHz, decays ~3× faster).
class CrashBurst {
  constructor() { this.st = IDLE; this.n = Array.from({ length: 6 }, () => new BrownNoise()); this.f = Array.from({ length: 6 }, () => new Biquad()); }
  spawn(sr, r) {
    this.amp = 0.55 + r.u() * 0.35;
    const atk = 1.8 + r.u() * 2.0, sus = 0.3 + r.u() * 0.8, dec = 4.0 + r.u() * 5.0;
    this.ar = 1 / (atk * sr); this.dr = 1 / (dec * sr); this.fdr = 1 / (dec * 0.3 * sr); this.ss = sus * sr;
    const band = (i, hz, q, spread) => { this.f[i].set(sr, hz, q, true); this.f[i + 1].set(sr, hz * (1 + r.u() * spread), q, true); };
    band(0, 60 + r.u() * 100, 0.35 + r.u() * 0.25, 0.02);   // rumble L/R
    band(2, 200 + r.u() * 700, 0.5 + r.u() * 0.5, 0.025);   // body L/R
    band(4, 1500 + r.u() * 2500, 1.0 + r.u() * 0.8, 0.02);  // foam L/R
    this.n.forEach((x) => x.reset()); this.f.forEach((x) => x.reset());
    this.env = this.fe = 0; this.st = ATTACK;
  }
  tick(r, o) {
    if (this.st === IDLE) { o[0] = o[1] = 0; return; }
    if (this.st === ATTACK) { this.env += this.ar; this.fe = this.env; if (this.env >= 1) { this.env = this.fe = 1; this.st = SUSTAIN; } }
    else if (this.st === SUSTAIN) { if (--this.ss <= 0) this.st = DECAY; }
    else {
      this.env -= this.dr; this.fe = Math.max(this.fe - this.fdr, 0);
      if (this.env <= 0) { this.env = 0; this.st = IDLE; o[0] = o[1] = 0; return; }
    }
    const v = (i) => this.f[i].tick(this.n[i].tick(r.f()));
    const rL = v(0) * 0.5, rR = v(1) * 0.5, bL = v(2), bR = v(3), fL = v(4) * this.fe * 0.35, fR = v(5) * this.fe * 0.35;
    o[0] = ((rL + bL) * this.env + fL) * this.amp;
    o[1] = ((rR + bR) * this.env + fR) * this.amp;
  }
}

class CrashPool {
  constructor(sr) { this.sr = sr; this.pool = [new CrashBurst(), new CrashBurst(), new CrashBurst()]; this.tc = sr * 6; this.enabled = false; this.rate = 0.5; this.o = [0, 0]; }
  tick(r, out) {
    out[0] = out[1] = 0;
    if (!this.enabled) return;
    if (--this.tc <= 0) {
      const base = 45 - this.rate * 37; // one crash every ~8–45 s
      this.tc = Math.max((base + r.u() * base * 0.45) * this.sr, this.sr * 5);
      const c = this.pool.find((c) => c.st === IDLE);
      if (c) c.spawn(this.sr, r);
    }
    for (const c of this.pool) { c.tick(r, this.o); out[0] += this.o[0]; out[1] += this.o[1]; }
  }
}

// 64-sample lookahead limiter: ~4 ms attack, ~42 ms release.
class Limiter {
  constructor() { this.buf = new Float32Array(64); this.p = 0; this.env = 0; this.g = 1; }
  tick(x) {
    this.buf[this.p] = x;
    const pk = Math.abs(x);
    this.env = pk > this.env ? 0.9953 * this.env + 0.0047 * pk : 0.9995 * this.env;
    this.g = 0.997 * this.g + 0.003 * (this.env > 0.93 ? 0.93 / this.env : 1);
    this.p = (this.p + 1) % 64;
    return this.buf[this.p] * this.g;
  }
}

export class OceanDSP {
  constructor(sr) {
    this.r = new Xorshift32(2463534242);
    this.bL = new BrownNoise(); this.bR = new BrownNoise();
    this.lpL = new Biquad().set(sr, 9000, 0.7, false); this.lpR = new Biquad().set(sr, 9000, 0.7, false);
    this.waves = new WavePool(sr); this.crashes = new CrashPool(sr);
    this.limL = new Limiter(); this.limR = new Limiter();
    this.target = { waves: 0.5, width: 0.4, crashes: false, rate: 0.5 };
    this.wi = 0.5; this.sw = 0.4; this.cr = 0.5; this.t = [0, 0];
  }
  render(L, R) {
    const T = this.target, k = 0.04; // one-pole smoothing per 128-frame block (~70 ms)
    this.wi += k * (T.waves - this.wi); this.sw += k * (T.width - this.sw); this.cr += k * (T.rate - this.cr);
    this.waves.intensity = this.wi; this.crashes.enabled = T.crashes; this.crashes.rate = this.cr;
    const r = this.r, t = this.t, width = this.sw * 0.3, waveGain = 0.55 * this.wi;
    for (let i = 0; i < L.length; i++) {
      let mL = this.lpL.tick(this.bL.tick(r.f())) * 0.45, mR = this.lpR.tick(this.bR.tick(r.f())) * 0.45; // ocean body
      this.waves.tick(r, t); mL += t[0] * waveGain; mR += t[1] * waveGain;
      this.crashes.tick(r, t); mL += t[0] * 0.85; mR += t[1] * 0.85;
      const mid = (mL + mR) * 0.5; // mid-side stereo width
      const oL = Math.tanh((mid + (mL - mid) * (1 + width)) * 1.4) / 1.4, oR = Math.tanh((mid + (mR - mid) * (1 + width)) * 1.4) / 1.4;
      L[i] = Math.max(-1, Math.min(1, this.limL.tick(oL)));
      R[i] = Math.max(-1, Math.min(1, this.limR.tick(oR)));
    }
  }
}

if (typeof registerProcessor === 'function') {
  registerProcessor('drift-ocean', class extends AudioWorkletProcessor {
    constructor() { super(); this.dsp = new OceanDSP(sampleRate); this.port.onmessage = (e) => Object.assign(this.dsp.target, e.data); }
    process(_, [out]) { this.dsp.render(out[0], out[1] || out[0]); return true; }
  });
}
