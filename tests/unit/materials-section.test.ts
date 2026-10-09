// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import MaterialsSection from '~/sections/MaterialsSection.astro';
import SiteFooter from '~/sections/SiteFooter.astro';
import { site } from '~/content/site';

/** Materials section rendering (FR-013 … FR-016). */
describe('MaterialsSection', () => {
  let html: string;

  beforeAll(async () => {
    const container = await AstroContainer.create();
    html = await container.renderToString(MaterialsSection);
  });

  it('renders the heading and subtitle (FR-013)', () => {
    expect(html).toContain('Những tài liệu của chúng mình');
    expect(html).toContain(site.materials.subtitle);
    expect(html).toMatch(/<h2/);
  });

  it('renders at least three entries (FR-014)', () => {
    expect(site.materials.entries.length).toBeGreaterThanOrEqual(3);
    for (const entry of site.materials.entries) {
      expect(html).toContain(entry.title);
      expect(html).toContain(entry.description);
    }
  });

  it('renders every placeholder entry as a non-interactive article (FR-015)', () => {
    const articles = html.match(/<article/g) ?? [];
    expect(articles).toHaveLength(site.materials.entries.length);
  });

  it('emits no links at all while every href is null — no dead ends (FR-015)', () => {
    expect(site.materials.entries.every((entry) => entry.href === null)).toBe(true);
    expect(html).not.toMatch(/<a\s/);
    expect(html).not.toMatch(/href="#"/);
    expect(html).not.toMatch(/href=""/);
  });
});

/** Footer rendering (FR-020 … FR-023). */
describe('SiteFooter', () => {
  let html: string;

  beforeAll(async () => {
    const container = await AstroContainer.create();
    html = await container.renderToString(SiteFooter);
  });

  it('renders the brand name (FR-020)', () => {
    expect(html).toContain(site.brand.name);
  });

  it('renders exactly two social links (FR-021)', () => {
    const anchors = html.match(/<a\s/g) ?? [];
    expect(anchors).toHaveLength(2);
  });

  it('opens every social link in a new tab with a safe rel (FR-023)', () => {
    const targets = html.match(/target="_blank"/g) ?? [];
    expect(targets).toHaveLength(2);
    const rels = html.match(/rel="noopener noreferrer"/g) ?? [];
    expect(rels).toHaveLength(2);
  });

  it('gives every link an accessible name from the content label (FR-021)', () => {
    for (const link of site.social) {
      expect(html).toContain(link.label);
      expect(html).toContain(link.url);
    }
  });

  it('hides the labels visually with sr-only, never display:none (FR-021)', () => {
    const srOnly = html.match(/class="sr-only"/g) ?? [];
    expect(srOnly).toHaveLength(2);
  });
});
