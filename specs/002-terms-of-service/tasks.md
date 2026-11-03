---

description: "Task list for the Terms of Service page (Điều khoản sử dụng)"
---

# Tasks: Terms of Service Page ("Điều khoản sử dụng")

**Input**: Design documents from `/specs/002-terms-of-service/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [contracts/terms-copy.md](./contracts/terms-copy.md), [quickstart.md](./quickstart.md)

**Tests**: Included. The plan defines a unit content contract ([data-model.md § Validation rules](./data-model.md)) and an e2e test contract ([ui-contract.md § Test contract](./contracts/ui-contract.md)), and the project's `npm run validate` gate runs both. Write each story's tests first and confirm they fail.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested as its own increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: The user story the task belongs to (US1, US2, US3)

## Path Conventions

Single Astro project: `src/` and `tests/` at the repository root (see plan.md § Project Structure).

---

## Phase 1: Setup

**Purpose**: Confirm a green baseline. No new dependencies or config are needed.

- [X] T001 Run `npm run check` and `npm run test` (scripts in package.json) and confirm both pass before any change. Note: the working tree already has uncommitted post-library edits, including `src/content/types.ts` and `src/pages/tai-lieu/[slug].astro`. Every task below is **additive**: do not revert or reformat those existing edits.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The shared content types and the `site.contact` / `site.legal` strings that all three stories read.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 In src/content/types.ts, add four exported interfaces with doc comments in the file's existing style, then add `readonly contact: ContactInfo;` and `readonly legal: LegalContent;` to `SiteContent`:
  - `ContactInfo { readonly email: string }`. Comment: "The only place the email address is written (FR-006, SC-006)".
  - `LegalContent { readonly termsLabel: string; readonly termsHref: `/${string}`; readonly postNotice: string; readonly emailLabel: string; readonly updatedLabel: string }`.
  - `TermsSection { readonly id: string; readonly heading: string; readonly blocks: readonly PostBlock[]; readonly showContact?: true }`. Doc comments should say:
    - `id`: "Lowercase a–z, 0–9 and hyphens; unique".
    - `heading`: "Stored without a number. The page renders it as `<h2>` prefixed with its position".
    - `blocks`: only `paragraph` and `list`, "no `heading` blocks".
    - `showContact`: the page renders the `mailto:` line from `site.contact.email` after the blocks.
  - `TermsOfUse { readonly title: string; readonly description: string; readonly updatedAt: `${number}-${number}-${number}`; readonly intro: string; readonly sections: readonly TermsSection[] }`. The `updatedAt` comment: "ISO `YYYY-MM-DD`. Displayed as `DD/MM/YYYY`. Update it whenever the text changes".
- [X] T003 In src/content/site.ts, add the two blocks below with exactly these values (copied from contracts/terms-copy.md § Strings in site.ts). Place them before `social`, following the file's rules: plain data, no template literals. Depends on T002.
  - `contact: { email: 'tranthaiminh098@gmail.com' }`
  - `legal: { termsLabel: 'Điều khoản sử dụng', termsHref: '/dieu-khoan-su-dung', emailLabel: 'Email:', updatedLabel: 'Cập nhật lần cuối:', postNotice: 'Bài viết thuộc quyền sở hữu của tác giả và Gieo. Vui lòng không in ấn, biên soạn lại hay sử dụng cho mục đích thương mại khi chưa xin phép.' }`
  
  Add a one-line comment above `contact` saying it is a temporary default to be replaced by a dedicated Gieo address. Run `npm run check` to confirm the `satisfies SiteContent` check passes.

**Checkpoint**: `npm run check` passes, and `site.contact` and `site.legal` are available to every story.

---

## Phase 3: User Story 1 - Understanding what I may do with the materials (Priority: P1) 🎯 MVP

**Goal**: A self-contained `/dieu-khoan-su-dung` page with the eight Vietnamese sections, the last-updated date, and the contact email as a clickable link.

**Independent Test**: Open `/dieu-khoan-su-dung` directly. It shows the h1 "Điều khoản sử dụng", "Cập nhật lần cuối: 03/11/2026", eight numbered sections, section 4 naming "vật chất hóa" and "thương mại hóa", and two `mailto:tranthaiminh098@gmail.com` links (quickstart V-4, V-5, V-6, V-10).

### Tests for User Story 1 ⚠️

> Write these first and confirm they fail (the module and page do not exist yet).

- [X] T004 [P] [US1] Create tests/unit/terms.test.ts (Vitest, importing `terms` from `~/content/terms` and `site` from `~/content/site`). Assert each rule from data-model.md § Validation rules:
  1. `terms.sections.map(s => s.id)` equals `['chap-nhan-dieu-khoan','quyen-so-huu','duoc-phep','can-xin-phep','xin-phep-su-dung','mien-tru-trach-nhiem','thay-doi-dieu-khoan','lien-he-dieu-khoan']`.
  2. Ids are unique, match `/^[a-z0-9-]+$/`, and none is in `['noi-dung','lien-he','gioi-thieu','tai-lieu','khoa-hoc']`.
  3. The text of section `can-xin-phep` contains "vật chất hóa", "thương mại hóa", "in ấn" and "khóa học".
  4. The text of section `duoc-phep` contains "học tập cá nhân", "đường link" and "ghi rõ tên tác giả".
  5. Exactly the sections `xin-phep-su-dung` and `lien-he-dieu-khoan` have `showContact === true`, and no string anywhere in `terms` contains `@`.
  6. `site.contact.email === 'tranthaiminh098@gmail.com'`.
  7. `terms.updatedAt` matches `/^\d{4}-\d{2}-\d{2}$/`, and `new Date(terms.updatedAt)` is a valid date whose ISO date part round-trips.
  8. The total word count of every string in `terms` (split on whitespace) is ≤ 900.
  9. Hygiene: no `\n`, no leading or trailing whitespace, no U+FFFD.
  10. No block in any section has `type === 'heading'`.
  
  Copy the recursive `collectStrings` helper pattern from tests/unit/content.test.ts.
- [X] T005 [P] [US1] In tests/unit/content.test.ts, add a `describe('contact and legal (002 FR-005, FR-010)')` block. Assert:
  - `site.contact.email` is `'tranthaiminh098@gmail.com'`
  - `site.legal.termsHref` is `'/dieu-khoan-su-dung'`
  - `site.legal.termsLabel` is `'Điều khoản sử dụng'`
  - `site.legal.postNotice` contains "thương mại"
- [X] T006 [P] [US1] Create tests/e2e/terms.spec.ts with `test.describe('terms page')` covering ui-contract.md § Test contract items 2–5:
  - **Item 2**: `page.goto('/dieu-khoan-su-dung')`. There are exactly 8 `#noi-dung h2`, whose texts equal `` `${i + 1}. ${terms.sections[i].heading}` `` (import `terms` from `../../src/content/terms`). Body text contains "03/11/2026". There is a `time[datetime="2026-11-03"]`. `a[href="mailto:tranthaiminh098@gmail.com"]` has count 2, and each link's text equals the address.
  - **Item 3**: `request.get('/dieu-khoan-su-dung')`. The raw HTML contains "vật chất hóa" and "thương mại hóa".
  - **Item 4**: at viewport 320×640, `document.documentElement.scrollWidth <= window.innerWidth`.
  - **Item 5**: exactly one `h1` with text "Điều khoản sử dụng"; no skipped heading levels. axe (`@axe-core/playwright`, tags wcag2a/wcag2aa/wcag21a/wcag21aa) reports no critical or serious violations. Use the reveal-settle wait pattern from tests/e2e/accessibility.spec.ts only if the page uses `.reveal`.
  
  Also assert `page.title()` is "Điều khoản sử dụng — Gieo".

