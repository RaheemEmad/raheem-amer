# RaheemOS — Raheem Amer | Google Cloud Engineer

An interactive terminal-based portfolio for Raheem Amer, a Google Cloud Engineer and full-stack developer. Visitors can "SSH into" a terminal interface to explore work, skills, and experience through an immersive command-line experience.

## Overview

RaheemOS transforms a traditional portfolio into an interactive terminal experience. Rather than scrolling through a standard website, users engage with a command-line interface that reveals information through terminal commands. Type `help` to explore available commands.

## Tech Stack

- **Language(s):** TypeScript (97.3%), CSS (2.1%), JavaScript (0.6%)
- **Framework / Runtime:** TanStack Start 1.168 + React 19 + Vite
- **Routing:** File-based routing with TanStack React Router
- **UI Components:** Radix UI + shadcn/ui component library (40+ primitives)
- **Data Fetching:** React Query (TanStack React Query)
- **Styling:** Tailwind CSS 4 + custom CSS
- **Forms:** React Hook Form with Zod validation
- **Utilities:** date-fns, recharts, lucide-react icons

## Project Structure

```
src/
├── routes/                    # File-based routing
│   ├── __root.tsx            # App shell, layout, metadata, error boundaries
│   ├── index.tsx             # Home page (boot sequence or terminal)
│   └── README.md             # Routing conventions
├── components/
│   ├── terminal/             # Core terminal experience
│   │   ├── Terminal.tsx       # Main terminal interface
│   │   ├── BootSequence.tsx   # Boot animation on first load
│   │   └── Confetti.tsx       # Celebratory effects
│   └── ui/                    # Radix UI + shadcn/ui components (40+)
├── lib/
│   ├── commands.tsx           # Terminal command handlers
│   ├── content.ts             # Portfolio content (bio, projects, skills)
│   ├── error-capture.ts       # Error logging
│   ├── error-page.ts          # Server error rendering
│   ├── lovable-error-reporting.ts # Lovable integration
│   └── utils.ts               # Helpers
├── styles.css                 # Global styling
├── router.tsx                 # Router setup with QueryClient
├── server.ts                  # Server entry point
└── start.ts                   # Error handling middleware
```

## How It Works

1. **Boot Sequence:** On first visit, users see an animated startup sequence stored in session storage
2. **Terminal Interface:** After boot, the main terminal loads and accepts user input
3. **Command Processing:** Commands are parsed and routed to handlers in `lib/commands.tsx`
4. **Content Rendering:** Portfolio content is fetched from `lib/content.ts` and displayed in the terminal
5. **Data Layer:** React Query manages any async data fetching

## Quick Start

### Prerequisites

- Node.js or Bun runtime
- Bun package manager (recommended)

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server (hot reload enabled)
bun run dev
```

The app will be available at `http://localhost:5173` by default.

### Production Build

```bash
# Build for production
bun run build

# Preview production build locally
bun run preview
```

### Code Quality

```bash
# Lint code
bun run lint

# Format code
bun run format
```

## Available Commands

The terminal supports various commands to explore the portfolio. Type `help` in the terminal to see all available commands.

## Key Features

- **Interactive Terminal:** Full command-line interface experience
- **Boot Animation:** Animated startup sequence on first visit
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Server-Side Rendering:** Built with TanStack Start for SSR support
- **Error Handling:** Comprehensive error boundaries and recovery
- **Accessibility:** Radix UI primitives ensure proper ARIA support
- **Dark Theme:** Styled with a terminal-inspired dark color scheme

## Configuration Files

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization (via `@tailwindcss/vite`)
- `components.json` - shadcn/ui component configuration
- `.prettierrc` - Code formatting rules
- `eslint.config.js` - Linting rules
- `bunfig.toml` - Bun runtime configuration

## Metadata & SEO

The app includes structured data (JSON-LD) for:
- Person schema with job title
- Open Graph tags for social sharing
- Twitter card metadata
- Custom theme color and favicon

## Important Notes

This project is connected to [Lovable](https://lovable.dev). Avoid rewriting published git history (force pushing, rebasing, or amending commits that are already pushed) as it rewrites history on Lovable's side and may cause loss of project history.

Commits pushed to the connected branch sync back to Lovable and show up in the editor, so keep the branch in a working state.

## Learn More

- [TanStack Start Documentation](https://tanstack.com/start/latest)
- [TanStack React Router](https://tanstack.com/router/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Author

**Raheem Amer**
- Google Cloud Technical Support Engineer
- DevOps & Full-Stack Developer
- GitHub: [@RaheemEmad](https://github.com/RaheemEmad), [@RaheemAmer](https://github.com/RaheemAmer)

---

Visit [RaheemOS](https://github.com/RaheemEmad/raheem-amer) to explore the interactive portfolio.
