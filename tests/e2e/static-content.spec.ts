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

    // Hero
    expect(html).toContain(site.hero.headline);
    expect(html).toContain(site.brand.name);

    // Team — names and all six achievements
    for (const member of site.team.members) {
      expect(html).toContain(member.name);
      for (const achievement of member.achievements) {
        expect(html).toContain(achievement.text);
      }
    }

    // Materials
    expect(html).toContain(site.materials.heading);
    expect(html).toContain(site.materials.subtitle);
    for (const entry of site.materials.entries) {
      expect(html).toContain(entry.title);
    }

    // Course — description, every outcome, and the CTA label
    expect(html).toContain(site.course.heading);
    expect(html).toContain(site.course.description);
    for (const outcome of site.course.outcomes) {
      expect(html).toContain(outcome.text);
    }
    expect(html).toContain(site.course.cta.label);

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

  test('all five sections remain readable (spec edge case)', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(site.hero.headline);
    await expect(page.getByText(site.team.heading)).toBeVisible();
    await expect(page.getByText(site.team.members[0].name)).toBeVisible();
    await expect(page.getByText(site.team.members[1].name)).toBeVisible();
    await expect(page.getByText(site.materials.heading)).toBeVisible();
    await expect(page.getByText(site.course.heading)).toBeVisible();

    // Every achievement is readable without scripting.
    for (const member of site.team.members) {
      for (const achievement of member.achievements) {
        await expect(page.getByText(achievement.text)).toBeVisible();
      }
    }

    // The CTA is present and visible even though its island never hydrated.
    await expect(page.getByRole('button', { name: site.course.cta.label })).toBeVisible();
  });
});
