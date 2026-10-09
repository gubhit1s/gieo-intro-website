# Phase 0 Research: Gieo Landing Site

**Date**: 2026-10-09
**Feature**: [spec.md](./spec.md)
**Status**: All NEEDS CLARIFICATION resolved

All versions below were verified against the npm registry on 2026-10-09 from this machine, not recalled from memory. Local toolchain confirmed: Node v24.14.1, npm 11.11.0, git 2.53.0.

---

## R-001: Rendering architecture — static HTML vs. client-rendered SPA

**Decision**: **Astro 7.3.8 with React 19.3.0 islands.** The page ships as pre-rendered static HTML; only components that animate or respond to input are hydrated as React islands.

**Rationale**:

Three facts in the spec drive this together:

1. The spec's edge case *"Scripting unavailable or still loading — all text content must still be present and readable"* cannot be met by a pure client-rendered React app. Before the JS bundle executes, a Vite SPA serves an empty `<div id="root">`. There is no amount of careful animation design that fixes that.
2. **SC-002** requires meaningful content within 2 seconds on a mid-range phone over 4G.
3. **User Story 1** states the dominant traffic source is *"a link shared on social media"* — meaning Facebook and TikTok in-app webviews, which are measurably slower at JS parse/execute than the standalone mobile browsers people usually benchmark against.

Static HTML satisfies all three with no cleverness: the headline, every achievement, and every course outcome are in the initial HTML response. Animation then layers on top as progressive enhancement, which is exactly the relationship **FR-030** (reduced motion) and the edge cases already describe.

Astro is built on Vite 8.3.1 and compiles `.astro` components at build time, so this remains a modern Vite + React stack rather than an exotic one. React islands use ordinary React 19 and ordinary Motion — nothing about writing an animated component changes.

**Alternatives considered**:

| Option | Why rejected |
|--------|--------------|
| Vite 8 + React 19 SPA | Simplest mental model and the most flexible for cross-section animation, but fails the "scripting unavailable" edge case outright and is weakest exactly where this site's traffic lands (social in-app webviews). |
| Next.js 16.4.0 static export | Satisfies the static-HTML requirement, but App Router and RSC bring a large conceptual surface for a site with one route, no data fetching, and no backend. Cost without a matching benefit. |
| Vite + `vite-react-ssg` 0.9.2 | Would give SPA simplicity plus pre-rendering, but a 0.x package on the critical build path for a stack this new (Vite 8, React 19) is an avoidable risk. |

**Accepted trade-off**: Islands are independent React roots, so animation state does not flow between them for free. If a future design needs one scroll position to choreograph several sections at once, the fix is to wrap those sections in a single `client:load` island — the component code moves, it does not get rewritten. This is recorded in [plan.md](./plan.md) under Complexity Tracking.

---

## R-002: Animation library

**Decision**: **Motion 14.0.0** (`motion/react`) inside React islands, plus plain CSS `@keyframes` for ambient decorative drift.

**Rationale**: The user explicitly anticipates *"a lot of animations to be added later"*, so the foundation needs a real animation library rather than hand-rolled transitions. Motion is the current release line of what was Framer Motion, has first-class React 19 support, and its hardware-accelerated subset animates `transform`/`opacity` off the main thread — which matters for SC-002's "scrolls without stutter".

Two specific capabilities map directly onto spec requirements:

- `useReducedMotion()` gives a single hook to satisfy **FR-030** and **SC-006** consistently across every component.
- `whileInView` with `viewport={{ once: true }}` gives scroll-reveal that fires once and settles, satisfying **FR-006** and **FR-029**'s prohibition on distracting loops.

Ambient decoration (slowly drifting leaves, a swaying sprout) is pure CSS `@keyframes` wrapped in a `@media (prefers-reduced-motion: no-preference)` block. These need no state, no React, and no JS — so they cost nothing on the critical path and are suppressed by the media query without any code running.

**Critical implementation rule**: Scroll-reveal must animate **from visible to visible** — never `opacity: 0` as a static CSS starting state. Elements start visible in the HTML; Motion sets the initial hidden state only after hydration confirms motion is allowed. If hydration never happens, the content is simply already there. This is what makes R-001's static HTML actually honor the edge case rather than just appearing to.

