/**
 * The terms of use ("Điều khoản sử dụng"), served at /dieu-khoan-su-dung.
 *
 * Same rules as site.ts: plain data, no imports besides types, no computed
 * values. The text is transcribed from
 * specs/002-terms-of-service/contracts/terms-copy.md — change the wording
 * there first, and bump `updatedAt` whenever it changes.
 *
 * Section order is fixed: section 5 refers back to "mục 4", and the page
 * numbers headings by position. The contact email is NOT written here; the
 * page adds it from site.contact.email to every section with `showContact`.
 */
import type { TermsOfUse } from './types';

export const terms: TermsOfUse = {
  title: 'Điều khoản sử dụng',
  description:
    'Điều khoản sử dụng các bài viết và tài liệu trên website Gieo: những gì bạn được làm và khi nào cần xin phép tác giả.',
  updatedAt: '2026-11-03',
  intro:
    'Gieo chia sẻ miễn phí các bài viết và tài liệu học Văn để giúp các bạn học sinh học tốt hơn. Để công sức của các tác giả được tôn trọng, mong bạn dành vài phút đọc những điều khoản dưới đây trước khi sử dụng nội dung trên website.',
  sections: [
    {
      id: 'chap-nhan-dieu-khoan',
      heading: 'Chấp nhận điều khoản',
      blocks: [
        {
          type: 'paragraph',
          text: 'Khi truy cập và sử dụng website Gieo, bạn đồng ý với các điều khoản này. Nếu không đồng ý, bạn vui lòng ngừng sử dụng website.',
        },
      ],
    },
    {
      id: 'quyen-so-huu',
      heading: 'Quyền sở hữu nội dung',
      blocks: [
        {
          type: 'list',
          items: [
            {
              text: 'Toàn bộ bài viết, tài liệu, hình ảnh và nội dung khác do Gieo biên soạn trên website này thuộc quyền sở hữu của tác giả và đội ngũ Gieo, được bảo hộ theo pháp luật Việt Nam về sở hữu trí tuệ.',
            },
            {
              text: 'Việc Gieo chia sẻ tài liệu miễn phí không có nghĩa là tác giả từ bỏ quyền tác giả của mình.',
            },
            {
              text: 'Các trích đoạn tác phẩm văn học hoặc tư liệu của người khác xuất hiện trong bài viết vẫn thuộc quyền của tác giả gốc. Gieo chỉ trích dẫn chúng cho mục đích giảng dạy và bình luận.',
            },
          ],
        },
      ],
    },
    {
      id: 'duoc-phep',
      heading: 'Những việc bạn được làm',
      blocks: [
        {
          type: 'list',
          items: [
            { text: 'Đọc và học trực tiếp trên website.' },
            {
              text: 'Sử dụng nội dung cho việc học tập cá nhân, ví dụ như ghi chép hay ôn bài, không vì mục đích thương mại.',
            },
            {
              text: 'Chia sẻ đường link dẫn về bài viết gốc trên Gieo cho bạn bè, thầy cô hoặc nhóm học tập.',
            },
            {
              text: 'Trích dẫn một đoạn ngắn, với điều kiện ghi rõ tên tác giả, nguồn "Gieo" và đường link bài viết gốc.',
            },
          ],
        },
      ],
    },
    {
      id: 'can-xin-phep',
      heading: 'Những việc không được làm khi chưa có sự đồng ý',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nếu chưa có sự đồng ý bằng văn bản (bao gồm email) của tác giả, bạn không được:',
        },
        {
          type: 'list',
          items: [
            {
              text: 'Vật chất hóa nội dung: in ấn, photo, biên soạn lại thành tài liệu, sách, sách điện tử, slide, bộ đề hay giáo trình, dù có bán hay không.',
            },
            {
              text: 'Thương mại hóa nội dung: bán, thu phí truy cập, hoặc sử dụng nội dung trong khóa học, lớp học hay buổi dạy kèm có thu phí.',
            },
            {
              text: 'Đăng lại toàn bộ hoặc phần lớn nội dung lên website, trang mạng xã hội, nhóm hay kênh khác.',
            },
            {
              text: 'Xóa hoặc chỉnh sửa thông tin tác giả, hay nhận nội dung là của mình.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Khi phát hiện vi phạm, Gieo có quyền yêu cầu gỡ bỏ nội dung và áp dụng các biện pháp phù hợp theo quy định của pháp luật.',
        },
      ],
    },
    {
      id: 'xin-phep-su-dung',
      heading: 'Xin phép sử dụng',
      showContact: true,
      blocks: [
        {
          type: 'paragraph',
          text: 'Nếu bạn muốn sử dụng nội dung của Gieo cho những mục đích ở mục 4, hãy gửi email cho chúng mình và nêu rõ bài viết bạn muốn sử dụng, mục đích và hình thức sử dụng.',
        },
        {
          type: 'paragraph',
          text: 'Việc sử dụng chỉ hợp lệ khi bạn nhận được sự đồng ý bằng văn bản (bao gồm email) từ tác giả.',
        },
      ],
    },
    {
      id: 'mien-tru-trach-nhiem',
      heading: 'Miễn trừ trách nhiệm',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tài liệu trên Gieo được chia sẻ nhằm mục đích tham khảo và học tập. Chúng mình luôn cố gắng để nội dung chính xác, nhưng không cam kết một kết quả học tập hay thi cử cụ thể nào, và không chịu trách nhiệm về việc người khác sử dụng nội dung trái với các điều khoản này.',
        },
      ],
    },
    {
      id: 'thay-doi-dieu-khoan',
      heading: 'Thay đổi điều khoản',
      blocks: [
        {
          type: 'paragraph',
          text: 'Gieo có thể cập nhật các điều khoản này khi cần. Ngày "Cập nhật lần cuối" ở đầu trang cho biết lần thay đổi gần nhất. Việc bạn tiếp tục sử dụng website sau khi điều khoản thay đổi đồng nghĩa với việc bạn chấp nhận nội dung mới.',
        },
      ],
    },
    {
      id: 'lien-he-dieu-khoan',
      heading: 'Liên hệ',
      showContact: true,
      blocks: [
        {
          type: 'paragraph',
          text: 'Mọi câu hỏi về điều khoản sử dụng hoặc yêu cầu xin phép, bạn vui lòng liên hệ với chúng mình qua email.',
        },
      ],
    },
  ],
};
