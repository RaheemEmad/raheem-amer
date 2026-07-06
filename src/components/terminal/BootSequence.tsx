import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "BIOS v3.1.0 — RaheemOS", delay: 40 },
  { text: "Initializing hardware...", delay: 30 },
  { text: "Loading kernel...", delay: 30 },
  { text: "Mounting filesystem /dev/dreams ...", delay: 30 },
  { text: "Starting services...", delay: 30 },
  { text: "[  OK  ] Started FlairsTech", ok: true },
  { text: "[  OK  ] Loaded DevOps Profile", ok: true },
  { text: "[  OK  ] Loaded Recruiter Profile", ok: true },
  { text: "[  OK  ] Loaded Software Engineer Profile", ok: true },
  { text: "" },
  { text: "Welcome to", delay: 60 },
  { text: "RaheemOS v3.1.0", big: true },
  { text: "" },
  { text: "Press any key to continue..." },
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(LINES.length);
      return;
    }
    if (step >= LINES.length) return;
    const d = LINES[step]?.delay ?? 220;
    const t = setTimeout(() => setStep((s) => s + 1), d);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const onKey = () => (step >= LINES.length ? finish() : setStep(LINES.length));
    const onClick = () => (step >= LINES.length ? finish() : setStep(LINES.length));
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [step]);

  useEffect(() => {
    if (step >= LINES.length) {
      const t = setTimeout(finish, 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  const shown = LINES.slice(0, Math.min(step + 1, LINES.length));

  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ background: "var(--tn-bg)", color: "var(--tn-text)" }}
    >
      <div className="w-full max-w-2xl font-mono text-sm sm:text-base">
        {shown.map((l, i) => (
          <div
            key={i}
            className={l.big ? "text-2xl sm:text-3xl font-bold my-2" : ""}
            style={{
              color: l.big
                ? "var(--tn-purple)"
                : l.ok
                  ? "var(--tn-green)"
                  : "var(--tn-text)",
            }}
          >
            {l.text || "\u00A0"}
          </div>
        ))}
        {step >= LINES.length && (
          <span
            className="inline-block w-2 h-4 blink-caret align-middle"
            style={{ background: "var(--tn-blue)" }}
          />
        )}
      </div>
    </div>
  );
}