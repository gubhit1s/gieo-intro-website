# Quickstart & Validation: Gieo Landing Site

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

How to scaffold, run and **prove** the feature works. The validation scenarios below map one-to-one onto the spec's success criteria — passing them all is the definition of done.

---

## Prerequisites

| Requirement | Verified on this machine (2026-10-09) |
|---|---|
| Node.js ≥ 22.12 (Astro 7 engine requirement) | ✅ v24.14.1 |
| npm ≥ 9.6.5 | ✅ 11.11.0 |
| git | ✅ 2.53.0.windows.2 |

> **Note**: this directory is **not yet a git repository**. Run `git init` before the first commit so the work is recoverable.

---

## Setup

Run from the repository root. These commands create the project in place.

```bash
# 1. Scaffold a minimal Astro project into the current directory
npm create astro@latest -- --template minimal --typescript strict --no-git --skip-houston .

# 2. Framework and styling integrations
npx astro add react --yes
npx astro add tailwind --yes

# 3. Animation and self-hosted Vietnamese-capable fonts
npm install motion@14 @fontsource-variable/lora @fontsource/be-vietnam-pro

# 4. Test tooling
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test @axe-core/playwright
npx playwright install chromium firefox webkit

# 5. Lint and format
npm install -D eslint typescript-eslint eslint-plugin-jsx-a11y eslint-plugin-astro astro-eslint-parser prettier prettier-plugin-astro
```

**Verified versions** (npm registry, 2026-10-09): astro 7.3.8 · react / react-dom 19.3.0 · @astrojs/react 7.0.1 · motion 14.0.0 · tailwindcss + @tailwindcss/vite 4.3.3 · typescript 7.0.2 · vitest 5.0.3 · @playwright/test 1.64.0 · @axe-core/playwright 4.13.0 · eslint 10.12.0

> `astro add react` installs the `oxc-transform-react` peer automatically. If it reports a peer warning, install it explicitly: `npm install -D oxc-transform-react`.

