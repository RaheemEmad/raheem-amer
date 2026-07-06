
# RaheemOS — Stage 1: Core Terminal

Ship a fully interactive terminal portfolio with boot sequence, command-driven UX, and Tokyo Night styling. Draggable windows, status bar, easter eggs, and 404 kernel panic land in Stage 2.

## Scope (this stage)

1. **Theme + fonts**
   - Tokyo Night tokens in `src/styles.css` (bg `#1a1b26`, surface `#24283b`, text `#c0caf5`, muted `#565f89`, blue `#7aa2f7`, green `#9ece6a`, orange `#ff9e64`, purple `#bb9af7`, red `#f7768e`).
   - JetBrains Mono via `<link>` in `__root.tsx` head (Fira Code fallback), mapped to `--font-mono` in `@theme`.
   - Dark-only; force `.dark` on `<html>`.

2. **Boot screen** (`src/components/terminal/BootSequence.tsx`)
   - Fake BIOS lines typed with realistic cadence; blinking cursor; `[ OK ]` in green.
   - Skip on any key / click / tap. Shown once per session via `sessionStorage`.
   - Respects `prefers-reduced-motion` (renders instant).

3. **Terminal desktop** (`src/routes/index.tsx` → `<Desktop />`)
   - Prompt `raheem@portfolio:~$`, blinking caret, click-anywhere refocus, auto-scroll to bottom.
   - Command history (↑/↓), Tab autocomplete (fuzzy match against registry), Ctrl+L clear.
   - Startup auto-runs `whoami`, `cat skills.txt`, `help` with typing animation.

4. **Command registry** (`src/lib/commands/`)
   - Single registry: `{ name, description, run(ctx, args) }`. Parser splits input, resolves alias, dispatches.
   - Commands: `help`, `clear`, `whoami`, `cat skills.txt`, `ls projects/`, `git log`, `experience`, `certifications`, `education`, `about`, `socials`, `resume`, `contact`, `ping raheem`, `sudo hire raheem`, `theme`, `neofetch`, `history`, `date`, `pwd`, `echo`, `exit`.
   - Unknown → random Linux-style error (`command not found`, `permission denied`, `invalid syntax`, `binary missing`).

5. **Content (populated from your CV/README)**
   - `whoami`: Raheem Amer — Google Cloud Technical Support Engineer @ FlairsTech; background, current focus, interests, links (GitHub `RaheemEmad`/`RaheemAmer`, LinkedIn, email).
   - `cat skills.txt`: grouped (Cloud/Infra, DevOps, Scripting, Networking, Development, CRM, Soft Skills) with green/blue/yellow status dots.
   - `git log`: FlairsTech → iSchool → LabLink → ALX → Route → University Arish, expandable commits.
   - `ls projects/`: Wealth Compass EG, Lab Link System, GDI Support, El7arakabaraka, Future Doctor, Portfolio, Self-Study Guide — printed as terminal cards with repo/live links (draggable windows deferred to Stage 2).
   - `certifications`, `education`, `neofetch` (ASCII + system info), `socials` (table), `resume` (buttons: Download PDF / LinkedIn / GitHub — PDF link stubbed until provided).

6. **Contact (`ping raheem` / `contact`)**
   - Interactive `name >`, `subject >`, `message >` prompts.
   - "Sending packets… Reply received (23 ms) ACK" animation.
   - Opens `mailto:` with prefilled subject/body (per your choice).

7. **Easter egg `sudo hire raheem`**
   - Permission granted → onboarding lines → confetti (lightweight canvas, respects reduced-motion) → opens LinkedIn in new tab.

8. **Accessibility & mobile**
   - Input always focusable; ARIA live region for output; visible focus rings; keyboard-first.
   - Mobile: full-width, large tap targets, virtual-keyboard-safe layout, auto-scroll.

9. **SEO**
   - `__root.tsx` head: real title "RaheemOS — Raheem Amer | Google Cloud Engineer", description, og/twitter tags, JSON-LD `Person`.

## Technical notes

- Framework stays TanStack Start (per your choice); routing via file-based routes. Single route `/` for the terminal this stage.
- Framer Motion used sparingly (boot lines, confetti, packet animation). No React Router, no Vite migration.
- Command registry designed so Stage 2 (draggable windows, status bar, uptime widget, 404 kernel panic, `theme` switcher, more commands) plugs in without refactor.

## Deferred to Stage 2

Draggable/resizable window manager, persistent status bar (CPU/RAM/uptime), 404 kernel panic route, EmailJS/Resend backend, additional theming, screenshots for projects.

## Open items (won't block build; using placeholders)

- Resume PDF URL — button will link to `/resume.pdf` placeholder until you upload one.
- Birth date for uptime widget — needed in Stage 2.
- Contact email — using `raheem.amer@…` placeholder; confirm exact address.