**Alternatives considered**: GSAP (more power than needed, heavier, licensing complexity for some uses); CSS-only throughout (would not scale to the choreography the user is planning); React Spring (physics model is a worse fit for the gentle, deterministic entrances described in FR-029).

---

## R-003: Styling

**Decision**: **Tailwind CSS 4.3.3** via `@tailwindcss/vite` 4.3.3, with the brand palette declared as CSS-first `@theme` tokens.

**Rationale**: Tailwind 4 configures in CSS (`@theme { --color-sprout-500: ...; }`) rather than a JS config file, which means the design tokens live in one stylesheet that is also the source of truth for the generated utilities. For a site whose entire visual identity is a tight colour system (**FR-024**), a single token block is the cleanest way to guarantee consistency and to make a palette change a one-file edit.

It also works identically in `.astro` files and React island components, so there is no styling seam between the static and hydrated halves of the page.

**Alternatives considered**: CSS Modules (no token system, more files, more naming overhead); styled-components / Emotion (runtime CSS-in-JS would force otherwise-static sections to become islands purely to get their styles — directly at odds with R-001); plain CSS with custom properties (viable, but loses the responsive and state variants that FR-003 and FR-034 need repeatedly).

---

## R-004: Brand colour palette

**Decision**: A nine-step light-green "sprout" ramp plus a dark green ink and one warm seed accent, declared as Tailwind `@theme` tokens.

| Token | Hex | Intended use |
|-------|-----|--------------|
| `--color-sprout-50` | `#F4FAF0` | Page background, alternating section wash |
| `--color-sprout-100` | `#E6F4DC` | Card surfaces, subtle fills |
| `--color-sprout-200` | `#CDE9BA` | Borders, dividers, decorative leaf fills |
| `--color-sprout-300` | `#AEDA93` | Decorative artwork mid-tone |
| `--color-sprout-400` | `#8CC765` | Decorative artwork, non-text accents only |
| `--color-sprout-500` | `#6FB043` | Brand mark, large display accents |
| `--color-sprout-600` | `#558B32` | **Lightest green permitted for body text on light backgrounds** |
| `--color-sprout-700` | `#426C27` | Link text, CTA button fill |
| `--color-sprout-800` | `#33521F` | Headings |
| `--color-sprout-900` | `#1F3313` | Highest-emphasis text |
| `--color-ink` | `#26301F` | Default body text |
| `--color-ink-muted` | `#55614C` | Secondary text, subtitles |
| `--color-seed` | `#E8B04B` | Warm seed accent — decoration and on-dark text only |

**Rationale**: **FR-028** sets hard contrast floors (4.5:1 body, 3:1 large text) and **FR-024** requires light green to dominate. Those two pull against each other, because genuinely light greens cannot carry body text. The ramp resolves it by splitting roles explicitly: steps 50–400 are surfaces and decoration and are **never** used for text on light backgrounds; steps 600–900 and the ink tokens carry all text. `--color-seed` is decoration-only on light backgrounds.

The ramp is a starting point, not a verified result. **The automated contrast check in [quickstart.md](./quickstart.md) is the gate** — any pairing that fails gets its text token darkened, not its rule waived.

**Alternatives considered**: a single flat green with opacity variations (opacity over varying backgrounds makes contrast unpredictable and untestable); Tailwind's stock `green`/`lime` palettes (generic, and the brand is specifically about sowing — a custom ramp is cheap and makes the identity ownable).

---

## R-005: Typography and Vietnamese diacritics

**Decision**: Self-hosted via Fontsource — **`@fontsource-variable/lora` 5.3.0** for display/headings and **`@fontsource/be-vietnam-pro` 5.3.0** for body and UI. Load the `vietnamese` and `latin` subsets only.

**Rationale**: **FR-012**, **FR-032**, **SC-004** and the diacritics edge case all hinge on one risk that is easy to miss until it ships: many popular webfonts either lack Vietnamese glyphs entirely or carry badly positioned stacked diacritics (ế, ữ, ộ, ỹ), which silently degrade to a fallback font mid-word or collide with the line above.

