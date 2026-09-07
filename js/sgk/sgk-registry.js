/**
 * SGK MASTER REGISTRY & RETRIEVAL SERVICE
 * Quản lý và cung cấp dữ liệu sách giáo khoa số hóa cho hệ thống Ra đề thi AI
 */

(function(global) {
  'use strict';

  const _books = {};

  const SGKRegistry = {
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
     * Đăng ký một cuốn sách giáo khoa vào kho
     * @param {number|string} grade Khối lớp (VD: 5)
     * @param {string} subjectId Mã môn (toan, tieng_viet, khoa_hoc, lich_su_dia_li, cong_nghe, tin_hoc, tieng_anh, tnxh)
     * @param {object} bookData Toàn bộ dữ liệu số hóa của sách
     */
    registerBook: function(grade, subjectId, bookData) {
      const g = String(grade);
      const key = this._normalizeKey(subjectId);
      if (!_books[g]) {
        _books[g] = {};
      }
      _books[g][key] = bookData;
      // Also alias original key if different
      if (subjectId !== key) {
        _books[g][subjectId] = bookData;
      }
      console.log(`[SGKRegistry] Đã nạp dữ liệu SGK: Khối ${g} - Môn ${key} (${bookData.metadata?.bookName || ''})`);
    },

    /**
     * Lấy dữ liệu cuốn sách đã đăng ký
     */
    getBook: function(grade, subjectId) {
      const g = String(grade);
      if (!_books[g]) return null;
      const key = this._normalizeKey(subjectId);
      return _books[g][key] || _books[g][subjectId] || null;
    },

    /**
     * Lấy danh sách các môn đã số hóa của một khối
     */
    getRegisteredSubjects: function(grade) {
      const g = String(grade);
      if (!_books[g]) return [];
      const seen = new Set();
      const result = [];
      for (const subjKey of Object.keys(_books[g])) {
        const normKey = this._normalizeKey(subjKey);
        if (!seen.has(normKey)) {
          seen.add(normKey);
          result.push({
            subjectId: normKey,
            metadata: _books[g][subjKey].metadata
          });
        }
      }
      return result;
    },

    /**
     * Lấy danh sách bài học / chủ đề theo điều kiện lọc
     */
    getLessons: function(grade, subjectId, options = {}) {
      const book = this.getBook(grade, subjectId);
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
    getScopeContent: function(grade, subjectId, scopeQuery) {
      const book = this.getBook(grade, subjectId);
      if (!book) {
        return {
          found: false,
          summary: `Chưa có dữ liệu SGK số hóa cho Khối ${grade} môn ${subjectId}.`
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
        if (l.reading) text += ` | Đọc hiểu: "${l.reading.title}" (${l.reading.comprehensionFocus || ''})`;
        if (l.languagePractice) text += ` | Luyện từ và câu: ${l.languagePractice.topic}`;
        if (l.writing) text += ` | Tập làm văn: ${l.writing.topic}`;
        if (l.vocabulary) text += ` | Từ vựng: ${l.vocabulary}`;
        if (l.sentencePatterns) text += ` | Mẫu câu: ${l.sentencePatterns}`;
        return text;
      }).join('\n');

      return {
        found: true,
        bookName: book.metadata?.bookName,
        totalMatchedLessons: matchedLessons.length,
        lessons: matchedLessons,
        knowledgeDigest: lessonSummaries
      };
    },

    /**
     * Lấy các câu hỏi mẫu đã số hóa
     */
    getSampleQuestions: function(grade, subjectId, scopeQuery, level = null, type = null) {
      const scopeData = this.getScopeContent(grade, subjectId, scopeQuery);
      if (!scopeData.found) return [];

      let questions = [];
      scopeData.lessons.forEach(les => {
        if (les.sampleQuestions && Array.isArray(les.sampleQuestions)) {
          les.sampleQuestions.forEach(q => {
            questions.push({
              ...q,
              lessonTitle: les.title,
              topic: les.topic,
              week: les.week
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
