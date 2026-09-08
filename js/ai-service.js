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

  // Ngân hàng câu hỏi chuẩn cho các môn Toán, Khoa học, Xã hội...
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
        if (aiResult) {
          if (params.subjectId === 'TIENG_VIET' && (aiResult.readingExam || aiResult.isTiengViet)) {
            return aiResult;
          }
          if (aiResult.multipleChoice && aiResult.multipleChoice.length > 0) {
            return aiResult;
          }
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
    var grade = parseInt(params.grade) || 5;
    var subjectId = params.subjectId || "TOAN";
    var subInfo = this.EXAM_SUBJECTS[subjectId] || this.EXAM_SUBJECTS.TOAN;
    var subjectName = subInfo.name;
    var scope = params.scope || "Kiểm tra Định kỳ Cuối Học kỳ I";
    var duration = params.duration || (grade <= 2 ? "Đọc: 35 phút | Viết: 35 phút" : "Đọc: 40 phút | Viết: 40 phút");
    var schoolName = params.schoolName || "TRƯỜNG TIỂU HỌC .................................";
    var customPrompt = params.customPrompt || "";

    // Tra cứu dữ liệu SGK Kết nối tri thức số hóa
    var sgkKey = (subjectId || '').toLowerCase().replace('lich_su_dia_ly', 'lich_su_dia_li');
    var sgkContext = "";
    if (typeof window !== 'undefined' && window.SGK_DATA && typeof window.SGK_DATA.getScopeContent === 'function') {
      var scopeInfo = window.SGK_DATA.getScopeContent(grade, sgkKey, scope);
      if (scopeInfo && scopeInfo.found && scopeInfo.knowledgeDigest) {
        var digest = scopeInfo.knowledgeDigest;
        if (digest.length > 3000) {
          digest = digest.substring(0, 3000) + "\n...(và các bài học khác trong phạm vi)...";
        }
        sgkContext = `\n- NỘI DUNG SÁCH GIÁO KHOA SỐ HÓA KNTT THEO PHẠM VI RA ĐỀ:\n${digest}\n- YÊU CẦU: Các bài đọc, câu hỏi trắc nghiệm, luyện từ và câu PHẢI sử dụng chính xác các bài học, khái niệm và ngữ liệu của SGK Kết nối tri thức được cung cấp ở trên.`;
      }
    }

    var prompt = "";

    // =========================================================================
    // PROMPT CHUYÊN BIỆT CHO MÔN TIẾNG VIỆT (CHUẨN TT27: 2 PHIẾU ĐỌC & VIẾT)
    // =========================================================================
    if (subjectId === "TIENG_VIET") {
      var oralScore = parseFloat(params.tvOralScore) || 4.0;
      var oralMode = params.tvOralMode || "sgk"; // "sgk" | "custom"
      var compScore = Math.round((10.0 - oralScore) * 10) / 10;
      var dictScore = (grade <= 3) ? (parseFloat(params.tvDictationScore) || 4.0) : 0;
      var tlvScore = (grade <= 3) ? Math.round((10.0 - dictScore) * 10) / 10 : 10.0;
      var essayGenre = params.tvEssayGenre || (grade >= 4 ? "Văn miêu tả cây cối / cảnh vật / người" : "Viết đoạn văn theo chủ điểm");

      prompt = `
Bạn là chuyên gia sư phạm Tiểu học hàng đầu Việt Nam, am hiểu sâu sắc Chương trình GDPT 2018, Thông tư 27/2020/TT-BGDĐT và Bộ SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG môn Tiếng Việt.
Hãy soạn trọn bộ ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TIẾNG VIỆT LỚP ${grade} gồm 2 PHIẾU RIÊNG BIỆT (ĐỀ ĐỌC 10đ & ĐỀ VIẾT 10đ), MA TRẬN 3 MỨC ĐỘ VÀ HƯỚNG DẪN CHẤM BAREM CHI TIẾT với các thông số sau:

- MÔN HỌC: Tiếng Việt - Lớp ${grade}
- BỘ SÁCH: Kết nối tri thức với cuộc sống (KNTT)
- PHẠM VI: ${scope}
- ĐỀ ĐỌC (10,0 điểm):
  + Phần Đọc thành tiếng (${oralScore.toFixed(1).replace('.', ',')} điểm): Chế độ "${oralMode === 'sgk' ? '5 bài đọc trong SGK KNTT (bốc thăm)' : '1 bài đọc ngoài SGK có cấu tạo tương tự'}".
    * QUY TẮC CẦN TUÂN THỦ NGHIÊM NGẶT:
      - Trong Phiếu Đề Đọc của học sinh: ${oralMode === 'sgk' ? 'CHỈ in Tựa bài + Tập + Trang SGK KNTT (KHÔNG in bài đọc và KHÔNG in câu hỏi vào đề của học sinh).' : 'In đầy đủ TOÀN VĂN bài đọc vào đề cho học sinh đọc thành tiếng (KHÔNG in câu hỏi vào đề của học sinh).'}
      - Trong Hướng dẫn chấm (dành cho Giáo viên): In đầy đủ Câu hỏi + Gợi ý trả lời cho từng bài đọc để giáo viên hỏi và chấm điểm học sinh.
  + Phần Đọc hiểu & Luyện từ và câu (${compScore.toFixed(1).replace('.', ',')} điểm):
    * Cung cấp 1 văn bản đọc thầm hoàn chỉnh (có tựa đề, nội dung truyện/bài văn khoảng ${grade === 1 ? '40-60' : grade === 2 ? '80-110' : grade === 3 ? '150-180' : grade === 4 ? '200-250' : '250-300'} chữ và tên tác giả).
    * Hệ thống 8 câu hỏi (6 câu trắc nghiệm + 2 câu tự luận/đặt câu) theo ma trận 3 Mức độ (Mức 1, 2, 3), phân bố giữa Đọc hiểu văn bản và Luyện từ và câu/Kiến thức Tiếng Việt.

- ĐỀ VIẾT (10,0 điểm):
${grade <= 3 ? `  + Phần Chính tả Nghe - viết (${dictScore.toFixed(1).replace('.', ',')} điểm): Đoạn văn/thơ đúng chuẩn dung lượng Lớp ${grade} (${grade === 1 ? '30-35 chữ' : grade === 2 ? '45-50 chữ' : '65-70 chữ'}).
  + Phần Tập làm văn - Viết đoạn văn (${tlvScore.toFixed(1).replace('.', ',')} điểm): Đề bài yêu cầu viết đoạn văn (${grade <= 2 ? '3 đến 5 câu' : '5 đến 7 câu'}) theo chủ điểm đã học kèm gợi ý dàn ý.` : `  + Phần Tập làm văn (10,0 điểm duy nhất): Viết một bài văn hoàn chỉnh đúng thể loại (${essayGenre}) kèm gợi ý dàn ý (Mở bài, Thân bài, Kết bài). Bắt buộc có Barem chấm chi tiết 10 điểm trong Hướng dẫn chấm.`}
${sgkContext}
${customPrompt ? "- YÊU CẦU BỔ SUNG: " + customPrompt : ""}

HÃY TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON HỢP LỆ (Không có markdown block hoặc text bên ngoài JSON) có cấu trúc chuẩn như sau:
{
  "isTiengViet": true,
  "schoolName": "${schoolName}",
  "examTitle": "ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TIẾNG VIỆT LỚP ${grade}",
  "examTerm": "HỌC KÌ I",
  "subjectName": "Tiếng Việt",
  "grade": ${grade},
  "duration": "${duration}",
  "schoolYear": "2025 - 2026",
  "bookSeries": "Kết nối tri thức với cuộc sống",
  "scopeDesc": "${scope}",
  "readingExam": {
    "totalScore": 10.0,
    "oralScore": ${oralScore},
    "oralMode": "${oralMode}",
    "oralGuideIntro": "Học sinh bốc thăm đọc thành tiếng một đoạn văn/thơ trong các bài sau (thời gian đọc không quá 1 phút) và trả lời câu hỏi của giáo viên:",
    "oralItems": [
      {
        "title": "Tên bài đọc 1",
        "bookVolume": "Tập 1",
        "page": "Trang ...",
        "passage": "${oralMode === 'custom' ? 'Toàn văn bài đọc ngoài SGK...' : ''}",
        "question": "Câu hỏi kiểm tra đọc hiểu dành cho giáo viên hỏi học sinh",
        "answer": "Gợi ý câu trả lời đúng của học sinh"
      }
    ],
    "comprehensionScore": ${compScore},
    "comprehensionReading": {
      "title": "Tên bài văn đọc thầm",
      "author": "Tên tác giả",
      "passage": "Nội dung toàn văn bài văn đọc thầm phong phú, giàu tính giáo dục..."
    },
    "questions": [
      {
        "num": 1,
        "type": "mcq",
        "category": "reading",
        "level": "Mức 1",
        "score": 0.5,
        "text": "Nội dung câu hỏi trắc nghiệm đọc hiểu...",
        "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
        "ans": "A",
        "explain": "Giải thích chi tiết..."
      }
    ]
  },
  "writingExam": {
    "totalScore": 10.0,
    "grade": ${grade},
    "dictation": {
      "title": "Tên đoạn chính tả",
      "author": "Tên tác giả",
      "content": "Toàn văn đoạn văn / thơ chính tả...",
      "score": ${dictScore},
      "instruction": "Giáo viên đọc cho học sinh viết (khoảng 15 phút)."
    },
    "paragraphWriting": {
      "score": ${tlvScore},
      "prompt": "Đề bài viết đoạn văn...",
      "suggestions": ["Gợi ý 1", "Gợi ý 2", "Gợi ý 3"],
      "rubric": [
        { "criteria": "Hình thức đoạn văn", "score": "1,0đ", "detail": "Đúng số lượng câu, có câu mở đoạn kết đoạn." },
        { "criteria": "Nội dung và cảm xúc", "score": "3,0đ", "detail": "Nêu được tình cảm chân thật, chi tiết sinh động." },
        { "criteria": "Kỹ năng dùng từ, đặt câu, chính tả", "score": "2,0đ", "detail": "Không sai quá 3 lỗi chính tả, dùng từ gợi cảm." }
      ]
    },
    "essay": {
      "score": 10.0,
      "genre": "${essayGenre}",
      "prompt": "Đề bài Tập làm văn hoàn chỉnh...",
      "suggestions": ["Mở bài: Giới thiệu...", "Thân bài: Tả chi tiết...", "Kết bài: Nêu cảm nghĩ..."],
      "rubric": [
        { "criteria": "1. Mở bài", "score": "1,0đ", "detail": "Giới thiệu hấp dẫn đối tượng miêu tả/kể chuyện." },
        { "criteria": "2. Thân bài", "score": "4,0đ", "detail": "Miêu tả chi tiết, sinh động, sắp xếp ý hợp lý." },
        { "criteria": "3. Kết bài", "score": "1,0đ", "detail": "Bày tỏ cảm xúc chân thành, liên hệ bản thân." },
        { "criteria": "4. Chính tả, ngữ pháp, dùng từ", "score": "2,0đ", "detail": "Câu văn đúng ngữ pháp, không sai lỗi chính tả." },
        { "criteria": "5. Sáng tạo, cảm xúc", "score": "2,0đ", "detail": "Có hình ảnh so sánh, nhân hóa, liên tưởng độc đáo." }
      ]
    }
  },
  "matrix": {
    "readingMatrix": [
      { "component": "1. Đọc thành tiếng", "m1": "${oralScore.toFixed(1)}", "m2": "-", "m3": "-", "total": "${oralScore.toFixed(1)}" },
      { "component": "2. Đọc hiểu văn bản", "m1": "2.0 (Câu 1, 2)", "m2": "1.5 (Câu 3, 4)", "m3": "0.5 (Câu 5)", "total": "4.0" },
      { "component": "3. Luyện từ và câu", "m1": "0.5 (Câu 6)", "m2": "1.0 (Câu 7)", "m3": "0.5 (Câu 8)", "total": "2.0" }
    ],
    "writingMatrix": [
      ${grade <= 3 ? `{"component": "1. Chính tả (Nghe - viết)", "level": "Mức 1", "score": "${dictScore.toFixed(1)}"},
      {"component": "2. Tập làm văn (Viết đoạn)", "level": "Mức 2, 3", "score": "${tlvScore.toFixed(1)}"}` : `{"component": "Tập làm văn (Bài văn hoàn chỉnh)", "level": "Mức 1, 2, 3", "score": "10.0"}`}
    ]
  },
  "teacherGuide": {
    "oralGuide": {
      "criteria": "- Đọc đúng tiếng, từ, trôi chảy, lưu loát (${(oralScore - 1).toFixed(1)}đ)\n- Trả lời đúng câu hỏi đọc hiểu (1,0đ)",
      "qaList": [
        { "lessonTitle": "Bài 1...", "question": "Câu hỏi...", "answer": "Gợi ý trả lời..." }
      ]
    },
    "comprehensionAnswers": [
      { "num": 1, "ans": "A", "explain": "..." }
    ],
    "writingGuide": {
      "dictationCriteria": "- Đánh giá chữ viết, độ đều nét, trình bày sạch đẹp (1,0đ)\n- Lỗi chính tả trong bài (mỗi lỗi trừ 0,5đ): sai phụ âm đầu, vần, thanh, hoa...",
      "essayRubricTitle": "Barem chấm điểm Tập làm văn"
    }
  }
}
`;
    } else {
      // PROMPT CHO CÁC MÔN TOÁN, KHOA HỌC, XÃ HỘI...
      var mcqCount = parseInt(params.mcqCount) || 8;
      var essayCount = parseInt(params.essayCount) || 2;
      var essayGuide = params.essayGuide || "";
      var mcqPct = parseInt(params.mcqPercent) || 70;
      var essayPct = parseInt(params.essayPercent) || 30;
      var m1Pct = parseInt(params.level1Percent) || 40;
      var m2Pct = parseInt(params.level2Percent) || 40;
      var m3Pct = parseInt(params.level3Percent) || 20;

      prompt = `
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
  "schoolName": "${schoolName}",
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
    }

    // Gọi Gemini API model mới nhất (Tự động chuyển đổi thông minh)
    var models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
    var lastError = null;

    for (var m = 0; m < models.length; m++) {
      var modelName = models[m];
      try {
        var genConfig = {
          responseMimeType: "application/json",
          temperature: 0.2
        };
        // Tắt thinking budget ở gemini-2.5-flash để tốc độ sinh JSON siêu tốc (1-2 giây)
        if (modelName.indexOf("2.5") !== -1) {
          genConfig.thinkingConfig = { thinkingBudget: 0 };
        }

        var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: genConfig
          })
        });

        if (response.ok) {
          var data = await response.json();
          var rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (rawText) {
            var parsed = this.parseJsonSafely(rawText);
            if (parsed) {
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
   * Gọi Gemini API trực tiếp với bất kỳ prompt nào (Hỗ trợ AI Tích hợp Giáo án, phân tích văn bản...)
   */
  callGeminiApi: async function(apiKey, prompt, options) {
    var opt = options || {};
    var models = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-2.5-pro", "gemini-3.5-flash"];
    var lastError = null;

    for (var m = 0; m < models.length; m++) {
      var modelName = models[m];
      try {
        var genConfig = {
          temperature: typeof opt.temperature === 'number' ? opt.temperature : 0.3
        };
        if (opt.maxTokens) genConfig.maxOutputTokens = opt.maxTokens;
        if (opt.responseMimeType) genConfig.responseMimeType = opt.responseMimeType;
        if (modelName.indexOf("2.5") !== -1) {
          genConfig.thinkingConfig = { thinkingBudget: 0 };
        }

        var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: genConfig
          })
        });

        if (response.ok) {
          var data = await response.json();
          var rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (rawText) return rawText;
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
   * Bóc tách và phân tích JSON linh hoạt, chống lỗi định dạng chuỗi từ AI
   */
  parseJsonSafely: function(text) {
    if (!text) return null;
    var t = text.trim();
    try {
      return JSON.parse(t);
    } catch (e) {}

    // Bóc tách khối markdown ```json ... ```
    var match = t.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (e) {}
    }

    // Tìm dấu ngoặc nhọn đầu và cuối
    var start = t.indexOf("{");
    var end = t.lastIndexOf("}");
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(t.substring(start, end + 1));
      } catch (e) {}
    }

    return null;
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
    var duration = params.duration || (grade <= 2 ? "35 phút" : "40 phút");
    var schoolName = params.schoolName || "TRƯỜNG TIỂU HỌC .................................";

    // =========================================================================
    // XỬ LÝ RIÊNG CHO MÔN TIẾNG VIỆT NGOẠI TUYẾN CHUẨN KHO SÁCH KNTT
    // =========================================================================
    if (subjectId === "TIENG_VIET") {
      return this.generateSmartLocalTiengViet(grade, scope, params);
    }

    var mcqCount = Math.max(1, parseInt(params.mcqCount) || 8);
    var essayCount = Math.max(0, parseInt(params.essayCount) !== undefined ? parseInt(params.essayCount) : 2);
    var essayGuide = params.essayGuide || "";
    var mcqPct = parseInt(params.mcqPercent) || 70;
    var essayPct = parseInt(params.essayPercent) || 30;
    var m1Pct = parseInt(params.level1Percent) || 40;
    var m2Pct = parseInt(params.level2Percent) || 40;
    var m3Pct = parseInt(params.level3Percent) || 20;

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
      schoolName: schoolName,
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
   * Bộ tạo đề Tiếng Việt Ngoại tuyến chuyên sâu (Khối 1 đến 5 - Chuẩn TT27 & KNTT)
   */
  generateSmartLocalTiengViet: function(grade, scope, params) {
    params = params || {};
    var oralScore = parseFloat(params.tvOralScore) || 4.0;
    var oralMode = params.tvOralMode || "sgk";
    var compScore = Math.round((10.0 - oralScore) * 10) / 10;
    var dictScore = (grade <= 3) ? (parseFloat(params.tvDictationScore) || 4.0) : 0;
    var tlvScore = (grade <= 3) ? Math.round((10.0 - dictScore) * 10) / 10 : 10.0;
    var schoolName = params.schoolName || "TRƯỜNG TIỂU HỌC .................................";
    var duration = params.duration || (grade <= 2 ? "Đọc: 35 phút | Viết: 35 phút" : "Đọc: 40 phút | Viết: 40 phút");

    // Dữ liệu chuẩn KNTT cho từng khối lớp
    var tvDataByGrade = {
      1: {
        oralKntt: [
          { title: "Bài 4: Đi học", bookVolume: "Tập 2", page: "Trang 18", question: "Trong bài thơ, ai là người dắt tay em đến trường?", answer: "Mẹ dắt tay em từng bước tới trường." },
          { title: "Bài 12: Nụ hôn của mẹ", bookVolume: "Tập 2", page: "Trang 34", question: "Mẹ thể hiện tình yêu thương với bé bằng cử chỉ gì?", answer: "Mẹ trao cho bé nụ hôn ngọt ngào, ấm áp." },
          { title: "Bài 18: Rửa tay trước khi ăn", bookVolume: "Tập 2", page: "Trang 46", question: "Vì sao các bạn nhỏ cần rửa tay trước khi ăn?", answer: "Để giữ đôi tay sạch sẽ và phòng tránh vi khuẩn gây bệnh." },
          { title: "Bài 25: Cầu vồng", bookVolume: "Tập 2", page: "Trang 62", question: "Cầu vồng xuất hiện sau cơn mưa có mấy sắc màu rực rỡ?", answer: "Cầu vồng có bảy sắc màu rực rỡ uốn cong trên bầu trời." },
          { title: "Bài 34: Gửi lời chào lớp Một", bookVolume: "Tập 2", page: "Trang 88", question: "Khi tạm biệt lớp Một để lên lớp Hai, các bạn cảm thấy thế nào?", answer: "Cảm thấy bồi hồi, nhớ cô giáo và tự hào bước vào lớp Hai." }
        ],
        oralCustom: {
          title: "Chú gà trống nhỏ",
          author: "Phạm Hổ",
          passage: "Chú gà trống nhỏ có bộ lông sặc sỡ như một chiếc áo hoa. Sáng sớm tinh mơ, chú nhảy tót lên đống rơm cao, vươn cổ gáy vang: 'Ò... ó... o... o!' đánh thức cả xóm làng thức dậy chào đón ngày mới.",
          question: "Chú gà trống nhỏ làm việc gì vào mỗi buổi sáng sớm?",
          answer: "Chú nhảy lên đống rơm cao gáy vang đánh thức mọi người thức dậy."
        },
        compTitle: "Mèo con chăm ngoan",
        compAuthor: "Phong Thu",
        compPassage: "Mèo con có bộ lông trắng muốt và đôi mắt tròn xoe như hai hòn bi ve. Hằng ngày, sau giờ học, Mèo con luôn giúp mẹ quét dọn nhà cửa sạch sẽ và bắt chuột trong bếp. Cả nhà ai cũng yêu quý Mèo con vì chú vừa chăm chỉ lại ngoan ngoãn.",
        questions: [
          { num: 1, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Mèo con có đôi mắt được so sánh với hình ảnh nào?", options: ["A. Ngôi sao sáng", "B. Hai hòn bi ve", "C. Chiếc gương nhỏ", "D. Hạt cườm đen"], ans: "B", explain: "Trong bài: 'đôi mắt tròn xoe như hai hòn bi ve'." },
          { num: 2, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Sau giờ học, Mèo con làm những việc gì giúp mẹ?", options: ["A. Đi chơi bóng với bạn", "B. Nằm sưởi nắng ngoài sân", "C. Quét dọn nhà cửa và bắt chuột", "D. Xem phim hoạt hình"], ans: "C", explain: "Mèo con quét dọn nhà cửa và bắt chuột trong bếp." },
          { num: 3, type: "mcq", category: "reading", level: "Mức 2", score: 1.0, text: "Vì sao cả nhà ai cũng yêu quý Mèo con?", options: ["A. Vì Mèo con có bộ lông đẹp", "B. Vì Mèo con chạy rất nhanh", "C. Vì Mèo con vừa chăm chỉ lại ngoan ngoãn", "D. Vì Mèo con ngủ nhiều"], ans: "C", explain: "Chi tiết: 'vì chú vừa chăm chỉ lại ngoan ngoãn'." },
          { num: 4, type: "mcq", category: "language", level: "Mức 1", score: 0.5, text: "Từ ngữ nào dưới đây chỉ đặc điểm của bộ lông Mèo con?", options: ["A. Chăm chỉ", "B. Trắng muốt", "C. Quét dọn", "D. Ngoan ngoãn"], ans: "B", explain: "'Trắng muốt' là từ chỉ đặc điểm màu sắc." },
          { num: 5, type: "mcq", category: "language", level: "Mức 2", score: 1.0, text: "Tiếng nào dưới đây có chứa vần 'ươn'?", options: ["A. Nắng", "B. Trắng", "C. Vườn", "D. Mắt"], ans: "C", explain: "Tiếng 'vườn' có chứa vần 'ươn'." },
          { num: 6, type: "essay", category: "language", level: "Mức 2", score: 1.0, text: "Điền chữ 'c' hoặc 'k' vào chỗ trống thích hợp:\n  - con ...ua\n  - ...iên nhẫn", solution: "- con cua (chữ c)\n- kiên nhẫn (chữ k)", rubric: [{ step: "Điền đúng mỗi chữ được 0,5đ", score: "1,0đ" }] },
          { num: 7, type: "essay", category: "language", level: "Mức 3", score: 1.5, text: "Viết 1 câu nói về con vật nuôi mà em yêu thích.", solution: "Ví dụ: Chú cún nhà em rất ngoan ngoãn. (Đúng ngữ pháp, đầu câu viết hoa, cuối câu có dấu chấm)", rubric: [{ step: "Viết đúng câu hoàn chỉnh, đúng chính tả", score: "1,5đ" }] }
        ],
        dictation: {
          title: "Mùa xuân ấm áp",
          author: "Văn Hải",
          content: "Mùa xuân về, cỏ cây đâm chồi nảy lộc. Hoa đào nở rộ sắc hồng tươi thắm. Đàn chim én ríu rít chao liệng trên bầu trời trong xanh.",
          instruction: "Giáo viên đọc từng cụm từ cho học sinh viết (khoảng 15 phút)."
        },
        paragraph: {
          prompt: "Viết từ 2 đến 3 câu giới thiệu về một người bạn cùng lớp mà em yêu quý.",
          suggestions: ["Bạn tên là gì?", "Bạn có đặc điểm gì nổi bật (tính tình, hình dáng)?", "Tình cảm của em đối với bạn thế nào?"],
          rubric: [
            { criteria: "Số lượng câu & hình thức", score: "2,0đ", detail: "Viết đủ 2-3 câu, chữ viết rõ ràng." },
            { criteria: "Nội dung giới thiệu bạn", score: "3,0đ", detail: "Nêu đúng tên bạn và tình bạn gắn bó." },
            { criteria: "Chính tả & dấu câu", score: "1,0đ", detail: "Đầu câu viết hoa, cuối câu có dấu chấm." }
          ]
        }
      },

      2: {
        oralKntt: [
          { title: "Bài 1: Tôi là học sinh lớp 2", bookVolume: "Tập 1", page: "Trang 10", question: "Ngày đầu tiên trở thành học sinh lớp 2, bạn nhỏ cảm thấy mình thế nào?", answer: "Bạn nhỏ cảm thấy mình đã lớn hơn, vui vẻ và tự tin khi đến trường." },
          { title: "Bài 5: Em học vẽ", bookVolume: "Tập 1", page: "Trang 26", question: "Bạn nhỏ đã vẽ những cảnh đẹp nào của quê hương đất nước?", answer: "Bạn nhỏ vẽ bầu trời trong xanh, cánh đồng lúa chín vàng và dòng sông uốn lượn." },
          { title: "Bài 11: Ngôi trường mới", bookVolume: "Tập 1", page: "Trang 50", question: "Ngôi trường mới của các bạn nhỏ có những nét đẹp nổi bật nào?", answer: "Tường vôi trắng tinh, mái ngói đỏ tươi và bóng cây râm mát quanh sân trường." },
          { title: "Bài 18: Cây nhút nhát", bookVolume: "Tập 1", page: "Trang 82", question: "Cây xấu hổ đã có phản ứng e thẹn như thế nào khi có người chạm vào?", answer: "Cây khép nhanh những chiếc lá nhỏ li ti lại như một cô bé bẽn lẽn." },
          { title: "Bài 24: Cánh đồng của bố", bookVolume: "Tập 1", page: "Trang 110", question: "Bố cảm nhận được niềm vui gì khi nhìn thấy con khôn lớn mỗi ngày?", answer: "Bố cảm nhận niềm hạnh phúc vô bờ bến và tình yêu thương gia đình sâu sắc." }
        ],
        oralCustom: {
          title: "Vườn cây của ông",
          author: "Nguyễn Thị Mai",
          passage: "Vườn cây của ông rợp bóng mát. Mùa nào thức nấy, cây bưởi trĩu quả vàng ươm, cây ổi thơm lừng nơi góc vườn. Mỗi buổi sớm, ông lại xách bình tưới nước cho từng gốc cây. Tiếng chim hót líu lo làm khu vườn thêm rộn rã.",
          question: "Khu vườn của ông vào mỗi buổi sáng có những hình ảnh và âm thanh gì?",
          answer: "Có hình ảnh ông tưới nước cho cây và âm thanh tiếng chim hót líu lo rộn rã."
        },
        compTitle: "Món quà của cô giáo",
        compAuthor: "Vũ Hùng",
        compPassage: "Cuối năm học, cô giáo tặng cho mỗi bạn một món quà nhỏ. Bạn Nam được tặng một cuốn truyện tranh vì bạn đã có nhiều tiến bộ trong môn Tiếng Việt. Nhận món quà từ tay cô, Nam xúc động cảm ơn cô giáo. Em tự hứa sang năm học mới sẽ cố gắng học tập thật chăm chỉ hơn nữa để không phụ lòng mong mỏi của cô và cha mẹ.",
        questions: [
          { num: 1, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Vào dịp cuối năm học, cô giáo đã làm việc gì cho cả lớp?", options: ["A. Tổ chức một chuyến đi dã ngoại", "B. Tặng cho mỗi bạn một món quà nhỏ", "C. Mời phụ huynh đến dự liên hoan", "D. Cho các bạn nghỉ học sớm"], ans: "B", explain: "Chi tiết: 'Cuối năm học, cô giáo tặng cho mỗi bạn một món quà nhỏ'." },
          { num: 2, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Vì sao bạn Nam được cô giáo tặng cuốn truyện tranh?", options: ["A. Vì Nam chạy nhanh nhất lớp", "B. Vì Nam vẽ tranh rất đẹp", "C. Vì Nam có nhiều tiến bộ trong môn Tiếng Việt", "D. Vì Nam là lớp trưởng"], ans: "C", explain: "Chi tiết: 'vì bạn đã có nhiều tiến bộ trong môn Tiếng Việt'." },
          { num: 3, type: "mcq", category: "reading", level: "Mức 2", score: 1.0, text: "Sau khi nhận quà của cô, bạn Nam đã tự hứa điều gì?", options: ["A. Sẽ đọc hết cuốn truyện ngay trong ngày", "B. Sẽ cố gắng học chăm chỉ hơn trong năm học mới", "C. Sẽ mang truyện cho các bạn mượn", "D. Sẽ xin cô thêm quà"], ans: "B", explain: "Nam tự hứa sang năm học mới sẽ cố gắng học tập thật chăm chỉ hơn." },
          { num: 4, type: "mcq", category: "language", level: "Mức 1", score: 0.5, text: "Từ nào dưới đây là từ chỉ hoạt động?", options: ["A. Cuốn truyện", "B. Xúc động", "C. Tặng", "D. Chăm chỉ"], ans: "C", explain: "'Tặng' là từ chỉ hoạt động của cô giáo." },
          { num: 5, type: "mcq", category: "language", level: "Mức 2", score: 1.0, text: "Câu 'Nam là một học sinh chăm chỉ.' thuộc mẫu câu nào?", options: ["A. Ai làm gì?", "B. Ai là gì?", "C. Ai thế nào?", "D. Ai ở đâu?"], ans: "B", explain: "Câu giới thiệu, nhận định về Nam nên là mẫu câu 'Ai là gì?'." },
          { num: 6, type: "essay", category: "language", level: "Mức 2", score: 1.0, text: "Đặt dấu chấm hoặc dấu chấm hỏi thích hợp vào ô trống:\n  - Hôm nay bạn có đi học không [ ]\n  - Chúng em đang ngồi nghe cô giảng bài [ ]", solution: "- Hôm nay bạn có đi học không? [?]\n- Chúng em đang ngồi nghe cô giảng bài. [.]", rubric: [{ step: "Điền đúng mỗi dấu câu được 0,5đ", score: "1,0đ" }] },
          { num: 7, type: "essay", category: "language", level: "Mức 3", score: 1.5, text: "Đặt 1 câu theo mẫu 'Ai làm gì?' để kể về một việc em giúp đỡ bố mẹ ở nhà.", solution: "Ví dụ: Em quét nhà giúp mẹ sau giờ học.", rubric: [{ step: "Đặt câu đúng mẫu Ai làm gì, đầu câu viết hoa, cuối câu có dấu chấm", score: "1,5đ" }] }
        ],
        dictation: {
          title: "Mùa gặt quê em",
          author: "Nguyễn Đình Thi",
          content: "Cánh đồng quê em trải rộng một màu vàng óng ả. Từng bông lúa uốn câu trĩu hạt rung rinh theo làn gió nhẹ. Tiếng máy gặt rộn rã khắp xóm làng báo hiệu một mùa màng bội thu, ấm no.",
          instruction: "Giáo viên đọc từng cụm từ cho học sinh viết chính tả (khoảng 15 phút)."
        },
        paragraph: {
          prompt: "Viết một đoạn văn (từ 3 đến 5 câu) kể về một việc tốt em đã làm để giúp đỡ người khác.",
          suggestions: ["Em đã làm việc tốt đó ở đâu và khi nào?", "Em đã giúp ai và việc giúp đỡ diễn ra như thế nào?", "Sau khi làm việc tốt đó, em cảm thấy như thế nào?"],
          rubric: [
            { criteria: "Hình thức đoạn văn (3-5 câu)", score: "1,5đ", detail: "Đúng dung lượng, câu văn trọn vẹn ý." },
            { criteria: "Nội dung việc tốt & cảm xúc", score: "3,0đ", detail: "Kể rõ hành động giúp đỡ và niềm vui của bản thân." },
            { criteria: "Kỹ năng chính tả, dùng từ", score: "1,5đ", detail: "Đúng chính tả, dùng từ ngữ phù hợp, dấu câu chuẩn." }
          ]
        }
      },

      3: {
        oralKntt: [
          { title: "Bài 1: Ngày gặp lại", bookVolume: "Tập 1", page: "Trang 10", question: "Niềm vui lớn nhất của bạn Chi trong ngày tựu trường gặp lại thầy cô và bạn bè là gì?", answer: "Được gặp lại thầy cô, chia sẻ những kỉ niệm mùa hè và cùng bạn bè bước vào năm học mới." },
          { title: "Bài 5: Mùa hè lấp lánh", bookVolume: "Tập 1", page: "Trang 24", question: "Cảnh sắc thiên nhiên mùa hè nơi làng quê được miêu tả rực rỡ ra sao?", answer: "Nắng vàng rực rỡ, tiếng ve ngân vang rộn rã và cây trái đơm hoa kết trái ngọt ngào." },
          { title: "Bài 11: Lời kêu gọi toàn dân tập thể dục", bookVolume: "Tập 1", page: "Trang 48", question: "Bác Hồ đã khuyên đồng bào cả nước cần làm gì để giữ gìn sức khỏe?", answer: "Mỗi người dân hằng ngày nên chăm chỉ luyện tập thể dục để thân thể khỏe mạnh, giúp ích cho đất nước." },
          { title: "Bài 18: Tập nấu ăn", bookVolume: "Tập 1", page: "Trang 84", question: "Các bạn nhỏ cảm thấy trải nghiệm tự tay nấu món ăn gia đình có ý nghĩa gì?", answer: "Cảm thấy hào hứng, biết quý trọng công sức của mẹ và biết chia sẻ việc nhà." },
          { title: "Bài 24: Bạn nhỏ trong nhà", bookVolume: "Tập 1", page: "Trang 108", question: "Tình cảm gắn bó giữa bạn nhỏ và chú cún cưng trong gia đình thể hiện qua chi tiết nào?", answer: "Cùng chơi đùa vui vẻ, chia sẻ đồ ăn và chú cún luôn mừng rỡ đón bạn mỗi khi đi học về." }
        ],
        oralCustom: {
          title: "Hương hoa sữa mùa thu",
          author: "Nguyễn Phan Hách",
          passage: "Mùa thu Hà Nội nồng nàn hương hoa sữa. Từng chùm hoa nhỏ li ti màu trắng ngà ẩn hiện sau những tán lá xanh rì. Gió heo may thổi nhẹ mang hương hoa lan tỏa khắp phố phường, gợi nhắc bao kỉ niệm thân thương thời cắp sách tới trường.",
          question: "Hình ảnh và hương thơm của hoa sữa mùa thu được miêu tả như thế nào?",
          answer: "Hoa sữa có những chùm nhỏ li ti màu trắng ngà và hương thơm nồng nàn lan tỏa theo gió heo may."
        },
        compTitle: "Khu vườn của tuổi thơ",
        compAuthor: "Trần Đăng Khoa",
        compPassage: "Khu vườn nhà bà ngoại là cả một thế giới diệu kì đối với tôi. Giữa vườn, cây ổi găng cành lá xum xuê, quả chín tỏa hương thơm ngát. Góc ao, đàn vịt bầu bơi lội tung tăng làm xao động mặt nước trong veo như gương. Mỗi dịp nghỉ hè về thăm ngoại, tôi lại được cùng bà chăm sóc luống rau non và nghe bà kể những câu chuyện cổ tích êm đềm dưới bóng cây râm mát.",
        questions: [
          { num: 1, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Cây ổi găng trong khu vườn nhà bà ngoại có đặc điểm gì nổi bật?", options: ["A. Cành khẳng khiu chưa ra lá", "B. Cành lá xum xuê, quả chín tỏa hương thơm ngát", "C. Thấp bé bên bờ rào", "D. Chỉ có hoa màu trắng"], ans: "B", explain: "Trong bài: 'cây ổi găng cành lá xum xuê, quả chín tỏa hương thơm ngát'." },
          { num: 2, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Hình ảnh mặt nước ao được so sánh với sự vật nào?", options: ["A. Tấm lụa xanh", "B. Chiếc gương soi", "C. Viên ngọc bích", "D. Bầu trời xanh"], ans: "B", explain: "Trong bài: 'mặt nước trong veo như gương'." },
          { num: 3, type: "mcq", category: "reading", level: "Mức 2", score: 1.0, text: "Mỗi dịp nghỉ hè về thăm quê ngoại, bạn nhỏ thường làm những việc gì?", options: ["A. Đi câu cá và thả diều ngoài đồng", "B. Cùng bà chăm sóc luống rau và nghe bà kể chuyện cổ tích", "C. Lên đồi hái sim chín", "D. Nằm đọc truyện trong nhà"], ans: "B", explain: "Chi tiết: 'cùng bà chăm sóc luống rau non và nghe bà kể những câu chuyện cổ tích'." },
          { num: 4, type: "mcq", category: "language", level: "Mức 1", score: 0.5, text: "Tìm từ so sánh trong câu 'Mặt nước trong veo như gương.'?", options: ["A. Trong veo", "B. Như", "C. Mặt nước", "D. Gương"], ans: "B", explain: "Từ so sánh là 'như'." },
          { num: 5, type: "mcq", category: "language", level: "Mức 2", score: 1.0, text: "Bộ phận gạch chân trong câu 'Chúng em **chăm chú lắng nghe bà kể chuyện**' trả lời cho câu hỏi nào?", options: ["A. Là gì?", "B. Làm gì?", "C. Như thế nào?", "D. Ở đâu?"], ans: "B", explain: "'chăm chú lắng nghe...' nêu hoạt động nên trả lời cho câu hỏi 'Làm gì?'." },
          { num: 6, type: "essay", category: "language", level: "Mức 2", score: 1.0, text: "Tìm 2 từ chỉ đặc điểm có trong bài văn trên và đặt 1 câu với một trong hai từ vừa tìm được.", solution: "- 2 từ chỉ đặc điểm: xum xuê, thơm ngát (hoặc trong veo, diệu kì, êm đềm) (0,5đ)\n- Đặt câu: Nước suối đầu nguồn chảy trong veo. (0,5đ)", rubric: [{ step: "Tìm đúng 2 từ chỉ đặc điểm", score: "0,5đ" }, { step: "Đặt câu đúng ngữ pháp, có nghĩa", score: "0,5đ" }] },
          { num: 7, type: "essay", category: "language", level: "Mức 3", score: 1.5, text: "Em hãy viết 1 câu có sử dụng biện pháp so sánh để tả vẻ đẹp của một loài cây hoặc bông hoa.", solution: "Ví dụ: Bông hoa hướng dương xòe cánh rực rỡ như ông mặt trời nhỏ.", rubric: [{ step: "Viết câu có hình ảnh so sánh sinh động, đúng quy tắc", score: "1,5đ" }] }
        ],
        dictation: {
          title: "Buổi sáng trên quê hương",
          author: "Lê Thành Long",
          content: "Khi ông mặt trời vừa nhô lên khỏi rặng tre, sương sớm long lanh còn đọng trên từng ngọn cỏ. Làn gió thu nhẹ nhàng thổi qua mang theo hương thơm ngát của đồng lúa chín. Đàn chim ríu rít chuyền cành cất tiếng hót đón chào ngày mới tươi vui.",
          instruction: "Giáo viên đọc cho học sinh viết bài trong thời gian 15 phút."
        },
        paragraph: {
          prompt: "Viết đoạn văn (từ 5 đến 7 câu) thể hiện tình cảm, cảm xúc của em đối với một người thân yêu trong gia đình (ông, bà, bố, mẹ...).",
          suggestions: ["Người thân em muốn kể là ai?", "Người đó có nét tính cách hoặc việc làm nào khiến em nhớ nhất?", "Tình cảm và mong ước của em dành cho người thân đó như thế nào?"],
          rubric: [
            { criteria: "Bố cục & dung lượng (5-7 câu)", score: "1,5đ", detail: "Đoạn văn hoàn chỉnh, có câu mở đoạn và kết đoạn." },
            { criteria: "Nội dung & cảm xúc chân thực", score: "3,0đ", detail: "Diễn đạt tình cảm sâu sắc, chọn lọc chi tiết ấm áp." },
            { criteria: "Kỹ năng chính tả & dùng từ", score: "1,5đ", detail: "Từ ngữ gợi cảm, câu văn mạch lạc, không sai chính tả." }
          ]
        }
      },

      4: {
        oralKntt: [
          { title: "Bài 1: Điều kì diệu", bookVolume: "Tập 1", page: "Trang 10", question: "Thông điệp sâu sắc nhất về sự khác biệt độc đáo của mỗi cá nhân là gì?", answer: "Mỗi con người đều có nét độc đáo và thế mạnh riêng, cần được tôn trọng và phát huy." },
          { title: "Bài 5: Vệt phấn trên mặt bàn", bookVolume: "Tập 1", page: "Trang 28", question: "Vì sao bạn Nam quyết định xóa đi vệt phấn chia đôi chiếc bàn học?", answer: "Vì Nam hiểu ra bạn Mai bị tật ở tay và muốn sẻ chia, giúp đỡ bạn cùng học tập." },
          { title: "Bài 11: Tiếng nói của cỏ cây", bookVolume: "Tập 1", page: "Trang 52", question: "Cậu bé đã cảm nhận được điều kì diệu gì từ thế giới tự nhiên xung quanh mình?", answer: "Cảm nhận thiên nhiên luôn tràn đầy sức sống và có những lời thì thầm kì diệu truyền cảm hứng." },
          { title: "Bài 18: Bầu trời mùa thu", bookVolume: "Tập 1", page: "Trang 84", question: "Vẻ đẹp của bầu trời mùa thu được các bạn học sinh cảm nhận phong phú ra sao?", answer: "Bầu trời trong xanh vời vợi, mây trắng như những cánh buồm trôi và không khí dịu mát." },
          { title: "Bài 24: Người tìm đường lên các vì sao", bookVolume: "Tập 1", page: "Trang 112", question: "Ý chí kiên trì vượt khó của nhà bác học Xi-ôn-cốp-xki được thể hiện như thế nào?", answer: "Dù bị điếc và nghèo khó, ông vẫn miệt mài tự học và nghiên cứu thành công tên lửa du hành vũ trụ." }
        ],
        oralCustom: {
          title: "Bình minh trên biển đảo quê hương",
          author: "Trần Đăng",
          passage: "Vầng đông vừa hé rạng, mặt trời như quả cầu lửa khổng lồ từ từ nhô lên từ lòng biển khơi. Mặt biển nhuộm một màu hồng lấp lánh như dát vàng. Những đoàn thuyền đánh cá no gió nối đuôi nhau cập bến trong niềm hân hoan rộn rã của ngư dân làng chài.",
          question: "Cảnh mặt trời mọc trên biển được tác giả so sánh với hình ảnh độc đáo nào?",
          answer: "Mặt trời được so sánh như quả cầu lửa khổng lồ nhô lên từ lòng biển khơi."
        },
        compTitle: "Kì quan Rừng Cúc Phương",
        compAuthor: "Nguyễn Hoàng",
        compPassage: "Vườn quốc gia Cúc Phương là một bảo tàng thiên nhiên rộng lớn với thảm thực vật nhiệt đới vô cùng phong phú. Nơi đây có cây chò ngàn năm tuổi sừng sững giữa đại ngàn, thân cây to chừng hơn mười người ôm không xuể. Vào mùa bướm nở, hàng triệu cánh bướm trắng muốt rập rờn bay lượn ngợp lối đi tựa như lạc vào chốn bồng lai tiên cảnh. Cúc Phương không chỉ là niềm tự hào của thiên nhiên Việt Nam mà còn là lá phổi xanh kì diệu cần được muôn đời gìn giữ.",
        questions: [
          { num: 1, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Vườn quốc gia Cúc Phương được ví như công trình gì của tự nhiên?", options: ["A. Khu vui chơi giải trí", "B. Một bảo tàng thiên nhiên rộng lớn", "C. Khu rừng nhân tạo", "D. Một công viên sinh thái"], ans: "B", explain: "Trong bài: 'Vườn quốc gia Cúc Phương là một bảo tàng thiên nhiên rộng lớn'." },
          { num: 2, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Cây chò ngàn năm tuổi ở Cúc Phương có kích thước thân cây như thế nào?", options: ["A. Một người ôm vừa", "B. Ba người ôm không xuể", "C. Hơn mười người ôm không xuể", "D. Cao bằng mái nhà"], ans: "C", explain: "Chi tiết: 'thân cây to chừng hơn mười người ôm không xuể'." },
          { num: 3, type: "mcq", category: "reading", level: "Mức 2", score: 1.0, text: "Hình ảnh hàng triệu cánh bướm mùa nở rộ được miêu tả đẹp như thế nào?", options: ["A. Rập rờn bay lượn tựa như lạc vào chốn bồng lai tiên cảnh", "B. Đậu kín trên các tán lá cây", "C. Bay theo từng đàn nhỏ ven suối", "D. Nấp sau các bụi cây rậm"], ans: "A", explain: "Chi tiết: 'hàng triệu cánh bướm trắng muốt rập rờn bay lượn... tựa như lạc vào chốn bồng lai tiên cảnh'." },
          { num: 4, type: "mcq", category: "language", level: "Mức 1", score: 0.5, text: "Trong câu 'Cây chò ngàn năm tuổi sừng sững giữa đại ngàn', từ 'sừng sững' thuộc từ loại nào?", options: ["A. Danh từ", "B. Động từ", "C. Tính từ", "D. Đại từ"], ans: "C", explain: "'Sừng sững' là tính từ miêu tả tư thế uy nghi, đồ sộ." },
          { num: 5, type: "mcq", category: "language", level: "Mức 2", score: 1.0, text: "Biện pháp tu từ nào được sử dụng trong câu 'Cúc Phương là lá phổi xanh kì diệu của đất nước ta'?", options: ["A. So sánh", "B. Nhân hóa", "C. Điệp ngữ", "D. Đảo ngữ"], ans: "A", explain: "So sánh ngầm (Cúc Phương là lá phổi xanh)." },
          { num: 6, type: "essay", category: "language", level: "Mức 2", score: 1.0, text: "Tìm 1 danh từ riêng và 2 danh từ chung có trong đoạn trích trên.", solution: "- 1 danh từ riêng: Cúc Phương (hoặc Việt Nam) (0,5đ)\n- 2 danh từ chung: cây chò, cánh bướm, đại ngàn, lối đi, thân cây... (0,5đ)", rubric: [{ step: "Tìm đúng danh từ riêng", score: "0,5đ" }, { step: "Tìm đúng 2 danh từ chung", score: "0,5đ" }] },
          { num: 7, type: "essay", category: "language", level: "Mức 3", score: 1.5, text: "Viết 1 đoạn văn ngắn (từ 2 đến 3 câu) nêu cảm nghĩ của em về trách nhiệm bảo vệ rừng và thiên nhiên của học sinh.", solution: "Ví dụ: Rừng cây là lá phổi xanh bảo vệ cuộc sống của con người. Chúng em cần tích cực trồng và chăm sóc cây xanh, không xả rác bừa bãi để giữ gìn môi trường luôn tươi đẹp.", rubric: [{ step: "Nội dung ý nghĩa, liên hệ thiết thực, câu cú chuẩn mực", score: "1,5đ" }] }
        ],
        essay: {
          score: 10.0,
          genre: "Văn miêu tả cây cối",
          prompt: "Em hãy viết một bài văn miêu tả một cây bóng mát (hoặc cây ăn quả, cây hoa) mà em yêu thích gắn bó với sân trường hoặc nơi em ở.",
          suggestions: [
            "Mở bài: Giới thiệu cây em định tả (cây gì, trồng ở đâu, do ai trồng)?",
            "Thân bài: Tả bao quát hình dáng cây từ xa đến gần. Tả chi tiết từng bộ phận (gốc, rễ, thân, cành lá, hoa hoặc quả...). Nét đổi thay của cây theo thời gian hoặc mùa.",
            "Kết bài: Tình cảm, sự gắn bó và việc chăm sóc bảo vệ cây của em."
          ],
          rubric: [
            { criteria: "1. Mở bài", score: "1,0đ", detail: "Giới thiệu trực tiếp hoặc gián tiếp sinh động về loài cây định tả." },
            { criteria: "2. Thân bài", score: "4,0đ", detail: "Tả bao quát (1,0đ) + Tả chi tiết các bộ phận nổi bật và cảnh vật liên quan (3,0đ)." },
            { criteria: "3. Kết bài", score: "1,0đ", detail: "Nêu cảm nghĩ sâu sắc và sự gắn bó thân thiết với loài cây." },
            { criteria: "4. Chính tả, dùng từ, đặt câu", score: "2,0đ", detail: "Không sai quá 3 lỗi chính tả, dùng từ gợi tả gợi cảm, câu chuẩn ngữ pháp." },
            { criteria: "5. Sáng tạo & cảm xúc", score: "2,0đ", detail: "Có hình ảnh so sánh, nhân hóa độc đáo, giọng văn truyền cảm." }
          ]
        }
      },

      5: {
        oralKntt: [
          { title: "Bài 1: Thanh âm của gió", bookVolume: "Tập 1", page: "Trang 10", question: "Tiếng gió thổi qua cánh đồng làng gợi cho tác giả những cảm xúc và kí ức gì?", answer: "Gợi nhớ những ngày thơ ấu êm đềm, tình yêu quê hương da diết và nét đẹp thanh bình làng quê." },
          { title: "Bài 5: Cánh đồng hoa", bookVolume: "Tập 1", page: "Trang 32", question: "Vì sao các bạn nhỏ quyết định chung tay bảo vệ và chăm sóc cánh đồng hoa dại?", answer: "Vì muốn giữ gìn vẻ đẹp thiên nhiên và môi trường sống trong lành cho muôn loài." },
          { title: "Bài 11: Hương mật ong rừng", bookVolume: "Tập 1", page: "Trang 58", question: "Nét văn hóa độc đáo của nghề gác kèo ong ở rừng U Minh được miêu tả như thế nào?", answer: "Thể hiện sự am hiểu tập tính loài ong, sống hòa hợp với thiên nhiên và trân trọng sản vật rừng thiêng." },
          { title: "Bài 18: Hội thổi cơm thi ở Đồng Vân", bookVolume: "Tập 1", page: "Trang 92", question: "Hội thổi cơm thi thể hiện nét đẹp văn hóa truyền thống nào của nhân dân ta?", answer: "Thể hiện sự khéo léo, tình đoàn kết xóm làng và tinh thần tôn vinh hạt gạo quê hương." },
          { title: "Bài 24: Bài ca Trái Đất", bookVolume: "Tập 1", page: "Trang 120", question: "Thông điệp hòa bình và bảo vệ hành tinh xanh được tác giả gửi gắm qua những hình ảnh nào?", answer: "Hình ảnh Trái Đất là quả bóng xanh bay giữa trời cao, là ngôi nhà chung của trẻ em khắp năm châu." }
        ],
        oralCustom: {
          title: "Dòng sông quê hương",
          author: "Lê Anh Xuân",
          passage: "Quê hương tôi có con sông xanh biếc, nước gương trong soi tóc những hàng tre. Tâm hồn tôi là một buổi trưa hè, tỏa nắng xuống lòng sông lấp loáng. Dòng sông đã bồi đắp phù sa màu mỡ cho những bãi ngô xanh mướt và nuôi dưỡng tâm hồn tuổi thơ tôi khôn lớn từng ngày.",
          question: "Dòng sông quê hương đã đem lại những điều kì diệu gì cho thiên nhiên và con người?",
          answer: "Dòng sông bồi đắp phù sa cho cây trái tốt tươi và nuôi dưỡng tâm hồn tuổi thơ tác giả."
        },
        compTitle: "Kí ức dòng sông mùa lũ",
        compAuthor: "Nguyễn Quang Sáng",
        compPassage: "Mỗi năm khi con nước lũ đổ về, dòng sông Tiền lại khoác lên mình màu áo phù sa đỏ quạch cuồn cuộn chảy. Nước sông dâng cao mang theo nguồn tôm cá dồi dào và phù sa màu mỡ bồi đắp cho những miệt vườn trĩu quả. Trên mặt sông, xuồng ghe tấp nập ngược xuôi đánh bắt thủy sản, tiếng cười nói rộn rã xua tan mọi nhọc nhằn. Đối với người dân Nam Bộ, mùa nước nổi không phải là thiên tai mà là món quà vô giá của mẹ thiên nhiên ban tặng.",
        questions: [
          { num: 1, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Vào mùa lũ, dòng sông Tiền được miêu tả khoác lên mình hình ảnh gì?", options: ["A. Dòng nước trong xanh phẳng lặng", "B. Màu áo phù sa đỏ quạch cuồn cuộn chảy", "C. Làn sương mù trắng xóa", "D. Dòng nước đóng băng"], ans: "B", explain: "Chi tiết: 'khoác lên mình màu áo phù sa đỏ quạch cuồn cuộn chảy'." },
          { num: 2, type: "mcq", category: "reading", level: "Mức 1", score: 0.5, text: "Mùa nước nổi mang lại những lợi ích to lớn nào cho người dân miệt vườn?", options: ["A. Giúp đi lại thuận tiện bằng xe cộ", "B. Mang theo nguồn tôm cá dồi dào và phù sa bồi đắp đất đai", "C. Làm cho cây cối rụng lá", "D. Giúp thời tiết mát mẻ quanh năm"], ans: "B", explain: "Chi tiết: 'mang theo nguồn tôm cá dồi dào và phù sa màu mỡ bồi đắp cho những miệt vườn trĩu quả'." },
          { num: 3, type: "mcq", category: "reading", level: "Mức 2", score: 1.0, text: "Vì sao người dân Nam Bộ coi mùa nước nổi là món quà vô giá của mẹ thiên nhiên?", options: ["A. Vì mùa lũ giúp họ được nghỉ ngơi không phải làm việc", "B. Vì mùa lũ mang lại nguồn sống trù phú và bồi đắp đất đai phì nhiêu", "C. Vì mùa lũ làm cho cảnh sắc đẹp hơn", "D. Vì mùa lũ kéo dài nhiều tháng"], ans: "B", explain: "Mùa nước nổi đem lại nguồn thủy sản phong phú và phù sa nuôi dưỡng đất đai trù phú." },
          { num: 4, type: "mcq", category: "language", level: "Mức 1", score: 0.5, text: "Cặp quan hệ từ trong câu 'Mặc dù nước lũ dâng cao nhưng người dân vẫn hăng say lao động.' biểu thị quan hệ gì?", options: ["A. Nguyên nhân - Kết quả", "B. Tương phản", "C. Giả thiết - Kết quả", "D. Tăng tiến"], ans: "B", explain: "Cặp 'Mặc dù... nhưng...' biểu thị quan hệ tương phản." },
          { num: 5, type: "mcq", category: "language", level: "Mức 2", score: 1.0, text: "Từ 'ngọt ngào' trong câu nào dưới đây được dùng theo nghĩa chuyển?", options: ["A. Quả cam này có vị ngọt ngào.", "B. Giọng hát của cô giáo thật ngọt ngào.", "C. Bát chè đỗ đen ngọt ngào.", "D. Đường mía ngọt ngào."], ans: "B", explain: "'Ngọt ngào' tả giọng hát hay, truyền cảm là dùng theo nghĩa chuyển." },
          { num: 6, type: "essay", category: "language", level: "Mức 2", score: 1.0, text: "Xác định chủ ngữ và vị ngữ trong câu sau:\n'Trên mặt sông, những chiếc xuồng ghe chở đầy ắp tôm cá đang hối hả cập bến.'", solution: "- Trạng ngữ: Trên mặt sông\n- Chủ ngữ: những chiếc xuồng ghe chở đầy ắp tôm cá (0,5đ)\n- Vị ngữ: đang hối hả cập bến (0,5đ)", rubric: [{ step: "Xác định đúng chủ ngữ", score: "0,5đ" }, { step: "Xác định đúng vị ngữ", score: "0,5đ" }] },
          { num: 7, type: "essay", category: "language", level: "Mức 3", score: 1.5, text: "Viết 1 đoạn văn ngắn (khoảng 3 câu) bày tỏ tình cảm của em đối với vẻ đẹp trù phú của quê hương đất nước Việt Nam.", solution: "Ví dụ: Đất nước Việt Nam ta có muôn vàn cảnh sắc tươi đẹp và sản vật trù phú. Mỗi tấc đất, dòng sông quê hương đều thấm đượm mồ hôi và tình yêu của bao thế hệ cha anh. Em nguyện sẽ cố gắng học tập thật giỏi để góp phần xây dựng non sông gấm vóc ngày càng giàu đẹp.", rubric: [{ step: "Đoạn văn giàu cảm xúc, từ ngữ chọn lọc, câu cú đúng chuẩn", score: "1,5đ" }] }
        ],
        essay: {
          score: 10.0,
          genre: "Văn miêu tả cảnh vật / người",
          prompt: "Em hãy viết một bài văn miêu tả một cảnh đẹp thiên nhiên (cảnh bình minh trên biển, cảnh cánh đồng lúa chín quê em, hoặc cảnh công viên buổi sáng) mà em có dịp quan sát và yêu thích.",
          suggestions: [
            "Mở bài: Giới thiệu cảnh đẹp em muốn miêu tả (ở đâu, em quan sát vào thời điểm nào)?",
            "Thân bài: Tả bao quát cảnh sắc theo trình tự không gian hoặc thời gian. Tả chi tiết những nét biến chuyển của ánh sáng, cây cối, âm thanh và hoạt động của con người trong khung cảnh đó.",
            "Kết bài: Nêu cảm nghĩ, tình yêu tha thiết và niềm tự hào của em trước vẻ đẹp thiên nhiên quê hương đất nước."
          ],
          rubric: [
            { criteria: "1. Mở bài", score: "1,0đ", detail: "Giới thiệu gián tiếp khéo léo hoặc trực tiếp rõ ràng khung cảnh miêu tả." },
            { criteria: "2. Thân bài", score: "4,0đ", detail: "Tả bao quát cảnh sắc (1,0đ) + Tả chi tiết cảnh vật, con người, âm thanh sinh động (3,0đ)." },
            { criteria: "3. Kết bài", score: "1,0đ", detail: "Bày tỏ cảm xúc chân thành, niềm tự hào và tình cảm gắn bó với quê hương." },
            { criteria: "4. Kỹ năng chính tả & diễn đạt", score: "2,0đ", detail: "Bài viết không mắc lỗi chính tả, ngữ pháp, dùng từ chính xác." },
            { criteria: "5. Sáng tạo & liên tưởng", score: "2,0đ", detail: "Sử dụng nhiều biện pháp tu từ độc đáo (so sánh, nhân hóa), giàu chất văn." }
          ]
        }
      }
    };

    var curData = tvDataByGrade[grade] || tvDataByGrade[3];

    var oralItems = (oralMode === "sgk") ? curData.oralKntt : [{
      title: curData.oralCustom.title,
      author: curData.oralCustom.author,
      passage: curData.oralCustom.passage,
      question: curData.oralCustom.question,
      answer: curData.oralCustom.answer
    }];

    return {
      isTiengViet: true,
      schoolName: schoolName,
      examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TIẾNG VIỆT - LỚP ${grade}`,
      examTerm: "HỌC KÌ I",
      subjectName: "Tiếng Việt",
      grade: grade,
      duration: duration,
      schoolYear: "2025 - 2026",
      bookSeries: "Kết nối tri thức với cuộc sống",
      scopeDesc: scope,
      readingExam: {
        totalScore: 10.0,
        oralScore: oralScore,
        oralMode: oralMode,
        oralGuideIntro: "Học sinh bốc thăm đọc thành tiếng một đoạn trong các bài sau (thời gian đọc không quá 1 phút) và trả lời câu hỏi do giáo viên nêu:",
        oralItems: oralItems,
        comprehensionScore: compScore,
        comprehensionReading: {
          title: curData.compTitle,
          author: curData.compAuthor,
          passage: curData.compPassage
        },
        questions: curData.questions
      },
      writingExam: {
        totalScore: 10.0,
        grade: grade,
        dictation: curData.dictation ? {
          title: curData.dictation.title,
          author: curData.dictation.author,
          content: curData.dictation.content,
          score: dictScore,
          instruction: curData.dictation.instruction
        } : null,
        paragraphWriting: curData.paragraph ? {
          score: tlvScore,
          prompt: curData.paragraph.prompt,
          suggestions: curData.paragraph.suggestions,
          rubric: curData.paragraph.rubric
        } : null,
        essay: curData.essay ? {
          score: 10.0,
          genre: curData.essay.genre,
          prompt: curData.essay.prompt,
          suggestions: curData.essay.suggestions,
          rubric: curData.essay.rubric
        } : null
      },
      matrix: {
        readingMatrix: [
          { component: "1. Đọc thành tiếng", m1: `${oralScore.toFixed(1)}`, m2: "-", m3: "-", total: `${oralScore.toFixed(1)}` },
          { component: "2. Đọc hiểu văn bản", m1: "2.0 (Câu 1, 2)", m2: "1.5 (Câu 3)", m3: "0.5 (Câu 7)", total: "4.0" },
          { component: "3. Luyện từ và câu", m1: "0.5 (Câu 4)", m2: "1.0 (Câu 5, 6)", m3: "0.5 (Câu 7)", total: "2.0" }
        ],
        writingMatrix: [
          grade <= 3 ? { component: "1. Chính tả (Nghe - viết)", level: "Mức 1", score: `${dictScore.toFixed(1)}` } : { component: "Tập làm văn (Bài văn hoàn chỉnh)", level: "Mức 1, 2, 3", score: "10.0" },
          grade <= 3 ? { component: "2. Tập làm văn (Viết đoạn)", level: "Mức 2, 3", score: `${tlvScore.toFixed(1)}` } : null
        ].filter(Boolean)
      },
      teacherGuide: {
        oralGuide: {
          criteria: `- Đọc vừa đủ nghe, rõ tiếng, phát âm chuẩn âm vần: ${(oralScore - 1.0).toFixed(1)} điểm\n- Ngắt nghỉ hơi đúng ở các dấu câu, cụm từ rõ nghĩa: 0,5 điểm\n- Trả lời đúng câu hỏi đọc hiểu do giáo viên nêu: 1,0 điểm`,
          qaList: oralItems.map(function(item) {
            return {
              lessonTitle: item.title,
              bookVolume: item.bookVolume || "",
              page: item.page || "",
              question: item.question,
              answer: item.answer
            };
          })
        },
        comprehensionAnswers: curData.questions.map(function(q) {
          return {
            num: q.num,
            ans: q.ans || q.solution || "-",
            explain: q.explain || (q.rubric ? q.rubric.map(function(r){ return r.step + ' (' + r.score + ')'; }).join('; ') : "")
          };
        }),
        writingGuide: {
          dictationCriteria: `- Đánh giá kĩ năng viết đúng mẫu chữ, độ đều nét, trình bày sạch sẽ: 1,0 điểm\n- Lỗi chính tả (mỗi lỗi trừ 0,5đ): sai phụ âm đầu, vần, thanh, không viết hoa danh từ riêng...`,
          essayRubric: grade <= 3 ? curData.paragraph?.rubric : curData.essay?.rubric
        }
      },
      source: "local",
      sourceName: "Ngân hàng SGK Tiếng Việt KNTT (Ngoại tuyến)"
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

    // Nếu là đề Tiếng Việt chuyên biệt
    if (examData.isTiengViet || examData.subjectId === "TIENG_VIET" || examData.readingExam) {
      this.exportTiengVietToWord(examData);
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
            font-size: 13.5pt;
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

        <!-- PHẦN I: MA TRẬN ĐỀ KIỂM TRA (CHUẨN KNTT) -->
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

        <!-- PHẦN II: PHIẾU KIỂM TRA (ĐỀ HỌC SINH) -->
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

        <!-- PHẦN III: HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN -->
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

    this.downloadWordBlob(docHtml, `De_Kiem_Tra_${examData.subjectName}_Lop_${examData.grade}_KNTT_2025_2026.doc`);
  },

  /**
   * Xuất file Word chuyên biệt cho môn Tiếng Việt (4 Trang: Phiếu Đọc, Phiếu Viết, Ma Trận, Hướng Dẫn Chấm)
   */
  exportTiengVietToWord: function(exam) {
    var rd = exam.readingExam || {};
    var wr = exam.writingExam || {};
    var oralScoreStr = (rd.oralScore || 4.0).toFixed(1).replace('.', ',');
    var compScoreStr = (rd.comprehensionScore || 6.0).toFixed(1).replace('.', ',');
    var isSGK = (rd.oralMode !== "custom");
    var grade = exam.grade || 3;

    var docHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${exam.examTitle}</title>
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
            margin-bottom: 16px;
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
            margin-bottom: 10px;
          }
          table.header-table td {
            vertical-align: top;
            padding: 2px 4px;
          }
          table.eval-box {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
          }
          table.eval-box td {
            border: 1px solid #000;
            padding: 6px 8px;
            font-size: 11.5pt;
          }
          .section-heading {
            font-weight: bold;
            font-size: 13.5pt;
            margin-top: 12px;
            margin-bottom: 6px;
          }
          .reading-box {
            background: #fafafa;
            border: 1px solid #ccc;
            padding: 10px 14px;
            margin: 8px 0 14px 0;
            line-height: 1.45;
          }
          .q-block {
            margin-bottom: 9px;
          }
          .q-options {
            margin-left: 20px;
            margin-top: 3px;
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
        <!-- TRANG 1: PHIẾU KIỂM TRA ĐỌC (10 ĐIỂM)     -->
        <!-- ========================================== -->
        <table class="header-table">
          <tr>
            <td style="width: 48%;">
              <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Họ và tên: ...................................................<br>
              Lớp: ${exam.grade}.....
            </td>
            <td style="width: 52%; text-align: right;">
              <i>Thứ….. ngày … tháng … năm 2026</i><br>
              <b style="font-size: 13.5pt; text-transform: uppercase;">PHIẾU KIỂM TRA ĐỌC</b><br>
              <b>MÔN: TIẾNG VIỆT - LỚP ${exam.grade}</b><br>
              <i>Thời gian làm bài: 35 - 40 phút</i>
            </td>
          </tr>
        </table>

        <!-- KHUNG ĐÁNH GIÁ 3 Ô PHẦN ĐỌC -->
        <table class="eval-box">
          <tr>
            <td style="width: 15%; text-align: center;"><b>Đọc tiếng</b></td>
            <td style="width: 15%; text-align: center;"><b>Đọc hiểu</b></td>
            <td style="width: 15%; text-align: center;"><b>Tổng điểm</b></td>
            <td style="width: 35%; text-align: center;"><b>Nhận xét của giáo viên</b></td>
            <td style="width: 20%; text-align: center;"><b>Chữ kí PHHS</b></td>
          </tr>
          <tr>
            <td style="height: 55px; text-align: center;">......... / ${oralScoreStr}đ</td>
            <td style="text-align: center;">......... / ${compScoreStr}đ</td>
            <td style="text-align: center; font-weight: bold; font-size: 13pt;">......... / 10đ</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>

        <!-- A. ĐỌC THÀNH TIẾNG -->
        <div class="section-heading">A. PHẦN ĐỌC THÀNH TIẾNG (${oralScoreStr} điểm)</div>
        <p style="margin: 0 0 6px 0; font-style: italic;">
          ${rd.oralGuideIntro || "Học sinh bốc thăm đọc một đoạn văn/thơ trong các bài sau (thời gian không quá 1 phút) và trả lời câu hỏi do giáo viên nêu:"}
        </p>

        ${isSGK ? `
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
            ${(rd.oralItems || []).map(function(item, idx) {
              return `
                <tr>
                  <td style="border: 1px solid #ccc; padding: 5px 8px; font-weight: bold; width: 12%; text-align: center;">Phiếu ${idx + 1}</td>
                  <td style="border: 1px solid #ccc; padding: 5px 8px;">
                    <b>${item.title}</b> <i>(${item.bookVolume || 'Tập 1'} - ${item.page || 'SGK KNTT'})</i>
                  </td>
                </tr>
              `;
            }).join('')}
          </table>
        ` : `
          <div class="reading-box">
            <div style="text-align: center; font-weight: bold; font-size: 13.5pt; text-transform: uppercase; margin-bottom: 4px;">
              ${rd.oralItems?.[0]?.title || "BÀI ĐỌC THÀNH TIẾNG"}
            </div>
            <div style="text-align: center; font-style: italic; font-size: 11pt; margin-bottom: 8px;">
              ${rd.oralItems?.[0]?.author ? `Tác giả: ${rd.oralItems[0].author}` : ''}
            </div>
            <div style="text-align: justify; text-indent: 1.5rem; line-height: 1.45;">
              ${rd.oralItems?.[0]?.passage || ""}
            </div>
          </div>
        `}

        <!-- B. ĐỌC HIỂU VÀ KIẾN THỨC TIẾNG VIỆT -->
        <div class="section-heading">B. PHẦN ĐỌC HIỂU VÀ KIẾN THỨC TIẾNG VIỆT (${compScoreStr} điểm)</div>
        <p style="margin: 0 0 6px 0; font-style: italic;">Đọc thầm bài văn sau và hoàn thành các bài tập bên dưới:</p>

        <div class="reading-box">
          <div style="text-align: center; font-weight: bold; font-size: 13.5pt; text-transform: uppercase; margin-bottom: 4px;">
            ${rd.comprehensionReading?.title || "BÀI ĐỌC THẦM"}
          </div>
          <div style="text-align: center; font-style: italic; font-size: 11pt; margin-bottom: 8px;">
            ${rd.comprehensionReading?.author ? `Tác giả: ${rd.comprehensionReading.author}` : ''}
          </div>
          <div style="text-align: justify; text-indent: 1.5rem; line-height: 1.45;">
            ${rd.comprehensionReading?.passage || ""}
          </div>
        </div>

        <p style="margin: 6px 0 10px 0; font-style: italic; font-weight: bold;">Khoanh vào chữ cái trước câu trả lời đúng và thực hiện các yêu cầu:</p>

        ${(rd.questions || []).map(function(q) {
          if (q.type === 'mcq') {
            return `
              <div class="q-block">
                <b>Câu ${q.num}</b> (${q.score ? q.score.toString().replace('.', ',') : '0,5'} điểm - ${q.level || 'Mức 1'}): ${q.text}
                <div class="q-options">
                  ${(q.options || []).map(function(opt) { return `<div>${opt}</div>`; }).join('')}
                </div>
              </div>
            `;
          } else {
            return `
              <div class="q-block" style="margin-top: 8px;">
                <b>Câu ${q.num}</b> (${q.score ? q.score.toString().replace('.', ',') : '1,0'} điểm - ${q.level || 'Mức 2'}): ${q.text}
                <div style="margin-top: 4px;">
                  <div class="dotted-line"></div>
                  <div class="dotted-line"></div>
                </div>
              </div>
            `;
          }
        }).join('')}

        <!-- ========================================== -->
        <!-- TRANG 2: PHIẾU KIỂM TRA VIẾT (10 ĐIỂM)    -->
        <!-- ========================================== -->
        <div class="page-break"></div>

        <table class="header-table">
          <tr>
            <td style="width: 48%;">
              <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Họ và tên: ...................................................<br>
              Lớp: ${exam.grade}.....
            </td>
            <td style="width: 52%; text-align: right;">
              <i>Thứ….. ngày … tháng … năm 2026</i><br>
              <b style="font-size: 13.5pt; text-transform: uppercase;">PHIẾU KIỂM TRA VIẾT</b><br>
              <b>MÔN: TIẾNG VIỆT - LỚP ${exam.grade}</b><br>
              <i>Thời gian làm bài: 35 - 40 phút</i>
            </td>
          </tr>
        </table>

        ${grade <= 3 ? `
          <!-- KHUNG ĐÁNH GIÁ 3 Ô PHẦN VIẾT LỚP 1-3 -->
          <table class="eval-box">
            <tr>
              <td style="width: 18%; text-align: center;"><b>Chính tả</b></td>
              <td style="width: 18%; text-align: center;"><b>Tập làm văn</b></td>
              <td style="width: 18%; text-align: center;"><b>Tổng điểm Viết</b></td>
              <td style="width: 28%; text-align: center;"><b>Nhận xét của giáo viên</b></td>
              <td style="width: 18%; text-align: center;"><b>Chữ kí PHHS</b></td>
            </tr>
            <tr>
              <td style="height: 55px; text-align: center;">......... / ${(wr.dictation?.score || 4.0).toFixed(1).replace('.', ',')}đ</td>
              <td style="text-align: center;">......... / ${(wr.paragraphWriting?.score || 6.0).toFixed(1).replace('.', ',')}đ</td>
              <td style="text-align: center; font-weight: bold; font-size: 13pt;">......... / 10đ</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>

          <!-- PHẦN 1: CHÍNH TẢ (LỚP 1-3) -->
          <div class="section-heading">I. CHÍNH TẢ (Nghe - viết) (${(wr.dictation?.score || 4.0).toFixed(1).replace('.', ',')} điểm)</div>
          <p style="margin: 0 0 6px 0; font-style: italic;">
            <b>${wr.dictation?.title || "Bài viết chính tả"}</b> ${wr.dictation?.author ? `(Tác giả: ${wr.dictation.author})` : ''}
          </p>

          <div style="margin-top: 10px;">
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
          </div>

          <!-- PHẦN 2: TẬP LÀM VĂN (LỚP 1-3) -->
          <div class="section-heading" style="margin-top: 18px;">II. TẬP LÀM VĂN (${(wr.paragraphWriting?.score || 6.0).toFixed(1).replace('.', ',')} điểm)</div>
          <p style="margin: 0 0 6px 0; font-weight: bold;">
            Đề bài: ${wr.paragraphWriting?.prompt || "Viết đoạn văn ngắn theo chủ điểm đã học."}
          </p>
          ${(wr.paragraphWriting?.suggestions && wr.paragraphWriting.suggestions.length > 0) ? `
            <div style="font-style: italic; margin-bottom: 8px; font-size: 11.5pt;">
              Gợi ý:
              ${wr.paragraphWriting.suggestions.map(function(s){ return `<div>- ${s}</div>`; }).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 10px;">
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
          </div>
        ` : `
          <!-- KHUNG ĐÁNH GIÁ TẬP LÀM VĂN LỚP 4-5 -->
          <table class="eval-box">
            <tr>
              <td style="width: 25%; text-align: center;"><b>Điểm Tập làm văn</b></td>
              <td style="width: 50%; text-align: center;"><b>Nhận xét của giáo viên</b></td>
              <td style="width: 25%; text-align: center;"><b>Chữ kí của PHHS</b></td>
            </tr>
            <tr>
              <td style="height: 60px; text-align: center; font-weight: bold; font-size: 14pt;">......... / 10đ</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>

          <div class="section-heading">TẬP LÀM VĂN (10,0 điểm)</div>
          <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 13.5pt;">
            Đề bài: ${wr.essay?.prompt || "Em hãy viết một bài văn hoàn chỉnh đúng thể loại đã học."}
          </p>
          ${(wr.essay?.suggestions && wr.essay.suggestions.length > 0) ? `
            <div style="font-style: italic; margin-bottom: 12px; font-size: 12pt; background: #fdfdfd; border: 1px dashed #aaa; padding: 8px 12px;">
              <b>Gợi ý dàn ý:</b>
              ${wr.essay.suggestions.map(function(s){ return `<div>- ${s}</div>`; }).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 10px;">
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
            <div class="dotted-line"></div>
          </div>
        `}

        <!-- ========================================== -->
        <!-- TRANG 3: MA TRẬN ĐỀ KIỂM TRA TIẾNG VIỆT   -->
        <!-- ========================================== -->
        <div class="page-break"></div>

        <div class="title-bold-center">MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TIẾNG VIỆT LỚP ${exam.grade}</div>
        <div class="subtitle-center">Bộ sách: Kết nối tri thức với cuộc sống • Năm học ${exam.schoolYear}</div>

        <div class="section-heading">I. MA TRẬN NỘI DUNG VÀ MỨC ĐỘ NHẬN THỨC PHẦN ĐỌC (10 ĐIỂM)</div>
        <table class="matrix-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 35%;">Mạch kiến thức, kĩ năng</th>
              <th colspan="3">Mức độ nhận thức (TT 27)</th>
              <th rowspan="2" style="width: 15%;">Tổng điểm</th>
            </tr>
            <tr>
              <th>Mức 1</th>
              <th>Mức 2</th>
              <th>Mức 3</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.matrix?.readingMatrix || []).map(function(r) {
              return `
                <tr>
                  <td style="text-align: left; font-weight: 500;">${r.component}</td>
                  <td>${r.m1 || '-'}</td>
                  <td>${r.m2 || '-'}</td>
                  <td>${r.m3 || '-'}</td>
                  <td><b>${r.total || '-'}đ</b></td>
                </tr>
              `;
            }).join('')}
            <tr style="font-weight: bold; background-color: #f2f2f2;">
              <td style="text-align: left;">Tổng cộng Phần Đọc</td>
              <td>4,0đ</td>
              <td>4,0đ</td>
              <td>2,0đ</td>
              <td>10,0đ</td>
            </tr>
          </tbody>
        </table>

        <div class="section-heading">II. MA TRẬN NỘI DUNG VÀ MỨC ĐỘ NHẬN THỨC PHẦN VIẾT (10 ĐIỂM)</div>
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="width: 45%;">Nội dung kiểm tra</th>
              <th style="width: 30%;">Mức độ đáp ứng</th>
              <th style="width: 25%;">Điểm số</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.matrix?.writingMatrix || []).map(function(w) {
              return `
                <tr>
                  <td style="text-align: left; font-weight: 500;">${w.component}</td>
                  <td>${w.level}</td>
                  <td><b>${w.score} điểm</b></td>
                </tr>
              `;
            }).join('')}
            <tr style="font-weight: bold; background-color: #f2f2f2;">
              <td style="text-align: left;">Tổng cộng Phần Viết</td>
              <td>Chuẩn năng lực TT 27</td>
              <td>10,0 điểm</td>
            </tr>
          </tbody>
        </table>

        <!-- ========================================== -->
        <!-- TRANG 4: HƯỚNG DẪN CHẤM VÀ BAREM ĐIỂM     -->
        <!-- ========================================== -->
        <div class="page-break"></div>

        <div class="title-bold-center">HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN MÔN TIẾNG VIỆT LỚP ${exam.grade}</div>
        <div class="subtitle-center">Chuẩn đánh giá học sinh Tiểu học theo Thông tư 27/2020/TT-BGDĐT</div>

        <!-- 1. HƯỚNG DẪN CHẤM ĐỌC THÀNH TIẾNG -->
        <div class="section-heading">A. HƯỚNG DẪN CHẤM ĐỌC THÀNH TIẾNG (${oralScoreStr} ĐIỂM)</div>
        <p style="margin: 0 0 6px 0; font-size: 11.5pt; white-space: pre-line;">
          ${exam.teacherGuide?.oralGuide?.criteria || "- Đọc đúng, rõ ràng, phát âm chuẩn.\n- Trả lời đúng câu hỏi đọc hiểu được 1,0 điểm."}
        </p>

        <div style="font-weight: bold; margin: 8px 0 4px 0; color: #1e3a8a;">
          DANH SÁCH CÂU HỎI VÀ GỢI Ý TRẢ LỜI DÀNH CHO GIÁO VIÊN:
        </div>
        <table class="matrix-table" style="text-align: left;">
          <thead>
            <tr>
              <th style="width: 25%; text-align: center;">Bài đọc</th>
              <th style="width: 35%; text-align: center;">Câu hỏi giáo viên hỏi</th>
              <th style="width: 40%; text-align: center;">Gợi ý câu trả lời chuẩn của học sinh</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.teacherGuide?.oralGuide?.qaList || []).map(function(item, idx) {
              return `
                <tr>
                  <td style="font-weight: bold; vertical-align: top;">
                    ${idx + 1}. ${item.lessonTitle}<br>
                    <span style="font-size: 10pt; font-weight: normal; color: #555;">${item.bookVolume || ''} ${item.page ? `(${item.page})` : ''}</span>
                  </td>
                  <td style="vertical-align: top;">${item.question}</td>
                  <td style="vertical-align: top; color: #15803d;"><b>${item.answer}</b></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- 2. HƯỚNG DẪN CHẤM ĐỌC HIỂU -->
        <div class="section-heading" style="margin-top: 14px;">B. ĐÁP ÁN ĐỌC HIỂU VÀ KIẾN THỨC TIẾNG VIỆT (${compScoreStr} ĐIỂM)</div>
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="width: 15%;">Câu</th>
              <th style="width: 25%;">Đáp án / Nội dung</th>
              <th style="width: 60%;">Hướng dẫn chấm chi tiết</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.teacherGuide?.comprehensionAnswers || []).map(function(ans) {
              return `
                <tr>
                  <td style="font-weight: bold; text-align: center;">Câu ${ans.num}</td>
                  <td style="font-weight: bold; color: #b91c1c; text-align: center; font-size: 12pt;">${ans.ans}</td>
                  <td style="text-align: left; vertical-align: top;">${ans.explain}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- 3. HƯỚNG DẪN CHẤM PHẦN VIẾT -->
        <div class="section-heading" style="margin-top: 14px;">C. HƯỚNG DẪN CHẤM PHẦN VIẾT (10 ĐIỂM)</div>
        ${grade <= 3 ? `
          <div style="font-weight: bold; margin-bottom: 4px;">1. Chính tả (${(wr.dictation?.score || 4.0).toFixed(1).replace('.', ',')} điểm):</div>
          <p style="margin: 0 0 8px 0; font-size: 11.5pt; white-space: pre-line;">
            ${exam.teacherGuide?.writingGuide?.dictationCriteria || "- Viết đúng mẫu chữ, độ đều nét, trình bày sạch: 1,0đ\n- Mỗi lỗi chính tả (âm đầu, vần, thanh, hoa): trừ 0,5đ"}
          </p>

          <div style="font-weight: bold; margin: 8px 0 4px 0;">2. Tập làm văn - Viết đoạn văn (${(wr.paragraphWriting?.score || 6.0).toFixed(1).replace('.', ',')} điểm):</div>
          <table class="matrix-table" style="text-align: left;">
            <thead>
              <tr>
                <th style="width: 30%; text-align: center;">Tiêu chí đánh giá</th>
                <th style="width: 20%; text-align: center;">Điểm</th>
                <th style="width: 50%; text-align: center;">Yêu cầu cần đạt</th>
              </tr>
            </thead>
            <tbody>
              ${(wr.paragraphWriting?.rubric || []).map(function(rub) {
                return `
                  <tr>
                    <td style="font-weight: bold;">${rub.criteria}</td>
                    <td style="text-align: center; font-weight: bold;">${rub.score}</td>
                    <td>${rub.detail}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        ` : `
          <div style="font-weight: bold; margin-bottom: 6px;">Barem chấm điểm Bài văn hoàn chỉnh (10,0 điểm):</div>
          <table class="matrix-table" style="text-align: left;">
            <thead>
              <tr>
                <th style="width: 25%; text-align: center;">Tiêu chí chấm</th>
                <th style="width: 15%; text-align: center;">Điểm</th>
                <th style="width: 60%; text-align: center;">Yêu cầu chi tiết</th>
              </tr>
            </thead>
            <tbody>
              ${(wr.essay?.rubric || []).map(function(rub) {
                return `
                  <tr>
                    <td style="font-weight: bold;">${rub.criteria}</td>
                    <td style="text-align: center; font-weight: bold;">${rub.score}</td>
                    <td>${rub.detail}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `}

      </body>
      </html>
    `;

    this.downloadWordBlob(docHtml, `De_Kiem_Tra_Tieng_Viet_Lop_${exam.grade}_KNTT_2025_2026.doc`);
    return docHtml;
  },

  downloadWordBlob: async function(docHtml, filename) {
    if (typeof document === "undefined" || typeof Blob === "undefined") {
      return { success: false };
    }
    var blob = new Blob([docHtml], { type: "application/msword;charset=utf-8" });

    // 1. Mở Hộp thoại Lưu File (Save As) của hệ điều hành
    if (typeof window !== "undefined" && typeof window.showSaveFilePicker === "function") {
      try {
        var pickerOpts = {
          suggestedName: filename,
          types: [{
            description: "Tài liệu Microsoft Word (.doc)",
            accept: { "application/msword": [".doc"] }
          }]
        };
        var handle = await window.showSaveFilePicker(pickerOpts);
        var writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        if (typeof showToast === "function") {
          showToast("Đã lưu tệp Word vào máy tính thành công!", "success");
        }
        return { success: true, method: "picker" };
      } catch (err) {
        if (err && (err.name === "AbortError" || err.code === 20)) {
          if (typeof showToast === "function") {
            showToast("Bạn đã hủy lưu tệp Word.", "info");
          }
          return { success: false, aborted: true };
        }
        console.warn("showSaveFilePicker fallback:", err);
      }
    }

    // 2. Trình duyệt cũ IE / Edge Legacy
    if (typeof window !== "undefined" && window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      if (typeof showToast === "function") {
        showToast("Đã lưu tệp Word thành công!", "success");
      }
      return { success: true, method: "msSave" };
    }

    // 3. Chuẩn HTML5 download qua thẻ <a>
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      if (a.parentNode) a.parentNode.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);

    if (typeof showToast === "function") {
      showToast("Đã xuất file Word! Tệp đã lưu trong thư mục Downloads (Tải về).", "success");
    }
    return { success: true, method: "direct" };
  }
};

window.AIService = AIService;
