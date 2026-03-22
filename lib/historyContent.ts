export interface HistorySection {
  id: string;
  title: string;
  subtitle?: string;
  content: HistoryContent[];
}

export interface HistoryContent {
  type: 'heading' | 'paragraph' | 'list' | 'subheading';
  text?: string;
  items?: string[];
  level?: number;
}

export const historyContentData: HistorySection[] = [
  {
    id: 'section1',
    title: 'II - TÔN GIÁO TRONG THỜI KỲ QUÁ ĐỘ LÊN CHỦ NGHĨA XÃ HỘI',
    content: [
      {
        type: 'heading',
        text: '1. Quan điểm của chủ nghĩa Mác - Lênin về tôn giáo',
      },
      {
        type: 'subheading',
        text: 'Bản chất của tôn giáo',
      },
      {
        type: 'paragraph',
        text: 'Tôn giáo là một hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan, nơi các lực lượng tự nhiên và xã hội trở thành siêu nhiên, thần bí. Tôn giáo do con người sáng tạo ra vì mục đích và lợi ích của mình, nhưng con người lại trở nên lệ thuộc và phục tùng nó vô điều kiện.',
      },
      {
        type: 'subheading',
        text: 'Nguồn gốc của tôn giáo',
      },
      {
        type: 'paragraph',
        text: 'Nguồn gốc tự nhiên, kinh tế - xã hội: Sự yếu đuối, bất lực của con người trước tự nhiên (thời nguyên thủy) và sự áp bức, bóc lột bất công của giai cấp thống trị khiến con người trông chờ vào lực lượng siêu nhiên.',
      },
      {
        type: 'paragraph',
        text: 'Nguồn gốc nhận thức: Khi khoa học chưa thể giải thích được những hiện tượng tự nhiên, xã hội (khoảng cách giữa "biết" và "chưa biết"), con người thường tuyệt đối hóa mặt chủ thể nhận thức, biến nội dung khách quan thành cái siêu nhiên, thần thánh.',
      },
      {
        type: 'paragraph',
        text: 'Nguồn gốc tâm lý: Sự sợ hãi trước tự nhiên, bệnh tật, hay thậm chí cả tình cảm tích cực như tình yêu, lòng biết ơn, lòng kính trọng người có công cũng dễ dẫn con người đến với tôn giáo.',
      },
      {
        type: 'subheading',
        text: 'Tính chất của tôn giáo',
      },
      {
        type: 'paragraph',
        text: 'Tôn giáo có 3 tính chất cơ bản:',
      },
      {
        type: 'list',
        items: [
          'Tính lịch sử: Tôn giáo vận động, biến đổi để thích nghi với các chế độ chính trị - xã hội khác nhau và sẽ dần mất đi khi trình độ khoa học, giáo dục được nâng cao.',
          'Tính quần chúng: Thu hút đông đảo tín đồ (gần 3/4 dân số thế giới), phản ánh khát vọng của người lao động về một xã hội bình đẳng, bác ái.',
          'Tính chính trị: Xuất hiện khi xã hội phân chia giai cấp; tôn giáo mang tính chính trị tiêu cực khi bị các giai cấp bóc lột lợi dụng để chống lại giai cấp lao động.',
        ],
      },
      {
        type: 'subheading',
        text: 'Nguyên tắc giải quyết vấn đề tôn giáo',
      },
      {
        type: 'list',
        items: [
          'Tôn trọng, bảo đảm quyền tự do tín ngưỡng và không tín ngưỡng của nhân dân.',
          'Khắc phục dần những ảnh hưởng tiêu cực của tôn giáo gắn liền với quá trình cải tạo xã hội cũ, xây dựng xã hội mới.',
          'Phân biệt rõ hai mặt chính trị (mâu thuẫn đối kháng) và tư tưởng (mâu thuẫn không đối kháng) trong vấn đề tôn giáo.',
          'Cần có quan điểm lịch sử cụ thể khi xem xét, đánh giá từng tôn giáo ở từng thời kỳ.',
        ],
      },
      {
        type: 'heading',
        text: '2. Tôn giáo ở Việt Nam và chính sách tôn giáo của Đảng, Nhà nước ta hiện nay',
      },
      {
        type: 'subheading',
        text: 'Đặc điểm tôn giáo ở Việt Nam',
      },
      {
        type: 'list',
        items: [
          'Là một quốc gia đa tôn giáo (16 tôn giáo, 43 tổ chức).',
          'Các tôn giáo đa dạng, đan xen, chung sống hòa bình, không có xung đột hay chiến tranh tôn giáo.',
          'Tín đồ phần lớn là nhân dân lao động, có tinh thần yêu nước, gắn bó với dân tộc.',
          'Hàng ngũ chức sắc có uy tín và ảnh hưởng lớn đối với tín đồ.',
          'Các tôn giáo đều có quan hệ với các tổ chức, cá nhân tôn giáo ở nước ngoài.',
        ],
      },
      {
        type: 'subheading',
        text: 'Chính sách của Đảng và Nhà nước Việt Nam',
      },
      {
        type: 'list',
        items: [
          'Khẳng định tín ngưỡng, tôn giáo là nhu cầu tinh thần của một bộ phận nhân dân và sẽ tồn tại lâu dài.',
          'Nhất quán thực hiện chính sách đại đoàn kết toàn dân tộc (đoàn kết người có đạo và không có đạo).',
          'Giữ gìn, phát huy các giá trị tích cực của tôn giáo; nghiêm cấm lợi dụng tôn giáo để hoạt động mê tín dị đoan, chia rẽ dân tộc, chống phá đất nước.',
          'Nội dung cốt lõi của công tác tôn giáo là công tác vận động quần chúng; công tác này là trách nhiệm của cả hệ thống chính trị.',
          'Việc theo đạo và truyền đạo phải tuân thủ nghiêm ngặt Hiến pháp và pháp luật.',
        ],
      },
    ],
  },
  {
    id: 'section2',
    title: 'III - QUAN HỆ DÂN TỘC VÀ TÔN GIÁO Ở VIỆT NAM',
    content: [
      {
        type: 'heading',
        text: '1. Đặc điểm quan hệ dân tộc và tôn giáo ở Việt Nam',
      },
      {
        type: 'list',
        items: [
          'Được thiết lập và củng cố trên cơ sở cộng đồng quốc gia - dân tộc thống nhất (các tôn giáo gắn bó đồng hành cùng dân tộc, gắn đạo với đời).',
          'Chịu sự chi phối mạnh mẽ bởi tín ngưỡng truyền thống (tín ngưỡng thờ cúng tổ tiên, Vua Hùng, anh hùng dân tộc). Mọi tôn giáo du nhập vào Việt Nam đều phải biến đổi ít nhiều để phù hợp với truyền thống bản địa.',
          'Gần đây xuất hiện các hiện tượng tôn giáo mới, tà đạo (như Tin lành Đêga, Hà Mòn) phát triển phức tạp, tác động tiêu cực đến an ninh chính trị và khối đại đoàn kết dân tộc.',
        ],
      },
      {
        type: 'heading',
        text: '2. Định hướng giải quyết mối quan hệ dân tộc và tôn giáo',
      },
      {
        type: 'list',
        items: [
          'Củng cố khối đại đoàn kết toàn dân tộc và đoàn kết tôn giáo là vấn đề chiến lược, cơ bản, lâu dài và cấp bách.',
          'Giải quyết mối quan hệ này phải đặt trong sự thống nhất với cộng đồng quốc gia - dân tộc; tuyệt đối không để kẻ xấu lợi dụng vấn đề tôn giáo đòi ly khai dân tộc.',
          'Đảm bảo quyền tự do tín ngưỡng, tôn giáo của nhân dân đồng thời chủ động, kiên quyết đấu tranh chống lợi dụng vấn đề dân tộc, tôn giáo vào mục đích chính trị (như "tôn giáo hóa dân tộc").',
        ],
      },
    ],
  },
];
