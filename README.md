# MHS3 RPS Dex

A Monster Hunter Stories 3 reference app for browsing and filtering monsters by attack type (Power / Speed / Technical), element, and rank.

**Live:** [mhs3-rps-dex.vercel.app](https://mhs3-rps-dex.vercel.app)

## Features

- Browse 50+ monsters with color-coded attack types (red = Power, blue = Speed, green = Technical)
- Filter by name search, default attack type, enraged attack type, element, element weakness, and rank
- Combinable filters: AND across dimensions, OR within each dimension
- Responsive grid layout (1-5 columns depending on viewport)
- Server-side rendered for fast initial load

## Tech Stack

- [React Router 7](https://reactrouter.com/) (framework mode with SSR)
- [React 19](https://react.dev/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [Biome](https://biomejs.dev/) for linting and formatting
- [Vitest](https://vitest.dev/) for testing
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

```bash
pnpm install
pnpm dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Start dev server with HMR           |
| `pnpm build`     | Production build                     |
| `pnpm start`     | Serve the production build           |
| `pnpm typecheck` | Run type-checking                    |
| `pnpm lint`      | Check linting with Biome             |
| `pnpm lint:fix`  | Auto-fix lint issues                 |
| `pnpm test`      | Run tests once                       |
| `pnpm test:watch`| Run tests in watch mode              |

## Project Structure

```
app/
  data/
    types.ts            # AttackType, Element enums and Monster type
    monsters.ts         # Static monster dataset
    filterMonsters.ts   # Pure filter/sort logic
  components/
    FilterBar.tsx       # Search + toggle chip filters
    MonsterCard.tsx     # Individual monster display card
    AttackTypeIcon.tsx  # RPS type icons and labels
  routes/
    home.tsx            # Main (and only) page
  root.tsx              # App shell
```
