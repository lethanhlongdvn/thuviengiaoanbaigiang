/**
 * AI INCLUSIVE EDUCATION & DISABILITY ADAPTATION MODULE (GIÁO DỤC HÒA NHẬP)
 * Chuyên trách: Quản lý danh mục dạng tật, hướng dẫn sư phạm, thích ứng YCCĐ cho học sinh khuyết tật
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var AIDisabilityService = {
extractDisabilityObjectsFromRaw: function(text) {
    if (!text) return [];
    var results = [];
    var regex = /\{[\s\S]*?"disabilityYccd"[\s\S]*?\}(?=\s*(?:,\s*\{|\]|$))/g;
    var m;
    while ((m = regex.exec(text)) !== null) {
      try {
        var obj = JSON.parse(m[0]);
        if (obj && (obj.disabilityYccd || obj.id !== undefined)) {
          results.push(obj);
        }
      } catch (e) {
        try {
          var trimmed = m[0].trim();
          if (!trimmed.endsWith('}')) trimmed += '}';
          var obj2 = JSON.parse(trimmed);
          if (obj2 && (obj2.disabilityYccd || obj2.id !== undefined)) results.push(obj2);
        } catch(e2) {}
      }
    }
    return results;
  },

  /**
   * Lấy tên hiển thị tiếng Việt của dạng tật
   */
  getDisabilityTypeName: function(typeKey) {
    var map = {
      'tri_tue': 'Khuyết tật trí tuệ (Tiếp thu chậm, ghi nhớ ngắn hạn)',
      'van_dong': 'Khuyết tật vận động (Hạn chế viết, thao tác)',
      'nghe_noi': 'Khuyết tật nghe - nói (Giao tiếp hạn chế)',
      'khiem_thinh': 'Khuyết tật nghe - nói (Khiếm thính)',
      'nhin': 'Khuyết tật nhìn (Thị lực kém, cần cỡ chữ lớn)',
      'khiem_thi': 'Khuyết tật nhìn (Khiếm thị)',
      'tu_ky': 'Rối loạn phổ tự kỉ (Tương tác hạn chế)',
      'tu_ki': 'Tự kỉ / Tăng động giảm chú ý (ADHD)',
      'hoc_tap': 'Khó khăn học tập đặc thù',
      'khac': 'Khuyết tật khác / Học sinh hòa nhập chung'
    };
    return map[typeKey] || 'Khuyết tật học tập';
  },

  getDisabilityEnglishTypeName: function(typeKey) {
    var map = {
      'tri_tue': 'Intellectual Disability (Slow learner, short-term memory)',
      'van_dong': 'Physical / Motor Disability (Limited writing, physical movement)',
      'nghe_noi': 'Hearing / Speech Impairment',
      'khiem_thinh': 'Hearing Impairment',
      'nhin': 'Visual Impairment (Low vision, needs large text)',
      'khiem_thi': 'Visual Impairment',
      'tu_ki': 'Autism Spectrum / ADHD',
      'tu_ky': 'Autism Spectrum Disorder',
      'hoc_tap': 'Specific Learning Difficulties',
      'khac': 'Special Educational Needs (SEN)'
    };
    return map[typeKey] || 'Special Educational Needs';
  },

  getDisabilityEnglishShortTypeName: function(typeKey) {
    var map = {
      'tri_tue': 'Intellectual Disability',
      'van_dong': 'Physical Disability',
      'nghe_noi': 'Hearing Impairment',
      'khiem_thinh': 'Hearing Impairment',
      'nhin': 'Visual Impairment',
      'khiem_thi': 'Visual Impairment',
      'tu_ki': 'Autism / ADHD',
      'tu_ky': 'Autism',
      'hoc_tap': 'Learning Difficulties',
      'adhd': 'ADHD'
    };
    return map[typeKey] || 'SEN Student';
  },

  /**
   * Chuẩn hóa và trích xuất danh sách học sinh khuyết tật từ cấu hình (Hỗ trợ 1 - 3 học sinh)
   */
  getDisabilityStudentsList: function(disabilityConfig) {
    if (!disabilityConfig) return [];
    var rawList = Array.isArray(disabilityConfig.students) ? disabilityConfig.students : [];
    var count = parseInt(disabilityConfig.studentCount, 10);
    if (isNaN(count) || count < 1) count = rawList.length || 1;
    if (count > 3) count = 3;

    var result = [];

    for (var i = 0; i < count; i++) {
      var s = rawList[i] || {};
      var dType = s.disabilityType || (i === 0 ? (disabilityConfig.disabilityType || 'tri_tue') : (i === 1 ? 'van_dong' : 'nhin'));
      var dTypeName = s.disabilityTypeName || this.getDisabilityTypeName(dType);
      var dRate = parseInt(s.cognitiveRate, 10) || (i === 0 ? (parseInt(disabilityConfig.cognitiveRate, 10) || 50) : (i === 1 ? 60 : 70));
      var dNotes = s.notes || (i === 0 ? (disabilityConfig.notes || '') : '');
      var dName = (s.name || '').trim();
      var dCustom = s.customText || (i === 0 ? (disabilityConfig.customText || '') : '');

      result.push({
        id: i + 1,
        index: i,
        name: dName,
        disabilityType: dType,
        disabilityTypeName: dTypeName,
        cognitiveRate: dRate,
        notes: dNotes,
        customText: dCustom
      });
    }
    return result;
  },

  /**
   * Hướng dẫn sư phạm phân hóa riêng cho từng dạng tật theo Thông tư 03/2018/TT-BGDĐT và CV 2345
   * Tùy biến sâu sát cho từng môn học và từng khối lớp tiểu học
   */
  getDisabilityGuidance: function(disabilityType, rate, notes, subjectKey, grade) {
    var type = disabilityType || 'tri_tue';
    var r = parseInt(rate, 10) || 50;
    var g = parseInt(grade, 10) || 5;
    var sKey = (subjectKey || '').toLowerCase();
    var guide = '';

    // 1. Phân mức nhận thức / đáp ứng theo tỉ lệ %
    var levelDescription = '';
    if (r <= 40) {
      levelDescription = `MỨC ĐỘ ĐÁP ỨNG: Khoảng ${r}% (Hạn chế nhiều / Mức độ nặng)
  + Nguyên tắc giảm tải: Tinh giản tối đa; tập trung vào tri giác trực quan trực tiếp, nhận biết tối thiểu (chỉ tranh, gọi tên, đếm các số nhỏ) và làm quen với sự trợ giúp trực tiếp (cầm tay chỉ việc) của giáo viên hoặc đồ dùng trực quan cỡ lớn.
  + Định lượng bài tập: Chỉ yêu cầu hoàn thành 1 câu hoặc 1 ý nhận biết cơ bản nhất của Bài 1; miễn hoàn toàn các bài giải toán, tính toán phức tạp hay đọc viết dài.`;
    } else if (r >= 65) {
      levelDescription = `MỨC ĐỘ ĐÁP ỨNG: Khoảng ${r}% (Mức độ nhẹ / Tiếp thu khá)
  + Nguyên tắc phân hóa: Học sinh nắm được kiến thức cốt lõi (chuẩn Bloom mức 1 và một phần mức 2); tự thực hiện bài tập nhận biết và bước đầu thông hiểu cơ bản với sự gợi ý của bạn học.
  + Định lượng bài tập: Hoàn thành khoảng ${r}% khối lượng bài tập cơ bản trong SGK (làm trọn vẹn Bài 1, Bài 2 dạng cơ bản và 1 câu đơn giản của bài toán 1 bước tính); rèn luyện tính tự giác, tự chủ.`;
    } else {
      levelDescription = `MỨC ĐỘ ĐÁP ỨNG: Khoảng ${r}% (Mức độ trung bình - Phổ biến nhất trong giáo dục hòa nhập)
  + Nguyên tắc giảm tải: Hạ bậc chuẩn nhận thức từ thông hiểu, vận dụng xuống mức NHẬN BIẾT CƠ BẢN và LÀM THEO MẪU (Bloom mức 1) với đồ dùng trực quan và bạn kèm cặp.
  + Định lượng bài tập: Hoàn thành khoảng ${r}% khối lượng bài tập nhận biết cơ bản trong SGK (Bài 1 hoặc Bài 2 dạng cơ bản theo mẫu); miễn các bài toán giải có lời văn 2-3 bước, tính thuận tiện hay nâng cao.`;
    }

    // 2. Định hướng theo từng dạng tật
    var typeGuide = '';
    if (type === 'van_dong') {
      typeGuide = `DẠNG TẬT: Khuyết tật vận động (Hạn chế vận động tay chân, khó cầm bút viết/vẽ hoặc thao tác thực hành)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM ĐẶC BIỆT: Khả năng nhận thức, tư duy và trí tuệ của học sinh HOÀN TOÀN BÌNH THƯỜNG. TUYỆT ĐỐI KHÔNG hạ thấp yêu cầu tư duy của bài học.
- ĐIỀU CHỈNH PHƯƠNG THỨC THỰC HIỆN & THỜI GIAN:
  + Cho phép học sinh trả lời miệng, chỉ bảng phụ, chọn thẻ chữ/thẻ số thay vì phải viết đoạn văn dài hay vẽ hình, kẻ bảng phức tạp.
  + Giảm bớt khối lượng viết vẽ tương ứng mức độ vận động ${r}%; gia hạn thêm thời gian làm bài; phần viết chỉ yêu cầu hoàn thành câu ngắn hoặc từ khóa.
  + Trong các hoạt động thực hành, thí nghiệm (Toán, Khoa học, Mỹ thuật, Thủ công): Học sinh tham gia cùng nhóm bạn; bạn cùng nhóm hỗ trợ các thao tác cầm nắm, vận động; học sinh thực hiện phần việc tư duy, quan sát, trả lời hoặc thao tác vừa sức.`;
    } else if (type === 'nghe_noi' || type === 'khiem_thinh') {
      typeGuide = `DẠNG TẬT: Khuyết tật nghe - nói (Khiếm thính, khó phát âm, hạn chế giao tiếp bằng lời)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM: Tối ưu hóa kênh thị giác trực quan (hình ảnh, sơ đồ, thẻ chữ/số in sẵn, khẩu hình, cử chỉ / kí hiệu ngôn ngữ).
- ĐIỀU CHỈNH PHƯƠNG THỨC:
  + Cho phép học sinh thể hiện sự hiểu bài bằng hành động: chỉ vào tranh, ghép/nối thẻ từ, viết hoặc vẽ câu trả lời ra bảng con/phiếu học tập, chọn thẻ Đ/S hoặc đáp án trực quan thay vì bắt buộc phát biểu hoặc đọc to trước lớp.
  + Tương tác cùng bạn học bằng kí hiệu ngôn ngữ, cử chỉ; bạn cùng bàn chủ động hỗ trợ chia sẻ bài học.`;
    } else if (type === 'nhin' || type === 'khiem_thi') {
      typeGuide = `DẠNG TẬT: Khuyết tật nhìn (Thị lực kém, nhìn mờ, cần cỡ chữ lớn hoặc khiếm thị)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM: Tối ưu hóa kênh thính giác (lắng nghe cô giáo và bạn đọc mẫu) và xúc giác (sờ chạm vật thật, mô hình nổi, que tính).
- ĐIỀU CHỈNH PHƯƠNG THỨC:
  + Sử dụng phiếu học tập in chữ to, hình ảnh phóng to có độ tương phản cao; ngồi ở vị trí đủ ánh sáng và gần bảng.
  + Cho phép học sinh tiếp thu và trả lời qua lời nói, mô tả bằng lời thay vì yêu cầu quan sát chi tiết nhỏ trên tranh; không chấm lỗi trình bày chữ viết/hình vẽ.`;
    } else if (type === 'tu_ki' || type === 'tu_ky') {
      typeGuide = `DẠNG TẬT: Rối loạn phổ tự kỉ / Tăng động giảm chú ý (ADHD) (Hạn chế tương tác xã hội, nhạy cảm môi trường, dễ mất tập trung)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM: Tạo không gian học tập ổn định, chia nhỏ nhiệm vụ thành từng bước rõ ràng kèm hình ảnh trực quan (Visual schedule).
- ĐIỀU CHỈNH PHƯƠNG THỨC:
  + Cho phép học sinh hoàn thành nhiệm vụ cá nhân vừa sức, khích lệ từng tiến bộ nhỏ, tránh tạo áp lực biểu đạt trước đám đông.
  + Sử dụng thẻ cảm xúc (vui/buồn), khuyến khích hòa nhập tự nhiên cùng bạn cùng bàn.`;
    } else {
      // tri_tue / hoc_tap / khac
      typeGuide = `DẠNG TẬT: Khuyết tật trí tuệ / Khó khăn học tập (Tiếp thu chậm, ghi nhớ ngắn hạn)
- ${levelDescription}
- NGUYÊN TẮC ĐỊNH LƯỢNG & GIẢM TẢI ${r}% THEO CHUẨN CV 2345:
  + Hạ bậc chuẩn nhận thức: Chuyển đổi từ mức độ thông hiểu, vận dụng sang mức độ NHẬN BIẾT CƠ BẢN, THAO TÁC TRỰC QUAN và LÀM THEO MẪU với sự trợ giúp của giáo viên, bạn học hoặc đồ dùng học tập trực quan.
  + Giới hạn phạm vi kiến thức & bài tập cụ thể: Chỉ yêu cầu học sinh làm quen với các số nhỏ, phép tính đơn giản; hoàn thành khoảng ${r}% khối lượng bài tập nhận biết cơ bản trong SGK (chỉ định rõ Bài 1 hoặc Bài 2 dạng cơ bản theo mẫu).
  + Nêu rõ phần giảm tải: Tuyên bố rõ ràng KHÔNG bắt buộc học sinh phải làm các bài toán giải có lời văn nhiều bước tính, bài tính thuận tiện/tính nhanh hay các bài tập nâng cao.`;
    }

    // 3. Quy chuẩn sâu sát bám theo MÔN HỌC và KHỐI LỚP
    var subjectGradeGuide = '';
    if (sKey === 'toan' || sKey.includes('toan') || sKey.includes('toán')) {
      if (g <= 2) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI ${g} CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Số trong phạm vi 10, 20 hoặc 100; đếm hình, que tính, khối lập phương trực quan.
- Phép tính: Cộng, trừ không nhớ trong phạm vi nhỏ; làm quen cấu tạo số hoặc hình phẳng đơn giản.
- Bài tập cụ thể: Hoàn thành 1-2 câu cơ bản của Bài 1 vào bảng con; miễn hoàn toàn bài toán có lời văn 2 bước tính hay dãy số tìm quy luật phức tạp.`;
      } else if (g === 3) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI 3 CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Số tự nhiên trong phạm vi 1 000, 10 000; bảng nhân chia từ 2 đến 9 cơ bản; bảng đơn vị đo đơn giản (cm, m, g, kg, ml, l).
- Phép tính: Cộng trừ có nhớ 1 lần trong phạm vi nhỏ, nhân chia 1 chữ số cơ bản; nhận biết góc, hình tròn, khối hộp trực quan.
- Bài tập cụ thể: Làm Bài 1 hoặc Bài 2 theo mẫu trên bảng con hoặc chọn thẻ Đúng/Sai; miễn bài toán giải có lời văn 2 bước rút về đơn vị phức tạp hay bài tính giá trị biểu thức nhiều phép tính.`;
      } else if (g === 4) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI 4 CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Đọc, viết số tự nhiên cơ bản; phân số cơ bản (nhận biết phân số qua hình vẽ tô màu trực quan, so sánh 2 phân số cùng mẫu số).
- Phép tính: Đặt tính và tính phép tính cơ bản số tự nhiên; phân số cùng mẫu số đơn giản.
- Bài tập cụ thể: Làm Bài 1 nhận biết trên bảng con, dùng thẻ Đ/S cho các nhận định đơn giản; miễn giải toán tìm hai số khi biết tổng và hiệu nhiều bước, miễn quy đồng mẫu số phức tạp và bài tính thuận tiện.`;
      } else {
        // Lớp 5
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI 5 CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Đọc viết số tự nhiên, phân số đơn giản, số thập phân cơ bản (hàng phần mười, hàng phần trăm); bảng đơn vị đo thời gian/độ dài/khối lượng dạng số tự nhiên từ lớn sang bé (VD: 1 ngày = 24 giờ, 1 giờ = 60 phút, 1 tuần = 7 ngày).
- Bài tập cụ thể: Làm Bài 1 đưa thẻ Đúng/Sai với các bài tập số tự nhiên đơn giản; làm Bài 2 trên bảng con các phép đổi số nguyên (VD: 1 ngày = 24 giờ); bài tập nhóm có bạn hỗ trợ.
- Giảm tải rõ ràng: Miễn giải toán có lời văn 2-3 bước tính (toán chuyển động đều, vận tốc, quãng đường, thời gian nâng cao), miễn đổi số thập phân phức tạp hay bài tính nhanh.`;
      }
    } else if (sKey === 'tieng_viet' || sKey.includes('tieng_viet') || sKey.includes('tiếng việt') || sKey === 'tv') {
      if (g <= 2) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TIẾNG VIỆT KHỐI ${g} CHO HỌC SINH HÒA NHẬP:
- Đọc: Nhận diện chữ cái, âm/vần đang học; đọc trơn từ ngữ đơn giản có kèm tranh minh họa; chỉ tranh nói từ ngữ tương ứng.
- Viết: Nhìn chép từ ngữ 2-3 chữ vào bảng con hoặc phiếu bài tập in sẵn; tô chữ cái theo mẫu.
- Nói và nghe: Trả lời 1 câu hỏi nhận biết trực quan rất ngắn (1-2 từ); không yêu cầu đọc đoạn văn dài hay viết chính tả tốc độ cao.`;
      } else {
        // Lớp 3, 4, 5
        subjectGradeGuide = `ĐẶC THÙ MÔN TIẾNG VIỆT KHỐI ${g} CHO HỌC SINH HÒA NHẬP:
- Đọc: Đọc trơn tên bài đọc và 1-2 câu ngắn nhất của bài; quan sát tranh minh họa chỉ đúng nhân vật/sự việc cốt lõi; trả lời câu hỏi nhận biết tường minh trực tiếp qua tranh.
- Viết: Nhìn chép từ ngữ hoặc 1 câu ngắn cốt lõi của bài vào vở hoặc bảng con; bạn cùng bàn hướng dẫn.
- Giảm tải rõ ràng: Miễn viết đoạn văn 4-5 câu hay bài văn miêu tả/kể chuyện hoàn chỉnh; miễn phân tích cấu tạo từ, từ loại, biện pháp tu từ hay ngữ pháp trừu tượng.`;
      }
    } else if (sKey === 'tnxh' || sKey.includes('tnxh') || sKey.includes('tự nhiên') || sKey.includes('tu_nhien')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN TỰ NHIÊN VÀ XÃ HỘI (KHỐI 1-3) CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát tranh ảnh, video clip, mô hình trực quan; chỉ và gọi tên được sự vật/hiện tượng cốt lõi (VD: Trái Đất, Mặt Trời, bộ phận cơ thể, cây cối, gia đình).
- Thực hành: Thực hành nặn, vẽ, xé dán hoặc sắm vai đơn giản cùng nhóm bạn (VD: đóng vai Mặt Trời trong trò chơi); trả lời câu hỏi đơn giản theo gợi ý của giáo viên.`;
    } else if (sKey === 'khoa_hoc' || sKey.includes('khoa_hoc') || sKey.includes('khoa học')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN KHOA HỌC (KHỐI 4-5) CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát vật thật, tranh ảnh, video thí nghiệm trực quan; chỉ và nêu tên được 1-2 hiện tượng tự nhiên hoặc bộ phận/đặc điểm cơ bản của bài học.
- Thực hành: Tham gia thí nghiệm đơn giản với sự hỗ trợ của bạn cùng nhóm; không yêu cầu giải thích cơ chế khoa học sâu hay ghi nhớ chuỗi phản ứng.`;
    } else if (sKey === 'lich_su_dia_ly' || sKey.includes('lsđl') || sKey.includes('lsdl') || sKey.includes('lich_su') || sKey.includes('lịch sử') || sKey.includes('địa lí')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN LỊCH SỬ VÀ ĐỊA LÍ (KHỐI 4-5) CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát lược đồ, bản đồ phóng to, hình ảnh trực quan; chỉ đúng vị trí địa lý hoặc nhận dạng đúng nhân vật/sự kiện lịch sử cốt lõi của bài.
- Thực hành: Tham gia thảo luận nhóm, xem video tư liệu cùng bạn; không yêu cầu ghi nhớ niên đại chi tiết hay phân tích diễn biến chiến dịch phức tạp.`;
    } else if (sKey === 'dao_duc' || sKey.includes('dao_duc') || sKey.includes('đạo đức')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN ĐẠO ĐỨC CHO HỌC SINH HÒA NHẬP:
- Quan sát tranh tình huống, phân biệt hành vi đúng/sai bằng thẻ Đúng/Sai hoặc thẻ cảm xúc (mặt cười / mặt mếu); nêu được 1 việc làm tốt cụ thể, vừa sức trong cuộc sống hằng ngày.`;
    } else if (sKey === 'hdtn' || sKey.includes('hdtn') || sKey.includes('trải nghiệm') || sKey.includes('trai_nghiem')) {
      subjectGradeGuide = `ĐẶC THÙ HOẠT ĐỘNG TRẢI NGHIỆM CHO HỌC SINH HÒA NHẬP:
- Tích cực tham gia trò chơi khởi động, sinh hoạt nhóm cùng các bạn; bày tỏ cảm xúc bằng cử chỉ hoặc thẻ cảm xúc; bạn cùng nhóm chủ động hỗ trợ hòa nhập.`;
    } else if (sKey === 'mi_thuat' || sKey.includes('mi_thuat') || sKey.includes('mĩ thuật') || sKey.includes('mỹ thuật')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN MĨ THUẬT CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát tranh ảnh, nhận biết màu sắc hoặc hình khối đơn giản trong bài học.
- Thực hành: Vẽ nét cơ bản, tô màu, nặn hoặc xé dán sản phẩm đơn giản theo mẫu; không yêu cầu phối màu phức tạp; bạn kèm hỗ trợ.`;
    } else if (sKey === 'am_nhac' || sKey.includes('am_nhac') || sKey.includes('âm nhạc')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN ÂM NHẠC CHO HỌC SINH HÒA NHẬP:
- Lắng nghe giai điệu; vỗ tay hoặc gõ đệm theo tiết tấu đơn giản; tham gia ca hát cùng tập thể với tinh thần vui tươi, tự tin.`;
    } else if (sKey === 'tin_hoc' || sKey.includes('tin_hoc') || sKey.includes('tin học') || sKey.includes('cong_nghe') || sKey.includes('công nghệ')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN TIN HỌC / CÔNG NGHỆ CHO HỌC SINH HÒA NHẬP:
- Nhận biết thiết bị/biểu tượng trực quan cơ bản; thực hiện thao tác đơn giản theo mẫu hướng dẫn; an toàn và hợp tác cùng bạn.`;
    } else if (sKey === 'gdtc' || sKey.includes('gdtc') || sKey.includes('thể chất') || sKey.includes('the_duc')) {
      subjectGradeGuide = `ĐẶC THÙ GIÁO DỤC THỂ CHẤT CHO HỌC SINH HÒA NHẬP:
- Quan sát mẫu; thực hiện động tác khởi động hoặc bài tập thể dục đơn giản vừa sức theo khả năng vận động; rèn luyện tinh thần kỷ luật.`;
    } else if (sKey === 'tieng_anh' || sKey.includes('tieng_anh') || sKey.includes('tiếng anh') || sKey.includes('english')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN TIẾNG ANH (ENGLISH) CHO HỌC SINH HÒA NHẬP (LỚP ${g}):
- QUY TẮC BẮT BUỘC VỀ NGÔN NGỮ: Vì giáo án môn Tiếng Anh được soạn hoàn toàn bằng tiếng Anh, nên TẤT CẢ các nội dung mục tiêu (disabilityYccd), đồ dùng (disabilityDodung), và hoạt động (disabilityActivities) BẮT BUỘC PHẢI ĐƯỢC VIẾT 100% BẰNG TIẾNG ANH (ENGLISH).
- Specific competences: Observe flashcards/pictures and listen to pronunciation; recognize and repeat 1-2 basic English words or simple greetings with teacher and peer assistance; complete Level 1 recognition exercises without having to write long sentences or learn complex grammar.
- General competences & Qualities: Feel eager to learn English, confidently practice pronunciation with classmates, cooperate happily in pair work, and complete manageable tasks.
- Teaching aids: Flashcards, picture cards, emotion cards (happy/sad), mini-board, audio player, peer assistance.`;
    } else {
      subjectGradeGuide = `ĐẶC THÙ BỘ MÔN CHO HỌC SINH HÒA NHẬP:
- Nhận biết trực quan qua vật thật/tranh ảnh; thực hành thao tác cơ bản nhất dưới sự làm mẫu của GV và bạn kèm cặp; tham gia hoạt động chung của lớp với tinh thần vui vẻ, hòa nhập.`;
    }

    guide = typeGuide + '\n\n' + subjectGradeGuide;
    if (notes && notes.trim()) {
      guide += `\n\n- LƯU Ý ĐẶC THÙ TỪ GIÁO VIÊN ĐỨNG LỚP: ${notes.trim()}`;
    }
    return guide;
  },

  /**
   * Xử lý một nhóm (chunk) bài dạy gửi cho Gemini để biên soạn lại YCCĐ, đồ dùng và hoạt động cho học sinh khuyết tật (Hỗ trợ 1 - 3 học sinh)
   */
  _processDisabilityChunkWithGemini: async function(chunkLessons, disabilityConfig, apiKey) {
    if (!chunkLessons || !chunkLessons.length) return chunkLessons;
    var self = this;
    var studentsList = this.getDisabilityStudentsList(disabilityConfig);
    if (!studentsList.length) {
      studentsList = [{
        id: 1,
        name: '',
        disabilityType: disabilityConfig.disabilityType || 'tri_tue',
        disabilityTypeName: disabilityConfig.disabilityTypeName || this.getDisabilityTypeName(disabilityConfig.disabilityType),
        cognitiveRate: parseInt(disabilityConfig.cognitiveRate, 10) || 50,
        notes: (disabilityConfig.notes || '').trim()
      }];
    }
    var isMulti = (studentsList.length > 1);

    var itemsToSend = chunkLessons.map(function(les, index) {
      var title = (les.lessonTitle || les.title || ('Bài học ' + (index + 1))).trim();
      var subj = les.subjectName || les.subject || (typeof IntegrationService !== 'undefined' && IntegrationService.getSubjectDisplayName ? IntegrationService.getSubjectDisplayName(les.subjectKey) : '') || '';
      var gr = les.grade || disabilityConfig.grade || 5;

      // Lọc YCCĐ đặc thù / cốt lõi từ bài dạy
      var rawYccd = les.yccd || [];
      if (typeof rawYccd === 'string') rawYccd = rawYccd.split('\n');
      var specificYccd = [];
      var inDacThu = false;
      for (var i = 0; i < rawYccd.length; i++) {
        var line = (rawYccd[i] || '').trim();
        if (/học sinh khuyết tật/i.test(line)) continue;
        if (/1\.\s*(năng\s*lực\s*đặc\s*thù|kiến\s*thức)/i.test(line)) { inDacThu = true; continue; }
        if (/2\.\s*(năng\s*lực\s*chung|phẩm\s*chất)|3\.\s*phẩm\s*chất|4\.\s*tích\s*hợp/i.test(line)) { inDacThu = false; break; }
        if (inDacThu && line) specificYccd.push(line);
      }
      if (specificYccd.length === 0) {
        specificYccd = rawYccd.filter(function(l) {
          return l && !/học sinh khuyết tật|tự chủ|giao tiếp|giải quyết|chăm chỉ|yêu nước|nhân ái|trách nhiệm|trung thực/i.test(l);
        }).slice(0, 4);
      }

      return {
        id: index,
        title: title,
        subject: subj,
        subjectKey: les.subjectKey || '',
        grade: gr,
        originalYccd: specificYccd.length ? specificYccd : [(les.topic || title)]
      };
    });

    var sampleSubj = (itemsToSend[0] ? itemsToSend[0].subjectKey : '') || (disabilityConfig && disabilityConfig.subjectKey) || '';
    var isEnglishSubject = sampleSubj.includes('tieng_anh') ||
      sampleSubj.includes('english') ||
      (itemsToSend[0] && ((itemsToSend[0].subject || '') + ' ' + (itemsToSend[0].title || '')).toLowerCase().includes('tiếng anh')) ||
      (itemsToSend[0] && /unit\s+\d+/i.test(itemsToSend[0].title || '')) ||
      (chunkLessons && chunkLessons.some(function(l) {
        var s = ((l.subjectKey || '') + ' ' + (l.subjectName || '') + ' ' + (l.subject || '') + ' ' + (l.lessonTitle || '') + ' ' + (l.title || '')).toLowerCase();
        return s.includes('tieng_anh') || s.includes('tiếng anh') || s.includes('english') || /unit\s+\d+/i.test(s);
      }));
    var sampleGrade = itemsToSend[0] ? itemsToSend[0].grade : (disabilityConfig ? disabilityConfig.grade : 5);

    var studentInfoSections = studentsList.map(function(st, sIdx) {
      var sGuide = self.getDisabilityGuidance(st.disabilityType, st.cognitiveRate, st.notes, sampleSubj, sampleGrade);
      if (isEnglishSubject) {
        var enTypeName = self.getDisabilityEnglishTypeName ? self.getDisabilityEnglishTypeName(st.disabilityType) : (st.disabilityTypeName || self.getDisabilityTypeName(st.disabilityType));
        var titleStr = `STUDENT ${sIdx + 1}${st.name ? (' (' + st.name + ')') : ''}:`;
        return `${titleStr}
- Special Education Needs (SEN) / Disability type: ${enTypeName}
- Cognitive / Reception capacity: approximately ${st.cognitiveRate}% compared to standard grade level
${st.notes ? ('- Teacher notes: ' + st.notes) : ''}
- Pedagogical adjustment guidelines:
${sGuide}`;
      } else {
        var titleStr = `HỌC SINH ${sIdx + 1}${st.name ? (' (' + st.name + ')') : ''}:`;
        return `${titleStr}
- Dạng tật: ${st.disabilityTypeName || self.getDisabilityTypeName(st.disabilityType)}
- Mức độ nhận thức / tiếp thu: khoảng ${st.cognitiveRate}% so với chuẩn chung của lớp
${st.notes ? ('- Ghi chú riêng từ giáo viên: ' + st.notes) : ''}
- Hướng dẫn điều chỉnh sư phạm cho dạng tật này:
${sGuide}`;
      }
    }).join('\n\n');

    var isBoth = (disabilityConfig && disabilityConfig.scope === 'both');
    var promptRules = '';
    var sampleJson = '';

    if (!isBoth) {
      // CHẾ ĐỘ 1: CHỈ TÍCH HỢP YCCĐ (MỤC I) - GỌN NHẸ, TỐI ƯU TỐC ĐỘ, KHÔNG LO NGẮT GEMINI
      if (!isMulti) {
        var singleSt = studentsList[0];
        if (isEnglishSubject) {
          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (ENGLISH LESSON PLAN):
1. LANGUAGE REQUIREMENT: Because this is an English lesson plan, ALL outputs (disabilityYccd and disabilityDodung) MUST BE 100% IN ENGLISH. DO NOT use Vietnamese.
2. PEDAGOGICAL TONE: Encouraging, positive, inclusive, child-friendly, natural tone.
3. STRUCTURE OF OBJECTIVES (disabilityYccd) MUST CONTAIN EXACTLY 2 BULLET POINTS (separated by a newline \\n):
   - Specific competences: [State core knowledge aligned with the lesson and grade; limit content scope, target completing ~${singleSt.cognitiveRate}% of basic recognition tasks in textbook (e.g. Activity 1 or 2 with peer/teacher help); clearly exempt advanced tasks (e.g., no lengthy sentence composition, no complex grammar analysis)].
   - General competences & Qualities: [Build confidence in pronunciation/participating in front of peers, active inclusion, peer cooperation (buddy support model), and effort to complete manageable tasks].
4. TEACHING AIDS (disabilityDodung): Specify 1 concise line of visual teaching aids in English (e.g., "- For inclusive students: Flashcards, picture cards, emotion cards, mini-board, peer support.").`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Specific competences: ...\\n- General competences & Qualities: ...",
    "disabilityDodung": "- For inclusive students: Flashcards, picture cards, emotion cards, mini-board, peer support."
  }
]`;
        } else {
          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG (CHUẨN CV 2345):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của học sinh; TUYỆT ĐỐI KHÔNG dùng mẫu câu rập khuôn, sáo rỗng.
2. CẤU TRÚC YCCĐ (disabilityYccd) BẮT BUỘC ĐỦ 2 GẠCH ĐẦU DÒNG (PHÂN TÁCH BẰNG DẤU XUỐNG DÒNG \\n):
   - Năng lực đặc thù: [Chỉ rõ kiến thức cốt lõi bám sát bài, môn học và khối lớp; giới hạn phạm vi số/kiến thức cụ thể (ví dụ môn Toán: số có bao nhiêu chữ số, phép tính cụ thể nào...), định lượng rõ hoàn thành khoảng ${singleSt.cognitiveRate}% khối lượng bài tập nhận biết cơ bản trong SGK (chỉ định rõ Bài 1 hoặc Bài 2 theo mẫu), và loại trừ rõ phần giảm tải không bắt buộc làm (không yêu cầu giải toán có lời văn 2-3 bước tính hay bài tính thuận tiện, bài nâng cao)].
   - Phẩm chất, năng lực chung: [Rèn luyện tính tự tin phát âm/làm bài trước bạn, tích cực hòa nhập, hợp tác cùng bạn học (mô hình bạn kèm bạn / đôi bạn cùng tiến) và có ý thức nỗ lực hoàn thành nhiệm vụ vừa sức].
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể 1 dòng đồ dùng trực quan (ví dụ: "- Đối với học sinh hòa nhập: Thẻ cảm xúc, thẻ Đ/S, bảng con, phiếu học tập/tranh ảnh trực quan...").`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...",
    "disabilityDodung": "- Đối với học sinh hòa nhập: Thẻ cảm xúc, thẻ Đ/S, bảng con, phiếu bài tập trực quan."
  }
]`;
        }
      } else {
        if (isEnglishSubject) {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Type ${sIdx + 1}: ${sShort}${sName}
- Specific competences: [Core adapted objectives for this lesson and ${sShort}]
- General competences & Qualities: [Confidence, social inclusion, peer cooperation]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- For student ${sIdx + 1}${sName} (${sShort}): [Adapted visual aids in English]`;
          }).join('\n');

          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (${studentsList.length} INCLUSIVE STUDENTS - ENGLISH LESSON PLAN):
