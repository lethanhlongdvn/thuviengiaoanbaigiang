/**
 * TRỢ LÝ AI TÍCH HỢP GIÁO ÁN TỰ ĐỘNG (CHUẨN CÔNG VĂN 2345/BGDĐT-GDTH)
 * Hệ thống số hóa Kế hoạch bài dạy 5 Khối lớp (Bộ sách Kết nối tri thức với cuộc sống)
 * Cơ chế AI Nghiên cứu Tài liệu tải lên & Lập Kế hoạch tích hợp Tương tác
 * Quản trị: Thầy Lê Thành Long
 */

var IntegrationService = {

  // =========================================================================
  // 1. TRÍCH XUẤT NỘI DUNG VĂN BẢN TỪ FILE TẢI LÊN (.DOCX, .PDF, .TXT)
  // =========================================================================

  /**
   * Đọc và trích xuất nội dung văn bản thuần túy từ tệp người dùng tải lên
   * @param {File} file Đối tượng File từ thẻ <input type="file"> hoặc Drag & Drop
   * @returns {Promise<{success: boolean, text: string, fileName: string, fileType: string, wordCount: number}>}
   */
  extractTextFromFile: async function(file) {
    if (!file) {
      throw new Error('Vui lòng chọn tệp tài liệu.');
    }

    var fileName = file.name || 'Tai_lieu_tich_hop';
    var ext = (fileName.split('.').pop() || '').toLowerCase();

    // 1. Tệp văn bản thuần .TXT hoặc .MD
    if (ext === 'txt' || ext === 'md' || ext === 'json') {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var text = (e.target.result || '').trim();
          var wordCount = text ? text.split(/\s+/).length : 0;
          resolve({
            success: true,
            text: text,
            fileName: fileName,
            fileType: ext.toUpperCase(),
            wordCount: wordCount
          });
        };
        reader.onerror = function() {
          reject(new Error('Không thể đọc nội dung tệp văn bản: ' + fileName));
        };
        reader.readAsText(file, 'utf-8');
      });
    }

    // 2. Tệp Word (.DOCX) - Dùng thư viện Mammoth.js
    if (ext === 'docx') {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var arrayBuffer = e.target.result;
          if (typeof mammoth !== 'undefined') {
            mammoth.extractRawText({ arrayBuffer: arrayBuffer })
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
              .catch(function(err) {
                reject(new Error('Lỗi khi phân tích tệp .docx: ' + (err.message || '')));
              });
          } else {
            // Mammoth fallback if not ready
            reject(new Error('Thư viện đọc Word (.docx) đang nạp. Bạn vui lòng dán trực tiếp nội dung vào ô văn bản bên cạnh nhé!'));
          }
        };
        reader.onerror = function() { reject(new Error('Lỗi khi nạp tệp Word.')); };
        reader.readAsArrayBuffer(file);
      });
    }

    // 3. Tệp PDF (.PDF) - Dùng thư viện PDF.js
    if (ext === 'pdf') {
      return new Promise(function(resolve, reject) {
        if (typeof pdfjsLib === 'undefined') {
          reject(new Error('Thư viện đọc PDF đang được nạp, bạn có thể dán trực tiếp nội dung vào ô văn bản bên cạnh.'));
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
            var maxPages = Math.min(pdf.numPages, 30); // Giới hạn 30 trang đầu

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
            reject(new Error('Lỗi khi trích xuất văn bản từ tệp PDF: ' + (err.message || '')));
          }
        };
        reader.readAsArrayBuffer(file);
      });
    }

    // 4. Các định dạng khác (.doc cũ): hướng dẫn người dùng
    if (ext === 'doc') {
      throw new Error('Định dạng .doc (Word 97-2003) cũ không hỗ trợ đọc trực tiếp trên trình duyệt. Bạn vui lòng lưu lại thành .docx hoặc mở tệp và Copy/Paste nội dung vào ô dán văn bản bên cạnh nhé!');
    }

    throw new Error('Định dạng tệp .' + ext + ' chưa được hỗ trợ. Vui lòng tải lên tệp .docx, .pdf, .txt hoặc dán văn bản trực tiếp.');
  },


  // =========================================================================
  // 2. NẠP DỮ LIỆU KẾ HOẠCH BÀI DẠY SỐ HÓA
  // =========================================================================

  ensureSubjectLoaded: async function(grade, subjectId) {
    var g = parseInt(grade) || 5;
    var sId = (subjectId || 'toan').toLowerCase();
    
    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    if (khbdDataObj && khbdDataObj.isLoaded && khbdDataObj.isLoaded(g, sId)) {
      return true;
    }
    
    if (typeof document === 'undefined') {
      return true;
    }

    var filePath = 'js/khbd_sohoa/lop' + g + '/lop' + g + '_' + sId + '.js';
    return new Promise(function(resolve) {
      var existing = document.querySelector('script[src="' + filePath + '"]');
      if (existing) {
        resolve(true);
        return;
      }
      var s = document.createElement('script');
      s.src = filePath;
      s.onload = function() { resolve(true); };
      s.onerror = function() {
        console.warn('Could not load script:', filePath);
        resolve(false);
      };
      document.head.appendChild(s);
    });
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
      'tin_hoc': 'Tin học'
    };
    return map[subjectKey] || (subjectKey ? subjectKey.toUpperCase() : 'Môn học');
  },


  // =========================================================================
  // 3. AI NGHIÊN CỨU TÀI LIỆU & LẬP KẾ HOẠCH TÍCH HỢP CHI TIẾT
  // =========================================================================

  analyzeIntegrationPlanWithDocument: async function(params) {
    var grade = parseInt(params.grade) || 5;
    var subj = (params.subjectKey || params.subjectId || 'toan').toLowerCase();
    var sWeek = parseInt(params.startWeek) || 1;
    var dur = parseInt(params.durationWeeks || params.duration) || 1; // 1, 2 hoặc 4 tuần
    var eWeek = Math.min(35, sWeek + dur - 1);
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

    var apiKey = (typeof AuthService !== 'undefined' && AuthService.getApiKey) ? AuthService.getApiKey() : (localStorage.getItem('tvth_gemini_api_key') || (typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : ''));

    var matrixLessons = [];

    if (apiKey && typeof AIService !== 'undefined' && AIService.callGeminiApi) {
      try {
        matrixLessons = await this.generatePlanViaGeminiAI(apiKey, grade, subj, sWeek, eWeek, weeksPlan, docTitle, docText, userNotes);
      } catch (aiErr) {
        console.warn('Lỗi khi gọi Gemini AI Online, tự động chuyển sang AI Engine Phân tích Chuyên sâu:', aiErr);
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

    if (!response.ok) {
      throw new Error('Gemini API Error: ' + response.statusText);
    }

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


  // =========================================================================
  // 4. VÒNG LẶP GÓP Ý & ĐIỀU CHỈNH KẾ HOẠCH THEO PHẢN HỒI CỦA GIÁO VIÊN
  // =========================================================================

  refineIntegrationPlanWithFeedback: async function(currentPlan, userFeedback) {
    if (!currentPlan || !currentPlan.suggestions || currentPlan.suggestions.length === 0) {
      throw new Error('Chưa có kế hoạch hiện tại để điều chỉnh.');
    }
    if (!userFeedback || !userFeedback.trim()) {
      throw new Error('Vui lòng nhập nội dung góp ý hoặc yêu cầu điều chỉnh cho AI.');
    }

    var feedback = userFeedback.trim();
    var apiKey = (typeof AuthService !== 'undefined' && AuthService.getApiKey) ? AuthService.getApiKey() : (localStorage.getItem('tvth_gemini_api_key') || (typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : ''));

    if (apiKey && typeof AIService !== 'undefined' && AIService.callGeminiApi) {
      try {
        var updatedSuggestions = await this.refinePlanViaGeminiAI(apiKey, currentPlan, feedback);
        currentPlan.suggestions = updatedSuggestions;
        currentPlan.matrixLessons = updatedSuggestions;
        return currentPlan;
      } catch (e) {
        console.warn('Lỗi gọi Gemini AI khi sửa kế hoạch, chuyển sang sửa bằng Rule Engine:', e);
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
        cloned.integrationBrief += ' (Đã sửa theo góp ý: ' + (feedback.length > 50 ? feedback.substring(0, 50) + '...' : feedback) + ')';
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

NHIỆM VỤ: Hãy tiếp thu 100% góp ý của giáo viên và trả về bảng JSON các bài học ĐÃ ĐƯỢC CHỈNH SỬA HOÀN CHỈNH theo đúng yêu cầu.
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
    var raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    var list = JSON.parse(raw);

    if (!Array.isArray(list)) throw new Error('Invalid refined JSON');

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
  // 5. CHÈN NỘI DUNG ĐÃ PHÊ DUYỆT VÀO 3 VỊ TRÍ KHBD (CHUẨN CV 2345)
  // =========================================================================

  injectIntegrationIntoLesson: function(originalLesson, matrixItem) {
    var les = JSON.parse(JSON.stringify(originalLesson));

    // Vị trí 1: Mục I. Yêu cầu cần đạt
    if (!les.yccd) les.yccd = [];
    var isYccdAlreadyAdded = les.yccd.some(function(line) {
      return typeof line === 'string' && line.indexOf('[Tích hợp') !== -1;
    });
    if (!isYccdAlreadyAdded && matrixItem.yccdAddition) {
      les.yccd.push(matrixItem.yccdAddition);
    }

    // Vị trí 2: Mục II. Đồ dùng dạy học
    if (!les.dodung) les.dodung = les.teachingAids || [];
    var isDodungAlreadyAdded = les.dodung.some(function(line) {
      return typeof line === 'string' && line.indexOf('[Tích hợp') !== -1;
    });
    if (!isDodungAlreadyAdded && matrixItem.dodungAddition) {
      les.dodung.push(matrixItem.dodungAddition);
    }
    les.teachingAids = les.dodung;

    // Vị trí 3: Mục III. Các hoạt động dạy học chủ yếu (Bảng 2 cột GV - HS)
    var actAddition = matrixItem.activityAddition;
    var targetPartLabel = matrixItem.targetPart || 'Hoạt động Vận dụng, trải nghiệm';

    if (actAddition) {
      if (les.tables && les.tables.length > 0 && Array.isArray(les.tables[0])) {
        var rows = les.tables[0];
        var isActivityAlreadyAdded = rows.some(function(r) {
          var gvStr = Array.isArray(r) ? (r[0] || '') : (r.gv || '');
          return gvStr.indexOf('[Tích hợp') !== -1;
        });

        if (!isActivityAlreadyAdded) {
          var gvText = '<b>* [Tích hợp - ' + targetPartLabel + ']:</b><br/>' + (actAddition.teacher || '').replace(/\n/g, '<br/>');
          var hsText = '<b>* [Tích hợp - ' + targetPartLabel + ']:</b><br/>' + (actAddition.student || '').replace(/\n/g, '<br/>');
          rows.push([gvText, hsText]);
        }
      } else if (les.activities && les.activities.length > 0) {
        var targetTable = les.activities[les.activities.length - 1];
        if (targetTable && targetTable.rows) {
          targetTable.rows.push({
            activityName: targetPartLabel,
            gv: '<b>* [Tích hợp - ' + targetPartLabel + ']:</b><br/>' + (actAddition.teacher || '').replace(/\n/g, '<br/>'),
            hs: '<b>* [Tích hợp - ' + targetPartLabel + ']:</b><br/>' + (actAddition.student || '').replace(/\n/g, '<br/>'),
            isInjected: true
          });
        }
      }
    }

    les.isInjected = true;
    les.integrationInfo = {
      targetPart: targetPartLabel,
      topicLabel: matrixItem.topicLabel,
      level: matrixItem.level || matrixItem.degree
    };

    return les;
  },

  applyIntegrationToWeekRange: async function(analyzedPlan, selectedLessonMap) {
    var matrixLessons = analyzedPlan.suggestions || analyzedPlan.matrixLessons || [];
    var weeksPlan = analyzedPlan.weeksPlan || [];
    var integratedWeeks = [];
    var allAppliedLessons = [];

    weeksPlan.forEach(function(wItem) {
      var wNum = wItem.week;
      var newLessons = [];

      (wItem.lessons || []).forEach(function(origLes, lIdx) {
        var matchMatrix = matrixLessons.find(function(m) { return m.week === wNum && m.lessonIndex === lIdx; });
        var isSelected = matchMatrix && (selectedLessonMap ? selectedLessonMap[matchMatrix.id] !== false : matchMatrix.selected);

        if (isSelected && matchMatrix) {
          var injectedLes = IntegrationService.injectIntegrationIntoLesson(origLes, matchMatrix);
          injectedLes.week = wNum;
          newLessons.push(injectedLes);
          allAppliedLessons.push(injectedLes);
        } else {
          var cloned = JSON.parse(JSON.stringify(origLes));
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
  // 6. XUẤT GIÁO ÁN ĐÃ TÍCH HỢP RA FILE WORD (.DOC) CHUẨN CV 2345
  // =========================================================================

  exportToWord: function(lessonsOrWeeks, metadata) {
    var meta = metadata || {};
    var grade = meta.grade || 5;
    var subjectName = meta.subjectName || 'Môn học';
    var startWeek = meta.startWeek || 1;
    var endWeek = meta.endWeek || 1;
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

    var docHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>Kế hoạch bài dạy Khối \${grade} - Môn \${subjectName} (Tuần \${startWeek} - \${endWeek})</title>
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
            margin-bottom: 15pt;
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
          .title-box p {
            font-size: 13pt;
            font-weight: bold;
            margin: 3pt 0 0 0;
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

    lessons.forEach(function(les, lIdx) {
      if (lIdx > 0) {
        docHtml += '<div class="page-break"></div>';
      }

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
              <td style="width: 45%;">
                <p><b>\${schoolName}</b></p>
                <p>Giáo viên: <b>\${teacherName}</b></p>
              </td>
              <td style="width: 55%; text-align: right;">
                <p><b>NĂM HỌC: 2025 - 2026</b></p>
                <p>Khối: <b>\${les.grade || grade}</b> - Tuần: <b>\${les.week || startWeek}</b></p>
              </td>
            </tr>
          </table>

          <h2>KẾ HOẠCH BÀI DẠY</h2>
          <p>MÔN: \${les.subjectName || subjectName.toUpperCase()}</p>
          <p style="font-size: 14pt; margin-top: 4pt;">\${les.lessonTitle || les.title || 'BÀI DẠY'}</p>
          \${les.period ? ('<p style="font-style: italic; font-weight: normal; margin-top: 2pt;">(' + les.period + ')</p>') : ''}
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

    docHtml += `
      </body>
      </html>
    `;

    var filename = meta.filename || ('KHBD_Lop' + grade + '_' + subjectName + '_Tuan' + startWeek + '-' + endWeek + '_TichHop.doc');
    
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

// Export to global scope
if (typeof window !== 'undefined') {
  window.IntegrationService = IntegrationService;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IntegrationService;
}