### Implementation for User Story 1

- [X] T007 [US1] Create src/content/terms.ts exporting `export const terms: TermsOfUse = { … }`.
  - Header comment in the style of src/content/posts.ts, saying:
    - this is plain data, with no imports besides types
    - the text is transcribed from specs/002-terms-of-service/contracts/terms-copy.md
    - **bump `updatedAt` whenever wording changes**
    - the section order is fixed because section 5 refers to "mục 4"
  - Transcribe **exactly** from contracts/terms-copy.md: `title`, `description`, `updatedAt: '2026-11-03'`, `intro`, and the eight sections in order, with the ids from the copy contract.
  - Bulleted lines become one `{ type: 'list', items: [{ text }] }` block. Other lines become `{ type: 'paragraph', text }` blocks.
  - Set `showContact: true` on `xin-phep-su-dung` and `lien-he-dieu-khoan`.
  - Do **not** write the email or the "→ page renders" lines into any string.
  
  Depends on T002. Then T004 should pass.
- [X] T008 [US1] Create src/pages/dieu-khoan-su-dung.astro following contracts/ui-contract.md § Terms page.
  - Wrap it in `BaseLayout` with `title={`${terms.title} — ${site.brand.name}`}` and `description={terms.description}`.
  - Use `<SiteHeader slot="header" onHome={false} />` with no `current`, and `<SiteFooter />` last.
  - The main element is `<article id="noi-dung" aria-labelledby="gieo-terms-title">`, styled like the post page in src/pages/tai-lieu/[slug].astro: `bg-paper`, `mx-auto max-w-3xl px-4 md:px-8` column, a serif `h1#gieo-terms-title`. No decorative SVGs are needed.
  - Under the `h1`, add `<p>{site.legal.updatedLabel} <time datetime={terms.updatedAt}>{formatPostDate(terms.updatedAt)}</time></p>`, importing `formatPostDate` from `~/lib/posts`. Then add the intro paragraph.
  - For each section at index `i`, render `<section aria-labelledby={section.id}>` containing:
    - `<h2 id={section.id}>{`${i + 1}. ${section.heading}`}</h2>`, styled like `.post-body h2`
    - `<PostBody blocks={section.blocks} />`
    - when `section.showContact` is set, `<p>{site.legal.emailLabel} <a href={`mailto:${site.contact.email}`} class="… break-all font-semibold text-sprout-700 underline …">{site.contact.email}</a></p>`
  - No `client:*` islands.
  
  Depends on T003 and T007. Then T006 should pass.