1. LANGUAGE REQUIREMENT: Because this is an English lesson plan, ALL outputs (disabilityYccd and disabilityDodung) MUST BE 100% IN ENGLISH. DO NOT use Vietnamese.
2. PEDAGOGICAL TONE: Encouraging, positive, inclusive, child-friendly, natural tone.
3. STRUCTURE OF OBJECTIVES (disabilityYccd): MUST BE PREPARED FOR ALL ${studentsList.length} STUDENTS. For EACH student, output a header starting with * and EXACTLY 2 BULLET POINTS:
${stuHeadersExample}
4. TEACHING AIDS (disabilityDodung): Specify visual aids in English for each student (separated by newline \\n):
${dodungExample}`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Type ${sIdx + 1}: ${sShort}${sName}\\n- Specific competences: ...\\n- General competences & Qualities: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- For student ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}"
  }
]`;
        } else {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Dạng ${sIdx + 1}: ${sShort}${sName}
- Năng lực đặc thù: [Mục tiêu cốt lõi, giảm tải bám sát bài và dạng tật ${sShort}]
- Phẩm chất, năng lực chung: [Rèn luyện tự tin, hòa nhập, hợp tác cùng bạn]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): [Đồ dùng trực quan phù hợp]`;
          }).join('\n');

          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG CHO TỪNG HỌC SINH (${studentsList.length} HỌC SINH HÒA NHẬP):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của từng em; TUYỆT ĐỐI KHÔNG rập khuôn.
2. CẤU TRÚC YCCĐ (disabilityYccd): BẮT BUỘC BIÊN SOẠN RIÊNG CHO ĐỦ ${studentsList.length} HỌC SINH. Với MỖI HỌC SINH, xuất tiêu đề bắt đầu bằng dấu * và CHÍNH XÁC 2 GẠCH ĐẦU DÒNG (Năng lực đặc thù và Phẩm chất, năng lực chung):
${stuHeadersExample}
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể đồ dùng trực quan cho từng em (phân tách bằng xuống dòng \\n):
${dodungExample}`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Dạng ${sIdx + 1}: ${sShort}${sName}\\n- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}"
  }
]`;
        }
      }
    } else {
      // CHẾ ĐỘ 2: TÍCH HỢP CẢ YCCĐ (MỤC I) LẪN HOẠT ĐỘNG (MỤC III)
      if (!isMulti) {
        var singleSt = studentsList[0];
        if (isEnglishSubject) {
          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (ENGLISH LESSON PLAN):
1. LANGUAGE REQUIREMENT: Because this is an English lesson plan, ALL outputs (disabilityYccd, disabilityDodung, and disabilityActivities) MUST BE 100% IN ENGLISH. DO NOT use Vietnamese.
2. PEDAGOGICAL TONE: Encouraging, positive, inclusive, child-friendly, natural tone.
3. STRUCTURE OF OBJECTIVES (disabilityYccd) MUST CONTAIN EXACTLY 2 BULLET POINTS (separated by a newline \\n):
   - Specific competences: [State core knowledge aligned with the lesson and grade; limit content scope, target completing ~${singleSt.cognitiveRate}% of basic recognition tasks in textbook; clearly exempt advanced tasks].
   - General competences & Qualities: [Build confidence in pronunciation/participating in front of peers, active inclusion, peer cooperation, and effort to complete manageable tasks].
4. TEACHING AIDS (disabilityDodung): Specify 1 concise line of visual teaching aids in English (e.g., "- For inclusive students: Flashcards, picture cards, emotion cards, mini-board, audio player, peer support.").
5. PROCEDURAL ACTIVITIES (disabilityActivities): Must clearly state adapted Teacher's and Student's actions in English for each phase:
   - khoiDong: { "teacherAct": "- Teacher guides inclusive student ...", "studentAct": "* Inclusive student ..." }
   - luyenTap: { "teacherAct": "- Teacher helps inclusive student with basic practice ...", "studentAct": "* Inclusive student practices basic exercise on mini-board with peer help ..." }
   - vanDung: { "teacherAct": "- Teacher invites inclusive student to join reflection ...", "studentAct": "* Inclusive student shares feelings with emotion cards ..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Specific competences: ...\\n- General competences & Qualities: ...",
    "disabilityDodung": "- For inclusive students: Flashcards, picture cards, emotion cards, mini-board, peer support.",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- Teacher guides inclusive student to observe warm-up pictures/chant and gives manageable prompts.",
        "studentAct": "* Inclusive student observes illustrations, claps along, and repeats keywords prompted by teacher."
      },
      "luyenTap": {
        "teacherAct": "- Teacher assists inclusive student with basic recognition task (Activity 1) on mini-board (desk-mate support).",
        "studentAct": "* Inclusive student completes basic recognition task on mini-board with assistance from desk-mate."
      },
      "vanDung": {
        "teacherAct": "- Teacher invites inclusive student to participate in lesson wrap-up and reflection.",
        "studentAct": "* Inclusive student joins peers in sharing feelings and evaluates the lesson using emotion cards."
      }
    }
  }
]`;
        } else {
          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG (CHUẨN CV 2345):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của học sinh; TUYỆT ĐỐI KHÔNG dùng mẫu câu rập khuôn, sáo rỗng.
2. CẤU TRÚC YCCĐ (disabilityYccd) BẮT BUỘC ĐỦ 2 GẠCH ĐẦU DÒNG (PHÂN TÁCH BẰNG DẤU XUỐNG DÒNG \\n):
   - Năng lực đặc thù: [Chỉ rõ kiến thức cốt lõi bám sát bài, môn học và khối lớp; giới hạn phạm vi số/kiến thức cụ thể (ví dụ môn Toán: số có bao nhiêu chữ số, phép tính cụ thể nào...), định lượng rõ hoàn thành khoảng ${singleSt.cognitiveRate}% khối lượng bài tập nhận biết cơ bản trong SGK (chỉ định rõ Bài 1 hoặc Bài 2 theo mẫu), và loại trừ rõ phần giảm tải không bắt buộc làm (không yêu cầu giải toán có lời văn 2-3 bước tính hay bài tính thuận tiện, bài nâng cao)].
   - Phẩm chất, năng lực chung: [Rèn luyện tính tự tin phát âm/làm bài trước bạn, tích cực hòa nhập, hợp tác cùng bạn học (mô hình bạn kèm bạn / đôi bạn cùng tiến) và có ý thức nỗ lực hoàn thành nhiệm vụ vừa sức].
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể 1 dòng đồ dùng trực quan (ví dụ: "- Đối với học sinh hòa nhập: Thẻ cảm xúc, thẻ Đ/S, bảng con, phiếu học tập/tranh ảnh trực quan...").
4. TIẾN TRÌNH HOẠT ĐỘNG (disabilityActivities): Phải nêu rõ hành động của GV và HS hòa nhập cho từng hoạt động, gắn sát kiến thức của bài học (ngắn gọn, súc tích):
   - khoiDong: { "teacherAct": "- GV hướng dẫn HSHN ...", "studentAct": "* HSHN ..." }
   - luyenTap: { "teacherAct": "- GV HD HSHN làm bài tập ...", "studentAct": "* HSHN làm bài tập ... vào bảng con/giơ thẻ Đ/S..." } (Nêu bài tập số nhỏ cụ thể vừa sức cho em!)
   - vanDung: { "teacherAct": "- GV hướng dẫn HSHN ...", "studentAct": "* HSHN cùng bạn chia sẻ và đánh giá tiết học bằng thẻ cảm xúc..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...",
    "disabilityDodung": "- Đối với học sinh hòa nhập: Thẻ cảm xúc, thẻ Đ/S, bảng con, phiếu bài tập trực quan.",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- GV hướng dẫn HSHN quan sát tranh/bài hát khởi động, giao nhiệm vụ vừa sức.",
        "studentAct": "* HSHN quan sát tranh, vỗ tay và nhắc lại từ khóa theo gợi ý của cô."
      },
      "luyenTap": {
        "teacherAct": "- GV HD HSHN làm bài tập nhận biết cơ bản Bài 1 trên bảng con (bạn cùng bàn hỗ trợ).",
        "studentAct": "* HSHN thực hiện bài tập nhận biết đơn giản vào bảng con với sự hỗ trợ của bạn cùng bàn."
      },
      "vanDung": {
        "teacherAct": "- GV hướng dẫn HSHN tham gia chia sẻ và đánh giá tiết học.",
        "studentAct": "* HSHN cùng bạn chia sẻ cảm nghĩ và tham gia đánh giá tiết học bằng thẻ cảm xúc."
      }
    }
  }
]`;
        }
      } else {
        if (isEnglishSubject) {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Type ${sIdx + 1}: ${sShort}${sName}
- Specific competences: [Core adapted objectives for this lesson and ${sShort}]
- General competences & Qualities: [Confidence, social inclusion, peer cooperation]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- For student ${sIdx + 1}${sName} (${sShort}): [Adapted visual aids in English]`;
          }).join('\n');

          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (${studentsList.length} INCLUSIVE STUDENTS - ENGLISH LESSON PLAN):
