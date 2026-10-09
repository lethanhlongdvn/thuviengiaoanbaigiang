/**
 * KHBD REGISTRY & LOADER (KHO KẾ HOẠCH BÀI DẠY SỐ HÓA TOÀN DIỆN - KHỐI 1 ĐẾN 5)
 * Bộ sách chuẩn: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * Quy chuẩn: Công văn 2345/BGDĐT-GDTH (Mục I. YCCĐ, Mục II. Đồ dùng, Mục III. Hoạt động GV-HS)
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var KHBD_DATA = {
  db: {},

  isLoaded: function(grade, subjectId) {
    var key = grade + '_' + (subjectId || '').toLowerCase();
    return !!(this.db && this.db[key] && this.db[key].weeks);
  },

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

  renderLessonPreviewHtml: function(lesson, weekNum, highlightIntegration, subjectName) {
    if (!lesson) return '<p>Không tìm thấy nội dung giáo án bài học.</p>';

    var isEnLesson = false;
    if (typeof IntegrationService !== 'undefined' && IntegrationService.isEnglishLesson) {
      isEnLesson = IntegrationService.isEnglishLesson(lesson, subjectName);
    } else {
      var s = ((subjectName || '') + ' ' + (lesson && (lesson.subjectKey || lesson.subjectName || ''))).toLowerCase();
      isEnLesson = s.includes('tieng_anh') || s.includes('tiếng anh') || s.includes('english') || (lesson && /unit\s+\d+|starter\b/i.test(lesson.lessonTitle || ''));
    }

    var yccdHtml = (lesson.yccd || []).map(function(line) {
      if (!line || typeof line !== 'string') return '';
      var clean = line.trim();
      if (isEnLesson) {
        if (typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
          clean = IntegrationService.translateVnToEnglish(clean);
        }
        if (/^\s*(?:A\.|I\.)\s*OBJECTIVES\s*[:.-]?\s*$/i.test(clean)) return '';
      }
      var isTichHop = clean.indexOf('[Tích hợp') !== -1 || clean.indexOf('[GDĐP') !== -1 || clean.indexOf('[GDQCN') !== -1 || clean.indexOf('[AI') !== -1 || clean.indexOf('[Integration') !== -1;
      if (isTichHop && highlightIntegration) {
        return '<p style="background: #f3e8ff; color: #6b21a8; font-weight: 700; padding: 0.2rem 0.4rem; border-radius: 4px; border-left: 3px solid #9333ea; margin-bottom: 0.25rem;"><i class="fa-solid fa-puzzle-piece"></i> ' + clean + '</p>';
      }
      return '<p style="margin-bottom: 0.25rem;">' + clean + '</p>';
    }).filter(Boolean).join('');

    var dodungHtml = (lesson.dodung || []).map(function(line) {
      if (!line || typeof line !== 'string') return '';
      var clean = line.trim();
      if (isEnLesson) {
        if (typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
          clean = IntegrationService.translateVnToEnglish(clean);
        }
        if (/^\s*(?:B\.|II\.)\s*TEACHING\s*AIDS?\s*[:.-]?\s*$/i.test(clean)) return '';
      }
      var isTichHop = clean.indexOf('[Tích hợp') !== -1 || clean.indexOf('[GDĐP') !== -1 || clean.indexOf('[GDQCN') !== -1 || clean.indexOf('[AI') !== -1 || clean.indexOf('[Integration') !== -1;
      if (isTichHop && highlightIntegration) {
        return '<p style="background: #eff6ff; color: #1e40af; font-weight: 700; padding: 0.2rem 0.4rem; border-radius: 4px; border-left: 3px solid #3b82f6; margin-bottom: 0.25rem;"><i class="fa-solid fa-laptop-code"></i> ' + clean + '</p>';
      }
      return '<p style="margin-bottom: 0.25rem;">' + clean + '</p>';
    }).filter(Boolean).join('');

    var tableHtml = '';
    if (lesson.tables && lesson.tables.length > 0) {
      lesson.tables.forEach(function(rows) {
        if (!rows || rows.length === 0) return;
        var has4Cols = rows.some(function(r) { return Array.isArray(r) && r.length === 4; });
        if (has4Cols) {
          var th0 = isEnLesson ? 'Content' : 'Nội dung';
          var th1 = isEnLesson ? 'Timing' : 'Định lượng';
          var th2 = isEnLesson ? "Teacher's Activities" : 'Hoạt động của giáo viên';
          var th3 = isEnLesson ? "Students' Activities" : 'Hoạt động của học sinh';
          tableHtml += '<table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; margin-bottom: 0.8rem; font-size: 11pt;" border="1" bordercolor="#94a3b8"><thead><tr style="background: #f1f5f9; font-weight: 800; text-align: center;"><th style="padding: 0.45rem; width: 30%;">' + th0 + '</th><th style="padding: 0.45rem; width: 15%;">' + th1 + '</th><th style="padding: 0.45rem; width: 30%;">' + th2 + '</th><th style="padding: 0.45rem; width: 25%;">' + th3 + '</th></tr></thead><tbody>';
          rows.forEach(function(r, rIdx) {
            if (rIdx === 0 && Array.isArray(r) && (/content|nội dung/i.test(r[0] || '') || /teacher|giáo viên/i.test(r[2] || ''))) return;
            if (r.length >= 4) {
              var isHeaderRow = r[0].indexOf('Khởi động') !== -1 || r[0].indexOf('Khám phá') !== -1 || r[0].indexOf('Luyện tập') !== -1 || r[0].indexOf('Vận dụng') !== -1 || /warm-up|presentation|practice|production/i.test(r[0]);
              var c0 = r[0].replace(/\n/g, '<br/>');
              var c1 = r[1].replace(/\n/g, '<br/>');
              var c2 = r[2].replace(/\n/g, '<br/>');
              var c3 = r[3].replace(/\n/g, '<br/>');
              if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
                c0 = IntegrationService.translateVnToEnglish(c0);
                c1 = IntegrationService.translateVnToEnglish(c1);
                c2 = IntegrationService.translateVnToEnglish(c2);
                c3 = IntegrationService.translateVnToEnglish(c3);
              }
              var isTichHopRow = c0.indexOf('[Tích hợp') !== -1 || c2.indexOf('[Tích hợp') !== -1 || c3.indexOf('[Tích hợp') !== -1 || c0.indexOf('[Integration') !== -1;
              var isDisabilityRow = /\bHSHN\b|\bSEN\b|học\s*sinh\s*(?:hòa\s*nhập|khuyết\s*tật)|inclusive\s*student/i.test(c0 + ' ' + c2 + ' ' + c3);
              var isRed = isTichHopRow || isDisabilityRow;
              var textStyle = isRed ? 'color: #c00000; font-weight: 500;' : '';
              var bgStyle = isRed && highlightIntegration ? 'background: #faf5ff; border-left: 3px solid #a855f7;' : (isHeaderRow ? 'background: #f8fafc; font-weight: 700;' : '');
              tableHtml += '<tr style="' + bgStyle + textStyle + '"><td style="padding: 0.4rem; vertical-align: top; ' + textStyle + '">' + c0 + '</td><td style="padding: 0.4rem; vertical-align: top; text-align: center; ' + textStyle + '">' + c1 + '</td><td style="padding: 0.4rem; vertical-align: top; ' + textStyle + '">' + c2 + '</td><td style="padding: 0.4rem; vertical-align: top; ' + textStyle + '">' + c3 + '</td></tr>';
            } else if (r.length === 1) {
              var hText = r[0].replace(/\n/g, '<br/>');
              if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
                hText = IntegrationService.translateVnToEnglish(hText);
              }
              tableHtml += '<tr style="background: #f8fafc; font-weight: 700;"><td colspan="4" style="padding: 0.4rem;">' + hText + '</td></tr>';
            } else if (r.length === 2) {
              var c0 = r[0].replace(/\n/g, '<br/>');
              var c1 = r[1].replace(/\n/g, '<br/>');
              if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
                c0 = IntegrationService.translateVnToEnglish(c0);
                c1 = IntegrationService.translateVnToEnglish(c1);
              }
              tableHtml += '<tr style="background: #f8fafc; font-weight: 700;"><td colspan="2" style="padding: 0.4rem;">' + c0 + '</td><td colspan="2" style="padding: 0.4rem;">' + c1 + '</td></tr>';
            }
          });
          tableHtml += '</tbody></table>';
        } else {
          var th0 = isEnLesson ? "Teacher's Activities" : 'Hoạt động của giáo viên';
          var th1 = isEnLesson ? "Students' Activities" : 'Hoạt động của học sinh';
          tableHtml += '<table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; margin-bottom: 0.8rem; font-size: 11pt;" border="1" bordercolor="#94a3b8"><thead><tr style="background: #f1f5f9; font-weight: 800; text-align: center;"><th style="padding: 0.45rem; width: 50%;">' + th0 + '</th><th style="padding: 0.45rem; width: 50%;">' + th1 + '</th></tr></thead><tbody>';
          rows.forEach(function(r, rIdx) {
            if (rIdx === 0 && Array.isArray(r) && r.length >= 2 && /teacher|giáo viên/i.test(r[0]) && /student|pupil|học sinh/i.test(r[1])) return;
            if (r.length >= 2) {
              var isHeaderRow = r[0].indexOf('Khởi động') !== -1 || r[0].indexOf('Khám phá') !== -1 || r[0].indexOf('Luyện tập') !== -1 || r[0].indexOf('Vận dụng') !== -1 || /warm-up|presentation|practice|production/i.test(r[0]);
              var gvText = r[0].replace(/\n/g, '<br/>');
              var hsText = r[1].replace(/\n/g, '<br/>');
              if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
                gvText = IntegrationService.translateVnToEnglish(gvText);
                hsText = IntegrationService.translateVnToEnglish(hsText);
              }
              var isTichHopRow = gvText.indexOf('[Tích hợp') !== -1 || gvText.indexOf('[GDĐP') !== -1 || hsText.indexOf('[Tích hợp') !== -1 || gvText.indexOf('[Integration') !== -1;
              var isDisabilityRow = /\bHSHN\b|\bSEN\b|học\s*sinh\s*(?:hòa\s*nhập|khuyết\s*tật)|inclusive\s*student/i.test(gvText + ' ' + hsText);
              var isRed = isTichHopRow || isDisabilityRow;
              var textStyle = isRed ? 'color: #c00000; font-weight: 500;' : '';
              var bgStyle = isRed && highlightIntegration ? 'background: #faf5ff; border-left: 3px solid #a855f7;' : (isHeaderRow ? 'background: #f8fafc; font-weight: 700;' : '');
              tableHtml += '<tr style="' + bgStyle + textStyle + '"><td style="padding: 0.4rem; vertical-align: top; ' + textStyle + '">' + gvText + '</td><td style="padding: 0.4rem; vertical-align: top; ' + textStyle + '">' + hsText + '</td></tr>';
            } else if (r.length === 1) {
              var hText = r[0].replace(/\n/g, '<br/>');
              if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
                hText = IntegrationService.translateVnToEnglish(hText);
              }
              tableHtml += '<tr style="background: #f8fafc; font-weight: 700;"><td colspan="2" style="padding: 0.4rem;">' + hText + '</td></tr>';
            }
          });
          tableHtml += '</tbody></table>';
        }
      });
    }

    var actHtml = '';
    if (lesson.activities && lesson.activities.length > 0) {
      actHtml = lesson.activities.map(function(act) {
        var cleanAct = act;
        if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
          cleanAct = IntegrationService.translateVnToEnglish(cleanAct);
        }
        return '<p style="margin-bottom: 0.35rem; font-weight: 600; color: #1e3a8a;">' + cleanAct + '</p>';
      }).join('');
    }

    var dieuchinhHtml = '';
    if (lesson.dieuchinh && lesson.dieuchinh.length > 0 && lesson.dieuchinh.some(function(dc) { return dc && !dc.includes('.....'); })) {
      dieuchinhHtml = lesson.dieuchinh.map(function(dc) {
        var cleanDc = dc;
        if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
          cleanDc = IntegrationService.translateVnToEnglish(cleanDc);
        }
        return '<p style="margin: 0.15rem 0; color: #475569;">' + cleanDc + '</p>';
      }).join('');
    } else {
      dieuchinhHtml = '<div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin: 4px 0;"></div><div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin: 4px 0;"></div>';
    }

    var rawTitle = lesson.lessonTitle || (isEnLesson ? 'LESSON PLAN' : 'KẾ HOẠCH BÀI DẠY');
    var cleanLessonTitle = (typeof IntegrationService !== 'undefined' && IntegrationService.cleanLessonTitle)
      ? IntegrationService.cleanLessonTitle(rawTitle, lesson, subjectName)
      : rawTitle
        .replace(/^TUẦN\s*:\s*\d+\s*[-–—:]\s*/i, '')
        .replace(/^TUẦN\s+\d+\s*[-–—:]\s*/i, '')
        .replace(/^Tuần\s*:\s*\d+\s*[-–—:]\s*/i, '')
        .replace(/^Tuần\s+\d+\s*[-–—:]\s*/i, '')
        .replace(/^(?:[.…\s_–—-]{3,}\s*[-–—:]*\s*)+/g, '')
        .replace(/^\s*\(\d+\s*tiết\)\s*[-–—\s]*/gi, '')
        .replace(/^MÔN:\s*[^–—-]+[-–—]\s*(?:LỚP\s*\d+\s*[-–—]\s*)?(?:BỘ SÁCH:[^–—-]+[-–—]\s*)?/i, '')
        .replace(/[\s\-–—•·]*[-–—]?\s*SỐ\s*TIẾT\s*:\s*\d+\s*(?:TIẾT)?/gi, ' ')
        .replace(/[\s\-–—•·]*[-–—]?\s*(?:Thời\s*gian|Ngày)\s*thực\s*hiện\s*:[^\-–—\(\)\n]*(?:đến[^\-–—\(\)\n]*)?/gi, ' ')
        .replace(/\s*\((?:Thời\s*gian|Ngày)\s*thực\s*hiện\s*:[^\)]*\)/gi, ' ')
        .replace(/[\s\-–—•·]*(?:Thời\s*gian|Ngày)\s*thực\s*hiện\s*:\s*[.\s_…/–\-]*(?:\(.*\))?/gi, ' ')
        .replace(/[-–—]?\s*[.…]{3,}\s*[-–—]?/g, ' ')
        .replace(/\s*[\-–—]+\s*[\-–—]+\s*/g, ' - ')
        .replace(/\s*[\-–—]+\s*$/g, '')
        .replace(/^\s*[\-–—]+\s*/g, '')
        .trim();

    if (isEnLesson && typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish) {
      cleanLessonTitle = IntegrationService.translateVnToEnglish(cleanLessonTitle);
    }

    if (!cleanLessonTitle || /^(?:TUẦN\s*\d+|TIẾT\s*\d+|BÀI\s*DẠY|LESSON\s*PLAN)$/i.test(cleanLessonTitle)) {
      if (lesson.topic) cleanLessonTitle = isEnLesson && typeof IntegrationService !== 'undefined' ? IntegrationService.translateVnToEnglish(lesson.topic) : lesson.topic;
      else if (lesson.period) cleanLessonTitle = isEnLesson ? ('LESSON (' + (typeof IntegrationService !== 'undefined' ? IntegrationService.translateVnToEnglish(String(lesson.period)) : lesson.period) + ')') : ('BÀI DẠY (' + lesson.period + ')');
    }

    var s1Header = isEnLesson ? 'A. OBJECTIVES' : 'I. YÊU CẦU CẦN ĐẠT';
    var s2Header = isEnLesson ? 'B. TEACHING AIDS' : 'II. ĐỒ DÙNG DẠY HỌC';
    var s3Header = isEnLesson ? 'C. PROCEDURES' : 'III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU';
    var s4Header = isEnLesson ? 'D. ADJUSTMENTS (IF ANY)' : 'IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ)';

    var s1Empty = isEnLesson ? '(Updating objectives)' : '(Đang cập nhật mục tiêu YCCĐ)';
    var s2Empty = isEnLesson ? '(Updating teaching aids)' : '(Đang cập nhật đồ dùng dạy học)';
    var s3Empty = isEnLesson ? '(Updating lesson procedures)' : '(Đang cập nhật tiến trình hoạt động dạy học)';
    var weekSub = weekNum ? (isEnLesson ? ('(Week ' + weekNum + ')') : ('(Tuần ' + weekNum + ')')) : '';

    return '<div class="lesson-plan-preview" style="font-family: Times New Roman, serif; font-size: 12pt; line-height: 1.45; color: #000; background: #fff; padding: 1.25rem; border: 1px solid #cbd5e1; border-radius: 4px;">' +
      '<div style="text-align: center; margin-bottom: 1rem;"><h3 style="font-size: 14pt; font-weight: 800; margin: 0; text-transform: uppercase;">' + (cleanLessonTitle || (isEnLesson ? 'LESSON PLAN' : 'KẾ HOẠCH BÀI DẠY')) + '</h3>' +
      (lesson.topic ? '<p style="font-weight: 700; font-size: 12pt; margin: 0.25rem 0 0 0; color: #1e3a8a;">' + (isEnLesson && typeof IntegrationService !== 'undefined' ? IntegrationService.translateVnToEnglish(lesson.topic) : lesson.topic) + '</p>' : '') +
      (weekSub ? '<p style="font-style: italic; margin: 0.15rem 0 0 0; color: #475569;">' + weekSub + '</p>' : '') +
      '</div>' +
      '<div style="margin-bottom: 0.85rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">' + s1Header + '</h4>' + (yccdHtml || ('<p style="font-style: italic; color: #64748b;">' + s1Empty + '</p>')) + '</div>' +
      '<div style="margin-bottom: 0.85rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">' + s2Header + '</h4>' + (dodungHtml || ('<p style="font-style: italic; color: #64748b;">' + s2Empty + '</p>')) + '</div>' +
      '<div style="margin-bottom: 0.85rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">' + s3Header + '</h4>' + actHtml + (tableHtml || ('<p style="font-style: italic; color: #64748b;">' + s3Empty + '</p>')) + '</div>' +
      '<div style="margin-bottom: 0.5rem;"><h4 style="font-size: 12.5pt; font-weight: 800; margin: 0 0 0.35rem 0; color: #991b1b;">' + s4Header + '</h4>' + dieuchinhHtml + '</div>' +
      '</div>';
  }
};

if (typeof window !== 'undefined') {
  window.KHBD_DATA = KHBD_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KHBD_DATA;
}