- [X] T009 [US1] Run `npm run test -- terms content` and `npm run test:e2e -- terms` and fix any failures in src/content/terms.ts or src/pages/dieu-khoan-su-dung.astro until US1 tests pass.

**Checkpoint**: The terms page works when opened directly. This is the MVP.

---

## Phase 4: User Story 2 - Finding the terms from anywhere on the site (Priority: P2)

**Goal**: A "Điều khoản sử dụng" link next to the © line in the shared footer, so it appears on every page.

**Independent Test**: From `/`, `/tai-lieu` and a post, the footer shows the link, Tab gives it a visible focus ring, and clicking it opens a 200 page whose h1 is "Điều khoản sử dụng" (quickstart V-1, V-2, V-3, V-7, V-8). The link's destination is the US1 page; the footer edit can be built first, but the click-through check needs US1.

### Tests for User Story 2 ⚠️

- [X] T010 [US2] In tests/e2e/terms.spec.ts, add `test.describe('footer link')` covering ui-contract.md § Test contract items 1 and 6:
  - **Item 1**: for each path in `['/', '/tai-lieu', `/tai-lieu/${posts[0].slug}`, '/dieu-khoan-su-dung']` (import `posts` from `../../src/content/posts`):
    - `footer a[href="/dieu-khoan-su-dung"]` has count 1, its text is "Điều khoản sử dụng", and it has no `target` attribute
    - clicking it navigates to `/dieu-khoan-su-dung`, where `h1` has the text "Điều khoản sử dụng"
  - **Item 6**: focus the link via the keyboard (`page.goto('/')`, then focus it with `locator.focus()` after a prior `page.keyboard.press('Tab')` so `:focus-visible` applies). Assert a non-`none` outline or box-shadow, the same check as tests/e2e/accessibility.spec.ts. Press Enter and assert the URL ends with `/dieu-khoan-su-dung`.
  
  Also assert `footer#lien-he` still exists on the terms page. Confirm the tests fail before T011.

