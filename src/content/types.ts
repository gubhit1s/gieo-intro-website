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
  readonly description: string;
  /**
   * `null` in every entry this release (FR-015). MaterialCard renders a
   * non-interactive <article> when null and an <a> only for a real URL, so
   * there is no code path that produces a link to nowhere.
   */
  readonly href: string | null;
  /**
   * Typed as the literal `true` so the placeholder state is explicit and
   * greppable. Removing it when real materials arrive is a type error at every
   * call site that still assumes it — a deliberate tripwire against a
   * half-migrated section.
   */
  readonly isPlaceholder: true;
}

export interface MaterialsSectionContent {
  readonly heading: string;
  readonly subtitle: string;
  /** Length >= 3 (FR-014). Asserted in tests; an array because it will grow. */
  readonly entries: readonly MaterialEntry[];
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
  /** In-page anchor; must match a section id in src/sections. */
  readonly href: `#${string}`;
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
