// Boot screen text. `notice` is the PS3-style message shown before the menu.
export const site = {
  name: 'Miguel Rivera',
  tagline: 'Applied ML that does real good, and making sure it can be trusted.',
  location: 'Chico, CA · open to relocation',
  // the ten-second version, shown first on At a Glance
  highlights: [
    ['Focus', 'ML test & evaluation: checking whether models actually do what they claim.'],
    ['Research', "Verification tooling for Cornell's Elephant Listening Project. Grad-CAM attention alone reaches AUC 0.892 on 6,192 held-out clips, and I caught a silent weight-load failure that had left the network untrained."],
    ['Evaluation', 'LLM output evaluation for Handshake AI; found and guarded against silent tool-call failures where an LLM agent reported actions it never ran.'],
    ['Capstone', 'Acoustic drone detector with leak-safe evaluation. Tested cold on an out-of-domain dataset, traced a recall collapse to calibration across 8 seeds, and fixed it without retraining: 89% mean recall, 5× more stable.'],
    ['Looking for', 'Internship or new-grad roles in ML test & evaluation, verification, or ML tooling in 2027. B.S. CS, Dec 2026.'],
  ],
  links: [['LinkedIn', 'https://linkedin.com/in/mariveracuevas'], ['GitHub', 'https://github.com/mi6uelange7'], ['Email', 'mailto:mariveracuevas@csuchico.edu']],
  notice: ['Welcome', 'Scroll, swipe or use the arrow keys to browse. Scroll over the top row to switch categories. Press Enter or click to open an item, Esc to go back.'],
};

// Everything on the site lives here. Rules: keep status honest so the site never overclaims,
// no phone number (public site, scrapers), and the elephant work is the tooling, not the model.
// Item: title, sub (shown under the selected item), icon (see ICONS in main.js), and either
// `rows` (opens a PS3-style options list) or `href` (opens directly).
// Row: title, value (right column), desc (shown under the selected row), href (Enter opens it).
const stack = (...t) => ({ title: 'Stack', desc: t.join(' · ') });