- **Be Vietnam Pro** was designed for Vietnamese. Its diacritic positioning is correct by construction, which makes it the safe choice for the dense achievement lists in the team section.
- **Lora** is a serif with a proper `vietnamese` subset. A serif display face suits a literature brand, where a generic geometric sans would read as a tech product.

Self-hosting rather than linking Google Fonts removes a third-party connection from the critical path, which matters for SC-002 in a slow webview, and keeps the site working if that CDN is unreachable.

**Implementation note**: Preload only the weights actually used. Set `font-display: swap` so text paints in the fallback immediately rather than blocking — consistent with the edge case requiring text before decorative assets. Verify the Vietnamese subset renders by asserting against real strings from the spec, not lorem ipsum.

**Alternatives considered**: Google Fonts CDN link (extra connection, privacy, offline fragility); system font stack (no reliable Vietnamese serif across platforms, and no brand character); Inter or Nunito alone (Vietnamese coverage is fine, but a single sans gives the page no typographic hierarchy for a text-heavy literature brand).

---

## R-006: Logo and decorative artwork

**Decision**: Hand-authored **inline SVG**, no icon or illustration dependency. The logo is a single React/Astro component driven by `currentColor`.

**Rationale**: **FR-025** requires the mark to stay recognisable at both hero size and footer size — that is a vector requirement, and it rules out raster assets. **FR-027** requires decorations to be invisible to assistive technology and non-interactive, which inline SVG handles precisely with `aria-hidden="true"` and `focusable="false"`.

Inline (rather than `<img src="...svg">`) matters for two reasons: the mark inherits text colour via `currentColor` so it needs no per-context variant, and it adds zero network requests on the critical path.

The concept to execute: a seed form opening into a two-leaf sprout, where the negative space inside the seed reads as the letter **G**. This makes the mark literally depict *gieo* (to sow) while remaining a monogram — and it stays legible when the leaves lose detail at 24px.

**Decorative plants** are a small set of reusable SVG components (sprout, leaf pair, grass tuft, falling seed) placed per section via composition. Each is `aria-hidden`, positioned so it can never overlap text at any width (FR-027, and the 320px edge case), and animated only by the CSS ambient drift from R-002.

**Alternatives considered**: `lucide-react` 1.54.0 (good generic icon set, but carries no brand logos and no plant illustrations matching a custom identity — a dependency that would not actually cover the need); an SVG sprite sheet (extra build step, and loses `currentColor` inheritance ergonomics at this scale); AI-generated raster illustration (fails the small-size legibility requirement in FR-025).

**Social icons**: the Facebook and TikTok marks are inline SVG paths committed to the repo, each wrapped with an accessible label per **FR-021**. Brand marks are reproduced solely to link to the respective platforms, which is their intended use.

---

## R-007: Content architecture

**Decision**: One typed content module, `src/content/site.ts`, exporting every user-visible Vietnamese string as structured, typed data. No copy is hardcoded in markup.

**Rationale**: This single decision satisfies five requirements at once:

- **SC-004** (100% content accuracy): tests assert the rendered page against the same exported constants, so a typo cannot pass silently.
- **SC-009** (one-location edits): replacing a placeholder material entry, a social URL, or the CTA destination is one object literal.
- **FR-016** (materials replaceable without redesign), **FR-022** (social URLs defined in one place), **FR-036** (CTA destination attachable later) are each literally a statement about content being data rather than markup.

TypeScript types on this module turn the spec's structural rules into compile-time checks — `teamMembers` typed as a two-element tuple enforces **FR-008**'s "exactly two members", and a required `label` on every social link enforces **FR-021**.

**Alternatives considered**: Astro Content Collections (designed for many files of long-form Markdown; this is a fixed, small, highly structured set — the schema overhead buys nothing); a headless CMS (explicitly out of scope per the spec); copy inline in components (defeats SC-009 and makes SC-004 untestable).

---

## R-008: Inert call-to-action

**Decision**: A real `<button type="button">` with a `null` destination in the content module. It renders fully styled with hover, focus and active states, and its click handler is a no-op.

**Rationale**: **FR-034** and **FR-035** require a button that looks complete and does nothing, without reaching a dead end. The failure modes to avoid are specific:

