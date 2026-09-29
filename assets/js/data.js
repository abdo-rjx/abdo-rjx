/* =============================================================================
   SITE CONTENT  —  this is the only file you need to edit to update the site.
   Change the text below, save, push. Done.
   ============================================================================= */

const CONFIG = {
  name: 'Abdellah Rouias',
  handle: 'abdo-rjx',
  role: 'Full-Stack Engineer — Backend · Systems · Applied AI',
  location: 'Casablanca, Morocco',
  /* Shown in the hero pill. Set to "" to hide it entirely. */
  status: 'Open to new work',
  /* Leave "" to hide the contact button. Example: 'you@example.com' */
  email: '',

  links: {
    github: 'https://github.com/abdo-rjx',
    /* Optional — add a full URL or leave blank and the icon hides itself. */
    linkedin: '',
    twitter: '',
  },
};

/* Hero headline. Each entry is one line; they reveal one after another. */
const HERO = {
  eyebrow: 'Systems-minded software engineer',
  lines: [
    'I build backends that',
    'hold their shape, and',
    'interfaces that stay',
    'out of the way.',
  ],
  lead:
    'From Spring Boot services to eBPF probes that watch the kernel — I care ' +
    'about systems that are legible, explainable, and still standing under load.',
};

/* The scrolling strip under the hero. */
const TICKER = [
  'Java',
  'Spring Boot',
  'React',
  'TypeScript',
  'Next.js',
  'Angular',
  'eBPF',
  'C',
  'Linux',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Tailwind',
  'Vite',
  'Maven',
  'Hibernate',
  'scikit-learn',
  'Tauri',
  'Git',
];

/* ---------------------------------------------------------------------------
   TECH LOGOS
   Maps a technology name to a file in assets/img/ (official brand marks,
   downloaded from the Devicon set — vendored locally so the site works
   offline and never depends on a third-party CDN at runtime).

   To use a logo in a list, wrap the name:  { label: 'Java', icon: true }
   Anything without a matching entry here simply renders as plain text.
   ------------------------------------------------------------------------ */
const TECH_ICONS = {
  java: 'java',
  spring: 'spring',
  'spring boot': 'spring',
  react: 'react',
  typescript: 'typescript',
  'next.js': 'nextjs',
  'nextjs': 'nextjs',
  angular: 'angularjs',
  angularjs: 'angularjs',
  python: 'python',
  fastapi: 'fastapi',
  c: 'c',
  linux: 'linux',
  ebpf: 'linux',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  docker: 'docker',
  tailwind: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  tailwindcss: 'tailwindcss',
  vite: 'vite',
  maven: 'maven',
  hibernate: 'hibernate',
  jpa: 'hibernate',
  'scikit-learn': 'scikitlearn',
  sklearn: 'scikitlearn',
  tauri: 'tauri',
  git: 'git',
  github: 'git',
};

/* Headline numbers. Keep these honest — recruiters do check. */
const STATS = [
  { value: '10', label: 'public repos' },
  { value: '2023', label: 'writing code since' },
  { value: '29', label: 'security cases passing' },
  { value: '5s', label: 'detection window' },
];


/* ---------------------------------------------------------------------------
   FEATURED WORK
   glyph: pick one of  kernel | shield | branch | scatter | orbit | box | key
   Reorder freely — the first one renders largest.
   ------------------------------------------------------------------------ */