### Implementation for User Story 2

- [X] T011 [US2] In src/sections/SiteFooter.astro, replace the lone `<p class="text-xs text-ink-muted">© {year} {site.brand.name}</p>` with a centred, wrapping row: `<p class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-ink-muted">`. It contains:
  - `<span>© {year} {site.brand.name}</span>`
  - `<span aria-hidden="true">·</span>`
  - `<a href={site.legal.termsHref} class="rounded-sm underline-offset-2 hover:text-sprout-800 hover:underline">{site.legal.termsLabel}</a>`
  
  The global `:focus-visible` rule in src/styles/global.css provides the focus ring, so do not suppress outlines. Keep `id="lien-he"` and everything else unchanged. Update the top-of-file comment to mention 002 FR-010.
- [X] T012 [US2] Run `npm run test:e2e -- terms accessibility interactions` and confirm the footer tests pass and the existing home-page axe, focus and "no dead links" tests stay green.

**Checkpoint**: US1 and US2 both work. The terms page can be found from every page.

---

## Phase 5: User Story 3 - Notice on each post (Priority: P3)

**Goal**: A short copyright notice after every post body, linking to the terms.

**Independent Test**: Open any post. After the body and before "Bài viết khác", an `<aside>` shows `site.legal.postNotice` and a "Điều khoản sử dụng" link to `/dieu-khoan-su-dung` (quickstart V-9).

### Tests for User Story 3 ⚠️

- [X] T013 [US3] In tests/e2e/terms.spec.ts, add `test.describe('post notice')` covering ui-contract.md § Test contract item 7. For every post in `posts`:
  - `page.goto(`/tai-lieu/${post.slug}`)`
  - `#noi-dung aside.post-legal` has count 1, contains `site.legal.postNotice`, and contains `a[href="/dieu-khoan-su-dung"]` with text "Điều khoản sử dụng"
  - the aside contains no `h1`–`h6`, and it is not inside `.post-body`
  
  Confirm the tests fail before T014.

### Implementation for User Story 3

- [X] T014 [US3] In src/pages/tai-lieu/[slug].astro, directly after `<div class="mt-10"><PostBody blocks={post.body} /></div>` and still inside the `max-w-3xl` column, add:
  `<aside class="post-legal mt-12 rounded-2xl border border-sprout-200 bg-sprout-50/60 px-5 py-4 text-sm leading-relaxed text-print-muted">{site.legal.postNotice}{' '}<a href={site.legal.termsHref} class="font-semibold text-sprout-700 underline underline-offset-2 hover:text-sprout-900">{site.legal.termsLabel}</a></aside>`
  
  Keep the existing uncommitted edits in this file intact. Update the top-of-file comment to mention the notice.
- [X] T015 [US3] Run `npm run test:e2e -- terms posts` and confirm the post-notice tests pass and the existing post-page tests stay green, including axe on post pages and 320 px with no horizontal scroll.