1. LANGUAGE REQUIREMENT: Because this is an English lesson plan, ALL outputs (disabilityYccd, disabilityDodung, and disabilityActivities) MUST BE 100% IN ENGLISH. DO NOT use Vietnamese.
2. PEDAGOGICAL TONE: Encouraging, positive, inclusive, child-friendly, natural tone.
3. STRUCTURE OF OBJECTIVES (disabilityYccd): MUST BE PREPARED FOR ALL ${studentsList.length} STUDENTS. For EACH student, output a header starting with * and EXACTLY 2 BULLET POINTS:
${stuHeadersExample}
4. TEACHING AIDS (disabilityDodung): Specify visual aids in English for each student (separated by newline \\n):
${dodungExample}
5. PROCEDURAL ACTIVITIES (disabilityActivities): Must clearly state adapted Teacher's and Students' actions in English for each phase:
   - khoiDong: { "teacherAct": "- Teacher guides inclusive students ...", "studentAct": "* Inclusive students ..." }
   - luyenTap: { "teacherAct": "- Teacher assists inclusive students with adapted practice ...", "studentAct": "* Inclusive students perform basic tasks according to individual ability ..." }
   - vanDung: { "teacherAct": "- Teacher guides inclusive students to participate in lesson wrap-up ...", "studentAct": "* Inclusive students share feelings and reflect on the lesson using emotion cards..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Type ${sIdx + 1}: ${sShort}${sName}\\n- Specific competences: ...\\n- General competences & Qualities: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- For student ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- Teacher guides inclusive students to observe warm-up illustrations/chant, assigning manageable prompts.",
        "studentAct": "* Inclusive students observe pictures, clap along, and repeat keywords prompted by teacher."
      },
      "luyenTap": {
        "teacherAct": "- Teacher assists each inclusive student with basic recognition exercise (Activity 1) on mini-board (desk-mate support).",
        "studentAct": "* Inclusive students complete basic recognition tasks on mini-board with peer partner assistance."
      },
      "vanDung": {
        "teacherAct": "- Teacher guides inclusive students to join lesson wrap-up and reflection.",
        "studentAct": "* Inclusive students join classmates in expressing feelings and evaluating the lesson using emotion cards."
      }
    }
  }
]`;
        } else {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Dạng ${sIdx + 1}: ${sShort}${sName}
- Năng lực đặc thù: [Mục tiêu cốt lõi, giảm tải bám sát bài và dạng tật ${sShort}]
- Phẩm chất, năng lực chung: [Rèn luyện tự tin, hòa nhập, hợp tác cùng bạn]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): [Đồ dùng trực quan phù hợp]`;
          }).join('\n');

          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG CHO TỪNG HỌC SINH (${studentsList.length} HỌC SINH HÒA NHẬP):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của từng em; TUYỆT ĐỐI KHÔNG rập khuôn.
