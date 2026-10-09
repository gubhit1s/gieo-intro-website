// @vitest-environment node
//
// The Astro container renders server-side. Under jsdom it detects a browser
// global and refuses, so this file opts into the node environment.
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import TeamSection from '~/sections/TeamSection.astro';
import { site } from '~/content/site';

/**
 * Renders the real section component through Astro's container API, so these
 * assertions run against the same output the build produces (FR-008 … FR-012).
 */
describe('TeamSection', () => {
  let html: string;

  beforeAll(async () => {
    // No renderers needed: this section is pure Astro and ships zero JS.
    // If this ever starts failing with "No valid renderer", a React island has
    // crept into the section — which is itself the regression to fix.
    const container = await AstroContainer.create();
    html = await container.renderToString(TeamSection);
  });

  it('renders the "Chúng mình là" heading as an h2 (FR-008, FR-031)', () => {
    expect(html).toContain(site.team.heading);
    expect(html).toMatch(/<h2[^>]*>[\s\S]*?Chúng mình là[\s\S]*?<\/h2>/);
  });

  it('renders exactly two member cards (FR-008)', () => {
    const articles = html.match(/<article/g) ?? [];
    expect(articles).toHaveLength(2);
  });

  it('renders both member names as h3 (FR-009, FR-031)', () => {
    for (const member of site.team.members) {
      expect(html).toContain(member.name);
    }
    const h3s = html.match(/<h3/g) ?? [];
    expect(h3s).toHaveLength(2);
  });

  it('renders every achievement in full, verbatim (FR-010, FR-011, FR-012)', () => {
    const allAchievements = site.team.members.flatMap((m) => m.achievements);
    expect(allAchievements).toHaveLength(6);
    for (const achievement of allAchievements) {
      expect(html).toContain(achievement.text);
    }
  });

  it('renders achievements as real list items (FR-031)', () => {
    const listItems = html.match(/<li/g) ?? [];
    expect(listItems).toHaveLength(6);
    expect(html).toMatch(/<ul/);
  });

  it('never truncates achievement text (FR-012)', () => {
    expect(html).not.toMatch(/line-clamp/);
    expect(html).not.toMatch(/text-ellipsis/);
    expect(html).not.toContain('…');
  });

  it('renders the initial placeholder, not a broken image, while portraits are null', () => {
    expect(site.team.members.every((m) => m.portrait === null)).toBe(true);
    expect(html).not.toMatch(/<img/);
  });

  it('makes no card interactive — cards are not links (FR-031)', () => {
    // The section itself contains no anchors; only the footer and nav do.
    expect(html).not.toMatch(/<a\s/);
  });
});
