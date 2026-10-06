/**
 * AI EXAM & QUIZ GENERATOR MODULE (CHƯƠNG TRÌNH GDPT 2018 & THÔNG TƯ 27/2020/TT-BGDĐT)
 * Bộ sách chuẩn: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT)
 * Kiến trúc: Facade & Modular Architecture (Tái cấu trúc nâng cao tính bảo trì)
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var AIService = {
  // LƯU Ý: Toàn bộ ngân hàng câu hỏi tĩnh/đề mẫu dự phòng đã được gỡ bỏ hoàn toàn theo yêu cầu.
  // Hệ thống bắt buộc 100% đề kiểm tra phải do Google Gemini AI trực tiếp biên soạn trực tuyến.

  /**
   * Gọi hàm sinh đề AI trực tuyến qua Google Gemini API
   * (Đã bỏ hoàn toàn chế độ ngoại tuyến Fallback theo yêu cầu: Bắt buộc kết nối trực tuyến)
   */
  generateExam: async function(params) {
    var self = this;
    var apiKey = params.apiKey || localStorage.getItem("tvth_gemini_api_key") || (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || "";
    
    if (!apiKey || apiKey.trim().length < 15) {
      throw new Error("Chưa cấu hình Google Gemini API Key hoặc Key không hợp lệ. Vui lòng bấm nút 'Cấu hình Gemini API Key' ở góc trên để nhập Key trước khi tạo đề!");
    }

    try {
      var aiResult = await self.callGeminiAPI(apiKey.trim(), params);
      if (aiResult) {
        aiResult = self.sanitizeAndBalanceExam(aiResult, params);
        if (params.subjectId === 'TIENG_VIET' && (aiResult.readingExam || aiResult.isTiengViet)) {
          return aiResult;
        }
        if (aiResult.multipleChoice && aiResult.multipleChoice.length > 0) {
          return aiResult;
        }
        return aiResult;
      }
      throw new Error("Mô hình AI không phản hồi nội dung đề kiểm tra hợp lệ. Vui lòng thử lại!");
    } catch (err) {
      console.error("Lỗi khi kết nối Google Gemini API:", err);
      var msg = err.message || String(err);
      if (msg.includes("API key not valid") || msg.includes("API_KEY_INVALID")) {
        throw new Error("Gemini API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra và cập nhật lại API Key mới trong phần Cài đặt!");
      }
      if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("Quota exceeded") || msg.includes("429")) {
        throw new Error("Đã vượt quá giới hạn lượt gọi (Quota) của Google Gemini API trong phút này. Vui lòng đợi khoảng 30 giây rồi thử lại!");
      }
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("The user aborted a request")) {
        throw new Error("Lỗi kết nối mạng: Không thể kết nối tới máy chủ Google Gemini. Vui lòng kiểm tra đường truyền Internet của bạn!");
      }
      throw new Error("Không thể tạo đề qua Google Gemini API: " + msg);
    }
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
    var termInfo = this.resolveExamTermInfo(scope);
    var duration = params.duration || (grade <= 2 ? "Đọc: 35 phút | Viết: 35 phút" : "Đọc: 40 phút | Viết: 40 phút");
    var schoolName = params.schoolName || "TRƯỜNG TIỂU HỌC .................................";
    var customPrompt = params.customPrompt || "";
    var isVinhLong = !!(params.isVinhLongLocal || params.isVinhLong);

    // Xác định bộ sách: Cả nước áp dụng thống nhất bộ sách Kết nối tri thức với cuộc sống (KNTT) từ năm học 2026 - 2027
    var bookSeries = 'kntt';
    var seriesName = 'Kết nối tri thức với cuộc sống (KNTT)';

    // Tra cứu dữ liệu SGK số hóa theo bộ sách KNTT
    var sgkKey = (subjectId || '').toLowerCase().replace('lich_su_dia_ly', 'lich_su_dia_li');
    var sgkRegObj = (typeof window !== 'undefined' && window.SGK_REGISTRY) ? window.SGK_REGISTRY : (typeof SGKRegistry !== 'undefined' ? SGKRegistry : null);
    if (sgkRegObj && typeof sgkRegObj.ensureBookLoaded === 'function') {
      await sgkRegObj.ensureBookLoaded(grade, sgkKey, bookSeries);
      if (subjectId === "TIENG_VIET") {
        await sgkRegObj.ensureBookLoaded(grade, 'tieng_viet', 'ctst');
      }
    }

    var sgkContext = "";
    if (typeof window !== 'undefined' && window.SGK_DATA && typeof window.SGK_DATA.getScopeContent === 'function') {
      var scopeInfo = window.SGK_DATA.getScopeContent(grade, sgkKey, scope, bookSeries);
      if (scopeInfo && scopeInfo.found && scopeInfo.knowledgeDigest) {
        var digest = scopeInfo.knowledgeDigest;
        // KHÔNG CẮT XÉN DỮ LIỆU: Truyền trọn vẹn 100% nội dung chương trình SGK số hóa để AI ra đề chính xác, không suy luận bừa
        if (subjectId === "TIENG_VIET") {
          sgkContext = `\n- NỘI DUNG SÁCH GIÁO KHOA KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT) TRONG PHẠM VI KIỂM TRA (DÙNG CHO LUYỆN TỪ VÀ CÂU, CHÍNH TẢ & VIẾT):\n${digest}\n- NGUYÊN TẮC BẮT BUỘC 100%:\n  + Toàn bộ kiến thức Luyện từ và câu, Chính tả và Viết đoạn/Bài văn BẮT BUỘC PHẢI BÁM SÁT 100% các bài học và tuần nằm trong khoảng thời gian kiểm tra ở trên. TUYỆT ĐỐI KHÔNG SUY LUẬN BỪA ngoài các tuần đã quy định.\n  + ĐỐI VỚI PHẦN ĐỌC: Tuân thủ quy định kiểm tra định kỳ lấy ngữ liệu ngoài SGK KNTT, BẮT BUỘC lấy ngữ liệu từ bộ sách Chân trời sáng tạo (CTST) được cung cấp ở mục dưới!`;
        } else {
          sgkContext = `\n- MẠCH KIẾN THỨC VÀ NỘI DUNG CHƯƠNG TRÌNH SGK SỐ HÓA [KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT)] NẰM TRONG KHOẢNG THỜI GIAN KIỂM TRA:\n${digest}\n- NGUYÊN TẮC BẢO ĐẢM NỘI DUNG CHUẨN XÁC 100% (CHỐNG SUY LUẬN BỪA):\n  + Toàn bộ ma trận, các câu hỏi trắc nghiệm và bài tập tự luận BẮT BUỘC PHẢI BÁM SÁT 100% mạch kiến thức và các bài học trong khoảng thời gian kiểm tra được cung cấp ở trên.\n  + TUYỆT ĐỐI KHÔNG tự suy luận bừa, KHÔNG lấy kiến thức của các tuần nằm ngoài phạm vi kiểm tra đã quy định (ví dụ: đề Giữa học kỳ 1 Tuần 1-9 tuyệt đối không lấy kiến thức Tuần 10 trở đi; đề Cuối học kỳ 1 Tuần 10-18 tuyệt đối không lấy kiến thức Học kỳ 2; v.v.).`;
        }
      }
    }

    // Tra cứu danh mục bài đọc số hóa 100% chuẩn SGK Chân trời sáng tạo (CTST) cho môn Tiếng Việt
    var ctstReadingContext = "";
    if (subjectId === "TIENG_VIET") {
      var sgkReg = (typeof window !== 'undefined' && window.SGK_DATA && typeof window.SGK_DATA.getScopeContent === 'function') ? window.SGK_DATA : (typeof window !== 'undefined' && window.SGK_REGISTRY && typeof window.SGK_REGISTRY.getScopeContent === 'function') ? window.SGK_REGISTRY : null;
      if (sgkReg) {
        var ctstScope = sgkReg.getScopeContent(grade, 'tieng_viet', scope, 'ctst');
        if (ctstScope && ctstScope.found && ctstScope.lessons && ctstScope.lessons.length > 0) {
          var seenTitles = {};
          var listItems = [];
          ctstScope.lessons.forEach(function(les) {
            var r = les.reading;
            var rTitle = (r && r.title) ? r.title.trim() : "";
            if (rTitle && !seenTitles[rTitle.toLowerCase()]) {
              seenTitles[rTitle.toLowerCase()] = true;
              var pg = (r && r.pages) ? r.pages : (les.pages || "");
              var wk = les.week ? `Tuần ${les.week}` : "";
              var topic = les.topic ? `Chủ điểm: ${les.topic}` : "";
              var details = [];
              if (pg) details.push(`Trang ${pg}`);
              if (wk) details.push(wk);
              if (topic) details.push(topic);
              var sampleQ = "";
              if (les.sampleQuestions && les.sampleQuestions.length > 0) {
                var docQ = les.sampleQuestions.find(function(sq){ return sq.section === 'doc_hieu' || sq.cognitive === 'locate'; });
                if (docQ) {
                  sampleQ = ` | Câu hỏi mẫu SGK: "${docQ.question}"`;
                }
              }
              listItems.push(`     * "${rTitle}" (${details.join(', ')})${sampleQ}`);
            }
          });
          if (listItems.length > 0) {
            ctstReadingContext = `\n  5. DANH MỤC BÀI ĐỌC CHUẨN 100% TRONG SGK TIẾNG VIỆT LỚP ${grade} - BỘ CHÂN TRỜI SÁNG TẠO (CTST) ĐÃ SỐ HÓA:\n${listItems.join('\n')}\n     -> NGUYÊN TẮC BẮT BUỘC 100%:\n        - BẮT BUỘC CHỌN CẢ 5 BÀI ĐỌC THÀNH TIẾNG VÀ 1 BÀI ĐỌC HIỂU TỪ DANH MỤC SGK CHÂN TRỜI SÁNG TẠO Ở TRÊN!\n        - TUYỆT ĐỐI CẤM SỬ DỤNG TỰA BÀI ĐỌC CỦA SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (như "Cánh đồng hoa", "Tuổi Ngựa", "Bến sông tuổi thơ", "Tiếng hạt nảy mầm", "Trước cổng trời", "Kỳ diệu rừng xanh",...).\n        - Ghi rõ đúng tên bài đọc, tác giả và số trang SGK Chân trời sáng tạo tương ứng.`;
          }
        }
      }
    }

    var readingGenreContext = "";

    var prompt = "";

    // =========================================================================
    // PROMPT CHUYÊN BIỆT CHO MÔN TIẾNG VIỆT (CHUẨN TT27: 2 PHIẾU ĐỌC & VIẾT)
    // BỘ SÁCH CHÍNH KHÓA: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT) - ÁP DỤNG THỐNG NHẤT TOÀN QUỐC
    // NGỮ LIỆU PHẦN ĐỌC: LẤY NGỮ LIỆU NGOÀI SGK KNTT (LẤY TƯƠNG TỰ TỪ BỘ CHÂN TRỜI SÁNG TẠO)
    // =========================================================================
    if (subjectId === "TIENG_VIET") {
      var oralScore = parseFloat(params.tvOralScore) || 4.0;
      var oralMode = "sgk";
      var compScore = Math.round((10.0 - oralScore) * 10) / 10;
      var dictScore = (grade <= 3) ? (parseFloat(params.tvDictationScore) || 4.0) : 0;
      var tlvScore = (grade <= 3) ? Math.round((10.0 - dictScore) * 10) / 10 : 10.0;
      var essayGenre = params.tvEssayGenre || (grade >= 4 ? "Văn miêu tả cây cối / cảnh vật / người" : "Viết đoạn văn theo chủ điểm");

      prompt = `
Bạn là Chuyên gia Đánh giá Giáo dục Tiểu học hàng đầu Việt Nam, am hiểu sâu sắc Chương trình GDPT 2018, Thông tư 27/2020/TT-BGDĐT, Khung đánh giá năng lực của Chương trình SEA-PLM (Bộ GD&ĐT) và Bộ SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT) - bộ sách giáo khoa chuẩn áp dụng thống nhất trên toàn quốc từ năm học 2026 - 2027.
Hãy soạn trọn bộ ĐỀ KIỂM TRA MÔN TIẾNG VIỆT LỚP ${grade} gồm 2 PHIẾU RIÊNG BIỆT (ĐỀ ĐỌC 10đ & ĐỀ VIẾT 10đ), MA TRẬN 3 MỨC ĐỘ VÀ HƯỚNG DẪN MÃ HÓA (CODING GUIDE) THEO CHUẨN SEA-PLM với các thông số sau:

- MÔN HỌC: Tiếng Việt - Lớp ${grade}
- BỘ SÁCH CHÍNH KHÓA THỐNG NHẤT TOÀN QUỐC: Kết nối tri thức với cuộc sống (KNTT)
- KỲ KIỂM TRA: ${termInfo.term} (${termInfo.headerTitle})
- PHẠM VI RA ĐỀ: ${scope}

- QUY TẮC CỐT LÕI VỀ BỘ SÁCH VÀ NGỮ LIỆU ĐỌC (BẮT BUỘC TUÂN THỦ 100%):
  1. CĂN CỨ CHƯƠNG TRÌNH & CHUẨN KIẾN THỨC KĨ NĂNG:
     * Toàn bộ khung ma trận, phân phối chương trình, chủ điểm học tập, kiến thức Luyện từ và câu và thể loại Tập làm văn BẮT BUỘC BÁM SÁT THEO BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT) Lớp ${grade}.
  2. NGUYÊN TẮC BẮT BUỘC VỀ NGỮ LIỆU PHẦN ĐỌC (LẤY NGỮ LIỆU NGOÀI SÁCH KNTT - LẤY TƯƠNG TỰ TỪ BỘ CHÂN TRỜI SÁNG TẠO):
     * Theo đúng quy định chỉ đạo chuyên môn của Bộ GD&ĐT: Đề kiểm tra định kỳ phần ĐỌC BẮT BUỘC PHẢI LẤY NGỮ LIỆU BÊN NGOÀI SÁCH GIÁO KHOA CHÍNH KHÓA (NGOÀI SGK KNTT MÀ HỌC SINH ĐANG HỌC) nhằm đánh giá đúng năng lực đọc hiểu thực chất của học sinh, tuyệt đối tránh tình trạng dạy tủ, học vẹt, học sinh chỉ học thuộc lòng bài đọc trong sách giáo khoa chính khóa.
     * Để ngữ liệu ngoài sách bảo đảm 100% chất lượng văn học, tính sư phạm mẫu mực, đúng tâm sinh lý lứa tuổi tiểu học, tương đương về chủ điểm, độ khó và dung lượng từ ngữ theo từng tuần/học kỳ của chương trình, HỆ THỐNG YÊU CẦU LẤY NGỮ LIỆU TƯƠNG TỰ TỪ BỘ SÁCH CHÂN TRỜI SÁNG TẠO (CTST) (vì đối với học sinh học bộ sách KNTT, các bài đọc trong sách CTST chính là ngữ liệu ngoài SGK chuẩn mực nhất!).
  3. Phần Đọc thành tiếng (${oralScore.toFixed(1).replace('.', ',')} điểm):
     * BẮT BUỘC cung cấp ĐÚNG 5 BÀI ĐỌC THÀNH TIẾNG (tương ứng 5 Phiếu đọc bốc thăm từ Phiếu 1 đến Phiếu 5 để in trên 5 trang A4 riêng biệt) lấy từ các bài đọc tương đương trong SGK Tiếng Việt Chân trời sáng tạo (CTST) Lớp ${grade} thuộc phạm vi học kỳ.
     * YÊU CẦU ĐẶC BIỆT ĐỂ IN ĐỀ CHO HỌC SINH (5 BÀI TRÊN 5 TRANG A4):
       - TUYỆT ĐỐI KHÔNG TRÍCH ĐOẠN NGẮN 30-50 từ. BẮT BUỘC cung cấp TOÀN VĂN CẢ BÀI ĐỌC HOÀN CHỈNH (văn xuôi từ 180 đến 300 từ; thơ trích trọn vẹn toàn bộ các khổ thơ) trong trường "passage" để học sinh lớp ${grade} đọc đủ dung lượng.
       - BẮT BUỘC cung cấp TOÀN BỘ HỆ THỐNG CÂU HỎI ĐỌC HIỂU CỦA BÀI ĐÓ TRONG SGK CTST (từ 3 đến 5 câu hỏi) vào mảng "questions" (và chuỗi "question") để in đầy đủ vào phiếu đọc của học sinh.
       - BẮT BUỘC cung cấp GỢI Ý CÂU TRẢ LỜI TƯƠNG ỨNG vào mảng "answers" (và chuỗi "answer") trong Hướng dẫn chấm.
       - Ghi rõ: "title" (Tên bài đọc), "bookVolume", "page", "author".
  4. Phần Đọc hiểu & Luyện từ và câu (${compScore.toFixed(1).replace('.', ',')} điểm):
     * Cung cấp 1 bài đọc hoàn chỉnh trích từ SGK Tiếng Việt Lớp ${grade} - Chân trời sáng tạo (CTST) (khoảng ${grade === 1 ? '40-60' : grade === 2 ? '80-110' : grade === 3 ? '150-180' : grade === 4 ? '200-250' : '250-300'} từ) có chủ điểm tương đồng với bài học KNTT. TUYỆT ĐỐI KHÔNG lấy bài đọc đã có trong SGK KNTT.
     * Ghi rõ: Tên bài đọc, Tác giả.
     * Hệ thống 8 câu hỏi (6 trắc nghiệm + 2 tự luận):
       - Mạch Đọc hiểu văn bản: Đọc hiểu và phân tích văn bản đọc mới trích từ CTST.
       - Mạch Luyện từ và câu: Bám sát chuẩn kiến thức Tiếng Việt của chương trình SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT) Lớp ${grade}.
       - Thang điểm: BẮT BUỘC chẵn bội số của 0,25.
${ctstReadingContext}

- ĐỀ VIẾT (10,0 điểm):
  + Bám sát chủ điểm, thể loại và phân phối chương trình của SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (KNTT) Lớp ${grade}.
${grade <= 3 ? `  + Phần Chính tả Nghe - viết (${dictScore.toFixed(1).replace('.', ',')} điểm): Đoạn văn/thơ đúng chuẩn dung lượng (${grade === 1 ? '30-35 chữ' : grade === 2 ? '45-50 chữ' : '65-70 chữ'}) bám sát SGK KNTT Lớp ${grade}.
  + Phần Tập làm văn - Viết đoạn văn (${tlvScore.toFixed(1).replace('.', ',')} điểm): Đề bài yêu cầu viết đoạn văn (${grade <= 2 ? '3 đến 5 câu' : '5 đến 7 câu'}) theo đúng chủ điểm bài học SGK KNTT kèm gợi ý dàn ý.` : `  + Phần Tập làm văn (10,0 điểm duy nhất): Viết một bài văn hoàn chỉnh đúng thể loại (${essayGenre}) bám sát chương trình SGK KNTT kèm gợi ý dàn ý (Mở bài, Thân bài, Kết bài). Bắt buộc có Barem chấm chi tiết 10 điểm trong Hướng dẫn chấm.`}
${sgkContext}
${customPrompt ? "- YÊU CẦU BỔ SUNG: " + customPrompt : ""}

### QUY ĐỊNH PHÁP LÝ HÀNH CHÍNH QUỐC GIA (ÁP DỤNG TRÊN TOÀN QUỐC TỪ 01/7/2025 - BẮT BUỘC):
- Từ ngày 01/7/2025, TOÀN BỘ CÁC TỈNH/THÀNH PHỐ TRÊN CẢ NƯỚC CHÍNH THỨC BÃI BỎ CẤP HUYỆN (không còn quận, huyện, thị xã, thành phố thuộc tỉnh). Hệ thống chính quyền địa phương vận hành tinh gọn theo mô hình 2 cấp: Cấp Tỉnh / TP trực thuộc Trung ương -> Cấp Xã / Phường / Thị trấn.
- Trong toàn bộ câu hỏi, bài văn, bài đọc thầm, ví dụ thực tế liên hệ địa phương:
  + TUYỆT ĐỐI CẤM dùng các từ: "huyện", "quận", "thị xã", "cấp huyện" (Ví dụ: CẤM viết "huyện...", "quận...", "thị xã...").
  + BẮT BUỘC chỉ dùng cấp xã/phường/thị trấn hoặc gọi theo tên địa danh, vùng đất tự nhiên (Ví dụ: "tại xã Tam Bình, tỉnh Vĩnh Long", "tại phường Bến Nghé, TP. Hồ Chí Minh", "vùng đất Tam Bình", "xứ dừa", "miệt vườn sông nước"...).
  + TUYỆT ĐỐI CẤM thêm chữ "mới" sau tên tỉnh/thành phố (ví dụ cấm viết "tỉnh Vĩnh Long mới", "Hà Nội mới"...).

### CÁC NGUYÊN TẮC BIÊN SOẠN BẮT BUỘC THEO CHUẨN SEA-PLM (BỘ GIÁO DỤC VÀ ĐÀO TẠO):
1. ĐẶT TRONG BỐI CẢNH CHÂN THỰC (AUTHENTIC CONTEXTS):
   - Mỗi câu hỏi BẮT BUỘC gắn liền với 1 bối cảnh có ý nghĩa: "Cá nhân (Personal)", "Môi trường xung quanh (Local community)", "Môi trường rộng hơn (Wider world)" hoặc "Bối cảnh môn học (Academic)".
   - Ngôn ngữ phần dẫn và câu hỏi phải đơn giản, ngắn gọn, trong sáng, sư phạm.
2. TRỌNG TÂM ĐO LƯỜNG ĐƠN NHẤT: Mỗi câu hỏi chỉ tập trung đo lường chính xác 1 kỹ năng hoặc 1 khái niệm cốt lõi.
3. KỸ THUẬT CÂU HỎI TRẮC NGHIỆM (MCQ):
   - Đúng 4 phương án A, B, C, D và chỉ có 1 đáp án đúng duy nhất.
   - Các phương án nhiễu BẮT BUỘC dựa trên các lỗi nhầm lẫn / lỗi tư duy phổ biến thực tế của học sinh tiểu học (misconceptions); không đưa ra đáp án vô lý hoặc quá dễ bị loại trừ.
   - BẮT BUỘC có trường "distractorRationale" giải thích rõ lý do phương án đúng và phân tích nguyên nhân học sinh chọn nhầm các phương án nhiễu A, B, C, D.
4. KỸ THUẬT CÂU HỎI TỰ LUẬN (CONSTRUCTED RESPONSE): Lệnh hỏi rõ ràng, tường minh.
5. HƯỚNG DẪN MÃ HÓA (CODING GUIDE) THEO CHUẨN SEA-PLM:
   - "Mã 2": Mức tối đa (câu 2 điểm) - Đầy đủ, chính xác, lập luận chặt chẽ.
   - "Mã 1": Mức tối đa (câu 1 điểm) HOẶC Mức chưa tối đa (câu 2 điểm) - Đúng một phần.
   - "Mã 0": Mức không đạt - Sai hoặc không đúng yêu cầu.
   - "Mã 9": Bỏ trống không làm bài.
   - Cung cấp câu trả lời mẫu thực tế của học sinh ("sampleResponse") cho từng mã.
6. SIÊU DỮ LIỆU CÂU HỎI (ITEM METADATA): Mỗi câu hỏi có object "metadata": { itemCode, context, contentDomain, cognitiveProcess, difficulty ("Dễ" | "Tương đối dễ" | "Tương đối khó" | "Khó"), itemType }.
7. NGUYÊN TẮC BẮT BUỘC VỀ MA TRẬN (KHÔNG THỐNG KÊ NỘI DUNG CHƯA HỌC):
   - CHỈ THỐNG KÊ CÁC MẠCH KIẾN THỨC / CHỦ ĐỀ CÓ CÂU HỎI TRONG ĐỀ KIỂM TRA NÀY VÀO BẢNG MA TRẬN.
   - TUYỆT ĐỐI KHÔNG THỐNG KÊ CÁC CHỦ ĐỀ CHƯA HỌC HOẶC KHÔNG CÓ CÂU HỎI TRONG ĐỀ VÀO MA TRẬN (không tạo dòng trống 0 câu 0 điểm).

HÃY TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON HỢP LỆ (Không có markdown block hoặc text bên ngoài JSON) có cấu trúc chuẩn như sau:
{
  "isTiengViet": true,
  "schoolName": "${schoolName}",
  "examTitle": "${termInfo.headerTitle} MÔN TIẾNG VIỆT LỚP ${grade}",
  "examTerm": "${termInfo.term}",
  "subjectName": "Tiếng Việt",
  "grade": ${grade},
  "duration": "${duration}",
  "schoolYear": "2026 - 2027",
  "bookSeries": "Kết nối tri thức với cuộc sống (KNTT)",
  "scopeDesc": "${scope}",
  "readingExam": {
    "totalScore": 10.0,
    "oralScore": ${oralScore},
    "oralMode": "sgk",
    "oralGuideIntro": "Học sinh bốc thăm 1 trong 5 phiếu sau, đọc thành tiếng bài văn/thơ (thời gian khoảng 1 - 1,5 phút) và trả lời câu hỏi đọc hiểu của giáo viên:",
    "oralItems": [
      {
        "sheetNum": 1,
        "title": "Tên bài đọc 1 trong SGK CTST Lớp ${grade}",
        "bookVolume": "Tập 1",
        "page": "Trang ...",
        "author": "Tên tác giả",
        "passage": "TOÀN VĂN CẢ BÀI ĐỌC HOÀN CHỈNH (HOẶC TRÍCH ĐOẠN LỚN 180-300 TỪ) TRONG SGK TIẾNG VIỆT CHÂN TRỜI SÁNG TẠO ĐỂ IN RA 1 TRANG A4 CHO HỌC SINH ĐỌC...",
        "questions": [
          "Câu hỏi 1 trong SGK tìm hiểu bài đọc...",
          "Câu hỏi 2 trong SGK tìm hiểu bài đọc...",
          "Câu hỏi 3 trong SGK tìm hiểu bài đọc...",
          "Câu hỏi 4 trong SGK tìm hiểu bài đọc..."
        ],
        "question": "1. Câu hỏi 1...\n2. Câu hỏi 2...\n3. Câu hỏi 3...\n4. Câu hỏi 4...",
        "answers": [
          "Gợi ý câu trả lời 1...",
          "Gợi ý câu trả lời 2...",
          "Gợi ý câu trả lời 3...",
          "Gợi ý câu trả lời 4..."
        ],
        "answer": "1. Trả lời 1...\n2. Trả lời 2...\n3. Trả lời 3...\n4. Trả lời 4..."
      }
    ],
    "comprehensionScore": ${compScore},
    "comprehensionReading": {
      "title": "Tên bài đọc trong SGK CTST Lớp ${grade}",
      "author": "Tên tác giả",
      "passage": "Nội dung toàn văn bài đọc trích từ SGK Tiếng Việt Chân trời sáng tạo..."
    },
    "questions": [
      {
        "num": 1,
        "itemCode": "TV${grade}_RD_01",
        "type": "mcq",
        "category": "reading",
        "level": "Mức 1",
        "score": 0.5,
        "metadata": {
          "context": "Môi trường xung quanh (Local community)",
          "contentDomain": "Văn bản đọc hiểu",
          "cognitiveProcess": "Xác định thông tin (Locate & Retrieve)",
          "difficulty": "Dễ",
          "itemType": "Trắc nghiệm 4 lựa chọn (MCQ)"
        },
        "text": "Nội dung câu hỏi trắc nghiệm đọc hiểu...",
        "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
        "ans": "A",
        "explain": "Giải thích chi tiết vì sao chọn A...",
        "distractorRationale": {
          "correctReason": "Phương án A đúng vì trong văn bản...",
          "distractorB": "Học sinh chọn B do đọc sót từ khóa...",
          "distractorC": "Học sinh chọn C do nhầm lẫn giữa...",
          "distractorD": "Học sinh chọn D do suy đoán cảm tính..."
        },
        "codingGuide": {
          "maxCode": "Mã 1",
          "codes": [
            { "code": "Mã 1", "description": "Chọn đúng phương án A.", "sampleResponse": "Khoanh chọn A" },
            { "code": "Mã 0", "description": "Chọn các phương án B, C, D hoặc chọn từ 2 phương án trở lên.", "sampleResponse": "Khoanh B hoặc C" },
            { "code": "Mã 9", "description": "Bỏ trống không làm bài.", "sampleResponse": "[Để trống]" }
          ]
        }
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
      ],
      "codingGuide": {
        "maxCode": "Mã 2",
        "codes": [
          { "code": "Mã 2", "description": "Viết đoạn văn hoàn chỉnh, cảm xúc chân thực, câu văn mạch lạc, đúng chính tả.", "sampleResponse": "..." },
          { "code": "Mã 1", "description": "Viết được đoạn văn nhưng còn mắc lỗi chính tả hoặc diễn đạt chưa trọn ý.", "sampleResponse": "..." },
          { "code": "Mã 0", "description": "Viết lạc đề hoặc không viết được đoạn văn.", "sampleResponse": "..." },
          { "code": "Mã 9", "description": "Bỏ trống không làm bài.", "sampleResponse": "[Để trống]" }
        ]
      }
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
      ],
      "codingGuide": {
        "maxCode": "Mã 2",
        "codes": [
          { "code": "Mã 2", "description": "Mức tối đa: Bài văn đủ 3 phần Mở - Thân - Kết, miêu tả sinh động, giàu cảm xúc, đúng ngữ pháp.", "sampleResponse": "..." },
          { "code": "Mã 1", "description": "Mức chưa tối đa: Bài văn đủ bố cục nhưng miêu tả sơ sài hoặc mắc một số lỗi chính tả, diễn đạt.", "sampleResponse": "..." },
          { "code": "Mã 0", "description": "Mức không đạt: Lạc đề hoàn toàn hoặc chỉ viết được vài câu rời rạc.", "sampleResponse": "..." },
          { "code": "Mã 9", "description": "Bỏ trống không làm bài.", "sampleResponse": "[Để trống]" }
        ]
      }
    }
  },
  "seaplmMetadataTable": [
    {
      "itemCode": "TV${grade}_RD_01",
      "order": 1,
      "context": "Môi trường xung quanh (Local community)",
      "contentDomain": "Đọc hiểu văn bản",
      "cognitiveProcess": "Xác định thông tin (Locate)",
      "difficulty": "Dễ",
      "itemType": "Trắc nghiệm (MCQ)",
      "score": 0.5,
      "maxCode": "Mã 1"
    }
  ],
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
      // PROMPT CHO CÁC MÔN TOÁN, KHOA HỌC, XÃ HỘI... CHUẨN SEA-PLM & THÔNG TƯ 27
      var mcqCount = parseInt(params.mcqCount) || 8;
      var essayCount = parseInt(params.essayCount) || 2;
      var essayGuide = params.essayGuide || "";
      var mcqPct = parseInt(params.mcqPercent) || 70;
      var essayPct = parseInt(params.essayPercent) || 30;
      var m1Pct = parseInt(params.level1Percent) || 40;
      var m2Pct = parseInt(params.level2Percent) || 40;
      var m3Pct = parseInt(params.level3Percent) || 20;

      // Phân bổ câu hỏi theo 3 mạch kiến thức chuẩn GDPT 2018 cho môn Toán
      var mathMcqNum = 0, mathMcqGeom = 0, mathMcqStat = 0;
      var mathEssayNum = 0, mathEssayGeom = 0;
      if (subjectId === "TOAN") {
        mathMcqNum = Math.max(1, Math.round(mcqCount * 0.45));
        mathMcqGeom = Math.max(1, Math.round(mcqCount * 0.40));
        mathMcqStat = Math.max(1, mcqCount - mathMcqNum - mathMcqGeom);
        while (mathMcqNum + mathMcqGeom + mathMcqStat > mcqCount && mathMcqNum > 1) mathMcqNum--;
        while (mathMcqNum + mathMcqGeom + mathMcqStat < mcqCount) mathMcqNum++;

        mathEssayNum = essayCount > 1 ? Math.max(1, Math.floor(essayCount * 0.5)) : 1;
        mathEssayGeom = essayCount > 1 ? (essayCount - mathEssayNum) : 0;
      }

      // =========================================================================
      // ĐỊNH VỊ ĐỊA PHƯƠNG TOÀN DIỆN CHO TẤT CẢ CÁC MÔN (NQ 202/2025/QH15 & VĨNH LONG)
      // =========================================================================
      var subjectLocalContext = "";
      if (isVinhLong) {
        if (subjectId === "TOAN") {
          subjectLocalContext = `\n- YÊU CẦU ĐẶC BIỆT VỀ ĐỊNH VỊ ĐỊA PHƯƠNG VĨNH LONG (NQ 202/2025/QH15 & 124 XÃ/PHƯỜNG) MÔN TOÁN:
  + Căn cứ Nghị quyết 202/2025/QH15: Tỉnh Vĩnh Long vận hành mô hình chính quyền địa phương 2 cấp, HOÀN TOÀN KHÔNG CÒN CẤP HUYỆN, gồm 124 đơn vị hành chính cấp xã (19 phường đô thị và 105 xã nông thôn). Diện tích tự nhiên 6.296,20 km², dân số 4.257.581 người.
  + QUY TẮC DÙNG TỪ ĐỊA PHƯƠNG (BẮT BUỘC):
    * TUYỆT ĐỐI CẤM dùng từ "huyện" (như huyện Tam Bình, huyện Trà Ôn, huyện Mang Thít, huyện Chợ Lách...). BẮT BUỘC chỉ gọi theo tên địa danh tự nhiên, tên vùng hoặc tên xã/phường (ví dụ: "tại xã Tam Bình", "vùng đất Tam Bình", "xã An Bình", "xã Bình Tân", "phường...", "cù lao An Bình", "xứ dừa", "vùng Duyên Hải"...).
    * TUYỆT ĐỐI CẤM thêm chữ "mới" vào tên tỉnh trong đề bài (ví dụ cấm viết "tỉnh Vĩnh Long mới", "thuộc tỉnh Vĩnh Long mới"). Trong câu hỏi chỉ viết tự nhiên, gần gũi: "tại Vĩnh Long", "ở Vĩnh Long" hoặc chỉ nêu tên địa danh.
  + Ưu tiên lồng ghép các bài toán/tình huống thực tế gắn liền với địa danh, nông sản và đời sống người dân Vĩnh Long:
    * Bài toán tính diện tích/chu vi: Vườn cây ăn trái cù lao An Bình, cù lao Lục Sỹ Thành, làng hoa Chợ Lách, vườn dừa, rừng ngập mặn Duyên Hải...
    * Bài toán về số & phép tính / giải toán có lời văn: Thu hoạch và sản lượng nông sản đặc sản (bưởi Năm Roi Bình Minh, cam sành Tam Bình, khoai lang tím Bình Tân, sầu riêng Chợ Lách, dừa xiêm, lúa gạo...).
    * Bài toán chuyển động / đo lường: Thuyền bè, phà lưu thông trên sông Tiền, sông Hậu, qua cầu Mỹ Thuận, phà Đình Khao...
    * Bảng thống kê / xử lý số liệu: Số liệu diện tích, sản lượng cây ăn trái hoặc số liệu 124 xã/phường của tỉnh Vĩnh Long.`;
        } else if (subjectId === "LICH_SU_DIA_LY" || subjectId === "LS_DL") {
          subjectLocalContext = `\n- YÊU CẦU ĐẶC BIỆT VỀ ĐỊNH VỊ ĐỊA PHƯƠNG VĨNH LONG (NQ 202/2025/QH15 & 124 XÃ/PHƯỜNG) MÔN LỊCH SỬ VÀ ĐỊA LÍ:
  + Căn cứ Nghị quyết 202/2025/QH15: Tỉnh Vĩnh Long vận hành mô hình 2 cấp, HOÀN TOÀN KHÔNG CÒN CẤP HUYỆN, gồm 124 đơn vị hành chính cấp xã (19 phường đô thị và 105 xã nông thôn). Diện tích 6.296,20 km², dân số 4.257.581 người.
  + QUY TẮC DÙNG TỪ (BẮT BUỘC): TUYỆT ĐỐI CẤM dùng từ "huyện", tuyệt đối không viết "tỉnh Vĩnh Long mới". Gọi tên theo xã, phường hoặc tên vùng đất, tên cù lao, tên địa danh.
  + Lồng ghép tự nhiên các kiến thức và câu hỏi gắn liền với Vĩnh Long:
    * Địa lí: Vị trí địa lí nằm giữa hai nhánh sông Tiền và sông Hậu, đất phù sa bồi đắp màu mỡ; mạng lưới sông ngòi, kênh rạch chằng chịt; các cù lao trù phú (cù lao An Bình, cù lao Lục Sỹ Thành, cồn Quới Thiện...); cấu trúc hành chính 124 xã/phường.
    * Lịch sử & Văn hóa: Vùng đất Long Hồ dinh xưa - trung tâm khai hoang và văn hóa Nam Bộ; di tích lịch sử - văn hóa (Văn Thánh Miếu Vĩnh Long, chùa Tiên Châu, di tích Cây Da Cửa Hữu); di sản văn hóa truyền thống (làng gốm đỏ Mang Thít - "vương quốc gốm đỏ").
    * Nhân vật lịch sử & danh nhân văn hóa kiệt xuất quê hương Vĩnh Long: Cố Thủ tướng Võ Văn Kiệt, Cố Chủ tịch Hội đồng Bộ trưởng Phạm Hùng, Giáo sư - Viện sĩ Trần Đại Nghĩa (nhà khoa học quân sự kiệt xuất), nhà bác học Phan Thanh Giản.`;
        } else if (subjectId === "KHOA_HOC") {
          subjectLocalContext = `\n- YÊU CẦU ĐẶC BIỆT VỀ ĐỊNH VỊ ĐỊA PHƯƠNG VĨNH LONG (NQ 202/2025/QH15) MÔN KHOA HỌC:
  + Căn cứ NQ 202/2025/QH15: Tỉnh Vĩnh Long vận hành 2 cấp (124 xã/phường, không còn cấp huyện). Cấm dùng từ "huyện", cấm viết "tỉnh Vĩnh Long mới".
  + Lồng ghép các tình huống khoa học thực tế gắn liền với tự nhiên và đời sống Vĩnh Long:
    * Thổ nhưỡng và cây trồng: Đặc điểm và vai trò của đất phù sa ngọt ven sông Tiền - sông Hậu đối với vườn cây ăn trái (cam sành Tam Bình, bưởi Năm Roi Bình Minh, sầu riêng Chợ Lách, dừa xiêm...).
    * Nguồn nước và môi trường: Tầm quan trọng của nguồn nước ngọt sông Tiền, sông Hậu; hiện tượng nước mặn xâm nhập vào mùa khô và các biện pháp tích trữ, bảo vệ nguồn nước ngọt sinh hoạt; hành động bảo vệ dòng sông quê hương khỏi rác thải và ô nhiễm.
    * Năng lượng và đời sống: Ứng dụng năng lượng mặt trời, năng lượng gió phục vụ tưới tiêu và đời sống gia đình ở vùng nông thôn Nam Bộ.`;
        } else if (subjectId === "CONG_NGHE") {
          subjectLocalContext = `\n- YÊU CẦU ĐẶC BIỆT VỀ ĐỊNH VỊ ĐỊA PHƯƠNG VĨNH LONG (NQ 202/2025/QH15) MÔN CÔNG NGHỆ:
  + Căn cứ NQ 202/2025/QH15: Tỉnh Vĩnh Long gồm 124 xã/phường, không còn cấp huyện. Cấm dùng từ "huyện", cấm viết "tỉnh Vĩnh Long mới".
  + Lồng ghép các tình huống thực tế công nghệ tại Vĩnh Long:
    * Công nghệ trồng trọt: Mô hình tưới nước nhỏ giọt tiết kiệm, nhà màng, nhà lưới tại các vườn hoa kiểng Chợ Lách, vườn ươm giống cây ăn trái; quy trình chăm sóc hoa kiểng, cây cảnh.
    * Làng nghề công nghệ truyền thống: Nghề sản xuất gạch gốm nung truyền thống Mang Thít; nghề đan đát thủ công mỹ nghệ từ cây lục bình; nghề tráng bánh tráng cù lao Mây.
    * An toàn công nghệ: Sử dụng thiết bị điện gia dụng (máy bơm nước, tủ lạnh, quạt điện) an toàn, tiết kiệm trong gia đình miền sông nước.`;
        } else if (subjectId === "TIN_HOC") {
          subjectLocalContext = `\n- YÊU CẦU ĐẶC BIỆT VỀ ĐỊNH VỊ ĐỊA PHƯƠNG VĨNH LONG MÔN TIN HỌC:
  + Căn cứ NQ 202/2025/QH15: 124 xã/phường, không còn cấp huyện. Cấm dùng từ "huyện".
  + Lồng ghép tình huống: Tra cứu và tìm kiếm thông tin trên Internet về 124 xã/phường, các di tích lịch sử và danh nhân quê hương Vĩnh Long; xử lý bảng tính thống kê diện tích, sản lượng cây ăn quả; quy tắc an toàn và văn hóa trên không gian mạng.`;
        } else {
          subjectLocalContext = `\n- YÊU CẦU BỐI CẢNH ĐỊA PHƯƠNG VĨNH LONG (NQ 202/2025/QH15):
  + Tỉnh Vĩnh Long gồm 124 xã/phường, không còn cấp huyện. Cấm dùng từ "huyện", cấm viết "tỉnh Vĩnh Long mới".
  + Lồng ghép tình huống yêu quê hương, kính trọng tiền nhân (bác Võ Văn Kiệt, bác Phạm Hùng, bác Trần Đại Nghĩa), bảo vệ môi trường dòng sông và xóm làng xanh - sạch - đẹp.`;
        }
      }

      // =========================================================================
      // MIỀN NỘI DUNG VÀ QUÁ TRÌNH NHẬN THỨC CHUẨN SEA-PLM TỪNG MÔN HỌC
      // =========================================================================
      // LẤY CẤU HÌNH CỨNG MA TRẬN CHUẨN 100% SGK KNTT THEO MÔN, KHỐI LỚP VÀ GIAI ĐOẠN KIỂM TRA
      var masterStrands = this.getMasterExamMatrixConfig(grade, subjectId, scope);

      var strandListText = masterStrands.map(function(s, idx) {
        return `   ${idx + 1}. "${s.topic}" (${s.desc})`;
      }).join('\n');

      var subjectContentDomainsGuideline = "";
      if (subjectId === "TOAN") {
        subjectContentDomainsGuideline = `
1. PHÂN BỔ 3 MẠCH KIẾN THỨC MÔN TOÁN TIỂU HỌC CHUẨN GDPT 2018 & THÔNG TƯ 27 (BẮT BUỘC 100%):
   Đề thi gồm ${mcqCount} câu trắc nghiệm và ${essayCount} câu tự luận BẮT BUỘC PHÂN BỔ ĐẦY ĐỦ CẢ 3 MẠCH KIẾN THỨC CỐT LÕI:
   - Mạch 1: "Số và phép tính" (chiếm ~50% tổng điểm: gồm ${mathMcqNum} câu TNKQ [từ Câu 1 đến Câu ${mathMcqNum}] và ${mathEssayNum} câu Tự luận).
     Kiến thức: ${masterStrands[0] ? masterStrands[0].desc : "Số tự nhiên, phân số, số thập phân; tỉ số phần trăm; 4 phép tính; tính giá trị biểu thức và giải toán có lời văn."}
   - Mạch 2: "Hình học và Đo lường" (chiếm ~35% - 40% tổng điểm: gồm ${mathMcqGeom} câu TNKQ [từ Câu ${mathMcqNum + 1} đến Câu ${mathMcqNum + mathMcqGeom}] và ${mathEssayGeom} câu Tự luận).
     Kiến thức: ${masterStrands[1] ? masterStrands[1].desc : "Hình phẳng, hình khối; chu vi, diện tích, thể tích; đơn vị đo, toán chuyển động đều."}
   - Mạch 3: "Một số yếu tố Thống kê và Xác suất" (chiếm ~10% - 15% tổng điểm: gồm ${mathMcqStat} câu TNKQ [từ Câu ${mathMcqNum + mathMcqGeom + 1} đến Câu ${mcqCount}]).
     Kiến thức: ${masterStrands[2] ? masterStrands[2].desc : "Thu thập, phân loại số liệu; đọc và phân tích biểu đồ hình quạt tròn, bảng số liệu; khả năng xảy ra của một sự kiện."}
   => NGUYÊN TẮC BẮT BUỘC CHO ĐỀ KIỂM TRA ĐỊNH KỲ:
      * Đề thi BẮT BUỘC PHẢI CÓ ĐỦ CẢ 3 MẠCH KIẾN THỨC TRÊN. TUYỆT ĐỐI KHÔNG ĐƯỢC CHỈ RA 1 MẠCH "Số và phép tính"!
      * Toàn bộ ${mcqCount} câu trắc nghiệm và ${essayCount} câu tự luận PHẢI ĐƯỢC PHÂN BỔ ĐÚNG THEO SỐ LƯỢNG TỪNG MẠCH KIẾN THỨC Ở TRÊN.
      * Trong mảng "multipleChoice" và "essaySection", mỗi câu hỏi PHẢI ghi rõ trường "metadata.contentDomain" đúng tên 1 trong 3 mạch: "Số và phép tính", "Hình học và Đo lường", hoặc "Một số yếu tố Thống kê và Xác suất".
      * Trong "matrix.topics", BẮT BUỘC KHAI BÁO ĐỦ CẢ 3 DÒNG TƯƠNG ỨNG VỚI 3 MẠCH KIẾN THỨC NÀY.

2. QUY TẮC BẮT BUỘC ĐA DẠNG HÓA CÂU HỎI MỞ ĐẦU & MỨC 1 (CHỐNG RẬP KHUÔN 100%):
   - TUYỆT ĐỐI CẤM lặp lại cùng một khuôn mẫu quen thuộc như "Số thập phân gồm... được viết là:" cho Câu 1.
   - BẮT BUỘC luân phiên đổi các dạng toán Mức 1 phong phú khác nhau cho Câu 1 và các câu nhận biết:
     + Dạng A (Giá trị của chữ số theo hàng): Ví dụ "Chữ số 7 trong số thập phân 24,578 có giá trị là bao nhiêu?", "Giá trị của chữ số 5 trong số thập phân 12,35 là:..."
     + Dạng B (Chuyển phân số thập phân thành số thập phân): Ví dụ "Phân số thập phân 8/100 (hoặc 345/10) được viết dưới dạng số thập phân là:..."
     + Dạng C (Số thập phân bằng nhau): Ví dụ "Số thập phân nào dưới đây bằng với số 3,5?", "Bỏ các chữ số 0 ở tận cùng bên phải phần thập phân của số 12,400 ta được số nào?"
     + Dạng D (Phần nguyên và phần thập phân / Hàng của chữ số): Ví dụ "Trong số thập phân 85,24; chữ số 2 thuộc hàng nào?", "Phần thập phân của số 34,567 là:..."
     + Dạng E (Chuyển đổi hỗn số sang phân số hoặc số thập phân): Với các số liệu phong phú, sáng tạo (không lặp lại hỗn số 3 và 2/5).
     + Dạng F (Đọc - viết số thập phân): Nếu dùng dạng đọc - viết, phải đổi cách đặt câu tự nhiên và số liệu sáng tạo.
   - Mỗi câu hỏi trong đề phải có số liệu mới mẻ, tự nhiên, bài toán thực tế sinh động, tuyệt đối không sao chép đề bài cũ.`;
      } else {
        subjectContentDomainsGuideline = `
1. CẤU HÌNH CỨNG CÁC CHỦ ĐỀ & MẠCH KIẾN THỨC CHUẨN 100% SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (BẮT BUỘC TUÂN THỦ TUYỆT ĐỐI):
   Đề kiểm tra ${termInfo.headerTitle} Lớp ${grade} môn ${subjectName} BẮT BUỘC PHẢI BAO QUÁT ĐẦY ĐỦ VÀ PHÂN BỔ CÂU HỎI VÀO CÁC CHỦ ĐỀ CỐT LÕI SAU:
${strandListText}
   => NGUYÊN TẮC BẮT BUỘC 100% (CHỐNG SUY LUẬN BỪA & CHỐNG BỎ SÓT CHỦ ĐỀ):
      * Đề thi BẮT BUỘC PHẢI CÓ CÂU HỎI CHO TẤT CẢ CÁC CHỦ ĐỀ TRÊN. TUYỆT ĐỐI CẤM BỎ SÓT BẤT KỲ CHỦ ĐỀ NÀO!
      * TUYỆT ĐỐI CẤM tự ý gom gộp tùy tiện (như gom nhiều chủ đề thành 1 chủ đề) hoặc đặt tên chủ đề sai lệch so với danh sách chuẩn ở trên.
      * Trong mảng "multipleChoice" và "essaySection", mỗi câu hỏi BẮT BUỘC PHẢI ghi rõ trường "metadata.contentDomain" CHÍNH XÁC là tên của 1 trong các chủ đề trên (ví dụ: "${masterStrands[0] ? masterStrands[0].topic.replace(/^(chủ đề|\d+[\s:.]*)\s*/i, '').trim() : 'Kiến thức cốt lõi'}").
      * Bảng ma trận "matrix.topics" BẮT BUỘC KHAI BÁO ĐỦ ${masterStrands.length} DÒNG tương ứng với ${masterStrands.length} chủ đề trên.

2. QUÁ TRÌNH NHẬN THỨC SEA-PLM:
   - "Biết (Knowing)": Nhận biết khái niệm, kiến thức cơ bản theo SGK.
   - "Áp dụng (Applying)": Vận dụng kiến thức giải thích hiện tượng, tình huống thực tế đời sống.
   - "Vận dụng / Lập luận (Reasoning/Evaluating)": Phân tích, đánh giá, đề xuất giải pháp thực tiễn thiết thực.`;
      }

      var mathFormattingRule = "";
      if (subjectId === "TOAN" || subjectId === "TIN_HOC") {
        mathFormattingRule = `
4. QUY ĐỊNH ĐỊNH DẠNG KÝ HIỆU TOÁN TIỂU HỌC (BẮT BUỘC - TUYỆT ĐỐI KHÔNG DÙNG MÃ LỆNH LATEX):
   - Phân số: BẮT BUỘC viết dạng dấu gạch chéo "a/b" (ví dụ: 3/4, 2/5, 17/20, 1/2). TUYỆT ĐỐI KHÔNG dùng mã LaTeX \\frac{a}{b} hoặc \\dfrac{a}{b}.
   - Đơn vị đo diện tích & thể tích: BẮT BUỘC dùng ký tự số mũ Unicode: m², cm², dm², mm², km², m³, cm³. TUYỆT ĐỐI KHÔNG viết m^2, cm^2, m^3.
   - Dấu phép tính: Dùng ký tự dấu nhân '×' (hoặc x) và dấu chia ':'. TUYỆT ĐỐI KHÔNG viết \\times hay \\div.
   - Ký hiệu so sánh & tập hợp: Dùng ký tự trực tiếp '≤', '≥', '∈', '≠'. TUYỆT ĐỐI KHÔNG viết mã lệnh \\le, \\ge, \\in, \\neq.
   - TUYỆT ĐỐI KHÔNG bọc công thức trong dấu $...$ hay $$...$$, không dùng \\text{}, \\mathrm{}, \\dots hay bất kỳ cú pháp mã LaTeX nào trong toàn bộ đề kiểm tra.`;
      }

      var qFormat = params.questionFormat || "auto";
      var formatInstruction = "";
      if (qFormat === "mcq_only") {
        formatInstruction = `- HÌNH THỨC CÂU HỎI TRẮC NGHIỆM: 100% câu trắc nghiệm 4 lựa chọn (MCQ A, B, C, D).`;
      } else if (qFormat === "diverse" || (qFormat === "auto" && (subjectId === "KHOA_HOC" || subjectId === "LICH_SU_DIA_LY" || subjectId === "LS_DL" || subjectId === "CONG_NGHE" || subjectId === "TIN_HOC"))) {
        formatInstruction = `- HÌNH THỨC CÂU HỎI TRẮC NGHIỆM (ĐA DẠNG HÓA CHUẨN THỰC TẾ TIỂU HỌC - BẮT BUỘC):
  + Đối với môn ${subjectName}: BẮT BUỘC phối hợp đa dạng 4 hình thức trắc nghiệm sau trong số ${mcqCount} câu trắc nghiệm:
    1. Trắc nghiệm 4 lựa chọn (type: "mcq", options: ["A. ...", "B. ...", "C. ...", "D. ..."], ans: "A"): Các câu hỏi kiểm tra kiến thức cốt lõi.
    2. Trắc nghiệm Đúng/Sai (type: "true_false", text: "Đúng ghi Đ, sai ghi S vào ô trống ☐:", items: [{ "text": "nhận định 1...", "ans": "Đ" }, { "text": "nhận định 2...", "ans": "S" }]).
    3. Trắc nghiệm Ghép đôi / Nối cột (type: "matching", text: "Ghép ý ở Cột A với Cột B cho phù hợp:", columnA: [{ "id": "1", "text": "..." }, { "id": "2", "text": "..." }, { "id": "3", "text": "..." }, { "id": "4", "text": "..." }], columnB: [{ "id": "A", "text": "..." }, { "id": "B", "text": "..." }, { "id": "C", "text": "..." }, { "id": "D", "text": "..." }], pairs: "1 - B; 2 - A; 3 - D; 4 - C"): Số lượng ý hai cột A và B BẮT BUỘC PHẢI BẰNG NHAU (4 nối 4).
    4. Trắc nghiệm Điền khuyết (type: "fill_blank", text: "Điền từ trong ngoặc đơn thích hợp vào chỗ chấm:", passage: "Đoạn văn có các chỗ chấm ……", wordBank: ["từ 1", "từ 2"], blanks: ["từ 1", "từ 2"]).`;
      } else {
        formatInstruction = `- HÌNH THỨC CÂU HỎI TRẮC NGHIỆM: Môn ${subjectName} chủ yếu dùng trắc nghiệm 4 lựa chọn (MCQ A, B, C, D), có thể kết hợp 1 câu Đúng/Sai hoặc trắc nghiệm điền số nếu phù hợp.`;
      }

      // Xây dựng matrixTopicsSchemaSample động 100% theo masterStrands
      var matrixTopicsSchemaSample = "";
      if (subjectId === "TOAN") {
        matrixTopicsSchemaSample = `[
      {
        "topic": "1. Số và phép tính",
        "desc": "${masterStrands[0] ? masterStrands[0].desc : 'Số tự nhiên, phân số, số thập phân; tỉ số phần trăm; 4 phép tính; tính giá trị biểu thức và giải toán có lời văn.'}",
        "m1_mcq": "Câu 1, 2",
        "m1_essay": "",
        "m2_mcq": "Câu 3",
        "m2_essay": "",
        "m3_mcq": "",
        "m3_essay": "${mathEssayNum > 0 ? 'Câu ' + essayCount + ' (TL)' : ''}",
        "total_mcq": ${mathMcqNum},
        "total_essay": ${mathEssayNum},
        "score": 5.0
      },
      {
        "topic": "2. Hình học và Đo lường",
        "desc": "${masterStrands[1] ? masterStrands[1].desc : 'Hình phẳng, hình khối; chu vi, diện tích, thể tích; đơn vị đo, toán chuyển động đều.'}",
        "m1_mcq": "Câu ${mathMcqNum + 1}",
        "m1_essay": "",
        "m2_mcq": "Câu ${mathMcqNum + 2}",
        "m2_essay": "Câu 1 (TL)",
        "m3_mcq": "",
        "m3_essay": "",
        "total_mcq": ${mathMcqGeom},
        "total_essay": ${mathEssayGeom},
        "score": 4.0
      },
      {
        "topic": "3. Một số yếu tố Thống kê và Xác suất",
        "desc": "${masterStrands[2] ? masterStrands[2].desc : 'Thu thập, phân loại số liệu; đọc và phân tích biểu đồ hình quạt tròn, bảng số liệu; khả năng xảy ra của một sự kiện.'}",
        "m1_mcq": "",
        "m1_essay": "",
        "m2_mcq": "Câu ${mcqCount}",
        "m2_essay": "",
        "m3_mcq": "",
        "m3_essay": "",
        "total_mcq": ${mathMcqStat},
        "total_essay": 0,
        "score": 1.0
      }
    ]`;
      } else {
        var defaultStrandCount = masterStrands.length || 3;
        var avgMcq = Math.max(1, Math.floor(mcqCount / defaultStrandCount));
        matrixTopicsSchemaSample = JSON.stringify(masterStrands.map(function(s, idx) {
          var isLast = idx === masterStrands.length - 1;
          var mcqsForStrand = isLast ? (mcqCount - avgMcq * (masterStrands.length - 1)) : avgMcq;
          var essaysForStrand = isLast ? essayCount : 0;
          var targetScore = parseFloat(((mcqsForStrand * (mcqPct / 10 / mcqCount)) + (essaysForStrand * (essayPct / 10 / (essayCount || 1)))).toFixed(1));
          return {
            topic: s.topic,
            desc: s.desc,
            m1_mcq: idx === 0 ? "Câu 1, 2" : "Câu ...",
            m1_essay: "",
            m2_mcq: idx === 0 ? "Câu 3" : "Câu ...",
            m2_essay: isLast ? "Câu 1 (TL)" : "",
            m3_mcq: "",
            m3_essay: isLast && essayCount > 1 ? "Câu 2 (TL)" : "",
            total_mcq: mcqsForStrand,
            total_essay: essaysForStrand,
            score: targetScore
          };
        }), null, 4);
      }

      prompt = `
Bạn là Chuyên gia Đánh giá Giáo dục Tiểu học và Sư phạm hàng đầu Việt Nam, nắm vững Khung đánh giá và Quy trình biên soạn câu hỏi của Chương trình Đánh giá kết quả học tập của học sinh Tiểu học khu vực Đông Nam Á (SEA-PLM), Chương trình GDPT 2018, Thông tư 27/2020/TT-BGDĐT và Bộ sách giáo khoa ${seriesName}.
Hãy soạn trọn bộ ĐỀ KIỂM TRA ĐỊNH KỲ TIỂU HỌC gồm MA TRẬN 3 MỨC ĐỘ, ĐỀ THI, HƯỚNG DẪN CHẤM CHI TIẾT VÀ BẢNG ĐẶC TẢ SIÊU DỮ LIỆU - MÃ HÓA CHUẨN SEA-PLM với các thông số sau:

- MÔN HỌC: ${subjectName}
- KHỐI LỚP: Lớp ${grade}
- BỘ SÁCH GIÁO KHOA: ${seriesName}
- KỲ KIỂM TRA: ${termInfo.term} (${termInfo.headerTitle})
- PHẠM VI RA ĐỀ: ${scope}
- THỜI GIAN LÀM BÀI: ${duration}
- CẤU TRÚC ĐỀ:
  + Số câu trắc nghiệm khách quan: ${mcqCount} câu (Tổng điểm phần Trắc nghiệm: ${(mcqPct / 10).toFixed(1)} điểm, chiếm ${mcqPct}%)
  + Số câu tự luận: ${essayCount} câu (Tổng điểm phần Tự luận: ${(essayPct / 10).toFixed(1)} điểm, chiếm ${essayPct}%)
  + Định hướng nội dung phần tự luận: ${essayGuide ? essayGuide : "Bám sát các mạch kiến thức và kỹ năng trọng tâm SGK " + seriesName}
- TỈ LỆ VÀ QUY ĐỊNH BẮT BUỘC MA TRẬN 3 MỨC ĐỘ NHẬN THỨC (THÔNG TƯ 27/2020/TT-BGDĐT):
  + Mức 1 (Nhận biết / Biết): ${m1Pct}% (BẮT BUỘC TỔNG ĐIỂM = ${(m1Pct / 10).toFixed(1)} ĐIỂM). Toàn bộ các câu hỏi Mức 1 phải ghi rõ 'level': 'Mức 1' và tổng điểm các câu Mức 1 PHẢI BẰNG ĐÚNG ${(m1Pct / 10).toFixed(1)} điểm.
  + Mức 2 (Thông hiểu / Áp dụng): ${m2Pct}% (BẮT BUỘC TỔNG ĐIỂM = ${(m2Pct / 10).toFixed(1)} ĐIỂM). Toàn bộ các câu hỏi Mức 2 phải ghi rõ 'level': 'Mức 2' và tổng điểm các câu Mức 2 PHẢI BẰNG ĐÚNG ${(m2Pct / 10).toFixed(1)} điểm.
  + Mức 3 (Vận dụng / Suy luận): ${m3Pct}% (BẮT BUỘC TỔNG ĐIỂM = ${(m3Pct / 10).toFixed(1)} ĐIỂM). Toàn bộ các câu hỏi Mức 3 phải ghi rõ 'level': 'Mức 3' và tổng điểm các câu Mức 3 PHẢI BẰNG ĐÚNG ${(m3Pct / 10).toFixed(1)} điểm.
  + BẮT BUỘC: Tổng điểm Mức 1 (${(m1Pct / 10).toFixed(1)}đ) + Mức 2 (${(m2Pct / 10).toFixed(1)}đ) + Mức 3 (${(m3Pct / 10).toFixed(1)}đ) = ĐÚNG 10,0 ĐIỂM. TUYỆT ĐỐI KHÔNG ĐƯỢC LỆCH DÙ CHỈ 0,5 ĐIỂM!
${formatInstruction}
${sgkContext}
${subjectLocalContext}
${customPrompt ? "- YÊU CẦU BỔ SUNG: " + customPrompt : ""}

### QUY TẮC RÀNG BUỘC PHÂN BỔ ĐIỂM SỐ & MIỀN NỘI DUNG CHUẨN SEA-PLM (BẮT BUỘC):
${subjectContentDomainsGuideline}

2. QUY ĐỊNH BẮT BUỘC VỀ THANG ĐIỂM TIỂU HỌC (CHẴN BỘI SỐ CỦA 0,25 - THANG ĐIỂM 0,25; 0,5; 0,75; 1,0; 1,5; 2,0; 2,5...):
   - ĐIỂM CỦA MỌI CÂU HỎI (TRẮC NGHIỆM VÀ TỰ LUẬN) BẮT BUỘC PHẢI LÀ BỘI SỐ CỦA 0,25:
     Chỉ được dùng các mức điểm sau: 0,25 điểm; 0,5 điểm; 0,75 điểm; 1,0 điểm; 1,25 điểm; 1,5 điểm; 1,75 điểm; 2,0 điểm; 2,25 điểm; 2,5 điểm; 2,75 điểm; 3,0 điểm...
   - TUYỆT ĐỐI CẤM các điểm số lẻ khác như 0,1; 0,2; 0,3; 0,4; 0,6; 0,7; 0,8; 0,9; 1,2; 1,4; 1,6; 1,8; 2,4...
   - Điểm mỗi câu trắc nghiệm thường là: 0,25đ; 0,5đ; 0,75đ hoặc 1,0đ.
   - Điểm mỗi câu tự luận (hoặc từng ý trong câu tự luận): 0,5đ; 0,75đ; 1,0đ; 1,25đ; 1,5đ; 2,0đ; 2,5đ; 3,0đ...
   - Tổng điểm toàn bộ ${mcqCount} câu trắc nghiệm PHẢI CHÍNH XÁC bằng ${(mcqPct / 10).toFixed(1).replace('.', ',')} điểm.
   - Tổng điểm toàn bộ ${essayCount} câu tự luận PHẢI CHÍNH XÁC bằng ${(essayPct / 10).toFixed(1).replace('.', ',')} điểm.
   - TỔNG ĐIỂM TOÀN BỘ ĐỀ THI BẮT BUỘC BẰNG ĐÚNG 10,0 ĐIỂM.

3. QUY TẮC TỰ GIẢI LẠI & ĐỐI CHIẾU CHÉO ĐÁP ÁN (SELF-VERIFICATION & CONSISTENCY - BẮT BUỘC):
   - Đối với MỖI câu hỏi trắc nghiệm: Bạn PHẢI tự giải chi tiết từng bước, tìm ra kết quả chính xác.
   - Sau khi có kết quả, đối chiếu với các phương án lựa chọn trong mảng "options". Xác định chính xác chữ cái tương ứng và gán vào trường "ans".
   - Trường "distractorRationale.correct" BẮT BUỘC mở đầu bằng: "Cơ sở phương án đúng [chữ cái]: ...", trong đó [chữ cái] PHẢI TRÙNG KHỚP 100% với giá trị của trường "ans".
   - TUYỆT ĐỐI CẤM trường hợp "ans" là một chữ cái (ví dụ C) nhưng trong "distractorRationale" lại viết phân tích cho chữ cái khác (ví dụ A).
${mathFormattingRule}

5. QUY ĐỊNH PHÁP LÝ HÀNH CHÍNH QUỐC GIA (ÁP DỤNG TRÊN TOÀN QUỐC TỪ 01/7/2025 - BẮT BUỘC):
   - Từ ngày 01/7/2025, TOÀN BỘ CÁC TỈNH/THÀNH PHỐ TRÊN CẢ NƯỚC CHÍNH THỨC BÃI BỎ CẤP HUYỆN (không còn quận, huyện, thị xã, thành phố thuộc tỉnh). Hệ thống chính quyền địa phương vận hành tinh gọn theo mô hình 2 cấp: Cấp Tỉnh / TP trực thuộc Trung ương -> Cấp Xã / Phường / Thị trấn.
   - Khi đặt các tình huống thực tế, bảng số liệu thống kê hoặc tình huống đời sống:
     + TUYỆT ĐỐI CẤM dùng các từ: "huyện", "quận", "thị xã", "cấp huyện" (Ví dụ: CẤM viết "huyện...", "quận...", "thị xã...").
     + BẮT BUỘC chỉ dùng cấp xã/phường/thị trấn hoặc gọi theo tên địa danh, vùng miền tự nhiên (Ví dụ: "tại xã Tam Bình, tỉnh Vĩnh Long", "tại phường Bến Nghé, TP. Hồ Chí Minh", "tại xã Hòa Lạc, TP. Hà Nội", "vùng đất Tam Bình", "xứ dừa", "miệt vườn sông nước"...).
     + TUYỆT ĐỐI CẤM thêm chữ "mới" sau tên tỉnh/thành phố (ví dụ cấm viết "tỉnh Vĩnh Long mới", "Hà Nội mới"...).

6. YÊU CẦU ĐỘC LẬP VÀ ĐA DẠNG HÓA GIỮA CÁC MÃ ĐỀ THI (CHỐNG TRÙNG LẶP & RẬP KHUÔN - BẮT BUỘC):
   - Đề thi này là một MÃ ĐỀ ĐỘC LẬP (Mã phiên ngẫu nhiên: VARIANT_${Date.now().toString(36).toUpperCase()}_${Math.floor(Math.random() * 9000 + 1000)}).
   - TUYỆT ĐỐI CẤM lặp lại các bài toán mẫu, các con số quen thuộc (như hỗn số 3 và 2/5, số thập phân gồm... được viết là...) hoặc sao chép nguyên xi cấu trúc câu chữ từ các đề thi khác.
   - BẮT BUỘC sáng tạo số liệu mới mẻ, tự nhiên, bài toán thực tế sinh động, phù hợp lứa tuổi học sinh tiểu học.

### CÁC NGUYÊN TẮC BIÊN SOẠN THEO CHUẨN SEA-PLM (BỘ GIÁO DỤC VÀ ĐÀO TẠO):
1. ĐẶT TRONG BỐI CẢNH CHÂN THỰC (AUTHENTIC CONTEXTS):
   - Mỗi câu hỏi BẮT BUỘC đặt trong 1 bối cảnh có ý nghĩa với học sinh: "Cá nhân (Personal)", "Môi trường xung quanh (Local community)", "Môi trường rộng hơn (Wider world)" hoặc "Bối cảnh môn học (Academic)".
   - Ngôn ngữ dùng trong phần dẫn và câu hỏi phải đơn giản, ngắn gọn, trong sáng, gắn liền với đời sống học sinh tiểu học.
2. TRỌNG TÂM ĐO LƯỜNG ĐƠN NHẤT (UNIDIMENSIONAL FOCUS): Mỗi câu hỏi chỉ tập trung đo lường một kỹ năng hoặc mục tiêu học tập cốt lõi cụ thể.
3. KỸ THUẬT CÂU HỎI TRẮC NGHIỆM (MCQ):
   - Đúng 4 phương án (A, B, C, D) và chỉ có 1 đáp án đúng duy nhất (hoặc đúng định dạng Đúng/Sai, Ghép đôi, Điền từ).
   - Các phương án nhiễu BẮT BUỘC dựa trên các lỗi tư duy hoặc nhầm lẫn thực tế của học sinh tiểu học (misconceptions).
   - BẮT BUỘC có trường "distractorRationale" phân tích cơ sở phương án đúng và nguyên nhân học sinh chọn nhầm từng phương án A, B, C, D.
4. KỸ THUẬT CÂU HỎI TỰ LUẬN (CONSTRUCTED RESPONSE): Lệnh hỏi rõ ràng, tường minh về nhiệm vụ học sinh cần thực hiện.
5. HƯỚNG DẪN MÃ HÓA (CODING GUIDE) THEO CHUẨN SEA-PLM:
   - "Mã 2": Mức tối đa (đối với câu 2 điểm) - Đầy đủ các bước giải/ý chính, lập luận chính xác và đáp số/kết luận đúng.
   - "Mã 1": Đạt một phần (đối với câu 2 điểm - làm đúng bước đầu nhưng thiếu bước sau) HOẶC Mức tối đa (đối với câu 1 điểm).
   - "Mã 0": Mức không đạt - Sai toàn bộ hoặc làm lạc đề.
   - "Mã 9": Bỏ trống không làm bài.
   - Bắt buộc cung cấp câu trả lời mẫu thực tế của học sinh ("sampleResponse") cho từng mã.
6. BẢNG MÔ TẢ SIÊU DỮ LIỆU CÂU HỎI (seaplmMetadataTable): Bảng tổng hợp toàn bộ câu hỏi trong đề kiểm tra: itemCode, context, contentDomain, cognitiveProcess, difficulty ("Dễ" | "Trung bình" | "Khó"), itemType, score, maxCode.
7. NGUYÊN TẮC BẮT BUỘC VỀ MA TRẬN & ĐỘ BAO QUÁT NỘI DUNG ĐỀ THI:
   - ĐỐI VỚI MÔN TOÁN: Đề kiểm tra định kỳ (đặc biệt là Giữa kì, Cuối kì, Cuối năm / Cả năm) BẮT BUỘC phải bao quát đầy đủ 3 mạch kiến thức của GDPT 2018: (1) Số và phép tính, (2) Hình học và Đo lường, (3) Một số yếu tố Thống kê và Xác suất.
     * BẮT BUỘC có câu hỏi thực tế trong đề cho cả 3 mạch này theo đúng tỉ lệ số câu đã hướng dẫn ở trên.
     * Bảng ma trận "matrix.topics" PHẢI KHAI BÁO ĐỦ CẢ 3 DÒNG tương ứng với 3 mạch này.
     * TUYỆT ĐỐI CẤM ra đề kiểm tra cuối năm / cả năm mà chỉ có duy nhất mạch "Số và phép tính" hoặc bỏ quên mạch "Hình học và Đo lường", "Thống kê và Xác suất".
   - Đối với các môn Khoa học, Lịch sử và Địa lí: Bắt buộc có đủ các chủ đề/phân môn chính tương ứng.

HÃY TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON HỢP LỆ (Không kèm markdown code block hoặc text ngoài JSON) có cấu trúc chuẩn như sau:
{
  "schoolName": "${schoolName}",
  "examTitle": "${termInfo.headerTitle} MÔN ${subjectName.toUpperCase()} LỚP ${grade}",
  "examTerm": "${termInfo.term}",
  "subjectName": "${subjectName}",
  "grade": ${grade},
  "duration": "${duration}",
  "schoolYear": "2026 - 2027",
  "bookSeries": "${seriesName}",
  "scopeDesc": "${scope}",
  "mcqTotalScore": ${(mcqPct / 10).toFixed(1)},
  "essayTotalScore": ${(essayPct / 10).toFixed(1)},
  "matrix": {
    "topics": ${matrixTopicsSchemaSample},
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
      "itemCode": "${subjectId.substring(0, 4)}_${grade}_MCQ_01",
      "level": "Mức 1",
      "score": 0.5,
      "metadata": {
        "context": "Cá nhân (Personal)",
        "contentDomain": "${masterStrands[0] ? masterStrands[0].topic.replace(/^(chủ đề|\d+[\s:.]*)\s*/i, '').trim() : (subjectId === 'TOAN' ? 'Số và phép tính' : 'Kiến thức trọng tâm')}",
        "cognitiveProcess": "Biết (Knowing)",
        "difficulty": "Dễ",
        "itemType": "Trắc nghiệm 4 lựa chọn (MCQ)"
      },
      "text": "Nội dung câu hỏi trắc nghiệm số 1 gắn với bối cảnh thực tế...",
      "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
      "ans": "A",
      "explain": "Giải thích chi tiết vì sao chọn A...",
      "distractorRationale": {
        "correct": "Cơ sở phương án đúng A: Lập luận và cách tính chuẩn xác.",
        "distractorA": "Nếu A đúng: Phương án chính xác.",
        "distractorB": "Lý do học sinh chọn B: Nhầm lẫn kiến thức hoặc tính nhầm.",
        "distractorC": "Lý do học sinh chọn C: Nhầm lẫn khái niệm tương tự.",
        "distractorD": "Lý do học sinh chọn D: Đọc lướt hoặc nhầm chi tiết."
      }
    }${subjectId === 'TOAN' ? `,
    {
      "num": ${mathMcqNum + 1},
      "itemCode": "TOAN_${grade}_MCQ_${String(mathMcqNum + 1).padStart(2, '0')}",
      "level": "Mức 2",
      "score": 0.5,
      "metadata": {
        "context": "Môi trường xung quanh (Local community)",
        "contentDomain": "Hình học và Đo lường",
        "cognitiveProcess": "Áp dụng (Applying)",
        "difficulty": "Trung bình",
        "itemType": "Trắc nghiệm 4 lựa chọn (MCQ)"
      },
      "text": "Câu hỏi trắc nghiệm về hình học (tam giác, thang, tròn, hình khối...) hoặc đo lường, chuyển động...",
      "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
      "ans": "B",
      "explain": "Giải thích cách tính hình học/đo lường...",
      "distractorRationale": { "correct": "Cơ sở phương án đúng B: ...", "distractorA": "...", "distractorB": "...", "distractorC": "...", "distractorD": "..." }
    },
    {
      "num": ${mcqCount},
      "itemCode": "TOAN_${grade}_MCQ_${String(mcqCount).padStart(2, '0')}",
      "level": "Mức 2",
      "score": 0.5,
      "metadata": {
        "context": "Môi trường rộng hơn (Wider world)",
        "contentDomain": "Một số yếu tố Thống kê và Xác suất",
        "cognitiveProcess": "Áp dụng (Applying)",
        "difficulty": "Trung bình",
        "itemType": "Trắc nghiệm 4 lựa chọn (MCQ)"
      },
      "text": "Câu hỏi trắc nghiệm về đọc biểu đồ hình quạt tròn, bảng số liệu hoặc xác suất sự kiện...",
      "options": ["A. Lựa chọn A", "B. Lựa chọn B", "C. Lựa chọn C", "D. Lựa chọn D"],
      "ans": "C",
      "explain": "Giải thích cách đọc bảng/biểu đồ...",
      "distractorRationale": { "correct": "Cơ sở phương án đúng C: ...", "distractorA": "...", "distractorB": "...", "distractorC": "...", "distractorD": "..." }
    }` : ''}
  ],
  "essaySection": [
    {
      "num": 1,
      "itemCode": "${subjectId.substring(0, 4)}_${grade}_CR_01",
      "level": "Mức 2",
      "score": ${(essayCount > 1 ? 1.5 : (essayPct / 10)).toFixed(1)},
      "metadata": {
        "context": "Môi trường xung quanh (Local community)",
        "contentDomain": "${masterStrands.length > 1 ? masterStrands[masterStrands.length - 1].topic.replace(/^(chủ đề|\d+[\s:.]*)\s*/i, '').trim() : (subjectId === 'TOAN' ? 'Hình học và Đo lường' : 'Vận dụng kiến thức môn ' + subjectName)}",
        "cognitiveProcess": "Áp dụng (Applying)",
        "difficulty": "Trung bình",
        "itemType": "Tự luận / Trả lời ngắn"
      },
      "title": "Câu 1 (${(essayCount > 1 ? 1.5 : (essayPct / 10)).toFixed(1).replace('.', ',')} điểm - Mức 2):",
      "text": "${subjectId === 'TOAN' ? 'Bài toán tự luận về Hình học (chu vi, diện tích hình phẳng hoặc thể tích hình khối) hoặc Đo lường / chuyển động đều...' : 'Nội dung bài toán / câu hỏi tự luận gắn với bối cảnh chân thực...'}",
      "solution": "Lời giải chi tiết và đáp số...",
      "rubric": [
        { "step": "Ý 1 / Phép tính 1 và câu lời giải thứ nhất...", "score": "${(essayCount > 1 ? 0.75 : 0.5).toString().replace('.', ',')}đ" },
        { "step": "Ý 2 / Phép tính 2 và đáp số đúng...", "score": "${(essayCount > 1 ? 0.75 : 0.5).toString().replace('.', ',')}đ" }
      ],
      "codingGuide": {
        "maxCode": "Mã 2",
        "codes": [
          { "code": "Mã 2", "description": "Mức tối đa: Trình bày đầy đủ lời giải, phép tính và đáp số chính xác.", "sampleResponse": "Bài giải hoàn chỉnh..." },
          { "code": "Mã 1", "description": "Mức chưa tối đa: Tính đúng phép tính thứ nhất nhưng tính sai phép tính thứ hai hoặc sai đơn vị.", "sampleResponse": "Bài giải làm được 1 phần..." },
          { "code": "Mã 0", "description": "Mức không đạt: Tính sai toàn bộ hoặc giải lạc đề.", "sampleResponse": "Chỉ ghi một phép tính vô nghĩa hoặc tính sai hoàn toàn..." },
          { "code": "Mã 9", "description": "Bỏ trống không làm bài.", "sampleResponse": "[Để trống]" }
        ]
      }
    }${subjectId === 'TOAN' && essayCount > 1 ? `,
    {
      "num": 2,
      "itemCode": "TOAN_${grade}_CR_02",
      "level": "Mức 3",
      "score": ${(essayPct / 10 - 1.5).toFixed(1)},
      "metadata": {
        "context": "Cá nhân (Personal)",
        "contentDomain": "Số và phép tính",
        "cognitiveProcess": "Suy luận (Reasoning)",
        "difficulty": "Khó",
        "itemType": "Tự luận / Trả lời ngắn"
      },
      "title": "Câu 2 (${(essayPct / 10 - 1.5).toFixed(1).replace('.', ',')} điểm - Mức 3):",
      "text": "Bài toán vận dụng giải toán có lời văn về tỉ số phần trăm, các phép tính hoặc bài toán suy luận thực tế...",
      "solution": "Lời giải chi tiết và đáp số...",
      "rubric": [
        { "step": "Bước giải 1...", "score": "0,75đ" },
        { "step": "Bước giải 2 và đáp số...", "score": "0,75đ" }
      ],
      "codingGuide": {
        "maxCode": "Mã 2",
        "codes": [
          { "code": "Mã 2", "description": "Mức tối đa...", "sampleResponse": "..." },
          { "code": "Mã 1", "description": "Mức chưa tối đa...", "sampleResponse": "..." },
          { "code": "Mã 0", "description": "Mức không đạt...", "sampleResponse": "..." },
          { "code": "Mã 9", "description": "Bỏ trống...", "sampleResponse": "[Để trống]" }
        ]
      }
    }` : ''}
  ],
  "seaplmMetadataTable": [
    {
      "itemCode": "${subjectId.substring(0, 4)}_${grade}_MCQ_01",
      "order": 1,
      "context": "Cá nhân (Personal)",
      "contentDomain": "${masterStrands[0] ? masterStrands[0].topic.replace(/^(chủ đề|\d+[\s:.]*)\s*/i, '').trim() : (subjectId === 'TOAN' ? 'Số và phép tính' : 'Kiến thức cốt lõi')}",
      "cognitiveProcess": "Biết (Knowing)",
      "difficulty": "Dễ",
      "itemType": "Trắc nghiệm 4 lựa chọn (MCQ)",
      "score": 0.5,
      "maxCode": "Mã 1"
    }${subjectId === 'TOAN' ? `,
    {
      "itemCode": "TOAN_${grade}_MCQ_${String(mathMcqNum + 1).padStart(2, '0')}",
      "order": ${mathMcqNum + 1},
      "context": "Môi trường xung quanh (Local community)",
      "contentDomain": "Hình học và Đo lường",
      "cognitiveProcess": "Áp dụng (Applying)",
      "difficulty": "Trung bình",
      "itemType": "Trắc nghiệm 4 lựa chọn (MCQ)",
      "score": 0.5,
      "maxCode": "Mã 1"
    },
    {
      "itemCode": "TOAN_${grade}_MCQ_${String(mcqCount).padStart(2, '0')}",
      "order": ${mcqCount},
      "context": "Môi trường rộng hơn (Wider world)",
      "contentDomain": "Một số yếu tố Thống kê và Xác suất",
      "cognitiveProcess": "Áp dụng (Applying)",
      "difficulty": "Trung bình",
      "itemType": "Trắc nghiệm 4 lựa chọn (MCQ)",
      "score": 0.5,
      "maxCode": "Mã 1"
    }` : ''}
  ]
}
`;
    }

    // Gọi Gemini API model mới nhất (Tự động chuyển đổi thông minh, ưu tiên thế hệ mới hạn mức cao)
    var defaultKey = (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_GEMINI_API_KEY) || '';
    var activeKey = (apiKey && apiKey.trim()) || defaultKey;
    var models = ["gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
    var lastError = null;

    for (var m = 0; m < models.length; m++) {
      var modelName = models[m];
      try {
        var genConfig = {
          responseMimeType: "application/json",
          temperature: 0.55
        };
        // Tắt thinking budget ở gemini-2.5-flash để tốc độ sinh JSON siêu tốc (1-2 giây)
        if (modelName === "gemini-2.5-flash") {
          genConfig.thinkingConfig = { thinkingBudget: 0 };
        }

        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timeoutId = controller ? setTimeout(function() { controller.abort(); }, 45000) : null;
        var fetchOpts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: genConfig
          })
        };
        if (controller) fetchOpts.signal = controller.signal;

        var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${activeKey}`, fetchOpts);
        if (timeoutId) clearTimeout(timeoutId);

        if (response.ok) {
          var data = await response.json();
          var rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (rawText) {
            var parsed = this.parseJsonSafely(rawText);
            if (parsed) {
              parsed.source = "ai";
              parsed.sourceName = "Google Gemini AI (Online)";
              parsed.modelName = modelName;
              parsed.subjectId = params.subjectId || "TOAN";
              parsed.grade = parseInt(params.grade) || parsed.grade || 5;
              parsed.level1Percent = parseInt(params.level1Percent) || 40;
              parsed.level2Percent = parseInt(params.level2Percent) || 40;
              parsed.level3Percent = parseInt(params.level3Percent) || 20;
              parsed.mcqPercent = parseInt(params.mcqPercent) || 70;
              parsed.essayPercent = parseInt(params.essayPercent) || 30;
              parsed.mcqCount = parseInt(params.mcqCount) || 8;
              parsed.essayCount = parseInt(params.essayCount) || 2;
              parsed.bookSeries = params.bookSeries || parsed.bookSeries || 'ctst';
              parsed.modelName = modelName;
              return parsed;
            }
          }
        } else {
          var errJson = await response.json().catch(function(){ return {}; });
          lastError = errJson.error?.message || response.statusText;
          // Nếu API key gặp lỗi (400, 401, 403, 429) và khác defaultKey, tự động khôi phục Key hệ thống
          if (activeKey !== defaultKey && defaultKey && (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 429)) {
            console.warn("API Key trong máy bị lỗi, tự động chuyển sang Key chuẩn hệ thống:", defaultKey);
            if (typeof localStorage !== 'undefined') localStorage.setItem("tvth_gemini_api_key", defaultKey);
            params.apiKey = defaultKey;
            return await this.callGeminiAPI(defaultKey, params);
          }
        }
      } catch (e) {
        lastError = (e.name === 'AbortError') ? 'Quá thời gian kết nối AI (45s)' : e.message;
        if (activeKey !== defaultKey && defaultKey) {
          if (typeof localStorage !== 'undefined') localStorage.setItem("tvth_gemini_api_key", defaultKey);
          params.apiKey = defaultKey;
          return await this.callGeminiAPI(defaultKey, params);
        }
      }
    }

    throw new Error(lastError || "Không thể kết nối với máy chủ Google Gemini API.");
  },

  /**
   * Gọi Gemini API trực tiếp với bất kỳ prompt nào (Hỗ trợ AI Tích hợp Giáo án, phân tích văn bản...)
   */
  callGeminiApi: async function(apiKey, prompt, options) {
    var opt = options || {};
    var defaultKey = (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_GEMINI_API_KEY) || '';
    var activeKey = (apiKey && apiKey.trim()) || defaultKey;
    var models = ["gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
    var lastError = null;

    for (var m = 0; m < models.length; m++) {
      var modelName = models[m];
      try {
        var genConfig = {
          temperature: typeof opt.temperature === 'number' ? opt.temperature : 0.3
        };
        if (opt.maxTokens) genConfig.maxOutputTokens = opt.maxTokens;
        if (opt.responseMimeType) genConfig.responseMimeType = opt.responseMimeType;
        if (modelName === "gemini-2.5-flash") {
          genConfig.thinkingConfig = { thinkingBudget: 0 };
        }

        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timeoutId = controller ? setTimeout(function() { controller.abort(); }, 35000) : null;
        var fetchOpts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: genConfig
          })
        };
        if (controller) fetchOpts.signal = controller.signal;

        var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${activeKey}`, fetchOpts);
        if (timeoutId) clearTimeout(timeoutId);

        if (response.ok) {
          var data = await response.json();
          var rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (rawText) return rawText;
        } else {
          var errJson = await response.json().catch(function(){ return {}; });
          lastError = errJson.error?.message || response.statusText;
          // Tự động khôi phục Key chuẩn nếu key cá nhân bị hỏng (400, 401, 403, 429)
          if (activeKey !== defaultKey && defaultKey && (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 429)) {
            console.warn("API Key lưu trong máy không hợp lệ, tự động chuyển sang Key hệ thống chuẩn:", defaultKey);
            if (typeof localStorage !== 'undefined') localStorage.setItem("tvth_gemini_api_key", defaultKey);
            return await this.callGeminiApi(defaultKey, prompt, options);
          }
        }
      } catch (e) {
        if (timeoutId) clearTimeout(timeoutId);
        lastError = (e.name === 'AbortError') ? 'Quá thời gian kết nối AI (35s)' : e.message;
        if (activeKey !== defaultKey && defaultKey) {
          if (typeof localStorage !== 'undefined') localStorage.setItem("tvth_gemini_api_key", defaultKey);
          return await this.callGeminiApi(defaultKey, prompt, options);
        }
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

    // Xóa tiền tố/hậu tố markdown nếu chưa hoàn thiện dấu đóng
    var clean = t.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
    try {
      return JSON.parse(clean);
    } catch (e) {}

    // Xác định vị trí ngoặc vuông (Array) và ngoặc nhọn (Object)
    var startObj = t.indexOf("{");
    var endObj = t.lastIndexOf("}");
    var startArr = t.indexOf("[");
    var endArr = t.lastIndexOf("]");

    // Nếu cấu trúc là mảng JSON (dấu [ xuất hiện trước { hoặc không có {)
    if (startArr !== -1 && endArr > startArr && (startObj === -1 || startArr < startObj)) {
      try {
        return JSON.parse(t.substring(startArr, endArr + 1));
      } catch (e) {}
    }

    // Tìm dấu ngoặc nhọn đầu và cuối (Object)
    if (startObj !== -1 && endObj > startObj) {
      try {
        return JSON.parse(t.substring(startObj, endObj + 1));
      } catch (e) {}
    }

    // Thử lại dấu ngoặc vuông nếu trước đó Object thất bại
    if (startArr !== -1 && endArr > startArr) {
      try {
        return JSON.parse(t.substring(startArr, endArr + 1));
      } catch (e) {}
    }

    return null;
  },


  /**
   * ĐÃ GỠ BỎ HOÀN TOÀN: Hệ thống không tự sinh đề mẫu / ngoại tuyến.
   * Bắt buộc kết nối trực tuyến 100% với Google Gemini AI. Nếu có lỗi, hệ thống sẽ thông báo trực tiếp cho người dùng.
   */
  generateSmartLocalExam: function(params) {
    throw new Error("Chế độ đề mẫu ngoại tuyến đã được gỡ bỏ hoàn toàn. Hệ thống bắt buộc kết nối trực tiếp với Google Gemini AI để biên soạn đề mới 100%!");
  },

  generateSmartLocalTiengViet: function(grade, scope, params) {
    throw new Error("Chế độ đề mẫu ngoại tuyến đã được gỡ bỏ hoàn toàn. Hệ thống bắt buộc kết nối trực tiếp với Google Gemini AI để biên soạn đề mới 100%!");
  },

};

// =========================================================================
// FACADE PATTERN: KẾ THỪA VÀ LIÊN KẾT CÁC MODULE CHUYÊN BIỆT
// Đảm bảo 100% tương thích ngược (Zero Breaking Changes) cho toàn hệ thống
// =========================================================================
if (typeof AIMatrixService !== 'undefined') {
  Object.assign(AIService, AIMatrixService);
}
if (typeof AIDisabilityService !== 'undefined') {
  Object.assign(AIService, AIDisabilityService);
}
if (typeof AIExportWord !== 'undefined') {
  Object.assign(AIService, AIExportWord);
}

if (typeof window !== 'undefined') {
  window.AIService = AIService;
}
if (typeof global !== 'undefined') {
  global.AIService = AIService;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIService;
}