const PROJECTS = [
  {
    glyph: 'kernel',
    name: 'eBPF Sentinel',
    repo: 'eBPF-sentinel',
    year: '2026',
    tag: 'Featured',
    blurb:
      'A host-based intrusion detection system that lives inside the Linux ' +
      'kernel. eBPF (CO-RE) hooks security-relevant syscalls, an Isolation ' +
      'Forest scores every 5-second activity window, and alerts stream to a ' +
      'React dashboard.',
    detail:
      'Behavioural, not signature-based — no hash databases, no IOC feeds. It ' +
      'learns what normal looks like on the host and flags the statistical ' +
      'outliers: ransomware file-thrashing, C2 beaconing, privilege escalation.',
    stack: ['C', 'eBPF', 'Linux', 'Python', 'FastAPI', 'React', 'Vite', 'Isolation Forest'],
    href: 'https://github.com/abdo-rjx/eBPF-sentinel',
  },
  {
    glyph: 'shield',
    name: 'ASGuard',
    repo: 'ASGuard',
    year: '2026',
    tag: 'Featured',
    blurb:
      'A bidirectional security firewall for AI applications. One gateway ' +
      'inspects every prompt going in and every response coming out, so ' +
      'inbound attacks and outbound secret leaks are both caught.',
    detail:
      'Detection is deterministic — patterns, rules and heuristics, no model in ' +
      'the blocking path. Model-agnostic: point your client at ASGuard and only ' +
      'the base URL changes. Holds zero credentials for your data plane, and ' +
      'adds single-digit milliseconds.',
    stack: ['Python', 'FastAPI', 'React 18', 'TypeScript', 'Tauri 2', 'PostgreSQL'],
    href: 'https://github.com/abdo-rjx/ASGuard',
  },
  {
    glyph: 'branch',
    name: 'DecisionOS',
    repo: 'DecisionOS',
    year: '2026',
    tag: 'Featured',
    blurb:
      'A decision-support simulator for reasoning under uncertainty. Model a ' +
      'situation and a business model, then run simulations and compare the ' +
      'outcomes on a dashboard.',
    detail:
      'Java 21 + Spring Boot 3 on the back, Next.js 14 with the App Router and ' +
      'Tailwind on the front, Postgres 16 and everything wired together with ' +
      'Docker Compose. JWT auth, multi-tenant organisations, LLM integration ' +
      'via an OpenAI-compatible endpoint.',
    stack: ['Java 21', 'Spring Boot 3', 'Next.js 14', 'TypeScript', 'PostgreSQL', 'Docker'],
    href: 'https://github.com/abdo-rjx/DecisionOS',
  },
  {
    glyph: 'scatter',
    name: 'Malware Detector',
    repo: 'Malware-dtct',
    year: '2026',
    tag: 'Academic',
    blurb:
      'An ML classifier for Windows PE files. It reads the import table, turns ' +
      'it into a feature vector, and predicts malware or clean with a ' +
      'confidence score and the imports that triggered it.',
    detail:
      'Malware consistently reaches for VirtualAlloc, WriteProcessMemory and ' +
      'CreateRemoteThread; legitimate software rarely does. Trained with ' +
      'XGBoost and scikit-learn. Academic project for Pr. Hafsa Benaddi, ' +
      "Sécurité Informatique — FS Ben M'Sick, Université Hassan II.",
    stack: ['Python', 'scikit-learn', 'XGBoost', 'pefile'],
    href: 'https://github.com/abdo-rjx/Malware-dtct',
  },
  {
    glyph: 'orbit',
    name: 'Unified AI Agent',
    repo: 'mini-ai',
    year: '2026',
    tag: 'AI',
    blurb:
      'A multi-provider agent system. Claude handles code and analysis, Gemini ' +
      '2.5 Flash handles retrieval and summarisation, and Kimi acts as the ' +
      'orchestrator that routes each task to the right model.',
    detail:
      'Includes retrieval-augmented generation: PDFs are indexed locally into a ' +
      'FAISS vector store with HuggingFace embeddings, and agents pull the ' +
      'relevant context in automatically. Ships with a Gradio web UI and a full ' +
      'terminal client.',
    stack: ['Python', 'Claude', 'Gemini 2.5 Flash', 'Kimi', 'FAISS', 'HuggingFace', 'Gradio'],
    href: 'https://github.com/abdo-rjx/mini-ai',
  },
  {
    glyph: 'box',
    name: 'E-Store Premium',
    repo: 'E-store-project-',
    year: '2026',
    tag: 'Full-Stack',
    blurb:
      'An end-to-end e-commerce platform for premium electronics: catalogue ' +
      'with multi-image galleries and live stock, JWT authentication, cart and ' +
      'checkout, and an admin dashboard with drag-and-drop media uploads.',
    detail:
      'A deliberately decoupled architecture — Spring Boot with Spring Security ' +
      'and JWT on the back, Angular 19 on the front, JPA/H2 for transactional ' +
      'data and MongoDB for review documents.',
    stack: ['Spring Boot', 'Angular 19', 'TypeScript', 'MongoDB', 'JPA', 'H2', 'JWT'],
    href: 'https://github.com/abdo-rjx/E-store-project-',
  },
  {
    glyph: 'key',
    name: 'Cryptography Toolkit',
    repo: 'Encryption-Decryption-project-',
    year: '2026',
    tag: 'Foundations',
    blurb:
      'A terminal toolkit built to actually understand cryptography by ' +
      'implementing it: SHA-256 hashing and integrity checks, AES and RSA, a ' +
      'bcrypt password manager, and Fernet file encryption.',
    detail:
      'The one that everything else builds on. Hash a file, tamper with a ' +
      'single character, watch the fingerprint change — then encrypt a real ' +
      'file and try to open it without the key.',
    stack: ['Python', 'AES', 'RSA', 'bcrypt', 'Fernet', 'SHA-256'],
    href: 'https://github.com/abdo-rjx/Encryption-Decryption-project-',
  },
];


