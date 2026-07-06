import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { profile } from "@/lib/content";
import {
  fuzzyMatch,
  randomError,
  registry,
  resolveCommand,
  type Command,
} from "@/lib/commands";
import { Confetti } from "./Confetti";

type OutputEntry = { id: number; prompt?: string; node: ReactNode };

const PROMPT = `${profile.handle}@${profile.host}:~$`;

type ContactStep = "idle" | "name" | "subject" | "message" | "sending" | "done";

export function Terminal() {
  const [output, setOutput] = useState<OutputEntry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState<string>("");
  const [contact, setContact] = useState<ContactStep>("idle");
  const [contactData, setContactData] = useState({ name: "", subject: "", message: "" });
  const [confetti, setConfetti] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const nextId = () => ++idRef.current;

  const print = useCallback((node: ReactNode, prompt?: string) => {
    setOutput((prev) => [...prev, { id: nextId(), node, prompt }]);
  }, []);

  const clear = useCallback(() => setOutput([]), []);

  const startContact = useCallback(() => {
    print(
      <div className="text-tn-muted">
        Opening secure channel to raheem@portfolio ... type /cancel to abort.
      </div>,
    );
    setContact("name");
  }, [print]);

  const startHire = useCallback(() => {
    const lines = [
      "[sudo] password for guest: ********",
      "Verifying credentials ...",
      "→ permission granted.",
      "→ starting onboarding pipeline ...",
      "→ provisioning workspace ...",
      "→ launching LinkedIn ...",
    ];
    let i = 0;
    const tick = () => {
      if (i >= lines.length) {
        print(
          <div className="text-tn-green font-semibold">
            process: hired ✓ — redirecting to LinkedIn.
          </div>,
        );
        setConfetti(true);
        setTimeout(() => window.open(profile.linkedin, "_blank"), 900);
        setTimeout(() => setConfetti(false), 3200);
        return;
      }
      print(
        <div style={{ color: i < 3 ? "var(--tn-orange)" : "var(--tn-green)" }}>
          {lines[i]}
        </div>,
      );
      i++;
      setTimeout(tick, 350);
    };
    tick();
  }, [print]);

  const ctx = useMemo(
    () => ({ history, print, clear, startContact, startHire }),
    [history, print, clear, startContact, startHire],
  );

  // Run a command (used by user input and startup)
  const execute = useCallback(
    async (raw: string, opts?: { silent?: boolean }) => {
      const line = raw;
      if (!opts?.silent) {
        print(<div className="whitespace-pre-wrap">{line}</div>, PROMPT);
      }
      if (!line.trim()) return;
      setHistory((h) => [...h, line]);
      const { cmd, args } = resolveCommand(line);
      if (!cmd) {
        print(<div className="text-tn-red">{randomError(line)}</div>);
        return;
      }
      try {
        await cmd.run(ctx, args);
      } catch (e) {
        print(
          <div className="text-tn-red">
            runtime error: {(e as Error).message}
          </div>,
        );
      }
    },
    [ctx, print],
  );

  // Startup: whoami, cat skills.txt, help (once per mount)
  const bootedRef = useRef(false);
  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const seq: (Command | string)[] = ["whoami", "cat skills.txt", "help"];
    let i = 0;
    const run = () => {
      if (i >= seq.length) return;
      execute(seq[i] as string);
      i++;
      setTimeout(run, 350);
    };
    run();
  }, [execute]);

  // Auto-scroll on new output
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [output, contact, input]);

  // Click anywhere refocuses
  const focusInput = () => inputRef.current?.focus();
  useEffect(() => {
    focusInput();
  }, []);

  // Suggestion (fuzzy tab)
  useEffect(() => {
    if (!input.trim()) {
      setSuggestion("");
      return;
    }
    const m = fuzzyMatch(input);
    const first = m[0];
    setSuggestion(first && first !== input ? first : "");
  }, [input]);

  const handleContactSubmit = () => {
    const { name, subject, message } = contactData;
    const body = `From: ${name}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${body}`;
  };

  const handleContactInput = (value: string) => {
    if (value === "/cancel") {
      print(<div className="text-tn-red">connection reset by user.</div>);
      setContact("idle");
      setContactData({ name: "", subject: "", message: "" });
      return;
    }
    if (contact === "name") {
      setContactData((d) => ({ ...d, name: value }));
      print(<div><span className="text-tn-green">name &gt;</span> {value}</div>);
      setContact("subject");
    } else if (contact === "subject") {
      setContactData((d) => ({ ...d, subject: value }));
      print(<div><span className="text-tn-green">subject &gt;</span> {value}</div>);
      setContact("message");
    } else if (contact === "message") {
      setContactData((d) => ({ ...d, message: value }));
      print(<div><span className="text-tn-green">message &gt;</span> {value}</div>);
      setContact("sending");
      // Packet animation
      const packets = ["→ SYN", "← SYN/ACK", "→ ACK", "→ sending packets..."];
      let i = 0;
      const tick = () => {
        if (i >= packets.length) {
          const latency = 15 + Math.floor(Math.random() * 40);
          print(
            <div className="text-tn-green">
              64 bytes from raheem: icmp_seq=1 ttl=64 time={latency} ms
              <br />
              Reply received. ACK ✓
            </div>,
          );
          setContact("done");
          setTimeout(handleContactSubmit, 600);
          setTimeout(() => setContact("idle"), 1200);
          return;
        }
        print(<div className="text-tn-muted">{packets[i]}</div>);
        i++;
        setTimeout(tick, 300);
      };
      tick();
    }
  };

  const contactLabel =
    contact === "name"
      ? "name >"
      : contact === "subject"
        ? "subject >"
        : contact === "message"
          ? "message >"
          : "";

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      clear();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input;
      setInput("");
      setHistIdx(null);
      if (contact !== "idle" && contact !== "sending" && contact !== "done") {
        handleContactInput(value);
      } else {
        execute(value);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(suggestion);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next] ?? "");
      }
      return;
    }
  };

  const inputDisabled = contact === "sending" || contact === "done";

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "var(--tn-bg)", color: "var(--tn-text)" }}
      onMouseDown={(e) => {
        // Don't hijack link/text-selection clicks
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "A" || tag === "BUTTON" || tag === "INPUT") return;
        focusInput();
      }}
    >
      {confetti && <Confetti />}
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-b border-border sticky top-0 z-10"
        style={{ background: "var(--tn-surface)" }}
      >
        <span className="h-3 w-3 rounded-full" style={{ background: "#f7768e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff9e64" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#9ece6a" }} />
        <span className="ml-3 text-sm text-tn-muted">
          {profile.handle}@{profile.host}: ~ — zsh
        </span>
        <span className="ml-auto text-xs text-tn-muted hidden sm:inline">
          RaheemOS v3.1.0 · type <span className="text-tn-green">help</span>
        </span>
      </div>

      {/* Scroll area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 text-sm sm:text-[15px] leading-relaxed"
      >
        <div
          aria-live="polite"
          aria-atomic="false"
          className="space-y-2 max-w-4xl"
        >
          {output.map((o) => (
            <div key={o.id}>
              {o.prompt && (
                <div>
                  <span className="text-tn-green">{o.prompt}</span>{" "}
                  <span className="text-tn-text">{o.node}</span>
                </div>
              )}
              {!o.prompt && <div className="text-tn-text">{o.node}</div>}
            </div>
          ))}

          {/* Prompt line */}
          <form
            className="flex items-start gap-2 pt-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <span className="text-tn-green whitespace-nowrap pt-[2px]">
              {contactLabel || PROMPT}
            </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={inputDisabled}
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                aria-label="Terminal input"
                className="w-full bg-transparent outline-none text-tn-text caret-tn-blue placeholder:text-tn-muted"
                placeholder={contact === "idle" ? "type a command..." : ""}
              />
              {suggestion && input && !contactLabel && (
                <span className="pointer-events-none absolute inset-y-0 left-0 text-tn-muted">
                  <span className="invisible">{input}</span>
                  <span>{suggestion.slice(input.length)}</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Hint bar */}
      <div
        className="px-4 py-1.5 text-xs text-tn-muted border-t border-border flex flex-wrap gap-x-4 gap-y-1"
        style={{ background: "var(--tn-surface)" }}
      >
        <span><span className="text-tn-blue">Tab</span> autocomplete</span>
        <span><span className="text-tn-blue">↑ ↓</span> history</span>
        <span><span className="text-tn-blue">Ctrl+L</span> clear</span>
        <span className="ml-auto">
          {registry.length} commands loaded · try{" "}
          <span className="text-tn-green">ls projects/</span>
        </span>
      </div>
    </div>
  );
}