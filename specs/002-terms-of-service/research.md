# Research: Terms of Service Page

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Technical Context had no NEEDS CLARIFICATION items. The decisions below settle each design choice the spec left open.

---

## R-001: What the terms contain

- **Decision**: Eight short sections in the order FR-003 lists: acceptance, ownership, permitted uses, uses that need permission, how to ask, disclaimer, changes, contact. Add one sentence on enforcement (Gieo may request removal and act under the law) at the end of the "need permission" section. The full text is in [contracts/terms-copy.md](./contracts/terms-copy.md).
- **Rationale**: Content-sharing sites in Vietnam (education blogs, news sites, course platforms) commonly use this structure. It is also the common core of Creative Commons BY-NC-ND–style terms: credit required, no commercial use, no derivatives without permission. Writing it in plain "mình/bạn" Vietnamese matches the site's voice and FR-009.
- **Alternatives considered**:
  - *Adopt a Creative Commons licence (CC BY-NC-ND 4.0) and link to it*: rejected. Its legal text is in English and long, and the user asked for terms that require asking the author. A CC licence grants rights up front instead.
  - *A full legal ToS (liability caps, jurisdiction, dispute resolution)*: rejected. The user said not to go into detail, and the site has no accounts or transactions to cover.

## R-002: Where the terms text lives

- **Decision**: A new module, `src/content/terms.ts`, exporting `terms: TermsOfUse`. Each section's body is a `readonly PostBlock[]`.
- **Rationale**: This follows the existing rule that all copy lives in typed, plain-data content modules. Reusing `PostBlock` means `PostBody.astro` and the `.post-body` styles render the terms with no new component or CSS, and the typography matches the post pages. A separate module keeps `site.ts` (UI strings) small; long-form text sits beside `posts.ts`.
- **Alternatives considered**:
  - *Write the text directly in the `.astro` page*: rejected. It breaks the content-module convention and can't be unit-tested without rendering.
  - *Markdown/MDX file*: rejected. The project chose structured blocks over Markdown for posts (`types.ts` comment), so terms should be consistent with that.
  - *Put it inside `site.ts`*: rejected. It would roughly double the file and mix long text with UI labels.

## R-003: Showing a clickable email inside text blocks

- **Decision**: `PostBlock` stays unchanged. A `TermsSection` has an optional `showContact: true` flag. The page renders the section's blocks, then a line with a `mailto:` link whose text is the address itself. Sections 5 (Xin phép sử dụng) and 8 (Liên hệ) set the flag.
- **Rationale**: FR-005 needs the email visible and clickable. FR-006/SC-006 need it defined in one place (`site.contact.email`). Writing it inline in paragraph strings would duplicate it and leave it unlinked. A flag keeps the data plain and the link markup in the page.
- **Alternatives considered**:
  - *Add a `contact` or `link` variant to `PostBlock`*: rejected. It widens a type posts use and `PostBody` would need to know about site config.
  - *Placeholder token such as `{email}` in strings, replaced at render*: rejected. `site.ts` rules forbid computed/templated content, and a token would break unit tests that check the copy.

## R-004: URL and page location

- **Decision**: `/dieu-khoan-su-dung`, served from `src/pages/dieu-khoan-su-dung.astro`. The path is stored as `site.legal.termsHref` so the footer and post notice share it.
- **Rationale**: This is the unaccented-Vietnamese slug convention already used for `/tai-lieu`. The page is site-wide, so it sits at the top level and not under `/tai-lieu`.
- **Alternatives considered**: `/terms` (English, which doesn't fit the site); `/dieu-khoan` (shorter, but less exact than the page title).

## R-005: Footer placement

- **Decision**: Add a small row at the bottom of the footer: the existing `© {year} Gieo` text, a separator, then a "Điều khoản sử dụng" link, all in the same `text-xs` style. On narrow screens the row wraps and stays centred. The link is underlined on hover and has the site's standard visible focus ring.
- **Rationale**: Placing legal links next to the copyright line is a widely used convention, and visitors look for them there. Because the footer is one shared component, every page gets the link (FR-011) from a single edit.
- **Alternatives considered**: A header nav item (rejected: it is not a primary destination and the header is already full on phones); a separate footer link column (rejected: there is only one link).

## R-006: "Last updated" date

- **Decision**: Store `updatedAt: '2026-11-03'` (ISO) in `terms.ts` and display it as "Cập nhật lần cuối: 03/11/2026" with a `<time datetime>` element, formatted by the existing `formatPostDate`.
- **Rationale**: This matches how post dates are stored and shown. `<time datetime>` gives machines the exact date.
- **Alternatives considered**: Computing the date from the build time or git history. Rejected: the date must change only when the terms text changes, not on every deploy.

## R-007: Per-post notice (US3)

- **Decision**: After `PostBody` in `tai-lieu/[slug].astro`, render a small bordered `<aside>`. The text comes from `site.legal.postNotice`, followed by a link labelled `site.legal.termsLabel` pointing to `site.legal.termsHref`.
- **Rationale**: The reminder sits right after the content people copy. Making it an `<aside>` keeps it out of the article's heading outline, and putting it outside `.post-body` keeps it from looking like part of the article.
- **Alternatives considered**: Putting the notice in the byline (rejected: it pushes the title and summary down and is easy to skim past); a visible watermark or copy-blocking script (rejected: hostile to legitimate study use, easy to bypass, and requires JavaScript).

## R-008: Legal grounding

- **Decision**: Refer to "pháp luật Việt Nam về sở hữu trí tuệ" generally, without citing article numbers.
- **Rationale**: Vietnam's Law on Intellectual Property protects authors' rights automatically when a work is created, with no registration needed. That makes the ownership statement valid without listing articles, and a general reference stays correct if the law is amended. The spec's Assumptions already note that the text is not a substitute for a lawyer's review.
- **Alternatives considered**: Citing specific articles (rejected: they can go out of date, and the user asked for little detail).
