import { describe, expect, it } from 'vitest';
import { site } from '~/content/site';

/**
 * Executable form of contracts/content-schema.md § Test contract.
 *
 * The team achievements asserted here are real competition records belonging to
 * two named people. These assertions exist so an accidental edit to site.ts
 * fails CI rather than shipping a false public claim about someone's results.
 */

/** Every string reachable from `site`, for the whole-object hygiene checks. */
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

describe('brand and hero', () => {
  it('uses the Gieo brand name (FR-004)', () => {
    expect(site.brand.name).toBe('Gieo');
  });

  it('carries the inspirational headline verbatim (FR-005)', () => {
    expect(site.hero.headline).toBe('Chinh phục học sinh giỏi không khó như bạn nghĩ');
  });

  it('has a non-empty scroll cue label (FR-007)', () => {
    expect(site.hero.scrollCueLabel.length).toBeGreaterThan(0);
  });
});

describe('team section (FR-008, FR-010, FR-011)', () => {
  it('is headed "Chúng mình là"', () => {
    expect(site.team.heading).toBe('Chúng mình là');
  });

  it('has exactly two members with the correct names', () => {
    expect(site.team.members).toHaveLength(2);
    expect(site.team.members[0].name).toBe('Nguyễn Thị Hà Giang');
    expect(site.team.members[1].name).toBe('Nguyễn Hồng Bảo Quyên');
  });

  it("lists all four of Hà Giang's achievements verbatim", () => {
    const texts = site.team.members[0].achievements.map((a) => a.text);
    expect(texts).toHaveLength(4);
    expect(texts).toEqual([
      'Giải nhì Ngữ văn kỳ thi chọn học sinh giỏi cấp quốc gia năm học 2020-2021',
      'Giải nhất Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021',
      'Huy chương bạc trại hè năm 2020-2021',
      'Từng là phóng viên báo VTV và báo Tuổi Trẻ',
    ]);
  });

  it("lists both of Bảo Quyên's achievements verbatim", () => {
    const texts = site.team.members[1].achievements.map((a) => a.text);
    expect(texts).toHaveLength(2);
    expect(texts).toEqual([
      '9.5 điểm Ngữ văn THPT Quốc gia 2023 — thủ khoa Văn tỉnh Lâm Đồng',
      'Thủ khoa Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021',
    ]);
  });

  it('has no portraits yet, so cards render the placeholder path', () => {
    for (const member of site.team.members) {
      expect(member.portrait).toBeNull();
    }
  });
});

describe('materials section (FR-013, FR-014, FR-015)', () => {
  it('is headed "Những tài liệu của chúng mình" with a subtitle', () => {
    expect(site.materials.heading).toBe('Những tài liệu của chúng mình');
    expect(site.materials.subtitle.length).toBeGreaterThan(0);
  });

  it('has at least three entries', () => {
    expect(site.materials.entries.length).toBeGreaterThanOrEqual(3);
  });

  it('has no real links — every entry href is null, so there are no dead ends', () => {
    expect(site.materials.entries.every((entry) => entry.href === null)).toBe(true);
  });

  it('marks every entry as a placeholder', () => {
    expect(site.materials.entries.every((entry) => entry.isPlaceholder === true)).toBe(true);
  });
});

describe('course section (FR-017, FR-018, FR-034)', () => {
  it('has a non-empty heading and description', () => {
    expect(site.course.heading.length).toBeGreaterThan(0);
    expect(site.course.description.length).toBeGreaterThan(0);
  });

  it('has at least four outcomes', () => {
    expect(site.course.outcomes.length).toBeGreaterThanOrEqual(4);
  });

  it('includes the four outcomes named in FR-018 verbatim', () => {
    const texts = site.course.outcomes.map((outcome) => outcome.text);
    expect(texts).toContain('Kỹ năng liên tưởng tác phẩm');
    expect(texts).toContain('Kỹ năng phản đề');
    expect(texts).toContain('Lý luận văn học');
    expect(texts).toContain('Tài liệu được biên soạn bởi cựu học sinh giỏi Văn');
  });

  it('has a labelled but inert call to action', () => {
    expect(site.course.cta.label.length).toBeGreaterThan(0);
    expect(site.course.cta.destination).toBeNull();
  });
});

describe('social links (FR-021, FR-022)', () => {
  it('has exactly two links covering Facebook and TikTok', () => {
    expect(site.social).toHaveLength(2);
    expect(site.social.map((link) => link.platform)).toEqual(['facebook', 'tiktok']);
  });

  it('gives every link a non-empty accessible label and an https URL', () => {
    for (const link of site.social) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.url).toMatch(/^https:\/\//);
    }
  });
});

describe('content hygiene across the whole module', () => {
  const strings = collectStrings(site);

  it('collected a meaningful number of strings', () => {
    expect(strings.length).toBeGreaterThan(20);
  });

  it('contains no line breaks — wrapping is the layout’s job (FR-005)', () => {
    expect(strings.filter((value) => value.includes('\n'))).toEqual([]);
  });

  it('contains no leading or trailing whitespace', () => {
    expect(strings.filter((value) => value !== value.trim())).toEqual([]);
  });

  it('contains no U+FFFD replacement characters (Vietnamese encoding corruption)', () => {
    expect(strings.filter((value) => value.includes('�'))).toEqual([]);
  });

  it('preserves Vietnamese diacritics in the densest strings', () => {
    // If the file were saved as anything but UTF-8, these would not round-trip.
    expect(site.team.members[0].achievements[0]!.text).toContain('Ngữ văn');
    expect(site.team.members[1].achievements[0]!.text).toContain('Lâm Đồng');
    expect(site.hero.headline).toContain('Chinh phục');
  });
});
