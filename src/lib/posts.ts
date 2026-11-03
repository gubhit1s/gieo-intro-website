/**
 * Helpers over the post library (src/content/posts.ts).
 *
 * Pages use these; section components take plain `MaterialEntry` props, so
 * swapping the hardcoded posts for an API later only touches this file and
 * the pages that call it.
 */
import type { ImageMetadata } from 'astro';
import { posts } from '~/content/posts';
import type { MaterialEntry, Post, ResolvedPostCover } from '~/content/types';

/** Every cover image, keyed by file name, so Astro can optimise them at build time. */
const coverImages = Object.fromEntries(
  Object.entries(
    import.meta.glob<ImageMetadata>('../assets/images/posts/*.{png,jpg,jpeg,webp}', {
      eager: true,
      import: 'default',
    })
  ).map(([path, image]) => [path.split('/').pop()!, image])
);

/** All posts, in display order. The first is featured on the home page. */
export function getPosts(): readonly Post[] {
  return posts;
}

/** Throws on a missing file, so a typo in posts.ts fails the build rather than shipping a broken image. */
export function resolveCover(post: Post): ResolvedPostCover {
  const image = coverImages[post.cover.file];
  if (!image) {
    throw new Error(
      `Post "${post.slug}": cover "${post.cover.file}" is not in src/assets/images/posts`
    );
  }
  return { image, alt: post.cover.alt };
}

/** "2026-10-13" → "13/10/2026", the date format Vietnamese readers expect. */
export function formatPostDate(iso: Post['publishedAt']): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

export function postHref(slug: string): MaterialEntry['href'] {
  return `/tai-lieu/${slug}`;
}

export function toMaterialEntry(post: Post): MaterialEntry {
  return {
    id: post.slug,
    title: post.title,
    description: post.summary,
    href: postHref(post.slug),
    cover: resolveCover(post),
  };
}
