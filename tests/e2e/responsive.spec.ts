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
      for (const speaker of site.talkshow.speakers) {
        // Scoped to the card: some achievements are shared by two speakers.
        const card = page.locator('article').filter({
          has: page.getByRole('heading', { name: speaker.name }),
        });
        for (const achievement of speaker.achievements) {
          const node = card.getByText(achievement, { exact: true });
          // DOM scrollIntoView, not Playwright's: inside the scroll-snap strip,
          // WebKit snaps each of Playwright's retry alignments back, so the
          // element never counts as stable.
          await node.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
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

  test('speaker cards sit side by side in a strip that scrolls on its own', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/');

    const track = page.locator('[data-carousel-track]');
    await expect(track.locator('article')).toHaveCount(site.talkshow.speakers.length);

    // Layout boxes, not bounding boxes: the entrance animation tilts the cards.
    const [first, second] = await track.evaluate((el) =>
      Array.from(el.children as HTMLCollectionOf<HTMLElement>)
        .slice(0, 2)
        .map((card) => ({ left: card.offsetLeft, top: card.offsetTop, width: card.offsetWidth }))
    );
    // In a row, not stacked — and the strip overflows rather than the page.
    expect(second!.top).toBe(first!.top);
    expect(second!.left).toBeGreaterThanOrEqual(first!.left + first!.width);
    expect(await track.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
  });

  test('no decorative artwork overlaps text (FR-027)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/');

    // Decorations are pointer-events:none, so the reliable check is that a
    // click at the centre of each heading reaches the heading itself.
    for (const text of [site.talkshow.heading, site.materials.heading]) {
      const heading = page.getByRole('heading', { name: text, exact: true });
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
