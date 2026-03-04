# Architecture and Setup Guide

## 1) Stack used (short + clear)

- **Framework:** Remix (running on Vite) for routing, loaders/actions, and SSR-friendly React rendering.
- **Runtime/Hosting:** Remix app deployed on Vercel (Node runtime), with legacy Cloudflare config still present in repo.
- **UI:** React 18 + CSS Modules + custom reusable components in `app/components`.
- **Animation/3D:** Framer Motion + Three.js (`three-stdlib`) + GLSL shaders.
- **Content:** MDX for article pages with frontmatter, syntax highlighting, slugged headings, and image sizing plugins.
- **Email backend:** AWS SES via `@aws-sdk/client-ses` (contact form action).
- **Developer UX:** Storybook for isolated UI component development.

## 2) How this site is built from the ground up

1. **Request enters Remix app**
   - Root route (`app/root.jsx`) loads shared document shell, canonical URL logic, and theme from cookie session.

2. **Page routing**
   - `vite.config.js` defines the index route (`/`) to `app/routes/home/route.js`.
   - Route files export page components and often route `meta`, `loader`, and/or `action`.

3. **Layout + composition**
   - Global app shell includes theme provider, navbar, progress indicator, and `<Outlet />` for active route content.
   - Pages compose shared components from `app/components` and layout wrappers from `app/layouts`.

4. **Data flow patterns**
   - **Loader**: server-side read logic (e.g., article metadata, theme cookie).
   - **Action**: mutation logic (e.g., set theme cookie, send contact email).
   - **Client hooks/components**: animation and interaction state (intersection observers, transitions, form state).

5. **Articles pipeline**
   - MDX files under `app/routes/articles.*.mdx` become route content.
   - Post index uses `import.meta.glob` to discover posts and compute reading time.

6. **Build + deploy pipeline**
   - `npm run build` runs Remix Vite build.
   - `vercel.json` configures Vercel build/install commands.
   - Deploy from Vercel dashboard or `npm run deploy:vercel`.

## 3) Core folder map

- `app/root.jsx` → global HTML shell, shared providers, canonical/meta setup.
- `app/routes` → route-level UI + server handlers (loaders/actions).
- `app/components` → reusable presentational/UI primitives.
- `app/layouts` → larger page structures (navbar, post wrapper, error UI, etc.).
- `app/hooks` / `app/utils` → shared behavior and helper functions.
- `functions/[[path]].js` → Cloudflare Pages function adapter for Remix.
- `scripts/*.cjs` → development helpers (`dev` banner, Draco decoder copy).
- `public` + `app/assets` → static/media resources.

## 4) VS Code-friendly setup (including dependencies)

### Prerequisites

- Node.js **24.0.0+** (project engine requirement)
- npm **9.6.3+**
- Git

### Recommended one-time VS Code setup

```bash
# From repo root
code .
```

Install these VS Code extensions (recommended):

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- MDX (`unifiedjs.vscode-mdx`)
- Storybook (`storybookjs.storybook-vscode`)

### Project setup commands

```bash
# 1) Use correct Node version (if using nvm)
nvm install 20
nvm use 20

# 2) Install dependencies
npm install

# 3) Run app locally (Vite + Remix)
npm run dev

# 4) Optional: run Storybook
npm run dev:storybook
```

### Production-style checks

```bash
# Build production assets
npm run build

# Preview Node server output locally
npm run start
```

### Environment variables for contact form

For local contact form testing (and Vercel production), configure variables used by `contact` action:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `EMAIL`
- `FROM_EMAIL`

These should be provided in local/dev environment and in Vercel Project Settings for production.
