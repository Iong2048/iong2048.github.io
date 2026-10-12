// Boot screen text. `notice` is the PS3-style message shown before the menu.
export const site = {
  name: 'Miguel Angel Rivera',
  tagline: 'miguelangelrivera.com',
  notice: ['Welcome', 'Scroll, swipe or use the arrow keys to browse. Scroll over the top row to switch categories. Press Enter or click to open an item, Esc to go back.'],
};

// Everything on the site lives here.
// Item: title, sub, icon (see ICONS in main.js), and either `rows` (opens a PS3-style
// options list) or `href` (opens a link directly).
// Row: title, value (shown on the right), desc (shown under the selected row), href (Enter opens it).
export const categories = [
  {
    title: 'Profile', icon: 'home', items: [
      { title: 'Miguel Angel Rivera', sub: 'Undergraduate Researcher · CSU Chico', icon: 'user', rows: [
        { title: 'About', desc: 'TODO: a couple of sentences about you.' },
        { title: 'Role', value: 'Undergraduate Researcher' },
        { title: 'Lab', value: 'SSIF Lab, CSU Chico' },
      ] },
      { title: 'Education', sub: 'California State University, Chico', icon: 'school', rows: [
        { title: 'School', value: 'CSU Chico' },
        { title: 'Degree', value: 'TODO' },
        { title: 'Graduation', value: 'TODO' },
      ] },
      { title: 'Contact', sub: 'Get in touch', icon: 'mail', rows: [
        { title: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
        { title: 'GitHub', value: 'mi6uelange7', href: 'https://github.com/mi6uelange7' },
      ] },
      { title: 'Resume', sub: 'PDF', icon: 'doc', href: 'resume.pdf' },
    ],
  },
  {
    title: 'Research', icon: 'flask', items: [
      { title: 'Elephant Listening Project', sub: 'Acoustic anti-poaching sensor network', icon: 'mic', rows: [
        { title: 'Overview', value: 'Dzanga-Sangha, CAR',
          desc: 'ML acoustic sensor network that detects poaching, in collaboration with Cornell\'s Elephant Listening Project.' },
        { title: 'Rumble Detector', value: 'ResNet50 · 98.3%', desc: 'Elephant rumbles, 0–200 Hz, 5-second clips.' },
        { title: 'Gunshot Detector', value: '3-block CNN · 96.1%', desc: 'Gunshots, 0–900 Hz, 4-second clips. Shares one microphone with the rumble model.' },
        { title: 'Deployment', value: 'Jetson Orin Nano', desc: 'Keras → ONNX → TensorRT FP16.' },
        { title: 'Simulation', value: '160 microphones', desc: '99.8% poacher neutralization in simulation.' },
      ] },
      { title: 'SSIF Lab', sub: 'Sensor Systems & Information Fusion', icon: 'star', rows: [
        { title: 'PI', value: 'Dr. Sam Siewert' },
        { title: 'Since', value: 'May 2026' },
        { title: 'Where', value: 'CSU Chico' },
      ] },
    ],
  },
  {
    title: 'Projects', icon: 'folder', items: [
      { title: 'DroneAcousticDetection', sub: 'Detecting drones by sound', icon: 'code', rows: [
        { title: 'About', desc: 'TODO: what it does, your role, results.' },
      ] },
      { title: 'This site', sub: 'A PS3 XMB-style portfolio', icon: 'code', rows: [
        { title: 'Stack', value: 'HTML · CSS · WebGL', desc: 'No framework, no build step.' },
        { title: 'Source', value: 'GitHub', href: 'https://github.com/mi6uelange7/mi6uelange7.github.io' },
      ] },
    ],
  },
  {
    title: 'Writing', icon: 'pen', items: [
      { title: 'First post', sub: 'Coming soon', icon: 'doc', rows: [{ title: 'Coming soon' }] },
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
