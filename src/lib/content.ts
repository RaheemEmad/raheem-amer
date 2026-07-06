// Content extracted from Raheem Amer's CV and README.
// Consumed by the terminal command registry.

export const profile = {
  name: "Raheem Amer",
  handle: "raheem",
  host: "portfolio",
  title: "Google Cloud Technical Support Engineer @ FlairsTech",
  tagline: "Cloud | Infrastructure | Networking | Automation | Security",
  summary:
    "Google Cloud Engineer with a full-stack background. I build systems, not just interfaces — currently focused on Cloud, DevOps, Linux, Automation, and DevSecOps.",
  location: "Cairo, Egypt",
  email: "raheem.emad@example.com", // TODO: confirm real address
  github: "https://github.com/RaheemEmad",
  githubAlt: "https://github.com/RaheemAmer",
  linkedin: "https://www.linkedin.com/in/raheememad/",
  currentFocus: [
    "Cloud Computing",
    "Infrastructure",
    "Networking",
    "Linux",
    "DevOps",
    "DevSecOps",
    "Automation",
  ],
  interests: ["Psychology", "Philosophy", "Open Source", "Data Analytics"],
  background: [
    "Full Stack Web Development",
    "Talent Acquisition Specialist",
    "Customer Service & Support",
    "Product Management",
  ],
};

export type SkillStatus = "active" | "strong" | "learning";
export const skills: { group: string; items: { name: string; status: SkillStatus }[] }[] = [
  {
    group: "Cloud & Infrastructure",
    items: [
      { name: "GCP", status: "active" },
      { name: "Cloud Run", status: "active" },
      { name: "GCP Monitoring", status: "active" },
      { name: "Oracle WebLogic", status: "strong" },
      { name: "SFCC", status: "strong" },
      { name: "Linux", status: "active" },
      { name: "Windows Server", status: "strong" },
    ],
  },
  {
    group: "DevOps & Monitoring",
    items: [
      { name: "Docker", status: "active" },
      { name: "CI/CD", status: "active" },
      { name: "Prometheus", status: "learning" },
      { name: "Grafana", status: "learning" },
      { name: "JIRA / ServiceNow", status: "strong" },
      { name: "Incident Response", status: "active" },
    ],
  },
  {
    group: "Scripting & Automation",
    items: [
      { name: "Bash", status: "active" },
      { name: "Python", status: "strong" },
      { name: "REST APIs", status: "active" },
      { name: "Git / GitHub", status: "active" },
    ],
  },
  {
    group: "Networking & Support",
    items: [
      { name: "TCP/IP", status: "strong" },
      { name: "DNS", status: "strong" },
      { name: "VLANs", status: "strong" },
      { name: "CCNA fundamentals", status: "learning" },
      { name: "Tier 3 escalation", status: "active" },
    ],
  },
  {
    group: "Development",
    items: [
      { name: "JavaScript / TypeScript", status: "strong" },
      { name: "React.js", status: "strong" },
      { name: "Node.js", status: "strong" },
      { name: "Express.js", status: "strong" },
      { name: "MongoDB", status: "strong" },
      { name: "C", status: "learning" },
    ],
  },
  {
    group: "Soft Skills",
    items: [
      { name: "Communication", status: "active" },
      { name: "Problem Solving", status: "active" },
      { name: "Adaptability", status: "active" },
      { name: "Mentoring", status: "strong" },
    ],
  },
];

export const experience = [
  {
    hash: "a93d1e",
    head: true,
    company: "FlairsTech",
    role: "Cloud Technical Support Engineer — Google Cloud",
    period: "2024 — Present",
    bullets: [
      "Tier 2/3 support for Google Cloud customers: Cloud Run, IAM, networking, observability.",
      "Own incident response, MTTD/MTTR reduction, and post-mortems.",
      "Automate recurring diagnostics with Python and Bash tooling.",
    ],
  },
  {
    hash: "b29dd3",
    company: "iSchool",
    role: "Programming Instructor",
    period: "2023 — 2024",
    bullets: [
      "Taught JavaScript, web fundamentals, and problem solving to K–12 students.",
      "Designed hands-on projects with real deployment workflows.",
    ],
  },
  {
    hash: "29ea81",
    company: "LabLink",
    role: "Founder — Freelancing Platform for Labs",
    period: "Feb 2025 — Present",
    bullets: [
      "Built end-to-end with React and Lovable: matching, listings, onboarding.",
      "Live at lablink-smartlab.lovable.app.",
    ],
  },
  {
    hash: "1c77a2",
    company: "ALX Africa",
    role: "Full Stack Diploma (12-month intl. program)",
    period: "Oct 2022 — Oct 2023",
    bullets: [
      "Full-cycle projects in C, Python, JavaScript, and React.",
      "Cohort spanning 60+ countries.",
    ],
  },
  {
    hash: "3f0a19",
    company: "Route",
    role: "MEARN Apprenticeship",
    period: "May 2022 — Nov 2022",
    bullets: [
      "Shipped 6+ MEARN projects including a hospital dashboard with 10+ features.",
    ],
  },
];

