import type { ReactNode } from "react";
import {
  profile,
  skills,
  experience,
  education,
  certifications,
  projects,
  socials,
} from "./content";

export type CommandContext = {
  history: string[];
  print: (node: ReactNode) => void;
  clear: () => void;
  startContact: () => void;
  startHire: () => void;
};

export type Command = {
  name: string; // canonical, may contain spaces (e.g. "cat skills.txt")
  description: string;
  run: (ctx: CommandContext, args: string[]) => void | Promise<void>;
};

const dot = (color: string) => (
  <span
    aria-hidden
    className="inline-block h-2 w-2 rounded-full mr-2 align-middle"
    style={{ background: color }}
  />
);

const statusColor = { active: "#9ece6a", strong: "#7aa2f7", learning: "#ff9e64" } as const;

function Line({ children, color }: { children: ReactNode; color?: string }) {
  return <div style={color ? { color } : undefined}>{children}</div>;
}

const helpCmd: Command = {
  name: "help",
  description: "List available commands",
  run: (ctx) => {
    ctx.print(
      <div>
        <Line color="var(--tn-purple)">Available commands:</Line>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          {registry.map((c) => (
            <div key={c.name} className="flex gap-3">
              <span className="text-tn-green min-w-[10rem]">{c.name}</span>
              <span className="text-tn-muted">{c.description}</span>
            </div>
          ))}
        </div>
      </div>,
    );
  },
};

const whoamiCmd: Command = {
  name: "whoami",
  description: "About Raheem",
  run: (ctx) => {
    ctx.print(
      <div className="space-y-1">
        <Line color="var(--tn-blue)">{profile.name}</Line>
        <Line color="var(--tn-purple)">{profile.title}</Line>
        <Line color="var(--tn-muted)">{profile.tagline}</Line>
        <div className="mt-2">{profile.summary}</div>
        <div className="mt-2">
          <span className="text-tn-orange">location</span> : {profile.location}
        </div>
        <div>
          <span className="text-tn-orange">github  </span> :{" "}
          <a className="underline text-tn-blue" href={profile.github} target="_blank" rel="noreferrer">
            {profile.github}
          </a>
        </div>
        <div>
          <span className="text-tn-orange">linkedin</span> :{" "}
          <a className="underline text-tn-blue" href={profile.linkedin} target="_blank" rel="noreferrer">
            {profile.linkedin}
          </a>
        </div>
        <div>
          <span className="text-tn-orange">email   </span> :{" "}
          <a className="underline text-tn-blue" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <div className="mt-2 text-tn-muted">
          Tip: try <span className="text-tn-green">ls projects/</span>,{" "}
          <span className="text-tn-green">git log</span>, or{" "}
          <span className="text-tn-green">ping raheem</span>.
        </div>
      </div>,
    );
  },
};

