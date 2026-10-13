// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import MaterialsSection from '~/sections/MaterialsSection.astro';
import SiteFooter from '~/sections/SiteFooter.astro';
import { site } from '~/content/site';
import type { MaterialEntry } from '~/content/types';

/** Materials section rendering (FR-013 … FR-016). */
describe('MaterialsSection', () => {
  // Fixture entries in the shape src/lib/posts.ts produces from the Markdown
  // posts. Four of them, to prove the section caps the preview at three.
  const entries: MaterialEntry[] = [1, 2, 3, 4].map((n) => ({
    id: `bai-${n}`,
    title: `Bài viết số ${n}`,
    description: `Tóm tắt bài viết số ${n}.`,
    href: `/tai-lieu/bai-${n}`,
  }));
  const shown = entries.slice(0, 3);

  let html: string;

  beforeAll(async () => {
    const container = await AstroContainer.create();
    html = await container.renderToString(MaterialsSection, { props: { entries } });
  });

  it('renders the heading and subtitle (FR-013)', () => {
    expect(html).toContain('Những tài liệu của chúng mình');
    expect(html).toContain(site.materials.subtitle);
    expect(html).toMatch(/<h2/);
  });

  it('previews the first three posts with title and summary', () => {
    for (const entry of shown) {
      expect(html).toContain(entry.title);
      expect(html).toContain(entry.description);
    }
    expect(html).not.toContain(entries[3]!.title);
  });

  it('features the first entry ahead of the others', () => {
    const [featured, ...rest] = shown;
    const featuredAt = html.indexOf(featured!.title);
    for (const entry of rest) {
      expect(featuredAt).toBeLessThan(html.indexOf(entry.title));
    }
    // Only the lead article gets the large title.
    expect(html.match(/text-4xl/g) ?? []).toHaveLength(2); // section h2 + featured h3
  });

  it('links every entry to its post page, and the section to the library', () => {
    for (const entry of shown) {
      expect(html).toContain(`href="${entry.href}"`);
    }
    expect(html).toContain('href="/tai-lieu"');
    expect(html).toContain(site.materials.viewAllLabel);
  });

  it('never links to nowhere', () => {
    expect(html).not.toMatch(/href="#"/);
    expect(html).not.toMatch(/href=""/);
  });

  it('still renders the heading and library link when there are no posts', async () => {
    const container = await AstroContainer.create();
    const empty = await container.renderToString(MaterialsSection, { props: { entries: [] } });
    expect(empty).toContain(site.materials.heading);
    expect(empty).toContain('href="/tai-lieu"');
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
