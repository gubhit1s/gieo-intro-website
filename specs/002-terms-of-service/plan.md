# Implementation Plan: Terms of Service Page ("Điều khoản sử dụng")

**Branch**: `002-terms-of-service` | **Date**: 2026-11-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-terms-of-service/spec.md`

## Summary

Add one static Vietnamese page, `/dieu-khoan-su-dung`, stating how Gieo's posts may be used. The core message: reading and personal study are welcome, while turning the content into products ("vật chất hóa") or using it commercially ("thương mại hóa") needs the author's written permission. The page is linked from the shared footer, so it appears on every page. Each post also ends with a short copyright notice that links to the terms.

**Technical approach**: no new dependencies and no JavaScript. The terms text is plain data in a new `src/content/terms.ts`, written as the same `PostBlock` structure posts use. The page renders it with the existing `PostBody` component and `.post-body` styles, so it matches the reading pages. The contact email lives once, in `site.contact.email`, and every place that shows it reads it from there. The "last updated" date is ISO in data and displayed through the existing `formatPostDate`. Decisions and alternatives: [research.md](./research.md).

## Technical Context

**Language/Version**: TypeScript (strict), Node.js ≥ 22.12, matching the existing project

**Primary Dependencies**: Astro 7 and Tailwind CSS 4, both already in the project. No new packages.

**Storage**: N/A. Terms text is compiled into the static build from `src/content/terms.ts`.

**Testing**: Vitest for the content module (required sections, key prohibitions, email, word budget, text hygiene). Playwright and axe on the built site for the footer link on every page, the mailto link, the per-post notice, 320 px layout and accessibility.

**Target Platform**: Static site output (`dist/`), the same browsers and in-app webviews as feature 001

**Project Type**: Static content website, frontend only

**Performance Goals**: The page is pure static HTML with no added JavaScript, and loads as fast as the existing post pages

**Constraints**: Vietnamese copy only. Readable in under 5 minutes (≤ 900 words, SC-003). No horizontal scroll at 320 px (SC-005). The email is defined in exactly one place (SC-006). The site's existing contrast and focus-visibility standards apply.

**Scale/Scope**: 1 new page, 1 new content module, footer and post-page edits, about 2 new test files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

`.specify/memory/constitution.md` is still the unfilled template, so it defines no principles and no gates. Instead, this plan follows the conventions feature 001 set up in the codebase and treats them as working gates:

| Convention (source) | How this plan complies |
|---|---|
| All user-visible copy lives in typed content modules under `src/content/`, as plain data with no computed values (`site.ts` header) | Terms text goes in `src/content/terms.ts`; footer label, post notice and email go in `site.ts` |
| Static HTML first; JavaScript islands only when justified (001 `ui-contract.md`) | No islands; the page has no JavaScript |
| Every page has `id="noi-dung"` as the skip-link target, exactly one `<h1>`, and labelled landmarks | Specified in [contracts/ui-contract.md](./contracts/ui-contract.md) |
| axe has no critical or serious violations; visible focus; no overflow at 320 px | Covered by the e2e checks in [quickstart.md](./quickstart.md) |
| Sub-pages use `SiteHeader onHome={false}` | Applied; there is no `current` nav item because the terms page is not in the header nav |

**Result**: PASS (no violations). **Post-design re-check**: PASS. The design adds no dependencies, islands or new styling system.

## Project Structure

### Documentation (this feature)

```text
specs/002-terms-of-service/
├── plan.md              # This file
├── research.md          # Phase 0: decisions and alternatives
├── data-model.md        # Phase 1: content entities and validation rules
├── quickstart.md        # Phase 1: validation scenarios
├── contracts/
│   ├── ui-contract.md   # DOM/behaviour guarantees for the page, footer and post notice
│   └── terms-copy.md    # The Vietnamese terms text to ship (review before implementing)
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
src/
├── content/
│   ├── types.ts                 # + ContactInfo, LegalContent, TermsSection, TermsOfUse
│   ├── site.ts                  # + contact.email, legal.{termsLabel, termsHref, postNotice, …}
│   └── terms.ts                 # NEW — the terms text as PostBlock sections
├── pages/
│   ├── dieu-khoan-su-dung.astro # NEW — the terms page
│   └── tai-lieu/[slug].astro    # + copyright notice after PostBody (US3)
└── sections/
    └── SiteFooter.astro         # + "Điều khoản sử dụng" link beside the © line

tests/
├── unit/
│   ├── terms.test.ts            # NEW — content contract for terms.ts and site.legal/contact
│   └── content.test.ts          # + contact email default assertion
└── e2e/
    └── terms.spec.ts            # NEW — footer link on every page, page content, mailto, notice, a11y, 320px
```

**Structure Decision**: Use the existing single Astro project. The new page goes in `src/pages/` as a top-level route, because it is site-wide and not part of the `/tai-lieu` library. Its copy follows the existing content-module pattern. No new components are needed: `PostBody` renders the section bodies, and the page's inline markup renders the email link.

## Complexity Tracking

No constitution violations to justify.
