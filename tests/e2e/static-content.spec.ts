import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';

/**
 * Quickstart V-1 — the architectural guarantee behind SC-002.
 *
 * Every piece of text must be in the HTML response itself, before any
 * JavaScript executes. This is the spec's "scripting unavailable or still
 * loading" edge case, and it is the whole justification for the Astro/islands
 * split over a client-rendered SPA. If this file fails, a section has become an
 * island and the architecture has regressed.
 */
test.describe('static HTML carries all content', () => {
  test('the raw HTML response contains every content string', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBe(true);
    const html = await response.text();

    // Hero. The headline is split into one element per word for its entrance
    // animation, so check its words appear in order rather than as one string.
    const words = site.hero.headline.split(' ');
    let from = 0;
    for (const word of words) {
      const at = html.indexOf(word, from);
      expect(at, `headline word "${word}"`).toBeGreaterThanOrEqual(0);
      from = at + word.length;
    }
    expect(html).toContain(site.brand.name);

    // Talkshow — the event facts, then every speaker and achievement
    expect(html).toContain(site.talkshow.heading);
    expect(html).toContain(site.talkshow.date.time);
    for (const detail of site.talkshow.details) {
      expect(html).toContain(detail.value);
    }
    for (const part of site.talkshow.agenda) {
      expect(html).toContain(part.text);
    }
    for (const speaker of site.talkshow.speakers) {
      expect(html).toContain(speaker.name);
      for (const achievement of speaker.achievements) {
        expect(html).toContain(achievement.replaceAll('&', '&amp;'));
      }
    }

    // Materials
    expect(html).toContain(site.materials.heading);
    expect(html).toContain(site.materials.subtitle);
    expect(html).toContain(site.materials.viewAllLabel);

    // Footer
    for (const link of site.social) {
      expect(html).toContain(link.label);
      expect(html).toContain(link.url);
    }
  });

  test('declares Vietnamese as the document language (FR-032)', async ({ request }) => {
    const html = await (await request.get('/')).text();
    expect(html).toMatch(/<html[^>]*lang="vi"/);
  });

  test('has no static opacity:0 that could strand content if scripts fail', async ({ request }) => {
    const html = await (await request.get('/')).text();
    // The reveal wrapper must never carry an inline hidden state — the hidden
    // style is applied only under the .js-motion class the script adds.
    expect(html).not.toMatch(/style="[^"]*opacity:\s*0/);
  });
});

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  test('every section remains readable (spec edge case)', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(site.hero.headline);
    await expect(page.getByText(site.talkshow.heading, { exact: true })).toBeVisible();
    await expect(page.getByText(site.talkshow.date.time)).toBeVisible();
    await expect(page.getByRole('heading', { name: site.materials.heading, exact: true })).toBeVisible();

    // Every speaker and achievement is readable without scripting. Cards past
    // the first sit further along the strip, which still scrolls natively.
    for (const speaker of site.talkshow.speakers) {
      const name = page.getByRole('heading', { name: speaker.name });
      // DOM scrollIntoView, not Playwright's: inside the scroll-snap strip,
      // WebKit snaps each of Playwright's retry alignments back, so the
      // element never counts as stable.
      await name.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
      await expect(name).toBeVisible();
      // Scoped to the card: some achievements are shared by two speakers.
      const card = page.locator('article').filter({ has: name });
      for (const achievement of speaker.achievements) {
        const node = card.getByText(achievement, { exact: true });
        await node.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
        await expect(node).toBeVisible();
      }
    }

    // Script-only controls stay out of the way.
    await expect(page.locator('[data-carousel-controls]')).toBeHidden();
    await expect(page.locator('[data-countdown-timer]')).toBeHidden();
  });
});
