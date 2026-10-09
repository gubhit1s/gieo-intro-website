# Phase 1 Data Model: Gieo Landing Site

**Date**: 2026-10-09
**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

There is no database and no runtime persistence. "Data model" here means the **shape of the site's content**, which lives in `src/content/site.ts` and is compiled into the static build. The types in `src/content/types.ts` are the enforcement mechanism — several spec requirements are satisfied by the type system rather than by a test.

---

## Entity overview

| Entity | Count in this release | Source requirement |
|---|---|---|
| `SiteContent` | 1 (root) | FR-001 |
| `TeamMember` | exactly 2 | FR-008 |
| `Achievement` | 4 + 2 | FR-010, FR-011 |
| `MaterialEntry` | ≥ 3 | FR-014 |
| `CourseOutcome` | ≥ 4 | FR-018 |
| `SocialLink` | exactly 2 | FR-021 |
| `CallToAction` | 1 | FR-033 |

---

## `SiteContent` (root)

The single exported object. Every section reads its content from here.

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `brand` | `Brand` | required | FR-004, FR-020 |
| `hero` | `Hero` | required | FR-005–007 |
| `team` | `TeamSection` | required | FR-008 |
| `materials` | `MaterialsSection` | required | FR-013 |
| `course` | `CourseSection` | required | FR-017 |
| `social` | `readonly [SocialLink, SocialLink]` | exactly 2 | FR-021 |

---

## `Brand`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `name` | `string` | `"Gieo"` | FR-004 |
| `tagline` | `string` | short descriptor for footer and metadata | FR-020 |

---

## `Hero`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `headline` | `string` | one sentence, Vietnamese. Seed value: `"Chinh phục học sinh giỏi không khó như bạn nghĩ"` | FR-005 |
| `subheadline` | `string \| null` | optional supporting line | — |
| `scrollCueLabel` | `string` | accessible label for the scroll cue | FR-007, FR-031 |

**Validation rules**

- `headline` must contain no line-break characters — wrapping is the layout's job, not the content's, or it breaks at 320px (FR-003).
- `headline` is rendered as the page's single `<h1>` (FR-031 heading order).

---

## `TeamSection` and `TeamMember`

```
TeamSection
  heading: string                              // "Chúng mình là"           FR-008
  members: readonly [TeamMember, TeamMember]   // exactly two               FR-008
```

### `TeamMember`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `id` | `string` | stable slug, e.g. `"ha-giang"` | — |
| `name` | `string` | full Vietnamese name with diacritics | FR-009, FR-012 |
| `role` | `string \| null` | optional short label | FR-009 |
| `portrait` | `ImageRef \| null` | `null` in this release — cards render an initial-based placeholder | Assumptions |
| `achievements` | `readonly Achievement[]` | non-empty | FR-009 |

**Validation rules**

- `members` is a **fixed-length tuple**, not an array. This makes FR-008's "exactly two members" a compile error rather than a test failure.
- `portrait` being nullable is what lets real photographs arrive later without the card being redesigned (spec Assumptions).

### `Achievement`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `text` | `string` | the credential as displayed, full Vietnamese diacritics | FR-010, FR-011, FR-012 |
| `year` | `string \| null` | e.g. `"2020-2021"`, for optional emphasis | spec Key Entities |
| `level` | `'quoc-gia' \| 'tinh' \| 'khac' \| null` | optional grouping | spec Key Entities |

**Seed content — fixed by FR-010 and FR-011, and asserted verbatim by `content.test.ts` (SC-004)**

`ha-giang` — Nguyễn Thị Hà Giang, 4 achievements:

1. Giải nhì Ngữ văn kỳ thi chọn học sinh giỏi cấp quốc gia năm học 2020-2021 — `level: 'quoc-gia'`
2. Giải nhất Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021 — `level: 'tinh'`
3. Huy chương bạc trại hè năm 2020-2021 — `level: 'khac'`
4. Từng là phóng viên báo VTV và báo Tuổi Trẻ — `level: null`, `year: null`

`bao-quyen` — Nguyễn Hồng Bảo Quyên, 2 achievements:

1. 9.5 điểm Ngữ văn THPT Quốc gia 2023 — thủ khoa Văn tỉnh Lâm Đồng — `level: 'quoc-gia'`, `year: '2023'`
2. Thủ khoa Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021 — `level: 'tinh'`

> **Content integrity rule**: these strings are the spec's content, not the developer's. Changing one changes the brand's public claims about a real person's record. Any edit requires the same confirmation the spec required, and `content.test.ts` exists to make an accidental edit fail loudly.

---

## `MaterialsSection` and `MaterialEntry`

```
MaterialsSection
  heading: string                        // "Những tài liệu của chúng mình"   FR-013
  subtitle: string                       // required                           FR-013
  entries: readonly MaterialEntry[]      // length >= 3                        FR-014
```

### `MaterialEntry`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `id` | `string` | stable slug | — |
| `title` | `string` | placeholder copy in this release | FR-015 |
| `description` | `string` | placeholder copy in this release | FR-015 |
| `href` | `string \| null` | **`null` in every entry this release** | FR-015, FR-016 |
| `isPlaceholder` | `true` | literal `true` this release | FR-015 |

**Validation rules**

