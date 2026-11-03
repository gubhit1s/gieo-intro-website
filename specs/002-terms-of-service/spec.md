# Feature Specification: Terms of Service Page ("Điều khoản sử dụng")

**Feature Branch**: `002-terms-of-service`

**Created**: 2026-11-03

**Status**: Draft

**Input**: User description: "today I want to add a terms of service page or "Điều khoản sử dụng" where we explictly specify the right to use the posts in this website. I don't want to dive into the details. But you write the TOS based on what's already out there. The important point is to prevent the use of the content in the posts for materilization and commercialization without asking the author. For now, default the contact to my email: tranthaiminh098@gmail.com. Add the navigation somewhere in the footer"

## Overview

Gieo publishes free literature materials (the posts under "Tài liệu") written by its team. Because these materials are free to read, they are easy to copy, print, repackage and resell. This feature adds a single, plain-language Vietnamese "Điều khoản sử dụng" page that tells visitors what they may and may not do with the content, with one central message: **personal study is welcome; turning the content into products or using it for commercial purposes requires the author's prior permission.** The page is reachable from the footer on every page of the site.

The terms follow the structure commonly used by Vietnamese educational and content websites (acceptance of terms, intellectual property, permitted use, prohibited use, permission requests, disclaimer, changes, contact) and are kept short — this is not a detailed legal document.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understanding what I may do with the materials (Priority: P1)

A student, parent or teacher who has been reading Gieo's free materials wants to know whether they can print a post, share it with a study group, use it in their own class, or include it in a paid handout. They open "Điều khoản sử dụng" and, within a minute of reading, understand that personal, non-commercial study is allowed, and that printing for sale, compiling into books or course packs, or any commercial use needs the author's permission first — and they see how to ask.

**Why this priority**: This is the reason the feature exists. Clearly stating the usage rights is what discourages unauthorized commercialization and gives the team a public reference to point to if content is misused.

**Independent Test**: Open the terms page directly and verify it contains, in Vietnamese, a clear statement of ownership, a list of permitted uses, a list of prohibited uses that explicitly names materialization and commercialization without permission, and a contact email for permission requests.

**Acceptance Scenarios**:

1. **Given** a visitor on the terms page, **When** they read the content, **Then** they find an explicit statement that all posts and materials on the site belong to their authors / the Gieo team and are protected by copyright.
2. **Given** a visitor on the terms page, **When** they look for what is allowed, **Then** they find that reading, personal study, and sharing a link to the original post are permitted, and that short quotations are permitted when the source (author and Gieo) is credited.
3. **Given** a visitor on the terms page, **When** they look for what is prohibited, **Then** they find that the following require the author's prior written permission: reproducing the content into physical or digital products (printed handouts, books, e-books, course packs, slides), selling or charging for access to the content, using it in paid courses or tutoring, and republishing it in full on other websites or social channels.
4. **Given** a visitor who wants to use content commercially, **When** they read the permission section, **Then** they see the contact email `tranthaiminh098@gmail.com` and can click it to start an email.
5. **Given** a visitor on the terms page, **When** they look at the top or bottom of the page, **Then** they see the date the terms were last updated.

---

### User Story 2 - Finding the terms from anywhere on the site (Priority: P2)

A visitor on the home page or reading a post scrolls to the footer and sees a "Điều khoản sử dụng" link. Clicking it takes them to the terms page; from there they can return to the rest of the site.

**Why this priority**: The terms only protect the content if visitors can find them. The footer is the conventional location, and it is shared by every page on the site.

**Independent Test**: From the home page, the materials list page, and an individual post page, scroll to the footer, click "Điều khoản sử dụng", and confirm the terms page opens.

**Acceptance Scenarios**:

1. **Given** a visitor on any page of the site, **When** they scroll to the footer, **Then** a link labeled "Điều khoản sử dụng" is visible.
2. **Given** a visitor clicks the footer link, **When** the navigation completes, **Then** the terms page is displayed with the site's normal look and feel (same header style, same footer).
3. **Given** a visitor on the terms page, **When** they want to go back to the site, **Then** they can reach the home page via the site header or brand logo.
4. **Given** a keyboard-only visitor, **When** they tab through the footer, **Then** the terms link receives a visible focus indicator and can be activated with Enter.

---

### User Story 3 - Notice on each post (Priority: P3)

A visitor reading an individual post sees a short line near the end of the post reminding them that the content is copyrighted and linking to "Điều khoản sử dụng" for details.

**Why this priority**: A reminder at the point of use reinforces the terms for readers who never scroll to the footer or who copy content directly from a post. It is useful but not essential — the footer link alone satisfies the core need.

**Independent Test**: Open any individual post and verify a brief copyright notice with a link to the terms page appears after the post body.

**Acceptance Scenarios**:

1. **Given** a visitor reading any post, **When** they reach the end of the post body, **Then** they see a one- or two-sentence notice stating the content belongs to its author/Gieo and may not be used commercially without permission, with a link to the terms page.

---

### Edge Cases

- **Visitor has no email client configured**: the contact email is displayed as readable text (not only as a link), so the visitor can copy it manually.
- **Visitor arrives at the terms page directly** (e.g. from a search engine or a shared link): the page is fully self-contained and understandable without having visited any other page.
- **Terms change later**: the "last updated" date is changed along with the content so returning visitors can see that the terms were revised.
- **Contact email changes later**: the contact address is defined once and reused everywhere it appears (terms page and any notices), so replacing it requires a single change.
- **Content from external sources quoted inside posts** (e.g. excerpts from literary works): the terms clarify that rights to third-party works remain with their original authors and the terms only cover Gieo's own content.
- **Narrow phone screens**: the terms text, headings, and the email address wrap without horizontal scrolling.

