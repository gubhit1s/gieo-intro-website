import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';

/** User Story 1 acceptance scenarios (FR-004 … FR-007). */
test.describe('hero — first impression', () => {
  test('brand, mark and headline are visible without scrolling (US1 scenario 1)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText(site.hero.headline);

    // "Without scrolling" means inside the initial viewport.
    const box = await heading.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeLessThan(800);

    // Brand name and mark live in the sticky header, above the hero.
    const banner = page.getByRole('banner');
    await expect(banner.getByText(site.brand.name, { exact: true })).toBeInViewport();
    await expect(banner.locator('svg').first()).toBeInViewport();
  });

  test('the headline entrance settles within 1 second (FR-006)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    const opacity = await page
      .getByRole('heading', { level: 1 })
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0.99);

    // Every word span has finished animating.
    const stillAnimating = await page.evaluate(
      () => document.getAnimations().filter((a) => a.playState === 'running' && a.pending).length
    );
    expect(stillAnimating).toBe(0);
  });

  test('headline stays readable at 320px with no overlap (US1 scenario 2)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    const box = await heading.boundingBox();
    const topmostIsNotDecoration = await page.evaluate(
      ({ x, y }) => {
        const el = document.elementFromPoint(x, y);
        return el ? !el.closest('[aria-hidden="true"]') : false;
      },
      { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 }
    );
    expect(topmostIsNotDecoration).toBe(true);
  });

  test('both hero actions are visible and land on a real section', async ({ page }) => {
    await page.goto('/');

    for (const action of site.hero.actions) {
      await expect(page.locator(action.href)).toHaveCount(1);
      await expect(
        page.locator('#gioi-thieu').getByRole('link', { name: action.label })
      ).toBeInViewport();
    }

    const [roadmap] = site.hero.actions;
    await page.locator('#gioi-thieu').getByRole('link', { name: roadmap.label }).click();
    await page.waitForTimeout(800);

    // Scrolling is not blocked or hijacked — we actually moved down the page.
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(page.getByText(site.course.heading, { exact: true })).toBeInViewport();
  });

  test('scrolling from the hero is not intercepted (US1 scenario 4)', async ({ page }) => {
    await page.goto('/');

    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(400);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(400);
  });
});
