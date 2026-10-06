/**
 * AI EXAM MATRIX & EVALUATION SPECIFICATION MODULE (THÔNG TƯ 27/2020/TT-BGDĐT)
 * Bộ sách chuẩn: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT)
 * Chuyên trách: Cấu hình môn thi, ma trận 3 mức độ, bảng đặc tả câu hỏi, cân bằng điểm số
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var AIMatrixService = {
// Quy định: Lớp 1, 2, 3 chỉ kiểm tra Toán & Tiếng Việt. Lớp 4, 5 kiểm tra Toán, Tiếng Việt, Tiếng Anh, Tin học, Công nghệ, Khoa học, Lịch sử và Địa lý.
  EXAM_SUBJECTS: {
    TOAN: { id: "TOAN", name: "Toán", grades: [1, 2, 3, 4, 5], icon: "fa-calculator" },
    TIENG_VIET: { id: "TIENG_VIET", name: "Tiếng Việt", grades: [1, 2, 3, 4, 5], icon: "fa-book-open" },
    TIENG_ANH: { id: "TIENG_ANH", name: "Tiếng Anh", grades: [4, 5], icon: "fa-language" },
    KHOA_HOC: { id: "KHOA_HOC", name: "Khoa học", grades: [4, 5], icon: "fa-flask" },
    LICH_SU_DIA_LY: { id: "LICH_SU_DIA_LY", name: "Lịch sử và Địa lý", grades: [4, 5], icon: "fa-earth-americas" },
    TIN_HOC: { id: "TIN_HOC", name: "Tin học", grades: [4, 5], icon: "fa-laptop-code" },
    CONG_NGHE: { id: "CONG_NGHE", name: "Công nghệ", grades: [4, 5], icon: "fa-gears" }
  },

  // LƯU Ý: Toàn bộ ngân hàng câu hỏi tĩnh/đề mẫu dự phòng đã được gỡ bỏ hoàn toàn theo yêu cầu.
  // Hệ thống bắt buộc 100% đề kiểm tra phải do Google Gemini AI trực tiếp biên soạn trực tuyến.

  /**
   * Tạo văn bản hướng dẫn chấm trắc nghiệm linh hoạt, chuẩn xác theo điểm từng câu
   */
  getMcqScoringGuide: function(mcqs) {
    if (!mcqs || !mcqs.length) return "Mỗi câu trả lời đúng được 0,5 điểm.";
    function fmtScoreVal(v) {
      var r = Math.round((parseFloat(v) || 0.5) * 4) / 4;
      return r.toString().replace('.', ',');
    }
    var firstScore = Math.round((parseFloat(mcqs[0].score) || 0.5) * 4) / 4;
    var allSame = mcqs.every(function(q) {
      var sc = Math.round((parseFloat(q.score) || 0.5) * 4) / 4;
      return Math.abs(sc - firstScore) < 0.001;
    });
    if (allSame) {
      return `Mỗi câu trả lời đúng được ${fmtScoreVal(firstScore)} điểm.`;
    }
    var groups = {};
    mcqs.forEach(function(q) {
      var sc = fmtScoreVal(q.score);
      if (!groups[sc]) groups[sc] = [];
      groups[sc].push(q.num);
    });
    var parts = [];
    Object.keys(groups).sort(function(a, b) {
      return parseFloat(a.replace(',', '.')) - parseFloat(b.replace(',', '.'));
    }).forEach(function(sc) {
      var qList = groups[sc];
      if (qList.length === 1) {
        parts.push(`Câu ${qList[0]} đúng được ${sc} điểm`);
      } else {
        parts.push(`Các câu ${qList.join(', ')} mỗi câu đúng được ${sc} điểm`);
      }
    });
    return parts.join('; ') + '.';
  },

  /**
   * Phân tích chính xác học kỳ và tiêu đề đề kiểm tra từ phạm vi ra đề (scope)
   * Đảm bảo khi chọn Cuối năm / Cả năm / Tuần 1-35 / Học kỳ 2 thì luôn trả về HỌC KÌ II và ĐỀ KIỂM TRA HỌC KÌ II
   */
  resolveExamTermInfo: function(scope) {
    var s = (scope || "").toLowerCase().trim();
    
    // Kiểm tra có phải học kỳ 2 / cả năm / cuối năm không
    var isTerm2 = s.includes("kỳ 2") || s.includes("kì 2") || 
                  s.includes("kỳ ii") || s.includes("kì ii") || 
                  s.includes("hk2") || s.includes("hkii") || 
                  s.includes("cả năm") || s.includes("cuối năm") || 
                  s.includes("tập 2") || s.includes("tap 2") ||
                  s.includes("tuần 1 - 35") || s.includes("tuần 1-35") || 
                  s.includes("tuần 19 - 35") || s.includes("tuần 19-35") ||
                  s.includes("tuần 28 - 35") || s.includes("tuần 28-35") ||
                  s.includes("tuần 19 - 27") || s.includes("tuần 19-27");
                  
    var isMid = s.includes("giữa") || s.includes("giua");
    
    // Kiểm tra tuần đơn lẻ (ví dụ: "Theo Tuần 25", "Tuần 20")
    var singleWeekMatch = s.match(/^(?:theo\s+)?tuần\s*(\d+)$/i) || s.match(/\btuần\s*(\d+)\b(?!\s*[-–]\s*\d+)/i);
    var weekNum = singleWeekMatch ? parseInt(singleWeekMatch[1] || singleWeekMatch[2], 10) : null;
    if (weekNum !== null && !s.includes("cả năm") && !s.includes("cuối năm") && !s.includes("tuần 1 - 35")) {
      if (weekNum > 18) {
        isTerm2 = true;
      }
    } else {
      weekNum = null;
    }

    if (isTerm2) {
      if (isMid) {
        return {
          term: "HỌC KÌ II",
          period: "GIỮA HỌC KÌ II",
          headerTitle: "ĐỀ KIỂM TRA GIỮA HỌC KÌ II",
          matrixTitle: "GIỮA HỌC KÌ II"
        };
      }
      if (weekNum !== null) {
        return {
          term: "HỌC KÌ II",
          period: `HỌC KÌ II (TUẦN ${weekNum})`,
          headerTitle: `ĐỀ KIỂM TRA HỌC KÌ II (TUẦN ${weekNum})`,
          matrixTitle: `HỌC KÌ II (TUẦN ${weekNum})`
        };
      }
      return {
        term: "HỌC KÌ II",
        period: "CUỐI HỌC KÌ II",
        headerTitle: "ĐỀ KIỂM TRA CUỐI HỌC KÌ II",
        matrixTitle: "CUỐI HỌC KÌ II"
      };
    } else {
      if (isMid) {
        return {
          term: "HỌC KÌ I",
          period: "GIỮA HỌC KÌ I",
          headerTitle: "ĐỀ KIỂM TRA GIỮA HỌC KÌ I",
          matrixTitle: "GIỮA HỌC KÌ I"
        };
      }
      if (weekNum !== null) {
        return {
          term: "HỌC KÌ I",
          period: `HỌC KÌ I (TUẦN ${weekNum})`,
          headerTitle: `ĐỀ KIỂM TRA HỌC KÌ I (TUẦN ${weekNum})`,
          matrixTitle: `HỌC KÌ I (TUẦN ${weekNum})`
        };
      }
      return {
        term: "HỌC KÌ I",
        period: "CUỐI HỌC KÌ I",
        headerTitle: "ĐỀ KIỂM TRA CUỐI HỌC KÌ I",
        matrixTitle: "CUỐI HỌC KÌ I"
      };
    }
  },

  /**
   * CẤU HÌNH CỨNG MA TRẬN & MẠCH KIẾN THỨC CHUẨN 100% THEO CHƯƠNG TRÌNH SGK KNTT
   * Phân chia chuẩn xác từng môn học, từng khối lớp và từng giai đoạn kiểm tra định kỳ (Thông tư 27)
   */
  getMasterExamMatrixConfig: function(grade, subjectId, scope) {
    var g = parseInt(grade) || 5;
    var sub = (subjectId || "TOAN").toUpperCase().replace("LICH_SU_DIA_LY", "LS_DL");
    var termInfo = this.resolveExamTermInfo(scope);
    var isTerm2 = termInfo.term === "HỌC KÌ II";
    var isMid = termInfo.period.includes("GIỮA");

    // 1. MÔN TOÁN (LỚP 1 - 5): Chuẩn 3 mạch kiến thức của CT GDPT 2018
    if (sub === "TOAN") {
      var numDesc = "Số tự nhiên, phân số, số thập phân; tỉ số phần trăm; 4 phép tính; tính giá trị biểu thức và giải toán có lời văn.";
      var geomDesc = "Hình phẳng (tam giác, thang, tròn), hình khối (hộp chữ nhật, lập phương); chu vi, diện tích, thể tích; đơn vị đo, toán chuyển động đều.";
      var statDesc = "Thu thập, phân loại số liệu; đọc và phân tích biểu đồ hình quạt tròn, bảng số liệu; khả năng xảy ra của một sự kiện.";

      if (g <= 2) {
        numDesc = isTerm2 ? "Các số trong phạm vi 100 (lớp 1) hoặc phạm vi 1000 (lớp 2); phép cộng, phép trừ có nhớ; phép nhân, chia (bảng 2, 5); giải toán 1 bước tính." : "Các số trong phạm vi 10, 20 (lớp 1) hoặc phạm vi 100 (lớp 2); phép cộng, phép trừ; so sánh số.";
        geomDesc = isTerm2 ? "Hình vuông, tròn, tam giác, chữ nhật; điểm, đoạn thẳng, đường thẳng; đơn vị đo cm, dm, m, km; xem đồng hồ, lịch." : "Hình phẳng cơ bản; nhận biết vị trí, định hướng không gian; độ dài đoạn thẳng cm.";
        statDesc = "Thu thập, phân loại, kiểm đếm số liệu đơn giản; khả năng xảy ra của sự kiện (chắc chắn, có thể, không thể).";
      } else if (g === 3 || g === 4) {
        numDesc = isTerm2 ? (g === 3 ? "Các số đến 100 000; 4 phép tính; tính nhẩm, giá trị biểu thức, giải toán." : "Phân số, các phép tính với phân số; dấu hiệu chia hết; tìm hai số khi biết tổng/hiệu và tỉ số.") : (g === 3 ? "Các số đến 10 000; bảng nhân, bảng chia 6, 7, 8, 9; làm quen biểu thức." : "Số có nhiều chữ số; 4 phép tính với số tự nhiên; tính chất giao hoán, kết hợp, phân phối; giải toán tìm số trung bình cộng, tìm hai số khi biết tổng và hiệu.");
        geomDesc = isTerm2 ? (g === 3 ? "Hình tròn, tâm, bán kính, đường kính; chu vi, diện tích hình chữ nhật, hình vuông; đơn vị đo ml, g, kg, nhiệt độ." : "Hình bình hành, hình thoi; diện tích hình bình hành, hình thoi; đơn vị đo diện tích dm², m², mm²; đơn vị đo thời gian thế kỉ.") : (g === 3 ? "Góc vuông, không vuông; đỉnh, cạnh; hình chữ nhật, hình vuông; đơn vị đo mm, cm, dm, m, km." : "Góc nhọn, tù, bẹt; hai đường thẳng vuông góc, song song; đơn vị đo yến, tạ, tấn, giây, thế kỉ.");
        statDesc = "Thu thập, phân loại, sắp xếp số liệu; đọc bảng số liệu, biểu đồ tranh, biểu đồ cột; khả năng xảy ra của một sự kiện.";
      } else if (g === 5) {
        numDesc = isTerm2 ? "Số thập phân, 4 phép tính với số thập phân; tỉ số phần trăm và các bài toán về tỉ số phần trăm; tính giá trị biểu thức và giải toán có lời văn." : "Ôn tập phân số; số thập phân, hàng của số thập phân; cộng, trừ, nhân, chia số thập phân; tính giá trị biểu thức và giải toán có lời văn.";
        geomDesc = isTerm2 ? "Hình tròn, chu vi và diện tích hình tròn; hình hộp chữ nhật, hình lập phương: diện tích xung quanh, toàn phần, thể tích (cm³, dm³, m³); toán chuyển động đều (vận tốc, quãng đường, thời gian)." : "Hình tam giác, hình thang: nhận biết các yếu tố và tính diện tích; đơn vị đo diện tích ha, km²; giải toán liên quan đến diện tích.";
        statDesc = isTerm2 ? "Thu thập, phân loại số liệu; đọc và phân tích bảng số liệu, biểu đồ hình quạt tròn; khả năng xảy ra của một sự kiện trong thực tế." : "Thu thập, phân loại số liệu; đọc và hoàn thiện bảng số liệu thống kê; biểu đồ cột, số liệu trung bình.";
      }

      return [
        {
          key: "so_phep_tinh",
          topic: "1. Số và phép tính",
          desc: numDesc,
          domainKeywords: ["số", "phép tính", "phân số", "thập phân", "tỉ số", "phần trăm", "cộng", "trừ", "nhân", "chia", "giá trị biểu thức", "đặt tính", "tính nhẩm", "tìm x", "giải toán"],
          targetRatio: 0.50
        },
        {
          key: "hinh_hoc_do_luong",
          topic: "2. Hình học và Đo lường",
          desc: geomDesc,
          domainKeywords: ["hình", "chu vi", "diện tích", "thể tích", "tam giác", "thang", "tròn", "hộp chữ nhật", "lập phương", "bán kính", "đường kính", "chiều cao", "vận tốc", "quãng đường", "thời gian", "chuyển động", "đơn vị đo", "ha", "m²", "cm²", "m³", "dm³", "lít"],
          targetRatio: 0.35
        },
        {
          key: "thong_ke_xac_suat",
          topic: "3. Một số yếu tố Thống kê và Xác suất",
          desc: statDesc,
          domainKeywords: ["thống kê", "xác suất", "biểu đồ", "quạt tròn", "bảng số liệu", "kiểm đếm", "khả năng", "sự kiện", "chắc chắn", "có thể", "không thể", "xúc xắc", "đồng xu"],
          targetRatio: 0.15
        }
      ];
    }

    // 2. MÔN KHOA HỌC (LỚP 4, LỚP 5)
    if (sub === "KHOA_HOC") {
      if (g === 5) {
        if (!isTerm2) {
          // HK1 Lớp 5
          return [
            {
              key: "kh5_chat",
              topic: "Chủ đề 1. Chất",
              desc: "Thành phần và vai trò của đất đối với cây trồng; ô nhiễm, xói mòn và bảo vệ môi trường đất; hỗn hợp và dung dịch; đặc điểm chất rắn, lỏng, khí và biến đổi trạng thái; sự biến đổi hoá học của chất (Bài 1 - 6).",
              domainKeywords: ["chất", "đất", "thành phần của đất", "vai trò của đất", "ô nhiễm đất", "xói mòn", "bảo vệ đất", "hỗn hợp", "dung dịch", "trạng thái", "rắn", "lỏng", "khí", "biến đổi trạng thái", "biến đổi hoá học", "biến đổi hóa học"],
              targetRatio: 0.35
            },
            {
              key: "kh5_nang_luong",
              topic: "Chủ đề 2. Năng lượng",
              desc: "Vai trò của năng lượng; sử dụng năng lượng điện; mạch điện đơn giản, vật dẫn điện và vật cách điện; năng lượng chất đốt; sử dụng năng lượng mặt trời, gió, nước chảy (Bài 7 - 12).",
              domainKeywords: ["năng lượng", "vai trò năng lượng", "điện", "sử dụng điện", "mạch điện", "pin", "dây dẫn", "bóng đèn", "vật dẫn điện", "vật cách điện", "chất đốt", "than đá", "dầu mỏ", "khí đốt", "năng lượng mặt trời", "năng lượng gió", "nước chảy"],
              targetRatio: 0.35
            },
            {
              key: "kh5_thuc_vat_dong_vat",
              topic: "Chủ đề 3. Thực vật và động vật",
              desc: "Sinh sản của thực vật có hoa; sự phát triển của cây con; sinh sản của động vật; vòng đời và sự phát triển của động vật (Bài 13 - 16).",
              domainKeywords: ["thực vật có hoa", "hoa", "nhị", "nhụy", "thụ phấn", "thụ tinh", "quả", "hạt", "cây con", "nảy mầm", "phát triển của cây", "sinh sản của động vật", "thụ tinh động vật", "đẻ trứng", "đẻ con", "vòng đời", "sâu", "bướm", "ấu trùng", "nòng nọc", "ếch"],
              targetRatio: 0.30
            }
          ];
        } else if (isMid) {
          // Giữa HK2 Lớp 5
          return [
            {
              key: "kh5_thuc_vat_dong_vat_on",
              topic: "Chủ đề 3. Thực vật và động vật (Ôn tập)",
              desc: "Củng cố kiến thức sinh sản của thực vật có hoa, hạt nảy mầm và vòng đời phát triển của động vật (Bài 17).",
              domainKeywords: ["thực vật", "động vật", "hoa", "hạt", "thụ phấn", "vòng đời", "đẻ trứng", "đẻ con", "biến thái"],
              targetRatio: 0.30
            },
            {
              key: "kh5_vi_khuan",
              topic: "Chủ đề 4. Vi khuẩn",
              desc: "Vi khuẩn xung quanh chúng ta; vi khuẩn có ích trong chế biến thực phẩm; vi khuẩn gây bệnh ở người và cách phòng tránh (Bài 18 - 21).",
              domainKeywords: ["vi khuẩn", "kính hiển vi", "vi sinh vật", "lên men", "chế biến thực phẩm", "sữa chua", "muối dưa", "vi khuẩn có ích", "vi khuẩn gây bệnh", "tiêu chảy", "rửa tay", "xà phòng", "thức ăn ôi thiu", "bảo quản thực phẩm"],
              targetRatio: 0.35
            },
            {
              key: "kh5_con_nguoi_suc_khoe",
              topic: "Chủ đề 5. Con người và sức khỏe",
              desc: "Sự hình thành cơ thể người; các giai đoạn phát triển chính của con người; nam và nữ; chăm sóc sức khỏe tuổi dậy thì (Bài 22 - 25).",
              domainKeywords: ["con người", "cơ thể người", "thụ tinh", "trứng", "tinh trùng", "thai nhi", "giai đoạn phát triển", "tuổi dậy thì", "dậy thì", "nam và nữ", "mụn trứng cá", "tuyến mồ hôi", "chiều cao", "vệ sinh tuổi dậy thì"],
              targetRatio: 0.35
            }
          ];
        } else {
          // Cuối HK2 / Cuối năm Lớp 5 (Chuẩn 4 chủ đề SGK KNTT bao quát 100%)
          return [
            {
              key: "kh5_thuc_vat_dong_vat",
              topic: "Chủ đề 3. Thực vật và động vật",
              desc: "Sinh sản của thực vật có hoa, sự phát triển của hạt mọc thành cây; sinh sản và vòng đời phát triển của động vật (Bài 13 - 17).",
              domainKeywords: ["thực vật có hoa", "nhị", "nhụy", "thụ phấn", "thụ tinh hoa", "hạt mọc thành cây", "bộ phận của hạt", "nảy mầm", "sinh sản động vật", "đẻ trứng", "đẻ con", "vòng đời của bướm", "vòng đời của ếch", "vòng đời động vật", "ấu trùng"],
              targetRatio: 0.20
            },
            {
              key: "kh5_vi_khuan",
              topic: "Chủ đề 4. Vi khuẩn",
              desc: "Đặc điểm, kích thước vi khuẩn; vi khuẩn có ích trong chế biến thực phẩm (muối dưa, làm sữa chua); vi khuẩn gây bệnh ở người và biện pháp phòng tránh, bảo quản thực phẩm (Bài 18 - 21).",
              domainKeywords: ["vi khuẩn", "kính hiển vi", "vi sinh vật", "lên men", "chế biến thực phẩm", "sữa chua", "muối dưa", "vi khuẩn có ích", "vi khuẩn gây bệnh", "phòng bệnh do vi khuẩn", "rửa tay", "xà phòng", "thức ăn ôi thiu", "bảo quản thực phẩm", "tủ lạnh", "đun sôi"],
              targetRatio: 0.25
            },
            {
              key: "kh5_con_nguoi_suc_khoe",
              topic: "Chủ đề 5. Con người và sức khỏe",
              desc: "Sự hình thành cơ thể người; các giai đoạn phát triển chính của con người; nam và nữ; chăm sóc sức khỏe tuổi dậy thì; phòng tránh bị xâm hại (Bài 22 - 27).",
              domainKeywords: ["cơ thể người", "thụ tinh", "trứng và tinh trùng", "thai nhi", "giai đoạn phát triển", "tuổi dậy thì", "dậy thì", "nam và nữ", "mụn trứng cá", "tuyến mồ hôi", "vệ sinh cá nhân", "phòng tránh bị xâm hại", "xâm hại", "quy tắc đồ lót", "vùng riêng tư", "an toàn cơ thể"],
              targetRatio: 0.25
            },
            {
              key: "kh5_sinh_vat_moi_truong",
              topic: "Chủ đề 6. Sinh vật và môi trường",
              desc: "Chức năng của môi trường đối với sinh vật; tác động của con người đến môi trường và một số biện pháp bảo vệ môi trường, bảo vệ nguồn nước sạch và ứng phó hạn mặn (Bài 28 - 30).",
              domainKeywords: ["sinh vật và môi trường", "chức năng của môi trường", "cung cấp tài nguyên", "nơi chứa rác thải", "tác động của con người", "bảo vệ môi trường", "ô nhiễm môi trường", "rác thải", "nguồn nước", "nước sạch", "nước mặn", "xâm nhập mặn", "hạn mặn", "trữ nước ngọt", "trồng cây", "dòng sông quê hương"],
              targetRatio: 0.30
            }
          ];
        }
      } else if (g === 4) {
        if (!isTerm2) {
          // HK1 Lớp 4
          return [
            {
              key: "kh4_chat",
              topic: "Chủ đề 1. Chất",
              desc: "Tính chất của nước, sự chuyển thể và vòng tuần hoàn của nước; sự ô nhiễm và bảo vệ nguồn nước; tính chất và thành phần không khí; vai trò của không khí và gió bão (Bài 1 - 7).",
              domainKeywords: ["chất", "nước", "tính chất của nước", "chuyển thể của nước", "vòng tuần hoàn của nước", "bảo vệ nguồn nước", "làm sạch nước", "không khí", "tính chất không khí", "thành phần không khí", "ôxi", "vai trò không khí", "gió", "bão", "phòng chống bão"],
              targetRatio: 0.40
            },
            {
              key: "kh4_nang_luong",
              topic: "Chủ đề 2. Năng lượng",
              desc: "Ánh sáng và sự truyền ánh sáng, vai trò của ánh sáng; âm thanh và sự truyền âm thanh; nhiệt độ, sự truyền nhiệt và vật dẫn nhiệt (Bài 8 - 14).",
              domainKeywords: ["năng lượng", "ánh sáng", "truyền ánh sáng", "bóng tối", "vai trò ánh sáng", "âm thanh", "truyền âm thanh", "rung động", "nhiệt độ", "nhiệt kế", "sự truyền nhiệt", "vật dẫn nhiệt tốt", "vật dẫn nhiệt kém"],
              targetRatio: 0.35
            },
            {
              key: "kh4_thuc_vat_dong_vat",
              topic: "Chủ đề 3. Thực vật và động vật",
              desc: "Nhu cầu sống của thực vật; nhu cầu sống của động vật; chăm sóc cây trồng và vật nuôi (Bài 15 - 18).",
              domainKeywords: ["thực vật", "động vật", "nhu cầu sống của thực vật", "nước", "chất khoáng", "quang hợp", "nhu cầu sống của động vật", "thức ăn", "chăm sóc cây trồng", "chăm sóc vật nuôi"],
              targetRatio: 0.25
            }
          ];
        } else {
          // Cuối HK2 Lớp 4
          return [
            {
              key: "kh4_nam",
              topic: "Chủ đề 4. Nấm",
              desc: "Đặc điểm chung của nấm; nấm ăn và nấm trong chế biến thực phẩm; nấm gây hỏng thực phẩm và nấm độc (Bài 19 - 22).",
              domainKeywords: ["nấm", "đặc điểm của nấm", "mũ nấm", "thân nấm", "chân nấm", "nấm rơm", "nấm mộc nhĩ", "nấm hương", "nấm men", "nấm mốc", "hỏng thực phẩm", "nấm độc", "ngộ độc nấm"],
              targetRatio: 0.30
            },
            {
              key: "kh4_con_nguoi_suc_khoe",
              topic: "Chủ đề 5. Con người và sức khỏe",
              desc: "Vai trò của chất dinh dưỡng đối với cơ thể; chế độ ăn uống cân bằng; một số bệnh liên quan đến dinh dưỡng; thực phẩm an toàn; phòng tránh đuối nước (Bài 23 - 28).",
              domainKeywords: ["chất dinh dưỡng", "chất bột đường", "chất đạm", "chất béo", "vitamin", "chất khoáng", "ăn uống cân bằng", "tháp dinh dưỡng", "béo phì", "suy dinh dưỡng", "thiếu máu", "thực phẩm an toàn", "phòng tránh đuối nước", "đuối nước"],
              targetRatio: 0.40
            },
            {
              key: "kh4_sinh_vat_moi_truong",
              topic: "Chủ đề 6. Sinh vật và môi trường",
              desc: "Chuỗi thức ăn trong tự nhiên; vai trò của thực vật trong chuỗi thức ăn; mối quan hệ dinh dưỡng giữa các loài sinh vật (Bài 29 - 31).",
              domainKeywords: ["sinh vật và môi trường", "chuỗi thức ăn", "mắt xích", "sinh vật sản xuất", "sinh vật tiêu thụ", "vai trò của thực vật", "cỏ", "thỏ", "cáo", "mối quan hệ dinh dưỡng"],
              targetRatio: 0.30
            }
          ];
        }
      }
    }

    // 3. MÔN LỊCH SỬ VÀ ĐỊA LÍ (LỚP 4, LỚP 5)
    if (sub === "LICH_SU_DIA_LY" || sub === "LS_DL") {
      if (g === 5) {
        if (!isTerm2) {
          // HK1 Lớp 5
          return [
            {
              key: "lsdl5_dat_nuoc_con_nguoi",
              topic: "Chủ đề 1. Đất nước và con người Việt Nam",
              desc: "Vị trí địa lí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca; thiên nhiên, biển đảo, dân cư và các dân tộc Việt Nam (Bài 1 - 4).",
              domainKeywords: ["vị trí địa lí", "lãnh thổ", "quốc kì", "quốc huy", "quốc ca", "thiên nhiên việt nam", "địa hình", "khí hậu", "sông ngòi", "biển đảo", "hoàng sa", "trường sa", "dân cư", "dân tộc", "kinh", "bản đồ"],
              targetRatio: 0.35
            },
            {
              key: "lsdl5_quoc_gia_dau_tien",
              topic: "Chủ đề 2. Những quốc gia đầu tiên trên lãnh thổ Việt Nam",
              desc: "Nhà nước Văn Lang, Nhà nước Âu Lạc; Vương quốc Phù Nam; Vương quốc Chăm-pa (Bài 5 - 7).",
              domainKeywords: ["văn lang", "âu lạc", "hùng vương", "an dương vương", "thành cổ loa", "trống đồng đông sơn", "phù nam", "chăm-pa", "óc eo", "tháp chàm", "quốc gia đầu tiên"],
              targetRatio: 0.30
            },
            {
              key: "lsdl5_xay_dung_bao_ve",
              topic: "Chủ đề 3. Xây dựng và bảo vệ đất nước (Thế kỉ X - 1945)",
              desc: "Đấu tranh thời Bắc thuộc; Triều Lý và định đô Thăng Long; Triều Trần và kháng chiến chống Mông - Nguyên; Khởi nghĩa Lam Sơn và Triều Hậu Lê; Triều Nguyễn; Cách mạng tháng Tám năm 1945 (Bài 8 - 14).",
              domainKeywords: ["bắc thuộc", "khởi nghĩa hai bà trưng", "ngô quyền", "bạch đằng", "triều lý", "lý thái tổ", "dời đô", "thăng long", "lý thường kiệt", "triều trần", "trần hưng đạo", "mông - nguyên", "hội nghị diên hồng", "lam sơn", "lê lợi", "nguyễn trãi", "hậu lê", "triều nguyễn", "cách mạng tháng tám", "bác hồ", "tuyên ngôn độc lập"],
              targetRatio: 0.35
            }
          ];
        } else {
          // Cuối HK2 Lớp 5
          return [
            {
              key: "lsdl5_bao_ve_doi_moi",
              topic: "Chủ đề 3. Bảo vệ đất nước và Đất nước Đổi mới (1945 đến nay)",
              desc: "Chiến dịch Điện Biên Phủ năm 1954; Chiến dịch Hồ Chí Minh lịch sử năm 1975 giải phóng miền Nam, thống nhất đất nước; Công cuộc Đổi mới đất nước từ 1986 đến nay (Bài 15 - 17).",
              domainKeywords: ["điện biên phủ", "1954", "chiến thắng điện biên phủ", "đại tướng võ nguyên giáp", "chiến dịch hồ chí minh", "1975", "giải phóng miền nam", "thống nhất đất nước", "đổi mới", "đất nước đổi mới", "công nghiệp hóa", "hiện đại hóa"],
              targetRatio: 0.35
            },
            {
              key: "lsdl5_cac_nuoc_lang_gieng",
              topic: "Chủ đề 4. Các nước láng giềng",
              desc: "Nước Cộng hòa Nhân dân Trung Hoa; Nước CHDCND Lào; Vương quốc Cam-pu-chia; Hiệp hội các quốc gia Đông Nam Á (ASEAN) (Bài 18 - 21).",
              domainKeywords: ["trung quốc", "bắc kinh", "vạn lí trường thành", "lào", "viêng chăn", "luông-pha-bang", "cam-pu-chia", "phnôm phênh", "ăng-co vát", "asean", "hiệp hội các quốc gia đông nam á", "đông nam á", "láng giềng"],
              targetRatio: 0.35
            },
            {
              key: "lsdl5_the_gioi_chung_tay",
              topic: "Chủ đề 5 & 6. Tìm hiểu thế giới và Chung tay xây dựng thế giới",
              desc: "Các châu lục và đại dương trên thế giới; dân số và các chủng tộc; nền văn minh Ai Cập và Hy Lạp cổ đại; xây dựng thế giới xanh - sạch - đẹp và thế giới hòa bình (Bài 22 - 28).",
              domainKeywords: ["châu lục", "đại dương", "châu á", "châu âu", "châu phi", "châu mĩ", "châu đại dương", "châu nam cực", "thái bình dương", "ấn độ dương", "đại tây dương", "bắc băng dương", "dân số thế giới", "chủng tộc", "ai cập", "kim tự tháp", "hy lạp", "thế giới xanh", "hòa bình"],
              targetRatio: 0.30
            }
          ];
        }
      } else if (g === 4) {
        if (!isTerm2) {
          // HK1 Lớp 4
          return [
            {
              key: "lsdl4_dia_phuong",
              topic: "Chủ đề 1. Địa phương em",
              desc: "Vị trí địa lí, tự nhiên, dân cư, lịch sử và văn hóa truyền thống của địa phương em (Bài 1 - 3).",
              domainKeywords: ["địa phương em", "tỉnh", "thành phố", "vị trí địa lí", "thiên nhiên địa phương", "lịch sử địa phương", "truyền thống văn hóa"],
              targetRatio: 0.30
            },
            {
              key: "lsdl4_trung_du_mien_nui_bac_bo",
              topic: "Chủ đề 2. Trung du và miền núi Bắc Bộ",
              desc: "Thiên nhiên, dân cư và hoạt động sản xuất; Đền Hùng và Lễ giỗ Tổ Hùng Vương; Chiến dịch Điện Biên Phủ (Bài 4 - 7).",
              domainKeywords: ["trung du và miền núi bắc bộ", "hoàng liên sơn", "fansipan", "ruộng bậc thang", "thủy điện hòa bình", "đền hùng", "giỗ tổ hùng vương", "phú thọ"],
              targetRatio: 0.35
            },
            {
              key: "lsdl4_dong_bang_bac_bo",
              topic: "Chủ đề 3. Đồng bằng Bắc Bộ",
              desc: "Thiên nhiên và con người; làng quê truyền thống; Thăng Long - Hà Nội; Văn Miếu - Quốc Tử Giám (Bài 8 - 11).",
              domainKeywords: ["đồng bằng bắc bộ", "sông hồng", "đê sông hồng", "hà nội", "thăng long", "văn miếu", "quốc tử giám", "làng quê bắc bộ"],
              targetRatio: 0.35
            }
          ];
        } else {
          // Cuối HK2 Lớp 4
          return [
            {
              key: "lsdl4_duyen_hai_mientrung",
              topic: "Chủ đề 4. Vùng Duyên hải miền Trung",
              desc: "Thiên nhiên và dân cư vùng Duyên hải miền Trung; Cố đô Huế; Phố cổ Hội An (Bài 12 - 16).",
              domainKeywords: ["duyên hải miền trung", "bờ biển miền trung", "cố đô huế", "sông hương", "kinh thành huế", "phố cổ hội an", "quảng nam", "di sản"],
              targetRatio: 0.35
            },
            {
              key: "lsdl4_tay_nguyen",
              topic: "Chủ đề 5. Vùng Tây Nguyên",
              desc: "Thiên nhiên, cao nguyên xếp tầng; Không gian văn hóa Cồng chiêng Tây Nguyên; Lễ hội cồng chiêng (Bài 17 - 20).",
              domainKeywords: ["tây nguyên", "cao nguyên", "đất đỏ badan", "cà phê", "cồng chiêng tây nguyên", "nhà rông", "lễ hội đâm trâu", "lễ hội cồng chiêng"],
              targetRatio: 0.30
            },
            {
              key: "lsdl4_nam_bo",
              topic: "Chủ đề 6. Vùng Nam Bộ",
              desc: "Thiên nhiên vùng đất Nam Bộ; Thành phố Hồ Chí Minh; Địa đạo Củ Chi (Bài 21 - 25).",
              domainKeywords: ["nam bộ", "đồng bằng sông cửu long", "sông đồng nai", "thành phố hồ chí minh", "sài gòn", "địa đạo củ chi", "chợ nổi", "miền tây"],
              targetRatio: 0.35
            }
          ];
        }
      }
    }

    // 4. MÔN CÔNG NGHỆ (LỚP 4, LỚP 5)
    if (sub === "CONG_NGHE") {
      if (g === 5) {
        if (!isTerm2) {
          return [
            {
              key: "cn5_doi_song_sang_che",
              topic: "Chủ đề 1. Công nghệ và đời sống & Nhà sáng chế",
              desc: "Vai trò của công nghệ đối với đời sống con người; các nhà sáng chế tiêu biểu và phát minh của họ (Bài 1, 2).",
              domainKeywords: ["công nghệ", "vai trò công nghệ", "nhà sáng chế", "sáng chế", "ê-đi-xơn", "phát minh", "bóng đèn", "sản phẩm công nghệ"],
              targetRatio: 0.35
            },
            {
              key: "cn5_thiet_ke",
              topic: "Chủ đề 2. Thiết kế và đánh giá sản phẩm công nghệ",
              desc: "Tìm hiểu quy trình thiết kế; thực hành thiết kế sản phẩm công nghệ đơn giản (Bài 3, 4).",
              domainKeywords: ["thiết kế", "tìm hiểu thiết kế", "thiết kế sản phẩm", "quy trình thiết kế", "bản vẽ", "vật liệu thiết kế", "đánh giá sản phẩm"],
              targetRatio: 0.35
            },
            {
              key: "cn5_su_dung_dien_thoai",
              topic: "Chủ đề 3. Sử dụng công nghệ an toàn (Điện thoại)",
              desc: "Tác dụng của điện thoại; cách sử dụng điện thoại thông minh an toàn, tiết kiệm và có văn hóa (Bài 5).",
              domainKeywords: ["điện thoại", "sử dụng điện thoại", "điện thoại thông minh", "an toàn điện thoại", "tiết kiệm pin", "văn hóa sử dụng điện thoại"],
              targetRatio: 0.30
            }
          ];
        } else {
          return [
            {
              key: "cn5_su_dung_tu_lanh",
              topic: "Chủ đề 1. Công nghệ trong gia đình (Sử dụng tủ lạnh)",
              desc: "Cấu tạo và công dụng của tủ lạnh; cách sử dụng, bảo quản thực phẩm trong tủ lạnh an toàn và tiết kiệm điện (Bài 6).",
              domainKeywords: ["tủ lạnh", "sử dụng tủ lạnh", "ngăn đá", "ngăn mát", "bảo quản thực phẩm", "tiết kiệm điện tủ lạnh", "vệ sinh tủ lạnh"],
              targetRatio: 0.35
            },
            {
              key: "cn5_lap_rap_xe_dien",
              topic: "Chủ đề 2. Lắp ráp mô hình kĩ thuật (Mô hình xe điện)",
              desc: "Các bộ phận, chi tiết và quy trình lắp ráp mô hình xe điện chạy bằng pin (Bài 7).",
              domainKeywords: ["mô hình xe điện", "xe điện chạy bằng pin", "pin", "động cơ", "bánh xe", "trục xe", "lắp ráp mô hình", "quy trình lắp ráp"],
              targetRatio: 0.35
            },
            {
              key: "cn5_nang_luong_tai_tao",
              topic: "Chủ đề 3. Mô hình năng lượng tái tạo (Điện gió & Điện mặt trời)",
              desc: "Cấu tạo và quy trình lắp ráp mô hình máy phát điện gió; mô hình điện mặt trời (Bài 8, 9).",
              domainKeywords: ["máy phát điện gió", "điện gió", "mô hình điện mặt trời", "tấm pin mặt trời", "năng lượng tái tạo", "cánh quạt", "tiết kiệm năng lượng"],
              targetRatio: 0.30
            }
          ];
        }
      } else if (g === 4) {
        if (!isTerm2) {
          return [
            {
              key: "cn4_hoa_cay_canh",
              topic: "Chủ đề 1. Hoa và cây cảnh trong đời sống",
              desc: "Lợi ích của hoa và cây cảnh; nhận biết một số loại hoa, cây cảnh phổ biến (Bài 1, 2).",
              domainKeywords: ["hoa", "cây cảnh", "lợi ích của hoa", "làm đẹp không gian", "thanh lọc không khí", "hoa hồng", "hoa đào", "hoa mai"],
              targetRatio: 0.50
            },
            {
              key: "cn4_trong_cham_soc_chau",
              topic: "Chủ đề 2. Trồng và chăm sóc hoa, cây cảnh trong chậu",
              desc: "Dụng cụ, vật liệu trồng hoa; quy trình gieo hạt, trồng cây con và chăm sóc hoa, cây cảnh trong chậu (Bài 3 - 5).",
              domainKeywords: ["trồng hoa trong chậu", "chậu cây", "giá thể", "gieo hạt", "tưới nước", "bón phân", "chăm sóc cây cảnh"],
              targetRatio: 0.50
            }
          ];
        } else {
          return [
            {
              key: "cn4_lap_ghep_mo_hinh",
              topic: "Chủ đề 3. Lắp ghép mô hình kĩ thuật",
              desc: "Bộ chi tiết và dụng cụ lắp ghép; quy trình lắp ghép các mô hình kĩ thuật đơn giản (Bài 6, 7).",
              domainKeywords: ["lắp ghép mô hình", "chi tiết kĩ thuật", "bảng mẫu", "ốc vít", "cờ lê", "tua vít", "bập bênh", "xe tải"],
              targetRatio: 0.50
            },
            {
              key: "cn4_do_choi_dan_gian",
              topic: "Chủ đề 4. Làm đồ chơi dân gian",
              desc: "Dụng cụ, vật liệu và quy trình làm đồ chơi dân gian: chong chóng, đèn lồng, diều giấy (Bài 8 - 10).",
              domainKeywords: ["đồ chơi dân gian", "chong chóng", "đèn lồng", "diều giấy", "gấp giấy", "tre", "keo dán", "thủ công"],
              targetRatio: 0.50
            }
          ];
        }
      }
    }

    // 5. MÔN TIN HỌC (LỚP 3, LỚP 4, LỚP 5)
    if (sub === "TIN_HOC") {
      if (g === 5) {
        if (!isTerm2) {
          return [
            {
              key: "tin5_may_tinh_internet",
              topic: "Chủ đề A & B. Máy tính và em & Mạng Internet",
              desc: "Khả năng của máy tính; tìm kiếm thông tin trên website và độ tin cậy của thông tin (Bài 1, 2).",
              domainKeywords: ["máy tính và em", "mạng internet", "website", "tìm kiếm thông tin", "từ khóa", "độ tin cậy của thông tin", "trình duyệt web"],
              targetRatio: 0.35
            },
            {
              key: "tin5_cay_thu_muc_ban_quyen",
              topic: "Chủ đề C & D. Cây thư mục & Bản quyền nội dung thông tin",
              desc: "Cây thư mục, tổ chức và quản lí tệp tin; tôn trọng bản quyền nội dung thông tin trên môi trường số (Bài 3 - 5).",
              domainKeywords: ["cây thư mục", "thư mục", "tệp tin", "quản lí tệp", "bản quyền", "bản quyền thông tin", "sở hữu trí tuệ", "đạo đức số"],
              targetRatio: 0.35
            },
            {
              key: "tin5_ung_dung_tin_hoc",
              topic: "Chủ đề E. Ứng dụng tin học (Soạn thảo & Đồ họa)",
              desc: "Định dạng kí tự và bố trí hình ảnh trong văn bản; làm quen với phần mềm đồ họa (Bài 6 - 8A).",
              domainKeywords: ["ứng dụng tin học", "soạn thảo văn bản", "định dạng kí tự", "chèn hình ảnh", "bố trí văn bản", "phần mềm đồ họa", "vẽ", "tạo hình"],
              targetRatio: 0.30
            }
          ];
        } else {
          return [
            {
              key: "tin5_do_hoa_san_pham_so",
              topic: "Chủ đề E. Ứng dụng tin học (Sử dụng phần mềm đồ họa)",
              desc: "Sử dụng phần mềm đồ họa tạo sản phẩm số, thiết kế thiệp, áp phích đơn giản (Bài 9A).",
              domainKeywords: ["phần mềm đồ họa", "sản phẩm số", "thiết kế thiệp", "áp phích", "vẽ tranh", "chỉnh sửa hình ảnh", "xuất tệp ảnh"],
              targetRatio: 0.30
            },
            {
              key: "tin5_tuan_tu_lap",
              topic: "Chủ đề F. Giải quyết vấn đề với máy tính (Cấu trúc tuần tự & Lặp)",
              desc: "Cấu trúc tuần tự trong thuật toán; cấu trúc lặp và thực hành lệnh lặp trong môi trường lập trình trực quan (Bài 10 - 12).",
              domainKeywords: ["cấu trúc tuần tự", "thuật toán", "cấu trúc lặp", "lệnh lặp", "vòng lặp", "lặp lại", "scratch", "khối lệnh", "nhân vật"],
              targetRatio: 0.35
            },
            {
              key: "tin5_re_nhanh_bien_kich_ban",
              topic: "Chủ đề F. Lập trình trực quan (Rẽ nhánh, Biến & Kịch bản)",
              desc: "Cấu trúc rẽ nhánh; sử dụng biến và biểu thức trong chương trình; xây dựng chương trình theo kịch bản (Bài 13 - 16).",
              domainKeywords: ["cấu trúc rẽ nhánh", "nếu... thì", "điều kiện", "biến", "biến nhớ", "biểu thức", "phép toán", "kịch bản", "chương trình", "lập trình trực quan"],
              targetRatio: 0.35
            }
          ];
        }
      }
    }

    // Default fallback
    return [
      {
        key: "strand_1",
        topic: "Chủ đề 1. Kiến thức và kĩ năng trọng tâm phần 1",
        desc: "Các mạch kiến thức cốt lõi theo phân phối chương trình SGK.",
        domainKeywords: ["phần 1", "kiến thức 1"],
        targetRatio: 0.50
      },
      {
        key: "strand_2",
        topic: "Chủ đề 2. Kiến thức và kĩ năng trọng tâm phần 2",
        desc: "Các mạch kiến thức vận dụng và liên hệ thực tế theo phân phối chương trình SGK.",
        domainKeywords: ["phần 2", "kiến thức 2"],
        targetRatio: 0.50
      }
    ];
  },

  /**
   * Tự động xây dựng và chuẩn hóa Ma trận 3 tầng dòng (Số câu - Câu số - Số điểm)
   * chuẩn 100% Thông tư 27/2020/TT-BGDĐT từ danh sách câu hỏi thực tế.
   */
  buildThreeTierMatrix: function(exam) {
    if (!exam) return null;
    var isTv = exam.isTiengViet || exam.subjectId === "TIENG_VIET" || !!exam.readingExam;

    function fmtScore(num) {
      if (typeof num !== 'number' || isNaN(num) || num === 0) return 0;
      return Math.round(num * 4) / 4;
    }

    if (isTv) {
      // =========================================================================
      // MA TRẬN 3 TẦNG DÒNG MÔN TIẾNG VIỆT (PHẦN ĐỌC HIỂU 7 ĐIỂM HOẶC 6 ĐIỂM)
      // Bám sát mẫu thực tế: a) Đọc hiểu văn bản | b) Kiến thức Tiếng Việt
      // =========================================================================
      var questions = (exam.readingExam && exam.readingExam.questions) ? exam.readingExam.questions : [];
      if (!questions.length) return null;

      var strands = [
        { key: "reading", name: "a) Đọc hiểu văn bản", desc: "Xác định chi tiết, giải thích ý nghĩa, liên hệ thực tế, rút ra bài học", questions: [] },
        { key: "language", name: "b) Kiến thức Tiếng Việt", desc: "Luyện từ và câu, từ loại, nghĩa của từ, kết từ, biện pháp tu từ, chính tả", questions: [] }
      ];

      questions.forEach(function(q) {
        var cat = (q.category || "").toLowerCase();
        var domain = (q.metadata?.contentDomain || "").toLowerCase();
        var text = (q.text || "").toLowerCase();

        var isLang = cat.includes("từ và câu") || cat.includes("tiếng việt") || cat.includes("language") ||
                     domain.includes("tiếng việt") || domain.includes("luyện từ") ||
                     text.includes("đồng nghĩa") || text.includes("trái nghĩa") || text.includes("nghĩa gốc") ||
                     text.includes("nghĩa chuyển") || text.includes("kết từ") || text.includes("từ loại") ||
                     text.includes("đại từ") || text.includes("danh từ") || text.includes("động từ") ||
                     text.includes("tính từ") || text.includes("dấu câu") || text.includes("đặt câu");
        if (isLang) {
          strands[1].questions.push(q);
        } else {
          strands[0].questions.push(q);
        }
      });

      var processedStrands = strands.map(function(st) {
        var res = {
          name: st.name,
          desc: st.desc,
          m1_mcq: { count: 0, qNums: [], score: 0 },
          m1_essay: { count: 0, qNums: [], score: 0 },
          m2_mcq: { count: 0, qNums: [], score: 0 },
          m2_essay: { count: 0, qNums: [], score: 0 },
          m3_mcq: { count: 0, qNums: [], score: 0 },
          m3_essay: { count: 0, qNums: [], score: 0 },
          total_mcq: { count: 0, qNums: [], score: 0 },
          total_essay: { count: 0, qNums: [], score: 0 },
          total_score: 0
        };

        st.questions.forEach(function(q) {
          var lvl = String(q.level || "").toLowerCase();
          var lvlNum = lvl.includes("1") ? 1 : lvl.includes("3") ? 3 : 2;
          var isEssay = q.type === "essay" || q.type === "constructed" || (q.type !== "mcq" && q.type !== "true_false" && q.type !== "matching" && q.type !== "fill_blank" && (!q.options || !q.options.length));
          var sc = parseFloat(q.score) || (isEssay ? 1.0 : 0.5);
          var qNumStr = String(q.num);

          var target = isEssay ? res[`m${lvlNum}_essay`] : res[`m${lvlNum}_mcq`];
          target.count++;
          target.qNums.push(qNumStr);
          target.score = fmtScore(target.score + sc);

          var totalTarget = isEssay ? res.total_essay : res.total_mcq;
          totalTarget.count++;
          totalTarget.qNums.push(qNumStr);
          totalTarget.score = fmtScore(totalTarget.score + sc);

          res.total_score = fmtScore(res.total_score + sc);
        });

        return res;
      });

      // Lọc bỏ mạch kiến thức không có câu hỏi nào (chưa học / không ra đề)
      var activeTvStrands = processedStrands.filter(function(st) {
        return (st.total_score > 0) || (st.total_mcq.count > 0) || (st.total_essay.count > 0);
      });
      if (activeTvStrands.length > 0) {
        processedStrands = activeTvStrands;
      }

      var summary = {
        m1_mcq: { count: 0, score: 0 },
        m1_essay: { count: 0, score: 0 },
        m2_mcq: { count: 0, score: 0 },
        m2_essay: { count: 0, score: 0 },
        m3_mcq: { count: 0, score: 0 },
        m3_essay: { count: 0, score: 0 },
        total_mcq: { count: 0, score: 0 },
        total_essay: { count: 0, score: 0 },
        grand_total: 0
      };

      processedStrands.forEach(function(st) {
        ['m1_mcq', 'm1_essay', 'm2_mcq', 'm2_essay', 'm3_mcq', 'm3_essay', 'total_mcq', 'total_essay'].forEach(function(k) {
          summary[k].count += st[k].count;
          summary[k].score = fmtScore(summary[k].score + st[k].score);
        });
        summary.grand_total = fmtScore(summary.grand_total + st.total_score);
      });

      var m1TotalScore = fmtScore(summary.m1_mcq.score + summary.m1_essay.score);
      var m2TotalScore = fmtScore(summary.m2_mcq.score + summary.m2_essay.score);
      var m3TotalScore = fmtScore(summary.m3_mcq.score + summary.m3_essay.score);

      var m1Pct = summary.grand_total > 0 ? Math.round((m1TotalScore / summary.grand_total) * 100) : 40;
      var m2Pct = summary.grand_total > 0 ? Math.round((m2TotalScore / summary.grand_total) * 100) : 40;
      var m3Pct = Math.max(0, 100 - m1Pct - m2Pct);

      if (exam.level1Percent !== undefined && exam.level2Percent !== undefined && exam.level3Percent !== undefined) {
        var t1 = parseInt(exam.level1Percent) || 40;
        var t2 = parseInt(exam.level2Percent) || 40;
        var t3 = parseInt(exam.level3Percent) || 20;
        if (t1 + t2 + t3 === 100) {
          m1Pct = t1;
          m2Pct = t2;
          m3Pct = t3;
        }
      }

      var mcqPct = summary.grand_total > 0 ? Math.round((summary.total_mcq.score / summary.grand_total) * 100) : 50;
      var essayPct = Math.max(0, 100 - mcqPct);

      var currentScope = exam.scopeDesc || exam.scope || (typeof document !== 'undefined' ? (document.getElementById("aiCustomScopeInput")?.value || document.getElementById("aiScopePreset")?.value) : "") || "";
      var termInfo = this.resolveExamTermInfo(currentScope);

      return {
        isTiengVietReading: true,
        title: `MA TRẬN ĐỀ KIỂM TRA ${termInfo.matrixTitle} MÔN TIẾNG VIỆT (ĐỌC HIỂU) LỚP ${exam.grade || 5}`,
        schoolYear: exam.schoolYear || "2025 - 2026",
        strands: processedStrands,
        summary: summary,
        percentages: {
          m1_pct: m1Pct,
          m2_pct: m2Pct,
          m3_pct: m3Pct,
          mcq_pct: mcqPct,
          essay_pct: essayPct
        }
      };
    } else {
      // =========================================================================
      // MA TRẬN 3 TẦNG DÒNG CHO CÁC MÔN TOÁN, KHOA HỌC, LỊCH SỬ - ĐỊA LÍ...
      // Phân theo các mạch kiến thức lớn chuẩn sư phạm GDPT 2018 & Thông tư 27
      // =========================================================================
      var mcqs = exam.multipleChoice || [];
      var essays = exam.essaySection || [];
      var subjectId = (exam.subjectId || "").toUpperCase();
      var grade = exam.grade || 5;
      var scope = exam.scopeDesc || exam.scope || (typeof document !== 'undefined' ? (document.getElementById("aiCustomScopeInput")?.value || document.getElementById("aiScopePreset")?.value) : "") || "";

      // 1. CẤU HÌNH CỨNG MẠCH KIẾN THỨC & CHỦ ĐỀ CHUẨN 100% THEO CHƯƠNG TRÌNH SGK KNTT
      var masterConfig = this.getMasterExamMatrixConfig(grade, subjectId, scope);
      var strandDefs = masterConfig.map(function(c) {
        return {
          key: c.key,
          name: c.topic,
          desc: c.desc,
          domainKeywords: c.domainKeywords || [],
          targetRatio: c.targetRatio || (1.0 / masterConfig.length)
        };
      });

      var strands = strandDefs.map(function(d) {
        return {
          name: d.name,
          desc: d.desc,
          key: d.key,
          domainKeywords: d.domainKeywords || [],
          m1_mcq: { count: 0, qNums: [], score: 0 },
          m1_essay: { count: 0, qNums: [], score: 0 },
          m2_mcq: { count: 0, qNums: [], score: 0 },
          m2_essay: { count: 0, qNums: [], score: 0 },
          m3_mcq: { count: 0, qNums: [], score: 0 },
          m3_essay: { count: 0, qNums: [], score: 0 },
          total_mcq: { count: 0, qNums: [], score: 0 },
          total_essay: { count: 0, qNums: [], score: 0 },
          total_score: 0
        };
      });

      function assignQuestionToStrand(q, isEssay) {
        var text = (q.text || "").toLowerCase();
        var domain = (q.metadata?.contentDomain || q.contentDomain || "").toLowerCase();
        var topic = (q.topic || "").toLowerCase();
        var qFull = text + " " + (q.options ? q.options.join(" ") : "") + " " + (q.explain || "") + " " + (q.guide || "") + " " + domain + " " + topic;
        qFull = qFull.toLowerCase();

        var chosenIdx = -1;

        // 1. Đối chiếu trực tiếp theo tên chủ đề / domain
        for (var i = 0; i < strands.length; i++) {
          var sName = strands[i].name.toLowerCase();
          var cleanName = sName.replace(/^(miền|chủ đề|\d+[\s:.]*)\s*/i, '').trim();
          if (cleanName && cleanName.length >= 3) {
            if (domain && (domain.includes(cleanName) || cleanName.includes(domain))) {
              chosenIdx = i;
              break;
            }
            if (topic && (topic.includes(cleanName) || cleanName.includes(topic))) {
              chosenIdx = i;
              break;
            }
          }
        }

        // 2. Chấm điểm tương đồng ngữ nghĩa bằng từ khóa nhận diện chuyên sâu (domainKeywords)
        if (chosenIdx === -1) {
          var bestScore = 0;
          var bestIdx = -1;
          for (var i = 0; i < strands.length; i++) {
            var kws = strands[i].domainKeywords || [];
            var matchCount = 0;
            for (var k = 0; k < kws.length; k++) {
              var kw = kws[k].toLowerCase();
              if (kw && qFull.includes(kw)) {
                matchCount += (domain.includes(kw) ? 5 : (text.includes(kw) ? 2 : 1));
              }
            }
            if (matchCount > bestScore) {
              bestScore = matchCount;
              bestIdx = i;
            }
          }
          if (bestIdx !== -1 && bestScore > 0) {
            chosenIdx = bestIdx;
          }
        }

        // 3. Fallback sư phạm nếu câu hỏi chưa khớp
        if (chosenIdx === -1) {
          if (subjectId === "TOAN") {
            var qn = parseInt(q.num) || 1;
            if (isEssay) {
              chosenIdx = strands.length > 1 ? 1 : 0;
            } else {
              chosenIdx = qn <= Math.round(mcqs.length * 0.5) ? 0 : (strands.length > 2 && qn === mcqs.length ? 2 : 1);
            }
          } else {
            chosenIdx = q.num ? ((parseInt(q.num) - 1) % strands.length) : 0;
          }
        }

        if (chosenIdx < 0 || chosenIdx >= strands.length) chosenIdx = 0;

        var st = strands[chosenIdx] || strands[0];
        var lvl = String(q.level || "").toLowerCase();
        var lvlNum = lvl.includes("1") ? 1 : lvl.includes("3") ? 3 : 2;
        var sc = parseFloat(q.score) || (isEssay ? 1.5 : 0.5);
        var qNumStr = String(q.num);

        var target = isEssay ? st[`m${lvlNum}_essay`] : st[`m${lvlNum}_mcq`];
        target.count++;
        target.qNums.push(qNumStr);
        target.score = fmtScore(target.score + sc);

        var totalTarget = isEssay ? st.total_essay : st.total_mcq;
        totalTarget.count++;
        totalTarget.qNums.push(qNumStr);
        totalTarget.score = fmtScore(totalTarget.score + sc);

        st.total_score = fmtScore(st.total_score + sc);

        // ĐỒNG BỘ 100% CONTENT DOMAIN CỦA CÂU HỎI THEO ĐÚNG CHỦ ĐỀ ĐƯỢC PHÂN BỔ
        q.metadata = q.metadata || {};
        var cleanStrandName = st.name.replace(/^(chủ đề|\d+[\s:.]*)\s*/i, '').trim();
        q.metadata.contentDomain = cleanStrandName || st.name;
        q.contentDomain = q.metadata.contentDomain;
      }

      mcqs.forEach(function(q) { assignQuestionToStrand(q, false); });
      essays.forEach(function(e) { assignQuestionToStrand(e, true); });

      // Lọc bỏ những mạch kiến thức / chủ đề không có câu hỏi nào (chưa học hoặc không kiểm tra trong đề này)
      // Riêng đề Toán định kỳ (Cuối năm, Cả năm, Học kỳ): Bắt buộc giữ đủ 3 mạch kiến thức chuẩn GDPT 2018
      var examScopeStr = (exam.scopeDesc || exam.scope || "").toLowerCase();
      var isPeriodicMath = subjectId === "TOAN" && (
        examScopeStr.includes("cuối") ||
        examScopeStr.includes("cả năm") ||
        examScopeStr.includes("học kì") ||
        examScopeStr.includes("học kỳ") ||
        examScopeStr.includes("định kỳ") ||
        examScopeStr.includes("định kì")
      );

      var activeStrands = strands.filter(function(st) {
        return (st.total_score > 0) || (st.total_mcq.count > 0) || (st.total_essay.count > 0);
      });
      if (activeStrands.length > 0 && !isPeriodicMath) {
        strands = activeStrands;
      }

      var summary = {
        m1_mcq: { count: 0, score: 0 },
        m1_essay: { count: 0, score: 0 },
        m2_mcq: { count: 0, score: 0 },
        m2_essay: { count: 0, score: 0 },
        m3_mcq: { count: 0, score: 0 },
        m3_essay: { count: 0, score: 0 },
        total_mcq: { count: 0, score: 0 },
        total_essay: { count: 0, score: 0 },
        grand_total: 0
      };

      strands.forEach(function(st) {
        ['m1_mcq', 'm1_essay', 'm2_mcq', 'm2_essay', 'm3_mcq', 'm3_essay', 'total_mcq', 'total_essay'].forEach(function(k) {
          summary[k].count += st[k].count;
          summary[k].score = fmtScore(summary[k].score + st[k].score);
        });
        summary.grand_total = fmtScore(summary.grand_total + st.total_score);
      });

      var m1TotalScore = fmtScore(summary.m1_mcq.score + summary.m1_essay.score);
      var m2TotalScore = fmtScore(summary.m2_mcq.score + summary.m2_essay.score);
      var m3TotalScore = fmtScore(summary.m3_mcq.score + summary.m3_essay.score);

      var m1Pct = summary.grand_total > 0 ? Math.round((m1TotalScore / summary.grand_total) * 100) : 40;
      var m2Pct = summary.grand_total > 0 ? Math.round((m2TotalScore / summary.grand_total) * 100) : 40;
      var m3Pct = Math.max(0, 100 - m1Pct - m2Pct);

      if (exam.level1Percent !== undefined && exam.level2Percent !== undefined && exam.level3Percent !== undefined) {
        var t1 = parseInt(exam.level1Percent) || 40;
        var t2 = parseInt(exam.level2Percent) || 40;
        var t3 = parseInt(exam.level3Percent) || 20;
        if (t1 + t2 + t3 === 100) {
          m1Pct = t1;
          m2Pct = t2;
          m3Pct = t3;
        }
      }

      var mcqPct = summary.grand_total > 0 ? Math.round((summary.total_mcq.score / summary.grand_total) * 100) : 70;
      var essayPct = Math.max(0, 100 - mcqPct);
      if (exam.mcqPercent !== undefined) {
        mcqPct = parseInt(exam.mcqPercent) || 70;
        essayPct = 100 - mcqPct;
      }

      var currentScope = exam.scopeDesc || exam.scope || (typeof document !== 'undefined' ? (document.getElementById("aiCustomScopeInput")?.value || document.getElementById("aiScopePreset")?.value) : "") || "";
      var termInfo = this.resolveExamTermInfo(currentScope);

      var subName = (exam.subjectName || (this.EXAM_SUBJECTS[subjectId] ? this.EXAM_SUBJECTS[subjectId].name : "") || "TOÁN").toUpperCase();

      return {
        isTiengVietReading: false,
        title: `MA TRẬN ĐỀ KIỂM TRA ${termInfo.matrixTitle} MÔN ${subName} LỚP ${grade}`,
        schoolYear: exam.schoolYear || "2025 - 2026",
        strands: strands,
        summary: summary,
        percentages: {
          m1_pct: m1Pct,
          m2_pct: m2Pct,
          m3_pct: m3Pct,
          mcq_pct: mcqPct,
          essay_pct: essayPct
        }
      };
    }
  },

  /**
   * Render bảng HTML Ma trận 3 tầng dòng chuẩn Thông tư 27
   * Dùng chung cho cả hiển thị Web và xuất tệp Word
   */
  renderThreeTierMatrixTable: function(m3, options) {
    if (!m3 || !m3.strands || !m3.strands.length) return "";
    var isWord = options && options.isWord;

    function fmt(val) {
      if (val === undefined || val === null || val === "" || val === 0) return "";
      return typeof val === 'number' ? val.toString().replace('.', ',') : String(val);
    }
    function fmtArr(arr) {
      if (!arr || !arr.length) return "";
      return arr.join(', ');
    }

    var borderStyle = 'border: 1px solid #000;';
    var thBg = isWord ? 'background-color: #f2f2f2;' : 'background: #f1f5f9;';
    var subThBg = isWord ? 'background-color: #f9f9f9;' : 'background: #f8fafc;';
    var rowBg = isWord ? 'background-color: #fafafa;' : 'background: #fdfdfd;';
    var totalBg = isWord ? 'background-color: #f2f2f2;' : 'background: #f8fafc;';

    return `
      <table class="matrix-table" style="width: 100%; border-collapse: collapse; text-align: center; font-family: 'Times New Roman', serif; font-size: ${isWord ? '11pt' : '11.5pt'}; margin-bottom: 16px;">
        <thead>
          <tr style="${thBg} font-weight: bold;">
            <th rowspan="2" style="${borderStyle} width: 28%; padding: 6px; text-align: center;">Mạch kiến thức, kĩ năng</th>
            <th rowspan="2" style="${borderStyle} width: 14%; padding: 6px; text-align: center;">Số câu và số điểm</th>
            <th colspan="2" style="${borderStyle} padding: 6px;">Mức 1</th>
            <th colspan="2" style="${borderStyle} padding: 6px;">Mức 2</th>
            <th colspan="2" style="${borderStyle} padding: 6px;">Mức 3</th>
            <th colspan="2" style="${borderStyle} padding: 6px;">Tổng</th>
          </tr>
          <tr style="${subThBg} font-weight: bold;">
            <th style="${borderStyle} padding: 4px; width: 7%;">TNKQ</th>
            <th style="${borderStyle} padding: 4px; width: 7%;">TL</th>
            <th style="${borderStyle} padding: 4px; width: 7%;">TNKQ</th>
            <th style="${borderStyle} padding: 4px; width: 7%;">TL</th>
            <th style="${borderStyle} padding: 4px; width: 7%;">TNKQ</th>
            <th style="${borderStyle} padding: 4px; width: 7%;">TL</th>
            <th style="${borderStyle} padding: 4px; width: 7%;">TNKQ</th>
            <th style="${borderStyle} padding: 4px; width: 7%;">TL</th>
          </tr>
        </thead>
        <tbody>
          ${(m3.strands || []).filter(function(st){ return (st.total_score > 0) || (st.total_mcq && st.total_mcq.count > 0) || (st.total_essay && st.total_essay.count > 0); }).map(function(st) {
            return `
              <tr>
                <td rowspan="3" style="${borderStyle} padding: 6px; text-align: left; vertical-align: middle; font-weight: 500;">
                  <b>${st.name}</b>
                  ${st.desc ? `<div style="font-size: 9.5pt; color: #4b5563; font-weight: normal; margin-top: 3px; line-height: 1.3;">${st.desc}</div>` : ''}
                </td>
                <td style="${borderStyle} padding: 5px; font-weight: bold; ${rowBg}">Số câu</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m1_mcq.count)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m1_essay.count)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m2_mcq.count)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m2_essay.count)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m3_mcq.count)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m3_essay.count)}</td>
                <td style="${borderStyle} padding: 5px; font-weight: bold;">${fmt(st.total_mcq.count)}</td>
                <td style="${borderStyle} padding: 5px; font-weight: bold;">${fmt(st.total_essay.count)}</td>
              </tr>
              <tr>
                <td style="${borderStyle} padding: 5px; font-weight: bold; ${rowBg}">Câu số</td>
                <td style="${borderStyle} padding: 5px;">${fmtArr(st.m1_mcq.qNums)}</td>
                <td style="${borderStyle} padding: 5px;">${fmtArr(st.m1_essay.qNums)}</td>
                <td style="${borderStyle} padding: 5px;">${fmtArr(st.m2_mcq.qNums)}</td>
                <td style="${borderStyle} padding: 5px;">${fmtArr(st.m2_essay.qNums)}</td>
                <td style="${borderStyle} padding: 5px;">${fmtArr(st.m3_mcq.qNums)}</td>
                <td style="${borderStyle} padding: 5px;">${fmtArr(st.m3_essay.qNums)}</td>
                <td style="${borderStyle} padding: 5px; font-weight: bold;">${fmtArr(st.total_mcq.qNums)}</td>
                <td style="${borderStyle} padding: 5px; font-weight: bold;">${fmtArr(st.total_essay.qNums)}</td>
              </tr>
              <tr>
                <td style="${borderStyle} padding: 5px; font-weight: bold; ${rowBg}">Số điểm</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m1_mcq.score)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m1_essay.score)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m2_mcq.score)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m2_essay.score)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m3_mcq.score)}</td>
                <td style="${borderStyle} padding: 5px;">${fmt(st.m3_essay.score)}</td>
                <td style="${borderStyle} padding: 5px; font-weight: bold;">${fmt(st.total_mcq.score)}</td>
                <td style="${borderStyle} padding: 5px; font-weight: bold;">${fmt(st.total_essay.score)}</td>
              </tr>
            `;
          }).join('')}

          <!-- HÀNG TỔNG SỐ CÂU -->
          <tr style="font-weight: bold; ${totalBg}">
            <td rowspan="3" style="${borderStyle} padding: 6px; text-align: center; vertical-align: middle;">Tổng</td>
            <td style="${borderStyle} padding: 5px;">Tổng số câu</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m1_mcq.count)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m1_essay.count)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m2_mcq.count)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m2_essay.count)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m3_mcq.count)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m3_essay.count)}</td>
            <td style="${borderStyle} padding: 5px; color: #1e40af;">${fmt(m3.summary.total_mcq.count)}</td>
            <td style="${borderStyle} padding: 5px; color: #1e40af;">${fmt(m3.summary.total_essay.count)}</td>
          </tr>

          <!-- HÀNG TỔNG SỐ ĐIỂM -->
          <tr style="font-weight: bold; ${totalBg}">
            <td style="${borderStyle} padding: 5px;">Số điểm</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m1_mcq.score)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m1_essay.score)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m2_mcq.score)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m2_essay.score)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m3_mcq.score)}</td>
            <td style="${borderStyle} padding: 5px;">${fmt(m3.summary.m3_essay.score)}</td>
            <td style="${borderStyle} padding: 5px; color: #1e40af;">${fmt(m3.summary.total_mcq.score)}</td>
            <td style="${borderStyle} padding: 5px; color: #1e40af;">${fmt(m3.summary.total_essay.score)}</td>
          </tr>

          <!-- HÀNG TỈ LỆ % -->
          <tr style="font-weight: bold; ${thBg}">
            <td style="${borderStyle} padding: 5px;">Tỉ lệ %</td>
            <td colspan="2" style="${borderStyle} padding: 5px;">${m3.percentages.m1_pct}%</td>
            <td colspan="2" style="${borderStyle} padding: 5px;">${m3.percentages.m2_pct}%</td>
            <td colspan="2" style="${borderStyle} padding: 5px;">${m3.percentages.m3_pct}%</td>
            <td style="${borderStyle} padding: 5px;">${m3.percentages.mcq_pct}%</td>
            <td style="${borderStyle} padding: 5px;">${m3.percentages.essay_pct}%</td>
          </tr>
        </tbody>
      </table>
    `;
  },

  /**
   * Render một câu hỏi trắc nghiệm đa dạng (MCQ, Đúng/Sai, Ghép nối, Điền từ)
   */
  renderQuestionItem: function(q, isWord) {
    if (!q) return "";
    var scoreStr = q.score ? q.score.toString().replace('.', ',') : '0,5';
    var levelStr = q.level || 'Mức 1';
    var qType = q.type || 'mcq';
    var qTitle = `<b>Câu ${q.num}</b> (${scoreStr} điểm - ${levelStr}): ${q.text || ""}`;

    // 1. DẠNG ĐÚNG / SAI (True / False - Đ/S)
    if (qType === "true_false" || q.isTrueFalse || (q.items && q.items.length > 0)) {
      var items = q.items || [];
      if (items.length > 0) {
        var itemsHtml = items.map(function(item) {
          var itemText = typeof item === 'string' ? item : (item.text || "");
          if (isWord) {
            return `<div style="margin: 0pt; margin-left: 20pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt; margin-top: 0pt; margin-bottom: 2pt;">☐ ${itemText}</div>`;
          } else {
            return `
              <div style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 4px;">
                <span style="display: inline-block; width: 17px; height: 17px; min-width: 17px; border: 1.5px solid #333; border-radius: 2px; text-align: center; line-height: 15px; margin-top: 2px;"></span>
                <span>${itemText}</span>
              </div>
            `;
          }
        }).join('');
        return `
          <div class="q-block" style="margin: 0pt; margin-top: 0pt; margin-bottom: 8pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;" ${isWord ? '' : 'contenteditable="true"'}>
            <div style="line-height: 1.0; margin: 0pt; margin-bottom: 2pt;">${qTitle}</div>
            <div style="padding-left: ${isWord ? '15pt' : '1.25rem'}; margin-top: 2pt; line-height: 1.0;">
              ${itemsHtml}
            </div>
          </div>
        `;
      }
    }

    // 2. DẠNG GHÉP ĐÔI / NỐI CỘT (Matching)
    if (qType === "matching" || q.isMatching || (q.columnA && q.columnB)) {
      var colA = q.columnA || [];
      var colB = q.columnB || [];
      var maxRows = Math.max(colA.length, colB.length);
      var rowsHtml = [];
      for (var i = 0; i < maxRows; i++) {
        var textA = colA[i] ? (typeof colA[i] === 'string' ? colA[i] : `${colA[i].id || (i + 1)}. ${colA[i].text}`) : "";
        var textB = colB[i] ? (typeof colB[i] === 'string' ? colB[i] : `${colB[i].id || String.fromCharCode(65 + i)}. ${colB[i].text}`) : "";
        rowsHtml.push(`
          <tr>
            <td style="border: 1px solid #000; padding: 4px 6px; width: 50%; text-align: left; line-height: 1.0; font-family: 'Times New Roman', serif;">${textA}</td>
            <td style="border: 1px solid #000; padding: 4px 6px; width: 50%; text-align: left; line-height: 1.0; font-family: 'Times New Roman', serif;">${textB}</td>
          </tr>
        `);
      }
      return `
        <div class="q-block" style="margin: 0pt; margin-top: 0pt; margin-bottom: 8pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;" ${isWord ? '' : 'contenteditable="true"'}>
          <div style="line-height: 1.0; margin: 0pt; margin-bottom: 2pt;">${qTitle}</div>
          <table style="width: 92%; border-collapse: collapse; margin: 4pt auto; font-family: 'Times New Roman', serif; font-size: ${isWord ? '11pt' : '11.5pt'}; line-height: 1.0;">
            <thead>
              <tr style="${isWord ? 'background-color: #f2f2f2;' : 'background: #f1f5f9;'} font-weight: bold; text-align: center;">
                <th style="border: 1px solid #000; padding: 4px 6px; line-height: 1.0;">Cột A</th>
                <th style="border: 1px solid #000; padding: 4px 6px; line-height: 1.0;">Cột B</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml.join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // 3. DẠNG ĐIỀN TỪ / ĐIỀN KHUYẾT (Fill in blank)
    if (qType === "fill_blank" || q.isFillBlank || q.wordBank || (q.passage && q.passage.includes('…'))) {
      var wordBankText = "";
      if (q.wordBank) {
        var words = Array.isArray(q.wordBank) ? q.wordBank.join(', ') : q.wordBank;
        wordBankText = `<div style="font-style: italic; color: #475569; margin-top: 2pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 12pt;">(Từ cho sẵn: ${words})</div>`;
      }
      return `
        <div class="q-block" style="margin: 0pt; margin-top: 0pt; margin-bottom: 8pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;" ${isWord ? '' : 'contenteditable="true"'}>
          <div style="line-height: 1.0; margin: 0pt; margin-bottom: 2pt;">${qTitle}</div>
          <div style="padding-left: ${isWord ? '15pt' : '1.25rem'}; margin-top: 2pt; line-height: 1.0;">
            ${q.passage ? `<div style="line-height: 1.0; margin-bottom: 2pt;">${q.passage}</div>` : ''}
            ${wordBankText}
          </div>
        </div>
      `;
    }

    // 4. DẠNG TRẮC NGHIỆM 4 LỰA CHỌN (MCQ) THÔNG THƯỜNG
    var options = q.options || [];
    if (isWord) {
      var optionsWordHtml = options.map(function(opt) {
        return `<div style="margin: 0pt; margin-top: 0pt; margin-bottom: 2pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">${opt}</div>`;
      }).join('');
      return `
        <div class="q-block" style="margin: 0pt; margin-top: 0pt; margin-bottom: 8pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">
          <div style="line-height: 1.0; margin: 0pt; margin-bottom: 2pt;">${qTitle}</div>
          <div class="q-options" style="margin-left: 15pt; margin-top: 2pt; line-height: 1.0;">
            ${optionsWordHtml}
          </div>
        </div>
      `;
    } else {
      var optionsWebHtml = options.map(function(opt) {
        return `<div>${opt}</div>`;
      }).join('');
      return `
        <div class="q-block" style="margin-bottom: 10px;" contenteditable="true">
          <div>${qTitle}</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.35rem; padding-left: 1.25rem; margin-top: 4px;">
            ${optionsWebHtml}
          </div>
        </div>
      `;
    }
  },

  /**
   * Render phần Đáp án & Hướng dẫn chấm linh hoạt cho mọi dạng câu hỏi trắc nghiệm
   */
  renderAnswersSection: function(exam, isWord) {
    var mcqs = exam.multipleChoice || [];
    var standardMcqs = mcqs.filter(function(q) {
      return !q.type || q.type === "mcq";
    });
    var otherQuestions = mcqs.filter(function(q) {
      return q.type && q.type !== "mcq";
    });

    var html = [];

    if (standardMcqs.length > 0) {
      html.push(`
        <div style="font-weight: bold; margin-bottom: 4px;">1. Bảng đáp án trắc nghiệm nhiều lựa chọn:</div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; text-align: center; font-size: ${isWord ? '11pt' : '11.5pt'};">
          <thead>
            <tr style="${isWord ? 'background-color: #f2f2f2;' : 'background: #f1f5f9;'} font-weight: bold;">
              <th style="border: 1px solid #000; padding: 4px;">Câu</th>
              ${standardMcqs.map(function(q) { return `<th style="border: 1px solid #000; padding: 4px;">${q.num}</th>`; }).join('')}
            </tr>
          </thead>
          <tbody>
            <tr style="font-weight: bold; color: #166534;">
              <td style="border: 1px solid #000; padding: 4px; background: ${isWord ? '#fafafa' : '#f8fafc'}; color: #000;">Đáp án</td>
              ${standardMcqs.map(function(q) { return `<td style="border: 1px solid #000; padding: 4px;">${q.ans || '-'}</td>`; }).join('')}
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 4px; background: ${isWord ? '#fafafa' : '#f8fafc'}; font-weight: bold;">Điểm</td>
              ${standardMcqs.map(function(q) { return `<td style="border: 1px solid #000; padding: 4px;">${q.score ? q.score.toString().replace('.', ',') : '0,5'}</td>`; }).join('')}
            </tr>
          </tbody>
        </table>
      `);
    }

    if (otherQuestions.length > 0) {
      html.push(`<div style="font-weight: bold; margin-bottom: 6px;">2. Hướng dẫn chấm các câu hỏi trắc nghiệm đặc thù:</div>`);
      otherQuestions.forEach(function(q) {
        var ansDetail = "";
        if (q.type === "true_false") {
          ansDetail = (q.items || []).map(function(item, idx) {
            return `<div>• Ý ${idx + 1} (${item.text || ''}): <b>${item.ans === 'Đ' ? 'Đúng (Đ)' : 'Sai (S)'}</b></div>`;
          }).join('') || `<div>Đáp án: <b>${q.ans || ''}</b></div>`;
        } else if (q.type === "matching") {
          if (q.pairs) {
            ansDetail = `<div>Ghép nối đúng: <b>${typeof q.pairs === 'string' ? q.pairs : q.pairs.map(p => `${p.a} - ${p.b}`).join(', ')}</b></div>`;
          } else {
            ansDetail = `<div>${q.explain || q.ans || ''}</div>`;
          }
        } else if (q.type === "fill_blank") {
          if (q.blanks) {
            ansDetail = `<div>Lần lượt điền: <b>${Array.isArray(q.blanks) ? q.blanks.join('; ') : q.blanks}</b></div>`;
          } else {
            ansDetail = `<div>Đáp án: <b>${q.ans || q.explain || ''}</b></div>`;
          }
        } else {
          ansDetail = `<div>Đáp án: <b>${q.ans || ''}</b>. ${q.explain || ''}</div>`;
        }

        html.push(`
          <div style="margin-bottom: 8px; padding-left: 10px; border-left: 3px solid #7c3aed;">
            <b>Câu ${q.num} (${q.score ? q.score.toString().replace('.', ',') : '1,0'} điểm):</b>
            <div style="margin-top: 2px;">${ansDetail}</div>
            ${q.explain ? `<div style="font-size: 10pt; color: #555; margin-top: 2px;"><i>Gợi ý chấm: ${q.explain}</i></div>` : ''}
          </div>
        `);
      });
    }

    return html.join('');
  },

  /**
   * Tự động thẩm định, cân bằng toán học và chuẩn hóa 100% Mức độ nhận thức (Mức 1, Mức 2, Mức 3)
   * và điểm số Trắc nghiệm / Tự luận chuẩn Thông tư 27/2020/TT-BGDĐT & SEA-PLM.
   * Bảo đảm tỉ lệ % và số điểm từng mức độ giữa cấu hình nhập vào và ma trận luôn trùng khớp tuyệt đối.
   */
  balanceCognitiveLevels: function(exam, params) {
    if (!exam) return exam;

    var targetM1Pct = (params && parseInt(params.level1Percent)) ||
                      parseInt(exam.level1Percent) ||
                      (typeof document !== 'undefined' && parseInt(document.getElementById("aiLevel1Pct")?.value)) ||
                      40;
    var targetM2Pct = (params && parseInt(params.level2Percent)) ||
                      parseInt(exam.level2Percent) ||
                      (typeof document !== 'undefined' && parseInt(document.getElementById("aiLevel2Pct")?.value)) ||
                      40;
    var targetM3Pct = (params && parseInt(params.level3Percent)) ||
                      parseInt(exam.level3Percent) ||
                      (typeof document !== 'undefined' && parseInt(document.getElementById("aiLevel3Pct")?.value)) ||
                      20;

    var totalPct = targetM1Pct + targetM2Pct + targetM3Pct;
    if (totalPct !== 100) {
      targetM3Pct = Math.max(0, 100 - targetM1Pct - targetM2Pct);
    }

    exam.level1Percent = targetM1Pct;
    exam.level2Percent = targetM2Pct;
    exam.level3Percent = targetM3Pct;

    // Helper phân bổ điểm toán học bảo đảm 100% từng câu là bội số của 0,25 (thang điểm 0,25; 0,5; 0,75; 1,0; 1,5; 2,0; 2,5...)
    function assignScoresToCount(count, targetTotal, isMcq) {
      if (count <= 0) return [];
      var target = Math.round(targetTotal * 4) / 4;
      if (count === 1) return [target];

      // Nếu là trắc nghiệm và targetTotal có thể phân rã thành các câu 0.5đ và 1.0đ:
      if (isMcq) {
        var y = Math.round(2 * target - count); // số câu 1.0đ
        var x = count - y; // số câu 0.5đ
        if (x >= 0 && y >= 0 && Math.abs((x * 0.5 + y * 1.0) - target) < 0.001) {
          var res = [];
          for (var i = 0; i < x; i++) res.push(0.5);
          for (var j = 0; j < y; j++) res.push(1.0);
          return res;
        }
      }

      // Phân bổ phần dư chẵn 0,25đ (Quarter-points partition):
      var totalQuarters = Math.round(target * 4);
      if (totalQuarters < count) {
        var resSmall = [];
        for (var s = 0; s < count; s++) resSmall.push(s < totalQuarters ? 0.25 : 0);
        return resSmall;
      }

      var baseQuarters = Math.floor(totalQuarters / count);
      var rem = totalQuarters % count;
      var res = [];
      for (var k = 0; k < count; k++) {
        var qCount = baseQuarters + (k < rem ? 1 : 0);
        res.push(qCount * 0.25);
      }
      return res;
    }

    // 1. Nếu là Đề Tiếng Việt Đọc hiểu (Điểm đọc hiểu thường là 6,0đ hoặc 7,0đ)
    if (exam.readingExam && Array.isArray(exam.readingExam.questions)) {
      var compScore = Math.round((parseFloat(exam.readingExam.comprehensionScore) || 6.0) * 4) / 4;
      var tvTargetM1 = Math.round((compScore * targetM1Pct / 100) * 4) / 4;
      var tvTargetM2 = Math.round((compScore * targetM2Pct / 100) * 4) / 4;
      var tvTargetM3 = Math.round((compScore - tvTargetM1 - tvTargetM2) * 4) / 4;

      var tvQuestions = exam.readingExam.questions;
      var tvMcqs = [];
      var tvEssays = [];
      tvQuestions.forEach(function(q) {
        var isEs = q.type === "essay" || q.type === "constructed" || (q.type !== "mcq" && q.type !== "true_false" && q.type !== "matching" && q.type !== "fill_blank" && (!q.options || !q.options.length));
        if (isEs) tvEssays.push(q);
        else tvMcqs.push(q);
      });

      var tvEssayTarget = tvEssays.length > 0 ? (tvEssays.length * 1.0) : 0;
      if (tvEssayTarget > compScore - 2.0) tvEssayTarget = Math.max(1.0, compScore - tvMcqs.length * 0.5);
      tvEssayTarget = Math.round(tvEssayTarget * 4) / 4;
      var tvMcqTarget = Math.round((compScore - tvEssayTarget) * 4) / 4;

      var tv_m1_mcq = Math.min(tvTargetM1, tvMcqTarget);
      var tv_m1_essay = Math.round((tvTargetM1 - tv_m1_mcq) * 4) / 4;

      var tv_m3_essay = Math.min(tvTargetM3, Math.max(0, Math.round((tvEssayTarget - tv_m1_essay) * 4) / 4));
      var tv_m3_mcq = Math.round((tvTargetM3 - tv_m3_essay) * 4) / 4;

      var tv_m2_mcq = Math.round((tvMcqTarget - tv_m1_mcq - tv_m3_mcq) * 4) / 4;
      var tv_m2_essay = Math.round((tvEssayTarget - tv_m1_essay - tv_m3_essay) * 4) / 4;

      function assignTv(list, buckets, isMcq) {
        if (!list.length || !buckets.length) return;
        var totalAssigned = 0;
        var totalScore = buckets.reduce(function(a, b) { return a + b.target; }, 0);
        buckets.forEach(function(b, idx) {
          if (idx === buckets.length - 1) {
            b.count = list.length - totalAssigned;
          } else {
            b.count = Math.max(1, Math.round(list.length * (b.target / totalScore)));
            totalAssigned += b.count;
          }
        });
        var curSum = buckets.reduce(function(a, b) { return a + b.count; }, 0);
        if (curSum !== list.length) {
          buckets[buckets.length - 1].count += (list.length - curSum);
        }

        var idx = 0;
        buckets.forEach(function(b) {
          var scores = assignScoresToCount(b.count, b.target, isMcq);
          scores.forEach(function(sc) {
            if (idx < list.length) {
              list[idx].score = sc;
              list[idx].level = b.level;
              if (!list[idx].metadata) list[idx].metadata = {};
              list[idx].metadata.difficulty = b.diff;
              list[idx].metadata.cognitiveProcess = b.cog;
              idx++;
            }
          });
        });
      }

      var tvMcqBuckets = [];
      if (tv_m1_mcq > 0) tvMcqBuckets.push({ level: "Mức 1", target: tv_m1_mcq, diff: "Dễ", cog: "Biết (Knowing)" });
      if (tv_m2_mcq > 0) tvMcqBuckets.push({ level: "Mức 2", target: tv_m2_mcq, diff: "Trung bình", cog: "Áp dụng (Applying)" });
      if (tv_m3_mcq > 0) tvMcqBuckets.push({ level: "Mức 3", target: tv_m3_mcq, diff: "Khó", cog: "Vận dụng (Reasoning)" });
      assignTv(tvMcqs, tvMcqBuckets, true);

      var tvEssayBuckets = [];
      if (tv_m1_essay > 0) tvEssayBuckets.push({ level: "Mức 1", target: tv_m1_essay, diff: "Dễ", cog: "Biết (Knowing)" });
      if (tv_m2_essay > 0) tvEssayBuckets.push({ level: "Mức 2", target: tv_m2_essay, diff: "Trung bình", cog: "Áp dụng (Applying)" });
      if (tv_m3_essay > 0) tvEssayBuckets.push({ level: "Mức 3", target: tv_m3_essay, diff: "Khó", cog: "Vận dụng (Reasoning)" });
      assignTv(tvEssays, tvEssayBuckets, false);

      return exam;
    }

    // 2. Cho các môn chung (Toán, Khoa học, Lịch sử - Địa lí, Tin học, Công nghệ...)
    var targetM1Score = Math.round((10.0 * targetM1Pct / 100) * 4) / 4;
    var targetM2Score = Math.round((10.0 * targetM2Pct / 100) * 4) / 4;
    var targetM3Score = Math.round((10.0 - targetM1Score - targetM2Score) * 4) / 4;

    exam.targetLevel1Score = targetM1Score;
    exam.targetLevel2Score = targetM2Score;
    exam.targetLevel3Score = targetM3Score;

    var mcqs = exam.multipleChoice || [];
    var essays = exam.essaySection || [];

    var mcqPct = (params && parseInt(params.mcqPercent)) ||
                 parseInt(exam.mcqPercent) ||
                 (typeof document !== 'undefined' && parseInt(document.getElementById("aiScoreRatioSlider")?.value)) ||
                 70;
    var essayPct = 100 - mcqPct;
    exam.mcqPercent = mcqPct;
    exam.essayPercent = essayPct;

    var targetMcqScore = 0;
    var targetEssayScore = 0;
    if (mcqs.length === 0) {
      targetEssayScore = 10.0;
    } else if (essays.length === 0) {
      targetMcqScore = 10.0;
    } else {
      targetMcqScore = Math.round((10.0 * mcqPct / 100) * 4) / 4;
      targetEssayScore = Math.round((10.0 - targetMcqScore) * 4) / 4;
    }

    // Phân bổ điểm cho từng mức độ giữa MCQ và Tự luận
    var m1_mcq = Math.min(targetM1Score, targetMcqScore);
    var m1_essay = Math.round((targetM1Score - m1_mcq) * 4) / 4;

    var m3_essay = Math.min(targetM3Score, Math.max(0, Math.round((targetEssayScore - m1_essay) * 4) / 4));
    var m3_mcq = Math.round((targetM3Score - m3_essay) * 4) / 4;

    var m2_mcq = Math.round((targetMcqScore - m1_mcq - m3_mcq) * 4) / 4;
    var m2_essay = Math.round((targetEssayScore - m1_essay - m3_essay) * 4) / 4;

    // 1. Phân bổ cho MCQ
    if (mcqs.length > 0) {
      var mcqBuckets = [];
      if (m1_mcq > 0) mcqBuckets.push({ level: "Mức 1", target: m1_mcq, diff: "Dễ", cog: "Biết (Knowing)" });
      if (m2_mcq > 0) mcqBuckets.push({ level: "Mức 2", target: m2_mcq, diff: "Trung bình", cog: "Áp dụng (Applying)" });
      if (m3_mcq > 0) mcqBuckets.push({ level: "Mức 3", target: m3_mcq, diff: "Khó", cog: "Vận dụng (Reasoning)" });

      if (mcqBuckets.length === 1) {
        mcqBuckets[0].count = mcqs.length;
      } else {
        var totalAssigned = 0;
        mcqBuckets.forEach(function(b, idx) {
          if (idx === mcqBuckets.length - 1) {
            b.count = mcqs.length - totalAssigned;
          } else {
            b.count = Math.max(1, Math.round(mcqs.length * (b.target / targetMcqScore)));
            totalAssigned += b.count;
          }
        });
        var curSum = mcqBuckets.reduce(function(a, b) { return a + b.count; }, 0);
        if (curSum !== mcqs.length) {
          mcqBuckets[mcqBuckets.length - 1].count += (mcqs.length - curSum);
        }
      }

      var qIdx = 0;
      mcqBuckets.forEach(function(b) {
        var scores = assignScoresToCount(b.count, b.target, true);
        scores.forEach(function(sc) {
          if (qIdx < mcqs.length) {
            var q = mcqs[qIdx];
            q.level = b.level;
            q.score = sc;
            if (!q.metadata) q.metadata = {};
            q.metadata.difficulty = b.diff;
            q.metadata.cognitiveProcess = b.cog;
            qIdx++;
          }
        });
      });
    }

    // 2. Phân bổ cho Essay
    if (essays.length > 0) {
      var essayBuckets = [];
      if (m1_essay > 0) essayBuckets.push({ level: "Mức 1", target: m1_essay, diff: "Dễ", cog: "Biết (Knowing)" });
      if (m2_essay > 0) essayBuckets.push({ level: "Mức 2", target: m2_essay, diff: "Trung bình", cog: "Áp dụng (Applying)" });
      if (m3_essay > 0) essayBuckets.push({ level: "Mức 3", target: m3_essay, diff: "Khó", cog: "Vận dụng (Reasoning)" });

      if (essayBuckets.length === 1) {
        essayBuckets[0].count = essays.length;
      } else {
        var totalAssignedEs = 0;
        essayBuckets.forEach(function(b, idx) {
          if (idx === essayBuckets.length - 1) {
            b.count = essays.length - totalAssignedEs;
          } else {
            b.count = Math.max(1, Math.round(essays.length * (b.target / targetEssayScore)));
            totalAssignedEs += b.count;
          }
        });
        var curSumEs = essayBuckets.reduce(function(a, b) { return a + b.count; }, 0);
        if (curSumEs !== essays.length) {
          essayBuckets[essayBuckets.length - 1].count += (essays.length - curSumEs);
        }
      }

      var esIdx = 0;
      essayBuckets.forEach(function(b) {
        var scores = assignScoresToCount(b.count, b.target, false);
        scores.forEach(function(sc) {
          if (esIdx < essays.length) {
            var es = essays[esIdx];
            es.level = b.level;
            es.score = sc;
            if (!es.metadata) es.metadata = {};
            es.metadata.difficulty = b.diff;
            es.metadata.cognitiveProcess = b.cog;
            var scoreStr = sc.toString().replace('.', ',');
            if (es.title) {
              es.title = es.title.replace(/\([0-9.,]+\s*điểm[^)]*\)/i, `(${scoreStr} điểm - ${b.level})`);
            } else {
              es.title = `Câu ${es.num || (esIdx + 1)} (${scoreStr} điểm - ${b.level}):`;
            }
            esIdx++;
          }
        });
      });
    }

    exam.mcqTotalScore = targetMcqScore;
    exam.essayTotalScore = targetEssayScore;

    return exam;
  },

  /**
   * Tự động thẩm định, rà soát và cân bằng 100% Ma trận & Điểm số đề thi do AI sinh ra (Chuẩn TT27 & SEA-PLM)
   */
  sanitizeAndBalanceExam: function(exam, params) {
    if (!exam) return exam;

    if (params) {
      if (params.level1Percent !== undefined) exam.level1Percent = parseInt(params.level1Percent);
      if (params.level2Percent !== undefined) exam.level2Percent = parseInt(params.level2Percent);
      if (params.level3Percent !== undefined) exam.level3Percent = parseInt(params.level3Percent);
      if (params.mcqPercent !== undefined) exam.mcqPercent = parseInt(params.mcqPercent);
      if (params.essayPercent !== undefined) exam.essayPercent = parseInt(params.essayPercent);
      if (params.subjectId) exam.subjectId = params.subjectId;
      if (params.grade) exam.grade = parseInt(params.grade);
      if (params.scope) {
        exam.scope = params.scope;
        if (!exam.scopeDesc) exam.scopeDesc = params.scope;
      }
    }

    var currentScope = exam.scopeDesc || exam.scope || (params && params.scope) || (typeof document !== 'undefined' ? (document.getElementById("aiCustomScopeInput")?.value || document.getElementById("aiScopePreset")?.value) : "") || "";
    var termInfo = this.resolveExamTermInfo(currentScope);
    
    // Tự động gán và sửa lỗi nếu AI trả về sai học kỳ
    if (!exam.examTerm || (termInfo.term === "HỌC KÌ II" && String(exam.examTerm).includes("I") && !String(exam.examTerm).includes("II"))) {
      exam.examTerm = termInfo.term;
    }
    exam.examHeaderTitle = termInfo.headerTitle;
    if (!exam.scope) exam.scope = currentScope;
    if (!exam.scopeDesc) exam.scopeDesc = currentScope;

    // Helper khử lỗi escape tab LaTeX và tự động chuyển đổi mã LaTeX thô (\frac, m^2, \times...) sang chuẩn ký hiệu Tiểu học (3/4, m², ×...)
    function cleanLatexForElementary(str) {
      if (typeof str !== 'string') return str;
      return str
        // Khử tab escape vô tình do JSON string gây ra (\times -> \t + imes, v.v.)
        .replace(/\t(imes)/g, '\\times')
        .replace(/\t(ext)/g, '\\text')
        .replace(/\t(frac)/g, '\\frac')
        .replace(/\t(dfrac)/g, '\\dfrac')
        // Khử \left, \right
        .replace(/\\left\s*([(\[{|])/g, '$1')
        .replace(/\\right\s*([)\]}|])/g, '$1')
        .replace(/\\left\./g, '')
        .replace(/\\right\./g, '')
        // Khử các lệnh văn bản LaTeX (\text{}, \mathrm{}, \textbf{}...)
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\mathrm\{([^}]+)\}/g, '$1')
        .replace(/\\textbf\{([^}]+)\}/g, '$1')
        .replace(/\\mathbf\{([^}]+)\}/g, '$1')
        .replace(/\\mathit\{([^}]+)\}/g, '$1')
        // Chuyển phân số \frac{a}{b} hoặc \dfrac{a}{b} -> a/b
        .replace(/\\d?frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, '$1/$2')
        // Chuyển đơn vị đo diện tích, thể tích có số mũ (^2 -> ², ^3 -> ³)
        .replace(/(\b(?:km|hm|dam|m|dm|cm|mm))\^2/gi, '$1²')
        .replace(/(\b(?:km|hm|dam|m|dm|cm|mm))\^3/gi, '$1³')
        .replace(/\^2/g, '²')
        .replace(/\^3/g, '³')
        // Dấu nhân, chia, so sánh, quan hệ tập hợp
        .replace(/\\times/g, '×')
        .replace(/\\cdot/g, '·')
        .replace(/\\div/g, ':')
        .replace(/\\le[q]?\b/g, '≤')
        .replace(/\\ge[q]?\b/g, '≥')
        .replace(/\\in\b/g, '∈')
        .replace(/\\notin\b/g, '∉')
        .replace(/\\neq\b/g, '≠')
        .replace(/\\approx\b/g, '≈')
        .replace(/\\dots/g, '...')
        .replace(/\\ldots/g, '...')
        // Khử dấu ngoặc nhọn LaTeX \{ và \}
        .replace(/\\\{/g, '{')
        .replace(/\\\}/g, '}')
        // Khử khoảng trắng escape LaTeX (\ )
        .replace(/\\\s+/g, ' ')
        // Khử dấu gạch chéo escape thừa trước dấu câu
        .replace(/\\([,;%_])/g, '$1')
        // Khử cặp dấu $ hoặc $$
        .replace(/\$\$([^$]+)\$\$/g, '$1')
        .replace(/\$([^$]+)\$/g, '$1')
        // Khử dấu gạch chéo đơn độc còn sót lại trước chữ cái
        .replace(/\\([a-zA-Z]+)/g, function(match, word) {
          if (word === 'times') return '×';
          if (word === 'div') return ':';
          if (word === 'le' || word === 'leq') return '≤';
          if (word === 'ge' || word === 'geq') return '≥';
          if (word === 'in') return '∈';
          if (word === 'approx') return '≈';
          return word;
        })
        // Chuẩn hóa mô hình chính quyền 2 cấp TOÀN QUỐC từ 01/7/2025 (BÃI BỎ HOÀN TOÀN CẤP HUYỆN: không còn quận, huyện, thị xã)
        .replace(/huyện\s+([A-ZÀ-Ỹ][a-zà-ỹ\s]+?)\s+thuộc\s+(tỉnh|thành phố)\s+([A-ZÀ-Ỹ][a-zà-ỹ\s]+?)(?:\s+mới)?(?=[,\.\s]|$)/gi, 'xã $1, $2 $3')
        .replace(/(\b(?:tại|ở|thuộc|về|đến|qua|từ)\s+)huyện\s+([A-ZÀ-Ỹ][a-zà-ỹ\s]+?)(?=[,\.\s]|$)/gi, '$1xã $2')
        .replace(/\bhuyện\s+([A-ZÀ-Ỹ][a-zà-ỹ]+)/g, 'xã $1')
        .replace(/\bthị xã\s+([A-ZÀ-Ỹ][a-zà-ỹ]+)/g, 'phường $1')
        .replace(/\bquận\s+([0-9]+)\b/gi, 'phường $1')
        .replace(/\bquận\s+([A-ZÀ-Ỹ][a-zà-ỹ]+)/g, 'phường $1')
        .replace(/(tỉnh|thành phố)\s+([A-ZÀ-Ỹ][a-zà-ỹ\s]+?)\s+mới(?=[,\.\s]|$)/gi, '$1 $2')
        .replace(/Vĩnh\s+Long\s+mới/gi, 'Vĩnh Long')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
    var cleanLatexText = cleanLatexForElementary;

    function cleanDeep(obj) {
      if (!obj) return;
      if (typeof obj === 'string') return;
      for (var k in obj) {
        if (typeof obj[k] === 'string') {
          obj[k] = cleanLatexText(obj[k]);
        } else if (typeof obj[k] === 'object') {
          cleanDeep(obj[k]);
        }
      }
    }

    cleanDeep(exam);

    // Đối với môn Tiếng Việt có cấu trúc 2 phiếu riêng biệt
    if (exam.readingExam || exam.isTiengViet) {
      this.balanceCognitiveLevels(exam, params);
      exam.threeTierMatrix = AIService.buildThreeTierMatrix(exam);
      if (!exam.matrix) exam.matrix = {};
      exam.matrix.threeTier = exam.threeTierMatrix;
      return exam;
    }

    var mcqs = exam.multipleChoice || [];
    var essays = exam.essaySection || [];

    // 1. Kiểm tra chéo đáp án MCQ & làm sạch các dạng câu hỏi trắc nghiệm đa dạng
    mcqs.forEach(function(q) {
      if (q.text) q.text = cleanLatexText(q.text);
      if (q.explain) q.explain = cleanLatexText(q.explain);
      if (Array.isArray(q.options)) {
        q.options = q.options.map(cleanLatexText);
      }
      if (Array.isArray(q.items)) {
        q.items.forEach(function(it) {
          if (it.text) it.text = cleanLatexText(it.text);
        });
      }
      if (Array.isArray(q.columnA)) {
        q.columnA.forEach(function(it) {
          if (it.text) it.text = cleanLatexText(it.text);
        });
      }
      if (Array.isArray(q.columnB)) {
        q.columnB.forEach(function(it) {
          if (it.text) it.text = cleanLatexText(it.text);
        });
      }
      if (q.passage) q.passage = cleanLatexText(q.passage);

      // Chỉ kiểm tra chéo đáp án cho trắc nghiệm 4 lựa chọn (MCQ)
      if (!q.type || q.type === "mcq") {
        var dr = q.distractorRationale || {};
        var correctText = dr.correct || "";
        var mMatch = correctText.match(/phương án (?:đúng )?([A-D])/i) ||
                     correctText.match(/đáp án (?:đúng )?([A-D])/i) ||
                     correctText.match(/chọn (?:phương án )?([A-D])/i) ||
                     correctText.match(/lựa chọn ([A-D])(?: là| chính)/i);
        if (mMatch && mMatch[1]) {
          var detectedAns = mMatch[1].toUpperCase();
          if (q.ans && q.ans.toUpperCase() !== detectedAns) {
            console.warn(`[Tự động sửa lỗi AI] Câu ${q.num}: Phát hiện mâu thuẫn ans='${q.ans}' nhưng distractorRationale chỉ định '${detectedAns}'. Tự động đồng bộ ans thành '${detectedAns}'.`);
            q.ans = detectedAns;
          }
        }
      }
    });

    // 2. Tự động cân bằng toán học chuẩn 100% các Mức độ nhận thức (M1, M2, M3) & điểm số Trắc nghiệm / Tự luận
    this.balanceCognitiveLevels(exam, params);

    var totalMcqScore = exam.mcqTotalScore || 7.0;
    var totalEssayScore = exam.essayTotalScore || 3.0;

    // 3. Tự động tính toán và ĐỒNG BỘ 100% Ma trận tổng hợp (matrix.summary) từ danh sách câu hỏi thực tế
    if (!exam.matrix) exam.matrix = {};
    if (!exam.matrix.summary) exam.matrix.summary = {};
    var s = exam.matrix.summary;

    var m1Mcq = 0, m1Essay = 0;
    var m2Mcq = 0, m2Essay = 0;
    var m3Mcq = 0, m3Essay = 0;

    mcqs.forEach(function(q) {
      var lvl = String(q.level || "").toLowerCase();
      if (lvl.includes("1")) m1Mcq++;
      else if (lvl.includes("3")) m3Mcq++;
      else m2Mcq++;
    });

    essays.forEach(function(es) {
      var lvl = String(es.level || "").toLowerCase();
      if (lvl.includes("1")) m1Essay++;
      else if (lvl.includes("3")) m3Essay++;
      else m2Essay++;
    });

    function fmtScoreStr(num) {
      var r = Math.round((parseFloat(num) || 0) * 4) / 4;
      return r.toString().replace('.', ',');
    }

    s.m1_total_mcq = m1Mcq;
    s.m1_total_essay = m1Essay;
    s.m1_score = fmtScoreStr(exam.targetLevel1Score !== undefined ? exam.targetLevel1Score : 4.0);
    s.m1_pct = exam.level1Percent || 40;

    s.m2_total_mcq = m2Mcq;
    s.m2_total_essay = m2Essay;
    s.m2_score = fmtScoreStr(exam.targetLevel2Score !== undefined ? exam.targetLevel2Score : 4.0);
    s.m2_pct = exam.level2Percent || 40;

    s.m3_total_mcq = m3Mcq;
    s.m3_total_essay = m3Essay;
    s.m3_score = fmtScoreStr(exam.targetLevel3Score !== undefined ? exam.targetLevel3Score : 2.0);
    s.m3_pct = exam.level3Percent || 20;

    s.total_mcq_count = mcqs.length;
    s.total_essay_count = essays.length;
    s.total_score = "10";

    // Đồng bộ từng dòng chủ đề trong matrix.topics nếu có
    if (exam.matrix.topics && Array.isArray(exam.matrix.topics)) {
      var mcqScoreMap = {};
      mcqs.forEach(function(q) { mcqScoreMap[q.num] = parseFloat(q.score) || 0.5; });
      var essayScoreMap = {};
      essays.forEach(function(e) { essayScoreMap[e.num] = parseFloat(e.score) || 1.5; });

      exam.matrix.topics.forEach(function(top) {
        var rowMcqCount = 0;
        var rowEssayCount = 0;
        var rowScore = 0;

        function extractNums(str) {
          if (!str) return [];
          var matches = String(str).match(/\d+/g);
          return matches ? matches.map(Number) : [];
        }

        ['m1_mcq', 'm2_mcq', 'm3_mcq'].forEach(function(f) {
          var nums = extractNums(top[f]);
          rowMcqCount += nums.length;
          nums.forEach(function(n) { rowScore += mcqScoreMap[n] || 0.5; });
        });

        ['m1_essay', 'm2_essay', 'm3_essay'].forEach(function(f) {
          var nums = extractNums(top[f]);
          rowEssayCount += nums.length;
          nums.forEach(function(n) { rowScore += essayScoreMap[n] || 1.5; });
        });

        if (rowMcqCount > 0 || rowEssayCount > 0) {
          top.total_mcq = rowMcqCount;
          top.total_essay = rowEssayCount;
          top.score = (Math.round(rowScore * 4) / 4).toString().replace('.', ',');
        }
      });
    }

    // 6. Đồng bộ bảng siêu dữ liệu SEA-PLM (seaplmMetadataTable)
    if (exam.seaplmMetadataTable && Array.isArray(exam.seaplmMetadataTable)) {
      var mcqMap = {};
      mcqs.forEach(function(q) { mcqMap[q.num] = q; });
      var essayMap = {};
      essays.forEach(function(e) { essayMap[e.num] = e; });

      exam.seaplmMetadataTable.forEach(function(item) {
        var isMcqItem = item.itemType && item.itemType.toLowerCase().includes("trắc nghiệm");
        var qObj = isMcqItem ? mcqMap[item.order] : (essayMap[item.order] || essayMap[item.order - mcqs.length]);
        if (qObj) {
          item.score = qObj.score;
          if (qObj.metadata) {
            if (qObj.metadata.difficulty) item.difficulty = qObj.metadata.difficulty;
            if (qObj.metadata.cognitiveProcess) item.cognitiveProcess = qObj.metadata.cognitiveProcess;
          }
        }
      });
    }

    // 7. Tự động tính toán và đồng bộ 100% Ma trận 3 tầng dòng (threeTierMatrix) chuẩn Thông tư 27
    exam.threeTierMatrix = AIService.buildThreeTierMatrix(exam);
    if (!exam.matrix) exam.matrix = {};
    exam.matrix.threeTier = exam.threeTierMatrix;

    // Đồng bộ lại exam.matrix.topics từ threeTierMatrix.strands để đảm bảo cả 2 cấu trúc hoàn toàn nhất quán
    if (exam.threeTierMatrix && Array.isArray(exam.threeTierMatrix.strands) && exam.threeTierMatrix.strands.length > 0) {
      exam.matrix.topics = exam.threeTierMatrix.strands.map(function(st) {
        return {
          topic: st.name,
          desc: st.desc || "",
          m1_mcq: st.m1_mcq.qNums.length ? ('Câu ' + st.m1_mcq.qNums.join(', ')) : '',
          m1_essay: st.m1_essay.qNums.length ? ('Câu ' + st.m1_essay.qNums.join(', ') + ' (TL)') : '',
          m2_mcq: st.m2_mcq.qNums.length ? ('Câu ' + st.m2_mcq.qNums.join(', ')) : '',
          m2_essay: st.m2_essay.qNums.length ? ('Câu ' + st.m2_essay.qNums.join(', ') + ' (TL)') : '',
          m3_mcq: st.m3_mcq.qNums.length ? ('Câu ' + st.m3_mcq.qNums.join(', ')) : '',
          m3_essay: st.m3_essay.qNums.length ? ('Câu ' + st.m3_essay.qNums.join(', ') + ' (TL)') : '',
          total_mcq: st.total_mcq.count,
          total_essay: st.total_essay.count,
          score: (st.total_score || 0).toString().replace('.', ',')
        };
      });
    }

    return exam;
  }
};

if (typeof window !== 'undefined') {
  window.AIMatrixService = AIMatrixService;
  if (window.AIService) {
    Object.assign(window.AIService, AIMatrixService);
  }
}
if (typeof global !== 'undefined') {
  global.AIMatrixService = AIMatrixService;
  if (global.AIService) {
    Object.assign(global.AIService, AIMatrixService);
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIMatrixService;
}