2. CẤU TRÚC YCCĐ (disabilityYccd): BẮT BUỘC BIÊN SOẠN RIÊNG CHO ĐỦ ${studentsList.length} HỌC SINH. Với MỖI HỌC SINH, xuất tiêu đề bắt đầu bằng dấu * và CHÍNH XÁC 2 GẠCH ĐẦU DÒNG (Năng lực đặc thù và Phẩm chất, năng lực chung):
${stuHeadersExample}
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể đồ dùng trực quan cho từng em (phân tách bằng xuống dòng \\n):
${dodungExample}
4. TIẾN TRÌNH HOẠT ĐỘNG (disabilityActivities): Nêu rõ hành động của GV và các HSHN trong lớp gắn sát kiến thức của bài học (ngắn gọn, súc tích):
   - khoiDong: { "teacherAct": "- GV hướng dẫn các HSHN ...", "studentAct": "* Các HSHN ..." }
   - luyenTap: { "teacherAct": "- GV HD từng HSHN làm bài tập nhận biết vừa sức ...", "studentAct": "* Các HSHN thực hiện bài tập theo khả năng ..." }
   - vanDung: { "teacherAct": "- GV hướng dẫn các HSHN ...", "studentAct": "* Các HSHN cùng bạn chia sẻ và đánh giá tiết học bằng thẻ cảm xúc..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Dạng ${sIdx + 1}: ${sShort}${sName}\\n- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}"
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- GV hướng dẫn các HSHN quan sát tranh/bài hát khởi động, giao nhiệm vụ vừa sức.",
        "studentAct": "* Các HSHN quan sát tranh, vỗ tay và nhắc lại từ khóa theo gợi ý của cô."
      },
      "luyenTap": {
        "teacherAct": "- GV HD từng HSHN làm bài tập nhận biết cơ bản Bài 1 trên bảng con (bạn cùng bàn hỗ trợ).",
        "studentAct": "* Các HSHN thực hiện bài tập nhận biết đơn giản vào bảng con với sự hỗ trợ của bạn cùng bàn."
      },
      "vanDung": {
        "teacherAct": "- GV hướng dẫn các HSHN tham gia chia sẻ và đánh giá tiết học.",
        "studentAct": "* Các HSHN cùng bạn chia sẻ cảm nghĩ và tham gia đánh giá tiết học bằng thẻ cảm xúc."
      }
    }
  }
]`;
        }
      }
    }

    var taskDescription = '';
    if (isEnglishSubject) {
      taskDescription = (!isBoth)
        ? `TASK:
