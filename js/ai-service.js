/**
 * AI EXAM & QUIZ GENERATOR MODULE (CHƯƠNG TRÌNH GDPT 2018 & THÔNG TƯ 27/2020/TT-BGDĐT)
 * Bộ sách chuẩn: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT)
 * Chuẩn định dạng: Ma trận 3 mức độ • Đề thi 3 ô đánh giá • Hướng dẫn chấm chi tiết
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var AIService = {
  // 7 Môn thi chính thức định kỳ Tiểu học
  EXAM_SUBJECTS: {
    TOAN: { id: "TOAN", name: "Toán", grades: [1, 2, 3, 4, 5], icon: "fa-calculator" },
    TIENG_VIET: { id: "TIENG_VIET", name: "Tiếng Việt", grades: [1, 2, 3, 4, 5], icon: "fa-book-open" },
    TIENG_ANH: { id: "TIENG_ANH", name: "Tiếng Anh", grades: [1, 2, 3, 4, 5], icon: "fa-language" },
    KHOA_HOC: { id: "KHOA_HOC", name: "Khoa học", grades: [4, 5], icon: "fa-flask" },
    TNXH: { id: "TNXH", name: "Tự nhiên và Xã hội", grades: [1, 2, 3], icon: "fa-leaf" },
    LICH_SU_DIA_LY: { id: "LICH_SU_DIA_LY", name: "Lịch sử và Địa lý", grades: [4, 5], icon: "fa-earth-americas" },
    TIN_HOC: { id: "TIN_HOC", name: "Tin học", grades: [3, 4, 5], icon: "fa-laptop-code" },
    CONG_NGHE: { id: "CONG_NGHE", name: "Công nghệ", grades: [3, 4, 5], icon: "fa-gears" }
  },

  // Ngân hàng câu hỏi & cấu trúc bài học chuẩn SGK Kết nối tri thức (Offline Smart Bank)
  knttBank: {
    TOAN: {
      topics: ["Số và phép tính", "Hình học và Đo lường", "Giải bài toán thực tế"],
      muc1: [
        { q: "Số gồm 5 trăm, 8 chục và 3 đơn vị được viết là:", options: ["A. 538", "B. 583", "C. 853", "D. 385"], ans: "B", explain: "5 trăm = 500, 8 chục = 80, 3 đơn vị = 3 -> 583." },
        { q: "Số liền sau của số lớn nhất có ba chữ số là:", options: ["A. 998", "B. 990", "C. 1000", "D. 1001"], ans: "C", explain: "Số lớn nhất có 3 chữ số là 999. Số liền sau là 999 + 1 = 1000." },
        { q: "Kết quả của phép tính 245 + 318 là:", options: ["A. 553", "B. 563", "C. 573", "D. 663"], ans: "B", explain: "245 + 318 = 563." },
        { q: "Đoạn thẳng AB dài 1m 5dm. Đổi ra đề-xi-mét là:", options: ["A. 15 dm", "B. 105 dm", "C. 51 dm", "D. 150 dm"], ans: "A", explain: "1m = 10dm, 10dm + 5dm = 15dm." },
        { q: "Hình nào dưới đây có 4 góc vuông và 4 cạnh bằng nhau?", options: ["A. Hình chữ nhật", "B. Hình tam giác", "C. Hình vuông", "D. Hình tròn"], ans: "C", explain: "Hình vuông có 4 góc vuông và 4 cạnh bằng nhau." }
      ],
      muc2: [
        { q: "Tìm x biết: x : 6 = 142 (dư 3). Giá trị của x là:", options: ["A. 852", "B. 855", "C. 850", "D. 825"], ans: "B", explain: "x = 142 x 6 + 3 = 852 + 3 = 855." },
        { q: "Một mảnh đất hình chữ nhật có chiều dài 24m, chiều rộng bằng 1/3 chiều dài. Chu vi mảnh đất là:", options: ["A. 64 m", "B. 32 m", "C. 192 m", "D. 48 m"], ans: "A", explain: "Chiều rộng: 24 : 3 = 8m. Chu vi: (24 + 8) x 2 = 64m." },
        { q: "Một cửa hàng có 150kg gạo, đã bán 1/5 số gạo đó. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?", options: ["A. 30 kg", "B. 120 kg", "C. 130 kg", "D. 100 kg"], ans: "B", explain: "Đã bán: 150 : 5 = 30kg. Còn lại: 150 - 30 = 120kg." }
      ],
      muc3: [
        { q: "Tổng hai số là 180. Nếu thêm vào số lớn 15 đơn vị và bớt ở số bé 15 đơn vị thì tổng hai số lúc sau là:", options: ["A. 195", "B. 165", "C. 180", "D. 210"], ans: "C", explain: "Thêm vào số này bao nhiêu bớt ở số kia bấy nhiêu thì tổng không đổi: 180 + 15 - 15 = 180." },
        { q: "Một lớp học có 36 học sinh. Số bạn nữ gấp đôi số bạn nam. Số bạn nam của lớp đó là:", options: ["A. 12 bạn", "B. 24 bạn", "C. 18 bạn", "D. 9 bạn"], ans: "A", explain: "Tổng số phần bằng nhau: 1 + 2 = 3 phần. Số nam: 36 : 3 = 12 bạn." }
      ],
      essay: [
        {
          title: "Bài 1 (2,0 điểm - Mức 2): Đặt tính rồi tính:",
          content: "a) 428 + 295 \n b) 851 - 367 \n c) 134 × 4 \n d) 456 : 3",
          solution: "a) 428 + 295 = 723 (0,5đ)\nb) 851 - 367 = 484 (0,5đ)\nc) 134 × 4 = 536 (0,5đ)\nd) 456 : 3 = 152 (0,5đ)",
          rubric: [
            { step: "Đặt tính và tính đúng câu a (428 + 295 = 723)", score: "0,5đ" },
            { step: "Đặt tính và tính đúng câu b (851 - 367 = 484)", score: "0,5đ" },
            { step: "Đặt tính và tính đúng câu c (134 × 4 = 536)", score: "0,5đ" },
            { step: "Đặt tính và tính đúng câu d (456 : 3 = 152)", score: "0,5đ" }
          ]
        },
        {
          title: "Bài 2 (1,5 điểm - Mức 3): Giải bài toán có lời văn:",
          content: "Một đội công nhân ngày thứ nhất sửa được 145m đường. Ngày thứ hai sửa được số mét đường gấp đôi ngày thứ nhất. Hỏi cả hai ngày đội công nhân đó sửa được bao nhiêu mét đường?",
          solution: "Bài giải:\nNgày thứ hai đội sửa được số mét đường là:\n  145 × 2 = 290 (m)\nCả hai ngày đội sửa được số mét đường là:\n  145 + 290 = 435 (m)\n  Đáp số: 435 m đường.",
          rubric: [
            { step: "Lời giải và phép tính tính số mét đường ngày thứ hai (145 × 2 = 290 m)", score: "0,5đ" },
            { step: "Lời giải và phép tính tính tổng số mét đường cả 2 ngày (145 + 290 = 435 m)", score: "0,75đ" },
            { step: "Ghi đúng đáp số và đơn vị", score: "0,25đ" }
          ]
        },
        {
          title: "Bài 3 (0,5 điểm - Mức 3): Vận dụng tính nhanh:",
          content: "Tính giá trị biểu thức bằng cách thuận tiện nhất: \n  25 × 7 × 4",
          solution: "= (25 × 4) × 7 \n= 100 × 7 \n= 700",
          rubric: [
            { step: "Nhóm (25 × 4) × 7 và tính ra kết quả đúng 700", score: "0,5đ" }
          ]
        }
      ]
    },

    TIENG_VIET: {
      topics: ["Đọc hiểu văn bản", "Luyện từ và câu", "Viết đoạn văn / Bài văn"],
      muc1: [
        { q: "Trong câu 'Mùa xuân, cây cối đâm chồi nảy lộc tươi tốt', từ ngữ chỉ đặc điểm là:", options: ["A. Mùa xuân", "B. Cây cối", "C. Tươi tốt", "D. Đâm chồi"], ans: "C", explain: "'Tươi tốt' là từ chỉ đặc điểm của cây cối." },
        { q: "Bộ phận in đậm trong câu 'Chúng em **đang chăm chú nghe cô giáo giảng bài**' trả lời cho câu hỏi nào?", options: ["A. Là gì?", "B. Làm gì?", "C. Như thế nào?", "D. Ở đâu?"], ans: "B", explain: "'đang chăm chú nghe...' nêu hoạt động nên trả lời cho câu hỏi Làm gì?" },
        { q: "Từ nào dưới đây viết đúng quy tắc chính tả?", options: ["A. Rành mạch", "B. Dành mạch", "C. Giành mạch", "D. Rành mạc"], ans: "A", explain: "'Rành mạch' viết đúng chính tả." }
      ],
      muc2: [
        { q: "Câu nào dưới đây sử dụng biện pháp nghệ thuật so sánh?", options: ["A. Mặt trời chiếu những tia nắng ấm áp.", "B. Trăng tròn như chiếc đĩa bạc lơ lửng trên bầu trời.", "C. Tiếng chim hót líu lo đầu cành cây.", "D. Dòng sông quê em chảy hiền hòa."], ans: "B", explain: "Từ so sánh là 'như' (trăng tròn như chiếc đĩa bạc)." },
        { q: "Cặp từ nào dưới đây là cặp từ đồng nghĩa?", options: ["A. Siêng năng - Cần cù", "B. Khéo léo - Vụng về", "C. Dũng cảm - Hèn nhát", "D. Cao - Thấp"], ans: "A", explain: "'Siêng năng' và 'Cần cù' cùng chỉ đức tính chăm chỉ làm việc." }
      ],
      muc3: [
        { q: "Câu tục ngữ nào dưới đây khuyên con người ta cần có lòng kiên trì, nhẫn nại?", options: ["A. Uống nước nhớ nguồn", "B. Có công mài sắt, có ngày nên kim", "C. Lá lành đùm lá rách", "D. Học thầy không tày học bạn"], ans: "B", explain: "'Có công mài sắt, có ngày nên kim' thể hiện ý chí kiên trì vượt khó." }
      ],
      essay: [
        {
          title: "Câu 1 (1,5 điểm - Mức 2): Luyện từ và câu:",
          content: "Tìm 2 từ đồng nghĩa với từ 'chăm chỉ' và đặt 1 câu với một trong hai từ em vừa tìm được.",
          solution: "- Hai từ đồng nghĩa: cần cù, siêng năng (hoặc cần mẫn, chịu khó) (0,5đ)\n- Đặt câu: Bạn Nam rất cần cù trong học tập. (1,0đ)",
          rubric: [
            { step: "Tìm đúng 2 từ đồng nghĩa (cần cù, siêng năng...)", score: "0,5đ" },
            { step: "Đặt câu đúng ngữ pháp, đầu câu viết hoa, cuối câu có dấu chấm", score: "1,0đ" }
          ]
        },
        {
          title: "Câu 2 (2,5 điểm - Mức 3): Viết đoạn văn:",
          content: "Em hãy viết một đoạn văn (từ 4 đến 5 câu) thể hiện tình cảm, cảm xúc của em đối với một người thân trong gia đình hoặc thầy cô giáo.",
          solution: "Yêu cầu:\n- Đoạn văn đúng dung lượng (4-5 câu), bố cục mạch lạc (1,0đ)\n- Nêu được tình cảm, cảm xúc chân thành, từ ngữ chọn lọc (1,0đ)\n- Đúng chính tả, dùng từ đặt câu chuẩn mực, chữ viết sạch đẹp (0,5đ)",
          rubric: [
            { step: "Đúng hình thức đoạn văn 4-5 câu, có câu mở đoạn và kết đoạn", score: "1,0đ" },
            { step: "Nội dung thể hiện tình cảm chân thực, giàu cảm xúc", score: "1,0đ" },
            { step: "Chính tả, dùng từ, đặt câu đúng quy tắc", score: "0,5đ" }
          ]
        }
      ]
    },

    KHOA_HOC: {
      topics: ["Chất và sự biến đổi của chất", "Năng lượng", "Thực vật và Động vật", "Con người và sức khỏe"],
      muc1: [
        { q: "Thành phần nào dưới đây của đất có vai trò giữ ẩm và cung cấp chất dinh dưỡng cho cây trồng?", options: ["A. Chất khoáng", "B. Mùn (chất hữu cơ)", "C. Nước", "D. Không khí"], ans: "B", explain: "Mùn chứa nhiều chất dinh dưỡng cần thiết cho cây phát triển." },
        { q: "Hiện tượng nước bốc hơi từ ao hồ lên không khí là sự chuyển thể từ:", options: ["A. Thể rắn sang thể lỏng", "B. Thể lỏng sang thể khí", "C. Thể khí sang thể lỏng", "D. Thể lỏng sang thể rắn"], ans: "B", explain: "Nước từ thể lỏng chuyển thành hơi nước (thể khí)." },
        { q: "Vật nào dưới đây là nguồn phát sáng tự nhiên?", options: ["A. Mặt trời", "B. Ngọn nến đang cháy", "C. Bóng đèn điện", "D. Đèn pin"], ans: "A", explain: "Mặt trời là nguồn sáng tự nhiên." }
      ],
      muc2: [
        { q: "Để phòng tránh tai nạn do điện trong gia đình, chúng ta KHÔNG nên làm điều nào sau đây?", options: ["A. Tắt thiết bị điện khi không sử dụng", "B. Dùng tay ướt để cắm hoặc rút phích điện", "C. Báo người lớn khi dây điện bị hở", "D. Sử dụng thiết bị điện đúng hướng dẫn"], ans: "B", explain: "Nước dẫn điện, tay ướt chạm vào điện rất dễ bị điện giật." },
        { q: "Sự thụ phấn ở thực vật có hoa là hiện tượng:", options: ["A. Noãn phát triển thành hạt", "B. Hạt phấn tiếp xúc với đầu nhụy", "C. Bầu nhụy phát triển thành quả", "D. Hạt nảy mầm thành cây non"], ans: "B", explain: "Sự thụ phấn là hiện tượng hạt phấn rơi vào đầu nhụy." }
      ],
      muc3: [
        { q: "Biện pháp nào dưới đây vừa giúp bảo vệ môi trường đất, vừa đem lại hiệu quả kinh tế lâu dài?", options: ["A. Lạm dụng phân bón hóa học để tăng năng suất", "B. Đốt rơm rạ ngay trên đồng ruộng sau khi thu hoạch", "C. Tăng cường bón phân hữu cơ và luân canh cây trồng", "D. Phun thuốc trừ sâu nhiều lần"], ans: "C", explain: "Bón phân hữu cơ và luân canh giúp đất tơi xốp, giữ độ phì nhiêu và an toàn." }
      ],
      essay: [
        {
          title: "Câu 1 (2,0 điểm - Mức 2): Bảo vệ môi trường đất:",
          content: "Nêu 2 nguyên nhân gây ô nhiễm đất và đề xuất 2 việc làm cụ thể của học sinh để góp phần bảo vệ môi trường đất ở trường học hoặc địa phương em.",
          solution: "- 2 nguyên nhân gây ô nhiễm đất: vứt rác thải nhựa bừa bãi, lạm dụng phân bón hóa học và thuốc trừ sâu (1,0đ).\n- 2 việc làm của học sinh: bỏ rác đúng nơi quy định, tích cực tham gia trồng và chăm sóc cây xanh (1,0đ).",
          rubric: [
            { step: "Nêu đúng 2 nguyên nhân gây ô nhiễm đất (mỗi ý 0,5đ)", score: "1,0đ" },
            { step: "Đề xuất đúng 2 việc làm thiết thực của học sinh (mỗi ý 0,5đ)", score: "1,0đ" }
          ]
        },
        {
          title: "Câu 2 (1,0 điểm - Mức 3): Xử lý tình huống thực tế:",
          content: "Khi thấy bạn để vòi nước chảy tràn mà không khóa lại sau khi rửa tay ở trường, em sẽ làm gì? Vì sao chúng ta cần phải tiết kiệm nước sạch?",
          solution: "- Hành động: Em sẽ đến khóa vòi nước lại ngay và nhắc nhở bạn nhẹ nhàng lần sau nhớ khóa vòi (0,5đ).\n- Giải thích: Vì nguồn nước sạch trên Trái Đất có hạn, tiết kiệm nước là bảo vệ tài nguyên và bảo vệ môi trường sống (0,5đ).",
          rubric: [
            { step: "Nêu được hành động khóa vòi và nhắc bạn lịch sự", score: "0,5đ" },
            { step: "Giải thích đúng lý do cần tiết kiệm nước sạch", score: "0,5đ" }
          ]
        }
      ]
    },

    LICH_SU_DIA_LY: {
      topics: ["Đất nước và con người Việt Nam", "Lịch sử dựng nước và giữ nước", "Thiên nhiên và đời sống các vùng miền"],
      muc1: [
        { q: "Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam có hình chữ gì?", options: ["A. Hình chữ S", "B. Hình chữ C", "C. Hình chữ V", "D. Hình chữ U"], ans: "A", explain: "Lãnh thổ Việt Nam trên bản đồ có hình chữ S." },
        { q: "Thủ đô của nước Việt Nam hiện nay là:", options: ["A. Thành phố Hồ Chí Minh", "B. Đà Nẵng", "C. Hà Nội", "D. Huế"], ans: "C", explain: "Hà Nội là thủ đô của Việt Nam." },
        { q: "Vua đầu tiên của triều đại nhà Lý là ai?", options: ["A. Lý Thái Tổ (Lý Công Uẩn)", "B. Lý Thánh Tông", "C. Lý Thường Kiệt", "D. Lý Nhân Tông"], ans: "A", explain: "Lý Công Uẩn lên ngôi năm 1009, lập nên nhà Lý." }
      ],
      muc2: [
        { q: "Vùng Trung du và miền núi Bắc Bộ có thế mạnh kinh tế nổi bật nào?", options: ["A. Phát triển thủy điện, khai thác khoáng sản và trồng cây công nghiệp lâu năm", "B. Trồng lúa nước lớn nhất cả nước", "C. Đánh bắt hải sản ven bờ quy mô lớn", "D. Sản xuất dầu mỏ ngoài khơi"], ans: "A", explain: "Địa hình dốc nhiều sông ngòi lớn và đất đai thích hợp cho thủy điện, chè, quế, hồi." }
      ],
      muc3: [
        { q: "Chiến thắng Bạch Đằng năm 938 của Ngô Quyền có ý nghĩa lịch sử to lớn như thế nào đối với dân tộc ta?", options: ["A. Mở đầu thời kỳ Bắc thuộc", "B. Chấm dứt hơn 1000 năm Bắc thuộc, mở ra thời kỳ độc lập lâu dài", "C. Đánh tan quân xâm lược Mông - Nguyên", "D. Thống nhất đất nước thời Nguyễn"], ans: "B", explain: "Chiến thắng Bạch Đằng năm 938 chấm dứt hoàn toàn ách đô hộ của phong kiến phương Bắc." }
      ],
      essay: [
        {
          title: "Câu 1 (2,0 điểm - Mức 2): Thiên nhiên và con người:",
          content: "Kể tên 2 con sông lớn nhất ở nước ta. Sông ngòi đem lại những lợi ích gì cho đời sống và sản xuất của nhân dân ta?",
          solution: "- Hai con sông lớn: Sông Hồng và Sông Mê Kông (Sông Cửu Long / Sông Tiền, Sông Hậu) (0,5đ).\n- Lợi ích của sông ngòi: Cung cấp nước tưới tiêu, bồi đắp phù sa màu mỡ, cung cấp thủy sản, phát triển giao thông thủy và thủy điện (1,5đ).",
          rubric: [
            { step: "Kể đúng 2 con sông lớn", score: "0,5đ" },
            { step: "Nêu được từ 2 - 3 lợi ích cụ thể của sông ngòi", score: "1,5đ" }
          ]
        },
        {
          title: "Câu 2 (1,0 điểm - Mức 3): Trách nhiệm công dân học sinh:",
          content: "Là một học sinh tiểu học, em cần làm gì để thể hiện lòng tự hào dân tộc và tình yêu quê hương đất nước?",
          solution: "- Chăm chỉ học tập, rèn luyện đạo đức tốt (0,5đ).\n- Tôn trọng các di tích lịch sử, bảo vệ môi trường quê hương và yêu thương mọi người (0,5đ).",
          rubric: [
            { step: "Nêu việc học tập và rèn luyện tốt", score: "0,5đ" },
            { step: "Nêu hành động giữ gìn truyền thống, di tích lịch sử quê hương", score: "0,5đ" }
          ]
        }
      ]
    },

    TIN_HOC: {
      topics: ["Máy tính và em", "Mạng máy tính và Internet", "Ứng dụng tin học", "Đạo đức, pháp luật và văn hóa số"],
      muc1: [
        { q: "Thiết bị nào dưới đây dùng để nhập văn bản vào máy tính?", options: ["A. Chuột máy tính", "B. Bàn phím", "C. Màn hình", "D. Loa"], ans: "B", explain: "Bàn phím (Keyboard) là thiết bị nhập ký tự và văn bản." },
        { q: "Hành động nào sau đây là an toàn khi sử dụng máy tính?", options: ["A. Vừa ăn uống vừa sử dụng máy tính", "B. Ngồi thẳng lưng, mắt cách màn hình từ 50 - 80 cm", "C. Tự ý cắm rút phích cắm điện của máy tính", "D. Nhìn sát mắt vào màn hình"], ans: "B", explain: "Tư thế ngồi đúng giúp bảo vệ mắt và cột sống." }
      ],
      muc2: [
        { q: "Để sao chép (Copy) một đoạn văn bản hoặc tệp tin, em sử dụng tổ hợp phím tắt nào?", options: ["A. Ctrl + C", "B. Ctrl + V", "C. Ctrl + X", "D. Ctrl + Z"], ans: "A", explain: "Ctrl + C là lệnh Copy (sao chép)." }
      ],
      muc3: [
        { q: "Khi sử dụng Internet, nếu có người lạ hỏi mật khẩu tài khoản hoặc xin địa chỉ nhà của em, em nên làm gì?", options: ["A. Nhắn tin cung cấp ngay", "B. Không cung cấp thông tin và báo ngay cho bố mẹ hoặc thầy cô", "C. Đổi thông tin giả rồi gửi cho người đó", "D. Chia sẻ công khai lên mạng xã hội"], ans: "B", explain: "Bảo vệ thông tin cá nhân trên môi trường mạng là nguyên tắc an toàn số." }
      ],
      essay: [
        {
          title: "Câu 1 (1,5 điểm - Mức 2): Kỹ năng thực hành:",
          content: "Nêu các bước để lưu một tệp văn bản mới soạn thảo trong phần mềm soạn thảo văn bản Word.",
          solution: "Các bước lưu tệp:\n1. Bấm vào thẻ File trên thanh bảng chọn (0,5đ)\n2. Chọn lệnh Save hoặc Save As (0,5đ)\n3. Chọn thư mục lưu, đặt tên tệp và bấm nút Save (0,5đ)",
          rubric: [
            { step: "Nêu đúng thao tác mở File -> Save/Save As", score: "1,0đ" },
            { step: "Nêu đúng thao tác chọn thư mục, đặt tên và bấm Save", score: "0,5đ" }
          ]
        },
        {
          title: "Câu 2 (1,5 điểm - Mức 3): Văn hóa sử dụng Internet:",
          content: "Nêu 2 điều em nên làm và 2 điều em không nên làm khi tham gia môi trường mạng Internet để đảm bảo an toàn.",
          solution: "- Nên làm: Học tập thông tin bổ ích, bảo mật mật khẩu cá nhân (0,75đ).\n- Không nên làm: Truy cập trang web xấu, chia sẻ thông tin cá nhân của mình và người khác cho người lạ (0,75đ).",
          rubric: [
            { step: "Nêu đúng 2 việc nên làm", score: "0,75đ" },
            { step: "Nêu đúng 2 việc không nên làm", score: "0,75đ" }
          ]
        }
      ]
    },

    CONG_NGHE: {
      topics: ["Công nghệ và đời sống", "Thủ công kỹ thuật", "Lắp ghép mô hình kỹ thuật"],
      muc1: [
        { q: "Sản phẩm nào dưới đây là sản phẩm công nghệ trong gia đình?", options: ["A. Cây chuối", "B. Quạt điện", "C. Con suối", "D. Quả bưởi"], ans: "B", explain: "Quạt điện do con người chế tạo ra phục vụ đời sống." },
        { q: "Khi sử dụng quạt điện, để đảm bảo an toàn em cần lưu ý điều gì?", options: ["A. Thò ngón tay vào cánh quạt khi quạt đang quay", "B. Rút phích cắm khi không sử dụng và không thò tay vào lồng quạt", "C. Để quạt sát mép nước", "D. Di chuyển quạt khi cánh quạt đang quay mạnh"], ans: "B", explain: "Đảm bảo an toàn điện và tránh bị cánh quạt chém vào tay." }
      ],
      muc2: [
        { q: "Quy trình trồng và chăm sóc hoa trong chậu gồm các bước cơ bản theo thứ tự nào?", options: ["A. Chuẩn bị vật liệu -> Trồng hoa -> Tưới nước và chăm sóc", "B. Tưới nước -> Trồng hoa -> Chuẩn bị đất", "C. Trồng hoa -> Bón phân đậm đặc -> Nhổ cỏ", "D. Để chậu ngoài nắng gắt -> Trồng cây"], ans: "A", explain: "Quy trình đúng là chuẩn bị đất/chậu -> trồng cây con -> chăm sóc tưới tiêu." }
      ],
      muc3: [
        { q: "Để tạo ra một đồ chơi thủ công từ vật liệu tái chế (như vỏ chai nhựa, bìa các-tông), em cần thực hiện những bước nào?", options: ["A. Ý tưởng thiết kế -> Chuẩn bị vật liệu tái chế sạch -> Cắt dán lắp ghép -> Trang trí hoàn thiện", "B. Cắt bừa bãi không cần vẽ", "C. Dùng đồ bẩn chưa rửa", "D. Mua đồ chơi mới ở cửa hàng"], ans: "A", explain: "Quy trình làm đồ chơi tái chế khoa học và an toàn." }
      ],
      essay: [
        {
          title: "Câu 1 (2,0 điểm - Mức 2): Sử dụng thiết bị an toàn:",
          content: "Kể tên 3 thiết bị điện trong gia đình em và nêu cách sử dụng tiết kiệm điện đối với 1 trong 3 thiết bị đó.",
          solution: "- Kể đúng 3 thiết bị: Ti vi, tủ lạnh, quạt điện, máy giặt, điều hòa... (0,75đ)\n- Cách tiết kiệm điện (vd quạt điện): Bật mức gió vừa đủ, tắt quạt khi ra khỏi phòng, vệ sinh quạt định kỳ (1,25đ).",
          rubric: [
            { step: "Kể đúng 3 thiết bị công nghệ gia đình", score: "0,75đ" },
            { step: "Nêu được các biện pháp sử dụng tiết kiệm điện hợp lý", score: "1,25đ" }
          ]
        },
        {
          title: "Câu 2 (1,0 điểm - Mức 3): Ý thức tái chế:",
          content: "Tại sao chúng ta nên tận dụng các vật liệu đã qua sử dụng (vỏ chai nhựa, hộp giấy) để làm đồ dùng học tập hoặc đồ chơi?",
          solution: "- Giúp giảm thiểu rác thải nhựa, bảo vệ môi trường (0,5đ).\n- Tiết kiệm chi phí và rèn luyện tính sáng tạo, khéo léo (0,5đ).",
          rubric: [
            { step: "Nêu lợi ích bảo vệ môi trường và giảm rác thải", score: "0,5đ" },
            { step: "Nêu lợi ích rèn luyện sáng tạo và tiết kiệm", score: "0,5đ" }
          ]
        }
      ]
    },

    TIENG_ANH: {
      topics: ["Vocabulary & Phonics", "Sentence Patterns", "Reading Comprehension", "Writing"],
      muc1: [
        { q: "Choose the odd one out (Chọn từ khác loại):", options: ["A. Cat", "B. Dog", "C. Apple", "D. Bird"], ans: "C", explain: "Apple là hoa quả, các từ còn lại là con vật." },
        { q: "How are you? - I am _______, thank you.", options: ["A. fine", "B. five", "C. nine", "D. ten"], ans: "A", explain: "I am fine, thank you." }
      ],
      muc2: [
        { q: "What's the weather like today? - It is _______ and sunny.", options: ["A. warm", "B. book", "C. pen", "D. school"], ans: "A", explain: "It is warm and sunny (Thời tiết ấm áp và có nắng)." }
      ],
      muc3: [
        { q: "Rearrange the words to make a sentence: 'like / I / English / studying / .'", options: ["A. I studying like English.", "B. I like studying English.", "C. English like I studying.", "D. Studying I English like."], ans: "B", explain: "Cấu trúc: S + like + V-ing -> I like studying English." }
      ],
      essay: [
        {
          title: "Question 1 (1,5 points - Level 2): Fill in the blanks:",
          content: "Complete the sentences with suitable words:\n 1. My name _______ Nam.\n 2. I am in class 4_______.\n 3. I like _______ football after school.",
          solution: "1. is (0,5đ)\n2. A / 4A / four (0,5đ)\n3. playing (0,5đ)",
          rubric: [
            { step: "Điền đúng từ 'is'", score: "0,5đ" },
            { step: "Điền đúng tên lớp", score: "0,5đ" },
            { step: "Điền đúng động từ 'playing'", score: "0,5đ" }
          ]
        },
        {
          title: "Question 2 (1,5 points - Level 3): Writing:",
          content: "Write 3-4 sentences about your favorite subject at school.",
          solution: "Example:\nMy favorite subject is English. I have English on Monday and Friday. I like English because I love singing English songs. I want to speak English well.",
          rubric: [
            { step: "Viết đúng ngữ pháp 3-4 câu hoàn chỉnh", score: "1,0đ" },
            { step: "Từ vựng phù hợp chủ đề môn học yêu thích", score: "0,5đ" }
          ]
        }
      ]
    },

    TNXH: {
      topics: ["Gia đình", "Trường học", "Cộng đồng địa phương", "Thực vật và Động vật", "Con người và sức khỏe"],
      muc1: [
        { q: "Hành động nào dưới đây thể hiện sự hiếu thảo với ông bà, cha mẹ?", options: ["A. Vâng lời và giúp đỡ việc nhà vừa sức", "B. Vòi vĩnh đồ chơi đắt tiền", "C. Đi chơi không xin phép", "D. Cãi lời người lớn"], ans: "A", explain: "Hiếu thảo là vâng lời, lễ phép và biết đỡ đần cha mẹ." },
        { q: "Cơ quan nào trong cơ thể người có chức năng vận chuyển máu đi khắp cơ thể?", options: ["A. Cơ quan tiêu hóa", "B. Cơ quan tuần hoàn", "C. Cơ quan hô hấp", "D. Cơ quan bài tiết"], ans: "B", explain: "Cơ quan tuần hoàn (Tim và mạch máu) làm nhiệm vụ co bóp đẩy máu đi nuôi cơ thể." }
      ],
      muc2: [
        { q: "Để giữ gìn vệ sinh trường lớp, chúng ta NÊN làm việc nào sau đây?", options: ["A. Vứt rác vào thùng rác quy định", "B. Vẽ bậy lên bàn học và tường lớp", "C. Bẻ cành hoa trong vườn trường", "D. Vứt vỏ hộp sữa dưới gầm bàn"], ans: "A", explain: "Bỏ rác đúng nơi quy định giúp trường học luôn xanh - sạch - đẹp." }
      ],
      muc3: [
        { q: "Khi đi bộ trên đường không có vỉa hè, em cần đi như thế nào để đảm bảo an toàn?", options: ["A. Đi sát mép đường bên phải", "B. Đi giữa lòng đường", "C. Vừa đi vừa đá bóng", "D. Đi dàn hàng ngang cùng bạn bè"], ans: "A", explain: "Đi bộ sát lề đường bên phải theo chiều đi của mình để tránh xe cộ." }
      ],
      essay: [
        {
          title: "Câu 1 (2,0 điểm - Mức 2): Chăm sóc sức khỏe bản thân:",
          content: "Nêu 3 việc em nên làm mỗi ngày để giữ gìn vệ sinh thân thể và phòng tránh bệnh tật.",
          solution: "- Rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh (0,75đ).\n- Đánh răng ít nhất 2 lần/ngày sau khi ăn và trước khi đi ngủ (0,75đ).\n- Tắm rửa sạch sẽ và ăn chín uống sôi (0,5đ).",
          rubric: [
            { step: "Nêu đúng việc rửa tay xà phòng", score: "0,75đ" },
            { step: "Nêu đúng việc đánh răng", score: "0,75đ" },
            { step: "Nêu việc tắm giặt, ăn uống hợp vệ sinh", score: "0,5đ" }
          ]
        },
        {
          title: "Câu 2 (1,0 điểm - Mức 3): Tình huống ứng xử:",
          content: "Nếu em thấy một bạn cùng lớp vứt rác ra sân trường sau giờ ra chơi, em sẽ nói gì và làm gì?",
          solution: "- Lời nói: Nhắc nhở bạn lịch sự: 'Bạn ơi, bạn nhặt rác bỏ vào thùng rác giúp chúng mình nhé để giữ trường sạch đẹp' (0,5đ).\n- Hành động: Cùng bạn nhặt rác bỏ vào thùng rác (0,5đ).",
          rubric: [
            { step: "Lời nhắc nhở nhẹ nhàng, văn minh", score: "0,5đ" },
            { step: "Hành động gương mẫu cùng nhặt rác", score: "0,5đ" }
          ]
        }
      ]
    }
  },

  /**
   * Gọi hàm sinh đề AI tổng hợp (Hỗ trợ Gemini API & Fallback Offline)
   */
  generateExam: async function(params) {
    var self = this;
    var apiKey = params.apiKey || localStorage.getItem("tvth_gemini_api_key") || (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || "";
    
    if (apiKey && apiKey.trim().length > 15) {
      try {
        var aiResult = await self.callGeminiAPI(apiKey.trim(), params);
        if (aiResult && aiResult.multipleChoice && aiResult.multipleChoice.length > 0) {
          return aiResult;
        }
      } catch (err) {
        console.warn("Lỗi gọi Gemini API, tự động chuyển sang bộ đề ngoại tuyến KNTT:", err);
      }
    }
    
    return self.generateSmartLocalExam(params);
  },

  /**
   * Gọi trực tiếp Google Gemini API (Structured JSON Prompting)
   */
  callGeminiAPI: async function(apiKey, params) {
    var grade = params.grade || 5;
    var subjectId = params.subjectId || "TOAN";
    var subInfo = this.EXAM_SUBJECTS[subjectId] || this.EXAM_SUBJECTS.TOAN;
    var subjectName = subInfo.name;
    var scope = params.scope || "Kiểm tra Cuối Học kỳ I";
    var mcqCount = parseInt(params.mcqCount) || 8;
    var essayCount = parseInt(params.essayCount) || 2;
    var essayGuide = params.essayGuide || "";
    var mcqPct = parseInt(params.mcqPercent) || 70;
    var essayPct = parseInt(params.essayPercent) || 30;
    var m1Pct = parseInt(params.level1Percent) || 40;
    var m2Pct = parseInt(params.level2Percent) || 40;
    var m3Pct = parseInt(params.level3Percent) || 20;
    var duration = params.duration || (grade <= 2 ? "35 phút" : "40 phút");
    var customPrompt = params.customPrompt || "";

    // Tra cứu dữ liệu SGK Kết nối tri thức số hóa
    var sgkKey = (subjectId || '').toLowerCase().replace('lich_su_dia_ly', 'lich_su_dia_li');
    var sgkContext = "";
    if (typeof window !== 'undefined' && window.SGK_DATA && typeof window.SGK_DATA.getScopeContent === 'function') {
      var scopeInfo = window.SGK_DATA.getScopeContent(grade, sgkKey, scope);
      if (scopeInfo && scopeInfo.found && scopeInfo.knowledgeDigest) {
        sgkContext = `\n- NỘI DUNG SÁCH GIÁO KHOA SỐ HÓA KNTT THEO PHẠM VI RA ĐỀ:\n${scopeInfo.knowledgeDigest}\n- YÊU CẦU: Các câu hỏi trắc nghiệm và tự luận PHẢI sử dụng chính xác các bài học, khái niệm, thuật ngữ và ngữ liệu của SGK Kết nối tri thức được cung cấp ở trên.`;
      }
    }

    var prompt = `
Bạn là chuyên gia sư phạm Tiểu học hàng đầu Việt Nam, am hiểu sâu sắc Chương trình GDPT 2018, Thông tư 27/2020/TT-BGDĐT và Bộ sách giáo khoa KẾT NỐI TRI THỨC VỚI CUỘC SỐNG.
Hãy soạn trọn bộ ĐỀ KIỂM TRA ĐỊNH KỲ TIỂU HỌC gồm MA TRẬN 3 MỨC ĐỘ, ĐỀ THI VÀ HƯỚNG DẪN CHẤM CHI TIẾT với các thông số sau:

- MÔN HỌC: ${subjectName}
- KHỐI LỚP: Lớp ${grade}
- BỘ SÁCH GIÁO KHOA: Kết nối tri thức với cuộc sống (KNTT)
- PHẠM VI RA ĐỀ: ${scope}
- THỜI GIAN LÀM BÀI: ${duration}
- CẤU TRÚC ĐỀ:
  + Số câu trắc nghiệm khách quan: ${mcqCount} câu (Tổng điểm phần Trắc nghiệm: ${(mcqPct / 10).toFixed(1)} điểm, chiếm ${mcqPct}%)
  + Số câu tự luận: ${essayCount} câu (Tổng điểm phần Tự luận: ${(essayPct / 10).toFixed(1)} điểm, chiếm ${essayPct}%)
  + Định hướng nội dung phần tự luận: ${essayGuide ? essayGuide : "Bám sát các mạch kiến thức trọng tâm SGK KNTT"}
- TỈ LỆ MA TRẬN 3 MỨC ĐỘ NHẬN THỨC (THÔNG TƯ 27):
  + Mức 1 (Nhận biết): ${m1Pct}% (khoảng ${(m1Pct / 10).toFixed(1)} điểm)
  + Mức 2 (Thông hiểu / Kết nối): ${m2Pct}% (khoảng ${(m2Pct / 10).toFixed(1)} điểm)
  + Mức 3 (Vận dụng): ${m3Pct}% (khoảng ${(m3Pct / 10).toFixed(1)} điểm)
${sgkContext}
${customPrompt ? "- YÊU CẦU BỔ SUNG: " + customPrompt : ""}

HÃY TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON (Không kèm markdown code block hoặc text ngoài JSON) có cấu trúc chuẩn như sau:
{
  "schoolName": "TRƯỜNG TIỂU HỌC .................................",
  "examTitle": "ĐỀ KIỂM TRA ĐỊNH KỲ MÔN ${subjectName.toUpperCase()} LỚP ${grade}",
  "examTerm": "HỌC KÌ I",
  "subjectName": "${subjectName}",
  "grade": ${grade},
  "duration": "${duration}",
  "schoolYear": "2025 - 2026",
  "bookSeries": "Kết nối tri thức với cuộc sống",
  "scopeDesc": "${scope}",
  "mcqTotalScore": ${(mcqPct / 10).toFixed(1)},
  "essayTotalScore": ${(essayPct / 10).toFixed(1)},
  "matrix": {
    "topics": [
      {
        "topic": "Tên chủ đề/bài học 1",
        "m1_mcq": "Câu 1, 2",
        "m1_essay": "",
        "m2_mcq": "Câu 3",
        "m2_essay": "",
        "m3_mcq": "",
        "m3_essay": "",
        "total_mcq": 3,
        "total_essay": 0,
        "score": 1.5
      }
    ],
    "summary": {
      "m1_total_mcq": 3,
      "m1_total_essay": 0,
      "m1_score": ${(m1Pct / 10).toFixed(1)},
      "m2_total_mcq": 3,
      "m2_total_essay": 1,
      "m2_score": ${(m2Pct / 10).toFixed(1)},
      "m3_total_mcq": 0,
      "m3_total_essay": 1,
      "m3_score": ${(m3Pct / 10).toFixed(1)},
      "total_mcq_count": ${mcqCount},
      "total_essay_count": ${essayCount},
      "total_score": 10.0,
      "m1_pct": ${m1Pct},
      "m2_pct": ${m2Pct},
      "m3_pct": ${m3Pct}
    }
  },
  "multipleChoice": [
    {
      "num": 1,
      "level": "Mức 1",
      "score": 0.5,
      "text": "Câu hỏi trắc nghiệm số 1...",
      "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
      "ans": "A",
      "explain": "Giải thích chi tiết vì sao chọn A..."
    }
  ],
  "essaySection": [
    {
      "num": 1,
      "level": "Mức 2",
      "score": 2.0,
      "title": "Câu 1 (2,0 điểm - Mức 2):",
      "text": "Nội dung đề bài tự luận...",
      "solution": "Nội dung đáp án đầy đủ...",
      "rubric": [
        { "step": "Ý 1 / Bước 1...", "score": "1,0đ" },
        { "step": "Ý 2 / Bước 2...", "score": "1,0đ" }
      ]
    }
  ]
}
`;

    // Gọi Gemini API model mới nhất
    var models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];
    var lastError = null;

    for (var m = 0; m < models.length; m++) {
      var modelName = models[m];
      try {
        var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2
            }
          })
        });

        if (response.ok) {
          var data = await response.json();
          var rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (rawText) {
            // Parse JSON
            var cleanJsonStr = rawText.trim();
            if (cleanJsonStr.startsWith("```json")) {
              cleanJsonStr = cleanJsonStr.replace(/^```json\s*/, "").replace(/\s*```$/, "");
            } else if (cleanJsonStr.startsWith("```")) {
              cleanJsonStr = cleanJsonStr.replace(/^```\s*/, "").replace(/\s*```$/, "");
            }
            var parsed = JSON.parse(cleanJsonStr);
            if (parsed && parsed.multipleChoice && parsed.multipleChoice.length > 0) {
              parsed.source = "ai";
              parsed.sourceName = "Google Gemini AI (Online)";
              parsed.modelName = modelName;
              return parsed;
            }
          }
        } else {
          var errJson = await response.json().catch(function(){ return {}; });
          lastError = errJson.error?.message || response.statusText;
        }
      } catch (e) {
        lastError = e.message;
      }
    }

    throw new Error(lastError || "Không thể kết nối Gemini API");
  },

  /**
   * Bộ tạo đề ngoại tuyến thông minh (Smart Offline Generator KNTT)
   */
  generateSmartLocalExam: function(params) {
    var grade = parseInt(params.grade) || 3;
    var subjectId = params.subjectId || "TOAN";
    var subInfo = this.EXAM_SUBJECTS[subjectId] || this.EXAM_SUBJECTS.TOAN;
    var subjectName = subInfo.name;
    var scope = params.scope || "Kiểm tra Định kỳ Cuối Học kỳ I";
    var mcqCount = Math.max(1, parseInt(params.mcqCount) || 8);
    var essayCount = Math.max(0, parseInt(params.essayCount) !== undefined ? parseInt(params.essayCount) : 2);
    var essayGuide = params.essayGuide || "";
    var mcqPct = parseInt(params.mcqPercent) || 70;
    var essayPct = parseInt(params.essayPercent) || 30;
    var m1Pct = parseInt(params.level1Percent) || 40;
    var m2Pct = parseInt(params.level2Percent) || 40;
    var m3Pct = parseInt(params.level3Percent) || 20;
    var duration = params.duration || (grade <= 2 ? "35 phút" : "40 phút");

    var bank = this.knttBank[subjectId] || this.knttBank.TOAN;
    var topics = bank.topics || ["Chủ đề 1", "Chủ đề 2", "Chủ đề 3"];

    // Tra cứu dữ liệu SGK Kết nối tri thức số hóa
    var sgkKey = (subjectId || '').toLowerCase().replace('lich_su_dia_ly', 'lich_su_dia_li');
    var scopeLessons = [];
    if (typeof window !== 'undefined' && window.SGK_DATA && typeof window.SGK_DATA.getScopeContent === 'function') {
      var scopeInfo = window.SGK_DATA.getScopeContent(grade, sgkKey, scope);
      if (scopeInfo && scopeInfo.found && scopeInfo.lessons && scopeInfo.lessons.length > 0) {
        scopeLessons = scopeInfo.lessons;
        var uniqueTopics = [];
        scopeLessons.forEach(function(l) {
          if (l.topic && uniqueTopics.indexOf(l.topic) === -1) {
            uniqueTopics.push(l.topic);
          }
        });
        if (uniqueTopics.length > 0) {
          topics = uniqueTopics;
        }
      }
    }

    // Điểm số phân bổ
    var totalMcqScore = (mcqPct / 10);
    var totalEssayScore = (essayPct / 10);
    var scorePerMcq = mcqCount > 0 ? (totalMcqScore / mcqCount) : 0;
    scorePerMcq = Math.round(scorePerMcq * 10) / 10;
    if (scorePerMcq === 0 && mcqCount > 0) scorePerMcq = 0.5;

    // Số câu theo 3 Mức độ
    var m1Count = Math.max(1, Math.round(mcqCount * (m1Pct / 100)));
    var m2Count = Math.max(1, Math.round(mcqCount * (m2Pct / 100)));
    var m3Count = Math.max(0, mcqCount - m1Count - m2Count);

    var mcqList = [];
    var qIndex = 1;

    // Mức 1 (Nhận biết)
    for (var i = 0; i < m1Count; i++) {
      var item = null;
      if (scopeLessons.length > 0) {
        var les = scopeLessons[i % scopeLessons.length];
        var qText = `(SGK KNTT - ${les.title}): Kiến thức nhận biết cốt lõi trong bài học là gì?`;
        if (les.reading) {
          qText = `(Bài đọc "${les.reading.title}"): Chi tiết hoặc hình ảnh nổi bật được nhắc đến trong bài đọc là:`;
        } else if (les.sentencePatterns) {
          qText = `(English - ${les.title}): Complete the sentence pattern: "${les.sentencePatterns.split('-')[0].trim()}" ->`;
        }
        item = {
          q: qText,
          options: ["A. Nội dung chuẩn xác theo sách giáo khoa Kết nối tri thức", "B. Chi tiết chưa chính xác", "C. Ý kiến không xuất hiện trong bài học", "D. Khái niệm thuộc bài học khác"],
          ans: "A",
          explain: `Bám sát kiến thức bài "${les.title}" SGK Kết nối tri thức.`
        };
      } else if (bank.muc1 && bank.muc1.length) {
        item = bank.muc1[i % bank.muc1.length];
      } else {
        item = { q: `Câu hỏi nhận biết ${qIndex} môn ${subjectName}:`, options: ["A. Đáp án A", "B. Đáp án B", "C. Đáp án C", "D. Đáp án D"], ans: "A", explain: "Kiến thức cơ bản." };
      }

      mcqList.push({
        num: qIndex++,
        level: "Mức 1",
        score: scorePerMcq,
        text: item.q,
        options: item.options,
        ans: item.ans,
        explain: item.explain || "Kiến thức nhận biết trong SGK Kết nối tri thức."
      });
    }

    // Mức 2 (Thông hiểu / Kết nối)
    for (var j = 0; j < m2Count; j++) {
      var item = null;
      if (scopeLessons.length > 0) {
        var les = scopeLessons[(j + m1Count) % scopeLessons.length];
        var qText = `(SGK KNTT - ${les.title}): Vận dụng và kết nối kiến thức để chọn khẳng định đúng:`;
        if (les.languagePractice) {
          qText = `(Luyện từ và câu - ${les.languagePractice.topic}): Câu nào dưới đây sử dụng đúng kiến thức đã học?`;
        } else if (les.sentencePatterns) {
          qText = `(Communication - ${les.title}): Choose the best response: "${les.sentencePatterns.split('-')[0].trim()}"`;
        }
        item = {
          q: qText,
          options: ["A. Phương án chưa đúng", "B. Phương án chính xác kết nối kiến thức bài học", "C. Phương án không phù hợp ngữ cảnh", "D. Phương án có lỗi logic"],
          ans: "B",
          explain: `Thông hiểu và kết nối kiến thức bài "${les.title}".`
        };
      } else if (bank.muc2 && bank.muc2.length) {
        item = bank.muc2[j % bank.muc2.length];
      } else {
        item = { q: `Câu hỏi thông hiểu ${qIndex} môn ${subjectName}:`, options: ["A. Lựa chọn 1", "B. Lựa chọn 2", "C. Lựa chọn 3", "D. Lựa chọn 4"], ans: "B", explain: "Kiến thức thông hiểu kết nối." };
      }

      mcqList.push({
        num: qIndex++,
        level: "Mức 2",
        score: scorePerMcq,
        text: item.q,
        options: item.options,
        ans: item.ans,
        explain: item.explain || "Vận dụng kết nối kiến thức bài học."
      });
    }

    // Mức 3 (Vận dụng)
    for (var k = 0; k < m3Count; k++) {
      var item = null;
      if (scopeLessons.length > 0) {
        var les = scopeLessons[(k + m1Count + m2Count) % scopeLessons.length];
        var qText = `(SGK KNTT - ${les.title}): Vận dụng kiến thức bài học vào tình huống thực tế:`;
        item = {
          q: qText,
          options: ["A. Giải pháp chưa tối ưu", "B. Cách xử lý chưa phù hợp", "C. Phương án giải quyết chính xác, hiệu quả và an toàn", "D. Bỏ qua tình huống thực tế"],
          ans: "C",
          explain: `Vận dụng thực hành bài "${les.title}" vào thực tiễn.`
        };
      } else if (bank.muc3 && bank.muc3.length) {
        item = bank.muc3[k % bank.muc3.length];
      } else {
        item = { q: `Câu hỏi vận dụng ${qIndex} môn ${subjectName}:`, options: ["A. Phương án 1", "B. Phương án 2", "C. Phương án 3", "D. Phương án 4"], ans: "C", explain: "Vận dụng kiến thức vào thực tế." };
      }

      mcqList.push({
        num: qIndex++,
        level: "Mức 3",
        score: scorePerMcq,
        text: item.q,
        options: item.options,
        ans: item.ans,
        explain: item.explain || "Vận dụng nâng cao và liên hệ thực tiễn."
      });
    }

    // Tự luận
    var essayList = [];
    if (essayCount > 0) {
      var essayBank = bank.essay || [];
      var essayScorePerItem = essayCount > 0 ? (totalEssayScore / essayCount) : 0;
      essayScorePerItem = Math.round(essayScorePerItem * 10) / 10;
      if (essayScorePerItem === 0) essayScorePerItem = 1.0;

      for (var e = 0; e < essayCount; e++) {
        var baseItem = essayBank[e % essayBank.length];
        var itemScore = (e === essayCount - 1) ? (totalEssayScore - essayScorePerItem * (essayCount - 1)) : essayScorePerItem;
        itemScore = Math.max(0.5, Math.round(itemScore * 10) / 10);

        if (baseItem) {
          essayList.push({
            num: e + 1,
            level: (e === 0 ? "Mức 2" : "Mức 3"),
            score: itemScore,
            title: `Câu ${e + 1} (${itemScore.toString().replace('.', ',')} điểm - ${e === 0 ? 'Mức 2' : 'Mức 3'}):`,
            text: baseItem.content || baseItem.title,
            solution: baseItem.solution,
            rubric: baseItem.rubric || [{ step: "Thực hiện đúng yêu cầu đề bài", score: `${itemScore.toString().replace('.', ',')}đ` }]
          });
        } else {
          essayList.push({
            num: e + 1,
            level: (e === 0 ? "Mức 2" : "Mức 3"),
            score: itemScore,
            title: `Câu ${e + 1} (${itemScore.toString().replace('.', ',')} điểm - ${e === 0 ? 'Mức 2' : 'Mức 3'}):`,
            text: essayGuide || `Vận dụng kiến thức môn ${subjectName} để giải quyết bài tập hoặc tình huống thực tế.`,
            solution: `Hướng dẫn giải chi tiết cho câu ${e + 1}...`,
            rubric: [{ step: "Thực hiện đầy đủ các bước giải đúng quy định", score: `${itemScore.toString().replace('.', ',')}đ` }]
          });
        }
      }
    }

    // Xây dựng bảng Ma trận
    var matrixTopics = [];
    var t1 = topics[0] || "Chủ đề 1";
    var t2 = topics[1] || "Chủ đề 2";
    var t3 = topics[2] || "Chủ đề 3";

    matrixTopics.push({
      topic: t1,
      m1_mcq: m1Count > 1 ? "Câu 1, 2" : (m1Count === 1 ? "Câu 1" : "-"),
      m1_essay: "-",
      m2_mcq: m2Count > 0 ? `Câu ${m1Count + 1}` : "-",
      m2_essay: "-",
      m3_mcq: "-",
      m3_essay: "-",
      total_mcq: Math.min(mcqCount, m1Count + 1),
      total_essay: 0,
      score: ((Math.min(mcqCount, m1Count + 1)) * scorePerMcq).toFixed(1)
    });

    if (t2) {
      matrixTopics.push({
        topic: t2,
        m1_mcq: m1Count > 2 ? `Câu 3, 4` : "-",
        m1_essay: "-",
        m2_mcq: m2Count > 1 ? `Câu ${m1Count + 2}` : "-",
        m2_essay: essayList.length > 0 ? "Câu 1" : "-",
        m3_mcq: "-",
        m3_essay: "-",
        total_mcq: Math.max(1, Math.round(mcqCount / 3)),
        total_essay: essayList.length > 0 ? 1 : 0,
        score: (Math.round((totalMcqScore / 3) * 10) / 10 + (essayList.length > 0 ? essayList[0].score : 0)).toFixed(1)
      });
    }

    if (t3) {
      matrixTopics.push({
        topic: t3,
        m1_mcq: "-",
        m1_essay: "-",
        m2_mcq: "-",
        m2_essay: "-",
        m3_mcq: m3Count > 0 ? `Câu ${mcqCount}` : "-",
        m3_essay: essayList.length > 1 ? "Câu 2" : "-",
        total_mcq: m3Count,
        total_essay: essayList.length > 1 ? 1 : 0,
        score: (m3Count * scorePerMcq + (essayList.length > 1 ? essayList[1].score : 0)).toFixed(1)
      });
    }

    var m1ScoreVal = Math.round((m1Count * scorePerMcq) * 10) / 10;
    var m2ScoreVal = Math.round((m2Count * scorePerMcq + (essayList.length > 0 ? essayList[0].score : 0)) * 10) / 10;
    var m3ScoreVal = Math.max(0.5, Math.round((10.0 - m1ScoreVal - m2ScoreVal) * 10) / 10);

    return {
      schoolName: "TRƯỜNG TIỂU HỌC .................................",
      examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ MÔN ${subjectName.toUpperCase()} - LỚP ${grade}`,
      examTerm: "HỌC KÌ I",
      subjectName: subjectName,
      grade: grade,
      duration: duration,
      schoolYear: "2025 - 2026",
      bookSeries: "Kết nối tri thức với cuộc sống",
      scopeDesc: scope,
      mcqTotalScore: totalMcqScore.toFixed(1),
      essayTotalScore: totalEssayScore.toFixed(1),
      matrix: {
        topics: matrixTopics,
        summary: {
          m1_total_mcq: m1Count,
          m1_total_essay: 0,
          m1_score: m1ScoreVal.toFixed(1),
          m2_total_mcq: m2Count,
          m2_total_essay: essayList.length > 0 ? 1 : 0,
          m2_score: m2ScoreVal.toFixed(1),
          m3_total_mcq: m3Count,
          m3_total_essay: essayList.length > 1 ? 1 : (essayList.length === 1 && m2Count === 0 ? 1 : 0),
          m3_score: m3ScoreVal.toFixed(1),
          total_mcq_count: mcqCount,
          total_essay_count: essayList.length,
          total_score: "10.0",
          m1_pct: m1Pct,
          m2_pct: m2Pct,
          m3_pct: m3Pct
        }
      },
      multipleChoice: mcqList,
      essaySection: essayList,
      source: "local",
      sourceName: "Ngân hàng SGK Số hóa (Ngoại tuyến)"
    };
  },

  /**
   * Xuất file Word (.doc) chuẩn mẫu thực tế tại thư mục D:\Tong hop\Đề CKI 25_26\TRIỀU
   */
  exportToWord: function(examData) {
    if (!examData) {
      showToast("Không có dữ liệu đề thi để xuất!", "warning");
      return;
    }

    var m = examData.matrix || {};
    var s = m.summary || {};
    var mcqScoreStr = examData.mcqTotalScore ? examData.mcqTotalScore.toString().replace('.', ',') : "7,0";
    var essayScoreStr = examData.essayTotalScore ? examData.essayTotalScore.toString().replace('.', ',') : "3,0";

    var docHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${examData.examTitle}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4;
            margin: 1.5cm 1.5cm 1.5cm 1.5cm;
            mso-header-margin: 36pt;
            mso-footer-margin: 36pt;
          }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.35;
            color: #000;
          }
          .title-bold-center {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .subtitle-center {
            text-align: center;
            font-size: 13pt;
            margin-bottom: 12px;
          }
          table.matrix-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table.matrix-table th, table.matrix-table td {
            border: 1px solid #000;
            padding: 5px 6px;
            text-align: center;
            font-size: 11pt;
          }
          table.matrix-table th {
            font-weight: bold;
            background-color: #f2f2f2;
          }
          table.header-table {
            width: 100%;
            border: none;
            margin-bottom: 12px;
          }
          table.header-table td {
            vertical-align: top;
            padding: 2px 4px;
          }
          table.eval-box {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
          }
          table.eval-box td {
            border: 1px solid #000;
            padding: 8px 10px;
            font-size: 12pt;
          }
          .section-heading {
            font-weight: bold;
            font-size: 13pt;
            margin-top: 14px;
            margin-bottom: 6px;
          }
          .q-block {
            margin-bottom: 10px;
          }
          .q-options {
            margin-left: 20px;
            margin-top: 4px;
          }
          .dotted-line {
            border-bottom: 1px dotted #555;
            height: 24px;
            margin-bottom: 2px;
          }
          .page-break {
            page-break-before: always;
            mso-break-type: section-break;
          }
        </style>
      </head>
      <body>

        <!-- ========================================== -->
        <!-- PHẦN I: MA TRẬN ĐỀ KIỂM TRA (CHUẨN KNTT) -->
        <!-- ========================================== -->
        <div class="title-bold-center">MA TRẬN ĐỀ THI HỌC KÌ I MÔN ${examData.subjectName.toUpperCase()} LỚP ${examData.grade} - KẾT NỐI TRI THỨC</div>
        <div class="subtitle-center">NĂM HỌC ${examData.schoolYear}</div>

        <table class="matrix-table">
          <thead>
            <tr>
              <th rowspan="3" style="width: 32%;">Chủ đề / Bài học</th>
              <th colspan="6">Mức độ nhận thức</th>
              <th colspan="2" rowspan="2">Tổng số câu</th>
              <th rowspan="3" style="width: 10%;">Điểm số</th>
            </tr>
            <tr>
              <th colspan="2">Mức 1<br>(Nhận biết)</th>
              <th colspan="2">Mức 2<br>(Kết nối)</th>
              <th colspan="2">Mức 3<br>(Vận dụng)</th>
            </tr>
            <tr>
              <th>TN</th>
              <th>TL</th>
              <th>TN</th>
              <th>TL</th>
              <th>TN</th>
              <th>TL</th>
              <th>TN</th>
              <th>TL</th>
            </tr>
          </thead>
          <tbody>
            ${(m.topics || []).map(function(t) {
              return `
                <tr>
                  <td style="text-align: left; font-weight: 500;">${t.topic}</td>
                  <td>${t.m1_mcq || '-'}</td>
                  <td>${t.m1_essay || '-'}</td>
                  <td>${t.m2_mcq || '-'}</td>
                  <td>${t.m2_essay || '-'}</td>
                  <td>${t.m3_mcq || '-'}</td>
                  <td>${t.m3_essay || '-'}</td>
                  <td><b>${t.total_mcq || 0}</b></td>
                  <td><b>${t.total_essay || 0}</b></td>
                  <td><b>${t.score ? t.score.toString().replace('.', ',') : '-'}</b></td>
                </tr>
              `;
            }).join('')}
            <tr style="font-weight: bold; background-color: #fafafa;">
              <td style="text-align: left;">Tổng số câu TN / TL</td>
              <td>${s.m1_total_mcq || 0}</td>
              <td>${s.m1_total_essay || 0}</td>
              <td>${s.m2_total_mcq || 0}</td>
              <td>${s.m2_total_essay || 0}</td>
              <td>${s.m3_total_mcq || 0}</td>
              <td>${s.m3_total_essay || 0}</td>
              <td>${s.total_mcq_count || 0}</td>
              <td>${s.total_essay_count || 0}</td>
              <td>${(s.total_mcq_count || 0) + (s.total_essay_count || 0)}</td>
            </tr>
            <tr style="font-weight: bold; background-color: #fafafa;">
              <td style="text-align: left;">Điểm số</td>
              <td colspan="2">${s.m1_score ? s.m1_score.toString().replace('.', ',') : '-'}</td>
              <td colspan="2">${s.m2_score ? s.m2_score.toString().replace('.', ',') : '-'}</td>
              <td colspan="2">${s.m3_score ? s.m3_score.toString().replace('.', ',') : '-'}</td>
              <td>${mcqScoreStr}</td>
              <td>${essayScoreStr}</td>
              <td>10,0</td>
            </tr>
            <tr style="font-weight: bold; background-color: #f0f0f0;">
              <td style="text-align: left;">Tỉ lệ %</td>
              <td colspan="2">${s.m1_pct || 40}%</td>
              <td colspan="2">${s.m2_pct || 40}%</td>
              <td colspan="2">${s.m3_pct || 20}%</td>
              <td colspan="2">100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>

        <!-- ========================================== -->
        <!-- PHẦN II: PHIẾU KIỂM TRA (ĐỀ HỌC SINH) -->
        <!-- ========================================== -->
        <div class="page-break"></div>

        <table class="header-table">
          <tr>
            <td style="width: 48%;">
              <b>${examData.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Tên học sinh: ...................................................<br>
              Lớp: ${examData.grade}.....
            </td>
            <td style="width: 52%; text-align: right;">
              <i>Thứ….. ngày … tháng … năm 2026</i><br>
              <b style="font-size: 13.5pt; text-transform: uppercase;">ĐỀ KIỂM TRA HỌC KÌ I</b><br>
              <b>MÔN: ${examData.subjectName.toUpperCase()} - LỚP ${examData.grade}</b><br>
              <i>Thời gian làm bài: ${examData.duration}</i>
            </td>
          </tr>
        </table>

        <table class="eval-box">
          <tr>
            <td style="width: 25%; text-align: center; height: 75px;">
              <b>Điểm</b>
            </td>
            <td style="width: 50%; text-align: center;">
              <b>Nhận xét của giáo viên</b>
            </td>
            <td style="width: 25%; text-align: center;">
              <b>Chữ kí của PHHS</b>
            </td>
          </tr>
        </table>

        <div class="section-heading">I. PHẦN TRẮC NGHIỆM (${mcqScoreStr} điểm)</div>
        <p style="margin: 0 0 10px 0; font-style: italic;">Khoanh vào chữ cái đặt trước câu trả lời đúng:</p>

        ${(examData.multipleChoice || []).map(function(q) {
          return `
            <div class="q-block">
              <b>Câu ${q.num}</b> (${q.score ? q.score.toString().replace('.', ',') : '0,5'} điểm - ${q.level || 'Mức 1'}): ${q.text}
              <div class="q-options">
                ${(q.options || []).map(function(opt) {
                  return `<div style="margin-bottom: 2px;">${opt}</div>`;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}

        ${(examData.essaySection && examData.essaySection.length > 0) ? `
          <div class="section-heading">II. PHẦN TỰ LUẬN (${essayScoreStr} điểm)</div>
          ${examData.essaySection.map(function(e) {
            return `
              <div class="q-block" style="margin-top: 10px;">
                <b>${e.title || `Câu ${e.num} (${e.score.toString().replace('.', ',')} điểm):`}</b> ${e.text}
                <div style="margin-top: 6px;">
                  <div class="dotted-line"></div>
                  <div class="dotted-line"></div>
                  <div class="dotted-line"></div>
                  <div class="dotted-line"></div>
                  <div class="dotted-line"></div>
                </div>
              </div>
            `;
          }).join('')}
        ` : ''}

        <!-- ========================================== -->
        <!-- PHẦN III: HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN -->
        <!-- ========================================== -->
        <div class="page-break"></div>

        <div class="title-bold-center">HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN MÔN ${examData.subjectName.toUpperCase()} LỚP ${examData.grade}</div>
        <div class="subtitle-center">Bộ sách: Kết nối tri thức với cuộc sống • Năm học ${examData.schoolYear}</div>

        <div class="section-heading">I. PHẦN TRẮC NGHIỆM (${mcqScoreStr} điểm)</div>
        <p style="margin: 0 0 8px 0; font-style: italic;">Mỗi câu trả lời đúng được ${examData.multipleChoice?.[0]?.score ? examData.multipleChoice[0].score.toString().replace('.', ',') : '0,5'} điểm.</p>

        <table class="matrix-table" style="margin-bottom: 18px;">
          <tr style="background-color: #f2f2f2; font-weight: bold;">
            <td style="width: 15%;">Câu hỏi</td>
            ${(examData.multipleChoice || []).map(function(q) {
              return `<td><b>Câu ${q.num}</b></td>`;
            }).join('')}
          </tr>
          <tr style="font-weight: bold; font-size: 13pt; color: #b91c1c;">
            <td>Đáp án</td>
            ${(examData.multipleChoice || []).map(function(q) {
              return `<td>${q.ans || '-'}</td>`;
            }).join('')}
          </tr>
        </table>

        ${(examData.essaySection && examData.essaySection.length > 0) ? `
          <div class="section-heading">II. PHẦN TỰ LUẬN (${essayScoreStr} điểm)</div>
          <table class="matrix-table" style="text-align: left;">
            <thead>
              <tr>
                <th style="width: 15%; text-align: center;">Câu</th>
                <th style="width: 65%; text-align: center;">Nội dung đáp án & Các bước giải</th>
                <th style="width: 20%; text-align: center;">Biểu điểm</th>
              </tr>
            </thead>
            <tbody>
              ${examData.essaySection.map(function(e) {
                return `
                  <tr>
                    <td style="text-align: center; vertical-align: top; font-weight: bold;">
                      Câu ${e.num}<br>(${e.score ? e.score.toString().replace('.', ',') : ''} đ)
                    </td>
                    <td style="vertical-align: top; white-space: pre-line;">
                      ${e.solution || e.text}
                    </td>
                    <td style="text-align: center; vertical-align: top;">
                      ${(e.rubric || []).map(function(r) {
                        return `<div><b>${r.score}</b></div>`;
                      }).join('') || `<b>${e.score ? e.score.toString().replace('.', ',') : ''} đ</b>`}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        ` : ''}

      </body>
      </html>
    `;

    var blob = new Blob([docHtml], { type: "application/msword;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    var filename = `De_Kiem_Tra_${examData.subjectName}_Lop_${examData.grade}_KNTT_2025_2026.doc`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Đã xuất file Word (.doc) chuẩn mẫu thành công!", "success");
  }
};

window.AIService = AIService;
