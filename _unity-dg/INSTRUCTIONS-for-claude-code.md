# Instructions for Claude Code — publish & wire up Unity UI

You are helping set up the **Unity design system** (tokens + React components) as a shared, versioned
source of truth consumed by a separate Next.js app. There are two jobs:
**(A)** publish this folder as a GitHub repo, **(B)** wire it into the Next.js project.
Do them in order. Ask before doing anything destructive.

Owner/account: **WebDevCaveman**. Repo name: **unity-design-tokens**. npm package name: **@webdevcaveman/unity-ui**.

---

## Job A — Publish this folder as a private GitHub repo

You are currently inside the `unity-design-tokens/` folder (contains `package.json`,
`dist/globals.css`, `dist/tokens.css`, `src/` with the React components, `README.md`,
`CHANGELOG.md`, `.gitignore`).

1. Create an **empty private** repo `unity-design-tokens` under the `WebDevCaveman`
   account (via `gh repo create WebDevCaveman/unity-design-tokens --private` if the
   GitHub CLI is available, otherwise create it on github.com — do NOT let it add a
   README/license/gitignore, the folder already has them).

2. Initialize and push:
   ```bash
   git init
   git add .
   git commit -m "Unity UI v2.0.0"
   git branch -M main
   git remote add origin git@github.com:WebDevCaveman/unity-design-tokens.git
   git push -u origin main
   ```

3. Tag the release so consumers can pin to it:
   ```bash
   git tag v2.0.0
   git push --tags
   ```

Confirm the repo exists and `main` + tag `v2.0.0` are pushed before moving on.

---

## Job B — Consume the tokens in the Next.js app

Switch to the Next.js project directory (ask the user for the path if you don't
know it). It uses **Next.js + Tailwind CSS v4**.

1. Install the package straight from the private GitHub repo (pin to the tag):
   ```bash
   npm install github:WebDevCaveman/unity-design-tokens#v2.0.0
   ```
   > Requires the machine to have git+SSH access to the private repo. If npm can't
   > authenticate, either use an HTTPS URL with a token, or add it as a git submodule
   > instead — ask the user which they prefer.

2. Ensure Tailwind v4 is set up. `postcss.config.mjs`:
   ```js
   export default { plugins: { "@tailwindcss/postcss": {} } };
   ```

3. Enable the components. The package ships `.tsx` source, so Next.js must transpile it —
   in `next.config.ts`:
   ```ts
   const nextConfig = { transpilePackages: ["@webdevcaveman/unity-ui"] };
   export default nextConfig;
   ```
   and Tailwind must scan the package so its classes aren't purged — add this to
   `app/globals.css` right after the token import:
   ```css
   @source "../node_modules/@webdevcaveman/unity-ui/src";
   ```
   Then verify a component renders, e.g. `<Pagination page={3} totalPages={12} onPageChange={setPage} />`
   (see the package README for the full component list and props).

4. In `app/globals.css`, import the token entry as the FIRST line (it already
   contains `@import "tailwindcss"` + the `@theme` mapping + all values):
   ```css
   @import "@webdevcaveman/unity-ui/globals.css";
   ```
   Do NOT also `@import "tailwindcss"` yourself — the package's entry already does it.
   If your build can't resolve a CSS import from node_modules, instead copy
   `node_modules/@webdevcaveman/unity-ui/dist/globals.css` into
   `app/globals.css` and re-copy on each update (less clean, but always works).

5. Wire the fonts with `next/font` (Poppins = display/headings, Inter = body) in
   `app/layout.tsx`, and set `data-theme` on `<html>`:
   ```tsx
   import { Poppins, Inter } from "next/font/google";
   const poppins = Poppins({ subsets:["latin"], weight:["500","600","700"], variable:"--font-poppins" });
   const inter   = Inter({ subsets:["latin"], weight:["400","500","600","700"], variable:"--font-inter" });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" data-theme="light" className={`${poppins.variable} ${inter.variable}`}>
         <body>{children}</body>
       </html>
     );
   }
   ```
   Then, in the token CSS you imported, make the two `--font-*` lines (under
   `:root, [data-theme="light"]`) point at those vars:
   ```css
   --font-display: var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
   --font-sans: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
   ```
   (If you imported from node_modules and can't edit it, set these two vars in your
   own `app/globals.css` AFTER the import — later declarations win.)

6. Add a theme toggle that flips `data-theme` on `<html>` and persists to
   `localStorage` (restore on mount; optionally inline a pre-paint script in `<head>`
   to avoid a flash). Set the attribute on `<html>` ONLY — never on a second wrapper.

7. Verify: `bg-surface`, `text-brand`, `text-h1`, `shadow-sm`, `rounded-[18px]`
   render, and toggling `data-theme` between `light`/`dark` flips colors.

---

## Ongoing sync loop (after both jobs)

The Unity **Styleguide project** is the single source of truth. When tokens change
there, its maintainer re-exports `dist/globals.css` + `dist/tokens.css` and bumps
the version. To ship an update:

**In this tokens repo:**
```bash
# after replacing dist/* and bumping "version" in package.json + adding a CHANGELOG entry
git commit -am "tokens: <what changed>"
git tag vX.Y.Z
git push --tags && git push
```

**In the Next.js app:**
```bash
npm install github:WebDevCaveman/unity-design-tokens#vX.Y.Z   # bump the pinned tag
```

Semver: **patch** = value tweaks (safe), **minor** = new tokens (safe),
**major** = renamed/removed token (check components). See `CHANGELOG.md`.

> Tokens AND approved components sync through this package. **Pages do not** — screens
> (dashboard, 404, …) are delivered as copyable examples and composed in the app from
> packaged components.
