import { describe, expect, it } from 'vitest';
import { site } from '~/content/site';

/**
 * Executable form of contracts/content-schema.md § Test contract.
 *
 * The talkshow speakers' achievements asserted here are real competition records
 * belonging to named people. These assertions exist so an accidental edit to site.ts
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
    expect(site.hero.headline).toBe('Gieo một cách đọc, ươm một cách nghĩ.');
  });

  it('has the two hero actions: free materials, then the talkshow', () => {
    expect(site.hero.actions.map((action) => [action.label, action.href])).toEqual([
      ['Tài liệu miễn phí', '#tai-lieu'],
      ['Talkshow của Gieo tối Thứ Bảy (07/11)', '#noi-dung'],
    ]);
  });

  it('has two labelled hero actions that point at in-page anchors', () => {
    expect(site.hero.actions).toHaveLength(2);
    for (const action of site.hero.actions) {
      expect(action.label.length).toBeGreaterThan(0);
      expect(action.href).toMatch(/^#[a-z-]+$/);
    }
  });
});

describe('talkshow section', () => {
  const t = site.talkshow;

  it('names the event and its date', () => {
    expect(t.heading).toBe('Ươm mầm cùng GIEO');
    expect(t.date.startsAt).toBe('2026-11-07T19:30:00+07:00');
    expect(t.date.endsAt).toBe('2026-11-07T21:30:00+07:00');
    expect(t.date.weekday).toBe('Thứ Bảy');
    expect(Date.parse(t.date.endsAt)).toBeGreaterThan(Date.parse(t.date.startsAt));
  });

  it('lists the three parts of the programme in order', () => {
    expect(t.agenda.map((part) => part.name)).toEqual(['GIEO', 'NẢY', 'ĐÁP']);
  });

  it('has the host first, then three speakers', () => {
    expect(t.speakers.map((s) => [s.role, s.name])).toEqual([
      ['Host', 'Hà Giang'],
      ['Diễn giả', 'Quỳnh Phương'],
      ['Diễn giả', 'Thu Phượng'],
      ['Diễn giả', 'Thùy Trân'],
    ]);
  });

  it('gives every speaker unique, file-safe ids and image alt text', () => {
    const ids = t.speakers.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const speaker of t.speakers) {
      expect(speaker.id).toMatch(/^[a-z]+(-[a-z]+)*$/);
      expect(speaker.portraitAlt.length).toBeGreaterThan(0);
    }
  });

  // Copied from each speaker's poster. Real public claims: change only when
  // the person's record changes.
  it('lists every achievement verbatim', () => {
    const byId = Object.fromEntries(t.speakers.map((s) => [s.id, s.achievements]));
    expect(byId['ha-giang']).toEqual([
      'Giải Nhì · HSG Quốc gia Ngữ văn · Năm học 2020-2021',
      'Giải Nhì · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2019-2020',
      'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2020-2021',
      'Huy chương Bạc Ngữ văn · Kỳ thi Olympic Trại hè phương Nam · Năm học 2021-2022',
      'Tuyển thẳng trường Đại học Khoa học Xã hội và Nhân Văn, ĐHQG-HCM, ngành Báo chí',
      'Phóng viên Đài Truyền hình Việt Nam (VTV); Cộng tác viên báo Tuổi Trẻ',
    ]);
    expect(byId['quynh-phuong']).toEqual([
      'Giải Ba · HSG Quốc gia Ngữ văn · Năm học 2021-2022',
      'Giải Nhì · HSG Quốc gia Ngữ văn · Năm học 2022-2023',
      'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2021-2022',
      'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2022-2023',
      'Huy chương Vàng Ngữ văn · Kỳ thi Olympic truyền thống 30 tháng 4 · Năm học 2021-2022',
      'Tuyển thẳng trường Đại học Sư phạm Thành phố Hồ Chí Minh, ngành Sư phạm Ngữ văn',
    ]);
    expect(byId['thu-phuong']).toEqual([
      'Giải Nhì · HSG Quốc gia Ngữ văn · Năm học 2019-2020',
      'Giải Khuyến khích · HSG Quốc gia Ngữ văn · Năm học 2020-2021',
      'Giải Nhất · HSG Ngữ văn tỉnh Bà Rịa - Vũng Tàu · Năm học 2019-2020',
      'Giải Nhất · HSG Ngữ văn tỉnh Bà Rịa - Vũng Tàu · Năm học 2020-2021',
      'Tuyển thẳng ngành Báo chí · Trường ĐH KHXH&NV, ĐHQG-HCM',
      'Phóng viên Đài Truyền hình TP.HCM (HTV) · Cộng tác viên: Tuổi Trẻ, Công an Nhân dân, Vietnamnet và Tiền Phong',
    ]);
    expect(byId['thuy-tran']).toEqual([
      'Giải Ba · HSG Quốc gia Ngữ văn · Năm học 2022-2023',
      'Giải Ba · HSG Quốc gia Ngữ văn · Năm học 2023-2024',
      'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2022-2023',
      'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2023-2024',
      'Huy chương Vàng Ngữ văn · Kỳ thi Olympic truyền thống 30 tháng 4 · Năm học 2023-2024',
      'Giải Nhất · bài luận Trại hè Toán học - Vật lý - Văn học tổ chức tại trường THPT Chuyên Lê Quý Đôn - Vũng Tàu · Năm học 2023-2024',
      'Học sinh 3 tốt tỉnh Lâm Đồng 2023-2024',
      'Tuyển thẳng trường Đại học Khoa học Xã hội và Nhân Văn, ĐHQG-HCM, ngành Báo chí',
    ]);
  });
});

describe('materials section (FR-013)', () => {
  it('is headed "Kho tài liệu", with a subtitle that reads on from it', () => {
    expect(site.materials.heading).toBe('Kho tài liệu');
    expect(site.materials.subtitle).toBe('được chúng mình biên soạn và chia sẻ miễn phí');
  });

  it('labels the library page and its links', () => {
    expect(site.materials.viewAllLabel.length).toBeGreaterThan(0);
    expect(site.materials.readLabel.length).toBeGreaterThan(0);
    expect(site.materials.library.heading.length).toBeGreaterThan(0);
    expect(site.materials.library.backLabel.length).toBeGreaterThan(0);
    expect(site.materials.library.otherPostsHeading.length).toBeGreaterThan(0);
  });

  it('sends the "Kho tài liệu" nav link to the library page', () => {
    const library = site.nav.links.find((link) => link.label === 'Kho tài liệu');
    expect(library?.href).toBe('/tai-lieu');
  });
});

describe('header navigation', () => {
  it('has the library link and a talkshow button, and no course link', () => {
    expect(site.nav.links.map((link) => link.label)).toEqual(['Kho tài liệu']);
    expect(site.nav.cta).toEqual({ label: 'Talkshow miễn phí', href: '#noi-dung' });
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

describe('contact and legal (002 FR-005, FR-010)', () => {
  it('defaults the contact email to the owner’s address', () => {
    expect(site.contact.email).toBe('tranthaiminh098@gmail.com');
  });

  it('links to the terms page under its Vietnamese title', () => {
    expect(site.legal.termsHref).toBe('/dieu-khoan-su-dung');
    expect(site.legal.termsLabel).toBe('Điều khoản sử dụng');
  });

  it('mentions the commercial-use restriction in the post notice', () => {
    expect(site.legal.postNotice).toContain('thương mại');
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
    expect(site.talkshow.speakers[0]!.achievements[0]).toContain('Ngữ văn');
    expect(site.talkshow.speakers[1]!.achievements[2]).toContain('Lâm Đồng');
    expect(site.hero.headline).toContain('ươm một cách nghĩ');
  });
});
