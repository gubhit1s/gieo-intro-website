/**
 * The single source of truth for every user-visible string on the Gieo site.
 *
 * Rules (contracts/content-schema.md):
 *   1. Declared `as const satisfies SiteContent` — literal types stay narrow so
 *      tests can reference exact strings, while the shape is still checked.
 *   2. No imports from components, sections or the Astro runtime. Plain data,
 *      importable from Vitest without a DOM.
 *   3. No computed values, template literals, env reads or conditionals.
 *      What this file says is exactly what ships.
 *
 * ⚠️  The team achievements below are real competition records belonging to two
 *     named people. Editing them changes Gieo's public claims about someone's
 *     exam results. tests/unit/content.test.ts asserts them verbatim so an
 *     accidental edit fails CI instead of shipping.
 */
import type { SiteContent } from './types';

export const site = {
  brand: {
    name: 'Gieo',
    tagline: 'Gieo chữ, ươm mầm văn chương',
  },

  hero: {
    headline: 'Chinh phục học sinh giỏi không khó như bạn nghĩ',
    subheadline: 'Cùng Gieo gieo những hạt mầm đầu tiên trên hành trình văn chương của bạn.',
    scrollCueLabel: 'Cuộn xuống để tìm hiểu thêm',
  },

  team: {
    heading: 'Chúng mình là',
    members: [
      {
        id: 'ha-giang',
        name: 'Nguyễn Thị Hà Giang',
        role: 'Đồng sáng lập',
        portrait: null,
        achievements: [
          {
            text: 'Giải nhì Ngữ văn kỳ thi chọn học sinh giỏi cấp quốc gia năm học 2020-2021',
            year: '2020-2021',
            level: 'quoc-gia',
          },
          {
            text: 'Giải nhất Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021',
            year: '2020-2021',
            level: 'tinh',
          },
          {
            text: 'Huy chương bạc trại hè năm 2020-2021',
            year: '2020-2021',
            level: 'khac',
          },
          {
            text: 'Từng là phóng viên báo VTV và báo Tuổi Trẻ',
            year: null,
            level: null,
          },
        ],
      },
      {
        id: 'bao-quyen',
        name: 'Nguyễn Hồng Bảo Quyên',
        role: 'Đồng sáng lập',
        portrait: null,
        achievements: [
          {
            text: '9.5 điểm Ngữ văn THPT Quốc gia 2023 — thủ khoa Văn tỉnh Lâm Đồng',
            year: '2023',
            level: 'quoc-gia',
          },
          {
            text: 'Thủ khoa Ngữ văn kỳ thi chọn học sinh giỏi cấp tỉnh 2020-2021',
            year: '2020-2021',
            level: 'tinh',
          },
        ],
      },
    ],
  },

  materials: {
    heading: 'Những tài liệu của chúng mình',
    subtitle: 'Kho tài liệu được chúng mình biên soạn và chia sẻ miễn phí cho các bạn học sinh.',
    // Placeholder copy in this release (FR-015). Every href is null, so each
    // card renders as a non-interactive <article> — no dead ends.
    entries: [
      {
        id: 'placeholder-1',
        title: 'Lorem ipsum dolor sit amet',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        href: null,
        isPlaceholder: true,
      },
      {
        id: 'placeholder-2',
        title: 'Consectetur adipiscing elit',
        description:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        href: null,
        isPlaceholder: true,
      },
      {
        id: 'placeholder-3',
        title: 'Sed do eiusmod tempor',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        href: null,
        isPlaceholder: true,
      },
    ],
  },

  course: {
    heading: 'Khóa học dành cho học sinh giỏi Văn',
    description:
      'Khóa học được xây dựng dành riêng cho các bạn ôn luyện kỳ thi chọn học sinh giỏi Ngữ văn, từ nền tảng lý luận đến kỹ năng viết bài hoàn chỉnh.',
    outcomes: [
      { id: 'lien-tuong', text: 'Kỹ năng liên tưởng tác phẩm', icon: 'sprout' },
      { id: 'phan-de', text: 'Kỹ năng phản đề', icon: 'leaf-pair' },
      { id: 'ly-luan', text: 'Lý luận văn học', icon: 'grass-tuft' },
      {
        id: 'tai-lieu',
        text: 'Tài liệu được biên soạn bởi cựu học sinh giỏi Văn',
        icon: 'falling-seed',
      },
      { id: 'viet-bai', text: 'Kỹ năng triển khai và hoàn thiện bài viết', icon: 'sprout' },
    ],
    cta: {
      label: 'Đăng ký tư vấn',
      // null this release — the button renders fully styled but does nothing
      // (FR-034). Set this to a URL to activate it; no component change needed.
      destination: null,
    },
  },

  // Platform homepages stand in until Gieo's real profiles exist (FR-022).
  // Replacing these two URLs is the only edit required.
  social: [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/',
      label: 'Gieo trên Facebook',
    },
    {
      platform: 'tiktok',
      url: 'https://www.tiktok.com/',
      label: 'Gieo trên TikTok',
    },
  ],
} as const satisfies SiteContent;
