/**
 * AI EXAM & QUIZ GENERATOR MODULE (Thông tư 27/2020/TT-BGDĐT)
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Lê Thành Long
 */

var AIService = {
  questionBank: {
    TOAN: {
      muc1: [
        { q: "Số liền sau của số 99 là:", options: ["A. 98", "B. 100", "C. 101", "D. 90"], ans: "B. 100" },
        { q: "Giá trị của chữ số 5 trong số 358 là:", options: ["A. 5 đơn vị", "B. 50 (5 chục)", "C. 500 (5 trăm)", "D. 5000"], ans: "B. 50 (5 chục)" },
        { q: "Hình nào dưới đây là hình tứ giác?", options: ["A. Hình có 3 cạnh", "B. Hình tròn", "C. Hình có 4 cạnh", "D. Hình có 5 cạnh"], ans: "C. Hình có 4 cạnh" },
        { q: "Kết quả của phép tính 36 + 24 là:", options: ["A. 50", "B. 60", "C. 58", "D. 62"], ans: "B. 60" }
      ],
      muc2: [
        { q: "Tìm x biết: x - 45 = 125. Giá trị của x là:", options: ["A. 80", "B. 160", "C. 170", "D. 180"], ans: "C. 170" },
        { q: "Một sợi dây dài 2m 4dm. Đổi ra xăng-ti-mét là:", options: ["A. 24 cm", "B. 240 cm", "C. 204 cm", "D. 2400 cm"], ans: "B. 240 cm" },
        { q: "Mẹ có 35 quả cam, mẹ chia đều vào 5 đĩa. Hỏi mỗi đĩa có mấy quả cam?", options: ["A. 6 quả", "B. 7 quả", "C. 8 quả", "D. 9 quả"], ans: "B. 7 quả" }
      ],
      muc3: [
        { q: "Lớp 3A có 32 học sinh. Số học sinh nữ chiếm 1/4 số học sinh cả lớp. Hỏi lớp 3A có bao nhiêu học sinh nam?", options: ["A. 8 bạn", "B. 24 bạn", "C. 20 bạn", "D. 16 bạn"], ans: "B. 24 bạn (Giải: Số nữ = 32 : 4 = 8 bạn. Số nam = 32 - 8 = 24 bạn)" },
        { q: "Tổng của hai số là 100. Nếu lấy số lớn trừ đi số bé ta được kết quả là 20. Hai số đó là:", options: ["A. 50 và 50", "B. 60 và 40", "C. 70 và 30", "D. 80 và 20"], ans: "B. 60 và 40" }
      ],
      essay: [
        "Bài 1 (2 điểm): Đặt tính rồi tính:\n a) 425 + 318\n b) 852 - 347\n c) 124 x 3\n d) 428 : 2",
        "Bài 2 (2 điểm): Một mảnh vườn hình chữ nhật có chiều dài 25m, chiều rộng kém chiều dài 8m. Tính chu vi của mảnh vườn đó?",
        "Bài 3 (1 điểm): Tính nhanh giá trị biểu thức: (125 x 4) x 2"
      ]
    },
    TIENG_VIET: {
      muc1: [
        { q: "Trong câu 'Bầu trời mùa thu trong xanh cao vút', từ ngữ chỉ đặc điểm là:", options: ["A. Bầu trời", "B. Mùa thu", "C. Trong xanh, cao vút", "D. Bầu trời, mùa thu"], ans: "C. Trong xanh, cao vút" },
        { q: "Bộ phận in đậm trong câu 'Bác nông dân **đang cày ruộng**' trả lời cho câu hỏi nào?", options: ["A. Là gì?", "B. Làm gì?", "C. Như thế nào?", "D. Ở đâu?"], ans: "B. Làm gì?" },
        { q: "Từ nào sau đây viết đúng chính tả?", options: ["A. Dành dụm", "B. Giành dụm", "C. Dành giụm", "D. Rành dụm"], ans: "A. Dành dụm" }
      ],
      muc2: [
        { q: "Câu văn nào dưới đây có sử dụng hình ảnh so sánh?", options: ["A. Mặt trời chiếu sáng rực rỡ.", "B. Trăng tròn như cái đĩa bạc lơ lửng giữa trời.", "C. Chúng em đang chăm chú nghe cô giảng bài.", "D. Cây bàng tỏa bóng mát rượi."], ans: "B. Trăng tròn như cái đĩa bạc lơ lửng giữa trời." },
        { q: "Dấu câu nào thích hợp điền vào ô trống trong câu: 'Ôi, cảnh biển lúc bình minh đẹp làm sao( )'", options: ["A. Dấu chấm (.)", "B. Dấu hỏi (?)", "C. Dấu chấm than (!)", "D. Dấu phẩy (,)"], ans: "C. Dấu chấm than (!)" }
      ],
      muc3: [
        { q: "Thành ngữ nào dưới đây nói về tinh thần đoàn kết, tương thân tương ái?", options: ["A. Học thầy không tày học bạn", "B. Lá lành đùm lá rách", "C. Uống nước nhớ nguồn", "D. Có công mài sắt, có ngày nên kim"], ans: "B. Lá lành đùm lá rách" }
      ],
      essay: [
        "Phần 1: Đọc hiểu văn bản (3 điểm) - Đọc đoạn văn sau và trả lời câu hỏi...",
        "Phần 2: Luyện từ và câu (2 điểm) - Tìm 2 từ ngữ chỉ hoạt động và đặt câu với 1 trong 2 từ đó.",
        "Phần 3: Tập làm văn (5 điểm) - Em hãy viết đoạn văn từ 5 - 7 câu kể về một người thân trong gia đình mà em yêu quý nhất."
      ]
    }
  },

  generateExam: async function(params) {
    var self = this;
    var apiKey = params.apiKey;
    if (apiKey && apiKey.trim().length > 10) {
      try {
        return await self.callGeminiAPI(apiKey, params);
      } catch (err) {
        console.warn("Gemini API error, fallback to local:", err);
      }
    }
    return self.generateSmartLocalExam(params);
  },

  generateSmartLocalExam: function(params) {
    var grade = params.grade;
    var subjectId = params.subjectId;
    var scope = params.scope;
    var questionCount = params.questionCount;
    var essayIncluded = params.essayIncluded;
    var subConfig = SUBJECTS_CONFIG[subjectId] || SUBJECTS_CONFIG.TOAN;
    var bank = this.questionBank[subjectId] || this.questionBank.TOAN;

    var m1Count = Math.max(1, Math.round(questionCount * 0.4));
    var m2Count = Math.max(1, Math.round(questionCount * 0.4));
    var m3Count = Math.max(1, questionCount - m1Count - m2Count);

    var selectedQuestions = [];
    var qIndex = 1;

    for (var i = 0; i < m1Count; i++) {
      var item = bank.muc1[i % bank.muc1.length];
      selectedQuestions.push({
        num: qIndex++,
        level: "Mức 1 (Nhận biết)",
        text: item.q,
        options: item.options,
        ans: item.ans,
        score: (4.0 / questionCount).toFixed(1)
      });
    }

    for (var i = 0; i < m2Count; i++) {
      var item = bank.muc2[i % bank.muc2.length];
      selectedQuestions.push({
        num: qIndex++,
        level: "Mức 2 (Thông hiểu)",
        text: item.q,
        options: item.options,
        ans: item.ans,
        score: (4.0 / questionCount).toFixed(1)
      });
    }

    for (var i = 0; i < m3Count; i++) {
      var item = bank.muc3[i % bank.muc3.length];
      selectedQuestions.push({
        num: qIndex++,
        level: "Mức 3 (Vận dụng)",
        text: item.q,
        options: item.options,
        ans: item.ans,
        score: (2.0 / questionCount).toFixed(1)
      });
    }

    var essays = essayIncluded ? (bank.essay || []) : [];

    return {
      examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ MÔN ${subConfig.name.toUpperCase()} - LỚP ${grade}`,
      scopeDesc: scope,
      grade: grade,
      subjectName: subConfig.name,
      duration: "40 phút",
      schoolYear: "2025 - 2026",
      bookSeries: "Chương trình GDPT 2018",
      matrix: [
        { topic: `Kiến thức trọng tâm (${scope})`, m1: m1Count, m2: m2Count, m3: m3Count, total: questionCount },
        { topic: "Tự luận / Kĩ năng thực hành", m1: "-", m2: "1 câu", m3: "2 câu", total: essays.length ? `${essays.length} câu` : "0" }
      ],
      multipleChoice: selectedQuestions,
      essaySection: essays
    };
  },

  callGeminiAPI: async function(apiKey, params) {
    var prompt = `Soạn đề kiểm tra Tiểu học môn ${params.subjectName} Lớp ${params.grade} theo Thông tư 27 và Chương trình GDPT 2018. Phạm vi: ${params.scope}.`;

    var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    return this.generateSmartLocalExam(params);
  },

  exportToWord: function(examData) {
    var content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${examData.examTitle}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; }
          .header-table { width: 100%; border: none; margin-bottom: 20px; }
          .title { text-align: center; font-weight: bold; font-size: 15pt; margin: 15px 0; text-transform: uppercase; }
          .sub-title { text-align: center; font-style: italic; margin-bottom: 15px; }
          .student-box { border: 1px solid #000; padding: 10px; margin-bottom: 20px; }
          .section-title { font-weight: bold; font-size: 13pt; margin-top: 15px; text-decoration: underline; }
          .q-item { margin-bottom: 12px; }
          .q-title { font-weight: bold; }
          .q-opt { margin-left: 20px; }
          .matrix-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .matrix-table th, .matrix-table td { border: 1px solid #000; padding: 6px; text-align: center; font-size: 11pt; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 50%; text-align: center;">
              <b>TRƯỜNG TIỂU HỌC: .................................</b><br>
              <b>TỔ CHUYÊN MÔN KHỐI ${examData.grade}</b>
            </td>
            <td style="width: 50%; text-align: center;">
              <b>KIỂM TRA ĐỊNH KỲ NĂM HỌC 2025 - 2026</b><br>
              Môn: <b>${examData.subjectName} - Lớp ${examData.grade}</b><br>
              <i>Thời gian làm bài: ${examData.duration}</i>
            </td>
          </tr>
        </table>

        <div class="title">${examData.examTitle}</div>
        <div class="sub-title">(Phạm vi: ${examData.scopeDesc} • Bộ sách: ${examData.bookSeries})</div>

        <div class="student-box">
          Họ và tên học sinh: ................................................................. Lớp: ${examData.grade}.....<br>
          Điểm số: ............................ Lời nhận xét của giáo viên: .....................................................
        </div>

        <div class="section-title">I. PHẦN TRẮC NGHIỆM KHÁCH QUAN (${examData.multipleChoice.length} câu)</div>
        ${examData.multipleChoice.map(function(q) {
          return `
            <div class="q-item">
              <div class="q-title">Câu ${q.num} (${q.score} điểm - ${q.level}): ${q.text}</div>
              <div class="q-opt">${q.options.join(' &nbsp;&nbsp;&nbsp;&nbsp; ')}</div>
            </div>
          `;
        }).join('')}

        ${examData.essaySection.length ? `
          <div class="section-title">II. PHẦN TỰ LUẬN</div>
          ${examData.essaySection.map(function(e) {
            return `<div class="q-item" style="white-space: pre-line;">${e}</div>`;
          }).join('')}
        ` : ''}

        <br><br>
        <div style="page-break-before: always;"></div>
        <div class="title">ĐÁP ÁN & HƯỚNG DẪN CHẤM</div>
        <table class="matrix-table">
          <tr style="background-color: #f0f0f0;">
            <th>Câu</th>
            <th>Mức độ</th>
            <th>Đáp án đúng</th>
            <th>Điểm</th>
          </tr>
          ${examData.multipleChoice.map(function(q) {
            return `
              <tr>
                <td>Câu ${q.num}</td>
                <td>${q.level}</td>
                <td><b>${q.ans}</b></td>
                <td>${q.score}</td>
              </tr>
            `;
          }).join('')}
        </table>
      </body>
      </html>
    `;

    var blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = `De_Kiem_Tra_${examData.subjectName}_Lop_${examData.grade}_KetNoiTriThuc.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Đã xuất file Word (.doc) thành công!", "success");
  }
};

window.AIService = AIService;
