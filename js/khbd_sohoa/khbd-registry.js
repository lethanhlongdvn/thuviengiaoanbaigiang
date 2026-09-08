/**
 * KHBD REGISTRY & LOADER (KHO KẾ HOẠCH BÀI DẠY SỐ HÓA TOÀN DIỆN - KHỐI 1 ĐẾN 5)
 * Bộ sách chuẩn: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * Quy chuẩn: Công văn 2345/BGDĐT-GDTH (Mục I. YCCĐ, Mục II. Đồ dùng, Mục III. Hoạt động GV-HS)
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var KHBD_DATA = {
  db: {},

  registerSubject: function(grade, subjectId, subjectName, weeksData) {
    var key = grade + '_' + (subjectId || '').toLowerCase();
    this.db[key] = {
      grade: parseInt(grade),
      subjectId: (subjectId || '').toLowerCase(),
      subjectName: subjectName,
      weeks: weeksData || {}
    };
  },

  getWeekPlan: function(grade, subjectId, week) {
    var key = grade + '_' + (subjectId || '').toLowerCase();
    var subject = this.db[key];
    if (!subject || !subject.weeks) return null;
    return subject.weeks[parseInt(week)] || null;
  },

  getWeekRangePlan: function(grade, subjectId, startWeek, endWeek) {
    var key = grade + '_' + (subjectId || '').toLowerCase();
    var subject = this.db[key];
    if (!subject || !subject.weeks) return [];

    var list = [];
    var start = parseInt(startWeek) || 1;
    var end = parseInt(endWeek) || start;

    for (var w = start; w <= end; w++) {
      var wData = subject.weeks[w];
      if (wData && wData.lessons) {
        list.push({
          week: w,
          sourceFile: wData.sourceFile,
          lessons: wData.lessons
        });
      }
    }
    return list;
  },

  renderLessonPreviewHtml: function(lesson, weekNum, highlightIntegration) {
    if (!lesson) return '<p>Không tìm thấy nội dung giáo án bài học.</p>';

    var yccdHtml = (lesson.yccd || []).map(function(line) {
      var isTichHop = line.indexOf('[Tích hợp') !== -1 || line.indexOf('[GDĐP') !== -1 || line.indexOf('[GDQCN') !== -1 || line.indexOf('[AI') !== -1;
      if (isTichHop && highlightIntegration) {
        return '<p style="background: #f3e8ff; color: #6b21a8; font-weight: 700; padding: 0.2rem 0.4rem; border-radius: 4px; border-left: 3px solid #9333ea; margin-bottom: 0.25rem;"><i class="fa-solid fa-puzzle-piece"></i> ' + line + '</p>';
      }
      return '<p style="margin-bottom: 0.25rem;">' + line + '</p>';
    }).join('');

    var dodungHtml = (lesson.dodung || []).map(function(line) {
      var isTichHop = line.indexOf('[Tích hợp') !== -1 || line.indexOf('[GDĐP') !== -1 || line.indexOf('[GDQCN') !== -1 || line.indexOf('[AI') !== -1;
      if (isTichHop && highlightIntegration) {
        return '<p style="background: #eff6ff; color: #1e40af; font-weight: 700; padding: 0.2rem 0.4rem; border-radius: 4px; border-left: 3px solid #3b82f6; margin-bottom: 0.25rem;"><i class="fa-solid fa-laptop-code"></i> ' + line + '</p>';
      }
      return '<p style="margin-bottom: 0.25rem;">' + line + '</p>';
    }).join('');

    var tableHtml = '';
    if (lesson.tables && lesson.tables.length > 0) {
      var rows = lesson.tables[0];
      tableHtml = '<table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 11pt;" border="1" bordercolor="#94a3b8"><thead><tr style="background: #f1f5f9; font-weight: 800; text-align: center;"><th style="padding: 0.45rem; width: 50%;">Hoạt động của giáo viên</th><th style="padding: 0.45rem; width: 50%;">Hoạt động của học sinh</th></tr></thead><tbody>';
      rows.forEach(function(r) {
        if (r.length >= 2) {
          var isHeaderRow = r[0].indexOf('Khởi động') !== -1 || r[0].indexOf('Khám phá') !== -1 || r[0].indexOf('Luyện tập') !== -1 || r[0].indexOf('Vận dụng') !== -1;
          var gvText = r[0].replace(/\n/g, '<br/>');
          var hsText = r[1].replace(/\n/g, '<br/>');
          var isTichHopRow = gvText.indexOf('[Tích hợp') !== -1 || gvText.indexOf('[GDĐP') !== -1 || hsText.indexOf('[Tích hợp') !== -1;
          var bgStyle = isTichHopRow && highlightIntegration ? 'background: #faf5ff; border-left: 3px solid #a855f7;' : (isHeaderRow ? 'background: #f8fafc; font-weight: 700;' : '');
          tableHtml += '<tr style="' + bgStyle + '"><td style="padding: 0.4rem; vertical-align: top;">' + gvText + '</td><td style="padding: 0.4rem; vertical-align: top;">' + hsText + '</td></tr>';
        } else if (r.length === 1) {
          tableHtml += '<tr style="background: #f8fafc; font-weight: 700;"><td colspan="2" style="padding: 0.4rem;">' + r[0] + '</td></tr>';
        }
      });
      tableHtml += '</tbody></table>';
    }

    return '<div class="lesson-plan-preview" style="font-family: Times New Roman, serif; font-size: 12pt; line-height: 1.45; color: #000; background: #fff; padding: 1.25rem; border: 1px solid #cbd5e1; border-radius: 4px;">' +
      '<div style="text-align: center; margin-bottom: 1rem;"><h3 style="font-size: 14pt; font-weight: 800; margin: 0; text-transform: uppercase;">' + (lesson.lessonTitle || 'KẾ HOẠCH BÀI DẠY') + '</h3>' +
      (lesson.topic ? '<p style="font-weight: 700; font-size: 12pt; margin: 0.25rem 0 0 0; color: #1e3a8a;">' + lesson.topic + '</p>' : '') +
      (weekNum ? '<p style="font-style: italic; margin: 0.15rem 0 0 0; color: #475569;">(Tuần ' + weekNum + ')</p>' : '') +
      '</div>' +
      '<div style="margin-bottom: 0.85rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">I. YÊU CẦU CẦN ĐẠT</h4>' + (yccdHtml || '<p style="font-style: italic; color: #64748b;">(Đang cập nhật mục tiêu YCCĐ)</p>') + '</div>' +
      '<div style="margin-bottom: 0.85rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">II. ĐỒ DÙNG DẠY HỌC</h4>' + (dodungHtml || '<p style="font-style: italic; color: #64748b;">(Đang cập nhật đồ dùng dạy học)</p>') + '</div>' +
      '<div style="margin-bottom: 0.85rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU</h4>' + (tableHtml || '<p style="font-style: italic; color: #64748b;">(Đang cập nhật tiến trình hoạt động dạy học)</p>') + '</div>' +
      '<div style="margin-bottom: 0.5rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ)</h4><p style="font-style: italic; color: #64748b; margin: 0;">....................................................................................................................................................</p></div>' +
      '</div>';
  }
};

if (typeof window !== 'undefined') {
  window.KHBD_DATA = KHBD_DATA;
}
