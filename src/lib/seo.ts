/**
 * Structured data (schema.org JSON-LD) for search engines.
 *
 * Google reads these to understand what a page is — an organisation, an
 * article, an event — and may show richer results for them (an event's date
 * in the results, an article's publish date). Every URL in here must be
 * absolute, which is why they are built from `import.meta.env.SITE`, the
 * `site` set in astro.config.mjs.
 *
 * Validate changes with Google's Rich Results Test:
 * https://search.google.com/test/rich-results
 */
import { site } from '~/content/site';
import type { Post } from '~/content/types';

type JsonLd = Record<string, unknown>;

/** `/tai-lieu` → `https://hocvancunggieo.com/tai-lieu`. */
export function absoluteUrl(path: string): string {
  return new URL(path, import.meta.env.SITE).href;
}

/** Gieo itself, linked to its social profiles. */
export function organization(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: site.seo.siteName,
    alternateName: site.brand.name,
    url: absoluteUrl('/'),
    sameAs: site.social.map((link) => link.url),
  };
}

/** The home page: the site plus the organisation behind it. */
export function homeGraph(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        name: site.seo.siteName,
        url: absoluteUrl('/'),
        inLanguage: 'vi',
        publisher: { '@id': absoluteUrl('/#organization') },
      },
    ],
  };
}

/**
 * The talkshow as a free online event. Once it has ended Google stops showing
 * it as upcoming; remove the section (and this) when the next event replaces it.
 */
export function talkshowEvent(posterUrl: string): JsonLd {
  const t = site.talkshow;
  const tiktok = site.social.find((link) => link.platform === 'tiktok')!;
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Talkshow ${t.heading}: ${t.topic}`,
    description: t.intro,
    startDate: t.date.startsAt,
    endDate: t.date.endsAt,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: { '@type': 'VirtualLocation', url: tiktok.url },
    image: [posterUrl],
    inLanguage: 'vi',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl('/#noi-dung'),
    },
    organizer: { '@type': 'Organization', name: site.seo.siteName, url: absoluteUrl('/') },
    performer: t.speakers.map((speaker) => ({ '@type': 'Person', name: speaker.name })),
  };
}

/** One post in the library. */
export function article(post: Post, url: string, imageUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: [imageUrl],
    datePublished: post.publishedAt,
    inLanguage: 'vi',
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: site.seo.siteName, url: absoluteUrl('/') },
    publisher: { '@type': 'Organization', name: site.seo.siteName, url: absoluteUrl('/') },
  };
}
