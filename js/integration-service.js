/**
 * TRỢ LÝ AI TÍCH HỢP GIÁO ÁN TỰ ĐỘNG (CHUẨN CÔNG VĂN 2345/BGDĐT-GDTH)
 * Hệ thống số hóa Kế hoạch bài dạy 5 Khối lớp (Bộ sách Kết nối tri thức với cuộc sống)
 * Hỗ trợ 2 Chế độ:
 * 1. Xuất theo Từng Môn (Có hoặc Không tích hợp)
 * 2. Xuất theo Thời Khóa Biểu Tuần (Ghép tuần tự tất cả các môn, Có hoặc Không tích hợp)
 * Quản trị: Thầy Lê Thành Long
 */

var IntegrationService = {

  // =========================================================================
  // 1. MẪU THỜI KHÓA BIỂU CHUẨN CỦA BỘ GD&ĐT (CHO 5 KHỐI LỚP)
  // =========================================================================

  DEFAULT_TIMETABLES: {
    5: [
      { day: 'Thứ Hai', dayNum: 2, morning: ['hdtn', 'toan', 'tieng_viet', 'tieng_viet'], afternoon: ['khoa_hoc', 'lich_su_dia_ly', 'dao_duc'] },
      { day: 'Thứ Ba', dayNum: 3, morning: ['toan', 'tieng_viet', 'tieng_viet', 'khoa_hoc'], afternoon: ['cong_nghe', 'tieng_anh', 'gdtc'] },
      { day: 'Thứ Tư', dayNum: 4, morning: ['toan', 'tieng_viet', 'tieng_viet', 'lich_su_dia_ly'], afternoon: ['tin_hoc', 'am_nhac', 'mi_thuat'] },
      { day: 'Thứ Năm', dayNum: 5, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tieng_anh'], afternoon: ['dao_duc', 'toan', 'gdtc'] },
      { day: 'Thứ Sáu', dayNum: 6, morning: ['toan', 'tieng_viet', 'tieng_anh', 'cong_nghe'], afternoon: ['hdtn', 'tin_hoc', 'hdtn'] }
    ],
    4: [
      { day: 'Thứ Hai', dayNum: 2, morning: ['hdtn', 'toan', 'tieng_viet', 'tieng_viet'], afternoon: ['khoa_hoc', 'lich_su_dia_ly', 'dao_duc'] },
      { day: 'Thứ Ba', dayNum: 3, morning: ['toan', 'tieng_viet', 'tieng_viet', 'khoa_hoc'], afternoon: ['cong_nghe', 'tieng_anh', 'gdtc'] },
      { day: 'Thứ Tư', dayNum: 4, morning: ['toan', 'tieng_viet', 'tieng_viet', 'lich_su_dia_ly'], afternoon: ['tin_hoc', 'am_nhac', 'mi_thuat'] },
      { day: 'Thứ Năm', dayNum: 5, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tieng_anh'], afternoon: ['dao_duc', 'toan', 'gdtc'] },
      { day: 'Thứ Sáu', dayNum: 6, morning: ['toan', 'tieng_viet', 'tieng_anh', 'cong_nghe'], afternoon: ['hdtn', 'tin_hoc', 'hdtn'] }
    ],
    3: [
      { day: 'Thứ Hai', dayNum: 2, morning: ['hdtn', 'toan', 'tieng_viet', 'tieng_viet'], afternoon: ['tnxh', 'dao_duc', 'am_nhac'] },
      { day: 'Thứ Ba', dayNum: 3, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tnxh'], afternoon: ['cong_nghe', 'tieng_anh', 'gdtc'] },
      { day: 'Thứ Tư', dayNum: 4, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tin_hoc'], afternoon: ['mi_thuat', 'dao_duc', 'gdtc'] },
      { day: 'Thứ Năm', dayNum: 5, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tieng_anh'], afternoon: ['tnxh', 'toan', 'cong_nghe'] },
      { day: 'Thứ Sáu', dayNum: 6, morning: ['toan', 'tieng_viet', 'tieng_anh', 'tin_hoc'], afternoon: ['hdtn', 'hdtn', 'hdtn'] }
    ],
    2: [
      { day: 'Thứ Hai', dayNum: 2, morning: ['hdtn', 'tieng_viet', 'tieng_viet', 'toan'], afternoon: ['tnxh', 'dao_duc', 'gdtc'] },
      { day: 'Thứ Ba', dayNum: 3, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tnxh'], afternoon: ['am_nhac', 'tieng_anh', 'hdtn'] },
      { day: 'Thứ Tư', dayNum: 4, morning: ['tieng_viet', 'tieng_viet', 'toan', 'dao_duc'], afternoon: ['mi_thuat', 'gdtc', 'tnxh'] },
      { day: 'Thứ Năm', dayNum: 5, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['toan', 'hdtn', 'gdtc'] },
      { day: 'Thứ Sáu', dayNum: 6, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['hdtn', 'hdtn', 'hdtn'] }
    ],
    1: [
      { day: 'Thứ Hai', dayNum: 2, morning: ['hdtn', 'tieng_viet', 'tieng_viet', 'toan'], afternoon: ['tnxh', 'dao_duc', 'gdtc'] },
      { day: 'Thứ Ba', dayNum: 3, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tnxh'], afternoon: ['am_nhac', 'tieng_anh', 'hdtn'] },
      { day: 'Thứ Tư', dayNum: 4, morning: ['tieng_viet', 'tieng_viet', 'toan', 'dao_duc'], afternoon: ['mi_thuat', 'gdtc', 'tnxh'] },
      { day: 'Thứ Năm', dayNum: 5, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['toan', 'hdtn', 'gdtc'] },
      { day: 'Thứ Sáu', dayNum: 6, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['hdtn', 'hdtn', 'hdtn'] }
    ]
  },

  getDefaultTimetable: function(grade) {
    var g = parseInt(grade) || 5;
    var list = this.DEFAULT_TIMETABLES[g] || this.DEFAULT_TIMETABLES[5];
    return JSON.parse(JSON.stringify(list));
  },

  getSubjectDisplayName: function(subjectKey) {
    if (!subjectKey || subjectKey === '—' || subjectKey === '-') return '—';
    var map = {
      'toan': 'Toán',
      'tieng_viet': 'Tiếng Việt',
      'khoa_hoc': 'Khoa học',
      'lich_su_dia_ly': 'Lịch sử và Địa lí',
      'tnxh': 'Tự nhiên và Xã hội',
      'dao_duc': 'Đạo đức',
      'hdtn': 'Hoạt động trải nghiệm',
      'cong_nghe': 'Công nghệ',
      'tin_hoc': 'Tin học',
      'tieng_anh': 'Tiếng Anh',
      'am_nhac': 'Âm nhạc',
      'mi_thuat': 'Mĩ thuật',
      'gdtc': 'Giáo dục thể chất',
      'shcn': 'Sinh hoạt lớp'
    };
    return map[subjectKey] || subjectKey;
  },

  normalizeSubjectKey: function(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';
    var text = rawText.trim().toLowerCase();
    if (!text || text === '-' || text === '--' || text === '—' || text === 'nghỉ' || text === 'trống' || text === 'x') return '';

    var noAcc = text.replace(/đ/g, 'd').replace(/Đ/g, 'D').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var compact = noAcc.replace(/[^a-z0-9]/g, '');

    if (compact.includes('toan') || compact === 't' || /^t\d+$/.test(compact) || compact.startsWith('ttiet') || compact.startsWith('tiettoan')) return 'toan';
    if (compact.includes('tiengviet') || compact.includes('tviet') || compact === 'tv' || compact.startsWith('tv') || compact.includes('tapdoc') || compact.includes('chinhta') || compact.includes('luyentu') || compact.includes('taplamvan') || compact.startsWith('tvtiet')) return 'tieng_viet';
    if (compact.includes('khoahoc') || compact.includes('khoc') || compact === 'kh' || compact.startsWith('khtiet')) return 'khoa_hoc';
    if (compact.includes('lichsudialy') || compact.includes('lichsudiali') || compact.includes('lsdl') || compact.includes('lsd') || compact.includes('lichsu') || compact.includes('diali') || compact.includes('dialy')) return 'lich_su_dia_ly';
    if (compact.includes('tunhienxahoi') || compact.includes('tnxh') || compact.startsWith('tnxhtiet')) return 'tnxh';
    if (compact.includes('daoduc') || compact === 'dd' || compact.startsWith('ddtiet')) return 'dao_duc';
    if (compact.includes('trainghiem') || compact.includes('hdtn') || compact.includes('hdtnh') || compact.includes('hdtnvhn') || compact.startsWith('hdtntiet') || compact.includes('chaoco') || compact.includes('sinhhoat') || compact.includes('shl') || compact.includes('shdc') || compact.includes('shcn') || compact.includes('tongket')) return 'hdtn';
    if (compact.includes('congnghe') || compact === 'cn' || compact.startsWith('cntiet')) return 'cong_nghe';
    if (compact.includes('tinhoc') || compact === 'tin' || compact === 'th' || compact.startsWith('thtiet') || compact.startsWith('tintiet')) return 'tin_hoc';
    if (compact.includes('tienganh') || compact.includes('anhvan') || compact.includes('anh') || compact.includes('english') || compact === 'ta' || compact.startsWith('tatiet')) return 'tieng_anh';
    if (compact.includes('amnhac') || compact.includes('hatnhac') || compact === 'an' || compact === 'nhac' || compact.startsWith('antiet')) return 'am_nhac';
    if (compact.includes('mithuat') || compact.includes('mythuat') || compact === 'mt' || compact.startsWith('mttiet')) return 'mi_thuat';
    if (compact.includes('thechat') || compact.includes('theduc') || compact.includes('gdtc') || compact === 'td' || compact.startsWith('gdtctiet')) return 'gdtc';

    return text;
  },

  /**
   * Trích xuất thông tin Giáo viên, Năm học, Khối lớp, Trường từ văn bản tiêu đề TKB
   */
  extractMetadataFromText: function(text) {
    var meta = {};
    if (!text || typeof text !== 'string') return meta;

    // 1. Năm học (vd: NĂM HỌC 2026 – 2027, Năm học: 2026-2027)
    var yMatch = text.match(/(?:NĂM\s*HỌC|NH)\s*[:：\-–]?\s*([0-9]{4}\s*[-–/]\s*[0-9]{4})/i);
    if (yMatch) {
      meta.schoolYear = yMatch[1].replace(/[–/]/g, '-').replace(/\s*-\s*/g, ' - ').trim();
    }

    // 2. Giáo viên / GVCN (vd: GVCN: NGUYỄN VĂN TRUNG, Giáo viên: Lê Thành Long)
    var tMatch = text.match(/(?:GVCN|GIÁO\s*VIÊN\s*(?:CHỦ\s*NHIỆM)?|GIÁO\s*VIÊN|GV)\s*[:：\-–]\s*([^\(\[\{\n\r,]+)/i);
    if (tMatch) {
      var rawName = tMatch[1].trim().replace(/^[:：\-–\s]+/, '').replace(/^(Thầy|Cô)\s+/i, '').trim();
      rawName = rawName.split(/\s+(?:dạy|áp\s+dụng|từ\s+ngày|sđt|đt)\b/i)[0].trim();
      if (rawName.length >= 2 && rawName.length <= 50) {
        meta.teacherName = rawName;
      }
    }

    // 3. Khối & Lớp (vd: LỚP 2^1, LỚP 2/1, LỚP 5A, Khối 2)
    var cMatch = text.match(/(?:THỜI\s*KHÓA\s*BIỂU\s+)?(?:LỚP|KHỐI)\s*[:：\-–]?\s*([1-5])(?:\s*([\^/_\-\.]?\s*[0-9A-Za-z]{1,4}))?(?=\s*[\n\r,;\-–]|\s+năm\b|\s+nh\b|\s+học\b|$)/i);
    if (cMatch) {
      meta.grade = parseInt(cMatch[1]);
      if (cMatch[2]) {
        var suffix = cMatch[2].trim();
        meta.className = 'Lớp ' + cMatch[1] + (suffix.startsWith('^') || suffix.startsWith('/') ? '' : (suffix.match(/^[A-Za-z0-9]/) ? (suffix.length === 1 && suffix.match(/[0-9]/) ? '^' : ' ') : '')) + suffix;
      } else {
        meta.className = 'Khối ' + cMatch[1];
      }
    }

    // 4. Trường học (vd: TRƯỜNG TIỂU HỌC KIM ĐỒNG)
    var sMatch = text.match(/(?:TRƯỜNG\s*TIỂU\s*HỌC|TRƯỜNG\s*TH)\s*[:：\-–]?\s*([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĐa-zàáâãèéêìíòóôõùúýđ0-9\s\.\-–]+?)(?=\s*[\n\r,;]|$)/i);
    if (sMatch) {
      var rawSchool = sMatch[1].trim().replace(/^[:：\-–\s]+/, '');
      if (rawSchool.length >= 2 && rawSchool.length <= 60) {
        meta.schoolName = ('TRƯỜNG TIỂU HỌC ' + rawSchool.replace(/^tiểu\s*học\s+/i, '')).toUpperCase();
      }
    }

    return meta;
  },

  // =========================================================================
  // 2. BỘ PHÂN TÍCH THỜI KHÓA BIỂU ĐA ĐỊNH DẠNG (EXCEL, WORD, CSV, TXT)
  // =========================================================================

  /**
   * Phân tích tệp Thời Khóa Biểu (Excel .xlsx/.xls, Word .docx, PDF, CSV, TXT)
   */
  parseTimetableFile: async function(file, grade) {
    if (!file) throw new Error('Vui lòng chọn tệp Thời khóa biểu.');
    var fileName = file.name || 'Thoi_Khoa_Bieu';
    var ext = (fileName.split('.').pop() || '').toLowerCase();
    var curGrade = parseInt(grade) || 5;

    // 1. TỆP EXCEL (.XLSX, .XLS)
    if (ext === 'xlsx' || ext === 'xls') {
      return new Promise(function(resolve, reject) {
        if (typeof XLSX === 'undefined') {
          reject(new Error('Thư viện đọc Excel đang tải, vui lòng thử lại sau 2 giây.'));
          return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          try {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];
            var rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

            var topText = rows.slice(0, 10).map(function(r) { return Array.isArray(r) ? r.join(' ') : String(r || ''); }).join('\n');
            var fileMeta = IntegrationService.extractMetadataFromText(topText);
            var targetGrade = fileMeta.grade || curGrade;
            var parsed = IntegrationService.parseTimetableFromGrid(rows, targetGrade);
            resolve({
              success: true,
              fileName: fileName,
              fileType: 'Excel (' + ext.toUpperCase() + ')',
              timetable: parsed.timetable,
              slotsCount: parsed.slotsCount,
              metadata: fileMeta
            });
          } catch (err) {
            reject(new Error('Lỗi khi đọc bảng tính Excel: ' + err.message));
          }
        };
        reader.onerror = function() { reject(new Error('Không thể đọc tệp Excel.')); };
        reader.readAsArrayBuffer(file);
      });
    }

    // 2. TỆP WORD (.DOCX)
    if (ext === 'docx') {
      return new Promise(function(resolve, reject) {
        if (typeof mammoth === 'undefined') {
          reject(new Error('Thư viện đọc Word đang tải, vui lòng thử lại sau 2 giây.'));
          return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          var htmlPromise = mammoth.convertToHtml({ arrayBuffer: e.target.result });
          var rawTextPromise = mammoth.extractRawText({ arrayBuffer: e.target.result });

          Promise.all([htmlPromise, rawTextPromise])
            .then(function(results) {
              var htmlResult = results[0];
              var textResult = results[1];
              var html = htmlResult.value || '';
              var rawText = textResult.value || '';
              var fileMeta = IntegrationService.extractMetadataFromText(rawText || html);
              var targetGrade = fileMeta.grade || curGrade;

              var grid = IntegrationService.extractGridFromHtmlTable(html);
              if (grid.length > 0) {
                var parsed = IntegrationService.parseTimetableFromGrid(grid, targetGrade);
                resolve({
                  success: true,
                  fileName: fileName,
                  fileType: 'Word (DOCX)',
                  timetable: parsed.timetable,
                  slotsCount: parsed.slotsCount,
                  metadata: fileMeta
                });
              } else {
                var parsed = IntegrationService.parseTimetableFromText(rawText, targetGrade);
                resolve({
                  success: true,
                  fileName: fileName,
                  fileType: 'Word (DOCX Text)',
                  timetable: parsed.timetable,
                  slotsCount: parsed.slotsCount,
                  metadata: fileMeta
                });
              }
            })
            .catch(function(err) {
              reject(new Error('Lỗi khi phân tích tệp Word: ' + err.message));
            });
        };
        reader.onerror = function() { reject(new Error('Không thể đọc tệp Word.')); };
        reader.readAsArrayBuffer(file);
      });
    }

    // 3. TỆP CSV, TXT, JSON
    if (ext === 'csv' || ext === 'txt' || ext === 'json' || ext === 'md') {
      var textObj = await this.extractTextFromFile(file);
      var text = textObj.text || '';
      var fileMeta = this.extractMetadataFromText(text);
      var targetGrade = fileMeta.grade || curGrade;
      
      if (ext === 'json') {
        try {
          var jsonData = JSON.parse(text);
          if (Array.isArray(jsonData) && jsonData.length === 5) {
            return {
              success: true,
              fileName: fileName,
              fileType: 'JSON',
              timetable: jsonData,
              slotsCount: 35,
              metadata: fileMeta
            };
          }
        } catch (jErr) {}
      }

      var parsed = this.parseTimetableFromText(text, targetGrade);
      return {
        success: true,
        fileName: fileName,
        fileType: ext.toUpperCase(),
        timetable: parsed.timetable,
        slotsCount: parsed.slotsCount,
        metadata: fileMeta
      };
    }

    // 4. TỆP PDF
    if (ext === 'pdf') {
      var pdfObj = await this.extractTextFromFile(file);
      var fileMeta = this.extractMetadataFromText(pdfObj.text || '');
      var targetGrade = fileMeta.grade || curGrade;
      var parsed = this.parseTimetableFromText(pdfObj.text || '', targetGrade);
      return {
        success: true,
        fileName: fileName,
        fileType: 'PDF Document',
        timetable: parsed.timetable,
        slotsCount: parsed.slotsCount,
        metadata: fileMeta
      };
    }

    throw new Error('Định dạng tệp .' + ext + ' chưa được hỗ trợ. Vui lòng chọn .xlsx, .xls, .docx, .csv hoặc .txt.');
  },

  /**
   * Trích xuất ma trận ô (2D Array) từ bảng HTML trong tệp Word (xử lý chuẩn rowspan & colspan)
   */
  extractGridFromHtmlTable: function(html) {
    var trMatches = (html || '').match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
    var grid = [];

    trMatches.forEach(function(trHtml, rIdx) {
      if (!grid[rIdx]) grid[rIdx] = [];
      var cellMatches = trHtml.match(/<(td|th)[^>]*>[\s\S]*?<\/(td|th)>/gi) || [];
      var colIdx = 0;

      cellMatches.forEach(function(cellHtml) {
        while (grid[rIdx][colIdx] !== undefined) {
          colIdx++;
        }

        var rMatch = cellHtml.match(/rowspan=["']?(\d+)["']?/i);
        var rowspan = rMatch ? parseInt(rMatch[1]) : 1;

        var cMatch = cellHtml.match(/colspan=["']?(\d+)["']?/i);
        var colspan = cMatch ? parseInt(cMatch[1]) : 1;

        var text = cellHtml.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();

        for (var r = 0; r < rowspan; r++) {
          var targetRow = rIdx + r;
          if (!grid[targetRow]) grid[targetRow] = [];
          for (var c = 0; c < colspan; c++) {
            grid[targetRow][colIdx + c] = text;
          }
        }
        colIdx += colspan;
      });
    });

    return grid;
  },

  /**
   * Phân tích Ma trận lưới 2D (từ Excel hoặc Word Table) thành Thời Khóa Biểu chuẩn 5 ngày
   */
  parseTimetableFromGrid: function(rows, grade) {
    var g = parseInt(grade) || 5;
    var days = [
      { day: 'Thứ Hai', dayNum: 2, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thứ Ba', dayNum: 3, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thứ Tư', dayNum: 4, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thứ Năm', dayNum: 5, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thứ Sáu', dayNum: 6, morning: ['', '', '', ''], afternoon: ['', '', ''] }
    ];

    if (!Array.isArray(rows) || rows.length === 0) {
      return { timetable: days, slotsCount: 0 };
    }

    // 1. Tìm dòng Header chứa các Thứ (Thứ 2, Thứ 3, Thứ 4, Thứ 5, Thứ 6)
    var dayColMap = {};
    var headerRowIdx = -1;

    for (var r = 0; r < Math.min(rows.length, 10); r++) {
      var row = rows[r] || [];
      for (var c = 0; c < row.length; c++) {
        var cellStr = String(row[c] || '').toLowerCase().trim();

        if (cellStr.includes('thứ 2') || cellStr.includes('thứ hai') || cellStr === 'thứ 2' || cellStr === 'hai' || cellStr === 't2') {
          dayColMap[2] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thứ 3') || cellStr.includes('thứ ba') || cellStr === 'thứ 3' || cellStr === 'ba' || cellStr === 't3') {
          dayColMap[3] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thứ 4') || cellStr.includes('thứ tư') || cellStr === 'thứ 4' || cellStr === 'tư' || cellStr === 't4') {
          dayColMap[4] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thứ 5') || cellStr.includes('thứ năm') || cellStr === 'thứ 5' || cellStr === 'năm' || cellStr === 't5') {
          dayColMap[5] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thứ 6') || cellStr.includes('thứ sáu') || cellStr === 'thứ 6' || cellStr === 'sáu' || cellStr === 't6') {
          dayColMap[6] = c;
          headerRowIdx = r;
        }
      }
      if (Object.keys(dayColMap).length >= 3) break;
    }

    if (Object.keys(dayColMap).length < 3) {
      var startCol = (rows[0] && rows[0].length >= 6) ? (rows[0].length - 5) : 2;
      dayColMap = { 2: startCol, 3: startCol + 1, 4: startCol + 2, 5: startCol + 3, 6: startCol + 4 };
      headerRowIdx = 0;
    }

    var firstDayCol = Math.min(...Object.values(dayColMap));
    var isAfternoon = false;
    var morningCounters = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    var afternoonCounters = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    var filledCount = 0;

    for (var r = headerRowIdx + 1; r < rows.length; r++) {
      var row = rows[r] || [];
      var nonDayCells = row.slice(0, firstDayCol);
      var nonDayText = nonDayCells.join(' ').toLowerCase();

      // Check session
      if (nonDayText.includes('chiều') || nonDayText.includes('chieu')) {
        isAfternoon = true;
      } else if (nonDayText.includes('sáng') || nonDayText.includes('sang')) {
        isAfternoon = false;
      }

      // Check period number (1..5)
      var slotIdx = -1;
      for (var c = 0; c < nonDayCells.length; c++) {
        var cellVal = String(nonDayCells[c] || '').trim();
        var numMatch = cellVal.match(/(?:tiết\s*)?([1-5])/i);
        if (numMatch && !cellVal.toLowerCase().includes('thứ') && !cellVal.toLowerCase().includes('buổi')) {
          if (/^\d+$/.test(cellVal) || /^tiết\s*\d+$/i.test(cellVal)) {
            slotIdx = parseInt(numMatch[1]) - 1;
          }
        }
      }

      if (slotIdx < 0) {
        slotIdx = isAfternoon ? afternoonCounters[2] : morningCounters[2];
      }

      // Check if row has any day data
      var hasAnyDayVal = false;
      for (var dayNum = 2; dayNum <= 6; dayNum++) {
        var col = dayColMap[dayNum];
        if (col !== undefined && row[col] && String(row[col]).trim()) {
          hasAnyDayVal = true;
          break;
        }
      }
      if (!hasAnyDayVal) continue;

      // Fill in days
      for (var dayNum = 2; dayNum <= 6; dayNum++) {
        var col = dayColMap[dayNum];
        var cellVal = (col !== undefined && row[col] !== undefined) ? String(row[col]).trim() : '';
        var subjKey = IntegrationService.normalizeSubjectKey(cellVal);

        var targetDay = days.find(function(d) { return d.dayNum === dayNum; });
        if (targetDay) {
          if (!isAfternoon && slotIdx < 4) {
            targetDay.morning[slotIdx] = subjKey;
            morningCounters[dayNum] = Math.max(morningCounters[dayNum], slotIdx + 1);
            if (subjKey) filledCount++;
          } else if (isAfternoon && slotIdx < 3) {
            targetDay.afternoon[slotIdx] = subjKey;
            afternoonCounters[dayNum] = Math.max(afternoonCounters[dayNum], slotIdx + 1);
            if (subjKey) filledCount++;
          }
        }
      }
    }

    return { timetable: days, slotsCount: filledCount };
  },

  /**
   * Phân tích Thời Khóa Biểu từ văn bản thuần (TXT/CSV/PDF Text)
   */
  parseTimetableFromText: function(text, grade) {
    var lines = (text || '').split(/\r?\n/).map(function(l) { return l.trim(); }).filter(Boolean);
    var grid = [];

    lines.forEach(function(line) {
      var parts = line.split(/[,;\t|]+/).map(function(p) { return p.trim(); });
      if (parts.length > 1) {
        grid.push(parts);
      } else {
        var spaceParts = line.split(/\s{2,}/).map(function(p) { return p.trim(); });
        if (spaceParts.length > 1) grid.push(spaceParts);
        else grid.push([line]);
      }
    });

    return this.parseTimetableFromGrid(grid, grade);
  },


  // =========================================================================
  // 3. TRÍCH XUẤT NỘI DUNG TÀI LIỆU TẢI LÊN (.DOCX, .PDF, .TXT)
  // =========================================================================

  extractTextFromFile: async function(file) {
    if (!file) throw new Error('Vui lòng chọn tệp tài liệu.');
    var fileName = file.name || 'Tai_lieu_tich_hop';
    var ext = (fileName.split('.').pop() || '').toLowerCase();

    if (ext === 'txt' || ext === 'md' || ext === 'json' || ext === 'csv') {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var text = (e.target.result || '').trim();
          resolve({
            success: true,
            text: text,
            fileName: fileName,
            fileType: ext.toUpperCase(),
            wordCount: text ? text.split(/\s+/).length : 0
          });
        };
        reader.onerror = function() { reject(new Error('Không thể đọc tệp văn bản: ' + fileName)); };
        reader.readAsText(file, 'utf-8');
      });
    }

    if (ext === 'docx') {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
          if (typeof mammoth !== 'undefined') {
            mammoth.extractRawText({ arrayBuffer: e.target.result })
              .then(function(result) {
                var text = (result.value || '').trim();
                resolve({
                  success: true,
                  text: text,
                  fileName: fileName,
                  fileType: 'Word (DOCX)',
                  wordCount: text ? text.split(/\s+/).length : 0
                });
              })
              .catch(function(err) { reject(new Error('Lỗi phân tích tệp .docx: ' + err.message)); });
          } else {
            reject(new Error('Thư viện đọc Word (.docx) đang tải, vui lòng dán nội dung vào ô văn bản.'));
          }
        };
        reader.onerror = function() { reject(new Error('Lỗi khi nạp tệp Word.')); };
        reader.readAsArrayBuffer(file);
      });
    }

    if (ext === 'pdf') {
      return new Promise(function(resolve, reject) {
        if (typeof pdfjsLib === 'undefined') {
          reject(new Error('Thư viện đọc PDF đang nạp, vui lòng thử lại hoặc dán văn bản trực tiếp.'));
          return;
        }
        var reader = new FileReader();
        reader.onload = async function(e) {
          try {
            var typedarray = new Uint8Array(e.target.result);
            if (pdfjsLib.GlobalWorkerOptions) {
              pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }
            var loadingTask = pdfjsLib.getDocument({ data: typedarray });
            var pdf = await loadingTask.promise;
            var fullText = '';
            var maxPages = Math.min(pdf.numPages, 30);

            for (var pageNum = 1; pageNum <= maxPages; pageNum++) {
              var page = await pdf.getPage(pageNum);
              var textContent = await page.getTextContent();
              var pageText = textContent.items.map(function(item) { return item.str; }).join(' ');
              fullText += pageText + '\n';
            }

            var text = fullText.trim();
            resolve({
              success: true,
              text: text,
              fileName: fileName,
              fileType: 'PDF Document',
              pageCount: pdf.numPages,
              wordCount: text ? text.split(/\s+/).length : 0
            });
          } catch (err) {
            reject(new Error('Lỗi trích xuất PDF: ' + err.message));
          }
        };
        reader.readAsArrayBuffer(file);
      });
    }

    throw new Error('Định dạng tệp .' + ext + ' chưa được hỗ trợ. Vui lòng chọn .docx, .pdf, .txt hoặc dán văn bản trực tiếp.');
  },


  // =========================================================================
  // 4. NẠP DỮ LIỆU KHBD SỐ HÓA & ĐẢM BẢO TOÀN BỘ MÔN TRONG TUẦN
  // =========================================================================

  ensureSubjectLoaded: async function(grade, subjectId) {
    var g = parseInt(grade) || 5;
    var sId = (subjectId || 'toan').toLowerCase();
    
    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    if (khbdDataObj && khbdDataObj.isLoaded && khbdDataObj.isLoaded(g, sId)) {
      return true;
    }
    
    if (typeof document === 'undefined') return true;

    var filePath = 'js/khbd_sohoa/lop' + g + '/lop' + g + '_' + sId + '.js';
    return new Promise(function(resolve) {
      var existing = document.querySelector('script[src="' + filePath + '"]');
      if (existing) { resolve(true); return; }
      var s = document.createElement('script');
      s.src = filePath;
      s.onload = function() { resolve(true); };
      s.onerror = function() { resolve(false); };
      document.head.appendChild(s);
    });
  },

  ensureAllSubjectsLoadedForGrade: async function(grade) {
    var g = parseInt(grade) || 5;
    var subjs = ['toan', 'tieng_viet', 'dao_duc', 'hdtn'];
    if (g <= 3) {
      subjs.push('tnxh');
      if (g === 3) subjs.push('cong_nghe');
    } else {
      subjs.push('khoa_hoc', 'lich_su_dia_ly', 'cong_nghe');
    }

    for (var i = 0; i < subjs.length; i++) {
      await this.ensureSubjectLoaded(g, subjs[i]);
    }
    return true;
  },


  // =========================================================================
  // 5. GHÉP TUẦN TỰ TOÀN BỘ KHBD TRONG TUẦN THEO THỜI KHÓA BIỂU
  // =========================================================================

  isDoublePeriodLesson: function(title, period) {
    var t = ((title || '') + ' ' + (period || '')).toLowerCase();
    if (/ti[eế]t\s*\d+\s*[-–,]\s*\d+/i.test(t)) return true;
    if (/(?:2\s*ti[eế]t|th[oờ]i\s*l[uư][oợ]ng\s*:\s*2|s[oố]\s*ti[eế]t\s*:\s*2|ti[eế]t\s*đ[oô]i)/i.test(t)) return true;
    return false;
  },

  unpackWeeklyLessons: function(rawLessons, sKey, weekNum, grade) {
    var units = [];
    var currentTopic = '';
    var validLessons = [];
    var self = this;

    (rawLessons || []).forEach(function(les, r_idx) {
      var tables = les.tables || [];
      var hasRealContent = false;
      for (var i = 0; i < tables.length; i++) {
        if (tables[i] && tables[i].length > 0) {
          hasRealContent = true;
          break;
        }
      }
      var title = les.lessonTitle || les.title || '';
      if (!hasRealContent && (!les.activities || les.activities.length === 0)) {
        currentTopic = title;
        return;
      }
      var lesCopy = JSON.parse(JSON.stringify(les));
      if (currentTopic && !lesCopy.topic) lesCopy.topic = currentTopic;
      validLessons.push({ origIdx: r_idx, lesson: lesCopy });
    });

    validLessons.forEach(function(item) {
      var orig_r_idx = item.origIdx;
      var les = item.lesson;
      var tables = les.tables || [];
      var title = les.lessonTitle || les.title || '';
      var period = les.period || '';
      var isDouble = self.isDoublePeriodLesson(title, period);

      if (tables.length > 1 && !isDouble) {
        // Multi-table lesson (e.g. HĐTN in Lớp 1, 2, 4 có 3 bảng: SHDC, HĐGD theo chủ đề, Sinh hoạt lớp)
        tables.forEach(function(tbl, t_idx) {
          var subLes = JSON.parse(JSON.stringify(les));
          subLes.tables = [tbl];
          subLes.subUnitIndex = t_idx + 1;

          if (sKey === 'hdtn' || sKey === 'shcn') {
            if (t_idx === 0) {
              subLes.lessonTitle = 'SINH HOẠT DƯỚI CỜ: ' + (title.toLowerCase().includes('khai giảng') ? 'THAM GIA LỄ KHAI GIẢNG NĂM HỌC MỚI' : (title.toLowerCase().includes('chào cờ') ? title : 'CHỦ ĐỀ ĐẦU TUẦN'));
              subLes.period = 'Tiết 1';
            } else if (t_idx === 1) {
              subLes.lessonTitle = 'HOẠT ĐỘNG GIÁO DỤC THEO CHỦ ĐỀ' + (title ? (': ' + title.replace(/^KẾ HOẠCH BÀI DẠY MÔN HOẠT ĐỘNG TRẢI NGHIỆM\s*(?:LỚP\s*\d+)?/i, '').trim()) : '');
              subLes.period = 'Tiết 2';
            } else if (t_idx === 2) {
              subLes.lessonTitle = 'SINH HOẠT LỚP: SƠ KẾT TUẦN & PHƯƠNG HƯỚNG TUẦN TIẾP THEO';
              subLes.period = 'Tiết 3';
            } else {
              subLes.lessonTitle = (title || 'BÀI DẠY') + ' (Tiết ' + (t_idx + 1) + ')';
              subLes.period = 'Tiết ' + (t_idx + 1);
            }
          } else {
            subLes.lessonTitle = (title || 'BÀI DẠY') + ' (Tiết ' + (t_idx + 1) + ')';
            subLes.period = 'Tiết ' + (t_idx + 1);
          }

          units.push({
            lesson: subLes,
            rawIndex: orig_r_idx,
            isDouble: false,
            part: 1,
            tableIndex: t_idx
          });
        });
      } else if (isDouble) {
        units.push({
          lesson: les,
          rawIndex: orig_r_idx,
          isDouble: true,
          part: 1
        });
        units.push({
          lesson: les,
          rawIndex: orig_r_idx,
          isDouble: true,
          part: 2
        });
      } else {
        units.push({
          lesson: les,
          rawIndex: orig_r_idx,
          isDouble: false,
          part: 1
        });
      }
    });

    return units;
  },

  /**
   * Xếp toàn bộ bài dạy các môn trong tuần theo đúng thứ tự Tiết & Thứ của TKB
   * Hỗ trợ chuẩn xác: Tiết đôi liên tục -> in 1 lần tính 2 tiết; Tiết đôi không liên tục -> in 2 lần (Tiết 1, Tiết 2)
   */
  buildWeeklyPlanByTimetable: async function(grade, weekNumber, customTimetable, integratedMap, overwriteLegacy) {
    var g = parseInt(grade) || 5;
    var wNum = parseInt(weekNumber) || 1;
    var timetable = customTimetable || this.getDefaultTimetable(g);
    var shouldClean = (overwriteLegacy !== false);

    await this.ensureAllSubjectsLoadedForGrade(g);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);

    // 1. Thu thập toàn bộ các ô có tiết học theo thứ tự thời gian trong tuần
    var allSlots = [];
    timetable.forEach(function(dayItem) {
      var dayName = dayItem.day || ('Thứ ' + dayItem.dayNum);
      (dayItem.morning || []).forEach(function(sKey, mIdx) {
        var cleanKey = IntegrationService.normalizeSubjectKey(sKey || '');
        if (cleanKey && cleanKey !== '-' && cleanKey !== '—') {
          allSlots.push({
            dayName: dayName,
            dayNum: dayItem.dayNum,
            session: 'Sáng',
            periodSlot: mIdx + 1,
            subjectKey: cleanKey
          });
        }
      });
      (dayItem.afternoon || []).forEach(function(sKey, aIdx) {
        var cleanKey = IntegrationService.normalizeSubjectKey(sKey || '');
        if (cleanKey && cleanKey !== '-' && cleanKey !== '—') {
          allSlots.push({
            dayName: dayName,
            dayNum: dayItem.dayNum,
            session: 'Chiều',
            periodSlot: aIdx + 1,
            subjectKey: cleanKey
          });
        }
      });
    });

    // 2. Gom nhóm các ô theo từng môn học để nắm vị trí trên TKB
    var subjectSlotMap = {};
    allSlots.forEach(function(slot, slotIndex) {
      if (!subjectSlotMap[slot.subjectKey]) subjectSlotMap[slot.subjectKey] = [];
      subjectSlotMap[slot.subjectKey].push({ slotIndex: slotIndex, slot: slot });
    });

    var slotToLessonMap = {};
    var skippedSlotIndices = {};

    // 3. Xử lý từng môn học theo tiến trình chuẩn và quy tắc Tiết đôi
    for (var sKey in subjectSlotMap) {
      var sSlots = subjectSlotMap[sKey];

      var weekData = khbdDataObj ? khbdDataObj.getWeekPlan(g, sKey, wNum) : null;
      var rawLessons = (weekData && weekData.lessons) ? weekData.lessons : [];

      // Mở rộng bài học theo từng đơn vị tiết chuẩn
      var expandedLessonUnits = this.unpackWeeklyLessons(rawLessons, sKey, wNum, g);

      var unitIdx = 0;
      for (var i = 0; i < sSlots.length; i++) {
        if (skippedSlotIndices[sSlots[i].slotIndex]) continue;

        var curSlotEntry = sSlots[i];
        var nextSlotEntry = (i + 1 < sSlots.length) ? sSlots[i + 1] : null;

        var curUnit = expandedLessonUnits[unitIdx];
        var nextUnit = (unitIdx + 1 < expandedLessonUnits.length) ? expandedLessonUnits[unitIdx + 1] : null;

        // KIỂM TRA BÀI TIẾT ĐÔI
        if (curUnit && curUnit.isDouble && curUnit.part === 1 && nextUnit && nextUnit.isDouble && nextUnit.part === 2 && curUnit.rawIndex === nextUnit.rawIndex) {
          // Kiểm tra xem 2 slot TKB có LIÊN TỤC (cùng ngày, cùng buổi, liền kề số tiết) không
          var isConsecutive = nextSlotEntry &&
                              (nextSlotEntry.slot.dayNum === curSlotEntry.slot.dayNum) &&
                              (nextSlotEntry.slot.session === curSlotEntry.slot.session) &&
                              (nextSlotEntry.slot.periodSlot === curSlotEntry.slot.periodSlot + 1);

          if (isConsecutive) {
            // QUY TẮC: 2 TIẾT LIÊN TỤC -> IN 1 LẦN TÍNH 2 TIẾT
            var baseLesson = curUnit.lesson;
            var matchInteg = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
            var lessonItem = matchInteg ? IntegrationService.injectIntegrationIntoLesson(baseLesson, matchInteg, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson) : JSON.parse(JSON.stringify(baseLesson)));

            lessonItem.dayName = curSlotEntry.slot.dayName;
            lessonItem.session = curSlotEntry.slot.session;
            lessonItem.periodSlot = curSlotEntry.slot.periodSlot + ' - ' + nextSlotEntry.slot.periodSlot;
            lessonItem.period = 'Tiết ' + curSlotEntry.slot.periodSlot + ' - ' + nextSlotEntry.slot.periodSlot + ' (Thời lượng 2 tiết)';
            lessonItem.subjectKey = sKey;
            lessonItem.subjectName = IntegrationService.getSubjectDisplayName(sKey);
            lessonItem.week = wNum;
            lessonItem.grade = g;

            slotToLessonMap[curSlotEntry.slotIndex] = lessonItem;
            skippedSlotIndices[nextSlotEntry.slotIndex] = true;
            unitIdx += 2;
            continue;
          } else {
            // QUY TẮC: 2 TIẾT KHÔNG LIÊN TỤC -> IN LẦN 1 (TIẾT 1)
            var baseLesson1 = curUnit.lesson;
            var matchInteg1 = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
            var lessonItem1 = matchInteg1 ? IntegrationService.injectIntegrationIntoLesson(baseLesson1, matchInteg1, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson1) : JSON.parse(JSON.stringify(baseLesson1)));

            lessonItem1.dayName = curSlotEntry.slot.dayName;
            lessonItem1.session = curSlotEntry.slot.session;
            lessonItem1.periodSlot = curSlotEntry.slot.periodSlot;
            lessonItem1.period = 'Tiết ' + curSlotEntry.slot.periodSlot + ' (Tiết 1)';
            lessonItem1.lessonTitle = (baseLesson1.lessonTitle || baseLesson1.title || '') + ' (Tiết 1)';
            lessonItem1.subjectKey = sKey;
            lessonItem1.subjectName = IntegrationService.getSubjectDisplayName(sKey);
            lessonItem1.week = wNum;
            lessonItem1.grade = g;

            slotToLessonMap[curSlotEntry.slotIndex] = lessonItem1;
            unitIdx += 1;
            continue;
          }
        } else if (curUnit && curUnit.isDouble && curUnit.part === 2) {
          // QUY TẮC: 2 TIẾT KHÔNG LIÊN TỤC -> IN LẦN 2 (TIẾT 2)
          var baseLesson2 = curUnit.lesson;
          var matchInteg2 = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
          var lessonItem2 = matchInteg2 ? IntegrationService.injectIntegrationIntoLesson(baseLesson2, matchInteg2, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson2) : JSON.parse(JSON.stringify(baseLesson2)));

          lessonItem2.dayName = curSlotEntry.slot.dayName;
          lessonItem2.session = curSlotEntry.slot.session;
          lessonItem2.periodSlot = curSlotEntry.slot.periodSlot;
          lessonItem2.period = 'Tiết ' + curSlotEntry.slot.periodSlot + ' (Tiết 2)';
          lessonItem2.lessonTitle = (baseLesson2.lessonTitle || baseLesson2.title || '') + ' (Tiết 2)';
          lessonItem2.subjectKey = sKey;
          lessonItem2.subjectName = IntegrationService.getSubjectDisplayName(sKey);
          lessonItem2.week = wNum;
          lessonItem2.grade = g;

          slotToLessonMap[curSlotEntry.slotIndex] = lessonItem2;
          unitIdx += 1;
          continue;
        }

        // Bài học thông thường (1 tiết)
        var singleLesson = null;
        if (curUnit && curUnit.lesson) {
          var baseLessonS = curUnit.lesson;
          var matchIntegS = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
          singleLesson = matchIntegS ? IntegrationService.injectIntegrationIntoLesson(baseLessonS, matchIntegS, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLessonS) : JSON.parse(JSON.stringify(baseLessonS)));
        } else {
          var dispName = IntegrationService.getSubjectDisplayName(sKey);
          singleLesson = {
            title: dispName + ' - Luyện tập / Vận dụng (Tiết ' + (unitIdx + 1) + ')',
            lessonTitle: dispName + ' - Luyện tập / Vận dụng (Tiết ' + (unitIdx + 1) + ')',
            period: 'Tiết ' + curSlotEntry.slot.periodSlot,
            yccd: [
              '1. Năng lực đặc thù: Ôn tập, củng cố và phát triển năng lực môn ' + dispName + ' theo yêu cầu cần đạt của chương trình.',
              '2. Năng lực chung: Tự chủ và tự học; Giao tiếp và hợp tác trong các hoạt động học tập.',
              '3. Phẩm chất: Chăm chỉ, trách nhiệm, tích cực hoàn thành nhiệm vụ.'
            ],
            dodung: [
              '1. Giáo viên: SGK, máy tính, ti vi / bài giảng điện tử, phiếu học tập rèn luyện.',
              '2. Học sinh: SGK, vở bài tập, bảng con, đồ dùng học tập cá nhân.'
            ],
            tables: [[
              ['* Khởi động (3 - 5 phút): Tạo tâm thế hào hứng và kết nối kiến thức bài học.'],
              ['GV tổ chức trò chơi kết nối, khơi gợi nội dung bài học.', 'HS tham gia trò chơi sôi nổi, hào hứng vào bài.'],
              ['* Luyện tập, thực hành (20 - 25 phút): Củng cố kiến thức và rèn luyện kĩ năng.'],
              ['GV giao nhiệm vụ bài tập phù hợp đối tượng HS, hướng dẫn và hỗ trợ kịp thời.', 'HS làm bài cá nhân/nhóm đôi, tự tin trình bày và đổi vở kiểm tra chéo.'],
              ['* Vận dụng (3 - 5 phút): Ghi nhớ và vận dụng vào thực tế.'],
              ['GV nhận xét, tuyên dương và dặn dò HS thực hành vận dụng sau tiết học.', 'HS lắng nghe, ghi nhớ và thực hiện theo hướng dẫn.']
            ]]
          };
        }

        singleLesson.dayName = curSlotEntry.slot.dayName;
        singleLesson.session = curSlotEntry.slot.session;
        singleLesson.periodSlot = curSlotEntry.slot.periodSlot;
        singleLesson.subjectKey = sKey;
        singleLesson.subjectName = IntegrationService.getSubjectDisplayName(sKey);
        singleLesson.week = wNum;
        singleLesson.grade = g;

        slotToLessonMap[curSlotEntry.slotIndex] = singleLesson;
        unitIdx += 1;
      }
    }

    // 4. Lắp ráp lại toàn bộ bài dạy theo đúng thứ tự thời gian trên TKB
    var weeklyOrderedLessons = [];
    var globalPeriodCounter = 1;

    allSlots.forEach(function(slot, slotIndex) {
      if (skippedSlotIndices[slotIndex]) return;
      var lessonItem = slotToLessonMap[slotIndex];
      if (lessonItem) {
        lessonItem.globalPeriod = globalPeriodCounter++;
        weeklyOrderedLessons.push(lessonItem);
      }
    });

    return {
      week: wNum,
      grade: g,
      timetable: timetable,
      lessons: weeklyOrderedLessons,
      totalSlots: weeklyOrderedLessons.length
    };
  },


  // =========================================================================
  // 6. AI PHÂN TÍCH TÍCH HỢP TÀI LIỆU
  // =========================================================================

  analyzeIntegrationPlanWithDocument: async function(params) {
    var grade = parseInt(params.grade) || 5;
    var subj = (params.subjectKey || params.subjectId || 'toan').toLowerCase();
    var sWeek = parseInt(params.startWeek) || 1;
    var maxAllowedEnd = Math.min(35, sWeek + 3);
    var eWeek = params.endWeek ? Math.min(maxAllowedEnd, parseInt(params.endWeek)) : Math.min(maxAllowedEnd, sWeek + (parseInt(params.durationWeeks || params.duration) || 1) - 1);
    if (eWeek < sWeek) eWeek = sWeek;
    var dur = eWeek - sWeek + 1;

    var docText = (params.docText || '').trim();
    var docTitle = (params.docTitle || 'Tài liệu tích hợp chuyên đề mới').trim();
    var userNotes = (params.userNotes || '').trim();

    if (!docText) {
      throw new Error('Vui lòng tải lên tài liệu (.docx, .pdf, .txt) hoặc dán nội dung văn bản chỉ đạo/chuyên đề tích hợp.');
    }

    await this.ensureSubjectLoaded(grade, subj);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    var weeksPlan = khbdDataObj ? khbdDataObj.getWeekRangePlan(grade, subj, sWeek, eWeek) : [];

    if (!weeksPlan || weeksPlan.length === 0) {
      throw new Error('Chưa tìm thấy dữ liệu giáo án số hóa cho Khối ' + grade + ' - Môn ' + subj + ' (Tuần ' + sWeek + ' - ' + eWeek + ')');
    }

    var docSummary = this.extractDocumentKeywordsAndSummary(docText, docTitle);
    var apiKey = (typeof AuthService !== 'undefined' && AuthService.getApiKey) ? AuthService.getApiKey() : ((typeof localStorage !== 'undefined' ? localStorage.getItem('tvth_gemini_api_key') : '') || (typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : ''));

    var matrixLessons = [];

    if (apiKey && typeof AIService !== 'undefined' && AIService.callGeminiApi) {
      try {
        matrixLessons = await this.generatePlanViaGeminiAI(apiKey, grade, subj, sWeek, eWeek, weeksPlan, docTitle, docText, userNotes);
      } catch (aiErr) {
        console.warn('Lỗi gọi Gemini AI Online, chuyển sang AI Engine Phân tích Chuyên sâu:', aiErr);
        matrixLessons = this.generatePlanViaSmartRuleEngine(grade, subj, weeksPlan, docSummary, userNotes);
      }
    } else {
      matrixLessons = this.generatePlanViaSmartRuleEngine(grade, subj, weeksPlan, docSummary, userNotes);
    }

    return {
      success: true,
      grade: grade,
      subjectKey: subj,
      subjectName: this.getSubjectDisplayName(subj),
      startWeek: sWeek,
      endWeek: eWeek,
      durationWeeks: dur,
      docTitle: docTitle,
      docSummary: docSummary,
      docTextSnippet: docText.substring(0, 300) + (docText.length > 300 ? '...' : ''),
      userNotes: userNotes,
      suggestions: matrixLessons,
      matrixLessons: matrixLessons,
      weeksPlan: weeksPlan
    };
  },

  extractDocumentKeywordsAndSummary: function(text, title) {
    var clean = (text || '').replace(/\s+/g, ' ');
    var sampleLines = clean.split(/[.\n\r]+/).map(function(s){ return s.trim(); }).filter(function(s){ return s.length > 15; });
    var coreTopics = [];

    var keywords = [
      { key: 'địa phương', tag: 'Giáo dục Địa phương' },
      { key: 'quyền con người', tag: 'Quyền con người' },
      { key: 'trẻ em', tag: 'Quyền trẻ em' },
      { key: 'đuối nước', tag: 'Phòng chống đuối nước' },
      { key: 'an toàn giao thông', tag: 'An toàn giao thông' },
      { key: 'môi trường', tag: 'Bảo vệ môi trường' },
      { key: 'khí hậu', tag: 'Biến đổi khí hậu' },
      { key: 'chuyển đổi số', tag: 'Kỹ năng số' },
      { key: 'công nghệ số', tag: 'Kỹ năng số' },
      { key: 'tài chính', tag: 'Giáo dục tài chính' },
      { key: 'tiết kiệm', tag: 'Kỹ năng tiết kiệm' },
      { key: 'quốc phòng', tag: 'Quốc phòng - An ninh' },
      { key: 'biển đảo', tag: 'Chủ quyền Biển đảo' },
      { key: 'di sản', tag: 'Di sản văn hóa' },
      { key: 'phẩm chất', tag: 'Phát triển phẩm chất' },
      { key: 'năng lực', tag: 'Phát triển năng lực' }
    ];

    var textLower = clean.toLowerCase();
    keywords.forEach(function(item) {
      if (textLower.indexOf(item.key) !== -1) {
        if (coreTopics.indexOf(item.tag) === -1) coreTopics.push(item.tag);
      }
    });

    if (coreTopics.length === 0) {
      coreTopics.push('Chuyên đề tích hợp theo tài liệu ' + (title || 'mới'));
    }

    return {
      topicName: coreTopics.slice(0, 3).join(' • '),
      topicsList: coreTopics,
      sampleQuotes: sampleLines.slice(0, 4),
      fullSnippet: clean.substring(0, 800)
    };
  },

  generatePlanViaSmartRuleEngine: function(grade, subj, weeksPlan, docSummary, userNotes) {
    var results = [];
    var topic = docSummary.topicName || 'Chuyên đề mới';
    var quotes = docSummary.sampleQuotes || [];
    var quoteIdx = 0;

    var targetParts = [
      'Hoạt động Vận dụng, trải nghiệm',
      'Hoạt động Khám phá kiến thức mới',
      'Hoạt động Luyện tập, thực hành',
      'Hoạt động Khởi động'
    ];

    var levels = ['Liên hệ', 'Bộ phận', 'Toàn phần'];

    weeksPlan.forEach(function(weekItem) {
      (weekItem.lessons || []).forEach(function(les, lIdx) {
        var pIdx = lIdx % targetParts.length;
        var chosenPart = targetParts[pIdx];
        var chosenLevel = levels[lIdx % levels.length];
        var relevantQuote = quotes.length > 0 ? quotes[quoteIdx % quotes.length] : ('Nội dung tích hợp trọng tâm: ' + topic);
        quoteIdx++;

        var lessonId = (subj || 'toan') + '_' + weekItem.week + '_' + lIdx;
        var brief = 'Tích hợp nội dung ' + topic + ' vào ' + chosenPart + ': ' + relevantQuote;

        var gvContent = 'GV hướng dẫn HS liên hệ thực tế về ' + topic + ': ' + relevantQuote;
        var hsContent = 'HS lắng nghe, trao đổi nhóm, phát biểu cảm nghĩ và thực hành xử lý tình huống về ' + topic + '.';

        results.push({
          lessonId: lessonId,
          week: weekItem.week,
          periodIndex: lIdx,
          period: les.period || ('Tiết ' + (lIdx + 1)),
          title: les.title || les.lessonTitle || ('Bài ' + (lIdx + 1)),
          targetPart: chosenPart,
          level: chosenLevel,
          integrationBrief: brief,
          yccdAddition: '- Tích hợp ' + topic + ' (' + chosenLevel + '): ' + relevantQuote.substring(0, 120) + (relevantQuote.length > 120 ? '...' : ''),
          dodungAddition: '- Tư liệu, hình ảnh, tình huống thực tế về ' + topic + '.',
          activityAddition: {
            stepName: chosenPart + ' (3-5 phút)',
            teacherAct: gvContent,
            studentAct: hsContent
          }
        });
      });
    });

    return results;
  },

  generatePlanViaGeminiAI: async function(apiKey, grade, subj, sWeek, eWeek, weeksPlan, docTitle, docText, userNotes) {
    var lessonsListDesc = [];
    weeksPlan.forEach(function(w) {
      (w.lessons || []).forEach(function(l, idx) {
        lessonsListDesc.push({
          lessonId: subj + '_' + w.week + '_' + idx,
          week: w.week,
          periodIndex: idx,
          period: l.period || ('Tiết ' + (idx + 1)),
          title: l.title || l.lessonTitle || ''
        });
      });
    });

    var prompt = `Bạn là Chuyên gia Phương pháp Dạy học Tiểu học và Soạn Kế hoạch bài dạy (KHBD) chuẩn Công văn 2345/BGDĐT-GDTH.
Nhiệm vụ của bạn: Nghiên cứu kỹ tài liệu chỉ đạo tích hợp mới dưới đây, đối chiếu với danh sách các bài dạy môn ${subj.toUpperCase()} - Khối ${grade} (Từ tuần ${sWeek} đến tuần ${eWeek}), và lập KẾ HOẠCH TÍCH HỢP CHI TIẾT cho từng bài dạy.

TÀI LIỆU TÍCH HỢP MỚI (${docTitle}):
"""
${docText.substring(0, 3500)}
"""

YÊU CẦU ĐẶC BIỆT CỦA GIÁO VIÊN: "${userNotes || 'Tích hợp sâu sát, sinh động, chuẩn CV 2345'}"

DANH SÁCH BÀI DẠY CẦN TÍCH HỢP:
${JSON.stringify(lessonsListDesc, null, 2)}

Hãy trả về kết quả dạng JSON thuần túy (không kèm markdown code block \`\`\`json) với cấu trúc mảng suggestions như sau:
[
  {
    "lessonId": "toan_1_0",
    "week": 1,
    "periodIndex": 0,
    "period": "Tiết 1",
    "title": "Tên bài",
    "targetPart": "Hoạt động Vận dụng, trải nghiệm",
    "level": "Liên hệ",
    "integrationBrief": "Tóm tắt ngắn gọn nội dung tích hợp vào tiết này",
    "yccdAddition": "- Tích hợp ...: Học sinh nhận biết/thực hành ...",
    "dodungAddition": "- Hình ảnh/tư liệu ...",
    "activityAddition": {
      "stepName": "Hoạt động Vận dụng, trải nghiệm (3-5 phút)",
      "teacherAct": "Lời thoại và nhiệm vụ cụ thể GV giao cho HS",
      "studentAct": "Hoạt động cụ thể của HS: thảo luận, trả lời, thực hành"
    }
  }
]`;

    var response = await AIService.callGeminiApi(apiKey, prompt, { temperature: 0.3, maxTokens: 4000 });
    var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
    var parsed = JSON.parse(cleanJson);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.suggestions)) return parsed.suggestions;
    throw new Error('Dữ liệu AI trả về không đúng định dạng mảng JSON');
  },

  refineIntegrationPlanWithFeedback: async function(currentPlan, userFeedback) {
    if (!currentPlan || !currentPlan.suggestions) throw new Error('Kế hoạch tích hợp không hợp lệ.');
    var apiKey = (typeof AuthService !== 'undefined' && AuthService.getApiKey) ? AuthService.getApiKey() : ((typeof localStorage !== 'undefined' ? localStorage.getItem('tvth_gemini_api_key') : '') || (typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : ''));

    if (apiKey && typeof AIService !== 'undefined' && AIService.callGeminiApi) {
      try {
        var prompt = `Bạn là Trợ lý AI Soạn Giáo Án Tiểu Học. Dưới đây là Bảng Kế hoạch Tích hợp hiện tại:
${JSON.stringify(currentPlan.suggestions, null, 2)}

Ý KIẾN GÓP Ý / YÊU CẦU ĐIỀU CHỈNH CỦA GIÁO VIÊN:
"${userFeedback}"

Hãy điều chỉnh và hoàn thiện lại toàn bộ bảng Kế hoạch tích hợp theo đúng góp ý của giáo viên.
Trả về JSON thuần túy (mảng các bài dạy đã cập nhật):`;

        var response = await AIService.callGeminiApi(apiKey, prompt, { temperature: 0.3 });
        var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
        var updatedSuggestions = JSON.parse(cleanJson);
        if (Array.isArray(updatedSuggestions)) {
          currentPlan.suggestions = updatedSuggestions;
          return currentPlan;
        }
      } catch (err) {
        console.warn('Lỗi AI tinh chỉnh, chuyển sang bộ xử lý trực tiếp:', err);
      }
    }

    currentPlan.suggestions.forEach(function(s) {
      s.integrationBrief += ' (Đã cập nhật theo yêu cầu: ' + userFeedback.substring(0, 60) + ')';
      s.yccdAddition += ' [Cập nhật: ' + userFeedback.substring(0, 40) + ']';
      if (s.activityAddition) {
        s.activityAddition.teacherAct += ' (GV lưu ý: ' + userFeedback + ')';
      }
    });

    return currentPlan;
  },


  // =========================================================================
  // 7. LÀM SẠCH TÍCH HỢP CŨ & CHÈN TÍCH HỢP MỚI VÀO BÀI DẠY (CV 2345)
  // =========================================================================

  cleanLegacyIntegrationFromLesson: function(origLesson) {
    if (!origLesson) return origLesson;
    var les = JSON.parse(JSON.stringify(origLesson));

    var integKeywords = [
      '[Tích hợp', '[Tích hợp mới]', '[GDĐP]', '[QCN]', '[ATGT]', '[BVMT]', '[KNS]', '[GDTC]',
      'Tích hợp GDĐP', 'Tích hợp Quyền con người', 'Tích hợp Quyền trẻ em', 'Tích hợp Phòng chống đuối nước',
      'Tích hợp Giáo dục tài chính', 'Tích hợp An toàn giao thông', 'Tích hợp Bảo vệ môi trường',
      'Tích hợp Chuyển đổi số', 'Tích hợp Kỹ năng số', 'Tích hợp Quốc phòng'
    ];

    function isIntegratedText(text) {
      if (!text || typeof text !== 'string') return false;
      return integKeywords.some(function(kw) { return text.indexOf(kw) !== -1; });
    }

    if (Array.isArray(les.yccd)) {
      les.yccd = les.yccd.filter(function(line) { return !isIntegratedText(line); });
    }

    var dodungProp = Array.isArray(les.dodung) ? 'dodung' : (Array.isArray(les.teachingAids) ? 'teachingAids' : null);
    if (dodungProp && Array.isArray(les[dodungProp])) {
      les[dodungProp] = les[dodungProp].filter(function(line) { return !isIntegratedText(line); });
    }

    if (Array.isArray(les.tables)) {
      les.tables = les.tables.map(function(tableRows) {
        if (!Array.isArray(tableRows)) return tableRows;
        return tableRows.filter(function(row) {
          if (!Array.isArray(row)) return true;
          var rowStr = row.join(' ');
          return !isIntegratedText(rowStr);
        });
      });
    }

    return les;
  },

  injectIntegrationIntoLesson: function(origLesson, suggestion, overwriteLegacy) {
    var shouldClean = (overwriteLegacy !== false);
    var lesson = shouldClean ? this.cleanLegacyIntegrationFromLesson(origLesson) : JSON.parse(JSON.stringify(origLesson));

    if (!lesson.yccd) lesson.yccd = [];
    if (suggestion.yccdAddition) {
      lesson.yccd.push('[Tích hợp mới] ' + suggestion.yccdAddition.replace(/^-\s*/, ''));
    }

    var dodungList = lesson.dodung || lesson.teachingAids || [];
    if (suggestion.dodungAddition) {
      dodungList.push('[Tích hợp] ' + suggestion.dodungAddition.replace(/^-\s*/, ''));
    }
    lesson.dodung = dodungList;
    lesson.teachingAids = dodungList;

    if (!lesson.tables || lesson.tables.length === 0) {
      lesson.tables = [[]];
    }

    if (suggestion.activityAddition) {
      var act = suggestion.activityAddition;
      var newHeaderRow = ['* ' + act.stepName + ' [NỘI DUNG TÍCH HỢP MỚI]'];
      var newActRow = [
        '[Tích hợp] ' + act.teacherAct,
        act.studentAct
      ];

      var lastTable = lesson.tables[lesson.tables.length - 1];
      if (Array.isArray(lastTable)) {
        lastTable.push(newHeaderRow);
        lastTable.push(newActRow);
      }
    }

    return lesson;
  },

  applyIntegrationToWeekRange: async function(plan, selectedLessonsMap, overwriteLegacy) {
    var grade = plan.grade;
    var subj = plan.subjectKey;
    var sWeek = plan.startWeek;
    var eWeek = plan.endWeek;
    var shouldClean = (overwriteLegacy !== false);

    await this.ensureSubjectLoaded(grade, subj);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    var weeksPlan = khbdDataObj ? khbdDataObj.getWeekRangePlan(grade, subj, sWeek, eWeek) : [];

    var lookupSuggestions = {};
    (plan.suggestions || []).forEach(function(s) {
      if (selectedLessonsMap[s.lessonId] !== false) {
        lookupSuggestions[s.lessonId] = s;
      }
    });

    var finalLessons = [];

    weeksPlan.forEach(function(weekItem) {
      (weekItem.lessons || []).forEach(function(origLes, lIdx) {
        var lessonId = subj + '_' + weekItem.week + '_' + lIdx;
        var suggestion = lookupSuggestions[lessonId];

        var integratedLesson = null;
        if (suggestion) {
          integratedLesson = IntegrationService.injectIntegrationIntoLesson(origLes, suggestion, shouldClean);
        } else {
          integratedLesson = shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(origLes) : JSON.parse(JSON.stringify(origLes));
        }

        integratedLesson.week = weekItem.week;
        integratedLesson.grade = grade;
        integratedLesson.subjectName = plan.subjectName;
        integratedLesson.subjectKey = subj;

        finalLessons.push(integratedLesson);
      });
    });

    return finalLessons;
  },


  // =========================================================================
  // 8. XUẤT FILE WORD (.DOC) CHUẨN CÔNG VĂN 2345 (TỪNG MÔN & THEO TKB)
  // =========================================================================

  /**
   * Xuất file Word trọn gói cho Kế hoạch bài dạy theo Môn
   */
  exportToWord: async function(lessonsOrWeeks, metadata) {
    var meta = metadata || {};
    var grade = meta.grade || 5;
    var subjectName = meta.subjectName || 'Môn học';
    var startWeek = meta.startWeek || 1;
    var endWeek = meta.endWeek || startWeek;
    var schoolName = meta.schoolName || 'TRƯỜNG TIỂU HỌC .................................';
    var teacherName = meta.teacherName || 'Lê Thành Long';
    var schoolYear = meta.schoolYear || '2026 - 2027';
    var className = meta.className || '';

    var lessons = [];
    if (Array.isArray(lessonsOrWeeks)) {
      if (lessonsOrWeeks.length > 0 && lessonsOrWeeks[0].lessons) {
        lessonsOrWeeks.forEach(function(w) {
          (w.lessons || []).forEach(function(l) { lessons.push(l); });
        });
      } else {
        lessons = lessonsOrWeeks;
      }
    }

    var docHtml = this.generateWordHtmlStructure(lessons, {
      title: 'Kế hoạch bài dạy ' + (className || ('Khối ' + grade)) + ' - Môn ' + subjectName + ' (Tuần ' + startWeek + ' - ' + endWeek + ')',
      schoolName: schoolName,
      teacherName: teacherName,
      schoolYear: schoolYear,
      className: className,
      grade: grade,
      subjectName: subjectName,
      startWeek: startWeek,
      endWeek: endWeek
    });

    var filename = meta.filename || ('KHBD_Lop' + grade + '_' + subjectName + '_Tuan' + startWeek + '-' + endWeek + '.doc');
    return await this.downloadWordBlob(docHtml, filename);
  },

  /**
   * Xuất file Word trọn gói 1 Tuần theo Thời Khóa Biểu (.doc)
   */
  exportWeekByTimetableWord: async function(weeklyPlanResult, metadata) {
    var meta = metadata || {};
    var grade = weeklyPlanResult.grade || meta.grade || 5;
    var weekNum = weeklyPlanResult.week || meta.week || 1;
    var timetable = weeklyPlanResult.timetable || meta.timetable || this.getDefaultTimetable(grade);
    var lessons = weeklyPlanResult.lessons || [];
    var schoolName = meta.schoolName || 'TRƯỜNG TIỂU HỌC .................................';
    var teacherName = meta.teacherName || 'Lê Thành Long';
    var schoolYear = meta.schoolYear || '2026 - 2027';
    var className = meta.className || '';

    // Xây dựng Bảng Thời Khóa Biểu Tuần định dạng Word
    var tkbTableRows = '';
    
    // Buổi Sáng
    for (var slot = 0; slot < 4; slot++) {
      tkbTableRows += '<tr><td style="font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt; background: #f8fafc;">Tiết ' + (slot + 1) + ' (Sáng)</td>';
      timetable.forEach(function(day) {
        var sKey = (day.morning && day.morning[slot]) || '';
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 4pt; text-align: center;">' + (sKey ? IntegrationService.getSubjectDisplayName(sKey) : '') + '</td>';
      });
      tkbTableRows += '</tr>';
    }

    // Buổi Chiều
    for (var slot = 0; slot < 3; slot++) {
      tkbTableRows += '<tr><td style="font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt; background: #f8fafc;">Tiết ' + (slot + 1) + ' (Chiều)</td>';
      timetable.forEach(function(day) {
        var sKey = (day.afternoon && day.afternoon[slot]) || '';
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 4pt; text-align: center;">' + (sKey ? IntegrationService.getSubjectDisplayName(sKey) : '') + '</td>';
      });
      tkbTableRows += '</tr>';
    }

    var tkbCoverHtml = `
      <div style="text-align: center; margin-bottom: 20pt;">
        <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 12pt;">
          <tr>
            <td style="width: 50%; vertical-align: top; text-align: left; font-size: 11pt;">
              <p style="margin: 0;"><b>${schoolName}</b></p>
              <p style="margin: 2pt 0 0 0;">Giáo viên: <b>${teacherName}</b></p>
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right; font-size: 11pt;">
              <p style="margin: 0;"><b>NĂM HỌC: ${schoolYear}</b></p>
              <p style="margin: 2pt 0 0 0;">${className ? ('<b>' + className + '</b> • ') : ('Khối <b>' + grade + '</b> • ')}<b>TUẦN ${weekNum}</b></p>
            </td>
          </tr>
        </table>

        <h2 style="font-size: 15pt; font-weight: bold; text-transform: uppercase; margin: 10pt 0 4pt 0;">
          KẾ HOẠCH BÀI DẠY TUẦN ${weekNum}
        </h2>
        <p style="font-size: 12pt; font-style: italic; margin: 0 0 15pt 0;">(Sắp xếp tuần tự theo Thời khóa biểu giảng dạy)</p>

        <h3 style="font-size: 12.5pt; font-weight: bold; text-align: left; text-transform: uppercase; margin: 10pt 0 4pt 0;">
          THỜI KHÓA BIỂU TUẦN ${weekNum}:
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15pt; font-size: 11pt;">
          <thead>
            <tr style="background: #e2e8f0; font-weight: bold; text-align: center;">
              <th style="border: 1pt solid #000; padding: 5pt; width: 15%;">Tiết</th>
              <th style="border: 1pt solid #000; padding: 5pt; width: 17%;">Thứ Hai</th>
              <th style="border: 1pt solid #000; padding: 5pt; width: 17%;">Thứ Ba</th>
              <th style="border: 1pt solid #000; padding: 5pt; width: 17%;">Thứ Tư</th>
              <th style="border: 1pt solid #000; padding: 5pt; width: 17%;">Thứ Năm</th>
              <th style="border: 1pt solid #000; padding: 5pt; width: 17%;">Thứ Sáu</th>
            </tr>
          </thead>
          <tbody>
            ${tkbTableRows}
          </tbody>
        </table>
      </div>
      <div style="page-break-before: always;"></div>
    `;

    var docHtml = this.generateWordHtmlStructure(lessons, {
      title: 'Kế hoạch bài dạy Tuần ' + weekNum + ' - ' + (className || ('Khối ' + grade)) + ' (Theo Thời khóa biểu)',
      schoolName: schoolName,
      teacherName: teacherName,
      schoolYear: schoolYear,
      className: className,
      grade: grade,
      weekNum: weekNum,
      isTimetableDoc: true,
      tkbCoverHtml: tkbCoverHtml
    });

    var filename = meta.filename || ('KHBD_Tuan_' + weekNum + '_Lop_' + grade + '_Theo_TKB.doc');
    return await this.downloadWordBlob(docHtml, filename);
  },

  generateWordHtmlStructure: function(lessons, meta) {
    var schoolName = meta.schoolName || 'TRƯỜNG TIỂU HỌC .................................';
    var teacherName = meta.teacherName || 'Lê Thành Long';
    var schoolYear = meta.schoolYear || '2026 - 2027';
    var className = meta.className || '';
    var grade = meta.grade || 5;
    var isTimetableDoc = !!meta.isTimetableDoc;

    var docHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${meta.title || 'Kế hoạch bài dạy'}</title>
        <style>
          @page {
            size: A4;
            margin: 20mm 20mm 20mm 25mm;
            mso-header-margin: 10mm;
            mso-footer-margin: 10mm;
          }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.35;
            color: #000000;
          }
          h1, h2, h3, h4 {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 0;
          }
          .header-table {
            width: 100%;
            border-collapse: collapse;
            border: none;
            margin-bottom: 12pt;
          }
          .header-table td {
            border: none;
            vertical-align: top;
          }
          .title-box {
            text-align: center;
            margin-bottom: 14pt;
          }
          .title-box h2 {
            font-size: 14pt;
            font-weight: bold;
            text-transform: uppercase;
          }
          .section-title {
            font-size: 13pt;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 10pt;
            margin-bottom: 4pt;
          }
          .table-activity {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6pt;
            margin-bottom: 10pt;
          }
          .table-activity th {
            border: 1pt solid #000000;
            padding: 6pt;
            background-color: #f2f2f2;
            font-weight: bold;
            text-align: center;
          }
          .table-activity td {
            border: 1pt solid #000000;
            padding: 6pt;
            vertical-align: top;
          }
          .page-break {
            page-break-before: always;
          }
        </style>
      </head>
      <body>
    `;

    if (meta.tkbCoverHtml) {
      docHtml += meta.tkbCoverHtml;
    }

    var isHeaderRow = function(r) {
      if (!Array.isArray(r) || r.length < 2) return false;
      var c0 = (r[0] || '').toLowerCase().trim();
      var c1 = (r[1] || '').toLowerCase().trim();
      return (c0.includes('giáo viên') || c0.includes('gv') || c0.includes('dạy học') || c0.includes('thầy')) &&
             (c1.includes('học sinh') || c1.includes('hs') || c1.includes('trò') || c1.includes('luyện tập'));
    };

    lessons.forEach(function(les, lIdx) {
      if (lIdx > 0 || meta.tkbCoverHtml) {
        docHtml += '<div class="page-break"></div>';
      }

      var daySessionInfo = les.dayName ? ('<p style="font-weight: bold; color: #1e40af; font-size: 12pt; margin-bottom: 4pt;">' + les.dayName + ' • Buổi ' + les.session + ' • ' + (les.periodSlot ? ('Tiết ' + les.periodSlot) : '') + '</p>') : '';

      var isDouble = (les.periodSlot && les.periodSlot.toString().includes('-')) || (les.period && (les.period.toLowerCase().includes('2 tiết') || les.period.toLowerCase().includes('tiết đôi')));
      var durationDefault = isDouble ? '70 phút' : '35 phút';

      var yccdContent = (les.yccd || []).map(function(line) {
        if (typeof line !== 'string') return '';
        var cleanLine = line;
        if (/^thời\s*gian\s*thực\s*hiện\s*:\s*[.\s_]*(?:\(.*\))?$/i.test(line)) {
          cleanLine = 'Thời gian thực hiện: ' + durationDefault;
        } else if (/^thời\s*gian\s*thực\s*hiện\s*:\s*[.\s_]+/i.test(line)) {
          cleanLine = line.replace(/:\s*[.\s_]+/, ': ' + durationDefault + ' ');
        }

        var isTichHop = cleanLine.indexOf('[Tích hợp') !== -1;
        if (isTichHop) {
          return '<p style="margin: 3pt 0; background-color: #fdf2f8; color: #9d174d;"><b>' + cleanLine + '</b></p>';
        }
        return '<p style="margin: 3pt 0;">' + cleanLine + '</p>';
      }).join('');

      var dodungList = les.dodung || les.teachingAids || [];
      var dodungContent = dodungList.map(function(line) {
        if (typeof line !== 'string') return '';
        var isTichHop = line.indexOf('[Tích hợp') !== -1;
        if (isTichHop) {
          return '<p style="margin: 3pt 0; background-color: #eff6ff; color: #1e40af;"><b>' + line + '</b></p>';
        }
        return '<p style="margin: 3pt 0;">' + line + '</p>';
      }).join('');

      var actTablesHtml = '';
      if (les.tables && les.tables.length > 0) {
        les.tables.forEach(function(tableRows) {
          if (!tableRows || tableRows.length === 0) return;
          var rowsHtml = '';
          for (var rIdx = 0; rIdx < tableRows.length; rIdx++) {
            var r = tableRows[rIdx];
            if (!Array.isArray(r)) continue;
            if (rIdx === 0 && isHeaderRow(r)) continue;

            if (r.length >= 2) {
              var gvCol = (r[0] || '').replace(/\n/g, '<br/>');
              var hsCol = (r[1] || '').replace(/\n/g, '<br/>');
              var isTichHop = gvCol.indexOf('[Tích hợp') !== -1 || hsCol.indexOf('[Tích hợp') !== -1;
              var rowBg = isTichHop ? 'background-color: #f5f3ff;' : '';
              rowsHtml += `
                <tr style="${rowBg}">
                  <td style="width: 50%; vertical-align: top; padding: 6pt; border: 1pt solid #000;">
                    <div>${gvCol}</div>
                  </td>
                  <td style="width: 50%; vertical-align: top; padding: 6pt; border: 1pt solid #000;">
                    <div>${hsCol}</div>
                  </td>
                </tr>
              `;
            } else if (r.length === 1) {
              rowsHtml += `<tr><td colspan="2" style="padding: 6pt; border: 1pt solid #000; background-color: #f8fafc; font-weight: bold;">${(r[0] || '').replace(/\n/g, '<br/>')}</td></tr>`;
            }
          }

          if (rowsHtml) {
            actTablesHtml += `
              <table class="table-activity">
                <thead>
                  <tr>
                    <th style="width: 50%;">Hoạt động của giáo viên</th>
                    <th style="width: 50%;">Hoạt động của học sinh</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            `;
          }
        });
      }

      var headerBlock = '';
      if (!isTimetableDoc && lIdx === 0) {
        headerBlock = `
          <table class="header-table">
            <tr>
              <td style="width: 50%;">
                <p><b>${schoolName}</b></p>
                <p>Giáo viên: <b>${teacherName}</b></p>
              </td>
              <td style="width: 50%; text-align: right;">
                <p><b>NĂM HỌC: ${schoolYear}</b></p>
                <p>${className ? ('<b>' + className + '</b> • ') : ('Khối: <b>' + (les.grade || grade) + '</b> • ')}Tuần: <b>${les.week || 1}</b></p>
              </td>
            </tr>
          </table>
        `;
      }

      docHtml += `
        <div class="title-box">
          ${headerBlock}
          ${daySessionInfo}
          <h2>KẾ HOẠCH BÀI DẠY</h2>
          <p style="font-size: 13pt; font-weight: bold; margin: 2pt 0 0 0;">MÔN: ${(les.subjectName || les.subjectKey || 'MÔN HỌC').toUpperCase()}</p>
          <p style="font-size: 14pt; font-weight: bold; margin-top: 4pt; color: #1e3a8a;">${les.lessonTitle || les.title || 'BÀI DẠY'}</p>
          ${les.period ? ('<p style="font-style: italic; margin-top: 2pt;">(' + les.period + ')</p>') : ''}
        </div>

        <div class="section-title">I. YÊU CẦU CẦN ĐẠT:</div>
        <div style="margin-left: 10pt;">
          ${yccdContent || '<p>Theo quy định của chương trình môn học.</p>'}
        </div>

        <div class="section-title">II. ĐỒ DÙNG DẠY HỌC:</div>
        <div style="margin-left: 10pt;">
          ${dodungContent || '<p>1. Giáo viên: SGK, máy tính, bài giảng điện tử.<br>2. Học sinh: SGK, vở bài tập, đồ dùng học tập.</p>'}
        </div>

        <div class="section-title">III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU:</div>
        <div style="margin-left: 5pt;">
          ${actTablesHtml || '<p>Thực hiện theo tiến trình chuẩn của bài dạy.</p>'}
        </div>

        <div class="section-title">IV. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ):</div>
        <div style="margin-left: 10pt;">
          <p>.................................................................................................................................................</p>
          <p>.................................................................................................................................................</p>
        </div>
      `;
    });

    docHtml += '</body></html>';
    return docHtml;
  },

  downloadWordBlob: async function(docHtml, filename) {
    if (typeof Blob === 'undefined') return { success: false, error: 'Blob not supported' };
    var blob = new Blob(['\ufeff' + docHtml], { type: 'application/msword;charset=utf-8' });

    // 1. Mở Hộp thoại Lưu File (Save As dialog) chuẩn Windows / Hệ điều hành thông qua File System Access API
    if (typeof window !== 'undefined' && typeof window.showSaveFilePicker === 'function') {
      try {
        var pickerOpts = {
          suggestedName: filename,
          types: [{
            description: 'Tài liệu Microsoft Word (.doc)',
            accept: { 'application/msword': ['.doc'] }
          }]
        };
        var handle = await window.showSaveFilePicker(pickerOpts);
        var writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return { success: true, method: 'picker', filename: filename };
      } catch (err) {
        // Nếu người dùng bấm "Hủy / Cancel" trên hộp thoại Lưu của Windows
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return { success: false, aborted: true };
        }
        // Trường hợp trình duyệt chặn quyền hoặc hết hạn user gesture -> fallback sang thẻ <a>
        console.warn('showSaveFilePicker fallback to anchor download:', err);
      }
    }

    // 2. Hỗ trợ trình duyệt cũ IE / Edge Legacy
    if (typeof window !== 'undefined' && window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return { success: true, method: 'msSave', filename: filename };
    }

    // 3. Chuẩn HTML5 download qua thẻ <a> (tải thẳng vào thư mục Downloads của máy tính)
    if (typeof document !== 'undefined') {
      var url = URL.createObjectURL(blob);
      var downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(function() {
        if (downloadLink.parentNode) {
          downloadLink.parentNode.removeChild(downloadLink);
        }
        URL.revokeObjectURL(url);
      }, 1500);
      return { success: true, method: 'direct', filename: filename };
    }

    return { success: false, error: 'No download mechanism available' };
  }
};

if (typeof window !== 'undefined') {
  window.IntegrationService = IntegrationService;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IntegrationService;
}
