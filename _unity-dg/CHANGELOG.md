# Unity tokens — changelog

Version stamp lives at the top of `globals.css`. Bump it whenever tokens change here,
and note what moved so the Next.js side knows if components need a look.

Semver guide:
- **patch** (x.x.+1) — tweaked existing token values (e.g. adjusted a grey). No API change.
- **minor** (x.+1.0) — added new tokens / utilities. Existing ones unchanged.
- **major** (+1.0.0) — renamed or removed a token. Consuming components may break.

---

## 2.0.0 — 2026-07-28
**Package renamed** `@webdevcaveman/unity-design-tokens` → **`@webdevcaveman/unity-ui`** (it now ships
components, not only tokens). Update the import specifier in consuming apps.

Added — first ported components (`src/`, shipped as TypeScript source):
- `Pagination` — `variant="numbered" | "compact"`, `size="md" | "sm"`, `siblingCount`, `showLabel`, `formatLabel`
- `TablePagination` — range text, optional rows-per-page selector, `N / M` counter
- `getPageRange` / `clampPage` helpers, `PaginationArrow`, chevron icons

Requires `clsx` (dependency) and, in Next.js, `transpilePackages: ["@webdevcaveman/unity-ui"]`.
Tokens unchanged.

## 1.0.0 — 2026-07-03
Initial export. Full Unity token set (light + dark): semantic surfaces/text/border,
brand (violet ramp), accents, feedback, risk levels, primitive ramps (primary/secondary/neutral),
type scale (d1→caption-2, buttons), shadows, focus ring. Tailwind v4 `@theme` mapping included.
