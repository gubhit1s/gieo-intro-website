/**
 * The post library ("Kho tài liệu"), hardcoded until posts move to a backend.
 *
 * Order matters: posts display in this order, newest first, on the home page
 * grid and the library page. Each post is served at /tai-lieu/<slug>.
 *
 * Same rules as site.ts: plain data, no imports besides types, no computed
 * values. The text is transcribed from Gieo's own study notes — edit it as
 * content, not as code.
 */
import type { Post } from './types';

export const posts: readonly Post[] = [
  {
    slug: 'ly-luan-van-hoc-ve-tho-ca-gamzatov',
    title: 'Phân tích lý luận văn học về thơ ca qua bài thơ của Gamzatov',
    summary:
      'Thơ là gì và thơ làm gì cho đời người? Cùng Gieo đọc bài thơ “Thơ ca” của Raxun Gamzatôp để thấy sáu quan niệm lý luận về thơ được nói bằng hình ảnh chứ không bằng định nghĩa khô khan nhé.',
    author: 'Gieo',
    publishedAt: '2026-11-03',
    // Placeholder: shares the dẫn chứng post's illustration until this post has its own.
    cover: {
      file: 'dan-chung-nlxh.png',
      alt: 'Một người ngồi trên đồi bên cuốn sách mở đang phát sáng, nhìn về phía mặt trời lặn và đàn chim bay.',
    },
    body: [
      {
        type: 'quote',
        lines: [
          'Có công việc làm, hẳn có lúc ngừng tay,',
          'Có cuộc hành trình, phải có mươi phút nghỉ.',
          'Thơ vừa là nghỉ ngơi, vừa là việc đầy lao lực,',
          'Thơ vừa là chỗ dừng chân, vừa là cuộc hành trình.',
          'Thơ như bài hát ru, ngây ngất đầu giường thơ bé,',
          'Như mơ ước mùa xuân, như khát vọng chiến công',
          'Tôi yêu thơ và thơ liền hiển hiện,',
          'Thơ đã sinh ra, tình yêu cũng đến cùng.',
          'Khi tôi nhỏ thơ giống như bà mẹ,',
          'Tôi lớn lên, thơ lại giống người yêu,',
          'Chăm sóc tuổi già, thơ sẽ là con gái,',
          'Lúc từ giã cõi đời, kỉ niệm hóa thơ lưu.',
          'Có lúc thơ như trái núi cao không thể tới,',
          'Có lúc thành cánh chim sà đậu xuống lòng tay.',
          'Thơ như đôi cánh nâng tôi bay',
          'Thơ là vũ khí trong trận đánh',
          'Là tất cả, thơ ơi, chỉ trừ không chịu là yên tĩnh!',
          'Tôi nguyện suốt đời trung thực sống cho thơ…',
          'Là công việc tận cùng? Là rảnh rỗi bắt đầu?',
          'Là cuộc hành trình ư? Hay chỉ là chỗ nghỉ?',
          'Tôi chỉ biết về tôi, thơ vẫn là hai vế:',
          'Rảnh rỗi và việc làm; chỗ nghỉ với hành trình',
        ],
        author: 'Raxun Gamzatôp, “Thơ ca”',
      },
      {
        type: 'paragraph',
        text: 'Nguồn: Raxun Gamzatôp, Đaghextan của tôi, quyển I, NXB Cầu Vồng, Matxcơva, 1984, trang 149. Bản dịch của Phan Hồng Giang và Bằng Việt.',
      },
      { type: 'heading', level: 2, text: 'Vì sao GIEO chọn bài thơ này' },
      {
        type: 'paragraph',
        text: 'GIEO lựa chọn bài thơ trên vì bài thơ đã trả lời câu hỏi cốt lõi của lý luận văn học, “thơ là gì và thơ làm gì cho đời người”, bằng hình ảnh chứ không bằng định nghĩa khô khan.',
      },
      {
        type: 'paragraph',
        text: 'Đôi nét về tác giả: Raxun Gamzatôp (1923–2003) là nhà thơ nổi tiếng của vùng Đaghextan (Liên Xô cũ). Thơ ông giàu chất dân gian vùng núi Kavkaz, hay suy ngẫm về quê hương, tình yêu và chính nghề thơ. Đaghextan của tôi là tập văn xuôi trữ tình của ông, trong đó có những đoạn bàn về thơ.',
      },
      { type: 'heading', level: 2, text: '1. Thơ vừa là cảm hứng, vừa là lao động nghệ thuật' },
      {
        type: 'quote',
        lines: [
          'Có công việc làm, hẳn có lúc ngừng tay,',
          'Có cuộc hành trình, phải có mươi phút nghỉ.',
          'Thơ vừa là nghỉ ngơi, vừa là việc đầy lao lực,',
          'Thơ vừa là chỗ dừng chân, vừa là cuộc hành trình.',
        ],
        author: 'Raxun Gamzatôp',
      },
      {
        type: 'paragraph',
        text: 'Thơ vừa là sự nghỉ ngơi, vừa là việc đầy lao lực. Hai trạng thái trái ngược nhưng cùng gọi tên một thứ. Thơ bắt đầu từ khoảnh khắc rung động tự nhiên bao gồm sự mơ mộng, ngây ngất, bất chợt thấy lòng đầy. Nhưng từ rung động đến bài thơ hay là cả một quãng đường làm việc: chọn từng chữ, gọt từng câu, thử đi thử lại.',
      },
      {
        type: 'note',
        text: 'Thiếu rung động thì thơ khô, thiếu lao động thì thơ thô. Nhà thơ phản bác quan niệm cho rằng làm thơ là “ngẫu hứng, nhẹ nhàng”. Nhà thơ vừa là người mơ mộng vừa là người thợ chữ.',
      },
      { type: 'heading', level: 2, text: '2. Thơ là chỗ dừng chân và cũng là hành trình' },
      {
        type: 'quote',
        lines: ['Thơ vừa là chỗ dừng chân, vừa là cuộc hành trình.'],
        author: 'Raxun Gamzatôp',
      },
      {
        type: 'paragraph',
        text: 'Thơ vừa là nơi dừng chân, vừa là cuộc hành trình. Về sau nhà thơ còn nói thơ là tất cả, chỉ trừ việc chịu yên tĩnh. Đọc thơ giúp ta dừng lại giữa bộn bề, thấy lòng lắng xuống, thấy cái đẹp. Nhưng thơ không giữ ta đứng yên: nó mở ra cách nhìn mới, đưa ta đi tiếp tới những điều ta chưa nghĩ tới. Và bản thân thơ cũng luôn chuyển động, không chịu lặp lại cái cũ.',
      },
      {
        type: 'paragraph',
        text: 'Và thơ có 2 chức năng là giáo dục và thẩm mỹ, chức năng thẩm mỹ đóng vai trò quan trọng hơn bất kỳ thể loại nào khác vì chức năng này thường diễn ra cùng lúc, ta thấy đẹp rồi mới hiểu sâu, hoặc hiểu sâu rồi mới thấy đẹp hơn.',
      },
      { type: 'heading', level: 2, text: '3. Thơ gắn bó với cả đời người' },
      {
        type: 'quote',
        lines: [
          'Thơ như bài hát ru, ngây ngất đầu giường thơ bé,',
          'Như mơ ước mùa xuân, như khát vọng chiến công',
          'Tôi yêu thơ và thơ liền hiển hiện,',
          'Thơ đã sinh ra, tình yêu cũng đến cùng.',
          'Khi tôi nhỏ thơ giống như bà mẹ,',
          'Tôi lớn lên, thơ lại giống người yêu,',
          'Chăm sóc tuổi già, thơ sẽ là con gái,',
          'Lúc từ giã cõi đời, kỉ niệm hóa thơ lưu.',
        ],
        author: 'Raxun Gamzatôp',
      },
      {
        type: 'paragraph',
        text: 'Nhà thơ lần lượt ví thơ với bài hát ru bên giường trẻ nhỏ, với người mẹ thuở ấu thơ, người yêu thuở trưởng thành, người con gái chăm sóc tuổi già và cuối cùng là kỷ niệm lúc từ giã cuộc đời. Ông cũng nói thơ ra đời cùng lúc với tình yêu. Ở tuổi nào con người cũng cần thơ và thơ đáp lại bằng một dáng vẻ khác: che chở, rung động, đồng hành, lưu giữ.',
      },
      {
        type: 'note',
        text: 'Thơ không đứng ngoài đời mà chảy theo đời một người từ đầu đến cuối. Nhà thơ dẫn từ hình ảnh mẹ, người yêu, con gái, kỷ niệm. Đó là vòng đời đi từ được chăm sóc, đến yêu, đến chăm sóc người khác, đến nhớ lại. Thơ có mặt ở mọi chặng.',
      },
      { type: 'heading', level: 2, text: '4. Thơ vừa là đôi cánh, vừa là vũ khí' },
      {
        type: 'quote',
        lines: [
          'Có lúc thơ như trái núi cao không thể tới,',
          'Có lúc thành cánh chim sà đậu xuống lòng tay.',
          'Thơ như đôi cánh nâng tôi bay',
          'Thơ là vũ khí trong trận đánh',
        ],
        author: 'Raxun Gamzatôp',
      },
      {
        type: 'paragraph',
        text: 'Thơ là mơ ước mùa xuân, là khát vọng chiến công; là đôi cánh nâng nhà thơ bay lên và cũng là vũ khí trong trận đánh. Thơ giúp con người mơ, vươn tới điều đẹp hơn thực tại. Nhưng thơ cũng có sức mạnh bảo vệ lẽ phải, cổ vũ tinh thần cả một cộng đồng khi cần chiến đấu. Cánh để bay, vũ khí để bảo vệ: cả hai đều thuộc về thơ. Đặt “đôi cánh” cạnh “vũ khí” cho thấy nhà thơ không tách thơ lãng mạn khỏi thơ chiến đấu. Với ông, cả hai là một nguồn.',
      },
      {
        type: 'paragraph',
        text: 'Có lúc thơ như trái núi cao không thể tới, có lúc lại như cánh chim sà xuống đậu trong lòng tay. Có bài thơ sâu, nhiều tầng nghĩa, đọc nhiều lần vẫn thấy còn điều chưa chạm tới. Có bài thơ gần gũi, đọc một lần là thấy ngay. Và cùng một bài, mỗi người, mỗi lúc lại cảm theo một cách.',
      },
      { type: 'heading', level: 2, text: '5. Nhà thơ phải chân thành' },
      {
        type: 'quote',
        lines: ['Tôi nguyện suốt đời trung thực sống cho thơ…'],
        author: 'Raxun Gamzatôp',
      },
      {
        type: 'paragraph',
        text: 'Nhà thơ nguyện suốt đời trung thực, sống cho thơ. Thơ hay phải bắt nguồn từ cảm xúc thật. Viết cho đủ, viết theo mẫu, viết điều mình không nghĩ thì người đọc nhận ra ngay.',
      },
      {
        type: 'note',
        text: 'Sự chân thành là điều kiện đầu tiên của sáng tạo nghệ thuật, đồng thời là phẩm chất đạo đức và trách nhiệm của người cầm bút. Gắn với đó là cái tôi trữ tình: tiếng nói riêng của người viết, không thể thay bằng giọng chung chung.',
      },
      { type: 'heading', level: 2, text: '6. Thơ không thể định nghĩa gọn trong một câu' },
      {
        type: 'quote',
        lines: [
          'Là công việc tận cùng? Là rảnh rỗi bắt đầu?',
          'Là cuộc hành trình ư? Hay chỉ là chỗ nghỉ?',
          'Tôi chỉ biết về tôi, thơ vẫn là hai vế:',
          'Rảnh rỗi và việc làm; chỗ nghỉ với hành trình',
        ],
        author: 'Raxun Gamzatôp',
      },
      {
        type: 'paragraph',
        text: 'Thơ là công việc tận cùng hay là rảnh rỗi bắt đầu, là hành trình hay là chỗ nghỉ? Rồi nhà thơ chốt lại rất khiêm tốn: ông chỉ biết về mình và với ông, thơ luôn có hai vế, cả hai cùng tồn tại. Nhà thơ không chọn một vế mà bỏ vế kia. Ông chấp nhận rằng thơ có những điều tưởng trái ngược nhưng cùng đúng.',
      },
    ],
  },
  {
    slug: 'cach-trien-khai-dan-chung-nlxh',
    title: 'Cách triển khai dẫn chứng cho bài văn nghị luận xã hội',
    summary:
      'Dẫn chứng hay chưa đủ để ăn điểm nếu chỉ được kể lại. Cùng Gieo tìm hiểu quy trình 4 bước DẪN – KỂ – SOI – NÂNG để biến mỗi dẫn chứng thành một lập luận thuyết phục nhé.',
    author: 'Gieo',
    publishedAt: '2026-11-02',
    cover: {
      file: 'dan-chung-nlxh.png',
      alt: 'Một người ngồi trên đồi bên cuốn sách mở đang phát sáng, nhìn về phía mặt trời lặn và đàn chim bay.',
    },
    body: [
      { type: 'heading', level: 2, text: 'Lời mở đầu' },
      {
        type: 'paragraph',
        text: 'Nhiều bạn có dẫn chứng hay nhưng vẫn mất điểm, thật ra là vì dẫn chứng chỉ được kể chứ chưa được dùng. Một dẫn chứng tốt các em phải tưởng tượng nó giống như một nhân chứng trước tòa, phải đứng đúng chỗ, nói đúng điều cần nói, rồi để người nghe tự kết luận. Mình gọi quy trình này là 4 bước bao gồm: DẪN – KỂ – SOI – NÂNG.',
      },
      { type: 'heading', level: 2, text: 'Cách triển khai dẫn chứng NLXH' },
      { type: 'heading', level: 3, text: 'Bước 1: DẪN (nối luận điểm với dẫn chứng)' },
      {
        type: 'paragraph',
        text: 'Câu dẫn phải nói lên điều dẫn chứng sắp chứng minh, không chỉ là câu giới thiệu tên người. Nếu bỏ câu này đi mà đoạn văn vẫn trôi chảy thì câu đó chưa làm đúng nhiệm vụ. Mình sẽ diễn đạt thử 1 số vấn đề như sau:',
      },
      {
        type: 'list',
        items: [
          {
            text: '“Lý thuyết sẽ chỉ là lý thuyết nếu thiếu những con người đã sống đúng như vậy. Một trong số họ là…”',
          },
          {
            text: '“Có những phẩm chất chỉ lộ rõ khi con người đứng trước nghịch cảnh. Câu chuyện của… là một ví dụ.”',
          },
          {
            text: '“Nếu ai còn nghi ngờ rằng [luận điểm], hãy nhìn vào…” (cách này tạo sức nặng vì có yếu tố phản bác)',
          },
        ],
      },
      { type: 'heading', level: 3, text: 'Bước 2: KỂ' },
      {
        type: 'note',
        lead: 'Tối đa 2–3 câu, đủ “3 mảnh ghép”:',
        text: 'Ai (tên, bối cảnh) + làm gì / vượt qua điều gì + kết quả.',
      },
      {
        type: 'paragraph',
        text: 'Việc kể phải chọn lọc. Hãy đưa những chi tiết có sức nặng để chứng minh cho luận điểm. Các số liệu, mốc thời gian, tên riêng nên chính xác, nếu chưa chắc thì dùng từ khái quát chứ đừng bịa số.',
      },
      { type: 'heading', level: 3, text: 'Bước 3: SOI' },
      {
        type: 'paragraph',
        text: 'Đây là phần ăn điểm nhất. Ở bước này, thầy cô chấm tư duy, không chấm trí nhớ. Hãy tự hỏi ba câu rồi viết thành 2–4 câu:',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'Vì sao?',
            text: 'Điều gì ở nhân vật (hoàn cảnh, nội lực, lựa chọn) làm nên kết quả đó?',
          },
          {
            lead: 'Chứng minh điều gì?',
            text: 'Dẫn chứng soi sáng chân lý nào của luận điểm?',
          },
          {
            lead: 'Nếu ngược lại thì sao? (phản đề)',
            text: 'Nếu nhân vật chọn buông xuôi, thờ ơ, im lặng, hậu quả sẽ ra sao?',
          },
        ],
      },
      {
        type: 'note',
        lead: 'Mình hay dùng một số từ nối như là:',
        text: 'Điều đáng nói là… / Sức nặng của câu chuyện nằm ở chỗ… / Không phải ngẫu nhiên mà… / Sự khác biệt nằm ở…',
      },
      { type: 'heading', level: 3, text: 'Bước 4: NÂNG' },
      {
        type: 'paragraph',
        text: 'Đưa dẫn chứng từ một người đến mọi người. Đừng chốt bằng câu rập khuôn “chúng ta cần cố gắng” mà hãy nâng tầm theo hai bước:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          { text: 'Rút bài học mang tính quy luật.' },
          { text: 'Kéo về người trẻ hôm nay bằng một hành động cụ thể.' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Phần này thể hiện cách nhìn, độ sâu sắc nên cần có cái nhìn rộng mở khái quát thay vì chỉ nhất quyết thể hiện cái tôi cá nhân.',
      },
      { type: 'heading', level: 2, text: 'Ví dụ mẫu' },
      {
        type: 'heading',
        level: 3,
        text: 'Ví dụ 1: Dũng cảm lên tiếng, tuổi trẻ làm điều lớn lao',
      },
      {
        type: 'paragraph',
        text: 'Dẫn chứng: Malala Yousafzai, nhà đấu tranh vì quyền giáo dục của phụ nữ ở Pakistan — một trong những nhà hoạt động giáo dục mà mình rất ngưỡng mộ.',
      },
      {
        type: 'list',
        items: [
          {
            lead: '[DẪN]',
            text: 'Người ta hay nói tiếng nói của một đứa trẻ không đủ sức nặng để thay đổi điều gì. Nhưng lịch sử có những cô bé đã khiến cả thế giới phải lắng nghe, như Malala Yousafzai.',
          },
          {
            lead: '[KỂ]',
            text: 'Sống ở thung lũng Swat (Pakistan) dưới sự kiểm soát của Taliban, nơi con gái bị cấm đến trường, Malala mới 11 tuổi đã viết nhật ký trực tuyến để lên tiếng đòi quyền học tập. Năm 15 tuổi, em bị bắn ngay trên xe buýt đi học, nhưng em sống sót và tiếp tục đấu tranh, rồi trở thành người trẻ nhất từng nhận giải Nobel Hòa bình năm 17 tuổi.',
          },
          {
            lead: '[SOI]',
            text: 'Điều đáng nói là kẻ muốn bịt miệng Malala đã chọn cách cực đoan nhất, mà tiếng nói ấy vẫn không tắt. Điều đó cho thấy sức mạnh của một khát vọng đúng đắn không nằm ở tuổi tác hay quyền lực, mà ở niềm tin dám bảo vệ nó đến cùng. Sự dũng cảm của em cũng không phải là không biết sợ. Em hiểu rõ nguy hiểm nhưng vẫn chọn lên tiếng, vì với em, im lặng nghĩa là tước đi tương lai của hàng triệu bạn gái khác. Nếu em chọn cúi đầu, có lẽ vẫn còn rất nhiều cánh cửa lớp học đóng chặt.',
          },
          {
            lead: '[NÂNG]',
            text: 'Từ Malala, ta hiểu rằng dũng cảm không phải là đặc quyền của người lớn hay anh hùng. Người trẻ hôm nay không cần cầm micro trước thế giới, chỉ cần dám lên tiếng trước điều sai trái ngay trong lớp học, mạng xã hội, hay nhóm bạn của mình. Mỗi tiếng nói đúng lúc là một viên gạch của thay đổi.',
          },
        ],
      },
      { type: 'heading', level: 3, text: 'Ví dụ 2: Nghị lực vượt lên hoàn cảnh' },
      {
        type: 'list',
        items: [
          {
            lead: '[DẪN]',
            text: 'Hoàn cảnh có thể quyết định điểm xuất phát, nhưng không thể quyết định đích đến nếu ta không cho phép. Thầy giáo Nguyễn Ngọc Ký là minh chứng cho điều đó.',
          },
          {
            lead: '[KỂ]',
            text: 'Bị liệt đôi tay từ năm lên 4 sau một trận bệnh, cậu bé Ký không chọn cách sống nhờ sự thương hại mà kiên trì tập viết bằng chân. Bằng ý chí ấy, thầy thi đỗ khoa Ngữ văn, Đại học Tổng hợp Hà Nội, trở thành nhà giáo và được phong tặng danh hiệu Nhà giáo ưu tú.',
          },
          {
            lead: '[SOI]',
            text: 'Chi tiết đáng nghĩ nằm ở chỗ là ai cũng biết viết bằng tay là bình thường, còn viết bằng chân là một hành trình đầy vết trầy xước và những lần bị cười chê. Thầy không chỉ vượt qua giới hạn cơ thể mà còn vượt qua cả sự tự ti. Bằng cách đó, thầy đã đổi định nghĩa của “khuyết tật”: thứ thật sự đáng sợ không nằm ở thân thể, mà ở ý chí đã bị bỏ cuộc. Thầy chọn dạy học, tức là chọn truyền nghị lực của mình cho người khác chứ không giữ riêng cho bản thân.',
          },
          {
            lead: '[NÂNG]',
            text: 'Câu chuyện nhắc người trẻ rằng “tôi không có điều kiện” sẽ không còn là lý do chính đáng nếu ta chưa từng thử hết sức. Đừng so mình với người có nhiều hơn, hãy hỏi: hôm nay mình đã tận dụng hết những gì mình đang có chưa?',
          },
        ],
      },
    ],
  },
  {
    slug: 'ban-chat-cua-van-hoc',
    title: 'Bản chất của văn học',
    summary:
      'Văn chương bắt nguồn từ cuộc sống nhưng luôn đòi hỏi sự sáng tạo của người nghệ sĩ. Hãy cùng Gieo đi qua cơ sở lý luận, biểu hiện, nhận định, dẫn chứng tiêu biểu và cách vận dụng hai luận điểm ấy vào bài nghị luận văn học nhé.',
    author: 'Gieo',
    publishedAt: '2026-10-13',
    // Placeholder: shares the dẫn chứng post's illustration until this post has its own.
    cover: {
      file: 'dan-chung-nlxh.png',
      alt: 'Một người ngồi trên đồi bên cuốn sách mở đang phát sáng, nhìn về phía mặt trời lặn và đàn chim bay.',
    },
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
    // Placeholder: shares the dẫn chứng post's illustration until this post has its own.
    cover: {
      file: 'dan-chung-nlxh.png',
      alt: 'Một người ngồi trên đồi bên cuốn sách mở đang phát sáng, nhìn về phía mặt trời lặn và đàn chim bay.',
    },
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