Below is the list of English lessons along with their original OBJECTIVES (YCCĐ).
Based on the original objectives, grade level, and English subject pedagogical context:
1. Formulate differentiated objectives (disabilityYccd) tailored to each inclusive student's cognitive rate (${studentsList.length} student(s)) strictly in ENGLISH.
2. Specify adapted visual teaching aids (disabilityDodung) in ENGLISH.
IMPORTANT: ALL outputs must be 100% in ENGLISH.`
        : `TASK:
Below is the list of English lessons along with their original OBJECTIVES (YCCĐ).
Based on the original objectives, grade level, and English subject pedagogical context:
1. Formulate differentiated objectives (disabilityYccd) tailored to each inclusive student's cognitive rate (${studentsList.length} student(s)) strictly in ENGLISH.
2. Specify adapted visual teaching aids (disabilityDodung) in ENGLISH.
3. Formulate adapted procedures (disabilityActivities: khoiDong, luyenTap, vanDung) with teacher and student actions strictly in ENGLISH.
IMPORTANT: ALL outputs must be 100% in ENGLISH.`;
    } else {
      taskDescription = (!isBoth)
        ? `NHIỆM VỤ:
Dưới đây là danh sách các bài dạy kèm YÊU CẦU CẦN ĐẠT (YCCĐ) GỐC của từng bài.
Dựa vào YCCĐ GỐC, đặc thù môn học và khối lớp của TỪNG BÀI DẠY, hãy biên soạn:
1. YCCĐ phân hóa chi tiết, định lượng cụ thể theo mức nhận thức (chuẩn Thông tư 03 và CV 2345) dành cho học sinh khuyết tật học hòa nhập (${studentsList.length} học sinh).
2. Thiết bị / Đồ dùng dạy học trực quan hỗ trợ riêng cho từng học sinh này.`
        : `NHIỆM VỤ:
