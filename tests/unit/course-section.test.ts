// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getContainerRenderer } from '@astrojs/react';
import { loadRenderers } from 'astro:container';
import { beforeAll, describe, expect, it } from 'vitest';
import CourseSection from '~/sections/CourseSection.astro';
import { site } from '~/content/site';

/** Course section rendering (FR-017 … FR-019, FR-033). */
describe('CourseSection', () => {
  let html: string;

  beforeAll(async () => {
    // This section does contain one island — the call-to-action button — so the
    // React renderer is required here.
    const renderers = await loadRenderers([getContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    html = await container.renderToString(CourseSection);
  });

  it('renders the heading as an h2 and the description (FR-017)', () => {
    expect(html).toContain(site.course.heading);
    expect(html).toContain(site.course.description);
    expect(html).toMatch(/<h2/);
  });

  it('renders every outcome as a list item (FR-018, FR-031)', () => {
    expect(site.course.outcomes.length).toBeGreaterThanOrEqual(4);
    for (const outcome of site.course.outcomes) {
      expect(html).toContain(outcome.text);
    }
    const listItems = html.match(/<li/g) ?? [];
    expect(listItems).toHaveLength(site.course.outcomes.length);
  });

  it('includes the four outcomes named in FR-018 verbatim', () => {
    expect(html).toContain('Kỹ năng liên tưởng tác phẩm');
    expect(html).toContain('Kỹ năng phản đề');
    expect(html).toContain('Lý luận văn học');
    expect(html).toContain('Tài liệu được biên soạn bởi cựu học sinh giỏi Văn');
  });

  it('puts the outcomes in a real <ul> with only <li> children (FR-031)', () => {
    // The reveal wrapper must sit outside the <ul>, never between it and its
    // items — a <div> child of <ul> breaks list semantics for screen readers.
    const ulMatch = html.match(/<ul[^>]*>([\s\S]*?)<\/ul>/);
    expect(ulMatch).not.toBeNull();
    expect(ulMatch![1]).not.toMatch(/<div/);
  });

  it('renders the call to action as an enabled button, not a link (FR-034, FR-035)', () => {
    expect(site.course.cta.destination).toBeNull();
    expect(html).toContain(site.course.cta.label);
    expect(html).toMatch(/<button[^>]*type="button"/);
    expect(html).not.toMatch(/<button[^>]*disabled/);
    expect(html).not.toMatch(/href="#"/);
  });
});
