// @vitest-environment node
//
// The Astro container renders server-side. Under jsdom it detects a browser
// global and refuses, so this file opts into the node environment.
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import TalkshowSection from '~/sections/TalkshowSection.astro';
import { site } from '~/content/site';

/**
 * Renders the real section through Astro's container API, so these assertions
 * run against the same HTML the build produces.
 */
describe('TalkshowSection', () => {
  const t = site.talkshow;
  let html: string;

  beforeAll(async () => {
    // No renderers: the section is pure Astro and its script is a plain
    // module script, not a React island.
    const container = await AstroContainer.create();
    html = await container.renderToString(TalkshowSection);
  });

  it('carries the #noi-dung anchor as a labelled landmark', () => {
    expect(html).toMatch(/<section[^>]*id="noi-dung"[^>]*aria-labelledby="gieo-talkshow-heading"/);
  });

  it('renders the event name as the h2', () => {
    expect(html).toMatch(/<h2[^>]*id="gieo-talkshow-heading"[^>]*>[\s\S]*?Ươm mầm cùng GIEO/);
  });

  it('renders the date as a machine-readable <time>', () => {
    expect(html).toContain(`datetime="${t.date.startsAt}"`);
    expect(html).toContain(t.date.time);
    expect(html).toContain(t.date.weekday);
  });

  it('renders every detail, the minigame and all three parts of the programme', () => {
    for (const detail of t.details) {
      expect(html).toContain(detail.label);
      expect(html).toContain(detail.value);
    }
    expect(html).toContain(t.minigame);
    for (const part of t.agenda) {
      expect(html).toContain(part.name);
      expect(html).toContain(part.text);
    }
  });

  it('links to Gieo’s TikTok, where the livestream runs', () => {
    const tiktok = site.social.find((link) => link.platform === 'tiktok')!;
    expect(html).toContain(`href="${tiktok.url}"`);
    expect(html).toContain(t.watchLabel);
  });

  it('renders one card per speaker, names as h4', () => {
    expect(html.match(/<article/g) ?? []).toHaveLength(t.speakers.length);
    expect(html.match(/<h4/g) ?? []).toHaveLength(t.speakers.length);
    for (const speaker of t.speakers) {
      expect(html).toContain(speaker.name);
      expect(html).toContain(speaker.highlight);
    }
  });

  it('renders every achievement in full, as list items', () => {
    // Achievements contain "&", which the HTML escapes.
    const escaped = (text: string) => text.replaceAll('&', '&amp;');
    for (const achievement of t.speakers.flatMap((s) => s.achievements)) {
      expect(html).toContain(escaped(achievement));
    }
    expect(html).not.toMatch(/line-clamp/);
    expect(html).not.toMatch(/text-ellipsis/);
  });

  it('gives every image alt text', () => {
    for (const img of html.match(/<img[^>]*>/g) ?? []) {
      expect(img).toMatch(/alt="[^"]+"/);
    }
    for (const speaker of t.speakers) {
      expect(html).toContain(speaker.portraitAlt);
    }
  });

  it('keeps script-only controls hidden in the static HTML', () => {
    expect(html).toMatch(/data-carousel-controls[^>]*hidden/);
    expect(html).toMatch(/data-countdown-timer[^>]*hidden/);
  });
});
