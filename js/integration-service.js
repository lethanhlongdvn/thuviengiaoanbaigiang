/**
 * TRá»¢ LÃ AI TÃCH Há»¢P GIÃO ÃN Tá»° Äá»˜NG (CHUáº¨N CÃ”NG VÄ‚N 2345/BGDÄT-GDTH)
 * Há»‡ thá»‘ng sá»‘ hÃ³a Káº¿ hoáº¡ch bÃ i dáº¡y 5 Khá»‘i lá»›p (Bá»™ sÃ¡ch Káº¿t ná»‘i tri thá»©c vá»›i cuá»™c sá»‘ng)
 * Há»— trá»£ 2 Cháº¿ Ä‘á»™:
 * 1. Xuáº¥t theo Tá»«ng MÃ´n (CÃ³ hoáº·c KhÃ´ng tÃ­ch há»£p)
 * 2. Xuáº¥t theo Thá»i KhÃ³a Biá»ƒu Tuáº§n (GhÃ©p tuáº§n tá»± táº¥t cáº£ cÃ¡c mÃ´n, CÃ³ hoáº·c KhÃ´ng tÃ­ch há»£p)
 * Quáº£n trá»‹: Tháº§y LÃª ThÃ nh Long
 */

var IntegrationService = {

  // =========================================================================
  // 1. MáºªU THá»œI KHÃ“A BIá»‚U CHUáº¨N Cá»¦A Bá»˜ GD&ÄT (CHO 5 KHá»I Lá»šP)
  // =========================================================================

  DEFAULT_TIMETABLES: {
    5: [
      { day: 'Thá»© Hai', dayNum: 2, morning: ['hdtn', 'toan', 'tieng_viet', 'tieng_viet'], afternoon: ['khoa_hoc', 'lich_su_dia_ly', 'dao_duc'] },
      { day: 'Thá»© Ba', dayNum: 3, morning: ['toan', 'tieng_viet', 'tieng_viet', 'khoa_hoc'], afternoon: ['cong_nghe', 'tieng_anh', 'gdtc'] },
      { day: 'Thá»© TÆ°', dayNum: 4, morning: ['toan', 'tieng_viet', 'tieng_viet', 'lich_su_dia_ly'], afternoon: ['tin_hoc', 'am_nhac', 'mi_thuat'] },
      { day: 'Thá»© NÄƒm', dayNum: 5, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tieng_anh'], afternoon: ['dao_duc', 'toan', 'gdtc'] },
      { day: 'Thá»© SÃ¡u', dayNum: 6, morning: ['toan', 'tieng_viet', 'tieng_anh', 'cong_nghe'], afternoon: ['hdtn', 'tin_hoc', 'hdtn'] }
    ],
    4: [
      { day: 'Thá»© Hai', dayNum: 2, morning: ['hdtn', 'toan', 'tieng_viet', 'tieng_viet'], afternoon: ['khoa_hoc', 'lich_su_dia_ly', 'dao_duc'] },
      { day: 'Thá»© Ba', dayNum: 3, morning: ['toan', 'tieng_viet', 'tieng_viet', 'khoa_hoc'], afternoon: ['cong_nghe', 'tieng_anh', 'gdtc'] },
      { day: 'Thá»© TÆ°', dayNum: 4, morning: ['toan', 'tieng_viet', 'tieng_viet', 'lich_su_dia_ly'], afternoon: ['tin_hoc', 'am_nhac', 'mi_thuat'] },
      { day: 'Thá»© NÄƒm', dayNum: 5, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tieng_anh'], afternoon: ['dao_duc', 'toan', 'gdtc'] },
      { day: 'Thá»© SÃ¡u', dayNum: 6, morning: ['toan', 'tieng_viet', 'tieng_anh', 'cong_nghe'], afternoon: ['hdtn', 'tin_hoc', 'hdtn'] }
    ],
    3: [
      { day: 'Thá»© Hai', dayNum: 2, morning: ['hdtn', 'toan', 'tieng_viet', 'tieng_viet'], afternoon: ['tnxh', 'dao_duc', 'am_nhac'] },
      { day: 'Thá»© Ba', dayNum: 3, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tnxh'], afternoon: ['cong_nghe', 'tieng_anh', 'gdtc'] },
      { day: 'Thá»© TÆ°', dayNum: 4, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tin_hoc'], afternoon: ['mi_thuat', 'dao_duc', 'gdtc'] },
      { day: 'Thá»© NÄƒm', dayNum: 5, morning: ['toan', 'tieng_viet', 'tieng_viet', 'tieng_anh'], afternoon: ['tnxh', 'toan', 'cong_nghe'] },
      { day: 'Thá»© SÃ¡u', dayNum: 6, morning: ['toan', 'tieng_viet', 'tieng_anh', 'tin_hoc'], afternoon: ['hdtn', 'hdtn', 'hdtn'] }
    ],
    2: [
      { day: 'Thá»© Hai', dayNum: 2, morning: ['hdtn', 'tieng_viet', 'tieng_viet', 'toan'], afternoon: ['tnxh', 'dao_duc', 'gdtc'] },
      { day: 'Thá»© Ba', dayNum: 3, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tnxh'], afternoon: ['am_nhac', 'tieng_anh', 'hdtn'] },
      { day: 'Thá»© TÆ°', dayNum: 4, morning: ['tieng_viet', 'tieng_viet', 'toan', 'dao_duc'], afternoon: ['mi_thuat', 'gdtc', 'tnxh'] },
      { day: 'Thá»© NÄƒm', dayNum: 5, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['toan', 'hdtn', 'gdtc'] },
      { day: 'Thá»© SÃ¡u', dayNum: 6, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['hdtn', 'hdtn', 'hdtn'] }
    ],
    1: [
      { day: 'Thá»© Hai', dayNum: 2, morning: ['hdtn', 'tieng_viet', 'tieng_viet', 'toan'], afternoon: ['tnxh', 'dao_duc', 'gdtc'] },
      { day: 'Thá»© Ba', dayNum: 3, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tnxh'], afternoon: ['am_nhac', 'tieng_anh', 'hdtn'] },
      { day: 'Thá»© TÆ°', dayNum: 4, morning: ['tieng_viet', 'tieng_viet', 'toan', 'dao_duc'], afternoon: ['mi_thuat', 'gdtc', 'tnxh'] },
      { day: 'Thá»© NÄƒm', dayNum: 5, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['toan', 'hdtn', 'gdtc'] },
      { day: 'Thá»© SÃ¡u', dayNum: 6, morning: ['tieng_viet', 'tieng_viet', 'toan', 'tieng_anh'], afternoon: ['hdtn', 'hdtn', 'hdtn'] }
    ]
  },

  getDefaultTimetable: function(grade) {
    var g = parseInt(grade) || 5;
    var list = this.DEFAULT_TIMETABLES[g] || this.DEFAULT_TIMETABLES[5];
    return JSON.parse(JSON.stringify(list));
  },

  getSubjectDisplayName: function(subjectKey) {
    if (!subjectKey || subjectKey === 'â€”' || subjectKey === '-') return 'â€”';
    var map = {
      'toan': 'ToÃ¡n',
      'tieng_viet': 'Tiáº¿ng Viá»‡t',
      'khoa_hoc': 'Khoa há»c',
      'lich_su_dia_ly': 'Lá»‹ch sá»­ vÃ  Äá»‹a lÃ­',
      'tnxh': 'Tá»± nhiÃªn vÃ  XÃ£ há»™i',
      'dao_duc': 'Äáº¡o Ä‘á»©c',
      'hdtn': 'Hoáº¡t Ä‘á»™ng tráº£i nghiá»‡m',
      'cong_nghe': 'CÃ´ng nghá»‡',
      'tin_hoc': 'Tin há»c',
      'tieng_anh': 'Tiáº¿ng Anh',
      'am_nhac': 'Ã‚m nháº¡c',
      'mi_thuat': 'MÄ© thuáº­t',
      'gdtc': 'GiÃ¡o dá»¥c thá»ƒ cháº¥t',
      'shcn': 'Sinh hoáº¡t lá»›p'
    };
    return map[subjectKey] || subjectKey;
  },

  getSubjectListForGrade: function(grade) {
    var g = parseInt(grade) || 5;
    if (g <= 3) {
      return ['ToÃ¡n', 'Tiáº¿ng Viá»‡t', 'Tá»± nhiÃªn vÃ  XÃ£ há»™i', 'Äáº¡o Ä‘á»©c', 'Hoáº¡t Ä‘á»™ng tráº£i nghiá»‡m', 'CÃ´ng nghá»‡', 'Tin há»c', 'Tiáº¿ng Anh', 'Ã‚m nháº¡c', 'MÄ© thuáº­t', 'GiÃ¡o dá»¥c thá»ƒ cháº¥t', 'Sinh hoáº¡t lá»›p'];
    } else {
      return ['ToÃ¡n', 'Tiáº¿ng Viá»‡t', 'Khoa há»c', 'Lá»‹ch sá»­ vÃ  Äá»‹a lÃ­', 'Äáº¡o Ä‘á»©c', 'Hoáº¡t Ä‘á»™ng tráº£i nghiá»‡m', 'CÃ´ng nghá»‡', 'Tin há»c', 'Tiáº¿ng Anh', 'Ã‚m nháº¡c', 'MÄ© thuáº­t', 'GiÃ¡o dá»¥c thá»ƒ cháº¥t', 'Sinh hoáº¡t lá»›p'];
    }
  },

  /**
   * Táº¡o tá»‡p máº«u Thá»i khÃ³a biá»ƒu Excel (.xlsx) cÃ³ danh sÃ¡ch xá»• xuá»‘ng (Data Validation Dropdown)
   */
  exportTimetableTemplate: async function(grade, meta) {
    if (typeof XLSX === 'undefined') {
      throw new Error('ThÆ° viá»‡n XLSX chÆ°a sáºµn sÃ ng');
    }
    var g = parseInt(grade) || 5;
    var metadata = meta || {};
    var schoolName = metadata.schoolName || 'TRÆ¯á»œNG TIá»‚U Há»ŒC KIM Äá»’NG';
    var schoolYear = metadata.schoolYear || '2026 - 2027';
    var className = metadata.className || ('Lá»›p ' + g + 'A');
    var teacherName = metadata.teacherName || 'Nguyá»…n VÄƒn A';

    var timetable = metadata.timetable || this.getDefaultTimetable(g);

    var rows = [
      [schoolName.toUpperCase()],
      ['THá»œI KHÃ“A BIá»‚U - ' + className.toUpperCase() + ' - NÄ‚M Há»ŒC ' + schoolYear],
      ['GIÃO VIÃŠN CHá»¦ NHIá»†M: ' + teacherName],
      [''],
      ['Buá»•i', 'Tiáº¿t', 'Thá»© Hai', 'Thá»© Ba', 'Thá»© TÆ°', 'Thá»© NÄƒm', 'Thá»© SÃ¡u']
    ];

    // Buá»•i SÃ¡ng (4 tiáº¿t)
    for (var slot = 0; slot < 4; slot++) {
      var row = ['SÃ¡ng', 'Tiáº¿t ' + (slot + 1)];
      for (var d = 0; d < 5; d++) {
        var dayItem = timetable[d] || {};
        var subjKey = (dayItem.morning && dayItem.morning[slot]) || '';
        row.push(this.getSubjectDisplayName(subjKey));
      }
      rows.push(row);
    }

    // Buá»•i Chiá»u (3 tiáº¿t)
    for (var slotA = 0; slotA < 3; slotA++) {
      var rowA = ['Chiá»u', 'Tiáº¿t ' + (slotA + 1)];
      for (var d = 0; d < 5; d++) {
        var dayItem = timetable[d] || {};
        var subjKey = (dayItem.afternoon && dayItem.afternoon[slotA]) || '';
        rowA.push(this.getSubjectDisplayName(subjKey));
      }
      rows.push(rowA);
    }

    rows.push(['']);
    rows.push(['* HÆ¯á»šNG DáºªN Sá»¬ Dá»¤NG MáºªU THá»œI KHÃ“A BIá»‚U:']);
    rows.push(['1. QuÃ½ Tháº§y/CÃ´ cÃ³ thá»ƒ chá»‰nh sá»­a thÃ´ng tin TrÆ°á»ng, Lá»›p, NÄƒm há»c, Há» tÃªn GV á»Ÿ pháº§n Ä‘áº§u báº£ng.']);
    rows.push(['2. Táº¡i má»—i Ã´ mÃ´n há»c (tá»« Thá»© Hai Ä‘áº¿n Thá»© SÃ¡u), báº¥m vÃ o Ã´ Ä‘á»ƒ xuáº¥t hiá»‡n NÃšT Xá»” XUá»NG [â–¼] chá»n nhanh mÃ´n há»c.']);
    rows.push(['3. Tháº§y/CÃ´ cÅ©ng cÃ³ thá»ƒ gÃµ trá»±c tiáº¿p tÃªn mÃ´n há»c theo thá»±c táº¿ nhÃ  trÆ°á»ng náº¿u muá»‘n.']);
    rows.push(['4. Sau khi hoÃ n thiá»‡n, lÆ°u tá»‡p (.xlsx) vÃ  báº¥m "Táº£i lÃªn TKB" trÃªn website Ä‘á»ƒ táº¡o Káº¿ hoáº¡ch bÃ i dáº¡y chuáº©n 100% CV 2345.']);

    var ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } }
    ];
    ws['!cols'] = [
      { wch: 10 },
      { wch: 10 },
      { wch: 24 },
      { wch: 24 },
      { wch: 24 },
      { wch: 24 },
      { wch: 24 }
    ];

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TKB_Khoi_' + g);

    var rawBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // ChÃ¨n Data Validation Dropdown báº±ng JSZip náº¿u cÃ³ JSZip
    if (typeof JSZip !== 'undefined') {
      try {
        var zip = await JSZip.loadAsync(rawBuffer);
        var sheetXml = await zip.file('xl/worksheets/sheet1.xml').async('string');
        var subjectsList = this.getSubjectListForGrade(g).join(',');
        var dataValXml = '<dataValidations count="1"><dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="0" sqref="C6:G12"><formula1>&quot;' + subjectsList + '&quot;</formula1></dataValidation></dataValidations>';

        var insertPos = sheetXml.indexOf('<pageMargins');
        if (insertPos === -1) insertPos = sheetXml.indexOf('<ignoredErrors');
        if (insertPos === -1) insertPos = sheetXml.indexOf('</worksheet>');

        if (insertPos !== -1) {
          sheetXml = sheetXml.slice(0, insertPos) + dataValXml + sheetXml.slice(insertPos);
          zip.file('xl/worksheets/sheet1.xml', sheetXml);
          return await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        }
      } catch (zipErr) {
        console.warn('KhÃ´ng thá»ƒ chÃ¨n dataValidation via JSZip, dÃ¹ng file máº·c Ä‘á»‹nh:', zipErr);
      }
    }

    return new Blob([rawBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  },

  normalizeSubjectKey: function(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';
    var text = rawText.trim().toLowerCase();
    if (!text || text === '-' || text === '--' || text === 'â€”' || text === 'nghá»‰' || text === 'trá»‘ng' || text === 'x') return '';

    var noAcc = text.replace(/Ä‘/g, 'd').replace(/Ä/g, 'D').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
   * TrÃ­ch xuáº¥t thÃ´ng tin GiÃ¡o viÃªn, NÄƒm há»c, Khá»‘i lá»›p, TrÆ°á»ng tá»« vÄƒn báº£n tiÃªu Ä‘á» TKB
   */
  extractMetadataFromText: function(text) {
    var meta = {};
    if (!text || typeof text !== 'string') return meta;

    // 1. NÄƒm há»c (vd: NÄ‚M Há»ŒC 2026 â€“ 2027, NÄƒm há»c: 2026-2027)
    var yMatch = text.match(/(?:NÄ‚M\s*Há»ŒC|NH)\s*[:ï¼š\-â€“]?\s*([0-9]{4}\s*[-â€“/]\s*[0-9]{4})/i);
    if (yMatch) {
      meta.schoolYear = yMatch[1].replace(/[â€“/]/g, '-').replace(/\s*-\s*/g, ' - ').trim();
    }

    // 2. GiÃ¡o viÃªn / GVCN (vd: GVCN: NGUYá»„N VÄ‚N TRUNG, GiÃ¡o viÃªn: LÃª ThÃ nh Long)
    var tMatch = text.match(/(?:GVCN|GIÃO\s*VIÃŠN\s*(?:CHá»¦\s*NHIá»†M)?|GIÃO\s*VIÃŠN|GV)\s*[:ï¼š\-â€“]\s*([^\(\[\{\n\r,]+)/i);
    if (tMatch) {
      var rawName = tMatch[1].trim().replace(/^[:ï¼š\-â€“\s]+/, '').replace(/^(Tháº§y|CÃ´)\s+/i, '').trim();
      rawName = rawName.split(/\s+(?:dáº¡y|Ã¡p\s+dá»¥ng|tá»«\s+ngÃ y|sÄ‘t|Ä‘t)\b/i)[0].trim();
      if (rawName.length >= 2 && rawName.length <= 50) {
        meta.teacherName = rawName;
      }
    }

    // 3. Khá»‘i & Lá»›p (vd: Lá»šP 2^1, Lá»šP 2/1, Lá»šP 5A, Khá»‘i 2)
    var cMatch = text.match(/(?:THá»œI\s*KHÃ“A\s*BIá»‚U\s+)?(?:Lá»šP|KHá»I)\s*[:ï¼š\-â€“]?\s*([1-5])(?:\s*([\^/_\-\.]?\s*[0-9A-Za-z]{1,4}))?(?=\s*[\n\r,;\-â€“]|\s+nÄƒm\b|\s+nh\b|\s+há»c\b|$)/i);
    if (cMatch) {
      meta.grade = parseInt(cMatch[1]);
      if (cMatch[2]) {
        var suffix = cMatch[2].trim();
        meta.className = 'Lá»›p ' + cMatch[1] + (suffix.startsWith('^') || suffix.startsWith('/') ? '' : (suffix.match(/^[A-Za-z0-9]/) ? (suffix.length === 1 && suffix.match(/[0-9]/) ? '^' : ' ') : '')) + suffix;
      } else {
        meta.className = 'Khá»‘i ' + cMatch[1];
      }
    }

    // 4. TrÆ°á»ng há»c (vd: TRÆ¯á»œNG TIá»‚U Há»ŒC KIM Äá»’NG)
    var sMatch = text.match(/(?:TRÆ¯á»œNG\s*TIá»‚U\s*Há»ŒC|TRÆ¯á»œNG\s*TH)\s*[:ï¼š\-â€“]?\s*([A-ZÃ€ÃÃ‚ÃƒÃˆÃ‰ÃŠÃŒÃÃ’Ã“Ã”Ã•Ã™ÃšÃÄa-zÃ Ã¡Ã¢Ã£Ã¨Ã©ÃªÃ¬Ã­Ã²Ã³Ã´ÃµÃ¹ÃºÃ½Ä‘0-9\s\.\-â€“]+?)(?=\s*[\n\r,;]|$)/i);
    if (sMatch) {
      var rawSchool = sMatch[1].trim().replace(/^[:ï¼š\-â€“\s]+/, '');
      if (rawSchool.length >= 2 && rawSchool.length <= 60) {
        meta.schoolName = ('TRÆ¯á»œNG TIá»‚U Há»ŒC ' + rawSchool.replace(/^tiá»ƒu\s*há»c\s+/i, '')).toUpperCase();
      }
    }

    return meta;
  },

  // =========================================================================
  // 2. Bá»˜ PHÃ‚N TÃCH THá»œI KHÃ“A BIá»‚U ÄA Äá»ŠNH Dáº NG (EXCEL, WORD, CSV, TXT)
  // =========================================================================

  /**
   * PhÃ¢n tÃ­ch tá»‡p Thá»i KhÃ³a Biá»ƒu (Excel .xlsx/.xls, Word .docx, PDF, CSV, TXT)
   */
  parseTimetableFile: async function(file, grade) {
    if (!file) throw new Error('Vui lÃ²ng chá»n tá»‡p Thá»i khÃ³a biá»ƒu.');
    var fileName = file.name || 'Thoi_Khoa_Bieu';
    var ext = (fileName.split('.').pop() || '').toLowerCase();
    var curGrade = parseInt(grade) || 5;

    // 1. Tá»†P EXCEL (.XLSX, .XLS)
    if (ext === 'xlsx' || ext === 'xls') {
      return new Promise(function(resolve, reject) {
        if (typeof XLSX === 'undefined') {
          reject(new Error('ThÆ° viá»‡n Ä‘á»c Excel Ä‘ang táº£i, vui lÃ²ng thá»­ láº¡i sau 2 giÃ¢y.'));
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
            reject(new Error('Lá»—i khi Ä‘á»c báº£ng tÃ­nh Excel: ' + err.message));
          }
        };
        reader.onerror = function() { reject(new Error('KhÃ´ng thá»ƒ Ä‘á»c tá»‡p Excel.')); };
        reader.readAsArrayBuffer(file);
      });
    }

    // 2. Tá»†P WORD (.DOCX)
    if (ext === 'docx') {
      return new Promise(function(resolve, reject) {
        if (typeof mammoth === 'undefined') {
          reject(new Error('ThÆ° viá»‡n Ä‘á»c Word Ä‘ang táº£i, vui lÃ²ng thá»­ láº¡i sau 2 giÃ¢y.'));
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
              reject(new Error('Lá»—i khi phÃ¢n tÃ­ch tá»‡p Word: ' + err.message));
            });
        };
        reader.onerror = function() { reject(new Error('KhÃ´ng thá»ƒ Ä‘á»c tá»‡p Word.')); };
        reader.readAsArrayBuffer(file);
      });
    }

    // 3. Tá»†P CSV, TXT, JSON
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

    // 4. Tá»†P PDF
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

    throw new Error('Äá»‹nh dáº¡ng tá»‡p .' + ext + ' chÆ°a Ä‘Æ°á»£c há»— trá»£. Vui lÃ²ng chá»n .xlsx, .xls, .docx, .csv hoáº·c .txt.');
  },

  /**
   * TrÃ­ch xuáº¥t ma tráº­n Ã´ (2D Array) tá»« báº£ng HTML trong tá»‡p Word (xá»­ lÃ½ chuáº©n rowspan & colspan)
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
   * PhÃ¢n tÃ­ch Ma tráº­n lÆ°á»›i 2D (tá»« Excel hoáº·c Word Table) thÃ nh Thá»i KhÃ³a Biá»ƒu chuáº©n 5 ngÃ y
   */
  parseTimetableFromGrid: function(rows, grade) {
    var g = parseInt(grade) || 5;
    var days = [
      { day: 'Thá»© Hai', dayNum: 2, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thá»© Ba', dayNum: 3, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thá»© TÆ°', dayNum: 4, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thá»© NÄƒm', dayNum: 5, morning: ['', '', '', ''], afternoon: ['', '', ''] },
      { day: 'Thá»© SÃ¡u', dayNum: 6, morning: ['', '', '', ''], afternoon: ['', '', ''] }
    ];

    if (!Array.isArray(rows) || rows.length === 0) {
      return { timetable: days, slotsCount: 0 };
    }

    // 1. TÃ¬m dÃ²ng Header chá»©a cÃ¡c Thá»© (Thá»© 2, Thá»© 3, Thá»© 4, Thá»© 5, Thá»© 6)
    var dayColMap = {};
    var headerRowIdx = -1;

    for (var r = 0; r < Math.min(rows.length, 10); r++) {
      var row = rows[r] || [];
      for (var c = 0; c < row.length; c++) {
        var cellStr = String(row[c] || '').toLowerCase().trim();

        if (cellStr.includes('thá»© 2') || cellStr.includes('thá»© hai') || cellStr === 'thá»© 2' || cellStr === 'hai' || cellStr === 't2') {
          dayColMap[2] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thá»© 3') || cellStr.includes('thá»© ba') || cellStr === 'thá»© 3' || cellStr === 'ba' || cellStr === 't3') {
          dayColMap[3] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thá»© 4') || cellStr.includes('thá»© tÆ°') || cellStr === 'thá»© 4' || cellStr === 'tÆ°' || cellStr === 't4') {
          dayColMap[4] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thá»© 5') || cellStr.includes('thá»© nÄƒm') || cellStr === 'thá»© 5' || cellStr === 'nÄƒm' || cellStr === 't5') {
          dayColMap[5] = c;
          headerRowIdx = r;
        } else if (cellStr.includes('thá»© 6') || cellStr.includes('thá»© sÃ¡u') || cellStr === 'thá»© 6' || cellStr === 'sÃ¡u' || cellStr === 't6') {
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
      if (nonDayText.includes('chiá»u') || nonDayText.includes('chieu')) {
        isAfternoon = true;
      } else if (nonDayText.includes('sÃ¡ng') || nonDayText.includes('sang')) {
        isAfternoon = false;
      }

      // Check period number (1..5)
      var slotIdx = -1;
      for (var c = 0; c < nonDayCells.length; c++) {
        var cellVal = String(nonDayCells[c] || '').trim();
        var numMatch = cellVal.match(/(?:tiáº¿t\s*)?([1-5])/i);
        if (numMatch && !cellVal.toLowerCase().includes('thá»©') && !cellVal.toLowerCase().includes('buá»•i')) {
          if (/^\d+$/.test(cellVal) || /^tiáº¿t\s*\d+$/i.test(cellVal)) {
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
   * PhÃ¢n tÃ­ch Thá»i KhÃ³a Biá»ƒu tá»« vÄƒn báº£n thuáº§n (TXT/CSV/PDF Text)
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
  // =========================================================================
  // Bá»˜ NHá»š LÆ¯U TRá»® TÃ€I LIá»†U LÃ‚U DÃ€I TRÃŠN MÃY (INDEXEDDB & LOCALSTORAGE)
  // =========================================================================
  storage: {
    DB_NAME: 'TVTH_Integration_DB',
    STORE_NAME: 'uploaded_docs',
    DB_VERSION: 1,

    openDB: function() {
      var self = this;
      return new Promise(function(resolve) {
        if (typeof indexedDB === 'undefined') {
          resolve(null);
          return;
        }
        try {
          var request = indexedDB.open(self.DB_NAME, self.DB_VERSION);
          request.onupgradeneeded = function(e) {
            var db = e.target.result;
            if (!db.objectStoreNames.contains(self.STORE_NAME)) {
              db.createObjectStore(self.STORE_NAME, { keyPath: 'id' });
            }
          };
          request.onsuccess = function(e) {
            resolve(e.target.result);
          };
          request.onerror = function(e) {
            console.warn('IndexedDB open error:', e);
            resolve(null);
          };
        } catch(err) {
          resolve(null);
        }
      });
    },

    getAllDocs: async function() {
      var db = await this.openDB();
      if (!db) {
        try {
          var raw = localStorage.getItem('tvth_saved_docs');
          return raw ? JSON.parse(raw) : [];
        } catch(e) { return []; }
      }
      var self = this;
      return new Promise(function(resolve) {
        try {
          var tx = db.transaction(self.STORE_NAME, 'readonly');
          var store = tx.objectStore(self.STORE_NAME);
          var req = store.getAll();
          req.onsuccess = function() {
            resolve(req.result || []);
          };
          req.onerror = function() {
            resolve([]);
          };
        } catch(e) {
          resolve([]);
        }
      });
    },

    saveDocs: async function(docsList) {
      var db = await this.openDB();
      if (!db) {
        try {
          localStorage.setItem('tvth_saved_docs', JSON.stringify(docsList));
        } catch(e) {}
        return true;
      }
      var self = this;
      return new Promise(function(resolve) {
        try {
          var tx = db.transaction(self.STORE_NAME, 'readwrite');
          var store = tx.objectStore(self.STORE_NAME);
          store.clear();
          docsList.forEach(function(doc) {
            store.put(doc);
          });
          tx.oncomplete = function() { resolve(true); };
          tx.onerror = function() { resolve(false); };
        } catch(e) {
          resolve(false);
        }
      });
    },

    clearAllDocs: async function() {
      try { localStorage.removeItem('tvth_saved_docs'); } catch(e) {}
      var db = await this.openDB();
      if (!db) return true;
      var self = this;
      return new Promise(function(resolve) {
        try {
          var tx = db.transaction(self.STORE_NAME, 'readwrite');
          var store = tx.objectStore(self.STORE_NAME);
          store.clear();
          tx.oncomplete = function() { resolve(true); };
          tx.onerror = function() { resolve(false); };
        } catch(e) {
          resolve(false);
        }
      });
    }
  },

  // =========================================================================
  // 3. TRÃCH XUáº¤T Ná»˜I DUNG TÃ€I LIá»†U Táº¢I LÃŠN (.DOCX, .PDF, .TXT)
  // =========================================================================

  extractTextFromFile: async function(file, onProgress) {
    if (!file) throw new Error('Vui lÃ²ng chá»n tá»‡p tÃ i liá»‡u.');
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
        reader.onerror = function() { reject(new Error('KhÃ´ng thá»ƒ Ä‘á»c tá»‡p vÄƒn báº£n: ' + fileName)); };
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
              .catch(function(err) { reject(new Error('Lá»—i phÃ¢n tÃ­ch tá»‡p .docx: ' + err.message)); });
          } else {
            reject(new Error('ThÆ° viá»‡n Ä‘á»c Word (.docx) Ä‘ang táº£i, vui lÃ²ng dÃ¡n ná»™i dung vÃ o Ã´ vÄƒn báº£n.'));
          }
        };
        reader.onerror = function() { reject(new Error('Lá»—i khi náº¡p tá»‡p Word.')); };
        reader.readAsArrayBuffer(file);
      });
    }

    if (ext === 'pdf') {
      return new Promise(function(resolve, reject) {
        if (typeof pdfjsLib === 'undefined') {
          reject(new Error('ThÆ° viá»‡n Ä‘á»c PDF Ä‘ang náº¡p, vui lÃ²ng thá»­ láº¡i hoáº·c dÃ¡n vÄƒn báº£n trá»±c tiáº¿p.'));
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
            var maxPages = pdf.numPages; // Äá»ŒC TOÃ€N Bá»˜ 100% Táº¤T Cáº¢ CÃC TRANG (KHÃ”NG GIá»šI Háº N)

            for (var pageNum = 1; pageNum <= maxPages; pageNum++) {
              if (typeof onProgress === 'function') {
                try { onProgress(pageNum, maxPages); } catch(pErr){}
              }
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
            reject(new Error('Lá»—i trÃ­ch xuáº¥t PDF: ' + err.message));
          }
        };
        reader.readAsArrayBuffer(file);
      });
    }

    throw new Error('Äá»‹nh dáº¡ng tá»‡p .' + ext + ' chÆ°a Ä‘Æ°á»£c há»— trá»£. Vui lÃ²ng chá»n .docx, .pdf, .txt hoáº·c dÃ¡n vÄƒn báº£n trá»±c tiáº¿p.');
  },


  // =========================================================================
  // 4. Náº P Dá»® LIá»†U KHBD Sá» HÃ“A & Äáº¢M Báº¢O TOÃ€N Bá»˜ MÃ”N TRONG TUáº¦N
  // =========================================================================

  _loadingPromises: {},

  ensureSubjectLoaded: async function(grade, subjectId) {
    var g = parseInt(grade) || 5;
    var sId = (subjectId || 'toan').toLowerCase();
    
    var checkLoaded = function() {
      var k = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
      return k && k.isLoaded && k.isLoaded(g, sId);
    };
    if (checkLoaded()) return true;
    
    if (typeof document === 'undefined') return true;

    var version = (typeof window !== 'undefined' && window.appVersion) ? window.appVersion : '20261008_v2';
    var filePath = 'js/khbd_sohoa/lop' + g + '/lop' + g + '_' + sId + '.js';
    var fullPath = filePath + '?v=' + version;
    
    if (!this._loadingPromises) this._loadingPromises = {};
    if (this._loadingPromises[filePath]) {
      return this._loadingPromises[filePath];
    }

    var self = this;
    this._loadingPromises[filePath] = new Promise(function(resolve) {
      var done = false;
      function finish(val) {
        if (done) return;
        done = true;
        delete self._loadingPromises[filePath];
        resolve(val !== false);
      }

      var pollCount = 0;
      var timer = setInterval(function() {
        if (checkLoaded()) {
           clearInterval(timer);
           finish(true);
        } else {
           pollCount++;
           if (pollCount > 100) { // timeout 10s
              clearInterval(timer);
              finish(false);
           }
        }
      }, 100);

      var existing = document.querySelector('script[src="' + filePath + '"]') || document.querySelector('script[src="' + fullPath + '"]');
      if (existing) {
        return; // Äá»£i setInterval kiá»ƒm tra
      }

      var link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = fullPath;
      document.head.appendChild(link);

      var s = document.createElement('script');
      s.src = fullPath;
      s.onload = function() { clearInterval(timer); finish(true); };
      s.onerror = function(err) {
        console.warn('KhÃ´ng thá»ƒ náº¡p tá»‡p KHBD: ' + fullPath, err);
        clearInterval(timer);
        finish(false);
      };
      document.head.appendChild(s);
    });

    return this._loadingPromises[filePath];
  },

  ensureAllSubjectsLoadedForGrade: async function(grade) {
    var g = parseInt(grade) || 5;
    var subjs = ['toan', 'tieng_viet', 'dao_duc', 'hdtn', 'gdtc', 'am_nhac', 'mi_thuat'];
    if (g <= 3) {
      subjs.push('tnxh');
      if (g === 3) subjs.push('cong_nghe');
    } else {
      subjs.push('khoa_hoc', 'lich_su_dia_ly', 'cong_nghe');
    }
    if (g >= 1) {
      subjs.push('tieng_anh');
    }

    var self = this;
    var promises = subjs.map(function(s) {
      return self.ensureSubjectLoaded(g, s);
    });
    await Promise.all(promises);
    return true;
  },

  /**
   * LÃ m sáº¡ch tiÃªu Ä‘á» bÃ i dáº¡y: loáº¡i bá» tiá»n tá»‘ Tuáº§n, chuá»—i rÃ¡c Ä‘iá»u chá»‰nh sau bÃ i dáº¡y, dáº¥u cháº¥m lá»­ng...
   */
  cleanLessonTitle: function(rawTitle, lessonObj, subjectName) {
    if ((!rawTitle || typeof rawTitle !== 'string') && lessonObj) {
      rawTitle = lessonObj.lessonTitle || lessonObj.title || '';
    }
    var t = (rawTitle && typeof rawTitle === 'string') ? rawTitle : '';
    t = t
      .replace(/^TUáº¦N\s*:\s*\d+\s*[-â€“â€”:]\s*/i, '')
      .replace(/^TUáº¦N\s+\d+\s*[-â€“â€”:]\s*/i, '')
      .replace(/^Tuáº§n\s*:\s*\d+\s*[-â€“â€”:]\s*/i, '')
      .replace(/^Tuáº§n\s+\d+\s*[-â€“â€”:]\s*/i, '')
      .trim();

    // Loáº¡i bá» cÃ¡c Ä‘oáº¡n cháº¥m lá»­ng/gáº¡ch ngang thá»«a á»Ÿ Ä‘áº§u (placeholder tá»« file máº«u)
    t = t.replace(/^(?:[.â€¦\s_â€“â€”-]{3,}\s*[-â€“â€”:]*\s*)+/g, '');

    // Loáº¡i bá» tiá»n tá»‘ (X tiáº¿t) á»Ÿ Ä‘áº§u
    t = t.replace(/^\s*\(\d+\s*tiáº¿t\)\s*[-â€“â€”\s]*/gi, '');

    // Loáº¡i bá» tiá»n tá»‘ rÃ¡c kiá»ƒu "MÃ”N: ... Lá»šP ... Bá»˜ SÃCH: ... - " náº¿u cÃ³
    t = t.replace(/^MÃ”N:\s*[^â€“â€”-]+[-â€“â€”]\s*(?:Lá»šP\s*\d+\s*[-â€“â€”]\s*)?(?:Bá»˜ SÃCH:[^â€“â€”-]+[-â€“â€”]\s*)?/i, '').trim();

    // Loáº¡i bá» cá»¥m ghi chÃº há»c sinh khuyáº¿t táº­t / hÃ²a nháº­p náº¿u cÃ³ dÃ­nh vÃ o tiÃªu Ä‘á»
    t = t.replace(/\(?[\s*â€¢-]*Há»ŒC\s*SINH\s*(?:KHUYáº¾T\s*Táº¬T|HÃ’A\s*NHáº¬P)[^\)\n]*\)?/gi, ' ');

    // Loáº¡i bá» cÃ¡c Ä‘oáº¡n vÄƒn báº£n rÃ¡c footer hoáº·c Ä‘iá»u chá»‰nh sau bÃ i dáº¡y bá»‹ dÃ­nh vÃ o Ä‘áº§u tiÃªu Ä‘á»
    if (t.includes('Ná»™i dung Ä‘iá»u chá»‰nh') || t.includes('HÃ¬nh thá»©c tá»• chá»©c') || t.includes('Äá»“ dÃ¹ng, há»c liá»‡u')) {
      var matchAfter = t.match(/(?:BÃ€I|CHá»¦ Äá»€|TIáº¾T|Ã”N Táº¬P|KIá»‚M TRA)[\s\S]*/i);
      if (matchAfter) {
        t = matchAfter[0].trim();
      } else {
        t = t.replace(/^[-â€“â€”\s]*Ná»™i dung Ä‘iá»u chá»‰nh[\s\S]*?[-â€“â€”]\s*/i, '').trim();
      }
    }

    // Loáº¡i bá» "Sá» TIáº¾T: X [TIáº¾T]"
    t = t.replace(/[\s\-â€“â€”â€¢Â·]*[-â€“â€”]?\s*Sá»\s*TIáº¾T\s*:\s*\d+\s*(?:TIáº¾T)?/gi, ' ');

    // Loáº¡i bá» cÃ¡c cá»¥m rÃ¡c dáº¡ng "- Thá»i gian thá»±c hiá»‡n: ...", "(Thá»i gian thá»±c hiá»‡n: ...)", "- NgÃ y thá»±c hiá»‡n: ..."
    t = t.replace(/[\s\-â€“â€”â€¢Â·]*[-â€“â€”]?\s*(?:Thá»i\s*gian|NgÃ y)\s*thá»±c\s*hiá»‡n\s*:[^\-â€“â€”\(\)\n]*(?:Ä‘áº¿n[^\-â€“â€”\(\)\n]*)?/gi, ' ');
    t = t.replace(/\s*\((?:Thá»i\s*gian|NgÃ y)\s*thá»±c\s*hiá»‡n\s*:[^\)]*\)/gi, ' ');
    t = t.replace(/[\s\-â€“â€”â€¢Â·]*(?:Thá»i\s*gian|NgÃ y)\s*thá»±c\s*hiá»‡n\s*:\s*[.\s_â€¦/â€“\-]*(?:\(.*\))?/gi, ' ');

    // Loáº¡i bá» chuá»—i cháº¥m lá»­ng thá»«a á»Ÿ báº¥t ká»³ vá»‹ trÃ­ nÃ o
    t = t.replace(/[-â€“â€”]?\s*[.â€¦]{3,}\s*[-â€“â€”]?/g, ' ');

    // Loáº¡i bá» tiá»n tá»‘/háº­u tá»‘ toÃ n dáº¥u cháº¥m hoáº·c gáº¡ch ngang thá»«a
    t = t.replace(/\s*[\-â€“â€”]+\s*[\-â€“â€”]+\s*/g, ' - ');
    t = t.replace(/\s*[\-â€“â€”]+\s*$/g, '');
    t = t.replace(/^\s*[\-â€“â€”]+\s*/g, '');
    t = t.replace(/^[.\s_â€“â€”-]{3,}\s*/, '');
    t = t.replace(/\s{2,}/g, ' ').trim();

    // KIá»‚M TRA TIÃŠU Äá»€ Rá»–NG / GENERIC / TRÃ™NG TÃŠN MÃ”N VÃ€ Tá»° Äá»˜NG BÃ™ Äáº®P THÃ”NG MINH
    var normT = t.replace(/[\s\-_â€“â€”:]+/g, ' ').toUpperCase().trim();
    var normSubj = (subjectName || '').replace(/[\s\-_â€“â€”:]+/g, ' ').toUpperCase().trim();

    var isGeneric = !normT ||
      normT === 'BÃ€I Dáº Y' ||
      normT === 'Káº¾ HOáº CH BÃ€I Dáº Y' ||
      normT === 'GIÃO ÃN' ||
      /^(?:TUáº¦N\s*\d+|TIáº¾T\s*\d+)$/i.test(t) ||
      (normSubj && normT === normSubj) ||
      /^(?:TIáº¾NG VIá»†T|TOÃN|Äáº O Äá»¨C|KHOA Há»ŒC|Lá»ŠCH Sá»¬ VÃ€ Äá»ŠA LÃ|Ã‚M NHáº C|CÃ”NG NGHá»†|HÄTN|HOáº T Äá»˜NG TRáº¢I NGHIá»†M|GDTC|GIÃO Dá»¤C THá»‚ CHáº¤T|Tá»° NHIÃŠN VÃ€ XÃƒ Há»˜I|TNXH)\s*$/i.test(t);

    if (isGeneric && lessonObj) {
      var fallbackTopic = (lessonObj.topic || '').trim();
      var fallbackPeriod = (lessonObj.period || '').trim();
      var tPeriodMatch = t.match(/tiáº¿t\s*\d+/i);
      var effectivePeriod = fallbackPeriod || (tPeriodMatch ? tPeriodMatch[0] : '');

      if (fallbackTopic) {
        if (effectivePeriod && !fallbackTopic.toLowerCase().includes(effectivePeriod.toLowerCase())) {
          return fallbackTopic + ' (' + effectivePeriod + ')';
        }
        return fallbackTopic;
      }
      if (effectivePeriod) {
        return (subjectName || 'BÃ€I Dáº Y') + ' (' + effectivePeriod + ')';
      }
    }

    return t || 'BÃ€I Dáº Y';
  },


  // =========================================================================
  // 4B. GIÃO Dá»¤C HÃ’A NHáº¬P - Dáº Y Há»ŒC PHÃ‚N HÃ“A CHO Há»ŒC SINH KHUYáº¾T Táº¬T
  // =========================================================================

  /**
   * TrÃ­ch xuáº¥t nÄƒng lá»±c cá»‘t lÃµi / má»¥c tiÃªu chÃ­nh tá»« máº£ng YCCÄ gá»‘c cá»§a bÃ i dáº¡y
   */
  extractCoreCompetenceFromLesson: function(lesson) {
    var title = lesson.lessonTitle || lesson.title || '';
    var cleanTitle = title
      .replace(/^(bÃ i\s*\d+[\s:.-]*|tiáº¿t\s*\d+[\s:.-]*|chá»§ Ä‘á»\s*\d+[\s:.-]*)+/i, '')
      .replace(/\(tiáº¿t\s*\d+.*?\)/i, '')
      .replace(/tiáº¿t\s*\d+[:\s-]+/i, '')
      .trim();

    var yccdArr = lesson.yccd || [];
    if (typeof yccdArr === 'string') {
      yccdArr = yccdArr.split('\n');
    }
    if (!Array.isArray(yccdArr) || yccdArr.length === 0) {
      return { raw: cleanTitle || 'kiáº¿n thá»©c bÃ i há»c', cleanTitle: cleanTitle };
    }

    // 1. TÃ¬m cÃ¡c dÃ²ng má»¥c tiÃªu trong "1. NÄƒng lá»±c Ä‘áº·c thÃ¹" (hoáº·c "1. Kiáº¿n thá»©c, ká»¹ nÄƒng")
    var bullets = [];
    var inDacThu = false;
    for (var i = 0; i < yccdArr.length; i++) {
      var line = (yccdArr[i] || '').trim();
      if (/1\.\s*(nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|kiáº¿n\s*thá»©c)/i.test(line)) {
        inDacThu = true;
        continue;
      }
      if (/2\.\s*(nÄƒng\s*lá»±c\s*chung|pháº©m\s*cháº¥t)|3\.\s*pháº©m\s*cháº¥t/i.test(line)) {
        break;
      }
      if (inDacThu && /^[-+*â€¢]/.test(line)) {
        bullets.push(line.replace(/^[-+*â€¢]\s*/, ''));
      }
    }

    // Náº¿u khÃ´ng tháº¥y pháº§n NÄƒng lá»±c Ä‘áº·c thÃ¹, láº¥y cÃ¡c dÃ²ng bullet Ä‘áº§u tiÃªn khÃ´ng pháº£i pháº©m cháº¥t/nÄƒng lá»±c chung
    if (bullets.length === 0) {
      for (var j = 0; j < yccdArr.length; j++) {
        var l = (yccdArr[j] || '').trim();
        if (/^[-+*â€¢]/.test(l) && !/tá»± chá»§|giao tiáº¿p|giáº£i quyáº¿t|chÄƒm chá»‰|yÃªu nÆ°á»›c|nhÃ¢n Ã¡i|trÃ¡ch nhiá»‡m|trung thá»±c/i.test(l)) {
          bullets.push(l.replace(/^[-+*â€¢]\s*/, ''));
        }
      }
    }

    var firstBullet = bullets[0] || '';
    if (!firstBullet) {
      return { raw: cleanTitle || 'kiáº¿n thá»©c bÃ i há»c', cleanTitle: cleanTitle };
    }

    // LÃ m sáº¡ch tiá»n tá»‘ hÃ nh chÃ­nh sÆ° pháº¡m
    var cleaned = firstBullet
      .replace(/^(nháº­n thá»©c cÃ´ng nghá»‡|nÄƒng lá»±c Ä‘áº·c thÃ¹|kiáº¿n thá»©c|ká»¹ nÄƒng|vá» kiáº¿n thá»©c|vá» ká»¹ nÄƒng|hs|há»c sinh)\s*[:.-]?\s*/i, '')
      .replace(/^[-+*â€¢]\s*/, '')
      .replace(/^(Ä‘á»c thÃ nh tiáº¿ng|Ä‘á»c hiá»ƒu)\s*[:.-]\s*/i, '')
      .replace(/\s*vÃ  má»™t sá»‘ (thÃ nh pháº§n|yáº¿u tá»‘) khÃ¡c/i, '')
      .trim();

    var mainClause = cleaned.split(/[;.]/)[0].trim();
    return {
      raw: mainClause || cleanTitle || 'kiáº¿n thá»©c bÃ i há»c',
      cleanTitle: cleanTitle
    };
  },

  /**
   * ÄÃƒ Gá»  Bá»Ž HOÃ€N TOÃ€N CHáº¾ Äá»˜ NGOáº I TUYáº¾N / FALLBACK.
   * Há»‡ thá»‘ng báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p 100% vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n YCCÄ phÃ¢n hÃ³a cho há»c sinh khuyáº¿t táº­t.
   */
  generateSmartDisabilityYccd: function(lesson, disabilityConfig) {
    throw new Error('Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n Ä‘Ã£ Ä‘Æ°á»£c táº¯t hoÃ n toÃ n. Há»‡ thá»‘ng báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p 100% vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n YCCÄ phÃ¢n hÃ³a cho há»c sinh khuyáº¿t táº­t!');
  },

  /**
   * YCCÄ cho há»c sinh khuyáº¿t táº­t:
   * Báº¯t buá»™c sá»­ dá»¥ng káº¿t quáº£ do Gemini AI trá»±c tuyáº¿n biÃªn soáº¡n.
   */
  generateDisabilityYccd: function(lesson, disabilityConfig) {
    if (lesson && lesson.disabilityYccdAI) {
      return lesson.disabilityYccdAI;
    }
    throw new Error('ChÆ°a cÃ³ káº¿t quáº£ YCCÄ tá»« Gemini AI trá»±c tuyáº¿n. Vui lÃ²ng káº¿t ná»‘i máº¡ng vÃ  kiá»ƒm tra API Key Ä‘á»ƒ AI biÃªn soáº¡n trá»±c tuyáº¿n!');
  },

    _disabilityYccdCache: {},

  clearDisabilityCache: function() {
    this._disabilityYccdCache = {};
  },

  /**
   * Chuáº©n hÃ³a vÃ  trÃ­ch xuáº¥t danh sÃ¡ch há»c sinh khuyáº¿t táº­t tá»« cáº¥u hÃ¬nh (Há»— trá»£ 1 - 3 há»c sinh)
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

  getDisabilityCacheKey: function(lesson, disabilityConfig) {
    if (!lesson) return '';
    var students = this.getDisabilityStudentsList(disabilityConfig);
    var stuKey = students.map(function(s) {
      return s.disabilityType + '_' + s.cognitiveRate + '_' + (s.name || '') + '_' + (s.notes || '');
    }).join('__');
    var seed = (disabilityConfig && disabilityConfig.variantSeed) || 0;
    var scope = (disabilityConfig && disabilityConfig.scope) || 'yccd_only';
    var title = (lesson.lessonTitle || lesson.title || '').trim();
    var subj = lesson.subjectKey || lesson.subjectName || '';
    return subj + '::' + title + '::' + stuKey + '::' + seed + '::' + scope;
  },

  getDisabilityTypeName: function(typeKey) {
    if (typeof AIService !== 'undefined' && typeof AIService.getDisabilityTypeName === 'function') {
      return AIService.getDisabilityTypeName(typeKey);
    }
    var map = {
      'tri_tue': 'Khuyáº¿t táº­t trÃ­ tuá»‡ (Tiáº¿p thu cháº­m, ghi nhá»› ngáº¯n háº¡n)',
      'van_dong': 'Khuyáº¿t táº­t váº­n Ä‘á»™ng (Háº¡n cháº¿ viáº¿t, thao tÃ¡c)',
      'nghe_noi': 'Khuyáº¿t táº­t nghe - nÃ³i (Giao tiáº¿p háº¡n cháº¿)',
      'khiem_thinh': 'Khuyáº¿t táº­t nghe - nÃ³i (Khiáº¿m thÃ­nh)',
      'nhin': 'Khuyáº¿t táº­t nhÃ¬n (Thá»‹ lá»±c kÃ©m, cáº§n cá»¡ chá»¯ lá»›n)',
      'khiem_thi': 'Khuyáº¿t táº­t nhÃ¬n (Khiáº¿m thá»‹)',
      'tu_ki': 'Tá»± ká»‰ / TÄƒng Ä‘á»™ng giáº£m chÃº Ã½ (ADHD)',
      'tu_ky': 'Rá»‘i loáº¡n phá»• tá»± ká»‰ (TÆ°Æ¡ng tÃ¡c háº¡n cháº¿)',
      'hoc_tap': 'KhÃ³ khÄƒn há»c táº­p Ä‘áº·c thÃ¹',
      'khac': 'Khuyáº¿t táº­t khÃ¡c / Há»c sinh hÃ²a nháº­p chung'
    };
    return map[typeKey] || 'Khuyáº¿t táº­t há»c táº­p';
  },

  extractLessonEnglishKeyContent: function(lesson) {
    if (!lesson) return { phonics: '', words: [], topic: '', unit: '', focus: '' };

    var title = (lesson.lessonTitle || lesson.title || '').trim();
    var topic = (lesson.topic || '').trim();
    var yccdList = Array.isArray(lesson.yccd) ? lesson.yccd : (typeof lesson.yccd === 'string' ? lesson.yccd.split('\n') : []);
    var yccdText = yccdList.join('\n');

    // 1. Extract Unit & Topic
    var unitMatch = title.match(/Unit\s+(\d+)(?:\s*:\s*([^â€“â€”\-()]+))?/i) || topic.match(/Unit\s+(\d+)(?:\s*:\s*([^â€“â€”\-()]+))?/i);
    var unitNumber = unitMatch ? ('Unit ' + unitMatch[1]) : '';
    var topicName = (unitMatch && unitMatch[2]) ? unitMatch[2].trim() : (topic || 'English Lesson');
    topicName = topicName.replace(/^Unit\s+\d+\s*:\s*/i, '').trim();

    // 2. Extract Phonics / Target Letter
    var phonics = '';
    var pMatch = yccdText.match(/Phonics\s*:\s*([^\n\r.]+)/i);
    if (pMatch) {
      phonics = pMatch[1].trim();
    } else {
      var lMatch = yccdText.match(/sound\s+of\s+the\s+letter\s+([A-Za-z](?:\s*[/,]\s*[A-Za-z])?(?:\s*\([^)]+\))?)/i) || 
                   yccdText.match(/letter\s+([A-Za-z](?:\s*[/,]\s*[A-Za-z])?(?:\s*\([^)]+\))?)/i) ||
                   title.match(/letter\s+([A-Za-z])/i);
      if (lMatch) phonics = 'letter ' + lMatch[1].trim();
    }

    // 3. Extract Target Vocabulary Words
    var words = [];
    var vMatch = yccdText.match(/Vocabulary\s*:\s*([^\n\r.]+)/i);
    if (vMatch) {
      words = vMatch[1].split(/[,;]/).map(function(w) { return w.replace(/[."']/g, '').trim(); }).filter(Boolean);
    }
    if (words.length === 0) {
      var wMatch = yccdText.match(/words\s+([a-zA-Z,\s'â€™\-]+?)(?:\s+with\s+picture|\s+in\s+isolation|\s+in\s+the|\s+and\s+the\s+sentence|\.|$)/i);
      if (wMatch) {
        words = wMatch[1].split(/[,;]|\band\b/).map(function(w) { return w.replace(/[."']/g, '').trim(); }).filter(function(w) {
          return w && w.length > 1 && !/target|picture|context|words|isolation|suitable|rhythm|sentence|structure|while|listening/i.test(w);
        });
      }
    }
    if (words.length === 0 && Array.isArray(lesson.tables)) {
      var tableText = JSON.stringify(lesson.tables);
      var twMatch = tableText.match(/(?:pasta|popcorn|pizza|book|ball|bike|Bill|cat|car|cake|cup|door|desk|duck|dog|egg|elephant|fox|fish|gate|girl|hat|house|horse|ink|insect|jelly|jam|kite|kitten|lemon|lion|monkey|mouse|nut|nest|orange|ox|pen|pencil|pig|queen|quiz|question|square|rabbit|ring|sun|star|sail|sand|sea|tiger|tea|umbrella|uncle|van|vest|village|volleyball|water|watch|box|yoyo|yogurt|zebra|zebu|zoo)/gi);
      if (twMatch) {
        var uniqueWords = Array.from(new Set(twMatch.map(function(w) { return w.toLowerCase(); })));
        words = uniqueWords.slice(0, 4);
      }
    }

    // 4. Focus
    var focus = 'vocabulary and phonics';
    if (/chant/i.test(title) || /chant/i.test(yccdText)) {
      focus = 'listening and chanting with rhythm';
    } else if (/trace|write/i.test(title) || /trace/i.test(yccdText)) {
      focus = 'pre-writing and letter tracing';
    } else if (/talk|story|dialogue|sentence/i.test(title) || /sentence\s*patterns?/i.test(yccdText)) {
      focus = 'speaking and oral interaction';
    } else if (/review|fun\s*time/i.test(title)) {
      focus = 'review and communicative games';
    }

    return { unit: unitNumber, topic: topicName, phonics: phonics, words: words, focus: focus };
  },

  getDisabilityGuidanceEnglish: function(disabilityType, rate, notes, grade) {
    var type = disabilityType || 'tri_tue';
    var r = parseInt(rate, 10) || 50;
    var g = parseInt(grade, 10) || 1;

    var levelDesc = '';
    if (r <= 40) {
      levelDesc = `DIFFERENTIATED WORKLOAD & TARGET LEVEL: ~${r}% of standard curriculum (High support required)
  - Core principle: Maximum simplification. Focus strictly on receptive recognition (looking at picture flashcards, touching realia, listening to audio/teacher model).
  - Production expectation: Minimal verbal repetition (saying 1 single word or target sound / phoneme with direct teacher hand-over-hand or 1-on-1 scaffolding).
  - Clear exemptions: Fully exempt from speaking in full sentences, tracing without support, independent reading, or rapid choral drills.`;
    } else if (r >= 65) {
      levelDesc = `DIFFERENTIATED WORKLOAD & TARGET LEVEL: ~${r}% of standard curriculum (Mild difficulty / Good reception)
  - Core principle: Master core knowledge (Bloom Level 1 - Knowledge & basic Comprehension). Perform basic identification and simple imitation tasks with buddy support.
  - Production expectation: Recognize target sound and 2-3 target words; repeat words clearly and participate actively in pair pointing games.
  - Clear exemptions: Exempt from complex language extensions, storytelling, or independent writing tasks.`;
    } else {
      levelDesc = `DIFFERENTIATED WORKLOAD & TARGET LEVEL: ~${r}% of standard curriculum (Moderate difficulty - Standard SEN baseline)
  - Core principle: Differentiate Bloom cognitive level from analysis/production down to BASIC RECOGNITION, POINTING, and SUPPORTED REPETITION (Bloom Level 1) using flashcards, realia, and peer buddy modeling.
  - Production expectation: Focus on identifying 1-2 core words and the target letter/sound; participate in Activity 1 or 2 using mini-board or pointing.
  - Clear exemptions: Explicitly exempt from formulating full communicative sentences, spelling tests, or rapid oral turn-taking.`;
    }

    var typeGuide = '';
    if (type === 'van_dong') {
      typeGuide = `DISABILITY PROFILE: Physical / Motor Impairment (Limited fine motor skills, difficulty holding pencils or writing/tracing)
- ${levelDesc}
- CRITICAL PEDAGOGICAL PRINCIPLE: Cognitive, listening, and intellectual abilities are COMPLETELY NORMAL. NEVER lower the listening/speaking intellectual expectations of the lesson.
- ACCOMMODATIONS & DIFFERENTIATION:
  + Allow pupil to answer orally, point to flashcards, or hold up True/False or choice cards instead of handwriting, drawing, or tracing letters in the book.
  + In Activity 4/5 (tracing/colouring): Peer buddy assists with handling materials; pupil points to the target letter or traces a large tactile card.
  + Grant extra time and physical assistance for handling books and flashcards.`;
    } else if (type === 'nghe_noi' || type === 'khiem_thinh') {
      typeGuide = `DISABILITY PROFILE: Hearing / Speech Impairment (Hard of hearing, speech delays, limited verbal articulation)
- ${levelDesc}
- PEDAGOGICAL PRINCIPLE: Optimize the VISUAL CHANNEL (illustrations, large flashcards, teacher's mouth shape/lip movements, gestures, TPR actions).
- ACCOMMODATIONS & DIFFERENTIATION:
  + Allow pupil to demonstrate understanding non-verbally: pointing to picture cards, matching word-picture cards, showing thumbs up/down, or raising emotion cards instead of loud choral speaking.
  + Teacher stands close when modeling mouth shapes for the target sound/word.
  + Peer buddy assists with visual cues and gestures during pair games.`;
    } else if (type === 'nhin' || type === 'khiem_thi') {
      typeGuide = `DISABILITY PROFILE: Visual Impairment (Low vision, needs enlarged print or tactile aids)
- ${levelDesc}
- PEDAGOGICAL PRINCIPLE: Optimize the AUDITORY and TACTILE CHANNELS (listening to teacher/audio model, chanting, touching realia and large textured letter cards).
- ACCOMMODATIONS & DIFFERENTIATION:
  + Use high-contrast, enlarged flashcards and real objects (real book, ball, toy car, etc.); seat the pupil in a well-lit front desk.
  + Encourage oral repetition and rhythm/chant participation; do not penalize for missing small visual details in the textbook.`;
    } else if (type === 'tu_ki' || type === 'tu_ky' || type === 'adhd') {
      typeGuide = `DISABILITY PROFILE: Autism Spectrum Disorder (ASD) / ADHD (Sensory sensitivity, social interaction difficulties, short attention span)
- ${levelDesc}
- PEDAGOGICAL PRINCIPLE: Provide a structured, predictable routine with clear visual prompts (visual schedule, emotion cards). Break tasks into short single-step instructions.
- ACCOMMODATIONS & DIFFERENTIATION:
  + Allow pupil to complete manageable individual tasks without pressure to perform in front of the whole class.
  + Pair with an empathetic, patient desk buddy (buddy support model) for games.
  + Give frequent positive reinforcement for small steps of attention and participation.`;
    } else {
      typeGuide = `DISABILITY PROFILE: Intellectual Disability / Specific Learning Difficulties (Slow learning pace, short-term memory limitations)
- ${levelDesc}
- PEDAGOGICAL PRINCIPLE: Multisensory learning (VAKT: Visual, Auditory, Kinesthetic, Tactile). Lower cognitive demand to RECEPTIVE RECOGNITION and SIMPLE REPETITION with visual aids.
- ACCOMMODATIONS & DIFFERENTIATION:
  + Focus directly on the lesson's target sound and 1-2 core words using realia and picture flashcards.
  + Assign basic recognition tasks (pointing, choral repeating 1-2 words with teacher and desk buddy support).
  + Explicitly state exemption from complex sentence structures, spelling, or independent oral presentation.`;
    }

    var guide = typeGuide;
    if (notes && notes.trim()) {
      guide += `\n\n- TEACHER'S SPECIFIC OBSERVATIONS & NOTES: ${notes.trim()}`;
    }
    return guide;
  },

  getDisabilityGuidance: function(disabilityType, rate, notes, subjectKey, grade) {
    var sKey = (subjectKey || '').toLowerCase();
    if (sKey.includes('tieng_anh') || sKey.includes('tiáº¿ng anh') || sKey.includes('english')) {
      return this.getDisabilityGuidanceEnglish(disabilityType, rate, notes, grade);
    }
    if (typeof AIService !== 'undefined' && typeof AIService.getDisabilityGuidance === 'function') {
      return AIService.getDisabilityGuidance(disabilityType, rate, notes, subjectKey, grade);
    }
    if (typeof AIDisabilityService !== 'undefined' && typeof AIDisabilityService.getDisabilityGuidance === 'function') {
      return AIDisabilityService.getDisabilityGuidance(disabilityType, rate, notes, subjectKey, grade);
    }
    var type = disabilityType || 'tri_tue';
    var r = parseInt(rate, 10) || 50;
    var g = parseInt(grade, 10) || 5;
    var guide = '';

    var levelDescription = '';
    if (r <= 40) {
      levelDescription = `Má»¨C Äá»˜ ÄÃP á»¨NG: Khoáº£ng ${r}% (Háº¡n cháº¿ nhiá»u / Má»©c Ä‘á»™ náº·ng)
  + NguyÃªn táº¯c giáº£m táº£i: Tinh giáº£n tá»‘i Ä‘a; táº­p trung vÃ o tri giÃ¡c trá»±c quan trá»±c tiáº¿p, nháº­n biáº¿t tá»‘i thiá»ƒu (chá»‰ tranh, gá»i tÃªn, Ä‘áº¿m cÃ¡c sá»‘ nhá») vÃ  lÃ m quen vá»›i sá»± trá»£ giÃºp trá»±c tiáº¿p (cáº§m tay chá»‰ viá»‡c) cá»§a giÃ¡o viÃªn hoáº·c Ä‘á»“ dÃ¹ng trá»±c quan cá»¡ lá»›n.
  + Äá»‹nh lÆ°á»£ng bÃ i táº­p: Chá»‰ yÃªu cáº§u hoÃ n thÃ nh 1 cÃ¢u hoáº·c 1 Ã½ nháº­n biáº¿t cÆ¡ báº£n nháº¥t cá»§a BÃ i 1; miá»…n hoÃ n toÃ n cÃ¡c bÃ i giáº£i toÃ¡n, tÃ­nh toÃ¡n phá»©c táº¡p hay Ä‘á»c viáº¿t dÃ i.`;
    } else if (r >= 65) {
      levelDescription = `Má»¨C Äá»˜ ÄÃP á»¨NG: Khoáº£ng ${r}% (Má»©c Ä‘á»™ nháº¹ / Tiáº¿p thu khÃ¡)
  + NguyÃªn táº¯c phÃ¢n hÃ³a: Há»c sinh náº¯m Ä‘Æ°á»£c kiáº¿n thá»©c cá»‘t lÃµi (chuáº©n Bloom má»©c 1 vÃ  má»™t pháº§n má»©c 2); tá»± thá»±c hiá»‡n bÃ i táº­p nháº­n biáº¿t vÃ  bÆ°á»›c Ä‘áº§u thÃ´ng hiá»ƒu cÆ¡ báº£n vá»›i sá»± gá»£i Ã½ cá»§a báº¡n há»c.
  + Äá»‹nh lÆ°á»£ng bÃ i táº­p: HoÃ n thÃ nh khoáº£ng ${r}% khá»‘i lÆ°á»£ng bÃ i táº­p cÆ¡ báº£n trong SGK (lÃ m trá»n váº¹n BÃ i 1, BÃ i 2 dáº¡ng cÆ¡ báº£n vÃ  1 cÃ¢u Ä‘Æ¡n giáº£n cá»§a bÃ i toÃ¡n 1 bÆ°á»›c tÃ­nh); rÃ¨n luyá»‡n tÃ­nh tá»± giÃ¡c, tá»± chá»§.`;
    } else {
      levelDescription = `Má»¨C Äá»˜ ÄÃP á»¨NG: Khoáº£ng ${r}% (Má»©c Ä‘á»™ trung bÃ¬nh - Phá»• biáº¿n nháº¥t trong giÃ¡o dá»¥c hÃ²a nháº­p)
  + NguyÃªn táº¯c giáº£m táº£i: Háº¡ báº­c chuáº©n nháº­n thá»©c tá»« thÃ´ng hiá»ƒu, váº­n dá»¥ng xuá»‘ng má»©c NHáº¬N BIáº¾T CÆ  Báº¢N vÃ  LÃ€M THEO MáºªU (Bloom má»©c 1) vá»›i Ä‘á»“ dÃ¹ng trá»±c quan vÃ  báº¡n kÃ¨m cáº·p.
  + Äá»‹nh lÆ°á»£ng bÃ i táº­p: HoÃ n thÃ nh khoáº£ng ${r}% khá»‘i lÆ°á»£ng bÃ i táº­p nháº­n biáº¿t cÆ¡ báº£n trong SGK (BÃ i 1 hoáº·c BÃ i 2 dáº¡ng cÆ¡ báº£n theo máº«u); miá»…n cÃ¡c bÃ i toÃ¡n giáº£i cÃ³ lá»i vÄƒn 2-3 bÆ°á»›c, tÃ­nh thuáº­n tiá»‡n hay nÃ¢ng cao.`;
    }

    if (type === 'van_dong') {
      guide = `Dáº NG Táº¬T: Khuyáº¿t táº­t váº­n Ä‘á»™ng (Háº¡n cháº¿ váº­n Ä‘á»™ng tay chÃ¢n, khÃ³ cáº§m bÃºt viáº¿t/váº½ hoáº·c thao tÃ¡c thá»±c hÃ nh)
- ${levelDescription}
- NGUYÃŠN Táº®C SÆ¯ PHáº M Äáº¶C BIá»†T: Kháº£ nÄƒng nháº­n thá»©c, tÆ° duy vÃ  trÃ­ tuá»‡ cá»§a há»c sinh HOÃ€N TOÃ€N BÃŒNH THÆ¯á»œNG. TUYá»†T Äá»I KHÃ”NG háº¡ tháº¥p yÃªu cáº§u tÆ° duy cá»§a bÃ i há»c.
- ÄIá»€U CHá»ˆNH PHÆ¯Æ NG THá»¨C THá»°C HIá»†N & THá»œI GIAN:
  + Cho phÃ©p há»c sinh tráº£ lá»i miá»‡ng, chá»‰ báº£ng phá»¥, chá»n tháº» chá»¯/tháº» sá»‘ thay vÃ¬ pháº£i viáº¿t Ä‘oáº¡n vÄƒn dÃ i hay váº½ hÃ¬nh, káº» báº£ng phá»©c táº¡p.
  + Giáº£m bá»›t khá»‘i lÆ°á»£ng viáº¿t váº½ tÆ°Æ¡ng á»©ng má»©c Ä‘á»™ váº­n Ä‘á»™ng ${r}%; gia háº¡n thÃªm thá»i gian lÃ m bÃ i; pháº§n viáº¿t chá»‰ yÃªu cáº§u hoÃ n thÃ nh cÃ¢u ngáº¯n hoáº·c tá»« khÃ³a.
  + Trong cÃ¡c hoáº¡t Ä‘á»™ng thá»±c hÃ nh, thÃ­ nghiá»‡m (ToÃ¡n, Khoa há»c, Má»¹ thuáº­t, Thá»§ cÃ´ng): Há»c sinh tham gia cÃ¹ng nhÃ³m báº¡n; báº¡n cÃ¹ng nhÃ³m há»— trá»£ cÃ¡c thao tÃ¡c cáº§m náº¯m, váº­n Ä‘á»™ng; há»c sinh thá»±c hiá»‡n pháº§n viá»‡c tÆ° duy, quan sÃ¡t, tráº£ lá»i hoáº·c thao tÃ¡c vá»«a sá»©c.`;
    } else if (type === 'nghe_noi' || type === 'khiem_thinh') {
      guide = `Dáº NG Táº¬T: Khuyáº¿t táº­t nghe - nÃ³i (Khiáº¿m thÃ­nh, khÃ³ phÃ¡t Ã¢m, háº¡n cháº¿ giao tiáº¿p báº±ng lá»i)
- ${levelDescription}
- NGUYÃŠN Táº®C SÆ¯ PHáº M: Tá»‘i Æ°u hÃ³a kÃªnh thá»‹ giÃ¡c trá»±c quan (hÃ¬nh áº£nh, sÆ¡ Ä‘á»“, tháº» chá»¯/sá»‘ in sáºµn, kháº©u hÃ¬nh, cá»­ chá»‰ / kÃ­ hiá»‡u ngÃ´n ngá»¯).
- ÄIá»€U CHá»ˆNH PHÆ¯Æ NG THá»¨C:
  + Cho phÃ©p há»c sinh thá»ƒ hiá»‡n sá»± hiá»ƒu bÃ i báº±ng hÃ nh Ä‘á»™ng: chá»‰ vÃ o tranh, ghÃ©p/ná»‘i tháº» tá»«, viáº¿t hoáº·c váº½ cÃ¢u tráº£ lá»i ra báº£ng con/phiáº¿u há»c táº­p, chá»n tháº» Ä/S hoáº·c Ä‘Ã¡p Ã¡n trá»±c quan thay vÃ¬ báº¯t buá»™c phÃ¡t biá»ƒu hoáº·c Ä‘á»c to trÆ°á»›c lá»›p.
  + TÆ°Æ¡ng tÃ¡c cÃ¹ng báº¡n há»c báº±ng kÃ­ hiá»‡u ngÃ´n ngá»¯, cá»­ chá»‰; báº¡n cÃ¹ng bÃ n chá»§ Ä‘á»™ng há»— trá»£ chia sáº» bÃ i há»c.`;
    } else if (type === 'nhin' || type === 'khiem_thi') {
      guide = `Dáº NG Táº¬T: Khuyáº¿t táº­t nhÃ¬n (Thá»‹ lá»±c kÃ©m, nhÃ¬n má», cáº§n cá»¡ chá»¯ lá»›n hoáº·c khiáº¿m thá»‹)
- ${levelDescription}
- NGUYÃŠN Táº®C SÆ¯ PHáº M: Tá»‘i Æ°u hÃ³a kÃªnh thÃ­nh giÃ¡c (láº¯ng nghe cÃ´ giÃ¡o vÃ  báº¡n Ä‘á»c máº«u) vÃ  xÃºc giÃ¡c (sá» cháº¡m váº­t tháº­t, mÃ´ hÃ¬nh ná»•i, que tÃ­nh).
- ÄIá»€U CHá»ˆNH PHÆ¯Æ NG THá»¨C:
  + Sá»­ dá»¥ng phiáº¿u há»c táº­p in chá»¯ to, hÃ¬nh áº£nh phÃ³ng to cÃ³ Ä‘á»™ tÆ°Æ¡ng pháº£n cao; ngá»“i á»Ÿ vá»‹ trÃ­ Ä‘á»§ Ã¡nh sÃ¡ng vÃ  gáº§n báº£ng.
  + Cho phÃ©p há»c sinh tiáº¿p thu vÃ  tráº£ lá»i qua lá»i nÃ³i, mÃ´ táº£ báº±ng lá»i thay vÃ¬ yÃªu cáº§u quan sÃ¡t chi tiáº¿t nhá» trÃªn tranh; khÃ´ng cháº¥m lá»—i trÃ¬nh bÃ y chá»¯ viáº¿t/hÃ¬nh váº½.`;
    } else if (type === 'tu_ki' || type === 'tu_ky') {
      guide = `Dáº NG Táº¬T: Rá»‘i loáº¡n phá»• tá»± ká»‰ / TÄƒng Ä‘á»™ng giáº£m chÃº Ã½ (ADHD) (Háº¡n cháº¿ tÆ°Æ¡ng tÃ¡c xÃ£ há»™i, nháº¡y cáº£m mÃ´i trÆ°á»ng, dá»… máº¥t táº­p trung)
- ${levelDescription}
- NGUYÃŠN Táº®C SÆ¯ PHáº M: Táº¡o khÃ´ng gian há»c táº­p á»•n Ä‘á»‹nh, chia nhá» nhiá»‡m vá»¥ thÃ nh tá»«ng bÆ°á»›c rÃµ rÃ ng kÃ¨m hÃ¬nh áº£nh trá»±c quan (Visual schedule).
- ÄIá»€U CHá»ˆNH PHÆ¯Æ NG THá»¨C:
  + Cho phÃ©p há»c sinh hoÃ n thÃ nh nhiá»‡m vá»¥ cÃ¡ nhÃ¢n vá»«a sá»©c, khÃ­ch lá»‡ tá»«ng tiáº¿n bá»™ nhá», trÃ¡nh táº¡o Ã¡p lá»±c biá»ƒu Ä‘áº¡t trÆ°á»›c Ä‘Ã¡m Ä‘Ã´ng.
  + Sá»­ dá»¥ng tháº» cáº£m xÃºc (vui/buá»“n), khuyáº¿n khÃ­ch hÃ²a nháº­p tá»± nhiÃªn cÃ¹ng báº¡n cÃ¹ng bÃ n.`;
    } else {
      guide = `Dáº NG Táº¬T: Khuyáº¿t táº­t trÃ­ tuá»‡ / KhÃ³ khÄƒn há»c táº­p (Tiáº¿p thu cháº­m, ghi nhá»› ngáº¯n háº¡n)
- ${levelDescription}
- NGUYÃŠN Táº®C Äá»ŠNH LÆ¯á»¢NG & GIáº¢M Táº¢I ${r}% THEO CHUáº¨N CV 2345:
  + Háº¡ báº­c chuáº©n nháº­n thá»©c: Chuyá»ƒn Ä‘á»•i tá»« má»©c Ä‘á»™ thÃ´ng hiá»ƒu, váº­n dá»¥ng sang má»©c Ä‘á»™ NHáº¬N BIáº¾T CÆ  Báº¢N, THAO TÃC TRá»°C QUAN vÃ  LÃ€M THEO MáºªU vá»›i sá»± trá»£ giÃºp cá»§a giÃ¡o viÃªn, báº¡n há»c hoáº·c Ä‘á»“ dÃ¹ng há»c táº­p trá»±c quan.
  + Giá»›i háº¡n pháº¡m vi kiáº¿n thá»©c & bÃ i táº­p cá»¥ thá»ƒ: Chá»‰ yÃªu cáº§u há»c sinh lÃ m quen vá»›i cÃ¡c sá»‘ nhá», phÃ©p tÃ­nh Ä‘Æ¡n giáº£n; hoÃ n thÃ nh khoáº£ng ${r}% khá»‘i lÆ°á»£ng bÃ i táº­p nháº­n biáº¿t cÆ¡ báº£n trong SGK (chá»‰ Ä‘á»‹nh rÃµ BÃ i 1 hoáº·c BÃ i 2 dáº¡ng cÆ¡ báº£n theo máº«u).
  + NÃªu rÃµ pháº§n giáº£m táº£i: TuyÃªn bá»‘ rÃµ rÃ ng KHÃ”NG báº¯t buá»™c há»c sinh pháº£i lÃ m cÃ¡c bÃ i toÃ¡n giáº£i cÃ³ lá»i vÄƒn nhiá»u bÆ°á»›c tÃ­nh, bÃ i tÃ­nh thuáº­n tiá»‡n/tÃ­nh nhanh hay cÃ¡c bÃ i táº­p nÃ¢ng cao.`;
    }

    if (notes && notes.trim()) {
      guide += `\n\n- LÆ¯U Ã Äáº¶C THÃ™ Tá»ª GIÃO VIÃŠN Äá»¨NG Lá»šP: ${notes.trim()}`;
    }
    return guide;
  },

  /**
   * Nháº­n diá»‡n tá»± Ä‘á»™ng bÃ i dáº¡y hoáº·c mÃ´n há»c cÃ³ pháº£i lÃ  mÃ´n Tiáº¿ng Anh hay khÃ´ng
   */
  isEnglishLesson: function(lesson, optSubjKey) {
    var s = ((optSubjKey || '') + ' ' + (lesson && (lesson.subjectKey || lesson.subjectName || lesson.subject || ''))).toLowerCase();
    if (s.includes('tieng_anh') || s.includes('tiáº¿ng anh') || s.includes('english')) return true;
    if (lesson) {
      var title = ((lesson.lessonTitle || lesson.title || '') + ' ' + (lesson.topic || '')).toLowerCase();
      if (/english|unit\s+\d+|lesson\s+\d+|review\s+\d+|starter\b|programme/i.test(title)) return true;
      if (Array.isArray(lesson.yccd) && lesson.yccd.some(function(y) { return /pupils will be able to|objectives\b/i.test(y); })) return true;
      if (Array.isArray(lesson.activities) && lesson.activities.some(function(a) { return /warm-up|presentation|practice|production/i.test(a); })) return true;
      if (Array.isArray(lesson.tables) && lesson.tables.some(function(tbl) {
        return Array.isArray(tbl) && tbl.some(function(row) {
          return Array.isArray(row) && row.some(function(cell) {
            return /teacher's activities|pupils' activities|students' activities|warm-up/i.test(cell);
          });
        });
      })) return true;
    }
    return false;
  },

  /**
   * ÄÃƒ Gá»  Bá»Ž HOÃ€N TOÃ€N CHáº¾ Äá»˜ NGOáº I TUYáº¾N / QUY Táº®C MáºªU (Táº¦NG 2) CHO Táº¤T Cáº¢ CÃC MÃ”N.
   * Há»‡ thá»‘ng khÃ´ng tá»± soáº¡n mÃ  báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p 100% vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n.
   */
  getSmartDisabilityActivities: function(lesson, disabilityConfig) {
    throw new Error('Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n (Táº§ng 2) Ä‘Ã£ Ä‘Æ°á»£c gá»¡ bá» hoÃ n toÃ n cho táº¥t cáº£ cÃ¡c mÃ´n. Há»‡ thá»‘ng báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n tiáº¿n trÃ¬nh hoáº¡t Ä‘á»™ng há»c sinh khuyáº¿t táº­t!');
  },

  getSmartDisabilityYccdForStudent: function(lesson, student, subjectKey, grade) {
    throw new Error('Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n (Táº§ng 2) Ä‘Ã£ Ä‘Æ°á»£c gá»¡ bá» hoÃ n toÃ n cho táº¥t cáº£ cÃ¡c mÃ´n. Há»‡ thá»‘ng báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n YCCÄ há»c sinh khuyáº¿t táº­t!');
  },

  getSmartDisabilityYccd: function(lesson, disabilityConfig) {
    throw new Error('Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n (Táº§ng 2) Ä‘Ã£ Ä‘Æ°á»£c gá»¡ bá» hoÃ n toÃ n cho táº¥t cáº£ cÃ¡c mÃ´n. Há»‡ thá»‘ng báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n YCCÄ há»c sinh khuyáº¿t táº­t!');
  },

  /**
   * Äáº£m báº£o YCCÄ khuyáº¿t táº­t luÃ´n Ä‘áº§y Ä‘á»§ cáº£ 2 pháº§n: NÄƒng lá»±c Ä‘áº·c thÃ¹ vÃ  Pháº©m cháº¥t, nÄƒng lá»±c chung
   * Tá»± Ä‘á»™ng bá»• sung náº¿u AI hoáº·c dá»¯ liá»‡u lÆ°u trá»¯ bá»‹ khuyáº¿t 1 trong 2 pháº§n
   */
  ensureDisabilityYccdFull: function(text, lesson, disabilityConfig) {
    if (!text || typeof text !== 'string') return text;
    var trimmed = text.trim();
    if (!trimmed) return trimmed;

    var grade = (lesson && (lesson.grade || 5)) || 5;
    var subjKey = (lesson && (lesson.subjectKey || lesson.subjectName || '')).toLowerCase();
    var isEn = this.isEnglishLesson(lesson, subjKey);
    if (isEn && (!subjKey || !subjKey.includes('tieng_anh'))) subjKey = 'tieng_anh';

    if (isEn) {
      if (this.sanitizeEnglishDisabilityText) {
        trimmed = this.sanitizeEnglishDisabilityText(trimmed, lesson, disabilityConfig);
      }
      var self = this;
      trimmed = trimmed.replace(/^\*\s*(?:há»c\s*sinh|dáº¡ng|student|type)\s*(\d+)\s*:\s*(.+?)(?::|$)/gim, function(m, p1, p2) {
        var rawType = p2.trim();
        var enType = rawType;
        if (/trÃ­\s*tuá»‡|cháº­m|tiáº¿p\s*thu/i.test(rawType)) enType = 'Intellectual Disability';
        else if (/váº­n\s*Ä‘á»™ng|chÃ¢n\s*tay|viáº¿t/i.test(rawType)) enType = 'Physical Disability';
        else if (/khiáº¿m\s*thÃ­nh|nghe\s*[-â€“â€”]?\s*nÃ³i/i.test(rawType)) enType = 'Hearing Impairment';
        else if (/khiáº¿m\s*thá»‹|nhÃ¬n|máº¯t/i.test(rawType)) enType = 'Visual Impairment';
        else if (/tá»±\s*k[iá»·]|adhd|tÄƒng\s*Ä‘á»™ng/i.test(rawType)) enType = 'Autism Spectrum Disorder / ADHD';
        else if (/khÃ³\s*khÄƒn\s*há»c\s*táº­p/i.test(rawType)) enType = 'Learning Difficulties';
        else if (/sen|hÃ²a\s*nháº­p|khÃ¡c/i.test(rawType)) enType = 'SEN Student';
        var rateMatch = rawType.match(/(\d+)\s*%/);
        var rateStr = rateMatch ? (' - ~' + rateMatch[1] + '%') : '';
        return '* Student ' + p1 + ' (' + enType + rateStr + '):';
      });
    } else {
      // Chuáº©n hÃ³a tiÃªu Ä‘á» há»c sinh khuyáº¿t táº­t sang Ä‘á»‹nh dáº¡ng Dáº¡ng 1, Dáº¡ng 2 theo chuáº©n
      trimmed = trimmed.replace(/^\*\s*há»c\s*sinh\s*(\d+)\s*:\s*(.+?)(?:\s*\([^)]*má»©c\s*Ä‘á»™\s*nháº­n\s*thá»©c[^)]*\))?\s*:?\s*$/gim, function(m, p1, p2) {
        return '* Dáº¡ng ' + p1 + ': ' + p2.replace(/:$/, '').trim();
      });
    }

    var hasDacThu = /nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|specific\s*competence|knowledge/i.test(trimmed);
    var hasChung = /pháº©m\s*cháº¥t[,\s]+nÄƒng\s*lá»±c\s*chung|general\s*competence|attitude|qualit/i.test(trimmed);

    if (hasDacThu && hasChung) return trimmed;

    var lines = trimmed.split(/\r?\n/).map(function(s) { return s.trim(); }).filter(Boolean);

    if (!hasChung) {
      lines.push(isEn ? '- General competences & Qualities: Build confidence, actively participate, and cooperate pleasantly with peers.' : '- Pháº©m cháº¥t, nÄƒng lá»±c chung: RÃ¨n luyá»‡n tÃ­nh tá»± tin, hÃ²a nháº­p, há»£p tÃ¡c cÃ¹ng báº¡n vÃ  hoÃ n thÃ nh nhiá»‡m vá»¥ vá»«a sá»©c.');
    }

    return lines.join('\n');
  },

  sanitizeEnglishDisabilityText: function(text, lesson, disabilityConfig) {
    if (!text || typeof text !== 'string') return text;
    var s = text.trim();
    if (!s) return s;

    // 1. Chuáº©n hÃ³a tiÃªu Ä‘á» chÃ­nh
    s = s.replace(/^5\.\s*(?:Ä‘iá»u\s*chá»‰nh\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:hÃ²a\s*nháº­p|khuyáº¿t\s*táº­t)|adjustments?\s*(?:for\s*inclusive\s*students(?:\s*\(sen\))?|\(sen\)))\s*[:.-]?\s*/gim, '5. Adjustments for inclusive students (SEN):\n');

    // 2. Chuáº©n hÃ³a tiÃªu Ä‘á» tá»«ng há»c sinh: * Dáº¡ng 1: Khuyáº¿t táº­t trÃ­ tuá»‡ -> * Student 1 (Intellectual Disability - ~50%):
    var self = this;
    s = s.replace(/^\*\s*(?:há»c\s*sinh|dáº¡ng|student|type)\s*(\d+)\s*:\s*(.+?)(?::|$)/gim, function(m, p1, p2) {
      var rawType = p2.trim();
      var enType = rawType;
      if (/trÃ­\s*tuá»‡|cháº­m|tiáº¿p\s*thu/i.test(rawType)) enType = 'Intellectual Disability';
      else if (/váº­n\s*Ä‘á»™ng|chÃ¢n\s*tay|viáº¿t/i.test(rawType)) enType = 'Physical Disability';
      else if (/khiáº¿m\s*thÃ­nh|nghe\s*[-â€“â€”]?\s*nÃ³i/i.test(rawType)) enType = 'Hearing Impairment';
      else if (/khiáº¿m\s*thá»‹|nhÃ¬n|máº¯t/i.test(rawType)) enType = 'Visual Impairment';
      else if (/tá»±\s*k[iá»·]|adhd|tÄƒng\s*Ä‘á»™ng/i.test(rawType)) enType = 'Autism Spectrum Disorder / ADHD';
      else if (/khÃ³\s*khÄƒn\s*há»c\s*táº­p/i.test(rawType)) enType = 'Learning Difficulties';
      else if (/sen|hÃ²a\s*nháº­p|khÃ¡c/i.test(rawType)) enType = 'SEN Student';

      var rateMatch = rawType.match(/(\d+)\s*%/);
      var rateStr = rateMatch ? (' - ~' + rateMatch[1] + '%') : '';
      return '* Student ' + p1 + ' (' + enType + rateStr + '):';
    });

    // 3. Chuáº©n hÃ³a gáº¡ch Ä‘áº§u dÃ²ng nÄƒng lá»±c
    s = s.replace(/^[-*â€¢+â€“â€”]?\s*nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹\s*:\s*/gim, '- Specific competences: ')
         .replace(/^[-*â€¢+â€“â€”]?\s*pháº©m\s*cháº¥t[,\s]+nÄƒng\s*lá»±c\s*chung\s*:\s*/gim, '- General competences & Qualities: ')
         .replace(/^[-*â€¢+â€“â€”]?\s*pháº©m\s*cháº¥t\s*v[Ã a]\s*nÄƒng\s*lá»±c\s*chung\s*:\s*/gim, '- General competences & Qualities: ')
         .replace(/^[-*â€¢+â€“â€”]?\s*nÄƒng\s*lá»±c\s*chung\s*:\s*/gim, '- General competences: ')
         .replace(/^[-*â€¢+â€“â€”]?\s*pháº©m\s*cháº¥t\s*:\s*/gim, '- Qualities: ')
         .replace(/^[-*â€¢+â€“â€”]?\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:hÃ²a\s*nháº­p|khuyáº¿t\s*táº­t)\s*:\s*/gim, '- For inclusive students: ');

    // 4. Dá»‹ch cÃ¡c cá»¥m tá»« tiáº¿ng Viá»‡t sang tiáº¿ng Anh
    s = s.replace(/há»c\s*sinh\s*hÃ²a\s*nháº­p/gi, 'inclusive student')
         .replace(/há»c\s*sinh\s*khuyáº¿t\s*táº­t/gi, 'inclusive student')
         .replace(/há»c\s*sinh\s*hn/gi, 'inclusive student')
         .replace(/\bHSHN\b/g, 'inclusive student')
         .replace(/giÃ¡o\s*viÃªn\s*(?:hÆ°á»›ng\s*dáº«n|há»—\s*trá»£|giÃºp\s*Ä‘á»¡)/gi, 'teacher guides')
         .replace(/báº¡n\s*cÃ¹ng\s*bÃ n\s*(?:há»—\s*trá»£|kÃ¨m\s*cáº·p|giÃºp\s*Ä‘á»¡)/gi, 'with peer buddy support')
         .replace(/báº¡n\s*kÃ¨m\s*báº¡n/gi, 'peer buddy model')
         .replace(/tháº»\s*cáº£m\s*xÃºc\s*(?:\(vui\s*[-â€“â€”]\s*khÃ´ng\s*vui\))?/gi, 'emotion cards (happy/sad)')
         .replace(/tháº»\s*cáº£m\s*xÃºc/gi, 'emotion cards')
         .replace(/tháº»\s*Ä‘Ãºng\s*[-â€“â€”/]\s*sai/gi, 'True/False cards')
         .replace(/tháº»\s*Ä‘[/]s/gi, 'True/False cards')
         .replace(/tháº»\s*tá»«\s*ngá»¯/gi, 'word cards')
         .replace(/tháº»\s*tranh/gi, 'picture cards')
         .replace(/báº£ng\s*con/gi, 'mini-board')
         .replace(/Ä‘á»“\s*dÃ¹ng\s*trá»±c\s*quan/gi, 'visual aids')
         .replace(/váº­t\s*tháº­t/gi, 'realia')
         .replace(/tiáº¿p\s*thu\s*cháº­m/gi, 'slower learning pace')
         .replace(/ghi\s*nhá»›\s*ngáº¯n\s*háº¡n/gi, 'short-term memory')
         .replace(/quan\s*sÃ¡t\s*tranh/gi, 'observe pictures')
         .replace(/láº¯ng\s*nghe/gi, 'listen attentively')
         .replace(/nháº¯c\s*láº¡i\s*tá»«/gi, 'repeat target words')
         .replace(/chá»‰\s*tranh/gi, 'point to pictures')
         .replace(/vá»—\s*tay/gi, 'clap hands')
         .replace(/hÃ²a\s*nháº­p\s*vui\s*váº»/gi, 'participate joyfully');

    // 5. Náº¿u phÃ¡t hiá»‡n cÃ¢u tiáº¿ng Viá»‡t trong thÃ¢n bÃ i do AI sinh ra, tá»± Ä‘á»™ng lÃ m sáº¡ch hoáº·c sinh láº¡i chuáº©n má»±c
    if (/[Ã Ã¡áº¡áº£Ã£Ã¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµÃ¨Ã©áº¹áº»áº½Ãªá»áº¿á»‡á»ƒá»…Ã¬Ã­á»‹á»‰Ä©Ã²Ã³á»á»ÃµÃ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ã¹Ãºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ã½á»µá»·á»¹Ä‘Ä]/i.test(s) && lesson) {
      var lines = s.split(/\r?\n/);
      var sanitizedLines = [];
      for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (/[Ã Ã¡áº¡áº£Ã£Ã¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµÃ¨Ã©áº¹áº»áº½Ãªá»áº¿á»‡á»ƒá»…Ã¬Ã­á»‹á»‰Ä©Ã²Ã³á»á»ÃµÃ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ã¹Ãºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ã½á»µá»·á»¹Ä‘Ä]/i.test(l)) {
          var cleanTrans = (typeof self.translateVnToEnglish === 'function') ? self.translateVnToEnglish(l) : l;
          if (/specific\s*competence/i.test(l)) {
            sanitizedLines.push(cleanTrans || '- Specific competences: Recognize core target vocabulary with visual flashcards and peer buddy support; exempt from full-sentence production.');
            continue;
          }
          if (/general\s*competence/i.test(l)) {
            sanitizedLines.push(cleanTrans || '- General competences & Qualities: Build confidence in English learning, cooperate pleasantly with desk-mate, and complete manageable tasks.');
            continue;
          }
          if (/^\*\s*(?:student|type)/i.test(l)) {
            sanitizedLines.push(l.replace(/[Ã Ã¡áº¡áº£Ã£Ã¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµÃ¨Ã©áº¹áº»áº½Ãªá»áº¿á»‡á»ƒá»…Ã¬Ã­á»‹á»‰Ä©Ã²Ã³á»á»ÃµÃ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ã¹Ãºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ã½á»µá»·á»¹Ä‘Ä].*$/, '').trim() + ')');
            continue;
          }
          continue;
        }
        sanitizedLines.push(l);
      }
      s = sanitizedLines.join('\n');
    }

        // 7. Visual & Media Channel and other teaching aids

        if (/Visual & Media Channel/i.test(s) || /Kênh hình/i.test(s) || /tranh ảnh số hoá/i.test(s)) {

          s = s.replace(/[-*•]?\s*(?:Visual & Media Channel|Kênh hình)[^:]*:\s*.+/gi, '- Visual & Media Channel: Unit context picture, Picture flashcards, Realia, Digital slides/pictures on TV/Projector.');

        }

    

        // Fallback for remaining teaching aids in Vietnamese

        s = s.replace(/Tranh ngữ cảnh SGK(?:\s*\(Unit context picture\))?/gi, 'Unit context picture')

             .replace(/Bộ (?:picture cards|thẻ tranh)\/thẻ từ(?:\s*\(Picture flashcards\))?/gi, 'Picture flashcards')

             .replace(/Vật thật(?:\s*\(Realia\))?/gi, 'Realia')

             .replace(/Slide tranh ảnh số hoá trình chiếu trên màn hình TV\/Projector/gi, 'Digital slides/pictures on TV/Projector');

    

    return s;
  },

  /**
   * Láº¥y tÃªn ngáº¯n gá»n cá»§a dáº¡ng khuyáº¿t táº­t Ä‘á»ƒ Ä‘Æ°a lÃªn tiÃªu Ä‘á» giÃ¡o Ã¡n
   */
  getDisabilityShortTypeName: function(typeKey) {
    var map = {
      'tri_tue': 'Khuyáº¿t táº­t trÃ­ tuá»‡',
      'van_dong': 'Khuyáº¿t táº­t váº­n Ä‘á»™ng',
      'nghe_noi': 'Khiáº¿m thÃ­nh',
      'khiem_thinh': 'Khiáº¿m thÃ­nh',
      'nhin': 'Khiáº¿m thá»‹',
      'khiem_thi': 'Khiáº¿m thá»‹',
      'ngon_ngu': 'Khuyáº¿t táº­t ngÃ´n ngá»¯',
      'tu_ki': 'Tá»± ká»‰',
      'tu_ky': 'Tá»± ká»‰',
      'hoc_tap': 'KhÃ³ khÄƒn há»c táº­p',
      'adhd': 'TÄƒng Ä‘á»™ng giáº£m chÃº Ã½ (ADHD)'
    };
    return map[typeKey] || 'Há»c sinh hÃ²a nháº­p';
  },

  getDisabilityEnglishShortTypeName: function(typeKey) {
    var map = {
      'tri_tue': 'Intellectual Disability',
      'van_dong': 'Physical Disability',
      'nghe_noi': 'Hearing Impairment',
      'khiem_thinh': 'Hearing Impairment',
      'nhin': 'Visual Impairment',
      'khiem_thi': 'Visual Impairment',
      'ngon_ngu': 'Speech Impairment',
      'tu_ki': 'Autism Spectrum / ADHD',
      'tu_ky': 'Autism Spectrum',
      'hoc_tap': 'Learning Difficulties',
      'adhd': 'ADHD'
    };
    return map[typeKey] || 'SEN Student';
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

  /**
   * Kiá»ƒm tra xem má»™t hÃ ng trong báº£ng hoáº¡t Ä‘á»™ng cÃ³ pháº£i lÃ  hoáº¡t Ä‘á»™ng HSHN hay khÃ´ng
   */
  isDisabilityRow: function(row) {
    if (!row || !Array.isArray(row)) return false;
    if (row.isDisabilityRow) return true;
    var rowStr = row.join(' ');
    return /\bHSHN\b/i.test(rowStr) || 
           /-\s*GV\s+(?:HD|hÆ°á»›ng\s*dáº«n|há»—\s*trá»£)\s+HSHN\b/i.test(rowStr) || 
           /\[HSHN\]/i.test(rowStr) || 
           /há»c\s*sinh\s*(?:hÃ²a\s*nháº­p|khuyáº¿t\s*táº­t)/i.test(rowStr) ||
           /Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:hÃ²a\s*nháº­p|khuyáº¿t\s*táº­t)/i.test(rowStr) ||
           /\bSEN\b|\binclusive\s+student/i.test(rowStr);
  },

  /**
   * ÄÃƒ Gá»  Bá»Ž HOÃ€N TOÃ€N CHáº¾ Äá»˜ NGOáº I TUYáº¾N / QUY Táº®C MáºªU (Táº¦NG 2) CHO Táº¤T Cáº¢ CÃC MÃ”N.
   * Há»‡ thá»‘ng khÃ´ng tá»± soáº¡n mÃ  báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p 100% vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n.
   */
  getDisabilityDodungText: function(disabilityConfig, subjectKey, grade) {
    throw new Error('Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n (Táº§ng 2) Ä‘Ã£ Ä‘Æ°á»£c gá»¡ bá» hoÃ n toÃ n cho táº¥t cáº£ cÃ¡c mÃ´n. Há»‡ thá»‘ng báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n thiáº¿t bá»‹ / Ä‘á»“ dÃ¹ng dáº¡y há»c!');
  },

  /**
   * LÃ m sáº¡ch triá»‡t Ä‘á»ƒ má»i dÃ²ng hoáº¡t Ä‘á»™ng HSHN Ä‘Ã£ chÃ¨n vÃ o báº£ng dáº¡y há»c (Báº£o Ä‘áº£m tÃ­nh lÅ©y Ä‘áº³ng)
   */
  cleanDisabilityFromTables: function(lesson) {
    if (!lesson || !Array.isArray(lesson.tables)) return lesson;
    lesson.tables = lesson.tables.map(function(tableRows) {
      if (!Array.isArray(tableRows)) return tableRows;
      return tableRows.filter(function(row) {
        if (!Array.isArray(row)) return true;
        if (row.isDisabilityRow) return false;
        var rowStr = row.join(' ');
        if (/^\s*\*?\s*(?:HSHN|SEN)\b/i.test(rowStr) || /-\s*(?:GV|T)\s+(?:HD|hÆ°á»›ng\s*dáº«n|guides?|encourages?)\s+(?:cÃ¡c\s+)?(?:HSHN|inclusive\s+students?)\b/i.test(rowStr) || /\[(?:HSHN|SEN)\]/i.test(rowStr) || /há»c\s*sinh\s*(?:hÃ²a\s*nháº­p|khuyáº¿t\s*táº­t)|\binclusive\s+students?\b|\bSEN\b/i.test(rowStr)) {
          return false;
        }
        return true;
      });
    });
    return lesson;
  },

  /**
   * ChÃ¨n hoáº¡t Ä‘á»™ng dáº¡y há»c phÃ¢n hÃ³a cho há»c sinh khuyáº¿t táº­t vÃ o cÃ¡c bÆ°á»›c dáº¡y há»c trong báº£ng (Má»¥c III)
   */
  injectDisabilityActivitiesIntoTables: function(lesson, disabilityConfig) {
    if (!lesson || !Array.isArray(lesson.tables) || lesson.tables.length === 0) return lesson;
    this.cleanDisabilityFromTables(lesson);
    if (!disabilityConfig || !disabilityConfig.enabled || disabilityConfig.scope === 'yccd_only') return lesson;

    // YÃªu cáº§u báº¯t buá»™c do Gemini API sinh ra (cháº¿ Ä‘á»™ offline Ä‘Ã£ táº¯t hoÃ n toÃ n 100%)
    var acts = lesson.disabilityActivitiesAI;
    if (!acts) return lesson;

    var tableRows = lesson.tables[0];
    if (!Array.isArray(tableRows) || tableRows.length === 0) return lesson;
    var has4Cols = tableRows.some(function(row) { return Array.isArray(row) && row.length === 4; });

    // TÃ¬m cÃ¡c vá»‹ trÃ­ chuyá»ƒn tiáº¿p trong báº£ng hoáº¡t Ä‘á»™ng
    var kdIdx = -1, kpIdx = -1, ltIdx = -1, vdIdx = -1;
    var bai1Idx = -1, bai2Idx = -1;

    for (var i = 0; i < tableRows.length; i++) {
      var r = tableRows[i];
      if (!Array.isArray(r)) continue;
      var rStr = r.join(' ').toLowerCase();
      if (r.length === 1) {
        if (/khá»Ÿi\s*Ä‘á»™ng|má»Ÿ\s*Ä‘áº§u|warm-up/i.test(rStr)) kdIdx = i;
        else if (/khÃ¡m\s*phÃ¡|kiáº¿n\s*thá»©c\s*má»›i|exploration|presentation|knowledge/i.test(rStr)) kpIdx = i;
        else if (/luyá»‡n\s*táº­p|thá»±c\s*hÃ nh|practice/i.test(rStr)) ltIdx = i;
        else if (/váº­n\s*dá»¥ng|tráº£i\s*nghiá»‡m|cá»§ng\s*cá»‘|Ä‘Ã¡nh\s*giÃ¡|wrap-up|production|fun\s*corner/i.test(rStr)) vdIdx = i;
      }
      if (/bÃ i\s*1\b|activity\s*1\b/i.test(rStr) && bai1Idx === -1) bai1Idx = i;
      if (/bÃ i\s*2\b|activity\s*2\b/i.test(rStr) && bai2Idx === -1) bai2Idx = i;
    }

    function createRow(teacherText, studentText) {
      var gv = (teacherText || '').trim();
      var hs = (studentText || '').trim();
      if (!gv.startsWith('-') && !gv.startsWith('*')) gv = '- ' + gv;
      if (!hs.startsWith('*') && !hs.startsWith('-')) hs = '* ' + hs;
      var row = has4Cols ? ['', '', gv, hs] : [gv, hs];
      row.isDisabilityRow = true;
      return row;
    }

    var newRows = [];
    for (var rIdx = 0; rIdx < tableRows.length; rIdx++) {
      newRows.push(tableRows[rIdx]);

      // 1. ChÃ¨n HSHN á»Ÿ cuá»‘i pháº§n Khá»Ÿi Ä‘á»™ng
      if (acts.khoiDong && ((kpIdx !== -1 && rIdx === kpIdx - 1) || (kpIdx === -1 && ltIdx !== -1 && rIdx === ltIdx - 1))) {
        newRows.push(createRow(acts.khoiDong.teacherAct, acts.khoiDong.studentAct));
      }

      // 2. ChÃ¨n HSHN á»Ÿ pháº§n KhÃ¡m phÃ¡ (náº¿u cÃ³)
      if (acts.khamPha && kpIdx !== -1 && ltIdx !== -1 && rIdx === ltIdx - 1 && kpIdx < ltIdx - 1) {
        newRows.push(createRow(acts.khamPha.teacherAct, acts.khamPha.studentAct));
      }

      // 3. ChÃ¨n HSHN á»Ÿ pháº§n Luyá»‡n táº­p / BÃ i 1 hoáº·c BÃ i 2
      if (acts.luyenTap && ((bai2Idx !== -1 && rIdx === bai2Idx - 1) || (bai1Idx !== -1 && bai2Idx === -1 && rIdx === bai1Idx + 1))) {
        newRows.push(createRow(acts.luyenTap.teacherAct, acts.luyenTap.studentAct));
      }
    }

    // Náº¿u khÃ´ng tÃ¬m tháº¥y BÃ i 1 / BÃ i 2 cá»¥ thá»ƒ Ä‘á»ƒ chÃ¨n, chÃ¨n trÆ°á»›c pháº§n Váº­n dá»¥ng
    var hasInsertedLt = newRows.some(function(r) { return r.join(' ').includes(acts.luyenTap.studentAct); });
    if (!hasInsertedLt && acts.luyenTap) {
      if (vdIdx !== -1) {
        var insertPos = newRows.findIndex(function(r) { return r.length === 1 && /váº­n\s*dá»¥ng|tráº£i\s*nghiá»‡m|wrap-up|production|fun\s*corner/i.test(r[0]); });
        if (insertPos !== -1) {
          newRows.splice(insertPos, 0, createRow(acts.luyenTap.teacherAct, acts.luyenTap.studentAct));
        } else {
          newRows.push(createRow(acts.luyenTap.teacherAct, acts.luyenTap.studentAct));
        }
      } else {
        newRows.push(createRow(acts.luyenTap.teacherAct, acts.luyenTap.studentAct));
      }
    }

    // 4. ChÃ¨n HSHN á»Ÿ pháº§n Váº­n dá»¥ng / ÄÃ¡nh giÃ¡ tiáº¿t há»c
    if (acts.vanDung) {
      newRows.push(createRow(acts.vanDung.teacherAct, acts.vanDung.studentAct));
    }

    lesson.tables[0] = newRows;
    return lesson;
  },

  /**
   * Sá»­ dá»¥ng Gemini AI Ä‘á»ƒ phÃ¢n tÃ­ch YCCÄ gá»‘c vÃ  biÃªn soáº¡n láº¡i YCCÄ phÃ¢n hÃ³a cho há»c sinh khuyáº¿t táº­t bÃ¡m sÃ¡t bÃ i há»c
   */
  adaptLessonsDisabilityWithGemini: async function(lessons, disabilityConfig) {
    if (!lessons || !lessons.length || !disabilityConfig || !disabilityConfig.enabled) {
      return lessons;
    }

    var self = this;
    var apiKey = this.getGeminiApiKey();
    if (!apiKey) {
      throw new Error('ChÆ°a cÃ³ Gemini API Key Ä‘á»ƒ káº¿t ná»‘i AI. Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n Ä‘Ã£ bá»‹ táº¯t hoÃ n toÃ n, báº¯t buá»™c káº¿t ná»‘i trá»±c tiáº¿p vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n YCCÄ há»c sinh khuyáº¿t táº­t. Vui lÃ²ng cáº¥u hÃ¬nh API Key!');
    }

    if (disabilityConfig.forceRefresh) {
      this._disabilityYccdCache = {};
      lessons.forEach(function(les) {
        if (les) delete les.disabilityYccdAI;
      });
    }

    // 1. PhÃ¢n loáº¡i bÃ i: náº¿u Ä‘Ã£ cÃ³ trong cache hoáº·c Ä‘Ã£ cÃ³ disabilityYccdAI thÃ¬ dÃ¹ng láº¡i ngay
    var neededLessons = [];
    lessons.forEach(function(les) {
      if (!les) return;
      var cKey = self.getDisabilityCacheKey(les, disabilityConfig);
      if (self._disabilityYccdCache && self._disabilityYccdCache[cKey]) {
        var cached = self._disabilityYccdCache[cKey];
        if (typeof cached === 'string') {
          cached = cached.replace(/[;\s]+$/, '').trim();
          if (!cached.endsWith('.')) cached += '.';
        }
        les.disabilityYccdAI = self.ensureDisabilityYccdFull(cached, les, disabilityConfig);
      } else if (les.disabilityYccdAI) {
        les.disabilityYccdAI = self.ensureDisabilityYccdFull(les.disabilityYccdAI, les, disabilityConfig);
      } else {
        neededLessons.push(les);
      }
    });

    // 2. Náº¿u cÃ³ bÃ i cáº§n gá»i AI: báº¯t buá»™c gá»i trá»±c tuyáº¿n 100%, nÃ©m lá»—i náº¿u khÃ´ng káº¿t ná»‘i Ä‘Æ°á»£c
    if (neededLessons.length > 0) {
      var aiServiceObj = (typeof AIService !== 'undefined' ? AIService : (typeof window !== 'undefined' ? window.AIService : null));
      try {
        if (aiServiceObj && typeof aiServiceObj.adaptDisabilityYccdBatch === 'function') {
          await aiServiceObj.adaptDisabilityYccdBatch(neededLessons, disabilityConfig, apiKey);
        } else {
          await self._adaptDisabilityBatchInternal(neededLessons, disabilityConfig, apiKey);
        }
      } catch (aiErr) {
        console.error('Lá»—i káº¿t ná»‘i Gemini AI khi biÃªn soáº¡n YCCÄ khuyáº¿t táº­t:', aiErr);
        var innerMsg = (aiErr && aiErr.message) || 'Lá»—i máº¡ng hoáº·c API key';
        if (innerMsg.indexOf('KhÃ´ng thá»ƒ káº¿t ná»‘i') !== -1) {
          throw aiErr;
        }
        throw new Error('KhÃ´ng thá»ƒ káº¿t ná»‘i vá»›i Google Gemini AI Ä‘á»ƒ biÃªn soáº¡n YCCÄ há»c sinh khuyáº¿t táº­t: ' + innerMsg + '. Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n Ä‘Ã£ bá»‹ táº¯t hoÃ n toÃ n!');
      }

      // Äáº£m báº£o 100% bÃ i dáº¡y Ä‘á»u Ä‘Ã£ Ä‘Æ°á»£c AI sinh káº¿t quáº£ trá»±c tuyáº¿n thÃ nh cÃ´ng
      var failedLessons = [];
      neededLessons.forEach(function(les) {
        if (!les.disabilityYccdAI) {
          failedLessons.push(les.lessonTitle || les.title || 'BÃ i há»c');
        } else {
          var cKey = self.getDisabilityCacheKey(les, disabilityConfig);
          if (!self._disabilityYccdCache) self._disabilityYccdCache = {};
          self._disabilityYccdCache[cKey] = les.disabilityYccdAI;
        }
      });

      if (failedLessons.length > 0) {
        throw new Error('Gemini AI chÆ°a thá»ƒ biÃªn soáº¡n YCCÄ cho ' + failedLessons.length + ' bÃ i dáº¡y (' + failedLessons.slice(0, 3).join(', ') + '...). Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n Ä‘Ã£ táº¯t, vui lÃ²ng thá»­ láº¡i!');
      }
    }

    // 3. ChÃ¨n vÃ o má»¥c I. YCCÄ vÃ  Má»¥c III (Báº£ng tiáº¿n trÃ¬nh) cá»§a tá»«ng bÃ i
    var isBoth = (disabilityConfig && disabilityConfig.scope === 'both');
    lessons.forEach(function(les) {
      self.injectDisabilityIntoLesson(les, disabilityConfig);
      if (isBoth) {
        self.injectDisabilityActivitiesIntoTables(les, disabilityConfig);
      } else {
        self.cleanDisabilityFromTables(les);
      }
    });

    return lessons;
  },

  /**
   * Bá»™ xá»­ lÃ½ ná»™i bá»™ gá»­i batch bÃ i dáº¡y trá»±c tiáº¿p cho Gemini AI Ä‘á»ƒ biÃªn soáº¡n YCCÄ khuyáº¿t táº­t (Há»— trá»£ 1 - 3 há»c sinh)
   * Tá»± Ä‘á»™ng chia nhÃ³m nhá» (batching) tá»‘i Æ°u tá»‘c Ä‘á»™, chá»‘ng trÃ n token (MAX_TOKENS) vÃ  ngáº¯t káº¿t ná»‘i
   */
  _adaptDisabilityBatchInternal: async function(lessons, disabilityConfig, apiKey) {
    if (!lessons || !lessons.length) return lessons;
    var self = this;
    var studentsList = this.getDisabilityStudentsList(disabilityConfig);
    var isBoth = (disabilityConfig && disabilityConfig.scope === 'both');
    // KÃ­ch thÆ°á»›c nhÃ³m bÃ i tá»‘i Æ°u:
    // Náº¿u chá»‰ YCCÄ: 3 bÃ i náº¿u nhiá»u HS, 4 bÃ i náº¿u 1 HS (nháº¹, nhanh gáº¥p Ä‘Ã´i, trÃ¡nh 429)
    // Náº¿u cáº£ 2 pháº§n: 2 bÃ i náº¿u nhiá»u HS, 3 bÃ i náº¿u 1 HS (chá»‘ng trÃ n token & timeout)
    var CHUNK_SIZE = (!isBoth)
      ? ((studentsList.length > 1) ? 3 : 4)
      : ((studentsList.length > 1) ? 2 : 3);
    var chunks = [];
    for (var i = 0; i < lessons.length; i += CHUNK_SIZE) {
      chunks.push(lessons.slice(i, i + CHUNK_SIZE));
    }

    for (var c = 0; c < chunks.length; c++) {
      await self._processDisabilityChunkInternal(chunks[c], disabilityConfig, apiKey);
    }
    return lessons;
  },

  /**
   * Xá»­ lÃ½ tá»«ng nhÃ³m nhá» bÃ i dáº¡y (2-3 bÃ i) báº±ng Gemini AI trá»±c tiáº¿p
   */
  _processDisabilityChunkInternal: async function(chunkLessons, disabilityConfig, apiKey) {
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
      var title = (les.lessonTitle || les.title || ('BÃ i há»c ' + (index + 1))).trim();
      var subj = les.subjectName || les.subject || (IntegrationService.getSubjectDisplayName ? IntegrationService.getSubjectDisplayName(les.subjectKey) : '') || '';
      var gr = les.grade || disabilityConfig.grade || 5;

      var rawYccd = les.yccd || [];
      if (typeof rawYccd === 'string') rawYccd = rawYccd.split('\n');
      var specificYccd = [];
      var inDacThu = false;
      for (var i = 0; i < rawYccd.length; i++) {
        var line = (rawYccd[i] || '').trim();
        if (/há»c sinh khuyáº¿t táº­t/i.test(line)) continue;
        if (/1\.\s*(nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|kiáº¿n\s*thá»©c)/i.test(line)) { inDacThu = true; continue; }
        if (/2\.\s*(nÄƒng\s*lá»±c\s*chung|pháº©m\s*cháº¥t)|3\.\s*pháº©m\s*cháº¥t|4\.\s*tÃ­ch\s*há»£p/i.test(line)) { inDacThu = false; break; }
        if (inDacThu && line) specificYccd.push(line);
      }
      if (specificYccd.length === 0) {
        specificYccd = rawYccd.filter(function(l) {
          return l && !/há»c sinh khuyáº¿t táº­t|tá»± chá»§|giao tiáº¿p|giáº£i quyáº¿t|chÄƒm chá»‰|yÃªu nÆ°á»›c|nhÃ¢n Ã¡i|trÃ¡ch nhiá»‡m|trung thá»±c/i.test(l);
        }).slice(0, 4);
      }
      var itemData = {
        id: index,
        title: title,
        subject: subj,
        subjectKey: les.subjectKey || '',
        grade: gr,
        originalYccd: specificYccd.length ? specificYccd : [(les.topic || title)]
      };

      var isEn = self.isEnglishLesson ? self.isEnglishLesson(les, les.subjectKey || '') : /unit\s+\d+|starter\b|tieng_anh|english/i.test((les.subjectKey || '') + ' ' + title);
      if (isEn && self.extractLessonEnglishKeyContent) {
        var enContent = self.extractLessonEnglishKeyContent(les);
        if (enContent) {
          if (enContent.unit) itemData.unit = enContent.unit;
          if (enContent.topic) itemData.lessonTopic = enContent.topic;
          if (enContent.phonics) itemData.targetPhonics = enContent.phonics;
          if (enContent.words && enContent.words.length) itemData.targetVocabulary = enContent.words;
          if (enContent.focus) itemData.lessonFocus = enContent.focus;
        }
      }

      return itemData;
    });

    var sampleSubj = (itemsToSend[0] ? itemsToSend[0].subjectKey : '') || (disabilityConfig && disabilityConfig.subjectKey) || '';
    var isEnglishSubject = sampleSubj.includes('tieng_anh') ||
      sampleSubj.includes('english') ||
      (itemsToSend[0] && ((itemsToSend[0].subject || '') + ' ' + (itemsToSend[0].title || '')).toLowerCase().includes('tiáº¿ng anh')) ||
      (itemsToSend[0] && /unit\s+\d+|starter\b|review\s+\d+|short\s+story|fun\s+time/i.test(itemsToSend[0].title || '')) ||
      (chunkLessons && chunkLessons.some(function(l) { return self.isEnglishLesson(l, sampleSubj); })) ||
      (chunkLessons && chunkLessons.some(function(l) {
        var s = ((l.subjectKey || '') + ' ' + (l.subjectName || '') + ' ' + (l.subject || '') + ' ' + (l.lessonTitle || '') + ' ' + (l.title || '')).toLowerCase();
        var yStr = (Array.isArray(l.yccd) ? l.yccd.join(' ') : (l.yccd || '')).toLowerCase();
        return s.includes('tieng_anh') || s.includes('tiáº¿ng anh') || s.includes('english') || /unit\s+\d+|starter\b|review\s+\d+|short\s+story|fun\s+time/i.test(s) || /objectives|pupils will be able to/i.test(yStr);
      }));
    if (isEnglishSubject && (!sampleSubj || !sampleSubj.includes('tieng_anh'))) sampleSubj = 'tieng_anh';
    var sampleGrade = itemsToSend[0] ? itemsToSend[0].grade : (disabilityConfig ? disabilityConfig.grade : 5);

    var studentInfoSections = studentsList.map(function(st, sIdx) {
      var sGuide = (typeof AIService !== 'undefined' && AIService.getDisabilityGuidance)
        ? AIService.getDisabilityGuidance(st.disabilityType, st.cognitiveRate, st.notes, sampleSubj, sampleGrade)
        : self.getDisabilityGuidance(st.disabilityType, st.cognitiveRate, st.notes, sampleSubj, sampleGrade);
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
        var titleStr = `Há»ŒC SINH ${sIdx + 1}${st.name ? (' (' + st.name + ')') : ''}:`;
        return `${titleStr}
- Dáº¡ng táº­t: ${st.disabilityTypeName || self.getDisabilityTypeName(st.disabilityType)}
- Má»©c Ä‘á»™ nháº­n thá»©c / tiáº¿p thu: khoáº£ng ${st.cognitiveRate}% so vá»›i chuáº©n chung cá»§a lá»›p
${st.notes ? ('- Ghi chÃº riÃªng tá»« giÃ¡o viÃªn: ' + st.notes) : ''}
- HÆ°á»›ng dáº«n Ä‘iá»u chá»‰nh sÆ° pháº¡m cho dáº¡ng táº­t nÃ y:
${sGuide}`;
      }
    }).join('\n\n');

    var isBoth = (disabilityConfig && disabilityConfig.scope === 'both');
    var promptRules = '';
    var sampleJson = '';

    if (!isBoth) {
      // CHáº¾ Äá»˜ 1: CHá»ˆ TÃCH Há»¢P YCCÄ (Má»¤C I) - Gá»ŒN NHáº¸, Tá»I Æ¯U Tá»C Äá»˜, KHÃ”NG LO NGáº®T GEMINI
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
          promptRules = `QUY Táº®C Báº®T BUá»˜C Äáº¢M Báº¢O CHUáº¨N Má»°C SÆ¯ PHáº M Äá»ŠNH LÆ¯á»¢NG (CHUáº¨N CV 2345):
1. VÄ‚N PHONG SÆ¯ PHáº M: Tá»± nhiÃªn, sinh Ä‘á»™ng, khÃ­ch lá»‡ sá»± hÃ²a nháº­p vÃ  tiáº¿n bá»™ cá»§a há»c sinh; TUYá»†T Äá»I KHÃ”NG dÃ¹ng máº«u cÃ¢u ráº­p khuÃ´n, sÃ¡o rá»—ng.
2. Cáº¤U TRÃšC YCCÄ (disabilityYccd) Báº®T BUá»˜C Äá»¦ 2 Gáº CH Äáº¦U DÃ’NG (PHÃ‚N TÃCH Báº°NG Dáº¤U XUá»NG DÃ’NG \\n):
   - NÄƒng lá»±c Ä‘áº·c thÃ¹: [Chá»‰ rÃµ kiáº¿n thá»©c cá»‘t lÃµi bÃ¡m sÃ¡t bÃ i, mÃ´n há»c vÃ  khá»‘i lá»›p; giá»›i háº¡n pháº¡m vi sá»‘/kiáº¿n thá»©c cá»¥ thá»ƒ (vÃ­ dá»¥ mÃ´n ToÃ¡n: sá»‘ cÃ³ bao nhiÃªu chá»¯ sá»‘, phÃ©p tÃ­nh cá»¥ thá»ƒ nÃ o...), Ä‘á»‹nh lÆ°á»£ng rÃµ hoÃ n thÃ nh khoáº£ng ${singleSt.cognitiveRate}% khá»‘i lÆ°á»£ng bÃ i táº­p nháº­n biáº¿t cÆ¡ báº£n trong SGK (chá»‰ Ä‘á»‹nh rÃµ BÃ i 1 hoáº·c BÃ i 2 theo máº«u), vÃ  loáº¡i trá»« rÃµ pháº§n giáº£m táº£i khÃ´ng báº¯t buá»™c lÃ m (khÃ´ng yÃªu cáº§u giáº£i toÃ¡n cÃ³ lá»i vÄƒn 2-3 bÆ°á»›c tÃ­nh hay bÃ i tÃ­nh thuáº­n tiá»‡n, bÃ i nÃ¢ng cao)].
   - Pháº©m cháº¥t, nÄƒng lá»±c chung: [RÃ¨n luyá»‡n tÃ­nh tá»± tin phÃ¡t Ã¢m/lÃ m bÃ i trÆ°á»›c báº¡n, tÃ­ch cá»±c hÃ²a nháº­p, há»£p tÃ¡c cÃ¹ng báº¡n há»c (mÃ´ hÃ¬nh báº¡n kÃ¨m báº¡n / Ä‘Ã´i báº¡n cÃ¹ng tiáº¿n) vÃ  cÃ³ Ã½ thá»©c ná»— lá»±c hoÃ n thÃ nh nhiá»‡m vá»¥ vá»«a sá»©c].
3. Äá»’ DÃ™NG Dáº Y Há»ŒC (disabilityDodung): NÃªu cá»¥ thá»ƒ 1 dÃ²ng Ä‘á»“ dÃ¹ng trá»±c quan (vÃ­ dá»¥: "- Äá»‘i vá»›i há»c sinh hÃ²a nháº­p: Tháº» cáº£m xÃºc, tháº» Ä/S, báº£ng con, phiáº¿u há»c táº­p/tranh áº£nh trá»±c quan...").`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- NÄƒng lá»±c Ä‘áº·c thÃ¹: ...\\n- Pháº©m cháº¥t, nÄƒng lá»±c chung: ...",
    "disabilityDodung": "- Äá»‘i vá»›i há»c sinh hÃ²a nháº­p: Tháº» cáº£m xÃºc, tháº» Ä/S, báº£ng con, phiáº¿u bÃ i táº­p trá»±c quan."
  }
]`;
        }
      } else {
        if (isEnglishSubject) {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Type ${sIdx + 1}: ${sShort}${sName}
- Specific competences: [Core adapted objectives for this lesson and ${sShort}]
- General competences & Qualities: [Confidence, social inclusion, peer cooperation]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
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
      var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Type ${sIdx + 1}: ${sShort}${sName}\\n- Specific competences: ...\\n- General competences & Qualities: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
      var sName = st.name ? (' ' + st.name) : '';
      return `- For student ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}"
  }
]`;
        } else {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = self.getDisabilityShortTypeName(st.disabilityType);
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Dáº¡ng ${sIdx + 1}: ${sShort}${sName}
- NÄƒng lá»±c Ä‘áº·c thÃ¹: [Má»¥c tiÃªu cá»‘t lÃµi, giáº£m táº£i bÃ¡m sÃ¡t bÃ i vÃ  dáº¡ng táº­t ${sShort}]
- Pháº©m cháº¥t, nÄƒng lá»±c chung: [RÃ¨n luyá»‡n tá»± tin, hÃ²a nháº­p, há»£p tÃ¡c cÃ¹ng báº¡n]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = self.getDisabilityShortTypeName(st.disabilityType);
            var sName = st.name ? (' ' + st.name) : '';
            return `- Äá»‘i vá»›i há»c sinh ${sIdx + 1}${sName} (${sShort}): [Äá»“ dÃ¹ng trá»±c quan phÃ¹ há»£p]`;
          }).join('\n');

          promptRules = `QUY Táº®C Báº®T BUá»˜C Äáº¢M Báº¢O CHUáº¨N Má»°C SÆ¯ PHáº M Äá»ŠNH LÆ¯á»¢NG CHO Tá»ªNG Há»ŒC SINH (${studentsList.length} Há»ŒC SINH HÃ’A NHáº¬P):
1. VÄ‚N PHONG SÆ¯ PHáº M: Tá»± nhiÃªn, sinh Ä‘á»™ng, khÃ­ch lá»‡ sá»± hÃ²a nháº­p vÃ  tiáº¿n bá»™ cá»§a tá»«ng em; TUYá»†T Äá»I KHÃ”NG ráº­p khuÃ´n.
2. Cáº¤U TRÃšC YCCÄ (disabilityYccd): Báº®T BUá»˜C BIÃŠN SOáº N RIÃŠNG CHO Äá»¦ ${studentsList.length} Há»ŒC SINH. Vá»›i Má»–I Há»ŒC SINH, xuáº¥t tiÃªu Ä‘á» báº¯t Ä‘áº§u báº±ng dáº¥u * vÃ  CHÃNH XÃC 2 Gáº CH Äáº¦U DÃ’NG (NÄƒng lá»±c Ä‘áº·c thÃ¹ vÃ  Pháº©m cháº¥t, nÄƒng lá»±c chung):
${stuHeadersExample}
3. Äá»’ DÃ™NG Dáº Y Há»ŒC (disabilityDodung): NÃªu cá»¥ thá»ƒ Ä‘á»“ dÃ¹ng trá»±c quan cho tá»«ng em (phÃ¢n tÃ¡ch báº±ng xuá»‘ng dÃ²ng \\n):
${dodungExample}`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = self.getDisabilityShortTypeName(st.disabilityType);
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Dáº¡ng ${sIdx + 1}: ${sShort}${sName}\\n- NÄƒng lá»±c Ä‘áº·c thÃ¹: ...\\n- Pháº©m cháº¥t, nÄƒng lá»±c chung: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = self.getDisabilityShortTypeName(st.disabilityType);
      var sName = st.name ? (' ' + st.name) : '';
      return `- Äá»‘i vá»›i há»c sinh ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}"
  }
]`;
        }
      }
    } else {
      // CHáº¾ Äá»˜ 2: TÃCH Há»¢P Cáº¢ YCCÄ (Má»¤C I) LáºªN HOáº T Äá»˜NG (Má»¤C III)
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
   - vanDung: { "teacherAct": "- Teacher invites inclusive student to participate in lesson wrap-up ...", "studentAct": "* Inclusive student shares feelings with emotion cards ..." }`;

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
          promptRules = `QUY Táº®C Báº®T BUá»˜C Äáº¢M Báº¢O CHUáº¨N Má»°C SÆ¯ PHáº M Äá»ŠNH LÆ¯á»¢NG (CHUáº¨N CV 2345):
1. VÄ‚N PHONG SÆ¯ PHáº M: Tá»± nhiÃªn, sinh Ä‘á»™ng, khÃ­ch lá»‡ sá»± hÃ²a nháº­p vÃ  tiáº¿n bá»™ cá»§a há»c sinh; TUYá»†T Äá»I KHÃ”NG dÃ¹ng máº«u cÃ¢u ráº­p khuÃ´n, sÃ¡o rá»—ng.
2. Cáº¤U TRÃšC YCCÄ (disabilityYccd) Báº®T BUá»˜C Äá»¦ 2 Gáº CH Äáº¦U DÃ’NG (PHÃ‚N TÃCH Báº°NG Dáº¤U XUá»NG DÃ’NG \\n):
   - NÄƒng lá»±c Ä‘áº·c thÃ¹: [Chá»‰ rÃµ kiáº¿n thá»©c cá»‘t lÃµi bÃ¡m sÃ¡t bÃ i, mÃ´n há»c vÃ  khá»‘i lá»›p; giá»›i háº¡n pháº¡m vi sá»‘/kiáº¿n thá»©c cá»¥ thá»ƒ (vÃ­ dá»¥ mÃ´n ToÃ¡n: sá»‘ cÃ³ bao nhiÃªu chá»¯ sá»‘, phÃ©p tÃ­nh cá»¥ thá»ƒ nÃ o...), Ä‘á»‹nh lÆ°á»£ng rÃµ hoÃ n thÃ nh khoáº£ng ${singleSt.cognitiveRate}% khá»‘i lÆ°á»£ng bÃ i táº­p nháº­n biáº¿t cÆ¡ báº£n trong SGK (chá»‰ Ä‘á»‹nh rÃµ BÃ i 1 hoáº·c BÃ i 2 theo máº«u), vÃ  loáº¡i trá»« rÃµ pháº§n giáº£m táº£i khÃ´ng báº¯t buá»™c lÃ m (khÃ´ng yÃªu cáº§u giáº£i toÃ¡n cÃ³ lá»i vÄƒn 2-3 bÆ°á»›c tÃ­nh hay bÃ i tÃ­nh thuáº­n tiá»‡n, bÃ i nÃ¢ng cao)].
   - Pháº©m cháº¥t, nÄƒng lá»±c chung: [RÃ¨n luyá»‡n tÃ­nh tá»± tin phÃ¡t Ã¢m/lÃ m bÃ i trÆ°á»›c báº¡n, tÃ­ch cá»±c hÃ²a nháº­p, há»£p tÃ¡c cÃ¹ng báº¡n há»c (mÃ´ hÃ¬nh báº¡n kÃ¨m báº¡n / Ä‘Ã´i báº¡n cÃ¹ng tiáº¿n) vÃ  cÃ³ Ã½ thá»©c ná»— lá»±c hoÃ n thÃ nh nhiá»‡m vá»¥ vá»«a sá»©c].
3. Äá»’ DÃ™NG Dáº Y Há»ŒC (disabilityDodung): NÃªu cá»¥ thá»ƒ 1 dÃ²ng Ä‘á»“ dÃ¹ng trá»±c quan (vÃ­ dá»¥: "- Äá»‘i vá»›i há»c sinh hÃ²a nháº­p: Tháº» cáº£m xÃºc, tháº» Ä/S, báº£ng con, phiáº¿u há»c táº­p/tranh áº£nh trá»±c quan...").
4. TIáº¾N TRÃŒNH HOáº T Äá»˜NG (disabilityActivities): Pháº£i nÃªu rÃµ hÃ nh Ä‘á»™ng cá»§a GV vÃ  HS hÃ²a nháº­p cho tá»«ng hoáº¡t Ä‘á»™ng, gáº¯n sÃ¡t kiáº¿n thá»©c cá»§a bÃ i há»c (ngáº¯n gá»n, sÃºc tÃ­ch):
   - khoiDong: { "teacherAct": "- GV hÆ°á»›ng dáº«n HSHN ...", "studentAct": "* HSHN ..." }
   - luyenTap: { "teacherAct": "- GV HD HSHN lÃ m bÃ i táº­p ...", "studentAct": "* HSHN lÃ m bÃ i táº­p ... vÃ o báº£ng con/giÆ¡ tháº» Ä/S..." } (NÃªu bÃ i táº­p sá»‘ nhá» cá»¥ thá»ƒ vá»«a sá»©c cho em!)
   - vanDung: { "teacherAct": "- GV hÆ°á»›ng dáº«n HSHN ...", "studentAct": "* HSHN cÃ¹ng báº¡n chia sáº» vÃ  Ä‘Ã¡nh giÃ¡ tiáº¿t há»c báº±ng tháº» cáº£m xÃºc..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- NÄƒng lá»±c Ä‘áº·c thÃ¹: ...\\n- Pháº©m cháº¥t, nÄƒng lá»±c chung: ...",
    "disabilityDodung": "- Äá»‘i vá»›i há»c sinh hÃ²a nháº­p: Tháº» cáº£m xÃºc, tháº» Ä/S, báº£ng con, phiáº¿u bÃ i táº­p trá»±c quan.",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- GV hÆ°á»›ng dáº«n HSHN quan sÃ¡t tranh/bÃ i hÃ¡t khá»Ÿi Ä‘á»™ng, giao nhiá»‡m vá»¥ vá»«a sá»©c.",
        "studentAct": "* HSHN quan sÃ¡t tranh, vá»— tay vÃ  nháº¯c láº¡i tá»« khÃ³a theo gá»£i Ã½ cá»§a cÃ´."
      },
      "luyenTap": {
        "teacherAct": "- GV HD HSHN lÃ m bÃ i táº­p nháº­n biáº¿t cÆ¡ báº£n BÃ i 1 trÃªn báº£ng con (báº¡n cÃ¹ng bÃ n há»— trá»£).",
        "studentAct": "* HSHN thá»±c hiá»‡n bÃ i táº­p nháº­n biáº¿t Ä‘Æ¡n giáº£n vÃ o báº£ng con vá»›i sá»± há»— trá»£ cá»§a báº¡n cÃ¹ng bÃ n."
      },
      "vanDung": {
        "teacherAct": "- GV hÆ°á»›ng dáº«n HSHN tham gia chia sáº» vÃ  Ä‘Ã¡nh giÃ¡ tiáº¿t há»c.",
        "studentAct": "* HSHN cÃ¹ng báº¡n chia sáº» cáº£m nghÄ© vÃ  tham gia Ä‘Ã¡nh giÃ¡ tiáº¿t há»c báº±ng tháº» cáº£m xÃºc."
      }
    }
  }
]`;
        }
      } else {
        if (isEnglishSubject) {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Type ${sIdx + 1}: ${sShort}${sName}
- Specific competences: [Core adapted objectives for this lesson and ${sShort}]
- General competences & Qualities: [Confidence, social inclusion, peer cooperation]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
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
      var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Type ${sIdx + 1}: ${sShort}${sName}\\n- Specific competences: ...\\n- General competences & Qualities: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : self.getDisabilityShortTypeName(st.disabilityType);
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
            var sShort = self.getDisabilityShortTypeName(st.disabilityType);
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Dáº¡ng ${sIdx + 1}: ${sShort}${sName}
- NÄƒng lá»±c Ä‘áº·c thÃ¹: [Má»¥c tiÃªu cá»‘t lÃµi, giáº£m táº£i bÃ¡m sÃ¡t bÃ i vÃ  dáº¡ng táº­t ${sShort}]
- Pháº©m cháº¥t, nÄƒng lá»±c chung: [RÃ¨n luyá»‡n tá»± tin, hÃ²a nháº­p, há»£p tÃ¡c cÃ¹ng báº¡n]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = self.getDisabilityShortTypeName(st.disabilityType);
            var sName = st.name ? (' ' + st.name) : '';
            return `- Äá»‘i vá»›i há»c sinh ${sIdx + 1}${sName} (${sShort}): [Äá»“ dÃ¹ng trá»±c quan phÃ¹ há»£p]`;
          }).join('\n');

          promptRules = `QUY Táº®C Báº®T BUá»˜C Äáº¢M Báº¢O CHUáº¨N Má»°C SÆ¯ PHáº M Äá»ŠNH LÆ¯á»¢NG CHO Tá»ªNG Há»ŒC SINH (${studentsList.length} Há»ŒC SINH HÃ’A NHáº¬P):
1. VÄ‚N PHONG SÆ¯ PHáº M: Tá»± nhiÃªn, sinh Ä‘á»™ng, khÃ­ch lá»‡ sá»± hÃ²a nháº­p vÃ  tiáº¿n bá»™ cá»§a tá»«ng em; TUYá»†T Äá»I KHÃ”NG ráº­p khuÃ´n.
2. Cáº¤U TRÃšC YCCÄ (disabilityYccd): Báº®T BUá»˜C BIÃŠN SOáº N RIÃŠNG CHO Äá»¦ ${studentsList.length} Há»ŒC SINH. Vá»›i Má»–I Há»ŒC SINH, xuáº¥t tiÃªu Ä‘á» báº¯t Ä‘áº§u báº±ng dáº¥u * vÃ  CHÃNH XÃC 2 Gáº CH Äáº¦U DÃ’NG (NÄƒng lá»±c Ä‘áº·c thÃ¹ vÃ  Pháº©m cháº¥t, nÄƒng lá»±c chung):
${stuHeadersExample}
3. Äá»’ DÃ™NG Dáº Y Há»ŒC (disabilityDodung): NÃªu cá»¥ thá»ƒ Ä‘á»“ dÃ¹ng trá»±c quan cho tá»«ng em (phÃ¢n tÃ¡ch báº±ng xuá»‘ng dÃ²ng \\n):
${dodungExample}
4. TIáº¾N TRÃŒNH HOáº T Äá»˜NG (disabilityActivities): NÃªu rÃµ hÃ nh Ä‘á»™ng cá»§a GV vÃ  cÃ¡c HSHN trong lá»›p gáº¯n sÃ¡t kiáº¿n thá»©c cá»§a bÃ i há»c (ngáº¯n gá»n, sÃºc tÃ­ch):
   - khoiDong: { "teacherAct": "- GV hÆ°á»›ng dáº«n cÃ¡c HSHN ...", "studentAct": "* CÃ¡c HSHN ..." }
   - luyenTap: { "teacherAct": "- GV HD tá»«ng HSHN lÃ m bÃ i táº­p nháº­n biáº¿t vá»«a sá»©c ...", "studentAct": "* CÃ¡c HSHN thá»±c hiá»‡n bÃ i táº­p theo kháº£ nÄƒng ..." }
   - vanDung: { "teacherAct": "- GV hÆ°á»›ng dáº«n cÃ¡c HSHN ...", "studentAct": "* CÃ¡c HSHN cÃ¹ng báº¡n chia sáº» vÃ  Ä‘Ã¡nh giÃ¡ tiáº¿t há»c báº±ng tháº» cáº£m xÃºc..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = self.getDisabilityShortTypeName(st.disabilityType);
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Dáº¡ng ${sIdx + 1}: ${sShort}${sName}\\n- NÄƒng lá»±c Ä‘áº·c thÃ¹: ...\\n- Pháº©m cháº¥t, nÄƒng lá»±c chung: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = self.getDisabilityShortTypeName(st.disabilityType);
      var sName = st.name ? (' ' + st.name) : '';
      return `- Äá»‘i vá»›i há»c sinh ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- GV hÆ°á»›ng dáº«n cÃ¡c HSHN quan sÃ¡t tranh/bÃ i hÃ¡t khá»Ÿi Ä‘á»™ng, giao nhiá»‡m vá»¥ vá»«a sá»©c.",
        "studentAct": "* CÃ¡c HSHN quan sÃ¡t tranh, vá»— tay vÃ  nháº¯c láº¡i tá»« khÃ³a theo gá»£i Ã½ cá»§a cÃ´."
      },
      "luyenTap": {
        "teacherAct": "- GV HD tá»«ng HSHN lÃ m bÃ i táº­p nháº­n biáº¿t cÆ¡ báº£n BÃ i 1 trÃªn báº£ng con (báº¡n cÃ¹ng bÃ n há»— trá»£).",
        "studentAct": "* CÃ¡c HSHN thá»±c hiá»‡n bÃ i táº­p nháº­n biáº¿t Ä‘Æ¡n giáº£n vÃ o báº£ng con vá»›i sá»± há»— trá»£ cá»§a báº¡n cÃ¹ng bÃ n."
      },
      "vanDung": {
        "teacherAct": "- GV hÆ°á»›ng dáº«n cÃ¡c HSHN tham gia chia sáº» vÃ  Ä‘Ã¡nh giÃ¡ tiáº¿t há»c.",
        "studentAct": "* CÃ¡c HSHN cÃ¹ng báº¡n chia sáº» cáº£m nghÄ© vÃ  tham gia Ä‘Ã¡nh giÃ¡ tiáº¿t há»c báº±ng tháº» cáº£m xÃºc."
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
Below is the list of English lessons along with their original OBJECTIVES (YCCÄ).
Based on the original objectives, grade level, and English subject pedagogical context:
1. Formulate differentiated objectives (disabilityYccd) tailored to each inclusive student's cognitive rate (${studentsList.length} student(s)) strictly in ENGLISH.
2. Specify adapted visual teaching aids (disabilityDodung) in ENGLISH.
IMPORTANT: ALL outputs must be 100% in ENGLISH.`
        : `TASK:
Below is the list of English lessons along with their original OBJECTIVES (YCCÄ).
Based on the original objectives, grade level, and English subject pedagogical context:
1. Formulate differentiated objectives (disabilityYccd) tailored to each inclusive student's cognitive rate (${studentsList.length} student(s)) strictly in ENGLISH.
2. Specify adapted visual teaching aids (disabilityDodung) in ENGLISH.
3. Formulate adapted procedures (disabilityActivities: khoiDong, luyenTap, vanDung) with teacher and student actions strictly in ENGLISH.
IMPORTANT: ALL outputs must be 100% in ENGLISH.`;
    } else {
      taskDescription = (!isBoth)
        ? `NHIá»†M Vá»¤:
DÆ°á»›i Ä‘Ã¢y lÃ  danh sÃ¡ch cÃ¡c bÃ i dáº¡y kÃ¨m YÃŠU Cáº¦U Cáº¦N Äáº T (YCCÄ) Gá»C cá»§a tá»«ng bÃ i.
Dá»±a vÃ o YCCÄ Gá»C, Ä‘áº·c thÃ¹ mÃ´n há»c vÃ  khá»‘i lá»›p cá»§a Tá»ªNG BÃ€I Dáº Y, hÃ£y biÃªn soáº¡n:
1. YCCÄ phÃ¢n hÃ³a chi tiáº¿t, Ä‘á»‹nh lÆ°á»£ng cá»¥ thá»ƒ theo má»©c nháº­n thá»©c (chuáº©n ThÃ´ng tÆ° 03 vÃ  CV 2345) dÃ nh cho há»c sinh khuyáº¿t táº­t há»c hÃ²a nháº­p (${studentsList.length} há»c sinh).
2. Thiáº¿t bá»‹ / Äá»“ dÃ¹ng dáº¡y há»c trá»±c quan há»— trá»£ riÃªng cho tá»«ng há»c sinh nÃ y.`
        : `NHIá»†M Vá»¤:
DÆ°á»›i Ä‘Ã¢y lÃ  danh sÃ¡ch cÃ¡c bÃ i dáº¡y kÃ¨m YÃŠU Cáº¦U Cáº¦N Äáº T (YCCÄ) Gá»C cá»§a tá»«ng bÃ i.
Dá»±a vÃ o YCCÄ Gá»C, Ä‘áº·c thÃ¹ mÃ´n há»c vÃ  khá»‘i lá»›p cá»§a Tá»ªNG BÃ€I Dáº Y, hÃ£y biÃªn soáº¡n Ä‘á»“ng bá»™:
1. YCCÄ phÃ¢n hÃ³a chi tiáº¿t, Ä‘á»‹nh lÆ°á»£ng cá»¥ thá»ƒ theo má»©c nháº­n thá»©c (chuáº©n ThÃ´ng tÆ° 03 vÃ  CV 2345) dÃ nh cho há»c sinh khuyáº¿t táº­t há»c hÃ²a nháº­p (${studentsList.length} há»c sinh).
2. Thiáº¿t bá»‹ / Äá»“ dÃ¹ng dáº¡y há»c trá»±c quan há»— trá»£ riÃªng cho tá»«ng há»c sinh nÃ y.
3. Hoáº¡t Ä‘á»™ng phÃ¢n hÃ³a cá»¥ thá»ƒ trong tiáº¿n trÃ¬nh dáº¡y há»c (Khá»Ÿi Ä‘á»™ng, Luyá»‡n táº­p bÃ i táº­p cÆ¡ báº£n, Váº­n dá»¥ng/ÄÃ¡nh giÃ¡) bÃ¡m sÃ¡t ná»™i dung bÃ i há»c, lá»i vÄƒn tá»± nhiÃªn, áº¥m Ã¡p, ngáº¯n gá»n sÃºc tÃ­ch.`;
    }

    var systemRole = isEnglishSubject
      ? `You are an expert Primary English Educator and Special Educational Needs (SEN / Inclusive Education) Specialist.`
      : `Báº¡n lÃ  ChuyÃªn gia PhÆ°Æ¡ng phÃ¡p Dáº¡y há»c Tiá»ƒu há»c vÃ  GiÃ¡o dá»¥c HÃ²a nháº­p (ChÆ°Æ¡ng trÃ¬nh GDPT 2018, ThÃ´ng tÆ° 03/2018/TT-BGDÄT, chuáº©n CÃ´ng vÄƒn 2345/BGDÄT-GDTH).`;

    var prompt = `${systemRole}

${taskDescription}

${isEnglishSubject ? 'INCLUSIVE STUDENTS INFORMATION (' + studentsList.length + ' STUDENT' + (studentsList.length > 1 ? 'S' : '') + '):' : 'THÃ”NG TIN DANH SÃCH Há»ŒC SINH KHUYáº¾T Táº¬T TRONG Lá»šP (' + studentsList.length + ' Há»ŒC SINH):'}
${studentInfoSections}

${isEnglishSubject ? 'LESSONS LIST AND ORIGINAL OBJECTIVES:' : 'DANH SÃCH BÃ€I Dáº Y VÃ€ YCCÄ Gá»C:'}
${JSON.stringify(itemsToSend, null, 2)}

${promptRules}

${isEnglishSubject ? 'RETURN PURE JSON ARRAY (without markdown ```json block):' : 'HÃƒY TRáº¢ Vá»€ Káº¾T QUáº¢ DÆ¯á»šI Dáº NG Máº¢NG JSON THUáº¦N TÃšY (khÃ´ng kÃ¨m mÃ£ markdown ```json):'}
${sampleJson}`;

    var rawResponse = '';
    var apiOptions = { temperature: 0.4, maxTokens: 8192, responseMimeType: 'application/json' };
    if (typeof AIService !== 'undefined' && typeof AIService.callGeminiApi === 'function') {
      rawResponse = await AIService.callGeminiApi(apiKey, prompt, apiOptions);
    } else {
      rawResponse = await this.callGeminiApiDirect(apiKey, prompt, apiOptions);
    }

    var parsed = (typeof AIService !== 'undefined' && typeof AIService.parseJsonSafely === 'function')
      ? AIService.parseJsonSafely(rawResponse)
      : null;

    if (!parsed) {
      try {
        var clean = rawResponse.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
        parsed = JSON.parse(clean);
      } catch (e) {
        var s = rawResponse.indexOf("[");
        var end = rawResponse.lastIndexOf("]");
        if (s !== -1 && end > s) {
          try { parsed = JSON.parse(rawResponse.substring(s, end + 1)); } catch (e2) {}
        }
      }
    }

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
      list = self.extractDisabilityObjectsFromRaw(rawResponse);
    }

    if (!Array.isArray(list) || list.length === 0) {
      throw new Error('AI khÃ´ng tráº£ vá» káº¿t quáº£ máº£ng JSON há»£p lá»‡ cho danh sÃ¡ch bÃ i dáº¡y.');
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
        chunkLessons[idx].disabilityYccdAI = self.ensureDisabilityYccdFull(cleaned, chunkLessons[idx], disabilityConfig);
        if (item.disabilityDodung) {
          chunkLessons[idx].disabilityDodungAI = item.disabilityDodung.trim();
        }
        if (item.disabilityActivities) {
          chunkLessons[idx].disabilityActivitiesAI = item.disabilityActivities;
        }
      }
    });

    // Náº¿u trong nhÃ³m cÃ³ bÃ i bá»‹ sÃ³t, tá»± Ä‘á»™ng thá»­ láº¡i riÃªng cho tá»«ng bÃ i sÃ³t Ä‘Ã³
    var missingLessons = chunkLessons.filter(function(les) { return !les.disabilityYccdAI; });
    if (missingLessons.length > 0 && chunkLessons.length > 1) {
      for (var m = 0; m < missingLessons.length; m++) {
        var mLes = missingLessons[m];
        try {
          await self._processDisabilityChunkInternal([mLes], disabilityConfig, apiKey);
        } catch(subErr) {
          console.warn('KhÃ´ng thá»ƒ biÃªn soáº¡n láº¡i riÃªng cho bÃ i bá»‹ sÃ³t trong internal chunk:', mLes.title, subErr);
        }
      }
    }

    var missingCount = 0;
    chunkLessons.forEach(function(les) {
      if (!les.disabilityYccdAI) missingCount++;
    });
    if (missingCount > 0) {
      throw new Error('Gemini AI chÆ°a hoÃ n thÃ nh Ä‘á»§ bÃ i dáº¡y trong nhÃ³m (thiáº¿u ' + missingCount + ' bÃ i). Cháº¿ Ä‘á»™ ngoáº¡i tuyáº¿n Ä‘Ã£ bá»‹ táº¯t hoÃ n toÃ n, vui lÃ²ng thá»­ láº¡i!');
    }

    return chunkLessons;
  },

  /**
   * TrÃ­ch xuáº¥t cÃ¡c Ä‘á»‘i tÆ°á»£ng bÃ i dáº¡y khuyáº¿t táº­t há»£p lá»‡ tá»« chuá»—i vÄƒn báº£n náº¿u AI bá»‹ cáº¯t ngáº¯n hoáº·c Ä‘á»‹nh dáº¡ng lá»™n xá»™n
   */
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
   * Gá»i Gemini API trá»±c tiáº¿p náº¿u AIService chÆ°a náº¡p xong
   */
  callGeminiApiDirect: async function(apiKey, prompt, options) {
    var opt = options || {};
    var defaultKey = (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_GEMINI_API_KEY) || '';
    var activeKey = (apiKey && apiKey.trim()) || defaultKey;
    var models = ["gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemini-3.5-flash-lite", "gemini-2.5-flash", "gemini-3.5-flash"];
    var lastError = null;

    for (var m = 0; m < models.length; m++) {
      var modelName = models[m];
      try {
        var genConfig = { temperature: typeof opt.temperature === 'number' ? opt.temperature : 0.3 };
        if (opt.maxTokens) genConfig.maxOutputTokens = opt.maxTokens;
        if (opt.responseMimeType) genConfig.responseMimeType = opt.responseMimeType;
        if (modelName === "gemini-2.5-flash") genConfig.thinkingConfig = { thinkingBudget: 0 };

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

        var response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + activeKey, fetchOpts);
        if (timeoutId) clearTimeout(timeoutId);

        if (response.ok) {
          var data = await response.json();
          var rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (rawText) return rawText;
        } else {
          var errJson = await response.json().catch(function(){ return {}; });
          lastError = errJson.error?.message || response.statusText;
          if (activeKey !== defaultKey && defaultKey && (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 429)) {
            console.warn("KhÃ´i phá»¥c key há»‡ thá»‘ng trong callGeminiApiDirect:", defaultKey);
            if (typeof localStorage !== 'undefined') localStorage.setItem("tvth_gemini_api_key", defaultKey);
            return await this.callGeminiApiDirect(defaultKey, prompt, options);
          }
        }
      } catch (e) {
        if (timeoutId) clearTimeout(timeoutId);
        lastError = (e.name === 'AbortError') ? 'QuÃ¡ thá»i gian káº¿t ná»‘i AI (35s)' : e.message;
        if (activeKey !== defaultKey && defaultKey) {
          if (typeof localStorage !== 'undefined') localStorage.setItem("tvth_gemini_api_key", defaultKey);
          return await this.callGeminiApiDirect(defaultKey, prompt, options);
        }
      }
    }
    throw new Error(lastError || "KhÃ´ng thá»ƒ káº¿t ná»‘i Gemini API");
  },

  /**
   * BiÃªn soáº¡n YCCÄ cho má»™t bÃ i dáº¡y Ä‘Æ¡n láº»
   */
  adaptSingleLessonDisability: async function(lesson, disabilityConfig) {
    if (!lesson) return '';
    var list = [lesson];
    await this.adaptLessonsDisabilityWithGemini(list, disabilityConfig);
    return lesson.disabilityYccdAI || '';
  },

  /**
   * XÃ¡c thá»±c vÃ  phÃ¢n giáº£i cáº¥u hÃ¬nh há»— trá»£ há»c sinh khuyáº¿t táº­t.
   * Náº¿u ngÆ°á»i dÃ¹ng lÃ  tÃ i khoáº£n KhÃ¡ch (Guest), tá»± Ä‘á»™ng vÃ´ hiá»‡u hÃ³a Ä‘á»ƒ báº£o vá»‡ tÃ­nh nÄƒng.
   */
  resolveDisabilitySupport: function(optSupport) {
    try {
      if (typeof AuthService !== 'undefined' && typeof AuthService.getSession === 'function') {
        var s = AuthService.getSession();
        if (!s || s.role === 'guest') {
          return { enabled: false, scope: 'yccd_only', cognitiveRate: 50, disabilityType: 'tri_tue', disabilityTypeName: '', notes: '' };
        }
      }
    } catch(e) {}
    var res = optSupport || (typeof integrationState !== 'undefined' && integrationState.disabilitySupport);
    if (!res) {
      return { enabled: false, scope: 'yccd_only', cognitiveRate: 50, disabilityType: 'tri_tue', disabilityTypeName: '', notes: '' };
    }
    if (!res.scope) {
      res.scope = (typeof integrationState !== 'undefined' && integrationState.disabilitySupport && integrationState.disabilitySupport.scope) || 'yccd_only';
    }
    return res;
  },

  /**
   * Kiá»ƒm tra má»™t dÃ²ng vÄƒn báº£n cÃ³ thuá»™c ná»™i dung giÃ¡o dá»¥c hÃ²a nháº­p / há»c sinh khuyáº¿t táº­t (Má»¥c 5) hay khÃ´ng
   */
  isDisabilityLine: function(line) {
    if (!line || typeof line !== 'string') return false;
    var l = line.trim();
    if (!l) return false;

    // KhÃ´ng bao giá» nháº­n diá»‡n nháº§m cÃ¡c má»¥c chuáº©n cá»§a giÃ¡o Ã¡n
    if (/^\s*1\.\s*(?:nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|kiáº¿n\s*thá»©c)/i.test(l)) return false;
    if (/^\s*2\.\s*(?:nÄƒng\s*lá»±c\s*chung|pháº©m\s*cháº¥t)/i.test(l)) return false;
    if (/^\s*3\.\s*pháº©m\s*cháº¥t/i.test(l)) return false;
    if (/^\s*4\.\s*tÃ­ch\s*há»£p/i.test(l)) return false;

    // TiÃªu Ä‘á» Má»¥c 5
    if (/^5\.\s*(?:Ä‘iá»u\s*chá»‰nh\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|adjustments?\s*(?:for\s*inclusive\s*students|\(sen\)))/i.test(l)) return true;

    // Sub-header há»c sinh 1, 2, 3 hoáº·c Dáº¡ng 1, 2, 3 hoáº·c Type 1, 2, 3
    if (/^\*\s*(?:há»c\s*sinh\s*\d+|Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*\d+|dáº¡ng\s*\d+|student\s*\d+|type\s*\d+)/i.test(l)) return true;

    // Tá»« khÃ³a khuyáº¿t táº­t / hÃ²a nháº­p
    if (/há»c\s*sinh\s*khuyáº¿t\s*táº­t|há»c\s*sinh\s*hÃ²a\s*nháº­p|Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|giÃ¡o\s*dá»¥c\s*hÃ²a\s*nháº­p|\bSEN\b|\binclusive\s+students?/i.test(l)) return true;

    // Äá»‹nh dáº¡ng 2 gáº¡ch Ä‘áº§u dÃ²ng do AI phÃ¢n hÃ³a sinh ra (Tiáº¿ng Viá»‡t & Tiáº¿ng Anh)
    if (/^[-*â€¢+â€“â€”]?\s*(?:nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|specific\s*competences?)\s*:/i.test(l)) return true;
    if (/^[-*â€¢+â€“â€”]?\s*(?:pháº©m\s*cháº¥t[,\s]+nÄƒng\s*lá»±c\s*chung|general\s*competences?\s*(?:&|and)?\s*qualit(?:y|ies)?)\s*:/i.test(l)) return true;

    return false;
  },

  /**
   * LÃ m sáº¡ch triá»‡t Ä‘á»ƒ má»i dÃ²ng Má»¥c 5 / YCCÄ khuyáº¿t táº­t khá»i bÃ i dáº¡y (Báº£o Ä‘áº£m tÃ­nh lÅ©y Ä‘áº³ng)
   */
    /**
   * Chuáº©n hÃ³a vÃ  sáº¯p xáº¿p YCCÄ khoa há»c theo CÃ´ng vÄƒn 2345:
   * 1. NÄƒng lá»±c Ä‘áº·c thÃ¹
   * 2. NÄƒng lá»±c chung
   * 3. Pháº©m cháº¥t (Chá»‰ giá»¯ cÃ¡c pháº©m cháº¥t cá»‘t lÃµi: ChÄƒm chá»‰, TrÃ¡ch nhiá»‡m, Trung thá»±c, NhÃ¢n Ã¡i, YÃªu nÆ°á»›c...)
   * 4. TÃ­ch há»£p (Táº­p há»£p toÃ n bá»™ cÃ¡c ná»™i dung TÃ­ch há»£p: AI, NÄƒng lá»±c sá»‘, GDÄP, STEM, Quyá»n con ngÆ°á»i...)
   * 5. Äiá»u chá»‰nh Ä‘á»‘i vá»›i há»c sinh hÃ²a nháº­p
   */
  normalizeYccd: function(rawYccd, isEnLesson) {
    if (!Array.isArray(rawYccd)) return [];
    var self = this;
    var flatLines = [];
    rawYccd.forEach(function(item) {
      if (typeof item !== 'string') return;
      var parts = item.split(/\r?\n/).map(function(s) { return s.trim(); }).filter(Boolean);
      parts.forEach(function(p) { flatLines.push(p); });
    });

    if (typeof isEnLesson !== 'boolean') {
      var joinedCheck = flatLines.join(' ');
      isEnLesson = /english|knowledge|competence|qualit|attitude|phonics|vocabulary|sen\b|adjustments?\s*for/i.test(joinedCheck) &&
                   !/tiáº¿ng\s*viá»‡t|toÃ¡n|Ä‘áº¡o\s*Ä‘á»©c|tá»±\s*nhiÃªn\s*vÃ \s*xÃ£\s*há»™i/i.test(joinedCheck);
    }

    var sec1 = [], sec2 = [], sec3 = [], sec4 = [], sec5 = [], other = [];
    var sec1Header = isEnLesson ? '1. Knowledge:' : '1. NÄƒng lá»±c Ä‘áº·c thÃ¹:';
    var sec2Header = isEnLesson ? '2. Competences:' : '2. NÄƒng lá»±c chung:';
    var sec3Header = isEnLesson ? '3. Attitude/ Qualities:' : '3. Pháº©m cháº¥t:';
    var sec4Header = isEnLesson ? '4. Integration:' : '4. TÃ­ch há»£p:';
    var sec5Header = isEnLesson ? '5. Adjustments for inclusive students (SEN):' : '5. Äiá»u chá»‰nh Ä‘á»‘i vá»›i há»c sinh hÃ²a nháº­p:';
    var curSec = 0;

    flatLines.forEach(function(line) {
      if (/^[\s\-â€“â€”*â€¢]*(?:sá»‘\s*tiáº¿t|thá»i\s*gian|ngÃ y)\s*thá»±c\s*hiá»‡n/i.test(line)) return;
      if (/^[\s\-â€“â€”*â€¢]*(?:káº¿\s*hoáº¡ch\s*bÃ i\s*dáº¡y|bÃ i\s*há»c\s*tiáº¿t\s*\d+|lesson\s*plan)/i.test(line)) return;
      if (/^\s*(?:A\.|I\.)\s*OBJECTIVES\s*[:.-]?\s*$/i.test(line)) {
        if (!sec1.length && !sec2.length && !sec3.length && !sec4.length && !sec5.length && !other.length) {
          other.push(line);
          return;
        }
        return;
      }

      // TiÃªu Ä‘á» Má»¥c 5 (Äiá»u chá»‰nh Ä‘á»‘i vá»›i há»c sinh hÃ²a nháº­p / SEN)
      if (/^(?:5\.|[45]\.)\s*(?:Ä‘iá»u\s*chá»‰nh(?:\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p))?|adjustments?\s*(?:for\s*(?:inclusive\s*students(?:\s*\(sen\))?|sen)|\(sen\)))/i.test(line)) {
        curSec = 5;
        sec5Header = isEnLesson ? '5. Adjustments for inclusive students (SEN):' : '5. Äiá»u chá»‰nh Ä‘á»‘i vá»›i há»c sinh hÃ²a nháº­p:';
        return;
      }

      // Náº¿u Ä‘ang á»Ÿ Má»¥c 5: giá»¯ toÃ n bá»™ cÃ¡c dÃ²ng thuá»™c Má»¥c 5 trá»« khi gáº·p tiÃªu Ä‘á» má»¥c lá»›n khÃ¡c (1., 2., 3., 4.)
      if (curSec === 5) {
        if (/^(?:[1-4]|1\.[12])\.?\s*(?:nÄƒng\s*lá»±c|pháº©m\s*cháº¥t|tÃ­ch\s*há»£p|kiáº¿n\s*thá»©c|knowledge|competence|qualit|attitude|integration)/i.test(line)) {
          // ThoÃ¡t khá»i Má»¥c 5 Ä‘á»ƒ xuá»‘ng xá»­ lÃ½ má»¥c 1..4 bÃªn dÆ°á»›i
        } else {
          sec5.push(line);
          return;
        }
      }

      // Nháº­n diá»‡n dÃ²ng khuyáº¿t táº­t Ä‘á»™c láº­p (náº¿u chÆ°a vÃ o curSec 5)
      if (/há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|giÃ¡o\s*dá»¥c\s*hÃ²a\s*nháº­p|inclusive\s*students?|special\s*educational\s*needs|\bsen\b/i.test(line) ||
          /^\*\s*(?:há»c\s*sinh\s*\d+|Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*\d+|dáº¡ng\s*\d+|student\s*\d+)/i.test(line) ||
          /^[-*â€¢+â€“â€”]?\s*(?:pháº©m\s*cháº¥t[,\s]+nÄƒng\s*lá»±c\s*chung|general\s*competences?\s*(?:&|and)\s*qualities)\s*:/i.test(line) ||
          (/^[-*â€¢+â€“â€”]?\s*specific\s*competences?\s*:/i.test(line) && (curSec === 5 || (isEnLesson && sec1.length > 0)))) {
        curSec = 5;
        sec5.push(line);
        return;
      }

      // 1. NÄƒng lá»±c Ä‘áº·c thÃ¹ / Kiáº¿n thá»©c (há»— trá»£ cáº£ "1. NÄƒng lá»±c Ä‘áº·c thÃ¹", "1.1. NÄƒng lá»±c Ä‘áº·c thÃ¹", "1. Kiáº¿n thá»©c", "1. Knowledge:", "1. Specific competences:")
      var isSec1 = /^(?:1(?:\.1)?\.?)\s*(?:nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|kiáº¿n\s*thá»©c|knowledge|specific\s*competences?)/i.test(line) ||
                   /^[-*â€¢+â€“â€”]?\s*(?:nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|kiáº¿n\s*thá»©c|knowledge|specific\s*competences?)\s*[:.-]?$/i.test(line);
      if (isSec1) {
        curSec = 1;
        if (/knowledge/i.test(line)) sec1Header = '1. Knowledge:';
        else if (/specific/i.test(line)) sec1Header = '1. Specific competences:';
        else if (isEnLesson) sec1Header = '1. Knowledge:';
        else sec1Header = '1. NÄƒng lá»±c Ä‘áº·c thÃ¹:';
        var mContent = line.replace(/^(?:1(?:\.1)?\.?)\s*(?:nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹|kiáº¿n\s*thá»©c|knowledge|specific\s*competences?)\s*[:.-]?\s*/i, '').trim();
        if (mContent) sec1.push(mContent.startsWith('-') ? mContent : ('- ' + mContent));
        return;
      }

      // 2. NÄƒng lá»±c chung / Competences (há»— trá»£ cáº£ "2. NÄƒng lá»±c chung", "1.2. NÄƒng lá»±c chung", "2. Competences:", "2. General competences:")
      var isSec2 = /^(?:2|1\.2)\.?\s*(?:nÄƒng\s*lá»±c\s*chung|competences?|general\s*competences?)/i.test(line) ||
                   /^[-*â€¢+â€“â€”]?\s*(?:nÄƒng\s*lá»±c\s*chung|competences?|general\s*competences?)\s*[:.-]?$/i.test(line);
      if (isSec2) {
        curSec = 2;
        if (/general/i.test(line)) sec2Header = '2. General competences:';
        else if (/competence/i.test(line)) sec2Header = '2. Competences:';
        else if (isEnLesson) sec2Header = '2. Competences:';
        else sec2Header = '2. NÄƒng lá»±c chung:';
        var mContent2 = line.replace(/^(?:2|1\.2)\.?\s*(?:nÄƒng\s*lá»±c\s*chung|competences?|general\s*competences?)\s*[:.-]?\s*/i, '').trim();
        if (mContent2) sec2.push(mContent2.startsWith('-') ? mContent2 : ('- ' + mContent2));
        return;
      }

      // 3. Pháº©m cháº¥t / Attitude & Qualities (há»— trá»£ cáº£ "3. Pháº©m cháº¥t", "2. Pháº©m cháº¥t", "3. Attitude/ Qualities:", "3. Qualities:")
      var isSec3 = /^(?:3|2)\.?\s*(?:pháº©m\s*cháº¥t|attitude\s*(?:\/|and|&)\s*qualities|qualities|attitude)/i.test(line) ||
                   /^[-*â€¢+â€“â€”]?\s*(?:pháº©m\s*cháº¥t|attitude\s*(?:\/|and|&)\s*qualities|qualities|attitude)\s*[:.-]?$/i.test(line);
      if (isSec3) {
        curSec = 3;
        if (/attitude/i.test(line)) sec3Header = '3. Attitude/ Qualities:';
        else if (/qualit/i.test(line)) sec3Header = '3. Qualities:';
        else if (isEnLesson) sec3Header = '3. Attitude/ Qualities:';
        else sec3Header = '3. Pháº©m cháº¥t:';
        var mContent3 = line.replace(/^(?:3|2)\.?\s*(?:pháº©m\s*cháº¥t|attitude\s*(?:\/|and|&)\s*qualities|qualities|attitude)\s*[:.-]?\s*/i, '').trim();
        if (mContent3) sec3.push(mContent3.startsWith('-') ? mContent3 : ('- ' + mContent3));
        return;
      }

      // Nháº­n diá»‡n cÃ¡c tiá»ƒu má»¥c TÃ­ch há»£p (ANQP, AI, NÄƒng lá»±c sá»‘, STEM, GDÄP...)
      var mTichHopSub = line.match(/^(?:[3-5]\.|\.)?\s*(?:tÃ­ch\s*há»£p|integration)\s*(anqp|ai|nÄƒng\s*lá»±c\s*sá»‘|stem|gdÄ‘p|quyá»n\s*con\s*ngÆ°á»i|digital(?:\s*competence)?|human\s*rights)(.*)$/i);
      if (mTichHopSub) {
        curSec = 4;
        sec4Header = isEnLesson ? '4. Integration:' : '4. TÃ­ch há»£p:';
        var thType = mTichHopSub[1].trim();
        if (/anqp/i.test(thType)) thType = 'ANQP';
        else if (/ai/i.test(thType)) thType = 'AI';
        else if (/nÄƒng\s*lá»±c\s*sá»‘|digital/i.test(thType)) thType = isEnLesson ? 'Digital competence' : 'NÄƒng lá»±c sá»‘';
        else if (/stem/i.test(thType)) thType = 'STEM';
        else if (/gdÄ‘p/i.test(thType)) thType = isEnLesson ? 'Local education' : 'GDÄP';
        else if (/quyá»n\s*con\s*ngÆ°á»i|human/i.test(thType)) thType = isEnLesson ? 'Human rights' : 'Quyá»n con ngÆ°á»i';
        var thRest = mTichHopSub[2].trim().replace(/^[:.-]+\s*/, '');
        var prefix = isEnLesson ? '- Integration of ' : '- TÃ­ch há»£p ';
        sec4.push(prefix + thType + (thRest ? (': ' + thRest) : ':'));
        return;
      }

      // 4. TÃ­ch há»£p (há»— trá»£ cáº£ "4. TÃ­ch há»£p", "3. TÃ­ch há»£p", "[TÃ­ch há»£p]", "4. Integration:")
      var isSec4 = /^(?:4|3)\.?\s*(?:tÃ­ch\s*há»£p|ná»™i\s*dung\s*tÃ­ch\s*há»£p|integration)\s*[:.-]?$/i.test(line) ||
                   /^[\s*â€¢\-â€“â€”]*(?:tÃ­ch\s*há»£p|integration)\s*[:.-]?$/i.test(line) ||
                   /^\[(?:tÃ­ch\s*há»£p|integration)\]/i.test(line);
      if (isSec4) {
        curSec = 4;
        sec4Header = isEnLesson ? '4. Integration:' : '4. TÃ­ch há»£p:';
        return;
      }

      if (curSec === 1) sec1.push(line);
      else if (curSec === 2) sec2.push(line);
      else if (curSec === 3) {
        // Tá»± Ä‘á»™ng phÃ¡t hiá»‡n náº¿u dÃ²ng trong má»¥c 3 lÃ  ná»™i dung TÃ­ch há»£p -> Chuyá»ƒn xuá»‘ng má»¥c 4 cho khoa há»c!
        var isTichHopLine = /^[\-*â€¢+â€“â€”]?\s*(?:tÃ­ch\s*há»£p|nÄƒng\s*lá»±c\s*sá»‘|ká»¹\s*nÄƒng\s*sá»‘|trÃ­\s*tuá»‡\s*nhÃ¢n\s*táº¡o|stem|gdÄ‘p|Ä‘á»‹a\s*phÆ°Æ¡ng|trÃ \s*vinh|ai\b|nls\b|digital\s*competence|ai\s*literacy)/i.test(line) || /tÃ­ch\s*há»£p\s*ai/i.test(line);
        if (isTichHopLine) {
          sec4.push(line);
        } else {
          sec3.push(line);
        }
      }
      else if (curSec === 4) sec4.push(line);
      else if (curSec === 5) sec5.push(line);
      else other.push(line);
    });

    var out = [];
    if (other.length) out = out.concat(other);
    // Chá»‰ Ä‘Æ°a tiÃªu Ä‘á» khi má»¥c Ä‘Ã³ THá»°C Sá»° CÃ“ Ná»˜I DUNG, triá»‡t tiÃªu hoÃ n toÃ n lá»—i tiÃªu Ä‘á» rá»—ng má»“ cÃ´i
    if (sec1.length) { out.push(sec1Header); out = out.concat(sec1); }
    if (sec2.length) { out.push(sec2Header); out = out.concat(sec2); }
    if (sec3.length) { out.push(sec3Header); out = out.concat(sec3); }
    if (sec4.length) { out.push(sec4Header); out = out.concat(sec4); }
    if (sec5.length) { out.push(sec5Header); out = out.concat(sec5); }
    return out;
  },

  cleanDisabilityFromLesson: function(lesson) {
    if (!lesson) return lesson;
    var self = this;
    if (Array.isArray(lesson.yccd)) {
      var inDisSection = false;
      var newYccd = [];
      lesson.yccd.forEach(function(item) {
        if (typeof item !== 'string') {
          newYccd.push(item);
          return;
        }
        var subLines = item.split(/\r?\n/);
        var filteredSubLines = [];
        for (var i = 0; i < subLines.length; i++) {
          var sl = subLines[i].trim();
          if (/^5\.\s*(?:Ä‘iá»u\s*chá»‰nh\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|adjustments?\s*(?:for\s*inclusive\s*students|\(sen\)))/i.test(sl)) {
            inDisSection = true;
            continue;
          }
          if (inDisSection) {
            if (/^[1-4]\.\s*/.test(sl)) {
              inDisSection = false;
              filteredSubLines.push(subLines[i]);
            }
            continue;
          }
          if (/há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|giÃ¡o\s*dá»¥c\s*hÃ²a\s*nháº­p|^\*\s*(?:há»c\s*sinh|dáº¡ng|type|student)\s*\d+|\bSEN\b|\binclusive\s+students?/i.test(sl)) {
            continue;
          }
          filteredSubLines.push(subLines[i]);
        }
        if (filteredSubLines.length > 0) {
          newYccd.push(filteredSubLines.join('\n'));
        }
      });
      lesson.yccd = newYccd;
    }
    this.cleanDisabilityFromTables(lesson);
    return lesson;
  },

  /**
   * ChÃ¨n yÃªu cáº§u cáº§n Ä‘áº¡t phÃ¢n hÃ³a cho há»c sinh khuyáº¿t táº­t vÃ o cuá»‘i má»¥c I. YCCÄ cá»§a bÃ i dáº¡y
   * Báº£o Ä‘áº£m tÃ­nh lÅ©y Ä‘áº³ng (Idempotent): gá»i nhiá»u láº§n khÃ´ng bao giá» bá»‹ nhÃ¢n báº£n Má»¥c 5
   */
  injectDisabilityIntoLesson: function(lesson, disabilityConfig) {
    if (!lesson) return lesson;
    if (!Array.isArray(lesson.yccd)) {
      lesson.yccd = lesson.yccd ? [lesson.yccd] : [];
    }

    // 1. LuÃ´n lÃ m sáº¡ch dÃ²ng khuyáº¿t táº­t cÅ© náº¿u cÃ³ trÆ°á»›c Ä‘Ã³ (cáº£ YCCÄ vÃ  Báº£ng hoáº¡t Ä‘á»™ng)
    this.cleanDisabilityFromLesson(lesson);

    // 2. Náº¿u khÃ´ng báº­t cáº¥u hÃ¬nh khuyáº¿t táº­t, dá»«ng láº¡i ngay sau khi Ä‘Ã£ lÃ m sáº¡ch
    if (!disabilityConfig || !disabilityConfig.enabled) {
      return lesson;
    }

    // 3. ChÃ¨n káº¿t quáº£ sinh trá»±c tiáº¿p tá»« Gemini API (Cháº¿ Ä‘á»™ offline Ä‘Ã£ bá»‹ táº¯t hoÃ n toÃ n 100%)
    var disabilityLine = lesson.disabilityYccdAI;
    if (!disabilityLine && disabilityConfig && disabilityConfig.customText) {
      disabilityLine = disabilityConfig.customText;
    }
    if (disabilityLine && typeof disabilityLine === 'string' && disabilityLine.trim()) {
      var isEn = this.isEnglishLesson(lesson, (disabilityConfig && disabilityConfig.subjectKey) || '');
      if (isEn && this.sanitizeEnglishDisabilityText) {
        disabilityLine = this.sanitizeEnglishDisabilityText(disabilityLine, lesson, disabilityConfig);
      }
      disabilityLine = this.ensureDisabilityYccdFull(disabilityLine, lesson, disabilityConfig);
      var cleanLine = disabilityLine.replace(/[;\s]+$/, '').trim();
      if (!cleanLine.endsWith('.')) cleanLine += '.';
      if (!/^5\.\s*(?:Ä‘iá»u\s*chá»‰nh|adjustment)/i.test(cleanLine)) {
        cleanLine = (isEn ? '5. Adjustments for inclusive students (SEN):\n' : '5. Äiá»u chá»‰nh Ä‘á»‘i vá»›i há»c sinh hÃ²a nháº­p:\n') + cleanLine;
      }
      lesson.yccd.push(cleanLine);
    }

    return lesson;
  },

  // =========================================================================
  // 4b. TÃCH Há»¢P GIÃO Dá»¤C Äá»ŠA PHÆ¯Æ NG (GDÄP) Tá»ˆNH TRÃ€ VINH (CHUáº¨N QÄ 2727/QÄ-BGDÄT)
  // =========================================================================

  /**
   * TrÃ­ch xuáº¥t hoáº·c láº¥y cáº¥u hÃ¬nh TÃ­ch há»£p GDÄP (Tá»‰nh TrÃ  Vinh)
   */
  resolveGddpSupport: function(optGddp) {
    var res = optGddp || (typeof integrationState !== 'undefined' && integrationState.gddpSupport);
    if (!res) {
      try {
        var enabled = (typeof localStorage !== 'undefined' && localStorage.getItem('tvth_gddp_enabled') === 'true');
        var scope = (typeof localStorage !== 'undefined' && localStorage.getItem('tvth_gddp_scope')) || 'both';
        var province = (typeof localStorage !== 'undefined' && localStorage.getItem('tvth_gddp_province')) || 'TrÃ  Vinh';
        res = { enabled: enabled, scope: scope, province: province };
      } catch(e) {}
    }
    if (!res) {
      return { enabled: false, province: 'TrÃ  Vinh', scope: 'both' };
    }
    if (!res.scope) res.scope = 'both';
    if (!res.province) res.province = 'TrÃ  Vinh';
    return res;
  },

  /**
   * Kiá»ƒm tra xem má»™t dÃ²ng cÃ³ pháº£i lÃ  dÃ²ng tÃ­ch há»£p GDÄP hay khÃ´ng
   */
  isGddpLine: function(line) {
    if (!line || typeof line !== 'string') return false;
    var l = line.trim();
    if (!l) return false;
    if (/^\s*[1235]\.\s*/i.test(l)) return false;
    return /tÃ­ch\s*há»£p\s*(?:giÃ¡o\s*dá»¥c\s*)?Ä‘á»‹a\s*phÆ°Æ¡ng|tÃ­ch\s*há»£p\s*gdÄ‘p/i.test(l);
  },

  /**
   * LÃ m sáº¡ch má»i dÃ²ng/ná»™i dung tÃ­ch há»£p GDÄP trong báº£ng hoáº¡t Ä‘á»™ng
   */
  cleanGddpFromTables: function(lesson) {
    if (!lesson || !Array.isArray(lesson.tables)) return lesson;
    lesson.tables = lesson.tables.map(function(tableRows) {
      if (!Array.isArray(tableRows)) return tableRows;
      return tableRows.filter(function(r) {
        if (!Array.isArray(r)) return true;
        if (r.isGddpRow) return false;
        var rStr = r.join(' ');
        return !(rStr.includes('TÃ­ch há»£p GiÃ¡o dá»¥c Ä‘á»‹a phÆ°Æ¡ng (TrÃ  Vinh)') || rStr.includes('TÃ­ch há»£p GDÄP TrÃ  Vinh'));
      });
    });
    return lesson;
  },

  /**
   * LÃ m sáº¡ch triá»‡t Ä‘á»ƒ má»i dÃ²ng GDÄP khá»i bÃ i dáº¡y (Báº£o Ä‘áº£m tÃ­nh lÅ©y Ä‘áº³ng)
   */
  cleanGddpFromLesson: function(lesson) {
    if (!lesson) return lesson;
    var self = this;
    if (Array.isArray(lesson.yccd)) {
      var newYccd = [];
      lesson.yccd.forEach(function(item) {
        if (typeof item !== 'string') {
          newYccd.push(item);
          return;
        }
        var subLines = item.split(/\r?\n/).map(function(s) { return s.trim(); }).filter(Boolean);
        var filteredSub = subLines.filter(function(sub) {
          return !self.isGddpLine(sub);
        });
        var hasOtherIntegration = lesson.yccd.some(function(item) {
          if (typeof item !== 'string') return false;
          var lower = item.toLowerCase();
          return (lower.includes('tÃ­ch há»£p') || lower.includes('nÄƒng lá»±c sá»‘') || lower.includes('trÃ­ tuá»‡ nhÃ¢n táº¡o') || lower.includes('stem')) && !self.isGddpLine(item);
        });
        if (!hasOtherIntegration && filteredSub.length === 1 && /^\d+\.\s*(?:tÃ­ch\s*há»£p|ná»™i\s*dung\s*tÃ­ch\s*há»£p)[:.\s]*$/i.test(filteredSub[0])) {
          return;
        }
        if (filteredSub.length > 0) {
          newYccd.push(filteredSub.join('\n'));
        }
      });
      lesson.yccd = newYccd;
    }
    this.cleanGddpFromTables(lesson);
    return lesson;
  },

  /**
   * ChÃ¨n ná»™i dung GDÄP TrÃ  Vinh vÃ o YCCÄ bÃ i dáº¡y
   */
  injectGddpIntoLesson: function(lesson, gddpConfig) {
    if (!lesson) return lesson;
    if (!Array.isArray(lesson.yccd)) {
      lesson.yccd = lesson.yccd ? [lesson.yccd] : [];
    }

    // 1. LuÃ´n lÃ m sáº¡ch GDÄP cÅ© trÆ°á»›c (tÃ­nh lÅ©y Ä‘áº³ng)
    this.cleanGddpFromLesson(lesson);

    // KhÃ´ng tá»± Ä‘á»™ng chÃ¨n fallback GDÄP di tÃ­ch/sáº£n váº­t vÃ o mÃ´n Thá»ƒ dá»¥c (GDTC) khi khÃ´ng cÃ³ bÃ i phÃ¹ há»£p
    var sKey = (lesson.subjectKey || '').toLowerCase();
    if (sKey === 'gdtc') {
      return lesson;
    }

    // 2. Náº¿u khÃ´ng báº­t cáº¥u hÃ¬nh GDÄP -> dá»«ng láº¡i
    var cfg = this.resolveGddpSupport(gddpConfig);
    if (!cfg || !cfg.enabled) {
      return lesson;
    }

    // 3. TÃ¬m ná»™i dung GDÄP TrÃ  Vinh phÃ¹ há»£p tá»« GDDP_DATA
    var gddpItem = (typeof GDDP_DATA !== 'undefined' && GDDP_DATA.getTraVinhGddpForLesson)
      ? GDDP_DATA.getTraVinhGddpForLesson(lesson.grade, lesson.subjectKey, lesson.week, lesson.lessonTitle || lesson.title)
      : null;

    if (!gddpItem || !gddpItem.yccdText) return lesson;

    var gddpLine = gddpItem.yccdText.trim();
    if (!gddpLine.endsWith('.')) gddpLine += '.';

    // 4. ChÃ¨n vÃ o YCCD: Æ¯u tiÃªn dÆ°á»›i má»¥c 4. TÃ­ch há»£p hoáº·c 3. TÃ­ch há»£p
    var inserted = false;
    for (var i = 0; i < lesson.yccd.length; i++) {
      if (/^(?:4|3)\.\s*tÃ­ch\s*há»£p/i.test(lesson.yccd[i]) || /^\[tÃ­ch\s*há»£p\]/i.test(lesson.yccd[i])) {
        var insertPos = i + 1;
        while (insertPos < lesson.yccd.length && !/^[1-5]\.\s*/.test(lesson.yccd[insertPos])) {
          insertPos++;
        }
        lesson.yccd.splice(insertPos, 0, gddpLine);
        inserted = true;
        break;
      }
    }

    // Náº¿u chÆ°a cÃ³ "4. TÃ­ch há»£p", tÃ¬m vá»‹ trÃ­ trÆ°á»›c "5. Äiá»u chá»‰nh..."
    if (!inserted) {
      var disIdx = -1;
      for (var j = 0; j < lesson.yccd.length; j++) {
        if (/^5\.\s*Ä‘iá»u\s*chá»‰nh/i.test(lesson.yccd[j])) {
          disIdx = j;
          break;
        }
      }
      if (disIdx !== -1) {
        lesson.yccd.splice(disIdx, 0, '4. TÃ­ch há»£p:', gddpLine);
      } else {
        lesson.yccd.push('4. TÃ­ch há»£p:', gddpLine);
      }
    }

    return lesson;
  },

  /**
   * ChÃ¨n ná»™i dung hoáº¡t Ä‘á»™ng GDÄP TrÃ  Vinh vÃ o Báº£ng hoáº¡t Ä‘á»™ng Má»¥c III
   */
  injectGddpActivitiesIntoTables: function(lesson, gddpConfig) {
    if (!lesson) return lesson;
    if ((lesson.subjectKey || '').toLowerCase() === 'gdtc') {
      this.cleanGddpFromTables(lesson);
      return lesson;
    }
    var cfg = this.resolveGddpSupport(gddpConfig);
    if (!cfg || !cfg.enabled || cfg.scope === 'yccd_only') {
      this.cleanGddpFromTables(lesson);
      return lesson;
    }

    if (!Array.isArray(lesson.tables) || lesson.tables.length === 0) return lesson;

    this.cleanGddpFromTables(lesson);

    var gddpItem = (typeof GDDP_DATA !== 'undefined' && GDDP_DATA.getTraVinhGddpForLesson)
      ? GDDP_DATA.getTraVinhGddpForLesson(lesson.grade, lesson.subjectKey, lesson.week, lesson.lessonTitle || lesson.title)
      : null;

    if (!gddpItem) return lesson;

    var targetTable = lesson.tables[lesson.tables.length - 1];
    if (!Array.isArray(targetTable) || targetTable.length < 2) return lesson;

    var has4Cols = targetTable.some(function(row) { return Array.isArray(row) && row.length === 4; });
    var gvCell = '<p style="margin: 0pt; line-height: 1.15; font-family: \'Times New Roman\', serif; font-size: 13pt; color: #C00000; text-align: justify;"><span style="color: #C00000; font-weight: bold;">* TÃ­ch há»£p GiÃ¡o dá»¥c Ä‘á»‹a phÆ°Æ¡ng (TrÃ  Vinh):</span><br/><span style="color: #C00000;">' + gddpItem.teacherAct + '</span></p>';
    var hsCell = '<p style="margin: 0pt; line-height: 1.15; font-family: \'Times New Roman\', serif; font-size: 13pt; color: #C00000; text-align: justify;"><span style="color: #C00000; font-weight: bold;">* TÃ­ch há»£p GDÄP TrÃ  Vinh:</span><br/><span style="color: #C00000;">' + gddpItem.studentAct + '</span></p>';

    var gddpRow = has4Cols ? ['', '', gvCell, hsCell] : [gvCell, hsCell];
    gddpRow.isGddpRow = true;

    var insertPos = -1;
    for (var r = 0; r < targetTable.length; r++) {
      var rStr = (targetTable[r] || []).join(' ');
      if (/váº­n\s*dá»¥ng|cá»§ng\s*cá»‘|tráº£i\s*nghiá»‡m/i.test(rStr) && targetTable[r].length === 1) {
        insertPos = r;
        break;
      }
    }

    if (insertPos !== -1) {
      targetTable.splice(insertPos, 0, gddpRow);
    } else {
      targetTable.push(gddpRow);
    }

    return lesson;
  },

  /**
   * Ãp dá»¥ng hoáº·c lÃ m sáº¡ch GDÄP cho má»™t danh sÃ¡ch bÃ i há»c
   */
  applyGddpToLessons: function(lessons, gddpConfig) {
    if (!Array.isArray(lessons)) return lessons;
    var self = this;
    var cfg = this.resolveGddpSupport(gddpConfig);
    lessons.forEach(function(les) {
      if (cfg && cfg.enabled) {
        self.injectGddpIntoLesson(les, cfg);
        if (cfg.scope !== 'yccd_only') {
          self.injectGddpActivitiesIntoTables(les, cfg);
        } else {
          self.cleanGddpFromTables(les);
        }
      } else {
        self.cleanGddpFromLesson(les);
        self.cleanGddpFromTables(les);
      }
    });
    return lessons;
  },

  // =========================================================================
  // 5. GHÃ‰P TUáº¦N Tá»° TOÃ€N Bá»˜ KHBD TRONG TUáº¦N THEO THá»œI KHÃ“A BIá»‚U
  // =========================================================================

  isDoublePeriodLesson: function(title, period) {
    var rawTitle = (title || '').trim();
    var t = (rawTitle + ' ' + (period || '')).toLowerCase();

    // 1. Tiáº¿t Ä‘Ã´i thá»±c thá»¥ (Æ°u tiÃªn phÃ¡t hiá»‡n dáº£i tiáº¿t): "Tiáº¿t 1 - 2", "Tiáº¿t 1, 2", "Tiáº¿t 1-2", "2 tiáº¿t", "Thá»i lÆ°á»£ng: 2 tiáº¿t", "Tiáº¿t Ä‘Ã´i"
    if (/ti[eáº¿]t\s*\d+\s*[-â€“,]\s*\d+/i.test(t)) return true;
    if (/(?:th[oá»]i\s*l[uÆ°][oá»£]ng\s*:\s*2\s*ti[eáº¿]t|2\s*ti[eáº¿]t|ti[eáº¿]t\s*Ä‘[oÃ´]i)/i.test(t)) return true;

    // 2. Náº¿u Ä‘Ã£ cÃ³ háº­u tá»‘ tiáº¿t con cá»¥ thá»ƒ (- Tiáº¿t 1:, - Tiáº¿t 2:, (Tiáº¿t 1), (Tiáº¿t 2), (T1), (T2)) mÃ  khÃ´ng pháº£i dáº£i tiáº¿t -> Tiáº¿t Ä‘Æ¡n!
    if (/(?:-\s*ti[eáº¿]t\s*\d+|\(ti[eáº¿]t\s*\d+\)|\(t\d+\))/i.test(rawTitle)) {
      return false;
    }

    // 3. Náº¿u chá»‰ ghi "Sá»‘ tiáº¿t: 2" (thÆ°á»ng lÃ  tá»•ng sá»‘ tiáº¿t chá»§ Ä‘á» dáº¡y trong nhiá»u tuáº§n, VD Äáº¡o Ä‘á»©c) -> khÃ´ng pháº£i tiáº¿t Ä‘Ã´i cÃ¹ng tuáº§n
    if (/s[oá»‘]\s*ti[eáº¿]t\s*:\s*\d+/i.test(t) && !/th[oá»]i\s*l[uÆ°][oá»£]ng\s*:\s*2/i.test(t)) {
      return false;
    }

    return false;
  },

  unpackWeeklyLessons: function(rawLessons, sKey, weekNum, grade) {
    var units = [];
    var currentTopic = '';
    var validLessons = [];
    var self = this;

    (rawLessons || []).forEach(function(les, r_idx) {
      var rawTables = les.tables || [];
      var tables = rawTables.filter(function(tbl) {
        if (!tbl || !Array.isArray(tbl) || tbl.length === 0) return false;
        if (tbl.length === 1) {
          var r0 = tbl[0];
          if (!Array.isArray(r0) || r0.length <= 1) return false;
          var text = r0.join(' ').trim().toLowerCase();
          if (text.length < 100 && (text.includes('káº¿ hoáº¡ch bÃ i dáº¡y') || text.includes('mÃ´n') || text.includes('tuáº§n') || text.includes('chá»§ Ä‘á»'))) {
            return false;
          }
        }
        if (tbl.length === 2) {
          var allText = tbl.map(function(r) { return Array.isArray(r) ? r.join(' ') : ''; }).join(' ').trim().toLowerCase();
          if (allText.length < 120 && (allText.includes('káº¿ hoáº¡ch bÃ i dáº¡y') || allText.includes('giÃ¡o viÃªn') || allText.includes('trÆ°á»ng tiá»ƒu há»c'))) {
            return false;
          }
        }
        return true;
      });
      if (tables.length === 0 && rawTables.length > 0) tables = rawTables;

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
      lesCopy.tables = tables;
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
        // Multi-table lesson (e.g. HÄTN in Lá»›p 1, 2, 4 cÃ³ 3 báº£ng: SHDC, HÄGD theo chá»§ Ä‘á», Sinh hoáº¡t lá»›p)
        tables.forEach(function(tbl, t_idx) {
          var subLes = JSON.parse(JSON.stringify(les));
          subLes.tables = [tbl];
          subLes.subUnitIndex = t_idx + 1;

          if (sKey === 'hdtn' || sKey === 'shcn') {
            if (t_idx === 0) {
              subLes.lessonTitle = 'SINH HOáº T DÆ¯á»šI Cá»œ: ' + (title.toLowerCase().includes('khai giáº£ng') ? 'THAM GIA Lá»„ KHAI GIáº¢NG NÄ‚M Há»ŒC Má»šI' : (title.toLowerCase().includes('chÃ o cá»') ? title : 'CHá»¦ Äá»€ Äáº¦U TUáº¦N'));
              subLes.period = 'Tiáº¿t 1';
            } else if (t_idx === 1) {
              subLes.lessonTitle = 'HOáº T Äá»˜NG GIÃO Dá»¤C THEO CHá»¦ Äá»€' + (title ? (': ' + title.replace(/^Káº¾ HOáº CH BÃ€I Dáº Y MÃ”N HOáº T Äá»˜NG TRáº¢I NGHIá»†M\s*(?:Lá»šP\s*\d+)?/i, '').trim()) : '');
              subLes.period = 'Tiáº¿t 2';
            } else if (t_idx === 2) {
              subLes.lessonTitle = 'SINH HOáº T Lá»šP: SÆ  Káº¾T TUáº¦N & PHÆ¯Æ NG HÆ¯á»šNG TUáº¦N TIáº¾P THEO';
              subLes.period = 'Tiáº¿t 3';
            } else {
              subLes.lessonTitle = (title || 'BÃ€I Dáº Y') + ' (Tiáº¿t ' + (t_idx + 1) + ')';
              subLes.period = 'Tiáº¿t ' + (t_idx + 1);
            }
          } else {
            subLes.lessonTitle = (title || 'BÃ€I Dáº Y') + ' (Tiáº¿t ' + (t_idx + 1) + ')';
            subLes.period = 'Tiáº¿t ' + (t_idx + 1);
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
   * Xáº¿p toÃ n bá»™ bÃ i dáº¡y cÃ¡c mÃ´n trong tuáº§n theo Ä‘Ãºng thá»© tá»± Tiáº¿t & Thá»© cá»§a TKB
   * Há»— trá»£ chuáº©n xÃ¡c: Tiáº¿t Ä‘Ã´i liÃªn tá»¥c -> in 1 láº§n tÃ­nh 2 tiáº¿t; Tiáº¿t Ä‘Ã´i khÃ´ng liÃªn tá»¥c -> in 2 láº§n (Tiáº¿t 1, Tiáº¿t 2)
   */
  buildWeeklyPlanByTimetable: async function(grade, weekNumber, customTimetable, integratedMap, overwriteLegacy, options) {
    var g = parseInt(grade) || 5;
    var wNum = parseInt(weekNumber) || 1;
    var timetable = customTimetable || this.getDefaultTimetable(g);
    var shouldClean = (overwriteLegacy !== false);
    var opt = options || {};

    await this.ensureAllSubjectsLoadedForGrade(g);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);

    // 1. Thu tháº­p toÃ n bá»™ cÃ¡c Ã´ cÃ³ tiáº¿t há»c theo thá»© tá»± thá»i gian trong tuáº§n
    var allSlots = [];
    timetable.forEach(function(dayItem) {
      var dayName = dayItem.day || ('Thá»© ' + dayItem.dayNum);
      (dayItem.morning || []).forEach(function(sKey, mIdx) {
        var cleanKey = IntegrationService.normalizeSubjectKey(sKey || '');
        if (cleanKey && cleanKey !== '-' && cleanKey !== 'â€”') {
          allSlots.push({
            dayName: dayName,
            dayNum: dayItem.dayNum,
            session: 'SÃ¡ng',
            periodSlot: mIdx + 1,
            subjectKey: cleanKey
          });
        }
      });
      (dayItem.afternoon || []).forEach(function(sKey, aIdx) {
        var cleanKey = IntegrationService.normalizeSubjectKey(sKey || '');
        if (cleanKey && cleanKey !== '-' && cleanKey !== 'â€”') {
          allSlots.push({
            dayName: dayName,
            dayNum: dayItem.dayNum,
            session: 'Chiá»u',
            periodSlot: aIdx + 1,
            subjectKey: cleanKey
          });
        }
      });
    });

    // 2. Gom nhÃ³m cÃ¡c Ã´ theo tá»«ng mÃ´n há»c Ä‘á»ƒ náº¯m vá»‹ trÃ­ trÃªn TKB
    var subjectSlotMap = {};
    allSlots.forEach(function(slot, slotIndex) {
      if (!subjectSlotMap[slot.subjectKey]) subjectSlotMap[slot.subjectKey] = [];
      subjectSlotMap[slot.subjectKey].push({ slotIndex: slotIndex, slot: slot });
    });

    var slotToLessonMap = {};
    var skippedSlotIndices = {};

    // 3. Xá»­ lÃ½ tá»«ng mÃ´n há»c theo tiáº¿n trÃ¬nh chuáº©n vÃ  quy táº¯c Tiáº¿t Ä‘Ã´i
    for (var sKey in subjectSlotMap) {
      var sSlots = subjectSlotMap[sKey];

      var weekData = khbdDataObj ? khbdDataObj.getWeekPlan(g, sKey, wNum) : null;
      var rawLessons = (weekData && weekData.lessons) ? weekData.lessons : [];

      // Má»Ÿ rá»™ng bÃ i há»c theo tá»«ng Ä‘Æ¡n vá»‹ tiáº¿t chuáº©n
      var expandedLessonUnits = this.unpackWeeklyLessons(rawLessons, sKey, wNum, g);

      var unitIdx = 0;
      for (var i = 0; i < sSlots.length; i++) {
        if (skippedSlotIndices[sSlots[i].slotIndex]) continue;

        var curSlotEntry = sSlots[i];
        var nextSlotEntry = (i + 1 < sSlots.length) ? sSlots[i + 1] : null;

        var curUnit = expandedLessonUnits[unitIdx];
        var nextUnit = (unitIdx + 1 < expandedLessonUnits.length) ? expandedLessonUnits[unitIdx + 1] : null;

        // KIá»‚M TRA BÃ€I TIáº¾T ÄÃ”I
        if (curUnit && curUnit.isDouble && curUnit.part === 1 && nextUnit && nextUnit.isDouble && nextUnit.part === 2 && curUnit.rawIndex === nextUnit.rawIndex) {
          // Kiá»ƒm tra xem 2 slot TKB cÃ³ LIÃŠN Tá»¤C (cÃ¹ng ngÃ y, cÃ¹ng buá»•i, liá»n ká» sá»‘ tiáº¿t) khÃ´ng
          var isConsecutive = nextSlotEntry &&
                              (nextSlotEntry.slot.dayNum === curSlotEntry.slot.dayNum) &&
                              (nextSlotEntry.slot.session === curSlotEntry.slot.session) &&
                              (nextSlotEntry.slot.periodSlot === curSlotEntry.slot.periodSlot + 1);

          if (isConsecutive) {
            // QUY Táº®C: 2 TIáº¾T LIÃŠN Tá»¤C -> IN 1 Láº¦N TÃNH 2 TIáº¾T
            var baseLesson = curUnit.lesson;
            var matchInteg = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
            var lessonItem = matchInteg ? IntegrationService.injectIntegrationIntoLesson(baseLesson, matchInteg, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson) : JSON.parse(JSON.stringify(baseLesson)));

            lessonItem.dayName = curSlotEntry.slot.dayName;
            lessonItem.session = curSlotEntry.slot.session;
            lessonItem.periodSlot = curSlotEntry.slot.periodSlot + ' - ' + nextSlotEntry.slot.periodSlot;
            lessonItem.period = 'Tiáº¿t ' + curSlotEntry.slot.periodSlot + ' - ' + nextSlotEntry.slot.periodSlot + ' (Thá»i lÆ°á»£ng 2 tiáº¿t)';
            lessonItem.subjectKey = sKey;
            lessonItem.subjectName = IntegrationService.getSubjectDisplayName(sKey);
            lessonItem.week = wNum;
            lessonItem.grade = g;
            if (!lessonItem.title && lessonItem.lessonTitle) lessonItem.title = lessonItem.lessonTitle;
            if (!lessonItem.lessonTitle && lessonItem.title) lessonItem.lessonTitle = lessonItem.title;

            slotToLessonMap[curSlotEntry.slotIndex] = lessonItem;
            skippedSlotIndices[nextSlotEntry.slotIndex] = true;
            unitIdx += 2;
            continue;
          } else {
            // QUY Táº®C: 2 TIáº¾T KHÃ”NG LIÃŠN Tá»¤C -> IN Láº¦N 1 (TIáº¾T 1)
            var baseLesson1 = curUnit.lesson;
            var matchInteg1 = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
            var lessonItem1 = matchInteg1 ? IntegrationService.injectIntegrationIntoLesson(baseLesson1, matchInteg1, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson1) : JSON.parse(JSON.stringify(baseLesson1)));

            lessonItem1.dayName = curSlotEntry.slot.dayName;
            lessonItem1.session = curSlotEntry.slot.session;
            lessonItem1.periodSlot = curSlotEntry.slot.periodSlot;
            lessonItem1.period = 'Tiáº¿t ' + curSlotEntry.slot.periodSlot + ' (Tiáº¿t 1)';
            var rawTitle1 = (baseLesson1.lessonTitle || baseLesson1.title || '');
            if (/ti[eáº¿]t\s*1\s*[-â€“,]\s*2/i.test(rawTitle1)) {
              lessonItem1.lessonTitle = rawTitle1.replace(/ti[eáº¿]t\s*1\s*[-â€“,]\s*2/i, 'TIáº¾T 1');
            } else {
              lessonItem1.lessonTitle = rawTitle1 + ' (Tiáº¿t 1)';
            }
            lessonItem1.title = lessonItem1.lessonTitle;
            lessonItem1.subjectKey = sKey;
            lessonItem1.subjectName = IntegrationService.getSubjectDisplayName(sKey);
            lessonItem1.week = wNum;
            lessonItem1.grade = g;

            slotToLessonMap[curSlotEntry.slotIndex] = lessonItem1;
            unitIdx += 1;
            continue;
          }
        } else if (curUnit && curUnit.isDouble && curUnit.part === 2) {
          // QUY Táº®C: 2 TIáº¾T KHÃ”NG LIÃŠN Tá»¤C -> IN Láº¦N 2 (TIáº¾T 2)
          var baseLesson2 = curUnit.lesson;
          var matchInteg2 = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
          var lessonItem2 = matchInteg2 ? IntegrationService.injectIntegrationIntoLesson(baseLesson2, matchInteg2, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson2) : JSON.parse(JSON.stringify(baseLesson2)));

          lessonItem2.dayName = curSlotEntry.slot.dayName;
          lessonItem2.session = curSlotEntry.slot.session;
          lessonItem2.periodSlot = curSlotEntry.slot.periodSlot;
          lessonItem2.period = 'Tiáº¿t ' + curSlotEntry.slot.periodSlot + ' (Tiáº¿t 2)';
          var rawTitle2 = (baseLesson2.lessonTitle || baseLesson2.title || '');
          if (/ti[eáº¿]t\s*1\s*[-â€“,]\s*2/i.test(rawTitle2)) {
            lessonItem2.lessonTitle = rawTitle2.replace(/ti[eáº¿]t\s*1\s*[-â€“,]\s*2/i, 'TIáº¾T 2');
          } else {
            lessonItem2.lessonTitle = rawTitle2 + ' (Tiáº¿t 2)';
          }
          lessonItem2.title = lessonItem2.lessonTitle;
          lessonItem2.subjectKey = sKey;
          lessonItem2.subjectName = IntegrationService.getSubjectDisplayName(sKey);
          lessonItem2.week = wNum;
          lessonItem2.grade = g;

          slotToLessonMap[curSlotEntry.slotIndex] = lessonItem2;
          unitIdx += 1;
          continue;
        }

        // BÃ i há»c thÃ´ng thÆ°á»ng (1 tiáº¿t)
        var singleLesson = null;
        if (curUnit && curUnit.lesson) {
          var baseLessonS = curUnit.lesson;
          var matchIntegS = integratedMap ? integratedMap[sKey + '_' + wNum + '_' + curUnit.rawIndex] : null;
          singleLesson = matchIntegS ? IntegrationService.injectIntegrationIntoLesson(baseLessonS, matchIntegS, shouldClean) : (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLessonS) : JSON.parse(JSON.stringify(baseLessonS)));
        } else {
          var dispName = IntegrationService.getSubjectDisplayName(sKey);
          singleLesson = {
            title: dispName + ' - Luyá»‡n táº­p / Váº­n dá»¥ng (Tiáº¿t ' + (unitIdx + 1) + ')',
            lessonTitle: dispName + ' - Luyá»‡n táº­p / Váº­n dá»¥ng (Tiáº¿t ' + (unitIdx + 1) + ')',
            period: 'Tiáº¿t ' + curSlotEntry.slot.periodSlot,
            yccd: [
              '1. NÄƒng lá»±c Ä‘áº·c thÃ¹: Ã”n táº­p, cá»§ng cá»‘ vÃ  phÃ¡t triá»ƒn nÄƒng lá»±c mÃ´n ' + dispName + ' theo yÃªu cáº§u cáº§n Ä‘áº¡t cá»§a chÆ°Æ¡ng trÃ¬nh.',
              '2. NÄƒng lá»±c chung: Tá»± chá»§ vÃ  tá»± há»c; Giao tiáº¿p vÃ  há»£p tÃ¡c trong cÃ¡c hoáº¡t Ä‘á»™ng há»c táº­p.',
              '3. Pháº©m cháº¥t: ChÄƒm chá»‰, trÃ¡ch nhiá»‡m, tÃ­ch cá»±c hoÃ n thÃ nh nhiá»‡m vá»¥.'
            ],
            dodung: [
              '1. GiÃ¡o viÃªn: SGK, mÃ¡y tÃ­nh, ti vi / bÃ i giáº£ng Ä‘iá»‡n tá»­, phiáº¿u há»c táº­p rÃ¨n luyá»‡n.',
              '2. Há»c sinh: SGK, vá»Ÿ bÃ i táº­p, báº£ng con, Ä‘á»“ dÃ¹ng há»c táº­p cÃ¡ nhÃ¢n.'
            ],
            tables: [[
              ['* Khá»Ÿi Ä‘á»™ng (3 - 5 phÃºt): Táº¡o tÃ¢m tháº¿ hÃ o há»©ng vÃ  káº¿t ná»‘i kiáº¿n thá»©c bÃ i há»c.'],
              ['GV tá»• chá»©c trÃ² chÆ¡i káº¿t ná»‘i, khÆ¡i gá»£i ná»™i dung bÃ i há»c.', 'HS tham gia trÃ² chÆ¡i sÃ´i ná»•i, hÃ o há»©ng vÃ o bÃ i.'],
              ['* Luyá»‡n táº­p, thá»±c hÃ nh (20 - 25 phÃºt): Cá»§ng cá»‘ kiáº¿n thá»©c vÃ  rÃ¨n luyá»‡n kÄ© nÄƒng.'],
              ['GV giao nhiá»‡m vá»¥ bÃ i táº­p phÃ¹ há»£p Ä‘á»‘i tÆ°á»£ng HS, hÆ°á»›ng dáº«n vÃ  há»— trá»£ ká»‹p thá»i.', 'HS lÃ m bÃ i cÃ¡ nhÃ¢n/nhÃ³m Ä‘Ã´i, tá»± tin trÃ¬nh bÃ y vÃ  Ä‘á»•i vá»Ÿ kiá»ƒm tra chÃ©o.'],
              ['* Váº­n dá»¥ng (3 - 5 phÃºt): Ghi nhá»› vÃ  váº­n dá»¥ng vÃ o thá»±c táº¿.'],
              ['GV nháº­n xÃ©t, tuyÃªn dÆ°Æ¡ng vÃ  dáº·n dÃ² HS thá»±c hÃ nh váº­n dá»¥ng sau tiáº¿t há»c.', 'HS láº¯ng nghe, ghi nhá»› vÃ  thá»±c hiá»‡n theo hÆ°á»›ng dáº«n.']
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
        if (!singleLesson.title && singleLesson.lessonTitle) singleLesson.title = singleLesson.lessonTitle;
        if (!singleLesson.lessonTitle && singleLesson.title) singleLesson.lessonTitle = singleLesson.title;

        slotToLessonMap[curSlotEntry.slotIndex] = singleLesson;
        unitIdx += 1;
      }
    }

    // 4. Láº¯p rÃ¡p láº¡i toÃ n bá»™ bÃ i dáº¡y theo Ä‘Ãºng thá»© tá»± thá»i gian trÃªn TKB
    var weeklyOrderedLessons = [];
    var globalPeriodCounter = 1;

    var disSupport = IntegrationService.resolveDisabilitySupport(opt && opt.disabilitySupport);

    allSlots.forEach(function(slot, slotIndex) {
      if (skippedSlotIndices[slotIndex]) return;
      var lessonItem = slotToLessonMap[slotIndex];
      if (lessonItem) {
        lessonItem.globalPeriod = globalPeriodCounter++;
        weeklyOrderedLessons.push(lessonItem);
      }
    });

    if (disSupport && disSupport.enabled) {
      await IntegrationService.adaptLessonsDisabilityWithGemini(weeklyOrderedLessons, disSupport);
    }

    var gddpSupport = IntegrationService.resolveGddpSupport(opt && opt.gddpSupport);
    IntegrationService.applyGddpToLessons(weeklyOrderedLessons, gddpSupport);

    return {
      week: wNum,
      grade: g,
      timetable: timetable,
      lessons: weeklyOrderedLessons,
      totalSlots: weeklyOrderedLessons.length,
      metadata: opt
    };
  },

  /**
   * TrÃ­ch xuáº¥t Khá»‘i lá»›p (1..5) tá»« tÃªn lá»›p há»c linh hoáº¡t
   * VD: "3A" -> 3, "Lá»›p 4B" -> 4, "5/2" -> 5, "Khá»‘i 2" -> 2, "1A2" -> 1
   */
  parseClassGrade: function(className) {
    if (!className || typeof className !== 'string') return 1;
    var str = className.trim();
    var m = str.match(/(?:kh[á»‘o]i|l[á»›o]p|k)?\s*([1-5])/i);
    if (m && m[1]) {
      var g = parseInt(m[1], 10);
      if (g >= 1 && g <= 5) return g;
    }
    return 1;
  },

  /**
   * Chuáº©n hÃ³a dá»¯ liá»‡u 1 Ã´ thá»i khÃ³a biá»ƒu GVBM
   * Há»— trá»£ dáº¡ng chuá»—i ("4A", "4A:am_nhac") hoáº·c object ({ className: "4A", subjectKey: "am_nhac" })
   */
  normalizeGvbmSlot: function(slotRaw, defaultSubjectKey) {
    if (!slotRaw) return null;
    if (typeof slotRaw === 'string') {
      var str = slotRaw.trim();
      if (!str || str === '-' || str === 'â€”') return null;
      if (str.includes(':')) {
        var parts = str.split(':');
        return { className: parts[0].trim(), subjectKey: this.normalizeSubjectKey(parts[1].trim()) };
      }
      return { className: str, subjectKey: this.normalizeSubjectKey(defaultSubjectKey || 'am_nhac') };
    }
    if (typeof slotRaw === 'object' && slotRaw.className) {
      var cStr = slotRaw.className.trim();
      if (!cStr || cStr === '-' || cStr === 'â€”') return null;
      return {
        className: cStr,
        subjectKey: this.normalizeSubjectKey(slotRaw.subjectKey || defaultSubjectKey || 'am_nhac')
      };
    }
    return null;
  },

  /**
   * Thá»i khÃ³a biá»ƒu máº«u máº·c Ä‘á»‹nh dÃ nh cho GiÃ¡o viÃªn Bá»™ mÃ´n (18 tiáº¿t/tuáº§n, tráº£i Ä‘á»u Khá»‘i 1 - 5)
   */
  getDefaultTeacherSchedule: function(primarySubjectKey) {
    var sKey = primarySubjectKey || 'am_nhac';
    return [
      { dayNum: 2, day: 'Thá»© Hai', morning: ['4A', '4B', '3A', '3B'], afternoon: ['1A', '1B', ''] },
      { dayNum: 3, day: 'Thá»© Ba',  morning: ['5A', '5B', '2A', '2B'], afternoon: ['1C', '2C', ''] },
      { dayNum: 4, day: 'Thá»© TÆ°',  morning: ['3C', '4C', '5C', ''],   afternoon: ['', '', ''] },
      { dayNum: 5, day: 'Thá»© NÄƒm', morning: ['1A', '2A', '3A', '4A'], afternoon: ['5A', '', ''] },
      { dayNum: 6, day: 'Thá»© SÃ¡u', morning: ['1B', '2B', '3B', '4B'], afternoon: ['5B', '', ''] }
    ];
  },

  /**
   * Thá»i khÃ³a biá»ƒu máº«u Ä‘a mÃ´n Ä‘a khá»‘i dÃ nh cho GiÃ¡o viÃªn Dáº¡y Nhiá»u MÃ´n, Nhiá»u Lá»›p (22 tiáº¿t/tuáº§n, tráº£i Ä‘á»u Khá»‘i 1 - 5)
   * PhÃ¢n bá»• thá»±c táº¿ cÃ¡c mÃ´n chuyÃªn biá»‡t: Ã‚m nháº¡c, CÃ´ng nghá»‡, GDTC, MÄ© thuáº­t...
   */
  getDefaultMultiTeacherSchedule: function() {
    return [
      {
        dayNum: 2, day: 'Thá»© Hai',
        morning: [
          { className: '4A', subjectKey: 'am_nhac' },
          { className: '4B', subjectKey: 'am_nhac' },
          { className: '3A', subjectKey: 'cong_nghe' },
          { className: '3B', subjectKey: 'cong_nghe' }
        ],
        afternoon: [
          { className: '1A', subjectKey: 'gdtc' },
          { className: '1B', subjectKey: 'gdtc' },
          ''
        ]
      },
      {
        dayNum: 3, day: 'Thá»© Ba',
        morning: [
          { className: '5A', subjectKey: 'cong_nghe' },
          { className: '5B', subjectKey: 'cong_nghe' },
          { className: '2A', subjectKey: 'am_nhac' },
          { className: '2B', subjectKey: 'am_nhac' }
        ],
        afternoon: [
          { className: '4A', subjectKey: 'gdtc' },
          { className: '4B', subjectKey: 'gdtc' },
          ''
        ]
      },
      {
        dayNum: 4, day: 'Thá»© TÆ°',
        morning: [
          { className: '3A', subjectKey: 'am_nhac' },
          { className: '4A', subjectKey: 'cong_nghe' },
          { className: '5A', subjectKey: 'am_nhac' },
          ''
        ],
        afternoon: [
          { className: '2A', subjectKey: 'gdtc' },
          { className: '2B', subjectKey: 'gdtc' },
          ''
        ]
      },
      {
        dayNum: 5, day: 'Thá»© NÄƒm',
        morning: [
          { className: '1A', subjectKey: 'am_nhac' },
          { className: '2A', subjectKey: 'dao_duc' },
          { className: '3B', subjectKey: 'am_nhac' },
          { className: '5B', subjectKey: 'am_nhac' }
        ],
        afternoon: [
          { className: '5A', subjectKey: 'gdtc' },
          '',
          ''
        ]
      },
      {
        dayNum: 6, day: 'Thá»© SÃ¡u',
        morning: [
          { className: '1B', subjectKey: 'am_nhac' },
          { className: '2B', subjectKey: 'dao_duc' },
          { className: '4B', subjectKey: 'am_nhac' },
          { className: '5B', subjectKey: 'dao_duc' }
        ],
        afternoon: [
          { className: '3A', subjectKey: 'gdtc' },
          '',
          ''
        ]
      }
    ];
  },

  /**
   * XÃ¢y dá»±ng Káº¿ hoáº¡ch bÃ i dáº¡y tuáº§n cho GIÃO VIÃŠN Bá»˜ MÃ”N theo Báº£ng PhÃ¢n cÃ´ng Giáº£ng dáº¡y
   * NguyÃªn táº¯c nghiá»‡p vá»¥ chuáº©n: 1 MÃ´n dáº¡y nhiá»u lá»›p cÃ¹ng khá»‘i -> Chá»‰ xuáº¥t 1 KHBD chuáº©n (kÃ¨m danh sÃ¡ch cÃ¡c lá»›p phá»¥ trÃ¡ch)
   */
  buildWeeklyPlanByAssignments: async function(assignments, weekNumber, integratedMap, overwriteLegacy, meta) {
    var rawList = Array.isArray(assignments) && assignments.length > 0 ? assignments : [
      { id: 1, grade: 4, subjectKey: 'am_nhac', classes: '4A, 4B, 4C, 4D', periodsPerWeek: 4 },
      { id: 2, grade: 5, subjectKey: 'am_nhac', classes: '5A, 5B, 5C', periodsPerWeek: 3 },
      { id: 3, grade: 3, subjectKey: 'cong_nghe', classes: '3A, 3B, 3C', periodsPerWeek: 3 },
      { id: 4, grade: 2, subjectKey: 'gdtc', classes: '2A, 2B', periodsPerWeek: 4 }
    ];
    var wNum = parseInt(weekNumber) || 1;
    var shouldClean = (overwriteLegacy !== false);
    var metadata = meta || {};

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);

    // 1. Táº£i toÃ n bá»™ dá»¯ liá»‡u KHBD cá»§a cÃ¡c cáº·p (grade, subjectKey)
    for (var i = 0; i < rawList.length; i++) {
      var it = rawList[i];
      if (it && it.grade && it.subjectKey) {
        await this.ensureSubjectLoaded(it.grade, it.subjectKey);
      }
    }

    // 2. Vá»›i má»—i phÃ¢n cÃ´ng, láº¥y Ä‘Ãºng bÃ i dáº¡y trong tuáº§n (khÃ´ng trÃ¹ng láº·p)
    var weeklyOrderedLessons = [];
    var totalAssignedPeriods = 0;

    for (var i = 0; i < rawList.length; i++) {
      var item = rawList[i];
      if (!item || !item.grade || !item.subjectKey) continue;

      var grade = parseInt(item.grade) || 5;
      var subjectKey = this.normalizeSubjectKey(item.subjectKey);
      var classesStr = Array.isArray(item.classes) ? item.classes.join(', ') : (item.classes ? String(item.classes).trim() : '');
      var periods = parseInt(item.periodsPerWeek || item.periods) || 1;
      totalAssignedPeriods += periods;

      var dispSubj = IntegrationService.getSubjectDisplayName(subjectKey);
      var weekData = khbdDataObj ? khbdDataObj.getWeekPlan(grade, subjectKey, wNum) : null;
      var rawLessons = (weekData && weekData.lessons) ? weekData.lessons : [];
      var units = this.unpackWeeklyLessons(rawLessons, subjectKey, wNum, grade);

      if (units && units.length > 0) {
        // Äá»‘i vá»›i mÃ´n cÃ³ 1 bÃ i hoáº·c nhiá»u tiáº¿t trong tuáº§n (VD GDTC cÃ³ 2 tiáº¿t/tuáº§n)
        for (var uIdx = 0; uIdx < units.length; uIdx++) {
          var unit = units[uIdx];
          var baseLesson = unit.lesson;

          var matchInteg = null;
          if (integratedMap) {
            matchInteg = integratedMap[grade + '_' + subjectKey + '_' + wNum + '_' + (unit.rawIndex || 0)] ||
                         integratedMap[subjectKey + '_' + wNum + '_' + (unit.rawIndex || 0)];
          }

          var lessonItem = matchInteg ? 
            IntegrationService.injectIntegrationIntoLesson(baseLesson, matchInteg, shouldClean) : 
            (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson) : JSON.parse(JSON.stringify(baseLesson)));

          lessonItem.grade = grade;
          lessonItem.subjectKey = subjectKey;
          lessonItem.subjectName = dispSubj;
          lessonItem.classes = classesStr;
          lessonItem.className = classesStr ? ('Lá»›p ' + classesStr) : ('Khá»‘i ' + grade);
          lessonItem.week = wNum;
          lessonItem.periodsPerWeek = periods;
          var rawT = baseLesson.lessonTitle || baseLesson.title || dispSubj;
          lessonItem.lessonTitle = IntegrationService.cleanLessonTitle(rawT, baseLesson, dispSubj);

          if (units.length > 1) {
            lessonItem.period = 'Tiáº¿t ' + (uIdx + 1) + (unit.isDouble ? (' (Pháº§n ' + unit.part + ')') : '');
          } else {
            lessonItem.period = 'Tiáº¿t theo TKB (' + periods + ' tiáº¿t/tuáº§n)';
          }

          weeklyOrderedLessons.push(lessonItem);
        }
      } else {
        // Fallback táº¡o bÃ i dáº¡y chuáº©n CV 2345
        var fallbackTitle = dispSubj + ' - Khá»‘i ' + grade + (classesStr ? (' (Lá»›p ' + classesStr + ')') : '') + ' (Tuáº§n ' + wNum + ')';
        var fallbackLesson = {
          grade: grade,
          subjectKey: subjectKey,
          subjectName: dispSubj,
          classes: classesStr,
          className: classesStr ? ('Lá»›p ' + classesStr) : ('Khá»‘i ' + grade),
          week: wNum,
          periodsPerWeek: periods,
          period: 'Tiáº¿t theo TKB (' + periods + ' tiáº¿t/tuáº§n)',
          title: fallbackTitle,
          lessonTitle: fallbackTitle,
          yccd: [
            '1. NÄƒng lá»±c Ä‘áº·c thÃ¹: HÃ¬nh thÃ nh, rÃ¨n luyá»‡n vÃ  phÃ¡t triá»ƒn cÃ¡c kÄ© nÄƒng, pháº©m cháº¥t mÃ´n ' + dispSubj + ' Khá»‘i ' + grade + ' cho há»c sinh ' + (classesStr ? ('cÃ¡c lá»›p ' + classesStr) : '') + ' theo yÃªu cáº§u cáº§n Ä‘áº¡t ChÆ°Æ¡ng trÃ¬nh GDPT 2018.',
            '2. NÄƒng lá»±c chung: Tá»± chá»§ vÃ  tá»± há»c; Tá»± tin trao Ä‘á»•i, há»£p tÃ¡c nhÃ³m; Giáº£i quyáº¿t váº¥n Ä‘á» vÃ  sÃ¡ng táº¡o.',
            '3. Pháº©m cháº¥t: ChÄƒm chá»‰, trung thá»±c, trÃ¡ch nhiá»‡m vÃ  cÃ³ Ã½ thá»©c rÃ¨n luyá»‡n mÃ´n há»c.'
          ],
          dodung: [
            '1. GiÃ¡o viÃªn: Káº¿ hoáº¡ch bÃ i dáº¡y, SGK ' + dispSubj + ' Khá»‘i ' + grade + ', bÃ i giáº£ng Ä‘iá»‡n tá»­, thiáº¿t bá»‹/Ä‘á»“ dÃ¹ng dáº¡y há»c phÃ¹ há»£p.',
            '2. Há»c sinh: SGK, vá»Ÿ bÃ i táº­p, Ä‘á»“ dÃ¹ng há»c táº­p mÃ´n ' + dispSubj + '.'
          ],
          tables: [[
            ['* Khá»Ÿi Ä‘á»™ng (3 - 5 phÃºt): Táº¡o há»©ng thÃº há»c táº­p, liÃªn há»‡ thá»±c táº¿ hoáº·c káº¿t ná»‘i kiáº¿n thá»©c bÃ i há»c.'],
            ['GV tá»• chá»©c hoáº¡t Ä‘á»™ng/trÃ² chÆ¡i táº¡o tÃ¢m tháº¿ hÃ o há»©ng cho há»c sinh.', 'HS chá»§ Ä‘á»™ng tham gia nhiá»‡t tÃ¬nh, táº¡o tÃ¢m tháº¿ sáºµn sÃ ng vÃ o bÃ i má»›i.'],
            ['* KhÃ¡m phÃ¡ / Luyá»‡n táº­p (22 - 25 phÃºt): Thá»±c hiá»‡n cÃ¡c hoáº¡t Ä‘á»™ng hÃ¬nh thÃ nh kiáº¿n thá»©c vÃ  rÃ¨n luyá»‡n kÄ© nÄƒng.'],
            ['GV hÆ°á»›ng dáº«n máº«u, tá»• chá»©c cÃ¡c hoáº¡t Ä‘á»™ng nhÃ³m/cÃ¡ nhÃ¢n, quan sÃ¡t vÃ  há»— trá»£ HS thá»±c hÃ nh.', 'HS tÃ­ch cá»±c thá»±c hÃ nh, trao Ä‘á»•i tháº£o luáº­n, chia sáº» káº¿t quáº£ vÃ  há»— trá»£ báº¡n cÃ¹ng tiáº¿n bá»™.'],
            ['* Váº­n dá»¥ng (3 - 5 phÃºt): Cá»§ng cá»‘, liÃªn há»‡ thá»±c tiá»…n vÃ  Ä‘á»‹nh hÆ°á»›ng rÃ¨n luyá»‡n.'],
            ['GV nháº­n xÃ©t tiáº¿t há»c, biá»ƒu dÆ°Æ¡ng cÃ¡c cÃ¡ nhÃ¢n/nhÃ³m tÃ­ch cá»±c, hÆ°á»›ng dáº«n ná»™i dung cáº§n rÃ¨n luyá»‡n thÃªm.', 'HS láº¯ng nghe, ghi nhá»› vÃ  váº­n dá»¥ng kiáº¿n thá»©c, kÄ© nÄƒng Ä‘Ã£ há»c vÃ o thá»±c táº¿ cuá»™c sá»‘ng.']
          ]]
        };
        weeklyOrderedLessons.push(fallbackLesson);
      }
    }

    var disSupport = IntegrationService.resolveDisabilitySupport(metadata && metadata.disabilitySupport);
    if (disSupport && disSupport.enabled) {
      await IntegrationService.adaptLessonsDisabilityWithGemini(weeklyOrderedLessons, disSupport);
    }

    var gddpSupport = IntegrationService.resolveGddpSupport(metadata && metadata.gddpSupport);
    IntegrationService.applyGddpToLessons(weeklyOrderedLessons, gddpSupport);

    return {
      role: 'gvbm',
      isAssignmentMode: true,
      week: wNum,
      assignments: rawList,
      totalPeriods: totalAssignedPeriods,
      lessonsCount: weeklyOrderedLessons.length,
      lessons: weeklyOrderedLessons,
      metadata: metadata
    };
  },

  /**
   * Xáº¿p toÃ n bá»™ bÃ i dáº¡y trong tuáº§n cho GIÃO VIÃŠN Bá»˜ MÃ”N (Äa khá»‘i / Äa mÃ´n) theo Lá»‹ch lÃªn lá»›p
   */
  buildWeeklyPlanByTeacherSchedule: async function(gvbmConfig, weekNumber, integratedMap, overwriteLegacy) {
    var cfg = gvbmConfig || {};
    var wNum = parseInt(weekNumber) || 1;
    var schedule = (cfg.schedule && Array.isArray(cfg.schedule) && cfg.schedule.length > 0) ? 
                   cfg.schedule : 
                   (cfg.isMultiSubject ? this.getDefaultMultiTeacherSchedule() : this.getDefaultTeacherSchedule(cfg.subjectKey));
    var primarySubject = cfg.subjectKey || 'am_nhac';
    var shouldClean = (overwriteLegacy !== false);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);

    // 1. QuÃ©t toÃ n bá»™ cÃ¡c tiáº¿t dáº¡y trong tuáº§n
    var allSlots = [];
    schedule.forEach(function(dayItem) {
      var dayName = dayItem.day || ('Thá»© ' + dayItem.dayNum);
      (dayItem.morning || []).forEach(function(sRaw, mIdx) {
        var norm = IntegrationService.normalizeGvbmSlot(sRaw, primarySubject);
        if (norm && norm.className) {
          var grade = IntegrationService.parseClassGrade(norm.className);
          allSlots.push({
            dayName: dayName,
            dayNum: dayItem.dayNum,
            session: 'SÃ¡ng',
            periodSlot: mIdx + 1,
            className: norm.className,
            subjectKey: norm.subjectKey,
            grade: grade
          });
        }
      });
      (dayItem.afternoon || []).forEach(function(sRaw, aIdx) {
        var norm = IntegrationService.normalizeGvbmSlot(sRaw, primarySubject);
        if (norm && norm.className) {
          var grade = IntegrationService.parseClassGrade(norm.className);
          allSlots.push({
            dayName: dayName,
            dayNum: dayItem.dayNum,
            session: 'Chiá»u',
            periodSlot: aIdx + 1,
            className: norm.className,
            subjectKey: norm.subjectKey,
            grade: grade
          });
        }
      });
    });

    // 2. TÃ¬m táº¥t cáº£ cÃ¡c cáº·p (grade, subjectKey) duy nháº¥t vÃ  táº£i dá»¯ liá»‡u KHBD tÆ°Æ¡ng á»©ng
    var uniquePairs = {};
    allSlots.forEach(function(slot) {
      var key = slot.grade + '_' + slot.subjectKey;
      uniquePairs[key] = { grade: slot.grade, subjectKey: slot.subjectKey };
    });

    var unitsCache = {};
    for (var pKey in uniquePairs) {
      var pair = uniquePairs[pKey];
      await this.ensureSubjectLoaded(pair.grade, pair.subjectKey);
      var weekData = khbdDataObj ? khbdDataObj.getWeekPlan(pair.grade, pair.subjectKey, wNum) : null;
      var rawLessons = (weekData && weekData.lessons) ? weekData.lessons : [];
      unitsCache[pKey] = this.unpackWeeklyLessons(rawLessons, pair.subjectKey, wNum, pair.grade);
    }

    // 3. PhÃ¢n bá»• bÃ i há»c cho tá»«ng tiáº¿t theo tiáº¿n Ä‘á»™ cá»§a tá»«ng lá»›p trong tuáº§n
    var classPeriodCounter = {};
    var weeklyOrderedLessons = [];
    var globalPeriodCounter = 1;

    for (var i = 0; i < allSlots.length; i++) {
      var slot = allSlots[i];
      var cacheKey = slot.grade + '_' + slot.subjectKey;
      var availableUnits = unitsCache[cacheKey] || [];

      var classKey = slot.grade + '_' + slot.className.toUpperCase().replace(/\s+/g, '') + '_' + slot.subjectKey;
      var curClassUnitIdx = classPeriodCounter[classKey] || 0;
      classPeriodCounter[classKey] = curClassUnitIdx + 1;

      var unit = (availableUnits.length > 0) ? 
                 (availableUnits[curClassUnitIdx] || availableUnits[curClassUnitIdx % availableUnits.length]) : null;

      var lessonItem = null;
      var dispSubj = IntegrationService.getSubjectDisplayName(slot.subjectKey);

      if (unit && unit.lesson) {
        var baseLesson = unit.lesson;
        // Kiá»ƒm tra tÃ­ch há»£p náº¿u cÃ³
        var matchInteg = null;
        if (integratedMap) {
          matchInteg = integratedMap[slot.grade + '_' + slot.subjectKey + '_' + wNum + '_' + (unit.rawIndex || 0)] ||
                       integratedMap[slot.subjectKey + '_' + wNum + '_' + (unit.rawIndex || 0)];
        }
        lessonItem = matchInteg ? 
          IntegrationService.injectIntegrationIntoLesson(baseLesson, matchInteg, shouldClean) : 
          (shouldClean ? IntegrationService.cleanLegacyIntegrationFromLesson(baseLesson) : JSON.parse(JSON.stringify(baseLesson)));

        lessonItem.lessonTitle = baseLesson.lessonTitle || baseLesson.title || dispSubj;
        if (unit.isDouble) {
          lessonItem.period = 'Tiáº¿t ' + slot.periodSlot + ' (Tiáº¿t ' + unit.part + ')';
        } else {
          lessonItem.period = 'Tiáº¿t ' + slot.periodSlot;
        }
      } else {
        // Fallback bÃ i dáº¡y chuáº©n má»±c CV 2345
        var clsNameClean = slot.className.toLowerCase().includes('lá»›p') ? slot.className : ('Lá»›p ' + slot.className);
        lessonItem = {
          title: dispSubj + ' - ' + clsNameClean + ' (Tuáº§n ' + wNum + ')',
          lessonTitle: dispSubj + ' - ' + clsNameClean + ' (Tuáº§n ' + wNum + ')',
          period: 'Tiáº¿t ' + slot.periodSlot,
          yccd: [
            '1. NÄƒng lá»±c Ä‘áº·c thÃ¹: HÃ¬nh thÃ nh, rÃ¨n luyá»‡n vÃ  phÃ¡t triá»ƒn cÃ¡c nÄƒng lá»±c mÃ´n ' + dispSubj + ' cho há»c sinh ' + clsNameClean + ' theo yÃªu cáº§u cáº§n Ä‘áº¡t cá»§a ChÆ°Æ¡ng trÃ¬nh GDPT 2018.',
            '2. NÄƒng lá»±c chung: Tá»± chá»§ vÃ  tá»± há»c; Tá»± tin trao Ä‘á»•i, há»£p tÃ¡c nhÃ³m; Giáº£i quyáº¿t váº¥n Ä‘á» sÃ¡ng táº¡o.',
            '3. Pháº©m cháº¥t: ChÄƒm chá»‰ rÃ¨n luyá»‡n, trung thá»±c, cÃ³ tinh tháº§n trÃ¡ch nhiá»‡m vÃ  yÃªu thÃ­ch mÃ´n há»c.'
          ],
          dodung: [
            '1. GiÃ¡o viÃªn: SGK ' + dispSubj + ' Khá»‘i ' + slot.grade + ', thiáº¿t bá»‹ dáº¡y há»c sá»‘, bÃ i giáº£ng Ä‘iá»‡n tá»­, Ä‘á»“ dÃ¹ng trá»±c quan phÃ¹ há»£p bÃ i dáº¡y.',
            '2. Há»c sinh: SGK, vá»Ÿ bÃ i táº­p, Ä‘á»“ dÃ¹ng há»c táº­p mÃ´n ' + dispSubj + '.'
          ],
          tables: [[
            ['* Khá»Ÿi Ä‘á»™ng (3 - 5 phÃºt): Táº¡o há»©ng thÃº, liÃªn há»‡ thá»±c táº¿ hoáº·c káº¿t ná»‘i kiáº¿n thá»©c bÃ i há»c.'],
            ['GV tá»• chá»©c trÃ² chÆ¡i/hoáº¡t Ä‘á»™ng khá»Ÿi Ä‘á»™ng, khÆ¡i gá»£i ná»™i dung bÃ i há»c.', 'HS nhiá»‡t tÃ¬nh tham gia, táº¡o tÃ¢m tháº¿ hÃ o há»©ng bÆ°á»›c vÃ o tiáº¿t há»c.'],
            ['* KhÃ¡m phÃ¡ / Luyá»‡n táº­p (22 - 25 phÃºt): Thá»±c hiá»‡n cÃ¡c hoáº¡t Ä‘á»™ng hÃ¬nh thÃ nh kiáº¿n thá»©c vÃ  rÃ¨n luyá»‡n kÄ© nÄƒng.'],
            ['GV hÆ°á»›ng dáº«n máº«u, tá»• chá»©c cÃ¡c hoáº¡t Ä‘á»™ng nhÃ³m/cÃ¡ nhÃ¢n, quan sÃ¡t vÃ  há»— trá»£ HS thá»±c hÃ nh.', 'HS theo dÃµi, tÃ­ch cá»±c thá»±c hÃ nh, chia sáº» káº¿t quáº£ vÃ  trao Ä‘á»•i cÃ¹ng báº¡n.'],
            ['* Váº­n dá»¥ng (3 - 5 phÃºt): Cá»§ng cá»‘, Ä‘Ã¡nh giÃ¡ vÃ  Ä‘á»‹nh hÆ°á»›ng rÃ¨n luyá»‡n.'],
            ['GV nháº­n xÃ©t tiáº¿t dáº¡y, tuyÃªn dÆ°Æ¡ng cÃ¡c cÃ¡ nhÃ¢n/nhÃ³m tÃ­ch cá»±c, dáº·n dÃ² HS Ã´n luyá»‡n.', 'HS láº¯ng nghe, ghi nhá»› vÃ  váº­n dá»¥ng kiáº¿n thá»©c, kÄ© nÄƒng vÃ o Ä‘á»i sá»‘ng.']
          ]]
        };
      }

      lessonItem.globalPeriod = globalPeriodCounter++;
      lessonItem.dayName = slot.dayName;
      lessonItem.dayNum = slot.dayNum;
      lessonItem.session = slot.session;
      lessonItem.periodSlot = slot.periodSlot;
      lessonItem.className = slot.className;
      lessonItem.grade = slot.grade;
      lessonItem.subjectKey = slot.subjectKey;
      lessonItem.subjectName = dispSubj;
      lessonItem.week = wNum;
      lessonItem.teacherName = cfg.teacherName || '';

      weeklyOrderedLessons.push(lessonItem);
    }

    return {
      role: 'gvbm',
      week: wNum,
      gvbmConfig: cfg,
      schedule: schedule,
      lessons: weeklyOrderedLessons,
      totalSlots: weeklyOrderedLessons.length
    };
  },

  /**
   * Táº¡o trang bÃ¬a Báº£ng Thá»i khÃ³a biá»ƒu cÃ¡ nhÃ¢n cá»§a GiÃ¡o viÃªn Bá»™ mÃ´n
   */
  buildTeacherTkbCoverHtml: function(weeklyPlanResult, metadata) {
    var meta = metadata || {};
    var gvbmConfig = weeklyPlanResult.gvbmConfig || meta.gvbmConfig || {};
    var schedule = weeklyPlanResult.schedule || gvbmConfig.schedule || this.getDefaultTeacherSchedule(gvbmConfig.subjectKey);
    var weekNum = weeklyPlanResult.week || meta.week || 1;
    var schoolName = meta.schoolName || gvbmConfig.schoolName || 'TRÆ¯á»œNG TIá»‚U Há»ŒC .................................';
    var teacherName = meta.teacherName || gvbmConfig.teacherName || 'GiÃ¡o viÃªn Bá»™ mÃ´n';
    var schoolYear = meta.schoolYear || gvbmConfig.schoolYear || '2026 - 2027';
    var department = meta.department || gvbmConfig.department || 'Tá»• ChuyÃªn biá»‡t / Bá»™ mÃ´n';
    var subjectDisplayName = '';
    if (gvbmConfig.isMultiSubject) {
      var foundSubjects = {};
      schedule.forEach(function(day) {
        ['morning', 'afternoon'].forEach(function(sess) {
          (day[sess] || []).forEach(function(sRaw) {
            var norm = IntegrationService.normalizeGvbmSlot(sRaw, gvbmConfig.subjectKey);
            if (norm && norm.className && norm.subjectKey) {
              foundSubjects[norm.subjectKey] = true;
            }
          });
        });
      });
      var subKeys = Object.keys(foundSubjects);
      if (subKeys.length > 0) {
        subjectDisplayName = 'Äa mÃ´n (' + subKeys.map(function(k) { return IntegrationService.getSubjectDisplayName(k); }).join(', ') + ')';
      } else {
        subjectDisplayName = 'Äa mÃ´n (Theo phÃ¢n cÃ´ng)';
      }
    } else {
      subjectDisplayName = IntegrationService.getSubjectDisplayName(gvbmConfig.subjectKey || 'am_nhac');
    }

    var tkbTableRows = '';
    // Buá»•i SÃ¡ng (4 tiáº¿t)
    for (var slot = 0; slot < 4; slot++) {
      tkbTableRows += '<tr>';
      tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 20%;">';
      tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center; white-space: nowrap;">Tiáº¿t ' + (slot + 1) + ' (SÃ¡ng)</p>';
      tkbTableRows += '</td>';
      schedule.forEach(function(day) {
        var sRaw = (day.morning && day.morning[slot]) || '';
        var norm = IntegrationService.normalizeGvbmSlot(sRaw, gvbmConfig.subjectKey);
        var cellContent = '';
        if (norm && norm.className) {
          var clsDisp = norm.className.toLowerCase().includes('lá»›p') ? norm.className : ('Lá»›p ' + norm.className);
          cellContent = '<span style="font-weight: bold;">' + clsDisp + '</span>';
          if (gvbmConfig.isMultiSubject && norm.subjectKey) {
            cellContent += '<br/><span style="font-size: 9.5pt; color: #475569;">(' + IntegrationService.getSubjectDisplayName(norm.subjectKey) + ')</span>';
          }
        }
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 16%;">';
        tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; text-align: center;">' + cellContent + '</p>';
        tkbTableRows += '</td>';
      });
      tkbTableRows += '</tr>';
    }

    // Buá»•i Chiá»u (3 tiáº¿t)
    for (var slot = 0; slot < 3; slot++) {
      tkbTableRows += '<tr>';
      tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 20%;">';
      tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center; white-space: nowrap;">Tiáº¿t ' + (slot + 1) + ' (Chiá»u)</p>';
      tkbTableRows += '</td>';
      schedule.forEach(function(day) {
        var sRaw = (day.afternoon && day.afternoon[slot]) || '';
        var norm = IntegrationService.normalizeGvbmSlot(sRaw, gvbmConfig.subjectKey);
        var cellContent = '';
        if (norm && norm.className) {
          var clsDisp = norm.className.toLowerCase().includes('lá»›p') ? norm.className : ('Lá»›p ' + norm.className);
          cellContent = '<span style="font-weight: bold;">' + clsDisp + '</span>';
          if (gvbmConfig.isMultiSubject && norm.subjectKey) {
            cellContent += '<br/><span style="font-size: 9.5pt; color: #475569;">(' + IntegrationService.getSubjectDisplayName(norm.subjectKey) + ')</span>';
          }
        }
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 16%;">';
        tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; text-align: center;">' + cellContent + '</p>';
        tkbTableRows += '</td>';
      });
      tkbTableRows += '</tr>';
    }

    var weekRangeInfo = (window.AcademicCalendar && AcademicCalendar.getWeekRange(weekNum)) || null;
    var weekRangeText = weekRangeInfo ? ('<div style="font-size: 11pt; font-weight: normal; margin-top: 3pt; text-transform: none; color: #334155;">(' + weekRangeInfo.label + ')</div>') : '';
    var dMon = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 2).short) || '';
    var dTue = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 3).short) || '';
    var dWed = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 4).short) || '';
    var dThu = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 5).short) || '';
    var dFri = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 6).short) || '';

    return `
      <div style="text-align: center; margin-bottom: 16pt; font-family: 'Times New Roman', serif;">
        <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 10pt; font-family: 'Times New Roman', serif;">
          <tr>
            <td style="width: 50%; vertical-align: top; text-align: left; font-size: 13pt;">
              <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>${schoolName}</b></p>
              ${department ? `<p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">Tá»• chuyÃªn mÃ´n: <b>${department}</b></p>` : ''}
              <p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">GiÃ¡o viÃªn: <b>${teacherName}</b></p>
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right; font-size: 13pt;">
              <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>NÄ‚M Há»ŒC: ${schoolYear}</b></p>
              <p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">MÃ´n dáº¡y: <b>${subjectDisplayName}</b></p>
              <p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>TUáº¦N ${weekNum}</b></p>
            </td>
          </tr>
        </table>

        <h2 style="font-family: 'Times New Roman', serif; font-size: 14pt; font-weight: bold; text-transform: uppercase; margin: 8pt 0 2pt 0; line-height: 1.0;">
          Káº¾ HOáº CH BÃ€I Dáº Y TUáº¦N ${weekNum}
          ${weekRangeText}
        </h2>
        <p style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; color: #1e40af; margin: 0 0 2pt 0; line-height: 1.0;">
          (GIÃO VIÃŠN Bá»˜ MÃ”N CHUYÃŠN TRÃCH - GIáº¢NG Dáº Y ÄA KHá»I Lá»šP)
        </p>
        <p style="font-family: 'Times New Roman', serif; font-size: 12pt; font-style: italic; margin: 0 0 10pt 0; line-height: 1.0;">(Sáº¯p xáº¿p theo Lá»‹ch bÃ¡o giáº£ng vÃ  Thá»i khÃ³a biá»ƒu lÃªn lá»›p)</p>

        <h3 style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-align: left; text-transform: uppercase; margin: 8pt 0 2pt 0; line-height: 1.0;">
          Lá»ŠCH LÃŠN Lá»šP TUáº¦N ${weekNum}:
        </h3>
        <table class="tkb-table" style="width: 100%; border-collapse: collapse; margin-bottom: 15pt; font-family: 'Times New Roman', serif; font-size: 11pt; border: 1pt solid #000;">
          <thead>
            <tr style="background-color: #e8edf3; font-weight: bold; text-align: center;">
              <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 20%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">Tiáº¿t</p>
              </th>
              <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© Hai</p>
                ${dMon ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">(' + dMon + ')</p>' : ''}
              </th>
              <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© Ba</p>
                ${dTue ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">(' + dTue + ')</p>' : ''}
              </th>
              <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© TÆ°</p>
                ${dWed ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">(' + dWed + ')</p>' : ''}
              </th>
              <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© NÄƒm</p>
                ${dThu ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">(' + dThu + ')</p>' : ''}
              </th>
              <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© SÃ¡u</p>
                ${dFri ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">(' + dFri + ')</p>' : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            ${tkbTableRows}
          </tbody>
        </table>
      </div>
    `;
  },

  /**
   * Táº¡o trang bÃ¬a Báº£ng PhÃ¢n cÃ´ng Giáº£ng dáº¡y ChuyÃªn mÃ´n cá»§a GiÃ¡o viÃªn Bá»™ mÃ´n (Chuáº©n máº«u há»“ sÆ¡ chuyÃªn mÃ´n)
   */
  buildTeacherAssignmentCoverHtml: function(weeklyPlanResult, metadata) {
    var meta = metadata || {};
    var assignments = weeklyPlanResult.assignments || meta.assignments || [];
    var weekNum = weeklyPlanResult.week || meta.week || 1;
    var schoolName = meta.schoolName || 'TRÆ¯á»œNG TIá»‚U Há»ŒC .................................';
    var teacherName = meta.teacherName || 'GiÃ¡o viÃªn Bá»™ mÃ´n';
    var schoolYear = meta.schoolYear || '2026 - 2027';
    var department = meta.department || 'Tá»• ChuyÃªn biá»‡t / Bá»™ mÃ´n';

    var totalPeriods = 0;
    var rowsHtml = '';
    assignments.forEach(function(item, idx) {
      var g = item.grade || 1;
      var sKey = item.subjectKey || 'am_nhac';
      var sName = IntegrationService.getSubjectDisplayName(sKey);
      var cls = Array.isArray(item.classes) ? item.classes.join(', ') : (item.classes || ('Khá»‘i ' + g));
      var p = parseInt(item.periodsPerWeek || item.periods) || 1;
      totalPeriods += p;

      var noteText = '1 bÃ i/tuáº§n';
      if (p > 1 && item.classes) {
        var clsParts = Array.isArray(item.classes) ? item.classes : String(item.classes).split(/[,;+]/).filter(function(c){ return c.trim().length > 0; });
        var pPerClass = p;
        if (clsParts.length > 1 && p >= clsParts.length) {
          pPerClass = Math.round(p / clsParts.length);
        }
        if (pPerClass > 1) {
          noteText = '1 bÃ i (' + pPerClass + ' tiáº¿t)/tuáº§n';
        }
      }

      rowsHtml += `
        <tr>
          <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: center; vertical-align: middle; background-color: #ffffff;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.15; font-size: 11pt; text-align: center;">${idx + 1}</p></td>
          <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: left; vertical-align: middle; font-weight: bold; background-color: #ffffff;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: left;">${sName}</p></td>
          <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: center; vertical-align: middle; background-color: #ffffff;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.15; font-size: 11pt; text-align: center;">Khá»‘i ${g}</p></td>
          <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: left; vertical-align: middle; background-color: #ffffff;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.15; font-size: 11pt; text-align: left;">${cls}</p></td>
          <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: center; vertical-align: middle; font-weight: bold; background-color: #ffffff;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.15; font-size: 11pt; font-weight: bold; text-align: center;">${p}</p></td>
          <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: center; vertical-align: middle; background-color: #ffffff;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.15; font-size: 11pt; text-align: center;">${noteText}</p></td>
        </tr>
      `;
    });

    var weekRangeInfo = (window.AcademicCalendar && AcademicCalendar.getWeekRange(weekNum)) || null;
    var weekRangeText = weekRangeInfo ? ('<div style="font-size: 11pt; font-weight: normal; margin-top: 3pt; text-transform: none; color: #334155;">(' + weekRangeInfo.label + ')</div>') : '';

    var subjectNames = [];
    assignments.forEach(function(item) {
      var sKey = item.subjectKey || 'am_nhac';
      var sName = IntegrationService.getSubjectDisplayName(sKey);
      if (sName && !subjectNames.includes(sName)) subjectNames.push(sName);
    });
    var subjectDisplayName = subjectNames.length > 1 
      ? ('Äa mÃ´n (' + subjectNames.join(', ') + ')') 
      : (subjectNames[0] || '');

    return `
      <div style="text-align: center; margin-bottom: 16pt; font-family: 'Times New Roman', serif;">
        <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 12pt; font-family: 'Times New Roman', serif;">
          <tr>
            <td style="width: 50%; vertical-align: top; text-align: left; font-size: 13pt;">
              <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>${schoolName}</b></p>
              ${department ? `<p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">Tá»• chuyÃªn mÃ´n: <b>${department}</b></p>` : ''}
              <p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">GiÃ¡o viÃªn: <b>${teacherName}</b></p>
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right; font-size: 13pt;">
              <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>NÄ‚M Há»ŒC: ${schoolYear}</b></p>
              ${subjectDisplayName ? `<p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">MÃ´n dáº¡y: <b>${subjectDisplayName}</b></p>` : ''}
              <p style="margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>TUáº¦N ${weekNum}</b></p>
            </td>
          </tr>
        </table>

        <div style="margin: 10pt 0 8pt 0;">
          <h2 style="font-family: 'Times New Roman', serif; font-size: 14pt; font-weight: bold; text-transform: uppercase; margin: 0; line-height: 1.0; color: #000;">
            Káº¾ HOáº CH BÃ€I Dáº Y TUáº¦N ${weekNum}
            ${weekRangeText}
          </h2>
          <p style="font-family: 'Times New Roman', serif; font-size: 12pt; font-style: italic; margin: 3pt 0 0 0; line-height: 1.0;">
            (Theo Báº£ng phÃ¢n cÃ´ng chuyÃªn mÃ´n giáº£ng dáº¡y - Chuáº©n CÃ´ng vÄƒn 2345/BGDÄT-GDTH)
          </p>
        </div>

        <div style="margin-top: 10pt; margin-bottom: 12pt;">
          <p style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-align: left; margin-bottom: 4pt; line-height: 1.0;">
            Báº¢NG Tá»”NG Há»¢P PHÃ‚N CÃ”NG GIáº¢NG Dáº Y TRONG TUáº¦N:
          </p>
          <table class="tkb-table" style="width: 100%; border-collapse: collapse; font-family: 'Times New Roman', serif; font-size: 11pt; border: 1pt solid #000;">
            <thead>
              <tr style="background-color: #e8edf3; font-weight: bold; text-align: center;">
                <th style="border: 1pt solid #000; padding: 3.5pt 3pt; width: 40px; text-align: center; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">STT</p></th>
                <th style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: left; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: left;">MÃ´n há»c</p></th>
                <th style="border: 1pt solid #000; padding: 3.5pt 3pt; width: 80px; text-align: center; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Khá»‘i lá»›p</p></th>
                <th style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: left; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: left;">CÃ¡c lá»›p phá»¥ trÃ¡ch</p></th>
                <th style="border: 1pt solid #000; padding: 3.5pt 3pt; width: 85px; text-align: center; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Sá»‘ tiáº¿t/tuáº§n</p></th>
                <th style="border: 1pt solid #000; padding: 3.5pt 3pt; width: 100px; text-align: center; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Ghi chÃº</p></th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
              <tr style="font-weight: bold; background-color: #fafafa;">
                <td colspan="4" style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: right; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: right;">Tá»”NG Cá»˜NG:</p></td>
                <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: center; vertical-align: middle; color: #b91c1c;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center; color: #b91c1c;">${totalPeriods} tiáº¿t</p></td>
                <td style="border: 1pt solid #000; padding: 3.5pt 3pt; text-align: center; vertical-align: middle;"><p style="margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; font-size: 11pt; text-align: center;">${assignments.length} mÃ´n (${weeklyPlanResult.lessonsCount || (weeklyPlanResult.lessons ? weeklyPlanResult.lessons.length : assignments.length)} bÃ i theo tiáº¿t)</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },


  // =========================================================================
  // 6. AI PHÃ‚N TÃCH TÃCH Há»¢P TÃ€I LIá»†U
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
    var docTitle = (params.docTitle || 'TÃ i liá»‡u tÃ­ch há»£p chuyÃªn Ä‘á» má»›i').trim();
    var userNotes = (params.userNotes || '').trim();

    if (!docText) {
      throw new Error('Vui lÃ²ng táº£i lÃªn tÃ i liá»‡u (.docx, .pdf, .txt) hoáº·c dÃ¡n ná»™i dung vÄƒn báº£n chá»‰ Ä‘áº¡o/chuyÃªn Ä‘á» tÃ­ch há»£p.');
    }

    var docSummary = this.extractDocumentKeywordsAndSummary(docText, docTitle);
    var apiKey = this.getGeminiApiKey();

    // Há»— trá»£ cháº¿ Ä‘á»™ GiÃ¡o viÃªn Bá»™ mÃ´n (Äa khá»‘i / Äa mÃ´n theo phÃ¢n cÃ´ng chuyÃªn mÃ´n)
    var assignments = (params.assignments && Array.isArray(params.assignments) && params.assignments.length > 0) ? params.assignments : null;
    if (assignments) {
      for (var aIdx = 0; aIdx < assignments.length; aIdx++) {
        var aItem = assignments[aIdx];
        if (aItem && aItem.grade && aItem.subjectKey) {
          await this.ensureSubjectLoaded(aItem.grade, aItem.subjectKey);
        }
      }

      var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
      var allSuggestions = [];

      for (var aIdx = 0; aIdx < assignments.length; aIdx++) {
        var aItem = assignments[aIdx];
        if (!aItem || !aItem.grade || !aItem.subjectKey) continue;
        var aGrade = parseInt(aItem.grade) || 5;
        var aSubj = this.normalizeSubjectKey(aItem.subjectKey);
        var weeksPlan = khbdDataObj ? khbdDataObj.getWeekRangePlan(aGrade, aSubj, sWeek, eWeek) : [];
        var subSuggestions = this.generatePlanViaSmartRuleEngine(aGrade, aSubj, weeksPlan, docSummary, userNotes);
        subSuggestions.forEach(function(s) {
          s.grade = aGrade;
          s.subjectKey = aSubj;
          s.subjectName = IntegrationService.getSubjectDisplayName(aSubj);
          s.classes = aItem.classes;
          s.lessonId = aGrade + '_' + aSubj + '_' + s.week + '_' + s.periodIndex;
          allSuggestions.push(s);
        });
      }

      return {
        success: true,
        isAssignmentMode: true,
        role: 'gvbm',
        grade: assignments[0].grade,
        subjectKey: assignments[0].subjectKey,
        subjectName: this.getSubjectDisplayName(assignments[0].subjectKey),
        startWeek: sWeek,
        endWeek: eWeek,
        durationWeeks: dur,
        docTitle: docTitle,
        docSummary: docSummary,
        docTextSnippet: docText.substring(0, 300) + (docText.length > 300 ? '...' : ''),
        userNotes: userNotes,
        suggestions: allSuggestions,
        matrixLessons: allSuggestions,
        assignments: assignments
      };
    }

    await this.ensureSubjectLoaded(grade, subj);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    var weeksPlan = khbdDataObj ? khbdDataObj.getWeekRangePlan(grade, subj, sWeek, eWeek) : [];

    if (!weeksPlan || weeksPlan.length === 0) {
      throw new Error('ChÆ°a tÃ¬m tháº¥y dá»¯ liá»‡u giÃ¡o Ã¡n sá»‘ hÃ³a cho Khá»‘i ' + grade + ' - MÃ´n ' + subj + ' (Tuáº§n ' + sWeek + ' - ' + eWeek + ')');
    }

    var matrixLessons = [];

    if (apiKey && typeof AIService !== 'undefined' && AIService.callGeminiApi) {
      try {
        matrixLessons = await this.generatePlanViaGeminiAI(apiKey, grade, subj, sWeek, eWeek, weeksPlan, docTitle, docText, userNotes);
      } catch (aiErr) {
        console.warn('Lá»—i gá»i Gemini AI Online, chuyá»ƒn sang AI Engine PhÃ¢n tÃ­ch ChuyÃªn sÃ¢u:', aiErr);
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

  getGeminiApiKey: function() {
    var defaultKey = (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_GEMINI_API_KEY) || '';
    if (typeof localStorage !== 'undefined') {
      var custom = localStorage.getItem('tvth_gemini_api_key');
      if (custom && custom.trim() && custom.length >= 30 && custom.indexOf("JyocvLU") === -1) {
        return custom.trim();
      }
    }
    return defaultKey;
  },

  extractDocumentKeywordsAndSummary: function(text, title) {
    var clean = (text || '').replace(/\s+/g, ' ');
    var textLower = clean.toLowerCase();
    var titleLower = (title || '').toLowerCase();
    var headerSnippet = textLower.substring(0, 1000);

    // Báº£ng Ä‘á»‹nh nghÄ©a chuyÃªn Ä‘á» tÃ­ch há»£p chuáº©n GDPT 2018 & CV 2345
    var topicDefinitions = [
      {
        tag: 'GiÃ¡o dá»¥c TrÃ­ tuá»‡ nhÃ¢n táº¡o (AI)',
        shortTag: 'GD TrÃ­ tuá»‡ nhÃ¢n táº¡o (AI)',
        primaryKeys: ['trÃ­ tuá»‡ nhÃ¢n táº¡o', 'trÃ­ tuá»‡ nhÃ¢n táº¡o (ai)', 'khung ná»™i dung giÃ¡o dá»¥c trÃ­ tuá»‡ nhÃ¢n táº¡o', 'artificial intelligence', 'mÃ´ hÃ¬nh ai', 'mÃ¡y há»c', 'machine learning'],
        secondaryKeys: ['ai', 'robot', 'rÃ´-bá»‘t', 'thuáº­t toÃ¡n', 'cÃ´ng nghá»‡ thÃ´ng minh', 'khoa há»c dá»¯ liá»‡u']
      },
      {
        tag: 'GiÃ¡o dá»¥c STEM',
        shortTag: 'GiÃ¡o dá»¥c STEM',
        primaryKeys: ['giÃ¡o dá»¥c stem', 'bÃ i há»c stem', 'hoáº¡t Ä‘á»™ng stem', 'steam'],
        secondaryKeys: ['stem', 'thá»±c hÃ nh stem', 'cháº¿ táº¡o', 'thiáº¿t káº¿ kÄ© thuáº­t']
      },
      {
        tag: 'GiÃ¡o dá»¥c Quyá»n con ngÆ°á»i',
        shortTag: 'Quyá»n con ngÆ°á»i',
        primaryKeys: ['quyá»n con ngÆ°á»i', 'nhÃ¢n quyá»n', 'Ä‘á» Ã¡n giÃ¡o dá»¥c quyá»n con ngÆ°á»i'],
        secondaryKeys: ['bÃ¬nh Ä‘áº³ng', 'tÃ´n trá»ng sá»± khÃ¡c biá»‡t', 'pháº©m giÃ¡ con ngÆ°á»i']
      },
      {
        tag: 'GiÃ¡o dá»¥c Quyá»n tráº» em',
        shortTag: 'Quyá»n tráº» em',
        primaryKeys: ['quyá»n tráº» em', 'luáº­t tráº» em', 'cÃ´ng Æ°á»›c quyá»n tráº» em', 'báº£o vá»‡ tráº» em'],
        secondaryKeys: ['tráº» em Ä‘Æ°á»£c vui chÆ¡i', 'tráº» em Ä‘Æ°á»£c há»c táº­p', 'bá»•n pháº­n cá»§a tráº» em']
      },
      {
        tag: 'GiÃ¡o dá»¥c Báº£o vá»‡ mÃ´i trÆ°á»ng',
        shortTag: 'Báº£o vá»‡ mÃ´i trÆ°á»ng',
        primaryKeys: ['báº£o vá»‡ mÃ´i trÆ°á»ng', 'biáº¿n Ä‘á»•i khÃ­ háº­u', 'rÃ¡c tháº£i nhá»±a', 'phÃ¡t triá»ƒn bá»n vá»¯ng', 'Ã´ nhiá»…m mÃ´i trÆ°á»ng'],
        secondaryKeys: ['mÃ´i trÆ°á»ng xanh', 'tiáº¿t kiá»‡m nÄƒng lÆ°á»£ng', 'trá»“ng cÃ¢y', 'phÃ¢n loáº¡i rÃ¡c']
      },
      {
        tag: 'GiÃ¡o dá»¥c An toÃ n giao thÃ´ng',
        shortTag: 'An toÃ n giao thÃ´ng',
        primaryKeys: ['an toÃ n giao thÃ´ng', 'luáº­t giao thÃ´ng', 'vÄƒn hÃ³a giao thÃ´ng', 'atgt'],
        secondaryKeys: ['mÅ© báº£o hiá»ƒm', 'Ä‘á»™i mÅ© báº£o hiá»ƒm', 'Ä‘i bá»™ an toÃ n', 'giao thÃ´ng Ä‘Æ°á»ng bá»™']
      },
      {
        tag: 'PhÃ²ng chá»‘ng Ä‘uá»‘i nÆ°á»›c',
        shortTag: 'PhÃ²ng chá»‘ng Ä‘uá»‘i nÆ°á»›c',
        primaryKeys: ['phÃ²ng chá»‘ng Ä‘uá»‘i nÆ°á»›c', 'phÃ²ng, chá»‘ng tai náº¡n Ä‘uá»‘i nÆ°á»›c', 'tai náº¡n thÆ°Æ¡ng tÃ­ch', 'ká»¹ nÄƒng an toÃ n trong mÃ´i trÆ°á»ng nÆ°á»›c'],
        secondaryKeys: ['Ä‘uá»‘i nÆ°á»›c', 'Ã¡o phao', 'táº¯m sÃ´ng', 'cá»©u Ä‘uá»‘i']
      },
      {
        tag: 'GiÃ¡o dá»¥c Äá»‹a phÆ°Æ¡ng',
        shortTag: 'GD Äá»‹a phÆ°Æ¡ng',
        primaryKeys: ['giÃ¡o dá»¥c Ä‘á»‹a phÆ°Æ¡ng', 'tÃ i liá»‡u giÃ¡o dá»¥c Ä‘á»‹a phÆ°Æ¡ng', 'lá»‹ch sá»­ Ä‘á»‹a phÆ°Æ¡ng', 'Ä‘á»‹a lÃ­ Ä‘á»‹a phÆ°Æ¡ng'],
        secondaryKeys: ['Ä‘á»‹a phÆ°Æ¡ng em', 'truyá»n thá»‘ng quÃª hÆ°Æ¡ng', 'danh lam tháº¯ng cáº£nh quÃª hÆ°Æ¡ng']
      },
      {
        tag: 'GiÃ¡o dá»¥c TÃ i chÃ­nh',
        shortTag: 'GiÃ¡o dá»¥c tÃ i chÃ­nh',
        primaryKeys: ['giÃ¡o dá»¥c tÃ i chÃ­nh', 'quáº£n lÃ½ tÃ i chÃ­nh', 'tiáº¿t kiá»‡m tiá»n', 'tiá»n tá»‡'],
        secondaryKeys: ['chi tiÃªu há»£p lÃ½', 'káº¿ hoáº¡ch chi tiÃªu', 'giÃ¡ trá»‹ Ä‘á»“ng tiá»n']
      },
      {
        tag: 'Chuyá»ƒn Ä‘á»•i sá»‘ & Ká»¹ nÄƒng sá»‘',
        shortTag: 'Ká»¹ nÄƒng sá»‘',
        primaryKeys: ['chuyá»ƒn Ä‘á»•i sá»‘', 'ká»¹ nÄƒng sá»‘', 'nÄƒng lá»±c sá»‘', 'an toÃ n trÃªn khÃ´ng gian máº¡ng', 'cÃ´ng nghá»‡ sá»‘'],
        secondaryKeys: ['internet an toÃ n', 'thiáº¿t bá»‹ sá»‘', 'thÃ´ng tin sá»‘']
      },
      {
        tag: 'GiÃ¡o dá»¥c Quá»‘c phÃ²ng vÃ  An ninh',
        shortTag: 'Quá»‘c phÃ²ng - An ninh',
        primaryKeys: ['quá»‘c phÃ²ng vÃ  an ninh', 'quá»‘c phÃ²ng - an ninh', 'chá»§ quyá»n biá»ƒn Ä‘áº£o', 'biÃªn giá»›i háº£i Ä‘áº£o'],
        secondaryKeys: ['biá»ƒn Ä‘áº£o viá»‡t nam', 'quÃ¢n Ä‘á»™i nhÃ¢n dÃ¢n', 'báº£o vá»‡ tá»• quá»‘c']
      },
      {
        tag: 'GiÃ¡o dá»¥c Ká»¹ nÄƒng sá»‘ng',
        shortTag: 'Ká»¹ nÄƒng sá»‘ng',
        primaryKeys: ['ká»¹ nÄƒng sá»‘ng', 'kÄ© nÄƒng sá»‘ng', 'ká»¹ nÄƒng tá»± phá»¥c vá»¥', 'phÃ²ng chá»‘ng xÃ¢m háº¡i'],
        secondaryKeys: ['tá»± láº­p', 'giao tiáº¿p á»©ng xá»­', 'há»£p tÃ¡c nhÃ³m']
      },
      {
        tag: 'GiÃ¡o dá»¥c HÃ²a nháº­p (Há»c sinh khuyáº¿t táº­t)',
        shortTag: 'Há»c sinh khuyáº¿t táº­t',
        primaryKeys: ['há»c sinh khuyáº¿t táº­t', 'khuyáº¿t táº­t', 'hÃ²a nháº­p', 'giÃ¡o dá»¥c hÃ²a nháº­p', 'nháº­n thá»©c 50%', 'nháº­n thá»©c 30%'],
        secondaryKeys: ['tá»‰ lá»‡ nháº­n thá»©c', 'phÃ¢n hÃ³a Ä‘á»‘i tÆ°á»£ng', 'tinh giáº£n', 'háº¡ má»©c Ä‘á»™']
      }
    ];

    // Cháº¥m Ä‘iá»ƒm xÃ¡c Ä‘á»‹nh chá»§ Ä‘á» chuáº©n xÃ¡c:
    var scoredTopics = [];
    topicDefinitions.forEach(function(def) {
      var score = 0;
      def.primaryKeys.forEach(function(pk) {
        if (titleLower.indexOf(pk) !== -1) score += 120;
        if (headerSnippet.indexOf(pk) !== -1) score += 60;
        var count = 0;
        var pos = 0;
        while ((pos = textLower.indexOf(pk, pos)) !== -1) {
          count++;
          pos += pk.length;
        }
        score += count * 10;
      });
      def.secondaryKeys.forEach(function(sk) {
        if (titleLower.indexOf(sk) !== -1) score += 30;
        if (headerSnippet.indexOf(sk) !== -1) score += 15;
        var count = 0;
        var pos = 0;
        while ((pos = textLower.indexOf(sk, pos)) !== -1) {
          count++;
          pos += sk.length;
        }
        score += count * 2;
      });
      if (score > 0) {
        scoredTopics.push({ def: def, score: score });
      }
    });

    scoredTopics.sort(function(a, b) { return b.score - a.score; });

    var coreTopics = [];
    if (scoredTopics.length > 0) {
      coreTopics.push(scoredTopics[0].def.tag);
      // Chá»‰ ghÃ©p thÃªm chá»§ Ä‘á» thá»© 2 náº¿u Ä‘iá»ƒm sá»‘ cá»§a chá»§ Ä‘á» 2 thá»±c sá»± tÆ°Æ¡ng Ä‘Æ°Æ¡ng (>= 65% chá»§ Ä‘á» 1)
      if (scoredTopics.length > 1 && scoredTopics[1].score >= scoredTopics[0].score * 0.65) {
        coreTopics.push(scoredTopics[1].def.tag);
      }
    } else {
      var fallbackTitle = (title || 'ChuyÃªn Ä‘á» tÃ­ch há»£p má»›i').replace(/\.[a-zA-Z0-9]+$/, '').trim();
      coreTopics.push(fallbackTitle);
    }

    return {
      topicName: coreTopics.join(' â€¢ '),
      topicsList: coreTopics,
      primaryTag: scoredTopics.length > 0 ? scoredTopics[0].def.shortTag : coreTopics[0],
      fullSnippet: clean.substring(0, 1500),
      rawDocText: text
    };
  },

  getIntegrationContentByTopic: function(topicName, grade, subj, level, lessonTitle, periodIdx) {
    var s = (subj || 'toan').toLowerCase();
    var tLower = (topicName || '').toLowerCase();
    var g = parseInt(grade) || 5;

    // 1. CHUYÃŠN Äá»€ TRÃ TUá»† NHÃ‚N Táº O (AI) & Ká»¸ NÄ‚NG Sá»
    if (tLower.indexOf('trÃ­ tuá»‡ nhÃ¢n táº¡o') !== -1 || tLower.indexOf('ai') !== -1 || tLower.indexOf('ká»¹ nÄƒng sá»‘') !== -1 || tLower.indexOf('cÃ´ng nghá»‡') !== -1) {
      if (s === 'toan') {
        var toanVariants = [
          {
            yccd: 'Há»c sinh bÆ°á»›c Ä‘áº§u lÃ m quen vá»›i á»©ng dá»¥ng cá»§a trÃ­ tuá»‡ nhÃ¢n táº¡o (AI) trong tÃ­nh toÃ¡n sá»‘ liá»‡u; rÃ¨n luyá»‡n tÆ° duy logic vÃ  kiá»ƒm tra káº¿t quáº£.',
            gv: 'GV Ä‘áº·t cÃ¢u há»i gá»£i má»Ÿ: "Äá»ƒ tÃ­nh toÃ¡n nhanh vÃ  xá»­ lÃ½ khá»‘i lÆ°á»£ng lá»›n cÃ¡c con sá»‘ nhÆ° trong bÃ i toÃ¡n hÃ´m nay, mÃ¡y tÃ­nh hay cÃ´ng nghá»‡ AI lÃ m nhÆ° tháº¿ nÃ o?"; hÆ°á»›ng dáº«n HS nháº­n biáº¿t vai trÃ² cá»§a dá»¯ liá»‡u chÃ­nh xÃ¡c vÃ  con ngÆ°á»i luÃ´n lÃ  ngÆ°á»i quyáº¿t Ä‘á»‹nh.',
            hs: 'HS trao Ä‘á»•i nhÃ³m Ä‘Ã´i, nháº­n biáº¿t AI giÃºp con ngÆ°á»i tÃ­nh toÃ¡n nhanh nhÆ°ng báº£n thÃ¢n cáº§n tá»± giÃ¡c tÃ­nh cáº©n tháº­n, biáº¿t kiá»ƒm tra láº¡i káº¿t quáº£.'
          },
          {
            yccd: 'Nháº­n biáº¿t mÃ¡y tÃ­nh vÃ  AI cáº§n dá»¯ liá»‡u sá»‘ chÃ­nh xÃ¡c Ä‘á»ƒ phÃ¢n tÃ­ch; rÃ¨n tÃ­nh cáº©n tháº­n, trung thá»±c khi thu tháº­p vÃ  giáº£i quyáº¿t cÃ¡c bÃ i toÃ¡n.',
            gv: 'GV liÃªn há»‡: "AI há»c há»i tá»« dá»¯ liá»‡u do con ngÆ°á»i cung cáº¥p. Náº¿u dá»¯ liá»‡u nháº­p vÃ o sai thÃ¬ AI cÅ©ng cho káº¿t quáº£ sai. VÃ¬ váº­y khi lÃ m toÃ¡n, cÃ¡c em cáº§n cáº©n tháº­n tá»«ng con sá»‘."; hÆ°á»›ng dáº«n HS cÃ¡ch Ä‘á»‘i chiáº¿u Ä‘Ã¡p Ã¡n.',
            hs: 'HS láº¯ng nghe, Ä‘á»‘i chiáº¿u cÃ¡c bÆ°á»›c giáº£i vá»›i báº¡n trong nhÃ³m, rÃ¨n luyá»‡n tÃ­nh chÃ­nh xÃ¡c vÃ  trung thá»±c khi lÃ m bÃ i táº­p.'
          },
          {
            yccd: 'BÆ°á»›c Ä‘áº§u nháº­n biáº¿t AI Ä‘Æ°á»£c á»©ng dá»¥ng trong nháº­n diá»‡n hÃ¬nh áº£nh, quy luáº­t sá»‘ vÃ  Ä‘o lÆ°á»ng thÃ´ng minh trong cuá»™c sá»‘ng.',
            gv: 'GV trÃ¬nh chiáº¿u hÃ¬nh áº£nh vÃ­ dá»¥ mÃ¡y quÃ©t mÃ£ hoáº·c nháº­n diá»‡n biá»ƒn sá»‘ xe/hÃ¬nh áº£nh thá»±c táº¿; hÆ°á»›ng dáº«n HS liÃªn há»‡ quy luáº­t toÃ¡n há»c Ä‘Æ°á»£c á»©ng dá»¥ng trong cÃ´ng nghá»‡ AI.',
            hs: 'HS hÃ o há»©ng phÃ¡t biá»ƒu cÃ¡c vÃ­ dá»¥ vá» cÃ´ng nghá»‡ thÃ´ng minh quanh mÃ¬nh; cá»§ng cá»‘ niá»m yÃªu thÃ­ch há»c toÃ¡n.'
          }
        ];
        var item = toanVariants[periodIdx % toanVariants.length];
        return {
          brief: 'á»¨ng dá»¥ng AI vÃ  tÆ° duy dá»¯ liá»‡u sá»‘ vÃ o bÃ i toÃ¡n',
          yccdText: 'TÃ­ch há»£p GiÃ¡o dá»¥c TrÃ­ tuá»‡ nhÃ¢n táº¡o (AI) (' + level + '): ' + item.yccd,
          dodungText: 'HÃ¬nh áº£nh, video hoáº·c slide minh há»a á»©ng dá»¥ng cÃ´ng nghá»‡/AI trong xá»­ lÃ½ sá»‘ liá»‡u.',
          teacherAct: item.gv,
          studentAct: item.hs
        };
      } else if (s === 'tieng_viet') {
        var tvVariants = [
          {
            yccd: 'BÆ°á»›c Ä‘áº§u nháº­n biáº¿t á»©ng dá»¥ng cá»§a AI trong xá»­ lÃ½ tá»« ngá»¯, dá»‹ch thuáº­t vÃ  Ä‘á»c vÄƒn báº£n; bá»“i dÆ°á»¡ng tÆ° duy pháº£n biá»‡n vÃ  giá»¯ gÃ¬n sá»± trong sÃ¡ng cá»§a tiáº¿ng Viá»‡t.',
            gv: 'GV nÃªu cÃ¢u há»i: "Khi cÃ¡c em nghe trá»£ lÃ½ áº£o Ä‘á»c sÃ¡ch hoáº·c dá»‹ch tá»« ngá»¯, cÃ¡c em tháº¥y AI cÃ³ thay tháº¿ Ä‘Æ°á»£c giá»ng Ä‘á»c truyá»n cáº£m cá»§a con ngÆ°á»i khÃ´ng?"; nháº¯c nhá»Ÿ HS dÃ¹ng cÃ´ng nghá»‡ há»— trá»£ nhÆ°ng luÃ´n giá»¯ gÃ¬n cáº£m xÃºc vÃ  sá»± trong sÃ¡ng cá»§a tiáº¿ng Viá»‡t.',
            hs: 'HS chia sáº» cáº£m nháº­n, tÃ­ch cá»±c luyá»‡n Ä‘á»c diá»…n cáº£m vÃ  thá»ƒ hiá»‡n cáº£m xÃºc chÃ¢n thÃ nh khi nÃ³i vÃ  viáº¿t.'
          },
          {
            yccd: 'HÃ¬nh thÃ nh Ã½ thá»©c chá»n lá»c thÃ´ng tin khi tra cá»©u tÃ i liá»‡u tá»« internet vÃ  cÃ´ng cá»¥ AI; khÃ´ng phá»¥ thuá»™c mÃ¡y mÃ³c.',
            gv: 'GV hÆ°á»›ng dáº«n: "Khi tÃ¬m kiáº¿m tÃ i liá»‡u trÃªn máº¡ng hoáº·c qua AI, thÃ´ng tin cÃ³ thá»ƒ chÆ°a chuáº©n xÃ¡c. CÃ¡c em cáº§n Ä‘á»‘i chiáº¿u vá»›i sÃ¡ch giÃ¡o khoa vÃ  há»i Ã½ kiáº¿n tháº§y cÃ´."; rÃ¨n thÃ³i quen Ä‘á»c hiá»ƒu sÃ¢u.',
            hs: 'HS ghi nhá»› nguyÃªn táº¯c Ä‘á»‘i chiáº¿u nguá»“n tin, tá»± giÃ¡c Ä‘á»c hiá»ƒu vÃ  tá»± viáº¿t bÃ i theo suy nghÄ© cá»§a báº£n thÃ¢n.'
          }
        ];
        var item = tvVariants[periodIdx % tvVariants.length];
        return {
          brief: 'á»¨ng dá»¥ng AI trong ngÃ´n ngá»¯ & tÆ° duy pháº£n biá»‡n',
          yccdText: 'TÃ­ch há»£p GiÃ¡o dá»¥c TrÃ­ tuá»‡ nhÃ¢n táº¡o (AI) (' + level + '): ' + item.yccd,
          dodungText: 'TÆ° liá»‡u, vÃ­ dá»¥ trá»±c quan vá» cÃ´ng nghá»‡ xá»­ lÃ½ ngÃ´n ngá»¯/trá»£ lÃ½ áº£o.',
          teacherAct: item.gv,
          studentAct: item.hs
        };
      } else {
        return {
          brief: 'TÃ¬m hiá»ƒu á»©ng dá»¥ng cá»§a cÃ´ng nghá»‡ vÃ  AI an toÃ n',
          yccdText: 'TÃ­ch há»£p GiÃ¡o dá»¥c TrÃ­ tuá»‡ nhÃ¢n táº¡o (AI) (' + level + '): Nháº­n biáº¿t á»©ng dá»¥ng cá»§a cÃ´ng nghá»‡ thÃ´ng minh trong Ä‘á»i sá»‘ng; cÃ³ Ã½ thá»©c sá»­ dá»¥ng thiáº¿t bá»‹ sá»‘ an toÃ n, lÃ nh máº¡nh.',
          dodungText: 'HÃ¬nh áº£nh hoáº·c video minh há»a á»©ng dá»¥ng khoa há»c cÃ´ng nghá»‡, rÃ´-bá»‘t, AI.',
          teacherAct: 'GV giá»›i thiá»‡u á»©ng dá»¥ng cÃ´ng nghá»‡ AI liÃªn quan Ä‘áº¿n chá»§ Ä‘á» bÃ i há»c; nháº¯c nhá»Ÿ há»c sinh vÄƒn hÃ³a sá»­ dá»¥ng cÃ´ng nghá»‡ an toÃ n, khÃ´ng láº¡m dá»¥ng thiáº¿t bá»‹ sá»‘.',
          studentAct: 'HS quan sÃ¡t, tháº£o luáº­n vá» nhá»¯ng lá»£i Ã­ch vÃ  lÆ°u Ã½ an toÃ n khi tiáº¿p xÃºc vá»›i thiáº¿t bá»‹ thÃ´ng minh.'
        };
      }
    }

    // 2. CHUYÃŠN Äá»€ QUYá»€N CON NGÆ¯á»œI & QUYá»€N TRáºº EM
    if (tLower.indexOf('quyá»n con ngÆ°á»i') !== -1 || tLower.indexOf('quyá»n tráº» em') !== -1) {
      return {
        brief: 'GiÃ¡o dá»¥c quyá»n Ä‘Æ°á»£c há»c táº­p, bÃ y tá» Ã½ kiáº¿n vÃ  tÃ´n trá»ng sá»± khÃ¡c biá»‡t',
        yccdText: 'TÃ­ch há»£p Quyá»n con ngÆ°á»i & Quyá»n tráº» em (' + level + '): Há»c sinh hiá»ƒu quyá»n Ä‘Æ°á»£c bÃ y tá» Ã½ kiáº¿n vÃ  há»c táº­p bÃ¬nh Ä‘áº³ng; biáº¿t láº¯ng nghe, tÃ´n trá»ng vÃ  yÃªu thÆ°Æ¡ng báº¡n bÃ¨.',
        dodungText: 'TÃ¬nh huá»‘ng, tranh áº£nh vá» quyá»n tráº» em Ä‘Æ°á»£c há»c táº­p, vui chÆ¡i an toÃ n.',
        teacherAct: 'GV táº¡o cÆ¡ há»™i cho má»i há»c sinh trong lá»›p Ä‘á»u Ä‘Æ°á»£c phÃ¡t biá»ƒu, bÃ y tá» suy nghÄ©; nháº¯c nhá»Ÿ cÃ¡c em tÃ´n trá»ng sá»± khÃ¡c biá»‡t, khÃ´ng trÃªu chá»c hay phÃ¢n biá»‡t Ä‘á»‘i xá»­.',
        studentAct: 'HS máº¡nh dáº¡n chia sáº» Ã½ kiáº¿n, tÃ­ch cá»±c há»£p tÃ¡c nhÃ³m, láº¯ng nghe vÃ  Ä‘á»™ng viÃªn báº¡n bÃ¨ cÃ¹ng tiáº¿n bá»™.'
      };
    }

    // 3. CHUYÃŠN Äá»€ Báº¢O Vá»† MÃ”I TRÆ¯á»œNG & BIáº¾N Äá»”I KHÃ Háº¬U
    if (tLower.indexOf('mÃ´i trÆ°á»ng') !== -1 || tLower.indexOf('khÃ­ háº­u') !== -1 || tLower.indexOf('rÃ¡c tháº£i') !== -1) {
      return {
        brief: 'Ã thá»©c giá»¯ gÃ¬n mÃ´i trÆ°á»ng xanh, sáº¡ch, Ä‘áº¹p vÃ  tiáº¿t kiá»‡m tÃ i nguyÃªn',
        yccdText: 'TÃ­ch há»£p Báº£o vá»‡ mÃ´i trÆ°á»ng (' + level + '): Nháº­n thá»©c Ä‘Æ°á»£c táº§m quan trá»ng cá»§a viá»‡c giá»¯ gÃ¬n mÃ´i trÆ°á»ng sá»‘ng; cÃ³ hÃ nh Ä‘á»™ng thiáº¿t thá»±c tiáº¿t kiá»‡m tÃ i nguyÃªn vÃ  báº£o vá»‡ thiÃªn nhiÃªn.',
        dodungText: 'Tranh áº£nh, tÆ° liá»‡u thá»±c táº¿ vá» báº£o vá»‡ mÃ´i trÆ°á»ng, cÃ¢y xanh, phÃ¢n loáº¡i rÃ¡c.',
        teacherAct: 'GV liÃªn há»‡ ná»™i dung bÃ i há»c vá»›i viá»‡c báº£o vá»‡ mÃ´i trÆ°á»ng xung quanh trÆ°á»ng lá»›p; nháº¯c nhá»Ÿ há»c sinh tiáº¿t kiá»‡m Ä‘iá»‡n nÆ°á»›c, giá»¯ vá»‡ sinh chung.',
        studentAct: 'HS liÃªn há»‡ nhá»¯ng viá»‡c lÃ m cá»¥ thá»ƒ á»Ÿ lá»›p vÃ  á»Ÿ nhÃ : vá»©t rÃ¡c Ä‘Ãºng nÆ¡i quy Ä‘á»‹nh, táº¯t Ä‘iá»‡n khi ra khá»i phÃ²ng, chÄƒm sÃ³c cÃ¢y xanh.'
      };
    }

    // 4. CHUYÃŠN Äá»€ AN TOÃ€N GIAO THÃ”NG
    if (tLower.indexOf('giao thÃ´ng') !== -1 || tLower.indexOf('atgt') !== -1) {
      return {
        brief: 'Cháº¥p hÃ nh quy táº¯c an toÃ n giao thÃ´ng Ä‘Æ°á»ng bá»™',
        yccdText: 'TÃ­ch há»£p An toÃ n giao thÃ´ng (' + level + '): Nháº­n biáº¿t vÃ  tá»± giÃ¡c cháº¥p hÃ nh cÃ¡c quy Ä‘á»‹nh an toÃ n khi tham gia giao thÃ´ng; báº£o vá»‡ báº£n thÃ¢n vÃ  má»i ngÆ°á»i.',
        dodungText: 'HÃ¬nh áº£nh biá»ƒn bÃ¡o, tÃ¬nh huá»‘ng an toÃ n giao thÃ´ng phÃ¹ há»£p lá»©a tuá»•i tiá»ƒu há»c.',
        teacherAct: 'GV nháº¯c nhá»Ÿ há»c sinh quy táº¯c an toÃ n khi Ä‘i bá»™, Ä‘á»™i mÅ© báº£o hiá»ƒm khi ngá»“i trÃªn xe mÃ¡y/xe Ä‘áº¡p Ä‘iá»‡n; phÃª phÃ¡n hÃ nh vi nguy hiá»ƒm.',
        studentAct: 'HS nháº¯c láº¡i cÃ¡c quy táº¯c an toÃ n khi Ä‘i há»c; cam káº¿t thá»±c hiá»‡n Ä‘Ãºng vÄƒn hÃ³a giao thÃ´ng.'
      };
    }

    // 5. CHUYÃŠN Äá»€ PHÃ’NG CHá»NG ÄUá»I NÆ¯á»šC
    if (tLower.indexOf('Ä‘uá»‘i nÆ°á»›c') !== -1) {
      return {
        brief: 'Ká»¹ nÄƒng phÃ²ng, chá»‘ng Ä‘uá»‘i nÆ°á»›c vÃ  tai náº¡n thÆ°Æ¡ng tÃ­ch',
        yccdText: 'TÃ­ch há»£p PhÃ²ng chá»‘ng Ä‘uá»‘i nÆ°á»›c (' + level + '): Nháº­n biáº¿t cÃ¡c nguy cÆ¡ tai náº¡n Ä‘uá»‘i nÆ°á»›c; rÃ¨n ká»¹ nÄƒng phÃ²ng trÃ¡nh vÃ  khÃ´ng tá»± Ã½ Ä‘áº¿n gáº§n ao, há»“ nguy hiá»ƒm.',
        dodungText: 'Tranh áº£nh cáº£nh bÃ¡o khu vá»±c nÆ°á»›c sÃ¢u nguy hiá»ƒm, biá»ƒn bÃ¡o cáº¥m táº¯m.',
        teacherAct: 'GV cáº£nh bÃ¡o cÃ¡c khu vá»±c tiá»m áº©n nguy cÆ¡ Ä‘uá»‘i nÆ°á»›c (ao, há»“, sÃ´ng, suá»‘i, há»‘ cÃ´ng trÃ¬nh); hÆ°á»›ng dáº«n HS cÃ¡ch tÃ¬m kiáº¿m sá»± trá»£ giÃºp cá»§a ngÆ°á»i lá»›n khi gáº·p sá»± cá»‘.',
        studentAct: 'HS ghi nhá»› quy táº¯c: tuyá»‡t Ä‘á»‘i khÃ´ng tá»± Ã½ táº¯m sÃ´ng/ao há»“ khi khÃ´ng cÃ³ ngÆ°á»i lá»›n; biáº¿t hÃ´ hoÃ¡n ngÆ°á»i lá»›n khi tháº¥y ngÆ°á»i Ä‘uá»‘i nÆ°á»›c.'
      };
    }

    // 6. CHUYÃŠN Äá»€ GIÃO Dá»¤C TÃ€I CHÃNH
    if (tLower.indexOf('tÃ i chÃ­nh') !== -1 || tLower.indexOf('tiáº¿t kiá»‡m') !== -1) {
      return {
        brief: 'HÃ¬nh thÃ nh ká»¹ nÄƒng quáº£n lÃ½ vÃ  tiáº¿t kiá»‡m tiá»n báº¡c, tÃ i sáº£n',
        yccdText: 'TÃ­ch há»£p GiÃ¡o dá»¥c tÃ i chÃ­nh (' + level + '): Hiá»ƒu Ä‘Æ°á»£c giÃ¡ trá»‹ cá»§a Ä‘á»“ng tiá»n vÃ  sá»©c lao Ä‘á»™ng; bÆ°á»›c Ä‘áº§u hÃ¬nh thÃ nh thÃ³i quen chi tiÃªu há»£p lÃ½ vÃ  tiáº¿t kiá»‡m.',
        dodungText: 'TÃ¬nh huá»‘ng chi tiÃªu, hÃ¬nh áº£nh vÃ­ dá»¥ vá» tiáº¿t kiá»‡m sÃ¡ch vá»Ÿ, Ä‘á»“ dÃ¹ng há»c táº­p.',
        teacherAct: 'GV lá»“ng ghÃ©p giÃ¡o dá»¥c Ã½ thá»©c giá»¯ gÃ¬n Ä‘á»“ dÃ¹ng há»c táº­p, sÃ¡ch vá»Ÿ; hÆ°á»›ng dáº«n HS hiá»ƒu tiáº¿t kiá»‡m tÃ i nguyÃªn chÃ­nh lÃ  tiáº¿t kiá»‡m tÃ i chÃ­nh cho gia Ä‘Ã¬nh.',
        studentAct: 'HS chia sáº» cÃ¡ch giá»¯ gÃ¬n Ä‘á»“ dÃ¹ng, nuÃ´i heo Ä‘áº¥t tiáº¿t kiá»‡m vÃ  mua sáº¯m nhá»¯ng thá»© thá»±c sá»± cáº§n thiáº¿t.'
      };
    }

    // 7. CHUYÃŠN Äá»€ GIÃO Dá»¤C Äá»ŠA PHÆ¯Æ NG
    if (tLower.indexOf('Ä‘á»‹a phÆ°Æ¡ng') !== -1 || tLower.indexOf('gdÄ‘p') !== -1) {
      return {
        brief: 'TÃ¬m hiá»ƒu vÃ  tá»± hÃ o vá» truyá»n thá»‘ng, nÃ©t Ä‘áº¹p quÃª hÆ°Æ¡ng',
        yccdText: 'TÃ­ch há»£p GiÃ¡o dá»¥c Ä‘á»‹a phÆ°Æ¡ng (' + level + '): Bá»“i dÆ°á»¡ng tÃ¬nh yÃªu quÃª hÆ°Æ¡ng, Ä‘áº¥t nÆ°á»›c thÃ´ng qua nhá»¯ng danh lam, sáº£n váº­t vÃ  truyá»n thá»‘ng vÄƒn hÃ³a Ä‘á»‹a phÆ°Æ¡ng.',
        dodungText: 'Tranh áº£nh, video giá»›i thiá»‡u di tÃ­ch lá»‹ch sá»­, cáº£nh Ä‘áº¹p hoáº·c sáº£n váº­t quÃª hÆ°Æ¡ng.',
        teacherAct: 'GV gá»£i má»Ÿ Ä‘á»ƒ HS liÃªn há»‡ bÃ i há»c vá»›i cáº£nh quan, lÃ ng nghá» hoáº·c Ä‘áº·c sáº£n cá»§a Ä‘á»‹a phÆ°Æ¡ng; khÆ¡i gá»£i lÃ²ng tá»± hÃ o quÃª hÆ°Æ¡ng.',
        studentAct: 'HS hÃ o há»©ng giá»›i thiá»‡u nhá»¯ng Ä‘á»‹a danh, mÃ³n Äƒn hoáº·c nÃ©t Ä‘áº¹p quÃª hÆ°Æ¡ng mÃ¬nh vá»›i báº¡n bÃ¨.'
      };
    }

    // CHUYÃŠN Äá»€ Máº¶C Äá»ŠNH CHUNG
    return {
      brief: 'TÃ­ch há»£p chuyÃªn Ä‘á» ' + topicName + ' vÃ o bÃ i há»c',
      yccdText: 'TÃ­ch há»£p ' + topicName + ' (' + level + '): Váº­n dá»¥ng kiáº¿n thá»©c bÃ i há»c Ä‘á»ƒ nháº­n biáº¿t vÃ  xá»­ lÃ½ tÃ¬nh huá»‘ng thá»±c táº¿ liÃªn quan Ä‘áº¿n ' + topicName + '; hÃ¬nh thÃ nh pháº©m cháº¥t chÄƒm chá»‰, trÃ¡ch nhiá»‡m.',
      dodungText: 'TÆ° liá»‡u, hÃ¬nh áº£nh minh há»a liÃªn quan Ä‘áº¿n chuyÃªn Ä‘á» ' + topicName + '.',
      teacherAct: 'GV hÆ°á»›ng dáº«n há»c sinh liÃªn há»‡ kiáº¿n thá»©c bÃ i há»c vÃ o thá»±c táº¿ chá»§ Ä‘á» ' + topicName + '; nháº¥n máº¡nh Ã½ nghÄ©a giÃ¡o dá»¥c thá»±c tiá»…n.',
      studentAct: 'HS tÃ­ch cá»±c trao Ä‘á»•i, bÃ y tá» suy nghÄ© vÃ  liÃªn há»‡ váº­n dá»¥ng vÃ o Ä‘á»i sá»‘ng háº±ng ngÃ y.'
    };
  },

  generatePlanViaSmartRuleEngine: function(grade, subj, weeksPlan, docSummary, userNotes) {
    var self = this;
    var results = [];
    var topic = (docSummary && docSummary.topicName) || 'ChuyÃªn Ä‘á» má»›i';

    var targetParts = [
      'Hoáº¡t Ä‘á»™ng Váº­n dá»¥ng, tráº£i nghiá»‡m',
      'Hoáº¡t Ä‘á»™ng KhÃ¡m phÃ¡ kiáº¿n thá»©c má»›i',
      'Hoáº¡t Ä‘á»™ng Luyá»‡n táº­p, thá»±c hÃ nh',
      'Hoáº¡t Ä‘á»™ng Khá»Ÿi Ä‘á»™ng'
    ];

    var levels = ['LiÃªn há»‡', 'Bá»™ pháº­n', 'ToÃ n pháº§n'];

    // Nháº­n diá»‡n yÃªu cáº§u dáº¡y há»c phÃ¢n hÃ³a cho há»c sinh khuyáº¿t táº­t / hÃ²a nháº­p
    var disSupport = IntegrationService.resolveDisabilitySupport();
    var isGuest = false;
    try {
      if (typeof AuthService !== 'undefined' && typeof AuthService.getSession === 'function') {
        var s = AuthService.getSession();
        if (!s || s.role === 'guest') isGuest = true;
      }
    } catch(e) {}
    var promptSource = ((docSummary && (docSummary.rawDocText || docSummary.fullSnippet || docSummary.topicName)) || '') + ' ' + (userNotes || '');
    var isDisabilityRequested = !isGuest && ((disSupport && disSupport.enabled) || /khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p|khuyet\s*tat|hoa\s*nhap/i.test(promptSource));
    var cognitivePct = (disSupport && disSupport.enabled) ? (disSupport.cognitiveRate + '%') : '50%';
    var pctMatch = promptSource.match(/(\d{1,3})\s*%/);
    if (pctMatch && (!disSupport || !disSupport.enabled)) {
      cognitivePct = pctMatch[1] + '%';
    }

    // Kiá»ƒm tra xem chuyÃªn Ä‘á» nÃ y lÃ  chuyÃªn Ä‘á» thuáº§n khuyáº¿t táº­t hay káº¿t há»£p vá»›i chuyÃªn Ä‘á» khÃ¡c
    var hasOtherTopic = topic.includes('TrÃ­ tuá»‡') || topic.includes('STEM') || topic.includes('giao thÃ´ng') || topic.includes('mÃ´i trÆ°á»ng') || topic.includes('Ä‘uá»‘i nÆ°á»›c') || topic.includes('Ká»¹ nÄƒng sá»‘ng') || topic.includes('Quyá»n') || topic.includes('TÃ i chÃ­nh') || topic.includes('Äá»‹a phÆ°Æ¡ng');
    var isOnlyDisability = isDisabilityRequested && !hasOtherTopic;

    weeksPlan.forEach(function(weekItem) {
      (weekItem.lessons || []).forEach(function(les, lIdx) {
        var pIdx = lIdx % targetParts.length;
        var chosenPart = targetParts[pIdx];
        var chosenLevel = levels[lIdx % levels.length];
        var lessonTitle = les.title || les.lessonTitle || ('BÃ i ' + (lIdx + 1));

        var content = self.getIntegrationContentByTopic(topic, grade, subj, chosenLevel, lessonTitle, lIdx);
        var lessonId = (subj || 'toan') + '_' + weekItem.week + '_' + lIdx;

        var yccdLines = [];
        if (!isOnlyDisability) {
          yccdLines.push('- ' + content.yccdText);
        }
        if (isDisabilityRequested) {
          if (les.disabilityYccdAI) {
            yccdLines.push(les.disabilityYccdAI);
          }
        }

        var teacherAct = content.teacherAct;
        var studentAct = content.studentAct;
        if (isDisabilityRequested) {
          teacherAct += ' (GV Ä‘áº·c biá»‡t lÆ°u Ã½ hÆ°á»›ng dáº«n trá»±c quan tá»«ng bÆ°á»›c, giao nhiá»‡m vá»¥ vá»«a sá»©c vÃ  Ä‘á»™ng viÃªn em há»c sinh khuyáº¿t táº­t trong lá»›p).';
          studentAct += ' (Há»c sinh khuyáº¿t táº­t tÃ­ch cá»±c láº¯ng nghe, tham gia nháº­n biáº¿t vÃ  hoÃ n thÃ nh nhiá»‡m vá»¥ theo kháº£ nÄƒng vá»›i sá»± trá»£ giÃºp cá»§a báº¡n).';
        }

        var brief = content.brief;
        if (isDisabilityRequested) {
          brief = isOnlyDisability ? ('Äiá»u chá»‰nh YCCÄ cho HS khuyáº¿t táº­t (' + cognitivePct + ')') : (brief + ' & PhÃ¢n hÃ³a HS khuyáº¿t táº­t (' + cognitivePct + ')');
        }

        results.push({
          lessonId: lessonId,
          week: weekItem.week,
          periodIndex: lIdx,
          period: les.period || ('Tiáº¿t ' + (lIdx + 1)),
          title: lessonTitle,
          targetPart: chosenPart,
          level: chosenLevel,
          integrationBrief: brief,
          yccdAddition: yccdLines.join('\n'),
          dodungAddition: '- ' + content.dodungText + (isDisabilityRequested ? '\n- Phiáº¿u há»c táº­p hÃ¬nh áº£nh trá»±c quan há»— trá»£ há»c sinh khuyáº¿t táº­t.' : ''),
          activityAddition: {
            stepName: chosenPart + ' (3-5 phÃºt)',
            teacherAct: teacherAct,
            studentAct: studentAct
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
        // TrÃ­ch xuáº¥t YCCÄ má»¥c NÄƒng lá»±c Ä‘áº·c thÃ¹ Ä‘á»ƒ AI Ä‘á»c trá»±c tiáº¿p
        var rawYccd = (l.yccd || []).filter(function(line) {
          return !/3\.\s*pháº©m\s*cháº¥t|4\.\s*tÃ­ch\s*há»£p/i.test(line);
        }).slice(0, 5);

        lessonsListDesc.push({
          lessonId: subj + '_' + w.week + '_' + idx,
          week: w.week,
          periodIndex: idx,
          period: l.period || ('Tiáº¿t ' + (idx + 1)),
          title: l.title || l.lessonTitle || '',
          originalYccd: rawYccd
        });
      });
    });

    var prompt = `Báº¡n lÃ  ChuyÃªn gia PhÆ°Æ¡ng phÃ¡p Dáº¡y há»c Tiá»ƒu há»c vÃ  Soáº¡n Káº¿ hoáº¡ch bÃ i dáº¡y (KHBD) chuáº©n CÃ´ng vÄƒn 2345/BGDÄT-GDTH.
Nhiá»‡m vá»¥ cá»§a báº¡n: NghiÃªn cá»©u ká»¹ tÃ i liá»‡u chá»‰ Ä‘áº¡o tÃ­ch há»£p dÆ°á»›i Ä‘Ã¢y, Ä‘á»‘i chiáº¿u vá»›i danh sÃ¡ch cÃ¡c bÃ i dáº¡y mÃ´n ${subj.toUpperCase()} - Khá»‘i ${grade} (Tá»« tuáº§n ${sWeek} Ä‘áº¿n tuáº§n ${eWeek}), vÃ  láº­p Káº¾ HOáº CH TÃCH Há»¢P CHI TIáº¾T cho tá»«ng bÃ i dáº¡y.

TÃ€I LIá»†U TÃCH Há»¢P HOáº¶C YÃŠU Cáº¦U SÆ¯ PHáº M (${docTitle}):
"""
${docText.substring(0, 350000)}
"""

YÃŠU Cáº¦U Äáº¶C BIá»†T Cá»¦A GIÃO VIÃŠN: "${userNotes || 'TÃ­ch há»£p sÃ¢u sÃ¡t, sinh Ä‘á»™ng, chuáº©n CV 2345'}"

DANH SÃCH BÃ€I Dáº Y Cáº¦N TÃCH Há»¢P (KÃˆM YCCÄ Gá»C Äá»‚ AI Äá»ŒC TRá»°C TIáº¾P):
${JSON.stringify(lessonsListDesc, null, 2)}

QUY Táº®C SÆ¯ PHáº M Báº®T BUá»˜C (CHUáº¨N CV 2345):
1. XÃC Äá»ŠNH ÄÃšNG CHá»¦ Äá»€ CHÃNH: XÃ¡c Ä‘á»‹nh Ä‘Ãºng chá»§ Ä‘á» cá»‘t lÃµi cá»§a tÃ i liá»‡u (vÃ­ dá»¥: TrÃ­ tuá»‡ nhÃ¢n táº¡o (AI), Quyá»n con ngÆ°á»i, STEM, An toÃ n giao thÃ´ng, MÃ´i trÆ°á»ng, GiÃ¡o dá»¥c hÃ²a nháº­p há»c sinh khuyáº¿t táº­t...). Tuyá»‡t Ä‘á»‘i khÃ´ng ghÃ©p ná»‘i lan man cÃ¡c tá»« ngáº«u nhiÃªn.
2. Má»¤C TIÃŠU YÃŠU Cáº¦U Cáº¦N Äáº T (yccdAddition):
   - Pháº£i viáº¿t theo ngÃ´n ngá»¯ sÆ° pháº¡m tiá»ƒu há»c, báº¯t Ä‘áº§u báº±ng Ä‘á»™ng tá»« hÃ nh Ä‘á»™ng ("BÆ°á»›c Ä‘áº§u nháº­n biáº¿t...", "LÃ m quen vá»›i...", "HÃ¬nh thÃ nh Ã½ thá»©c...").
   - TUYá»†T Äá»I KHÃ”NG sao chÃ©p nguyÃªn vÄƒn tiÃªu Ä‘á» tÃ i liá»‡u, tÃªn chÆ°Æ¡ng má»¥c, tÃªn Ä‘á» Ã¡n, kháº©u hiá»‡u hÃ nh chÃ­nh vÃ o má»¥c tiÃªu bÃ i dáº¡y.
   - Äá»‹nh dáº¡ng chuáº©n: "- TÃ­ch há»£p [TÃªn chuyÃªn Ä‘á»] ([LiÃªn há»‡/Bá»™ pháº­n/ToÃ n pháº§n]): Há»c sinh [má»¥c tiÃªu cá»¥ thá»ƒ gáº¯n vá»›i bÃ i há»c]..."
3. Äá»’ DÃ™NG Dáº Y Há»ŒC (dodungAddition): Ngáº¯n gá»n, thiáº¿t thá»±c (hÃ¬nh áº£nh, video, phiáº¿u há»c táº­p...).
4. TIáº¾N TRÃŒNH HOáº T Äá»˜NG (activityAddition):
   - stepName: TÃªn hoáº¡t Ä‘á»™ng Ä‘Æ°á»£c chá»n (Khá»Ÿi Ä‘á»™ng, KhÃ¡m phÃ¡, Luyá»‡n táº­p, Váº­n dá»¥ng) kÃ¨m "(3-5 phÃºt)".
   - teacherAct: Lá»i thoáº¡i dáº«n dáº¯t sinh Ä‘á»™ng cá»§a GV (2-3 cÃ¢u gáº¯n liá»n ná»™i dung bÃ i há»c).
   - studentAct: HÃ nh Ä‘á»™ng cá»¥ thá»ƒ cá»§a HS (quan sÃ¡t, tháº£o luáº­n nhÃ³m, phÃ¡t biá»ƒu, liÃªn há»‡ thá»±c táº¿).
5. Há»– TRá»¢ Dáº Y Há»ŒC PHÃ‚N HÃ“A / Há»ŒC SINH KHUYáº¾T Táº¬T HÃ’A NHáº¬P (QUAN TRá»ŒNG Äáº¶C BIá»†T):
   - Náº¿u trong vÄƒn báº£n, cÃ¢u lá»‡nh chat hoáº·c yÃªu cáº§u cá»§a giÃ¡o viÃªn cÃ³ Ä‘á» cáº­p Ä‘áº¿n há»c sinh khuyáº¿t táº­t, há»c sinh hÃ²a nháº­p, hoáº·c tá»‰ lá»‡ nháº­n thá»©c (vÃ­ dá»¥ nháº­n thá»©c 50%, 30%...):
   - Báº®T BUá»˜C AI PHáº¢I Äá»ŒC Ká»¸ trÆ°á»ng "originalYccd" (má»¥c NÄƒng lá»±c Ä‘áº·c thÃ¹) cá»§a tá»«ng bÃ i dáº¡y tÆ°Æ¡ng á»©ng á»Ÿ trÃªn Ä‘á»ƒ soáº¡n láº¡i yÃªu cáº§u cáº§n Ä‘áº¡t riÃªng biá»‡t, vá»«a sá»©c bÃ¡m sÃ¡t kiáº¿n thá»©c cá»¥ thá»ƒ cá»§a bÃ i há»c Ä‘Ã³ (háº¡ má»©c Ä‘á»™ tá»« váº­n dá»¥ng/phÃ¢n tÃ­ch xuá»‘ng nháº­n biáº¿t/lÃ m quen/nháº¯c láº¡i trá»±c quan vá»«a sá»©c theo má»©c nháº­n thá»©c cá»§a em).
   - Ghi xuá»‘ng cuá»‘i cÃ¹ng cá»§a "yccdAddition" Ä‘Ãºng Ä‘á»‹nh dáº¡ng:
     \n- Äá»‘i vá»›i há»c sinh khuyáº¿t táº­t: Biáº¿t [má»¥c tiÃªu cá»¥ thá»ƒ Ä‘Ã£ Ä‘Æ°á»£c tinh giáº£n bÃ¡m sÃ¡t kiáº¿n thá»©c/bÃ i Ä‘á»c/phÃ©p tÃ­nh/khÃ¡i niá»‡m cá»§a bÃ i nÃ y].
   - TUYá»†T Äá»I KHÃ”NG dÃ¹ng cÃ¢u vÄƒn chung chung ráº­p khuÃ´n vÃ  KHÃ”NG thÃªm cá»¥m tá»« má»Ÿ ngoáº·c ráº­p khuÃ´n á»Ÿ cuá»‘i cÃ¢u nhÆ° "(dÆ°á»›i sá»± gá»£i Ã½, hÆ°á»›ng dáº«n...)". Viáº¿t cÃ¢u tá»± nhiÃªn, bÃ¡m sÃ¡t ná»™i dung bÃ i há»c!
   - Trong "activityAddition", giÃ¡o viÃªn cÃ³ lá»i hÆ°á»›ng dáº«n trá»±c quan, Ä‘á»™ng viÃªn vÃ  giao viá»‡c vá»«a sá»©c Ä‘á»ƒ há»c sinh khuyáº¿t táº­t cÃ¹ng tham gia há»c táº­p hÃ²a nháº­p vá»›i cÃ¡c báº¡n.

HÃ£y tráº£ vá» káº¿t quáº£ dáº¡ng JSON thuáº§n tÃºy (khÃ´ng kÃ¨m markdown code block \`\`\`json) vá»›i cáº¥u trÃºc máº£ng suggestions nhÆ° sau:
[
  {
    "lessonId": "toan_1_0",
    "week": 1,
    "periodIndex": 0,
    "period": "Tiáº¿t 1",
    "title": "TÃªn bÃ i",
    "targetPart": "Hoáº¡t Ä‘á»™ng Váº­n dá»¥ng, tráº£i nghiá»‡m",
    "level": "LiÃªn há»‡",
    "integrationBrief": "TÃ³m táº¯t ngáº¯n gá»n ná»™i dung tÃ­ch há»£p vÃ o tiáº¿t nÃ y",
    "yccdAddition": "- TÃ­ch há»£p [TÃªn chuyÃªn Ä‘á»] (LiÃªn há»‡): Há»c sinh nháº­n biáº¿t/thá»±c hÃ nh ...\\n- Äá»‘i vá»›i há»c sinh khuyáº¿t táº­t: ...",
    "dodungAddition": "- HÃ¬nh áº£nh/tÆ° liá»‡u ...",
    "activityAddition": {
      "stepName": "Hoáº¡t Ä‘á»™ng Váº­n dá»¥ng, tráº£i nghiá»‡m (3-5 phÃºt)",
      "teacherAct": "Lá»i thoáº¡i vÃ  nhiá»‡m vá»¥ cá»¥ thá»ƒ GV giao cho HS",
      "studentAct": "Hoáº¡t Ä‘á»™ng cá»¥ thá»ƒ cá»§a HS: tháº£o luáº­n, tráº£ lá»i, thá»±c hÃ nh"
    }
  }
]`;

    var response = await AIService.callGeminiApi(apiKey, prompt, { temperature: 0.3, maxTokens: 4000 });
    var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
    var parsed = JSON.parse(cleanJson);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.suggestions)) return parsed.suggestions;
    throw new Error('Dá»¯ liá»‡u AI tráº£ vá» khÃ´ng Ä‘Ãºng Ä‘á»‹nh dáº¡ng máº£ng JSON');
  },

  refineIntegrationPlanWithFeedback: async function(currentPlan, userFeedback) {
    if (!currentPlan || !currentPlan.suggestions) throw new Error('Káº¿ hoáº¡ch tÃ­ch há»£p khÃ´ng há»£p lá»‡.');
    var apiKey = this.getGeminiApiKey();

    if (apiKey && typeof AIService !== 'undefined' && AIService.callGeminiApi) {
      try {
        var prompt = `Báº¡n lÃ  Trá»£ lÃ½ AI Soáº¡n GiÃ¡o Ãn Tiá»ƒu Há»c. DÆ°á»›i Ä‘Ã¢y lÃ  Báº£ng Káº¿ hoáº¡ch TÃ­ch há»£p hiá»‡n táº¡i:
${JSON.stringify(currentPlan.suggestions, null, 2)}

Ã KIáº¾N GÃ“P Ã / YÃŠU Cáº¦U ÄIá»€U CHá»ˆNH Cá»¦A GIÃO VIÃŠN:
"${userFeedback}"

HÃ£y Ä‘iá»u chá»‰nh vÃ  hoÃ n thiá»‡n láº¡i toÃ n bá»™ báº£ng Káº¿ hoáº¡ch tÃ­ch há»£p theo Ä‘Ãºng gÃ³p Ã½ cá»§a giÃ¡o viÃªn.
Tráº£ vá» JSON thuáº§n tÃºy (máº£ng cÃ¡c bÃ i dáº¡y Ä‘Ã£ cáº­p nháº­t):`;

        var response = await AIService.callGeminiApi(apiKey, prompt, { temperature: 0.3 });
        var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
        var updatedSuggestions = JSON.parse(cleanJson);
        if (Array.isArray(updatedSuggestions)) {
          currentPlan.suggestions = updatedSuggestions;
          return currentPlan;
        }
      } catch (err) {
        console.warn('Lá»—i AI tinh chá»‰nh, chuyá»ƒn sang bá»™ xá»­ lÃ½ trá»±c tiáº¿p:', err);
      }
    }

    currentPlan.suggestions.forEach(function(s) {
      s.integrationBrief += ' (ÄÃ£ cáº­p nháº­t theo yÃªu cáº§u: ' + userFeedback.substring(0, 60) + ')';
      s.yccdAddition += ' [Cáº­p nháº­t: ' + userFeedback.substring(0, 40) + ']';
      if (s.activityAddition) {
        s.activityAddition.teacherAct += ' (GV lÆ°u Ã½: ' + userFeedback + ')';
      }
    });

    return currentPlan;
  },


  // =========================================================================
  // 7. LÃ€M Sáº CH TÃCH Há»¢P CÅ¨ & CHÃˆN TÃCH Há»¢P Má»šI VÃ€O BÃ€I Dáº Y (CV 2345)
  // =========================================================================

  cleanLegacyIntegrationFromLesson: function(origLesson) {
    if (!origLesson) return origLesson;
    var les = JSON.parse(JSON.stringify(origLesson));

    var integKeywords = [
      '[TÃ­ch há»£p', '[TÃ­ch há»£p má»›i]', '(TÃ­ch há»£p)', '[Ná»˜I DUNG TÃCH Há»¢P', '[GDÄP]', '[QCN]', '[ATGT]', '[BVMT]', '[KNS]', '[GDTC]', '[AI',
      'TÃ­ch há»£p GDÄP', 'TÃ­ch há»£p Quyá»n con ngÆ°á»i', 'TÃ­ch há»£p Quyá»n tráº» em', 'TÃ­ch há»£p PhÃ²ng chá»‘ng Ä‘uá»‘i nÆ°á»›c',
      'TÃ­ch há»£p GiÃ¡o dá»¥c tÃ i chÃ­nh', 'TÃ­ch há»£p An toÃ n giao thÃ´ng', 'TÃ­ch há»£p Báº£o vá»‡ mÃ´i trÆ°á»ng',
      'TÃ­ch há»£p Chuyá»ƒn Ä‘á»•i sá»‘', 'TÃ­ch há»£p Ká»¹ nÄƒng sá»‘', 'TÃ­ch há»£p Quá»‘c phÃ²ng', 'TÃ­ch há»£p GiÃ¡o dá»¥c TrÃ­ tuá»‡ nhÃ¢n táº¡o',
      'TÃ­ch há»£p TrÃ­ tuá»‡ nhÃ¢n táº¡o', 'TÃ­ch há»£p AI', 'TÃ­ch há»£p STEM', 'TÃ­ch há»£p Ká»¹ nÄƒng sá»‘ng', 'NÄƒng lá»±c sá»‘', 'Ká»¹ nÄƒng sá»‘',
      'AI 5.', 'AI 4.', 'AI 3.', 'AI 2.', 'AI 1.',
      'Äá»‘i vá»›i há»c sinh khuyáº¿t táº­t', 'há»c sinh khuyáº¿t táº­t'
    ];

    function isIntegratedText(text) {
      if (!text || typeof text !== 'string') return false;
      return integKeywords.some(function(kw) { return text.indexOf(kw) !== -1; });
    }

    if (Array.isArray(les.yccd)) {
      les.yccd = les.yccd.filter(function(line) { return !isIntegratedText(line); });
      this.cleanDisabilityFromLesson(les);
    }

    var dodungProp = Array.isArray(les.dodung) ? 'dodung' : (Array.isArray(les.teachingAids) ? 'teachingAids' : null);
    if (dodungProp && Array.isArray(les[dodungProp])) {
      les[dodungProp] = les[dodungProp].filter(function(line) { return !isIntegratedText(line); });
    }

    if (Array.isArray(les.tables)) {
      les.tables = les.tables.map(function(tableRows) {
        if (!Array.isArray(tableRows)) return tableRows;
        var filtered = [];
        for (var i = 0; i < tableRows.length; i++) {
          var row = tableRows[i];
          if (!Array.isArray(row)) continue;
          var nextRow = tableRows[i + 1];
          var isNextInteg = Array.isArray(nextRow) && nextRow.some(function(c) { return isIntegratedText(c); });
          if (row.length === 1 && isNextInteg) {
            continue;
          }
          var rowStr = row.join(' ');
          if (isIntegratedText(rowStr)) {
            continue;
          }
          filtered.push(row);
        }
        return filtered;
      });
    }

    return les;
  },

  injectIntegrationIntoLesson: function(origLesson, suggestion, overwriteLegacy) {
    var shouldClean = (overwriteLegacy !== false);
    var lesson = shouldClean ? this.cleanLegacyIntegrationFromLesson(origLesson) : JSON.parse(JSON.stringify(origLesson));
    this.healLeakedYccd(lesson);

    if (!lesson.yccd) lesson.yccd = [];
    if (suggestion.yccdAddition) {
      var lines = suggestion.yccdAddition.split(/\r?\n/);
      lines.forEach(function(l) {
        var cleanLine = l.replace(/^-\s*/, '').trim();
        cleanLine = cleanLine
          .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
          .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
          .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
          .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
          .replace(/\(TÃ­ch há»£p\)/gi, '')
          .replace(/[ \t]{2,}/g, ' ')
          .trim();
        if (cleanLine) {
          if (/^Ä‘á»‘i vá»›i há»c sinh khuyáº¿t táº­t/i.test(cleanLine)) {
            cleanLine = cleanLine
              .replace(/\s*\((?:dÆ°á»›i sá»± gá»£i Ã½|dÆ°á»›i sá»± hÆ°á»›ng dáº«n|dÆ°á»›i sá»± trá»£ giÃºp|cÃ³ sá»± há»— trá»£ cá»§a báº¡n cÃ¹ng nhÃ³m|sá»± há»— trá»£ cá»§a báº¡n).*?\)/gi, '')
              .replace(/[;\s]+$/, '')
              .trim();
            if (!cleanLine.endsWith('.')) cleanLine += '.';
            lesson.yccd.push('- ' + cleanLine);
          } else {
            lesson.yccd.push('[TÃ­ch há»£p] - ' + cleanLine);
          }
        }
      });
    }

    var dodungList = lesson.dodung || lesson.teachingAids || [];
    if (suggestion.dodungAddition) {
      var dLines = suggestion.dodungAddition.split(/\r?\n/);
      dLines.forEach(function(dl) {
        var rawDodung = dl.replace(/^-\s*/, '').trim();
        var cleanDodung = rawDodung
          .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
          .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
          .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
          .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
          .replace(/\(TÃ­ch há»£p\)/gi, '')
          .replace(/[ \t]{2,}/g, ' ')
          .trim();
        if (cleanDodung) {
          dodungList.push('[TÃ­ch há»£p] - ' + cleanDodung);
        }
      });
    }
    lesson.dodung = dodungList;
    lesson.teachingAids = dodungList;

    if (!lesson.tables || lesson.tables.length === 0) {
      lesson.tables = [[]];
    }

    if (suggestion.activityAddition) {
      var act = suggestion.activityAddition;
      var cleanStepName = (act.stepName || 'Hoáº¡t Ä‘á»™ng Váº­n dá»¥ng')
        .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
        .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
        .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
        .replace(/\(TÃ­ch há»£p\)/gi, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      var newHeaderRow = ['* ' + cleanStepName];
      var teacherActText = (act.teacherAct || '')
        .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
        .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
        .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
        .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
        .replace(/\(TÃ­ch há»£p\)/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      if (!teacherActText.startsWith('-') && !teacherActText.startsWith('+')) {
        teacherActText = '- ' + teacherActText;
      }
      var studentActText = (act.studentAct || '')
        .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
        .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
        .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
        .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
        .replace(/\(TÃ­ch há»£p\)/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      if (studentActText && !studentActText.startsWith('-') && !studentActText.startsWith('+')) {
        studentActText = '- ' + studentActText;
      }
      var newActRow = [
        '[TÃ­ch há»£p] ' + teacherActText,
        '[TÃ­ch há»£p] ' + (studentActText || '')
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
    var hasMap = selectedLessonsMap && typeof selectedLessonsMap === 'object';
    (plan.suggestions || []).forEach(function(s) {
      if (!hasMap || selectedLessonsMap[s.lessonId] !== false) {
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

    var disSupport = IntegrationService.resolveDisabilitySupport(plan && plan.disabilitySupport);
    if (disSupport && disSupport.enabled) {
      await IntegrationService.adaptLessonsDisabilityWithGemini(finalLessons, disSupport);
    }

    var gddpSupport = IntegrationService.resolveGddpSupport(plan && plan.gddpSupport);
    IntegrationService.applyGddpToLessons(finalLessons, gddpSupport);

    return finalLessons;
  },


  // =========================================================================
  // 8. XUáº¤T FILE WORD (.DOC) CHUáº¨N CÃ”NG VÄ‚N 2345 (Tá»ªNG MÃ”N & THEO TKB)
  // =========================================================================

  /**
   * Chuáº©n hÃ³a tÃªn giÃ¡o viÃªn Ä‘á»ƒ gáº¯n vÃ o Ä‘uÃ´i tÃªn file (loáº¡i bá» kÃ½ tá»± cáº¥m, chuyá»ƒn khoáº£ng tráº¯ng thÃ nh gáº¡ch dÆ°á»›i)
   */
  formatTeacherNameForFilename: function(teacherName) {
    if (!teacherName || typeof teacherName !== 'string') return '';
    var raw = teacherName.trim();
    if (raw.replace(/[._\-\s]/g, '').length === 0) return '';
    var clean = raw.replace(/[\\/:*?"<>|]/g, '').trim();
    clean = clean.replace(/\s+/g, '_').replace(/_+/g, '_');
    return clean ? ('_' + clean) : '';
  },

  /**
   * Láº¥y tÃªn giÃ¡o viÃªn hiá»‡u lá»±c tá»« metadata, káº¿t quáº£ tuáº§n hoáº·c cÃ i Ä‘áº·t há»‡ thá»‘ng
   */
  getEffectiveTeacherName: function(meta, planResult) {
    if (meta && meta.teacherName && typeof meta.teacherName === 'string' && meta.teacherName.replace(/[._\-\s]/g, '').length > 0) {
      return meta.teacherName;
    }
    if (planResult && planResult.teacherName && typeof planResult.teacherName === 'string' && planResult.teacherName.replace(/[._\-\s]/g, '').length > 0) {
      return planResult.teacherName;
    }
    if (planResult && planResult.metadata && planResult.metadata.teacherName && planResult.metadata.teacherName.replace(/[._\-\s]/g, '').length > 0) {
      return planResult.metadata.teacherName;
    }
    if (planResult && planResult.gvbmConfig && planResult.gvbmConfig.teacherName && planResult.gvbmConfig.teacherName.replace(/[._\-\s]/g, '').length > 0) {
      return planResult.gvbmConfig.teacherName;
    }
    if (typeof integrationState !== 'undefined' && integrationState.teacherName && integrationState.teacherName.replace(/[._\-\s]/g, '').length > 0) {
      return integrationState.teacherName;
    }
    if (typeof localStorage !== 'undefined') {
      try {
        var localName = localStorage.getItem('tvth_teacher_name');
        if (localName && localName.replace(/[._\-\s]/g, '').length > 0) return localName;
      } catch (e) {}
    }
    return '';
  },

  /**
   * Gáº¯n tÃªn giÃ¡o viÃªn vÃ o cuá»‘i tÃªn file (trÆ°á»›c pháº§n má»Ÿ rá»™ng .doc/.docx) náº¿u chÆ°a cÃ³
   */
  appendTeacherNameToFilename: function(filename, teacherName) {
    if (!filename) filename = 'KHBD.docx';
    var ext = '.docx';
    var baseName = filename;
    if (baseName.toLowerCase().endsWith('.docx')) {
      ext = '.docx';
      baseName = baseName.slice(0, -5);
    } else if (baseName.toLowerCase().endsWith('.doc')) {
      ext = '.docx';
      baseName = baseName.slice(0, -4);
    }

    // Tá»± Ä‘á»™ng loáº¡i bá» cá»¥m tá»« CV2345 khá»i tÃªn file náº¿u cÃ³
    baseName = baseName.replace(/_?CV2345/gi, '').replace(/CV2345_?/gi, '');

    var teacherSuffix = this.formatTeacherNameForFilename(teacherName);
    if (!teacherSuffix) return baseName + ext;

    var teacherClean = teacherSuffix.replace(/^_/, '');
    var baseNorm = baseName.toLowerCase().replace(/[\s_-]/g, '');
    var teacherNorm = teacherClean.toLowerCase().replace(/[\s_-]/g, '');

    if (!baseNorm.includes(teacherNorm)) {
      baseName += teacherSuffix;
    }

    return baseName + ext;
  },

  /**
   * Xuáº¥t file Word trá»n gÃ³i cho Káº¿ hoáº¡ch bÃ i dáº¡y theo MÃ´n
   */
  exportToWord: async function(lessonsOrWeeks, metadata) {
    var meta = metadata || {};
    var grade = meta.grade || 5;
    var subjectName = meta.subjectName || 'MÃ´n há»c';
    var startWeek = meta.startWeek || 1;
    var endWeek = meta.endWeek || startWeek;
    var schoolName = meta.schoolName || 'TRÆ¯á»œNG TIá»‚U Há»ŒC .................................';
    var teacherName = this.getEffectiveTeacherName(meta, null);
    var schoolYear = meta.schoolYear || '2026 - 2027';
    var className = meta.className || '';

    // Kháº¯c phá»¥c triá»‡t Ä‘á»ƒ lá»—i lá»‡ch khá»‘i: Náº¿u className chá»©a thÃ´ng tin khá»‘i/lá»›p cÅ© (vÃ­ dá»¥ "KHá»I 3" khi Ä‘ang xuáº¥t Khá»‘i 4/5)
    if (className) {
      var matchGrade = className.match(/(?:khá»‘i|lá»›p)\s*(\d)/i);
      if (matchGrade && parseInt(matchGrade[1], 10) !== parseInt(grade, 10)) {
        className = className.replace(new RegExp('(khá»‘i|lá»›p)\\s*' + matchGrade[1], 'gi'), '$1 ' + grade);
      }
    }

    var lessons = [];
    if (Array.isArray(lessonsOrWeeks)) {
      if (lessonsOrWeeks.length > 0 && lessonsOrWeeks[0].lessons) {
        lessonsOrWeeks.forEach(function(w) {
          (w.lessons || []).forEach(function(l) {
            if (!l.week) l.week = w.week;
            if (!l.subjectName && meta.subjectName) l.subjectName = meta.subjectName;
            lessons.push(l);
          });
        });
      } else {
        lessons = lessonsOrWeeks;
      }
    }

    var disSupport = IntegrationService.resolveDisabilitySupport(meta.disabilitySupport);
    if (disSupport && disSupport.enabled) {
      await this.adaptLessonsDisabilityWithGemini(lessons, disSupport);
    }

    var gddpSupport = IntegrationService.resolveGddpSupport(meta.gddpSupport);
    IntegrationService.applyGddpToLessons(lessons, gddpSupport);

    var docHtml = this.generateWordHtmlStructure(lessons, {
      title: 'Káº¿ hoáº¡ch bÃ i dáº¡y ' + (className || ('Khá»‘i ' + grade)) + ' - MÃ´n ' + subjectName + ' (Tuáº§n ' + startWeek + ' - ' + endWeek + ')',
      schoolName: schoolName,
      teacherName: teacherName,
      schoolYear: schoolYear,
      className: className,
      grade: grade,
      subjectName: subjectName,
      startWeek: startWeek,
      endWeek: endWeek,
      disabilitySupport: disSupport,
      gddpSupport: gddpSupport,
      approvalConfig: meta.approvalConfig || (typeof integrationState !== 'undefined' && integrationState.approvalConfig)
    });

    var filename = meta.filename || ('KHBD_Lop' + grade + '_' + subjectName + '_Tuan' + startWeek + '-' + endWeek + '.docx');
    filename = this.appendTeacherNameToFilename(filename, teacherName);
    return await this.downloadWordBlob(docHtml, filename);
  },

  /**
   * Xuáº¥t file Word trá»n gÃ³i 1 Tuáº§n theo Thá»i KhÃ³a Biá»ƒu (.doc)
   */
  exportWeekByTimetableWord: async function(weeklyPlanResult, metadata) {
    var meta = metadata || {};
    var isGvbm = (weeklyPlanResult.role === 'gvbm' || meta.role === 'gvbm');
    var grade = weeklyPlanResult.grade || meta.grade || 5;
    var weekNum = weeklyPlanResult.week || meta.week || 1;
    var lessons = weeklyPlanResult.lessons || [];
    var disSupport = IntegrationService.resolveDisabilitySupport(meta.disabilitySupport || (weeklyPlanResult && weeklyPlanResult.metadata && weeklyPlanResult.metadata.disabilitySupport));
    if (disSupport && disSupport.enabled) {
      await this.adaptLessonsDisabilityWithGemini(lessons, disSupport);
    }
    var gddpSupport = IntegrationService.resolveGddpSupport(meta.gddpSupport || (weeklyPlanResult && weeklyPlanResult.metadata && weeklyPlanResult.metadata.gddpSupport));
    IntegrationService.applyGddpToLessons(lessons, gddpSupport);
    var schoolName = meta.schoolName || (weeklyPlanResult.gvbmConfig && weeklyPlanResult.gvbmConfig.schoolName) || 'TRÆ¯á»œNG TIá»‚U Há»ŒC .................................';
    var teacherName = meta.teacherName || (weeklyPlanResult.gvbmConfig && weeklyPlanResult.gvbmConfig.teacherName) || '';
    var schoolYear = meta.schoolYear || (weeklyPlanResult.gvbmConfig && weeklyPlanResult.gvbmConfig.schoolYear) || '2026 - 2027';
    var className = meta.className || '';

    var isAssignmentMode = !!(weeklyPlanResult.isAssignmentMode || meta.isAssignmentMode);
    var tkbCoverHtml = '';
    if (isGvbm) {
      if (isAssignmentMode) {
        tkbCoverHtml = this.buildTeacherAssignmentCoverHtml(weeklyPlanResult, meta);
      } else {
        tkbCoverHtml = this.buildTeacherTkbCoverHtml(weeklyPlanResult, meta);
      }
    } else {
      var timetable = weeklyPlanResult.timetable || meta.timetable || this.getDefaultTimetable(grade);
      // XÃ¢y dá»±ng Báº£ng Thá»i KhÃ³a Biá»ƒu Tuáº§n Ä‘á»‹nh dáº¡ng Word cho GVCN
      var tkbTableRows = '';
      
      // Buá»•i SÃ¡ng
      for (var slot = 0; slot < 4; slot++) {
        tkbTableRows += '<tr>';
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 20%;">';
        tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center; white-space: nowrap;">Tiáº¿t ' + (slot + 1) + ' (SÃ¡ng)</p>';
        tkbTableRows += '</td>';
        timetable.forEach(function(day) {
          var sKey = (day.morning && day.morning[slot]) || '';
          var sDisp = sKey ? IntegrationService.getSubjectDisplayName(sKey) : '';
          tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 16%;">';
          tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; text-align: center;">' + sDisp + '</p>';
          tkbTableRows += '</td>';
        });
        tkbTableRows += '</tr>';
      }

      // Buá»•i Chiá»u
      for (var slot = 0; slot < 3; slot++) {
        tkbTableRows += '<tr>';
        tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 20%;">';
        tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center; white-space: nowrap;">Tiáº¿t ' + (slot + 1) + ' (Chiá»u)</p>';
        tkbTableRows += '</td>';
        timetable.forEach(function(day) {
          var sKey = (day.afternoon && day.afternoon[slot]) || '';
          var sDisp = sKey ? IntegrationService.getSubjectDisplayName(sKey) : '';
          tkbTableRows += '<td style="border: 1pt solid #000; padding: 3.5pt 2pt; text-align: center; vertical-align: middle; background-color: #ffffff; width: 16%;">';
          tkbTableRows += '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; text-align: center;">' + sDisp + '</p>';
          tkbTableRows += '</td>';
        });
        tkbTableRows += '</tr>';
      }

      var weekRangeInfo = (window.AcademicCalendar && AcademicCalendar.getWeekRange(weekNum)) || null;
      var weekRangeText = weekRangeInfo ? ('<div style="font-size: 11pt; font-weight: normal; margin-top: 2pt; text-transform: none; color: #334155;">(' + weekRangeInfo.label + ')</div>') : '';
      var dMon = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 2).short) || '';
      var dTue = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 3).short) || '';
      var dWed = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 4).short) || '';
      var dThu = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 5).short) || '';
      var dFri = (window.AcademicCalendar && AcademicCalendar.getDayDate(weekNum, 6).short) || '';

      tkbCoverHtml = `
        <div style="text-align: center; margin-bottom: 15pt;">
          <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 10pt;">
            <tr>
              <td style="width: 50%; vertical-align: top; text-align: left; font-size: 13pt;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>${schoolName}</b></p>
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">GiÃ¡o viÃªn: <b>${teacherName}</b></p>
              </td>
              <td style="width: 50%; vertical-align: top; text-align: right; font-size: 13pt;">
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;"><b>NÄ‚M Há»ŒC: ${schoolYear}</b></p>
                <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-family: 'Times New Roman', serif; font-size: 13pt;">${className ? ('<b>' + className + '</b> â€¢ ') : ('Khá»‘i <b>' + grade + '</b> â€¢ ')}<b>TUáº¦N ${weekNum}</b></p>
              </td>
            </tr>
          </table>

          <h2 style="font-family: 'Times New Roman', serif; font-size: 14pt; font-weight: bold; text-transform: uppercase; margin: 6pt 0 0 0; line-height: 1.0; text-align: center;">
            Káº¾ HOáº CH BÃ€I Dáº Y TUáº¦N ${weekNum}
            ${weekRangeText}
          </h2>
          <p style="font-family: 'Times New Roman', serif; font-size: 13pt; font-style: italic; margin: 0pt 0 10pt 0; line-height: 1.0; text-align: center;">(Sáº¯p xáº¿p tuáº§n tá»± theo Thá»i khÃ³a biá»ƒu giáº£ng dáº¡y)</p>

          <h3 style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-align: left; text-transform: uppercase; margin: 6pt 0 4pt 0; line-height: 1.0;">
            THá»œI KHÃ“A BIá»‚U TUáº¦N ${weekNum}:
          </h3>
          <table class="tkb-table" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; font-family: 'Times New Roman', serif; font-size: 11pt; border: 1pt solid #000;">
            <thead>
              <tr style="background-color: #e8edf3; font-weight: bold; text-align: center;">
                <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 20%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                  <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Tiáº¿t</p>
                </th>
                <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                  <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© Hai</p>
                  ${dMon ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">(' + dMon + ')</p>' : ''}
                </th>
                <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                  <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© Ba</p>
                  ${dTue ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">(' + dTue + ')</p>' : ''}
                </th>
                <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                  <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© TÆ°</p>
                  ${dWed ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">(' + dWed + ')</p>' : ''}
                </th>
                <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                  <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© NÄƒm</p>
                  ${dThu ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">(' + dThu + ')</p>' : ''}
                </th>
                <th style="border: 1pt solid #000; padding: 3.5pt 2pt; width: 16%; background-color: #e8edf3; text-align: center; vertical-align: middle;">
                  <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">Thá»© SÃ¡u</p>
                  ${dFri ? '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; line-height: 1.0; font-size: 11pt; font-weight: bold; text-align: center;">(' + dFri + ')</p>' : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              ${tkbTableRows}
            </tbody>
          </table>
        </div>
      `;
    }

    var docTitle = isGvbm ? 
      (isAssignmentMode ? ('Káº¿ hoáº¡ch bÃ i dáº¡y Tuáº§n ' + weekNum + ' - GiÃ¡o viÃªn Bá»™ mÃ´n (Theo PhÃ¢n cÃ´ng Giáº£ng dáº¡y)') : ('Káº¿ hoáº¡ch bÃ i dáº¡y Tuáº§n ' + weekNum + ' - GiÃ¡o viÃªn Bá»™ mÃ´n (Theo Thá»i khÃ³a biá»ƒu)')) :
      ('Káº¿ hoáº¡ch bÃ i dáº¡y Tuáº§n ' + weekNum + ' - ' + (className || ('Khá»‘i ' + grade)) + ' (Theo Thá»i khÃ³a biá»ƒu)');

    var docHtml = this.generateWordHtmlStructure(lessons, {
      title: docTitle,
      schoolName: schoolName,
      teacherName: teacherName,
      schoolYear: schoolYear,
      className: className,
      grade: grade,
      weekNum: weekNum,
      isTimetableDoc: true,
      role: isGvbm ? 'gvbm' : 'gvcn',
      department: meta.department || (weeklyPlanResult.gvbmConfig && weeklyPlanResult.gvbmConfig.department) || (typeof integrationState !== 'undefined' && integrationState.gvbmConfig && integrationState.gvbmConfig.department) || '',
      tkbCoverHtml: tkbCoverHtml,
      disabilitySupport: disSupport,
      gddpSupport: gddpSupport,
      approvalConfig: meta.approvalConfig || (weeklyPlanResult && weeklyPlanResult.metadata && weeklyPlanResult.metadata.approvalConfig) || (typeof integrationState !== 'undefined' && integrationState.approvalConfig)
    });

    var isMulti = isGvbm && (weeklyPlanResult.gvbmConfig && weeklyPlanResult.gvbmConfig.isMultiSubject);
    var defaultFilename = isGvbm ? 
      (isAssignmentMode ? ('KHBD_Tuan_' + weekNum + '_GV_BoMon.docx') :
       (isMulti ? ('KHBD_Tuan_' + weekNum + '_GV_DaMon_Theo_TKB.docx') : ('KHBD_Tuan_' + weekNum + '_GVBM_Theo_TKB.docx'))) : 
      ('KHBD_Tuan_' + weekNum + '_Lop_' + grade + '_Theo_TKB.docx');
    var filename = meta.filename || defaultFilename;
    var effectiveTeacherName = this.getEffectiveTeacherName(meta, weeklyPlanResult);
    filename = this.appendTeacherNameToFilename(filename, effectiveTeacherName);
    return await this.downloadWordBlob(docHtml, filename);
  },

  formatHeaderContentWithIntegration: function(headerText, isPureIntegration, isEnLesson) {
    if (!headerText) return '';
    var formattedText = headerText.replace(/\n/g, '<br/>');
    if (isEnLesson) {
      return '<span>' + formattedText + '</span>';
    }
    if (isPureIntegration) {
      return '<span style="color: #C00000;">' + formattedText + '</span>';
    }
    if (/má»¥c\s*tiÃªu\s*tÃ­ch\s*há»£p|tÃ­ch\s*há»£p\s*quyá»n|tÃ­ch\s*há»£p\s*nÄƒng\s*lá»±c|tÃ­ch\s*há»£p\s*kns|tÃ­ch\s*há»£p\s*stem|tÃ­ch\s*há»£p\s*ai|ná»™i\s*dung\s*tÃ­ch\s*há»£p|giÃ¡o\s*dá»¥c\s*Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|Ä‘á»‹a\s*phÆ°Æ¡ng|trÃ \s*vinh/i.test(formattedText)) {
      var lines = formattedText.split(/(<br\s*\/?>)/i);
      var result = lines.map(function(part) {
        if (/^<br\s*\/?>$/i.test(part)) return part;
        if (/má»¥c\s*tiÃªu\s*tÃ­ch\s*há»£p|tÃ­ch\s*há»£p\s*quyá»n|tÃ­ch\s*há»£p\s*nÄƒng\s*lá»±c|tÃ­ch\s*há»£p\s*kns|tÃ­ch\s*há»£p\s*stem|tÃ­ch\s*há»£p\s*ai|ná»™i\s*dung\s*tÃ­ch\s*há»£p|giÃ¡o\s*dá»¥c\s*Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|Ä‘á»‹a\s*phÆ°Æ¡ng|trÃ \s*vinh/i.test(part)) {
          if (/^\s*(?:\*\s*)?(?:má»¥c\s*tiÃªu\s*tÃ­ch\s*há»£p|tÃ­ch\s*há»£p|hoáº¡t\s*Ä‘á»™ng\s*tÃ­ch\s*há»£p|giÃ¡o\s*dá»¥c\s*Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p)/i.test(part)) {
            return '<span style="color: #C00000;">' + part + '</span>';
          }
          var subparts = part.split(/((?:má»¥c\s*tiÃªu\s*tÃ­ch\s*há»£p|tÃ­ch\s*há»£p\s*quyá»n|tÃ­ch\s*há»£p\s*nÄƒng\s*lá»±c|tÃ­ch\s*há»£p\s*kns|tÃ­ch\s*há»£p\s*stem|tÃ­ch\s*há»£p\s*ai|giÃ¡o\s*dá»¥c\s*Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|Ä‘á»‹a\s*phÆ°Æ¡ng|trÃ \s*vinh).*$)/i);
          return subparts.map(function(sp) {
            if (/má»¥c\s*tiÃªu\s*tÃ­ch\s*há»£p|tÃ­ch\s*há»£p\s*quyá»n|tÃ­ch\s*há»£p\s*nÄƒng\s*lá»±c|tÃ­ch\s*há»£p\s*kns|tÃ­ch\s*há»£p\s*stem|tÃ­ch\s*há»£p\s*ai|giÃ¡o\s*dá»¥c\s*Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|Ä‘á»‹a\s*phÆ°Æ¡ng|trÃ \s*vinh/i.test(sp)) {
              return '<span style="color: #C00000;">' + sp + '</span>';
            }
            return '<span>' + sp + '</span>';
          }).join('');
        }
        return '<span>' + part + '</span>';
      }).join('');
      return result;
    }
    return '<span>' + formattedText + '</span>';
  },

  /**
   * Äá»‹nh dáº¡ng ná»™i dung Ã´ báº£ng thÃ nh cÃ¡c Ä‘oáº¡n <p> chuáº©n Times New Roman 13pt
   * Thay tháº¿ triá»‡t Ä‘á»ƒ cÃ¡c ngáº¯t dÃ²ng <br/> (vá»‘n bá»‹ Word nháº­p thÃ nh Soft Break Shift+Enter gÃ¢y lá»—i giÃ£n dÃ²ng hai biÃªn)
   */
  formatCellParagraphs: function(rawText, isTichHop, align, isEnLesson) {
    if (!rawText) return '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; text-align: ' + (align || 'justify') + ';">&nbsp;</p>';
    var textAlign = align || 'justify';
    var cellStyle = (isTichHop && !isEnLesson) ? 'color: #C00000;' : '';
    var str = String(rawText).trim();
    var rawLines = str.split(/(?:\r?\n|<br\s*\/?>)/i);
    var lines = [];
    for (var r = 0; r < rawLines.length; r++) {
      var item = rawLines[r].trim();
      if (!item) continue;
      if (/<img[^>]*>/i.test(item) && !/^<img[^>]*>$/i.test(item)) {
        var subParts = item.split(/(<img[^>]*>)/i);
        for (var sp = 0; sp < subParts.length; sp++) {
          var trimmedSp = subParts[sp].trim();
          if (trimmedSp) lines.push(trimmedSp);
        }
      } else {
        lines.push(item);
      }
    }
    var pList = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      if (/<img[^>]*>/i.test(line)) {
        var normImg = line;
        if (!/width\s*=/i.test(normImg)) {
          normImg = normImg.replace(/<img\s+/i, '<img width="306" ');
        }
        if (!/width:\s*229/i.test(normImg)) {
          if (/style=["'][^"']*["']/i.test(normImg)) {
            normImg = normImg.replace(/style=["']([^"']*)["']/i, function(m, s) {
              var cleanStyle = s.replace(/(?:^|;)\s*(?:max-|min-)?width\s*:\s*[^;]+/gi, '').replace(/^;\s*/, '').trim();
              return 'style="width: 229.5pt; max-width: 100%; height: auto; display: block; margin: 4pt auto; ' + cleanStyle + '"';
            });
          } else {
            normImg = normImg.replace(/<img\s+/i, '<img style="width: 229.5pt; max-width: 100%; height: auto; display: block; margin: 4pt auto;" ');
          }
        }
        pList.push('<p align="center" style="margin: 4pt 0pt; text-align: center; line-height: 1.0; mso-para-margin: 4pt 0pt;">' + normImg + '</p>');
        continue;
      }
      var isLineDisability = !isEnLesson && (/\b(?:HSHN|SEN)\b/i.test(line) || /\[(?:HSHN|SEN)\]/i.test(line) || /há»c\s*sinh\s*(?:hÃ²a\s*nháº­p|khuyáº¿t\s*táº­t)/i.test(line) || /inclusive\s*student/i.test(line));
      var isLineTichHop = !isEnLesson && (/\[(?:TÃ­ch\s*há»£p|Integration|GDÄP|GDQCN|NLS|AI)\]/i.test(line) || /^integrated\s*focus:|^digital\/ai\s*pupil\s*action:/i.test(line) || /tÃ­ch\s*há»£p|nÄƒng\s*lá»±c\s*sá»‘|quyá»n\s*con\s*ngÆ°á»i|Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh/i.test(line) || line.indexOf('Ná»˜I DUNG TÃCH Há»¢P') !== -1 || line.indexOf('[TÃ­ch há»£p') !== -1);
      var curLineStyle = (!isEnLesson && (cellStyle || isLineDisability || isLineTichHop)) ? 'color: #C00000;' : '';
      var inner = curLineStyle ? ('<span style="' + curLineStyle + '"><font color="#C00000">' + line + '</font></span>') : line;
      pList.push('<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; text-align: ' + textAlign + '; ' + curLineStyle + '">' + inner + '</p>');
    }
    return pList.length > 0 ? pList.join('') : '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; text-align: ' + textAlign + ';">&nbsp;</p>';
  },

  healLeakedYccd: function(les) {
    if (!les) return les;

    // 1. Flatten multi-line strings in yccd
    if (Array.isArray(les.yccd)) {
      var flatYccd = [];
      for (var k = 0; k < les.yccd.length; k++) {
        var itm = les.yccd[k];
        if (typeof itm === 'string') {
          var subLines = itm.split(/\r?\n/);
          for (var s = 0; s < subLines.length; s++) {
            var subTrim = subLines[s].trim();
            if (subTrim) flatYccd.push(subTrim);
          }
        } else if (itm) {
          flatYccd.push(itm);
        }
      }
      les.yccd = flatYccd;
    }

    // 2. Check and extract leaked YCCD from dieuchinh
    if (!Array.isArray(les.dieuchinh) || les.dieuchinh.length === 0) return les;
    var dc = les.dieuchinh;
    var hasLeak = dc.some(function(line) {
      return typeof line === 'string' && /(?:1\.\s*NÄƒng\s*lá»±c|2\.\s*NÄƒng\s*lá»±c|3\.\s*Pháº©m\s*cháº¥t|4\.\s*TÃ­ch\s*há»£p|Pháº©m cháº¥t|NÄƒng lá»±c|TÃ­ch há»£p|Giao tiáº¿p|Tá»± chá»§|ChÄƒm chá»‰|TrÃ¡ch nhiá»‡m|Giáº£i quyáº¿t váº¥n Ä‘á»|NhÃ¢n Ã¡i|Trung thá»±c|YÃªu nÆ°á»›c)/i.test(line);
    });
    if (!hasLeak) return les;

    var yccd = Array.isArray(les.yccd) ? [...les.yccd] : [];
    var extractedYccd = [];
    var remainingDc = [];

    for (var i = 0; i < dc.length; i++) {
      var raw = dc[i];
      if (typeof raw !== 'string') continue;
      var line = raw.trim();
      if (!line) continue;

      var isYccdLine = /(?:1\.\s*NÄƒng\s*lá»±c|2\.\s*NÄƒng\s*lá»±c|3\.\s*Pháº©m\s*cháº¥t|4\.\s*TÃ­ch\s*há»£p|Pháº©m cháº¥t|NÄƒng lá»±c chung|Giao tiáº¿p|Tá»± chá»§|ChÄƒm chá»‰|TrÃ¡ch nhiá»‡m|Giáº£i quyáº¿t váº¥n Ä‘á»|NhÃ¢n Ã¡i|Trung thá»±c|YÃªu nÆ°á»›c|TÃ­ch há»£p\s*:)/i.test(line);
      var isMetaHeader = /^Káº¾ HOáº CH BÃ€I Dáº Y/i.test(line) || /^CHá»¦ Äá»€ \d+/i.test(line) || /^PHá»¤ Lá»¤C/i.test(line) || /^MÃ”N\s+/i.test(line) || /^Ã”N Táº¬P VÃ€ KIá»‚M TRA/i.test(line);

      if (isYccdLine && !isMetaHeader) {
        extractedYccd.push(raw);
      } else if (/^\.{5,}/.test(line) || /^[-â€“â€”*â€¢]?\s*\.{5,}/.test(line)) {
        remainingDc.push(raw);
      }
    }

    if (extractedYccd.length > 0) {
      for (var j = 0; j < extractedYccd.length; j++) {
        var itm2 = extractedYccd[j];
        if (yccd.length > 0 && yccd[yccd.length - 1].trim() === itm2.trim()) {
          continue;
        }
        yccd.push(itm2);
      }
      les.yccd = yccd;
      les.dieuchinh = remainingDc.length > 0 ? remainingDc : [
        "....................................................................................................................................................",
        "...................................................................................................................................................."
      ];
    }
    return les;
  },

  removeVietnameseTones: function(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/Ä‘/g, 'd')
      .replace(/Ä/g, 'D');
  },

  /**
   * Dá»‹ch vÃ  chuáº©n hÃ³a tá»± Ä‘á»™ng cÃ¡c chuá»—i tiáº¿ng Viá»‡t sang tiáº¿ng Anh cho KHBD Tiáº¿ng Anh
   */
  translateVnToEnglish: function(text) {
    if (!text || typeof text !== 'string') return text;
    var s = text;

    // 0. School names
    if (/primary\s*school/i.test(s)) {
      // already English
    } else if (/^TRÆ¯á»œNG\s+TIá»‚U\s+Há»ŒC\s+/i.test(s) || /^TIá»‚U\s+Há»ŒC\s+/i.test(s) || /^TRÆ¯á»œNG\s+TH\s+/i.test(s)) {
      var schNameOnly = s.replace(/^TRÆ¯á»œNG\s+TIá»‚U\s+Há»ŒC\s+/i, '').replace(/^TIá»‚U\s+Há»ŒC\s+/i, '').replace(/^TRÆ¯á»œNG\s+TH\s+/i, '').trim();
      if (!schNameOnly || /^[._\s-]+$/.test(schNameOnly)) {
        return 'PRIMARY SCHOOL: .................................';
      }
      return (typeof this.removeVietnameseTones === 'function' ? this.removeVietnameseTones(schNameOnly) : schNameOnly).toUpperCase() + ' PRIMARY SCHOOL';
    }

    // 1. Periods & Dates & Sessions & Timings
    s = s.replace(/Tiáº¿t\s*Ä‘Ã´i/gi, 'Double period')
         .replace(/Tiáº¿t\s*(\d+)\s*[-â€“â€”]\s*(\d+)/gi, 'Periods $1-$2')
         .replace(/Tiáº¿t\s*(\d+)/gi, 'Period $1')
         .replace(/(\d+)\s*tiáº¿t/gi, '$1 periods')
         .replace(/(\d+)\s*phÃºt/gi, '$1 mins')
         .replace(/Buá»•i\s*SÃ¡ng/gi, 'Morning')
         .replace(/Buá»•i\s*Chiá»u/gi, 'Afternoon')
         .replace(/Thá»©\s*Hai/gi, 'Monday')
         .replace(/Thá»©\s*Ba/gi, 'Tuesday')
         .replace(/Thá»©\s*TÆ°/gi, 'Wednesday')
         .replace(/Thá»©\s*NÄƒm/gi, 'Thursday')
         .replace(/Thá»©\s*SÃ¡u/gi, 'Friday')
         .replace(/Thá»©\s*Báº£y/gi, 'Saturday')
         .replace(/Chá»§\s*Nháº­t/gi, 'Sunday')
         .replace(/,\s*ngÃ y\s*/gi, ', Date: ')
         .replace(/ngÃ y\s*(\d{1,2}\/\d{1,2}\/\d{4})/gi, 'Date: $1')
         .replace(/NgÃ y\s*soáº¡n\s*:\s*/gi, 'Date of preparation: ')
         .replace(/NgÃ y\s*dáº¡y\s*:\s*/gi, 'Date of teaching: ')
         .replace(/NgÃ y\s*thá»±c\s*hiá»‡n\s*:\s*/gi, 'Date: ')
         .replace(/Thá»i\s*gian\s*thá»±c\s*hiá»‡n\s*:\s*/gi, 'Teaching time: ');

    // 2. Vocabulary glosses
    var delimiter = s.includes('\\n') ? '\\n' : (s.includes('\n') ? '\n' : null);
    if (delimiter) {
      var parts = s.split(delimiter);
      var cleanedParts = parts.map(function(part) {
        if (/[Ã Ã¡áº¡áº£Ã£Ã¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµÃ¨Ã©áº¹áº»áº½Ãªá»áº¿á»‡á»ƒá»…Ã¬Ã­á»‹á»‰Ä©Ã²Ã³á»á»ÃµÃ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ã¹Ãºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ã½á»µá»·á»¹Ä‘Ä]/i.test(part)) {
          var m = part.match(/^(\s*[+*â€¢-]?\s*[a-zA-Z0-9\s'â€™=/â€“()\-\.\?]+)\s*[:;=]\s*([^()]+?)(\s*\([a-zA-Z\s]+\))?\s*$/);
          if (m) return m[1] + (m[3] ? m[3] : '');
          var m2 = part.match(/^(\s*[+*â€¢-]?\s*[a-zA-Z0-9\s'â€™=/â€“()\-\.\?]+)\s*[:;=]\s*(?:[^()]*\([^)]*\))*[^()]*\s*(\([a-zA-Z\s]+\))\s*$/);
          if (m2) return m2[1] + ' ' + m2[2];
          var m3 = part.match(/^(\s*[+*â€¢-]?\s*[a-zA-Z0-9\s'â€™=/â€“()\-\.\?]+)\s*[:;=]\s*[^\\]+$/);
          if (m3) return m3[1];
        }
        return part;
      });
      s = cleanedParts.join(delimiter);
    } else if (/[Ã Ã¡áº¡áº£Ã£Ã¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµÃ¨Ã©áº¹áº»áº½Ãªá»áº¿á»‡á»ƒá»…Ã¬Ã­á»‹á»‰Ä©Ã²Ã³á»á»ÃµÃ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ã¹Ãºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ã½á»µá»·á»¹Ä‘Ä]/i.test(s)) {
      var m = s.match(/^(\s*[+*â€¢-]?\s*[a-zA-Z0-9\s'â€™=/â€“()\-\.\?]+)\s*[:;=]\s*([^()]+?)(\s*\([a-zA-Z\s]+\))?\s*$/);
      if (m) s = m[1] + (m[3] ? m[3] : '');
    }

    // 3. Topics with Vietnamese suffix
    s = s.replace(/\s*[-â€“â€”]\s*[Ã Ã¡áº¡áº£Ã£Ã¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµÃ¨Ã©áº¹áº»áº½Ãªá»áº¿á»‡á»ƒá»…Ã¬Ã­á»‹á»‰Ä©Ã²Ã³á»á»ÃµÃ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ã¹Ãºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ã½á»µá»·á»¹Ä‘Ä].*$/, '');

    // 4. Activity headings & Sections
    s = s.replace(/Khá»Ÿi\s*Ä‘á»™ng/gi, 'Warm-up')
         .replace(/KhÃ¡m\s*phÃ¡/gi, 'Presentation')
         .replace(/Luyá»‡n\s*táº­p/gi, 'Practice')
         .replace(/Váº­n\s*dá»¥ng/gi, 'Production')
         .replace(/Cá»§ng\s*cá»‘/gi, 'Consolidation')
         .replace(/TrÃ²\s*chÆ¡i/gi, 'Game')
         .replace(/Hoáº¡t\s*Ä‘á»™ng/gi, 'Activity')
         .replace(/BÃ i\s*há»c/gi, 'Lesson')
         .replace(/BÃ i\s*dáº¡y/gi, 'Lesson');

    // 5. Special entities & Signatures
    s = s.replace(/GIÃO VIÃŠNPháº¡m Thá»‹ Kiá»u Dung/g, 'TEACHER: Pham Thi Kieu Dung')
         .replace(/DUYá»†T Tá»” TRÆ¯á»žNGNguyá»…n VÄƒn ThÆ°á»Ÿng/g, 'HEAD OF DEPARTMENT: Nguyen Van Thuong')
         .replace(/GIÃO VIÃŠN\s*SOáº N/gi, 'TEACHER')
         .replace(/GIÃO VIÃŠN/g, 'TEACHER')
         .replace(/Tá»”\s*TRÆ¯á»žNG\s*CHUYÃŠN\s*MÃ”N/gi, 'HEAD OF DEPARTMENT')
         .replace(/PHÃ“\s*Tá»”\s*TRÆ¯á»žNG\s*CHUYÃŠN\s*MÃ”N/gi, 'VICE HEAD OF DEPARTMENT')
         .replace(/BAN\s*GIÃM\s*HIá»†U/gi, 'SCHOOL BOARD')
         .replace(/HIá»†U\s*TRÆ¯á»žNG/gi, 'PRINCIPAL')
         .replace(/PHÃ“\s*HIá»†U\s*TRÆ¯á»žNG/gi, 'VICE PRINCIPAL')
         .replace(/DUYá»†T/gi, 'APPROVED')
         .replace(/PhÃ²ng Y táº¿ \(School Clinic\)/g, 'School Clinic')
         .replace(/PhÃ²ng Y táº¿/g, 'School Clinic')
         .replace(/Tiáº¿ng\s*Anh\s*(\d)/gi, 'English $1')
         .replace(/Tiáº¿ng\s*Anh/gi, 'English')
         .replace(/Khá»‘i\s*(\d+)/gi, 'Grade $1')
         .replace(/Lá»›p\s*([0-9A-Za-z]+)/gi, 'Class $1')
         .replace(/Tuáº§n\s*(\d+)/gi, 'Week $1')
         .replace(/NÄƒm\s*há»c/gi, 'School Year')
         .replace(/Káº¿\s*hoáº¡ch\s*bÃ i\s*dáº¡y/gi, 'Lesson Plan')
         .replace(/YÃªu\s*cáº§u\s*cáº§n\s*Ä‘áº¡t/gi, 'Objectives')
         .replace(/Äá»“\s*dÃ¹ng\s*dáº¡y\s*há»c/gi, 'Teaching aids')
         .replace(/Hoáº¡t\s*Ä‘á»™ng\s*cá»§a\s*giÃ¡o\s*viÃªn/gi, "Teacher's activities")
         .replace(/Hoáº¡t\s*Ä‘á»™ng\s*cá»§a\s*há»c\s*sinh/gi, "Students' activities")
         .replace(/CÃ¡c\s*hoáº¡t\s*Ä‘á»™ng\s*dáº¡y\s*há»c\s*chá»§\s*yáº¿u/gi, 'Procedures')
         .replace(/Äiá»u\s*chá»‰nh\s*sau\s*bÃ i\s*dáº¡y(?:\s*\(náº¿u\s*cÃ³\))?/gi, 'Adjustments (if any)')
         .replace(/Thá»i\s*gian\s*thá»±c\s*hiá»‡n/gi, 'Teaching time')
         .replace(/NgÃ y\s*thá»±c\s*hiá»‡n/gi, 'Date')
         .replace(/Tá»•\s*Ngoáº¡i\s*ngá»¯/gi, 'English Department')
         .replace(/Tá»•\s*Tiáº¿ng\s*Anh/gi, 'English Department')
         .replace(/Tá»•\s*chuyÃªn\s*mÃ´n/gi, 'Department')
         .replace(/Tiáº¿n\s*trÃ¬nh\s*hoáº¡t\s*Ä‘á»™ng\s*chuáº©n\s*theo\s*KHBD\s*sá»‘\s*hÃ³a/gi, 'Follow standard lesson procedure')
         .replace(/Theo\s*chuáº©n\s*chÆ°Æ¡ng\s*trÃ¬nh\s*mÃ´n\s*há»c/gi, 'According to curriculum standards')
         .replace(/Ná»™i\s*dung\s*tÃ­ch\s*há»£p\s*cá»¥\s*thá»ƒ/gi, 'Integrated focus')
         .replace(/Ná»™i\s*dung\s*tÃ­ch\s*há»£p/gi, 'Integrated focus')
         .replace(/TÃ­ch\s*há»£p\s*nÄƒng\s*lá»±c\s*sá»‘/gi, 'Digital competence integration')
         .replace(/Khung\s*duyá»‡t\s*giÃ¡o\s*Ã¡n/gi, 'Lesson plan approval frame')
         .replace(/50\.000Ä‘\s*â€“\s*60\.000Ä‘/g, '50,000 VND - 60,000 VND')
         .replace(/55\.000Ä‘/g, '55,000 VND');

    // 6. SEN lines
    s = s.replace(/5\.\s*Äiá»u\s*chá»‰nh\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:hÃ²a\s*nháº­p|khuyáº¿t\s*táº­t)\s*:/gi, '5. Adjustments for inclusive students (SEN):')
         .replace(/NÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹\s*:/gi, 'Specific competences:')
         .replace(/Pháº©m\s*cháº¥t[,\s]+nÄƒng\s*lá»±c\s*chung\s*:/gi, 'General competences & Qualities:')
         .replace(/Pháº©m\s*cháº¥t\s*v[Ã a]\s*nÄƒng\s*lá»±c\s*chung\s*:/gi, 'General competences & Qualities:')
         .replace(/NÄƒng\s*lá»±c\s*chung\s*:/gi, 'General competences:')
         .replace(/Pháº©m\s*cháº¥t\s*:/gi, 'Qualities:')
         .replace(/^\*\s*(?:dáº¡ng|há»c\s*sinh|student|type)\s*(\d+)\s*:\s*(.+?)(?::|$)/gim, function(m, p1, p2) {
           var raw = p2.trim();
           var enT = raw;
           if (/trÃ­\s*tuá»‡|cháº­m|tiáº¿p\s*thu/i.test(raw)) enT = 'Intellectual Disability';
           else if (/váº­n\s*Ä‘á»™ng|chÃ¢n\s*tay|viáº¿t/i.test(raw)) enT = 'Physical Disability';
           else if (/khiáº¿m\s*thÃ­nh|nghe\s*[-â€“â€”]?\s*nÃ³i/i.test(raw)) enT = 'Hearing Impairment';
           else if (/khiáº¿m\s*thá»‹|nhÃ¬n|máº¯t/i.test(raw)) enT = 'Visual Impairment';
           else if (/tá»±\s*k[iá»·]|adhd|tÄƒng\s*Ä‘á»™ng/i.test(raw)) enT = 'Autism Spectrum Disorder / ADHD';
           else if (/khÃ³\s*khÄƒn\s*há»c\s*táº­p/i.test(raw)) enT = 'Learning Difficulties';
           else if (/sen|hÃ²a\s*nháº­p|khÃ¡c/i.test(raw)) enT = 'SEN Student';
           var rM = raw.match(/(\d+)\s*%/);
           return '* Student ' + p1 + ' (' + enT + (rM ? (' - ~' + rM[1] + '%') : '') + '):';
         })
         .replace(/Dáº¡ng\s*(\d+)\s*:/gi, 'Student $1:')
         .replace(/Há»c\s*sinh\s*(\d+)\s*:/gi, 'Student $1:')
         .replace(/Há»c\s*sinh\s*hÃ²a\s*nháº­p/gi, 'inclusive student')
         .replace(/há»c\s*sinh\s*hÃ²a\s*nháº­p/gi, 'inclusive student')
         .replace(/há»c\s*sinh\s*khuyáº¿t\s*táº­t/gi, 'inclusive student')
         .replace(/Há»c\s*sinh\s*khuyáº¿t\s*táº­t/gi, 'inclusive student')
         .replace(/há»c\s*sinh\s*hn/gi, 'inclusive student')
         .replace(/\bHSHN\b/g, 'inclusive student')
         .replace(/Äá»‘i\s*vá»›i\s*há»c\s*sinh\s*hÃ²a\s*nháº­p/gi, 'For inclusive students')
         .replace(/Äá»‘i\s*vá»›i\s*há»c\s*sinh\s*khuyáº¿t\s*táº­t/gi, 'For inclusive students')
         .replace(/Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*hÃ²a\s*nháº­p/gi, 'for inclusive students')
         .replace(/Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*khuyáº¿t\s*táº­t/gi, 'for inclusive students')
         .replace(/Khuyáº¿t\s*táº­t\s*trÃ­\s*tuá»‡/gi, 'Intellectual Disability')
         .replace(/Khuyáº¿t\s*táº­t\s*váº­n\s*Ä‘á»™ng/gi, 'Physical Disability')
         .replace(/Khiáº¿m\s*thÃ­nh/gi, 'Hearing Impairment')
         .replace(/Khiáº¿m\s*thá»‹/gi, 'Visual Impairment')
         .replace(/Rá»‘i\s*loáº¡n\s*phá»•\s*tá»±\s*ká»‰/gi, 'Autism Spectrum Disorder')
         .replace(/Tá»±\s*ká»‰/gi, 'Autism Spectrum Disorder')
         .replace(/tháº»\s*cáº£m\s*xÃºc\s*(?:\(vui\s*[-â€“â€”]\s*khÃ´ng\s*vui\))?/gi, 'emotion cards (happy/sad)')
         .replace(/tháº»\s*cáº£m\s*xÃºc/gi, 'emotion cards')
         .replace(/tháº»\s*Ä‘Ãºng\s*[-â€“â€”/]\s*sai/gi, 'True/False cards')
         .replace(/tháº»\s*Ä‘[/]s/gi, 'True/False cards')
         .replace(/tháº»\s*tá»«\s*ngá»¯/gi, 'word cards')
         .replace(/tháº»\s*tranh/gi, 'picture cards')
         .replace(/báº£ng\s*con/gi, 'mini-board')
         .replace(/Ä‘á»“\s*dÃ¹ng\s*trá»±c\s*quan/gi, 'visual aids')
         .replace(/báº¡n\s*cÃ¹ng\s*bÃ n/gi, 'peer buddy');

        // 7. Visual & Media Channel and other teaching aids

        if (/Visual & Media Channel/i.test(s) || /Kênh hình/i.test(s) || /tranh ảnh số hoá/i.test(s)) {

          s = s.replace(/[-*•]?\s*(?:Visual & Media Channel|Kênh hình)[^:]*:\s*.+/gi, '- Visual & Media Channel: Unit context picture, Picture flashcards, Realia, Digital slides/pictures on TV/Projector.');

        }

    

        // Fallback for remaining teaching aids in Vietnamese

        s = s.replace(/Tranh ngữ cảnh SGK(?:\s*\(Unit context picture\))?/gi, 'Unit context picture')

             .replace(/Bộ (?:picture cards|thẻ tranh)\/thẻ từ(?:\s*\(Picture flashcards\))?/gi, 'Picture flashcards')

             .replace(/Vật thật(?:\s*\(Realia\))?/gi, 'Realia')

             .replace(/Slide tranh ảnh số hoá trình chiếu trên màn hình TV\/Projector/gi, 'Digital slides/pictures on TV/Projector');

    

    return s;
  },

  generateWordHtmlStructure: function(lessons, meta) {
    var schoolName = meta.schoolName || 'TRÆ¯á»œNG TIá»‚U Há»ŒC .................................';
    var teacherName = meta.teacherName || '';
    var schoolYear = meta.schoolYear || '2026 - 2027';
    var grade = meta.grade || 5;
    var className = meta.className || '';

    // Kháº¯c phá»¥c triá»‡t Ä‘á»ƒ lá»—i lá»‡ch khá»‘i: Náº¿u className chá»©a thÃ´ng tin khá»‘i/lá»›p cÅ© (vÃ­ dá»¥ "KHá»I 3" khi Ä‘ang xuáº¥t Khá»‘i 4/5)
    if (className) {
      var matchGrade = className.match(/(?:khá»‘i|lá»›p)\s*(\d)/i);
      if (matchGrade && parseInt(matchGrade[1], 10) !== parseInt(grade, 10)) {
        className = className.replace(new RegExp('(khá»‘i|lá»›p)\\s*' + matchGrade[1], 'gi'), '$1 ' + grade);
      }
    }
    var department = meta.department || '';
    var isTimetableDoc = !!meta.isTimetableDoc;

    var isDocEn = !!(
      (meta && (
        (meta.subjectKey && /tieng_anh|english/i.test(meta.subjectKey)) ||
        (meta.subjectId && /tieng_anh|english/i.test(meta.subjectId)) ||
        (meta.subjectName && /tiáº¿ng anh|english/i.test(meta.subjectName))
      )) ||
      (lessons && lessons.some(function(l) { return IntegrationService.isEnglishLesson(l, meta && (meta.subjectKey || meta.subjectId || meta.subjectName)); }))
    );

    var docTitle = meta.title || 'Káº¿ hoáº¡ch bÃ i dáº¡y';
    if (isDocEn) {
      docTitle = docTitle
        .replace(/Káº¿ hoáº¡ch bÃ i dáº¡y/gi, 'Lesson Plan')
        .replace(/MÃ´n Tiáº¿ng Anh/gi, 'English')
        .replace(/Tiáº¿ng Anh/gi, 'English')
        .replace(/Khá»‘i\s*(\d+)/gi, 'Grade $1')
        .replace(/Tuáº§n\s*(\d+)/gi, 'Week $1');
    }

    var displaySchoolName = schoolName;
    var displayTeacherName = teacherName;
    var displayDepartment = department;
    if (isDocEn) {
      if (/primary\s*school/i.test(displaySchoolName)) {
        // already English
      } else {
        var cleanSch = displaySchoolName.replace(/^TRÆ¯á»œNG\s*TIá»‚U\s*Há»ŒC\s*/i, '').replace(/^TIá»‚U\s*Há»ŒC\s*/i, '').trim();
        if (!cleanSch || /^[._\s-]+$/.test(cleanSch)) {
          displaySchoolName = 'PRIMARY SCHOOL: .................................';
        } else {
          displaySchoolName = IntegrationService.removeVietnameseTones(cleanSch).toUpperCase() + ' PRIMARY SCHOOL';
        }
      }
      if (displayTeacherName) {
        displayTeacherName = IntegrationService.removeVietnameseTones(displayTeacherName);
      }
      if (displayDepartment) {
        var cleanDep = displayDepartment.replace(/^Tá»•\s*/i, '').trim();
        if (/ngoáº¡i\s*ngá»¯|tiáº¿ng\s*anh|foreign\s*language|english/i.test(cleanDep)) {
          displayDepartment = 'English Department';
        } else {
          displayDepartment = IntegrationService.removeVietnameseTones(cleanDep) + ' Department';
        }
      }
    }

    var docHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${docTitle}</title>
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
            size: 21.0cm 29.7cm;
            margin: 2.0cm 1.5cm 2.0cm 3.0cm;
            mso-page-orientation: portrait;
            mso-header-margin: 1.0cm;
            mso-footer-margin: 1.0cm;
            mso-gutter-margin: 0cm;
          }
          @page WordSection1 {
            size: 21.0cm 29.7cm;
            margin: 2.0cm 1.5cm 2.0cm 3.0cm;
            mso-page-orientation: portrait;
            mso-header-margin: 1.0cm;
            mso-footer-margin: 1.0cm;
            mso-gutter-margin: 0cm;
            mso-paper-source: 0;
          }
          @page WordSection2 {
            size: 21.0cm 29.7cm;
            margin: 2.0cm 1.5cm 2.0cm 3.0cm;
            mso-page-orientation: portrait;
            mso-header-margin: 1.0cm;
            mso-footer-margin: 1.0cm;
            mso-gutter-margin: 0cm;
            mso-paper-source: 0;
          }
          div.WordSection1 {
            page: WordSection1;
          }
          div.WordSection2 {
            page: WordSection2;
          }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            mso-line-height-rule: exactly;
            color: #000000;
            margin: 0;
            padding: 0;
            text-align: justify;
          }
          p, p.MsoNormal, li {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            margin: 0pt;
            margin-top: 0pt;
            margin-bottom: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            mso-margin-top-alt: 0pt;
            mso-margin-bottom-alt: 0pt;
            line-height: 1.0;
            mso-line-height-rule: exactly;
            text-align: justify;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Times New Roman', serif;
            margin: 0pt;
            margin-top: 0pt;
            margin-bottom: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            padding: 0;
            line-height: 1.0;
          }
          .header-table {
            width: 100%;
            border-collapse: collapse;
            border: none;
            margin-bottom: 6pt;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
          }
          .header-table td {
            border: none;
            vertical-align: top;
            padding: 1pt;
            margin: 0pt;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
          }
          .title-box {
            text-align: center;
            margin-bottom: 6pt;
            font-family: 'Times New Roman', serif;
          }
          .title-box p {
            text-align: center;
            font-family: 'Times New Roman', serif;
            line-height: 1.0;
            margin: 0pt;
            mso-para-margin: 0pt;
          }
          .title-box h2 {
            font-family: 'Times New Roman', serif;
            font-size: 14pt;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            margin: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            line-height: 1.0;
          }
          .section-title {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0pt;
            margin-top: 0pt;
            margin-bottom: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            line-height: 1.0;
            text-align: left;
          }
          .table-activity {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4pt;
            margin-bottom: 6pt;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
          }
          .table-activity th {
            border: 1pt solid #000000;
            padding: 4pt 6pt;
            background-color: #1F4E79;
            color: #ffffff;
            font-weight: bold;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            text-align: center;
            vertical-align: middle;
            margin: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            line-height: 1.0;
          }
          .table-activity td {
            border: 1pt solid #000000;
            padding: 4pt 6pt;
            vertical-align: top;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            margin: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            mso-margin-top-alt: 0pt;
            mso-margin-bottom-alt: 0pt;
            line-height: 1.0;
            text-align: justify;
          }
          .table-activity td div, .table-activity td p {
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            margin: 0pt;
            margin-top: 0pt;
            margin-bottom: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            mso-margin-top-alt: 0pt;
            mso-margin-bottom-alt: 0pt;
            line-height: 1.0;
            text-align: justify;
          }
          .tkb-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4pt;
            margin-bottom: 10pt;
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            border: 1pt solid #000000;
          }
          .tkb-table th {
            border: 1pt solid #000000;
            padding: 3.5pt 2pt;
            background-color: #e8edf3;
            font-weight: bold;
            font-family: 'Times New Roman', serif;
            text-align: center;
            vertical-align: middle;
            font-size: 11pt;
            margin: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            line-height: 1.0;
          }
          .tkb-table td {
            border: 1pt solid #000000;
            padding: 3.5pt 2pt;
            text-align: center;
            vertical-align: middle;
            background-color: #ffffff;
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            margin: 0pt;
            mso-para-margin: 0pt;
            mso-para-margin-top: 0pt;
            mso-para-margin-bottom: 0pt;
            line-height: 1.0;
          }
          .tkb-table p, .tkb-table p.MsoNormal {
            margin: 0pt !important;
            margin-top: 0pt !important;
            margin-bottom: 0pt !important;
            mso-para-margin: 0pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 0pt !important;
            mso-margin-top-alt: 0pt !important;
            mso-margin-bottom-alt: 0pt !important;
            line-height: 1.0;
            font-size: 11pt;
            font-family: 'Times New Roman', serif;
            text-align: center;
          }
          .page-break {
            page-break-before: always;
            mso-break-type: section-break;
            clear: both;
          }
          .approval-table {
            width: 100%;
            border-collapse: collapse;
            border: 1.5pt solid #000000;
            mso-border-alt: solid black 1.5pt;
            page-break-inside: avoid;
            margin-top: 0pt;
            margin-bottom: 0pt;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
          }
          .approval-table tr {
            page-break-inside: avoid;
            mso-element: table-row;
          }
          .approval-table td {
            border: 1.0pt solid #000000;
            mso-border-alt: solid black 1.0pt;
            text-align: center;
            vertical-align: top;
            padding: 8pt 6pt;
            page-break-inside: avoid;
            font-family: 'Times New Roman', serif;
            font-size: 13pt;
            line-height: 1.0;
          }
          .approval-page {
            page-break-before: always;
            page-break-inside: avoid;
            clear: both;
          }
        </style>
      </head>
      <body>
        <div class="WordSection1">
    `;

    if (meta.tkbCoverHtml) {
      docHtml += meta.tkbCoverHtml;
    }

    var isHeaderRow = function(r) {
      if (!Array.isArray(r) || r.length < 2) return false;
      var c0 = (r[0] || '').toLowerCase().trim();
      var c1 = (r[1] || '').toLowerCase().trim();
      var c2 = (r[2] || '').toLowerCase().trim();
      return ((c0.includes('giÃ¡o viÃªn') || c0.includes('gv') || c0.includes('dáº¡y há»c') || c0.includes('tháº§y') || c0.includes('teacher')) &&
             (c1.includes('há»c sinh') || c1.includes('hs') || c1.includes('trÃ²') || c1.includes('luyá»‡n táº­p') || c1.includes('student') || c1.includes('pupil'))) ||
             (c0.includes('ná»™i dung') && (c1.includes('Ä‘á»‹nh lÆ°á»£ng') || c2.includes('giÃ¡o viÃªn')));
    };

    var disSupport = IntegrationService.resolveDisabilitySupport(meta && meta.disabilitySupport);
    var gddpSupport = IntegrationService.resolveGddpSupport(meta && meta.gddpSupport);

    var isContinuousMode = !isTimetableDoc;
    lessons.forEach(function(les, lIdx) {
      if (lIdx > 0 || meta.tkbCoverHtml) {
        if (isContinuousMode) {
          docHtml += '<div style="margin-top: 16pt; margin-bottom: 8pt; border-top: 1pt dashed #b0b0b0; padding-top: 8pt;"></div>';
        } else {
          docHtml += '<br clear="all" style="page-break-before: always; mso-break-type: section-break;" /><p class="MsoNormal" style="page-break-before: always; margin: 0pt; mso-para-margin: 0pt; font-size: 1pt; line-height: 1pt; height: 1pt; mso-margin-top-alt: 0pt; mso-margin-bottom-alt: 0pt;">&nbsp;</p><div class="page-break" style="page-break-before: always; mso-break-type: section-break;"></div>';
        }
      }

      if (meta) {
        if (!les.subjectKey && meta.subjectId) les.subjectKey = meta.subjectId;
        if (!les.subjectKey && meta.subjectKey) les.subjectKey = meta.subjectKey;
        if (!les.subjectKey && meta.subjectName && (meta.subjectName.toLowerCase().includes('tiáº¿ng anh') || meta.subjectName.toLowerCase().includes('english'))) les.subjectKey = 'tieng_anh';
        if (!les.subjectName && meta.subjectName) les.subjectName = meta.subjectName;
      }

      IntegrationService.healLeakedYccd(les);

      if (disSupport && disSupport.enabled) {
        IntegrationService.injectDisabilityIntoLesson(les, disSupport);
        if (disSupport.scope === 'both') {
          IntegrationService.injectDisabilityActivitiesIntoTables(les, disSupport);
        } else {
          IntegrationService.cleanDisabilityFromTables(les);
        }
      } else {
        IntegrationService.cleanDisabilityFromTables(les);
        IntegrationService.cleanDisabilityFromLesson(les);
      }

      if (gddpSupport && gddpSupport.enabled) {
        IntegrationService.injectGddpIntoLesson(les, gddpSupport);
        if (gddpSupport.scope === 'both') {
          IntegrationService.injectGddpActivitiesIntoTables(les, gddpSupport);
        } else {
          IntegrationService.cleanGddpFromTables(les);
        }
      } else {
        IntegrationService.cleanGddpFromTables(les);
        IntegrationService.cleanGddpFromLesson(les);
      }

      var isEnLesson = isDocEn || IntegrationService.isEnglishLesson(les, meta && (meta.subjectKey || meta.subjectId || meta.subjectName));

      // Tá»± Ä‘á»™ng tÃ­nh ngÃ y giáº£ng dáº¡y thá»±c táº¿ theo Thá»i khÃ³a biá»ƒu vÃ  Lá»‹ch nÄƒm há»c
      var currentWeekNum = meta.week || meta.startWeek || les.week || 1;
      var calObj = (typeof window !== 'undefined' && window.AcademicCalendar) ? window.AcademicCalendar : (typeof AcademicCalendar !== 'undefined' ? AcademicCalendar : null);
      var lessonDateInfo = (calObj && les.dayName) ? calObj.getDayDate(currentWeekNum, les.dayName) : null;
      var dateStr = lessonDateInfo ? lessonDateInfo.formatted : '';

      var daySessionInfo = '';
      if (isEnLesson) {
        var dayNameEn = IntegrationService.translateVnToEnglish(les.dayName || '');
        var sessionEn = (les.session && /chiá»u/i.test(les.session)) ? 'Afternoon' : 'Morning';
        var slotEn = les.periodSlot ? ('Period ' + les.periodSlot) : '';
        var clsInfoEn = les.className ? (' â€¢ ' + (les.className.toLowerCase().includes('class') ? les.className : ('Class ' + les.className.replace(/^lá»›p\s*/i, '')))) : '';
        var dayHeaderTitleEn = dayNameEn ? (dayNameEn + (dateStr ? (', ' + dateStr) : '')) : '';
        if (dayHeaderTitleEn) {
          daySessionInfo = '<p align="center" style="font-family: \'Times New Roman\', serif; font-weight: bold; color: #1e40af; font-size: 12pt; margin-bottom: 4pt; text-align: center; line-height: 1.0; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 4pt;">' + dayHeaderTitleEn + ' â€¢ ' + sessionEn + (slotEn ? (' â€¢ ' + slotEn) : '') + clsInfoEn + '</p>';
        }
      } else {
        var clsInfo = les.className ? (' â€¢ ' + (les.className.toLowerCase().includes('lá»›p') ? les.className : ('Lá»›p ' + les.className))) : '';
        var dayHeaderTitle = les.dayName ? (les.dayName + (dateStr ? (', ngÃ y ' + dateStr) : '')) : '';
        if (dayHeaderTitle) {
          daySessionInfo = '<p align="center" style="font-family: \'Times New Roman\', serif; font-weight: bold; color: #1e40af; font-size: 12pt; margin-bottom: 4pt; text-align: center; line-height: 1.0; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 4pt;">' + dayHeaderTitle + ' â€¢ Buá»•i ' + (les.session || 'SÃ¡ng') + ' â€¢ ' + (les.periodSlot ? ('Tiáº¿t ' + les.periodSlot) : '') + clsInfo + '</p>';
        }
      }

      var isDouble = (les.periodSlot && les.periodSlot.toString().includes('-')) || (les.period && (String(les.period).toLowerCase().includes('2 tiáº¿t') || String(les.period).toLowerCase().includes('tiáº¿t Ä‘Ã´i')));
      var durationDefault = isEnLesson ? (isDouble ? '70 mins' : '35 mins') : (isDouble ? '70 phÃºt' : '35 phÃºt');
      var durationWithDate = dateStr ? (durationDefault + (isEnLesson ? (' (' + dateStr + ')') : (' (ngÃ y ' + dateStr + ')'))) : durationDefault;

      var inTichHopSection = false;
      var hasRenderedTichHopHeader = false;
      var hasRenderedDisabilityHeader = false;
      var inDisabilitySection = false;
      var normalizedYccdList = IntegrationService.normalizeYccd(les.yccd || [], isEnLesson);
      
      var maxHeaderNum = 0;
      normalizedYccdList.forEach(function(l) {
        if (typeof l === 'string') {
          var m = l.trim().match(/^(\d+)\.\s/);
          if (m) {
            var num = parseInt(m[1]);
            if (num < 4 && num > maxHeaderNum) maxHeaderNum = num;
          }
        }
      });
      var tichHopNum = maxHeaderNum + 1;
      var hasTichHop = normalizedYccdList.some(function(l) { 
        if (typeof l !== 'string') return false;
        var clean = l.trim();
        return /^(?:4|3)\.\s*(?:tÃ­ch\s*há»£p|ná»™i\s*dung\s*tÃ­ch\s*há»£p|integration)\s*[:.-]?$/i.test(clean) || /^[\s*â€¢\-â€“â€”]*(?:tÃ­ch\s*há»£p|integration)\s*[:.-]?$/i.test(clean); 
      });
      var senNum = hasTichHop ? (tichHopNum + 1) : tichHopNum;
      var senHeaderText = isEnLesson ? senNum + '. Adjustments for inclusive students (SEN):' : senNum + '. Äiá»u chá»‰nh Ä‘á»‘i vá»›i há»c sinh hÃ²a nháº­p:';

      var yccdContent = normalizedYccdList.map(function(line) {
        if (typeof line !== 'string') return '';
        var cleanLine = line.trim();
        if (isEnLesson) {
          cleanLine = IntegrationService.translateVnToEnglish(cleanLine);
          // Bá» dÃ²ng tiÃªu Ä‘á» A. OBJECTIVES: / I. OBJECTIVES: Ä‘áº§u má»¥c (vÃ¬ tiÃªu Ä‘á» pháº§n A. OBJECTIVES: Ä‘Ã£ tá»± sinh phÃ­a trÃªn)
          if (/^\s*(?:A\.|I\.)\s*OBJECTIVES\s*[:.-]?\s*$/i.test(cleanLine)) {
            return '';
          }
        }
        // Bá» dÃ²ng Sá»‘ tiáº¿t thá»±c hiá»‡n / Thá»i gian thá»±c hiá»‡n / NgÃ y thá»±c hiá»‡n / TiÃªu Ä‘á» giÃ¡o Ã¡n khá»i YCCD
        if (/^[\s\-â€“â€”*â€¢]*(?:sá»‘\s*tiáº¿t|thá»i\s*gian|ngÃ y)\s*thá»±c\s*hiá»‡n/i.test(cleanLine)) {
          return '';
        }
        if (/^[\s\-â€“â€”*â€¢]*(?:káº¿\s*hoáº¡ch\s*bÃ i\s*dáº¡y|bÃ i\s*há»c\s*tiáº¿t\s*\d+|lesson\s*plan)/i.test(cleanLine)) {
          return '';
        }

        var isSingleLineDieuChinhHeader = !cleanLine.includes('\n') && /^\d+\.\s*(?:Ä‘iá»u\s*chá»‰nh\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|adjustments?\s*(?:for\s*inclusive\s*students(?:\s*\(sen\))?|\(sen\)))[:.\s]*$/i.test(cleanLine);
        if (isSingleLineDieuChinhHeader) {
          inDisabilitySection = true;
          inTichHopSection = false;
          if (!hasRenderedDisabilityHeader) {
            hasRenderedDisabilityHeader = true;
            var headColorCss = isEnLesson ? '' : 'color: #C00000; ';
            var headSpanOpen = isEnLesson ? '' : '<span style="color: #C00000;">';
            var headSpanClose = isEnLesson ? '' : '</span>';
            return '<p style="margin: 0pt; margin-top: 4pt; margin-bottom: 2pt; mso-para-margin: 0pt; mso-para-margin-top: 4pt; mso-para-margin-bottom: 2pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.15; font-weight: bold; ' + headColorCss + 'text-align: justify;">' + headSpanOpen + senHeaderText + headSpanClose + '</p>';
          }
          return '';
        }

        // Nháº­n diá»‡n TiÃªu Ä‘á» nhÃ³m TÃ­ch há»£p (vÃ­ dá»¥: "4. TÃ­ch há»£p", "4. Integration")
        var isTichHopHeaderGroup = /^(?:\d+)\.\s*(?:tÃ­ch\s*há»£p|ná»™i\s*dung\s*tÃ­ch\s*há»£p|integration)\s*[:.-]?$/i.test(cleanLine) || /^[\s*â€¢\-â€“â€”]*(?:tÃ­ch\s*há»£p|integration)\s*[:.-]?$/i.test(cleanLine);
        if (isTichHopHeaderGroup) {
          inTichHopSection = true;
          inDisabilitySection = false;
          if (!hasRenderedTichHopHeader) {
            hasRenderedTichHopHeader = true;
            var tichHopHeader = isEnLesson ? tichHopNum + '. Integration:' : tichHopNum + '. TÃ­ch há»£p:';
            return '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">' + tichHopHeader + '</p>';
          }
          return '';
        }

        // Náº¿u gáº·p tiÃªu Ä‘á» nhÃ³m khÃ¡c (nhÆ° 1., 2., 3., 5.) thÃ¬ thoÃ¡t khá»i section tÃ­ch há»£p
        if (/^\d+\.\s+(?:nÄƒng\s*lá»±c|pháº©m\s*cháº¥t|kiáº¿n\s*thá»©c|Ä‘iá»u\s*chá»‰nh|competence|qualit|knowledge|adjustment)/i.test(cleanLine)) {
          inTichHopSection = false;
        }
        if (/^[1-4]\.\s*/i.test(cleanLine)) {
          inDisabilitySection = false;
        }

        var isKhuyetTat = inDisabilitySection || IntegrationService.isDisabilityLine(cleanLine);
        var isTichHop = inTichHopSection || /tÃ­ch\s*há»£p|nÄƒng\s*lá»±c\s*sá»‘|quyá»n\s*con\s*ngÆ°á»i|Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh|digital|human\s*rights|stem|local/i.test(cleanLine) || cleanLine.indexOf('Ná»˜I DUNG TÃCH Há»¢P') !== -1 || cleanLine.indexOf('[TÃ­ch há»£p') !== -1 || cleanLine.indexOf('(TÃ­ch há»£p)') !== -1 || cleanLine.indexOf('[Integration') !== -1;
        if (isKhuyetTat) {
          inDisabilitySection = true;
          inTichHopSection = false;
          var displayLine = cleanLine
            .replace(/<!--.*?-->/g, '')
            .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
            .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
            .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
            .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
            .replace(/\(TÃ­ch há»£p\)/gi, '')
            .replace(/^5\.\s*(?:Ä‘iá»u\s*chá»‰nh\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh\s*(?:khuyáº¿t\s*táº­t|hÃ²a\s*nháº­p)|adjustments?\s*(?:for\s*inclusive\s*students(?:\s*\(sen\))?|\(sen\)))\s*[:.-]?\s*/gi, '')
            .trim();

          if (isEnLesson) {
            displayLine = IntegrationService.sanitizeEnglishDisabilityText(displayLine, les, meta && meta.disabilityConfig);
            displayLine = IntegrationService.translateVnToEnglish(displayLine);
          }

          var parts = displayLine.split(/\r?\n|<br\s*\/?>/i).map(function(p) { return p.trim(); }).filter(Boolean);
          var htmlLines = parts.map(function(pLine) {
            if (/^5\.\s*(?:Ä‘iá»u\s*chá»‰nh\s*Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh|adjustments?\s*(?:for|\(sen\)))/i.test(pLine)) return '';
            pLine = pLine.replace(/^[-*â€¢+â€“â€”]?\s*(?:\(sen\)|sen)\s*[:.-]?\s*/i, '');
            if (isEnLesson) {
              pLine = pLine.replace(/^\*\s*(?:há»c\s*sinh|student|dáº¡ng|type)\s*(\d+)\s*:\s*(.+?)(?::|$)/i, function(m, p1, p2) {
                var rawType = p2.trim();
                var enType = rawType;
                if (/trÃ­\s*tuá»‡|cháº­m|tiáº¿p\s*thu/i.test(rawType)) enType = 'Intellectual Disability';
                else if (/váº­n\s*Ä‘á»™ng|chÃ¢n\s*tay|viáº¿t/i.test(rawType)) enType = 'Physical Disability';
                else if (/khiáº¿m\s*thÃ­nh|nghe\s*[-â€“â€”]?\s*nÃ³i/i.test(rawType)) enType = 'Hearing Impairment';
                else if (/khiáº¿m\s*thá»‹|nhÃ¬n|máº¯t/i.test(rawType)) enType = 'Visual Impairment';
                else if (/tá»±\s*k[iá»·]|adhd|tÄƒng\s*Ä‘á»™ng/i.test(rawType)) enType = 'Autism Spectrum Disorder / ADHD';
                else if (/khÃ³\s*khÄƒn\s*há»c\s*táº­p/i.test(rawType)) enType = 'Learning Difficulties';
                else if (/sen|hÃ²a\s*nháº­p|khÃ¡c/i.test(rawType)) enType = 'SEN Student';
                var rateMatch = rawType.match(/(\d+)\s*%/);
                var rateStr = rateMatch ? (' - ~' + rateMatch[1] + '%') : '';
                return '* Student ' + p1 + ' (' + enType + rateStr + '):';
              });
            } else {
              pLine = pLine.replace(/^\*\s*há»c\s*sinh\s*(\d+)\s*:\s*(.+?)(?:\s*\([^)]*má»©c\s*Ä‘á»™\s*nháº­n\s*thá»©c[^)]*\))?\s*:?\s*$/i, function(m, p1, p2) {
                return '* Dáº¡ng ' + p1 + ': ' + p2.replace(/:$/, '').trim();
              });
            }
            var isStudentSubHeader = /^\*\s*(?:há»c\s*sinh|Ä‘á»‘i\s*vá»›i\s*há»c\s*sinh|dáº¡ng\s*\d+|type\s*\d+|student\s*\d+)/i.test(pLine);
            if (isStudentSubHeader) {
              var colorCss = isEnLesson ? '' : 'color: #C00000; ';
              var spanOpen = isEnLesson ? '' : '<span style="color: #C00000; font-weight: bold;">';
              var spanClose = isEnLesson ? '' : '</span>';
              return '<p style="margin: 0pt; margin-top: 4pt; margin-bottom: 2pt; mso-para-margin: 0pt; mso-para-margin-top: 4pt; mso-para-margin-bottom: 2pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.15; font-weight: bold; ' + colorCss + 'text-align: justify;">' + spanOpen + pLine + spanClose + '</p>';
            }
            if (/^[-*â€¢+â€“â€”]?\s*nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹\s*:/i.test(pLine)) {
              pLine = pLine.replace(/^[-*â€¢+â€“â€”]?\s*nÄƒng\s*lá»±c\s*Ä‘áº·c\s*thÃ¹\s*:\s*/i, isEnLesson ? '- <b>Specific competences:</b> ' : '- <b>NÄƒng lá»±c Ä‘áº·c thÃ¹:</b> ');
            } else if (/^[-*â€¢+â€“â€”]?\s*specific\s*competences?\s*:/i.test(pLine)) {
              pLine = pLine.replace(/^[-*â€¢+â€“â€”]?\s*specific\s*competences?\s*:\s*/i, '- <b>Specific competences:</b> ');
            } else if (/^[-*â€¢+â€“â€”]?\s*pháº©m\s*cháº¥t[,\s]+nÄƒng\s*lá»±c\s*chung\s*:/i.test(pLine)) {
              pLine = pLine.replace(/^[-*â€¢+â€“â€”]?\s*pháº©m\s*cháº¥t[,\s]+nÄƒng\s*lá»±c\s*chung\s*:\s*/i, isEnLesson ? '- <b>General competences & Qualities:</b> ' : '- <b>Pháº©m cháº¥t, nÄƒng lá»±c chung:</b> ');
            } else if (/^[-*â€¢+â€“â€”]?\s*general\s*competences?\s*(?:&|and)?\s*qualit(?:y|ies)?\s*:/i.test(pLine)) {
              pLine = pLine.replace(/^[-*â€¢+â€“â€”]?\s*general\s*competences?\s*(?:&|and)?\s*qualit(?:y|ies)?\s*:\s*/i, '- <b>General competences & Qualities:</b> ');
            } else if (!pLine.startsWith('-') && !pLine.startsWith('+') && !pLine.startsWith('*')) {
              pLine = '- ' + pLine;
            }
            var bodyColorCss = isEnLesson ? '' : 'color: #C00000; ';
            var bodySpanOpen = isEnLesson ? '' : '<span style="color: #C00000;">';
            var bodySpanClose = isEnLesson ? '' : '</span>';
            return '<p style="margin: 0pt; margin-top: 2pt; margin-bottom: 2pt; mso-para-margin: 0pt; mso-para-margin-top: 2pt; mso-para-margin-bottom: 2pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.15; ' + bodyColorCss + 'text-align: justify;">' + bodySpanOpen + pLine + bodySpanClose + '</p>';
          }).filter(Boolean).join('');

          var headerHtml = '';
          if (!hasRenderedDisabilityHeader) {
            senHeaderText = isEnLesson ? senNum + '. Adjustments for inclusive students (SEN):' : senNum + '. Äiá»u chá»‰nh Ä‘á»‘i vá»›i há»c sinh hÃ²a nháº­p:';
            var headColorCss = isEnLesson ? '' : 'color: #C00000; ';
            var headSpanOpen = isEnLesson ? '' : '<span style="color: #C00000;">';
            var headSpanClose = isEnLesson ? '' : '</span>';
            headerHtml = '<p style="margin: 0pt; margin-top: 4pt; margin-bottom: 2pt; mso-para-margin: 0pt; mso-para-margin-top: 4pt; mso-para-margin-bottom: 2pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.15; font-weight: bold; ' + headColorCss + 'text-align: justify;">' + headSpanOpen + senHeaderText + headSpanClose + '</p>';
            hasRenderedDisabilityHeader = true;
          }

          return headerHtml + htmlLines;
        }
        if (isTichHop) {
          var displayLine = cleanLine
            .replace(/<!--.*?-->/g, '')
            .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
            .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
            .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
            .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
            .replace(/\(TÃ­ch há»£p\)/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
          if (isEnLesson) {
            displayLine = IntegrationService.translateVnToEnglish(displayLine);
          }
          var isSubHeader = /^[-*â€¢+â€“â€”]?\s*(?:tÃ­ch\s*há»£p\s*(?:anqp|ai|nÄƒng\s*lá»±c\s*sá»‘|stem|gdÄ‘p)|integration\b)/i.test(displayLine);
          var isCodeBullet = /^\d+(?:\.[A-Z\d]+)+(?::|\b)/i.test(displayLine);
          if (!displayLine.startsWith('-') && !displayLine.startsWith('+') && !displayLine.startsWith('*') && !isCodeBullet) {
            displayLine = '- ' + displayLine;
          }
          var extraStyle = isSubHeader ? 'font-weight: bold; ' : '';
          var colorStyle = isEnLesson ? '' : 'color: #C00000; ';
          var spanOpen = isEnLesson ? '' : '<span style="color: #C00000;">';
          var spanClose = isEnLesson ? '' : '</span>';
          return '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; ' + colorStyle + 'text-align: justify; ' + extraStyle + '">' + spanOpen + displayLine + spanClose + '</p>';
        }
        return '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">' + cleanLine + '</p>';
      }).join('');

      var dodungList = Array.isArray(les.dodung) ? les.dodung.slice() : (Array.isArray(les.teachingAids) ? les.teachingAids.slice() : []);
      if (disSupport && disSupport.enabled) {
        var disDodungLine = les.disabilityDodungAI || '';
        var hasDisDodung = dodungList.some(function(l) {
          return typeof l === 'string' && (l.toLowerCase().includes('hÃ²a nháº­p') || l.toLowerCase().includes('khuyáº¿t táº­t'));
        });
        if (!hasDisDodung && disDodungLine) {
          var splitDodung = disDodungLine.split(/\r?\n/).map(function(s) { return s.trim(); }).filter(Boolean);
          splitDodung.forEach(function(dLine) { dodungList.push(dLine); });
        }
      }
      var dodungContent = dodungList.map(function(line) {
        if (typeof line !== 'string') return '';
        if (isEnLesson) {
          line = IntegrationService.translateVnToEnglish(line);
          // Bá» dÃ²ng tiÃªu Ä‘á» B. TEACHING AIDS: / II. TEACHING AIDS: Ä‘áº§u má»¥c (vÃ¬ tiÃªu Ä‘á» pháº§n B. TEACHING AIDS: Ä‘Ã£ tá»± sinh phÃ­a trÃªn)
          if (/^\s*(?:B\.|II\.)\s*TEACHING\s*AIDS?\s*[:.-]?\s*$/i.test(line.trim())) {
            return '';
          }
        }
        var isDisability = IntegrationService.isDisabilityLine(line) || line.toLowerCase().includes('há»c sinh hÃ²a nháº­p') || line.toLowerCase().includes('khuyáº¿t táº­t') || line.toLowerCase().includes('inclusive student');
        if (isDisability) {
          var disColorCss = isEnLesson ? '' : 'color: #C00000; ';
          var disSpanOpen = isEnLesson ? '' : '<span style="color: #C00000;">';
          var disSpanClose = isEnLesson ? '' : '</span>';
          return '<p style="margin: 0pt; margin-top: 2pt; margin-bottom: 2pt; mso-para-margin: 0pt; mso-para-margin-top: 2pt; mso-para-margin-bottom: 2pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.15; ' + disColorCss + 'text-align: justify;">' + disSpanOpen + line + disSpanClose + '</p>';
        }
        var isTichHop = /tÃ­ch\s*há»£p|nÄƒng\s*lá»±c\s*sá»‘|quyá»n\s*con\s*ngÆ°á»i|Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh|digital|integration/i.test(line) || line.indexOf('[TÃ­ch há»£p') !== -1 || line.indexOf('[TÃ­ch há»£p má»›i]') !== -1 || line.indexOf('(TÃ­ch há»£p)') !== -1 || line.indexOf('Ná»˜I DUNG TÃCH Há»¢P') !== -1;
        if (isTichHop) {
          var displayLine = line
            .replace(/<!--.*?-->/g, '')
            .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
            .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
            .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
            .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
            .replace(/\(TÃ­ch há»£p\)/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
          if (isEnLesson) displayLine = IntegrationService.translateVnToEnglish(displayLine);
          if (!displayLine.startsWith('-') && !displayLine.startsWith('+') && !displayLine.startsWith('*')) {
            displayLine = '- ' + displayLine;
          }
          var thColorCss = isEnLesson ? '' : 'color: #C00000; ';
          var thSpanOpen = isEnLesson ? '' : '<span style="color: #C00000;">';
          var thSpanClose = isEnLesson ? '' : '</span>';
          return '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; ' + thColorCss + 'text-align: justify;">' + thSpanOpen + displayLine + thSpanClose + '</p>';
        }
        return '<p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">' + line + '</p>';
      }).join('');

      var actTablesHtml = '';
      if (les.tables && les.tables.length > 0) {
        les.tables.forEach(function(tableRows) {
          if (!tableRows || tableRows.length === 0) return;
          var has4Cols = tableRows.some(function(row) { return Array.isArray(row) && row.length === 4; });
          var rowsHtml = '';
          for (var rIdx = 0; rIdx < tableRows.length; rIdx++) {
            var r = tableRows[rIdx];
            if (!Array.isArray(r)) continue;
            if (rIdx === 0 && isHeaderRow(r)) continue;

            if (has4Cols) {
              if (r.length >= 4) {
                var isTichHop = /tÃ­ch\s*há»£p|nÄƒng\s*lá»±c\s*sá»‘|quyá»n\s*con\s*ngÆ°á»i|Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh|digital|integration/i.test(r[0] || '') || /tÃ­ch\s*há»£p|nÄƒng\s*lá»±c\s*sá»‘|quyá»n\s*con\s*ngÆ°á»i|Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh|digital|integration/i.test(r[2] || '') || /tÃ­ch\s*há»£p|nÄƒng\s*lá»±c\s*sá»‘|quyá»n\s*con\s*ngÆ°á»i|Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh|digital|integration/i.test(r[3] || '') || (r[0] || '').indexOf('Ná»˜I DUNG TÃCH Há»¢P') !== -1 || (r[2] || '').indexOf('Ná»˜I DUNG TÃCH Há»¢P') !== -1 || (r[3] || '').indexOf('Ná»˜I DUNG TÃCH Há»¢P') !== -1 || (r[0] || '').indexOf('[TÃ­ch há»£p') !== -1 || (r[2] || '').indexOf('[TÃ­ch há»£p') !== -1 || (r[3] || '').indexOf('[TÃ­ch há»£p') !== -1;
                var isDisability = IntegrationService.isDisabilityRow(r);
                var isRed = false; // Disable whole-cell red coloring
                var c0 = (r[0] || '').replace(/<!--.*?-->/g, '').replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '').replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '').replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '').replace(/^\[TÃ­ch há»£p\]\s*/i, '').replace(/\(TÃ­ch há»£p\)/gi, '').replace(/\s{2,}/g, ' ').trim();
                var c1 = (r[1] || '').trim();
                var c2 = (r[2] || '').replace(/<!--.*?-->/g, '').replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '').replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '').replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '').replace(/^\[TÃ­ch há»£p\]\s*/i, '').replace(/\(TÃ­ch há»£p\)/gi, '').replace(/\s{2,}/g, ' ').trim();
                var c3 = (r[3] || '').replace(/<!--.*?-->/g, '').replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '').replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '').replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '').replace(/^\[TÃ­ch há»£p\]\s*/i, '').replace(/\(TÃ­ch há»£p\)/gi, '').replace(/\s{2,}/g, ' ').trim();
                if (isEnLesson) {
                  c0 = IntegrationService.translateVnToEnglish(c0);
                  c1 = IntegrationService.translateVnToEnglish(c1);
                  c2 = IntegrationService.translateVnToEnglish(c2);
                  c3 = IntegrationService.translateVnToEnglish(c3);
                }

                var c0Html = IntegrationService.formatCellParagraphs(c0, false, 'justify', isEnLesson);
                var c1Html = IntegrationService.formatCellParagraphs(c1, false, 'center', isEnLesson);
                var c2Html = IntegrationService.formatCellParagraphs(c2, false, 'justify', isEnLesson);
                var c3Html = IntegrationService.formatCellParagraphs(c3, false, 'justify', isEnLesson);

                rowsHtml += `
                  <tr>
                    <td style="width: 30%; vertical-align: top; padding: 3.5pt 5pt; border: 1pt solid #000; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">
                      ${c0Html}
                    </td>
                    <td style="width: 15%; vertical-align: top; text-align: center; padding: 3.5pt 5pt; border: 1pt solid #000; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
                      ${c1Html}
                    </td>
                    <td style="width: 30%; vertical-align: top; padding: 3.5pt 5pt; border: 1pt solid #000; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">
                      ${c2Html}
                    </td>
                    <td style="width: 25%; vertical-align: top; padding: 3.5pt 5pt; border: 1pt solid #000; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">
                      ${c3Html}
                    </td>
                  </tr>
                `;
              } else if (r.length === 1) {
                var rawHeader = r[0] || '';
                var cleanHeader = rawHeader.replace(/<!--.*?-->/g, '').replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '').replace(/^\[TÃ­ch há»£p\]\s*/i, '').trim();
                if (isEnLesson) cleanHeader = IntegrationService.translateVnToEnglish(cleanHeader);
                var isTietRow = /^tiáº¿t\s+\d+|period\s+\d+/i.test(cleanHeader);
                var isActivityRow = /^\d+\.\s*(?:khá»Ÿi Ä‘á»™ng|khÃ¡m phÃ¡|luyá»‡n táº­p|hoáº¡t Ä‘á»™ng|váº­n dá»¥ng|trÃ² chÆ¡i|cá»§ng cá»‘|warm-up|presentation|practice|production|consolidation|game|activity)/i.test(cleanHeader);
                var isPureIntegration = !isTietRow && !isActivityRow && (/^\s*\*\s*(?:hoáº¡t\s*Ä‘á»™ng\s*váº­n\s*dá»¥ng\s*:?\s*)?tÃ­ch\s*há»£p/i.test(cleanHeader) || /Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh/i.test(cleanHeader) || rawHeader.indexOf('[Ná»˜I DUNG TÃCH Há»¢P') !== -1 || rawHeader.indexOf('[TÃ­ch há»£p') !== -1);
                var rowBgColor = isTietRow ? '#FFF2CC' : (isActivityRow ? '#D9EAF7' : '#f8fafc');
                var cellHeaderColorStyle = (isPureIntegration && !isEnLesson) ? 'color: #C00000;' : '';
                var formattedHeader = IntegrationService.formatHeaderContentWithIntegration(cleanHeader, isPureIntegration, isEnLesson);
                rowsHtml += `<tr><td colspan="4" style="padding: 3.5pt 5pt; border: 1pt solid #000; background-color: ${rowBgColor}; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; text-align: left; ${cellHeaderColorStyle}"><div style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; text-align: left; ${cellHeaderColorStyle}">${formattedHeader}</div></td></tr>`;
              } else if (r.length === 2) {
                var c0Html = IntegrationService.formatCellParagraphs(isEnLesson ? IntegrationService.translateVnToEnglish(r[0] || '') : (r[0] || ''), false, 'left', isEnLesson);
                var c1Html = IntegrationService.formatCellParagraphs(isEnLesson ? IntegrationService.translateVnToEnglish(r[1] || '') : (r[1] || ''), false, 'left', isEnLesson);
                rowsHtml += `<tr><td colspan="2" style="padding: 3.5pt 5pt; border: 1pt solid #000; background-color: #f8fafc; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">${c0Html}</td><td colspan="2" style="padding: 3.5pt 5pt; border: 1pt solid #000; background-color: #f8fafc; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt;">${c1Html}</td></tr>`;
              }
            } else {
              if (r.length >= 2) {
                var gvText = (r[0] || '')
                  .replace(/<!--.*?-->/g, '')
                  .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
                  .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
                  .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
                  .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
                  .replace(/\(TÃ­ch há»£p\)/gi, '')
                  .replace(/\s{2,}/g, ' ')
                  .trim();
                var hsText = (r[1] || '')
                  .replace(/<!--.*?-->/g, '')
                  .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
                  .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
                  .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
                  .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
                  .replace(/\(TÃ­ch há»£p\)/gi, '')
                  .replace(/\s{2,}/g, ' ')
                  .trim();

                if (isEnLesson) {
                  gvText = IntegrationService.translateVnToEnglish(gvText);
                  hsText = IntegrationService.translateVnToEnglish(hsText);
                }

                var gvHtml = IntegrationService.formatCellParagraphs(gvText, false, 'justify', isEnLesson);
                var hsHtml = IntegrationService.formatCellParagraphs(hsText, false, 'justify', isEnLesson);

                rowsHtml += `
                  <tr>
                    <td style="width: 50%; vertical-align: top; padding: 3.5pt 5pt; border: 1pt solid #000; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">
                      ${gvHtml}
                    </td>
                    <td style="width: 50%; vertical-align: top; padding: 3.5pt 5pt; border: 1pt solid #000; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">
                      ${hsHtml}
                    </td>
                  </tr>
                `;
              } else if (r.length === 1) {
                var rawHeader = r[0] || '';
                var cleanHeader = rawHeader
                  .replace(/<!--.*?-->/g, '')
                  .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
                  .replace(/\[?Ná»˜I DUNG TÃCH Há»¢P\]?:?\s*/gi, '')
                  .replace(/\[?TÃCH Há»¢P Má»šI\]?:?\s*/gi, '')
                  .replace(/^\[TÃ­ch há»£p\]\s*/i, '')
                  .replace(/\(TÃ­ch há»£p\)/gi, '')
                  .replace(/\s{2,}/g, ' ')
                  .trim();
                if (isEnLesson) cleanHeader = IntegrationService.translateVnToEnglish(cleanHeader);
                var isTietRow = /^tiáº¿t\s+\d+|period\s+\d+/i.test(cleanHeader);
                var isActivityRow = /^\d+\.\s*(?:khá»Ÿi Ä‘á»™ng|khÃ¡m phÃ¡|luyá»‡n táº­p|hoáº¡t Ä‘á»™ng|váº­n dá»¥ng|trÃ² chÆ¡i|cá»§ng cá»‘|warm-up|presentation|practice|production|consolidation|game|activity)/i.test(cleanHeader);
                var isPureIntegration = !isTietRow && !isActivityRow && (/^\s*\*\s*(?:hoáº¡t\s*Ä‘á»™ng\s*váº­n\s*dá»¥ng\s*:?\s*)?tÃ­ch\s*há»£p/i.test(cleanHeader) || /Ä‘á»‹a\s*phÆ°Æ¡ng|gdÄ‘p|trÃ \s*vinh/i.test(cleanHeader) || rawHeader.indexOf('[Ná»˜I DUNG TÃCH Há»¢P') !== -1 || rawHeader.indexOf('[TÃ­ch há»£p') !== -1);
                var rowBgColor = isTietRow ? '#FFF2CC' : (isActivityRow ? '#D9EAF7' : '#f8fafc');
                var cellHeaderColorStyle = (isPureIntegration && !isEnLesson) ? 'color: #C00000;' : '';
                var formattedHeader = IntegrationService.formatHeaderContentWithIntegration(cleanHeader, isPureIntegration, isEnLesson);
                rowsHtml += `<tr><td colspan="2" style="padding: 3.5pt 5pt; border: 1pt solid #000; background-color: ${rowBgColor}; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; margin: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; text-align: left; ${cellHeaderColorStyle}"><div style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; text-align: left; ${cellHeaderColorStyle}">${formattedHeader}</div></td></tr>`;
              }
            }
          }


          if (rowsHtml) {
            if (has4Cols) {
              var th0 = isEnLesson ? 'CONTENT' : 'Ná»˜I DUNG';
              var th1 = isEnLesson ? 'TIMING' : 'Äá»ŠNH LÆ¯á»¢NG';
              var th2 = isEnLesson ? "TEACHER'S ACTIVITIES" : 'HOáº T Äá»˜NG Cá»¦A GIÃO VIÃŠN';
              var th3 = isEnLesson ? "STUDENTS' ACTIVITIES" : 'HOáº T Äá»˜NG Cá»¦A Há»ŒC SINH';
              actTablesHtml += `
                <table class="table-activity">
                  <thead>
                    <tr>
                      <th style="width: 30%; background-color: #1F4E79; color: #ffffff; font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt 6pt;">${th0}</th>
                      <th style="width: 15%; background-color: #1F4E79; color: #ffffff; font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt 6pt;">${th1}</th>
                      <th style="width: 30%; background-color: #1F4E79; color: #ffffff; font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt 6pt;">${th2}</th>
                      <th style="width: 25%; background-color: #1F4E79; color: #ffffff; font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt 6pt;">${th3}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rowsHtml}
                  </tbody>
                </table>
              `;
            } else {
              var th0 = isEnLesson ? "TEACHER'S ACTIVITIES" : 'HOáº T Äá»˜NG Cá»¦A GIÃO VIÃŠN';
              var th1 = isEnLesson ? "STUDENTS' ACTIVITIES" : 'HOáº T Äá»˜NG Cá»¦A Há»ŒC SINH';
              actTablesHtml += `
                <table class="table-activity">
                  <thead>
                    <tr>
                      <th style="width: 50%; background-color: #1F4E79; color: #ffffff; font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt 6pt;">${th0}</th>
                      <th style="width: 50%; background-color: #1F4E79; color: #ffffff; font-weight: bold; text-align: center; border: 1pt solid #000; padding: 4pt 6pt;">${th1}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rowsHtml}
                  </tbody>
                </table>
              `;
            }
          }
        });
      }

      var weekText = '';
      if (meta.startWeek && meta.endWeek && String(meta.startWeek) !== String(meta.endWeek)) {
        weekText = meta.startWeek + ' - ' + meta.endWeek;
      } else if (meta.startWeek) {
        weekText = meta.startWeek;
      } else if (les.week) {
        weekText = les.week;
      } else if (meta.weekNum) {
        weekText = meta.weekNum;
      } else if (meta.filename) {
        var mWeek = meta.filename.match(/Tuan[_\s]*(\d+)(?:[-_](\d+))?/i);
        if (mWeek) {
          weekText = mWeek[2] ? (mWeek[1] + ' - ' + mWeek[2]) : mWeek[1];
        }
      }
      if (!weekText) weekText = '1';

      var headerBlock = '';
      if (lIdx === 0) {
        if (isDocEn) {
          var depText = displayDepartment ? `<p style="text-align: left; margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="left">Department: <b>${displayDepartment}</b></p>` : '';
          var classOrGradeText = (meta.role === 'gvbm' && les.classes)
            ? ('<b>English</b> â€¢ ')
            : (className ? ('<b>' + className.replace(/^lá»›p\s*/i, 'Class ') + '</b> â€¢ ') : ('Grade: <b>' + (les.grade || grade) + '</b> â€¢ '));
          headerBlock = `
            <table class="header-table">
              <tr>
                <td style="width: 50%; text-align: left;" align="left">
                  <p style="text-align: left; margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="left"><b>${displaySchoolName}</b></p>
                  ${depText}
                  <p style="text-align: left; margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="left">Teacher: <b>${displayTeacherName || '.................................'}</b></p>
                </td>
                <td style="width: 50%; text-align: right;" align="right">
                  <p style="text-align: right; margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="right"><b>SCHOOL YEAR: ${schoolYear}</b></p>
                  <p style="text-align: right; margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="right">${classOrGradeText}Week: <b>${weekText}</b></p>
                </td>
              </tr>
            </table>
          `;
        } else {
          var depText = department ? `<p style="text-align: left; margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="left">Tá»• chuyÃªn mÃ´n: <b>${department}</b></p>` : '';
          headerBlock = `
            <table class="header-table">
              <tr>
                <td style="width: 50%; text-align: left;" align="left">
                  <p style="text-align: left; margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="left"><b>${schoolName}</b></p>
                  ${depText}
                  <p style="text-align: left; margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="left">GiÃ¡o viÃªn: <b>${teacherName || '.................................'}</b></p>
                </td>
                <td style="width: 50%; text-align: right;" align="right">
                  <p style="text-align: right; margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="right"><b>NÄ‚M Há»ŒC: ${schoolYear}</b></p>
                  <p style="text-align: right; margin: 2pt 0 0 0; margin-top: 2pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;" align="right">${(meta.role === 'gvbm' && les.classes) ? ('<b>' + (les.subjectName || IntegrationService.getSubjectDisplayName(les.subjectKey) || subjName) + '</b> â€¢ ') : (className ? ('<b>' + className + '</b> â€¢ ') : ('Khá»‘i: <b>' + (les.grade || grade) + '</b> â€¢ '))}Tuáº§n: <b>${weekText}</b></p>
                </td>
              </tr>
            </table>
          `;
        }
      }

      var subjName = les.subjectName || meta.subjectName || (les.subjectKey ? IntegrationService.getSubjectDisplayName(les.subjectKey) : '') || (meta.subjectKey ? IntegrationService.getSubjectDisplayName(meta.subjectKey) : '') || '';
      if (isEnLesson) {
        subjName = 'English';
      } else if (!subjName) {
        var checkStr = (meta.filename || '') + ' ' + (les.sourceFile || '') + ' ' + (meta.title || '');
        if (/lich_su_dia_ly|LSÄL|Lá»‹ch sá»­/i.test(checkStr)) subjName = 'Lá»‹ch sá»­ vÃ  Äá»‹a lÃ­';
        else if (/toan/i.test(checkStr)) subjName = 'ToÃ¡n';
        else if (/tieng_viet|TV/i.test(checkStr)) subjName = 'Tiáº¿ng Viá»‡t';
        else if (/khoa_hoc/i.test(checkStr)) subjName = 'Khoa há»c';
        else if (/dao_duc/i.test(checkStr)) subjName = 'Äáº¡o Ä‘á»©c';
        else if (/tin_hoc/i.test(checkStr)) subjName = 'Tin há»c';
        else if (/cong_nghe/i.test(checkStr)) subjName = 'CÃ´ng nghá»‡';
        else if (/hdtn/i.test(checkStr)) subjName = 'Hoáº¡t Ä‘á»™ng tráº£i nghiá»‡m';
        else if (/am_nhac|Ã¢m nháº¡c/i.test(checkStr)) subjName = 'Ã‚m nháº¡c';
        else if (/my_thuat/i.test(checkStr)) subjName = 'MÄ© thuáº­t';
        else if (/gdtc|gd_the_chat|thá»ƒ cháº¥t/i.test(checkStr)) subjName = 'GiÃ¡o dá»¥c thá»ƒ cháº¥t';
        else subjName = 'Lá»‹ch sá»­ vÃ  Äá»‹a lÃ­';
      }

      var rawTitle = les.lessonTitle || les.title || (isEnLesson ? 'LESSON' : 'BÃ€I Dáº Y');
      var cleanLessonTitle = IntegrationService.cleanLessonTitle(rawTitle, les, subjName);

      if (isEnLesson) {
        cleanLessonTitle = IntegrationService.translateVnToEnglish(cleanLessonTitle);
      }

      // PhÃ²ng há»™ Ä‘a táº§ng: tuyá»‡t Ä‘á»‘i khÃ´ng Ä‘á»ƒ tiÃªu Ä‘á» bÃ i trÃ¹ng trÆ¡ trá»i tÃªn mÃ´n há»c
      if (cleanLessonTitle && cleanLessonTitle.trim().toUpperCase() === subjName.trim().toUpperCase()) {
        if (les.topic) cleanLessonTitle = les.topic;
        else if (les.period) cleanLessonTitle = subjName + ' (' + les.period + ')';
      }

      if (dateStr && /ngÃ y\s*thá»±c\s*hiá»‡n\s*:\s*[.\s_]{3,}/i.test(cleanLessonTitle)) {
        cleanLessonTitle = cleanLessonTitle.replace(/ngÃ y\s*thá»±c\s*hiá»‡n\s*:\s*[.\s_]{3,}/i, isEnLesson ? ('Date: ' + dateStr) : ('NgÃ y thá»±c hiá»‡n: ' + dateStr));
      }

      var titleHeader = isEnLesson ? 'LESSON PLAN' : 'Káº¾ HOáº CH BÃ€I Dáº Y';
      var titleSubject = isEnLesson
        ? ('SUBJECT: ENGLISH - GRADE ' + (les.grade || grade) + (les.classes ? (' (Classes: ' + les.classes + ')') : (les.className ? (' (Class: ' + les.className.replace(/^lá»›p\s*/i, '') + ')') : '')))
        : ('MÃ”N: ' + subjName.toUpperCase() + ((meta.role === 'gvbm' || les.grade) ? (' - KHá»I ' + (les.grade || grade)) : '') + (les.classes ? (' (Dáº¡y cÃ¡c lá»›p: ' + les.classes + ')') : (les.className ? (' (' + (les.className.toLowerCase().includes('lá»›p') ? les.className : ('Lá»›p ' + les.className)) + ')') : '')));

      var periodText = les.period ? (isEnLesson ? IntegrationService.translateVnToEnglish(String(les.period)) : String(les.period)) : '';
      if (periodText && cleanLessonTitle.toLowerCase().includes(periodText.toLowerCase())) {
        periodText = '';
      }

      if (lIdx === 0 || !isContinuousMode) {
        docHtml += `
          <div class="title-box" style="text-align: center; font-family: 'Times New Roman', serif;">
            ${headerBlock}
            ${daySessionInfo}
            <h2 align="center" style="font-family: 'Times New Roman', serif; font-size: 14pt; font-weight: bold; text-transform: uppercase; text-align: center; margin: 0pt; line-height: 1.0;">${titleHeader}</h2>
            <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; margin: 2pt 0 0 0; text-align: center; line-height: 1.0;">${titleSubject}</p>
            <p align="center" style="font-family: 'Times New Roman', serif; font-size: 14pt; font-weight: bold; margin-top: 4pt; margin-bottom: 0pt; text-align: center; line-height: 1.0; color: #1e3a8a;">${cleanLessonTitle}</p>
            ${periodText ? ('<p align="center" style="font-family: \'Times New Roman\', serif; font-size: 13pt; font-style: italic; margin-top: 2pt; margin-bottom: 0pt; text-align: center; line-height: 1.0;">(' + periodText + ')</p>') : ''}
          </div>
        `;
      } else {
        docHtml += `
          <div class="title-box" style="margin-top: 10pt; margin-bottom: 4pt; text-align: center; font-family: 'Times New Roman', serif;">
            ${daySessionInfo}
            <p align="center" style="font-family: 'Times New Roman', serif; font-size: 14pt; font-weight: bold; margin-top: 4pt; margin-bottom: 0pt; text-align: center; line-height: 1.0; color: #1e3a8a;">${cleanLessonTitle}</p>
            ${periodText ? ('<p align="center" style="font-family: \'Times New Roman\', serif; font-size: 13pt; font-style: italic; margin-top: 2pt; margin-bottom: 0pt; text-align: center; line-height: 1.0;">(' + periodText + ')</p>') : ''}
          </div>
        `;
      }

      var sec1Title = isEnLesson ? 'A. OBJECTIVES:' : 'I. YÃŠU Cáº¦U Cáº¦N Äáº T:';
      var sec2Title = isEnLesson ? 'B. TEACHING AIDS:' : 'II. Äá»’ DÃ™NG Dáº Y Há»ŒC:';
      var sec3Title = isEnLesson ? 'C. PROCEDURES:' : 'III. CÃC HOáº T Äá»˜NG Dáº Y Há»ŒC CHá»¦ Yáº¾U:';
      var sec4Title = isEnLesson ? 'D. ADJUSTMENTS (IF ANY):' : 'IV. ÄIá»€U CHá»ˆNH SAU BÃ€I Dáº Y (Náº¾U CÃ“):';

      var sec1Fallback = isEnLesson ? 'According to the curriculum.' : 'Theo quy Ä‘á»‹nh cá»§a chÆ°Æ¡ng trÃ¬nh mÃ´n há»c.';
      var sec2Fallback = isEnLesson ? '1. Teacher: Textbook, laptop, TV/projector.<br>2. Students: Textbooks, notebooks, school things.' : '1. GiÃ¡o viÃªn: SGK, mÃ¡y tÃ­nh, bÃ i giáº£ng Ä‘iá»‡n tá»­.<br>2. Há»c sinh: SGK, vá»Ÿ bÃ i táº­p, Ä‘á»“ dÃ¹ng há»c táº­p.';
      var sec3Fallback = isEnLesson ? 'Follow the standard lesson procedure.' : 'Thá»±c hiá»‡n theo tiáº¿n trÃ¬nh chuáº©n cá»§a bÃ i dáº¡y.';

      docHtml += `
        <div class="section-title">${sec1Title}</div>
        <div style="margin-left: 10pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
          ${yccdContent || ('<p style="margin: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0;">' + sec1Fallback + '</p>')}
        </div>

        <div class="section-title">${sec2Title}</div>
        <div style="margin-left: 10pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
          ${dodungContent || ('<p style="margin: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0;">' + sec2Fallback + '</p>')}
        </div>

        <div class="section-title">${sec3Title}</div>
        <div style="margin-left: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
          ${actTablesHtml || ('<p style="margin: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0;">' + sec3Fallback + '</p>')}
        </div>

        <div class="section-title">${sec4Title}</div>
        <div style="margin-left: 10pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
          <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; white-space: nowrap; overflow: hidden;">${'.'.repeat(130)}</p>
          <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; white-space: nowrap; overflow: hidden;">${'.'.repeat(130)}</p>
          <p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; mso-para-margin-top: 0pt; mso-para-margin-bottom: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; white-space: nowrap; overflow: hidden;">${'.'.repeat(130)}</p>
        </div>
      `;
    });

    // KHUNG DUYá»†T GIÃO ÃN CHUáº¨N THEO FILE DUYá»†T.DOCX Cá»¦A TRÆ¯á»œNG
    var ap = (meta && meta.approvalConfig) || (typeof integrationState !== 'undefined' && integrationState.approvalConfig) || null;
    var showApproval = ap ? (ap.enabled === true) : false;

    if (showApproval) {
      if (isDocEn) {
        var leaderRoleTitle = (ap.leaderRole === 'P.Tá»• trÆ°á»Ÿng' || (ap.leaderRole && ap.leaderRole.indexOf('PhÃ³') !== -1)) 
          ? 'VICE HEAD OF DEPARTMENT' 
          : 'HEAD OF DEPARTMENT';
        var leaderSignName = (ap.leaderName && ap.leaderName.trim()) 
          ? IntegrationService.removeVietnameseTones(ap.leaderName.trim()) 
          : 'â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦.';

        var adminRoleTitle = (ap.adminRole === 'P.Hiá»‡u trÆ°á»Ÿng' || (ap.adminRole && ap.adminRole.indexOf('PhÃ³') !== -1))
          ? 'VICE PRINCIPAL'
          : 'PRINCIPAL';
        var adminSignName = (ap.adminName && ap.adminName.trim()) 
          ? IntegrationService.removeVietnameseTones(ap.adminName.trim()) 
          : 'â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦..';

        var teacherSignName = displayTeacherName || 'â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦';

        docHtml += `
          <!-- ========================================================================= -->
          <!-- APPROVAL PAGE IN ENGLISH -->
          <!-- ========================================================================= -->
          <br clear="all" style="page-break-before: always; mso-break-type: section-break;" />
          <p class="MsoNormal" style="page-break-before: always; margin: 0pt; mso-para-margin: 0pt; font-size: 1pt; line-height: 1pt; height: 1pt; mso-margin-top-alt: 0pt; mso-margin-bottom-alt: 0pt;">&nbsp;</p>

          <div class="approval-page" style="page-break-inside: avoid; margin-top: 0pt; font-family: 'Times New Roman', serif;">
            <table class="approval-table" style="width: 100%; border-collapse: collapse; border: 1.5pt solid #000000; mso-border-alt: solid black 1.5pt; page-break-inside: avoid; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;">
              <tr style="page-break-inside: avoid; mso-element: table-row;">
                <td align="center" style="border: 1.0pt solid #000000; mso-border-alt: solid black 1.0pt; text-align: center; vertical-align: top; padding: 10pt 8pt; page-break-inside: avoid; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">TEACHER</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${teacherSignName}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                </td>
              </tr>
              <tr style="page-break-inside: avoid; mso-element: table-row;">
                <td align="center" style="border: 1.0pt solid #000000; mso-border-alt: solid black 1.0pt; text-align: center; vertical-align: top; padding: 10pt 8pt; page-break-inside: avoid; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${leaderRoleTitle}</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 2pt 0 0 0; mso-para-margin-top: 2pt; line-height: 1.0; text-align: center;">APPROVED</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${leaderSignName}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                </td>
              </tr>
              <tr style="page-break-inside: avoid; mso-element: table-row;">
                <td align="center" style="border: 1.0pt solid #000000; mso-border-alt: solid black 1.0pt; text-align: center; vertical-align: top; padding: 10pt 8pt; page-break-inside: avoid; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">SCHOOL BOARD</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 2pt 0 0 0; mso-para-margin-top: 2pt; line-height: 1.0; text-align: center;">APPROVED</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 2pt 0 0 0; mso-para-margin-top: 2pt; line-height: 1.0; text-align: center;">${adminRoleTitle}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${adminSignName}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                </td>
              </tr>
            </table>
          </div>
        `;
      } else {
        var leaderRoleTitle = (ap.leaderRole === 'P.Tá»• trÆ°á»Ÿng' || (ap.leaderRole && ap.leaderRole.indexOf('PhÃ³') !== -1)) 
          ? 'PHÃ“ Tá»” TRÆ¯á»žNG CHUYÃŠN MÃ”N' 
          : 'Tá»” TRÆ¯á»žNG CHUYÃŠN MÃ”N';
        var leaderSignName = (ap.leaderName && ap.leaderName.trim()) ? ap.leaderName.trim() : 'â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦.';

        var adminRoleTitle = (ap.adminRole === 'P.Hiá»‡u trÆ°á»Ÿng' || (ap.adminRole && ap.adminRole.indexOf('PhÃ³') !== -1))
          ? 'PHÃ“ HIá»†U TRÆ¯á»žNG'
          : 'HIá»†U TRÆ¯á»žNG';
        var adminSignName = (ap.adminName && ap.adminName.trim()) ? ap.adminName.trim() : 'â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦..';

        docHtml += `
          <!-- ========================================================================= -->
          <!-- TRANG RIÃŠNG DUYá»†T GIÃO ÃN - ÄÃ“NG KHUNG THEO CHUáº¨N DUYá»†T.DOCX Cá»¦A TRÆ¯á»œNG -->
          <!-- ========================================================================= -->
          <br clear="all" style="page-break-before: always; mso-break-type: section-break;" />
          <p class="MsoNormal" style="page-break-before: always; margin: 0pt; mso-para-margin: 0pt; font-size: 1pt; line-height: 1pt; height: 1pt; mso-margin-top-alt: 0pt; mso-margin-bottom-alt: 0pt;">&nbsp;</p>

          <div class="approval-page" style="page-break-inside: avoid; margin-top: 0pt; font-family: 'Times New Roman', serif;">
            <table class="approval-table" style="width: 100%; border-collapse: collapse; border: 1.5pt solid #000000; mso-border-alt: solid black 1.5pt; page-break-inside: avoid; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt;">
              <tr style="page-break-inside: avoid; mso-element: table-row;">
                <td align="center" style="border: 1.0pt solid #000000; mso-border-alt: solid black 1.0pt; text-align: center; vertical-align: top; padding: 10pt 8pt; page-break-inside: avoid; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">GIÃO VIÃŠN SOáº N</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${teacherName || 'â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦â€¦'}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                </td>
              </tr>
              <tr style="page-break-inside: avoid; mso-element: table-row;">
                <td align="center" style="border: 1.0pt solid #000000; mso-border-alt: solid black 1.0pt; text-align: center; vertical-align: top; padding: 10pt 8pt; page-break-inside: avoid; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${leaderRoleTitle}</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 2pt 0 0 0; mso-para-margin-top: 2pt; line-height: 1.0; text-align: center;">DUYá»†T</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${leaderSignName}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                </td>
              </tr>
              <tr style="page-break-inside: avoid; mso-element: table-row;">
                <td align="center" style="border: 1.0pt solid #000000; mso-border-alt: solid black 1.0pt; text-align: center; vertical-align: top; padding: 10pt 8pt; page-break-inside: avoid; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0;">
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">BAN GIÃM HIá»†U</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 2pt 0 0 0; mso-para-margin-top: 2pt; line-height: 1.0; text-align: center;">DUYá»†T</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 2pt 0 0 0; mso-para-margin-top: 2pt; line-height: 1.0; text-align: center;">${adminRoleTitle}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                  <p align="center" style="font-family: 'Times New Roman', serif; font-size: 13pt; font-weight: bold; margin: 0pt; mso-para-margin: 0pt; line-height: 1.0; text-align: center;">${adminSignName}</p>
                  <p align="center" style="margin: 0pt; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.0; mso-para-margin: 0pt; text-align: center;">&nbsp;</p>
                </td>
              </tr>
            </table>
          </div>
        `;
      }
    }

    docHtml += '</div></body></html>';
    return docHtml;
  },

  /**
   * Chuáº©n hÃ³a vÃ  lÃ m sáº¡ch mÃ£ HTML trÆ°á»›c khi Ä‘Ã³ng gÃ³i Word .docx
   */
  sanitizeHtmlForWordDocx: function(html) {
    if (!html) return '';
    // 1. Loáº¡i bá» triá»‡t Ä‘á»ƒ text-justify: inter-ideograph (ngÄƒn Word giÃ£n khoáº£ng cÃ¡ch kÃ½ tá»± báº¥t thÆ°á»ng)
    var cleaned = html.replace(/text-justify\s*:\s*inter-ideograph\s*;?/gi, '');

    // 2. Chuyá»ƒn Ä‘á»•i cÃ¡c ngáº¯t dÃ²ng má»m <br/> trong Ã´ báº£ng (td, th) thÃ nh Ä‘oáº¡n <p> chuáº©n
    // NgÄƒn cháº·n 100% lá»—i Word giÃ£n cÃ¡ch tá»« ngá»¯ dÃ n tráº£i hai biÃªn (lá»—i cÄƒn chá»¯/giÃ£n chá»¯ khi cÃ³ Shift+Enter)
    cleaned = cleaned.replace(/(<(?:td|th)\b[^>]*>)([\s\S]*?)(<\/(?:td|th)>)/gi, function(match, openTag, body, closeTag) {
      var cellOpen = openTag.replace(/text-justify\s*:\s*inter-ideograph\s*;?/gi, '');
      var cellBody = body.replace(/text-justify\s*:\s*inter-ideograph\s*;?/gi, '');

      if (/<br\s*\/?>/i.test(cellBody)) {
        if (/<div\b/i.test(cellBody)) {
          cellBody = cellBody.replace(/<div\b([^>]*)>/gi, '<p$1>').replace(/<\/div>/gi, '</p>');
        }
        cellBody = cellBody.replace(/<br\s*\/?>/gi, '</p><p style="margin: 0pt; margin-top: 0pt; margin-bottom: 0pt; mso-para-margin: 0pt; font-family: \'Times New Roman\', serif; font-size: 13pt; line-height: 1.0; text-align: justify;">');
      }
      return cellOpen + cellBody + closeTag;
    });

    return cleaned;
  },

  /**
   * TrÃ­ch xuáº¥t kÃ­ch thÆ°á»›c gá»‘c (width, height) tá»« chuá»—i Base64 cá»§a áº£nh (PNG, JPEG, GIF)
   */
  getImageDimensionsFromBase64: function(base64Data) {
    try {
      var raw = '';
      if (typeof atob === 'function') {
        raw = atob(base64Data.substring(0, 4000));
      } else if (typeof Buffer !== 'undefined') {
        raw = Buffer.from(base64Data.substring(0, 4000), 'base64').toString('binary');
      }
      if (!raw || raw.length < 24) return null;
      // PNG (header 0x89504E47)
      if (raw.charCodeAt(0) === 0x89 && raw.charCodeAt(1) === 0x50 && raw.charCodeAt(2) === 0x4E && raw.charCodeAt(3) === 0x47) {
        var w = ((raw.charCodeAt(16) & 0xff) << 24) | ((raw.charCodeAt(17) & 0xff) << 16) | ((raw.charCodeAt(18) & 0xff) << 8) | (raw.charCodeAt(19) & 0xff);
        var h = ((raw.charCodeAt(20) & 0xff) << 24) | ((raw.charCodeAt(21) & 0xff) << 16) | ((raw.charCodeAt(22) & 0xff) << 8) | (raw.charCodeAt(23) & 0xff);
        return { width: (w >>> 0), height: (h >>> 0) };
      }
      // JPEG (header 0xFFD8)
      if (raw.charCodeAt(0) === 0xFF && raw.charCodeAt(1) === 0xD8) {
        var offset = 2;
        while (offset < raw.length - 8) {
          if (raw.charCodeAt(offset) === 0xFF) {
            var marker = raw.charCodeAt(offset + 1);
            if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
              var h = (raw.charCodeAt(offset + 5) << 8) | raw.charCodeAt(offset + 6);
              var w = (raw.charCodeAt(offset + 7) << 8) | raw.charCodeAt(offset + 8);
              return { width: w, height: h };
            }
            var len = (raw.charCodeAt(offset + 2) << 8) | raw.charCodeAt(offset + 3);
            offset += 2 + len;
          } else {
            offset++;
          }
        }
      }
      // GIF (header GIF87a / GIF89a)
      if (raw.charCodeAt(0) === 0x47 && raw.charCodeAt(1) === 0x49 && raw.charCodeAt(2) === 0x46) {
        var w = raw.charCodeAt(6) | (raw.charCodeAt(7) << 8);
        var h = raw.charCodeAt(8) | (raw.charCodeAt(9) << 8);
        return { width: w, height: h };
      }
    } catch(e) {}
    return null;
  },

  /**
   * Äá»c 1 áº£nh (data URI / file cá»¥c bá»™ Node / URL trÃ¬nh duyá»‡t) -> { b64, mime }. KhÃ´ng nÃ©m lá»—i: tháº¥t báº¡i tráº£ b64 = null.
   */
  _readImageAsBase64: async function(url) {
    var mimeType = 'image/png';
    var rawB64 = null;
    try {

        if (url.startsWith('data:image/')) {
          var dataParts = url.split(',');
          var meta = dataParts[0] || '';
          rawB64 = dataParts[1] || '';
          var mMatch = meta.match(/data:([^;]+)/);
        } else if (typeof require === 'function') {
          try {
            var _fs = require('fs');
            var _cleanUrl = url.split('?')[0].split('#')[0];
            if (_fs.existsSync(_cleanUrl)) {
              var fileBuf = _fs.readFileSync(_cleanUrl);
              rawB64 = fileBuf.toString('base64');
              var ext = _cleanUrl.split('.').pop().toLowerCase();
              if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
              else if (ext === 'png') mimeType = 'image/png';
              else if (ext === 'gif') mimeType = 'image/gif';
              else if (ext === 'webp') mimeType = 'image/webp';
            }
          } catch(e) {}
        }
        if (!rawB64) {
          if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
            try {
              var response = await fetch(url);
              if (response.ok) {
                var blob = await response.blob();
                if (blob.type) mimeType = blob.type;
                var dataUrl = await new Promise(function(resolve) {
                  var reader = new FileReader();
                  reader.onloadend = function() { resolve(reader.result); };
                  reader.readAsDataURL(blob);
                });
                if (dataUrl && dataUrl.indexOf(',') !== -1) {
                  rawB64 = dataUrl.split(',')[1];
                }
              }
            } catch(fetchCatch) {}

            if (!rawB64 && typeof document !== 'undefined') {
              try {
                var canvasDataUrl = await new Promise(function(resolve) {
                  var img = new Image();
                  img.crossOrigin = 'Anonymous';
                  img.onload = function() {
                    try {
                      var cvs = document.createElement('canvas');
                      cvs.width = img.naturalWidth || img.width;
                      cvs.height = img.naturalHeight || img.height;
                      var ctx = cvs.getContext('2d');
                      ctx.drawImage(img, 0, 0);
                      resolve(cvs.toDataURL());
                    } catch(err) {
                      resolve(null);
                    }
                  };
                  img.onerror = function() { resolve(null); };
                  img.src = url;
                });
                if (canvasDataUrl && canvasDataUrl.indexOf(',') !== -1) {
                  rawB64 = canvasDataUrl.split(',')[1];
                  var cMatch = canvasDataUrl.match(/data:([^;]+)/);
                  if (cMatch) mimeType = cMatch[1];
                }
              } catch(cvsCatch) {}
            }
          } else if (typeof require !== 'undefined') {
            var fs = require('fs');
            var path = require('path');
            var localPath = path.resolve(url);
            if (fs.existsSync(localPath)) {
              var ext = url.split('.').pop() || 'png';
              mimeType = (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : ('image/' + ext);
              var buf = fs.readFileSync(localPath);
              rawB64 = buf.toString('base64');
            }
          }
        }
    } catch (e) {}
    return { b64: rawB64, mime: mimeType };
  },

  _exportImageMap: null,
  _exportImageMapPromise: null,

  /**
   * Náº¡p manifest bá»™ áº£nh tá»‘i Æ°u cho xuáº¥t Word (assets/khbd_images_export/manifest.json).
   * Thiáº¿u manifest -> tráº£ {} vÃ  há»‡ thá»‘ng tá»± dÃ¹ng áº£nh gá»‘c (an toÃ n, khÃ´ng áº£nh hÆ°á»Ÿng tÃ­nh Ä‘Ãºng).
   */
  loadExportImageMap: function() {
    if (this._exportImageMap) return Promise.resolve(this._exportImageMap);
    if (this._exportImageMapPromise) return this._exportImageMapPromise;
    var self = this;
    this._exportImageMapPromise = (async function() {
      var map = {};
      try {
        if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
          var resp = await fetch('assets/khbd_images_export/manifest.json', { cache: 'no-cache' });
          if (resp.ok) map = await resp.json();
        } else if (typeof require === 'function') {
          var _fs = require('fs');
          if (_fs.existsSync('assets/khbd_images_export/manifest.json')) {
            map = JSON.parse(_fs.readFileSync('assets/khbd_images_export/manifest.json', 'utf8'));
          }
        }
      } catch (e) { map = {}; }
      self._exportImageMap = map || {};
      self._exportImageMapPromise = null;
      return self._exportImageMap;
    })();
    return this._exportImageMapPromise;
  },

  /**
   * Äá»•i Ä‘Æ°á»ng dáº«n áº£nh gá»‘c (assets/khbd_images/...) sang áº£nh tá»‘i Æ°u náº¿u cÃ³ trong manifest; ngÆ°á»£c láº¡i giá»¯ nguyÃªn.
   */
  resolveExportImageUrl: function(url) {
    var map = this._exportImageMap;
    if (!map || !url || url.indexOf('data:') === 0) return url;
    var clean = url.split('?')[0].split('#')[0];
    var idx = clean.indexOf('assets/khbd_images/');
    if (idx < 0) return url;
    clean = clean.substring(idx);
    var hit = map[clean];
    if (!hit) { try { hit = map[decodeURI(clean)]; } catch (e) {} }
    return hit || url;
  },

  /**
   * Táº¡o tá»‡p .docx chuáº©n OpenXML (dÃ¹ng JSZip & altChunk cÃ³ Ä‘áº§y Ä‘á»§ styles.xml vÃ  fontTable.xml chuáº©n Times New Roman 13pt)
   */
  createDocxBlobFromHtml: async function(docHtml) {
    await this.loadExportImageMap();
    var jszipObj = (typeof JSZip !== 'undefined') ? JSZip : ((typeof window !== 'undefined' && window.JSZip) ? window.JSZip : null);
    if (jszipObj) {
      try {
        // TrÃ­ch xuáº¥t vÃ  Ä‘Ã³ng gÃ³i toÃ n bá»™ hÃ¬nh áº£nh vÃ o khá»‘i MHTML (multipart/related) chuáº©n RFC 822
        // Microsoft Word khi má»Ÿ file docx qua altChunk KHÃ”NG há»— trá»£ data: URI trong HTML thuáº§n.
        // Chá»‰ khi Ä‘Æ°á»£c Ä‘Ã³ng gÃ³i qua content.mht vá»›i Content-Location, Word má»›i chuyá»ƒn Ä‘á»•i thÃ nh DrawingML vÃ  hiá»ƒn thá»‹ hÃ¬nh áº£nh hoÃ n háº£o 100%.
        var imgParts = [];
        var imgIndex = 0;
        if (typeof docHtml === 'string' && docHtml.indexOf('<img') !== -1) {
          try {
            var imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
            var match;
            var urlsToFetch = [];
            while ((match = imgRegex.exec(docHtml)) !== null) {
              var url = match[1];
              if (url && urlsToFetch.indexOf(url) === -1) {
                urlsToFetch.push(url);
              }
            }
            for (var u = 0; u < urlsToFetch.length; u++) {
              var targetUrl = urlsToFetch[u];
              try {
                var loadUrl = this.resolveExportImageUrl(targetUrl);
                var loaded = await this._readImageAsBase64(loadUrl);
                if (!loaded.b64 && loadUrl !== targetUrl) {
                  loaded = await this._readImageAsBase64(targetUrl); // áº£nh tá»‘i Æ°u lá»—i/404 -> quay vá» áº£nh gá»‘c
                }
                var mimeType = loaded.mime;
                var rawB64 = loaded.b64;

                if (rawB64) {
                  var extFromMime = mimeType.split('/')[1] || 'png';
                  if (extFromMime === 'jpeg') extFromMime = 'jpg';
                  var partName = 'word_img_' + (imgIndex++) + '.' + extFromMime;
                  var dims = this.getImageDimensionsFromBase64(rawB64);
                  imgParts.push({
                    name: partName,
                    mime: mimeType,
                    base64: rawB64,
                    dims: dims
                  });
                  docHtml = docHtml.split(targetUrl).join(partName);
                }
              } catch(fetchErr) {
                console.warn('Could not embed image for Word export:', targetUrl, fetchErr);
              }
            }
          } catch(imgErr) {
            console.warn('Image embedding error:', imgErr);
          }
        }

        // Chuáº©n hÃ³a kÃ­ch thÆ°á»›c toÃ n bá»™ áº£nh trong file Word xuáº¥t ra theo Ä‘Ãºng tá»‰ lá»‡ gá»‘c (aspect ratio)
        // Microsoft Word khi má»Ÿ HTML/MHTML altChunk KHÃ”NG há»— trá»£ CSS height: auto;
        // Do Ä‘Ã³ báº¯t buá»™c pháº£i tÃ­nh toÃ¡n vÃ  Ä‘áº·t cáº£ width láº«n height (pt & px) theo Ä‘Ãºng tá»‰ lá»‡ tá»± nhiÃªn cá»§a áº£nh,
        // giÃºp áº£nh hiá»ƒn thá»‹ tá»‰ lá»‡ chuáº©n 1:1, khÃ´ng bao giá» bá»‹ mÃ©o mÃ³, kÃ©o dÃ i (stretched) hay phÃ¬nh to vá»¡ báº£ng.
        if (typeof docHtml === 'string' && docHtml.indexOf('<img') !== -1) {
          var imgDimsMap = {};
          for (var p = 0; p < imgParts.length; p++) {
            if (imgParts[p].dims) {
              imgDimsMap[imgParts[p].name] = imgParts[p].dims;
            }
          }

          docHtml = docHtml.replace(/<img\b([^>]*)>/gi, function(fullTag, attrs) {
            var srcMatch = attrs.match(/src=["']([^"']+)["']/i);
            var src = srcMatch ? srcMatch[1] : '';
            var dims = imgDimsMap[src];

            var wPt = 225;
            var hPt = 150;
            var wPx = 300;
            var hPx = 200;

            if (dims && dims.width > 0 && dims.height > 0) {
              if (dims.width > 300) {
                wPt = 225;
                hPt = Math.round(wPt * (dims.height / dims.width) * 10) / 10;
                wPx = Math.round(wPt / 0.75);
                hPx = Math.round(hPt / 0.75);
              } else {
                wPt = Math.round(dims.width * 0.75 * 10) / 10;
                hPt = Math.round(dims.height * 0.75 * 10) / 10;
                wPx = dims.width;
                hPx = dims.height;
              }
            }

            var cleanAttrs = attrs
              .replace(/\b(width|height)\s*=\s*["']?[^"'\s>]+["']?/gi, '')
              .replace(/\bstyle\s*=\s*["'][^"']*["']/gi, '')
              .trim();

            return '<img src="' + src + '" width="' + wPx + '" height="' + hPx + '" style="width: ' + wPt + 'pt; height: ' + hPt + 'pt; max-width: 100%; display: block; margin: 4pt auto;" ' + cleanAttrs + '>';
          });
        }

        var zip = new jszipObj();

        // 1. _rels/.rels
        zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n' +
          '  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>\n' +
          '</Relationships>');

        // 2. [Content_Types].xml (Há»— trá»£ cáº£ mht láº«n html)
        zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n' +
          '  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n' +
          '  <Default Extension="xml" ContentType="application/xml"/>\n' +
          '  <Default Extension="mht" ContentType="message/rfc822"/>\n' +
          '  <Default Extension="html" ContentType="text/html"/>\n' +
          '  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>\n' +
          '  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>\n' +
          '  <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>\n' +
          '</Types>');

        // 3. word/_rels/document.xml.rels
        zip.file('word/_rels/document.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
          '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n' +
          '  <Relationship Id="htmlChunk" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk" Target="content.mht"/>\n' +
          '  <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>\n' +
          '  <Relationship Id="rIdFontTable" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>\n' +
          '</Relationships>');

        // 4. word/styles.xml (Äáº£m báº£o Word 100% nháº­n diá»‡n font Times New Roman 13pt cho toÃ n bá»™ báº£ng vÃ  vÄƒn báº£n)
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

        // 5. word/fontTable.xml
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

        // 6. word/document.xml
        // Trang A4 (11906 x 16838 dxa), CÄƒn lá» chuáº©n NÄ 30: TrÃªn 2.0cm (1134 dxa), Pháº£i 1.5cm (851 dxa), DÆ°á»›i 2.0cm (1134 dxa), TrÃ¡i 3.0cm (1701 dxa)
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

        // 7. word/content.mht (Ä‘Ã³ng gÃ³i MHTML RFC 822 chuáº©n cho Microsoft Word)
        var sanitizedHtml = this.sanitizeHtmlForWordDocx(docHtml);
        var fullHtml = sanitizedHtml.includes('<meta charset=') ? sanitizedHtml : ('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' + sanitizedHtml + '</body></html>');

        var boundary = '----=_NextPart_WordDocx_MHT_01';
        var mhtml = 'MIME-Version: 1.0\r\n';
        mhtml += 'Content-Type: multipart/related; boundary="' + boundary + '"; type="text/html"\r\n\r\n';
        mhtml += '--' + boundary + '\r\n';
        mhtml += 'Content-Type: text/html; charset="utf-8"\r\n';
        mhtml += 'Content-Transfer-Encoding: 8bit\r\n\r\n';
        mhtml += fullHtml + '\r\n\r\n';

        for (var p = 0; p < imgParts.length; p++) {
          mhtml += '--' + boundary + '\r\n';
          mhtml += 'Content-Type: ' + imgParts[p].mime + '\r\n';
          mhtml += 'Content-Transfer-Encoding: base64\r\n';
          mhtml += 'Content-Location: ' + imgParts[p].name + '\r\n\r\n';
          mhtml += imgParts[p].base64 + '\r\n\r\n';
        }
        mhtml += '--' + boundary + '--\r\n';

        zip.file('word/content.mht', mhtml);

        var genType = (typeof JSZip !== 'undefined' && JSZip.support && JSZip.support.blob) ? 'blob' : 'uint8array';
        var docxBlob = await zip.generateAsync({
          type: genType,
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          compression: 'DEFLATE',
          compressionOptions: { level: 1 }
        });

        if (genType === 'uint8array' && typeof Blob !== 'undefined' && typeof window !== 'undefined' && window.showSaveFilePicker) {
          docxBlob = new Blob([docxBlob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        }

        return { blob: docxBlob, isDocx: true };
      } catch (err) {
        console.warn('Lá»—i táº¡o .docx qua JSZip, chuyá»ƒn sang fallback blob:', err);
      }
    }
    // Fallback: Mime application/msword (Word má»Ÿ file HTML .doc chuáº©n 100% khÃ´ng bao giá» cáº£nh bÃ¡o)
    var fallbackBlob = new Blob(['\ufeff' + docHtml], { type: 'application/msword;charset=utf-8' });
    return { blob: fallbackBlob, isDocx: false };
  },

  downloadWordBlob: async function(docHtml, filename) {
    if (typeof Blob === 'undefined') return { success: false, error: 'Blob not supported' };

    var finalFilename = filename || 'KHBD.docx';
    var result = await this.createDocxBlobFromHtml(docHtml);
    var blob = result.blob;

    if (!result.isDocx) {
      if (finalFilename.toLowerCase().endsWith('.docx')) {
        finalFilename = finalFilename.slice(0, -5) + '.doc';
      } else if (!finalFilename.toLowerCase().endsWith('.doc')) {
        finalFilename += '.doc';
      }
    } else {
      if (finalFilename.toLowerCase().endsWith('.doc')) {
        finalFilename = finalFilename.slice(0, -4) + '.docx';
      } else if (!finalFilename.toLowerCase().endsWith('.docx')) {
        finalFilename += '.docx';
      }
    }

    // 1. Má»Ÿ Há»™p thoáº¡i LÆ°u File (Save As dialog) chuáº©n Windows / Há»‡ Ä‘iá»u hÃ nh thÃ´ng qua File System Access API
    if (typeof window !== 'undefined' && typeof window.showSaveFilePicker === 'function') {
      try {
        var pickerOpts = result.isDocx ? {
          suggestedName: finalFilename,
          types: [{
            description: 'TÃ i liá»‡u Microsoft Word (.docx)',
            accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
          }]
        } : {
          suggestedName: finalFilename,
          types: [{
            description: 'TÃ i liá»‡u Microsoft Word (.doc)',
            accept: { 'application/msword': ['.doc'] }
          }]
        };
        var handle = await window.showSaveFilePicker(pickerOpts);
        var writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return { success: true, method: 'picker', filename: finalFilename };
      } catch (err) {
        // Náº¿u ngÆ°á»i dÃ¹ng báº¥m "Há»§y / Cancel" trÃªn há»™p thoáº¡i LÆ°u cá»§a Windows
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return { success: false, aborted: true };
        }
        // TrÆ°á»ng há»£p trÃ¬nh duyá»‡t cháº·n quyá»n hoáº·c háº¿t háº¡n user gesture -> fallback sang tháº» <a>
        console.warn('showSaveFilePicker fallback to anchor download:', err);
      }
    }

    // 2. Há»— trá»£ trÃ¬nh duyá»‡t cÅ© IE / Edge Legacy
    if (typeof window !== 'undefined' && window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, finalFilename);
      return { success: true, method: 'msSave', filename: finalFilename };
    }

    // 3. Chuáº©n HTML5 download qua tháº» <a> (táº£i tháº³ng vÃ o thÆ° má»¥c Downloads cá»§a mÃ¡y tÃ­nh)
    if (typeof document !== 'undefined') {
      var url = URL.createObjectURL(blob);
      var downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = finalFilename;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(function() {
        if (downloadLink.parentNode) {
          downloadLink.parentNode.removeChild(downloadLink);
        }
        URL.revokeObjectURL(url);
      }, 1500);
      return { success: true, method: 'direct', filename: finalFilename };
    }

    return { success: false, error: 'No download mechanism available' };
  },

  saveWordBlob: async function(docHtmlOrBlob, filename) {
    if (typeof docHtmlOrBlob === 'string') {
      return await this.downloadWordBlob(docHtmlOrBlob, filename);
    }
    var finalFilename = filename || 'KHBD.docx';
    if (finalFilename.toLowerCase().endsWith('.doc')) {
      finalFilename = finalFilename.slice(0, -4) + '.docx';
    } else if (!finalFilename.toLowerCase().endsWith('.docx')) {
      finalFilename += '.docx';
    }
    if (typeof window !== 'undefined' && typeof window.showSaveFilePicker === 'function') {
      try {
        var pickerOpts = {
          suggestedName: finalFilename,
          types: [{
            description: 'TÃ i liá»‡u Microsoft Word (.docx)',
            accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
          }]
        };
        var handle = await window.showSaveFilePicker(pickerOpts);
        var writable = await handle.createWritable();
        await writable.write(docHtmlOrBlob);
        await writable.close();
        return { success: true, method: 'picker', filename: finalFilename };
      } catch (err) {
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return { success: false, aborted: true };
        }
      }
    }
    if (typeof window !== 'undefined' && window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(docHtmlOrBlob, finalFilename);
      return { success: true, method: 'msSave', filename: finalFilename };
    }
    if (typeof document !== 'undefined') {
      var url = URL.createObjectURL(docHtmlOrBlob);
      var downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = finalFilename;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(function() {
        if (downloadLink.parentNode) {
          downloadLink.parentNode.removeChild(downloadLink);
        }
        URL.revokeObjectURL(url);
      }, 1500);
      return { success: true, method: 'direct', filename: finalFilename };
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