export const education = [
  {
    school: "University of Arish, Egypt",
    degree: "B.Sc. Computer Science and Information Technology",
    period: "2017 — 2021",
    detail: "GPA 3.13 / 4.0 (Very Good) · Class Rank 7 · Graduation Project A+",
  },
  {
    school: "ALX Africa",
    degree: "Remote Full Stack Diploma",
    period: "Oct 2022 — Oct 2023",
    detail: "12-month international program, 60+ countries.",
  },
  {
    school: "Route",
    degree: "Remote Full Stack Developer (MEARN Apprenticeship)",
    period: "May 2022 — Nov 2022",
    detail: "6+ delivered projects.",
  },
];

export const certifications = [
  "SFCC Admin Certification — Salesforce",
  "Salesforce Trailhead — 10 Badges",
  "Full Stack MEARN — ITI (government-accredited)",
  "Full Stack MEARN — Route",
  "EF SET English Certificate — EF Education First",
  "DevOps Beginner Track — Udacity",
  "McKinsey Forward Program — McKinsey & Company",
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  repo: string;
  demo?: string;
  status: "healthy" | "online" | "wip";
};

export const projects: Project[] = [
  {
    slug: "wealth-compass-eg",
    name: "Wealth Compass EG",
    description:
      "Financial management and wealth tracking app for the Egyptian market.",
    stack: ["TypeScript", "React"],
    repo: "https://github.com/RaheemEmad/wealth-compass-eg",
    status: "healthy",
  },
  {
    slug: "lab-link-system",
    name: "Lab Link System",
    description:
      "Laboratory management platform: resources, scheduling, workflow automation.",
    stack: ["TypeScript", "React", "Lovable"],
    repo: "https://github.com/RaheemEmad/lab-link-system",
    demo: "https://lablink-smartlab.lovable.app",
    status: "online",
  },
  {
    slug: "gdi-support",
    name: "GDI Support",
    description:
      "Support and customer service platform for tickets and service management.",
    stack: ["TypeScript"],
    repo: "https://github.com/RaheemEmad/gdi-support",
    status: "healthy",
  },
  {
    slug: "el7arakabaraka",
    name: "El7arakabaraka",
    description: "Mobility and movement solutions with a focus on seamless UX.",
    stack: ["TypeScript"],
    repo: "https://github.com/RaheemEmad/el7arakabaraka",
    status: "wip",
  },
  {
    slug: "future-doctor",
    name: "Future Doctor",
    description:
      "Healthcare platform supporting doctors, patients, and medical services.",
    stack: ["TypeScript", "React"],
    repo: "https://github.com/RaheemEmad/future-doctor",
    status: "healthy",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    description: "This site — RaheemOS terminal portfolio.",
    stack: ["React", "TanStack Start", "TypeScript", "Tailwind"],
    repo: "https://github.com/RaheemEmad/Portfolio",
    status: "online",
  },
  {
    slug: "self-study",
    name: "Self-Study Open Source Guide",
    description:
      "Structured DevOps + Cloud learning roadmap: Linux, Bash, CI/CD, Docker, DevSecOps.",
    stack: ["Open Source"],
    repo: "https://github.com/RaheemAmer/Self-study",
    status: "online",
  },
];

export const socials = [
  { label: "GitHub", url: profile.github },
  { label: "GitHub (alt)", url: profile.githubAlt },
  { label: "LinkedIn", url: profile.linkedin },
  { label: "Email", url: `mailto:${profile.email}` },
];