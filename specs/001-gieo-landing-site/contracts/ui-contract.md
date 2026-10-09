# Contract: UI Rendering and Behaviour

**Feature**: [spec.md](../spec.md) | **Plan**: [plan.md](../plan.md)

The page's external interface is what a visitor — human, screen reader, or crawler — receives. This contract fixes the DOM structure, the hydration boundaries and the behaviour each section guarantees, so the acceptance scenarios in the spec can be checked mechanically.

---

## Global contract

### Document

| Guarantee | Requirement |
|---|---|
| `<html lang="vi">` | FR-032 |
| Exactly one `<h1>` on the page: the hero headline | FR-031 |
| Section headings are `<h2>`, card headings `<h3>` — no level skipped | FR-031 |
| Each of the five sections is a `<section>` with an `aria-labelledby` pointing at its heading | FR-001, FR-031 |
| Sections appear in source order: hero, team, materials, course, footer | FR-001 |
| No element exceeds the viewport width at any width ≥ 320px | FR-003 |

### Static-first guarantee

**The initial HTML response contains every piece of text content on the page.** Not a loading state, not a skeleton, not an empty root element.

This is verified directly: `curl` the built `index.html` and grep for the headline, both member names, every achievement, every outcome and the CTA label. All must be present before any JavaScript executes. This is the contract that makes the spec's "scripting unavailable or still loading" edge case true, and it is the reason for the Astro/islands split in [plan.md](../plan.md).

### Hydration boundaries

Only these components ship JavaScript. Everything else is static HTML.

| Component | Directive | Why it needs JS |
|---|---|---|
| `AnimatedHeadline` | `client:load` | Hero entrance must run immediately (FR-006) |
| `ScrollCue` | `client:visible` | Ambient motion on the scroll cue (FR-007) |
| `ScrollReveal` | `client:visible` | Scroll-triggered reveal wrapper (FR-029) |
| `CallToActionButton` | `client:visible` | Click handling and interaction states (FR-034) |

Adding a fifth island is a design decision requiring justification, not a routine step. Every island is JavaScript on the critical path of a page whose traffic arrives through slow in-app webviews.

### Motion contract

| Guarantee | Requirement |
|---|---|
| No element has a CSS static state of `opacity: 0` or an off-screen transform. Hidden initial states are applied by Motion only after hydration. | edge case: scripting unavailable |
| Scroll-reveal fires once per element and never reverses | FR-029 |
| No animation loops in a way that draws attention after the first pass; ambient drift is slow, low-amplitude and never under text | FR-029 |
| Under `prefers-reduced-motion: reduce`: no transitions, no transforms, no ambient keyframes; all content mounts in final state | FR-030, SC-006 |
| Hero entrance completes within 1000ms of content becoming visible | FR-006 |
| No animation blocks, delays or hijacks scrolling | FR-006, US1 scenario 4 |

### Colour and contrast contract

| Guarantee | Requirement |
|---|---|
| Body text ≥ 4.5:1 against its actual background | FR-028 |
| Large/display text ≥ 3:1 | FR-028 |
| Text never uses `--color-sprout-50` … `--color-sprout-400` or `--color-seed` on a light background | FR-028, research R-004 |
| Decorative SVG is never the sole carrier of information | FR-027 |

### Decoration contract

Every plant, leaf, seed and ornamental flourish:

- is inline `<svg aria-hidden="true" focusable="false">`
- has `pointer-events: none`
- is positioned so it cannot overlap or displace text at any width ≥ 320px or at 200% zoom
- is absent from the accessibility tree and from the tab order

---

## Section contracts

### 1. Hero — `HeroSection.astro`

**Renders**

| Element | Source | Requirement |
|---|---|---|
| Brand mark (`GieoLogo`) | — | FR-004, FR-025 |
| Brand name | `site.brand.name` | FR-004 |
| `<h1>` headline | `site.hero.headline` | FR-005 |
| Scroll cue with accessible label | `site.hero.scrollCueLabel` | FR-007 |
| Decorative plants | — | FR-026 |

**Behaviour**

- Brand name, mark and headline are all within the initial viewport at every supported width, with no scrolling required (US1 scenarios 1–2).
- The headline entrance animation completes within 1000ms (FR-006).
- The headline wraps rather than overflowing at 320px, and never sits underneath a decorative plant (US1 scenario 2).
- Scrolling from the hero reaches the team section with no interception (US1 scenario 4).

**Logo contract** — `GieoLogo.astro` must: be a single inline `<svg>`; use `currentColor` for all fills so it needs no per-context variant; stay recognisable at 24px as well as at hero scale (FR-025); carry `role="img"` with an accessible name of the brand when standalone, and be `aria-hidden` when adjacent to the visible brand text (avoiding a duplicate announcement).

---

### 2. Team — `TeamSection.astro` + `TeamMemberCard.astro`

**Renders**

| Element | Source | Requirement |
|---|---|---|
| `<h2>` heading | `site.team.heading` — `"Chúng mình là"` | FR-008 |
| Exactly 2 member cards | `site.team.members` | FR-008 |
| Per card: `<h3>` name | `member.name` | FR-009 |
| Per card: achievement `<ul>` | `member.achievements` | FR-009 |
| Per card: portrait placeholder | `member.portrait === null` | Assumptions |

