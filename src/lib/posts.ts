/**
 * Helpers over the post library (src/content/posts.ts).
 *
 * Pages use these; section components take plain `MaterialEntry` props, so
 * swapping the hardcoded posts for an API later only touches this file and
 * the pages that call it.
 */
import { posts } from '~/content/posts';
import type { MaterialEntry, Post } from '~/content/types';

/** All posts, in display order. The first is featured on the home page. */
export function getPosts(): readonly Post[] {
  return posts;
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
  };
}
