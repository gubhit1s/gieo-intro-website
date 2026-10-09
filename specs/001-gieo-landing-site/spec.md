# Feature Specification: Gieo Landing Site

**Feature Branch**: `001-gieo-landing-site` (no git repository initialized)

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "Build a landing website for showcasing courses in Vietnamese literature. The website is about 'Gieo' a Vietnamese word that literally means 'to sow' but it can also have rhetorical meanings. Choose a theme that is light, with light colors, may be related to how plants grow. Sections: inspirational hero with slight animations; team introduction 'chúng mình là' with 2 people and their achievements; free shared materials 'những tài liệu của chúng mình' with placeholder text and a subtitle; course information for literature gifted students with bullet points of gains; footer with Facebook and TikTok links. Light green theme, seed/plant logo, small plants to make the site vibrant."

## Overview

"Gieo" (Vietnamese: *to sow*) is a tutoring brand for Vietnamese literature, aimed at students preparing for gifted-student (học sinh giỏi) selection exams. This feature delivers the brand's first public-facing single-page landing site: an inspirational introduction, proof of the team's credentials, a preview of the free material library, a description of the gifted-student course, and links to the brand's social channels.

The sowing metaphor drives the visual identity — a light, airy, light-green palette with seed and plant motifs, and gentle growth-themed motion that reinforces the idea that ability is cultivated rather than innate.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Inspired first impression (Priority: P1)

A student (or their parent) opens the Gieo site for the first time, typically from a link shared on social media. Within the first screen they see the Gieo name and seed/plant mark, read one short, confident line that reframes the gifted-student exam as achievable ("Chinh phục học sinh giỏi không khó như bạn nghĩ"), and sense a calm, growth-themed atmosphere. Subtle motion draws their eye downward and invites them to keep scrolling.

**Why this priority**: This is the whole purpose of a landing site and the only section every visitor is guaranteed to see. On its own it already establishes the brand and communicates the core promise, so it is a viable standalone release.

**Independent Test**: Load the site on a fresh device and confirm that, without scrolling, a visitor can identify the brand name, the brand mark, the core promise, and a visible cue to continue — and that the entrance motion plays once and settles.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on a desktop browser, **When** the page finishes loading, **Then** the brand name, brand mark, and headline promise are visible without scrolling, and the headline animates into view within 1 second.
2. **Given** a first-time visitor on a phone in portrait orientation, **When** the page loads, **Then** the headline remains fully readable without horizontal scrolling and without text overlapping the plant decorations.
3. **Given** a visitor whose device requests reduced motion, **When** the page loads, **Then** all content is immediately visible in its final state with animation suppressed.
4. **Given** a visitor on the hero section, **When** they scroll down, **Then** they reach the next section without any blocked, hijacked, or delayed scrolling.

---

### User Story 2 - Judging who is teaching (Priority: P2)

A visitor wants to know whether the people behind Gieo are credible. They reach a section headed "Chúng mình là" and see the two founders presented side by side, each with their name and a clearly readable list of competition results and credentials. The visitor can quickly judge that these are genuinely accomplished literature students.

**Why this priority**: Credentials are the brand's core differentiator — the founders' competition results are the proof behind the hero's promise. Without this, the promise is unsupported.

**Independent Test**: Scroll to the team section and verify that both members' names and every listed achievement appear accurately and legibly on desktop and mobile.

**Acceptance Scenarios**:

1. **Given** a visitor scrolling past the hero, **When** the team section enters the viewport, **Then** the heading "Chúng mình là" and two member cards are displayed.
2. **Given** the team section is visible, **When** the visitor reads Nguyễn Thị Hà Giang's card, **Then** all four of her listed credentials appear: national-level second prize in Literature (2020-2021), provincial-level first prize in Literature (2020-2021), summer camp silver medal (2020-2021), and former reporter for VTV and Tuổi Trẻ.
3. **Given** the team section is visible, **When** the visitor reads Nguyễn Hồng Bảo Quyên's card, **Then** both listed credentials appear: 9.5 in Literature at the 2023 national high-school exam as Lâm Đồng province's top Literature scorer, and top scorer in the provincial gifted-student Literature exam (2020-2021).
4. **Given** a visitor on a phone, **When** they view the team section, **Then** the two member cards stack vertically and every achievement remains fully readable with correct Vietnamese diacritics.

---

### User Story 3 - Understanding what the course delivers (Priority: P3)

A visitor who is now interested wants to know what the gifted-student course actually teaches. They reach the course section and read a short description plus a scannable list of concrete skills and resources they will gain — associative reading across literary works, counter-argument technique, literary theory, and materials written by former gifted-student competitors. A clear call-to-action button sits below the list; in this release it is a visual placeholder with no destination attached yet.

