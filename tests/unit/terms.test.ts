import { describe, expect, it } from 'vitest';
import { site } from '~/content/site';
import { terms } from '~/content/terms';
import type { TermsSection } from '~/content/types';

/**
 * Executable form of specs/002-terms-of-service/data-model.md § Validation rules.
 *
 * The wording itself is fixed by contracts/terms-copy.md; these checks guard
 * the parts the spec depends on: section order, the two prohibitions, the
 * single source for the contact email, and the reading-time budget.
 */

/** Every string reachable from `value`. */
function collectStrings(value: unknown, acc: string[] = []): string[] {
  if (typeof value === 'string') {
    acc.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, acc);
  } else if (value && typeof value === 'object') {
    for (const item of Object.values(value)) collectStrings(item, acc);
  }
  return acc;
}

function section(id: string): TermsSection {
  const found = terms.sections.find((s) => s.id === id);
  if (!found) throw new Error(`no section ${id}`);
  return found;
}

/** The section's visible text: heading plus every block string. */
function sectionText(id: string): string {
  const { heading, blocks } = section(id);
  return [heading, ...collectStrings(blocks)].join(' ');
}

describe('terms sections (FR-003)', () => {
  it('has the eight required sections in order', () => {
    expect(terms.sections.map((s) => s.id)).toEqual([
      'chap-nhan-dieu-khoan',
      'quyen-so-huu',
      'duoc-phep',
      'can-xin-phep',
      'xin-phep-su-dung',
      'mien-tru-trach-nhiem',
      'thay-doi-dieu-khoan',
      'lien-he-dieu-khoan',
    ]);
  });

  it('uses unique, URL-safe ids that do not clash with other page ids', () => {
    const ids = terms.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
      expect(['noi-dung', 'lien-he', 'gioi-thieu', 'tai-lieu', 'khoa-hoc']).not.toContain(id);
    }
  });

  it('contains no heading blocks, so the outline stays h1 → h2', () => {
    const types = terms.sections.flatMap((s) => s.blocks.map((block) => block.type));
    expect(types).not.toContain('heading');
  });
});

describe('usage rights (FR-004, US1)', () => {
  it('names materialization and commercialization as needing permission', () => {
    // Lower-cased: the phrases open list items, so they start with a capital.
    const text = sectionText('can-xin-phep').toLowerCase();
    for (const phrase of ['vật chất hóa', 'thương mại hóa', 'in ấn', 'khóa học']) {
      expect(text).toContain(phrase);
    }
  });

  it('allows personal study, sharing a link and attributed quotation', () => {
    const text = sectionText('duoc-phep').toLowerCase();
    for (const phrase of ['học tập cá nhân', 'đường link', 'ghi rõ tên tác giả']) {
      expect(text).toContain(phrase);
    }
  });
});

describe('contact (FR-005, FR-006, SC-006)', () => {
  it('defaults to the owner’s email', () => {
    expect(site.contact.email).toBe('tranthaiminh098@gmail.com');
  });

  it('shows the contact line in exactly the permission and contact sections', () => {
    expect(terms.sections.filter((s) => s.showContact).map((s) => s.id)).toEqual([
      'xin-phep-su-dung',
      'lien-he-dieu-khoan',
    ]);
  });

  it('never writes an email address into the terms text', () => {
    expect(collectStrings(terms).filter((value) => value.includes('@'))).toEqual([]);
  });
});

describe('document metadata (FR-002, SC-003)', () => {
  it('has a real ISO last-updated date', () => {
    expect(terms.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const date = new Date(`${terms.updatedAt}T00:00:00Z`);
    expect(Number.isNaN(date.getTime())).toBe(false);
    expect(date.toISOString().slice(0, 10)).toBe(terms.updatedAt);
  });

  it('can be read in under five minutes (≤ 900 words)', () => {
    const words = collectStrings(terms).join(' ').split(/\s+/).filter(Boolean).length;
    expect(words).toBeLessThanOrEqual(900);
  });
});

describe('content hygiene', () => {
  const strings = collectStrings(terms);

  it('contains no line breaks — wrapping is the layout’s job', () => {
    expect(strings.filter((value) => value.includes('\n'))).toEqual([]);
  });

  it('contains no leading or trailing whitespace', () => {
    expect(strings.filter((value) => value !== value.trim())).toEqual([]);
  });

  it('contains no U+FFFD replacement characters (Vietnamese encoding corruption)', () => {
    expect(strings.filter((value) => value.includes('�'))).toEqual([]);
  });
});