- `href: null` is the mechanism for FR-015 and FR-003's "no dead end": `MaterialCard.astro` renders a non-interactive `<article>` when `href` is `null`, and an `<a>` only when a real URL is present. There is no code path that produces a link to nowhere.
- `isPlaceholder` typed as the literal `true` makes the placeholder state explicit and greppable. When real materials arrive, removing the field is a type error at every call site that still assumes it — a deliberate tripwire so the section cannot half-migrate.
- Minimum of 3 entries (FR-014) is asserted in `content.test.ts`; a tuple would be wrong here because the count is expected to grow.

---

## `CourseSection`, `CourseOutcome` and `CallToAction`

```
CourseSection
  heading: string                      //                                     FR-017
  description: string                  // short introductory passage          FR-017
  outcomes: readonly CourseOutcome[]   // length >= 4                         FR-018
  cta: CallToAction                    //                                     FR-033
```

### `CourseOutcome`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `id` | `string` | stable slug | — |
| `text` | `string` | one scannable phrase, a concrete student gain | FR-018, FR-019 |
| `icon` | `PlantIconName \| null` | optional decorative mark | FR-018 |

**Seed content — the four required by FR-018, asserted verbatim (SC-004)**

1. Kỹ năng liên tưởng tác phẩm
2. Kỹ năng phản đề
3. Lý luận văn học
4. Tài liệu được biên soạn bởi cựu học sinh giỏi Văn

Further outcomes may be added; these four are the floor.

**Validation rules**

- `text` must read as a gain for the student, not as course logistics (FR-019). Not machine-checkable — enforced at review.
- `icon` is decorative only; `OutcomeItem.astro` renders it `aria-hidden` (FR-027).

### `CallToAction`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `label` | `string` | Vietnamese button text, e.g. `"Đăng ký tư vấn"` | FR-034 |
| `destination` | `string \| null` | **`null` in this release** | FR-034, FR-036 |

**Validation rules**

- `destination: null` makes the button inert *by data*, not by commented-out code. `CallToActionButton.tsx` renders an enabled `<button type="button">` with a no-op handler when `destination` is `null`, and an `<a href>` when it is a URL.
- The button is never `disabled` and never an `<a href="#">` — both fail requirements for specific reasons documented in [research.md](./research.md) R-008.
- Attaching a real destination later is a single string edit here, with no component change (FR-036, SC-009).

---

## `SocialLink`

| Field | Type | Rule | Requirement |
|---|---|---|---|
| `platform` | `'facebook' \| 'tiktok'` | union, extensible | FR-021 |
| `url` | `string` | platform homepage this release | FR-022 |
| `label` | `string` | **required** accessible label | FR-021, FR-031 |

**Seed content**

| platform | url | label |
|---|---|---|
| `facebook` | `https://www.facebook.com/` | `Gieo trên Facebook` |
| `tiktok` | `https://www.tiktok.com/` | `Gieo trên TikTok` |

**Validation rules**

- `label` is non-optional in the type. FR-021 requires an accessible label on every social link, and an optional field would let one ship without it.
- `SocialLink.astro` always emits `target="_blank"` and `rel="noopener noreferrer"` (FR-023).
- Both URLs are defined only here, satisfying FR-022's single-edit requirement.

---

## Supporting types

```
ImageRef      { src: string; alt: string }      // alt required — no undescribed content images
PlantIconName 'sprout' | 'leaf-pair' | 'grass-tuft' | 'falling-seed'
```

`ImageRef.alt` is required rather than optional: a content image without alt text fails FR-031. Decorative artwork does not use `ImageRef` at all — it is inline SVG marked `aria-hidden` (FR-027), which keeps the two categories structurally impossible to confuse.

---

## State transitions

The site is stateless. There is no persistence, no session, no user-specific state, and nothing survives a page reload.

Two ephemeral, in-memory UI states exist, both derived rather than stored:

| State | Owner | Transition | Requirement |
|---|---|---|---|
| Scroll-reveal `hidden → visible` | `ScrollReveal.tsx` | One-way, fires once when the element enters the viewport; never reverses | FR-029 |
| Reduced-motion `on / off` | `useReducedMotion()` | Read from the OS media query; when on, reveal is skipped and elements mount visible | FR-030, SC-006 |

The one-way constraint on scroll-reveal is deliberate: a reveal that reverses on scroll-up produces content that moves while being read, which FR-029 prohibits.

---

## Requirement traceability

| Requirement | Enforced by |
|---|---|
| FR-008 exactly two members | Tuple type `[TeamMember, TeamMember]` — compile-time |
| FR-010, FR-011 exact achievements | Seed content above + `content.test.ts` verbatim assertions |
| FR-012 diacritics preserved | Content module is the single source; Playwright asserts rendered text |
| FR-014 ≥ 3 material entries | `content.test.ts` length assertion |
| FR-015 no real material links | `href: null` + `isPlaceholder: true` on every entry |
| FR-016 materials replaceable | Nullable `href` with both render paths already implemented |
| FR-018 ≥ 4 outcomes incl. the named four | `content.test.ts` length + verbatim assertions |
| FR-021 accessible labels | `label` non-optional in `SocialLink` — compile-time |
| FR-022 URLs in one place | `site.ts` is the only definition site |
| FR-023 new tab | `SocialLink.astro` emits `target`/`rel` unconditionally |
| FR-034, FR-035 inert CTA | `destination: null` + `<button type="button">` no-op path |
| FR-036 destination attachable | String edit in `site.ts`; `<a>` path already written |
| SC-004 100% content accuracy | Tests assert rendered DOM against these exported constants |
| SC-009 one-location edits | Every replaceable value is a field in this model |