export const categories = [
  {
    title: 'About', icon: 'home', items: [
      // selected when the site opens: the whole site as one readable page, no exploring needed
      { title: 'At a Glance', sub: 'Everything on one page', icon: 'doc', glance: true },
      { title: 'Who I am', sub: 'CS student · ML test & evaluation', icon: 'user', rows: [
        { title: 'About', desc: 'Computer Science student at Chico State with a minor in cybersecurity. I build tooling that checks whether AI systems can be trusted, train my own audio CNNs, and have kept campus IT running for two years.' },
        { title: 'Focus', value: 'ML test & evaluation', desc: 'Verification tooling for ML models, and making sure they can be trusted.' },
        { title: 'Location', value: 'Chico, CA', desc: 'Open to relocation.' },
      ] },
      { title: 'Education', sub: 'B.S. Computer Science, Minor in Cybersecurity', icon: 'school', rows: [
        { title: 'Degree', value: 'B.S. Computer Science' },
        { title: 'Minor', value: 'Cybersecurity' },
        { title: 'School', value: 'CSU Chico' },
        { title: 'Graduation', value: 'Expected Dec 2026' },
        { title: 'Coursework', desc: 'Embedded Systems · Operating Systems · Software Engineering · Networks · Network Forensics' },
        { title: "Dean's List", value: 'May 2025 · May 2026' },
      ] },
    ],
  },
  {
    title: 'Research', icon: 'flask', items: [
      { title: 'Acoustic ML for Elephant Conservation', sub: 'Research Assistant · May – Aug 2026', icon: 'mic', rows: [
        { title: 'Role', value: 'Research Assistant', desc: 'SSIF Lab, CSU Chico (advisor: Dr. Sam Siewert), with Cornell Elephant Listening Project.' },
        { title: 'Dates', value: 'May 2026 – Aug 2026' },
        { title: 'Status', value: 'Done' },
        { title: 'Question', desc: 'Once the model flags an event, how can a person verify whether to trust it?' },
        { title: 'Overview', desc: 'Human-in-the-loop verification tooling for an ML model detecting elephant rumbles and gunshots, supporting anti-poaching work in Central Africa.' },
        { title: 'Built On', desc: "The team's already-trained detectors, not retrained. The verification layer sits on top of them." },
        { title: 'See · Hear · Feel', desc: 'See: Grad-CAM over the spectrogram, read from the pre-sigmoid logit. Hear: band-pass plus a 4× speed-up (~18 Hz → ~72 Hz) makes the infrasound audible. Feel: phone haptics tracking low-frequency energy, scaled by confidence.' },
        { title: 'Review App', value: 'React Native · Expo', desc: 'Reviewers confirm, reject, or mark uncertain; every decision is logged (JSON / CSV) for retraining.' },
        { title: 'Results', value: 'AUC 0.892', desc: 'Grad-CAM attention alone (its share in the 10–80 Hz rumble band) separates rumble from non-rumble at AUC 0.892, vs. the model\'s own AUC 0.965, on 6,192 held-out clips never seen in training.' },
        { title: 'Model Check', desc: "Trained weights weren't saved with the model's class code, so I reconstructed the architecture and verified each layer, catching a silent load that had left the network at random initialization." },
        stack('Python', 'TensorFlow', 'Grad-CAM', 'React Native', 'Expo', 'Spectrograms', 'Explainable AI'),
      ] },
    ],
  },
  {
    title: 'Projects', icon: 'code', items: [
      { title: 'Acoustic Drone Detection', sub: 'CSCI490 capstone, solo · In progress', icon: 'mic', rows: [
        { title: 'Overview', value: '11,704 clips',
          desc: 'Binary drone classifier built from scratch: spectrograms in, drone-or-not out. The focus is the evaluation methodology, not just the model.' },
        { title: 'Dates', value: 'Fall 2026 – Present' },
        { title: 'Status', value: 'In progress' },
        { title: 'Leak-safe Splitting', value: '4/4 tests passing',
          desc: 'Group-aware train/test split so one recording never lands on both sides, backed by an automated pytest suite and a deliberately broken naive split kept as a control.' },
        { title: 'Data Audit', value: '9.3% silent · 2 mislabeled',
          desc: 'Found silent clips and 2 drone-labeled clips with no drone in them, missed by the original labels.' },
        { title: 'Baseline → CNN', value: '0.951 → 0.989 PR-AUC',
          desc: 'MFCC + logistic regression baseline, then a 3-block CNN on raw spectrograms. Biggest gain on the hardest clips (drone + noise): 60% → 83% correct.' },
        { title: 'Out-of-domain Test', value: '1.000 PR-AUC · 27% recall',
          desc: "Tested cold on an independent dataset with a different mic, room, and drones. The model still ranked drones correctly almost every time, but its confidence scale didn't transfer to the new room." },
        { title: 'Calibration Fix', value: '89% mean recall · 5× more stable',
          desc: 'Swept 8 random seeds (recall varied 7–65% across identical runs) to show the gap was calibration, not the model, then fixed it by recalibrating on a small held-out slice, with no retraining.' },
        stack('Python', 'PyTorch', 'librosa', 'scikit-learn'),
        { title: 'Source', value: 'GitHub', href: 'https://github.com/mi6uelange7/DroneAcousticDetection' },
      ] },
      { title: 'LLM Agent Reliability', sub: 'Honest tool calling · In progress', icon: 'chat', rows: [
        { title: 'Dates', value: 'Mar 2026 – Present' },
        { title: 'Status', value: 'In progress' },
        { title: 'Overview', desc: 'An LLM agent that turns natural-language messages into structured tool calls, and the work of making it honest about what it actually did.' },
        { title: 'The Agent', desc: 'Built an agent that handles logging, escalation, and reminders through tool calls.' },
        { title: 'Silent Failures', desc: 'Found silent tool-call failures where the model reported actions it never executed; added guardrails against false confirmations.' },
        { title: 'Current Work', desc: 'Still debugging tool-call reliability on a low-cost model.' },
        stack('Claude API', 'OpenRouter', 'Telegram Bot API', 'Google Apps Script'),
      ] },
      { title: 'LSTM Time Series Model', sub: 'First end-to-end model · Done', icon: 'chart', rows: [
        { title: 'Dates', value: 'Nov 2025 – Dec 2025' },
        { title: 'Status', value: 'Done' },
        { title: 'Overview', desc: 'First end-to-end model: an LSTM for market time series prediction.' },
        stack('Python', 'TensorFlow', 'Keras', 'LSTM'),
      ] },
      { title: 'drift', sub: 'Procedural ocean engine · C++ DSP', icon: 'wave', rows: [
        { title: 'Overview', desc: 'A macOS menu bar app that synthesizes ocean sound in real time with a custom C++17 DSP engine. No samples, no loops: every wave, crash, and swell is computed from scratch.' },
        { title: 'Hear It', sound: 'Waves', desc: "The same engine, ported to the browser, playing on this site. Turn it on or off any time in Settings → Theme Settings → Sound." },
        { title: 'Signal Chain', desc: 'Brown noise → 9 kHz lowpass → pool of 8 bandpass wave bursts → 3-layer crashes (rumble, body, foam) → mid-side width → tanh saturation → 64-sample lookahead limiter.' },
        { title: 'Real-time Safe', desc: 'Zero heap allocation in the render loop; lock-free atomics for every parameter.' },
        { title: 'Native App', value: 'Swift · AVAudioEngine', desc: 'Popover UI with live parameter readouts, built with a single build.sh: clang++ and swiftc directly, no Xcode project.' },
        stack('C++17', 'Swift', 'AVAudioEngine', 'DSP'),
        { title: 'Source', value: 'GitHub', href: 'https://github.com/mi6uelange7/drift' },
      ] },
      { title: 'LAN Network Audit Monitor', sub: 'Concurrent subnet scanner · Done', icon: 'lan', rows: [
        { title: 'Dates', value: 'Mar 2026' },
        { title: 'Status', value: 'Done' },
        { title: 'Overview', desc: 'Concurrent subnet scanner that finds active devices and flags network changes.' },
        { title: 'Discovery', desc: 'Detects active devices via ICMP and resolves MAC addresses from ARP tables.' },
        { title: 'Change Audit', desc: 'Diffs scans to flag new devices, lost devices, and changes in a timestamped audit log.' },
        stack('Python', 'ICMP', 'ARP', 'Concurrency'),
        { title: 'Source', value: 'GitHub', href: 'https://github.com/mi6uelange7/lan-monitor' },
      ] },
      { title: 'ChapterOS', sub: 'Chapter management platform · In progress', icon: 'group', rows: [
        { title: 'Status', value: 'In progress', desc: 'Early beta testing with my own chapter.' },
        { title: 'Dates', value: '2025 – Present' },
        { title: 'Why', desc: 'Built because my chapter was running finances on GroupMe, Venmo, and spreadsheets while in debt.' },
        { title: 'Features', desc: 'Dues tracking, events, announcements, and recruitment pipeline.' },
        { title: 'In Progress', desc: 'Stripe online dues payments and role-based access via Supabase Auth.' },
        stack('TypeScript', 'Supabase', 'Postgres', 'Tailwind CSS', 'Vercel'),
        { title: 'Website', value: 'chapteros.app', href: 'https://www.chapteros.app' },
      ] },
    ],
  },
  {
    title: 'Experience', icon: 'briefcase', items: [
      { title: 'IT Operations Technician', sub: 'CSU Chico IT Support Services · Current', icon: 'desktop', rows: [
        { title: 'Organization', desc: 'IT Support Services, California State University, Chico.' },
        { title: 'Dates', value: 'Sep 2024 – Present' },
        { title: 'Status', value: 'Current' },
        { title: 'Imaging & Deployment', value: '25+ / week', desc: 'Imaged and deployed 25+ Windows workstations weekly via PXE and Intune, applying faculty, staff, and high-security compliance profiles.' },
        { title: 'Hardware Repair', desc: 'Diagnosed and repaired hardware faults (SSDs, RAM, batteries, cabling) and software conflicts.' },
        { title: 'Loaner Program', desc: 'Identified recurring failure modes in the loaner-device program and added process controls (asset tracking, verification checks) that reduced rework.' },
        { title: 'Surplus Workflow', desc: 'Took over the surplus equipment workflow when the surplus coordinator retired, including secure data wiping.' },
        { title: 'Tier 1–2 Support', value: 'TeamDynamix', desc: 'Tier 1–2 support via TeamDynamix, including SSO incidents with identity owners.' },
      ] },
      { title: 'AI Model Trainer & Evaluator', sub: 'Handshake AI Fellowship · Current', icon: 'doc', rows: [
        { title: 'Organization', value: 'Handshake AI Fellowship' },
        { title: 'Dates', value: 'Nov 2025 – Present' },
        { title: 'Status', value: 'Current' },
        { title: 'LLM Evaluation', desc: 'Evaluated LLM outputs against structured rubrics within an AI evaluation pipeline.' },
      ] },
    ],
  },
  {
    title: 'Skills', icon: 'wrench', items: [
      { title: 'ML / AI', icon: 'chart', rows: ['TensorFlow', 'Keras', 'CNNs', 'LSTMs', 'Librosa', 'Spectrogram analysis', 'Grad-CAM', 'Human-in-the-loop review', 'LLM evaluation', 'LLM tool calling'].map((title) => ({ title })) },
      { title: 'Languages', icon: 'terminal', rows: ['Python', 'C', 'C++', 'TypeScript', 'SQL', 'Bash', 'PowerShell'].map((title) => ({ title })) },
      { title: 'Embedded', icon: 'chip', rows: [
        { title: 'Bare-metal C', value: 'ARM Cortex-M4F', desc: 'TI Tiva TM4C123, coursework.' },
        { title: 'Home assembly test setup' },
      ] },
      { title: 'Systems', icon: 'desktop', rows: ['Linux', 'Windows', 'Git', 'Docker', 'Wireshark', 'Intune', 'PXE imaging', 'SSO / identity', 'Microsoft 365 Admin'].map((title) => ({ title })) },
      { title: 'Web', icon: 'globe', rows: ['Supabase', 'Postgres', 'Tailwind CSS', 'Vercel'].map((title) => ({ title })) },
    ],
  },
  {
    title: 'Leadership', icon: 'flag', items: [
      { title: 'Vice President & Treasurer', sub: 'Tau Kappa Epsilon · previously Secretary', icon: 'group', rows: [
        { title: 'Organization', value: 'Tau Kappa Epsilon' },
        { title: 'Dates', value: 'Feb 2024 – Dec 2025' },
        { title: 'Chapter Growth', value: '7 → 40 members', desc: 'Served on the executive board as the chapter grew from 7 to 40 members, now on track to charter.' },
        { title: 'Treasurer', value: '~$10K cash flow', desc: 'Ran ~$10K in cash flow while the chapter carried legacy debt: strict spending controls, every new charge kept current, and the debt paid down until the chapter was debt-free.' },
        { title: 'Road to Charter', desc: 'Reset how the chapter runs, from its rules to compliance, and pitched the plan to national headquarters.' },
        { title: 'St. Jude', value: '$2,400+', desc: 'Led St. Jude fundraising that raised $2,400+, doubling the prior year.' },
      ] },
      { title: 'MESA Engineering Program', sub: 'Member · CSU Chico', icon: 'school', rows: [
        { title: 'Role', value: 'Member' },
        { title: 'Organization', value: 'MESA, CSU Chico' },
      ] },
    ],
  },
  {
    title: 'Contact', icon: 'mail', items: [
      { title: 'Email', sub: 'mariveracuevas@csuchico.edu', icon: 'send', href: 'mailto:mariveracuevas@csuchico.edu' },
      { title: 'LinkedIn', sub: 'linkedin.com/in/mariveracuevas', icon: 'link', href: 'https://linkedin.com/in/mariveracuevas' },
      { title: 'GitHub', sub: 'github.com/mi6uelange7', icon: 'code', href: 'https://github.com/mi6uelange7' },
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
