/**
 * AI EXAM WORD EXPORT MODULE (THÔNG TƯ 27/2020/TT-BGDĐT & CHUẨN SEA-PLM)
 * Chuyên trách: Tạo mẫu đề thi 3 ô đánh giá, bảng đặc tả ma trận, xuất định dạng Word (.docx / HTML-DOC)
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var AIExportWord = {
exportToWord: async function(examData) {
    if (!examData) {
      showToast("Không có dữ liệu đề thi để xuất!", "warning");
      return;
    }
    if (this.sanitizeAndBalanceExam) {
      examData = this.sanitizeAndBalanceExam(examData);
    }

    // Nếu là đề Tiếng Việt chuyên biệt
    if (examData.isTiengViet || examData.subjectId === "TIENG_VIET" || examData.readingExam) {
      await this.exportTiengVietToWord(examData);
      return;
    }

    var m = examData.matrix || {};
    var s = m.summary || {};
    var currentScope = examData.scopeDesc || examData.scope || (typeof document !== 'undefined' ? (document.getElementById("aiCustomScopeInput")?.value || document.getElementById("aiScopePreset")?.value) : "") || "";
    var termInfo = this.resolveExamTermInfo(currentScope);
    var examHeaderTitle = examData.examHeaderTitle || termInfo.headerTitle;
    if (termInfo.term === "HỌC KÌ II" && String(examHeaderTitle).includes("HỌC KÌ I") && !String(examHeaderTitle).includes("HỌC KÌ II")) {
      examHeaderTitle = "ĐỀ KIỂM TRA HỌC KÌ II";
    }
    var bookSeriesName = examData.bookSeries || (examData.seriesName || "Kết nối tri thức với cuộc sống (KNTT)");
    var mcqScoreStr = examData.mcqTotalScore ? examData.mcqTotalScore.toString().replace('.', ',') : "7,0";
    var essayScoreStr = examData.essayTotalScore ? examData.essayTotalScore.toString().replace('.', ',') : "3,0";
    var WORD_PAGE_BREAK = '<br clear="all" style="page-break-before: always; mso-break-type: section-break;" /><p class="MsoNormal" style="page-break-before: always; margin: 0pt; mso-para-margin: 0pt; font-size: 1pt; line-height: 1pt; height: 1pt; mso-margin-top-alt: 0pt; mso-margin-bottom-alt: 0pt;">&nbsp;</p><div class="page-break" style="page-break-before: always; mso-break-type: section-break; clear: both;"></div>';

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
          @page Section1 {
            size: 21.0cm 29.7cm;
            margin: 2.0cm 1.5cm 2.0cm 3.0cm;
            mso-page-orientation: portrait;
            mso-header-margin: 36.0pt;
            mso-footer-margin: 36.0pt;
          }
          div.Section1 { page: Section1; }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            mso-line-height-rule: exactly;
            color: #000;
            text-align: justify;
            margin: 0pt;
            padding: 0pt;
          }
          p, p.MsoNormal, li {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            mso-line-height-rule: exactly;
            margin: 0pt;
            margin-top: 0pt;
            margin-bottom: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            text-align: justify;
          }
          .title-bold-center {
            text-align: center;
            font-weight: bold;
            font-family: 'Times New Roman', serif;
            font-size: 14pt;
            text-transform: uppercase;
            line-height: 1.0;
            margin-top: 6pt;
            margin-bottom: 4pt;
          }
          .subtitle-center {
            text-align: center;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            margin-top: 0pt;
            margin-bottom: 10pt;
          }
          table {
            font-family: 'Times New Roman', serif;
          }
          table.matrix-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12pt;
            font-family: 'Times New Roman', serif;
          }
          table.matrix-table th, table.matrix-table td {
            border: 1px solid #000;
            padding: 4px 5px;
            text-align: center;
            font-size: 11pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
          }
          table.matrix-table th {
            font-weight: bold;
            background-color: #f2f2f2;
          }
          table.header-table {
            width: 100%;
            border: none;
            margin-bottom: 10pt;
            font-family: 'Times New Roman', serif;
          }
          table.header-table td {
            vertical-align: top;
            padding: 2px 4px;
            font-size: 13pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
            text-align: left;
          }
          table.eval-box {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12pt;
            font-family: 'Times New Roman', serif;
          }
          table.eval-box td {
            border: 1px solid #000;
            padding: 6px 8px;
            font-size: 13pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
          }
          .section-heading {
            font-family: 'Times New Roman', serif;
            font-weight: bold;
            font-size: 13pt;
            line-height: 1.0;
            margin-top: 10pt;
            margin-bottom: 4pt;
            text-align: left;
          }
          .q-block {
            margin-top: 0pt;
            margin-bottom: 8pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            text-align: justify;
          }
          .q-options {
            margin-left: 20px;
            margin-top: 2pt;
            line-height: 1.0;
            text-align: left;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
          }
          .dotted-line {
            border-bottom: 1px dotted #555;
            height: 22px;
            margin-bottom: 2px;
          }
          .page-break {
            page-break-before: always !important;
            mso-break-type: section-break !important;
            clear: both !important;
          }
        </style>
      </head>
      <body>
        <div class="Section1">

        <!-- PHẦN I: MA TRẬN ĐỀ KIỂM TRA (3 TẦNG DÒNG CHUẨN THÔNG TƯ 27) -->
        <div class="title-bold-center">${(examData.threeTierMatrix && examData.threeTierMatrix.title) ? examData.threeTierMatrix.title : `MA TRẬN ${examHeaderTitle} MÔN ${examData.subjectName.toUpperCase()} LỚP ${examData.grade} - ${bookSeriesName.toUpperCase()}`}</div>
        <div class="subtitle-center">NĂM HỌC ${examData.schoolYear}</div>

        ${examData.threeTierMatrix ? AIService.renderThreeTierMatrixTable(examData.threeTierMatrix, { isWord: true }) : `
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
            ${(m.topics || []).filter(function(t) {
              return (t.total_mcq > 0) || (t.total_essay > 0) || (t.score > 0) || t.m1_mcq || t.m1_essay || t.m2_mcq || t.m2_essay || t.m3_mcq || t.m3_essay;
            }).map(function(t) {
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
        `}

        <!-- PHẦN II: PHIẾU KIỂM TRA (ĐỀ HỌC SINH) -->
        ${WORD_PAGE_BREAK}

        <table class="header-table">
          <tr>
            <td style="width: 48%; text-align: left;">
              <b>${examData.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Họ và tên: ...................................................<br>
              Lớp: ${examData.grade}.....
            </td>
            <td style="width: 52%; text-align: left;">
              <i>Thứ….. ngày … tháng … năm 2026</i><br>
              <b style="font-size: 13.5pt; text-transform: uppercase;">${examHeaderTitle}</b><br>
              <b>MÔN: ${examData.subjectName.toUpperCase()} - LỚP ${examData.grade}</b><br>
              <i>Thời gian làm bài: ${examData.duration || "40 phút"}</i>
            </td>
          </tr>
        </table>

        <!-- KHUNG ĐÁNH GIÁ 3 Ô CHUẨN THỰC TẾ -->
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
        <p style="margin: 0 0 10px 0; font-style: italic;">Khoanh vào chữ cái đặt trước câu trả lời đúng hoặc thực hiện theo yêu cầu các câu bên dưới:</p>

        ${(examData.multipleChoice || []).map(function(q) {
          return AIService.renderQuestionItem(q, true);
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
        ${WORD_PAGE_BREAK}

        <div class="title-bold-center">HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN MÔN ${examData.subjectName.toUpperCase()} LỚP ${examData.grade}</div>
        <div class="subtitle-center">Bộ sách: ${bookSeriesName} • Năm học ${examData.schoolYear}</div>

        <div class="section-heading">I. PHẦN TRẮC NGHIỆM (${mcqScoreStr} điểm)</div>
        ${AIService.renderAnswersSection(examData, true)}

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

        <!-- ========================================================================= -->
        <!-- PHẦN IV: BẢNG ĐẶC TẢ SIÊU DỮ LIỆU CÂU HỎI THEO CHUẨN ĐÁNH GIÁ ĐÔNG NAM Á (SEA-PLM) -->
        <!-- ========================================================================= -->
        ${WORD_PAGE_BREAK}

        <div class="title-bold-center">ĐẶC TẢ SIÊU DỮ LIỆU & HƯỚNG DẪN MÃ HÓA THEO CHUẨN SEA-PLM</div>
        <div class="subtitle-center">Chương trình Đánh giá kết quả học tập học sinh Tiểu học khu vực Đông Nam Á (Bộ GD&ĐT)</div>

        <div class="section-heading">1. BẢNG MÔ TẢ SIÊU DỮ LIỆU CÂU HỎI (ITEM METADATA)</div>
        <table class="matrix-table" style="text-align: left; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2; font-weight: bold; text-align: center;">
              <th style="width: 14%; text-align: center;">Mã câu</th>
              <th style="width: 8%; text-align: center;">Thứ tự</th>
              <th style="width: 18%; text-align: center;">Bối cảnh (Context)</th>
              <th style="width: 18%; text-align: center;">Miền nội dung</th>
              <th style="width: 16%; text-align: center;">Quá trình nhận thức</th>
              <th style="width: 10%; text-align: center;">Độ khó</th>
              <th style="width: 10%; text-align: center;">Dạng câu</th>
              <th style="width: 6%; text-align: center;">Điểm</th>
            </tr>
          </thead>
          <tbody>
            ${(function() {
              var metaList = examData.seaplmMetadataTable ? JSON.parse(JSON.stringify(examData.seaplmMetadataTable)) : [];
              if (!metaList || metaList.length === 0) {
                var order = 1;
                (examData.multipleChoice || []).forEach(function(q) {
                  var ctx = q.metadata?.context || "Bối cảnh môn học (Academic)";
                  var dom = q.metadata?.contentDomain || "Kiến thức trọng tâm";
                  var cog = q.metadata?.cognitiveProcess || (q.level === 'Mức 1' ? 'Biết (Knowing)' : q.level === 'Mức 2' ? 'Áp dụng (Applying)' : 'Suy luận (Reasoning)');
                  metaList.push({
                    itemCode: q.itemCode || `${(examData.subjectName || 'MON').substring(0,3).toUpperCase()}${examData.grade}_MCQ_${String(q.num).padStart(2, '0')}`,
                    order: order++,
                    context: ctx,
                    contentDomain: dom,
                    cognitiveProcess: cog,
                    difficulty: q.metadata?.difficulty || (q.level === 'Mức 1' ? 'Dễ' : q.level === 'Mức 2' ? 'Trung bình' : 'Khó'),
                    itemType: "Trắc nghiệm 4 lựa chọn (MCQ)",
                    score: q.score || 0.5
                  });
                });
                (examData.essaySection || []).forEach(function(e) {
                  metaList.push({
                    itemCode: e.itemCode || `${(examData.subjectName || 'MON').substring(0,3).toUpperCase()}${examData.grade}_CR_${String(e.num).padStart(2, '0')}`,
                    order: order++,
                    context: e.metadata?.context || "Môi trường xung quanh (Local community)",
                    contentDomain: e.metadata?.contentDomain || "Vận dụng thực hành",
                    cognitiveProcess: e.metadata?.cognitiveProcess || "Áp dụng / Suy luận",
                    difficulty: e.metadata?.difficulty || "Trung bình - Khó",
                    itemType: "Tự luận (Constructed Response)",
                    score: e.score || 1.0
                  });
                });
              }
              return metaList.map(function(item) {
                return `
                  <tr>
                    <td style="font-weight: bold; text-align: center;">${item.itemCode || '-'}</td>
                    <td style="text-align: center;">Câu ${item.order || '-'}</td>
                    <td>${item.context || '-'}</td>
                    <td>${item.contentDomain || '-'}</td>
                    <td>${item.cognitiveProcess || '-'}</td>
                    <td style="text-align: center;">${item.difficulty || '-'}</td>
                    <td style="text-align: center;">${item.itemType || '-'}</td>
                    <td style="text-align: center; font-weight: bold;">${item.score ? item.score.toString().replace('.', ',') : '-'}</td>
                  </tr>
                `;
              }).join('');
            })()}
          </tbody>
        </table>

        <!-- 2. PHÂN TÍCH CƠ SỞ PHƯƠNG ÁN ĐÚNG VÀ PHƯƠNG ÁN NHIỄU -->
        <div class="section-heading" style="margin-top: 16px;">2. PHÂN TÍCH CƠ SỞ PHƯƠNG ÁN ĐÚNG VÀ PHƯƠNG ÁN NHIỄU (DISTRACTOR RATIONALE)</div>
        <table class="matrix-table" style="text-align: left; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2; font-weight: bold;">
              <th style="width: 10%; text-align: center;">Câu</th>
              <th style="width: 8%; text-align: center;">Đáp án</th>
              <th style="width: 40%; text-align: center;">Cơ sở phương án đúng</th>
              <th style="width: 42%; text-align: center;">Phân tích các phương án nhiễu & Lỗi sai thường gặp</th>
            </tr>
          </thead>
          <tbody>
            ${(examData.multipleChoice || []).map(function(q) {
              var dr = q.distractorRationale || {};
              var correctText = dr.correct || q.explain || `Phương án ${q.ans} là chính xác.`;
              var distText = [];
              ['A', 'B', 'C', 'D'].forEach(function(opt) {
                if (opt !== q.ans) {
                  var reason = dr['distractor' + opt] || dr[opt];
                  if (reason) {
                    distText.push(`<b>Lựa chọn ${opt}:</b> ${reason}`);
                  }
                }
              });
              if (distText.length === 0) {
                distText.push(`<b>Các lựa chọn còn lại:</b> Học sinh chọn nhầm do tính toán sai hoặc hiểu nhầm bản chất câu hỏi.`);
              }
              return `
                <tr>
                  <td style="text-align: center; font-weight: bold; vertical-align: top;">Câu ${q.num}</td>
                  <td style="text-align: center; font-weight: bold; color: #b91c1c; vertical-align: top; font-size: 12pt;">${q.ans}</td>
                  <td style="vertical-align: top; color: #15803d;">${correctText}</td>
                  <td style="vertical-align: top; color: #475569;">${distText.join('<br>')}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- 3. HƯỚNG DẪN MÃ HÓA CHI TIẾT (CODING GUIDE) THEO CHUẨN SEA-PLM -->
        ${(examData.essaySection && examData.essaySection.length > 0) ? `
          <div class="section-heading" style="margin-top: 16px;">3. HƯỚNG DẪN MÃ HÓA CHI TIẾT (CODING GUIDE) CHO CÂU TỰ LUẬN</div>
          ${examData.essaySection.map(function(e) {
            var cg = e.codingGuide || {
              maxCode: "Mã 2",
              codes: [
                { code: "Mã 2", description: "Mức tối đa: Thực hiện đầy đủ các bước, lập luận đúng và cho kết quả chính xác.", sampleResponse: e.solution || "Học sinh hoàn thành đúng toàn bộ bài giải." },
                { code: "Mã 1", description: "Mức chưa tối đa: Thực hiện đúng bước đầu hoặc tính toán đúng nhưng sai đơn vị / đáp số.", sampleResponse: "Học sinh làm đúng 1 phần bài làm." },
                { code: "Mã 0", description: "Mức không đạt: Tính toán sai toàn bộ hoặc giải lạc đề.", sampleResponse: "Không đưa ra được kết quả hoặc câu trả lời vô nghĩa." },
                { code: "Mã 9", description: "Bỏ trống không làm bài.", sampleResponse: "[Học sinh để giấy trắng]" }
              ]
            };
            return `
              <div style="margin-bottom: 15px;">
                <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 4px;">
                  ${e.title || `Câu ${e.num}`}: ${e.text}
                </div>
                <table class="matrix-table" style="text-align: left;">
                  <thead>
                    <tr style="background-color: #f2f2f2; font-weight: bold;">
                      <th style="width: 12%; text-align: center;">Mã hóa</th>
                      <th style="width: 48%; text-align: center;">Tiêu chí đánh giá</th>
                      <th style="width: 40%; text-align: center;">Ví dụ bài làm mẫu của học sinh (Sample Response)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(cg.codes || []).map(function(c) {
                      var badgeColor = c.code === 'Mã 2' ? '#15803d' : c.code === 'Mã 1' ? '#0369a1' : c.code === 'Mã 0' ? '#b91c1c' : '#64748b';
                      return `
                        <tr>
                          <td style="text-align: center; vertical-align: top; font-weight: bold; color: ${badgeColor};">
                            ${c.code}
                          </td>
                          <td style="vertical-align: top;">${c.description}</td>
                          <td style="vertical-align: top; font-style: italic; color: #334155;">${c.sampleResponse || '-'}</td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            `;
          }).join('')}
        ` : ''}

        </div>
      </body>
      </html>
    `;

    var sLower = (examData.bookSeries || 'kntt').toLowerCase();
    var seriesSlug = (sLower.includes("chân trời") || sLower === 'ctst') ? "CTST" : "KNTT";
    var termSlug = (examData.examTerm || termInfo.term || 'HK1').replace(/\s+/g, '_');
    return await this.downloadWordBlob(docHtml, `De_Kiem_Tra_${termSlug}_${examData.subjectName}_Lop_${examData.grade}_${seriesSlug}_2026_2027.docx`);
  },

  /**
   * Xuất file Word chuyên biệt cho môn Tiếng Việt (4 Trang: Phiếu Đọc, Phiếu Viết, Ma Trận, Hướng Dẫn Chấm)
   */
  exportTiengVietToWord: async function(exam) {
    if (!exam) return;
    if (this.sanitizeAndBalanceExam) {
      exam = this.sanitizeAndBalanceExam(exam);
    }
    var currentScope = exam.scopeDesc || exam.scope || (typeof document !== 'undefined' ? (document.getElementById("aiCustomScopeInput")?.value || document.getElementById("aiScopePreset")?.value) : "") || "";
    var termInfo = this.resolveExamTermInfo(currentScope);
    var examTerm = exam.examTerm || termInfo.term;
    if (termInfo.term === "HỌC KÌ II" && String(examTerm).includes("I") && !String(examTerm).includes("II")) {
      examTerm = "HỌC KÌ II";
    }
    var rd = exam.readingExam || {};
    var wr = exam.writingExam || {};
    var oralScoreStr = (rd.oralScore || 4.0).toFixed(1).replace('.', ',');
    var compScoreStr = (rd.comprehensionScore || 6.0).toFixed(1).replace('.', ',');
    var grade = exam.grade || 3;
    var WORD_PAGE_BREAK = '<br clear="all" style="page-break-before: always; mso-break-type: section-break;" /><p class="MsoNormal" style="page-break-before: always; margin: 0pt; mso-para-margin: 0pt; font-size: 1pt; line-height: 1pt; height: 1pt; mso-margin-top-alt: 0pt; mso-margin-bottom-alt: 0pt;">&nbsp;</p><div class="page-break" style="page-break-before: always; mso-break-type: section-break; clear: both;"></div>';

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
          @page Section1 {
            size: 21.0cm 29.7cm;
            margin: 2.0cm 1.5cm 2.0cm 3.0cm;
            mso-page-orientation: portrait;
            mso-header-margin: 36.0pt;
            mso-footer-margin: 36.0pt;
          }
          div.Section1 { page: Section1; }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            mso-line-height-rule: exactly;
            color: #000;
            text-align: justify;
            margin: 0pt;
            padding: 0pt;
          }
          p, p.MsoNormal, li {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            mso-line-height-rule: exactly;
            margin: 0pt;
            margin-top: 0pt;
            margin-bottom: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            text-align: justify;
          }
          .title-bold-center {
            text-align: center;
            font-family: 'Times New Roman', serif;
            font-weight: bold;
            font-size: 14pt;
            text-transform: uppercase;
            line-height: 1.0;
            margin-top: 6pt;
            margin-bottom: 4pt;
          }
          .subtitle-center {
            text-align: center;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            margin-top: 0pt;
            margin-bottom: 10pt;
          }
          table {
            font-family: 'Times New Roman', serif;
          }
          table.matrix-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12pt;
            font-family: 'Times New Roman', serif;
          }
          table.matrix-table th, table.matrix-table td {
            border: 1px solid #000;
            padding: 4px 5px;
            text-align: center;
            font-size: 11pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
          }
          table.matrix-table th {
            font-weight: bold;
            background-color: #f2f2f2;
          }
          table.header-table {
            width: 100%;
            border: none;
            margin-bottom: 10pt;
            font-family: 'Times New Roman', serif;
          }
          table.header-table td {
            vertical-align: top;
            padding: 2px 4px;
            font-size: 13pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
            text-align: left;
          }
          table.eval-box {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12pt;
            font-family: 'Times New Roman', serif;
          }
          table.eval-box td {
            border: 1px solid #000;
            padding: 6px 8px;
            font-size: 13pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
          }
          .section-heading {
            font-family: 'Times New Roman', serif;
            font-weight: bold;
            font-size: 13pt;
            line-height: 1.0;
            margin-top: 10pt;
            margin-bottom: 4pt;
            text-align: left;
          }
          .reading-box {
            background: #fafafa;
            border: 1px solid #ccc;
            padding: 8px 12px;
            margin: 6pt 0 10pt 0;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            text-align: justify;
          }
          .q-block {
            margin-top: 0pt;
            margin-bottom: 8pt;
            line-height: 1.0;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            text-align: justify;
          }
          .q-options {
            margin-left: 20px;
            margin-top: 2pt;
            line-height: 1.0;
            text-align: left;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
          }
          .dotted-line {
            border-bottom: 1px dotted #555;
            height: 22px;
            margin-bottom: 2px;
          }
          .page-break {
            page-break-before: always !important;
            mso-break-type: section-break !important;
            clear: both !important;
          }
        </style>
      </head>
      <body>
        <div class="Section1">

        <!-- ========================================== -->
        <!-- TRANG 1: PHIẾU KIỂM TRA ĐỌC (10 ĐIỂM)     -->
        <!-- ========================================== -->
        <!-- ========================================================================= -->
        <!-- PHẦN 1: 5 PHIẾU ĐỌC THÀNH TIẾNG (MỖI PHIẾU IN TRÊN 1 TRANG A4 RIÊNG BIỆT) -->
        <!-- ========================================================================= -->
        ${(rd.oralItems && rd.oralItems.length > 0) ? rd.oralItems.map(function(item, idx) {
          var qList = [];
          if (Array.isArray(item.questions) && item.questions.length > 0) {
            qList = item.questions;
          } else if (item.question) {
            qList = item.question.split(/\n+/).map(s => s.trim()).filter(Boolean);
          }

          return `
            ${idx > 0 ? WORD_PAGE_BREAK : ''}
            <!-- PHIẾU ĐỌC THÀNH TIẾNG SỐ ${idx + 1} (TRANG A4 RIÊNG BIỆT) -->
            <table class="header-table">
              <tr>
                <td style="width: 50%; vertical-align: top; text-align: left;">
                  <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
                  Họ và tên HS: ...................................................<br>
                  Lớp: ${grade}..... • Số báo danh: .........
                </td>
                <td style="width: 50%; text-align: left; vertical-align: top;">
                  <i>Thứ….. ngày … tháng … năm 2026</i><br>
                  <b>KIỂM TRA ĐỊNH KỲ ${examTerm}</b><br>
                  <b>MÔN: TIẾNG VIỆT - LỚP ${grade}</b><br>
                  <b style="font-size: 13pt; color: #b91c1c; text-transform: uppercase;">PHIẾU ĐỌC THÀNH TIẾNG SỐ ${idx + 1}</b>
                </td>
              </tr>
            </table>

            <div style="font-style: italic; font-size: 10.5pt; margin-bottom: 6px; color: #333;">
              * Hướng dẫn: Học sinh đọc thành tiếng bài văn/thơ dưới đây (thời gian khoảng 1 - 1,5 phút) và trả lời câu hỏi đọc hiểu do giáo viên chỉ định:
            </div>

            <!-- KHUNG TOÀN VĂN CẢ BÀI ĐỌC HOÀN CHỈNH -->
            <div style="border: 1.5px solid #000; padding: 8pt 12pt; margin-bottom: 8pt; background-color: #ffffff;">
              <div style="text-align: center; font-weight: bold; font-size: 13.5pt; text-transform: uppercase; margin-bottom: 2pt; line-height: 1.0; font-family: 'Times New Roman', serif;">
                ${item.title}
              </div>
              ${item.author ? `<div style="text-align: center; font-style: italic; font-size: 11pt; margin-bottom: 6pt; line-height: 1.0; font-family: 'Times New Roman', serif;">Tác giả: ${item.author}</div>` : ''}
              <div style="text-align: justify; text-indent: 1.5rem; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt; white-space: pre-line;">
                ${item.passage || item.content || `(Học sinh đọc cả bài "${item.title}")`}
              </div>
            </div>

            <!-- HỆ THỐNG TOÀN BỘ CÂU HỎI ĐỌC HIỂU CỦA BÀI ĐÓ TRONG SGK -->
            <div style="border: 1px dashed #444; padding: 6pt 10pt; margin-bottom: 8pt; background-color: #fafafa;">
              <div style="font-weight: bold; font-size: 12pt; margin-bottom: 3pt; color: #1e3a8a; line-height: 1.0; font-family: 'Times New Roman', serif;">
                CÂU HỎI TÌM HIỂU BÀI (Học sinh trả lời câu hỏi do giáo viên chỉ định):
              </div>
              ${qList.length > 0 ? qList.map(function(qText, qIdx) {
                var prefix = qText.trim().match(/^(Câu\s*\d+|\d+[\.\:])/i) ? '' : `Câu ${qIdx + 1}: `;
                return `<div style="margin: 0pt; margin-bottom: 2pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;"><b>${prefix}</b>${qText}</div>`;
              }).join('') : `<div style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;"><b>Câu hỏi:</b> ${item.question || "Nêu nội dung chính hoặc bài học rút ra từ bài đọc trên."}</div>`}
            </div>

            <!-- KHUNG CHẤM ĐIỂM CỦA GIÁO VIÊN Ở CHÂN TRANG A4 -->
            <table style="width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 10.5pt;">
              <tr>
                <td style="border: 1px solid #000; padding: 4px 6px; width: 25%; text-align: center;">
                  <b>1. Đọc đúng, lưu loát</b><br>(....../2,0 điểm)
                </td>
                <td style="border: 1px solid #000; padding: 4px 6px; width: 25%; text-align: center;">
                  <b>2. Diễn cảm, ngắt nghỉ</b><br>(....../1,0 điểm)
                </td>
                <td style="border: 1px solid #000; padding: 4px 6px; width: 25%; text-align: center;">
                  <b>3. Trả lời câu hỏi</b><br>(....../1,0 điểm)
                </td>
                <td style="border: 1px solid #000; padding: 4px 6px; width: 25%; text-align: center; font-weight: bold;">
                  <b>TỔNG ĐIỂM ĐỌC TIẾNG</b><br>(....../${oralScoreStr} điểm)
                </td>
              </tr>
              <tr>
                <td colspan="3" style="border: 1px solid #000; padding: 6px 8px; height: 35px; vertical-align: top;">
                  <b>Nhận xét:</b> .....................................................................................................................................................
                </td>
                <td style="border: 1px solid #000; padding: 6px 8px; text-align: center; vertical-align: top;">
                  <b>Giáo viên chấm</b><br><i>(Ký, ghi họ tên)</i>
                </td>
              </tr>
            </table>
          `;
        }).join('') : `
          <div style="border: 1px solid #ccc; padding: 8px 12px; margin-bottom: 12px;">
            <i>Chưa có dữ liệu bài đọc thành tiếng.</i>
          </div>
        `}

        <!-- ========================================================================= -->
        <!-- PHẦN 2: PHIẾU KIỂM TRA ĐỌC HIỂU (BẮT ĐẦU TRANG MỚI SAU 5 TRANG ĐỌC TIẾNG) -->
        <!-- ========================================================================= -->
        ${WORD_PAGE_BREAK}

        <table class="header-table">
          <tr>
            <td style="width: 48%; text-align: left;">
              <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Họ và tên: ...................................................<br>
              Lớp: ${exam.grade}.....
            </td>
            <td style="width: 52%; text-align: left;">
              <i>Thứ….. ngày … tháng … năm 2026</i><br>
              <b style="font-size: 13.5pt; text-transform: uppercase;">PHIẾU KIỂM TRA ĐỌC HIỂU</b><br>
              <b>MÔN: TIẾNG VIỆT - LỚP ${exam.grade}</b><br>
              <i>Thời gian làm bài: 35 - 40 phút</i>
            </td>
          </tr>
        </table>

        <!-- KHUNG ĐÁNH GIÁ PHẦN ĐỌC HIỂU -->
        <table class="eval-box">
          <tr>
            <td style="width: 25%; text-align: center;"><b>Điểm Đọc hiểu & LTVC</b></td>
            <td style="width: 50%; text-align: center;"><b>Nhận xét của giáo viên</b></td>
            <td style="width: 25%; text-align: center;"><b>Chữ kí PHHS</b></td>
          </tr>
          <tr>
            <td style="height: 50px; text-align: center; font-weight: bold; font-size: 13pt;">......... / ${compScoreStr}đ</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>

        <div class="section-heading">PHẦN ĐỌC HIỂU VÀ KIẾN THỨC TIẾNG VIỆT (${compScoreStr} điểm)</div>
        <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 4pt; font-style: italic; line-height: 1.0;">Đọc thầm bài văn sau và hoàn thành các bài tập bên dưới:</p>

        <div class="reading-box">
          <div style="text-align: center; font-weight: bold; font-size: 13.5pt; text-transform: uppercase; margin-bottom: 2pt; line-height: 1.0; font-family: 'Times New Roman', serif;">
            ${rd.comprehensionReading?.title || "BÀI ĐỌC THẦM"}
          </div>
          ${rd.comprehensionReading?.author ? `<div style="text-align: center; font-style: italic; font-size: 11pt; margin-bottom: 6pt; line-height: 1.0; font-family: 'Times New Roman', serif;">Tác giả: ${rd.comprehensionReading.author}</div>` : ''}
          <div style="text-align: justify; text-indent: 1.5rem; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">
            ${rd.comprehensionReading?.passage || ""}
          </div>
        </div>

        <p style="margin: 0pt; margin-top: 4pt; margin-bottom: 6pt; font-style: italic; font-weight: bold; line-height: 1.0;">Khoanh vào chữ cái trước câu trả lời đúng và thực hiện các yêu cầu:</p>

        ${(rd.questions || []).map(function(q) {
          if (q.type === 'mcq' || q.type === 'true_false' || q.type === 'matching' || q.type === 'fill_blank') {
            return AIService.renderQuestionItem(q, true);
          } else {
            return `
              <div class="q-block" style="margin: 0pt; margin-top: 6pt; margin-bottom: 8pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">
                <div style="line-height: 1.0; margin: 0pt; margin-bottom: 2pt;"><b>Câu ${q.num}</b> (${q.score ? q.score.toString().replace('.', ',') : '1,0'} điểm - ${q.level || 'Mức 2'}): ${q.text}</div>
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
        ${WORD_PAGE_BREAK}

        <table class="header-table">
          <tr>
            <td style="width: 48%; text-align: left;">
              <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Họ và tên: ...................................................<br>
              Lớp: ${exam.grade}.....
            </td>
            <td style="width: 52%; text-align: left;">
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
            <div style="font-style: italic; margin-bottom: 6pt; font-size: 13pt; line-height: 1.0; font-family: 'Times New Roman', serif;">
              Gợi ý:
              ${wr.paragraphWriting.suggestions.map(function(s){ return `<div style="margin: 0pt; line-height: 1.0;">- ${s}</div>`; }).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 8px;">
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
              <td style="height: 55px; text-align: center; font-weight: bold; font-size: 13pt;">......... / 10đ</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>

          <div class="section-heading">TẬP LÀM VĂN (10,0 điểm)</div>
          <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 6pt; font-weight: bold; font-size: 13pt; line-height: 1.0; font-family: 'Times New Roman', serif;">
            Đề bài: ${wr.essay?.prompt || "Em hãy viết một bài văn hoàn chỉnh đúng thể loại đã học."}
          </p>
          ${(wr.essay?.suggestions && wr.essay.suggestions.length > 0) ? `
            <div style="font-style: italic; margin-bottom: 8pt; font-size: 13pt; line-height: 1.0; font-family: 'Times New Roman', serif; background: #fdfdfd; border: 1px dashed #aaa; padding: 6pt 10pt;">
              <b>Gợi ý dàn ý:</b>
              ${wr.essay.suggestions.map(function(s){ return `<div style="margin: 0pt; line-height: 1.0;">- ${s}</div>`; }).join('')}
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
        ${WORD_PAGE_BREAK}

        <div class="title-bold-center">MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ ${termInfo.matrixTitle} MÔN TIẾNG VIỆT LỚP ${exam.grade}</div>
        <div class="subtitle-center" style="margin-bottom: 14px;">Bộ sách: ${exam.bookSeries || 'Kết nối tri thức với cuộc sống (KNTT)'} • Năm học ${exam.schoolYear || '2026 - 2027'}</div>

        <div class="section-heading">I. MA TRẬN NỘI DUNG VÀ MỨC ĐỘ NHẬN THỨC PHẦN ĐỌC HIỂU (${compScoreStr} ĐIỂM)</div>
        ${exam.threeTierMatrix ? AIService.renderThreeTierMatrixTable(exam.threeTierMatrix, { isWord: true }) : `
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
        `}

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
        ${WORD_PAGE_BREAK}

        <div class="title-bold-center">HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN MÔN TIẾNG VIỆT LỚP ${exam.grade}</div>
        <div class="subtitle-center">Chuẩn đánh giá học sinh Tiểu học theo Thông tư 27/2020/TT-BGDĐT</div>

        <!-- 1. HƯỚNG DẪN CHẤM ĐỌC THÀNH TIẾNG -->
        <div class="section-heading">A. HƯỚNG DẪN CHẤM ĐỌC THÀNH TIẾNG (${oralScoreStr} ĐIỂM)</div>
        <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 4pt; font-size: 13pt; line-height: 1.0; font-family: 'Times New Roman', serif; white-space: pre-line;">
          ${exam.teacherGuide?.oralGuide?.criteria || "- Đọc đúng, rõ ràng, phát âm chuẩn.\n- Trả lời đúng câu hỏi đọc hiểu được 1,0 điểm."}
        </p>

        <div style="font-weight: bold; margin: 8px 0 4px 0; color: #1e3a8a;">
          DANH SÁCH TOÀN BỘ CÂU HỎI VÀ GỢI Ý TRẢ LỜI 5 PHIẾU ĐỌC THÀNH TIẾNG:
        </div>
        <table class="matrix-table" style="text-align: left;">
          <thead>
            <tr>
              <th style="width: 25%; text-align: center;">Phiếu / Bài đọc</th>
              <th style="width: 35%; text-align: center;">Hệ thống câu hỏi trong SGK</th>
              <th style="width: 40%; text-align: center;">Gợi ý câu trả lời chuẩn xác</th>
            </tr>
          </thead>
          <tbody>
            ${(function() {
              var list = (rd.oralItems && rd.oralItems.length > 0) ? rd.oralItems : (exam.teacherGuide?.oralGuide?.qaList || []);
              return list.map(function(item, idx) {
                var title = item.title || item.lessonTitle || `Bài đọc ${idx + 1}`;
                var volPage = [];
                if (item.bookVolume) volPage.push(item.bookVolume);
                if (item.page) volPage.push(item.page.includes('Trang') ? item.page : `Trang ${item.page}`);
                var src = volPage.length > 0 ? `(${volPage.join(' - ')})` : '';

                var qList = [];
                if (Array.isArray(item.questions) && item.questions.length > 0) {
                  qList = item.questions;
                } else if (item.question) {
                  qList = item.question.split(/\n+/).map(s => s.trim()).filter(Boolean);
                }

                var aList = [];
                if (Array.isArray(item.answers) && item.answers.length > 0) {
                  aList = item.answers;
                } else if (item.answer) {
                  aList = item.answer.split(/\n+/).map(s => s.trim()).filter(Boolean);
                }

                var qHtml = qList.map(function(qText, qIdx) {
                  var prefix = qText.trim().match(/^(Câu\s*\d+|\d+[\.\:])/i) ? '' : `Câu ${qIdx + 1}: `;
                  return `<div style="margin-bottom: 4px; line-height: 1.35;"><b>${prefix}</b>${qText}</div>`;
                }).join('') || (item.question || '-');

                var aHtml = aList.map(function(aText, aIdx) {
                  var prefix = aText.trim().match(/^(Câu\s*\d+|\d+[\.\:]|Ý\s*\d+)/i) ? '' : `Gợi ý ${aIdx + 1}: `;
                  return `<div style="margin-bottom: 4px; line-height: 1.35; color: #15803d;"><b>${prefix}</b>${aText}</div>`;
                }).join('') || `<b>${item.answer || '-'}</b>`;

                return `
                  <tr>
                    <td style="font-weight: bold; vertical-align: top;">
                      Phiếu ${idx + 1}: ${title}<br>
                      <span style="font-size: 9.5pt; font-weight: normal; color: #555;">${src}</span>
                    </td>
                    <td style="vertical-align: top; font-size: 10.5pt;">${qHtml}</td>
                    <td style="vertical-align: top; font-size: 10.5pt;">${aHtml}</td>
                  </tr>
                `;
              }).join('');
            })()}
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
          <div style="font-weight: bold; margin-bottom: 3pt; font-size: 13pt; line-height: 1.0; font-family: 'Times New Roman', serif;">1. Chính tả (${(wr.dictation?.score || 4.0).toFixed(1).replace('.', ',')} điểm):</div>
          <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 4pt; font-size: 13pt; line-height: 1.0; font-family: 'Times New Roman', serif; white-space: pre-line;">
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

        <!-- ========================================================================= -->
        <!-- TRANG 5: ĐẶC TẢ SIÊU DỮ LIỆU & HƯỚNG DẪN MÃ HÓA THEO CHUẨN SEA-PLM        -->
        <!-- ========================================================================= -->
        ${WORD_PAGE_BREAK}

        <div class="title-bold-center">ĐẶC TẢ SIÊU DỮ LIỆU & HƯỚNG DẪN MÃ HÓA THEO CHUẨN SEA-PLM</div>
        <div class="subtitle-center">Chương trình Đánh giá kết quả học tập học sinh Tiểu học khu vực Đông Nam Á (Bộ GD&ĐT)</div>

        <!-- 1. BẢNG MÔ TẢ SIÊU DỮ LIỆU CÂU HỎI -->
        <div class="section-heading">1. BẢNG MÔ TẢ SIÊU DỮ LIỆU CÂU HỎI (ITEM METADATA TABLE)</div>
        <table class="matrix-table" style="text-align: left; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2; font-weight: bold; text-align: center;">
              <th style="width: 14%; text-align: center;">Mã câu</th>
              <th style="width: 8%; text-align: center;">Thứ tự</th>
              <th style="width: 18%; text-align: center;">Bối cảnh (Context)</th>
              <th style="width: 18%; text-align: center;">Miền nội dung</th>
              <th style="width: 16%; text-align: center;">Quá trình nhận thức</th>
              <th style="width: 10%; text-align: center;">Độ khó</th>
              <th style="width: 10%; text-align: center;">Dạng câu</th>
              <th style="width: 6%; text-align: center;">Điểm</th>
            </tr>
          </thead>
          <tbody>
            ${(function() {
              var metaList = exam.seaplmMetadataTable ? JSON.parse(JSON.stringify(exam.seaplmMetadataTable)) : [];
              if (!metaList || metaList.length === 0) {
                var order = 1;
                (exam.readingExam?.questions || []).forEach(function(q) {
                  metaList.push({
                    itemCode: q.itemCode || `TV${exam.grade}_RD_${String(q.num).padStart(2, '0')}`,
                    order: order++,
                    context: q.metadata?.context || "Môi trường xung quanh (Local community)",
                    contentDomain: q.metadata?.contentDomain || (q.category === 'lang' ? 'Luyện từ và câu' : 'Đọc hiểu văn bản'),
                    cognitiveProcess: q.metadata?.cognitiveProcess || (q.level === 'Mức 1' ? 'Xác định thông tin (Locate)' : q.level === 'Mức 2' ? 'Kết nối & Suy luận (Interpret)' : 'Phản hồi & Đánh giá (Reflect)'),
                    difficulty: q.metadata?.difficulty || (q.level === 'Mức 1' ? 'Dễ' : q.level === 'Mức 2' ? 'Trung bình' : 'Khó'),
                    itemType: q.type === 'mcq' ? "Trắc nghiệm 4 lựa chọn (MCQ)" : "Tự luận ngắn (Constructed Response)",
                    score: q.score || 0.5
                  });
                });
                if (exam.writingExam?.paragraphWriting) {
                  metaList.push({
                    itemCode: `TV${exam.grade}_WR_01`,
                    order: order++,
                    context: "Cá nhân (Personal)",
                    contentDomain: "Kỹ năng Viết (Tập làm văn)",
                    cognitiveProcess: "Vận dụng thực hành (Writing)",
                    difficulty: "Trung bình",
                    itemType: "Tự luận viết đoạn",
                    score: exam.writingExam.paragraphWriting.score || 6.0
                  });
                } else if (exam.writingExam?.essay) {
                  metaList.push({
                    itemCode: `TV${exam.grade}_WR_01`,
                    order: order++,
                    context: "Môi trường xung quanh (Local community)",
                    contentDomain: "Kỹ năng Viết (Tập làm văn)",
                    cognitiveProcess: "Vận dụng thực hành (Writing)",
                    difficulty: "Khó",
                    itemType: "Tự luận bài văn hoàn chỉnh",
                    score: 10.0
                  });
                }
              }
              return metaList.map(function(item) {
                return `
                  <tr>
                    <td style="font-weight: bold; text-align: center;">${item.itemCode || '-'}</td>
                    <td style="text-align: center;">Câu ${item.order || '-'}</td>
                    <td>${item.context || '-'}</td>
                    <td>${item.contentDomain || '-'}</td>
                    <td>${item.cognitiveProcess || '-'}</td>
                    <td style="text-align: center;">${item.difficulty || '-'}</td>
                    <td style="text-align: center;">${item.itemType || '-'}</td>
                    <td style="text-align: center; font-weight: bold;">${item.score ? item.score.toString().replace('.', ',') : '-'}</td>
                  </tr>
                `;
              }).join('');
            })()}
          </tbody>
        </table>

        <!-- 2. PHÂN TÍCH CƠ SỞ PHƯƠNG ÁN ĐÚNG VÀ PHƯƠNG ÁN NHIỄU -->
        <div class="section-heading" style="margin-top: 16px;">2. PHÂN TÍCH CƠ SỞ PHƯƠNG ÁN ĐÚNG VÀ PHƯƠNG ÁN NHIỄU (DISTRACTOR RATIONALE)</div>
        <table class="matrix-table" style="text-align: left; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2; font-weight: bold;">
              <th style="width: 10%; text-align: center;">Câu</th>
              <th style="width: 8%; text-align: center;">Đáp án</th>
              <th style="width: 40%; text-align: center;">Cơ sở phương án đúng</th>
              <th style="width: 42%; text-align: center;">Phân tích các phương án nhiễu & Lỗi suy luận của học sinh</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.readingExam?.questions || []).filter(function(q) { return q.type === 'mcq' || (q.options && q.options.length > 0); }).map(function(q) {
              var dr = q.distractorRationale || {};
              var correctText = dr.correct || q.explain || `Phương án ${q.ans} là chính xác.`;
              var distText = [];
              ['A', 'B', 'C', 'D'].forEach(function(opt) {
                if (opt !== q.ans) {
                  var reason = dr['distractor' + opt] || dr[opt];
                  if (reason) {
                    distText.push(`<b>Lựa chọn ${opt}:</b> ${reason}`);
                  }
                }
              });
              if (distText.length === 0) {
                distText.push(`<b>Các lựa chọn còn lại:</b> Học sinh chọn nhầm do đọc lướt, hiểu sai chi tiết trong bài hoặc nhầm khái niệm từ ngữ.`);
              }
              return `
                <tr>
                  <td style="text-align: center; font-weight: bold; vertical-align: top;">Câu ${q.num}</td>
                  <td style="text-align: center; font-weight: bold; color: #b91c1c; vertical-align: top; font-size: 12pt;">${q.ans}</td>
                  <td style="vertical-align: top; color: #15803d;">${correctText}</td>
                  <td style="vertical-align: top; color: #475569;">${distText.join('<br>')}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- 3. HƯỚNG DẪN MÃ HÓA CHI TIẾT (CODING GUIDE) THEO CHUẨN SEA-PLM -->
        <div class="section-heading" style="margin-top: 16px;">3. HƯỚNG DẪN MÃ HÓA CHI TIẾT (CODING GUIDE) THEO CHUẨN SEA-PLM</div>
        
        <!-- Câu tự luận đọc hiểu (nếu có) -->
        ${(exam.readingExam?.questions || []).filter(function(q) { return q.type === 'constructed' || q.codingGuide; }).map(function(q) {
          var cg = q.codingGuide || {
            maxCode: "Mã 2",
            codes: [
              { code: "Mã 2", description: "Mức tối đa: Trả lời chính xác, trọn vẹn ý và câu văn gãy gọn.", sampleResponse: q.explain || "Học sinh trả lời đầy đủ ý." },
              { code: "Mã 1", description: "Mức chưa tối đa: Trả lời đúng ý chính nhưng diễn đạt chưa trọn vẹn hoặc sai chính tả.", sampleResponse: "Học sinh trả lời được một phần ý." },
              { code: "Mã 0", description: "Mức không đạt: Trả lời sai hoàn toàn hoặc không liên quan.", sampleResponse: "Trả lời lạc đề hoặc vô nghĩa." },
              { code: "Mã 9", description: "Bỏ trống không làm bài.", sampleResponse: "[Học sinh để giấy trắng]" }
            ]
          };
          return `
            <div style="margin-bottom: 14px;">
              <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 4px;">
                Câu ${q.num} (Tự luận Đọc hiểu): ${q.text}
              </div>
              <table class="matrix-table" style="text-align: left;">
                <thead>
                  <tr style="background-color: #f2f2f2; font-weight: bold;">
                    <th style="width: 12%; text-align: center;">Mã hóa</th>
                    <th style="width: 48%; text-align: center;">Tiêu chí đánh giá</th>
                    <th style="width: 40%; text-align: center;">Ví dụ bài làm mẫu của học sinh (Sample Response)</th>
                  </tr>
                </thead>
                <tbody>
                  ${(cg.codes || []).map(function(c) {
                    var badgeColor = c.code === 'Mã 2' ? '#15803d' : c.code === 'Mã 1' ? '#0369a1' : c.code === 'Mã 0' ? '#b91c1c' : '#64748b';
                    return `
                      <tr>
                        <td style="text-align: center; vertical-align: top; font-weight: bold; color: ${badgeColor};">
                          ${c.code}
                        </td>
                        <td style="vertical-align: top;">${c.description}</td>
                        <td style="vertical-align: top; font-style: italic; color: #334155;">${c.sampleResponse || '-'}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `;
        }).join('')}

        <!-- Phần Tập làm văn -->
        ${(function() {
          var wrItem = exam.writingExam?.paragraphWriting || exam.writingExam?.essay;
          if (!wrItem) return '';
          var cg = wrItem.codingGuide || {
            maxCode: "Mã 2",
            codes: [
              { code: "Mã 2", description: "Mức tối đa: Bài viết đúng thể loại, đủ bố cục, diễn đạt sinh động, giàu cảm xúc, đúng chính tả ngữ pháp.", sampleResponse: "Học sinh viết thành văn mạch lạc, đúng yêu cầu đề bài." },
              { code: "Mã 1", description: "Mức chưa tối đa: Bài viết đúng thể loại nhưng miêu tả/kể sơ sài hoặc mắc một số lỗi ngữ pháp, chính tả.", sampleResponse: "Học sinh viết được bài nhưng ý còn đơn giản, câu chưa mượt mà." },
              { code: "Mã 0", description: "Mức không đạt: Lạc đề hoàn toàn hoặc chỉ viết được vài câu rời rạc.", sampleResponse: "Chỉ viết 1-2 câu không liên quan hoặc lạc sang chủ đề khác." },
              { code: "Mã 9", description: "Bỏ trống không làm bài.", sampleResponse: "[Học sinh để giấy trắng]" }
            ]
          };
          return `
            <div style="margin-bottom: 14px;">
              <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 4px;">
                Phần Tập làm văn (${exam.grade <= 3 ? 'Viết đoạn văn' : 'Bài văn hoàn chỉnh'}): ${wrItem.prompt || 'Yêu cầu đề bài'}
              </div>
              <table class="matrix-table" style="text-align: left;">
                <thead>
                  <tr style="background-color: #f2f2f2; font-weight: bold;">
                    <th style="width: 12%; text-align: center;">Mã hóa</th>
                    <th style="width: 48%; text-align: center;">Tiêu chí đánh giá</th>
                    <th style="width: 40%; text-align: center;">Ví dụ bài làm mẫu của học sinh (Sample Response)</th>
                  </tr>
                </thead>
                <tbody>
                  ${(cg.codes || []).map(function(c) {
                    var badgeColor = c.code === 'Mã 2' ? '#15803d' : c.code === 'Mã 1' ? '#0369a1' : c.code === 'Mã 0' ? '#b91c1c' : '#64748b';
                    return `
                      <tr>
                        <td style="text-align: center; vertical-align: top; font-weight: bold; color: ${badgeColor};">
                          ${c.code}
                        </td>
                        <td style="vertical-align: top;">${c.description}</td>
                        <td style="vertical-align: top; font-style: italic; color: #334155;">${c.sampleResponse || '-'}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `;
        })()}

        </div>
      </body>
      </html>
    `;

    var sLower = (exam.bookSeries || 'kntt').toLowerCase();
    var seriesSlug = (sLower.includes("chân trời") || sLower === 'ctst') ? "CTST" : "KNTT";
    var termSlug = (examTerm || 'HK1').replace(/\s+/g, '_');
    var fn = `De_Kiem_Tra_${termSlug}_Tieng_Viet_Lop_${exam.grade}_${seriesSlug}_2026_2027.docx`;
    await this.downloadWordBlob(docHtml, fn);
    return docHtml;
  },

  downloadWordBlob: async function(docHtml, filename) {
    if (typeof IntegrationService !== 'undefined' && IntegrationService.downloadWordBlob) {
      return await IntegrationService.downloadWordBlob(docHtml, filename);
    }
    if (typeof document === "undefined" || typeof Blob === "undefined") {
      return { success: false };
    }
    var finalFilename = filename || 'De_Kiem_Tra.docx';
    var jszipObj = (typeof JSZip !== 'undefined') ? JSZip : ((typeof window !== 'undefined' && window.JSZip) ? window.JSZip : null);
    var blob = null;
    var isDocx = false;

    if (jszipObj) {
      try {
        var zip = new jszipObj();
        zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n' +
          '  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>\n' +
          '</Relationships>');
        zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n' +
          '  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n' +
          '  <Default Extension="xml" ContentType="application/xml"/>\n' +
          '  <Default Extension="html" ContentType="text/html"/>\n' +
          '  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>\n' +
          '  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>\n' +
          '  <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>\n' +
          '</Types>');
        zip.file('word/_rels/document.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n' +
          '  <Relationship Id="htmlChunk" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk" Target="content.html"/>\n' +
          '  <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>\n' +
          '  <Relationship Id="rIdFontTable" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>\n' +
          '</Relationships>');
        var stylesXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n' +
          '  <w:docDefaults>\n' +
          '    <w:rPrDefault>\n' +
          '      <w:rPr>\n' +
          '        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/>\n' +
          '        <w:sz w:val="26"/>\n' +
          '        <w:szCs w:val="26"/>\n' +
          '        <w:lang w:val="vi-VN"/>\n' +
          '      </w:rPr>\n' +
          '    </w:rPrDefault>\n' +
          '    <w:pPrDefault>\n' +
          '      <w:pPr>\n' +
          '        <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>\n' +
          '      </w:pPr>\n' +
          '    </w:pPrDefault>\n' +
          '  </w:docDefaults>\n' +
          '  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">\n' +
          '    <w:name w:val="Normal"/>\n' +
          '    <w:qFormat/>\n' +
          '    <w:rPr>\n' +
          '      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/>\n' +
          '      <w:sz w:val="26"/>\n' +
          '      <w:szCs w:val="26"/>\n' +
          '    </w:rPr>\n' +
          '  </w:style>\n' +
          '  <w:style w:type="table" w:default="1" w:styleId="TableNormal">\n' +
          '    <w:name w:val="Normal Table"/>\n' +
          '    <w:uiPriority w:val="99"/>\n' +
          '    <w:semiHidden/>\n' +
          '    <w:unhideWhenUsed/>\n' +
          '    <w:rPr>\n' +
          '      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/>\n' +
          '      <w:sz w:val="26"/>\n' +
          '      <w:szCs w:val="26"/>\n' +
          '    </w:rPr>\n' +
          '    <w:tblPr/>\n' +
          '  </w:style>\n' +
          '  <w:style w:type="table" w:styleId="TableGrid">\n' +
          '    <w:name w:val="Table Grid"/>\n' +
          '    <w:basedOn w:val="TableNormal"/>\n' +
          '    <w:uiPriority w:val="39"/>\n' +
          '    <w:rPr>\n' +
          '      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman" w:cs="Times New Roman"/>\n' +
          '      <w:sz w:val="26"/>\n' +
          '      <w:szCs w:val="26"/>\n' +
          '    </w:rPr>\n' +
          '  </w:style>\n' +
          '</w:styles>';
        zip.file('word/styles.xml', stylesXml);
        var fontTableXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<w:fonts xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\n' +
          '  <w:font w:name="Times New Roman">\n' +
          '    <w:panose1 w:val="02020603050405020304"/>\n' +
          '    <w:charset w:val="00"/>\n' +
          '    <w:family w:val="roman"/>\n' +
          '    <w:pitch w:val="variable"/>\n' +
          '    <w:sig w:usb0="E0002EFF" w:usb1="C000785B" w:usb2="00000009" w:usb3="00000000" w:csb0="000001FF" w:csb1="00000000"/>\n' +
          '  </w:font>\n' +
          '</w:fonts>';
        zip.file('word/fontTable.xml', fontTableXml);
        zip.file('word/document.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n' +
          '  <w:body>\n' +
          '    <w:altChunk r:id="htmlChunk"/>\n' +
          '    <w:sectPr>\n' +
          '      <w:pgSz w:w="11906" w:h="16838"/>\n' +
          '      <w:pgMar w:top="1134" w:right="851" w:bottom="1134" w:left="1701" w:header="720" w:footer="720" w:gutter="0"/>\n' +
          '    </w:sectPr>\n' +
          '  </w:body>\n' +
          '</w:document>');
        var cleanDocHtml = (docHtml || '').replace(/text-justify\s*:\s*inter-ideograph\s*;?/gi, '');
        if (cleanDocHtml.indexOf('<img') !== -1) {
          cleanDocHtml = cleanDocHtml.replace(/<img\b([^>]*)>/gi, function(fullTag, attrs) {
            var newAttrs = attrs;
            if (!/\bwidth\s*=/i.test(newAttrs)) {
              newAttrs = ' width="306"' + newAttrs;
            } else {
              newAttrs = newAttrs.replace(/\bwidth\s*=\s*["']?(\d+)["']?/i, function(m, w) {
                return (parseInt(w) > 350) ? 'width="306"' : m;
              });
            }
            if (/\bstyle\s*=\s*["']([^"']*)["']/i.test(newAttrs)) {
              newAttrs = newAttrs.replace(/\bstyle\s*=\s*["']([^"']*)["']/i, function(m, s) {
                var cleanStyle = s.replace(/(?:^|;)\s*(?:max-|min-)?width\s*:\s*[^;]+/gi, '').replace(/^;\s*/, '').trim();
                return 'style="width: 229.5pt; max-width: 100%; height: auto; display: block; margin: 4pt auto; ' + cleanStyle + '"';
              });
            } else {
              newAttrs += ' style="width: 229.5pt; max-width: 100%; height: auto; display: block; margin: 4pt auto;"';
            }
            return '<img' + newAttrs + '>';
          });
        }
        var fullHtml = cleanDocHtml.includes('<meta charset=') ? cleanDocHtml : ('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' + cleanDocHtml + '</body></html>');
        zip.file('word/content.html', '\ufeff' + fullHtml);

        blob = await zip.generateAsync({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        });
        isDocx = true;
      } catch (e) {
        console.warn('Lỗi tạo .docx qua JSZip trong AIService:', e);
      }
    }

    if (isDocx) {
      if (finalFilename.toLowerCase().endsWith('.doc')) {
        finalFilename = finalFilename.slice(0, -4) + '.docx';
      } else if (!finalFilename.toLowerCase().endsWith('.docx')) {
        finalFilename += '.docx';
      }
    } else {
      // Fallback khi không có JSZip: lưu file .doc (Word 97-2003 HTML) mở êm đềm không bao giờ báo lỗi
      if (finalFilename.toLowerCase().endsWith('.docx')) {
        finalFilename = finalFilename.slice(0, -5) + '.doc';
      } else if (!finalFilename.toLowerCase().endsWith('.doc')) {
        finalFilename += '.doc';
      }
      blob = new Blob(['\ufeff' + docHtml], { type: "application/msword;charset=utf-8" });
    }

    // 1. Mở Hộp thoại Lưu File (Save As) của hệ điều hành
    if (typeof window !== "undefined" && typeof window.showSaveFilePicker === "function") {
      try {
        var pickerOpts = isDocx ? {
          suggestedName: finalFilename,
          types: [{
            description: "Tài liệu Microsoft Word (.docx)",
            accept: { "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"] }
          }]
        } : {
          suggestedName: finalFilename,
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
      window.navigator.msSaveOrOpenBlob(blob, finalFilename);
      if (typeof showToast === "function") {
        showToast("Đã lưu tệp Word thành công!", "success");
      }
      return { success: true, method: "msSave" };
    }

    // 3. Chuẩn HTML5 download qua thẻ <a>
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = finalFilename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      if (a.parentNode) a.parentNode.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);

    if (typeof showToast === "function") {
      showToast("Đã xuất file Word! Tệp đã lưu trong máy tính.", "success");
    }
    return { success: true, method: "direct" };
  }
};

if (typeof window !== 'undefined') {
  window.AIExportWord = AIExportWord;
  if (window.AIService) {
    Object.assign(window.AIService, AIExportWord);
  }
}
if (typeof global !== 'undefined') {
  global.AIExportWord = AIExportWord;
  if (global.AIService) {
    Object.assign(global.AIService, AIExportWord);
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIExportWord;
}
