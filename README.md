# DEV PORTFOLIO — FRONT-END

**A developer portfolio with a projects showcase and a blog, served from a headless CMS.**
Server-rendered React Router app that pulls projects and posts from Strapi, renders post
bodies from Markdown, and ships media straight from Cloudinary. Filtering, search and
pagination all happen client-side, so browsing never waits on the network.

> *Built on a design system, not on defaults.*

**API:** [react-portfolio-backend-pld8.onrender.com](https://react-portfolio-backend-pld8.onrender.com)
· **CMS repo:** [react-portfolio-backend](https://github.com/WebDevCaveman/react-portfolio-backend)

*Portfolio project. Content is authored in Strapi; images are served by Cloudinary.*

---

## The idea

Every screen is composed from **Unity** design tokens — colours, type scale, shadows and the
focus ring come from one source of truth, with light and dark themes driven by a single
`data-theme` attribute. Nothing is styled ad hoc: a card on the blog and a card in the
projects grid share the same radius, the same surface, the same hover lift.

The content layer is deliberately thin. Loaders fetch from Strapi on the server, map the
response onto flat types, and hand plain objects to components — no client-side data library,
no global store.

## Pages

Home (featured projects + latest posts) · Projects with category filter and pagination ·
Project detail · Blog with live search and pagination · Post detail rendered from Markdown ·
About · Contact.

## Built with

**React Router 8 in framework mode** — file-based routes, server loaders, typed route modules.

- **React 19** + **TypeScript**, strict, with types generated per route (`react-router typegen`).
- **Tailwind CSS 4** wired to the Unity token set through `@theme inline` — semantic utilities
  like `bg-surface`, `text-brand`, `text-h4`, `ring-focus` instead of raw values.
- **Motion** for grid transitions: `AnimatePresence mode="popLayout"` so cards reflow smoothly
  when a filter or page changes.
- **react-markdown** for post bodies, styled with Tailwind variant selectors rather than a
  typography plugin.
- Accessibility kept in the base layer: semantic landmarks, visible focus rings, `role="status"`
  on async feedback, alt text on every image.

## Run it locally

Needs Node 20+ and a reachable Strapi instance.

```bash
npm install
echo "VITE_API_URL=https://react-portfolio-backend-pld8.onrender.com/api" > .env
npm run dev
# then open http://localhost:5173
```

Point `VITE_API_URL` at `http://localhost:1337/api` to develop against a local CMS. Vite reads
`VITE_*` at startup — restart the dev server after changing it.

| Script | What it does |
|---|---|
| `npm run dev` | dev server with HMR |
| `npm run build` | production build (client + server bundles) |
| `npm start` | serve the production build |
| `npm run typecheck` | regenerate route types, then `tsc` |

## Structure

```
app/
  root.tsx           # document shell, theme attribute
  routes.ts          # route table: layouts + nested routes
  routes/            # one folder per page, loader + component together
    layouts/         # home layout and main layout
  components/        # cards, filters, pagination, icon set
  types.ts           # Project / PostMeta + raw Strapi shapes
  app.css            # Unity tokens exposed to Tailwind via @theme
public/              # static assets
```