**Why this priority**: This is the commercial payload of the page. It depends on the visitor already being engaged by the hero and convinced by the team, so it ranks below both.

**Independent Test**: Scroll to the course section and verify the section title, description, at least four distinct concrete outcome bullets, and the call-to-action button render and are readable at all supported widths.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the course section, **When** it is displayed, **Then** a section heading, a short supporting description, and a list of at least four distinct learning outcomes are visible.
2. **Given** the outcome list is displayed, **When** the visitor reads it, **Then** each item is a single scannable phrase covering at minimum: kỹ năng liên tưởng tác phẩm, kỹ năng phản đề, lý luận văn học, and tài liệu được biên soạn bởi cựu học sinh giỏi Văn.
3. **Given** a visitor on a phone, **When** they view the outcome list, **Then** each item occupies its own line with its marker and text aligned and no text clipped.
4. **Given** the course section is displayed, **When** the visitor looks below the outcome list, **Then** a prominent, clearly labelled call-to-action button is visible and visually reads as the section's primary action.
5. **Given** the call-to-action button has no destination yet, **When** the visitor clicks or taps it, **Then** the page stays exactly where it is with no error, no navigation, and no broken behaviour.
6. **Given** a keyboard user tabs through the course section, **When** focus lands on the call-to-action button, **Then** a visible focus indicator appears and the button is announced with its label.

---

### User Story 4 - Previewing the free material library (Priority: P4)

A visitor sees that Gieo shares study materials for free. A section headed "Những tài liệu của chúng mình" with a supporting subtitle presents several material entries. In this release the entry text is placeholder copy, so the section communicates the offering and its visual shape without yet linking to real files.

**Why this priority**: It builds goodwill and signals ongoing value, but the content is explicitly placeholder in this release, so it cannot yet deliver real utility.

**Independent Test**: Scroll to the materials section and verify the heading, subtitle, and a consistent set of placeholder entries render in a tidy layout at all supported widths.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the materials section, **When** it is displayed, **Then** the heading "Những tài liệu của chúng mình", a subtitle, and at least three material entries are visible.
2. **Given** material entries contain placeholder text, **When** the visitor views them, **Then** every entry uses the same layout and visual treatment so the section reads as a deliberate preview rather than an unfinished area.
3. **Given** a visitor attempts to interact with a placeholder entry, **When** they click or tap it, **Then** nothing breaks, no error is shown, and no navigation to a dead destination occurs.

---

### User Story 5 - Following Gieo on social media (Priority: P5)

A visitor who has reached the end of the page wants to stay in touch. The footer presents the Gieo mark alongside clearly recognisable Facebook and TikTok links that open in a new tab.

**Why this priority**: It is the only outbound path on the page, but it is reached last and currently points at generic destinations.

**Independent Test**: Scroll to the footer and verify both social links are present, labelled, and open their destination in a new tab without losing the landing page.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the bottom of the page, **When** the footer is displayed, **Then** a Facebook link and a TikTok link are visible with recognisable icons and accessible labels.
2. **Given** the visitor activates a social link, **When** it opens, **Then** it opens in a new browser tab and the landing page remains open in the original tab.
3. **Given** the brand's real social profiles do not exist yet, **When** a link is activated, **Then** it resolves to that platform's homepage rather than to a broken or empty profile URL.

---

### Edge Cases

- **Reduced motion**: A visitor with an operating-system "reduce motion" preference must receive the full content with decorative and entrance animation suppressed, never a blank or partially hidden section.
- **Scripting unavailable or still loading**: If interactive behaviour has not started, all text content must still be present and readable rather than hidden behind an animation that never runs.
- **Slow or constrained connections**: On a slow connection, text content must appear before decorative artwork, and no section may remain blank waiting on decorative assets.
- **Very narrow viewports**: At 320 px width, long Vietnamese achievement lines must wrap rather than overflow, and decorative plants must never obscure or push out text.
- **Large text / zoom**: At 200% browser zoom, no section may clip text or require horizontal scrolling.
- **Decorative artwork and screen readers**: Plant and seed decorations carry no information and must be skipped by assistive technology, while the logo must be announced as the brand.
- **Placeholder content**: Visitors must not be able to reach a dead end — no placeholder entry and no call-to-action may lead to an error page, an empty download, a broken link, or a visibly unresponsive failure.
- **Inert call-to-action**: A visitor who clicks the course call-to-action repeatedly must see the page stay stable, with no stacked errors, no scroll jump, and no state the page cannot recover from.
- **Diacritics**: Vietnamese diacritics must render correctly in every heading, body line, and rendered artwork at every supported size.

