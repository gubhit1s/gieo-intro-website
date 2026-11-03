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
 * ⚠️  The talkshow speakers' achievements below are real competition records
 *     belonging to named people, copied from their posters. Editing them changes
 *     Gieo's public claims about someone's exam results.
 *     tests/unit/content.test.ts asserts them verbatim so an accidental edit
 *     fails CI instead of shipping.
 */
import type { SiteContent } from './types';

export const site = {
  brand: {
    name: 'Gieo',
    tagline: 'Gieo chữ, ươm mầm văn chương',
  },

  nav: {
    label: 'Điều hướng chính',
    homeLabel: 'Gieo — về đầu trang',
    links: [
      // A separate page, not an in-page section: the full post library.
      { label: 'Kho tài liệu', href: '/tai-lieu' },
    ],
    // The talkshow section carries #noi-dung, the skip link's target.
    cta: { label: 'Talkshow miễn phí', href: '#noi-dung' },
  },

  hero: {
    headline: 'Gieo một cách đọc, ươm một cách nghĩ.',
    subheadline:
      'Cùng Gieo đọc sâu hơn, nghĩ độc lập hơn và viết nên tiếng nói của riêng mình qua từng trang văn.',
    actions: [
      { label: 'Tài liệu miễn phí', href: '#tai-lieu', icon: 'book' },
      // The talkshow section carries #noi-dung, the skip link's target.
      { label: 'Talkshow của Gieo tối Thứ Bảy (07/11)', href: '#noi-dung', icon: 'talkshow' },
    ],
    // Illustration from Mixkit (free art licence: commercial use, no credit required).
    illustrationAlt: 'Một bạn nữ ngồi đọc sách trên tấm thảm dưới tán cây mùa thu',
  },

  talkshow: {
    eyebrow: 'Talkshow · Miễn phí',
    heading: 'Ươm mầm cùng GIEO',
    topic: 'Phương pháp ôn thi HSG Ngữ văn & Thực chiến đề thi',
    intro:
      'Nhằm mang đến những chia sẻ thiết thực cho học sinh THCS, THPT đang ôn luyện Học sinh giỏi môn Ngữ văn, Học Văn Cùng GIEO tổ chức talkshow “Ươm mầm cùng GIEO” với sự tham gia của 03 diễn giả từng đạt giải Nhì, giải Ba Học sinh giỏi cấp Quốc gia môn Ngữ văn.',
    posterAlt:
      'Poster talkshow Ươm mầm cùng GIEO: Thứ Bảy 07/11, 19:30–21:30, miễn phí tham gia, với host Hà Giang và các diễn giả Quỳnh Phương, Thu Phượng, Thùy Trân',
    posterLabel: 'Xem poster',
    date: {
      day: '07',
      month: 'Tháng 11',
      weekday: 'Thứ Bảy',
      time: '19:30 – 21:30',
      startsAt: '2026-11-07T19:30:00+07:00',
      endsAt: '2026-11-07T21:30:00+07:00',
    },
    details: [
      {
        id: 'hinh-thuc',
        label: 'Hình thức',
        value: 'Livestream trực tiếp trên TikTok Học Văn Cùng GIEO',
      },
      { id: 'doi-tuong', label: 'Đối tượng', value: 'Học sinh THCS và THPT' },
      { id: 'chi-phi', label: 'Chi phí', value: 'Hoàn toàn miễn phí' },
      { id: 'to-chuc', label: 'Đơn vị tổ chức', value: 'Học Văn Cùng GIEO' },
    ],
    freeBadge: 'Miễn phí',
    minigame: 'Minigame với 03 giải thưởng hấp dẫn đang chờ các bạn!',
    countdown: {
      label: 'Lên sóng sau',
      units: ['ngày', 'giờ', 'phút', 'giây'],
      live: 'Talkshow đang diễn ra trên TikTok — vào xem ngay nhé!',
      ended: 'Talkshow đã khép lại. Cảm ơn các bạn đã đồng hành cùng GIEO!',
    },
    watchLabel: 'Theo dõi GIEO trên TikTok',
    agenda: [
      {
        id: 'gieo',
        name: 'GIEO',
        text: 'Tìm hiểu phương pháp học tập, kinh nghiệm ôn thi và những lỗi thường gặp.',
      },
      {
        id: 'nay',
        name: 'NẢY',
        text: 'Thực chiến đề thi cùng 03 diễn giả từng đạt giải Nhì, giải Ba HSG cấp Quốc gia môn Ngữ văn.',
      },
      {
        id: 'dap',
        name: 'ĐÁP',
        text: 'Giao lưu, đặt câu hỏi và nhận giải đáp trực tiếp từ các diễn giả.',
      },
    ],
    closingQuote:
      'Mỗi câu hỏi là một cơ hội để học hỏi. Mỗi sự đồng hành là một hạt mầm góp phần nuôi dưỡng tri thức.',
    speakersHeading: 'Host và diễn giả',
    carousel: {
      label: 'Host và diễn giả của talkshow',
      previous: 'Người trước',
      next: 'Người tiếp theo',
    },
    closeLabel: 'Đóng',
    speakers: [
      {
        id: 'ha-giang',
        name: 'Hà Giang',
        role: 'Host',
        highlight: 'Giải Nhì HSG Quốc gia Ngữ văn',
        portraitAlt: 'Host Hà Giang mặc áo hồng, khoanh tay và mỉm cười',
        achievements: [
          'Giải Nhì · HSG Quốc gia Ngữ văn · Năm học 2020-2021',
          'Giải Nhì · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2019-2020',
          'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2020-2021',
          'Huy chương Bạc Ngữ văn · Kỳ thi Olympic Trại hè phương Nam · Năm học 2021-2022',
          'Tuyển thẳng trường Đại học Khoa học Xã hội và Nhân Văn, ĐHQG-HCM, ngành Báo chí',
          'Phóng viên Đài Truyền hình Việt Nam (VTV); Cộng tác viên báo Tuổi Trẻ',
        ],
      },
      {
        id: 'quynh-phuong',
        name: 'Quỳnh Phương',
        role: 'Diễn giả',
        highlight: 'Giải Nhì HSG Quốc gia Ngữ văn',
        portraitAlt: 'Diễn giả Quỳnh Phương mặc áo dài hồng, cầm một bông hướng dương',
        achievements: [
          'Giải Ba · HSG Quốc gia Ngữ văn · Năm học 2021-2022',
          'Giải Nhì · HSG Quốc gia Ngữ văn · Năm học 2022-2023',
          'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2021-2022',
          'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2022-2023',
          'Huy chương Vàng Ngữ văn · Kỳ thi Olympic truyền thống 30 tháng 4 · Năm học 2021-2022',
          'Tuyển thẳng trường Đại học Sư phạm Thành phố Hồ Chí Minh, ngành Sư phạm Ngữ văn',
        ],
      },
      {
        id: 'thu-phuong',
        name: 'Thu Phượng',
        role: 'Diễn giả',
        highlight: 'Giải Nhì HSG Quốc gia Ngữ văn',
        portraitAlt: 'Diễn giả Thu Phượng đeo kính, mặc áo đen và mỉm cười',
        achievements: [
          'Giải Nhì · HSG Quốc gia Ngữ văn · Năm học 2019-2020',
          'Giải Khuyến khích · HSG Quốc gia Ngữ văn · Năm học 2020-2021',
          'Giải Nhất · HSG Ngữ văn tỉnh Bà Rịa - Vũng Tàu · Năm học 2019-2020',
          'Giải Nhất · HSG Ngữ văn tỉnh Bà Rịa - Vũng Tàu · Năm học 2020-2021',
          'Tuyển thẳng ngành Báo chí · Trường ĐH KHXH&NV, ĐHQG-HCM',
          'Phóng viên Đài Truyền hình TP.HCM (HTV) · Cộng tác viên: Tuổi Trẻ, Công an Nhân dân, Vietnamnet và Tiền Phong',
        ],
      },
      {
        id: 'thuy-tran',
        name: 'Thùy Trân',
        role: 'Diễn giả',
        highlight: 'Hai lần giải Ba HSG Quốc gia Ngữ văn',
        portraitAlt: 'Diễn giả Thùy Trân mặc áo polo đen, nháy mắt và giơ hai tay hình chữ V',
        achievements: [
          'Giải Ba · HSG Quốc gia Ngữ văn · Năm học 2022-2023',
          'Giải Ba · HSG Quốc gia Ngữ văn · Năm học 2023-2024',
          'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2022-2023',
          'Giải Nhất · HSG Ngữ văn tỉnh Lâm Đồng · Năm học 2023-2024',
          'Huy chương Vàng Ngữ văn · Kỳ thi Olympic truyền thống 30 tháng 4 · Năm học 2023-2024',
          'Giải Nhất · bài luận Trại hè Toán học - Vật lý - Văn học tổ chức tại trường THPT Chuyên Lê Quý Đôn - Vũng Tàu · Năm học 2023-2024',
          'Học sinh 3 tốt tỉnh Lâm Đồng 2023-2024',
          'Tuyển thẳng trường Đại học Khoa học Xã hội và Nhân Văn, ĐHQG-HCM, ngành Báo chí',
        ],
      },
    ],
  },

  materials: {
    heading: 'Kho tài liệu',
    // Reads on from the heading: “Kho tài liệu / được chúng mình…”.
    subtitle: 'được chúng mình biên soạn và chia sẻ miễn phí',
    // The posts themselves are Markdown files in src/content/posts, not here.
    viewAllLabel: 'Xem tất cả bài viết',
    readLabel: 'Đọc bài',
    library: {
      heading: 'Kho tài liệu',
      backLabel: 'Kho tài liệu',
      postedByLabel: 'Đăng bởi',
      otherPostsHeading: 'Bài viết khác',
    },
  },

  // Temporary default until Gieo has its own address. Every page that shows
  // the email reads it from here (002 FR-006).
  contact: { email: 'tranthaiminh098@gmail.com' },

  legal: {
    termsLabel: 'Điều khoản sử dụng',
    termsHref: '/dieu-khoan-su-dung',
    emailLabel: 'Email:',
    updatedLabel: 'Cập nhật lần cuối:',
    postNotice:
      'Bài viết thuộc quyền sở hữu của tác giả và Gieo. Vui lòng không in ấn, biên soạn lại hay sử dụng cho mục đích thương mại khi chưa xin phép.',
  },

  // Platform homepages stand in until Gieo's real profiles exist (FR-022).
  // Replacing these two URLs is the only edit required.
  social: [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/hocvancunggieo/',
      label: 'Gieo trên Facebook',
    },
    {
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@hocvancunggieo',
      label: 'Gieo trên TikTok',
    },
  ],
} as const satisfies SiteContent;