/* Capability groups — the "how I work" grid. */
const CAPABILITIES = [
  {
    code: 'A',
    title: 'Backend',
    body:
      'Services designed around clear boundaries — REST APIs, layered domain ' +
      'logic, and auth that is boring in the best way.',
    items: ['Java', 'Spring Boot', 'Spring Security + JWT', 'REST APIs', 'JPA / Hibernate', 'Maven'],
  },
  {
    code: 'B',
    title: 'Frontend',
    body:
      'Typed, component-driven interfaces that load fast and stay ' +
      'understandable six months later.',
    items: ['React', 'TypeScript', 'Next.js', 'Angular', 'Tailwind', 'Vite'],
  },
  {
    code: 'C',
    title: 'Systems & Security',
    body:
      'Closer to the metal than the framework — where the interesting ' +
      'guarantees actually live.',
    items: ['eBPF', 'C', 'Linux', 'PE / import analysis', 'Tauri', 'Git'],
  },
  {
    code: 'D',
    title: 'Applied ML & AI',
    body:
      'Classical models where they are the right tool, LLM pipelines where ' +
      'they are genuinely useful.',
    items: ['Python', 'scikit-learn', 'XGBoost', 'Isolation Forest', 'FAISS + embeddings', 'RAG', 'Agent orchestration'],
  },
  {
    code: 'E',
    title: 'Data & Infra',
    body:
      'Reproducible environments. If it cannot be brought up with one command, ' +
      'it is not finished.',
    items: ['PostgreSQL', 'MongoDB', 'Docker', 'Docker Compose', 'Observability', 'CI-ready repos'],
  },
  {
    code: 'F',
    title: 'How I work',
    body:
      'Write it down, draw the architecture, then build. Documentation is part ' +
      'of the deliverable, not an afterthought.',
    items: ['Technical writing', 'System design', 'Threat modelling', 'Code review'],
  },
];

/* Timeline — built from real repository dates. */
const TIMELINE = [
  {
    date: 'Aug 2023',
    title: 'First commit',
    body: 'Account opens. The cryptography toolkit lands first — learning the primitives before building on top of them.',
  },
  {
    date: 'Feb 2026',
    title: 'Foundations',
    body: 'Cryptography Toolkit in Python, plus a Java crypto repo. Hashing, AES, RSA, bcrypt, Fernet — all by hand.',
  },
  {
    date: 'Apr 2026',
    title: 'Into applied AI',
    body: 'Unified AI Agent: multi-provider routing, FAISS retrieval, HuggingFace embeddings, Gradio and CLI front ends.',
  },
  {
    date: 'May 2026',
    title: 'ML for security',
    body: 'Malware Detector classifies Windows PE files from import-table patterns with XGBoost. E-Store opens alongside it.',
  },
  {
    date: 'Jul 2026',
    title: 'Into the kernel',
    body: 'eBPF Sentinel moves the detection point inside the kernel — behavioural analysis instead of signatures.',
  },
  {
    date: 'Aug 2026',
    title: 'Production hardening',
    body: 'ASGuard ships a bidirectional AI firewall: deterministic detection, explainable verdicts, a Tauri desktop client.',
  },
  {
    date: 'Sep 2026',
    title: 'DecisionOS',
    body: 'Spring Boot 3 and Next.js 14 in one compose stack — simulation, organisations, and a dashboard on top.',
  },
];

const CONTACT = {
  heading: "Let's build something that holds up.",
  body:
    'I am looking for work where the engineering actually matters — backend, ' +
    'platform, or security engineering. If that sounds like your team, my ' +
    'GitHub is the fastest way to see how I think.',
  cta: 'View my GitHub',
};

/* ---------------------------------------------------------------------------
   PUBLISH TO window
   `const` at the top level of a classic <script> creates a script-scoped
   binding, NOT a property on window — so main.js could not see any of the
   data above. These lines expose it explicitly. Keep this block last.
   ------------------------------------------------------------------------ */
window.CONFIG         = CONFIG;
window.HERO           = HERO;
window.TICKER         = TICKER;
window.TECH_ICONS     = TECH_ICONS;
window.STATS          = STATS;
window.PROJECTS       = PROJECTS;
window.CAPABILITIES   = CAPABILITIES;
window.TIMELINE       = TIMELINE;
window.CONTACT        = CONTACT;
