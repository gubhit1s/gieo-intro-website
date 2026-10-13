// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import PostBody from '~/components/astro/PostBody.astro';
import { posts } from '~/content/posts';
import { formatPostDate, postHref, toMaterialEntry } from '~/lib/posts';

/** The hardcoded post library (src/content/posts.ts). */
describe('posts', () => {
  it('has at least two posts', () => {
    expect(posts.length).toBeGreaterThanOrEqual(2);
  });

  it('gives every post a unique, URL-safe slug', () => {
    const slugs = posts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('fills in title, summary and a body for every post', () => {
    for (const post of posts) {
      expect(post.title.trim()).not.toBe('');
      expect(post.summary.trim()).not.toBe('');
      expect(post.body.length).toBeGreaterThan(0);
    }
  });

  it('gives every post an author and a real ISO publication date', () => {
    for (const post of posts) {
      expect(post.author.trim()).not.toBe('');
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.publishedAt))).toBe(false);
    }
  });

  it('formats the publication date as DD/MM/YYYY', () => {
    expect(formatPostDate('2026-10-13')).toBe('13/10/2026');
  });

  it('maps a post to a home-page entry that links to its page', () => {
    const [first] = posts;
    expect(toMaterialEntry(first!)).toEqual({
      id: first!.slug,
      title: first!.title,
      description: first!.summary,
      href: postHref(first!.slug),
    });
    expect(postHref('abc')).toBe('/tai-lieu/abc');
  });
});

describe('PostBody', () => {
  it('renders every block type as plain elements', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(PostBody, {
      props: {
        blocks: [
          { type: 'heading', level: 2, text: 'Tiêu đề lớn' },
          { type: 'heading', level: 3, text: 'Tiêu đề nhỏ' },
          { type: 'paragraph', text: 'Một đoạn văn.' },
          { type: 'list', items: [{ lead: 'Tác giả:', text: 'nội dung' }, { text: 'mục hai' }] },
          { type: 'quote', lines: ['Dòng một', 'Dòng hai'], author: 'Nhà thơ' },
          { type: 'list', ordered: true, items: [{ text: 'bước một' }] },
          { type: 'note', text: 'Ghi nhớ.' },
          { type: 'note', lead: 'Có thể khái quát:', text: 'Kết luận.' },
        ],
      },
    });

    expect(html).toMatch(/<h2[^>]*>Tiêu đề lớn<\/h2>/);
    expect(html).toMatch(/<h3[^>]*>Tiêu đề nhỏ<\/h3>/);
    expect(html).toMatch(/<p[^>]*>Một đoạn văn\.<\/p>/);
    expect(html).toMatch(/<strong[^>]*>Tác giả:<\/strong> nội dung/);
    expect(html).toContain('mục hai');
    expect(html).toMatch(/<ol[^>]*>\s*<li[^>]*>bước một<\/li>\s*<\/ol>/);
    // Poetry keeps its line break; quote marks hug the words.
    expect(html).toMatch(/“Dòng một<br[^>]*>Dòng hai”/);
    expect(html).toContain('— Nhà thơ');
    expect(html).toMatch(/<aside[^>]*class="post-note"[^>]*>Ghi nhớ\.<\/aside>/);
    expect(html).toMatch(/<strong[^>]*>Có thể khái quát:<\/strong> Kết luận\./);
  });
});