Dưới đây là danh sách các bài dạy kèm YÊU CẦU CẦN ĐẠT (YCCĐ) GỐC của từng bài.
Dựa vào YCCĐ GỐC, đặc thù môn học và khối lớp của TỪNG BÀI DẠY, hãy biên soạn đồng bộ:
1. YCCĐ phân hóa chi tiết, định lượng cụ thể theo mức nhận thức (chuẩn Thông tư 03 và CV 2345) dành cho học sinh khuyết tật học hòa nhập (${studentsList.length} học sinh).
2. Thiết bị / Đồ dùng dạy học trực quan hỗ trợ riêng cho từng học sinh này.
3. Hoạt động phân hóa cụ thể trong tiến trình dạy học (Khởi động, Luyện tập bài tập cơ bản, Vận dụng/Đánh giá) bám sát nội dung bài học, lời văn tự nhiên, ấm áp, ngắn gọn súc tích.`;
    }

    var systemRole = isEnglishSubject
      ? `You are an expert Primary English Educator and Special Educational Needs (SEN / Inclusive Education) Specialist.`
      : `Bạn là Chuyên gia Phương pháp Dạy học Tiểu học và Giáo dục Hòa nhập (Chương trình GDPT 2018, Thông tư 03/2018/TT-BGDĐT, chuẩn Công văn 2345/BGDĐT-GDTH).`;

    var prompt = `${systemRole}

