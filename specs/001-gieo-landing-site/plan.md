# Implementation Plan: Gieo Landing Site

**Branch**: `001-gieo-landing-site` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-gieo-landing-site/spec.md`

## Summary

Deliver the Gieo brand's first public landing page: a single scrollable Vietnamese-language site with five sections — an animated inspirational hero, a two-member team section proving the founders' competition credentials, a placeholder free-materials preview, a gifted-student course section with concrete learning outcomes and an inert call-to-action, and a footer linking to Facebook and TikTok.

**Technical approach**: Astro 7 renders the whole page to static HTML at build time; React 19 islands hydrate only the components that animate or respond to input. This is what lets the page satisfy both the "content present before scripting runs" edge case and the 2-second-on-4G target, while still giving the user the ordinary React + Motion foundation they asked for to build heavier animation on later. All Vietnamese copy lives in one typed content module, so the placeholder materials, social URLs and CTA destination are each a one-line edit when real values arrive.

Full decision record with alternatives in [research.md](./research.md).

## Technical Context

**Language/Version**: TypeScript 7.0.2 (strict mode), Node.js ≥ 22.12 (verified local: v24.14.1, npm 11.11.0)

**Primary Dependencies**: Astro 7.3.8, React 19.3.0 / react-dom 19.3.0, @astrojs/react 7.0.1 (+ oxc-transform-react 0.153.0 peer), Motion 14.0.0, Tailwind CSS 4.3.3 via @tailwindcss/vite, @fontsource-variable/lora 5.3.0, @fontsource/be-vietnam-pro 5.3.0

**Storage**: N/A — no backend, no database, no persistence. All content is compiled into the static build from `src/content/site.ts`.

**Testing**: Vitest 5.0.3 + @testing-library/react 16.3.3 + jsdom 30.1.2 (content and component assertions); Playwright 1.64.0 + @axe-core/playwright 4.13.0 (accessibility, responsive, reduced-motion, CTA inertness) against the built static output

**Target Platform**: Static site. Current Chrome, Safari, Edge and Firefox on desktop and mobile, including Facebook and TikTok in-app webviews — the dominant entry point per User Story 1. Output is a plain `dist/` folder; no host selected (out of scope per spec).

**Project Type**: Static marketing site — frontend only, single route, no API

**Performance Goals**: Meaningful content (brand name + headline) painted within 2s on a mid-range phone over 4G (SC-002); animation holding ~60fps with no scroll stutter; critical path carries no third-party requests

**Constraints**: WCAG contrast floors of 4.5:1 body / 3:1 large text (FR-028); zero critical or serious axe violations (SC-005); full content visible with `prefers-reduced-motion: reduce` (FR-030, SC-006); no horizontal scroll from 320px to 1920px and at 200% zoom (FR-003, SC-003); correct Vietnamese diacritics everywhere (FR-012, SC-004); no decorative element may overlap text (FR-027)

**Scale/Scope**: One page, five sections, ~15 components, two team members, ≥3 placeholder material entries, ≥4 course outcomes, two social links, one inert CTA. No auth, no forms, no backend, no CMS, no i18n.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Constitution status**: `.specify/memory/constitution.md` is the **unmodified Spec Kit template** — every principle is still a `[PRINCIPLE_N_NAME]` / `[PRINCIPLE_N_DESCRIPTION]` placeholder, and the version, ratification and amendment dates are unfilled. There are therefore **no ratified project principles to gate against**, and this check is informational rather than binding.

Running `/speckit-constitution` would establish real principles. That is worth doing before the project grows, but it is not a blocker for a single static page — and inventing principles here and then checking this plan against principles it was written alongside would be a circular exercise that proves nothing.

In the absence of ratified principles, the plan was held to these default gates:

| Default gate | Status | Evidence |
|---|---|---|
| Simplicity — no unjustified architecture | **Pass** | One package, one route, no backend, no state manager, no CMS. Every dependency maps to a named requirement (see Technical Context). |
| No speculative generality | **Pass with one deliberate exception** | Content is data rather than markup — not speculation, but the direct mechanism for SC-009, FR-016, FR-022 and FR-036. |
| Testability | **Pass** | Every success criterion maps to an automated check; see the coverage table in [research.md](./research.md) R-009. |
| Accessibility as a requirement, not a nicety | **Pass** | 7 of 36 functional requirements are accessibility requirements; enforced by lint, axe and keyboard tests. |
| Dependency restraint | **Pass** | 2 runtime dependencies beyond the framework (Motion, fonts). Logo, plant artwork and social icons are hand-authored SVG rather than an icon library — see R-006. |

**Post-Phase 1 re-check**: **Pass, unchanged.** The Phase 1 design added no new dependencies, no new routes and no persistence layer. The one structural addition — the `src/content/site.ts` module and its types — reduces duplication rather than adding a layer, and is what makes SC-004 testable at all.

## Project Structure

### Documentation (this feature)

```text
specs/001-gieo-landing-site/
├── spec.md              # Feature specification (/speckit-specify output)
├── plan.md              # This file (/speckit-plan output)
├── research.md          # Phase 0 output — stack decisions with alternatives
├── data-model.md        # Phase 1 output — content entity shapes and rules
├── quickstart.md        # Phase 1 output — setup and validation guide
├── contracts/
│   ├── content-schema.md    # The site.ts content module contract
│   └── ui-contract.md       # Per-section rendering and behaviour contract
├── checklists/
│   └── requirements.md  # Spec quality checklist (16/16 passing)
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
gieo-intro-website/
├── astro.config.mjs           # Astro + React + Tailwind integration
├── tsconfig.json              # strict
├── package.json
├── eslint.config.js           # flat config: ts, jsx-a11y, astro
├── playwright.config.ts
├── vitest.config.ts
├── public/
│   └── favicon.svg            # derived from the sprout mark
└── src/
    ├── content/
    │   ├── site.ts            # ALL Vietnamese copy, typed — single source of truth
    │   └── types.ts           # TeamMember, Achievement, MaterialEntry, CourseOutcome, SocialLink, CallToAction
    ├── layouts/
    │   └── BaseLayout.astro   # <html lang="vi">, fonts, global styles, metadata
    ├── pages/
    │   └── index.astro        # The single route; composes the five sections in order
    ├── sections/              # Static Astro section shells (no JS shipped)
    │   ├── HeroSection.astro
    │   ├── TeamSection.astro
    │   ├── MaterialsSection.astro
    │   ├── CourseSection.astro
    │   └── SiteFooter.astro
    ├── components/
    │   ├── react/             # Hydrated islands — animation and interaction only
    │   │   ├── AnimatedHeadline.tsx
    │   │   ├── ScrollReveal.tsx       # shared whileInView wrapper
    │   │   ├── ScrollCue.tsx
    │   │   └── CallToActionButton.tsx
    │   └── astro/             # Static presentational pieces
    │       ├── TeamMemberCard.astro
    │       ├── MaterialCard.astro
    │       ├── OutcomeItem.astro
    │       └── SocialLink.astro
    ├── assets/
    │   └── svg/
    │       ├── GieoLogo.astro         # seed-to-sprout mark, G in negative space
    │       ├── plants/                # Sprout, LeafPair, GrassTuft, FallingSeed
    │       └── social/                # FacebookIcon, TikTokIcon
    └── styles/
        ├── global.css         # Tailwind import + @theme brand tokens
        └── motion.css         # ambient CSS keyframes, reduced-motion guarded
