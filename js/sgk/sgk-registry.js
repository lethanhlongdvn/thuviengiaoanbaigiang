/**
 * SGK MASTER REGISTRY & RETRIEVAL SERVICE (HỖ TRỢ ĐA BỘ SÁCH: KNTT & CTST)
 * Quản lý và cung cấp dữ liệu sách giáo khoa số hóa cho hệ thống Ra đề thi AI
 * Chuẩn Chương trình GDPT 2018 & Thông tư 27/2020/TT-BGDĐT & Chuẩn SEA-PLM
 */

(function(global) {
  'use strict';

  // Kho lưu trữ theo bộ sách: _seriesBooks[series][grade][subjectKey]
  const _seriesBooks = {
    kntt: {},
    ctst: {}
  };

  // Kho legacy để tương thích ngược hoàn toàn với code cũ
  const _legacyBooks = {};

  let _activeSeries = 'kntt';

  const SGKRegistry = {
    /**
     * Chuẩn hóa mã bộ sách ('kntt' | 'ctst')
     */
    _normalizeSeries: function(series) {
      if (!series) return _activeSeries || 'kntt';
      const s = String(series).toLowerCase().trim().replace(/[-_]/g, '');
      if (s.includes('ctst') || s.includes('chantroi') || s.includes('chantroisangtao')) {
        return 'ctst';
      }
      return 'kntt';
    },

    /**
     * Chuẩn hóa mã môn học
     */
    _normalizeKey: function(key) {
      if (!key) return '';
      return String(key).toLowerCase().trim()
        .replace(/-/g, '_')
        .replace('lich_su_dia_ly', 'lich_su_dia_li');
    },

    /**
     * Thiết lập bộ sách mặc định đang chọn trên giao diện
     */
    setActiveSeries: function(series) {
      _activeSeries = this._normalizeSeries(series);
      console.log(`[SGKRegistry] Đã chuyển bộ sách mặc định sang: ${_activeSeries.toUpperCase()}`);
    },

    /**
     * Lấy bộ sách mặc định hiện tại
     */
    getActiveSeries: function() {
      return _activeSeries;
    },

    /**
     * Đăng ký một cuốn sách giáo khoa vào kho
     * @param {number|string} grade Khối lớp (VD: 5)
     * @param {string} subjectId Mã môn (toan, tieng_viet, khoa_hoc, lich_su_dia_li, cong_nghe, tin_hoc, tieng_anh, tnxh)
     * @param {object} bookData Toàn bộ dữ liệu số hóa của sách
     * @param {string} [bookSeries] Bộ sách ('kntt' hoặc 'ctst', mặc định tự phát hiện từ metadata)
     */
    registerBook: function(grade, subjectId, bookData, bookSeries) {
      const g = String(grade);
      const key = this._normalizeKey(subjectId);
      const series = this._normalizeSeries(bookSeries || bookData.metadata?.bookSeries || (bookData.metadata?.bookName?.toLowerCase().includes('chân trời') ? 'ctst' : 'kntt'));

      if (!_seriesBooks[series]) {
        _seriesBooks[series] = {};
      }
      if (!_seriesBooks[series][g]) {
        _seriesBooks[series][g] = {};
      }
      _seriesBooks[series][g][key] = bookData;
      if (subjectId !== key) {
        _seriesBooks[series][g][subjectId] = bookData;
      }

      // Giữ bản sao vào legacy books nếu là kntt hoặc chưa có môn này
      if (!_legacyBooks[g]) _legacyBooks[g] = {};
      if (series === 'kntt' || !_legacyBooks[g][key]) {
        _legacyBooks[g][key] = bookData;
        if (subjectId !== key) _legacyBooks[g][subjectId] = bookData;
      }

      console.log(`[SGKRegistry] Đã nạp dữ liệu SGK: [${series.toUpperCase()}] Khối ${g} - Môn ${key} (${bookData.metadata?.bookName || ''})`);
    },

    /**
     * Lấy dữ liệu cuốn sách đã đăng ký
     * @param {number|string} grade Khối lớp
     * @param {string} subjectId Mã môn
     * @param {string} [bookSeries] Bộ sách ('kntt' hoặc 'ctst')
     */
    getBook: function(grade, subjectId, bookSeries) {
      const g = String(grade);
      const key = this._normalizeKey(subjectId);
      const series = this._normalizeSeries(bookSeries);

      // Thử lấy đúng theo bộ sách yêu cầu
      if (_seriesBooks[series] && _seriesBooks[series][g]) {
        const book = _seriesBooks[series][g][key] || _seriesBooks[series][g][subjectId];
        if (book) return book;
      }

      // Fallback sang legacy books nếu chưa có
      if (_legacyBooks[g]) {
        return _legacyBooks[g][key] || _legacyBooks[g][subjectId] || null;
      }

      return null;
    },

    /**
     * Lấy danh sách các môn đã số hóa của một khối theo bộ sách
     */
    getRegisteredSubjects: function(grade, bookSeries) {
      const g = String(grade);
      const series = this._normalizeSeries(bookSeries);
      const targetStore = (_seriesBooks[series] && _seriesBooks[series][g]) ? _seriesBooks[series][g] : (_legacyBooks[g] || {});
      
      const seen = new Set();
      const result = [];
      for (const subjKey of Object.keys(targetStore)) {
        const normKey = this._normalizeKey(subjKey);
        if (!seen.has(normKey)) {
          seen.add(normKey);
          result.push({
            subjectId: normKey,
            metadata: targetStore[subjKey].metadata
          });
        }
      }
      return result;
    },

    /**
     * Lấy danh sách bài học / chủ đề theo điều kiện lọc
     */
    getLessons: function(grade, subjectId, options = {}) {
      const series = options.bookSeries || options.series || _activeSeries;
      const book = this.getBook(grade, subjectId, series);
      if (!book || !book.lessons) return [];

      let list = [...book.lessons];

      if (options.semester) {
        list = list.filter(l => l.semester === Number(options.semester));
      }
      if (options.volume) {
        list = list.filter(l => l.volume === Number(options.volume));
      }
      if (options.fromWeek && options.toWeek) {
        list = list.filter(l => l.week >= Number(options.fromWeek) && l.week <= Number(options.toWeek));
      }
      if (options.topic) {
        list = list.filter(l => l.topic && l.topic.toLowerCase().includes(options.topic.toLowerCase()));
      }
      if (options.search) {
        const q = options.search.toLowerCase();
        list = list.filter(l => (l.title && l.title.toLowerCase().includes(q)) || (l.topic && l.topic.toLowerCase().includes(q)));
      }

      return list;
    },

    /**
     * Phân tích và truy xuất kiến thức trọng tâm cho phạm vi ra đề (Scope)
     * Dùng để truyền vào Prompt của AI hoặc offline fallback matrix
     */
    getScopeContent: function(grade, subjectId, scopeQuery, bookSeries) {
      const series = this._normalizeSeries(bookSeries);
      const book = this.getBook(grade, subjectId, series);
      if (!book) {
        return {
          found: false,
          summary: `Chưa có dữ liệu SGK số hóa cho Khối ${grade} môn ${subjectId} (${series.toUpperCase()}).`
        };
      }

      const q = (scopeQuery || '').trim().toLowerCase();
      let matchedLessons = [];

      if (!q || q.includes('cả năm') || q.includes('toàn bộ')) {
        matchedLessons = book.lessons;
      } else if (q.includes('học kì 1') || q.includes('học kỳ 1') || q.includes('hki') || q.includes('hk1')) {
        matchedLessons = book.lessons.filter(l => l.semester === 1);
      } else if (q.includes('học kì 2') || q.includes('học kỳ 2') || q.includes('hkii') || q.includes('hk2')) {
        matchedLessons = book.lessons.filter(l => l.semester === 2);
      } else if (q.includes('giữa kì 1') || q.includes('giữa kỳ 1')) {
        matchedLessons = book.lessons.filter(l => l.week >= 1 && l.week <= 9);
      } else if (q.includes('cuối kì 1') || q.includes('cuối kỳ 1')) {
        matchedLessons = book.lessons.filter(l => l.semester === 1);
      } else if (q.includes('giữa kì 2') || q.includes('giữa kỳ 2')) {
        matchedLessons = book.lessons.filter(l => l.week >= 19 && l.week <= 27);
      } else if (q.includes('cuối kì 2') || q.includes('cuối kỳ 2') || q.includes('cuối năm')) {
        matchedLessons = book.lessons.filter(l => l.semester === 2 || l.week >= 19);
      } else {
        // Search by week number or lesson/topic keywords
        const weekMatch = q.match(/tuần\s*(\d+)(?:\s*-\s*(\d+)|\s*đến\s*(\d+))?/i);
        if (weekMatch) {
          const startW = parseInt(weekMatch[1], 10);
          const endW = parseInt(weekMatch[2] || weekMatch[3] || weekMatch[1], 10);
          matchedLessons = book.lessons.filter(l => l.week >= startW && l.week <= endW);
        } else {
          matchedLessons = book.lessons.filter(l => 
            (l.title && l.title.toLowerCase().includes(q)) || 
            (l.topic && l.topic.toLowerCase().includes(q)) ||
            (l.coreKnowledge && l.coreKnowledge.toLowerCase().includes(q))
          );
        }
      }

      if (matchedLessons.length === 0) {
        matchedLessons = book.lessons.slice(0, 10); // fallback first 10
      }

      // Format knowledge digest for AI generator
      const lessonSummaries = matchedLessons.map(l => {
        let text = `- ${l.title} (Tuần ${l.week || 'N/A'}, ${l.topic || ''}): ${l.coreKnowledge || ''}`;
        if (l.reading) {
          const rdTitle = typeof l.reading === 'string' ? l.reading : (l.reading.title || '');
          const rdFocus = l.reading.comprehensionFocus || l.reading.summary || '';
          text += ` | Đọc hiểu: "${rdTitle}" ${rdFocus ? `(${rdFocus})` : ''}`;
        }
        if (l.languagePractice) {
          const lpTopic = typeof l.languagePractice === 'string' ? l.languagePractice : (l.languagePractice.topic || '');
          text += ` | Luyện từ và câu: ${lpTopic}`;
        }
        if (l.writing) {
          const wrTopic = typeof l.writing === 'string' ? l.writing : (l.writing.topic || '');
          text += ` | Tập làm văn / Viết: ${wrTopic}`;
        }
        if (l.vocabulary) text += ` | Từ vựng: ${l.vocabulary}`;
        if (l.sentencePatterns) text += ` | Mẫu câu: ${l.sentencePatterns}`;
        return text;
      }).join('\n');

      return {
        found: true,
        series: series,
        bookName: book.metadata?.bookName,
        totalMatchedLessons: matchedLessons.length,
        lessons: matchedLessons,
        knowledgeDigest: lessonSummaries
      };
    },

    /**
     * Lấy các câu hỏi mẫu đã số hóa
     */
    getSampleQuestions: function(grade, subjectId, scopeQuery, level = null, type = null, bookSeries = null) {
      const scopeData = this.getScopeContent(grade, subjectId, scopeQuery, bookSeries);
      if (!scopeData.found) return [];

      let questions = [];
      scopeData.lessons.forEach(les => {
        if (les.sampleQuestions && Array.isArray(les.sampleQuestions)) {
          les.sampleQuestions.forEach(q => {
            questions.push({
              ...q,
              lessonTitle: les.title,
              topic: les.topic,
              week: les.week,
              series: scopeData.series
            });
          });
        }
      });

      if (level) {
        questions = questions.filter(q => q.level === Number(level));
      }
      if (type) {
        questions = questions.filter(q => q.type.toUpperCase() === type.toUpperCase());
      }

      return questions;
    }
  };

  global.SGK_REGISTRY = SGKRegistry;
  global.SGK_DATA = SGKRegistry; // Alias tiện dụng

})(typeof window !== 'undefined' ? window : this);
