/**
 * Content type definitions for the Gieo landing site.
 *
 * These types are the enforcement mechanism for several spec requirements —
 * see specs/001-gieo-landing-site/contracts/content-schema.md. Where a rule can
 * be a compile error instead of a test failure, it is one.
 */

/** Decorative plant marks available to content. Purely ornamental (FR-027). */
export type PlantIconName = 'sprout' | 'leaf-pair' | 'grass-tuft' | 'falling-seed';

/**
 * A content image. `alt` is required, not optional: a content image without
 * alt text fails FR-031. Decorative artwork never uses this type — it is
 * inline SVG marked aria-hidden, so the two categories cannot be confused.
 */
export interface ImageRef {
  readonly src: string;
  readonly alt: string;
}

export interface Brand {
  readonly name: string;
  readonly tagline: string;
}

export interface Hero {
  /** One sentence, Vietnamese, no line breaks — wrapping is the layout's job (FR-005). */
  readonly headline: string;
  readonly subheadline: string | null;
  /** Two buttons under the headline: the primary path, then a secondary one. */
  readonly actions: readonly [HeroAction, HeroAction];
  /**
   * Alt text for the hero illustration. The image file itself is imported in
   * HeroSection so Astro can optimise it; only the copy lives here.
   */
  readonly illustrationAlt: string;
}

export type HeroActionIcon = 'compass' | 'workshop';

export interface HeroAction {
  readonly label: string;
  /** In-page anchor; must match a section id in src/sections. */
  readonly href: `#${string}`;
  readonly icon: HeroActionIcon;
}

/** The competition level a credential was won at, for optional grouping. */
export type AchievementLevel = 'quoc-gia' | 'tinh' | 'khac';

export interface Achievement {
  /** Displayed verbatim, full Vietnamese diacritics (FR-010, FR-011, FR-012). */
  readonly text: string;
  readonly year: string | null;
  readonly level: AchievementLevel | null;
}

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string | null;
  /**
   * `null` in this release — cards render an initial-based placeholder.
   * Nullable so real portraits drop in without the card being redesigned.
   */
  readonly portrait: ImageRef | null;
  readonly achievements: readonly Achievement[];
}

export interface TeamSectionContent {
  readonly heading: string;
  /**
   * A fixed-length tuple, not an array. This makes FR-008's "exactly two
   * members" a compile error rather than a test failure.
   */
  readonly members: readonly [TeamMember, TeamMember];
}

export interface MaterialEntry {
  readonly id: string;
  readonly title: string;
  /** A one- or two-sentence excerpt, shown under the title. */
  readonly description: string;
  /**
   * The post's own page. Built from the post slug by `postHref` in
   * src/lib/posts.ts, so it always points at a page that exists.
   */
  readonly href: `/tai-lieu/${string}`;
}

/**
 * One block of a post's body. Posts are stored as structured blocks rather
 * than HTML or Markdown so they can come from an API later unchanged, and so
 * the page controls all of the markup (PostBody.astro).
 */
export type PostBlock =
  | { readonly type: 'heading'; readonly level: 2 | 3; readonly text: string }
  | { readonly type: 'paragraph'; readonly text: string }
  /** `lead` is rendered bold before the item text, e.g. an author and work. */
  | {
      readonly type: 'list';
      /** Numbered (1, 2, 3…) instead of bulleted. */
      readonly ordered?: boolean;
      readonly items: readonly { readonly lead?: string; readonly text: string }[];
    }
  /** One entry per line of the quotation (poetry keeps its line breaks). */
  | { readonly type: 'quote'; readonly lines: readonly string[]; readonly author: string }
  /** A highlighted key takeaway; `lead` is an optional label before it, e.g. "Có thể khái quát:". */
  | { readonly type: 'note'; readonly lead?: string; readonly text: string };

export interface Post {
  /** URL slug: the post is served at /tai-lieu/<slug>. Lowercase, a–z, 0–9, hyphens. */
  readonly slug: string;
  readonly title: string;
  /** One- or two-sentence summary, shown under the title and on cards. */
  readonly summary: string;
  /** Shown in the byline under the title: "Đăng bởi <author> · <date>". */
  readonly author: string;
  /** Publication date as ISO `YYYY-MM-DD`; displayed as DD/MM/YYYY. */
  readonly publishedAt: `${number}-${number}-${number}`;
  readonly body: readonly PostBlock[];
}

/**
 * Copy for the home-page materials section and the library pages. The posts
 * themselves live in src/content/posts.ts.
 */
export interface MaterialsSectionContent {
  readonly heading: string;
  readonly subtitle: string;
  /** Link from the home-page section to the full library page. */
  readonly viewAllLabel: string;
  /** Call to action on each card in the library grid. */
  readonly readLabel: string;
  readonly library: {
    /** <h1> of the /tai-lieu page. */
    readonly heading: string;
    /** Back link at the top of each post page. */
    readonly backLabel: string;
    /** Byline prefix under a post's title, before the author's name. */
    readonly postedByLabel: string;
    /** Heading above the "more posts" list at the end of each post. */
    readonly otherPostsHeading: string;
  };
}

export interface CourseOutcome {
  readonly id: string;
  /** One scannable phrase stating a concrete student gain (FR-018, FR-019). */
  readonly text: string;
  readonly icon: PlantIconName | null;
}

export interface CallToAction {
  readonly label: string;
  /**
   * `null` in this release (FR-034). The button is inert by data, not by
   * commented-out code: CallToActionButton renders an enabled
   * <button type="button"> with a no-op handler when this is null, and an
   * <a href> when it becomes a URL (FR-036).
   */
  readonly destination: string | null;
}

export interface CourseSectionContent {
  readonly heading: string;
  readonly description: string;
  /** Length >= 4, including the four named in FR-018. */
  readonly outcomes: readonly CourseOutcome[];
  readonly cta: CallToAction;
}

export type SocialPlatform = 'facebook' | 'tiktok';

export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly url: string;
  /**
   * Non-optional. FR-021 requires an accessible label on every social link,
   * and an optional field would let one ship without it.
   */
  readonly label: string;
}

export interface NavLink {
  readonly label: string;
  /**
   * Either an in-page anchor on the home page (must match a section id in
   * src/sections) or the path of another page, e.g. `/tai-lieu`.
   */
  readonly href: `#${string}` | `/${string}`;
}

export interface Navigation {
  /** Accessible name for the <nav> landmark. */
  readonly label: string;
  /** Accessible name for the logo link, which returns to the top. */
  readonly homeLabel: string;
  /** Section links, in page order. */
  readonly links: readonly NavLink[];
  /** Shown apart from `links` as the header's one filled button. */
  readonly contact: NavLink;
}

export interface SiteContent {
  readonly brand: Brand;
  readonly nav: Navigation;
  readonly hero: Hero;
  readonly team: TeamSectionContent;
  readonly materials: MaterialsSectionContent;
  readonly course: CourseSectionContent;
  /** Exactly two links this release: Facebook and TikTok (FR-021). */
  readonly social: readonly [SocialLink, SocialLink];
}