## Requirements *(mandatory)*

### Functional Requirements

#### Page structure

- **FR-001**: The site MUST present all content as a single continuously scrollable page containing, in order: hero, team, free materials, course information, and footer.
- **FR-002**: Section boundaries MUST be visually distinguishable so a visitor can tell where one topic ends and the next begins.
- **FR-003**: The site MUST render correctly on phone, tablet, and desktop widths from 320 px upward, with no horizontal page scrolling at any supported width.

#### Hero

- **FR-004**: The hero MUST display the Gieo brand name and brand mark.
- **FR-005**: The hero MUST display one short inspirational headline, no longer than a single sentence, in Vietnamese; the reference line is "Chinh phục học sinh giỏi không khó như bạn nghĩ".
- **FR-006**: The hero MUST play a subtle entrance animation that completes within 1 second of content becoming visible, and MUST NOT loop distractingly or delay the visitor's ability to scroll.
- **FR-007**: The hero MUST include a visible cue that more content exists below.

#### Team section

- **FR-008**: The team section MUST be headed "Chúng mình là" and MUST present exactly two members.
- **FR-009**: Each member MUST be shown with their full name and a list of their achievements.
- **FR-010**: Nguyễn Thị Hà Giang's achievements MUST be listed as: giải nhì Ngữ văn kỳ thi chọn học sinh giỏi cấp quốc gia năm học 2020-2021; giải nhất Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021; huy chương bạc trại hè năm 2020-2021; từng là phóng viên báo VTV và báo Tuổi Trẻ.
- **FR-011**: Nguyễn Hồng Bảo Quyên's achievements MUST be listed as: 9.5 điểm Ngữ văn THPT Quốc gia 2023 — thủ khoa Văn tỉnh Lâm Đồng; thủ khoa Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021.
- **FR-012**: Member achievement text MUST be reproduced with correct Vietnamese spelling and diacritics, and MUST NOT be truncated, abbreviated, or hidden behind an interaction at any supported width.

#### Free materials section

- **FR-013**: The materials section MUST be headed "Những tài liệu của chúng mình" and MUST display a supporting subtitle beneath the heading.
- **FR-014**: The section MUST display at least three material entries sharing a single consistent layout.
- **FR-015**: Material entry body text MUST use placeholder copy in this release; no entry may link to, download, or claim the existence of a real file.
- **FR-016**: Material entries MUST be authored as structured content so real titles, descriptions, and links can replace the placeholders later without redesigning the section.

#### Course section

- **FR-017**: The course section MUST describe the gifted-student (học sinh giỏi) Vietnamese literature course in a short introductory passage.
- **FR-018**: The section MUST present at least four distinct learning outcomes as a scannable list, including at minimum: kỹ năng liên tưởng tác phẩm, kỹ năng phản đề, lý luận văn học, and tài liệu được biên soạn bởi cựu học sinh giỏi Văn.
- **FR-019**: Each outcome MUST be phrased as a concrete gain for the student rather than a description of course logistics.

#### Footer

- **FR-020**: The footer MUST display the Gieo brand mark or name alongside the social links.
- **FR-021**: The footer MUST provide a Facebook link and a TikTok link, each with a recognisable icon and an accessible text label.
- **FR-022**: Social links MUST point at each platform's homepage in this release and MUST be defined in one place so real profile URLs can replace them with a single edit.
- **FR-023**: Social links MUST open in a new browser tab, leaving the landing page open.

#### Brand identity and visual theme

- **FR-024**: The site MUST use a light visual theme built on light green as the dominant colour, with a light background and generous whitespace.
- **FR-025**: The site MUST include an original Gieo logo built on a seed or sprouting-plant motif, usable at both large hero size and small footer size while remaining recognisable.
- **FR-026**: The site MUST include decorative plant, sprout, or leaf elements distributed across sections so the page feels alive rather than static.
- **FR-027**: Decorative elements MUST be purely ornamental — they MUST NOT convey information, obscure text, or capture interaction.
- **FR-028**: Body text MUST meet at least a 4.5:1 contrast ratio against its background, and large headline text at least 3:1.

#### Motion and accessibility

- **FR-029**: Animation MUST be restrained — gentle entrance, scroll-reveal, and ambient drift only, with no flashing, rapid movement, or content that moves while being read.
- **FR-030**: When the visitor's device requests reduced motion, all non-essential animation MUST be disabled and all content MUST be presented immediately in its final state.
- **FR-031**: All content MUST remain reachable and readable by keyboard and screen-reader users, including a logical heading order and visible focus indicators on every interactive element.
- **FR-032**: All page content MUST be written in Vietnamese with the document language declared as Vietnamese.

