/**
 * The post library ("Kho tài liệu"), hardcoded until posts move to a backend.
 *
 * Order matters: posts display in this order, and the FIRST post is the
 * featured one on the home page. Each post is served at /tai-lieu/<slug>.
 *
 * Same rules as site.ts: plain data, no imports besides types, no computed
 * values. The text is transcribed from Gieo's own study notes — edit it as
 * content, not as code.
 */
import type { Post } from './types';

export const posts: readonly Post[] = [
  {
    slug: 'ban-chat-cua-van-hoc',
    title: 'Bản chất của văn học',
    summary:
      'Văn chương bắt nguồn từ cuộc sống nhưng luôn đòi hỏi sự sáng tạo của người nghệ sĩ. Hãy cùng Gieo đi qua cơ sở lý luận, biểu hiện, nhận định, dẫn chứng tiêu biểu và cách vận dụng hai luận điểm ấy vào bài nghị luận văn học nhé.',
    author: 'Gieo',
    publishedAt: '2026-10-13',
    body: [
      { type: 'heading', level: 2, text: '1. Văn chương bắt nguồn từ cuộc sống' },
      { type: 'heading', level: 3, text: 'a. Cơ sở lý luận' },
      {
        type: 'paragraph',
        text: 'Cuộc sống là điểm khởi đầu của văn học, đồng thời cũng là đích đến mà văn học hướng tới. Con người, thiên nhiên, các mối quan hệ xã hội, những niềm vui, nỗi đau và biến động của thời đại đều có thể trở thành chất liệu cho sáng tác văn chương.',
      },
      {
        type: 'paragraph',
        text: 'Nhà văn không thể tạo nên một tác phẩm có giá trị nếu hoàn toàn tách mình khỏi đời sống. Hiện thực cung cấp cho người nghệ sĩ những trải nghiệm, cảm xúc và vấn đề để khám phá. Nhờ đó, tác phẩm có khả năng phản ánh chân thực con người, tái hiện diện mạo xã hội và giúp người đọc nhận ra những quy luật, bản chất sâu xa của cuộc đời.',
      },
      {
        type: 'paragraph',
        text: 'Tuy nhiên, văn học không đơn thuần là bản sao của hiện thực. Giá trị của một tác phẩm không chỉ nằm ở việc kể lại những gì đã xảy ra, mà còn ở khả năng phát hiện ý nghĩa đằng sau các sự việc, khơi gợi suy ngẫm và bày tỏ thái độ trước cuộc sống.',
      },
      {
        type: 'paragraph',
        text: 'Nhà văn Nam Cao từng nhấn mạnh rằng nghệ thuật cần cất lên tiếng nói trước những nỗi đau của con người, đồng thời nuôi dưỡng tình thương, lòng nhân ái và sự công bằng. Điều đó cho thấy văn chương chân chính luôn có mối liên hệ sâu sắc với số phận con người và những vấn đề của xã hội.',
      },
      {
        type: 'note',
        lead: 'Có thể khái quát:',
        text: 'Cuộc sống cung cấp chất liệu cho văn học; văn học thông qua việc khám phá và thể hiện cuộc sống giúp con người hiểu đời, hiểu người và hiểu chính mình.',
      },
      { type: 'heading', level: 3, text: 'b. Biểu hiện' },
      {
        type: 'paragraph',
        text: 'Mối quan hệ giữa văn học và cuộc sống thể hiện ở một số phương diện cơ bản:',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'Văn học phản ánh hiện thực:',
            text: 'Tác phẩm tái hiện những hoàn cảnh, sự kiện, mối quan hệ và số phận con người trong một bối cảnh nhất định.',
          },
          {
            lead: 'Văn học khám phá bản chất cuộc sống:',
            text: 'Qua những câu chuyện và nhân vật cụ thể, nhà văn giúp người đọc nhận ra những mâu thuẫn xã hội, quy luật vận động của đời sống và những vấn đề có ý nghĩa nhân sinh.',
          },
          {
            lead: 'Văn học thể hiện thái độ của người nghệ sĩ:',
            text: 'Đằng sau bức tranh hiện thực là tình cảm, sự đồng cảm, nỗi trăn trở, thái độ phê phán hoặc niềm tin mà nhà văn gửi gắm.',
          },
          {
            lead: 'Văn học tác động trở lại cuộc sống:',
            text: 'Tác phẩm có thể đánh thức lòng trắc ẩn, bồi đắp nhân cách, thay đổi cách nhìn nhận con người và thôi thúc người đọc hướng đến những giá trị tốt đẹp.',
          },
        ],
      },
      {
        type: 'note',
        text: 'Như vậy, phản ánh hiện thực không có nghĩa là ghi chép cuộc sống một cách máy móc. Hiện thực chỉ thực sự trở thành chất liệu nghệ thuật có giá trị khi được nhà văn khám phá, lựa chọn và thể hiện nhằm truyền tải một ý nghĩa nhất định.',
      },
      { type: 'heading', level: 3, text: 'c. Nhận định có thể vận dụng' },
      {
        type: 'quote',
        lines: ['Không có nghệ thuật nào là không hiện thực'],
        author: 'Grandi',
      },
      {
        type: 'quote',
        lines: ['Văn học và đời sống là hai vòng tròn đồng tâm mà tâm điểm là con người'],
        author: 'Nguyễn Minh Châu',
      },
      {
        type: 'quote',
        lines: [
          'Cuối cùng văn chương cũng chính là nghề mộc. Anh đều làm việc với hiện thực - một vật liệu cũng cứng như gỗ',
        ],
        author: 'Gabriel Garcia Marquez',
      },
      {
        type: 'quote',
        lines: ['Tôi đóng cửa phòng văn hì hục viết', 'Nắng trôi đi oan uổng biết bao ngày'],
        author: 'Chế Lan Viên',
      },
      { type: 'heading', level: 3, text: 'd. Dẫn chứng tiêu biểu' },
      {
        type: 'paragraph',
        text: 'Văn học hiện thực Việt Nam trước Cách mạng tháng Tám năm 1945 là minh chứng rõ nét cho mối quan hệ giữa văn chương và đời sống. Nhiều nhà văn cùng hướng ngòi bút đến người nông dân nghèo nhưng lại phát hiện những khía cạnh khác nhau của hiện thực.',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'Ngô Tất Tố – “Tắt đèn”:',
            text: 'Tác phẩm phơi bày sự áp bức của chế độ sưu thuế và những khổ cực mà người nông dân phải gánh chịu. Qua nhân vật chị Dậu, nhà văn vừa thể hiện nỗi xót thương cho người phụ nữ nghèo, vừa lên án xã hội bất công.',
          },
          {
            lead: 'Nguyễn Công Hoan – “Bước đường cùng”:',
            text: 'Tác phẩm khắc họa bi kịch của người nông dân bị đẩy vào bước đường cùng bởi sự áp bức, bóc lột và những thế lực chiếm đoạt quyền sống của họ.',
          },
          {
            lead: 'Vũ Trọng Phụng – “Vỡ đê”:',
            text: 'Tác phẩm khai thác thảm họa vỡ đê trong mối liên hệ với những bất công xã hội, qua đó phơi bày sự vô trách nhiệm và bản chất của tầng lớp thống trị.',
          },
          {
            lead: 'Kim Lân – “Vợ nhặt”:',
            text: 'Từ nạn đói năm 1945, nhà văn tái hiện cảnh sống khốn cùng của người dân, đồng thời phát hiện khát vọng sống, tình thương và niềm hy vọng vẫn tồn tại giữa hoàn cảnh khắc nghiệt.',
          },
          {
            lead: 'Nam Cao – “Chí Phèo”:',
            text: 'Nhà văn không chỉ phản ánh sự nghèo đói mà còn đi sâu khám phá quá trình một con người bị xã hội tàn nhẫn đẩy vào con đường tha hóa. Bi kịch của Chí Phèo là bi kịch bị tước đoạt nhân hình, nhân tính và quyền được công nhận là người.',
          },
        ],
      },
      {
        type: 'note',
        text: 'Điểm đáng chú ý là các tác giả không chỉ ghi lại những khổ đau của người nông dân. Mỗi người còn phát hiện một vấn đề riêng, từ đó mở ra những cách nhìn khác nhau về xã hội và con người.',
      },
      { type: 'heading', level: 3, text: 'e. Cách vận dụng vào bài nghị luận văn học' },
      {
        type: 'paragraph',
        text: 'Khi gặp nhận định cho rằng văn học phải gắn bó với hiện thực, có thể triển khai theo trình tự:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            lead: 'Giải thích:',
            text: 'Văn học bắt nguồn từ đời sống và lấy hiện thực làm chất liệu sáng tác.',
          },
          {
            lead: 'Phân tích:',
            text: 'Làm rõ cách nhà văn phản ánh hoàn cảnh xã hội, số phận con người và những vấn đề của thời đại.',
          },
          {
            lead: 'Chứng minh:',
            text: 'Lựa chọn tác phẩm, chi tiết hoặc nhân vật tiêu biểu để phân tích.',
          },
          {
            lead: 'Đánh giá:',
            text: 'Khẳng định giá trị của tác phẩm không chỉ nằm ở việc phản ánh hiện thực mà còn ở chiều sâu tư tưởng và ý nghĩa nhân văn.',
          },
        ],
      },
      { type: 'heading', level: 2, text: '2. Văn chương đòi hỏi sự sáng tạo' },
      { type: 'heading', level: 3, text: 'a. Cơ sở lý luận' },
      {
        type: 'paragraph',
        text: 'Nếu cuộc sống cung cấp chất liệu cho văn học thì sáng tạo là yếu tố giúp chất liệu ấy trở thành nghệ thuật.',
      },
      {
        type: 'paragraph',
        text: 'Nhà văn không phải người sao chép nguyên xi những gì nhìn thấy ngoài đời. Từ hiện thực khách quan, người nghệ sĩ lựa chọn những chi tiết tiêu biểu, xây dựng hình tượng, tổ chức câu chuyện và gửi gắm cách nhìn riêng về con người, cuộc sống. Chính quá trình sáng tạo ấy làm nên giá trị nghệ thuật và dấu ấn cá nhân của mỗi tác giả.',
      },
      {
        type: 'paragraph',
        text: 'Nhà văn Tề Bạch Thạch từng cho rằng nghệ thuật cần có sự tương đồng với cuộc sống nhưng không thể hoàn toàn đồng nhất với cuộc sống. Nếu tác phẩm chỉ bắt chước hiện thực, nó sẽ đánh mất tính nghệ thuật; ngược lại, nếu hoàn toàn xa rời hiện thực, tác phẩm cũng mất đi cơ sở để thuyết phục người đọc.',
      },
      {
        type: 'paragraph',
        text: 'Bởi vậy, văn học vừa gắn với những điều có thật trong đời sống, vừa có khả năng vượt lên trên cái thông thường bằng trí tưởng tượng, sự liên tưởng và cách khám phá độc đáo của người nghệ sĩ.',
      },
      {
        type: 'paragraph',
        text: 'Sáng tạo trong văn học được thể hiện qua nhiều phương diện:',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'Cách nhìn hiện thực:',
            text: 'Nhà văn phát hiện những vấn đề, khía cạnh hoặc ý nghĩa mà người khác có thể chưa nhận ra.',
          },
          {
            lead: 'Xây dựng hình tượng:',
            text: 'Nhân vật, không gian, thời gian và tình huống nghệ thuật được tổ chức nhằm làm nổi bật tư tưởng của tác phẩm.',
          },
          {
            lead: 'Tổ chức ngôn ngữ:',
            text: 'Cách lựa chọn từ ngữ, hình ảnh, giọng điệu, nhịp điệu và kết cấu tạo nên sức biểu đạt riêng.',
          },
          {
            lead: 'Dấu ấn phong cách:',
            text: 'Mỗi nhà văn có cách cảm nhận, suy nghĩ và thể hiện thế giới mang tính cá nhân, giúp tác phẩm của họ có bản sắc riêng.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Do đó, sáng tạo không đồng nghĩa với việc tạo ra những điều hoàn toàn xa lạ với cuộc sống. Đó là khả năng phát hiện cái mới, cái sâu sắc và cái độc đáo ngay trong những điều quen thuộc.',
      },
      { type: 'heading', level: 3, text: 'b. Mối quan hệ giữa hiện thực và sáng tạo' },
      {
        type: 'paragraph',
        text: 'Hiện thực và sáng tạo không đối lập mà bổ sung cho nhau.',
      },
      {
        type: 'paragraph',
        text: 'Hiện thực giúp tác phẩm có cơ sở đời sống, tạo nên tính chân thực và khả năng thuyết phục. Sáng tạo giúp hiện thực được tái hiện bằng một hình thức nghệ thuật riêng, qua đó bộc lộ chiều sâu tư tưởng và cảm xúc của nhà văn.',
      },
      {
        type: 'paragraph',
        text: 'Vì thế, cùng viết về một thời đại, một hoàn cảnh xã hội hay một kiểu nhân vật, các nhà văn vẫn có thể tạo nên những tác phẩm khác biệt. Sự khác biệt ấy bắt nguồn từ vốn sống, trải nghiệm, quan niệm nghệ thuật, cá tính sáng tạo và tài năng của mỗi người.',
      },
      {
        type: 'note',
        lead: 'Có thể khái quát:',
        text: 'Hiện thực là điểm tựa của sáng tác, còn sáng tạo là con đường để nhà văn khám phá và biểu hiện hiện thực bằng ngôn ngữ nghệ thuật.',
      },
      { type: 'heading', level: 3, text: 'c. Dẫn chứng tiêu biểu' },
      {
        type: 'paragraph',
        text: 'Cùng viết về người nông dân, mỗi nhà văn một cách khám phá. Văn học Việt Nam trước năm 1945 cho thấy rõ dấu ấn sáng tạo của người nghệ sĩ. Dù cùng quan tâm đến số phận người nông dân trong xã hội cũ, các tác giả vẫn tìm được những hướng khai thác riêng.',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'Ngô Tất Tố:',
            text: 'Tập trung phản ánh sức ép của sưu thuế và cảnh người nông dân bị đẩy vào bước đường khốn cùng.',
          },
          {
            lead: 'Nguyễn Công Hoan:',
            text: 'Quan tâm đến những bất công trong quan hệ xã hội, đặc biệt là tình trạng người nông dân bị chèn ép, bóc lột.',
          },
          {
            lead: 'Vũ Trọng Phụng:',
            text: 'Thể hiện cái nhìn sắc sảo, giàu tính phê phán trước những bất công và sự giả dối của xã hội đương thời.',
          },
          {
            lead: 'Kim Lân:',
            text: 'Đi sâu vào đời sống nghèo khó, đồng thời phát hiện vẻ đẹp của tình người, lòng nhân hậu và khát vọng sống trong những con người bình dị.',
          },
          {
            lead: 'Nam Cao:',
            text: 'Khám phá những bi kịch tinh thần phức tạp, nhất là quá trình con người bị hoàn cảnh xã hội làm tổn thương, tha hóa và đánh mất quyền sống đúng nghĩa.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Những khác biệt ấy cho thấy nhà văn không chỉ phản ánh điều mắt thấy tai nghe mà còn phải có khả năng phát hiện, lý giải và thể hiện hiện thực theo cách riêng.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'd. Vai trò của cái tôi sáng tạo và phong cách nhà văn',
      },
      {
        type: 'paragraph',
        text: 'Văn học phản ánh thế giới khách quan thông qua nhận thức, tình cảm và tư tưởng chủ quan của người nghệ sĩ. Vì thế, cùng một sự vật hoặc hiện tượng, mỗi nhà văn có thể có cách cảm nhận và biểu đạt khác nhau.',
      },
      {
        type: 'paragraph',
        text: 'Cái tôi sáng tạo chi phối việc nhà văn lựa chọn đề tài, xây dựng nhân vật, tổ chức ngôn ngữ và gửi gắm thông điệp. Khi dấu ấn cá nhân được thể hiện nhất quán và độc đáo trong nhiều sáng tác, nó góp phần hình thành phong cách nghệ thuật của tác giả.',
      },
      {
        type: 'paragraph',
        text: 'Một tác phẩm có giá trị vì thế không chỉ cho người đọc biết cuộc sống diễn ra như thế nào, mà còn mở ra một cách nhìn mới về cuộc sống ấy.',
      },
      {
        type: 'paragraph',
        text: 'Tuy nhiên, sáng tạo không có nghĩa là tùy tiện hoặc cố tình làm khác người. Sự độc đáo chỉ thực sự có ý nghĩa khi gắn với khả năng khám phá đời sống, chiều sâu tư tưởng và hiệu quả biểu đạt nghệ thuật.',
      },
      { type: 'heading', level: 3, text: 'e. Nhận định có thể vận dụng' },
      {
        type: 'quote',
        lines: [
          'Cái quan trọng trong tài năng văn học là tiếng nói của mình, là cái giọng riêng biệt của chính mình không thể tìm thấy trong cổ họng của bất kì một người nào khác',
        ],
        author: 'Tuocghenhev',
      },
      {
        type: 'quote',
        lines: [
          'Nếu nhà văn không có một lối đi riêng của mình thì người đó chẳng bao giờ là nhà văn',
        ],
        author: 'Shê-khốp',
      },
      {
        type: 'quote',
        lines: [
          'Nghệ thuật là lĩnh vực của cái độc đáo. Vì vậy, nó đòi hỏi phải có phong cách, tức là phải có nét gì đó rất mới, rất riêng thể hiện trong tác phẩm của mình',
        ],
        author: 'Nguyễn Tuân',
      },
      {
        type: 'quote',
        lines: [
          'Không có tiếng nói riêng, không mang lại những điều mới mẻ cho văn chương mà chỉ biết dẫm theo đường mòn thì tác phẩm nghệ thuật sẽ chết',
        ],
        author: 'Lê-ô-nốp',
      },
      { type: 'heading', level: 3, text: 'f. Cách vận dụng vào bài nghị luận văn học' },
      {
        type: 'paragraph',
        text: 'Khi phân tích tính sáng tạo của một tác phẩm, có thể triển khai theo các bước:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          { text: 'Xác định đề tài hoặc vấn đề hiện thực mà tác phẩm đề cập.' },
          { text: 'Chỉ ra cách tiếp cận riêng của nhà văn đối với đề tài ấy.' },
        ],
      },
    ],
  },
  {
    slug: 'tiep-nhan-van-hoc',
    title: 'Tiếp nhận văn học',
    summary:
      'Tiếp nhận văn học là gì, khác gì với việc đọc tác phẩm, và vì sao chính người đọc — chứ không phải nhà văn — quyết định số phận của một tác phẩm sau khi nó “chào đời”.',
    author: 'Gieo',
    publishedAt: '2026-10-13',
    body: [
      { type: 'heading', level: 2, text: 'Phần 1. Khái niệm' },
      { type: 'heading', level: 3, text: '1.1. Định nghĩa' },
      {
        type: 'paragraph',
        text: 'Theo Từ điển Văn học tiếp nhận là quá trình người đọc chiếm lĩnh giá trị tư tưởng và thẩm mĩ của tác phẩm. Quá trình này đi từ cảm thụ ngôn từ, hình tượng, tình cảm, quan niệm nghệ thuật, tài năng nhà văn, đến sản phẩm sau khi đọc: cách hiểu, ấn tượng, trí nhớ, ảnh hưởng.',
      },
      {
        type: 'paragraph',
        text: 'Theo SGK Ngữ văn 12 thì tiếp nhận văn học là quá trình người đọc hòa mình vào tác phẩm, rung động, đắm chìm trong thế giới nghệ thuật bằng ngôn từ. Họ dùng trí tưởng tượng, kinh nghiệm sống, vốn văn hóa và tâm hồn để biến văn bản khô khan thành thế giới sống động.',
      },
      {
        type: 'paragraph',
        text: 'Do đó, ta có thể hiểu đơn giản tiếp nhận là hoạt động tích cực của cảm giác và tâm trí, nhằm biến văn bản thành thế giới nghệ thuật theo tâm trí người đọc.',
      },
      { type: 'heading', level: 3, text: '1.2. Phân biệt tiếp nhận và đọc tác phẩm' },
      {
        type: 'paragraph',
        text: 'Mọi người có thể hiểu tiếp nhận rộng hơn đọc. Trước khi có chữ viết và in ấn, văn học được truyền miệng. Ngày nay vẫn có người tiếp nhận bằng tai như là nghe tác giả ngâm thơ, nghe truyện đêm khuya trên đài.',
      },
      { type: 'heading', level: 2, text: 'Phần 2. Vị trí và bản chất của tiếp nhận' },
      {
        type: 'heading',
        level: 3,
        text: '2.1. Tiếp nhận là điểm cuối của vòng đời tác phẩm',
      },
      {
        type: 'paragraph',
        text: 'Ví von tác phẩm như đứa con tinh thần của nhà văn thì khi nhà văn viết xong mới chỉ là lúc tác phẩm mới “chào đời”, còn số phận của nó do người đọc quyết định. Ba giai đoạn của một tác phẩm văn chương đó là:',
      },
      {
        type: 'list',
        items: [
          {
            text: 'Hình thành ý đồ sáng tác, giai đoạn này thường gắn liền trải nghiệm nhà văn với đời sống.',
          },
          {
            text: 'Ý tưởng hay đi kèm với tài năng ngôn ngữ sẽ tạo nên tác phẩm văn học đặc sắc',
          },
          {
            text: 'Tiếp nhận là lúc văn bản tách khỏi nhà văn, tồn tại độc lập trong xã hội và trong suy nghĩ từng người đọc.',
          },
        ],
      },
    ],
  },
];
