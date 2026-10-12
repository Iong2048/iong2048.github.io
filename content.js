// Boot screen text. `notice` is the PS3-style message shown before the menu.
export const site = {
  name: 'Miguel Angel Rivera',
  tagline: 'miguelangelrivera.com',
  notice: ['Welcome', 'Scroll, swipe or use the arrow keys to browse. Scroll over the top row to switch categories. Press Enter or click to open an item, Esc to go back.'],
};

// Everything on the site lives here. `body` is HTML shown in the side panel.
// Item fields: title, sub, icon (see ICONS in main.js), body and/or href.

export const categories = [
  {
    title: 'Profile', icon: 'home', items: [
      { title: 'Miguel Angel Rivera', sub: 'Undergraduate Researcher · CSU Chico', icon: 'user',
        body: `<p>TODO: a couple of sentences about you.</p>` },
      { title: 'Education', sub: 'California State University, Chico', icon: 'school',
        body: `<p>TODO: degree, expected graduation, relevant coursework.</p>` },
      { title: 'Contact', sub: 'Get in touch', icon: 'mail',
        body: `<p><a href="mailto:you@example.com">you@example.com</a></p>
               <p><a href="https://github.com/your-username">GitHub</a></p>` },
      { title: 'Resume', sub: 'PDF', icon: 'doc', href: 'resume.pdf' },
    ],
  },
  {
    title: 'Research', icon: 'flask', items: [
      { title: 'Elephant Listening Project', sub: 'Acoustic anti-poaching sensor network', icon: 'mic',
        body: `<p>ML acoustic sensor network to detect poaching at Dzanga-Sangha National Park,
               Central African Republic, in collaboration with Cornell's Elephant Listening Project.</p>
               <ul>
                 <li>Two CNNs share one microphone: a ResNet50 rumble detector (0–200 Hz, 98.3%)
                     and a gunshot detector (0–900 Hz, 96.1%).</li>
                 <li>Keras → ONNX → TensorRT FP16 on a Jetson Orin Nano.</li>
                 <li>Simulated 160-microphone deployment: 99.8% poacher neutralization.</li>
               </ul>` },
      { title: 'SSIF Lab', sub: 'Sensor Systems & Information Fusion', icon: 'star',
        body: `<p>Research assistant in Dr. Sam Siewert's lab at CSU Chico since May 2026.</p>` },
    ],
  },
  {
    title: 'Projects', icon: 'folder', items: [
      { title: 'DroneAcousticDetection', sub: 'Detecting drones by sound', icon: 'code',
        body: `<p>TODO: what it does, your role, results.</p>` },
      { title: 'This site', sub: 'A PS3 XMB-style portfolio', icon: 'code',
        body: `<p>Plain HTML/CSS/JS with a WebGL wave. No framework, no build step.</p>` },
    ],
  },
  {
    title: 'Writing', icon: 'pen', items: [
      { title: 'First post', sub: 'Coming soon', icon: 'doc', body: `<p>TODO</p>` },
    ],
  },
];

// Background colors [top, bottom]. "Auto" follows the month like a real PS3.
export const themes = {
  Silver: ['#6e7079', '#2e3036'], Gold: ['#7d6829', '#382c0e'], Lime: ['#5f7d27', '#28380e'],
  Pink: ['#8c466b', '#3e1c2f'], Green: ['#316e36', '#123015'], Violet: ['#5f4c8f', '#271c40'],
  Teal: ['#216e6f', '#0c3132'], Blue: ['#3b3b99', '#1c1a50'], Purple: ['#4d2b61', '#200d2a'],
  Amber: ['#835420', '#3a220a'], Brown: ['#6e4c34', '#312116'], Red: ['#822727', '#380d0d'],
};
