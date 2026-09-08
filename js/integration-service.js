/**
 * TRỢ LÝ AI TÍCH HỢP GIÁO ÁN TỰ ĐỘNG (CHUẨN CÔNG VĂN 2345/BGDĐT-GDTH)
 * Hệ thống số hóa Kế hoạch bài dạy 5 Khối lớp (Bộ sách Kết nối tri thức với cuộc sống)
 * Quản trị: Thầy Lê Thành Long
 */

var IntegrationService = {
  // 8 Chủ đề tích hợp chuẩn mực của Bộ Giáo dục & Đào tạo
  TOPICS: {
    gddp: {
      id: 'gddp',
      name: 'Giáo dục Địa phương (GDĐP)',
      badge: 'GDĐP',
      color: '#db2777',
      desc: 'Lồng ghép danh lam thắng cảnh, di tích lịch sử, nhân vật, sản vật & nét đẹp quê hương'
    },
    quyen_con_nguoi: {
      id: 'quyen_con_nguoi',
      name: 'Giáo dục Quyền con người',
      badge: 'QCN',
      color: '#7c3aed',
      desc: 'Lồng ghép quyền trẻ em, bình đẳng, sự tôn trọng và chia sẻ yêu thương trong học đường'
    },
    ky_nang_so: {
      id: 'ky_nang_so',
      name: 'Giáo dục Kỹ năng số & Chuyển đổi số',
      badge: 'KNS',
      color: '#0284c7',
      desc: 'Lồng ghép an toàn không gian mạng, ứng dụng CNTT và kỹ năng số cơ bản cho học sinh'
    },
    atgt: {
      id: 'atgt',
      name: 'Giáo dục An toàn giao thông',
      badge: 'ATGT',
      color: '#ea580c',
      desc: 'Lồng ghép quy tắc tham gia giao thông an toàn, đi bộ, đi xe đạp và văn hóa giao thông'
    },
    moi_truong: {
      id: 'moi_truong',
      name: 'Bảo vệ Môi trường & Ứng phó BĐKH',
      badge: 'MÔI TRƯỜNG',
      color: '#16a34a',
      desc: 'Lồng ghép ý thức giữ gìn vệ sinh, tiết kiệm tài nguyên và bảo vệ môi trường xanh'
    },
    tai_chinh: {
      id: 'tai_chinh',
      name: 'Giáo dục Tài chính Tiểu học',
      badge: 'TÀI CHÍNH',
      color: '#d97706',
      desc: 'Lồng ghép thói quen tiết kiệm, chi tiêu thông minh và trân trọng giá trị lao động'
    },
    qpan: {
      id: 'qpan',
      name: 'Giáo dục Quốc phòng và An ninh',
      badge: 'QPAN',
      color: '#dc2626',
      desc: 'Lồng ghép tình yêu Tổ quốc, bảo vệ chủ quyền biên giới, biển đảo thiêng liêng'
    },
    van_hoa_ung_xu: {
      id: 'van_hoa_ung_xu',
      name: 'Văn hóa Ứng xử & PC Bạo lực học đường',
      badge: 'ỨNG XỬ',
      color: '#9333ea',
      desc: 'Lồng ghép lời nói đẹp, hành vi văn minh, đoàn kết và phòng chống bạo lực học đường'
    },
    custom: {
      id: 'custom',
      name: 'Nội dung Tích hợp Tùy chỉnh (Tự nhập)',
      badge: 'TÙY CHỈNH',
      color: '#475569',
      desc: 'Nhập nội dung tích hợp riêng theo hướng dẫn của Sở / Phòng / Trường'
    }
  },

  // Đảm bảo nạp dữ liệu KHBD số hóa của môn học & khối lớp
  ensureSubjectLoaded: async function(grade, subjectId) {
    var g = parseInt(grade) || 5;
    var sId = (subjectId || 'toan').toLowerCase();
    
    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    if (khbdDataObj && khbdDataObj.isLoaded && khbdDataObj.isLoaded(g, sId)) {
      return true;
    }
    
    if (typeof document === 'undefined') {
      // Môi trường Node.js / CLI testing
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

  // Bước 1: Phân tích và lập Ma trận Kế hoạch Tích hợp
  analyzeIntegrationPlan: async function(paramsOrGrade, subjectId, startWeek, duration, topicKey, provinceName, customText) {
    var params = (typeof paramsOrGrade === 'object' && paramsOrGrade !== null) ? paramsOrGrade : {
      grade: paramsOrGrade,
      subjectId: subjectId,
      startWeek: startWeek,
      duration: duration,
      topicKey: topicKey,
      provinceName: provinceName,
      customText: customText
    };

    var grade = parseInt(params.grade) || 5;
    var subj = (params.subjectId || params.subjectKey || 'toan').toLowerCase();
    var sWeek = parseInt(params.startWeek) || 1;
    var dur = parseInt(params.duration || params.durationWeeks) || 1; // 1, 2 hoặc 4 tuần
    var eWeek = Math.min(35, sWeek + dur - 1);
    var tKey = params.topicKey || 'gddp';
    var cTitle = params.customTopicTitle || params.customText || '';
    var pName = params.provinceName || 'địa phương';

    await this.ensureSubjectLoaded(grade, subj);

    var khbdDataObj = (typeof window !== 'undefined' && window.KHBD_DATA) ? window.KHBD_DATA : (typeof KHBD_DATA !== 'undefined' ? KHBD_DATA : null);
    var weeksPlan = khbdDataObj ? khbdDataObj.getWeekRangePlan(grade, subj, sWeek, eWeek) : [];
    
    // Nếu chưa có dữ liệu, trả về thông báo lỗi rõ ràng
    if (!weeksPlan || weeksPlan.length === 0) {
      throw new Error('Chưa tìm thấy dữ liệu giáo án số hóa cho Khối ' + grade + ' - Môn ' + subj + ' (Tuần ' + sWeek + ' - ' + eWeek + ')');
    }

    var topicInfo = this.TOPICS[tKey] || this.TOPICS.gddp;
    var topicLabel = (tKey === 'custom' && cTitle) ? cTitle : (tKey === 'gddp' ? ('GDĐP (' + pName + ')') : topicInfo.name);

    var matrixLessons = [];
    var lessonGlobalIndex = 0;

    weeksPlan.forEach(function(wItem) {
      var wNum = wItem.week;
      (wItem.lessons || []).forEach(function(les, lIdx) {
        var lTitle = les.lessonTitle || les.title || ('Bài học ' + (lIdx + 1));
        var lTopic = les.topic || '';
        
        // Xác định mức độ tích hợp phù hợp
        var degree = 'Bộ phận'; // 'Bộ phận' | 'Liên hệ' | 'Toàn phần'
        if (lIdx % 2 === 0) degree = 'Liên hệ';
        
        // Tạo nội dung tích hợp chuẩn mực cho bài dạy
        var generated = IntegrationService.generateIntegrationContent(grade, subj, lTitle, lTopic, tKey, pName, cTitle);

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
          level: degree,
          degree: degree,
          topicLabel: topicLabel,
          topicKey: tKey,
          integrationBrief: generated.brief,
          integrationTarget: generated.brief,
          activityHook: generated.activityAddition.stepName + ' - ' + (generated.activityAddition.teacher ? generated.activityAddition.teacher.substring(0, 75) + '...' : ''),
          yccdAddition: generated.yccdAddition,
          dodungAddition: generated.dodungAddition,
          activityAddition: generated.activityAddition,
          integrate: true,
          selected: true
        };

        matrixLessons.push(item);
      });
    });

    var result = {
      success: true,
      grade: grade,
      subjectId: subj,
      subjectKey: subj,
      subjectName: this.getSubjectDisplayName(subj),
      startWeek: sWeek,
      endWeek: eWeek,
      duration: dur,
      durationWeeks: dur,
      topicKey: tKey,
      topicInfo: topicInfo,
      topicLabel: topicLabel,
      provinceName: pName,
      matrixLessons: matrixLessons,
      suggestions: matrixLessons, // alias
      weeksPlan: weeksPlan
    };

    return result;
  },

  // Tên hiển thị chuẩn của môn học
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
    return map[subjectKey] || subjectKey.toUpperCase();
  },

  // Tạo nội dung tích hợp thông minh theo môn và bài học
  generateIntegrationContent: function(grade, subjectId, lessonTitle, topicName, topicKey, provinceName, customText) {
    var p = provinceName || 'địa phương';
    
    if (topicKey === 'gddp') {
      if (subjectId === 'tieng_viet') {
        return {
          brief: 'Liên hệ từ ngữ, cảnh đẹp, di tích lịch sử và sản vật quê hương ' + p,
          yccdAddition: '• [Tích hợp GDĐP]: Nêu được tình cảm gắn bó, niềm tự hào và biết sử dụng từ ngữ miêu tả nét đẹp cảnh quan, danh lam thắng cảnh, làng nghề truyền thống của ' + p + '.',
          dodungAddition: '• [Tích hợp GDĐP] Giáo viên: Tranh ảnh, video clip tư liệu giới thiệu về các di tích và nét đẹp quê hương ' + p + '; Học sinh: Sưu tầm tranh ảnh, bài viết ngắn về ' + p + '.',
          activityAddition: {
            stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
            teacher: '- GV trình chiếu hình ảnh/video về di tích, cảnh đẹp và sản vật quê hương ' + p + '.\n- Nêu câu hỏi: "Em hãy chia sẻ 1-2 nét đẹp hoặc di tích nổi tiếng của ' + p + ' mà em biết hoặc đã từng đến thăm?"\n- GV nhận xét, tuyên dương và giáo dục tình yêu quê hương đất nước.',
            student: '- HS quan sát hình ảnh trên màn chiếu.\n- HS trao đổi theo nhóm đôi, nêu cảm nhận và tự hào giới thiệu về cảnh đẹp, đặc sản của ' + p + '.\n- Lắng nghe và ghi nhớ bài học liên hệ.'
          }
        };
      } else if (subjectId === 'toan') {
        return {
          brief: 'Ứng dụng số liệu thực tế về khoảng cách, diện tích, sản lượng nông sản của ' + p,
          yccdAddition: '• [Tích hợp GDĐP]: Vận dụng kiến thức bài học để tính toán, giải bài toán gắn với số liệu thực tế về khoảng cách địa lý, sản lượng nông sản, diện tích danh thắng tại ' + p + '.',
          dodungAddition: '• [Tích hợp GDĐP] Giáo viên: Bảng số liệu thống kê thực tế về nông sản/địa danh tại ' + p + '; Học sinh: Phiếu học tập liên hệ.',
          activityAddition: {
            stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
            teacher: '- GV đưa ra tình huống thực tế gắn với số liệu tại ' + p + ': "Một vườn đặc sản tại ' + p + ' thu hoạch được..."\n- Yêu cầu HS áp dụng kiến thức vừa học để tính toán.\n- Nhận xét và chốt kết quả.',
            student: '- HS đọc kỹ đề bài tình huống thực tế địa phương.\n- Thực hiện tính toán vào bảng con / phiếu học tập.\n- Trình bày kết quả và giải thích cách làm.'
          }
        };
      } else {
        return {
          brief: 'Tìm hiểu đặc điểm tự nhiên, di tích văn hóa và con người tiêu biểu của ' + p,
          yccdAddition: '• [Tích hợp GDĐP]: Nhận biết được nét đặc trưng về tự nhiên, xã hội, di tích lịch sử và văn hóa con người tại ' + p + '.',
          dodungAddition: '• [Tích hợp GDĐP] Giáo viên: Bản đồ hành chính, tranh ảnh tư liệu ' + p + '; Học sinh: Tranh ảnh sưu tầm.',
          activityAddition: {
            stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
            teacher: '- GV tổ chức cho HS thảo luận về các nét đặc trưng của ' + p + ' gắn với bài học.\n- Cho đại diện các nhóm chia sẻ trước lớp.',
            student: '- HS thảo luận tích cực theo nhóm.\n- Đại diện nhóm lên bảng trình bày những hiểu biết về quê hương mình.'
          }
        };
      }
    }

    if (topicKey === 'quyen_con_nguoi') {
      return {
        brief: 'Giáo dục quyền được học tập, vui chơi, bày tỏ ý kiến và tôn trọng sự khác biệt',
        yccdAddition: '• [Tích hợp Quyền con người]: Biết lắng nghe, tôn trọng ý kiến của bạn; nhận thức được quyền được đối xử công bằng, tôn trọng trong học tập và rèn luyện.',
        dodungAddition: '• [Tích hợp Quyền con người] Giáo viên: Tranh ảnh/video clip về quyền trẻ em, thẻ tình huống ứng xử văn minh; Học sinh: Bút màu, phiếu thảo luận nhóm.',
        activityAddition: {
          stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
          teacher: '- GV tạo cơ hội cho mọi học sinh đều được phát biểu, khuyến khích sự tự tin và lắng nghe.\n- Nêu thông điệp: "Mỗi chúng ta đều có quyền được học tập, bày tỏ ý kiến và được tôn trọng."',
          student: '- HS tích cực lắng nghe bạn phát biểu, đóng góp ý kiến mang tính xây dựng.\n- Thể hiện sự tôn trọng bạn bè và cùng hợp tác trong học tập.'
        }
      };
    }

    if (topicKey === 'ky_nang_so') {
      return {
        brief: 'Rèn luyện kỹ năng tìm kiếm thông tin an toàn, sử dụng thiết bị số có trách nhiệm',
        yccdAddition: '• [Tích hợp Kỹ năng số]: Hình thành ý thức ứng dụng công nghệ thông tin trong học tập; biết cách bảo vệ thông tin cá nhân và tương tác an toàn trên môi trường số.',
        dodungAddition: '• [Tích hợp Kỹ năng số] Giáo viên: Máy tính, bài giảng điện tử, mã QR tra cứu học liệu số; Học sinh: Thiết bị thông minh / Phiếu học tập số hóa.',
        activityAddition: {
          stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
          teacher: '- GV hướng dẫn HS quét mã QR / truy cập đường dẫn bài học để xem thêm tư liệu số hóa.\n- Nhắc nhở quy tắc an toàn khi sử dụng Internet.',
          student: '- HS quan sát thao tác tra cứu học liệu số trên màn hình.\n- Ghi nhớ nguyên tắc sử dụng Internet văn minh, an toàn.'
        }
      };
    }

    if (topicKey === 'atgt') {
      return {
        brief: 'Giáo dục ý thức chấp hành luật giao thông, kỹ năng đi bộ và qua đường an toàn',
        yccdAddition: '• [Tích hợp ATGT]: Nhận biết và thực hiện đúng các quy tắc an toàn giao thông cơ bản; có ý thức tự bảo vệ bản thân và nhắc nhở người thân chấp hành luật giao thông.',
        dodungAddition: '• [Tích hợp ATGT] Giáo viên: Biển báo giao thông mô phỏng, video tình huống giao thông an toàn; Học sinh: Mũ bảo hiểm mô hình.',
        activityAddition: {
          stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
          teacher: '- GV đưa ra tình huống giao thông thực tế gắn với bài học.\n- Hỏi: "Em cần làm gì để đảm bảo an toàn giao thông khi đến trường?"\n- Nhận xét và nhắc nhở đội mũ bảo hiểm khi ngồi trên xe mô tô, xe máy.',
          student: '- HS trả lời nhanh tình huống giao thông.\n- Cam kết luôn đội mũ bảo hiểm đạt chuẩn và đi đúng phần đường quy định.'
        }
      };
    }

    if (topicKey === 'moi_truong') {
      return {
        brief: 'Giáo dục ý thức tiết kiệm tài nguyên, giữ gìn vệ sinh và phân loại rác thải',
        yccdAddition: '• [Tích hợp BV Môi trường]: Có ý thức tiết kiệm năng lượng, bảo vệ cây xanh, không xả rác bừa bãi và tích cực tham gia các hoạt động bảo vệ môi trường trường lớp.',
        dodungAddition: '• [Tích hợp BV Môi trường] Giáo viên: Tranh ảnh/video về tác hại của rác thải nhựa và ô nhiễm môi trường; Học sinh: Đồ dùng tái chế.',
        activityAddition: {
          stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
          teacher: '- GV nhắc nhở HS tắt điện khi ra khỏi lớp, giữ gìn vệ sinh chung và phân loại rác đúng nơi quy định.\n- Tuyên dương các bạn có ý thức bảo vệ môi trường.',
          student: '- HS kiểm tra lại khu vực học tập, nhặt rác xung quanh chỗ ngồi.\n- Tự giác thực hiện hành động bảo vệ môi trường hằng ngày.'
        }
      };
    }

    if (topicKey === 'tai_chinh') {
      return {
        brief: 'Hình thành kỹ năng quản lý chi tiêu, tiết kiệm và trân trọng thành quả lao động',
        yccdAddition: '• [Tích hợp Giáo dục Tài chính]: Hiểu được giá trị của đồng tiền và sức lao động; biết lập kế hoạch tiết kiệm nhỏ và sử dụng đồ dùng học tập hiệu quả, tránh lãng phí.',
        dodungAddition: '• [Tích hợp Giáo dục Tài chính] Giáo viên: Bảng giá trị tiền tệ mô phỏng, phiếu chi tiêu hợp lý; Học sinh: Heo đất / sổ tay tiết kiệm.',
        activityAddition: {
          stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
          teacher: '- GV nêu câu hỏi tình huống về cách sử dụng đồ dùng học tập bền đẹp để tiết kiệm cho cha mẹ.\n- Giáo dục lòng biết ơn và quý trọng sức lao động.',
          student: '- HS chia sẻ cách giữ gìn sách vở, đồ dùng học tập của bản thân.\n- Lắng nghe và rèn luyện thói quen tiết kiệm.'
        }
      };
    }

    if (topicKey === 'qpan') {
      return {
        brief: 'Bồi dưỡng tình yêu quê hương, lòng tự hào dân tộc và ý thức bảo vệ Tổ quốc',
        yccdAddition: '• [Tích hợp QPAN]: Nuôi dưỡng tình yêu gia đình, quê hương, đất nước; tự hào về truyền thống dựng nước và giữ nước của dân tộc Việt Nam.',
        dodungAddition: '• [Tích hợp QPAN] Giáo viên: Bản đồ Việt Nam có chủ quyền Hoàng Sa - Trường Sa, hình ảnh chú bộ đội; Học sinh: Tranh vẽ cờ Tổ quốc.',
        activityAddition: {
          stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
          teacher: '- GV giới thiệu hình ảnh bản đồ Tổ quốc thiêng liêng, hình ảnh các chú bộ đội đang ngày đêm canh giữ biên cương, hải đảo.\n- Giáo dục lòng yêu nước và ý thức học tập chăm ngoan.',
          student: '- HS hướng mắt về bản đồ Tổ quốc với niềm tự hào.\n- Hứa quyết tâm học tập tốt để sau này xây dựng và bảo vệ đất nước.'
        }
      };
    }

    if (topicKey === 'van_hoa_ung_xu') {
      return {
        brief: 'Rèn luyện lời nói lễ phép, hành vi văn minh, đoàn kết và phòng chống bạo lực',
        yccdAddition: '• [Tích hợp Văn hóa ứng xử]: Biết nói lời chào hỏi, cảm ơn, xin lỗi; tôn trọng thầy cô, thân thiện, đoàn kết và giúp đỡ bạn bè trong mọi hoạt động.',
        dodungAddition: '• [Tích hợp Văn hóa ứng xử] Giáo viên: Tranh ảnh câu chuyện ứng xử đẹp học đường; Học sinh: Bảng cam kết ứng xử văn minh.',
        activityAddition: {
          stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
          teacher: '- GV nhắc nhở HS luôn nói lời hay, làm việc tốt, biết giúp đỡ bạn bè khi gặp khó khăn.\n- Nhận xét tiết học và khen ngợi các hành động đoàn kết trong lớp.',
          student: '- HS cùng nhau nhắc lại khẩu hiệu: "Nói lời hay - Làm việc tốt - Đoàn kết thân thiện".\n- Thực hiện chào thầy cô và các bạn trước khi kết thúc tiết học.'
        }
      };
    }

    // Default / Custom Topic
    var customLabel = customText || 'Nội dung tích hợp bổ sung';
    return {
      brief: 'Tích hợp nội dung: ' + customLabel,
      yccdAddition: '• [Tích hợp ' + customLabel + ']: Vận dụng kiến thức, kỹ năng bài học để liên hệ thực tế, bồi dưỡng phẩm chất và năng lực theo định hướng: ' + customLabel + '.',
      dodungAddition: '• [Tích hợp ' + customLabel + '] Giáo viên: Tài liệu, hình ảnh minh họa về ' + customLabel + '; Học sinh: Phiếu học tập liên hệ.',
      activityAddition: {
        stepName: 'Vận dụng, trải nghiệm (4-5 phút)',
        teacher: '- GV liên hệ kiến thức bài học với nội dung ' + customLabel + '.\n- Nêu câu hỏi mở để HS suy nghĩ và vận dụng.\n- Đánh giá và tổng kết.',
        student: '- HS tích cực phát biểu, liên hệ nội dung bài học với thực tiễn.\n- Ghi nhớ và áp dụng vào cuộc sống hằng ngày.'
      }
    };
  },

  // Bước 2: Chèn chuẩn xác vào 3 vị trí trong Giáo án gốc (CV 2345)
  injectIntegrationIntoLesson: function(originalLesson, matrixItem) {
    // Clone sâu để bảo lưu 100% nguyên vẹn
    var les = JSON.parse(JSON.stringify(originalLesson));

    // Vị trí 1: Mục I. Yêu cầu cần đạt
    if (!les.yccd) les.yccd = [];
    var isYccdAlreadyAdded = les.yccd.some(function(line) {
      return typeof line === 'string' && (line.indexOf('[Tích hợp') !== -1 || line.indexOf('[GDĐP') !== -1);
    });
    if (!isYccdAlreadyAdded && matrixItem.yccdAddition) {
      les.yccd.push(matrixItem.yccdAddition);
    }

    // Vị trí 2: Mục II. Đồ dùng dạy học
    if (!les.dodung) les.dodung = les.teachingAids || [];
    var isDodungAlreadyAdded = les.dodung.some(function(line) {
      return typeof line === 'string' && (line.indexOf('[Tích hợp') !== -1 || line.indexOf('[GDĐP') !== -1);
    });
    if (!isDodungAlreadyAdded && matrixItem.dodungAddition) {
      les.dodung.push(matrixItem.dodungAddition);
    }
    les.teachingAids = les.dodung;

    // Vị trí 3: Mục III. Các hoạt động dạy học chủ yếu (Bảng 2 cột GV - HS)
    var actAddition = matrixItem.activityAddition;

    if (actAddition) {
      if (les.tables && les.tables.length > 0 && Array.isArray(les.tables[0])) {
        var rows = les.tables[0];
        var isActivityAlreadyAdded = rows.some(function(r) {
          var gvStr = Array.isArray(r) ? (r[0] || '') : (r.gv || '');
          return gvStr.indexOf('[Tích hợp') !== -1 || gvStr.indexOf('[GDĐP') !== -1;
        });

        if (!isActivityAlreadyAdded) {
          var gvText = '<b>* [Tích hợp ' + (matrixItem.topicLabel || 'bổ sung') + ']:</b><br/>' + actAddition.teacher.replace(/\n/g, '<br/>');
          var hsText = '<b>* [Tích hợp ' + (matrixItem.topicLabel || 'bổ sung') + ']:</b><br/>' + actAddition.student.replace(/\n/g, '<br/>');
          rows.push([gvText, hsText]);
        }
      } else if (les.activities && les.activities.length > 0) {
        var targetTable = les.activities[les.activities.length - 1];
        if (targetTable && targetTable.rows) {
          targetTable.rows.push({
            activityName: actAddition.stepName,
            gv: '<b>* [Tích hợp ' + (matrixItem.topicLabel || 'bổ sung') + ']:</b><br/>' + actAddition.teacher.replace(/\n/g, '<br/>'),
            hs: '<b>* [Tích hợp ' + (matrixItem.topicLabel || 'bổ sung') + ']:</b><br/>' + actAddition.student.replace(/\n/g, '<br/>'),
            isInjected: true
          });
        }
      }
    }

    les.isInjected = true;
    les.integrationInfo = {
      topicLabel: matrixItem.topicLabel,
      topicKey: matrixItem.topicKey,
      level: matrixItem.degree || matrixItem.level
    };

    return les;
  },

  // Áp dụng tích hợp cho toàn bộ dải tuần đã chọn
  applyIntegrationToWeekRange: async function(analyzedPlan, selectedLessonMap) {
    var matrixLessons = analyzedPlan.matrixLessons || analyzedPlan.suggestions || [];
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

  // Xuất trọn bộ Giáo án Tích hợp ra file Word (.doc) chuẩn Công văn 2345
  exportToWord: function(lessonsOrWeeks, metadata) {
    var meta = metadata || {};
    var grade = meta.grade || 5;
    var subjectName = meta.subjectName || 'Môn học';
    var startWeek = meta.startWeek || 1;
    var endWeek = meta.endWeek || 1;
    var schoolName = meta.schoolName || 'TRƯỜNG TIỂU HỌC .................................';
    var teacherName = meta.teacherName || 'Lê Thành Long';

    // Chuẩn hóa danh sách bài học
    var lessons = [];
    if (Array.isArray(lessonsOrWeeks)) {
      if (lessonsOrWeeks.length > 0 && lessonsOrWeeks[0].lessons) {
        // Là dải tuần integratedWeeks
        lessonsOrWeeks.forEach(function(w) {
          (w.lessons || []).forEach(function(l) { lessons.push(l); });
        });
      } else {
        // Là mảng bài học phẳng
        lessons = lessonsOrWeeks;
      }
    }

    var docHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>Kế hoạch bài dạy Khối ${grade} - Môn ${subjectName} (Tuần ${startWeek} - ${endWeek})</title>
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
        var isTichHop = typeof line === 'string' && (line.indexOf('[Tích hợp') !== -1 || line.indexOf('[GDĐP') !== -1);
        if (isTichHop) {
          return '<p style="margin: 3pt 0; background-color: #fdf2f8; color: #9d174d;"><b>' + line + '</b></p>';
        }
        return '<p style="margin: 3pt 0;">' + line + '</p>';
      }).join('');

      var dodungList = les.dodung || les.teachingAids || [];
      var dodungContent = dodungList.map(function(line) {
        var isTichHop = typeof line === 'string' && (line.indexOf('[Tích hợp') !== -1 || line.indexOf('[GDĐP') !== -1);
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
                var isTichHop = gvCol.indexOf('[Tích hợp') !== -1 || gvCol.indexOf('[GDĐP') !== -1 || hsCol.indexOf('[Tích hợp') !== -1;
                var rowBg = isTichHop ? 'background-color: #f5f3ff;' : '';
                return `
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
                return `<tr><td colspan="2" style="padding: 6pt; border: 1pt solid #000; background-color: #f8fafc; font-weight: bold;">${r[0]}</td></tr>`;
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
                ${rowsHtml}
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
                <p><b>${schoolName}</b></p>
                <p>Giáo viên: <b>${teacherName}</b></p>
              </td>
              <td style="width: 55%; text-align: right;">
                <p><b>NĂM HỌC: 2025 - 2026</b></p>
                <p>Khối: <b>${les.grade || grade}</b> - Tuần: <b>${les.week || startWeek}</b></p>
              </td>
            </tr>
          </table>

          <h2>KẾ HOẠCH BÀI DẠY</h2>
          <p>MÔN: ${les.subjectName || subjectName.toUpperCase()}</p>
          <p style="font-size: 14pt; margin-top: 4pt;">${les.lessonTitle || les.title || 'BÀI DẠY'}</p>
          ${les.period ? ('<p style="font-style: italic; font-weight: normal; margin-top: 2pt;">(' + les.period + ')</p>') : ''}
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

    docHtml += `
      </body>
      </html>
    `;

    // Tải xuống file Word
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
