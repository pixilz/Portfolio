# zoeclarno.com

My personal site. Written as Vue single-file components that [Astro](https://astro.build) renders to plain HTML at build time — no client-side framework, no islands, no trackers, no web fonts. Content (stats, experience, quotes) lives in `src/data/*.json` and is pulled in at compile time. The result is one ~30 KB page plus a résumé PDF.

The only JavaScript in the browser is a small hand-written inline script for the theme toggle, the rotating quotes, and the footer year.

## Commands

| Command        | What it does                       |
| -------------- | ---------------------------------- |
| `pnpm install` | Install dependencies               |
| `pnpm dev`     | Dev server at `localhost:4321`     |
| `pnpm build`   | Build the static site into `dist/` |
| `pnpm preview` | Serve the built output locally     |

Deploys to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
