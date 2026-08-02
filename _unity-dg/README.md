# @webdevcaveman/unity-ui

The **Unity** design system as a consumable package: design tokens (colors, typography,
shadows, focus ring — light + dark) **and** React components, for Next.js + Tailwind v4.

- `dist/globals.css` — Tailwind **v4** entry (`@import "tailwindcss"` + `@theme` token
  mapping + all values). Use this in a Next.js/Tailwind app.
- `dist/tokens.css` — framework-agnostic CSS variables only (no Tailwind).
- `src/` — React components in **TypeScript source** (no build step; the app transpiles them).

> **Source of truth:** everything here is generated/ported from the Unity Styleguide design
> project. Do **not** hand-edit in a consuming app — change the design in the styleguide,
> re-export, bump the version, pull. See `CHANGELOG.md`.

**Dependencies:** `clsx` only. React 18+ as a peer.

---

## One-time setup: publish this as a repo

From this folder:

```bash
git init
git add .
git commit -m "Unity UI v2.0.0"
git branch -M main
git remote add origin git@github.com:WebDevCaveman/unity-design-tokens.git
git push -u origin main
git tag v2.0.0 && git push --tags
```

(Create the empty `unity-design-tokens` repo on GitHub first. The repo name stays as-is;
only the npm package name is `@webdevcaveman/unity-ui`.)

---

## Consume it in the Next.js app

Private repo → install straight from GitHub, pinned to a tag:

```bash
npm install github:WebDevCaveman/unity-design-tokens#v2.0.0
```

**1. Tokens** — import the Tailwind entry once, as the first line of `app/globals.css`:

```css
@import "@webdevcaveman/unity-ui/globals.css";
```

Don't `@import "tailwindcss"` yourself — the entry already does it. Font wiring
(`next/font`) and the `data-theme` toggle are documented in the CSS header and in the
styleguide handoff README.

**2. Components** — the package ships `.tsx` source, so Next.js must transpile it.
In `next.config.ts`:

```ts
const nextConfig = { transpilePackages: ["@webdevcaveman/unity-ui"] };
export default nextConfig;
```

**3. Tailwind must scan the package** so component classes aren't purged. In `app/globals.css`,
after the token import:

```css
@source "../node_modules/@webdevcaveman/unity-ui/src";
```

---

## Components

### `Pagination`

```tsx
"use client";
import { useState } from "react";
import { Pagination } from "@webdevcaveman/unity-ui";

export function Example() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} totalPages={12} onPageChange={setPage} />;
}
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `page` | `number` | — | 1-based |
| `totalPages` | `number` | — | |
| `onPageChange` | `(page: number) => void` | — | |
| `variant` | `"numbered" \| "compact"` | `"numbered"` | compact = two circle buttons + label |
| `size` | `"md" \| "sm"` | `"md"` | 40px / 36px controls; ignored by `compact` |
| `siblingCount` | `number` | `1` | pages shown each side of the current one |
| `showLabel` | `boolean` | `true` for compact | "Page N of M" caption |
| `formatLabel` | `(page, totalPages) => string` | `Page N of M` | |

Long ranges collapse to an ellipsis; boundary arrows render disabled.

### `TablePagination`

```tsx
const [page, setPage] = useState(2);
const [rows, setRows] = useState(10);

<TablePagination
  page={page}
  totalItems={128}
  rowsPerPage={rows}
  onPageChange={setPage}
  onRowsPerPageChange={(r) => { setRows(r); setPage(1); }}
/>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `page` / `totalItems` / `rowsPerPage` | `number` | — | page count is derived |
| `onPageChange` | `(page: number) => void` | — | |
| `onRowsPerPageChange` | `(rows: number) => void` | — | omit to hide the rows selector |
| `rowsOptions` | `number[]` | `[10, 25, 50]` | |
| `formatRange` | `(from, to, total) => string` | `Showing X–Y of Z results` | |

### Also exported

`PaginationArrow`, `ChevronLeftIcon`, `ChevronRightIcon`, and the pure helpers
`getPageRange(page, totalPages, siblingCount?)` / `clampPage(page, totalPages)`.

---

## The sync loop (styleguide → repo → app)

1. **Change design** in the Unity Styleguide project (token or component).
2. **Re-export / port** — regenerate `dist/*` for tokens; port approved components into `src/`.
3. **Version + commit**: bump `version` in `package.json`, add a `CHANGELOG.md` entry, then:
   ```bash
   git commit -am "feat: <what changed>"
   git tag vX.Y.Z && git push --tags && git push
   ```
4. **Pull in the app**:
   ```bash
   npm install github:WebDevCaveman/unity-design-tokens#vX.Y.Z
   ```

### Versioning (semver)
- **patch** — tweaked token values or component internals. Safe drop-in.
- **minor** — new tokens or new components. Safe drop-in.
- **major** — renamed/removed a token, prop, or export. Check consumers.

---

## What's in the package vs. what isn't

- **In the package:** tokens and reusable components, ported from the styleguide after approval.
- **Not in the package:** pages. Screens (dashboard, 404, …) are delivered as **copyable
  examples** — they're app-specific, so you compose them in the app from packaged components.
