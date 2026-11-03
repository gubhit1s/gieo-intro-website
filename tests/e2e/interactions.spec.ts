import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';

/**
 * Quickstart V-7 — the header's talkshow button and the social links (SC-008).
 */

test.describe('header talkshow button', () => {
  test('jumps to the talkshow section on the home page', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('header').getByRole('link', { name: site.nav.cta.label });

    await expect(button).toHaveAttribute('href', '#noi-dung');
    await button.click();
    await expect(page.getByText(site.talkshow.heading, { exact: true })).toBeInViewport();
  });

  test('leads back to the home page’s talkshow from other pages', async ({ page }) => {
    await page.goto('/tai-lieu');
    const button = page.locator('header').getByRole('link', { name: site.nav.cta.label });

    await expect(button).toHaveAttribute('href', '/#noi-dung');
    await button.click();
    await expect(page).toHaveURL(/\/#noi-dung$/);
    await expect(page.getByText(site.talkshow.heading, { exact: true })).toBeInViewport();
  });
});

test.describe('social links', () => {
  test('renders exactly two labelled links opening in a new tab (FR-021, FR-023)', async ({
    page,
  }) => {
    await page.goto('/');

    for (const link of site.social) {
      const anchor = page.getByRole('link', { name: link.label, exact: true });
      await expect(anchor).toHaveAttribute('href', link.url);
      await expect(anchor).toHaveAttribute('target', '_blank');
      await expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('has no dead links anywhere on the page (FR-015, SC-008)', async ({ page }) => {
    await page.goto('/');

    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href') ?? ''));

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).not.toBe('');
      expect(href).not.toBe('#');
    }
  });

  test('every material entry opens its post page (FR-016)', async ({ page }) => {
    await page.goto('/');

    const hrefs = await page
      .locator('#tai-lieu a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(hrefs).toContain('/tai-lieu');

    for (const href of hrefs.filter((href) => href !== '/tai-lieu')) {
      expect(href).toMatch(/^\/tai-lieu\/[a-z0-9-]+$/);
      const response = await page.request.get(href!);
      expect(response.ok()).toBe(true);
    }
  });
});
