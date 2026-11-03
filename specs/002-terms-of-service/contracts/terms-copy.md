# Contract: Terms Copy (Vietnamese)

**Feature**: [spec.md](../spec.md) | **Data model**: [data-model.md](../data-model.md)

This is the text that ships in `src/content/terms.ts`. **Review and approve it before implementation.** Implementation transcribes it exactly; any wording change goes here first.

- `{EMAIL}` marks where the page renders `site.contact.email` as a `mailto:` link (sections with `showContact`). It is **not** part of the stored strings.
- Bulleted lines are `list` blocks; other lines are `paragraph` blocks.
- Word count: ~600 words (budget ≤ 900, SC-003).

---

## Page header

- **title**: Điều khoản sử dụng
- **description** (meta): Điều khoản sử dụng các bài viết và tài liệu trên website Gieo: những gì bạn được làm và khi nào cần xin phép tác giả.
- **updatedAt**: `2026-11-03` → "Cập nhật lần cuối: 03/11/2026"
- **intro**: Gieo chia sẻ miễn phí các bài viết và tài liệu học Văn để giúp các bạn học sinh học tốt hơn. Để công sức của các tác giả được tôn trọng, mong bạn dành vài phút đọc những điều khoản dưới đây trước khi sử dụng nội dung trên website.

## 1. Chấp nhận điều khoản — `chap-nhan-dieu-khoan`

Khi truy cập và sử dụng website Gieo, bạn đồng ý với các điều khoản này. Nếu không đồng ý, bạn vui lòng ngừng sử dụng website.

## 2. Quyền sở hữu nội dung — `quyen-so-huu`

- Toàn bộ bài viết, tài liệu, hình ảnh và nội dung khác do Gieo biên soạn trên website này thuộc quyền sở hữu của tác giả và đội ngũ Gieo, được bảo hộ theo pháp luật Việt Nam về sở hữu trí tuệ.
- Việc Gieo chia sẻ tài liệu miễn phí không có nghĩa là tác giả từ bỏ quyền tác giả của mình.
- Các trích đoạn tác phẩm văn học hoặc tư liệu của người khác xuất hiện trong bài viết vẫn thuộc quyền của tác giả gốc. Gieo chỉ trích dẫn chúng cho mục đích giảng dạy và bình luận.

## 3. Những việc bạn được làm — `duoc-phep`

- Đọc và học trực tiếp trên website.
- Sử dụng nội dung cho việc học tập cá nhân, ví dụ như ghi chép hay ôn bài, không vì mục đích thương mại.
- Chia sẻ đường link dẫn về bài viết gốc trên Gieo cho bạn bè, thầy cô hoặc nhóm học tập.
- Trích dẫn một đoạn ngắn, với điều kiện ghi rõ tên tác giả, nguồn "Gieo" và đường link bài viết gốc.

## 4. Những việc không được làm khi chưa có sự đồng ý — `can-xin-phep`

Nếu chưa có sự đồng ý bằng văn bản (bao gồm email) của tác giả, bạn không được:

- Vật chất hóa nội dung: in ấn, photo, biên soạn lại thành tài liệu, sách, sách điện tử, slide, bộ đề hay giáo trình, dù có bán hay không.
- Thương mại hóa nội dung: bán, thu phí truy cập, hoặc sử dụng nội dung trong khóa học, lớp học hay buổi dạy kèm có thu phí.
- Đăng lại toàn bộ hoặc phần lớn nội dung lên website, trang mạng xã hội, nhóm hay kênh khác.
- Xóa hoặc chỉnh sửa thông tin tác giả, hay nhận nội dung là của mình.

Khi phát hiện vi phạm, Gieo có quyền yêu cầu gỡ bỏ nội dung và áp dụng các biện pháp phù hợp theo quy định của pháp luật.

## 5. Xin phép sử dụng — `xin-phep-su-dung` · `showContact`

Nếu bạn muốn sử dụng nội dung của Gieo cho những mục đích ở mục 4, hãy gửi email cho chúng mình và nêu rõ bài viết bạn muốn sử dụng, mục đích và hình thức sử dụng.

Việc sử dụng chỉ hợp lệ khi bạn nhận được sự đồng ý bằng văn bản (bao gồm email) từ tác giả.

→ *page renders:* Email: `{EMAIL}`

## 6. Miễn trừ trách nhiệm — `mien-tru-trach-nhiem`

Tài liệu trên Gieo được chia sẻ nhằm mục đích tham khảo và học tập. Chúng mình luôn cố gắng để nội dung chính xác, nhưng không cam kết một kết quả học tập hay thi cử cụ thể nào, và không chịu trách nhiệm về việc người khác sử dụng nội dung trái với các điều khoản này.

## 7. Thay đổi điều khoản — `thay-doi-dieu-khoan`

Gieo có thể cập nhật các điều khoản này khi cần. Ngày "Cập nhật lần cuối" ở đầu trang cho biết lần thay đổi gần nhất. Việc bạn tiếp tục sử dụng website sau khi điều khoản thay đổi đồng nghĩa với việc bạn chấp nhận nội dung mới.

## 8. Liên hệ — `lien-he-dieu-khoan` · `showContact`

Mọi câu hỏi về điều khoản sử dụng hoặc yêu cầu xin phép, bạn vui lòng liên hệ với chúng mình qua email.

→ *page renders:* Email: `{EMAIL}`

---

## Strings in `site.ts`

| Key | Value |
|---|---|
| `contact.email` | `tranthaiminh098@gmail.com` |
| `legal.termsLabel` | Điều khoản sử dụng |
| `legal.termsHref` | `/dieu-khoan-su-dung` |
| `legal.emailLabel` | Email: |
| `legal.updatedLabel` | Cập nhật lần cuối: |
| `legal.postNotice` | Bài viết thuộc quyền sở hữu của tác giả và Gieo. Vui lòng không in ấn, biên soạn lại hay sử dụng cho mục đích thương mại khi chưa xin phép. |
