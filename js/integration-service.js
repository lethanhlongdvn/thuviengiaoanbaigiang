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

  
  // =========================================================================
  // 1.1. BỘ PHÂN TÍCH THỜI KHÓA BIỂU ĐA ĐỊNH DẠNG (EXCEL, WORD, CSV, TXT)
  // =========================================================================

  normalizeSubjectKey: function(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';
    var text = rawText.trim().toLowerCase();
    if (!text || text === '-' || text === '—' || text === 'nghỉ' || text === 'trống') return '';

    var noAcc = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (text.includes('toán') || noAcc.includes('toan')) return 'toan';
    if (text.includes('tiếng việt') || noAcc.includes('tieng viet') || text.includes('t.việt') || text.includes('t. việt') || text === 'tv' || text.includes('tập đọc') || text.includes('chính tả') || text.includes('luyện từ') || text.includes('tập làm văn')) return 'tieng_viet';
    if (text.includes('khoa học') || noAcc.includes('khoa hoc') || text === 'kh') return 'khoa_hoc';
    if (text.includes('lịch sử') || text.includes('địa lí') || text.includes('địa lý') || noAcc.includes('lich su') || noAcc.includes('dia ly') || text.includes('ls&đl') || text.includes('ls-đl') || text.includes('ls - đl') || text === 'lsdl') return 'lich_su_dia_ly';
    if (text.includes('tự nhiên') || text.includes('xã hội') || noAcc.includes('tu nhien') || text.includes('tnxh') || text.includes('tn-xh')) return 'tnxh';
    if (text.includes('đạo đức') || noAcc.includes('dao duc') || text === 'đđ' || text === 'dd') return 'dao_duc';
    if (text.includes('trải nghiệm') || noAcc.includes('trai nghiem') || text.includes('hdtn') || text.includes('hđtn')) return 'hdtn';
    if (text.includes('công nghệ') || noAcc.includes('cong nghe') || text === 'cn') return 'cong_nghe';
    if (text.includes('tin học') || noAcc.includes('tin hoc') || text.includes('tin') || text === 'th') return 'tin_hoc';
    if (text.includes('tiếng anh') || noAcc.includes('tieng anh') || text.includes('anh') || text.includes('english') || text === 'ta') return 'tieng_anh';
    if (text.includes('âm nhạc') || noAcc.includes('am nhac') || text.includes('nhạc') || text === 'an') return 'am_nhac';
    if (text.includes('mĩ thuật') || text.includes('mỹ thuật') || noAcc.includes('mi thuat') || text === 'mt') return 'mi_thuat';
    if (text.includes('thể chất') || text.includes('thể dục') || noAcc.includes('the chat') || noAcc.includes('the duc') || text.includes('gdtc') || text === 'td') return 'gdtc';
    if (text.includes('chào cờ') || text.includes('sinh hoạt') || noAcc.includes('chao co') || noAcc.includes('sinh hoat') || text.includes('shl') || text.includes('shdc') || text.includes('shcn') || text.includes('tổng kết')) return 'shcn';

    return text;
  },

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

            var parsed = IntegrationService.parseTimetableFromGrid(rows, curGrade);
            resolve({
              success: true,
              fileName: fileName,
              fileType: 'Excel (' + ext.toUpperCase() + ')',
              timetable: parsed.timetable,
              slotsCount: parsed.slotsCount
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
          mammoth.convertToHtml({ arrayBuffer: e.target.result })
            .then(function(result) {
              var html = result.value || '';
              var grid = IntegrationService.extractGridFromHtmlTable(html);
              if (grid.length > 0) {
                var parsed = IntegrationService.parseTimetableFromGrid(grid, curGrade);
                resolve({
                  success: true,
                  fileName: fileName,
                  fileType: 'Word (DOCX)',
                  timetable: parsed.timetable,
                  slotsCount: parsed.slotsCount
                });
              } else {
                // Fallback: parse raw text lines
                return mammoth.extractRawText({ arrayBuffer: e.target.result }).then(function(textRes) {
                  var rawText = textRes.value || '';
                  var parsed = IntegrationService.parseTimetableFromText(rawText, curGrade);
                  resolve({
                    success: true,
                    fileName: fileName,
                    fileType: 'Word (DOCX Text)',
                    timetable: parsed.timetable,
                    slotsCount: parsed.slotsCount
                  });
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
      
      if (ext === 'json') {
        try {
          var jsonData = JSON.parse(text);
          if (Array.isArray(jsonData) && jsonData.length === 5) {
            return {
              success: true,
              fileName: fileName,
              fileType: 'JSON',
              timetable: jsonData,
              slotsCount: 35
            };
          }
        } catch (jErr) {}
      }

      var parsed = this.parseTimetableFromText(text, curGrade);
      return {
        success: true,
        fileName: fileName,
        fileType: ext.toUpperCase(),
        timetable: parsed.timetable,
        slotsCount: parsed.slotsCount
      };
    }

    // 4. TỆP PDF
    if (ext === 'pdf') {
      var pdfObj = await this.extractTextFromFile(file);
      var parsed = this.parseTimetableFromText(pdfObj.text || '', curGrade);
      return {
        success: true,
        fileName: fileName,
        fileType: 'PDF Document',
        timetable: parsed.timetable,
        slotsCount: parsed.slotsCount
      };
    }

    throw new Error('Định dạng tệp .' + ext + ' chưa được hỗ trợ. Vui lòng chọn .xlsx, .xls, .docx, .csv hoặc .txt.');
  },

  /**
   * Trích xuất ma trận ô (2D Array) từ bảng HTML trong tệp Word
   */
  extractGridFromHtmlTable: function(html) {
    var grid = [];
    if (!html) return grid;

    var tempDiv = null;
    if (typeof document !== 'undefined') {
      tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      var tables = tempDiv.querySelectorAll('table');
      if (tables.length > 0) {
        var table = tables[0];
        var rows = table.querySelectorAll('tr');
        rows.forEach(function(tr) {
          var rowData = [];
          var cells = tr.querySelectorAll('td, th');
          cells.forEach(function(c) {
            rowData.push((c.textContent || '').trim());
          });
          if (rowData.length > 0) grid.push(rowData);
        });
      }
    }
    return grid;
  },

  /**
   * Phân tích Ma trận lưới 2D (từ Excel hoặc Word Table) thành Thời Khóa Biểu chuẩn 5 ngày
   */
  parseTimetableFromGrid: function(rows, grade) {
    var g = parseInt(grade) || 5;
    var days = [
      { day: 'Thứ Hai', dayNum: 2, morning: [], afternoon: [] },
      { day: 'Thứ Ba', dayNum: 3, morning: [], afternoon: [] },
      { day: 'Thứ Tư', dayNum: 4, morning: [], afternoon: [] },
      { day: 'Thứ Năm', dayNum: 5, morning: [], afternoon: [] },
      { day: 'Thứ Sáu', dayNum: 6, morning: [], afternoon: [] }
    ];

    if (!Array.isArray(rows) || rows.length === 0) {
      return { timetable: IntegrationService.getDefaultTimetable(g), slotsCount: 35 };
    }

    // 1. Tìm dòng Header chứa các Thứ (Thứ 2/Hai, Thứ 3/Ba, Thứ 4/Tư, Thứ 5/Năm, Thứ 6/Sáu)
    var dayColMap = {}; // { 2: colIdx, 3: colIdx, 4: colIdx, 5: colIdx, 6: colIdx }
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
        } else if (cellStr.includes('thứ 4') || cellStr.includes('thứ tư') || cellStr.includes('thứ 4') || cellStr === 'tư' || cellStr === 't4') {
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

    // Nếu không tìm thấy cột Thứ rõ ràng, giả định các cột liên tiếp (thường từ cột 1 hoặc 2)
    if (Object.keys(dayColMap).length < 3) {
      var startCol = (rows[0] && rows[0].length >= 6) ? (rows[0].length - 5) : 1;
      dayColMap = { 2: startCol, 3: startCol + 1, 4: startCol + 2, 5: startCol + 3, 6: startCol + 4 };
      headerRowIdx = 0;
    }

    var isAfternoon = false;
    var morningSlots = { 2: [], 3: [], 4: [], 5: [], 6: [] };
    var afternoonSlots = { 2: [], 3: [], 4: [], 5: [], 6: [] };

    for (var r = headerRowIdx + 1; r < rows.length; r++) {
      var row = rows[r] || [];
      var rowText = row.join(' ').toLowerCase();

      if (rowText.includes('chiều') || rowText.includes('buổi chiều') || rowText.includes('buoi chieu')) {
        isAfternoon = true;
      }
      if (rowText.includes('sáng') || rowText.includes('buổi sáng') || rowText.includes('buoi sang')) {
        isAfternoon = false;
      }

      var hasAnySubject = false;
      for (var dayNum = 2; dayNum <= 6; dayNum++) {
        var col = dayColMap[dayNum];
        var cellVal = (col !== undefined && row[col] !== undefined) ? String(row[col]).trim() : '';
        var subjKey = IntegrationService.normalizeSubjectKey(cellVal);

        if (subjKey) {
          hasAnySubject = true;
          if (isAfternoon) {
            if (afternoonSlots[dayNum].length < 3) afternoonSlots[dayNum].push(subjKey);
          } else {
            if (morningSlots[dayNum].length < 4) {
              morningSlots[dayNum].push(subjKey);
            } else if (afternoonSlots[dayNum].length < 3) {
              afternoonSlots[dayNum].push(subjKey);
            }
          }
        }
      }
    }

    var defaultTkb = IntegrationService.getDefaultTimetable(g);
    var filledCount = 0;

    days.forEach(function(dayItem, dIdx) {
      var dNum = dayItem.dayNum;
      var defDay = defaultTkb[dIdx] || {};

      // Điền buổi sáng (đảm bảo đủ 4 tiết)
      var mList = morningSlots[dNum] || [];
      for (var s = 0; s < 4; s++) {
        var val = mList[s] || (defDay.morning && defDay.morning[s]) || 'toan';
        dayItem.morning.push(val);
        if (mList[s]) filledCount++;
      }

      // Điền buổi chiều (tối đa 3 tiết)
      var aList = afternoonSlots[dNum] || [];
      for (var a = 0; a < 3; a++) {
        var val = aList[a] || (defDay.afternoon && defDay.afternoon[a]) || '';
        if (val) {
          dayItem.afternoon.push(val);
          if (aList[a]) filledCount++;
        }
      }
    });

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
        // Tách theo nhiều khoảng trắng
        var spaceParts = line.split(/\s{2,}/).map(function(p) { return p.trim(); });
        if (spaceParts.length > 1) grid.push(spaceParts);
        else grid.push([line]);
      }
    });

    return this.parseTimetableFromGrid(grid, grade);
  },


  getSubjectDisplayName: function(subjectKey) {
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
    return map[subjectKey] || (subjectKey ? subjectKey.toUpperCase() : 'Môn học');
  },


  // =========================================================================
  // 2. TRÍCH XUẤT NỘI DUNG TÀI LIỆU TẢI LÊN (.DOCX, .PDF, .TXT)
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
  // 3. NẠP DỮ LIỆU KHBD SỐ HÓA & ĐẢM BẢO TOÀN BỘ MÔN TRONG TUẦN
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
  // 4. GHÉP TUẦN TỰ TOÀN BỘ KHBD TRONG TUẦN THEO THỜI KHÓA BIỂU
  // =========================================================================

  /**
   * Xếp toàn bộ bài dạy các môn trong tuần theo đúng thứ tự Tiết & Thứ của TKB
   */
  buildWeeklyPlanByTimetable: async function(grade, weekNumber, customTimetable, integratedMap, overwriteLegacy) {
    var g = parseInt(grade) || 5;
    var wNum = parseInt(weekNumber) || 1;
    var timetable = customTimetable || this.getDefaultTimetable(g);
    var shouldClean = (overwriteLegacy !== false);

    await this.ensureAllSubjectsLoadedForGrade(g);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    
    // Đếm số tiết đã lấy của từng môn trong tuần đó
    var subjectCounters = {};
    var weeklyOrderedLessons = [];
    var globalPeriodCounter = 1;

    timetable.forEach(function(dayItem) {
      var dayName = dayItem.day || ('Thứ ' + dayItem.dayNum);
      
      // Xử lý buổi sáng
      (dayItem.morning || []).forEach(function(sKey, mIdx) {
        var cleanKey = (sKey || '').toLowerCase();
        if (!cleanKey || cleanKey === 'shcn') {
          // Sinh hoạt chào cờ / cuối tuần
          weeklyOrderedLessons.push({
            isSpecialSlot: true,
            dayName: dayName,
            session: 'Sáng',
            periodSlot: mIdx + 1,
            globalPeriod: globalPeriodCounter++,
            subjectKey: cleanKey || 'shcn',
            subjectName: cleanKey === 'shcn' ? 'Sinh hoạt lớp / Chào cờ' : 'Hoạt động trường',
            lessonTitle: 'Sinh hoạt đầu tuần / Tổng kết tuần',
            period: 'Tiết ' + (mIdx + 1),
            week: wNum,
            grade: g
          });
          return;
        }

        if (!subjectCounters[cleanKey]) subjectCounters[cleanKey] = 0;
        var curLessonIdx = subjectCounters[cleanKey];
        subjectCounters[cleanKey]++;

        var weekData = khbdDataObj ? khbdDataObj.getWeekPlan(g, cleanKey, wNum) : null;
        var origLesson = (weekData && weekData.lessons && weekData.lessons[curLessonIdx]) ? weekData.lessons[curLessonIdx] : null;

        var lessonItem = null;
        if (origLesson) {
          // Kiểm tra xem có tích hợp không
          var matchInteg = integratedMap ? integratedMap[cleanKey + '_' + wNum + '_' + curLessonIdx] : null;
          if (matchInteg) {
            lessonItem = IntegrationService.injectIntegrationIntoLesson(origLesson, matchInteg, shouldClean);
          } else {
            lessonItem = shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(origLesson) : JSON.parse(JSON.stringify(origLesson));
          }
        } else {
          // Fallback tạo bài dạy định dạng chuẩn nếu môn chưa nạp đủ
          lessonItem = {
            title: IntegrationService.getSubjectDisplayName(cleanKey) + ' (Tiết ' + (curLessonIdx + 1) + ')',
            lessonTitle: IntegrationService.getSubjectDisplayName(cleanKey) + ' - Tiết ' + (curLessonIdx + 1),
            period: 'Tiết ' + (curLessonIdx + 1),
            yccd: ['1. Về kiến thức, kĩ năng: Thực hiện theo chuẩn chương trình môn ' + IntegrationService.getSubjectDisplayName(cleanKey) + '.', '2. Về phẩm chất: Chăm chỉ, trách nhiệm.'],
            dodung: ['1. Giáo viên: SGK, máy tính, bài giảng điện tử.', '2. Học sinh: SGK, vở bài tập.'],
            tables: [[
              ['Hoạt động của giáo viên: Tiến hành bài dạy theo SGK.', 'Hoạt động của học sinh: Lắng nghe, thực hành, trao đổi.']
            ]]
          };
        }

        lessonItem.dayName = dayName;
        lessonItem.session = 'Sáng';
        lessonItem.periodSlot = mIdx + 1;
        lessonItem.globalPeriod = globalPeriodCounter++;
        lessonItem.subjectKey = cleanKey;
        lessonItem.subjectName = IntegrationService.getSubjectDisplayName(cleanKey);
        lessonItem.week = wNum;
        lessonItem.grade = g;

        weeklyOrderedLessons.push(lessonItem);
      });

      // Xử lý buổi chiều
      (dayItem.afternoon || []).forEach(function(sKey, aIdx) {
        var cleanKey = (sKey || '').toLowerCase();
        if (!cleanKey) return;

        if (!subjectCounters[cleanKey]) subjectCounters[cleanKey] = 0;
        var curLessonIdx = subjectCounters[cleanKey];
        subjectCounters[cleanKey]++;

        var weekData = khbdDataObj ? khbdDataObj.getWeekPlan(g, cleanKey, wNum) : null;
        var origLesson = (weekData && weekData.lessons && weekData.lessons[curLessonIdx]) ? weekData.lessons[curLessonIdx] : null;

        var lessonItem = null;
        if (origLesson) {
          var matchInteg = integratedMap ? integratedMap[cleanKey + '_' + wNum + '_' + curLessonIdx] : null;
          if (matchInteg) {
            lessonItem = IntegrationService.injectIntegrationIntoLesson(origLesson, matchInteg, shouldClean);
          } else {
            lessonItem = shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(origLesson) : JSON.parse(JSON.stringify(origLesson));
          }
        } else {
          lessonItem = {
            title: IntegrationService.getSubjectDisplayName(cleanKey) + ' (Tiết ' + (curLessonIdx + 1) + ')',
            lessonTitle: IntegrationService.getSubjectDisplayName(cleanKey) + ' - Tiết ' + (curLessonIdx + 1),
            period: 'Tiết ' + (curLessonIdx + 1),
            yccd: ['1. Về kiến thức, kĩ năng: Theo chương trình môn học.', '2. Về phẩm chất: Tự tin, chăm chỉ.'],
            dodung: ['1. GV: Đồ dùng trực quan.', '2. HS: Sách vở bài tập.'],
            tables: [[
              ['GV hướng dẫn học sinh thực hiện các nhiệm vụ học tập.', 'HS tích cực làm bài, trao đổi nhóm và báo cáo.']
            ]]
          };
        }

        lessonItem.dayName = dayName;
        lessonItem.session = 'Chiều';
        lessonItem.periodSlot = aIdx + 1;
        lessonItem.globalPeriod = globalPeriodCounter++;
        lessonItem.subjectKey = cleanKey;
        lessonItem.subjectName = IntegrationService.getSubjectDisplayName(cleanKey);
        lessonItem.week = wNum;
        lessonItem.grade = g;

        weeklyOrderedLessons.push(lessonItem);
      });
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
  // 5. AI PHÂN TÍCH TÍCH HỢP TÀI LIỆU
  // =========================================================================

  analyzeIntegrationPlanWithDocument: async function(params) {
    var grade = parseInt(params.grade) || 5;
    var subj = (params.subjectKey || params.subjectId || 'toan').toLowerCase();
    var sWeek = parseInt(params.startWeek) || 1;
    var maxAllowedEnd = Math.min(35, sWeek + 3); // Tối đa 4 tuần
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
      { key: 'bạo lực học đường', tag: 'Phòng chống bạo lực' },
      { key: 'văn hóa ứng xử', tag: 'Văn hóa ứng xử' },
      { key: 'stem', tag: 'Giáo dục STEM/STEAM' }
    ];

    var lower = clean.toLowerCase();
    keywords.forEach(function(kw) {
      if (lower.indexOf(kw.key) !== -1 && coreTopics.indexOf(kw.tag) === -1) {
        coreTopics.push(kw.tag);
      }
    });

    var extractedTopicName = coreTopics.length > 0 ? coreTopics.join(' • ') : (title || 'Nội dung Chuyên đề mới');

    return {
      topicName: extractedTopicName,
      keyPoints: sampleLines.slice(0, 5),
      fullLength: clean.length,
      snippet: clean.substring(0, 250) + '...'
    };
  },

  generatePlanViaSmartRuleEngine: function(grade, subj, weeksPlan, docSummary, userNotes) {
    var matrixLessons = [];
    var lessonGlobalIndex = 0;
    var topicName = docSummary.topicName || 'Chuyên đề Tích hợp Mới';
    var keyPoints = docSummary.keyPoints || [];

    var targetParts = [
      'Hoạt động Vận dụng, trải nghiệm',
      'Hoạt động Khởi động',
      'Hoạt động Luyện tập, thực hành (Bài tập liên hệ)',
      'Hoạt động Khám phá kiến thức mới'
    ];

    weeksPlan.forEach(function(wItem) {
      var wNum = wItem.week;
      (wItem.lessons || []).forEach(function(les, lIdx) {
        var lTitle = les.lessonTitle || les.title || ('Bài học ' + (lIdx + 1));
        var lTopic = les.topic || '';

        var targetPart = targetParts[lIdx % targetParts.length];
        var level = (lIdx % 3 === 0) ? 'Bộ phận' : 'Liên hệ';

        var refPoint = keyPoints[lIdx % Math.max(1, keyPoints.length)] || ('Nội dung gắn liền với định hướng ' + topicName);
        var brief = 'Tích hợp nội dung ' + topicName + ' vào ' + targetPart + ': ' + (refPoint.length > 70 ? refPoint.substring(0, 70) + '...' : refPoint);

        var yccdText = '• [Tích hợp ' + topicName + ']: Vận dụng kiến thức bài học để nhận biết, liên hệ thực tế và hình thành ý thức/kỹ năng theo tài liệu hướng dẫn: ' + topicName + '.';
        var dodungText = '• [Tích hợp ' + topicName + '] Giáo viên: Phiếu học tập, tranh ảnh/tư liệu trích xuất từ tài liệu ' + topicName + '; Học sinh: Đồ dùng học tập, tranh ảnh liên hệ thực tế.';

        var gvAction = '';
        var hsAction = '';

        if (targetPart.indexOf('Vận dụng') !== -1) {
          gvAction = '- GV liên hệ thực tế nội dung bài học với tài liệu ' + topicName + ':\n  + Nêu tình huống/câu hỏi: "' + refPoint + '"\n  + Hướng dẫn HS thảo luận nhóm và liên hệ hành động thực tế của bản thân.\n- GV nhận xét, tuyên dương và chốt lại thông điệp giáo dục.';
          hsAction = '- HS lắng nghe tình huống và trao đổi tích cực trong nhóm đôi/nhóm 4.\n- Đại diện 1-2 HS chia sẻ cách giải quyết/liên hệ trước lớp.\n- Ghi nhớ và cam kết thực hiện trong học tập và sinh hoạt hàng ngày.';
        } else if (targetPart.indexOf('Khởi động') !== -1) {
          gvAction = '- GV tạo không khí hào hứng bằng câu hỏi/hình ảnh liên hệ tới ' + topicName + ':\n  + Trình chiếu tư liệu: "' + refPoint + '"\n  + Đặt câu hỏi gợi mở để dẫn dắt vào bài mới.\n- GV nhận xét và kết nối vào bài học.';
          hsAction = '- HS quan sát hình ảnh/nghe câu hỏi gợi mở.\n- HS xung phong phát biểu nêu cảm nhận hoặc hiểu biết ban đầu.\n- Sẵn sàng bước vào bài học mới với tâm thế tích cực.';
        } else if (targetPart.indexOf('Luyện tập') !== -1) {
          gvAction = '- GV thiết kế/lồng ghép thêm câu hỏi vận dụng gắn với tài liệu ' + topicName + ' vào bài tập luyện tập.\n- Yêu cầu HS áp dụng kiến thức vừa học để xử lý tình huống thực tế.\n- Chữa bài và nhận xét câu trả lời của HS.';
          hsAction = '- HS đọc kỹ yêu cầu bài tập có lồng ghép nội dung ' + topicName + '.\n- Thực hiện làm bài cá nhân vào vở/phiếu học tập.\n- Trình bày kết quả và lắng nghe bạn, thầy cô nhận xét.';
        } else {
          gvAction = '- Trong quá trình hướng dẫn khám phá kiến thức mới, GV mở rộng liên hệ tới nội dung ' + topicName + ' (' + refPoint + ').\n- Nhấn mạnh ý nghĩa thực tiễn của kiến thức.';
          hsAction = '- HS chú ý lắng nghe và quan sát ví dụ liên hệ thực tế của giáo viên.\n- Nêu thêm ví dụ tương tự từ cuộc sống xung quanh em.';
        }

        var item = {
          id: 'les_' + wNum + '_' + lIdx,
          lessonId: 'les_' + wNum + '_' + lIdx,
          globalIndex: lessonGlobalIndex++,
          week: wNum,
          lessonIndex: lIdx,
          period: les.period || ('Tiết ' + (lIdx + 1)),
          title: lTitle,
          lessonTitle: lTitle,
          topic: lTopic,
          level: level,
          degree: level,
          targetPart: targetPart,
          topicLabel: topicName,
          integrationBrief: brief,
          integrationTarget: brief,
          activityHook: targetPart + ' - ' + gvAction.split('\n')[0].replace(/^- /, ''),
          yccdAddition: yccdText,
          dodungAddition: dodungText,
          activityAddition: {
            stepName: targetPart + ' (3-5 phút)',
            teacher: gvAction,
            student: hsAction
          },
          selected: true
        };

        matrixLessons.push(item);
      });
    });

    return matrixLessons;
  },

  generatePlanViaGeminiAI: async function(apiKey, grade, subj, sWeek, eWeek, weeksPlan, docTitle, docText, userNotes) {
    var subjectName = this.getSubjectDisplayName(subj);
    var lessonListForPrompt = [];

    weeksPlan.forEach(function(wItem) {
      (wItem.lessons || []).forEach(function(les, lIdx) {
        lessonListForPrompt.push({
          week: wItem.week,
          lessonIndex: lIdx,
          period: les.period || ('Tiết ' + (lIdx + 1)),
          title: les.lessonTitle || les.title || 'Bài học'
        });
      });
    });

    var prompt = `Bạn là Chuyên gia Sư phạm Tiểu học hàng đầu Việt Nam về Chương trình GDPT 2018 và Kế hoạch bài dạy chuẩn Công văn 2345/BGDĐT-GDTH.
NHIỆM VỤ: Nghiên cứu tài liệu chỉ đạo/nội dung tích hợp được cung cấp dưới đây, đối chiếu với danh sách các bài học môn ${subjectName} Khối ${grade} (Tuần ${sWeek} đến Tuần ${eWeek}) để LẬP BẢNG KẾ HOẠCH TÍCH HỢP CHI TIẾT TỪNG TIẾT HỌC.

TÀI LIỆU TÍCH HỢP ĐƯỢC TẢI LÊN:
--- TÊN TÀI LIỆU: ${docTitle} ---
${docText.substring(0, 4000)}
---------------------------------
${userNotes ? ('YÊU CẦU ĐẶC BIỆT CỦA GIÁO VIÊN: ' + userNotes) : ''}

DANH SÁCH BÀI DẠY CẦN TÍCH HỢP:
${JSON.stringify(lessonListForPrompt, null, 2)}

YÊU CẦU ĐẦU RA JSON:
Trả về duy nhất 1 mảng JSON chứa các bài học với cấu trúc:
[
  {
    "week": 1,
    "lessonIndex": 0,
    "period": "Tiết 1",
    "title": "Tên bài học",
    "targetPart": "Hoạt động Vận dụng, trải nghiệm",
    "level": "Liên hệ",
    "integrationBrief": "Tóm tắt ngắn gọn nội dung tích hợp (1 câu)",
    "yccdAddition": "• [Tích hợp Tên_Nội_Dung]: Yêu cầu cần đạt bổ sung...",
    "dodungAddition": "• [Tích hợp Tên_Nội_Dung] Giáo viên: ...; Học sinh: ...",
    "activityTeacher": "- GV nêu câu hỏi / hành động cụ thể cho HS...",
    "activityStudent": "- HS thảo luận, phát biểu, thực hiện..."
  }
]
`;

    var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!response.ok) throw new Error('Gemini API Error: ' + response.statusText);

    var data = await response.json();
    var raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    var parsedList = JSON.parse(raw);

    if (!Array.isArray(parsedList) || parsedList.length === 0) {
      throw new Error('Không nhận được mảng kết quả từ AI');
    }

    var matrix = [];
    var lessonGlobalIndex = 0;

    parsedList.forEach(function(item, idx) {
      var wNum = item.week || (sWeek + Math.floor(idx / 4));
      var lIdx = item.lessonIndex !== undefined ? item.lessonIndex : (idx % 4);
      var part = item.targetPart || 'Hoạt động Vận dụng, trải nghiệm';
      var gv = item.activityTeacher || item.teacherAction || '- GV tổ chức cho HS liên hệ thực tế.';
      var hs = item.activityStudent || item.studentAction || '- HS tích cực phát biểu và lắng nghe.';

      matrix.push({
        id: 'les_' + wNum + '_' + lIdx,
        lessonId: 'les_' + wNum + '_' + lIdx,
        globalIndex: lessonGlobalIndex++,
        week: wNum,
        lessonIndex: lIdx,
        period: item.period || ('Tiết ' + (lIdx + 1)),
        title: item.title || ('Bài ' + (idx + 1)),
        lessonTitle: item.title || ('Bài ' + (idx + 1)),
        topic: item.topic || '',
        level: item.level || 'Liên hệ',
        degree: item.level || 'Liên hệ',
        targetPart: part,
        topicLabel: docTitle,
        integrationBrief: item.integrationBrief || ('Tích hợp vào ' + part),
        integrationTarget: item.integrationBrief || ('Tích hợp vào ' + part),
        activityHook: part + ' - ' + gv.split('\n')[0].replace(/^- /, ''),
        yccdAddition: item.yccdAddition || ('• [Tích hợp ' + docTitle + ']: Bổ sung phẩm chất và năng lực liên hệ thực tiễn.'),
        dodungAddition: item.dodungAddition || ('• [Tích hợp ' + docTitle + '] Giáo viên: Tư liệu trực quan; Học sinh: Đồ dùng học tập.'),
        activityAddition: {
          stepName: part + ' (3-5 phút)',
          teacher: gv,
          student: hs
        },
        selected: true
      });
    });

    return matrix;
  },

  refineIntegrationPlanWithFeedback: async function(currentPlan, userFeedback) {
    if (!currentPlan || !currentPlan.suggestions || currentPlan.suggestions.length === 0) {
      throw new Error('Chưa có kế hoạch hiện tại để điều chỉnh.');
    }
    var feedback = (userFeedback || '').trim();
    if (!feedback) throw new Error('Vui lòng nhập nội dung góp ý.');

    var apiKey = (typeof AuthService !== 'undefined' && AuthService.getApiKey) ? AuthService.getApiKey() : (localStorage.getItem('tvth_gemini_api_key') || (typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : ''));

    if (apiKey && typeof AIService !== 'undefined' && AIService.callGeminiApi) {
      try {
        var updatedSuggestions = await this.refinePlanViaGeminiAI(apiKey, currentPlan, feedback);
        currentPlan.suggestions = updatedSuggestions;
        currentPlan.matrixLessons = updatedSuggestions;
        return currentPlan;
      } catch (e) {
        console.warn('Lỗi gọi Gemini AI khi sửa kế hoạch, chuyển sang Rule Engine:', e);
      }
    }

    var updatedSuggestions = currentPlan.suggestions.map(function(item) {
      var cloned = JSON.parse(JSON.stringify(item));
      var lowerFb = feedback.toLowerCase();

      var matchWeek = lowerFb.indexOf('tuần ' + cloned.week) !== -1 || lowerFb.indexOf('t.' + cloned.week) !== -1;
      var matchPeriod = lowerFb.indexOf(cloned.period.toLowerCase()) !== -1;

      if (lowerFb.indexOf('toàn bộ') !== -1 || lowerFb.indexOf('tất cả') !== -1 || matchWeek || matchPeriod || (!lowerFb.match(/tuần \d/) && !lowerFb.match(/tiết \d/))) {
        if (lowerFb.indexOf('khởi động') !== -1) {
          cloned.targetPart = 'Hoạt động Khởi động';
          cloned.activityAddition.stepName = 'Khởi động (3-5 phút)';
        } else if (lowerFb.indexOf('vận dụng') !== -1) {
          cloned.targetPart = 'Hoạt động Vận dụng, trải nghiệm';
          cloned.activityAddition.stepName = 'Vận dụng, trải nghiệm (4-5 phút)';
        } else if (lowerFb.indexOf('luyện tập') !== -1) {
          cloned.targetPart = 'Hoạt động Luyện tập, thực hành';
          cloned.activityAddition.stepName = 'Luyện tập, thực hành (Bài tập liên hệ)';
        }

        cloned.activityAddition.teacher += '\n* [Đã cập nhật theo góp ý]: ' + feedback;
        cloned.integrationBrief += ' (Đã sửa theo góp ý)';
      }

      return cloned;
    });

    currentPlan.suggestions = updatedSuggestions;
    currentPlan.matrixLessons = updatedSuggestions;
    return currentPlan;
  },

  refinePlanViaGeminiAI: async function(apiKey, currentPlan, userFeedback) {
    var prompt = `Bạn là Chuyên gia Sư phạm Tiểu học.
Giáo viên đang xem Bảng Kế hoạch Tích hợp Giáo án và đưa ra GÓP Ý / YÊU CẦU ĐIỀU CHỈNH như sau:
"${userFeedback}"

DƯỚI ĐÂY LÀ BẢNG KẾ HOẠCH HIỆN TẠI (JSON):
${JSON.stringify(currentPlan.suggestions.map(function(s) {
  return {
    week: s.week,
    lessonIndex: s.lessonIndex,
    period: s.period,
    title: s.title,
    targetPart: s.targetPart,
    level: s.level,
    integrationBrief: s.integrationBrief,
    yccdAddition: s.yccdAddition,
    dodungAddition: s.dodungAddition,
    activityTeacher: s.activityAddition.teacher,
    activityStudent: s.activityAddition.student
  };
}), null, 2)}

NHIỆM VỤ: Tiếp thu 100% góp ý của giáo viên và trả về bảng JSON các bài học ĐÃ ĐƯỢC CHỈNH SỬA HOÀN CHỈNH.
Trả về duy nhất mảng JSON.`;

    var response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!response.ok) throw new Error('AI Refine Error');
    var data = await response.json();
    var list = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text || '[]');

    return list.map(function(item, idx) {
      var orig = currentPlan.suggestions[idx] || {};
      var part = item.targetPart || orig.targetPart || 'Hoạt động Vận dụng, trải nghiệm';
      var gv = item.activityTeacher || (orig.activityAddition && orig.activityAddition.teacher) || '';
      var hs = item.activityStudent || (orig.activityAddition && orig.activityAddition.student) || '';

      return {
        id: orig.id || ('les_' + (item.week || 1) + '_' + idx),
        lessonId: orig.lessonId || ('les_' + (item.week || 1) + '_' + idx),
        globalIndex: idx,
        week: item.week || orig.week,
        lessonIndex: item.lessonIndex !== undefined ? item.lessonIndex : orig.lessonIndex,
        period: item.period || orig.period,
        title: item.title || orig.title,
        lessonTitle: item.title || orig.lessonTitle,
        topic: orig.topic || '',
        level: item.level || orig.level || 'Liên hệ',
        degree: item.level || orig.level || 'Liên hệ',
        targetPart: part,
        topicLabel: currentPlan.docTitle || 'Tích hợp',
        integrationBrief: item.integrationBrief || orig.integrationBrief,
        integrationTarget: item.integrationBrief || orig.integrationBrief,
        activityHook: part + ' - ' + gv.split('\n')[0].replace(/^- /, ''),
        yccdAddition: item.yccdAddition || orig.yccdAddition,
        dodungAddition: item.dodungAddition || orig.dodungAddition,
        activityAddition: {
          stepName: part + ' (3-5 phút)',
          teacher: gv,
          student: hs
        },
        selected: orig.selected !== false
      };
    });
  },


  // =========================================================================
  // 6. LÀM SẠCH TÍCH HỢP CŨ & CHÈN NỘI DUNG TÍCH HỢP MỚI CHUẨN CV 2345
  // =========================================================================

  cleanLegacyIntegrationFromLesson: function(lesson) {
    if (!lesson) return lesson;
    var les = JSON.parse(JSON.stringify(lesson));
    var legacyMarkers = [
      '[Tích hợp', '[tích hợp', '[GDĐP', '[gdđp', '[Lồng ghép', '[lồng ghép',
      '[QCN', '[KNS', '[ATGT', '[MÔI TRƯỜNG', '[TÀI CHÍNH', '[QPAN', '[ỨNG XỬ',
      '[STEM', '[NỘI DUNG TÍCH HỢP', '[Chuyên đề', 'Tích hợp -'
    ];

    function isLegacy(str) {
      if (typeof str !== 'string') return false;
      return legacyMarkers.some(function(marker) { return str.indexOf(marker) !== -1; });
    }

    if (les.yccd && Array.isArray(les.yccd)) {
      les.yccd = les.yccd.filter(function(line) { return !isLegacy(line); });
    }

    if (les.dodung && Array.isArray(les.dodung)) {
      les.dodung = les.dodung.filter(function(line) { return !isLegacy(line); });
    }
    if (les.teachingAids && Array.isArray(les.teachingAids)) {
      les.teachingAids = les.teachingAids.filter(function(line) { return !isLegacy(line); });
    }

    if (les.tables && Array.isArray(les.tables)) {
      les.tables = les.tables.map(function(tableRows) {
        if (!Array.isArray(tableRows)) return tableRows;
        return tableRows.filter(function(r) {
          if (Array.isArray(r)) {
            return !isLegacy(r[0] || '') && !isLegacy(r[1] || '');
          } else if (r && typeof r === 'object') {
            return !isLegacy(r.gv || '') && !isLegacy(r.hs || '') && !isLegacy(r.activityName || '');
          }
          return true;
        });
      });
    }

    if (les.activities && Array.isArray(les.activities)) {
      les.activities.forEach(function(act) {
        if (act.rows && Array.isArray(act.rows)) {
          act.rows = act.rows.filter(function(r) {
            return !r.isInjected && !isLegacy(r.gv || '') && !isLegacy(r.hs || '') && !isLegacy(r.activityName || '');
          });
        }
      });
    }

    return les;
  },

  injectIntegrationIntoLesson: function(originalLesson, matrixItem, overwriteLegacy) {
    var shouldClean = (overwriteLegacy !== false);
    var les = shouldClean ? this.cleanLegacyIntegrationFromLesson(originalLesson) : JSON.parse(JSON.stringify(originalLesson));

    if (!les.yccd) les.yccd = [];
    if (matrixItem && matrixItem.yccdAddition) {
      les.yccd.push(matrixItem.yccdAddition);
    }

    if (!les.dodung) les.dodung = les.teachingAids || [];
    if (matrixItem && matrixItem.dodungAddition) {
      les.dodung.push(matrixItem.dodungAddition);
    }
    les.teachingAids = les.dodung;

    var actAddition = matrixItem ? matrixItem.activityAddition : null;
    var targetPartLabel = (matrixItem && matrixItem.targetPart) || 'Hoạt động Vận dụng, trải nghiệm';

    if (actAddition) {
      var gvText = '<b>* [Tích hợp - ' + targetPartLabel + ']:</b><br/>' + (actAddition.teacher || '').replace(/\n/g, '<br/>');
      var hsText = '<b>* [Tích hợp - ' + targetPartLabel + ']:</b><br/>' + (actAddition.student || '').replace(/\n/g, '<br/>');

      if (les.tables && les.tables.length > 0 && Array.isArray(les.tables[0])) {
        les.tables[0].push([gvText, hsText]);
      } else if (les.activities && les.activities.length > 0) {
        var targetTable = les.activities[les.activities.length - 1];
        if (targetTable && targetTable.rows) {
          targetTable.rows.push({
            activityName: targetPartLabel,
            gv: gvText,
            hs: hsText,
            isInjected: true
          });
        }
      }
    }

    les.isInjected = true;
    les.integrationInfo = {
      targetPart: targetPartLabel,
      topicLabel: matrixItem ? matrixItem.topicLabel : '',
      level: matrixItem ? (matrixItem.level || matrixItem.degree) : '',
      isReplacedLegacy: shouldClean
    };

    return les;
  },

  applyIntegrationToWeekRange: async function(analyzedPlan, selectedLessonMap, overwriteLegacy) {
    var matrixLessons = analyzedPlan.suggestions || analyzedPlan.matrixLessons || [];
    var weeksPlan = analyzedPlan.weeksPlan || [];
    var integratedWeeks = [];
    var allAppliedLessons = [];
    var shouldClean = (overwriteLegacy !== false);

    weeksPlan.forEach(function(wItem) {
      var wNum = wItem.week;
      var newLessons = [];

      (wItem.lessons || []).forEach(function(origLes, lIdx) {
        var matchMatrix = matrixLessons.find(function(m) { return m.week === wNum && m.lessonIndex === lIdx; });
        var isSelected = matchMatrix && (selectedLessonMap ? selectedLessonMap[matchMatrix.id] !== false : matchMatrix.selected);

        if (isSelected && matchMatrix) {
          var injectedLes = IntegrationService.injectIntegrationIntoLesson(origLes, matchMatrix, shouldClean);
          injectedLes.week = wNum;
          newLessons.push(injectedLes);
          allAppliedLessons.push(injectedLes);
        } else {
          var cloned = shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(origLes) : JSON.parse(JSON.stringify(origLes));
          cloned.week = wNum;
          newLessons.push(cloned);
          allAppliedLessons.push(cloned);
        }
      });

      integratedWeeks.push({
        week: wNum,
        sourceFile: wItem.sourceFile,
        lessons: newLessons
      });
    });

    integratedWeeks.flatLessons = allAppliedLessons;
    return allAppliedLessons;
  },


  // =========================================================================
  // 7. XUẤT FILE WORD CHO 2 CHẾ ĐỘ (THEO MÔN HOẶC THEO THỜI KHÓA BIỂU)
  // =========================================================================

  /**
   * Xuất file Word theo từng môn (.doc)
   */
  exportToWord: function(lessonsOrWeeks, metadata) {
    var meta = metadata || {};
    var grade = meta.grade || 5;
    var subjectName = meta.subjectName || 'Môn học';
    var startWeek = meta.startWeek || 1;
    var endWeek = meta.endWeek || startWeek;
    var schoolName = meta.schoolName || 'TRƯỜNG TIỂU HỌC .................................';
    var teacherName = meta.teacherName || 'Lê Thành Long';

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
      title: 'Kế hoạch bài dạy Khối ' + grade + ' - Môn ' + subjectName + ' (Tuần ' + startWeek + ' - ' + endWeek + ')',
      schoolName: schoolName,
      teacherName: teacherName,
      grade: grade,
      subjectName: subjectName,
      startWeek: startWeek,
      endWeek: endWeek
    });

    var filename = meta.filename || ('KHBD_Lop' + grade + '_' + subjectName + '_Tuan' + startWeek + '-' + endWeek + '.doc');
    this.downloadWordBlob(docHtml, filename);
  },

  /**
   * Xuất file Word trọn gói 1 Tuần theo Thời Khóa Biểu (.doc)
   */
  exportWeekByTimetableWord: function(weeklyPlanResult, metadata) {
    var meta = metadata || {};
    var grade = weeklyPlanResult.grade || meta.grade || 5;
    var weekNum = weeklyPlanResult.week || meta.week || 1;
    var timetable = weeklyPlanResult.timetable || meta.timetable || this.getDefaultTimetable(grade);
    var lessons = weeklyPlanResult.lessons || [];
    var schoolName = meta.schoolName || 'TRƯỜNG TIỂU HỌC .................................';
    var teacherName = meta.teacherName || 'Lê Thành Long';

    // Xây dựng Bảng Thời Khóa Biểu Tuần định dạng Word
    var tkbTableRows = '';
    
    // Buổi Sáng
    for (var slot = 0; slot < 4; slot++) {
      tkbTableRows += '<tr><td style="font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt; background: #f8fafc;">Tiết ' + (slot + 1) + ' (Sáng)</td>';
      timetable.forEach(function(day) {
        var sKey = (day.morning && day.morning[slot]) || '—';
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 4pt; text-align: center;">' + IntegrationService.getSubjectDisplayName(sKey) + '</td>';
      });
      tkbTableRows += '</tr>';
    }

    // Buổi Chiều
    for (var slot = 0; slot < 3; slot++) {
      tkbTableRows += '<tr><td style="font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt; background: #f8fafc;">Tiết ' + (slot + 1) + ' (Chiều)</td>';
      timetable.forEach(function(day) {
        var sKey = (day.afternoon && day.afternoon[slot]) || '—';
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 4pt; text-align: center;">' + (sKey !== '—' ? IntegrationService.getSubjectDisplayName(sKey) : '') + '</td>';
      });
      tkbTableRows += '</tr>';
    }

    var tkbCoverHtml = `
      <div style="text-align: center; margin-bottom: 20pt;">
        <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 12pt;">
          <tr>
            <td style="width: 50%; vertical-align: top; text-align: left; font-size: 11pt;">
              <p style="margin: 0;"><b>\${schoolName}</b></p>
              <p style="margin: 2pt 0 0 0;">Giáo viên: <b>\${teacherName}</b></p>
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right; font-size: 11pt;">
              <p style="margin: 0;"><b>NĂM HỌC: 2025 - 2026</b></p>
              <p style="margin: 2pt 0 0 0;">Khối <b>\${grade}</b> • <b>TUẦN \${weekNum}</b></p>
            </td>
          </tr>
        </table>

        <h2 style="font-size: 15pt; font-weight: bold; text-transform: uppercase; margin: 10pt 0 4pt 0;">
          KẾ HOẠCH BÀI DẠY TUẦN \${weekNum}
        </h2>
        <p style="font-size: 12pt; font-style: italic; margin: 0 0 15pt 0;">(Sắp xếp tuần tự theo Thời khóa biểu giảng dạy)</p>

        <h3 style="font-size: 12.5pt; font-weight: bold; text-align: left; text-transform: uppercase; margin: 10pt 0 4pt 0;">
          THỜI KHÓA BIỂU TUẦN \${weekNum}:
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
            \${tkbTableRows}
          </tbody>
        </table>
      </div>
      <div style="page-break-before: always;"></div>
    `;

    var docHtml = this.generateWordHtmlStructure(lessons, {
      title: 'Kế hoạch bài dạy Tuần ' + weekNum + ' - Khối ' + grade + ' (Theo Thời khóa biểu)',
      schoolName: schoolName,
      teacherName: teacherName,
      grade: grade,
      weekNum: weekNum,
      isTimetableDoc: true,
      tkbCoverHtml: tkbCoverHtml
    });

    var filename = meta.filename || ('KHBD_Tuan_' + weekNum + '_Lop_' + grade + '_Theo_TKB.doc');
    this.downloadWordBlob(docHtml, filename);
  },

  generateWordHtmlStructure: function(lessons, meta) {
    var schoolName = meta.schoolName || 'TRƯỜNG TIỂU HỌC .................................';
    var teacherName = meta.teacherName || 'Lê Thành Long';
    var grade = meta.grade || 5;

    var docHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>\${meta.title || 'Kế hoạch bài dạy'}</title>
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
            margin-bottom: 15pt;
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

    lessons.forEach(function(les, lIdx) {
      if (lIdx > 0 || meta.tkbCoverHtml) {
        docHtml += '<div class="page-break"></div>';
      }

      var daySessionInfo = les.dayName ? ('<p style="font-weight: bold; color: #1e40af; margin-bottom: 4pt;">' + les.dayName + ' • Buổi ' + les.session + ' • ' + (les.periodSlot ? ('Tiết ' + les.periodSlot) : '') + '</p>') : '';

      var yccdContent = (les.yccd || []).map(function(line) {
        var isTichHop = typeof line === 'string' && line.indexOf('[Tích hợp') !== -1;
        if (isTichHop) {
          return '<p style="margin: 3pt 0; background-color: #fdf2f8; color: #9d174d;"><b>' + line + '</b></p>';
        }
        return '<p style="margin: 3pt 0;">' + line + '</p>';
      }).join('');

      var dodungList = les.dodung || les.teachingAids || [];
      var dodungContent = dodungList.map(function(line) {
        var isTichHop = typeof line === 'string' && line.indexOf('[Tích hợp') !== -1;
        if (isTichHop) {
          return '<p style="margin: 3pt 0; background-color: #eff6ff; color: #1e40af;"><b>' + line + '</b></p>';
        }
        return '<p style="margin: 3pt 0;">' + line + '</p>';
      }).join('');

      var actTablesHtml = '';
      if (les.tables && les.tables.length > 0) {
        les.tables.forEach(function(tableRows) {
          var rowsHtml = (tableRows || []).map(function(r) {
            if (Array.isArray(r)) {
              if (r.length >= 2) {
                var gvCol = (r[0] || '').replace(/\n/g, '<br/>');
                var hsCol = (r[1] || '').replace(/\n/g, '<br/>');
                var isTichHop = gvCol.indexOf('[Tích hợp') !== -1 || hsCol.indexOf('[Tích hợp') !== -1;
                var rowBg = isTichHop ? 'background-color: #f5f3ff;' : '';
                return `
                  <tr style="\${rowBg}">
                    <td style="width: 50%; vertical-align: top; padding: 6pt; border: 1pt solid #000;">
                      <div>\${gvCol}</div>
                    </td>
                    <td style="width: 50%; vertical-align: top; padding: 6pt; border: 1pt solid #000;">
                      <div>\${hsCol}</div>
                    </td>
                  </tr>
                `;
              } else if (r.length === 1) {
                return `<tr><td colspan="2" style="padding: 6pt; border: 1pt solid #000; background-color: #f8fafc; font-weight: bold;">\${r[0]}</td></tr>`;
              }
            }
            return '';
          }).join('');

          actTablesHtml += `
            <table class="table-activity">
              <thead>
                <tr>
                  <th style="width: 50%;">Hoạt động của giáo viên</th>
                  <th style="width: 50%;">Hoạt động của học sinh</th>
                </tr>
              </thead>
              <tbody>
                \${rowsHtml}
              </tbody>
            </table>
          `;
        });
      }

      docHtml += `
        <div class="title-box">
          <table class="header-table">
            <tr>
              <td style="width: 50%;">
                <p><b>\${schoolName}</b></p>
                <p>Giáo viên: <b>\${teacherName}</b></p>
              </td>
              <td style="width: 50%; text-align: right;">
                <p><b>NĂM HỌC: 2025 - 2026</b></p>
                <p>Khối: <b>\${les.grade || grade}</b> - Tuần: <b>\${les.week || 1}</b></p>
              </td>
            </tr>
          </table>

          \${daySessionInfo}
          <h2>KẾ HOẠCH BÀI DẠY</h2>
          <p style="font-size: 13pt; font-weight: bold; margin: 2pt 0 0 0;">MÔN: \${(les.subjectName || les.subjectKey || 'MÔN HỌC').toUpperCase()}</p>
          <p style="font-size: 14pt; font-weight: bold; margin-top: 4pt;">\${les.lessonTitle || les.title || 'BÀI DẠY'}</p>
          \${les.period ? ('<p style="font-style: italic; margin-top: 2pt;">(' + les.period + ')</p>') : ''}
        </div>

        <div class="section-title">I. YÊU CẦU CẦN ĐẠT:</div>
        <div style="margin-left: 10pt;">
          \${yccdContent || '<p>Theo quy định của chương trình môn học.</p>'}
        </div>

        <div class="section-title">II. ĐỒ DÙNG DẠY HỌC:</div>
        <div style="margin-left: 10pt;">
          \${dodungContent || '<p>1. Giáo viên: SGK, máy tính, bài giảng điện tử.<br>2. Học sinh: SGK, vở bài tập, đồ dùng học tập.</p>'}
        </div>

        <div class="section-title">III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU:</div>
        <div style="margin-left: 5pt;">
          \${actTablesHtml || '<p>Thực hiện theo tiến trình chuẩn của bài dạy.</p>'}
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

  downloadWordBlob: function(docHtml, filename) {
    if (typeof Blob !== 'undefined') {
      var blob = new Blob(['\ufeff' + docHtml], { type: 'application/msword;charset=utf-8' });
      if (typeof window !== 'undefined' && window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return;
      }
      if (typeof document !== 'undefined') {
        var downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.IntegrationService = IntegrationService;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IntegrationService;
}
