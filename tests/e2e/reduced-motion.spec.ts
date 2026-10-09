import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';

/** Quickstart V-5 — SC-006, FR-030. */
test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('all content is visible immediately, nothing hidden (SC-006)', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(site.team.heading)).toBeVisible();

    for (const member of site.team.members) {
      const name = page.getByText(member.name, { exact: true });
      await name.scrollIntoViewIfNeeded();
      await expect(name).toBeVisible();
    }

    for (const outcome of site.course.outcomes) {
      const item = page.getByText(outcome.text, { exact: true });
      await item.scrollIntoViewIfNeeded();
      await expect(item).toBeVisible();
    }
  });

  test('the js-motion class is never applied, so nothing is hidden (FR-030)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(400);

    const hasMotionClass = await page.evaluate(() =>
      document.documentElement.classList.contains('js-motion')
    );
    expect(hasMotionClass).toBe(false);
  });

  test('no element sits at opacity 0 or an off-screen transform (SC-006)', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const hidden = await page.locator('.reveal').evaluateAll((nodes) =>
      nodes
        .filter((node) => {
          const style = getComputedStyle(node);
          return style.opacity === '0' || style.visibility === 'hidden';
        })
        .map((node) => node.className)
    );
    expect(hidden).toEqual([]);
  });

  test('no CSS animation is running (FR-030)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const running = await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === 'running').length
    );
    expect(running).toBe(0);
  });
});

test.describe('motion allowed', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('content still ends up fully visible after revealing (FR-029)', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);

    for (const outcome of site.course.outcomes) {
      await expect(page.getByText(outcome.text, { exact: true })).toBeVisible();
    }
  });

  test('a revealed element never hides again on scroll up (FR-029)', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByText(site.course.heading, { exact: true });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await expect(heading).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });
});
