# Contract: UI Rendering and Behaviour

**Feature**: [spec.md](../spec.md) | **Plan**: [plan.md](../plan.md) | **Copy**: [terms-copy.md](./terms-copy.md)

What a visitor, screen reader or crawler receives. Each row can be checked against the built site.

---

## Terms page: `/dieu-khoan-su-dung`

### Document

| Guarantee | Requirement |
|---|---|
| Responds 200 from the static build; all terms text is in the raw HTML with no JavaScript needed | FR-001, static-first (001) |
| `<html lang="vi">`; `<title>` is `Điều khoản sử dụng — Gieo`; meta description is `terms.description` | FR-008 |
| Uses `BaseLayout`, `SiteHeader onHome={false}` (no `current`), and `SiteFooter` | FR-007, US2 scenario 2 |
| The header logo link goes to `/` | US2 scenario 3 |
| The main content element has `id="noi-dung"` (skip-link target) and `aria-labelledby` pointing at the `<h1>` | 001 convention |
| No new client-side JavaScript (no islands) | plan |

### Structure, in source order

1. `<h1>`: `terms.title`. Exactly one `<h1>` on the page.
2. `{site.legal.updatedLabel} <time datetime="2026-11-03">03/11/2026</time>`, near the title. FR-002.
3. Intro paragraph (`terms.intro`).
4. Eight `<section>`s, one per `terms.sections` entry, in order. Each section:
   - has an `<h2 id={section.id}>` with text `{n}. {heading}`, and `aria-labelledby` pointing at it
   - renders `blocks` through `PostBody` (inherits `.post-body` typography)
   - if `showContact`, then renders a paragraph `{site.legal.emailLabel} <a href="mailto:{site.contact.email}">{site.contact.email}</a>` after the blocks. The link text is the full address, so it can be copied (edge case: no mail client). FR-005.
5. Heading outline: h1 → h2 only, with no skipped levels.

### Layout

| Guarantee | Requirement |
|---|---|
| Text column max width matches post pages (`max-w-3xl`) | FR-007 |
| `document.documentElement.scrollWidth <= innerWidth` at 320, 375, 768, 1280 px. The email address may break mid-word (`break-all` / `overflow-wrap:anywhere`) so it cannot overflow | SC-005 |
| Background and typography come from existing tokens (`bg-paper` / `sprout-*` / `font-serif` headings); no new colours | FR-007 |
| Decorative artwork, if any, is `aria-hidden` and does not overlap the text column | 001 FR-027 |

## Footer link (every page)

| Guarantee | Requirement |
|---|---|
| `SiteFooter` contains `<a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>` on the same row as `© {year} Gieo`, centred, wrapping on narrow screens | FR-010, R-005 |
| Present on `/`, `/tai-lieu`, every `/tai-lieu/<slug>`, and `/dieu-khoan-su-dung` | FR-011, SC-004 |
| Opens in the same tab (no `target`) | — |
| Reachable with Tab; has a visible focus indicator; activates with Enter | FR-012, US2 scenario 4 |
| Text contrast passes axe at WCAG AA (≥ 4.5:1 against the footer gradient) | FR-012 |
| The footer's existing `id="lien-he"` is unchanged. No terms-page element reuses `lien-he` | data-model note |

## Post notice (each `/tai-lieu/<slug>`)

| Guarantee | Requirement |
|---|---|
| An `<aside>` placed directly after the `PostBody` output, inside the article column, outside `.post-body` | FR-013, R-007 |
| Contains `site.legal.postNotice` followed by a link `<a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>` | US3 scenario 1 |
| Contains no heading element (does not change the article outline) | 001 FR-031 |
| Visually secondary: small text with a muted colour that still passes AA contrast, and a top border or soft tinted box | — |

## Test contract

`tests/e2e/terms.spec.ts` must cover:

1. For each of `/`, `/tai-lieu`, the first post, `/dieu-khoan-su-dung`: the footer link exists with the exact label and href, and clicking it lands on a 200 page whose `<h1>` is "Điều khoản sử dụng".
2. Terms page: 8 `h2` in order matching the copy contract; date text "03/11/2026"; exactly 2 `a[href="mailto:tranthaiminh098@gmail.com"]`, each showing the address as text.
3. Terms page: the raw HTML (request, not page) contains "vật chất hóa" and "thương mại hóa".
4. Terms page at 320 px: no horizontal scroll.
5. Terms page: axe reports no critical or serious violations; one `h1`; no skipped heading levels.
6. Footer link: keyboard focus shows a visible indicator (same approach as `accessibility.spec.ts`).
7. Every post page: the `aside` notice is present and its link points at `/dieu-khoan-su-dung`.
