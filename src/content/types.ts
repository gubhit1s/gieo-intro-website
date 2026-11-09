/**
 * Content type definitions for the Gieo landing site.
 *
 * These types are the enforcement mechanism for several spec requirements —
 * see specs/001-gieo-landing-site/contracts/content-schema.md. Where a rule can
 * be a compile error instead of a test failure, it is one.
 */
import type { ImageMetadata } from 'astro';

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

/**
 * What search engines and link previews (Facebook, Zalo…) see. Page titles
 * end in `— <siteName>`: the full name is what people search for.
 */
export interface SeoContent {
  readonly siteName: string;
  /** <title> of the home page. */
  readonly homeTitle: string;
  /** Meta description of the home page; aim for 120–160 characters. */
  readonly homeDescription: string;
  /** Meta description of the /tai-lieu library page. */
  readonly libraryDescription: string;
  /** Alt text of the default preview image (the hero illustration). */
  readonly defaultImageAlt: string;
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

export type HeroActionIcon = 'book' | 'talkshow';

export interface HeroAction {
  readonly label: string;
  /** In-page anchor; must match a section id in src/sections. */
  readonly href: `#${string}`;
  readonly icon: HeroActionIcon;
}

/** One labelled fact about the talkshow, e.g. "Hình thức: Livestream…". */
export interface TalkshowDetail {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

/** One of the three parts of the programme (GIEO → NẢY → ĐÁP). */
export interface TalkshowAgendaItem {
  readonly id: 'gieo' | 'nay' | 'dap';
  /** The part's one-word name, shown large. */
  readonly name: string;
  readonly text: string;
}

/**
 * The host or a guest speaker. Their portrait is the file
 * src/assets/images/talkshow/portrait-<id>.jpg, cropped from their poster;
 * TalkshowSection resolves it, so only the alt text lives here.
 */
export interface TalkshowSpeaker {
  /** Lowercase a–z and hyphens; also names the portrait file. */
  readonly id: string;
  /** The name as the posters print it. */
  readonly name: string;
  readonly role: string;
  /** Their strongest credential, shown as a badge on the card. */
  readonly highlight: string;
  readonly portraitAlt: string;
  /** Copied from the speaker's poster. Displayed verbatim and in full. */
  readonly achievements: readonly string[];
}

export interface TalkshowSectionContent {
  /** Small label above the heading. */
  readonly eyebrow: string;
  /** The event's name. */
  readonly heading: string;
  readonly topic: string;
  readonly intro: string;
  readonly posterAlt: string;
  /** Accessible name of the lightbox that shows the poster at full size. */
  readonly posterLabel: string;
  readonly date: {
    readonly day: string;
    readonly month: string;
    readonly weekday: string;
    readonly time: string;
    /** ISO 8601 with offset; drives <time datetime> and the countdown. */
    readonly startsAt: string;
    readonly endsAt: string;
  };
  readonly details: readonly TalkshowDetail[];
  /** Sticker beside the date badge. */
  readonly freeBadge: string;
  readonly minigame: string;
  readonly countdown: {
    readonly label: string;
    /** Days, hours, minutes, seconds — in that order. */
    readonly units: readonly [string, string, string, string];
    /** Replaces the countdown between startsAt and endsAt. */
    readonly live: string;
    /** Replaces the countdown after endsAt. */
    readonly ended: string;
  };
  /** Label of the link to Gieo's TikTok, where the livestream runs. The URL comes from `social`. */
  readonly watchLabel: string;
  readonly agenda: readonly [TalkshowAgendaItem, TalkshowAgendaItem, TalkshowAgendaItem];
  readonly closingQuote: string;
  readonly speakersHeading: string;
  readonly carousel: {
    /** Accessible name of the scrollable card strip. */
    readonly label: string;
    readonly previous: string;
    readonly next: string;
  };
  /** Close button of the poster lightbox. */
  readonly closeLabel: string;
  /** Host first, then the guest speakers. */
  readonly speakers: readonly TalkshowSpeaker[];
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
  /**
   * The post's cover, resolved by `toMaterialEntry`. Cards show it above the
   * title with an empty alt, since the title already names the link.
   */
  readonly cover?: ResolvedPostCover;
}

/**
 * A post's cover illustration as stored in posts.ts: a file name in
 * src/assets/images/posts plus its alt text. Plain strings, so the data could
 * come from an API later; src/lib/posts.ts turns the file name into an
 * optimisable image. `alt` is required for the same reason as on ImageRef.
 */
export interface PostCover {
  /** File name only, e.g. `dan-chung-nlxh.png`. */
  readonly file: string;
  readonly alt: string;
}

/** A PostCover after src/lib/posts.ts has resolved the file for astro:assets. */
export interface ResolvedPostCover {
  readonly image: ImageMetadata;
  readonly alt: string;
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
  /**
   * A key takeaway or tip; `lead` is an optional bold label before it, e.g.
   * "Có thể khái quát:". Rendered as a plain paragraph for now (PostBody).
   */
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
  /** Illustration shown on the post page and on every card linking to it. */
  readonly cover: PostCover;
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
  readonly cta: NavLink;
}

/** Site-wide contact point (specs/002-terms-of-service). */
export interface ContactInfo {
  /** The only place the email address is written (FR-006, SC-006). */
  readonly email: string;
}

/** Strings for the terms page and the links to it from the footer and posts. */
export interface LegalContent {
  /** Text of the footer link and the post-notice link. */
  readonly termsLabel: string;
  /** Path of the terms page; must match its file in src/pages. */
  readonly termsHref: `/${string}`;
  /** One or two sentences shown after every post body (FR-013). */
  readonly postNotice: string;
  /** Label before the mailto link on the terms page. */
  readonly emailLabel: string;
  /** Label before the last-updated date on the terms page. */
  readonly updatedLabel: string;
}

export interface TermsSection {
  /** Lowercase a–z, 0–9 and hyphens; unique. Becomes the heading's `id`. */
  readonly id: string;
  /**
   * Stored without a number. The page renders it as `<h2>` prefixed with its
   * position ("1. …").
   */
  readonly heading: string;
  /**
   * Only `paragraph` and `list` blocks — no `heading` blocks, which would
   * break the page's h1 → h2 outline.
   */
  readonly blocks: readonly PostBlock[];
  /** The page renders the mailto line from `site.contact.email` after the blocks. */
  readonly showContact?: true;
}

/** The "Điều khoản sử dụng" document (src/content/terms.ts). */
export interface TermsOfUse {
  /** The page's single `<h1>`. */
  readonly title: string;
  /** Meta description (FR-008). */
  readonly description: string;
  /** ISO `YYYY-MM-DD`. Displayed as `DD/MM/YYYY`. Update it whenever the text changes. */
  readonly updatedAt: `${number}-${number}-${number}`;
  readonly intro: string;
  readonly sections: readonly TermsSection[];
}

export interface SiteContent {
  readonly brand: Brand;
  readonly seo: SeoContent;
  readonly nav: Navigation;
  readonly hero: Hero;
  readonly talkshow: TalkshowSectionContent;
  readonly materials: MaterialsSectionContent;
  readonly contact: ContactInfo;
  readonly legal: LegalContent;
  /** Exactly two links this release: Facebook and TikTok (FR-021). */
  readonly social: readonly [SocialLink, SocialLink];
}
