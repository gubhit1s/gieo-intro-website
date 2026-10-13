import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { site } from '../../src/content/site';
import { posts } from '../../src/content/posts';

/**
 * The post library: /tai-lieu (grid) and /tai-lieu/<slug> (one post).
 *
 * Card discovery reads the rendered library page; the expected set comes from
 * the hardcoded data in src/content/posts.ts.
 */
async function libraryCards(page: Page) {
  await page.goto('/tai-lieu');
  const cards = page.locator('#noi-dung li a');
  return cards.evaluateAll((links) =>
    links.map((link) => ({
      href: link.getAttribute('href')!,
      title: link.querySelector('h2')?.textContent?.trim() ?? '',
    }))
  );
}

test.describe('post library', () => {
  test('the library page lists posts, each linking to its own page', async ({ page }) => {
    const cards = await libraryCards(page);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      site.materials.library.heading
    );

    expect(cards.map((card) => card.href)).toEqual(posts.map((post) => `/tai-lieu/${post.slug}`));
    for (const card of cards) {
      expect(card.href).toMatch(/^\/tai-lieu\/[a-z0-9-]+$/);
      expect(card.title).not.toBe('');
    }
  });

  test('every post opens with its title, byline, summary and body', async ({ page }) => {
    const cards = await libraryCards(page);
    for (const card of cards) {
      const post = posts.find((p) => `/tai-lieu/${p.slug}` === card.href)!;
      await page.goto(card.href);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(card.title);

      const byline = page.locator('article header p').filter({ has: page.locator('time') });
      await expect(byline).toContainText(`${site.materials.library.postedByLabel} ${post.author}`);
      await expect(byline.locator('time')).toHaveAttribute('datetime', post.publishedAt);

      await expect(page.getByText(post.summary, { exact: true })).toBeVisible();
      await expect(page.locator('.post-body h2').first()).toBeVisible();
    }
  });

  test('the back link returns to the library', async ({ page }) => {
    const [first] = await libraryCards(page);
    await page.goto(first!.href);
    await page.getByRole('link', { name: site.materials.library.backLabel }).first().click();
    await expect(page).toHaveURL(/\/tai-lieu\/?$/);
  });

  test('the "Kho tài liệu" nav link opens the library and is marked current', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');
    await nav.getByRole('link', { name: 'Kho tài liệu' }).click();
    await expect(page).toHaveURL(/\/tai-lieu\/?$/);
    await expect(nav.getByRole('link', { name: 'Kho tài liệu' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  test('section links on a sub-page lead back to the home page', async ({ page }) => {
    await page.goto('/tai-lieu');
    const hrefs = await page
      .getByRole('navigation')
      .getByRole('link')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    for (const href of hrefs) {
      expect(href!.startsWith('#')).toBe(false);
    }
  });

  test('a post page has no horizontal scroll at 320px', async ({ page }) => {
    const [first] = await libraryCards(page);
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(first!.href);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('library and post pages have no critical or serious axe violations', async ({ page }) => {
    const [first] = await libraryCards(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of ['/tai-lieu', first!.href]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );
      expect(serious, `${path}: ${serious.map((v) => v.id).join(', ')}`).toEqual([]);
    }
  });
});
