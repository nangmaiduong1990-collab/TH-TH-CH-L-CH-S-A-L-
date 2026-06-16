export interface Question {
  id: string;
  content: string;
  grade: string;
  category: string;
  stt?: string;
  type: 'SINGLE' | 'TRUE FALSE' | 'SHORT_ANSWER';
  options?: { text: string; link: string; image: string }[];
  correctAnswer: number | string;
  explanation: string;
}

export const GRADE_6_QUESTIONS: Question[] = [
  // LỊCH SỬ (1-20)
  {
    id: 'g6_q1',
    content: 'Xã hội cổ đại phương Đông bao gồm các tầng lớp nào sau đây?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Chủ nô, nô lệ và bình dân.', link: '', image: '' },
      { text: 'Thân vương, quý tộc và tăng lữ.', link: '', image: '' },
      { text: 'Quý tộc, nông dân công xã và nô lệ.', link: '', image: '' },
      { text: 'Lãnh chúa, nông nô và nô tì.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Xã hội cổ đại phương Đông gồm 3 tầng lớp chính: Quý tộc (vua, quan lại, tăng lữ), Nông dân công xã đông đảo nhất, và Nô lệ có thân phận thấp kém nhất.'
  },
  {
    id: 'g6_q2',
    content: 'Người Ai Cập cổ đại đã tính được 1 năm có bao nhiêu ngày?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: '354 ngày.', link: '', image: '' },
      { text: '360 ngày.', link: '', image: '' },
      { text: '365 ngày (và 1/4 ngày).', link: '', image: '' },
      { text: '366 ngày.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Thông qua quan sát thiên văn và lũ sông Nin, người Ai Cập cổ đã làm ra Dương lịch cổ bám sát chu kỳ Trái Đất quay xung quanh Mặt Trời với 365 ngày.'
  },
  {
    id: 'g6_q3',
    content: 'Nước Văn Lang được thành lập vào khoảng thế kỷ nào trước Công nguyên?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Thế kỷ VII TCN.', link: '', image: '' },
      { text: 'Thế kỷ VIII TCN.', link: '', image: '' },
      { text: 'Thế kỷ III TCN.', link: '', image: '' },
      { text: 'Thế kỷ VI TCN.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Theo truyền thuyết và thư tịch cổ, nước Văn Lang - nhà nước đầu tiên của dân tộc Việt Nam được thành lập vào khoảng thế kỷ VII TCN bởi Hùng Vương.'
  },
  {
    id: 'g6_q4',
    content: 'Kinh đô của nước Âu Lạc dưới thời An Dương Vương đóng ở đâu?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Phong Châu (Phú Thọ).', link: '', image: '' },
      { text: 'Mê Linh (Hà Nội).', link: '', image: '' },
      { text: 'Cổ Loa (Đông Anh, Hà Nội).', link: '', image: '' },
      { text: 'Bạch Hạc (Phú Thọ).', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'An Dương Vương dời đô từ vùng núi Phong Châu xuống vùng đồng bằng tại Cổ Loa (nay là huyện Đông Anh, Hà Nội) và xây dựng tòa thành Cổ Loa kiên cố.'
  },
  {
    id: 'g6_q5',
    content: 'Ai là người lãnh đạo cuộc khởi nghĩa giành thắng lợi hoàn toàn năm 938 trên sông Bạch Đằng?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Dương Đình Nghệ.', link: '', image: '' },
      { text: 'Phùng Hưng.', link: '', image: '' },
      { text: 'Ngô Quyền.', link: '', image: '' },
      { text: 'Khúc Thừa Dụ.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Ngô Quyền đã dùng trận địa cọc gỗ tiêu diệt quân Nam Hán trên sông Bạch Đằng năm 938, đánh dấu bước ngoặt chấm dứt hoàn toàn ách đô hộ của phong kiến phương Bắc.'
  },
  {
    id: 'g6_q6',
    content: 'Cuộc khởi nghĩa Hai Bà Trưng bùng nổ vào năm nào?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Năm 43.', link: '', image: '' },
      { text: 'Năm 40.', link: '', image: '' },
      { text: 'Năm 248.', link: '', image: '' },
      { text: 'Năm 542.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Khởi nghĩa Hai Bà Trưng bùng nổ vào mùa xuân năm 40 tại Hát Môn (Hà Nội) chống lại sự đô hộ hà khắc của thái thú Tô Định nhà Đông Hán.'
  },
  {
    id: 'g6_q7',
    content: 'Lịch sử là tất cả những gì đã xảy ra trong quá khứ.',
    grade: '6',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Lịch sử bao gồm mọi hoạt động, sự kiện và tiến trình đã diễn ra trong quá khứ kể từ khi loài người xuất hiện.'
  },
  {
    id: 'g6_q8',
    content: 'Thời sơ kỳ, công cụ lao động chủ yếu của người tối cổ là kim khí (sắt).',
    grade: '6',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 1,
    explanation: 'Sai, công cụ ban đầu của người tối cổ hoàn toàn bằng đá thô sơ. Thời kỳ kim khí xuất hiện muộn hơn rất nhiều.'
  },
  {
    id: 'g6_q9',
    content: 'Vào thế kỷ VI, Lý Bí đã lãnh đạo nhân dân khởi nghĩa lập ra nhà nước nào?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Vạn Xuân',
    explanation: 'Sau khi đánh đuổi quân nhà Lương, Lý Bí lên ngôi hoàng đế lập ra nhà nước Vạn Xuân vào năm 544 mong nước nhà mãi độc lập.'
  },
  {
    id: 'g6_q10',
    content: 'Tòa thành quân sự có kiến trúc hình xoáy ốc phòng thủ kiên cố của nước Âu Lạc có tên là gì?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Cổ Loa',
    explanation: 'Thành Cổ Loa, hay thành Ốc, được An Dương Vương xây dựng có cấu trúc xoáy ốc 9 vòng vô cùng độc đáo bảo vệ Đại Việt thuở sơ khai.'
  },
  {
    id: 'g6_q11',
    content: 'Chủ nhân của nền văn hóa Đông Sơn thời kỳ Văn Lang - Âu Lạc là quốc gia nào ngày nay?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Việt Nam.', link: '', image: '' },
      { text: 'Thái Lan.', link: '', image: '' },
      { text: 'Trung Quốc.', link: '', image: '' },
      { text: 'Campuchia.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Văn hóa Đông Sơn phân bố chủ yếu ở khu vực Bắc Bộ và Bắc Trung Bộ Việt Nam, đại diện cho thời kỳ Văn Lang - Âu Lạc cực thịnh.'
  },
  {
    id: 'g6_q12',
    content: 'Nhà nước cổ đại La Mã phát triển mạnh mẽ dựa trên nền tảng kinh tế nào?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Trồng lúa nước.', link: '', image: '' },
      { text: 'Chăn nuôi du mục.', link: '', image: '' },
      { text: 'Thủ công nghiệp và thương nghiệp hàng hải.', link: '', image: '' },
      { text: 'Linh hoạt hái lượm rừng rậm.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Nhờ vị trí giáp vịnh Địa Trung Hải thuận lợi, Hi Lạp và La Mã phát triển rực rỡ về kinh tế hàng hải mua bán giao dịch kim loại, gốm sứ.'
  },
  {
    id: 'g6_q13',
    content: 'Chế độ phong kiến ở Trung Quốc được hình thành dưới thời nào?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Nhà Tần.', link: '', image: '' },
      { text: 'Nhà Hạ.', link: '', image: '' },
      { text: 'Nhà Thương.', link: '', image: '' },
      { text: 'Nhà Chu.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Thời Tần Thủy Hoàng thu phục 6 nước lập nên chế độ phong kiến tập quyền tập trung cai trị đầu tiên năm 221 TCN.'
  },
  {
    id: 'g6_q14',
    content: 'Khu di tích lịch sử đền Hùng nằm trên ngọn núi Nghĩa Lĩnh, thuộc tỉnh thành nào?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Phú Thọ.', link: '', image: '' },
      { text: 'Vĩnh Phúc.', link: '', image: '' },
      { text: 'Yên Bái.', link: '', image: '' },
      { text: 'Tuyên Quang.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Núi Nghĩa Lĩnh tại xã Hy Cương, thành phố Việt Trì, tỉnh Phú Thọ là kinh đô Phong Châu xưa của các vua Hùng.'
  },
  {
    id: 'g6_q15',
    content: 'Người sáng lập ra tôn giáo Phật giáo tại Ấn Độ cổ đại là ai?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Giê-su.', link: '', image: '' },
      { text: 'Thích Ca Mâu Ni (Siddhartha Gautama).', link: '', image: '' },
      { text: 'Mô-ha-mét.', link: '', image: '' },
      { text: 'Lão Tử.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Siddhartha Gautama (Thích Ca Mâu Ni) là thái tử quốc gia Sakya đã ngộ đạo, thành lập nên Phật giáo thế kỷ VI TCN.'
  },
  {
    id: 'g6_q16',
    content: 'Phát minh quan trọng nhất của Người tối cổ giúp chuyển hóa đời sống là phát minh ra lửa.',
    grade: '6',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, lửa giúp sưởi ấm, xua đuổi thú dữ, nấu chín thức ăn giúp tăng cường thể chất thể trạng trí não loài người.'
  },
  {
    id: 'g6_q17',
    content: 'Bộ luật Hammurabi nổi tiếng được khắc trên đá thuộc về vương quốc cổ đại nào?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Lưỡng Hà (Babylon).', link: '', image: '' },
      { text: 'Ấn Độ.', link: '', image: '' },
      { text: 'Ai Cập.', link: '', image: '' },
      { text: 'Trung Quốc.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Hoàng đế Hammurabi vương quốc cổ Babylon (Lưỡng Hà) ban hành bộ luật bằng văn bản toàn diện cổ nhất lịch sử loài người.'
  },
  {
    id: 'g6_q18',
    content: 'Cuộc đấu tranh giành tự chủ của họ Khúc năm 905 do ai chỉ đạo?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Khúc Hạo.', link: '', image: '' },
      { text: 'Khúc Thừa Dụ.', link: '', image: '' },
      { text: 'Khúc Thừa Mỹ.', link: '', image: '' },
      { text: 'Dương Đình Nghệ.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Khúc Thừa Dụ tận dụng nhà Đường suy yếu chiếm đóng phủ Tống Bình tự xưng Tiết độ sứ mở đầu giai đoạn độc lập tự chủ.'
  },
  {
    id: 'g6_q19',
    content: 'Nước Chăm-pa cổ đại được hình thành trên cơ sở nền văn hóa nào của Việt Nam?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Văn hóa Sa Huỳnh.', link: '', image: '' },
      { text: 'Văn hóa Đông Sơn.', link: '', image: '' },
      { text: 'Văn hóa Óc Eo.', link: '', image: '' },
      { text: 'Văn hóa Hòa Bình.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Văn hóa Sa Huỳnh tại miền Trung Việt Nam là tiền thân quan trọng cho sự ra đời của nhà nước cổ đại Lâm Ấp - Chăm-pa.'
  },
  {
    id: 'g6_q20',
    content: 'Tên vị nữ tướng anh hùng lãnh đạo cuộc nổi dậy oanh liệt năm 248 chống quân Đông Ngô cai trị?',
    grade: '6',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Bà Triệu',
    explanation: 'Bà Triệu (Triệu Thị Trinh) với câu nói bất hủ "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ..." khởi nghĩa oanh liệt vùng đất Thanh Hóa.'
  },

  // ĐỊA LÍ (21-40)
  {
    id: 'g6_q21',
    content: 'Kinh tuyến đi qua đài thiên văn Grin-uých (Greenwich, Luân Đôn) có kinh độ bao nhiêu?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Kinh độ 180.', link: '', image: '' },
      { text: 'Kinh độ 90.', link: '', image: '' },
      { text: 'Kinh độ 0 (Kinh tuyến gốc).', link: '', image: '' },
      { text: 'Kinh độ 45.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Theo quy ước quốc tế, kinh tuyến gốc 0 độ đi ngang qua đài thiên văn Greenwich thuộc nước Anh.'
  },
  {
    id: 'g6_q22',
    content: 'Bản đồ có tỷ lệ 1:50.000 có ý nghĩa là gì?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: '1 cm trên bản đồ bằng 50 m ngoài thực tế.', link: '', image: '' },
      { text: '1 cm trên bản đồ bằng 500 m ngoài thực tế.', link: '', image: '' },
      { text: '1 cm trên bản đồ bằng 5.000 m ngoài thực tế.', link: '', image: '' },
      { text: '1 cm trên bản đồ bằng 50.000 cm (hay 500 m) ngoài thực tế.', link: '', image: '' }
    ],
    correctAnswer: 3,
    explanation: 'Tỷ lệ bản đồ 1:50.000 nghĩa là khoảng cách ngoài đời thực gấp 50.000 lần trên giấy. Đổi 50.000 cm = 500 m.'
  },
  {
    id: 'g6_q23',
    content: 'Trái Đất có dạng hình gì theo khoa học trắc địa hiện nay?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Hình vuông.', link: '', image: '' },
      { text: 'Hình tròn dẹt.', link: '', image: '' },
      { text: 'Hình cầu (Ellipsoid tương đối dẹt ở hai cực).', link: '', image: '' },
      { text: 'Hình bầu dục dài.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Trái Đất có hình cầu, hay chính xác hơn là hình Ellipsoid tự quay dẹt hai đầu cực và phình nhẹ ở khu vực xích đạo.'
  },
  {
    id: 'g6_q24',
    content: 'Do Trái Đất tự quay quanh trục từ Tây sang Đông nên các vật chuyển động ở nửa cầu Bắc sẽ bị lệch hướng về phía nào?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Bên phải so với hướng chuyển động.', link: '', image: '' },
      { text: 'Bên trái so với hướng chuyển động.', link: '', image: '' },
      { text: 'Hướng thẳng đứng lên trên.', link: '', image: '' },
      { text: 'Không bị lệch hướng.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Dưới tác dụng của lực Coriolis, ở bán cầu Bắc vật thể chuyển động lệch về tay phải, bán cầu Nam lệch về tay trái.'
  },
  {
    id: 'g6_q25',
    content: 'Lớp manti của Trái Đất ở trạng thái vật chất nào là chủ yếu?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Rắn chắc hoàn toàn.', link: '', image: '' },
      { text: 'Khí loãng.', link: '', image: '' },
      { text: 'Từ quánh dẻo đến lỏng nhẹ bột nhão.', link: '', image: '' },
      { text: 'Lỏng thủy ngân.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Lớp manti nằm sâu từ 5km đến 2900km, dẻo quánh chịu lực nhiệt độ áp suất cực cao tạo ra chuyển động kiến tạo.'
  },
  {
    id: 'g6_q26',
    content: 'Để biểu hiện địa hình trên bản đồ một cách chi tiết, người ta sử dụng đường gì?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Đường ranh giới hành chính.', link: '', image: '' },
      { text: 'Đường kinh tuyến.', link: '', image: '' },
      { text: 'Đường đồng mức (đường đẳng cao).', link: '', image: '' },
      { text: 'Đường xích đạo.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Các đường đồng mức nối các điểm có cùng độ cao so với mực nước biển trung bình giúp hiện thực hóa sườn dốc và thung lũng.'
  },
  {
    id: 'g6_q27',
    content: 'Nước ta nằm hoàn toàn trong múi giờ thứ mấy trên thế giới?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Múi giờ số 5.', link: '', image: '' },
      { text: 'Múi giờ số 6.', link: '', image: '' },
      { text: 'Múi giờ số 7 (GMT+7).', link: '', image: '' },
      { text: 'Múi giờ số 8.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Lãnh thổ Việt Nam nằm gọn trong khu vực múi giờ số 7 (Standard Time Zone UTC +07:00).'
  },
  {
    id: 'g6_q28',
    content: 'Trên bề mặt Trái Đất được phân chia làm bao nhiêu đới khí hậu chính?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: '3 đới (Nhiệt đới, Ôn đới, Hàn đới).', link: '', image: '' },
      { text: '5 đới (1 đới nóng, 2 đới ôn hòa, 2 đới lạnh).', link: '', image: '' },
      { text: '7 đới.', link: '', image: '' },
      { text: '4 đới.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Tương ứng với các vành đai nhiệt, Trái Đất có 5 đới khí hậu: 1 đới nóng (nhiệt đới), 2 đới ôn hòa (ôn đới) và 2 đới lạnh (hàn đới).'
  },
  {
    id: 'g6_q29',
    content: 'Lớp vỏ Trái Đất có độ dày dao động trong khoảng từ 5km đến 70km.',
    grade: '6',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, lớp vỏ Trái Đất rất mỏng so với bán kính Trái Đất, dày từ 5km (ở thềm đại dương) đến 70km (ở vùng núi cao lục địa).'
  },
  {
    id: 'g6_q30',
    content: 'Hiện tượng động đất và núi lửa xảy ra chủ yếu ở ranh giới giữa các mảng kiến tạo di chuyển.',
    grade: '6',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, khu vực tiếp xúc giữa các vỉa mảng thạch quyển dồn ép, trượt xô lệch giải phóng lực năng lượng nén cực lớn.'
  },
  {
    id: 'g6_q31',
    content: 'Thành phần không khí bao gồm khí nitơ chiếm tỷ lệ cao nhất với khoảng bao nhiêu phần trăm?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: '21%.', link: '', image: '' },
      { text: '78%.', link: '', image: '' },
      { text: '1%.', link: '', image: '' },
      { text: '0.03%.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Thành phần không khí gồm: Khí Nitơ (78%), khí Ôxi (21%), hơi nước và các khí khác dồi dào chỉ khoảng 1%.'
  },
  {
    id: 'g6_q32',
    content: 'Độ ẩm không khí là lượng nước dưới dạng hơi tồn tại trong khí quyển.',
    grade: '6',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, hơi nước bốc lên từ biển, đại dương sông ngòi tích tụ lơ lửng hình thành độ ẩm không khí tạo mưa.'
  },
  {
    id: 'g6_q33',
    content: 'Nhiệt độ không khí thay đổi thế nào khi đi lên cao trong tầng đối lưu?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Càng lên cao nhiệt độ càng tăng.', link: '', image: '' },
      { text: 'Trung bình cứ lên cao 100m nhiệt độ giảm 0,6 độ C.', link: '', image: '' },
      { text: 'Không thay đổi gì cả.', link: '', image: '' },
      { text: 'Nhiệt độ giảm đột ngột về âm 100 độ C.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Trong tầng đối lưu, nguồn nhiệt sưởi chủ yếu từ mặt đất bức xạ ngược lên cao nên càng lên cao không khí càng loãng và lạnh đi, giảm 0.6 độ C mỗi 100m.'
  },
  {
    id: 'g6_q34',
    content: 'Nguồn cung cấp nước ngọt chủ yếu cho sông ngòi ao hồ đến từ khí quyển qua hiện tượng gì?',
    grade: '6',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Mưa',
    explanation: 'Nước mưa (hay ngưng kết hơi nước xảy ra rớt xuống đất) là dòng bổ sung tuần hoàn nước chính lưu thông thủy quyển.'
  },
  {
    id: 'g6_q35',
    content: 'Khoáng vật tự nhiên cấu tạo nên lớp vỏ ngoài rắn chắc của Trái Đất gọi là gì?',
    grade: '6',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Đá',
    explanation: 'Lớp thạch quyển rắn cấu tạo chủ yếu từ đá (đá biến chất, đá trầm tích, đá macma).'
  },
  {
    id: 'g6_q36',
    content: 'Tầng khí quyển nằm sát mặt đất, nơi diễn ra hầu hết các hiện tượng thời tiết gió, mưa, mây là gì?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Tầng Bình lưu.', link: '', image: '' },
      { text: 'Tầng Đối lưu.', link: '', image: '' },
      { text: 'Tầng Giữa.', link: '', image: '' },
      { text: 'Tầng Khí loãng ngoài.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Tầng đối lưu chứa tới 80% khối lượng không khí, hầu hết hơi nước mây mù đối lưu sinh ra bão giông sét.'
  },
  {
    id: 'g6_q37',
    content: 'Loại đất phì nhiêu màu mỡ bao bọc bề mặt Trái Đất hỗ trợ cây trồng nảy mầm phát triển sinh trưởng gọi là gì?',
    grade: '6',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Thổ nhưỡng',
    explanation: 'Thổ nhưỡng (hay lớp đất) có đặc tính sinh học quan trọng nhất là độ phì, cung cấp dinh dưỡng nuôi thực vật.'
  },
  {
    id: 'g6_q38',
    content: 'Đại dương nào có diện tích lớn nhất trên hành tinh chúng ta hiện nay?',
    grade: '6',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Thần Đại Dương.', link: '', image: '' },
      { text: 'Đại Tây Dương.', link: '', image: '' },
      { text: 'Thái Bình Dương.', link: '', image: '' },
      { text: 'Ấn Độ Dương.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Thái Bình Dương chiếm tới gần 1/3 diện tích bề mặt Trái Đất, lớn hơn toàn bộ diện tích đất nổi gộp lại.'
  },
  {
    id: 'g6_q39',
    content: 'Gió là sự chuyển động của các luồng khí từ nơi có áp cao về nơi có áp thấp.',
    grade: '6',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, chênh lệch áp suất khí quyển bề mặt Trái Đất thúc đẩy luồng không khí dịch chuyển nằm ngang sinh khí lưu tạo thành gió.'
  },
  {
    id: 'g6_q40',
    content: 'Đường vạch phân chia giả định chia Trái Đất thành hai bán cầu Bắc và Nam có tên là gì?',
    grade: '6',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Xích đạo',
    explanation: 'Đường xích đạo (vĩ tuyến gốc 0 độ) là vòng tròn lớn nhất vuông góc với trục tự quay Trái Đất.'
  }
];

export const GRADE_7_QUESTIONS: Question[] = [
  // LỊCH SỬ (1-20)
  {
    id: 'g7_q1',
    content: 'Nền kinh tế trong các lãnh địa phong kiến Tây Âu có đặc điểm nổi bật nào?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Kinh tế hàng hóa năng động.', link: '', image: '' },
      { text: 'Kinh tế nông nghiệp tự cấp tự túc đóng kín.', link: '', image: '' },
      { text: 'Kinh tế công nghiệp chế tạo cơ khí.', link: '', image: '' },
      { text: 'Buôn bán quốc tế phát triển sầm uất.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Mỗi lãnh địa phong kiến là một đơn vị kinh tế tự lực tự cường gần như không trao đổi hàng hóa với bên ngoài ngoại trừ muối sắt.'
  },
  {
    id: 'g7_q2',
    content: 'Ai là người thống nhất các bộ lạc Mông Cổ lập nên đế quốc Mông Cổ hùng mạnh năm 1206?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Hốt Tất Liệt.', link: '', image: '' },
      { text: 'Oa Khanh.', link: '', image: '' },
      { text: 'Thành Cát Tư Hãn (Thiết Mộc Chân).', link: '', image: '' },
      { text: 'Bát Đô.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Thiết Mộc Chân thống nhất thảo nguyên xanh thiết lập kỉ cương và được suy tôn danh hiệu Thành Cát Tư Hãn lừng lẫy.'
  },
  {
    id: 'g7_q3',
    content: 'Vương triều nào ở lịch sử Việt Nam đã 3 lần đẩy lùi thành công kháng chiến chống quân Nguyên - Mông?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Nhà Lý.', link: '', image: '' },
      { text: 'Nhà Trần.', link: '', image: '' },
      { text: 'Nhà Lê Sơ.', link: '', image: '' },
      { text: 'Nhà Nguyễn.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Triều đại nhà Trần dưới sự lãnh đạo tài tình của các vua Trần và Quốc công Tiết chế Trần Hưng Đạo đã đại thắng vào các năm 1258, 1285, 1288.'
  },
  {
    id: 'g7_q4',
    content: 'Vị vua anh hùng khai sinh ra nhà Lê Sơ và lãnh đạo cuộc khởi nghĩa Lam Sơn thắng lợi là ai?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Lê Thái Tổ (Lê Lợi).', link: '', image: '' },
      { text: 'Lê Thánh Tông.', link: '', image: '' },
      { text: 'Lê Hiến Tông.', link: '', image: '' },
      { text: 'Lê Nhân Tông.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Lê Lợi dựng cờ khởi nghĩa tạiLam Sơn, Thanh Hóa suốt 10 năm gian khổ nếm mật nằm gai đánh bại quân Minh xâm lược.'
  },
  {
    id: 'g7_q5',
    content: 'Phong trào Văn hóa Phục hưng (thế kỷ XIV - XVII) bắt nguồn đầu tiên từ quốc gia nào?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Nước Anh.', link: '', image: '' },
      { text: 'Nước Pháp.', link: '', image: '' },
      { text: 'Nước Ý (Italia).', link: '', image: '' },
      { text: 'Nước Đức.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Phong trào khôi phục rực rỡ văn minh cổ đại Hy Lạp - La Mã nổ ra sớm nhất tại các đô thị miền bắc nước Ý.'
  },
  {
    id: 'g7_q6',
    content: 'Thời Lê Sơ (thế kỷ XV), giai cấp có vị thế kinh tế xã hội và quyền lực tối cao là ai?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Thương nhân đô thị.', link: '', image: '' },
      { text: 'Địa chủ phong kiến và quý tộc tôn thất.', link: '', image: '' },
      { text: 'Nông dân cầy thuê.', link: '', image: '' },
      { text: 'Thợ thủ công làng nghề.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Địa chủ và quý tộc quan lại quân đội sở hữu hầu hết ruộng đất điền trang cai trị tuyệt đối nông dân nghèo.'
  },
  {
    id: 'g7_q7',
    content: 'Nước Đại Cồ Việt thời Đinh - Tiền Lê đóng đô tại vùng sơn thủy hữu tình nào?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Hoa Lư',
    explanation: 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân lên ngôi Hoàng đế dựng đô tại thung lũng đá vôi Hoa Lư (Ninh Bình) kiên cố.'
  },
  {
    id: 'g7_q8',
    content: 'Sách "Bình Ngô Đại Cáo" được ví như bản tuyên ngôn độc lập thứ hai của dân tộc Việt Nam do ai soạn thảo?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Nguyễn Trãi',
    explanation: 'Thay lời Lê Lợi sau đại thắng quân Minh, Nguyễn Trãi viết áng thiên cổ hùng văn tuyên cáo giành lại non sông độc lập tự chủ.'
  },
  {
    id: 'g7_q9',
    content: 'Đại Việt thời Lý đã ban hành bộ luật thành văn đầu tiên của nước ta có tên là gì?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Hình thư',
    explanation: 'Bộ luật Hình Thư biên soạn ban hành dưới thời vua Lý Thái Tông năm 1042 đặt nền móng pháp luật chính quy.'
  },
  {
    id: 'g7_q15',
    content: 'Người mở đầu phong trào cải cách tôn giáo chống lại quyền uy của giáo hoàng là Martin Luther người Đức.',
    grade: '7',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, linh mục Martin Luther dán 95 luận đề chỉ trích việc bán vé xá tội của Giáo hội năm 1517.'
  },
  {
    id: 'g7_q11',
    content: 'Lý Công Uẩn dời đô từ Hoa Lư về thành Đại La (sau gọi là Thăng Long) vào năm nào?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Năm 980.', link: '', image: '' },
      { text: 'Năm 1010.', link: '', image: '' },
      { text: 'Năm 1009.', link: '', image: '' },
      { text: 'Năm 1225.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Năm Canh Tuất 1010, Lý Thái Tổ ban Chiếu dời đô nhận định thế đất Thăng Long rồng cuộn hổ ngồi, mưu toan nghiệp lớn muôn đời.'
  },
  {
    id: 'g7_q12',
    content: 'Trận chiến phòng thủ vĩ đại chống Tống trên phòng tuyến sông Như Nguyệt do danh tướng nào chỉ huy?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Lý Thường Kiệt.', link: '', image: '' },
      { text: 'Trần Hưng Đạo.', link: '', image: '' },
      { text: 'Lê Hoàn.', link: '', image: '' },
      { text: 'Lý Kế Nguyên.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Thái úy Lý Thường Kiệt chặn đứng quân Tống tại phòng tuyến sông Cầu sấm truyền bài thơ thần "Nam quốc sơn hà Nam đế cư".'
  },
  {
    id: 'g7_q13',
    content: 'Vào thời Lý, đạo giáo, Phật giáo và Nho giáo cùng phát triển song hành tạo nên hiện tượng gì?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Tam giáo đồng nguyên.', link: '', image: '' },
      { text: 'Độc tôn Nho học.', link: '', image: '' },
      { text: 'Đại thừa tuyệt đối.', link: '', image: '' },
      { text: 'Văn hóa ngoại lai phủ bóng.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Tam giáo đồng nguyên thể hiện tinh thần bao dung văn hóa của người Việt xưa khi cả ba tư tưởng đều hòa nhập bổ trợ cho nhau.'
  },
  {
    id: 'g7_q14',
    content: 'Chữ Quốc ngữ Latinh ngày nay bắt đầu được manh nha sáng tạo và truyền bá vào nước ta từ thế kỷ nào?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Thế kỷ XVII.', link: '', image: '' },
      { text: 'Thế kỷ XV.', link: '', image: '' },
      { text: 'Thế kỷ XIX.', link: '', image: '' },
      { text: 'Thế kỷ XIII.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Các giáo sĩ phương Tây (như Alexandre de Rhodes) đến truyền giáo từ thế kỷ XVII phối hợp với giáo dân việt bản địa ghi âm tiếng Việt bằng chữ cái Latinh.'
  },
  {
    id: 'g7_q10',
    content: 'Cuộc cải cách hành chính toàn diện của nhà Hồ đầu thế kỷ XV do Hồ Quý Ly thực thi bao gồm việc phát hành tiền giấy.',
    grade: '7',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Hồ Quý Ly ban hành tiền giấy "Thông bảo hội sao" năm 1396 thay thế hoàn toàn tiền đồng cũ để tích trữ kim loại.'
  },
  {
    id: 'g7_q16',
    content: 'Thương cảng quốc tế sầm uất nổi tiếng nhất Đại Việt thời Lý - Trần nằm ở tỉnh Quảng Ninh ngày nay tên là gì?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Vân Đồn.', link: '', image: '' },
      { text: 'Phố Hiến.', link: '', image: '' },
      { text: 'Hội An.', link: '', image: '' },
      { text: 'Lạch Trường.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Cảng xã đảo Vân Đồn thành lập từ năm 1149 đón sầm uất thuyền bè Trung Quốc, Nhật Bản, các nước Đông Nam Á giao thương.'
  },
  {
    id: 'g7_q17',
    content: 'Đại Việt Sử Ký Toàn Thư là bộ chính sử danh tiếng thời Lê Sơ do ai biên khảo chủ trì soạn thảo?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Ngô Sĩ Liên.', link: '', image: '' },
      { text: 'Lê Văn Hưu.', link: '', image: '' },
      { text: 'Trần Trọng Kim.', link: '', image: '' },
      { text: 'Phan Huy Chú.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Nhà sử học Ngô Sĩ Liên giữ chức Quốc Tử Giám Tư nghiệp hoàn thành bộ sử đồ sộ ghi chép từ Hồng Bàng đến thời đầu của Lê Thái Tổ.'
  },
  {
    id: 'g7_q18',
    content: 'Lãnh tụ tối cao của cuộc khởi nghĩa Yên Thế chống thực dân Pháp oanh liệt kéo dài 30 năm là Hoàng Hoa Thám.',
    grade: '7',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Hoàng Hoa Thám (Đề Thám) là linh hồn chỉ huy tài ba căn cứ nghĩa quân nông dân Yên Thế khống chế giặc Pháp.'
  },
  {
    id: 'g7_q19',
    content: 'Thời kỳ huy hoàng của vương triều Ăng-co của Campuchia kéo dài từ thế kỷ IX đến thế kỷ XV.',
    grade: '7',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, thời kỳ này đế quốc Khmer phát triển vượt bậc, xây dựng quần thể đền tháp Angkor Wat, Angkor Thom rực rỡ.'
  },
  {
    id: 'g7_q20',
    content: 'Tên trường đại học đầu tiên của Việt Nam được xây dựng dưới triều Lý là gì?',
    grade: '7',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Quốc Tử Giám',
    explanation: 'Văn Miếu xây năm 1070 dựng bia thờ Khổng Tử; năm 1076 lập Quốc Tử Giám bên cạnh dạy học cho hoàng tử, quan lại.'
  },

  // ĐỊA LÍ (21-40)
  {
    id: 'g7_q21',
    content: 'Châu Âu là châu lục nằm hoàn toàn ở bán cầu nào và giáp đại dương nào ở phía Bắc?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Bán cầu Nam, giáp Ấn Độ Dương.', link: '', image: '' },
      { text: 'Bán cầu Bắc, giáp Bắc Băng Dương.', link: '', image: '' },
      { text: 'Bán cầu Tây, giáp Thái Bình Dương.', link: '', image: '' },
      { text: 'Bán cầu Đông, giáp Đại Tây Dương.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Châu Âu nằm trọn ở bán cầu Bắc, giới hạn phía Bắc mở hướng đón cái rét buốt của Bắc Băng Dương lạnh giá.'
  },
  {
    id: 'g7_q22',
    content: 'Kiểu thảm thực vật nổi bật và rộng lớn bao phủ hầu hết vùng ôn đới bán khô hạn ở nội địa châu Á là gì?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Rừng rậm nhiệt đới ẩm rộng.', link: '', image: '' },
      { text: 'Thảo nguyên và hoang mạc hoang mạc gặm cỏ.', link: '', image: '' },
      { text: 'Đài nguyên rêu ẩm ướt.', link: '', image: '' },
      { text: 'Rừng lá kim Taiga rậm rạp.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Nằm sâu trong nội địa châu Á rộng lớn chịu hiệu ứng che chắn địa văn, khí hậu lục địa khắc nghiệt hình thành thảo nguyên, hoang mạc Gobi.'
  },
  {
    id: 'g7_q23',
    content: 'Hồ nước ngọt sâu nhất và có thể tích nước lớn nhất thế giới nằm ở vùng Siberi Liên bang Nga tên là gì?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Hồ Victoria.', link: '', image: '' },
      { text: 'Hồ Baikal.', link: '', image: '' },
      { text: 'Hồ Thượng (Superior).', link: '', image: '' },
      { text: 'Biển Chết.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Baikal là kỳ quan hồ kiến tạo sâu hơn 1600m, nơi lưu giữ gần 20% lượng nước ngọt không đóng băng của bề mặt Trái Đất.'
  },
  {
    id: 'g7_q24',
    content: 'Quốc gia nào ở châu Á có dân số lớn nhất và quy mô nền kinh tế lớn thứ hai thế giới hiện nay?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Ấn Độ.', link: '', image: '' },
      { text: 'Nhật Bản.', link: '', image: '' },
      { text: 'Trung Quốc.', link: '', image: '' },
      { text: 'Hàn Quốc.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Trung Quốc là nền kinh tế phát triển thần tốc khổng lồ ở Đông Á, sở hữu lượng dân số cực lớn đồng hành cạnh tranh trực tiếp kinh tế toàn cầu.'
  },
  {
    id: 'g7_q25',
    content: 'Châu Phi có khí hậu khô nóng nhất hành tinh chủ yếu do nguyên nhân vĩ độ nào sau đây?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Đường xích đạo chạy cắt gần chính giữa châu lục, đại bộ phận lãnh thổ nằm giữa hai chí tuyến.', link: '', image: '' },
      { text: 'Châu lục này có địa hình đồng bằng thấp kéo dài.', link: '', image: '' },
      { text: 'Sông ngòi châu Phi quá nhỏ bé hiếm nước.', link: '', image: '' },
      { text: 'Lãnh thổ hẹp bị nước biển bao vây.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Zon nóng chí tuyến bao phủ hơn 70% đại địa châu Phi chịu áp cao xích đạo dồn nén sấy khô hình thành xavan và sa mạc Sahara.'
  },
  {
    id: 'g7_q26',
    content: 'Hoang mạc lớn nhất, nóng bỏng khô cằn nhất thế giới nằm trải dài ở khu vực Bắc Phi có tên là gì?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Hoang mạc Gobi.', link: '', image: '' },
      { text: 'Hoang mạc Kalahari.', link: '', image: '' },
      { text: 'Hoang mạc Sahara.', link: '', image: '' },
      { text: 'Hoang mạc Atacama.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Sahara là sa mạc cát bụi khô cằn cực độ rộng gần 9 triệu km2 với điều kiện thời tiết nhiệt đới khắc nghiệt.'
  },
  {
    id: 'g7_q27',
    content: 'Châu sông dài nhất thế giới chảy qua nhiều quốc gia châu Phi đón phù sa tưới tiêu trù phú dồi dào là sông gì?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Sông Amazon.', link: '', image: '' },
      { text: 'Sông Mê Kông.', link: '', image: '' },
      { text: 'Sông Hằng.', link: '', image: '' },
      { text: 'Sông Nin (Nile).', link: '', image: '' }
    ],
    correctAnswer: 3,
    explanation: 'Sông Nin dài khoảng 6.650 km, là chiếc nôi dòng sữa mẹ nuôi dưỡng bền bỉ toàn bộ nền đại văn minh cổ Ai Cập cổ đại.'
  },
  {
    id: 'g7_q28',
    content: 'Châu Nam Cực được biết đến là châu lục lạnh nhất, lộng gió bão tuyết khô cằn bao quanh phủ băng mạt tuyết dày đặc quanh năm.',
    grade: '7',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Nam Cực là "hoang mạc lạnh" khổng lồ của hành tinh, bị cô lập bởi hải lưu vòng cực quanh năm âm độ C.'
  },
  {
    id: 'g7_q29',
    content: 'Hệ thống núi trẻ Andes sừng sững cao lớn kéo dài chạy dọc rìa Tây của châu lục nào?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Bắc Mỹ.', link: '', image: '' },
      { text: 'Nam Mỹ.', link: '', image: '' },
      { text: 'Châu Đại Dương.', link: '', image: '' },
      { text: 'Châu Phi.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Andes là dãy núi lục địa dài nhất thế giới, kéo dãn hơn 7000km dọc sườn hông hướng tây vương quốc cổ Inca rực rỡ ở Nam Mỹ.'
  },
  {
    id: 'g7_q30',
    content: 'Châu Đại Dương là vùng đất cô lập được cấu tạo gồm đại lục Ô-xtrây-li-a và hàng vạn đảo nhỏ giữa đại dương nào?',
    grade: '7',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Thái Bình Dương',
    explanation: 'Đại bộ phận châu Đại Dương trải rộng trên lòng chảo biển ấm xanh của Thái Bình Dương rộng lớn.'
  },
  {
    id: 'g7_q31',
    content: 'Rừng rậm Amazon lớn nhất thế giới, được coi là "lá phổi xanh của hành tinh" nằm tập trung chủ yếu ở quốc gia nào?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Mã Lai.', link: '', image: '' },
      { text: 'Hoa Kỳ.', link: '', image: '' },
      { text: 'Bra-xin (Brazil).', link: '', image: '' },
      { text: 'Ai Cập.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Brazil sở hữu tới hơn 60% tổng diện tích lãnh thổ thảm xanh xích đạo Amazon ngậm nước dồi dào tài nguyên sinh vật.'
  },
  {
    id: 'g7_q32',
    content: 'Châu Âu là châu lục đông dân nhất hành tinh hiện nay.',
    grade: '7',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 1,
    explanation: 'Sai, châu Á mới là châu lục đông dân đông đúc gấp nhiều lần châu Âu (chiếm khoảng 60% dân số thế giới).'
  },
  {
    id: 'g7_q33',
    content: 'Kênh đào Suez nhân tạo nổi tiếng nối liền biển Địa Trung Hải với Hồng Hải giúp rút ngắn hải hành giữa Âu và Á đi qua châu nào?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Châu Đại Dương.', link: '', image: '' },
      { text: 'Châu Mỹ.', link: '', image: '' },
      { text: 'Châu Phi (Ai Cập).', link: '', image: '' },
      { text: 'Châu Nam Cực.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Xẻ dọc eo đất Suez thuộc lãnh thổ đông bắc Ai Cập châu Phi giúp tàu bè tiết kiệm cả vạn dặm vòng qua mũi Hảo Vọng.'
  },
  {
    id: 'g7_q34',
    content: 'Loại thú độc đáo đặc hữu của châu Đại Dương có túi trước bụng bảo bọc nuôi con non bú mớm tự nhiên là loài gì?',
    grade: '7',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Kangaroo',
    explanation: 'Kangaroo (chuột túi chân to nhảy cao) là biểu tượng hoang dã trứ danh đại diện xứ sở ô-xtrây-li-a khô cằn.'
  },
  {
    id: 'g7_q35',
    content: 'Vĩ tuyến lớn nhất thế giới chia vòm cầu Trái đất làm hai hướng khí hậu xích đạo nóng rát xấp xỉ 0 độ gọi là đường gì?',
    grade: '7',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Xích đạo',
    explanation: 'Đường xích đạo ôm quanh tâm phình Trái đất nhận bức xạ mặt trời góc thẳng đứng nóng ẩm cao.'
  },
  {
    id: 'g7_q36',
    content: 'Khí hậu cực đới khắc nghiệt, nhiệt độ trung bình luôn dưới mức đóng băng là nét đặc trưng của châu lục nào?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Châu Âu.', link: '', image: '' },
      { text: 'Châu Phi.', link: '', image: '' },
      { text: 'Châu Nam Cực.', link: '', image: '' },
      { text: 'Châu Á.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Nam Cực không có cư dân sinh sống vĩnh viễn, đây là thung lũng băng khổng lồ lộng gió bão cát trắng xóa lạnh buốt âm độ.'
  },
  {
    id: 'g7_q37',
    content: 'Dãy Himalaya lừng lững với đỉnh Everest cao nhất thế giới nằm ở ranh giới phía bắc của khu vực nào?',
    grade: '7',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Trung Á.', link: '', image: '' },
      { text: 'Ấn Độ (Nam Á) và Tây Tạng (Trung Quốc).', link: '', image: '' },
      { text: 'Đông Nam Á.', link: '', image: '' },
      { text: 'Tây Á.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Va chạm giữa mảng Ấn-Úc xô đẩy cứng cáp mảng Á-Âu đùn cao nếp gấp thạch tháp sừng sững tuyết trắng Everest.'
  },
  {
    id: 'g7_q38',
    content: 'Quốc gia láng giềng phía tây của Việt Nam nổi bật với di tích Phật giáo Ăng-co Wat linh thiêng cổ kính mang tên gì?',
    grade: '7',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Campuchia',
    explanation: 'Vương quốc Campuchia nằm giáp tây nam ranh giới Việt Nam phồn vinh di sản đền đài sừng sững Angkor cổ kính.'
  },
  {
    id: 'g7_q39',
    content: 'Hiện tượng xói mòn sa mạc hóa đất nông nghiệp đang là thách thức sinh thái trực diện gai góc ở rìa hoang mạc Sahara.',
    grade: '7',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, hạn hán kéo dài phối hợp thói quen chăn thả bừa bãi vắt kiệt vành đai cỏ rậm, sa mạc hóa lấn lướt mạnh màu mỡ.'
  },
  {
    id: 'g7_q40',
    content: 'Thành phố tài chính bận rộn bậc nhất thế giới mang tính toàn cầu nằm bên dòng sông Thames nước Anh là thành phố nào?',
    grade: '7',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Luân Đôn',
    explanation: 'London cổ kính sầm uất kinh đô sương mù châu Âu, đặt trục định kinh độ Greenwich làm gốc múi giờ quốc tế.'
  }
];

export const GRADE_8_QUESTIONS: Question[] = [
  // LỊCH SỬ (1-20)
  {
    id: 'g8_q1',
    content: 'Cuộc Cách mạng tư sản thế kỷ XVII lật đổ vương triều phong kiến Sác-lơ I thiết lập chế độ Cộng hòa rồi Quân chủ lập hiến nổ ra ở đâu?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Nước Pháp.', link: '', image: '' },
      { text: 'Nước Anh (English Revolution).', link: '', image: '' },
      { text: 'Nước Đức.', link: '', image: '' },
      { text: 'Tây Ban Nha.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Cách mạng tư sản Anh giành địa vị tối thượng cho Quốc hội tư sản liên minh với quý tộc mới đánh đổ phong kiến chuyên chế Stuart.'
  },
  {
    id: 'g8_q2',
    content: 'Tuyên ngôn Độc lập của Hoa Kỳ được công bố vào ngày tháng năm nào lịch sử?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: '14/07/1789.', link: '', image: '' },
      { text: '04/07/1776.', link: '', image: '' },
      { text: '20/10/1800.', link: '', image: '' },
      { text: '02/09/1945.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Ngày 4/7/1776, đại diện 13 thuộc địa Anh tại Bắc Mỹ công bố Tuyên ngôn Độc lập khẳng định quyền sống, quyền tự do và quyền mưu cầu hạnh phúc.'
  },
  {
    id: 'g8_q3',
    content: 'Cuộc khởi nghĩa vũ trang oai hùng nào bùng bổ quyết liệt nhất cuối năm 1885 hưởng ứng dụ Cần Vương chống Pháp của Tôn Thất Thuyết?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Khởi nghĩa Hương Khê (Hà Tĩnh).', link: '', image: '' },
      { text: 'Khởi nghĩa Bãi Sậy.', link: '', image: '' },
      { text: 'Khởi nghĩa Yên Thế.', link: '', image: '' },
      { text: 'Khởi nghĩa Ba Đình.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Khởi nghĩa Hương Khê do Phan Đình Phùng và Cao Thắng lãnh đạo kéo dài 10 năm oanh liệt, vũ trang quy củ tự đúc được súng trường.'
  },
  {
    id: 'g8_q4',
    content: 'Thực dân Pháp bắt đầu nổ súng chính thức tấn công xâm lược nước ta đầu tiên tại cửa biển nào?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Cửa biển Thuận An (Huế).', link: '', image: '' },
      { text: 'Cửa biển Đà Nẵng (1858).', link: '', image: '' },
      { text: 'Sông Bạch Đằng.', link: '', image: '' },
      { text: 'Cần Giờ (Gia Định).', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Chiều ngày 31/8 và rạng sáng 1/9/1858, liên quân Pháp-Tây Ban Nha nổ súng nã đạn đại bác tấn công bán đảo Sơn Trà, Đà Nẵng.'
  },
  {
    id: 'g8_q5',
    content: 'Ai là người chế tạo thành công chiếc xe lửa (đầu máy xe lửa chạy hơi nước) đầu tiên trên thế giới năm 1814?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'James Watt.', link: '', image: '' },
      { text: 'Robert Fulton.', link: '', image: '' },
      { text: 'George Stephenson.', link: '', image: '' },
      { text: 'Henry Ford.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Kỹ sư người Anh Stephenson đã cách mạng hóa vận tải đường sắt bằng việc chế tạo thành công xe lửa đầu máy nén hơi dũng mãnh.'
  },
  {
    id: 'g8_q6',
    content: 'Những đại diện kiệt xuất đề xuất tư tưởng Khai sáng tiến bộ giải phóng loài người thời đại Cách mạng Pháp là ai?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Montesquieu, Voltaire, Rousseau.', link: '', image: '' },
      { text: 'Marx, Engels, Lenin.', link: '', image: '' },
      { text: 'Newton, Galileo, Copernicus.', link: '', image: '' },
      { text: 'Shakespeare, Goethe, Dante.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Bộ ba triết gia vĩ đại Pháp Montesquieu, Voltaire và Rousseau đã khai sáng dân trí, công kích dữ dội thế lực chuyên chế tối tăm.'
  },
  {
    id: 'g8_q7',
    content: 'Chiến trường quyết giữ thành Hà Nội nếm mật phục kích giết tướng giặc Pháp Garnier và Riviere nổi danh là trận gì?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Cầu Giấy',
    explanation: 'Quân dân Hà Nội phối hợp quân Cờ đen của Lưu Vĩnh Phúc chiến thắng vang dội tại trận địa Cầu Giấy (1873 và 1883) hạ sát tướng giặc.'
  },
  {
    id: 'g8_q8',
    content: 'Ai là vị vua trẻ ban dụ Cần Vương kêu cứu văn thân hào kiệt cả nước đồng lòng khởi nghĩa đánh Pháp cứu quốc năm 1885?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Hàm Nghi',
    explanation: 'Lên ngọn mật thất Tân Sở, dưới sự phò tá phái chủ chiến Tôn Thất Thuyết, hoàng đế trẻ Hàm Nghi dũng cảm kháng chiến.'
  },
  {
    id: 'g8_q9',
    content: 'Vào năm 1862, triều đình nhà Nguyễn đã ký với Pháp hiệp ước đầu tiên nhượng 3 tỉnh Đông Nam Kỳ tên là gì?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Nhâm Tuất',
    explanation: 'Hiệp ước Nhâm Tuất 1862 bộc lộ thái độ thỏa hiệp non nớt đớn hèn của giai cấp phong kiến dâng đất Biên Hòa, Gia Định, Định Tường cho giặc.'
  },
  {
    id: 'g8_q10',
    content: 'Máy hơi nước toàn diện hoàn chỉnh hoạt động liên tục siêu công vụ do James Watt cải tiến thành công năm 1784.',
    grade: '8',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, James Watt đã có đóng góp cốt tử chuyển đổi nền sản xuất thủ công khép kín sang nền đại công nghiệp năng động tự động.'
  },
  {
    id: 'g8_q11',
    content: 'Tổ chức cách mạng yêu nước Đông kinh Nghĩa thục thành lập năm 1907 mục tiêu canh tân đất nước do ai sáng lập?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Lương Văn Can và Nguyễn Quyền.', link: '', image: '' },
      { text: 'Phan Bội Châu.', link: '', image: '' },
      { text: 'Phan Châu Trinh.', link: '', image: '' },
      { text: 'Nguyễn Thái Học.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Một trường tư thục canh tân bài trừ hủ tục hèn kém, dạy chữ quốc ngữ, thúc đẩy trí thức tự lực tại kinh đô Hà Nội.'
  },
  {
    id: 'g8_q12',
    content: 'Phong trào Đông Du (1905 - 1908) đưa thanh niên yêu nước sang Nhật bản học tập là sáng kiến tâm huyết của ai?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Phan Bội Châu.', link: '', image: '' },
      { text: 'Phan Châu Trinh.', link: '', image: '' },
      { text: 'Huỳnh Thúc Kháng.', link: '', image: '' },
      { text: 'Nguyễn Tất Thành.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Nhà yêu nước Phan Bội Châu thành lập Hội Duy Tân, vận động phong trào đưa sĩ tử xuất dương học kĩ nghệ quân sự chuẩn bị khởi nghĩa vũ trang.'
  },
  {
    id: 'g8_q13',
    content: 'Chiến tranh thế giới thứ nhất bùng nổ kéo dài bóc lột đau thương nhân loại vào khoảng năm nào?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: '1914 - 1918.', link: '', image: '' },
      { text: '1939 - 1945.', link: '', image: '' },
      { text: '1858 - 1862.', link: '', image: '' },
      { text: '1900 - 1905.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Cuộc đụng độ Đế quốc phe Hiệp ước (Anh, Pháp, Nga) và phe Liên minh (Đức, Áo-Hung) tranh đoạt thuộc địa tàn khốc.'
  },
  {
    id: 'g8_q14',
    content: 'Vị Tổng thống đầu tiên lẫy lừng khai quốc của Hiệp Chủng Quốc Hoa Kỳ là ai?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'George Washington.', link: '', image: '' },
      { text: 'Thomas Jefferson.', link: '', image: '' },
      { text: 'Abraham Lincoln.', link: '', image: '' },
      { text: 'Benjamin Franklin.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'George Washington là tổng tư lệnh liên quân nghĩa dũng đánh bại quân đội Hoàng gia Anh hào hùng, được tôn vinh lập quốc.'
  },
  {
    id: 'g8_q15',
    content: 'Cuộc Duy tân Minh Trị (Meiji Restoration 1868) tại Nhật Bản biến đất nước mặt trời mọc thành quốc giao công nghiệp hùng mạnh.',
    grade: '8',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Thiên hoàng Minh Trị quyết canh tân đất nước toàn diện từ quân sự, giáo dục, kinh tế học hỏi sâu sắc phương Tây.'
  },
  {
    id: 'g8_q16',
    content: 'Sự kiện mang tính xung kích khởi động cao trào cách mạng Pháp lật đổ cũ là sự kiện quần chúng triệt phá pháo đài nào?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Ngục Bát-ti (Bastille - 14/07/1789).', link: '', image: '' },
      { text: 'Cung điện Versailles.', link: '', image: '' },
      { text: 'Quảng trường Concorde.', link: '', image: '' },
      { text: 'Tháp Eiffel.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Ngục Bastille là biểu tượng tù áp tàn bạo chuyên chế phong kiến Bourbon, bị quần chúng vũ trang dỡ bỏ sập đổ.'
  },
  {
    id: 'g8_q17',
    content: 'Chiến dịch cải cách quốc gia triệt để nhất nửa cuối thế kỷ XIX ở Xiêm (Thái Lan) giúp giữ vững độc lập do nhà vua nào chủ trì?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Chulalongkorn (Rama V).', link: '', image: '' },
      { text: 'Mongkut (Rama IV).', link: '', image: '' },
      { text: 'Bhumibol.', link: '', image: '' },
      { text: 'Vajiralongkorn.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Vua Rama V thực hiện chính sách ngoại giao trung lập tinh tế khôn khéo, cải cách thể chế cứu Xiêm thoát ách thực dân thực sự.'
  },
  {
    id: 'g8_q18',
    content: 'Tôn Trung Sơn là lãnh tụ sáng lập Trung Quốc Đồng minh hội, đề ra học thuyết Tam Dân tiến bộ lập nước Cộng hòa Trung Hoa năm 1912.',
    grade: '8',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, chủ nghĩa Tam Dân gồm "Dân tộc độc lập, Dân quyền tự do, Dân sinh hạnh phúc" thúc đẩy Cách mạng Tân Hợi vĩ đại.'
  },
  {
    id: 'g8_q19',
    content: 'Nghĩa quân khởi nghĩa Yên Thế do Hoàng Hoa Thám lãnh đạo xây dựng chiến lũy hiểm yếu tại vùng đất đồi bạt ngàn nào?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Căn cứ Yên Thế (Bắc Giang).', link: '', image: '' },
      { text: 'Ba Đình (Thanh Hóa).', link: '', image: '' },
      { text: 'Bãi Sậy (Hưng Yên).', link: '', image: '' },
      { text: 'Hương Khê (Hà Tĩnh).', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Vùng rẻo đồi trung du hiểm hẻm Yên Thế, Bắc Giang giáp Lạng Sơn là căn cứ du kích nông dân kiên quật phi phàm.'
  },
  {
    id: 'g8_q20',
    content: 'Vị chí sĩ tài ba can đảm dâng sớ điều trần cải cách lên vua Tự Đức yêu cầu đổi mới mở rộng giao thương cứu quốc là ai?',
    grade: '8',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Nguyễn Trường Tộ',
    explanation: 'Nguyễn Trường Tộ đi nhiều học rộng phương Tây, dâng lên triều đình hàng chục bản điều trần sâu sắc nhưng bị khước từ cay đắng.'
  },

  // ĐỊA LÍ (21-40)
  {
    id: 'g8_q21',
    content: 'Từ điểm cực Bắc xuống điểm cực Nam của nước ta trải dài qua bao nhiêu vĩ độ?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Khoảng 15 vĩ độ.', link: '', image: '' },
      { text: 'Khoảng 7 vĩ độ.', link: '', image: '' },
      { text: 'Khoảng 10 vĩ độ.', link: '', image: '' },
      { text: 'Khoảng 5 vĩ độ.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Cực Bắc tại xã Lũng Cú (23 độ 23 B) xuống cực Nam tại mũi Cà Mau (8 độ 34 B) trải dài gần 15 vĩ độ trên bản đồ.'
  },
  {
    id: 'g8_q22',
    content: 'Địa hình nước ta chủ yếu là đồi núi thấp chiếm tỷ lệ khoảng bao nhiêu diện tích bờ cõi lãnh thổ đất liền?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: '1/2 diện tích.', link: '', image: '' },
      { text: '1/4 diện tích.', link: '', image: '' },
      { text: '3/4 diện tích.', link: '', image: '' },
      { text: '9/10 diện tích.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Đồi núi chiếm tới 3/4 diện tích lãnh thổ Đại Việt, nhưng chủ yếu là đồi núi thấp dưới 1000m phong hóa mịn (85%).'
  },
  {
    id: 'g8_q23',
    content: 'Nhóm đất đai màu mỡ bồi lắng phù sa sông dồi dào che phủ mặt bằng các đồng bằng lớn nước ta chiếm lĩnh tên là gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Đất feralit đỏ vàng.', link: '', image: '' },
      { text: 'Đất phù sa ngọt.', link: '', image: '' },
      { text: 'Đất mùn núi cao.', link: '', image: '' },
      { text: 'Đất mặn ven biển.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Đất phù sa chiếm khoảng 24% phân bố rộng tại Đồng bằng sông Cửu Long và sông Hồng là cái nôi trồng trọt ẩm thủy sản lúa nếp.'
  },
  {
    id: 'g8_q24',
    content: 'Gió mùa Đông Bắc hoạt động mạnh mẽ, mang cái rét căm căm hanh hao lấn át khí hậu chủ yếu ở vùng lãnh thổ nào?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Miền Nam từ đèo Hải Vân hất vào.', link: '', image: '' },
      { text: 'Miền Bắc Việt Nam (từ dãy Bạch Mã hất ra bắc).', link: '', image: '' },
      { text: 'Vùng núi Tây Nguyên khô hạn.', link: '', image: '' },
      { text: 'Chỉ riêng khu vực đảo Phú Quốc.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Gió mùa đông bắc mang khối khí lạnh Siberia xả thẳng vào Bắc Bộ nước ta bị dãy Bạch Mã chặn đứng suy yếu lụi tàn dần.'
  },
  {
    id: 'g8_q25',
    content: 'Dải thềm lục địa biển Việt Nam kéo dãn giàu tài nguyên dầu mỏ và khí đốt nằm dồi dào nhất ở vùng bể trầm tích nào?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Bể trầm tích Cửu Long và Nam Côn Sơn.', link: '', image: '' },
      { text: 'Bể Sông Hồng phía Bắc.', link: '', image: '' },
      { text: 'Bể lượn Hoàng Sa.', link: '', image: '' },
      { text: 'Bể Phú Khánh hải lưu sâu.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Cửu Long và Nam Côn Sơn là hai thềm bồn trũng trầm tích dồi dào chứa mỏ dầu Bạch Hổ, Đại Hùng, Lan Tây xuất khẩu chính.'
  },
  {
    id: 'g8_q26',
    content: 'Vùng khí hậu Đông Trường Sơn dốc đá chịu ảnh hưởng hiệu ứng phơn dữ dội dồn khí nóng rát khô cháy vào mùa hè do khối khí từ đâu?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Khối khí chí tuyến vịnh Bengan vượt dãy Trường Sơn.', link: '', image: '' },
      { text: 'Gió bão Thái Bình Dương.', link: '', image: '' },
      { text: 'Lạnh sương mù phương Bắc dạt dạt.', link: '', image: '' },
      { text: 'Khối khí biển xích đạo ấm ẩm.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Bão không khí Tây Nam vịnh Bengal (gió Lào) băng vượt dải dốc đứng Trường Sơn bị hạ ẩm thăng nhiệt nóng rát thổi trực diện Trung Bộ.'
  },
  {
    id: 'g8_q27',
    content: 'Dãy núi sừng sững cao nhất hùng vĩ nhất của đất nước Việt Nam kiêm đỉnh Fansipan chọc trời tên là gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Dãy Trường Sơn Nam.', link: '', image: '' },
      { text: 'Dãy Hoàng Liên Sơn.', link: '', image: '' },
      { text: 'Cánh cung Đông Triều.', link: '', image: '' },
      { text: 'Dãy núi Pu Đen Đinh.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Hoàng Liên Sơn chạy dài dốc dựng đứng gối đầu Vân Nam, là rặng thạch khối hùng vi nuôi giữ ngọn Fansipan 3.143m kiêu hãnh.'
  },
  {
    id: 'g8_q28',
    content: 'Vùng biển nước ta giàu có dồi dào sinh vật hải sản gồm ba miền luồng lạch ấm áp mặn vừa dẹp giao thương hải hải.',
    grade: '8',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Biển Đông Việt Nam ấm ẩm quanh năm, thông biển rộng là ngư trường dồi dào tài nguyên sinh vật bậc nhất.'
  },
  {
    id: 'g8_q29',
    content: 'Sông Hồng đỏ nặng phù sa sầm uất chảy dài mang phù sa nuôi dưỡng dải đồng bằng phì nhiêu rộng lớn thứ hai nước ta.',
    grade: '8',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Sông Hồng kiến tạo dải đồng bằng Bắc Bộ trù phú từ hàng ngàn năm bồi lấp phù Sa sông đắp đê ngăn lũ.'
  },
  {
    id: 'g8_q30',
    content: 'Tên dòng sông hùng vĩ đóng vai trò phân ranh biên giới hành chính tự nhiên giữa miền Bắc Việt Nam và Trung Quốc ở Lào Cai là sông gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Sông Hồng',
    explanation: 'Khởi thủy từ dãy Ngụy Sơn Trung Quốc chảy vào Việt Nam trực tiếp qua mốc biên giới Lào Cai chảy dọc ra biển.'
  },
  {
    id: 'g8_q31',
    content: 'Hệ thống hang động tự nhiên hùng vĩ lớn bậc nhất thế giới nằm trong vùng karst vườn quốc gia Phong Nha - Kẻ Bàng là hang gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Hang Sơn Đoòng (Quảng Bình).', link: '', image: '' },
      { text: 'Hang Sửng Sốt (Hạ Long).', link: '', image: '' },
      { text: 'Động Phong Nha.', link: '', image: '' },
      { text: 'Động Hương Tích.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Sơn Đoòng đột phá kỷ lục hang động tự nhiên có vách trần cao rộng rừng cây nguyên sinh sông ngầm khổng lồ bên trong.'
  },
  {
    id: 'g8_q32',
    content: 'Xâm thực cơ học mạnh là quá trình bào mòn địa hình vùng sườn núi dốc Việt Nam do lượng mưa mùa hạ xối xả tập trung trút xuống.',
    grade: '8',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, sạt lở xói mòn sâu sườn dốc đồi mất che chắn thảm thực vật cây rừng làm thoái hóa bồi trũng đất đá phù sa.'
  },
  {
    id: 'g8_q33',
    content: 'Vịnh biển kỳ quan thiên nhiên thế giới trứ danh nằm ở vùng biển Đông Bắc Việt Nam có hơn 1900 hòn đảo đá vôi xanh ngọc là vịnh gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Vịnh Vân Phong.', link: '', image: '' },
      { text: 'Vịnh Nha Trang.', link: '', image: '' },
      { text: 'Vịnh Hạ Long.', link: '', image: '' },
      { text: 'Vịnh Cam Ranh.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Vịnh Hạ Long, di sản thiên nhiên kép kiến tạo karst tháp đá vôi nước nổi rực rỡ thu hút du khách muôn phương.'
  },
  {
    id: 'g8_q34',
    content: 'Dạng địa hình hang động thạch nhũ độc đáo hình thành do nước hòa tan đá vôi cacbonat phong phú Việt Nam gọi là địa hình gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Karst',
    explanation: 'Địa hình Karst đá vôi độc đáo sinh ra cảnh quan thạch nhũ trác tuyệt (Phong Nha, Hạ Long, Tràng An).'
  },
  {
    id: 'g8_q35',
    content: 'Hai quần đảo thuộc chủ quyền thiêng liêng ở khơi xa Biển Đông của nước ta mang tên là gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Hoàng Sa và Trường Sa',
    explanation: 'Quần đảo Hoàng Sa (thuộc Đà Nẵng) và Trường Sa (thuộc Khánh Hòa) là một phần xương máu không thể tách rời lãnh thổ Việt Nam.'
  },
  {
    id: 'g8_q36',
    content: 'Đất feralit hình thành chủ yếu trên loại đá nào thích hợp trồng cây công nghiệp lâu năm cà phê, cao su ở Tây Nguyên?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Đá Vôi.', link: '', image: '' },
      { text: 'Đá Sét phong hóa.', link: '', image: '' },
      { text: 'Đá Ba-zan (Basalt).', link: '', image: '' },
      { text: 'Đá Cát kết.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Đá phun trào sẫm Basalt mọc lộ phủ dày Tây Nguyên, phong hóa sinh ra lớp đất đỏ feralit tơi xốp, giữ ẩm việt dã.'
  },
  {
    id: 'g8_q37',
    content: 'Dòng sông ngòi chảy ngược oanh liệt hướng Đông Nam lên Tây Bắc, lưu giữ chiến thắng lịch sử rực rỡ Điện Biên Phủ trên thung lũng của nó?',
    grade: '8',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Sông Cầu.', link: '', image: '' },
      { text: 'Sông Đà.', link: '', image: '' },
      { text: 'Sông Đà và sông Nậm Rốm.', link: '', image: '' },
      { text: 'Sông Mã.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Sông Nậm Rốm ôm quanh lòng chảo Điện Biên hùng vĩ chứng kiến lá cờ đại thắng ném nhào pháo đài giặc Pháp 1954.'
  },
  {
    id: 'g8_q38',
    content: 'Hồ đầm phá nhân tạo chắn sóng tự nhiên hoang sơ lớn bậc nhất khu vực Đông Nam Á nằm sừng sững ở dải ven biển Thừa Thiên Huế tên là gì?',
    grade: '8',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Tam Giang',
    explanation: 'Hệ đầm phá Tam Giang - Cầu Hai tuyệt mỹ dài hơn 70km giữ sinh kế nghề nuôi cá và nuôi trồng thủy sầm uất.'
  },
  {
    id: 'g8_q39',
    content: 'Hiện tượng triều cường xâm nhập mặn đang đe dọa sinh kế trực diện cực kỳ gay gắt tại vùng Đồng bằng sông Cửu Long mỗi mùa khô.',
    grade: '8',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, mực sông giảm sút từ thượng nguồn thúc nước mặn len sâu vào lòng nội ruộng hại lúa sầu riêng mẫn cảm.'
  },
  {
    id: 'g8_q40',
    content: 'Khu vực bãi cát vàng biển nông sầm uất kéo dài nằm ở cực Nam Tổ quốc, địa đầu đón mốc tọa độ GPS đầu tiên là tỉnh thành nào?',
    grade: '8',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Cà Mau',
    explanation: 'Đất mũi Cà Mau đón phù sa lắng bồi không ngừng nâng biên mốc láng hữu hải, vươn khơi bám giữ thềm rạn.'
  }
];

export const GRADE_9_QUESTIONS: Question[] = [
  // LỊCH SỬ (1-20)
  {
    id: 'g9_q1',
    content: 'Sự kiện mở ra thời đại cách mạng vô sản mới giải giải phóng nhân loại năm 1917 lật đổ chế độ Sa hoàng Nga tên là gì?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Cách mạng Tân Hợi Trung Quốc.', link: '', image: '' },
      { text: 'Cách mạng tháng Mười Nga vĩ đại (Russian Revolution).', link: '', image: '' },
      { text: 'Sự kiện sụp đổ bức tường Berlin.', link: '', image: '' },
      { text: 'Công xã Paris oai hùng.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Lênin lãnh đạo Đảng Bolshevik tiến súng nổ dậy chiếm cung điện Mùa Đông lập nên nhà nước Xô Viết công nông liên minh đầu tiên.'
  },
  {
    id: 'g9_q2',
    content: 'Nguyễn Ái Quốc chính thức tìm ra con đường cứu nước giải phóng dân tộc đi theo cách mạng vô sản qua sự kiện lịch sử nào vào năm 1920?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Đọc bản Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lênin.', link: '', image: '' },
      { text: 'Gửi bản Yêu sách của nhân dân An Nam tới Hội nghị Versailles.', link: '', image: '' },
      { text: 'Tham gia sáng lập Đảng Cộng sản Pháp tại Đại hội Tua (Tours).', link: '', image: '' },
      { text: 'Thành lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Qua Luận cương Lênin đăng trên báo Nhân đạo tháng 7/1920, Người reo lên vui sướng mừng rỡ đón nhận con đường giải thoát ách thuộc địa phong kiến.'
  },
  {
    id: 'g9_q3',
    content: 'Đại hội thành lập Đảng Cộng sản Việt Nam thống nhất ba tổ chức cộng sản do ai chủ trì năm 1930?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Trần Phú.', link: '', image: '' },
      { text: 'Nguyễn Ai Quốc (Chủ trì Hội nghị Hương Cảng).', link: '', image: '' },
      { text: 'Lê Hồng Phong.', link: '', image: '' },
      { text: 'Hà Huy Tập.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Nhận ủy quyền của Quốc tế Cộng sản, Nguyễn Ái Quốc triệu tập hội nghị hợp nhất các tổ chức cộng sản thành Đảng duy nhất ngày 3/2/1930 tại Hương Cảng.'
  },
  {
    id: 'g9_q4',
    content: 'Chiến thắng oanh liệt lừng lẫy năm châu chấn động địa cầu đánh bại hoàn toàn thực dân Pháp xâm lược ngày 7/5/1954 là chiến thắng nào?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Chiến thắng Việt Bắc thu đông 1947.', link: '', image: '' },
      { text: 'Chiến dịch Điện Biên Phủ lịch sử.', link: '', image: '' },
      { text: 'Chiến thắng Biên Giới 1950.', link: '', image: '' },
      { text: 'Đại thắng mùa Xuân 1975 dũng mãnh.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Trải qua 56 ngày đêm khoét núi ngủ hầm mưa dầm cơm vắt, đại quân ta diệt pháo đài thép Điện Biên Phủ bắt sống De Castries.'
  },
  {
    id: 'g9_q5',
    content: 'Hiệp định lịch sử ký kết chấm dứt chiến tranh lập lại hòa bình buộc Mỹ rút quân hoàn toàn khỏi Việt Nam năm 1973 là hiệp định nào?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Hiệp định Giơ-ne-vơ (Geneva 1954).', link: '', image: '' },
      { text: 'Hiệp định Pa-ri (Paris Agreement 1973).', link: '', image: '' },
      { text: 'Hiệp ước hựu hảo hữu nghị Việt-Lào.', link: '', image: '' },
      { text: 'Hiệp định sơ bộ 6/3.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Hiệp định Paris năm 1973 ký kết buộc Mỹ cút, ngụy nhào mở ván cờ chót phóng đại thắng tổng tuyển cử quy non sông một mối.'
  },
  {
    id: 'g9_q6',
    content: 'Chiến dịch mang tính quyết định giải phóng hoàn toàn miền Nam, thống nhất giang sơn non sông thu về 1 mối ngày 30/4/1975 là chiến dịch gì?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Chiến dịch Tây Nguyên lẫy lừng.', link: '', image: '' },
      { text: 'Chiến dịch Huế - Đà Nẵng tốc chiến.', link: '', image: '' },
      { text: 'Chiến dịch Hồ Chí Minh lịch sử.', link: '', image: '' },
      { text: 'Khởi nghĩa Đồng Khởi Bến Tre.', link: '', image: '' }
    ],
    correctAnswer: 2,
    explanation: 'Chiến dịch tiến công sấm sét Hồ Chí Minh dồn 5 cánh quân đập tan sào huyệt Sài Gòn, xe tăng hạ gục cổng dinh Độc Lập.'
  },
  {
    id: 'g9_q7',
    content: 'Tổng Bí thư đầu tiên soạn thảo Cương lĩnh chính trị Luận cương cách mạng đầu tiên của Đảng ta năm 1930 là ai?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Trần Phú',
    explanation: 'Trần Phú chủ trì Hội nghị BCH Trung ương lâm thời khởi thảo Luận cương chính trị tháng 10/1920 hy sinh anh quật dặn kiên giữ chí.'
  },
  {
    id: 'g9_q8',
    content: 'Cuộc cách mạng khoa học kỹ thuật hiện đại lần thứ ba bùng nổ mạnh mẽ nửa sau thế kỷ XX với phát minh then chốt nào?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Máy tính điện tử và mạng Internet toàn cầu.', link: '', image: '' },
      { text: 'Động cơ đốt khí trong và dầu mỏ phong phú.', link: '', image: '' },
      { text: 'Đường sắt sắt tầu hỏa sầm uất.', link: '', image: '' },
      { text: 'Thép luyện gang lò thổi khí khô.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Máy tính điện tử, mạch vi xử lý công nghệ cao và dòng chảy internet mở lối kỷ nguyên thế giới phẳng kết nối toàn vòm.'
  },
  {
    id: 'g9_q9',
    content: 'Tổ chức liên kết đa quốc gia lớn bậc nhất hành tinh thiết lập sau chiến tranh thế giới thứ hai năm 1945 duy trì hòa bình là tổ chức nào?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Liên minh châu Âu (EU).', link: '', image: '' },
      { text: 'Liên Hợp Quốc (UN - United Nations).', link: '', image: '' },
      { text: 'Khối liên minh quân sự NATO.', link: '', image: '' },
      { text: 'Diễn đàn kinh tế APEC.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Hiến chương UN thông qua tại San Francisco năm 1945 kiến tạo hệ đa phương định chế giải pháp phân tranh gìn hòa vòm cực thế giới.'
  },
  {
    id: 'g9_q10',
    content: 'Sự kiện ngày 11/9/2001 (khủng bố tòa tháp đôi New York) đã làm thay đổi sâu sắc cục diện an ninh chính trị toàn cầu.',
    grade: '9',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, thảm kịch thúc đẩy trỗi dậy chiến dịch chống khủng bố đa phương hóa của Hoa Kỳ và liên minh quốc tế can dự sâu rộng.'
  },
  {
    id: 'g9_q11',
    content: 'Đại tướng Tổng tư lệnh tối cao chỉ huy trực tiếp đại doanh phá giặc Pháp lừng danh Điện Biên Phủ lẫy lừng thế giới là ai?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Võ Nguyên Giáp',
    explanation: 'Đại tướng huyền thoại Võ Nguyên Giáp trực tiếp thay đổi chiến lược sang "đánh chắc tiến chắc" giành đại thắng rực rỡ sông núi.'
  },
  {
    id: 'g9_q12',
    content: 'Chiến dịch oanh liệt 12 ngày đêm "Điện Biên Phủ trên không" năm 1972 đập tan cuộc tập kích B-52 của đế quốc Mỹ xảy ra trên bầu trời thành phố nào?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Hà Nội',
    explanation: 'Quân dân Hà Nội, Hải Phòng kiên trung quật khởi nã pháo bắn dội hạ rớt hàng chục máy bay chiến lược pháo đài bay siêu hạng.'
  },
  {
    id: 'g9_q13',
    content: 'Đường lối Đổi mới toàn diện cứu vãn nền kinh tế sập đổ tiến lên xã hội chủ nghĩa được Đảng ta vạch ra vào Đại hội lần thứ mấy?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Đại hội VI (1986).', link: '', image: '' },
      { text: 'Đại hội V (1981).', link: '', image: '' },
      { text: 'Đại hội VII (1991).', link: '', image: '' },
      { text: 'Đại hội VIII (1996).', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Đại hội VI tháng 12/1986 nhìn thẳng vào sự thật, xóa cơ chế bao cấp mở cửa kinh tế nhiều thành phần thị trường định hướng XHCN.'
  },
  {
    id: 'g9_q14',
    content: 'Khởi nghĩa giành chính quyền Cách mạng tháng Tám năm 1945 thắng lợi rực rỡ quyết định đóng đô bởi bản khai sinh nước VNDCCH ngày mấy?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Ngày 19/08/1945.', link: '', image: '' },
      { text: 'Ngày 02/09/1945.', link: '', image: '' },
      { text: 'Ngày 30/04/1975.', link: '', image: '' },
      { text: 'Ngày 23/09/1945.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại quảng trường Ba Đình Hà Nội sinh hạ nước Việt Nam Dân chủ Cộng hòa tự do.'
  },
  {
    id: 'g9_q15',
    content: 'Chiến tranh lạnh chính thức chấm dứt sau cuộc gặp mỡ cấp cao tại Malta giữa Mỹ và Liên Xô năm 1989.',
    grade: '9',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, Gorbachev và Bush (cha) nhất trí hạ vũ khí đối phó leo thang bao vây thù địch phân tranh Đông-Tây phá băng căng thẳng.'
  },
  {
    id: 'g9_q16',
    content: 'Đất nước nào là quê hương đầu tiên khởi sinh phong trào giải phóng thuộc địa Á Phi Mỹ La Tinh đấu tranh từ sau chiến tranh 1945?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Cu-ba.', link: '', image: '' },
      { text: 'Việt Nam.', link: '', image: '' },
      { text: 'Ấn Độ.', link: '', image: '' },
      { text: 'Ai Cập.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Khởi nghĩa Tháng Tám và đại thắng chống Pháp 1954 là cột mốc đột phá bẻ gãy mắt xích thực dân yếu thế sụp rạn dây chuyền.'
  },
  {
    id: 'g9_q17',
    content: 'Phong trào đồng loạt nổi dậy vũ trang giật xiềng xích cản phá ách kiềm tỏa Nam Bộ oanh liệt nổi tiếng tại Bến Tre năm 1960 là phong trào gì?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Phong trào Đồng Khởi.', link: '', image: '' },
      { text: 'Chiến tranh cục bộ.', link: '', image: '' },
      { text: 'Khởi nghĩa Yên Bái.', link: '', image: '' },
      { text: 'Khởi nghĩa Ba Tơ.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Mỏ cày Bến Tre nổi sóng Đồng Khởi bẻ xiềng áp thế lực phiến quân tự giải vây nông thôn xây lực lượng Tây Nam.'
  },
  {
    id: 'g9_q18',
    content: 'Bác Hồ đã rời cảng Nhà Rồng đi tìm đường cứu nước vào ngày 5 tháng 6 năm 1911.',
    grade: '9',
    category: 'Lịch sử',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, người thanh niên yêu nước Nguyễn Tất Thành bước chân xuống con tàu buôn Latouche-Treville vươn khơi Tây học tự tìm chân lí.'
  },
  {
    id: 'g9_q19',
    content: 'Cực tăng trưởng kinh tế phát triển nhanh mạnh bậc nhất vùng Đông Bắc Á cuối thế kỷ XX vươn lên thành cường quốc tài chính là gì?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SINGLE',
    options: [
      { text: 'Nhật Bản và 4 rồng kinh tế châu Á.', link: '', image: '' },
      { text: 'Liên bang Nga rệu rã.', link: '', image: '' },
      { text: 'Thái Lan du lịch.', link: '', image: '' },
      { text: 'Các nước Trung Á chăn nuôi.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Hàn quốc, Đài loan, Hồng Kông, Singapore (4 con rồng) cùng làn sóng phục hưng Nhật Bản lập thần kỳ chói sáng Á Đông.'
  },
  {
    id: 'g9_q20',
    content: 'Sự kiện bức tường nào đổ sập cuối năm 1989 đánh dấu chấm hết ranh giới ngăn nước Đức thống nhất hòa một?',
    grade: '9',
    category: 'Lịch sử',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Berlin',
    explanation: 'Bức tường Berlin kiên giam sập đổ đón làn sóng hoa hợp thống nhất Cộng hòa Dân chủ Đức gia nhập Liên bang triệt để.'
  },

  // ĐỊA LÍ (21-40)
  {
    id: 'g9_q21',
    content: 'Vùng kinh tế trọng điểm nòng cốt giàu có dịch vụ, chiếm tỷ trọng GDP khổng lồ dẫn đầu nước ta là vùng nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Vùng Trung du và miền núi Bắc Bộ dốc núi.', link: '', image: '' },
      { text: 'Vùng Đông Nam Bộ (vùng trọng điểm phía Nam).', link: '', image: '' },
      { text: 'Duyên hải Nam Trung Bộ cát rạn.', link: '', image: '' },
      { text: 'Tây Nguyên nắng gió lâm nghiệp.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Đông Nam Bộ sở hữu hạt nhân siêu đô thị TP Hồ Chí Minh sôi động kéo dãn chuỗi khu công nghiệp Đồng Nai Bình Dương khổng lồ.'
  },
  {
    id: 'g9_q22',
    content: 'Đồng bằng sông Cửu Long chiếm thế mạnh đứng đầu cả nước tuyệt đối về chỉ tiêu sản xuất nông nghiệp nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Trồng rừng ngập mặn đước gỗ.', link: '', image: '' },
      { text: 'Sản xuất lúa gạo, nuôi trồng trọt trái cây, thủy sản xuất khẩu.', link: '', image: '' },
      { text: 'Trồng cây công nghiệp chè, thảo dược sữa.', link: '', image: '' },
      { text: 'Chăn nuôi bò sữa sừng cứng.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Là vựa lúa an ninh lương thực quốc gia khổng lồ bồi lắng phù sa sông Mê Kông dồi dào thích ứng kinh tế xuất khẩu.'
  },
  {
    id: 'g9_q23',
    content: 'Nhân tố quyết định thúc đẩy sự phân bố dân cư Việt Nam đồng đều, dạt mỏng bớt đô thị dồn về biên viễn nông thôn là gì?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Sự đa dạng hệ động vật dã thú hoang.', link: '', image: '' },
      { text: 'Chính sách di dân quy hoạch và phát triển kinh tế vùng kinh tế mới.', link: '', image: '' },
      { text: 'Lũ lụt sụt lún sườn đồi.', link: '', image: '' },
      { text: 'Xu hướng thiên tai triều cường sạt biển.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Nhà nước sắp xếp giãn dân quy hoạch dồn lực lượng trẻ lập nghiệp vành đai vành giữ đảo khơi giữ bờ đá biên cương vững.'
  },
  {
    id: 'g9_q24',
    content: 'Đường quốc lộ huyết mạch chạy dọc non sông dài xẻ dọc xương sống Việt Nam từ Hữu Nghị Quan đến Năm Căn là quốc lộ nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Quốc lộ 1A.', link: '', image: '' },
      { text: 'Quốc lộ 14 sườn tây.', link: '', image: '' },
      { text: 'Quốc lộ 5 lạch cảng.', link: '', image: '' },
      { text: 'Đường Hồ Chí Minh đất mở.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Trục giao thương dọc dừa Quốc lộ 1A dài hơn 2.300km, đại huyết quản vận chuyển người hàng hóa thúc đẩy vùng miền xích lại sát.'
  },
  {
    id: 'g9_q25',
    content: 'Vùng Tây Nguyên không giáp biển nhưng giữ vị thế then chốt phòng thủ toàn miền Trung nhờ vị thế địa hình nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Sở hữu nhiều cao nguyên đất đỏ bazan xếp tầng liên tiếp.', link: '', image: '' },
      { text: 'Cửa ngõ thung lũng sông uốn lượn.', link: '', image: '' },
      { text: 'Gần kề các đầm lầy trũng ẩm.', link: '', image: '' },
      { text: 'Hệ chằng chịt cửa lạch đập nước.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Địa hình "mái nhà Đông Dương", hệ cao nguyên bằng xếp tầng hùng vĩ khống chế hoàn toàn dải hẹp duyên hải đón nắng lộng sập sườn.'
  },
  {
    id: 'g9_q26',
    content: 'Trung du miền núi Bắc Bộ giữ trữ lượng khai khoáng lớn nhất nước ta nổi tiếng ở bể chứa than Quảng Ninh đạt loại gì?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Than nâu dẻo.', link: '', image: '' },
      { text: 'Than đá Anthracite chất lượng cao.', link: '', image: '' },
      { text: 'Than bùn mùn nông bồi.', link: '', image: '' },
      { text: 'Cát thạch anh nung lò.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Quảng Ninh nổi tiếng bể vỉa carbon phong phú dồi dào, xuất khẩu tột đỉnh than cám sạch tỏa nhiệt hữu sắc.'
  },
  {
    id: 'g9_q27',
    content: 'Dân tộc Kinh (Việt) chiếm đa số tuyệt đối, chiếm khoảng bao nhiêu phần trăm quy mô cơ cấu dân số nước ta ngày nay?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Khoảng 50%.', link: '', image: '' },
      { text: 'Khoảng 85% (85.3%).', link: '', image: '' },
      { text: 'Khoảng 95%.', link: '', image: '' },
      { text: 'Khoảng 70%.', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Dân tộc Kinh có dân số đông nhất (85.3% dân số cả nước), giữ cư trú tại đồng bằng rìa lạch, đóng vai trò chủ động liên kết.'
  },
  {
    id: 'g9_q28',
    content: 'Lao động Việt Nam phong phú, có ưu điểm thông minh, tiếp thu nhanh kiến thức khoa học kỹ thuật hiện đại sừng sững.',
    grade: '9',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, thị trường lao động nước ta dồi dào trẻ trung thông linh sáng tạo nâng cao kĩ năng tay nghề bệ phóng phát triển.'
  },
  {
    id: 'g9_q29',
    content: 'Du lịch biển, khai thác bến cảng sâu và chế biến thủy hải sản là thế mạnh mũi nhọn số một của khu vực Duyên hải Nam Trung Bộ.',
    grade: '9',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, sườn đá núi ăn sát ngập biển xanh thung cát nắng ấm lý tưởng cho bến cảng, resort dưỡng, muối mặn Ninh Thuận.'
  },
  {
    id: 'g9_q30',
    content: 'Tên con đèo hiểm yếu chia ranh phân cực khí hậu miền Bắc nóng lạnh rạch ròi với miền Nam nắng ràn rạt quanh năm nối liền Thừa Thiên Huế và Đà Nẵng là đèo gì?',
    grade: '9',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Hải Vân',
    explanation: 'Đèo Hải Vân (Ải Vân) cắt ngang dãy núi Bạch Mã tạo bức tường khí hậu ngăn sương muối miền Bắc xộc sâu sấy ấm miền Nam.'
  },
  {
    id: 'g9_q31',
    content: 'Nhà máy thủy điện đầu tiên quy mô lớn sừng sững khánh thành trên dòng sông Đà dạt dào sức nước miền bắc tên là gì?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Thủy điện Hòa Bình.', link: '', image: '' },
      { text: 'Thủy điện Sơn La.', link: '', image: '' },
      { text: 'Thủy điện Trị An.', link: '', image: '' },
      { text: 'Thủy điện Thác Bà.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Thủy điện Hòa Bình khởi động xây dựng dưới trợ lực Liên Xô cũ cắt dòng lũ sông Đà sinh dòng điện thắp sáng rực rỡ non sông.'
  },
  {
    id: 'g9_q32',
    content: 'Hiện tượng xói mòn sườn dốc đồi bạc màu dưỡng chất đang là bài oán thách sinh thái lớn ở vùng đồi trung du Bắc Bộ bạt ngàn.',
    grade: '9',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, trọc hóa cây bụi lâm sinh trút lở đất mùa bão làm bạc màu ngậm dinh dưỡng rễ cây kén giống chịu lở.'
  },
  {
    id: 'g9_q33',
    content: 'Vịnh cảng trung chuyển dầu mỏ tàu bè nước sừng sững sâu bậc nhất nước ta nằm ở cực Nam của vùng duyên hải Trung Bộ là cảng gì?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Cảng Cam Ranh (Khánh Hòa).', link: '', image: '' },
      { text: 'Cảng Hải Phòng sầm.', link: '', image: '' },
      { text: 'Cảng Cái Lân sâu bồi.', link: '', image: '' },
      { text: 'Vũng Tàu đón rạn.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Vịnh nước sâu tự nhiên Cam Ranh có dải bao che chắn gió khổng lồ, là cảng quân sự chiến lược kiên trung của nước ta xưa nay.'
  },
  {
    id: 'g9_q34',
    content: 'Hiện tượng cát lấn cát bay làm mỏng hoại ruộng vườn là mối hiểm sinh thái nông nghiệp trầm ở ven dải ven biển tỉnh thành nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Quảng Bình và Quảng Trị',
    explanation: 'Gió Lào kết hợp bão biển lùa thung cát lấn đất bồi sinh ra dải cồn khô cằn sấy hoại tàn lúa mạ dải Bắc Trung Bộ.'
  },
  {
    id: 'g9_q35',
    content: 'Sông Cổ Chiên, sông Tiền, sông Hậu thuộc hệ thống mạng lưới sông phân chi nào chảy bồi đắp đồng bằng sông Cửu Long ra biển?',
    grade: '9',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Sông Mê Kông',
    explanation: 'Mạng lưới cửu long rộng chia 9 rạch dòng sầm uất tháo lũ bồi dồi đất ngập phù xa của con sông quốc tế Mê Kông vĩ đại.'
  },
  {
    id: 'g9_q36',
    content: 'Khu công nghiệp hóa dầu đầu tiên quy mô khổng lồ của Việt Nam khánh thành tại miền Trung tên là gì?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Dung Quất (Quảng Ngãi).', link: '', image: '' },
      { text: 'Nghi Sơn (Thanh Hóa).', link: '', image: '' },
      { text: 'Long Sơn (Vũng Tàu).', link: '', image: '' },
      { text: 'Cát Lái (TP HCM).', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Nhà máy lọc dầu Dung Quất - Quảng Ngãi là mốc tự lập hóa dầu then chốt bồi đắp nền tảng công nghiệp dũng mãnh tự chủ tài nguyên.'
  },
  {
    id: 'g9_q37',
    content: 'Cây cà phê nổi tiếng nước ta bồi dưỡng danh thơm thế giới mọc tập trung nhiều nhất rộng rợp đất đỏ ở vùng nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SINGLE',
    options: [
      { text: 'Tây Nguyên (Đắk Lắk, Lâm Đồng).', link: '', image: '' },
      { text: 'Tây Bắc bạt ngàn chè.', link: '', image: '' },
      { text: 'Đông Nam Bộ mọc tiêu.', link: '', image: '' },
      { text: 'Đồng bằng sông Hồng rợp lúa.', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Tây Nguyên chiếm tỷ trọng tuyệt đối diện tích cây Robusta cà phê, danh xưng Buôn Ma Thuột bay cao muôn hải cực.'
  },
  {
    id: 'g9_q38',
    content: 'Tuyệt tác ruộng bậc thang uốn lượn đẹp như lụa gấm mây ở vùng cao thung lũng Mù Cang Chải thuộc tỉnh thành nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Yên Bái',
    explanation: 'Huyện Mù Cang Chải, tỉnh Yên Bái thu hút khách mỏ vàng lúa chín mọc uốn lượn uốn khúc tuyệt vời núi trùng.'
  },
  {
    id: 'g9_q39',
    content: 'Bảo vệ rừng đặc dụng đầu nguồn và rừng ngập mặn đầm lầy là nhiệm vụ cốt tử sống còn bền vững của sinh thái ven Biển Đông dạt dào khí hậu.',
    grade: '9',
    category: 'Địa lí',
    type: 'TRUE FALSE',
    correctAnswer: 0,
    explanation: 'Đúng, rừng giữ đất, cản gió giông, bẻ mặn sạt sụt sóng biển bảo vệ trực diện hàng triệu cư dân bờ rạch mẫn.'
  },
  {
    id: 'g9_q40',
    content: 'Tỉnh thành có diện tích trồng cao su thiên nhiên quy mô đồn điền lớn nhất Đông Nam Bộ kề sát biên giới Campuchia là tỉnh nào?',
    grade: '9',
    category: 'Địa lí',
    type: 'SHORT_ANSWER',
    correctAnswer: 'Bình Phước',
    explanation: 'Bình Phước mỏ vàng đất đỏ dồi dào thích ẩm dầy, nuôi những nông trường cao su bạt ngàn thẳng tắp xuất khẩu.'
  }
];

export function get40QuestionsForGrade(grade: string): Question[] {
  let list: Question[] = [];
  if (grade === '6') list = [...GRADE_6_QUESTIONS];
  else if (grade === '7') list = [...GRADE_7_QUESTIONS];
  else if (grade === '8') list = [...GRADE_8_QUESTIONS];
  else list = [...GRADE_9_QUESTIONS];

  // Shuffle the questions list of 40 elements to make it dynamic but keep the list always at exactly 40 questions of History, Geography
  return list
    .sort(() => Math.random() - 0.5)
    .map((q, idx) => ({
      ...q,
      stt: String(idx + 1)
    }));
}
