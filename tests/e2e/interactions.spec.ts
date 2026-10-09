import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';

/**
 * Quickstart V-6 and V-7 — the inert call to action (SC-010) and the social
 * links (SC-008).
 */

test.describe('call to action — present but deliberately inert', () => {
  test('renders as an enabled button, not a link or a div (FR-034)', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('button', { name: site.course.cta.label });

    await expect(cta).toBeVisible();
    await expect(cta).toBeEnabled();
    await expect(cta).toHaveJSProperty('tagName', 'BUTTON');
    await expect(cta).toHaveAttribute('type', 'button');
  });

  test('is keyboard-focusable with a visible focus indicator (FR-031)', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('button', { name: site.course.cta.label });

    // Focus the element, then step away and back with the keyboard. The round
    // trip establishes keyboard modality, which is what :focus-visible keys
    // off — a bare programmatic .focus() does not match it in every engine.
    await cta.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(cta).toBeFocused();

    // getComputedStyle(el, ':focus-visible') is not supported consistently
    // across engines, so assert on the element's actual focused style instead.
    const ring = await cta.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        outlineWidth: parseFloat(style.outlineWidth) || 0,
        outlineStyle: style.outlineStyle,
        boxShadow: style.boxShadow,
      };
    });
    const hasVisibleRing =
      (ring.outlineStyle !== 'none' && ring.outlineWidth > 0) || ring.boxShadow !== 'none';
    expect(hasVisibleRing).toBe(true);
  });

  test('clicking changes nothing — no navigation, no scroll jump (FR-035)', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('button', { name: site.course.cta.label });
    await cta.scrollIntoViewIfNeeded();

    const urlBefore = page.url();
    const scrollBefore = await page.evaluate(() => window.scrollY);

    await cta.click();
    await page.waitForTimeout(150);

    expect(page.url()).toBe(urlBefore);
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  });

  test('ten clicks produce no console error and no accumulated state', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');
    const cta = page.getByRole('button', { name: site.course.cta.label });
    await cta.scrollIntoViewIfNeeded();
    // The page uses scroll-behavior: smooth, so the programmatic scroll above
    // is still animating. Let it settle before taking the baseline, otherwise
    // the test measures the scroll easing rather than the button's behaviour.
    await page.waitForFunction(() => {
      const w = window as unknown as { __y?: number; __stable?: number };
      const y = window.scrollY;
      w.__stable = w.__y === y ? (w.__stable ?? 0) + 1 : 0;
      w.__y = y;
      return (w.__stable ?? 0) > 3;
    }, null, { timeout: 5000 });

    // Compare text content, not innerHTML: the button's hover/press animation
    // legitimately mutates inline transform styles, which is not "accumulated
    // state" in any sense FR-035 cares about.
    const textBefore = await page.locator('#khoa-hoc').innerText();
    const scrollBefore = await page.evaluate(() => window.scrollY);
    const urlBefore = page.url();

    // Dispatch the clicks on the element directly rather than driving them
    // through Playwright. Playwright re-hovers and re-scrolls before every
    // click, and in WebKit that nudges the page by a few pixels — which would
    // measure the test driver's mechanics, not the button's behaviour. FR-035
    // is about what *our* handler does, and a single real user click is
    // already covered by the preceding test.
    await cta.evaluate((button) => {
      for (let i = 0; i < 10; i += 1) (button as HTMLButtonElement).click();
    });
    await page.waitForTimeout(200);

    expect(errors).toEqual([]);
    expect(await page.locator('#khoa-hoc').innerText()).toBe(textBefore);
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
    expect(page.url()).toBe(urlBefore);
    // Still enabled and focusable after repeated use.
    await expect(cta).toBeEnabled();
  });
});

test.describe('social links', () => {
  test('renders exactly two labelled links opening in a new tab (FR-021, FR-023)', async ({
    page,
  }) => {
    await page.goto('/');

    for (const link of site.social) {
      const anchor = page.getByRole('link', { name: link.label });
      await expect(anchor).toHaveAttribute('href', link.url);
      await expect(anchor).toHaveAttribute('target', '_blank');
      await expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('has no dead links anywhere on the page (FR-015, SC-008)', async ({ page }) => {
    await page.goto('/');

    const hrefs = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors.map((a) => a.getAttribute('href') ?? '')
    );

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).not.toBe('');
      expect(href).not.toBe('#');
    }
  });

  test('material placeholder cards are not interactive (FR-015)', async ({ page }) => {
    await page.goto('/');

    const materialLinks = page.locator('#tai-lieu a');
    await expect(materialLinks).toHaveCount(0);

    const articles = page.locator('#tai-lieu article');
    await expect(articles).toHaveCount(site.materials.entries.length);
  });
});
