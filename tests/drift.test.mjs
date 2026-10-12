// Renders 60 s of ocean offline: output must stay finite and within [-1, 1], be audible, and fire crashes.
// Run: node tests/drift.test.mjs
import assert from 'node:assert';
import { OceanDSP } from '../drift.js';

const sr = 48000, dsp = new OceanDSP(sr);
Object.assign(dsp.target, { waves: 0.6, crashes: true, rate: 1 });
const L = new Float32Array(128), R = new Float32Array(128);
let sum = 0, n = 0, peak = 0, crashed = false;
for (let b = 0; b < (60 * sr) / 128; b++) {
  dsp.render(L, R);
  for (let i = 0; i < 128; i++) {
    assert(Number.isFinite(L[i]) && Number.isFinite(R[i]), `NaN at block ${b}`);
    sum += L[i] * L[i]; n++; peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  crashed ||= dsp.crashes.pool.some((c) => c.st !== 0);
}
const rms = Math.sqrt(sum / n);
assert(peak <= 1, `clipped: ${peak}`);
assert(rms > 0.005, `too quiet: ${rms}`);
assert(crashed, 'no crash fired');
console.log(`ok: rms ${rms.toFixed(3)}, peak ${peak.toFixed(3)}`);
