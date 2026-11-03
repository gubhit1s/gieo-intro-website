import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';
import { posts } from '../../src/content/posts';

/**
 * What search engines and link previews see: robots.txt, the sitemap, and the
 * canonical / Open Graph / structured-data tags in each page's <head>.
 */
const SITE = 'https://hocvancunggieo.com';
const pages = ['/', '/tai-lieu', `/tai-lieu/${posts[0]!.slug}`, '/dieu-khoan-su-dung'];

test.describe('crawling', () => {
  test('robots.txt allows everything and points at the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBe(true);
    const body = await response.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
  });

  test('the sitemap lists every page by its slash-less canonical URL', async ({ request }) => {
    const index = await (await request.get('/sitemap-index.xml')).text();
    expect(index).toContain(`${SITE}/sitemap-0.xml`);

    const sitemap = await (await request.get('/sitemap-0.xml')).text();
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(
      expect.arrayContaining([
        `${SITE}/`,
        `${SITE}/tai-lieu`,
        `${SITE}/dieu-khoan-su-dung`,
        ...posts.map((post) => `${SITE}/tai-lieu/${post.slug}`),
      ])
    );
    expect(locs.filter((loc) => loc !== `${SITE}/` && loc!.endsWith('/'))).toEqual([]);
  });
});

test.describe('page metadata', () => {
  for (const path of pages) {
    test(`${path} has a canonical URL, a description and preview tags`, async ({ page }) => {
      await page.goto(path);
      const head = page.locator('head');
      const expected = path === '/' ? `${SITE}/` : `${SITE}${path}`;

      await expect(head.locator('link[rel="canonical"]')).toHaveAttribute('href', expected);
      await expect(head.locator('meta[property="og:url"]')).toHaveAttribute('content', expected);
      await expect(page).toHaveTitle(new RegExp(site.seo.siteName));
      await expect(head.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
      await expect(head.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        new RegExp(`^${SITE}/_astro/.+\\.jpe?g$`)
      );

      // The preview image really exists.
      const image = await head.locator('meta[property="og:image"]').getAttribute('content');
      const response = await page.request.get(new URL(image!).pathname);
      expect(response.ok()).toBe(true);
    });
  }

  test('the home page uses its SEO title and description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(site.seo.homeTitle);
    await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
      'content',
      site.seo.homeDescription
    );
  });
});

test.describe('structured data', () => {
  const jsonLd = async (page: import('@playwright/test').Page) =>
    (await page.locator('script[type="application/ld+json"]').allTextContents()).map(
      (text) => JSON.parse(text) as Record<string, unknown>
    );

  test('the home page describes Gieo and the talkshow as a free online event', async ({ page }) => {
    await page.goto('/');
    const data = await jsonLd(page);

    const graph = data.find((d) => '@graph' in d)!['@graph'] as Record<string, unknown>[];
    const org = graph.find((d) => d['@type'] === 'Organization')!;
    expect(org.name).toBe(site.seo.siteName);
    expect(org.sameAs).toEqual(site.social.map((link) => link.url));

    const event = data.find((d) => d['@type'] === 'Event')!;
    expect(event.startDate).toBe(site.talkshow.date.startsAt);
    expect(event.endDate).toBe(site.talkshow.date.endsAt);
    expect(event.eventAttendanceMode).toBe('https://schema.org/OnlineEventAttendanceMode');
    expect(event.isAccessibleForFree).toBe(true);
    expect((event.image as string[])[0]).toMatch(new RegExp(`^${SITE}/`));
  });

  test('a post is described as an article', async ({ page }) => {
    const post = posts[0]!;
    await page.goto(`/tai-lieu/${post.slug}`);
    const article = (await jsonLd(page)).find((d) => d['@type'] === 'Article')!;

    expect(article.headline).toBe(post.title);
    expect(article.datePublished).toBe(post.publishedAt);
    expect(article.mainEntityOfPage).toBe(`${SITE}/tai-lieu/${post.slug}`);
  });
});