- An `<a href="#">` scrolls the page to the top on click — that violates FR-035's "page MUST remain in its current state".
- A `<div>` styled as a button is not keyboard-focusable and is not announced as a button, violating **FR-031** and the US3 keyboard scenario.
- A `disabled` button is skipped by keyboard navigation and reads as broken to a screen reader, when the intent is a working-looking button whose destination simply is not wired yet.

So: a genuine `<button>`, enabled, focusable, announced correctly, with no side effect. When a destination is supplied later, the component swaps to rendering an `<a>` — which is why the destination belongs in the content module (R-007) rather than in the component.

---

## R-009: Testing strategy

**Decision**: Two layers — **Vitest 5.0.3** with Testing Library 16.3.3 and jsdom 30.1.2 for content and component assertions, **Playwright 1.64.0** with `@axe-core/playwright` 4.13.0 for accessibility, responsive and behavioural assertions against the real built site.

**Rationale**: The success criteria split cleanly along this line, and each tool covers what the other cannot.

| Spec criterion | Layer | What it checks |
|---|---|---|
| SC-004 content accuracy | Vitest | Every Vietnamese string from `site.ts` is rendered, with diacritics intact |
| FR-008, FR-010, FR-011, FR-018 | Vitest | Exact achievement and outcome content, correct counts |
| SC-003 responsive integrity | Playwright | No horizontal scroll or clipping at 320/768/1280/1920 px and at 200% zoom |
| SC-005 accessibility | Playwright + axe | Zero critical/serious violations; full keyboard traversal |
| SC-006 reduced motion | Playwright | `prefers-reduced-motion: reduce` emulated — all content visible, nothing animating |
| SC-008 links | Playwright | Both social links present, correct `href`, `target="_blank"` |
| SC-010 CTA inertness | Playwright | Focusable, visible focus ring, click causes no navigation and no scroll change |
| FR-028 contrast | Playwright + axe | Colour-contrast rule gates the R-004 palette |

Playwright runs against `astro build && astro preview`, so it exercises the actual static output — which is the only way to meaningfully verify the R-001 claim that content is present before hydration.

**Not doing**: visual regression snapshots (brittle while the design is still being iterated, and the user has not seen a first draft yet); unit tests of animation internals (testing Motion's behaviour, not ours — the reduced-motion and content-visibility outcomes are what matter and are covered above).

---

## R-010: Supporting tooling

**Decision**: TypeScript 7.0.2 (strict), ESLint 10.12.0 with typescript-eslint 8.71.1, `eslint-plugin-jsx-a11y` 6.10.2 and `eslint-plugin-astro` 3.2.1, Prettier 3.9.9.

**Rationale**: `eslint-plugin-jsx-a11y` catches a meaningful share of **FR-031** violations at author time rather than at test time — missing labels, non-semantic interactive elements, bad heading structure. Given how many requirements in this spec are accessibility requirements, cheap static enforcement earns its place.

**Deployment**: Astro's default static output in `dist/` is a plain folder of HTML, CSS, JS and fonts, deployable to Netlify, Vercel, Cloudflare Pages or GitHub Pages with no adapter. The spec places hosting and domain out of scope, so no target is selected here — and nothing in the build commits to one.

---

## Resolved unknowns summary

| Unknown from Technical Context | Resolution |
|---|---|
| Which React meta-framework / build tool | Astro 7 + React 19 islands on Vite 8 (R-001) |
| Animation approach | Motion 14 in islands + CSS keyframes for ambient (R-002) |
| Styling system | Tailwind 4 with CSS-first `@theme` tokens (R-003) |
| Concrete light-green palette meeting FR-028 | Nine-step sprout ramp with text/surface role split (R-004) |
| Fonts with reliable Vietnamese diacritics | Lora Variable + Be Vietnam Pro, self-hosted (R-005) |
| Logo and plant artwork source | Hand-authored inline SVG, no dependency (R-006) |
| How content stays replaceable per SC-009 | Single typed `site.ts` content module (R-007) |
| How to build a button that does nothing, accessibly | Enabled `<button type="button">` with no-op handler (R-008) |
| Test tooling and coverage mapping | Vitest + Testing Library, Playwright + axe (R-009) |
| Language, lint, deployment target | TypeScript 7 strict, ESLint 10, static `dist/`, host deferred (R-010) |