### Scripts to add to `package.json`

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check && tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "validate": "npm run check && npm run lint && npm run test && npm run build && npm run test:e2e"
  }
}
```

`npm run validate` is the single gate. It must pass before the feature is considered complete.

---

## Running locally

```bash
npm run dev      # http://localhost:4321
npm run build    # emits dist/
npm run preview  # serves dist/ — the real static output
```

**Always validate against `preview`, not `dev`.** The dev server injects HMR client code and does not reflect the hydration boundaries or the static-HTML guarantee that the production build produces. Several scenarios below are meaningless against `dev`.

---

## Validation scenarios

Each scenario states the criterion, how to run it, and what counts as a pass.

### V-1 — Static HTML carries all content *(spec edge case; the foundation of SC-002)*

The single most important check: it verifies the architectural claim behind the whole Astro-islands decision in [plan.md](./plan.md).

```bash
npm run build
grep -c "Chinh phục học sinh giỏi" dist/index.html        # expect >= 1
grep -c "Nguyễn Thị Hà Giang"       dist/index.html        # expect >= 1
grep -c "Nguyễn Hồng Bảo Quyên"     dist/index.html        # expect >= 1
grep -c "kỹ năng phản đề"           dist/index.html        # expect >= 1
grep -c "Những tài liệu của chúng mình" dist/index.html     # expect >= 1
```

**Pass**: every grep returns ≥ 1 — the text is in the HTML, before any JavaScript runs.
**Fail**: any returns 0 — a section became a client-rendered island and the edge case is broken.

Then disable JavaScript entirely in the browser and load `npm run preview`. All five sections must be readable, with the CTA visible. Only animation is absent.

### V-2 — Content accuracy *(SC-004, FR-010, FR-011, FR-018)*

```bash
npm run test
```

**Pass**: `tests/unit/content.test.ts` passes every assertion in [contracts/content-schema.md](./contracts/content-schema.md) § Test contract — including the `U+FFFD` replacement-character check that catches Vietnamese encoding corruption.
**Fail**: any achievement, outcome or heading differs from the spec by even one character or diacritic.

### V-3 — Responsive integrity *(SC-003, FR-003)*

```bash
npm run test:e2e -- responsive
```

Asserts at 320, 768, 1280 and 1920 px, and at 200% zoom:

- `document.documentElement.scrollWidth <= window.innerWidth` — no horizontal scroll
- no text node is clipped by its container
- the two team cards stack at narrow widths with all achievements visible
- no decorative SVG overlaps a text bounding box

**Pass**: all four widths plus the zoom case clean.

### V-4 — Accessibility *(SC-005, FR-028, FR-031)*

```bash
npm run test:e2e -- accessibility
```

Runs `@axe-core/playwright` over the full page and walks the keyboard tab order.

**Pass**: zero violations at `critical` or `serious` impact — including `color-contrast`, which is the gate on the R-004 palette. Every interactive element reachable by `Tab` with a visible focus indicator. Exactly one `<h1>`, no skipped heading levels.
**Fail on contrast**: darken the *text* token in `global.css`. Do not suppress the rule — FR-028 is a requirement, not a preference.

### V-5 — Reduced motion *(SC-006, FR-030)*

```bash
npm run test:e2e -- reduced-motion
```

Playwright emulates `prefers-reduced-motion: reduce`.

**Pass**: 100% of content visible and readable immediately; no element has a running animation or transition; no element sits at `opacity: 0` or an off-screen transform.

### V-6 — CTA inertness *(SC-010, FR-034, FR-035)*

```bash
npm run test:e2e -- interactions
```

**Pass**, all of:

- the CTA is a `<button type="button">`, **not** disabled, not an anchor
- it is keyboard-focusable and shows a visible focus ring
- it is announced as a button with its Vietnamese label
- clicking leaves `window.location.href` unchanged and `window.scrollY` unchanged
- clicking ten times produces no console error and no DOM change

### V-7 — Social links *(SC-008, FR-021, FR-022, FR-023)*

Same spec file as V-6.

**Pass**: exactly two links; `href` values match `site.social`; both carry `target="_blank"` and `rel="noopener noreferrer"`; each has a non-empty accessible name; icons are `aria-hidden`; no `href="#"` or empty `href` anywhere on the page.

### V-8 — Load performance *(SC-002)*

Manual, in Chrome DevTools against `npm run preview`:

1. Network → throttle to **Fast 4G**; Performance → CPU **4× slowdown** (approximates a mid-range phone).
2. Record a reload.

**Pass**: First Contentful Paint < 2s with the brand name and headline painted; no layout shift as fonts swap in (CLS < 0.1); scrolling the full page holds ~60fps with no long task over 50ms.

If FCP misses, check in this order: font preload weights, number of hydrated islands, then total JS. Adding a fifth island is the most likely regression — see [contracts/ui-contract.md](./contracts/ui-contract.md) § Hydration boundaries.

### V-9 — Vietnamese diacritic rendering *(FR-012, diacritics edge case)*

Manual, and genuinely requires human eyes — automated text assertions pass on correct characters rendered badly.

Against `npm run preview`, inspect at 320px, 768px and 1280px, and at 200% zoom:

- stacked diacritics (**ế, ữ, ộ, ỹ, ặ**) are fully visible, not clipped by `line-height` or colliding with the line above
- no glyph falls back to a different font mid-word — a visible weight or shape shift inside a single word means the Vietnamese subset did not load
- check the dense achievement lists specifically; they are the longest Vietnamese runs on the page

### V-10 — Full gate

```bash
npm run validate
```

**Pass**: type-check, lint, unit tests, build and e2e all green.

---

## Coverage map

| Criterion | Scenario |
|---|---|
| SC-001 comprehension in 30s | Not automatable — unmoderated user test, post-launch |
| SC-002 content in 2s on 4G | V-8 (foundation verified by V-1) |
| SC-003 responsive 320–1920 + 200% zoom | V-3 |
| SC-004 100% content accuracy | V-2, V-9 |
| SC-005 a11y audit + keyboard | V-4 |
| SC-006 reduced motion | V-5 |
| SC-007 60% scroll past hero | **Not covered** — see below |
| SC-008 links resolve | V-7 |
| SC-009 one-location edits | V-2 + the change table in [contracts/content-schema.md](./contracts/content-schema.md) |
| SC-010 CTA accessible and inert | V-6 |

**Two criteria cannot be verified by this build**, and should not be reported as passing:

- **SC-001** (comprehension) needs real people. Run it once there is a deployed URL.
- **SC-007** (60% scroll-through) needs analytics instrumentation, which the spec places out of scope. It becomes measurable only after a host and an analytics tool are chosen. Flagging it rather than quietly dropping it: the criterion is sound, the measurement simply does not exist yet.

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| V-1 greps return 0 | A section was authored as a React island instead of static `.astro`. Check `src/sections/` for `client:*` directives. |
| Diacritics render as boxes or `U+FFFD` | Font subset missing `vietnamese`, or a file saved as non-UTF-8. Check the editor's encoding on `site.ts`. |
| Content invisible until scrolled, then appears | A CSS static `opacity: 0` leaked in. Initial hidden state must be applied by Motion after hydration only — see [contracts/ui-contract.md](./contracts/ui-contract.md) § Motion contract. |
| axe `color-contrast` failures | A text element is using a `sprout-50`…`sprout-400` token. Move it to `sprout-600`+ or `--color-ink`. |
| Hydration mismatch warnings in console | An island is computing something non-deterministic at render (date, random, `window`). Islands must render identically on server and client. |
| Tailwind classes not applying in `.tsx` | The Vite plugin's content detection missed the file — confirm `@tailwindcss/vite` is registered in `astro.config.mjs`. |
