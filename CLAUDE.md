# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Production build
pnpm typecheck    # Type-check (runs react-router typegen first)
pnpm lint         # Biome lint check
pnpm lint:fix     # Biome lint with auto-fix
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
```

To run a single test file:
```bash
pnpm vitest run app/data/filterMonsters.test.ts
```

## Architecture

**MHS3 RPS Dex** — a Monster Hunter Stories 3 reference app for browsing and filtering monsters by attack type, element, and rank.

### Stack
- **React Router 7** with SSR enabled (framework mode, not library mode)
- **TailwindCSS 4** via Vite plugin
- **Biome** for linting/formatting (tabs, sorted Tailwind classes enforced)
- **Vitest** with node environment

### App Structure

**Data layer** (`app/data/`):
- `types.ts` — `AttackType` enum (Power/Speed/Technical), `Element` enum, `Monster` type
- `monsters.ts` — static array of ~50+ monster objects
- `filterMonsters.ts` — pure filter function; AND logic across filter dimensions, OR logic within each dimension; sorts by rank asc then alphabetically

**UI layer**:
- `app/routes/home.tsx` — single main page: RPS legend, FilterBar, responsive MonsterCard grid (2→5 cols)
- `app/components/FilterBar.tsx` — search input + toggle chips for 5 filter dimensions (default attack, enraged attack, rank, element, element weakness); shows result count and clear button

**Routing**: single index route. `app/routes.ts` maps `/` → `routes/home.tsx`.

### Path Alias
`~/*` resolves to `./app/*` (configured in tsconfig and Vite).

### Key Design Decisions
- Attack types are color-coded: red=Power, blue=Speed, green=Technical
- Filters use AND across dimensions, OR within — e.g., selecting Power+Speed shows monsters with Power OR Speed as default type, but must also match any other active filters
- SSR is enabled; the app is purely read-only data so there are no loaders/actions beyond the default route
