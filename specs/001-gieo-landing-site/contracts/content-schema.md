# Contract: Content Module (`src/content/site.ts`)

**Feature**: [spec.md](../spec.md) | **Model**: [data-model.md](../data-model.md)

This is the site's only authoring interface. Everyone editing Gieo's copy — now or after handover — edits this one file, and nothing else. The contract below is what the rest of the codebase and the test suite are entitled to assume.

---

## Module contract

`src/content/types.ts` exports the type definitions. `src/content/site.ts` exports exactly one value:

```ts
export const site: SiteContent
```

**Rules**

1. `site` is declared `as const satisfies SiteContent`. `satisfies` keeps the literal types narrow (so tests can reference exact strings) while still checking the object against the schema.
2. Every user-visible string on the page originates here. A Vietnamese string literal appearing anywhere in `src/sections/`, `src/components/` or `src/layouts/` is a contract violation, with two exceptions: `aria-label`s on purely structural landmarks, and `alt=""` on decorative images.
3. No imports from `src/components/`, `src/sections/` or any Astro runtime. This file is plain data, importable from Vitest without a DOM.
4. No computed values, template literals, environment reads or conditionals. Static data only — so that what the file says is exactly what ships.

---

## Required exports and invariants

| Path | Type | Invariant | Requirement |
|---|---|---|---|
| `site.brand.name` | `string` | `"Gieo"` | FR-004 |
| `site.hero.headline` | `string` | non-empty, no `\n` | FR-005 |
| `site.hero.scrollCueLabel` | `string` | non-empty | FR-007 |
| `site.team.heading` | `string` | `"Chúng mình là"` | FR-008 |
| `site.team.members` | `readonly [TeamMember, TeamMember]` | **length exactly 2, compile-enforced** | FR-008 |
| `site.team.members[n].achievements` | `readonly Achievement[]` | non-empty | FR-009 |
| `site.materials.heading` | `string` | `"Những tài liệu của chúng mình"` | FR-013 |
| `site.materials.subtitle` | `string` | non-empty | FR-013 |
| `site.materials.entries` | `readonly MaterialEntry[]` | length ≥ 3; every `href === null` | FR-014, FR-015 |
| `site.course.description` | `string` | non-empty | FR-017 |
| `site.course.outcomes` | `readonly CourseOutcome[]` | length ≥ 4; includes the four named in FR-018 | FR-018 |
| `site.course.cta.label` | `string` | non-empty Vietnamese | FR-034 |
| `site.course.cta.destination` | `string \| null` | **`null` this release** | FR-034 |
| `site.social` | `readonly [SocialLink, SocialLink]` | exactly 2: facebook, tiktok | FR-021 |
| `site.social[n].label` | `string` | **non-optional, compile-enforced** | FR-021 |

---

## Consumer contract

What components may and may not do with this data.

**Must**

- Read content only through `import { site } from '~/content/site'`.
- Render `achievement.text`, `outcome.text`, `member.name`, headings and subtitles **in full**. No truncation, no ellipsis, no "show more" that hides content behind an interaction (FR-012).
- Treat `href: null` and `destination: null` as the inert branch — render a non-interactive element, never a link to `#` or an empty string (FR-015, FR-035).
- Treat every `PlantIconName` render as decorative: `aria-hidden="true"`, `focusable="false"` (FR-027).

**Must not**

- Mutate `site` or anything reachable from it. Everything is `readonly`.
- Derive display copy by string manipulation (slicing, casing, concatenating). Vietnamese diacritics are composed characters; naive slicing corrupts them, and SC-004 requires verbatim output.
- Introduce a second source of copy — no fallback strings, no `?? 'Coming soon'` defaults. A missing field must be a type error, not a silent English string on a Vietnamese page (FR-032).

---

## Change contract

What it costs to change each thing later. This is the operational meaning of **SC-009**.

| Change | Edit | Component changes |
|---|---|---|
| Replace a placeholder material with a real one | `entries[n].title`, `.description`, `.href` → URL; drop `isPlaceholder` | **None** — the `<a>` path already exists |
| Add a real Facebook/TikTok profile | `social[n].url` | **None** |
| Add a third social platform | Widen the `platform` union, add an icon component, extend the tuple | Icon component only |
| Wire up the CTA | `course.cta.destination` → URL | **None** — the `<a>` path already exists |
| Change the headline | `hero.headline` | **None** |
| Add a team member | Widen the tuple to 3 | Layout grid only (**and a spec change** — FR-008 says exactly two) |

Any change to team member names or achievements is a change to public claims about a real person's competition record. `tests/unit/content.test.ts` asserts these verbatim so an accidental edit fails CI rather than shipping.

---

## Test contract

`tests/unit/content.test.ts` is the executable form of this document. It must assert:

1. `site.team.members` has length 2, with the exact names `Nguyễn Thị Hà Giang` and `Nguyễn Hồng Bảo Quyên`.
2. Hà Giang has 4 achievements and Bảo Quyên has 2, each matching the verbatim strings in [data-model.md](../data-model.md).
3. `site.materials.entries.length >= 3` and `entries.every(e => e.href === null)`.
4. `site.course.outcomes.length >= 4` and the four FR-018 outcomes are present verbatim.
5. `site.course.cta.destination === null` and `cta.label` is non-empty.
6. `site.social` has length 2 covering `facebook` and `tiktok`, each with a non-empty `label` and an `https://` URL.
7. Headings match FR-008 and FR-013 exactly, including diacritics.
8. No string anywhere in `site` contains a `\n`, a leading/trailing space, or the Unicode replacement character `U+FFFD` — the last catching encoding corruption, which is the realistic way Vietnamese text breaks in a build pipeline.