tests/
├── unit/                      # Vitest — content accuracy, component rendering
│   ├── content.test.ts
│   ├── team-section.test.tsx
│   └── course-section.test.tsx
└── e2e/                       # Playwright — against the built site
    ├── accessibility.spec.ts
    ├── responsive.spec.ts
    ├── reduced-motion.spec.ts
    └── interactions.spec.ts
```

**Structure Decision**: Single-package static site rooted at the repository root — no `frontend/` + `backend/` split, because there is no backend and there will not be one in this feature.

The one structural rule worth stating explicitly, because every other decision depends on it: **`src/sections/` is static Astro, `src/components/react/` is hydrated islands.** A section ships zero JavaScript; it reaches for an island only where something must animate or respond to a click. This is the mechanism that makes the "content present before scripting" edge case true rather than aspirational, so a section that drifts into becoming an island is a design regression, not an implementation detail.

## Phase 1 artifacts

| Artifact | Purpose |
|---|---|
| [data-model.md](./data-model.md) | Shapes, field rules and validation for the six content entities; maps each rule to its FR |
| [contracts/content-schema.md](./contracts/content-schema.md) | The `site.ts` module contract — what it must export and the invariants types enforce |
| [contracts/ui-contract.md](./contracts/ui-contract.md) | Per-section structural, semantic and behavioural contract, including heading order and hydration boundaries |
| [quickstart.md](./quickstart.md) | Scaffolding commands and the runnable validation scenarios that prove each success criterion |

## Requirement coverage

Every functional requirement has a design home. Full per-section detail in [contracts/ui-contract.md](./contracts/ui-contract.md).

| Requirements | Covered by |
|---|---|
| FR-001–003 (structure, responsive) | `index.astro` section order; Tailwind responsive scale; `responsive.spec.ts` |
| FR-004–007 (hero) | `HeroSection.astro` + `AnimatedHeadline`, `ScrollCue` islands |
| FR-008–012 (team) | `TeamSection.astro` + `TeamMemberCard.astro`, content from `site.ts`, asserted in `team-section.test.tsx` |
| FR-013–016 (materials) | `MaterialsSection.astro` + `MaterialCard.astro`; entries typed with `href: null` |
| FR-017–019 (course) | `CourseSection.astro` + `OutcomeItem.astro` |
| FR-020–023 (footer) | `SiteFooter.astro` + `SocialLink.astro`; URLs from `site.ts` |
| FR-024–028 (brand, theme, contrast) | `global.css` `@theme` tokens; `GieoLogo.astro`; `assets/svg/plants/`; axe contrast rule |
| FR-029–032 (motion, a11y, language) | `ScrollReveal` + `useReducedMotion`; `motion.css` media guard; `BaseLayout.astro` `lang="vi"`; jsx-a11y lint |
| FR-033–036 (inert CTA) | `CallToActionButton.tsx` with `destination: null`; `interactions.spec.ts` |

## Complexity Tracking

> Recorded for transparency. Neither item is a constitution violation — there are no ratified principles to violate — but both are deliberate trade-offs a reviewer should be able to challenge.

| Decision | Why needed | Simpler alternative rejected because |
|---|---|---|
| Astro + React islands rather than a plain Vite React SPA | The spec's "scripting unavailable or still loading" edge case and SC-002's 2s-on-4G target, both weighted by User Story 1's social-webview traffic. A CSR app serves an empty root div before its bundle executes. | A Vite SPA is simpler and gives freer cross-section animation, but cannot put text in the initial HTML response at all. The gap is structural, not tunable. |
| Content extracted to a typed `site.ts` rather than written inline in markup | SC-009 requires one-location edits; SC-004 requires asserting rendered output against exact Vietnamese strings, which needs a single importable source. FR-016/022/036 each independently require a replaceable value. | Inline copy would make SC-009 false and SC-004 untestable — a test asserting hardcoded strings against the same hardcoded strings proves nothing. |

**Known trade-off carried forward**: React islands are independent roots, so animation state does not flow between sections for free. If later work needs one scroll position to choreograph multiple sections, those sections get wrapped in a single `client:load` island. The component code relocates; it does not get rewritten. Flagged now so it is a known cost rather than a surprise.

## What this plan does not cover

Out of scope per the spec, and deliberately absent from the design so they are not mistaken for oversights:

- **Backend, forms, lead capture.** The CTA is inert by the user's explicit decision (FR-034).
- **Real material files.** Entries are placeholder copy; the schema accepts real values without redesign (FR-015, FR-016).
- **Real social profile URLs.** Platform homepages stand in until profiles exist (FR-022).
- **SEO and social-preview metadata.** Named out of scope in the spec's Assumptions. `BaseLayout.astro` is the single place to add it later.
- **Hosting, domain, CI/CD.** Build output is a portable `dist/`; no host is assumed.
- **Analytics.** SC-007 measures scroll-through, which needs instrumentation this feature does not install — see note in [quickstart.md](./quickstart.md).

## Next step

`/speckit-tasks` to generate the dependency-ordered task list. The user-story priorities in the spec (P1 hero through P5 footer) are the intended slicing order, and each story is independently shippable.