#### Conversion path

- **FR-033**: The course section MUST display a prominent call-to-action button inviting the visitor to take the next step toward the course.
- **FR-034**: The call-to-action button MUST be visually complete — styled, labelled in Vietnamese, and with hover, focus, and pressed states — but MUST NOT perform any action in this release. No form, no submission, no navigation, no backend.
- **FR-035**: Activating the call-to-action button MUST NOT show an error, navigate away, or leave the visitor at a dead end; the page MUST remain in its current state.
- **FR-036**: The call-to-action MUST be built so a future destination — a link, a form, or a messaging channel — can be attached without changing its placement or visual design.

### Key Entities

- **Team Member**: A founder presented in the team section. Attributes: full name, ordered list of achievements, optional portrait and short role label. Two instances in this release.
- **Achievement**: A single credential belonging to a team member. Attributes: display text, and optionally the year or level it was won, for grouping or emphasis later.
- **Material Entry**: One item in the free-materials section. Attributes: title, short description, and (future) a destination link. Placeholder text in this release.
- **Course Outcome**: One capability or resource a student gains from the course. Attributes: display text and optional icon.
- **Social Link**: An outbound brand channel. Attributes: platform name, destination URL, accessible label, icon. Two instances (Facebook, TikTok) in this release.
- **Call To Action**: The primary next-step prompt in the course section. Attributes: label text and (future) a destination. Inert in this release.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can state what Gieo offers and who teaches it within 30 seconds of landing on the page, in at least 8 out of 10 unmoderated comprehension tests.
- **SC-002**: Meaningful content — brand name and headline — is visible within 2 seconds on a mid-range phone over a typical 4G connection, and the full page scrolls without stutter.
- **SC-003**: All five sections render without clipped text, overlapping elements, or horizontal scrolling at every width from 320 px to 1920 px, and at 200% zoom.
- **SC-004**: Every achievement, course outcome, heading, and subtitle listed in the requirements appears on the page, verbatim and with correct diacritics — 100% content accuracy against the source list.
- **SC-005**: The page passes an automated accessibility audit with zero critical or serious violations, and is fully navigable by keyboard alone.
- **SC-006**: With "reduce motion" enabled at the operating-system level, 100% of page content is visible and readable with no animation playing.
- **SC-007**: At least 60% of visitors who reach the page scroll past the hero into the team section, indicating the opening earns continued attention.
- **SC-008**: Both social links resolve successfully, with no broken links anywhere on the page.
- **SC-009**: Replacing placeholder material entries, the social URLs, or the call-to-action destination with real values requires editing content in one location per item and no layout rework.
- **SC-010**: The course call-to-action is reachable by keyboard, carries a visible focus state, and produces no error or page change when activated — verified across all supported browsers.

## Assumptions

- **Audience and language**: Visitors are Vietnamese secondary-school students and their parents. All content is Vietnamese only; no multi-language support is in scope for this release.
- **Scope**: This is a single-page marketing site. User accounts, payments, enrolment workflows, a blog or CMS, analytics dashboards, and a backend are all out of scope.
- **Call-to-action**: Confirmed with the user — the course section gets a styled but non-functional button in this release. There is no backend, no form, and no destination yet; the button exists so the layout and visual hierarchy are settled, and a real destination is attached in a later pass.
- **Content ownership**: The achievement lists supplied by the user are accurate and authorised for public display. Minor spelling corrections to the source text ("kỳ thì" → "kỳ thi", "chúng minh" → "chúng mình") are intentional and approved.
- **Portraits**: No photographs of the team members have been supplied; the team cards are designed to work with an illustrated or initial-based placeholder, and to accept real portraits later without redesign.
- **Materials content**: Material entries are deliberately placeholder in this release. Real titles, descriptions, and downloadable files will be supplied later.
- **Social profiles**: The brand's real Facebook and TikTok profiles do not exist or have not been supplied. Links point at the platform homepages as an explicit, temporary stand-in.
- **Logo**: No existing brand mark exists. An original seed/sprout mark will be designed as part of this work and is subject to the brand owner's approval.
- **Motion**: Animation is decorative. No content depends on animation to become readable, so the page degrades cleanly when motion is suppressed or scripting is slow.
- **Browsers**: Current versions of Chrome, Safari, Edge, and Firefox on desktop and mobile. Legacy browser support is out of scope.
- **Technology**: The user requested a modern React-based frontend to support heavier animation later. Technology selection is recorded here as a stated constraint and will be resolved during planning; no requirement above depends on a specific framework.
- **Hosting and domain**: Deployment target, domain name, and SEO/social-preview metadata are not yet specified and are assumed to be handled outside this feature.
