import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BootSequence } from "@/components/terminal/BootSequence";
import { Terminal } from "@/components/terminal/Terminal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("raheemos-booted") === "1") setBooted(true);
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem("raheemos-booted", "1");
    } catch {
      /* ignore */
    }
    setBooted(true);
  };

  return booted ? <Terminal /> : <BootSequence onDone={finish} />;
}
