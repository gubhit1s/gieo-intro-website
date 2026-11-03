# Quickstart: Validating the Terms of Service Page

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Prerequisites

- Node.js ≥ 22.12 and the project's dependencies installed (`npm install`)
- Playwright browsers installed (`npx playwright install`), as for feature 001
- The copy in [contracts/terms-copy.md](./contracts/terms-copy.md) has been reviewed

## Automated checks

```bash
npm run check                         # types: new TermsOfUse / LegalContent / ContactInfo shapes
npm run test -- terms content         # unit: content contract (data-model.md § Validation rules)
npm run test:e2e -- terms             # e2e: ui-contract.md § Test contract
npm run validate                      # full gate: check, lint, unit, build, all e2e
```

**Expected**: all pass. The existing suites (`accessibility`, `posts`, `interactions`, `responsive`) must also stay green, because the footer and post page both change.

## Manual scenarios

Run `npm run build && npm run preview`, then:

| # | Do | Expect | Covers |
|---|---|---|---|
| V-1 | Open `/`, scroll to the footer | "Điều khoản sử dụng" link next to the © line | US2-1, FR-010 |
| V-2 | Click it | Terms page opens with the normal header and footer and an `h1` "Điều khoản sử dụng" | US2-2 |
| V-3 | Repeat V-1/V-2 from `/tai-lieu` and from a post | Same link, same result | FR-011, SC-001 |
| V-4 | Read the page top to bottom (time it) | Last-updated date, 8 numbered sections; under 5 minutes | FR-002, FR-003, SC-003 |
| V-5 | Ask yourself: "Can I print these and sell them?" | Section 4 clearly answers no, not without permission; the email is found within 1 minute | US1-3, SC-002 |
| V-6 | Click the email in sections 5 and 8 | The mail client opens to `tranthaiminh098@gmail.com`; the address is also selectable as text | FR-005, edge case |
| V-7 | Click the header logo | Returns to `/` | US2-3 |
| V-8 | Tab through the footer | The terms link shows a focus ring; Enter opens it | US2-4, FR-012 |
| V-9 | Open any post and scroll past the body | The copyright notice with a "Điều khoản sử dụng" link appears before "Bài viết khác" | US3-1 |
| V-10 | DevTools at 320 px on the terms page | No horizontal scroll; the email wraps if needed | SC-005 |
| V-11 | Search the repo for the email address | Exactly one hit under `src/` (`site.ts`) | SC-006 |

## Changing things later

- **Contact email**: edit `site.contact.email` in `src/content/site.ts`, and update the assertion in `tests/unit/content.test.ts`.
- **Terms wording**: edit `src/content/terms.ts`, **and** bump `updatedAt` to the date of the change.