## Requirements *(mandatory)*

### Functional Requirements

**Terms page**

- **FR-001**: The site MUST provide a dedicated, publicly accessible page titled "Điều khoản sử dụng", written in Vietnamese.
- **FR-002**: The page MUST display a "last updated" date (Vietnamese date format, e.g. "Cập nhật lần cuối: 03/11/2026").
- **FR-003**: The page content MUST be organized into short, clearly headed sections covering, at minimum:
  1. **Chấp nhận điều khoản** — using the site means accepting these terms.
  2. **Quyền sở hữu nội dung** — all posts, materials, text and images created by Gieo are owned by their authors / the Gieo team and protected under Vietnamese intellectual property law; third-party works quoted in posts remain the property of their original authors.
  3. **Những việc bạn được làm** — read online; use for personal, non-commercial study; share a link to the original post; quote short excerpts with clear attribution (author name, "Gieo", and a link to the source).
  4. **Những việc không được làm khi chưa có sự đồng ý** — reproducing content into physical or digital products (printed handouts, photocopied sets, books, e-books, compilations, slides, course packs); selling the content or charging for access to it; using it in paid courses, classes, or tutoring; republishing the content in full or substantial part on other websites, pages, groups, or channels; removing or altering author attribution; presenting the content as one's own.
  5. **Xin phép sử dụng** — how to request permission, naming the contact email, and stating that permission is only valid when given in writing (including by email) by the author.
  6. **Miễn trừ trách nhiệm** — materials are provided for reference/learning purposes "as is"; Gieo is not responsible for outcomes resulting from their use.
  7. **Thay đổi điều khoản** — Gieo may update the terms; the "last updated" date reflects the latest revision; continued use means acceptance of the updated terms.
  8. **Liên hệ** — contact email.
- **FR-004**: The prohibited-use section MUST explicitly state that turning the content into materials/products ("vật chất hóa" — printing, compiling, packaging) and any commercial use ("thương mại hóa") require the author's prior permission. This message MUST be stated plainly, not only implied.
- **FR-005**: The contact email MUST default to `tranthaiminh098@gmail.com`, MUST be shown as visible text, and MUST be clickable to open an email to that address.
- **FR-006**: The contact email MUST be defined in a single place so it can be changed later without editing multiple pages.
- **FR-007**: The page MUST use the site's existing visual identity (typography, colors, header and footer) and be readable on phone, tablet and desktop widths without horizontal scrolling.
- **FR-008**: The page MUST have a meaningful browser title and description identifying it as Gieo's terms of use.
- **FR-009**: The terms text MUST be concise — written in plain Vietnamese for students and parents, avoiding dense legal phrasing — and readable in under 5 minutes.

**Navigation**

- **FR-010**: The shared site footer MUST include a link labeled "Điều khoản sử dụng" that navigates to the terms page.
- **FR-011**: Because the footer is shared, the link MUST appear on every page that shows the footer (home page, materials list, individual posts, and the terms page itself).
- **FR-012**: The footer link MUST be keyboard-accessible with a visible focus state and meet the site's existing contrast standards.

**Per-post notice**

- **FR-013**: Each individual post page SHOULD show a brief copyright notice after the post body, linking to the terms page.

### Key Entities

- **Terms of Use document**: the published Vietnamese terms text — title, last-updated date, ordered sections (heading + body), and the contact email.
- **Contact information**: a single site-wide contact email used for permission requests; defaults to `tranthaiminh098@gmail.com`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: From any page on the site, a visitor can reach the terms page in at most 1 click from the footer.
- **SC-002**: A first-time reader can answer "Can I print these materials and sell them?" correctly (no, not without permission) and find the contact email within 1 minute of opening the terms page.
- **SC-003**: The full terms text can be read in under 5 minutes (roughly ≤ 900 Vietnamese words).
- **SC-004**: 100% of pages that display the site footer show the "Điều khoản sử dụng" link.
- **SC-005**: The terms page displays without horizontal scrolling at a 320 px viewport width and on common desktop widths.
- **SC-006**: Changing the contact email requires editing exactly one location.

## Assumptions

- **"Materialization"** is interpreted as turning the online content into tangible or packaged products — printed handouts, photocopied sets, books, e-books, compiled documents, slides, or course packs — whether or not they are sold.
- **Permitted use** defaults to the common pattern on Vietnamese educational sites: free reading and personal, non-commercial study; sharing links; short quotations with attribution. Teachers using content in free, non-commercial classroom settings are treated as personal/non-commercial use only when the content is not reproduced into handouts; anything beyond that requires permission.
- **Governing law** is Vietnamese law (notably the Law on Intellectual Property); the terms reference it in general terms only, without citing specific articles.
- **Rights holder** is described as "tác giả / đội ngũ Gieo" (the author / the Gieo team), since posts may have different authors but share one contact point.
- **Scope** is limited to usage rights for site content and a basic disclaimer. Privacy policy, cookie policy, user accounts, and payment terms are out of scope (the site has no accounts, forms, or payments).
- **Language** is Vietnamese only, consistent with the rest of the site.
- **URL** for the page follows the site's existing Vietnamese-slug convention (e.g. "/dieu-khoan-su-dung"), consistent with "/tai-lieu".
- **Legal review**: the terms are a reasonable, plain-language starting point based on common practice; they are not a substitute for advice from a qualified lawyer.
- The contact email is a temporary default and is expected to be replaced by a dedicated Gieo address later.
