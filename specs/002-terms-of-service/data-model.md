# Data Model: Terms of Service Page

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This feature has no runtime data or persistence. The "entities" are typed content in `src/content/`, compiled into the static build. The types go in `src/content/types.ts`, next to the existing ones.

---

## ContactInfo (new, in `SiteContent`)

The site-wide contact point. **The only place the email address is written** (FR-006, SC-006).

| Field | Type | Rules |
|---|---|---|
| `email` | `string` | Valid address shape (`x@y.z`). Default `tranthaiminh098@gmail.com` |

Lives at `site.contact`. Read by the terms page (sections flagged `showContact`). Future features (for example, the footer) can read it too.

## LegalContent (new, in `SiteContent`)

UI strings for the terms links shown outside the terms page itself.

| Field | Type | Rules |
|---|---|---|
| `termsLabel` | `string` | `'Điều khoản sử dụng'`. Used as the footer link text and the post-notice link text |
| `termsHref` | `` `/${string}` `` | `'/dieu-khoan-su-dung'`. Must match the page file's route |
| `postNotice` | `string` | One or two sentences. Must mention ownership and the commercial-use restriction (FR-013) |
| `emailLabel` | `string` | `'Email:'`. The label before the `mailto:` link on the terms page |
| `updatedLabel` | `string` | `'Cập nhật lần cuối:'`. The label before the date on the terms page |

Lives at `site.legal`.

## TermsOfUse (new, `src/content/terms.ts`)

The terms document.

| Field | Type | Rules |
|---|---|---|
| `title` | `string` | `'Điều khoản sử dụng'`. The page's single `<h1>` |
| `description` | `string` | Meta description, one sentence (FR-008) |
| `updatedAt` | `` `${number}-${number}-${number}` `` | ISO `YYYY-MM-DD`. Displayed as `DD/MM/YYYY` (FR-002). Update it whenever the text changes |
| `intro` | `string` | One short paragraph shown under the date |
| `sections` | `readonly TermsSection[]` | Exactly 8, in the FR-003 order |

## TermsSection

| Field | Type | Rules |
|---|---|---|
| `id` | `string` | Lowercase a–z, 0–9 and hyphens; unique. Used as the heading's `id` so sections can be linked to directly |
| `heading` | `string` | Stored without a number. The page renders it as `<h2>` prefixed with its position ("1. …"). Section 5's text refers to "mục 4", so the order is fixed (validation rule 1) |
| `blocks` | `readonly PostBlock[]` | Existing type. Only `paragraph` and `list` are used; **no `heading` blocks** (that would break the h1 → h2 outline) |
| `showContact` | `true` (optional) | When set, the page renders the `mailto:` line from `site.contact.email` after the blocks (R-003) |

### Required section ids, in order

| # | `id` | Heading | `showContact` |
|---|---|---|---|
| 1 | `chap-nhan-dieu-khoan` | Chấp nhận điều khoản | — |
| 2 | `quyen-so-huu` | Quyền sở hữu nội dung | — |
| 3 | `duoc-phep` | Những việc bạn được làm | — |
| 4 | `can-xin-phep` | Những việc không được làm khi chưa có sự đồng ý | — |
| 5 | `xin-phep-su-dung` | Xin phép sử dụng | ✓ |
| 6 | `mien-tru-trach-nhiem` | Miễn trừ trách nhiệm | — |
| 7 | `thay-doi-dieu-khoan` | Thay đổi điều khoản | — |
| 8 | `lien-he-dieu-khoan` | Liên hệ | ✓ |

> ⚠️ Section 8 is not `lien-he`: that is already the footer's `id`, which the header's "Liên hệ" button jumps to. Duplicate ids on one page are invalid HTML and would break that button on the terms page.

## Validation rules (enforced by `tests/unit/terms.test.ts`)

1. `terms.sections.map(s => s.id)` equals the eight ids above, in order.
2. Section ids are unique and none equals an existing page id (`noi-dung`, `lien-he`, `gioi-thieu`, `tai-lieu`, `khoa-hoc`).
3. Section `can-xin-phep` text contains "vật chất hóa" and "thương mại hóa" (FR-004), plus the examples "in ấn" and "khóa học" (US1 scenario 3). Spelling follows the site's existing "Khóa học" convention: the tone mark goes on the vowel, written `hóa`, not `hoá`.
4. Section `duoc-phep` mentions personal study, sharing a link, and attribution when quoting (US1 scenario 2).
5. Sections `xin-phep-su-dung` and `lien-he-dieu-khoan` have `showContact: true`. No string anywhere in `terms` contains `@` (the email is never duplicated into the text, SC-006).
6. `site.contact.email === 'tranthaiminh098@gmail.com'`.
7. `updatedAt` matches `/^\d{4}-\d{2}-\d{2}$/` and is a real date.
8. Total word count of all terms strings is ≤ 900 (SC-003).
9. Hygiene, same as `content.test.ts`: no `\n`, no leading or trailing whitespace, no U+FFFD.
10. No section contains a `heading` block.

## Relationships

```text
site.contact.email ──► terms page (sections with showContact)
site.legal.termsHref ─► SiteFooter link, post notice link ─► /dieu-khoan-su-dung (renders `terms`)
terms.sections[].blocks : PostBlock[] ─► PostBody.astro
terms.updatedAt ─► formatPostDate()
```
