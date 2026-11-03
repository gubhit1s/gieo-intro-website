import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { site } from '../../src/content/site';
import { terms } from '../../src/content/terms';
import { posts } from '../../src/content/posts';

/**
 * The terms page, /dieu-khoan-su-dung
 * (specs/002-terms-of-service/contracts/ui-contract.md § Test contract).
 */
const TERMS = site.legal.termsHref;
const MAILTO = `mailto:${site.contact.email}`;

test.describe('terms page', () => {
  test('renders the title, date, eight numbered sections and two email links', async ({ page }) => {
    await page.goto(TERMS);

    await expect(page).toHaveTitle(`${terms.title} — ${site.seo.siteName}`);
    await expect(page.locator('h1')).toHaveText(terms.title);

    const headings = page.locator('#noi-dung h2');
    await expect(headings).toHaveText(
      terms.sections.map((section, index) => `${index + 1}. ${section.heading}`)
    );

    await expect(page.locator('time[datetime="2026-11-03"]')).toHaveText('03/11/2026');

    const emails = page.locator(`a[href="${MAILTO}"]`);
    await expect(emails).toHaveCount(2);
    for (const email of await emails.all()) {
      await expect(email).toHaveText(site.contact.email);
    }
  });

  test('carries the key prohibitions in the static HTML (FR-004)', async ({ request }) => {
    const response = await request.get(TERMS);
    expect(response.ok()).toBe(true);
    // Lower-cased: the phrases open list items, so they start with a capital.
    const html = (await response.text()).toLowerCase();
    expect(html).toContain('vật chất hóa');
    expect(html).toContain('thương mại hóa');
  });

  test('has no horizontal scroll at 320px (SC-005)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(TERMS);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('has one h1, no skipped heading levels and no serious axe violations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(TERMS);

    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page
      .locator('h1, h2, h3, h4, h5, h6')
      .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName.slice(1))));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(serious, serious.map((v) => v.id).join(', ')).toEqual([]);
  });
});

test.describe('footer link (FR-010, FR-011, FR-012)', () => {
  const pages = ['/', '/tai-lieu', `/tai-lieu/${posts[0]!.slug}`, TERMS];

  for (const path of pages) {
    test(`is in the footer of ${path} and opens the terms page`, async ({ page }) => {
      await page.goto(path);

      const link = page.locator(`footer a[href="${TERMS}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveText(site.legal.termsLabel);
      await expect(link).not.toHaveAttribute('target', /.*/);

      await link.click();
      await expect(page).toHaveURL(new RegExp(`${TERMS}/?$`));
      await expect(page.locator('h1')).toHaveText(terms.title);
      // The footer, with its #lien-he anchor, is on this page too.
      await expect(page.locator('footer#lien-he')).toHaveCount(1);
    });
  }

  test('shows a visible focus indicator and opens with Enter', async ({ page }) => {
    await page.goto('/');
    const link = page.locator(`footer a[href="${TERMS}"]`);

    // A keypress first, so the browser treats the focus as keyboard focus
    // and :focus-visible applies.
    await page.keyboard.press('Tab');
    await link.focus();

    const hasRing = await link.evaluate((el) => {
      const style = getComputedStyle(el);
      return (
        (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) ||
        style.boxShadow !== 'none'
      );
    });
    expect(hasRing).toBe(true);

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`${TERMS}/?$`));
  });
});

test.describe('post notice (FR-013, US3)', () => {
  for (const post of posts) {
    test(`/tai-lieu/${post.slug} ends with a copyright notice linking to the terms`, async ({
      page,
    }) => {
      await page.goto(`/tai-lieu/${post.slug}`);

      const notice = page.locator('#noi-dung aside.post-legal');
      await expect(notice).toHaveCount(1);
      await expect(notice).toContainText(site.legal.postNotice);
      await expect(notice.locator(`a[href="${TERMS}"]`)).toHaveText(site.legal.termsLabel);

      // Secondary to the article: no headings, and not part of the post body.
      await expect(notice.locator('h1, h2, h3, h4, h5, h6')).toHaveCount(0);
      await expect(page.locator('.post-body aside.post-legal')).toHaveCount(0);
    });
  }
});
