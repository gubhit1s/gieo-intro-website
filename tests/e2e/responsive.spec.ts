import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';

/** Quickstart V-3 — SC-003, FR-003, FR-027. */

const WIDTHS = [320, 768, 1280, 1920] as const;

test.describe('responsive integrity', () => {
  for (const width of WIDTHS) {
    test(`no horizontal scroll at ${width}px (FR-003)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(600);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test(`all content text is visible at ${width}px (FR-012, SC-003)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');

      // Achievements are the longest Vietnamese runs on the page and the most
      // likely to clip or overflow.
      for (const member of site.team.members) {
        for (const achievement of member.achievements) {
          const node = page.getByText(achievement.text, { exact: true });
          await node.scrollIntoViewIfNeeded();
          await expect(node).toBeVisible();

          const clipped = await node.evaluate((el) => {
            const style = getComputedStyle(el);
            return (
              el.scrollWidth > el.clientWidth + 1 ||
              style.textOverflow === 'ellipsis' ||
              style.webkitLineClamp !== 'none'
            );
          });
          expect(clipped).toBe(false);
        }
      }
    });
  }

  test('team cards stack on a narrow viewport (US2 scenario 4)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/');

    const cards = page.locator('#noi-dung article');
    await expect(cards).toHaveCount(2);

    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    // Stacked, not side by side.
    expect(second!.y).toBeGreaterThan(first!.y + first!.height - 1);
  });

  test('no decorative artwork overlaps text (FR-027)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/');

    // Decorations are pointer-events:none, so the reliable check is that a
    // click at the centre of each heading reaches the heading itself.
    for (const text of [site.team.heading, site.materials.heading, site.course.heading]) {
      const heading = page.getByText(text, { exact: true });
      await heading.scrollIntoViewIfNeeded();
      const box = await heading.boundingBox();
      expect(box).not.toBeNull();

      const topmostIsNotDecoration = await page.evaluate(
        ({ x, y }) => {
          const el = document.elementFromPoint(x, y);
          if (!el) return false;
          return !el.closest('[aria-hidden="true"]');
        },
        { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 }
      );
      expect(topmostIsNotDecoration).toBe(true);
    }
  });

  test('survives 200% zoom without clipping (SC-003)', async ({ page }) => {
    // Emulating 200% zoom: half the CSS viewport at double device scale.
    await page.setViewportSize({ width: 640, height: 450 });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