**Checkpoint**: All three stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T016 Run `npm run format` then `npm run lint`, and fix any issues in src/content/terms.ts, src/pages/dieu-khoan-su-dung.astro, src/sections/SiteFooter.astro, src/pages/tai-lieu/[slug].astro, tests/unit/terms.test.ts and tests/e2e/terms.spec.ts. Do not reformat unrelated files.
- [X] T017 Run `npm run validate` (check, lint, unit, build, all e2e across chromium, firefox and webkit) and confirm it is fully green.
- [X] T018 Verify SC-006: a search for `tranthaiminh098@gmail.com` under src/ returns exactly one hit, in src/content/site.ts (quickstart V-11).
- [X] T019 Walk through the manual scenarios V-1 to V-10 in specs/002-terms-of-service/quickstart.md against `npm run build && npm run preview`, including timing a full read of the page (SC-003: under 5 minutes) and the 320 px DevTools check.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: T002 → T003. Blocks all stories.
- **US1 (Phase 3)**: after Phase 2.
- **US2 (Phase 4)**: after Phase 2. T011 can be built without US1, but T010's click-through assertions need the US1 page (T008).
- **US3 (Phase 5)**: after Phase 2. Independent of US1 and US2 for rendering; the notice link points to the US1 page.
- **Polish (Phase 6)**: after the stories you intend to ship.

### Within each story

- Tests first (they must fail), then content, then page, then run.
- T007 before T008 (the page imports `terms`).
- T006, T010 and T013 all edit tests/e2e/terms.spec.ts, so they run **sequentially**, never in parallel.

### Parallel Opportunities

- T004, T005 and T006 are different files and can run together.
- After Phase 2, T011 (footer) and T014 (post page) touch different files from US1's T007 and T008, so they can be implemented alongside US1. Their e2e tests still go into the shared spec file one at a time.

---

## Parallel Example: User Story 1

```bash
# Write all US1 tests together (different files):
Task: "Create tests/unit/terms.test.ts (data-model.md rules 1–10)"
Task: "Add contact/legal assertions to tests/unit/content.test.ts"
Task: "Create tests/e2e/terms.spec.ts 'terms page' describe (ui-contract items 2–5)"

# After the tests: T007 (src/content/terms.ts), then T008 (src/pages/dieu-khoan-su-dung.astro)
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1 (T001) and Phase 2 (T002–T003)
2. Phase 3 (T004–T009)
3. **Stop and validate**: open `/dieu-khoan-su-dung` directly. The page is shareable as a link even before the footer link exists.

### Incremental Delivery

1. Setup + Foundational → types and strings ready
2. US1 → terms page (MVP)
3. US2 → footer link on every page. This is what makes the terms discoverable; ship it together with US1 if possible.
4. US3 → per-post notice
5. Polish → full `validate` and manual quickstart

---

## Notes

- Every user-visible string comes from src/content/site.ts or src/content/terms.ts. No Vietnamese copy is hard-coded in `.astro` files.
- The terms text in contracts/terms-copy.md is the source of truth. Wording changes go there first, then into terms.ts with a new `updatedAt`.
- Commit after each phase checkpoint.

## Implementation Notes (2026-11-03)

- **T016**: Prettier passes on every changed file (`--end-of-line auto`, which keeps the repo's CRLF checkouts). ESLint **could not run**: `eslint.config.js` throws on load (`jsxA11y.flatConfigs` is undefined), a problem that predates this feature.
- **T017**: `npm run validate` is not fully green, because of problems that predate this feature:
  - `astro check` reports 7 type errors in `playwright.config.ts`, `vitest.config.ts` and `tests/unit/team-section.test.ts`
  - 3 unit tests in `tests/unit/content.test.ts` fail: the team achievements were edited in `site.ts` but the verbatim assertions were not
  - the home-page axe test (`accessibility.spec.ts:11`) times out waiting for scroll reveals; it fails the same way with the original footer
  
  Everything this feature added or touched passes: 71 unit tests minus those 3, and 171 of 174 e2e tests across chromium, firefox and webkit. Firefox and WebKit were installed with `npx playwright install firefox webkit`.
- **T017 side effect**: `tests/unit/materials-section.test.ts` counted every `<a` in the footer; it now counts external (social) links only, and it gained a terms-link assertion.
- **T019**: Checked with screenshots of the built site: the terms page at 1280 and 320 px, the footer, and the post notice. Timing a human read and clicking through to a mail client still need a person to do them.