${taskDescription}

${isEnglishSubject ? 'INCLUSIVE STUDENTS INFORMATION (' + studentsList.length + ' STUDENT' + (studentsList.length > 1 ? 'S' : '') + '):' : 'THÔNG TIN DANH SÁCH HỌC SINH KHUYẾT TẬT TRONG LỚP (' + studentsList.length + ' HỌC SINH):'}
${studentInfoSections}

${isEnglishSubject ? 'LESSONS LIST AND ORIGINAL OBJECTIVES:' : 'DANH SÁCH BÀI DẠY VÀ YCCĐ GỐC:'}
${JSON.stringify(itemsToSend, null, 2)}

${promptRules}

${isEnglishSubject ? 'RETURN PURE JSON ARRAY (without markdown ```json block):' : 'HÃY TRẢ VỀ KẾT QUẢ DƯỚI DẠNG MẢNG JSON THUẦN TÚY (không kèm mã markdown ```json):'}
${sampleJson}`;

    var rawResponse = await this.callGeminiApi(apiKey, prompt, {
      temperature: 0.4,
      maxTokens: 8192,
      responseMimeType: 'application/json'
    });

    var parsed = this.parseJsonSafely(rawResponse);
    var list = [];
    if (Array.isArray(parsed)) {
      list = parsed;
    } else if (parsed && typeof parsed === 'object') {
      if (Array.isArray(parsed.lessons)) list = parsed.lessons;
      else if (Array.isArray(parsed.data)) list = parsed.data;
      else if (Array.isArray(parsed.items)) list = parsed.items;
      else if (Array.isArray(parsed.results)) list = parsed.results;
      else if (parsed.disabilityYccd || parsed.id !== undefined) list = [parsed];
      else {
        var numKeys = Object.keys(parsed).filter(function(k) { return !isNaN(parseInt(k, 10)); });
        if (numKeys.length > 0) {
          list = numKeys.map(function(k) {
            var it = parsed[k];
            if (it && it.id === undefined) it.id = parseInt(k, 10);
            return it;
          });
        }
      }
    }

    if (!list || list.length === 0) {
      list = this.extractDisabilityObjectsFromRaw(rawResponse);
    }

    if (!Array.isArray(list) || list.length === 0) {
      throw new Error('AI không trả về kết quả mảng JSON hợp lệ cho danh sách bài dạy.');
    }

    list.forEach(function(item, itemIdx) {
      if (!item) return;
      var idx = (typeof item.id === 'number') ? item.id : parseInt(item.id, 10);
      if (isNaN(idx) || !chunkLessons[idx]) {
        if (typeof idx === 'number' && chunkLessons[idx - 1]) {
          idx = idx - 1;
        } else if (chunkLessons[itemIdx]) {
          idx = itemIdx;
        }
      }
      if (typeof idx === 'number' && chunkLessons[idx] && item.disabilityYccd) {
        var cleaned = item.disabilityYccd.trim()
          .replace(/[;\s]+$/, '')
          .trim();
        if (typeof IntegrationService !== 'undefined' && typeof IntegrationService.ensureDisabilityYccdFull === 'function') {
          cleaned = IntegrationService.ensureDisabilityYccdFull(cleaned, chunkLessons[idx], disabilityConfig);
        }
        chunkLessons[idx].disabilityYccdAI = cleaned;
        if (item.disabilityDodung) {
          chunkLessons[idx].disabilityDodungAI = item.disabilityDodung.trim();
        }
        if (item.disabilityActivities) {
          chunkLessons[idx].disabilityActivitiesAI = item.disabilityActivities;
        }
      }
    });

    // Nếu trong nhóm có bài bị sót, tự động thử lại riêng cho từng bài sót đó
    var missingLessons = chunkLessons.filter(function(les) { return !les.disabilityYccdAI; });
    if (missingLessons.length > 0 && chunkLessons.length > 1) {
      for (var m = 0; m < missingLessons.length; m++) {
        var mLes = missingLessons[m];
        try {
          await self._processDisabilityChunkWithGemini([mLes], disabilityConfig, apiKey);
        } catch(subErr) {
          console.warn('Không thể biên soạn lại riêng cho bài bị sót:', mLes.title, subErr);
        }
      }
    }

    var missingCount = 0;
    chunkLessons.forEach(function(les) {
      if (!les.disabilityYccdAI) missingCount++;
    });
    if (missingCount > 0) {
      throw new Error('Gemini AI chưa hoàn thành đủ bài dạy trong nhóm (thiếu ' + missingCount + ' bài). Chế độ ngoại tuyến đã bị tắt hoàn toàn, vui lòng thử lại!');
    }

    return chunkLessons;
  },

  /**
   * Gửi danh sách bài dạy cho Gemini AI để biên soạn YCCĐ phân hóa cho học sinh khuyết tật
   * Tự động chia nhóm nhỏ (batching) tối ưu tốc độ, chống tràn token (MAX_TOKENS) và ngắt kết nối
   */
  adaptDisabilityYccdBatch: async function(lessons, disabilityConfig, apiKey) {
    if (!lessons || !lessons.length || !disabilityConfig || !disabilityConfig.enabled) {
      return lessons;
    }

    var key = apiKey;
    if (!key && typeof IntegrationService !== 'undefined' && IntegrationService.getGeminiApiKey) {
      key = IntegrationService.getGeminiApiKey();
    }
    if (!key && typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) {
      key = window.CONFIG.DEFAULT_GEMINI_API_KEY;
    }
    if (!key) {
      throw new Error('Chưa có Gemini API Key để kết nối AI');
    }

    var self = this;
    var studentsList = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityStudentsList)
      ? IntegrationService.getDisabilityStudentsList(disabilityConfig)
      : (disabilityConfig.students || []);

    var isBoth = (disabilityConfig && disabilityConfig.scope === 'both');
    // Kích thước nhóm bài tối ưu:
    // Nếu chỉ YCCĐ: 3 bài nếu nhiều HS, 4 bài nếu 1 HS (nhẹ, nhanh gấp đôi, tránh 429)
    // Nếu cả 2 phần: 2 bài nếu nhiều HS, 3 bài nếu 1 HS (chống tràn token & timeout)
    var CHUNK_SIZE = (!isBoth)
      ? ((studentsList.length > 1) ? 3 : 4)
      : ((studentsList.length > 1) ? 2 : 3);
    var chunks = [];
    for (var i = 0; i < lessons.length; i += CHUNK_SIZE) {
      chunks.push(lessons.slice(i, i + CHUNK_SIZE));
    }

    for (var c = 0; c < chunks.length; c++) {
      // Khi có lỗi, ném lỗi ra ngoài để hệ thống báo lỗi kết nối rõ ràng thay vì nuốt lỗi
      await self._processDisabilityChunkWithGemini(chunks[c], disabilityConfig, key);
    }

    return lessons;
  },

  /**
   * Biên soạn YCCĐ cho một bài dạy đơn lẻ bằng Gemini AI
   */
  adaptSingleLessonDisability: async function(lesson, disabilityConfig, apiKey) {
    if (!lesson) return '';
    var list = [lesson];
    await this.adaptDisabilityYccdBatch(list, disabilityConfig, apiKey);
    return lesson.disabilityYccdAI || '';
  }
};

if (typeof window !== 'undefined') {
  window.AIDisabilityService = AIDisabilityService;
  if (window.AIService) {
    Object.assign(window.AIService, AIDisabilityService);
  }
}
if (typeof global !== 'undefined') {
  global.AIDisabilityService = AIDisabilityService;
  if (global.AIService) {
    Object.assign(global.AIService, AIDisabilityService);
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIDisabilityService;
}
