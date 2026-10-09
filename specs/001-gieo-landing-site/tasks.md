---

description: "Task list for Gieo Landing Site implementation"
---

# Tasks: Gieo Landing Site

**Input**: Design documents from `/specs/001-gieo-landing-site/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Test tasks **are included**. The feature's design makes testing non-optional — [research.md](./research.md) R-009 defines a two-layer strategy, [contracts/ui-contract.md](./contracts/ui-contract.md) ends in a verification matrix, and 8 of 10 success criteria are stated as automated checks. Tests here are the mechanism by which SC-003 through SC-010 are satisfied, not an add-on.

**Organization**: Grouped by user story (P1–P5 from spec.md) so each is independently implementable, testable and shippable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story the task serves (US1–US5)
- Every task carries an exact file path

## Path Conventions

Single-package static site rooted at the repository root: `src/`, `tests/`, `public/`. Confirmed in [plan.md](./plan.md) § Project Structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffold the Astro + React + Tailwind project and its toolchain

- [ ] T001 Initialize a git repository at the repository root and create `.gitignore` covering `node_modules/`, `dist/`, `.astro/`, `test-results/`, `playwright-report/`, `.env*` — this directory is not yet a git repo
- [ ] T002 Scaffold a minimal Astro 7.3.8 project in place at the repository root: `npm create astro@latest -- --template minimal --typescript strict --no-git --skip-houston .`
- [ ] T003 Add the React integration with `npx astro add react --yes`; confirm `package.json` resolves react@19.3.0, react-dom@19.3.0, @astrojs/react@7.0.1, and install the `oxc-transform-react` peer explicitly if a peer warning appears
- [ ] T004 Add Tailwind CSS 4 with `npx astro add tailwind --yes`; confirm `@tailwindcss/vite@4.3.3` is registered in `astro.config.mjs`
- [ ] T005 [P] Install runtime dependencies: `npm install motion@14 @fontsource-variable/lora @fontsource/be-vietnam-pro`
- [ ] T006 [P] Install test tooling: `npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @playwright/test @axe-core/playwright`, then `npx playwright install chromium firefox webkit`
- [ ] T007 [P] Install lint and format tooling: `npm install -D eslint typescript-eslint eslint-plugin-jsx-a11y eslint-plugin-astro astro-eslint-parser prettier prettier-plugin-astro`
- [ ] T008 Add the scripts block to `package.json` exactly as specified in [quickstart.md](./quickstart.md) § Scripts — `dev`, `build`, `preview`, `check`, `lint`, `test`, `test:e2e`, and the `validate` gate that chains them
- [ ] T009 Configure `tsconfig.json` for strict mode and add the `~/*` → `src/*` path alias used by every import in this plan

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The content module, design tokens, layout shell and shared primitives that every user story reads from

**⚠️ CRITICAL**: No user story work can begin until this phase is complete. Every section imports from `site.ts` and renders inside `BaseLayout.astro`.

- [ ] T010 [P] Create content type definitions in `src/content/types.ts` per [contracts/content-schema.md](./contracts/content-schema.md): `SiteContent`, `Brand`, `Hero`, `TeamSection`, `TeamMember`, `Achievement`, `MaterialsSection`, `MaterialEntry`, `CourseSection`, `CourseOutcome`, `CallToAction`, `SocialLink`, `ImageRef`, `PlantIconName`. Enforce compile-time invariants: `members` typed `readonly [TeamMember, TeamMember]` (FR-008 exactly two), `social` typed `readonly [SocialLink, SocialLink]` (FR-021 exactly two), `SocialLink.label` non-optional (FR-021), `ImageRef.alt` required, `MaterialEntry.isPlaceholder` typed as literal `true`, `Achievement.level` typed `'quoc-gia' | 'tinh' | 'khac' | null`
- [ ] T011 Create `src/content/site.ts` exporting `site` declared `as const satisfies SiteContent`, populated with the verbatim seed content in [data-model.md](./data-model.md): headline `"Chinh phục học sinh giỏi không khó như bạn nghĩ"`, team heading `"Chúng mình là"`, Hà Giang's 4 achievements, Bảo Quyên's 2 achievements, materials heading `"Những tài liệu của chúng mình"` with a subtitle and ≥3 placeholder entries each with `href: null` and `isPlaceholder: true`, ≥4 course outcomes including the four named in FR-018, `cta.destination: null`, and both social links pointing at `https://www.facebook.com/` and `https://www.tiktok.com/` with labels. No imports, no computed values, no template literals.
- [ ] T012 [P] Create `src/styles/global.css` importing Tailwind and declaring the `@theme` brand tokens from [research.md](./research.md) R-004: the nine-step `--color-sprout-50` … `--color-sprout-900` ramp, `--color-ink: #26301F`, `--color-ink-muted: #55614C`, `--color-seed: #E8B04B`. Add a comment recording the role split — steps 50–400 and `--color-seed` are surfaces and decoration only, never text on light backgrounds (FR-028)
- [ ] T013 [P] Create `src/styles/motion.css` with the ambient decorative keyframes (slow drift, gentle sway), every rule wrapped in `@media (prefers-reduced-motion: no-preference)` so reduced motion suppresses them with no JS involved (FR-030)
- [ ] T014 [P] Create `src/assets/svg/GieoLogo.astro` — a single inline `<svg>` of a seed opening into a two-leaf sprout with the letter G in the seed's negative space, all fills `currentColor`, legible at both 24px and hero scale, accepting a `decorative` prop that switches between `role="img"` with an accessible name and `aria-hidden="true"` (FR-025, FR-027)
- [ ] T015 [P] Create decorative plant components in `src/assets/svg/plants/`: `Sprout.astro`, `LeafPair.astro`, `GrassTuft.astro`, `FallingSeed.astro`. Each is inline `<svg aria-hidden="true" focusable="false">` with `pointer-events: none` (FR-026, FR-027)
- [ ] T016 Create `src/layouts/BaseLayout.astro` with `<html lang="vi">` (FR-032), the Lora Variable and Be Vietnam Pro font imports limited to the `vietnamese` and `latin` subsets with `font-display: swap`, preload hints for the weights actually used, `global.css` and `motion.css`, and a `<slot />`. This file is also the single future home for SEO and social-preview metadata (out of scope now)
- [ ] T017 Create the shared `src/components/react/ScrollReveal.tsx` island: wraps children with Motion's `whileInView` and `viewport={{ once: true }}`, reads `useReducedMotion()` and renders children in their final visible state when motion is reduced. **The hidden initial state must be applied by Motion after hydration — never as a static CSS `opacity: 0`** (FR-029, FR-030, and the scripting-unavailable edge case)
- [ ] T018 Create `src/pages/index.astro` using `BaseLayout`, with the five section mount points in FR-001 source order — hero, team, materials, course, footer — commented as placeholders to be filled by each user story phase
- [ ] T019 [P] Configure `vitest.config.ts`: jsdom environment, the `~` path alias, and a setup file registering `@testing-library/jest-dom`
- [ ] T020 [P] Configure `playwright.config.ts`: a `webServer` running `npm run preview` (never `dev` — see [quickstart.md](./quickstart.md) § Running locally), chromium/firefox/webkit projects, and the viewport sizes 320/768/1280/1920 needed by SC-003
- [ ] T021 [P] Configure `eslint.config.js` as a flat config wiring typescript-eslint, `eslint-plugin-jsx-a11y` and `eslint-plugin-astro` with `astro-eslint-parser` (FR-031 enforced at author time)
- [ ] T022 [P] Configure `.prettierrc` with `prettier-plugin-astro`
- [ ] T023 Write `tests/unit/content.test.ts` implementing all 8 assertions in [contracts/content-schema.md](./contracts/content-schema.md) § Test contract, including assertion 8 — no string in `site` contains `\n`, leading/trailing whitespace, or the `U+FFFD` replacement character that signals Vietnamese encoding corruption (SC-004)
- [ ] T024 [P] Create `public/favicon.svg` derived from the sprout mark in `GieoLogo.astro`

**Checkpoint**: Content module, tokens, layout and test harness ready. User stories can now proceed in priority order or in parallel.

---

## Phase 3: User Story 1 - Inspired first impression (Priority: P1) 🎯 MVP

**Goal**: A visitor landing on the page sees the Gieo brand, mark and core promise within the first screen, with a gentle entrance animation and a cue to scroll.

**Independent Test**: Load the built site on a fresh device. Without scrolling, the brand name, brand mark, headline and scroll cue are all visible; the headline animates in once and settles; scrolling is unobstructed.

### Tests for User Story 1

- [ ] T025 [P] [US1] Write `tests/e2e/hero.spec.ts` covering the four US1 acceptance scenarios: brand name, mark and headline visible without scrolling on desktop; headline readable at 320px with no horizontal scroll and no overlap with decorative plants; all content visible in final state under emulated `prefers-reduced-motion: reduce`; scrolling from the hero reaches the next section unobstructed

### Implementation for User Story 1

- [ ] T026 [P] [US1] Create `src/components/react/AnimatedHeadline.tsx` — a Motion island rendering `site.hero.headline` as the page's single `<h1>`, entrance completing within 1000ms, honouring `useReducedMotion()`, hydrated with `client:load` (FR-005, FR-006)
- [ ] T027 [P] [US1] Create `src/components/react/ScrollCue.tsx` — the downward cue with ambient motion and the accessible label from `site.hero.scrollCueLabel`, hydrated with `client:visible` (FR-007)
- [ ] T028 [US1] Create `src/sections/HeroSection.astro` composing `GieoLogo`, the brand name from `site.brand.name`, `AnimatedHeadline` and `ScrollCue` inside a `<section aria-labelledby>`; mark the logo `decorative` since the brand name is already visible text, avoiding a duplicate screen-reader announcement (FR-004, FR-025)
- [ ] T029 [US1] Place decorative plants from `src/assets/svg/plants/` in `src/sections/HeroSection.astro`, positioned so they cannot overlap or displace the headline at any width ≥ 320px (FR-026, FR-027)
- [ ] T030 [US1] Mount `HeroSection` at the first placeholder in `src/pages/index.astro`
- [ ] T031 [US1] Run `npm run build` and confirm `grep -c "Chinh phục học sinh giỏi" dist/index.html` returns ≥ 1 — the headline must be in the static HTML, not injected by the island (quickstart V-1)

**Checkpoint**: US1 is independently shippable. The page is a complete, branded, animated hero.

---

## Phase 4: User Story 2 - Judging who is teaching (Priority: P2)

**Goal**: A visitor sees both founders with their full competition credentials, accurately and legibly, at every width.

**Independent Test**: Scroll to the team section and verify both names and all six achievements render verbatim with correct diacritics, untruncated, on desktop and stacked on mobile.

### Tests for User Story 2

- [ ] T032 [P] [US2] Write `tests/unit/team-section.test.tsx` asserting the heading `"Chúng mình là"`, exactly two cards, `Nguyễn Thị Hà Giang` with her 4 achievements verbatim, and `Nguyễn Hồng Bảo Quyên` with her 2 achievements verbatim per [data-model.md](./data-model.md) (FR-010, FR-011, SC-004)
- [ ] T033 [P] [US2] Write `tests/e2e/team.spec.ts` asserting cards stack vertically at 320px with every achievement fully visible, no `line-clamp` or ellipsis anywhere in the section, achievements are a real `<ul>`/`<li>`, and cards carry no focus stop (FR-012, US2 scenario 4)

### Implementation for User Story 2

- [ ] T034 [P] [US2] Create `src/components/astro/TeamMemberCard.astro` rendering `member.name` as `<h3>`, the optional `member.role`, and `member.achievements` as a `<ul>`. **No truncation, no ellipsis, no expand/collapse at any width** (FR-009, FR-012)
- [ ] T035 [US2] Add the initial-based portrait placeholder path to `src/components/astro/TeamMemberCard.astro`, rendered when `member.portrait === null`, sized and positioned so a real `ImageRef` later drops in without layout change (spec Assumptions)
- [ ] T036 [US2] Create `src/sections/TeamSection.astro` rendering `site.team.heading` as `<h2>` inside `<section aria-labelledby>` and mapping `site.team.members` to `TeamMemberCard`, stacking at narrow widths (FR-008)
- [ ] T037 [US2] Place decorative plants in `src/sections/TeamSection.astro` clear of all achievement text at every width (FR-026, FR-027)
- [ ] T038 [US2] Mount `TeamSection` at the second placeholder in `src/pages/index.astro` and confirm both member names appear in `dist/index.html` after `npm run build` (quickstart V-1)

**Checkpoint**: US1 and US2 both work independently. The page now states its promise and proves it.

---

## Phase 5: User Story 3 - Understanding what the course delivers (Priority: P3)

**Goal**: A visitor reads what the gifted-student course teaches and sees a prominent — but deliberately inert — call to action.

**Independent Test**: Scroll to the course section and verify the heading, description, at least four concrete outcome bullets and the CTA button render; the CTA is keyboard-focusable and clicking it changes nothing.

### Tests for User Story 3

- [ ] T039 [P] [US3] Write `tests/unit/course-section.test.tsx` asserting the heading, description and at least four outcomes, with the four FR-018 outcomes present verbatim: `kỹ năng liên tưởng tác phẩm`, `kỹ năng phản đề`, `lý luận văn học`, `tài liệu được biên soạn bởi cựu học sinh giỏi Văn` (SC-004)
- [ ] T040 [P] [US3] Write the CTA section of `tests/e2e/interactions.spec.ts` asserting every guarantee in [contracts/ui-contract.md](./contracts/ui-contract.md) § CTA contract: renders `<button type="button">` and is **not** disabled, is not an anchor, is keyboard-focusable with a visible focus ring, is announced as a button with its Vietnamese label, and after ten clicks `window.location.href` and `window.scrollY` are unchanged with no console error (FR-034, FR-035, SC-010)

### Implementation for User Story 3

- [ ] T041 [P] [US3] Create `src/components/astro/OutcomeItem.astro` rendering `outcome.text` as an `<li>` with the optional `outcome.icon` marked `aria-hidden` (FR-018, FR-027)
- [ ] T042 [P] [US3] Create `src/components/react/CallToActionButton.tsx` implementing the `destination === null` branch as an **enabled** `<button type="button">` with a no-op handler, fully styled with distinct hover, `focus-visible` and active states, plus the `<a href target rel>` branch already written for when a destination arrives. Never `<a href="#">`, never a styled `<div>`, never `disabled` — rationale in [research.md](./research.md) R-008. Hydrate with `client:visible` (FR-033, FR-034, FR-035, FR-036)
- [ ] T043 [US3] Create `src/sections/CourseSection.astro` rendering `site.course.heading` as `<h2>`, `site.course.description`, a `<ul>` of `OutcomeItem`, and `CallToActionButton` positioned below the list so it reads as the section's primary action (FR-017, FR-019, FR-033)
- [ ] T044 [US3] Place decorative plants in `src/sections/CourseSection.astro` clear of the outcome list and the CTA at every width (FR-026, FR-027)
- [ ] T045 [US3] Mount `CourseSection` at the fourth placeholder in `src/pages/index.astro`. **Note**: the materials placeholder (US4) sits above it and is still empty at this point — the FR-001 source order must be preserved so US4 slots in above without moving this section

**Checkpoint**: US1–US3 work independently. The page now makes its full commercial case.

---

## Phase 6: User Story 4 - Previewing the free material library (Priority: P4)

**Goal**: A visitor sees that Gieo shares free materials, presented as a tidy preview with placeholder copy and no dead ends.

**Independent Test**: Scroll to the materials section and verify the heading, subtitle and at least three identically laid-out entries render, and that clicking an entry does nothing and navigates nowhere.

### Tests for User Story 4

- [ ] T046 [P] [US4] Write `tests/unit/materials-section.test.tsx` asserting the heading `"Những tài liệu của chúng mình"` verbatim, a non-empty subtitle, at least three entries, and that every entry renders as a non-interactive element with no `href` in the DOM (FR-013, FR-014, FR-015)

### Implementation for User Story 4

- [ ] T047 [P] [US4] Create `src/components/astro/MaterialCard.astro` with both render paths: a non-interactive `<article>` when `entry.href === null` — no `<a>`, no click handler, no focus stop, no pointer cursor — and an `<a>` when a real URL is present. There must be no code path producing `href="#"` or `href=""` (FR-015, FR-016, US4 scenario 3)
- [ ] T048 [US4] Create `src/sections/MaterialsSection.astro` rendering `site.materials.heading` as `<h2>`, `site.materials.subtitle` directly beneath it, and `site.materials.entries` mapped to `MaterialCard` in a grid where every card shares identical layout and visual treatment so the section reads as a deliberate preview (FR-013, FR-014, US4 scenario 2)
- [ ] T049 [US4] Place decorative plants in `src/sections/MaterialsSection.astro` clear of all card text (FR-026, FR-027)
- [ ] T050 [US4] Mount `MaterialsSection` at the third placeholder in `src/pages/index.astro`, between team and course, preserving the FR-001 source order

**Checkpoint**: US1–US4 work independently. Four of five sections complete.

---

## Phase 7: User Story 5 - Following Gieo on social media (Priority: P5)

**Goal**: A visitor reaching the bottom can follow Gieo on Facebook or TikTok, each opening in a new tab.

**Independent Test**: Scroll to the footer and verify both labelled social links are present and open their destination in a new tab with the landing page still open behind.

### Tests for User Story 5

- [ ] T051 [P] [US5] Write the social-link section of `tests/e2e/interactions.spec.ts` asserting exactly two links with `href` values matching `site.social`, both carrying `target="_blank"` and `rel="noopener noreferrer"`, each with a non-empty accessible name, icons `aria-hidden`, and no `href="#"` or empty `href` anywhere on the page (FR-021, FR-022, FR-023, SC-008)

### Implementation for User Story 5

- [ ] T052 [P] [US5] Create `src/assets/svg/social/FacebookIcon.astro` and `TikTokIcon.astro` as inline `<svg aria-hidden="true" focusable="false">` brand marks (FR-021, FR-027)
- [ ] T053 [P] [US5] Create `src/components/astro/SocialLink.astro` emitting an `<a>` with `href` from `link.url`, unconditional `target="_blank"` and `rel="noopener noreferrer"`, the platform icon, and the accessible name taken from `link.label` — visually hidden via `.sr-only` if not shown, never `display: none` (FR-021, FR-023, FR-031)
- [ ] T054 [US5] Create `src/sections/SiteFooter.astro` rendering `GieoLogo` and/or `site.brand.name` alongside `site.social` mapped to `SocialLink` (FR-020, FR-021)
- [ ] T055 [US5] Mount `SiteFooter` at the fifth placeholder in `src/pages/index.astro`

**Checkpoint**: All five user stories independently functional. Feature complete pending cross-cutting validation.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: The whole-page guarantees that no single story owns — and the success criteria that can only be checked once every section exists

- [ ] T056 Write `tests/e2e/static-content.spec.ts` implementing quickstart V-1 across the whole page: assert the built `dist/index.html` contains the headline, both member names, all six achievements, all four required outcomes, the materials heading and the CTA label **before any JavaScript executes**, and load the page with JS disabled to confirm all five sections remain readable (spec edge case; the architectural guarantee behind SC-002)
- [ ] T057 Write `tests/e2e/accessibility.spec.ts` running `@axe-core/playwright` over the full page and walking the keyboard tab order: zero `critical` or `serious` violations including `color-contrast`, exactly one `<h1>`, no skipped heading levels, every interactive element reachable by `Tab` with a visible focus indicator (SC-005, FR-028, FR-031)
- [ ] T058 Write `tests/e2e/responsive.spec.ts` asserting at 320/768/1280/1920px and at 200% zoom: `document.documentElement.scrollWidth <= window.innerWidth`, no clipped text node, and no decorative SVG overlapping a text bounding box (SC-003, FR-003, FR-027)
- [ ] T059 Write `tests/e2e/reduced-motion.spec.ts` with `prefers-reduced-motion: reduce` emulated: 100% of content visible and readable, no element with a running animation or transition, and no element left at `opacity: 0` or an off-screen transform (SC-006, FR-030)
- [ ] T060 Run `tests/e2e/accessibility.spec.ts` and remediate every `color-contrast` failure by darkening the **text** token in `src/styles/global.css` — never by suppressing the axe rule, since FR-028 is a requirement (FR-028, research R-004)
- [ ] T061 Audit hydration boundaries across `src/sections/`: confirm only `AnimatedHeadline`, `ScrollCue`, `ScrollReveal` and `CallToActionButton` carry `client:*` directives, and that no `.astro` section became an island (contracts/ui-contract.md § Hydration boundaries)
- [ ] T062 Grep `src/sections/`, `src/components/` and `src/layouts/` for Vietnamese string literals and move any found into `src/content/site.ts`, leaving only structural `aria-label`s and `alt=""` (contracts/content-schema.md rule 2, SC-009)
- [ ] T063 Run quickstart V-8 manually in Chrome DevTools against `npm run preview` at Fast 4G with 4× CPU throttle: confirm FCP < 2s with brand name and headline painted, CLS < 0.1 across the font swap, and no long task over 50ms while scrolling (SC-002)
- [ ] T064 Run quickstart V-9 manually against `npm run preview` at 320/768/1280px and 200% zoom: confirm stacked diacritics (ế, ữ, ộ, ỹ, ặ) are unclipped and not colliding with the line above, and that no glyph falls back to a different font mid-word in the achievement lists rendered by `src/components/astro/TeamMemberCard.astro` — the longest Vietnamese runs on the page. Remediate by adjusting `line-height` in `src/styles/global.css` or the font subset in `src/layouts/BaseLayout.astro` (FR-012, diacritics edge case)
- [ ] T065 [P] Write `README.md` at the repository root covering setup, the `npm run validate` gate, where content is edited (`src/content/site.ts`), and the three deferred items — real material files, real social profile URLs, and the CTA destination — each with the one-line edit that activates it
- [ ] T066 Run `npm run validate` and confirm type-check, lint, unit tests, build and e2e all pass (quickstart V-10)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately. T002 must precede T003–T009.
- **Foundational (Phase 2)**: Depends on Setup. **Blocks every user story.** T010 must precede T011; T011 must precede T023; T012 and T013 must precede T016.
- **User Stories (Phases 3–7)**: All depend only on Phase 2. They may run in priority order or in parallel across developers.
- **Polish (Phase 8)**: T056–T059 and T063–T064 require **all five sections mounted**, since they assert whole-page properties. T065 can start earlier.

### User Story Dependencies

Every story depends only on Phase 2 — none depends on another. The only coupling is the shared `src/pages/index.astro` mount file:

- **US1 (P1)**: Independent. Mounts at placeholder 1.
- **US2 (P2)**: Independent. Mounts at placeholder 2.
- **US3 (P3)**: Independent. Mounts at placeholder 4.
- **US4 (P4)**: Independent. Mounts at placeholder 3 — **above** US3's section, since FR-001 fixes the page order as hero → team → materials → course → footer while the priority order places course before materials. Building US3 first leaves placeholder 3 empty; US4 fills it without moving anything.
- **US5 (P5)**: Independent. Mounts at placeholder 5.

Because T030, T038, T045, T050 and T055 all edit `src/pages/index.astro`, those five mount tasks are **not** parallel-safe with each other. Everything else within each story is.

### Within Each User Story

- Tests first, confirmed failing, before implementation
- Leaf components (`components/astro/`, `components/react/`) before the `sections/` file that composes them
- Section file before its mount task in `index.astro`
- Decorative placement after the section's text layout is settled, so plants are positioned against real content

### Parallel Opportunities

- **Phase 1**: T005, T006, T007 in parallel after T004
- **Phase 2**: T010, T012, T013, T014, T015, T019, T020, T021, T022, T024 in parallel — ten independent files. T011 waits on T010; T016 waits on T012/T013; T023 waits on T011.
- **Phases 3–7**: With multiple developers, all five stories in parallel once Phase 2 completes. Serialize only the five `index.astro` mount tasks.
- **Phase 8**: T056, T057, T058, T059 are four independent spec files, parallel-safe once all sections are mounted. T065 is parallel with everything.

---

## Parallel Example: Phase 2 Foundational

```bash
# Ten independent files, no shared dependencies:
Task: "Create content type definitions in src/content/types.ts"
Task: "Create src/styles/global.css with @theme brand tokens"
Task: "Create src/styles/motion.css ambient keyframes"
Task: "Create src/assets/svg/GieoLogo.astro"
Task: "Create plant components in src/assets/svg/plants/"
Task: "Configure vitest.config.ts"
Task: "Configure playwright.config.ts"
Task: "Configure eslint.config.js"
Task: "Configure .prettierrc"
Task: "Create public/favicon.svg"
```

## Parallel Example: User Story 3

```bash
# Tests in parallel:
Task: "Write tests/unit/course-section.test.tsx"
Task: "Write the CTA section of tests/e2e/interactions.spec.ts"

# Then leaf components in parallel:
Task: "Create src/components/astro/OutcomeItem.astro"
Task: "Create src/components/react/CallToActionButton.tsx"

# Then sequentially: T043 section → T044 decoration → T045 mount
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1: Setup (T001–T009)
2. Phase 2: Foundational (T010–T024) — **blocks everything**
3. Phase 3: User Story 1 (T025–T031)
4. **STOP and VALIDATE**: `npm run test:e2e -- hero`, plus the V-1 static-HTML grep in T031
5. A branded, animated, accessible hero page is deployable here

### Incremental Delivery

Each story adds a section without touching the previous ones — the only shared file is `index.astro`, and each story appends at its own placeholder.

1. Setup + Foundational → foundation ready
2. + US1 → **MVP**: brand and promise
3. + US2 → promise is now backed by credentials
4. + US3 → the commercial case, with the inert CTA
5. + US4 → free-materials preview
6. + US5 → social links; all five sections live
7. Phase 8 → whole-page accessibility, responsive, reduced-motion and performance validation

**Recommended first release**: through US2. The hero's claim and the founders' credentials together form the smallest version of this page that is genuinely persuasive rather than merely decorative — a landing page that makes a promise with nothing behind it is weaker than no page at all.

### Parallel Team Strategy

1. Everyone completes Setup + Foundational together — it blocks all five stories
2. Then: Dev A → US1 + US2, Dev B → US3 + US4, Dev C → US5 + Phase 8 test scaffolding
3. Coordinate the five `index.astro` mount tasks; everything else is conflict-free

---

## Notes

- `[P]` = different files, no dependency on incomplete work
- Every task names its exact file path and, where behaviour is constrained, quotes the constraint rather than leaving it to implementation-time judgement
- Verify each test fails before implementing against it
- Commit after each task or logical group
- Any checkpoint is a valid stopping point for independent validation
- **Content integrity**: T011 writes real competition records belonging to two named people. T023 asserts them verbatim so an accidental edit fails CI rather than shipping a false public claim.
- **Two success criteria are not covered by any task**, deliberately: SC-001 (30-second comprehension) needs unmoderated user testing against a deployed URL, and SC-007 (60% scroll-through) needs analytics the spec places out of scope. Both are flagged in [quickstart.md](./quickstart.md) § Coverage map rather than quietly dropped.
