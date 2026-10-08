/**
 * AI INCLUSIVE EDUCATION & DISABILITY ADAPTATION MODULE (GIÁO DỤC HÒA NHẬP)
 * Chuyên trách: Quản lý danh mục dạng tật, hướng dẫn sư phạm, thích ứng YCCĐ cho học sinh khuyết tật
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Thầy Lê Thành Long
 */

var AIDisabilityService = {
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
   * Lấy tên hiển thị tiếng Việt của dạng tật
   */
  getDisabilityTypeName: function(typeKey) {
    var map = {
      'tri_tue': 'Khuyết tật trí tuệ (Tiếp thu chậm, ghi nhớ ngắn hạn)',
      'van_dong': 'Khuyết tật vận động (Hạn chế viết, thao tác)',
      'nghe_noi': 'Khuyết tật nghe - nói (Giao tiếp hạn chế)',
      'khiem_thinh': 'Khuyết tật nghe - nói (Khiếm thính)',
      'nhin': 'Khuyết tật nhìn (Thị lực kém, cần cỡ chữ lớn)',
      'khiem_thi': 'Khuyết tật nhìn (Khiếm thị)',
      'tu_ky': 'Rối loạn phổ tự kỉ (Tương tác hạn chế)',
      'tu_ki': 'Tự kỉ / Tăng động giảm chú ý (ADHD)',
      'hoc_tap': 'Khó khăn học tập đặc thù',
      'khac': 'Khuyết tật khác / Học sinh hòa nhập chung'
    };
    return map[typeKey] || 'Khuyết tật học tập';
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

  getDisabilityEnglishShortTypeName: function(typeKey) {
    var map = {
      'tri_tue': 'Intellectual Disability',
      'van_dong': 'Physical Disability',
      'nghe_noi': 'Hearing Impairment',
      'khiem_thinh': 'Hearing Impairment',
      'nhin': 'Visual Impairment',
      'khiem_thi': 'Visual Impairment',
      'tu_ki': 'Autism / ADHD',
      'tu_ky': 'Autism',
      'hoc_tap': 'Learning Difficulties',
      'adhd': 'ADHD'
    };
    return map[typeKey] || 'SEN Student';
  },

  /**
   * Chuẩn hóa và trích xuất danh sách học sinh khuyết tật từ cấu hình (Hỗ trợ 1 - 3 học sinh)
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

  /**
   * Trích xuất thông tin trọng tâm bài học Tiếng Anh: Unit, Topic, Phonics, Từ vựng cốt lõi, Kĩ năng
   */
  extractLessonEnglishKeyContent: function(lesson) {
    if (!lesson) return { phonics: '', words: [], topic: '', unit: '', focus: '' };

    var title = (lesson.lessonTitle || lesson.title || '').trim();
    var topic = (lesson.topic || '').trim();
    var yccdList = Array.isArray(lesson.yccd) ? lesson.yccd : (typeof lesson.yccd === 'string' ? lesson.yccd.split('\n') : []);
    var yccdText = yccdList.join('\n');

    // 1. Extract Unit & Topic
    var unitMatch = title.match(/Unit\s+(\d+)(?:\s*:\s*([^–—\-()]+))?/i) || topic.match(/Unit\s+(\d+)(?:\s*:\s*([^–—\-()]+))?/i);
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
      var wMatch = yccdText.match(/words\s+([a-zA-Z,\s'’\-]+?)(?:\s+with\s+picture|\s+in\s+isolation|\s+in\s+the|\s+and\s+the\s+sentence|\.|$)/i);
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

  /**
   * Hướng dẫn sư phạm phân hóa chuẩn mực 100% bằng Tiếng Anh (SEN Primary English Pedagogy)
   */
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

  /**
   * Hướng dẫn sư phạm phân hóa riêng cho từng dạng tật theo Thông tư 03/2018/TT-BGDĐT và CV 2345
   * Tùy biến sâu sát cho từng môn học và từng khối lớp tiểu học
   */
  getDisabilityGuidance: function(disabilityType, rate, notes, subjectKey, grade) {
    var type = disabilityType || 'tri_tue';
    var r = parseInt(rate, 10) || 50;
    var g = parseInt(grade, 10) || 5;
    var sKey = (subjectKey || '').toLowerCase();
    if (sKey.includes('tieng_anh') || sKey.includes('tiếng anh') || sKey.includes('english')) {
      return this.getDisabilityGuidanceEnglish(disabilityType, rate, notes, grade);
    }
    var guide = '';

    // 1. Phân mức nhận thức / đáp ứng theo tỉ lệ %
    var levelDescription = '';
    if (r <= 40) {
      levelDescription = `MỨC ĐỘ ĐÁP ỨNG: Khoảng ${r}% (Hạn chế nhiều / Mức độ nặng)
  + Nguyên tắc giảm tải: Tinh giản tối đa; tập trung vào tri giác trực quan trực tiếp, nhận biết tối thiểu (chỉ tranh, gọi tên, đếm các số nhỏ) và làm quen với sự trợ giúp trực tiếp (cầm tay chỉ việc) của giáo viên hoặc đồ dùng trực quan cỡ lớn.
  + Định lượng bài tập: Chỉ yêu cầu hoàn thành 1 câu hoặc 1 ý nhận biết cơ bản nhất của Bài 1; miễn hoàn toàn các bài giải toán, tính toán phức tạp hay đọc viết dài.`;
    } else if (r >= 65) {
      levelDescription = `MỨC ĐỘ ĐÁP ỨNG: Khoảng ${r}% (Mức độ nhẹ / Tiếp thu khá)
  + Nguyên tắc phân hóa: Học sinh nắm được kiến thức cốt lõi (chuẩn Bloom mức 1 và một phần mức 2); tự thực hiện bài tập nhận biết và bước đầu thông hiểu cơ bản với sự gợi ý của bạn học.
  + Định lượng bài tập: Hoàn thành khoảng ${r}% khối lượng bài tập cơ bản trong SGK (làm trọn vẹn Bài 1, Bài 2 dạng cơ bản và 1 câu đơn giản của bài toán 1 bước tính); rèn luyện tính tự giác, tự chủ.`;
    } else {
      levelDescription = `MỨC ĐỘ ĐÁP ỨNG: Khoảng ${r}% (Mức độ trung bình - Phổ biến nhất trong giáo dục hòa nhập)
  + Nguyên tắc giảm tải: Hạ bậc chuẩn nhận thức từ thông hiểu, vận dụng xuống mức NHẬN BIẾT CƠ BẢN và LÀM THEO MẪU (Bloom mức 1) với đồ dùng trực quan và bạn kèm cặp.
  + Định lượng bài tập: Hoàn thành khoảng ${r}% khối lượng bài tập nhận biết cơ bản trong SGK (Bài 1 hoặc Bài 2 dạng cơ bản theo mẫu); miễn các bài toán giải có lời văn 2-3 bước, tính thuận tiện hay nâng cao.`;
    }

    // 2. Định hướng theo từng dạng tật
    var typeGuide = '';
    if (type === 'van_dong') {
      typeGuide = `DẠNG TẬT: Khuyết tật vận động (Hạn chế vận động tay chân, khó cầm bút viết/vẽ hoặc thao tác thực hành)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM ĐẶC BIỆT: Khả năng nhận thức, tư duy và trí tuệ của học sinh HOÀN TOÀN BÌNH THƯỜNG. TUYỆT ĐỐI KHÔNG hạ thấp yêu cầu tư duy của bài học.
- ĐIỀU CHỈNH PHƯƠNG THỨC THỰC HIỆN & THỜI GIAN:
  + Cho phép học sinh trả lời miệng, chỉ bảng phụ, chọn thẻ chữ/thẻ số thay vì phải viết đoạn văn dài hay vẽ hình, kẻ bảng phức tạp.
  + Giảm bớt khối lượng viết vẽ tương ứng mức độ vận động ${r}%; gia hạn thêm thời gian làm bài; phần viết chỉ yêu cầu hoàn thành câu ngắn hoặc từ khóa.
  + Trong các hoạt động thực hành, thí nghiệm (Toán, Khoa học, Mỹ thuật, Thủ công): Học sinh tham gia cùng nhóm bạn; bạn cùng nhóm hỗ trợ các thao tác cầm nắm, vận động; học sinh thực hiện phần việc tư duy, quan sát, trả lời hoặc thao tác vừa sức.`;
    } else if (type === 'nghe_noi' || type === 'khiem_thinh') {
      typeGuide = `DẠNG TẬT: Khuyết tật nghe - nói (Khiếm thính, khó phát âm, hạn chế giao tiếp bằng lời)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM: Tối ưu hóa kênh thị giác trực quan (hình ảnh, sơ đồ, thẻ chữ/số in sẵn, khẩu hình, cử chỉ / kí hiệu ngôn ngữ).
- ĐIỀU CHỈNH PHƯƠNG THỨC:
  + Cho phép học sinh thể hiện sự hiểu bài bằng hành động: chỉ vào tranh, ghép/nối thẻ từ, viết hoặc vẽ câu trả lời ra bảng con/phiếu học tập, chọn thẻ Đ/S hoặc đáp án trực quan thay vì bắt buộc phát biểu hoặc đọc to trước lớp.
  + Tương tác cùng bạn học bằng kí hiệu ngôn ngữ, cử chỉ; bạn cùng bàn chủ động hỗ trợ chia sẻ bài học.`;
    } else if (type === 'nhin' || type === 'khiem_thi') {
      typeGuide = `DẠNG TẬT: Khuyết tật nhìn (Thị lực kém, nhìn mờ, cần cỡ chữ lớn hoặc khiếm thị)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM: Tối ưu hóa kênh thính giác (lắng nghe cô giáo và bạn đọc mẫu) và xúc giác (sờ chạm vật thật, mô hình nổi, que tính).
- ĐIỀU CHỈNH PHƯƠNG THỨC:
  + Sử dụng phiếu học tập in chữ to, hình ảnh phóng to có độ tương phản cao; ngồi ở vị trí đủ ánh sáng và gần bảng.
  + Cho phép học sinh tiếp thu và trả lời qua lời nói, mô tả bằng lời thay vì yêu cầu quan sát chi tiết nhỏ trên tranh; không chấm lỗi trình bày chữ viết/hình vẽ.`;
    } else if (type === 'tu_ki' || type === 'tu_ky') {
      typeGuide = `DẠNG TẬT: Rối loạn phổ tự kỉ / Tăng động giảm chú ý (ADHD) (Hạn chế tương tác xã hội, nhạy cảm môi trường, dễ mất tập trung)
- ${levelDescription}
- NGUYÊN TẮC SƯ PHẠM: Tạo không gian học tập ổn định, chia nhỏ nhiệm vụ thành từng bước rõ ràng kèm hình ảnh trực quan (Visual schedule).
- ĐIỀU CHỈNH PHƯƠNG THỨC:
  + Cho phép học sinh hoàn thành nhiệm vụ cá nhân vừa sức, khích lệ từng tiến bộ nhỏ, tránh tạo áp lực biểu đạt trước đám đông.
  + Sử dụng thẻ cảm xúc (vui/buồn), khuyến khích hòa nhập tự nhiên cùng bạn cùng bàn.`;
    } else {
      // tri_tue / hoc_tap / khac
      typeGuide = `DẠNG TẬT: Khuyết tật trí tuệ / Khó khăn học tập (Tiếp thu chậm, ghi nhớ ngắn hạn)
- ${levelDescription}
- NGUYÊN TẮC ĐỊNH LƯỢNG & GIẢM TẢI ${r}% THEO CHUẨN CV 2345:
  + Hạ bậc chuẩn nhận thức: Chuyển đổi từ mức độ thông hiểu, vận dụng sang mức độ NHẬN BIẾT CƠ BẢN, THAO TÁC TRỰC QUAN và LÀM THEO MẪU với sự trợ giúp của giáo viên, bạn học hoặc đồ dùng học tập trực quan.
  + Giới hạn phạm vi kiến thức & bài tập cụ thể: Chỉ yêu cầu học sinh làm quen với các số nhỏ, phép tính đơn giản; hoàn thành khoảng ${r}% khối lượng bài tập nhận biết cơ bản trong SGK (chỉ định rõ Bài 1 hoặc Bài 2 dạng cơ bản theo mẫu).
  + Nêu rõ phần giảm tải: Tuyên bố rõ ràng KHÔNG bắt buộc học sinh phải làm các bài toán giải có lời văn nhiều bước tính, bài tính thuận tiện/tính nhanh hay các bài tập nâng cao.`;
    }

    // 3. Quy chuẩn sâu sát bám theo MÔN HỌC và KHỐI LỚP
    var subjectGradeGuide = '';
    if (sKey === 'toan' || sKey.includes('toan') || sKey.includes('toán')) {
      if (g <= 2) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI ${g} CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Số trong phạm vi 10, 20 hoặc 100; đếm hình, que tính, khối lập phương trực quan.
- Phép tính: Cộng, trừ không nhớ trong phạm vi nhỏ; làm quen cấu tạo số hoặc hình phẳng đơn giản.
- Bài tập cụ thể: Hoàn thành 1-2 câu cơ bản của Bài 1 vào bảng con; miễn hoàn toàn bài toán có lời văn 2 bước tính hay dãy số tìm quy luật phức tạp.`;
      } else if (g === 3) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI 3 CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Số tự nhiên trong phạm vi 1 000, 10 000; bảng nhân chia từ 2 đến 9 cơ bản; bảng đơn vị đo đơn giản (cm, m, g, kg, ml, l).
- Phép tính: Cộng trừ có nhớ 1 lần trong phạm vi nhỏ, nhân chia 1 chữ số cơ bản; nhận biết góc, hình tròn, khối hộp trực quan.
- Bài tập cụ thể: Làm Bài 1 hoặc Bài 2 theo mẫu trên bảng con hoặc chọn thẻ Đúng/Sai; miễn bài toán giải có lời văn 2 bước rút về đơn vị phức tạp hay bài tính giá trị biểu thức nhiều phép tính.`;
      } else if (g === 4) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI 4 CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Đọc, viết số tự nhiên cơ bản; phân số cơ bản (nhận biết phân số qua hình vẽ tô màu trực quan, so sánh 2 phân số cùng mẫu số).
- Phép tính: Đặt tính và tính phép tính cơ bản số tự nhiên; phân số cùng mẫu số đơn giản.
- Bài tập cụ thể: Làm Bài 1 nhận biết trên bảng con, dùng thẻ Đ/S cho các nhận định đơn giản; miễn giải toán tìm hai số khi biết tổng và hiệu nhiều bước, miễn quy đồng mẫu số phức tạp và bài tính thuận tiện.`;
      } else {
        // Lớp 5
        subjectGradeGuide = `ĐẶC THÙ MÔN TOÁN KHỐI 5 CHO HỌC SINH HÒA NHẬP:
- Phạm vi kiến thức: Đọc viết số tự nhiên, phân số đơn giản, số thập phân cơ bản (hàng phần mười, hàng phần trăm); bảng đơn vị đo thời gian/độ dài/khối lượng dạng số tự nhiên từ lớn sang bé (VD: 1 ngày = 24 giờ, 1 giờ = 60 phút, 1 tuần = 7 ngày).
- Bài tập cụ thể: Làm Bài 1 đưa thẻ Đúng/Sai với các bài tập số tự nhiên đơn giản; làm Bài 2 trên bảng con các phép đổi số nguyên (VD: 1 ngày = 24 giờ); bài tập nhóm có bạn hỗ trợ.
- Giảm tải rõ ràng: Miễn giải toán có lời văn 2-3 bước tính (toán chuyển động đều, vận tốc, quãng đường, thời gian nâng cao), miễn đổi số thập phân phức tạp hay bài tính nhanh.`;
      }
    } else if (sKey === 'tieng_viet' || sKey.includes('tieng_viet') || sKey.includes('tiếng việt') || sKey === 'tv') {
      if (g <= 2) {
        subjectGradeGuide = `ĐẶC THÙ MÔN TIẾNG VIỆT KHỐI ${g} CHO HỌC SINH HÒA NHẬP:
- Đọc: Nhận diện chữ cái, âm/vần đang học; đọc trơn từ ngữ đơn giản có kèm tranh minh họa; chỉ tranh nói từ ngữ tương ứng.
- Viết: Nhìn chép từ ngữ 2-3 chữ vào bảng con hoặc phiếu bài tập in sẵn; tô chữ cái theo mẫu.
- Nói và nghe: Trả lời 1 câu hỏi nhận biết trực quan rất ngắn (1-2 từ); không yêu cầu đọc đoạn văn dài hay viết chính tả tốc độ cao.`;
      } else {
        // Lớp 3, 4, 5
        subjectGradeGuide = `ĐẶC THÙ MÔN TIẾNG VIỆT KHỐI ${g} CHO HỌC SINH HÒA NHẬP:
- Đọc: Đọc trơn tên bài đọc và 1-2 câu ngắn nhất của bài; quan sát tranh minh họa chỉ đúng nhân vật/sự việc cốt lõi; trả lời câu hỏi nhận biết tường minh trực tiếp qua tranh.
- Viết: Nhìn chép từ ngữ hoặc 1 câu ngắn cốt lõi của bài vào vở hoặc bảng con; bạn cùng bàn hướng dẫn.
- Giảm tải rõ ràng: Miễn viết đoạn văn 4-5 câu hay bài văn miêu tả/kể chuyện hoàn chỉnh; miễn phân tích cấu tạo từ, từ loại, biện pháp tu từ hay ngữ pháp trừu tượng.`;
      }
    } else if (sKey === 'tnxh' || sKey.includes('tnxh') || sKey.includes('tự nhiên') || sKey.includes('tu_nhien')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN TỰ NHIÊN VÀ XÃ HỘI (KHỐI 1-3) CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát tranh ảnh, video clip, mô hình trực quan; chỉ và gọi tên được sự vật/hiện tượng cốt lõi (VD: Trái Đất, Mặt Trời, bộ phận cơ thể, cây cối, gia đình).
- Thực hành: Thực hành nặn, vẽ, xé dán hoặc sắm vai đơn giản cùng nhóm bạn (VD: đóng vai Mặt Trời trong trò chơi); trả lời câu hỏi đơn giản theo gợi ý của giáo viên.`;
    } else if (sKey === 'khoa_hoc' || sKey.includes('khoa_hoc') || sKey.includes('khoa học')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN KHOA HỌC (KHỐI 4-5) CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát vật thật, tranh ảnh, video thí nghiệm trực quan; chỉ và nêu tên được 1-2 hiện tượng tự nhiên hoặc bộ phận/đặc điểm cơ bản của bài học.
- Thực hành: Tham gia thí nghiệm đơn giản với sự hỗ trợ của bạn cùng nhóm; không yêu cầu giải thích cơ chế khoa học sâu hay ghi nhớ chuỗi phản ứng.`;
    } else if (sKey === 'lich_su_dia_ly' || sKey.includes('lsđl') || sKey.includes('lsdl') || sKey.includes('lich_su') || sKey.includes('lịch sử') || sKey.includes('địa lí')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN LỊCH SỬ VÀ ĐỊA LÍ (KHỐI 4-5) CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát lược đồ, bản đồ phóng to, hình ảnh trực quan; chỉ đúng vị trí địa lý hoặc nhận dạng đúng nhân vật/sự kiện lịch sử cốt lõi của bài.
- Thực hành: Tham gia thảo luận nhóm, xem video tư liệu cùng bạn; không yêu cầu ghi nhớ niên đại chi tiết hay phân tích diễn biến chiến dịch phức tạp.`;
    } else if (sKey === 'dao_duc' || sKey.includes('dao_duc') || sKey.includes('đạo đức')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN ĐẠO ĐỨC CHO HỌC SINH HÒA NHẬP:
- Quan sát tranh tình huống, phân biệt hành vi đúng/sai bằng thẻ Đúng/Sai hoặc thẻ cảm xúc (mặt cười / mặt mếu); nêu được 1 việc làm tốt cụ thể, vừa sức trong cuộc sống hằng ngày.`;
    } else if (sKey === 'hdtn' || sKey.includes('hdtn') || sKey.includes('trải nghiệm') || sKey.includes('trai_nghiem')) {
      subjectGradeGuide = `ĐẶC THÙ HOẠT ĐỘNG TRẢI NGHIỆM CHO HỌC SINH HÒA NHẬP:
- Tích cực tham gia trò chơi khởi động, sinh hoạt nhóm cùng các bạn; bày tỏ cảm xúc bằng cử chỉ hoặc thẻ cảm xúc; bạn cùng nhóm chủ động hỗ trợ hòa nhập.`;
    } else if (sKey === 'mi_thuat' || sKey.includes('mi_thuat') || sKey.includes('mĩ thuật') || sKey.includes('mỹ thuật')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN MĨ THUẬT CHO HỌC SINH HÒA NHẬP:
- Nhận thức: Quan sát tranh ảnh, nhận biết màu sắc hoặc hình khối đơn giản trong bài học.
- Thực hành: Vẽ nét cơ bản, tô màu, nặn hoặc xé dán sản phẩm đơn giản theo mẫu; không yêu cầu phối màu phức tạp; bạn kèm hỗ trợ.`;
    } else if (sKey === 'am_nhac' || sKey.includes('am_nhac') || sKey.includes('âm nhạc')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN ÂM NHẠC CHO HỌC SINH HÒA NHẬP:
- Lắng nghe giai điệu; vỗ tay hoặc gõ đệm theo tiết tấu đơn giản; tham gia ca hát cùng tập thể với tinh thần vui tươi, tự tin.`;
    } else if (sKey === 'tin_hoc' || sKey.includes('tin_hoc') || sKey.includes('tin học') || sKey.includes('cong_nghe') || sKey.includes('công nghệ')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN TIN HỌC / CÔNG NGHỆ CHO HỌC SINH HÒA NHẬP:
- Nhận biết thiết bị/biểu tượng trực quan cơ bản; thực hiện thao tác đơn giản theo mẫu hướng dẫn; an toàn và hợp tác cùng bạn.`;
    } else if (sKey === 'gdtc' || sKey.includes('gdtc') || sKey.includes('thể chất') || sKey.includes('the_duc')) {
      subjectGradeGuide = `ĐẶC THÙ GIÁO DỤC THỂ CHẤT CHO HỌC SINH HÒA NHẬP:
- Quan sát mẫu; thực hiện động tác khởi động hoặc bài tập thể dục đơn giản vừa sức theo khả năng vận động; rèn luyện tinh thần kỷ luật.`;
    } else if (sKey === 'tieng_anh' || sKey.includes('tieng_anh') || sKey.includes('tiếng anh') || sKey.includes('english')) {
      subjectGradeGuide = `ĐẶC THÙ MÔN TIẾNG ANH (ENGLISH) CHO HỌC SINH HÒA NHẬP (LỚP ${g}):
- QUY TẮC BẮT BUỘC VỀ NGÔN NGỮ: Vì giáo án môn Tiếng Anh được soạn hoàn toàn bằng tiếng Anh, nên TẤT CẢ các nội dung mục tiêu (disabilityYccd), đồ dùng (disabilityDodung), và hoạt động (disabilityActivities) BẮT BUỘC PHẢI ĐƯỢC VIẾT 100% BẰNG TIẾNG ANH (ENGLISH).
- Specific competences: Observe flashcards/pictures and listen to pronunciation; recognize and repeat 1-2 basic English words or simple greetings with teacher and peer assistance; complete Level 1 recognition exercises without having to write long sentences or learn complex grammar.
- General competences & Qualities: Feel eager to learn English, confidently practice pronunciation with classmates, cooperate happily in pair work, and complete manageable tasks.
- Teaching aids: Flashcards, picture cards, emotion cards (happy/sad), mini-board, audio player, peer assistance.`;
    } else {
      subjectGradeGuide = `ĐẶC THÙ BỘ MÔN CHO HỌC SINH HÒA NHẬP:
- Nhận biết trực quan qua vật thật/tranh ảnh; thực hành thao tác cơ bản nhất dưới sự làm mẫu của GV và bạn kèm cặp; tham gia hoạt động chung của lớp với tinh thần vui vẻ, hòa nhập.`;
    }

    guide = typeGuide + '\n\n' + subjectGradeGuide;
    if (notes && notes.trim()) {
      guide += `\n\n- LƯU Ý ĐẶC THÙ TỪ GIÁO VIÊN ĐỨNG LỚP: ${notes.trim()}`;
    }
    return guide;
  },

  /**
   * Chuẩn hóa và làm sạch triệt để 100% tiếng Anh cho YCCĐ, Đồ dùng và Hoạt động HSKT
   * Tuyệt đối không để sót bất kỳ từ tiếng Việt nào
   */
  sanitizeEnglishDisabilityText: function(text, lesson, disabilityConfig) {
    if (!text || typeof text !== 'string') return text;
    var s = text.trim();
    if (!s) return s;

    // 1. Chuẩn hóa tiêu đề chính
    s = s.replace(/^5\.\s*(?:điều\s*chỉnh\s*đối\s*với\s*học\s*sinh\s*(?:hòa\s*nhập|khuyết\s*tật)|adjustments?\s*(?:for\s*inclusive\s*students(?:\s*\(sen\))?|\(sen\)))\s*[:.-]?\s*/gim, '5. Adjustments for inclusive students (SEN):\n');

    // 2. Chuẩn hóa tiêu đề từng học sinh: * Dạng 1: Khuyết tật trí tuệ -> * Student 1 (Intellectual Disability - ~50%):
    var self = this;
    s = s.replace(/^\*\s*(?:học\s*sinh|dạng|student|type)\s*(\d+)\s*:\s*(.+?)(?::|$)/gim, function(m, p1, p2) {
      var rawType = p2.trim();
      var enType = rawType;
      if (/trí\s*tuệ|chậm|tiếp\s*thu/i.test(rawType)) enType = 'Intellectual Disability';
      else if (/vận\s*động|chân\s*tay|viết/i.test(rawType)) enType = 'Physical Disability';
      else if (/khiếm\s*thính|nghe\s*[-–—]?\s*nói/i.test(rawType)) enType = 'Hearing Impairment';
      else if (/khiếm\s*thị|nhìn|mắt/i.test(rawType)) enType = 'Visual Impairment';
      else if (/tự\s*k[iỷ]|adhd|tăng\s*động/i.test(rawType)) enType = 'Autism Spectrum Disorder / ADHD';
      else if (/khó\s*khăn\s*học\s*tập/i.test(rawType)) enType = 'Learning Difficulties';
      else if (/sen|hòa\s*nhập|khác/i.test(rawType)) enType = 'SEN Student';

      var rateMatch = rawType.match(/(\d+)\s*%/);
      var rateStr = rateMatch ? (' - ~' + rateMatch[1] + '%') : '';
      return '* Student ' + p1 + ' (' + enType + rateStr + '):';
    });

    // 3. Chuẩn hóa gạch đầu dòng năng lực
    s = s.replace(/^[-*•+–—]?\s*năng\s*lực\s*đặc\s*thù\s*:\s*/gim, '- Specific competences: ')
         .replace(/^[-*•+–—]?\s*phẩm\s*chất[,\s]+năng\s*lực\s*chung\s*:\s*/gim, '- General competences & Qualities: ')
         .replace(/^[-*•+–—]?\s*phẩm\s*chất\s*v[àa]\s*năng\s*lực\s*chung\s*:\s*/gim, '- General competences & Qualities: ')
         .replace(/^[-*•+–—]?\s*năng\s*lực\s*chung\s*:\s*/gim, '- General competences: ')
         .replace(/^[-*•+–—]?\s*phẩm\s*chất\s*:\s*/gim, '- Qualities: ')
         .replace(/^[-*•+–—]?\s*đối\s*với\s*học\s*sinh\s*(?:hòa\s*nhập|khuyết\s*tật)\s*:\s*/gim, '- For inclusive students: ');

    // 4. Dịch các cụm từ tiếng Việt sang tiếng Anh
    s = s.replace(/học\s*sinh\s*hòa\s*nhập/gi, 'inclusive student')
         .replace(/học\s*sinh\s*khuyết\s*tật/gi, 'inclusive student')
         .replace(/học\s*sinh\s*hn/gi, 'inclusive student')
         .replace(/\bHSHN\b/g, 'inclusive student')
         .replace(/giáo\s*viên\s*(?:hướng\s*dẫn|hỗ\s*trợ|giúp\s*đỡ)/gi, 'teacher guides')
         .replace(/bạn\s*cùng\s*bàn\s*(?:hỗ\s*trợ|kèm\s*cặp|giúp\s*đỡ)/gi, 'with peer buddy support')
         .replace(/bạn\s*kèm\s*bạn/gi, 'peer buddy model')
         .replace(/thẻ\s*cảm\s*xúc\s*(?:\(vui\s*[-–—]\s*không\s*vui\))?/gi, 'emotion cards (happy/sad)')
         .replace(/thẻ\s*cảm\s*xúc/gi, 'emotion cards')
         .replace(/thẻ\s*đúng\s*[-–—/]\s*sai/gi, 'True/False cards')
         .replace(/thẻ\s*đ[/]s/gi, 'True/False cards')
         .replace(/thẻ\s*từ\s*ngữ/gi, 'word cards')
         .replace(/thẻ\s*tranh/gi, 'picture cards')
         .replace(/bảng\s*con/gi, 'mini-board')
         .replace(/đồ\s*dùng\s*trực\s*quan/gi, 'visual aids')
         .replace(/vật\s*thật/gi, 'realia')
         .replace(/tiếp\s*thu\s*chậm/gi, 'slower learning pace')
         .replace(/ghi\s*nhớ\s*ngắn\s*hạn/gi, 'short-term memory')
         .replace(/quan\s*sát\s*tranh/gi, 'observe pictures')
         .replace(/lắng\s*nghe/gi, 'listen attentively')
         .replace(/nhắc\s*lại\s*từ/gi, 'repeat target words')
         .replace(/chỉ\s*tranh/gi, 'point to pictures')
         .replace(/vỗ\s*tay/gi, 'clap hands')
         .replace(/hòa\s*nhập\s*vui\s*vẻ/gi, 'participate joyfully');

    // 5. Nếu phát hiện câu tiếng Việt trong thân bài do AI sinh ra, tự động làm sạch hoặc sinh lại chuẩn mực
    if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i.test(s) && lesson) {
      var lines = s.split(/\r?\n/);
      var sanitizedLines = [];
      for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i.test(l)) {
          var cleanTrans = (typeof IntegrationService !== 'undefined' && IntegrationService.translateVnToEnglish)
            ? IntegrationService.translateVnToEnglish(l)
            : l;
          if (/specific\s*competence/i.test(l)) {
            sanitizedLines.push(cleanTrans || '- Specific competences: Recognize core target vocabulary with visual flashcards and peer buddy support; exempt from full-sentence production.');
            continue;
          }
          if (/general\s*competence/i.test(l)) {
            sanitizedLines.push(cleanTrans || '- General competences & Qualities: Build confidence in English learning, cooperate pleasantly with desk-mate, and complete manageable tasks.');
            continue;
          }
          if (/^\*\s*(?:student|type)/i.test(l)) {
            sanitizedLines.push(l.replace(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ].*$/, '').trim() + ')');
            continue;
          }
          continue;
        }
        sanitizedLines.push(l);
      }
      s = sanitizedLines.join('\n');
    }

    return s;
  },

  /**
   * Xử lý một nhóm (chunk) bài dạy gửi cho Gemini để biên soạn lại YCCĐ, đồ dùng và hoạt động cho học sinh khuyết tật (Hỗ trợ 1 - 3 học sinh)
   */
  _processDisabilityChunkWithGemini: async function(chunkLessons, disabilityConfig, apiKey) {
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

    var sampleSubj = (chunkLessons[0] ? (chunkLessons[0].subjectKey || chunkLessons[0].subjectName || chunkLessons[0].subject || '') : '') || (disabilityConfig && disabilityConfig.subjectKey) || '';
    var isEnglishSubject = sampleSubj.includes('tieng_anh') ||
      sampleSubj.includes('english') ||
      (chunkLessons && chunkLessons.some(function(l) {
        var s = ((l.subjectKey || '') + ' ' + (l.subjectName || '') + ' ' + (l.subject || '') + ' ' + (l.lessonTitle || '') + ' ' + (l.title || '')).toLowerCase();
        var yStr = (Array.isArray(l.yccd) ? l.yccd.join(' ') : (l.yccd || '')).toLowerCase();
        return s.includes('tieng_anh') || s.includes('tiếng anh') || s.includes('english') || /unit\s+\d+|starter\b|review\s+\d+|short\s+story|fun\s+time/i.test(s) || /objectives|pupils will be able to/i.test(yStr);
      }));
    if (isEnglishSubject && (!sampleSubj || !sampleSubj.includes('tieng_anh'))) sampleSubj = 'tieng_anh';
    var sampleGrade = (chunkLessons[0] ? chunkLessons[0].grade : 1) || (disabilityConfig ? disabilityConfig.grade : 1);

    var itemsToSend = chunkLessons.map(function(les, index) {
      var title = (les.lessonTitle || les.title || ('Bài học ' + (index + 1))).trim();
      var subj = les.subjectName || les.subject || (typeof IntegrationService !== 'undefined' && IntegrationService.getSubjectDisplayName ? IntegrationService.getSubjectDisplayName(les.subjectKey) : '') || '';
      var gr = les.grade || disabilityConfig.grade || 5;

      // Lọc YCCĐ đặc thù / cốt lõi từ bài dạy
      var rawYccd = les.yccd || [];
      if (typeof rawYccd === 'string') rawYccd = rawYccd.split('\n');
      var specificYccd = [];
      var inDacThu = false;
      for (var i = 0; i < rawYccd.length; i++) {
        var line = (rawYccd[i] || '').trim();
        if (/học sinh khuyết tật|inclusive student/i.test(line)) continue;
        if (/1\.\s*(năng\s*lực\s*đặc\s*thù|kiến\s*thức|knowledge)/i.test(line)) { inDacThu = true; continue; }
        if (/2\.\s*(năng\s*lực\s*chung|phẩm\s*chất|competence)|3\.\s*(phẩm\s*chất|attribute|qualit)|4\.\s*(tích\s*hợp|integration)/i.test(line)) { inDacThu = false; break; }
        if (inDacThu && line) specificYccd.push(line);
      }
      if (specificYccd.length === 0) {
        specificYccd = rawYccd.filter(function(l) {
          return l && !/học sinh khuyết tật|tự chủ|giao tiếp|giải quyết|chăm chỉ|yêu nước|nhân ái|trách nhiệm|trung thực/i.test(l);
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

      if (isEnglishSubject) {
        var enContent = self.extractLessonEnglishKeyContent ? self.extractLessonEnglishKeyContent(les) : null;
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

    var studentInfoSections = studentsList.map(function(st, sIdx) {
      if (isEnglishSubject) {
        var enTypeName = self.getDisabilityEnglishTypeName ? self.getDisabilityEnglishTypeName(st.disabilityType) : (st.disabilityTypeName || self.getDisabilityTypeName(st.disabilityType));
        var enGuide = self.getDisabilityGuidanceEnglish ? self.getDisabilityGuidanceEnglish(st.disabilityType, st.cognitiveRate, st.notes, sampleGrade) : '';
        var titleStr = `STUDENT ${sIdx + 1}${st.name ? (' (' + st.name + ')') : ''}:`;
        return `${titleStr}
- Special Education Needs (SEN) / Disability type: ${enTypeName}
- Cognitive / Reception capacity: approximately ${st.cognitiveRate}% compared to standard grade level
${st.notes ? ('- Teacher notes: ' + st.notes) : ''}
- Differentiated pedagogical guidelines:
${enGuide}`;
      } else {
        var sGuide = self.getDisabilityGuidance(st.disabilityType, st.cognitiveRate, st.notes, sampleSubj, sampleGrade);
        var titleStr = `HỌC SINH ${sIdx + 1}${st.name ? (' (' + st.name + ')') : ''}:`;
        return `${titleStr}
- Dạng tật: ${st.disabilityTypeName || self.getDisabilityTypeName(st.disabilityType)}
- Mức độ nhận thức / tiếp thu: khoảng ${st.cognitiveRate}% so với chuẩn chung của lớp
${st.notes ? ('- Ghi chú riêng từ giáo viên: ' + st.notes) : ''}
- Hướng dẫn điều chỉnh sư phạm cho dạng tật này:
${sGuide}`;
      }
    }).join('\n\n');

    var isBoth = (disabilityConfig && disabilityConfig.scope === 'both');
    var promptRules = '';
    var sampleJson = '';

    if (!isBoth) {
      // CHẾ ĐỘ 1: CHỈ TÍCH HỢP YCCĐ (MỤC I)
      if (!isMulti) {
        var singleSt = studentsList[0];
        if (isEnglishSubject) {
          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (PRIMARY ENGLISH LESSON PLAN):
1. STRICT LANGUAGE REQUIREMENT: Because this is an English lesson plan, ALL outputs (disabilityYccd and disabilityDodung) MUST BE 100% IN NATURAL, IDIOMATIC ENGLISH. STRICTLY ZERO VIETNAMESE WORDS OR PHRASES ALLOWED (no "HSHN", no "Năng lực đặc thù", no "Dạng 1", no Vietnamese accents).
2. LESSON-SPECIFIC CONTENT BINDING (CRITICAL):
   - You MUST directly incorporate the specific target phonics/sound (e.g. /b/, /p/, /t/) and 1–2 target words (e.g. book, ball; pasta, pizza) from EACH lesson's data.
   - For EACH lesson, directly cite the target sound and 1–2 words in the adapted objective.
   - Tailor the objectives directly to the lesson's communicative content (e.g., pointing to flashcards, joining chants with gestures).
3. NO REPETITIVE BOILERPLATE: Avoid identical copy-paste sentences across lessons. Vary learning verbs and focus.
4. STRUCTURE OF OBJECTIVES (disabilityYccd) MUST CONTAIN EXACTLY 2 BULLET POINTS (separated by newline \\n):
   - Specific competences: [State core knowledge differentiated to ~${singleSt.cognitiveRate}% of standard load; specify receptive recognition and repetition of the lesson's target sound and 1–2 key words using flashcards/realia with teacher/peer scaffolding; clearly state exemptions, e.g., exempt from full-sentence spoken output, independent writing, or rapid choral drills].
   - General competences & Qualities: [Child-friendly, encouraging social-emotional objectives: build self-confidence in pronunciation and chanting, actively cooperate with desk buddy in pointing games, and display perseverance].
5. TEACHING AIDS (disabilityDodung): Specify 1 concise line in English (e.g., "- For inclusive student${singleSt.name ? ' (' + singleSt.name + ')' : ''}: Picture flashcards, emotion cards (happy/sad), mini-board, realia, peer buddy support.").`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Specific competences: With teacher scaffolding and peer buddy assistance, recognize the sound of [target phonics] and identify 1–2 familiar words ([target words]) using visual flashcards; point to matching pictures in Activity 1–2; exempt from producing full sentences or independent speaking.\\n- General competences & Qualities: Build self-confidence in English pronunciation; cooperate actively with desk-mate in picture-pointing games and complete manageable tasks.",
    "disabilityDodung": "- For inclusive student: Picture flashcards, emotion cards (happy/sad), mini-board, realia, peer buddy support."
  }
]`;
        } else {
          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG (CHUẨN CV 2345):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của học sinh; TUYỆT ĐỐI KHÔNG dùng mẫu câu rập khuôn, sáo rỗng.
2. CẤU TRÚC YCCĐ (disabilityYccd) BẮT BUỘC ĐỦ 2 GẠCH ĐẦU DÒNG (PHÂN TÁCH BẰNG DẤU XUỐNG DÒNG \\n):
   - Năng lực đặc thù: [Chỉ rõ kiến thức cốt lõi bám sát bài, môn học và khối lớp; giới hạn phạm vi số/kiến thức cụ thể, định lượng rõ hoàn thành khoảng ${singleSt.cognitiveRate}% khối lượng bài tập nhận biết cơ bản trong SGK (chỉ định rõ Bài 1 hoặc Bài 2 theo mẫu), và loại trừ rõ phần giảm tải không bắt buộc làm].
   - Phẩm chất, năng lực chung: [Rèn luyện tính tự tin phát âm/làm bài trước bạn, tích cực hòa nhập, hợp tác cùng bạn học (mô hình bạn kèm bạn) và có ý thức nỗ lực hoàn thành nhiệm vụ vừa sức].
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể 1 dòng đồ dùng trực quan (ví dụ: "- Đối với học sinh hòa nhập: Thẻ cảm xúc, thẻ Đ/S, bảng con, phiếu học tập/tranh ảnh trực quan...").`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...",
    "disabilityDodung": "- Đối với học sinh hòa nhập: Thẻ cảm xúc, thẻ Đ/S, bảng con, phiếu bài tập trực quan."
  }
]`;
        }
      } else {
        if (isEnglishSubject) {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' ' + st.name) : '';
            return `* Student ${sIdx + 1}${sName ? (' (' + sName.trim() + ')') : ''} (${sShort} - ~${st.cognitiveRate}%):
- Specific competences: [Core adapted objectives citing target sound/words and clear exemptions for ${sShort}]
- General competences & Qualities: [Confidence, social inclusion, peer cooperation]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- For student ${sIdx + 1}${sName} (${sShort}): [Adapted visual aids in English]`;
          }).join('\n');

          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (${studentsList.length} INCLUSIVE STUDENTS - ENGLISH LESSON PLAN):
1. STRICT LANGUAGE REQUIREMENT: All outputs MUST BE 100% IN NATURAL, IDIOMATIC ENGLISH. ZERO VIETNAMESE WORDS ALLOWED.
2. LESSON-SPECIFIC CONTENT BINDING (CRITICAL):
   - You MUST directly incorporate each lesson's target phonics/sound and 1–2 target words from the lesson data.
   - Differentiate according to each student's specific disability profile and cognitive capacity.
3. NO REPETITIVE BOILERPLATE: Vary phrasing between lessons and between students. Avoid cookie-cutter templates.
4. STRUCTURE OF OBJECTIVES (disabilityYccd) MUST BE PREPARED FOR ALL ${studentsList.length} STUDENTS. For EACH student, output a header and EXACTLY 2 BULLET POINTS:
${stuHeadersExample}
5. TEACHING AIDS (disabilityDodung): Specify visual aids in English for each student (separated by newline \\n):
${dodungExample}`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Student ${sIdx + 1}${sName} (${sShort} - ~${st.cognitiveRate}%):\\n- Specific competences: ...\\n- General competences & Qualities: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- For student ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}"
  }
]`;
        } else {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Dạng ${sIdx + 1}: ${sShort}${sName}
- Năng lực đặc thù: [Mục tiêu cốt lõi, giảm tải bám sát bài và dạng tật ${sShort}]
- Phẩm chất, năng lực chung: [Rèn luyện tự tin, hòa nhập, hợp tác cùng bạn]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): [Đồ dùng trực quan phù hợp]`;
          }).join('\n');

          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG CHO TỪNG HỌC SINH (${studentsList.length} HỌC SINH HÒA NHẬP):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của từng em; TUYỆT ĐỐI KHÔNG rập khuôn.
2. CẤU TRÚC YCCĐ (disabilityYccd): BẮT BUỘC BIÊN SOẠN RIÊNG CHO ĐỦ ${studentsList.length} HỌC SINH. Với MỖI HỌC SINH, xuất tiêu đề bắt đầu bằng dấu * và CHÍNH XÁC 2 GẠCH ĐẦU DÒNG (Năng lực đặc thù và Phẩm chất, năng lực chung):
${stuHeadersExample}
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể đồ dùng trực quan cho từng em (phân tách bằng xuống dòng \\n):
${dodungExample}`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Dạng ${sIdx + 1}: ${sShort}${sName}\\n- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}"
  }
]`;
        }
      }
    } else {
      // CHẾ ĐỘ 2: TÍCH HỢP CẢ YCCĐ (MỤC I) LẪN HOẠT ĐỘNG (MỤC III)
      if (!isMulti) {
        var singleSt = studentsList[0];
        if (isEnglishSubject) {
          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (PRIMARY ENGLISH LESSON PLAN):
1. STRICT LANGUAGE REQUIREMENT: All outputs (disabilityYccd, disabilityDodung, and disabilityActivities) MUST BE 100% IN NATURAL, IDIOMATIC ENGLISH. ZERO VIETNAMESE WORDS ALLOWED.
2. LESSON-SPECIFIC CONTENT BINDING (CRITICAL):
   - You MUST extract and directly cite the specific target phonics/sound and 1–2 target vocabulary words from the lesson data in BOTH the objectives and activities.
   - For EACH lesson, directly cite the target sound and 1–2 words.
3. NO REPETITIVE BOILERPLATE: Vary phrasing between lessons. Avoid cookie-cutter templates.
4. STRUCTURE OF OBJECTIVES (disabilityYccd) MUST CONTAIN EXACTLY 2 BULLET POINTS:
   - Specific competences: [State core knowledge differentiated to ~${singleSt.cognitiveRate}% of standard load; specify receptive recognition and repetition of the lesson's target sound and 1–2 key words using flashcards/realia with teacher/peer scaffolding; clearly state exemptions].
   - General competences & Qualities: [Confidence, social inclusion, joy in singing/chanting, peer cooperation].
5. TEACHING AIDS (disabilityDodung): Specify 1 concise line of visual teaching aids in English (e.g., "- For inclusive student: Picture flashcards, emotion cards (happy/sad), mini-board, realia, peer buddy support.").
6. PROCEDURAL ACTIVITIES (disabilityActivities): Must clearly state adapted Teacher's and Student's actions in English incorporating the lesson content:
   - khoiDong: { "teacherAct": "- Teacher guides inclusive student to observe warm-up illustrations/chant and gives manageable prompts.", "studentAct": "* Inclusive student claps hands to rhythm, responds to greetings, and joins actions happily." }
   - luyenTap: { "teacherAct": "- Teacher assists inclusive student with flashcards and mini-board to identify and repeat target sound and 1-2 target words with desk buddy support.", "studentAct": "* Inclusive student points to pictures, repeats target words, and completes adapted Level 1 tasks with peer help." }
   - vanDung: { "teacherAct": "- Teacher invites inclusive student to participate in lesson wrap-up and reflection.", "studentAct": "* Inclusive student reflects on feelings using emotion cards (happy/sad) and receives praise from classmates." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Specific competences: ...\\n- General competences & Qualities: ...",
    "disabilityDodung": "- For inclusive student: Picture flashcards, emotion cards (happy/sad), mini-board, realia, peer buddy support.",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- Teacher guides inclusive student to observe warm-up pictures/chant and gives manageable prompts.",
        "studentAct": "* Inclusive student claps hands to rhythm and repeats keywords prompted by teacher."
      },
      "luyenTap": {
        "teacherAct": "- Teacher assists inclusive student with flashcards to recognize and repeat target words on mini-board (desk buddy support).",
        "studentAct": "* Inclusive student points to picture cards and repeats 1-2 words on mini-board with peer help."
      },
      "vanDung": {
        "teacherAct": "- Teacher invites inclusive student to participate in lesson wrap-up and praises effort.",
        "studentAct": "* Inclusive student reflects on feelings using emotion cards (happy/sad) and receives class applause."
      }
    }
  }
]`;
        } else {
          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG (CHUẨN CV 2345):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của học sinh; TUYỆT ĐỐI KHÔNG dùng mẫu câu rập khuôn, sáo rỗng.
2. CẤU TRÚC YCCĐ (disabilityYccd) BẮT BUỘC ĐỦ 2 GẠCH ĐẦU DÒNG (PHÂN TÁCH BẰNG DẤU XUỐNG DÒNG \\n):
   - Năng lực đặc thù: [Chỉ rõ kiến thức cốt lõi bám sát bài, môn học và khối lớp; giới hạn phạm vi số/kiến thức cụ thể, định lượng rõ hoàn thành khoảng ${singleSt.cognitiveRate}% khối lượng bài tập nhận biết cơ bản trong SGK (chỉ định rõ Bài 1 hoặc Bài 2 theo mẫu), và loại trừ rõ phần giảm tải không bắt buộc làm].
   - Phẩm chất, năng lực chung: [Rèn luyện tính tự tin phát âm/làm bài trước bạn, tích cực hòa nhập, hợp tác cùng bạn học và có ý thức nỗ lực hoàn thành nhiệm vụ vừa sức].
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể 1 dòng đồ dùng trực quan.
4. TIẾN TRÌNH HOẠT ĐỘNG (disabilityActivities): Phải nêu rõ hành động của GV và HS hòa nhập cho từng hoạt động, gắn sát kiến thức của bài học:
   - khoiDong: { "teacherAct": "- GV hướng dẫn HSHN ...", "studentAct": "* HSHN ..." }
   - luyenTap: { "teacherAct": "- GV HD HSHN làm bài tập ...", "studentAct": "* HSHN làm bài tập ... vào bảng con/giơ thẻ Đ/S..." }
   - vanDung: { "teacherAct": "- GV hướng dẫn HSHN ...", "studentAct": "* HSHN cùng bạn chia sẻ và đánh giá tiết học bằng thẻ cảm xúc..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...",
    "disabilityDodung": "- Đối với học sinh hòa nhập: Thẻ cảm xúc, thẻ Đ/S, bảng con, phiếu bài tập trực quan.",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- GV hướng dẫn HSHN quan sát tranh/bài hát khởi động, giao nhiệm vụ vừa sức.",
        "studentAct": "* HSHN quan sát tranh, vỗ tay và nhắc lại từ khóa theo gợi ý của cô."
      },
      "luyenTap": {
        "teacherAct": "- GV HD HSHN làm bài tập nhận biết cơ bản Bài 1 trên bảng con (bạn cùng bàn hỗ trợ).",
        "studentAct": "* HSHN thực hiện bài tập nhận biết đơn giản vào bảng con với sự hỗ trợ của bạn cùng bàn."
      },
      "vanDung": {
        "teacherAct": "- GV hướng dẫn HSHN tham gia chia sẻ và đánh giá tiết học.",
        "studentAct": "* HSHN cùng bạn chia sẻ cảm nghĩ và tham gia đánh giá tiết học bằng thẻ cảm xúc."
      }
    }
  }
]`;
        }
      } else {
        if (isEnglishSubject) {
          var stuHeadersExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' ' + st.name) : '';
            return `* Student ${sIdx + 1}${sName ? (' (' + sName.trim() + ')') : ''} (${sShort} - ~${st.cognitiveRate}%):
- Specific competences: [Core adapted objectives citing target sound/words and clear exemptions for ${sShort}]
- General competences & Qualities: [Confidence, social inclusion, peer cooperation]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
              ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
              : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- For student ${sIdx + 1}${sName} (${sShort}): [Adapted visual aids in English]`;
          }).join('\n');

          promptRules = `MANDATORY PEDAGOGICAL RULES FOR INCLUSIVE EDUCATION (${studentsList.length} INCLUSIVE STUDENTS - ENGLISH LESSON PLAN):
1. STRICT LANGUAGE REQUIREMENT: All outputs MUST BE 100% IN NATURAL, IDIOMATIC ENGLISH. ZERO VIETNAMESE WORDS ALLOWED.
2. LESSON-SPECIFIC CONTENT BINDING (CRITICAL):
   - You MUST directly incorporate each lesson's target phonics/sound and 1–2 target words from the lesson data in BOTH objectives and activities.
   - Differentiate according to each student's specific disability profile and cognitive capacity.
3. NO REPETITIVE BOILERPLATE: Vary phrasing between lessons and between students. Avoid cookie-cutter templates.
4. STRUCTURE OF OBJECTIVES (disabilityYccd) MUST BE PREPARED FOR ALL ${studentsList.length} STUDENTS. For EACH student, output a header and EXACTLY 2 BULLET POINTS:
${stuHeadersExample}
5. TEACHING AIDS (disabilityDodung): Specify visual aids in English for each student (separated by newline \\n):
${dodungExample}
6. PROCEDURAL ACTIVITIES (disabilityActivities): Must clearly state adapted Teacher's and Students' actions in English for each phase incorporating lesson content:
   - khoiDong: { "teacherAct": "- Teacher guides inclusive students ...", "studentAct": "* Inclusive students ..." }
   - luyenTap: { "teacherAct": "- Teacher assists inclusive students with adapted practice on target words/sound ...", "studentAct": "* Inclusive students perform basic tasks according to individual ability ..." }
   - vanDung: { "teacherAct": "- Teacher guides inclusive students to participate in lesson wrap-up ...", "studentAct": "* Inclusive students share feelings and reflect on the lesson using emotion cards..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Student ${sIdx + 1}${sName} (${sShort} - ~${st.cognitiveRate}%):\\n- Specific competences: ...\\n- General competences & Qualities: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityEnglishShortTypeName)
        ? IntegrationService.getDisabilityEnglishShortTypeName(st.disabilityType)
        : (self.getDisabilityEnglishShortTypeName ? self.getDisabilityEnglishShortTypeName(st.disabilityType) : 'SEN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- For student ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- Teacher guides inclusive students to observe warm-up illustrations/chant, assigning manageable prompts.",
        "studentAct": "* Inclusive students observe pictures, clap along, and join warm-up actions with peers."
      },
      "luyenTap": {
        "teacherAct": "- Teacher assists each inclusive student with flashcards and mini-board to identify and repeat target words (peer support).",
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
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' (' + st.name + ')') : '';
            return `* Dạng ${sIdx + 1}: ${sShort}${sName}
- Năng lực đặc thù: [Mục tiêu cốt lõi, giảm tải bám sát bài và dạng tật ${sShort}]
- Phẩm chất, năng lực chung: [Rèn luyện tự tin, hòa nhập, hợp tác cùng bạn]`;
          }).join('\n');

          var dodungExample = studentsList.map(function(st, sIdx) {
            var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
              ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
              : (st.disabilityTypeName || 'HSHN');
            var sName = st.name ? (' ' + st.name) : '';
            return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): [Đồ dùng trực quan phù hợp]`;
          }).join('\n');

          promptRules = `QUY TẮC BẮT BUỘC ĐẢM BẢO CHUẨN MỰC SƯ PHẠM ĐỊNH LƯỢNG CHO TỪNG HỌC SINH (${studentsList.length} HỌC SINH HÒA NHẬP):
1. VĂN PHONG SƯ PHẠM: Tự nhiên, sinh động, khích lệ sự hòa nhập và tiến bộ của từng em; TUYỆT ĐỐI KHÔNG rập khuôn.
2. CẤU TRÚC YCCĐ (disabilityYccd): BẮT BUỘC BIÊN SOẠN RIÊNG CHO ĐỦ ${studentsList.length} HỌC SINH. Với MỖI HỌC SINH, xuất tiêu đề bắt đầu bằng dấu * và CHÍNH XÁC 2 GẠCH ĐẦU DÒNG:
${stuHeadersExample}
3. ĐỒ DÙNG DẠY HỌC (disabilityDodung): Nêu cụ thể đồ dùng trực quan cho từng em:
${dodungExample}
4. TIẾN TRÌNH HOẠT ĐỘNG (disabilityActivities): Nêu rõ hành động của GV và các HSHN trong lớp gắn sát kiến thức của bài học:
   - khoiDong: { "teacherAct": "- GV hướng dẫn các HSHN ...", "studentAct": "* Các HSHN ..." }
   - luyenTap: { "teacherAct": "- GV HD từng HSHN làm bài tập nhận biết vừa sức ...", "studentAct": "* Các HSHN thực hiện bài tập theo khả năng ..." }
   - vanDung: { "teacherAct": "- GV hướng dẫn các HSHN ...", "studentAct": "* Các HSHN cùng bạn chia sẻ và đánh giá tiết học bằng thẻ cảm xúc..." }`;

          sampleJson = `[
  {
    "id": 0,
    "disabilityYccd": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' (' + st.name + ')') : '';
      return `* Dạng ${sIdx + 1}: ${sShort}${sName}\\n- Năng lực đặc thù: ...\\n- Phẩm chất, năng lực chung: ...`;
    }).join('\\n')}",
    "disabilityDodung": "${studentsList.map(function(st, sIdx) {
      var sShort = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityShortTypeName)
        ? IntegrationService.getDisabilityShortTypeName(st.disabilityType)
        : (st.disabilityTypeName || 'HSHN');
      var sName = st.name ? (' ' + st.name) : '';
      return `- Đối với học sinh ${sIdx + 1}${sName} (${sShort}): ...`;
    }).join('\\n')}",
    "disabilityActivities": {
      "khoiDong": {
        "teacherAct": "- GV hướng dẫn các HSHN quan sát tranh/bài hát khởi động, giao nhiệm vụ vừa sức.",
        "studentAct": "* Các HSHN quan sát tranh, vỗ tay và nhắc lại từ khóa theo gợi ý của cô."
      },
      "luyenTap": {
        "teacherAct": "- GV HD từng HSHN làm bài tập nhận biết cơ bản Bài 1 trên bảng con (bạn cùng bàn hỗ trợ).",
        "studentAct": "* Các HSHN thực hiện bài tập nhận biết đơn giản vào bảng con với sự hỗ trợ của bạn cùng bàn."
      },
      "vanDung": {
        "teacherAct": "- GV hướng dẫn các HSHN tham gia chia sẻ và đánh giá tiết học.",
        "studentAct": "* Các HSHN cùng bạn chia sẻ cảm nghĩ và tham gia đánh giá tiết học bằng thẻ cảm xúc."
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
Below is the list of English lessons along with their key content (target phonics/letters, target vocabulary, topic) and original OBJECTIVES (YCCĐ).
Based on the specific content of EACH lesson:
1. Formulate individualized, differentiated objectives (disabilityYccd) tailored to each inclusive student's cognitive rate (${studentsList.length} student(s)) strictly in 100% NATURAL ENGLISH.
2. Directly cite the target phonics sound and 1–2 target vocabulary words in each lesson's adapted objective.
3. Vary phrasing between lessons to prevent boilerplate copy-paste repetition.
4. Specify adapted visual teaching aids (disabilityDodung) in ENGLISH.
CRITICAL REQUIREMENT: STRICTLY NO VIETNAMESE CHARACTERS OR PHRASES IN ANY PART OF THE OUTPUT.`
        : `TASK:
Below is the list of English lessons along with their key content (target phonics/letters, target vocabulary, topic) and original OBJECTIVES (YCCĐ).
Based on the specific content of EACH lesson:
1. Formulate individualized, differentiated objectives (disabilityYccd) tailored to each inclusive student's cognitive rate (${studentsList.length} student(s)) strictly in 100% NATURAL ENGLISH.
2. Directly cite the target phonics sound and 1–2 target vocabulary words in each lesson's adapted objective.
3. Vary phrasing between lessons to prevent boilerplate copy-paste repetition.
4. Specify adapted visual teaching aids (disabilityDodung) in ENGLISH.
5. Formulate adapted procedures (disabilityActivities: khoiDong, luyenTap, vanDung) with teacher and student actions strictly in ENGLISH incorporating the lesson content.
CRITICAL REQUIREMENT: STRICTLY NO VIETNAMESE CHARACTERS OR PHRASES IN ANY PART OF THE OUTPUT.`;
    } else {
      taskDescription = (!isBoth)
        ? `NHIỆM VỤ:
Dưới đây là danh sách các bài dạy kèm YÊU CẦU CẦN ĐẠT (YCCĐ) GỐC của từng bài.
Dựa vào YCCĐ GỐC, đặc thù môn học và khối lớp của TỪNG BÀI DẠY, hãy biên soạn:
1. YCCĐ phân hóa chi tiết, định lượng cụ thể theo mức nhận thức (chuẩn Thông tư 03 và CV 2345) dành cho học sinh khuyết tật học hòa nhập (${studentsList.length} học sinh).
2. Thiết bị / Đồ dùng dạy học trực quan hỗ trợ riêng cho từng học sinh này.`
        : `NHIỆM VỤ:
Dưới đây là danh sách các bài dạy kèm YÊU CẦU CẦN ĐẠT (YCCĐ) GỐC của từng bài.
Dựa vào YCCĐ GỐC, đặc thù môn học và khối lớp của TỪNG BÀI DẠY, hãy biên soạn đồng bộ:
1. YCCĐ phân hóa chi tiết, định lượng cụ thể theo mức nhận thức (chuẩn Thông tư 03 và CV 2345) dành cho học sinh khuyết tật học hòa nhập (${studentsList.length} học sinh).
2. Thiết bị / Đồ dùng dạy học trực quan hỗ trợ riêng cho từng học sinh này.
3. Hoạt động phân hóa cụ thể trong tiến trình dạy học (Khởi động, Luyện tập bài tập cơ bản, Vận dụng/Đánh giá) bám sát nội dung bài học, lời văn tự nhiên, ấm áp, ngắn gọn súc tích.`;
    }

    var systemRole = isEnglishSubject
      ? `You are an expert Primary English (ELT) Senior Teacher and Special Educational Needs (SEN / Inclusive Education) Specialist for the Vietnamese National Curriculum (GDPT 2018 - Global Success English Grade 1 & Grade 2).`
      : `Bạn là Chuyên gia Phương pháp Dạy học Tiểu học và Giáo dục Hòa nhập (Chương trình GDPT 2018, Thông tư 03/2018/TT-BGDĐT, chuẩn Công văn 2345/BGDĐT-GDTH).`;

    var prompt = `${systemRole}

${taskDescription}

${isEnglishSubject ? 'INCLUSIVE STUDENTS INFORMATION (' + studentsList.length + ' STUDENT' + (studentsList.length > 1 ? 'S' : '') + '):' : 'THÔNG TIN DANH SÁCH HỌC SINH KHUYẾT TẬT TRONG LỚP (' + studentsList.length + ' HỌC SINH):'}
${studentInfoSections}

${isEnglishSubject ? 'LESSONS LIST AND ORIGINAL OBJECTIVES:' : 'DANH SÁCH BÀI DẠY VÀ YCCĐ GỐC:'}
${JSON.stringify(itemsToSend, null, 2)}

${promptRules}

${isEnglishSubject ? 'RETURN PURE JSON ARRAY (without markdown ```json block):' : 'HÃY TRẢ VỀ KẾT QUẢ DƯỚI DẠNG MẢNG JSON THUẦN TÚY (không kèm mã markdown ```json):'}
${sampleJson}`;

    var rawResponse = await this.callGeminiApi(apiKey, prompt, {
      temperature: 0.4,
      maxTokens: 8192,
      responseMimeType: 'application/json'
    });

    var parsed = this.parseJsonSafely(rawResponse);
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
      list = this.extractDisabilityObjectsFromRaw(rawResponse);
    }

    if (!Array.isArray(list) || list.length === 0) {
      throw new Error('AI không trả về kết quả mảng JSON hợp lệ cho danh sách bài dạy.');
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
        if (typeof IntegrationService !== 'undefined' && typeof IntegrationService.ensureDisabilityYccdFull === 'function') {
          cleaned = IntegrationService.ensureDisabilityYccdFull(cleaned, chunkLessons[idx], disabilityConfig);
        }
        if (isEnglishSubject) {
          cleaned = self.sanitizeEnglishDisabilityText(cleaned, chunkLessons[idx], disabilityConfig);
        }
        chunkLessons[idx].disabilityYccdAI = cleaned;
        if (item.disabilityDodung) {
          chunkLessons[idx].disabilityDodungAI = isEnglishSubject ? self.sanitizeEnglishDisabilityText(item.disabilityDodung.trim(), chunkLessons[idx], disabilityConfig) : item.disabilityDodung.trim();
        }
        if (item.disabilityActivities) {
          var acts = item.disabilityActivities;
          if (isEnglishSubject && acts && typeof acts === 'object') {
            ['khoiDong', 'luyenTap', 'vanDung'].forEach(function(phase) {
              if (acts[phase]) {
                if (acts[phase].teacherAct) acts[phase].teacherAct = self.sanitizeEnglishDisabilityText(acts[phase].teacherAct, chunkLessons[idx], disabilityConfig);
                if (acts[phase].studentAct) acts[phase].studentAct = self.sanitizeEnglishDisabilityText(acts[phase].studentAct, chunkLessons[idx], disabilityConfig);
              }
            });
          }
          chunkLessons[idx].disabilityActivitiesAI = acts;
        }
      }
    });

    // Nếu trong nhóm có bài bị sót, tự động thử lại riêng cho từng bài sót đó
    var missingLessons = chunkLessons.filter(function(les) { return !les.disabilityYccdAI; });
    if (missingLessons.length > 0 && chunkLessons.length > 1) {
      for (var m = 0; m < missingLessons.length; m++) {
        var mLes = missingLessons[m];
        try {
          await self._processDisabilityChunkWithGemini([mLes], disabilityConfig, apiKey);
        } catch(subErr) {
          console.warn('Không thể biên soạn lại riêng cho bài bị sót:', mLes.title, subErr);
        }
      }
    }

    var missingCount = 0;
    chunkLessons.forEach(function(les) {
      if (!les.disabilityYccdAI) missingCount++;
    });
    if (missingCount > 0) {
      throw new Error('Gemini AI chưa hoàn thành đủ bài dạy trong nhóm (thiếu ' + missingCount + ' bài). Chế độ ngoại tuyến đã bị tắt hoàn toàn, vui lòng thử lại!');
    }

    return chunkLessons;
  },

  /**
   * Gửi danh sách bài dạy cho Gemini AI để biên soạn YCCĐ phân hóa cho học sinh khuyết tật
   * Tự động chia nhóm nhỏ (batching) tối ưu tốc độ, chống tràn token (MAX_TOKENS) và ngắt kết nối
   */
  adaptDisabilityYccdBatch: async function(lessons, disabilityConfig, apiKey) {
    if (!lessons || !lessons.length || !disabilityConfig || !disabilityConfig.enabled) {
      return lessons;
    }

    var key = apiKey;
    if (!key && typeof IntegrationService !== 'undefined' && IntegrationService.getGeminiApiKey) {
      key = IntegrationService.getGeminiApiKey();
    }
    if (!key && typeof window !== 'undefined' && window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) {
      key = window.CONFIG.DEFAULT_GEMINI_API_KEY;
    }
    if (!key) {
      throw new Error('Chưa có Gemini API Key để kết nối AI');
    }

    var self = this;
    var studentsList = (typeof IntegrationService !== 'undefined' && IntegrationService.getDisabilityStudentsList)
      ? IntegrationService.getDisabilityStudentsList(disabilityConfig)
      : (disabilityConfig.students || []);

    var isBoth = (disabilityConfig && disabilityConfig.scope === 'both');
    // Kích thước nhóm bài tối ưu:
    // Nếu chỉ YCCĐ: 3 bài nếu nhiều HS, 4 bài nếu 1 HS (nhẹ, nhanh gấp đôi, tránh 429)
    // Nếu cả 2 phần: 2 bài nếu nhiều HS, 3 bài nếu 1 HS (chống tràn token & timeout)
    var CHUNK_SIZE = (!isBoth)
      ? ((studentsList.length > 1) ? 3 : 4)
      : ((studentsList.length > 1) ? 2 : 3);
    var chunks = [];
    for (var i = 0; i < lessons.length; i += CHUNK_SIZE) {
      chunks.push(lessons.slice(i, i + CHUNK_SIZE));
    }

    for (var c = 0; c < chunks.length; c++) {
      // Khi có lỗi, ném lỗi ra ngoài để hệ thống báo lỗi kết nối rõ ràng thay vì nuốt lỗi
      await self._processDisabilityChunkWithGemini(chunks[c], disabilityConfig, key);
    }

    return lessons;
  },

  /**
   * Biên soạn YCCĐ cho một bài dạy đơn lẻ bằng Gemini AI
   */
  adaptSingleLessonDisability: async function(lesson, disabilityConfig, apiKey) {
    if (!lesson) return '';
    var list = [lesson];
    await this.adaptDisabilityYccdBatch(list, disabilityConfig, apiKey);
    return lesson.disabilityYccdAI || '';
  }
};

if (typeof window !== 'undefined') {
  window.AIDisabilityService = AIDisabilityService;
  if (window.AIService) {
    Object.assign(window.AIService, AIDisabilityService);
  }
}
if (typeof global !== 'undefined') {
  global.AIDisabilityService = AIDisabilityService;
  if (global.AIService) {
    Object.assign(global.AIService, AIDisabilityService);
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIDisabilityService;
}