const skillsCmd: Command = {
  name: "cat skills.txt",
  description: "Grouped technical & soft skills",
  run: (ctx) => {
    ctx.print(
      <div className="space-y-3">
        {skills.map((g) => (
          <div key={g.group}>
            <div className="text-tn-purple">## {g.group}</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {g.items.map((s) => (
                <div key={s.name} className="flex items-center">
                  {dot(statusColor[s.status])}
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="text-tn-muted text-sm">
          legend: {dot(statusColor.active)}active {dot(statusColor.strong)}strong{" "}
          {dot(statusColor.learning)}learning
        </div>
      </div>,
    );
  },
};

const lsProjectsCmd: Command = {
  name: "ls projects/",
  description: "List projects",
  run: (ctx) => {
    ctx.print(
      <div className="space-y-4">
        <div className="text-tn-muted">total {projects.length}</div>
        {projects.map((p) => (
          <div
            key={p.slug}
            className="border border-border rounded-md overflow-hidden"
            style={{ background: "var(--tn-surface)" }}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
              <span className="h-3 w-3 rounded-full" style={{ background: "#f7768e" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#ff9e64" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#9ece6a" }} />
              <span className="ml-3 text-tn-muted text-sm">
                ~/projects/{p.slug}
              </span>
              <span className="ml-auto text-xs" style={{ color: statusColor.active }}>
                ● {p.status}
              </span>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="text-tn-blue font-semibold">{p.name}</div>
              <div>{p.description}</div>
              <div className="text-tn-muted text-sm">
                stack: {p.stack.join(" · ")}
              </div>
              <div className="text-sm flex flex-wrap gap-4">
                <a className="text-tn-green underline" href={p.repo} target="_blank" rel="noreferrer">
                  repo →
                </a>
                {p.demo && (
                  <a className="text-tn-purple underline" href={p.demo} target="_blank" rel="noreferrer">
                    live →
                  </a>
                )}
              </div>
              <div className="text-tn-muted text-xs font-mono pt-1">
                $ docker ps --filter name={p.slug}
                <br />
                CONTAINER {p.slug.slice(0, 12).padEnd(14)} STATUS {p.status}
              </div>
            </div>
          </div>
        ))}
      </div>,
    );
  },
};

const gitLogCmd: Command = {
  name: "git log",
  description: "Work experience as a git log",
  run: (ctx) => {
    ctx.print(
      <div className="space-y-4">
        {experience.map((e) => (
          <div key={e.hash}>
            <div>
              <span className="text-tn-orange">commit {e.hash}</span>
              {e.head && (
                <span className="ml-2 text-tn-blue">(HEAD -&gt; main)</span>
              )}
            </div>
            <div className="text-tn-muted">Author: {e.company}</div>
            <div className="text-tn-muted">Date:   {e.period}</div>
            <div className="mt-2 pl-4">
              <div className="text-tn-purple">{e.role}</div>
              <ul className="mt-1 space-y-1 list-disc list-inside">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>,
    );
  },
};

const experienceCmd: Command = {
  name: "experience",
  description: "Alias for `git log`",
  run: (ctx, args) => gitLogCmd.run(ctx, args),
};

const educationCmd: Command = {
  name: "education",
  description: "Education timeline",
  run: (ctx) => {
    ctx.print(
      <div className="space-y-3">
        {education.map((e) => (
          <div key={e.school}>
            <div className="text-tn-blue">{e.school}</div>
            <div>{e.degree}</div>
            <div className="text-tn-muted text-sm">
              {e.period} — {e.detail}
            </div>
          </div>
        ))}
      </div>,
    );
  },
};

const certsCmd: Command = {
  name: "certifications",
  description: "Certifications and training",
  run: (ctx) => {
    ctx.print(
      <ul className="space-y-1">
        {certifications.map((c) => (
          <li key={c}>
            <span className="text-tn-green">[✓]</span> {c}
          </li>
        ))}
      </ul>,
    );
  },
};

const aboutCmd: Command = {
  name: "about",
  description: "Short bio",
  run: (ctx) => {
    ctx.print(
      <div className="space-y-2">
        <div>{profile.summary}</div>
        <div>
          <span className="text-tn-orange">focus    </span>:{" "}
          {profile.currentFocus.join(", ")}
        </div>
        <div>
          <span className="text-tn-orange">interests</span>:{" "}
          {profile.interests.join(", ")}
        </div>
        <div>
          <span className="text-tn-orange">history  </span>:{" "}
          {profile.background.join(", ")}
        </div>
      </div>,
    );
  },
};

const socialsCmd: Command = {
  name: "socials",
  description: "Links table",
  run: (ctx) => {
    ctx.print(
      <table className="w-full text-left">
        <thead>
          <tr className="text-tn-muted">
            <th className="pr-4 py-1">PLATFORM</th>
            <th className="py-1">URL</th>
          </tr>
        </thead>
        <tbody>
          {socials.map((s) => (
            <tr key={s.label}>
              <td className="pr-4 py-1 text-tn-orange">{s.label}</td>
              <td className="py-1">
                <a
                  className="text-tn-blue underline"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>,
    );
  },
};

const resumeCmd: Command = {
  name: "resume",
  description: "Resume preview & links",
  run: (ctx) => {
    ctx.print(
      <div
        className="border border-border rounded-md p-4"
        style={{ background: "var(--tn-surface)" }}
      >
        <div className="text-tn-blue font-semibold">{profile.name} — Resume</div>
        <div className="text-tn-muted">{profile.title}</div>
        <div className="mt-3 text-sm">{profile.summary}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/resume.pdf"
            download
            className="px-3 py-1 rounded border border-border text-tn-green hover:bg-tn-blue/10"
          >
            [ Download PDF ]
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded border border-border text-tn-blue hover:bg-tn-blue/10"
          >
            [ Open LinkedIn ]
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded border border-border text-tn-purple hover:bg-tn-blue/10"
          >
            [ Open GitHub ]
          </a>
        </div>
      </div>,
    );
  },
};

const contactCmd: Command = {
  name: "contact",
  description: "Send Raheem a message",
  run: (ctx) => ctx.startContact(),
};

const pingCmd: Command = {
  name: "ping raheem",
  description: "Interactive contact prompt",
  run: (ctx) => ctx.startContact(),
};

const hireCmd: Command = {
  name: "sudo hire raheem",
  description: "🎉",
  run: (ctx) => ctx.startHire(),
};

const neofetchCmd: Command = {
  name: "neofetch",
  description: "System info",
  run: (ctx) => {
    const ascii = [
      "      ▄▄▄▄▄      ",
      "   ▄██████████▄   ",
      "  ██▀        ▀██  ",
      " ██  ▄█▀▀█▄   ██ ",
      " ██  █▄  ▄█   ██ ",
      " ██   ▀██▀    ██ ",
      "  ██▄        ▄██  ",
      "   ▀██████████▀   ",
    ];
    const info: [string, string][] = [
      ["user", `${profile.handle}@${profile.host}`],
      ["OS", "RaheemOS v3.1.0"],
      ["Shell", "raheem-sh 5.0"],
      ["Editor", "VS Code · Vim"],
      ["Languages", "TS · JS · Python · Bash · C"],
      ["Cloud", "GCP · Cloud Run"],
      ["Mission", "Ship reliable systems, mentor humans."],
      ["Fun fact", "INFJ 2w1 · Cat dad 🐱"],
    ];
    ctx.print(
      <div className="flex flex-col md:flex-row gap-6">
        <pre className="text-tn-blue leading-tight">{ascii.join("\n")}</pre>
        <div className="space-y-0.5">
          {info.map(([k, v]) => (
            <div key={k}>
              <span className="text-tn-orange">{k.padEnd(10)}</span>
              <span className="text-tn-muted">: </span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>,
    );
  },
};

const clearCmd: Command = {
  name: "clear",
  description: "Clear the terminal",
  run: (ctx) => ctx.clear(),
};

const themeCmd: Command = {
  name: "theme",
  description: "Active theme",
  run: (ctx) => {
    ctx.print(
      <div>
        Active theme: <span className="text-tn-purple">Tokyo Night</span> (dark).
        More themes coming in v3.2.0.
      </div>,
    );
  },
};

const historyCmd: Command = {
  name: "history",
  description: "Command history",
  run: (ctx) => {
    ctx.print(
      <ol className="space-y-0.5">
        {ctx.history.map((h, i) => (
          <li key={i}>
            <span className="text-tn-muted mr-3">{String(i + 1).padStart(4)}</span>
            {h}
          </li>
        ))}
      </ol>,
    );
  },
};

const dateCmd: Command = {
  name: "date",
  description: "Current date/time",
  run: (ctx) => ctx.print(<div>{new Date().toString()}</div>),
};

const pwdCmd: Command = {
  name: "pwd",
  description: "Print working directory",
  run: (ctx) => ctx.print(<div>/home/{profile.handle}</div>),
};

const echoCmd: Command = {
  name: "echo",
  description: "Echo text back",
  run: (ctx, args) => ctx.print(<div>{args.join(" ")}</div>),
};

const exitCmd: Command = {
  name: "exit",
  description: "Attempt to leave RaheemOS",
  run: (ctx) => {
    ctx.print(
      <div className="text-tn-red">
        logout: cannot exit — you're the process now. (Ctrl+W to close tab.)
      </div>,
    );
  },
};

export const registry: Command[] = [
  helpCmd,
  whoamiCmd,
  skillsCmd,
  lsProjectsCmd,
  gitLogCmd,
  experienceCmd,
  educationCmd,
  certsCmd,
  aboutCmd,
  socialsCmd,
  resumeCmd,
  contactCmd,
  pingCmd,
  hireCmd,
  neofetchCmd,
  clearCmd,
  themeCmd,
  historyCmd,
  dateCmd,
  pwdCmd,
  echoCmd,
  exitCmd,
];

const ERRORS = [
  "command not found",
  "permission denied",
  "invalid syntax",
  "binary missing",
  "segmentation fault (core dumped)",
];

export function resolveCommand(input: string): { cmd?: Command; args: string[] } {
  const trimmed = input.trim().replace(/\s+/g, " ");
  if (!trimmed) return { args: [] };
  // Longest match first so "cat skills.txt" beats "cat"
  const sorted = [...registry].sort((a, b) => b.name.length - a.name.length);
  for (const c of sorted) {
    if (trimmed === c.name || trimmed.startsWith(c.name + " ")) {
      const rest = trimmed.slice(c.name.length).trim();
      return { cmd: c, args: rest ? rest.split(" ") : [] };
    }
  }
  return { args: trimmed.split(" ") };
}

export function fuzzyMatch(input: string): string[] {
  const q = input.trim().toLowerCase();
  if (!q) return [];
  return registry
    .map((c) => c.name)
    .filter((n) => n.toLowerCase().startsWith(q) || n.toLowerCase().includes(q));
}

export function randomError(input: string): string {
  const first = input.trim().split(" ")[0] || "";
  const msg = ERRORS[Math.floor(Math.random() * ERRORS.length)];
  return `${first}: ${msg}`;
}