**Behaviour**

- All 4 of Hà Giang's and both of Bảo Quyên's achievements render in full, verbatim, with diacritics intact (FR-010, FR-011, FR-012, US2 scenarios 2–3).
- Achievements are a real `<ul>`/`<li>`, so a screen reader announces the item count (FR-031).
- **No truncation at any width.** No `line-clamp`, no ellipsis, no expand/collapse (FR-012).
- At narrow widths the two cards stack vertically and remain fully readable (US2 scenario 4).
- Cards are not interactive — no link, no button, no focus stop.

---

### 3. Materials — `MaterialsSection.astro` + `MaterialCard.astro`

**Renders**

| Element | Source | Requirement |
|---|---|---|
| `<h2>` heading | `site.materials.heading` | FR-013 |
| Subtitle below the heading | `site.materials.subtitle` | FR-013 |
| ≥ 3 entry cards, identical layout | `site.materials.entries` | FR-014 |

**Behaviour**

- Every card uses the same layout and visual treatment, so the section reads as a deliberate preview, not an unfinished area (US4 scenario 2).
- With `href === null`, each card renders as a **non-interactive `<article>`**: no `<a>`, no `href`, no click handler, no focus stop, no pointer cursor (FR-015, US4 scenario 3).
- There is no code path producing `href="#"` or `href=""` (FR-015).
- Supplying a real `href` switches the card to an `<a>` with no other change (FR-016).

---

### 4. Course — `CourseSection.astro` + `OutcomeItem.astro` + `CallToActionButton.tsx`

**Renders**

| Element | Source | Requirement |
|---|---|---|
| `<h2>` heading | `site.course.heading` | FR-017 |
| Introductory passage | `site.course.description` | FR-017 |
| `<ul>` of ≥ 4 outcomes | `site.course.outcomes` | FR-018 |
| CTA button below the list | `site.course.cta` | FR-033 |

**Behaviour**

- The four FR-018 outcomes render verbatim: kỹ năng liên tưởng tác phẩm, kỹ năng phản đề, lý luận văn học, tài liệu được biên soạn bởi cựu học sinh giỏi Văn (US3 scenario 2).
- Each outcome occupies its own line at narrow widths with marker and text aligned, nothing clipped (US3 scenario 3).
- Outcome icons are decorative and `aria-hidden` (FR-027).

**CTA contract** — the most behaviourally specific element on the page:

| Guarantee | Requirement |
|---|---|
| Renders `<button type="button">`, **enabled**, when `destination === null` | FR-034, R-008 |
| Never `<a href="#">`, never a styled `<div>`, never `disabled` | FR-035, FR-031, R-008 |
| Fully styled with distinct hover, focus-visible and active states | FR-034 |
| Visually reads as the section's primary action | FR-033, US3 scenario 4 |
| Click: no navigation, no scroll change, no error, no DOM mutation. Page state identical before and after. | FR-035, US3 scenario 5 |
| Repeated clicks: no accumulation, no unrecoverable state | edge case: inert CTA |
| Keyboard-focusable with a visible focus indicator; announced as a button with its label | FR-031, US3 scenario 6 |
| Switches to `<a href target rel>` when `destination` becomes a URL, with no visual or positional change | FR-036 |

---

### 5. Footer — `SiteFooter.astro` + `SocialLink.astro`

**Renders**

| Element | Source | Requirement |
|---|---|---|
| Brand mark and/or name | `site.brand` | FR-020 |
| Exactly 2 social links with icons | `site.social` | FR-021 |

**Behaviour**

- Each link carries a recognisable inline-SVG icon plus an accessible text label from `link.label` (FR-021). If the label is visually hidden, it remains in the accessibility tree — `.sr-only`, never `display: none`.
- Each link emits `target="_blank"` and `rel="noopener noreferrer"`, opening in a new tab and leaving the landing page intact (FR-023, US5 scenario 2).
- `href` values come only from `site.social[n].url`, which currently point at the platform homepages (FR-022, US5 scenario 3).
- Icons are `aria-hidden`; the link's accessible name comes from the label, not from the SVG (FR-027, FR-031).

---

## Verification matrix

| Contract area | Verified by |
|---|---|
| Static-first HTML | `curl dist/index.html` grep assertions; `e2e/interactions.spec.ts` with JS disabled |
| Heading order, landmarks, labels | `e2e/accessibility.spec.ts` + axe; `eslint-plugin-jsx-a11y` at author time |
| Content verbatim and complete | `unit/content.test.ts`, `unit/team-section.test.tsx`, `unit/course-section.test.tsx` |
| Responsive integrity, no overflow, 200% zoom | `e2e/responsive.spec.ts` at 320/768/1280/1920 |
| Contrast floors | axe `color-contrast` rule in `e2e/accessibility.spec.ts` |
| Reduced motion | `e2e/reduced-motion.spec.ts` with the media feature emulated |
| CTA inertness and keyboard behaviour | `e2e/interactions.spec.ts` |
| Social links, target, rel, no broken links | `e2e/interactions.spec.ts` |
