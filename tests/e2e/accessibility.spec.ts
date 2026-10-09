import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Quickstart V-4 — SC-005, FR-028, FR-031.
 *
 * The colour-contrast rule here is the gate on the brand palette (research R-004).
 * If it fails, darken the TEXT token in global.css — never disable the rule.
 */
test.describe('accessibility', () => {
  test('has no critical or serious axe violations (SC-005)', async ({ page }) => {
    await page.goto('/');

    // Trigger every scroll-reveal, then wait for them all to be fully opaque.
    // Scanning mid-fade makes axe compute contrast against a partially
    // transparent element and report a failure that does not exist once the
    // transition settles — a test-timing artifact, not a real defect.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForFunction(
      () =>
        Array.from(document.querySelectorAll('.reveal')).every(
          (el) => getComputedStyle(el).opacity === '1'
        ),
      null,
      { timeout: 10_000 }
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    // Belt and braces: every finite animation has finished. The ambient plant
    // decorations loop forever by design, so they are excluded.
    await page.waitForFunction(
      () =>
        document
          .getAnimations()
          .filter((a) => a.effect?.getTiming().iterations !== Infinity)
          .every((a) => a.playState !== 'running'),
      null,
      { timeout: 10_000 }
    );

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const blocking = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious'
    );

    // Surface the detail in the failure message rather than just a count.
    expect(
      blocking.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target.join(' ')),
      }))
    ).toEqual([]);
  });

  test('has exactly one h1 and no skipped heading levels (FR-031)', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveCount(1);

    const levels = await page
      .locator('h1, h2, h3, h4, h5, h6')
      .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName.slice(1))));

    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      // A level may stay the same, go back up, or step down by exactly one.
      expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
    }
  });

  test('every section is a labelled landmark (FR-001, FR-031)', async ({ page }) => {
    await page.goto('/');

    for (const id of ['gioi-thieu', 'noi-dung', 'tai-lieu', 'khoa-hoc']) {
      await expect(page.locator(`#${id}`)).toHaveAttribute('aria-labelledby', /.+/);
    }
  });

  test('every interactive element is reachable by keyboard (FR-031)', async ({ page }) => {
    await page.goto('/');

    const interactive = await page
      .locator('a[href], button:not([disabled])')
      .evaluateAll((nodes) => nodes.map((n) => (n.textContent ?? '').trim().slice(0, 40)));
    expect(interactive.length).toBeGreaterThan(0);

    // WebKit on macOS defaults to not tab-focusing links, so drive focus
    // through the DOM's own tab order instead of synthetic Tab presses — the
    // requirement is that each element is focusable and shows a focus ring,
    // not that a specific browser's default Tab policy includes it.
    const focusResults = await page
      .locator('a[href], button:not([disabled])')
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          (node as HTMLElement).focus();
          const focused = document.activeElement === node;
          const style = getComputedStyle(node);
          return {
            label: (node.textContent ?? '').trim().slice(0, 40),
            focused,
            tabIndex: (node as HTMLElement).tabIndex,
            hidden: style.display === 'none' || style.visibility === 'hidden',
          };
        })
      );

    const unfocusable = focusResults.filter((r) => !r.focused || r.tabIndex < 0 || r.hidden);
    expect(unfocusable).toEqual([]);
  });

  test('every element reached by Tab shows a visible focus indicator (FR-031)', async ({
    page,
  }) => {
    await page.goto('/');
    await page.evaluate(() => document.body.focus());

    const withoutRing: string[] = [];
    let reached = 0;

    // Walk the real keyboard tab order so :focus-visible genuinely applies.
    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press('Tab');
      const result = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const style = getComputedStyle(el);
        return {
          label: `${el.tagName}:${(el.textContent ?? '').trim().slice(0, 30)}`,
          hasRing:
            (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) ||
            style.boxShadow !== 'none',
        };
      });
      if (!result) continue;
      reached += 1;
      if (!result.hasRing) withoutRing.push(result.label);
    }

    expect(reached).toBeGreaterThan(0);
    expect(withoutRing).toEqual([]);
  });

  test('decorative artwork is hidden from assistive technology (FR-027)', async ({ page }) => {
    await page.goto('/');

    // Every plant/seed SVG must be aria-hidden; none may take a focus stop.
    const exposedDecorations = await page.locator('svg:not([aria-hidden="true"])').evaluateAll(
      (svgs) => svgs.filter((s) => !s.getAttribute('role')).length
    );
    expect(exposedDecorations).toBe(0);

    await expect(page.locator('svg[tabindex]')).toHaveCount(0);
  });
});
