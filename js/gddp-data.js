/**
 * CƠ SỞ DỮ LIỆU TÍCH HỢP GIÁO DỤC ĐỊA PHƯƠNG (GDĐP) TỈNH TRÀ VINH
 * Chuẩn Công văn 2345/BGDĐT-GDTH & Quyết định 2727/QĐ-BGDĐT
 * Dành cho 5 khối lớp Tiểu học (Lớp 1 - 5)
 * Biên soạn & Tích hợp: Thầy Lê Thành Long (Trà Vinh)
 */

(function(root) {
  'use strict';

  var GDDP_TRA_VINH_ITEMS = [
  {
    "id": "gddp_tv_1",
    "grade": 1,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      2
    ],
    "lessonTitle": "Bài 2:Ngôi nhà của em",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Nhận biết đặc điểm kiểu nhà ở truyền thống vùng sông nước Nam Bộ (nhà vườn, nhà mái lá dừa nước, nhà ngói quanh vườn cây ăn trái, kênh rạch).",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Nhận biết đặc điểm kiểu nhà ở truyền thống vùng sông nước Nam Bộ (nhà vườn, nhà mái lá dừa nước, nhà ngói quanh vườn cây ăn trái, kênh rạch).",
    "teacherAct": "GV trình chiếu chùm ảnh về ngôi nhà vườn rợp bóng cây xanh ở vùng quê Trà Vinh (Cầu Kè, Càng Long, Châu Thành) với bờ kênh, cầu tre, hàng dừa soi bóng. Đặt câu hỏi: \"Ngôi nhà của người dân quê em thường được bao quanh bởi những cảnh vật gì?\". nhận xét, khen ngợi và giáo dục HS: Dù ở nông thôn hay thành thị, ngôi nhà luôn là tổ ấm thân thương, các em cần giữ gìn nhà cửa sạch sẽ, quét dọn rác lá quanh sân vườn.",
    "studentAct": "HS quan sát tranh, thảo luận nhóm đôi và chia sẻ: Nhà ở quê em thường gần bờ kênh, xung quanh có vườn cây ăn trái (nhãn, dừa, bưởi), trước sân có lu nước, hoa kiểng."
  },
  {
    "id": "gddp_tv_2",
    "grade": 1,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      6
    ],
    "lessonTitle": "Bài 6:Trường tiểu học của em",
    "topic": "Chủ đề 1 GDĐP 1: Phong tục chào hỏi ở quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 1: Phong tục chào hỏi ở quê em): Giữ gìn khuôn viên trường lớp xanh - sạch - đẹp, hình thành nét đẹp văn hóa chào hỏi lễ phép nơi trường học địa phương.",
    "activityTitle": "Hoạt động Vận dụng & Trải nghiệm:Giữ gìn khuôn viên trường lớp xanh - sạch - đẹp, hình thành nét đẹp văn hóa chào hỏi lễ phép nơi trường học địa phương.",
    "teacherAct": "GV dẫn dắt: \"Ngôi trường tiểu học ở quê hương chúng ta có nhiều cây bóng mát như phượng, bàng, dừa cảnh... Hằng ngày khi đến trường, các em chào hỏi thầy cô, bác bảo vệ và bạn bè như thế nào?\". khen ngợi tinh thần lễ phép của HS, nhắc nhở các em luôn giữ vệ sinh lớp học, không vứt rác bừa bãi ra sân trường để trường em luôn khang trang, tươi đẹp.",
    "studentAct": "HS thực hành sắm vai: Đứng ngay ngắn, khoanh tay trước ngực, mỉm cười và cất lời chào lễ phép \"Em chào thầy/cô ạ!\" theo đúng nét đẹp truyền thống của người dân Nam Bộ."
  },
  {
    "id": "gddp_tv_3",
    "grade": 1,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      13
    ],
    "lessonTitle": "Bài 13:Cây xung quanh em",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Nhận diện và nêu tên một số loài cây trồng đặc trưng vùng đồng bằng sông Cửu Long (cây dừa sáp Cầu Kè, cây đước ngập mặn Duyên Hải, cây nhãn xuồng...).",
    "activityTitle": "Hoạt động Khám phá & Nhận biết:Nhận diện và nêu tên một số loài cây trồng đặc trưng vùng đồng bằng sông Cửu Long (cây dừa sáp Cầu Kè, cây đước ngập mặn Duyên Hải, cây nhãn xuồng...).",
    "teacherAct": "GV trình chiếu hình ảnh rặng dừa soi bóng ven sông Cổ Chiên, vườn cây ăn trái Cầu Kè và rặng đước vươn rễ bám đất Duyên Hải (Trà Vinh). kết luận: Cây xanh là tài sản quý báu của quê hương, giúp không khí trong lành; hướng dẫn HS chăm sóc chậu cây nhỏ ở trường và không bẻ cành hái lá.",
    "studentAct": "HS quan sát tranh, chỉ rõ các bộ phận thân, lá, quả của cây dừa, cây bưởi và chia sẻ hiểu biết về lợi ích của cây: cho quả ngọt, bóng mát, nước dừa giải khát, gỗ dừa làm đồ gia dụng."
  },
  {
    "id": "gddp_tv_4",
    "grade": 1,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      15
    ],
    "lessonTitle": "Bài 15:Con vật xung quanh em",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Nhận biết hình dáng, ích lợi của các con vật nuôi quen thuộc và các loài thủy sản đặc trưng vùng sông nước (cá tra, tôm sú, đàn vịt chạy đồng, chim cò ở cồn bãi).",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Nhận biết hình dáng, ích lợi của các con vật nuôi quen thuộc và các loài thủy sản đặc trưng vùng sông nước (cá tra, tôm sú, đàn vịt chạy đồng, chim cò ở cồn bãi).",
    "teacherAct": "GV tổ chức trò chơi \"Đố vui về các con vật quê em\": Chiếu hình ảnh bóng của các con vật (chim cò, con vịt, cá bống kèo, con trâu) và phát âm thanh tiếng kêu/tiếng quẫy nước để HS đoán. chốt kiến thức: Các con vật nuôi và động vật tự nhiên gắn liền với đời sống lao động của người nông dân quê ta; nhắc nhở HS đối xử nhân hậu, chăm sóc và bảo vệ vật nuôi an toàn.",
    "studentAct": "HS hào hứng giơ tay đoán tên con vật, mô tả hình dạng bên ngoài và nơi sống của chúng (con vịt bơi dưới mương nước, đàn cò trắng bay lượn trên đồng lúa, cá sống dưới sông)."
  },
  {
    "id": "gddp_tv_5",
    "grade": 1,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      22
    ],
    "lessonTitle": "Bài 22:Chăm sóc và bảo vệ cây trồng, vật nuôi",
    "topic": "Chủ đề 8 GDĐP 1: Bảo vệ môi trường nơi em sống",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 1: Bảo vệ môi trường nơi em sống): Thực hành tưới nước, bắt sâu cho cây xanh vườn trường và gia đình; bảo vệ đàn gia cầm, gia súc tại quê hương.",
    "activityTitle": "Hoạt động Vận dụng & Thực hành:Thực hành tưới nước, bắt sâu cho cây xanh vườn trường và gia đình; bảo vệ đàn gia cầm, gia súc tại quê hương.",
    "teacherAct": "GV chiếu video ngắn quay cảnh bác nông dân Nam Bộ cẩn thận tưới mát cho liếp rau, bón phân cho cây ăn trái và chăm sóc đàn gà con. nhận xét, tuyên dương các nhóm thực hành khéo léo, dặn dò HS rửa tay sạch bằng xà phòng sau khi chăm sóc cây cối, thú cưng.",
    "studentAct": "HS chia nhóm 4, cùng thực hành động tác mô phỏng xới đất, nhổ cỏ dại, tưới nước bằng bình hoa sen mini cho bồn hoa lớp học; chia sẻ việc mình đã giúp cha mẹ cho gà vịt ăn ở nhà."
  },
  {
    "id": "gddp_tv_6",
    "grade": 1,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      29
    ],
    "lessonTitle": "Bài 29:Nơi em sống",
    "topic": "Chủ đề 3 GDĐP 1: Danh lam thắng cảnh quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 1: Danh lam thắng cảnh quê em): Khám phá cảnh quan xóm ấp, cù lao xanh tươi (Cồn Chim, Cồn Long Trị, Cù lao Tân Quy - Trà Vinh) và công trình cầu Cổ Chiên nối nhịp đôi bờ.",
    "activityTitle": "Hoạt động Khám phá & Giới thiệu:Khám phá cảnh quan xóm ấp, cù lao xanh tươi (Cồn Chim, Cồn Long Trị, Cù lao Tân Quy - Trà Vinh) và công trình cầu Cổ Chiên nối nhịp đôi bờ.",
    "teacherAct": "GV trình chiếu bản đồ tranh vẽ sinh động và ảnh chụp toàn cảnh cù lao xanh ngát giữa dòng sông quê hương Trà Vinh, cây cầu Cổ Chiên nối nhịp đôi bờ. tổng kết: Khắc sâu lòng tự hào về mảnh đất quê hương trù phú, nhắc nhở HS yêu quý hàng xóm láng giềng, giữ gìn đường làng ngõ xóm luôn phong quang, sạch đẹp.",
    "studentAct": "HS thảo luận nhóm đôi: Nêu tên ấp/khóm, xã/phường nơi mình đang ở; kể cho bạn nghe những cảnh đẹp quen thuộc quanh nhà (bến đò, rặng dừa, đồng lúa, chợ quê)."
  },
  {
    "id": "gddp_tv_7",
    "grade": 1,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      5
    ],
    "lessonTitle": "Bài 23:Âm u, ư",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Luyện đọc các từ ngữ ứng dụng có âm / vần đang học gắn với sản vật địa phương (cây dừa, mứt dừa, đò đưa, củ từ...).",
    "activityTitle": "Hoạt động Đọc mở rộng & Luyện nói:Luyện đọc các từ ngữ ứng dụng có âm / vần đang học gắn với sản vật địa phương (cây dừa, mứt dừa, đò đưa, củ từ...).",
    "teacherAct": "GV đưa ra tranh minh họa rặng dừa xanh mướt và đĩa mứt dừa thơm ngon; viết lên bảng từ ngữ ứng dụng: \"cây dừa\", \"mứt dừa\". chỉnh sửa phát âm chuẩn cho HS; giải thích ngắn gọn: Cây dừa sáp và cây dừa nước là biểu tượng thân thương của quê hương Trà Vinh, cho ta bóng mát, trái ngọt và làm nên nhiều món bánh mứt nức tiếng.",
    "studentAct": "HS đánh vần, đọc trơn từ \"cây dừa\", \"mứt dừa\"; thi đua đọc to, rõ ràng trước lớp; nói 1 câu có từ \"cây dừa\" (VD: \"Quê em có nhiều cây dừa\")."
  },
  {
    "id": "gddp_tv_8",
    "grade": 1,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      11
    ],
    "lessonTitle": "Bài 53:Vần anh, ach",
    "topic": "Chủ đề 4 GDĐP 1: Món ngon quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 1: Món ngon quê em): Đọc câu ứng dụng chứa tiếng có vần \"anh\" gắn với các món bánh truyền thống quê hương (\"Mẹ mua bánh tét, bánh tráng cho bé\").",
    "activityTitle": "Hoạt động Khám phá & Luyện đọc câu:Đọc câu ứng dụng chứa tiếng có vần \"anh\" gắn với các món bánh truyền thống quê hương (\"Mẹ mua bánh tét, bánh tráng cho bé\").",
    "teacherAct": "GV chiếu hình ảnh mẹ đang bóc đĩa bánh tét Trà Cuôn và nướng chiếc bánh tráng Mỹ Lồng thơm lừng; gắn câu ứng dụng lên bảng: \"Mẹ mua bánh tét, bánh tráng nướng cho bé\". nhận xét, khen ngợi giọng đọc lưu loát của HS; giáo dục các em biết trân trọng công sức của các cô bác làm nghề tráng bánh truyền thống.",
    "studentAct": "HS tìm và gạch chân tiếng có vần \"anh\" (bánh, tráng); luyện đọc trơn từng cụm từ rồi đọc cả câu hoàn chỉnh; chia sẻ món bánh quê mà mình thích ăn nhất."
  },
  {
    "id": "gddp_tv_9",
    "grade": 1,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      16
    ],
    "lessonTitle": "Bài 78:Vần ươn, ươt",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Xem tranh và nói về khung cảnh \"vườn cây ăn trái sum suê, quả chín mọng ướt sương đêm\" ở miệt vườn Tây Nam Bộ.",
    "activityTitle": "Hoạt động Nói và nghe (Kể chuyện):Xem tranh và nói về khung cảnh \"vườn cây ăn trái sum suê, quả chín mọng ướt sương đêm\" ở miệt vườn Tây Nam Bộ.",
    "teacherAct": "GV trình chiếu tuyên dương các em nói năng tự tin, tròn câu rõ ý; khuyến khích HS luôn yêu quý cây trái quê nhà và biết giúp đỡ ông bà quét dọn lá trong vườn.",
    "studentAct": "HS quan sát kĩ từng cử chỉ, cảnh vật trong tranh; tập nói từ 2 đến"
  },
  {
    "id": "gddp_tv_10",
    "grade": 1,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      22
    ],
    "lessonTitle": "Bài 3 (Tập 2):Cây bàng trường em",
    "topic": "Chủ đề 3 GDĐP 1: Danh lam thắng cảnh quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 1: Danh lam thắng cảnh quê em): Tìm hiểu về những hàng cây cổ thụ (cây sao, cây dầu, cây bàng) tỏa bóng mát tại các danh lam thắng cảnh và sân trường quê hương.",
    "activityTitle": "Hoạt động Đọc hiểu & Mở rộng:Tìm hiểu về những hàng cây cổ thụ (cây sao, cây dầu, cây bàng) tỏa bóng mát tại các danh lam thắng cảnh và sân trường quê hương.",
    "teacherAct": "GV chiếu hình ảnh hàng cây sao, cây dầu đại thụ trăm năm tuổi che bóng mát quanh Danh thắng Ao Bà Om (Trà Vinh), khuôn viên Chùa Âng cổ kính và bóng mát sân trường em. chốt lại: Cây cổ thụ không chỉ che bóng mát cho chúng ta vui chơi mà còn là di sản thiên nhiên vô giá; nhắc nhở HS không khắc tên, bẻ cành cây.",
    "studentAct": "HS luyện đọc đoạn văn miêu tả thân cây, vòm lá xòe rộng như chiếc ô khổng lồ; thảo luận nhóm đôi trả lời: \"Cây cổ thụ mang lại lợi ích gì cho con người và cảnh quan?\"."
  },
  {
    "id": "gddp_tv_11",
    "grade": 1,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      27
    ],
    "lessonTitle": "Bài 14 (Tập 2):Rừng ngập mặn",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Luyện đọc đúng, diễn cảm bài đọc \"Rừng ngập mặn\" và tìm hiểu về rừng đước ven biển Duyên Hải, Ba Động (Trà Vinh).",
    "activityTitle": "Hoạt động Luyện đọc & Khám phá:Luyện đọc đúng, diễn cảm bài đọc \"Rừng ngập mặn\" và tìm hiểu về rừng đước ven biển Duyên Hải, Ba Động (Trà Vinh).",
    "teacherAct": "GV mở đoạn phim tư liệu ngắn (30 giây) về cánh rừng ngập mặn xanh ngắt với bộ rễ đước chằng chịt bám sâu vào bùn đất, đàn chim sải cánh bay lượn trên ngọn cây. khắc sâu: Rừng ngập mặn là \"lá chắn xanh\" ngăn bão gió, giữ đất phù sa bồi đắp cho quê hương Tây Nam Bộ tươi đẹp vững bền; khơi gợi ý thức bảo vệ rừng cho HS.",
    "studentAct": "HS luyện đọc từng câu, từng đoạn; tìm trong bài các từ ngữ tả bộ rễ và loài vật sống trong rừng (cây đước, cây mắm, con ba khía, con cá thòi lòi); trả lời câu hỏi tìm hiểu bài."
  },
  {
    "id": "gddp_tv_12",
    "grade": 1,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      31
    ],
    "lessonTitle": "Bài 24 (Tập 2):Kể về một lễ hội hoặc trò chơi em thích",
    "topic": "Chủ đề 6 GDĐP 1: Trò chơi dân gian quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 1: Trò chơi dân gian quê em): Kể lại trải nghiệm cùng bạn bè, người thân tham gia trò chơi dân gian (kéo co, rồng rắn lên mây, nhảy bao bố) hoặc xem hội Đua ghe Ngo.",
    "activityTitle": "Hoạt động Nói và nghe:Kể lại trải nghiệm cùng bạn bè, người thân tham gia trò chơi dân gian (kéo co, rồng rắn lên mây, nhảy bao bố) hoặc xem hội Đua ghe Ngo.",
    "teacherAct": "GV chiếu ảnh chụp các bạn nhỏ đang vui tươi chơi trò rồng rắn lên mây, kéo co trên sân đình và cảnh dòng người náo nức xem đua ghe Ngo sôi động. nhận xét, khích lệ sự tự tin của HS; nhấn mạnh các trò chơi dân gian giúp rèn luyện sức khỏe, tăng cường tình bạn đoàn kết và lưu giữ nét đẹp văn hóa quê hương.",
    "studentAct": "HS dựa vào gợi ý của GV để chia sẻ trước lớp: \"Vào dịp Tết hoặc lễ hội, em thích nhất trò chơi gì? Em chơi cùng ai? Cảm xúc của em thế nào?\"."
  },
  {
    "id": "gddp_tv_13",
    "grade": 1,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      4
    ],
    "lessonTitle": "Bài 4:Em giữ trang phục gọn gàng, sạch sẽ",
    "topic": "Chủ đề 1 GDĐP 1: Phong tục chào hỏi ở quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 1: Phong tục chào hỏi ở quê em): Hình thành thói quen mặc quần áo chỉnh tề, sạch sẽ khi đến trường, đi lễ chùa, đình miếu và khi tham gia sinh hoạt cộng đồng.",
    "activityTitle": "Hoạt động Khám phá & Rèn luyện thói quen:Hình thành thói quen mặc quần áo chỉnh tề, sạch sẽ khi đến trường, đi lễ chùa, đình miếu và khi tham gia sinh hoạt cộng đồng.",
    "teacherAct": "GV chiếu hình ảnh học sinh mặc đồng phục chỉnh tề đến trường và hình ảnh gia đình mặc trang phục áo dài truyền thống / trang phục lễ hội trang nhã đi viếng đền đài, chùa chiền. khen ngợi HS, nhắc nhở: \"Trang phục sạch sẽ, gọn gàng thể hiện sự tự trọng bản thân và lòng tôn trọng thầy cô, người lớn tuổi và không gian trang nghiêm của quê hương\".",
    "studentAct": "HS thảo luận nhóm đôi: Phân biệt trang phục gọn gàng, phù hợp và trang phục luộm thuộm; tự chỉnh lại cổ áo, vạt áo cho ngay ngắn trước gương hoặc nhờ bạn chỉnh giúp."
  },
  {
    "id": "gddp_tv_14",
    "grade": 1,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      12
    ],
    "lessonTitle": "Bài 12:Chào hỏi, lễ phép với thầy cô và người lớn",
    "topic": "Chủ đề 1 GDĐP 1: Phong tục chào hỏi ở quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 1: Phong tục chào hỏi ở quê em): Thực hành phong tục chào hỏi kính trên nhường dưới, xưng hô lễ phép \"thưa, gửi, dạ, vâng\" đặc trưng của người dân Nam Bộ.",
    "activityTitle": "Hoạt động Sắm vai & Xử lí tình huống:Thực hành phong tục chào hỏi kính trên nhường dưới, xưng hô lễ phép \"thưa, gửi, dạ, vâng\" đặc trưng của người dân Nam Bộ.",
    "teacherAct": "GV đưa ra nhận xét cách xưng hô, cử chỉ của từng cặp HS; nhấn mạnh nét đẹp truyền thống \"Lời chào cao hơn mâm cỗ\" của con người Nam Bộ nhân hậu, nghĩa tình.",
    "studentAct": "HS Quan sát, thảo luận nhóm và liên hệ thực tế quê hương Trà Vinh theo sự hướng dẫn của giáo viên."
  },
  {
    "id": "gddp_tv_15",
    "grade": 1,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      20
    ],
    "lessonTitle": "Bài 8:Tự giác học tập",
    "topic": "Chủ đề 5 GDĐP 1: Tấm gương chăm chỉ học tập",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 1: Tấm gương chăm chỉ học tập): Tìm hiểu câu chuyện về những tấm gương hiếu học, vượt khó vươn lên của tuổi trẻ quê hương Trà Vinh.",
    "activityTitle": "Hoạt động Khám phá & Noi gương:Tìm hiểu câu chuyện về những tấm gương hiếu học, vượt khó vươn lên của tuổi trẻ quê hương Trà Vinh.",
    "teacherAct": "GV kể câu chuyện ngắn sinh động bằng hình ảnh về các cô chú, anh chị học sinh nghèo vượt khó, miệt mài học tập dưới ánh đèn dầu bên dòng sông quê để trở thành những người có ích cho xã hội. biểu dương các bạn đã có ý thức tự giác, khuyến khích cả lớp noi theo những tấm gương hiếu học của quê hương để học tập thật giỏi, trở thành con ngoan trò giỏi.",
    "studentAct": "HS chăm chú lắng nghe, bày tỏ cảm nghĩ về sự siêng năng của nhân vật; tự liên hệ bản thân: nêu những việc mình đã tự giác làm như ngồi vào bàn học đúng giờ, tự soạn sách vở theo thời khóa biểu."
  },
  {
    "id": "gddp_tv_16",
    "grade": 1,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      28
    ],
    "lessonTitle": "Bài 16:Chăm sóc cây xanh và con vật",
    "topic": "Chủ đề 8 GDĐP 1: Bảo vệ môi trường nơi em sống",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 1: Bảo vệ môi trường nơi em sống): Nhận biết những hành vi đúng - sai đối với cây trồng và động vật xung quanh ta; cam kết chăm sóc vườn cây, chuồng nuôi.",
    "activityTitle": "Hoạt động Liên hệ & Hành động:Nhận biết những hành vi đúng - sai đối với cây trồng và động vật xung quanh ta; cam kết chăm sóc vườn cây, chuồng nuôi.",
    "teacherAct": "GV gắn tranh tình huống lên bảng: Tranh A - Bạn nhỏ dùng que chọc phá tổ chim trên cây dừa; Tranh B - Bạn nhỏ đang che mát, cho chú cún con uống nước sạch. kết luận: Cây xanh và động vật là những người bạn thân thiết làm đẹp cho môi trường sống quê hương; dặn dò HS cùng cha mẹ chăm sóc tốt vật nuôi trong gia đình.",
    "studentAct": "HS dùng thẻ mặt cười (đồng tình) / mặt khóc (không đồng tình) để bày tỏ thái độ; giải thích vì sao không nên trêu chọc, đánh đập con vật và bẻ gãy cành cây non."
  },
  {
    "id": "gddp_tv_17",
    "grade": 1,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      3
    ],
    "lessonTitle": "Chủ đề 1: Chào năm học mới(Sinh hoạt lớp: Giữ gìn lớp học khang trang)",
    "topic": "Chủ đề 8 GDĐP 1: Bảo vệ môi trường nơi em sống",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 1: Bảo vệ môi trường nơi em sống): Cùng bạn bè sắp xếp bàn ghế ngay ngắn, lau chùi bảng đen, sắp đặt góc học tập gọn gàng, trang trí lớp học bằng chậu cây xanh nhỏ.",
    "activityTitle": "Hoạt động Trải nghiệm thực hành:Cùng bạn bè sắp xếp bàn ghế ngay ngắn, lau chùi bảng đen, sắp đặt góc học tập gọn gàng, trang trí lớp học bằng chậu cây xanh nhỏ.",
    "teacherAct": "GV phát động phong trào \"Lớp học xanh - Xóm ấp sạch\": Hướng dẫn các nhóm phân công nhau lau bàn, nhặt giấy rác bỏ vào thùng rác có nắp đậy. nhận xét, tuyên dương tinh thần hợp tác đoàn kết của cả lớp; nhắc nhở giữ gìn nếp sống văn minh, sạch đẹp từ trường học đến gia đình, ngõ xóm.",
    "studentAct": "HS hào hứng tham gia theo tổ: Tổ 1 lau bảng, Tổ 2 kê thẳng hàng bàn ghế, Tổ"
  },
  {
    "id": "gddp_tv_18",
    "grade": 1,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      10
    ],
    "lessonTitle": "Chủ đề 3: Nếp sống đẹp(HĐGD theo chủ đề: Văn hóa chào hỏi)",
    "topic": "Chủ đề 1 GDĐP 1: Phong tục chào hỏi ở quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 1: Phong tục chào hỏi ở quê em): Thực hành chào hỏi thân thiện, văn minh trong các tình huống giao tiếp ở trường học, bến đò, khu chợ quê và nơi công cộng.",
    "activityTitle": "Hoạt động Giao lưu & Thực hành:Thực hành chào hỏi thân thiện, văn minh trong các tình huống giao tiếp ở trường học, bến đò, khu chợ quê và nơi công cộng.",
    "teacherAct": "GV tổ chức trò chơi \"Vòng tròn thân thiện\": Cho cả lớp đứng thành nhận xét, đúc kết: Nụ cười và lời chào lễ phép là nét đẹp truyền thống của người dân Nam Bộ, giúp gắn kết tình bạn bè, thầy cô và xóm giềng thêm ấm áp.",
    "studentAct": "HS Quan sát, thảo luận nhóm và liên hệ thực tế quê hương Trà Vinh theo sự hướng dẫn của giáo viên."
  },
  {
    "id": "gddp_tv_19",
    "grade": 1,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      18
    ],
    "lessonTitle": "Chủ đề 5: Đón Tết sum vầy(Sinh hoạt theo chủ đề: Tết cổ truyền quê em)",
    "topic": "Chủ đề 2 GDĐP 1: Vui đón Tết cổ truyền ở quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 1: Vui đón Tết cổ truyền ở quê em): Tìm hiểu phong tục đón Tết Nguyên đán và Tết cổ truyền Chôl Chnăm Thmây (lau dọn nhà cửa, bày mâm ngũ quả, gói bánh tét, chúc Tết ông bà).",
    "activityTitle": "Hoạt động Trải nghiệm & Chia sẻ:Tìm hiểu phong tục đón Tết Nguyên đán và Tết cổ truyền Chôl Chnăm Thmây (lau dọn nhà cửa, bày mâm ngũ quả, gói bánh tét, chúc Tết ông bà).",
    "teacherAct": "GV trình chiếu chùm ảnh sum vầy ngày Tết miền Tây: Nồi bánh tét đỏ lửa đêm giao thừa, cành mai vàng rực rỡ, mâm bánh mứt kẹo dừa, lễ dâng hoa mừng năm mới Chôl Chnăm Thmây tại chùa Khmer. khen ngợi sự hiếu thảo của HS; dặn dò các em khi đi chơi Tết luôn biết vâng lời người lớn, giữ an toàn và gìn giữ phong tục tốt đẹp của quê hương.",
    "studentAct": "HS hào hứng kể lại những việc em đã làm cùng cha mẹ để chuẩn bị đón Tết: lau chùi bàn ghế, tưới hoa vạn thọ trước ngõ, phụ mẹ xếp kẹo mứt dừa ra đĩa; thực hành nói lời chúc Tết ông bà."
  },
  {
    "id": "gddp_tv_20",
    "grade": 1,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      24
    ],
    "lessonTitle": "Chủ đề 6: Đôi bàn tay khéo léo(Làm đồ chơi từ lá cây, vỏ dừa thiên nhiên)",
    "topic": "Chủ đề 6 GDĐP 1: Trò chơi dân gian quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 1: Trò chơi dân gian quê em): Trải nghiệm gấp kèn lá dừa, thắt con cào cào, làm đồng hồ đeo tay bằng cọng lá dừa non hoặc xếp thuyền giấy thả trôi dòng mương nhỏ.",
    "activityTitle": "Hoạt động Sáng tạo & Trải nghiệm:Trải nghiệm gấp kèn lá dừa, thắt con cào cào, làm đồng hồ đeo tay bằng cọng lá dừa non hoặc xếp thuyền giấy thả trôi dòng mương nhỏ.",
    "teacherAct": "GV chuẩn bị sẵn các dải lá dừa non tươi xanh, làm mẫu chậm rãi từng bước: Gấp lá dừa thành chiếc đồng hồ đeo tay xinh xắn và cuộn chiếc kèn lá dừa thổi kêu \"te te\". biểu dương sự khéo léo của cả lớp; giới thiệu đây là những món đồ chơi dân gian mộc mạc gắn bó với tuổi thơ bao thế hệ người dân đồng bằng sông Cửu Long.",
    "studentAct": "HS thực hành dưới sự hướng dẫn tỉ mỉ của GV: Từng em khéo léo luồn lá, thắt nút thành chiếc đồng hồ đeo vào cổ tay; cùng nhau thổi vang tiếng kèn lá dừa rộn rã sân lớp."
  },
  {
    "id": "gddp_tv_21",
    "grade": 1,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      32
    ],
    "lessonTitle": "Chủ đề 8: Em bảo vệ môi trường quê hương(Hành động xanh vì nguồn nước sạch)",
    "topic": "Chủ đề 8 GDĐP 1: Bảo vệ môi trường nơi em sống",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 1: Bảo vệ môi trường nơi em sống): Thực hiện phân loại rác thải, dọn dẹp lá khô, không xả rác xuống sông rạch, ao hồ để bảo vệ dòng nước ngọt ngào quê hương.",
    "activityTitle": "Hoạt động Trải nghiệm hành động:Thực hiện phân loại rác thải, dọn dẹp lá khô, không xả rác xuống sông rạch, ao hồ để bảo vệ dòng nước ngọt ngào quê hương.",
    "teacherAct": "GV chiếu phóng sự ảnh về dòng sông quê trong xanh phẳng lặng và đối lập với dòng kênh bị nghẽn vì rác thải nhựa; đặt câu hỏi gợi mở: \"Chúng ta cần làm gì để dòng sông quê luôn trong sạch?\". tổng kết, đánh giá giờ học; trao tặng huy hiệu \"Chiến sĩ nhí bảo vệ môi trường\" cho các tổ hoàn thành xuất sắc nhiệm vụ.",
    "studentAct": "HS giơ tay phát biểu sôi nổi: Không vứt vỏ hộp sữa, túi ni-lông xuống mương nước; nhắc nhở người thân gom rác đúng nơi quy định; cùng nhau tham gia nhặt rác quanh bồn hoa sân trường."
  },
  {
    "id": "gddp_tv_22",
    "grade": 1,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      9
    ],
    "lessonTitle": "Chủ đề:Sắc màu thiên nhiên(Vẽ tranh phong cảnh quê em)",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Sử dụng các chấm, nét, mảng màu cơ bản để vẽ bức tranh phong cảnh quê hương tươi sáng (dòng sông, chiếc thuyền, hàng dừa, ngôi nhà mái ngói).",
    "activityTitle": "Hoạt động Sáng tạo mĩ thuật:Sử dụng các chấm, nét, mảng màu cơ bản để vẽ bức tranh phong cảnh quê hương tươi sáng (dòng sông, chiếc thuyền, hàng dừa, ngôi nhà mái ngói).",
    "teacherAct": "GV trình chiếu các bức tranh mẫu của học sinh vẽ về cảnh hoàng hôn trên sông Tiền, chiếc đò ngang chở khách và rặng dừa xanh; hướng dẫn cách chọn màu sắc tươi sáng, hài hòa. tổ chức cho HS nhận xét, chia sẻ cảm xúc về bức tranh yêu thích nhất; khen ngợi sự sáng tạo ngây thơ, đáng yêu và bồi đắp tình yêu cảnh sắc quê hương cho các em.",
    "studentAct": "HS thực hành vẽ vào vở bài tập: Vẽ nét cong tạo dòng sông uốn lượn, nét xiên tạo tán dừa, tô màu nước sông xanh biếc, mái nhà đỏ tươi, mặt trời đỏ rực rỡ; trưng bày bài vẽ lên bảng."
  },
  {
    "id": "gddp_tv_23",
    "grade": 1,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      23
    ],
    "lessonTitle": "Chủ đề:Những con vật ngộ nghĩnh(Nặn tôm, cá từ đất nặn)",
    "topic": "Chủ đề 7 GDĐP 1: Cảnh sắc thiên nhiên quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 1: Cảnh sắc thiên nhiên quê em): Sử dụng đất nặn nhiều màu sắc để tạo hình các con vật quen thuộc miền sông nước (con cá, chú tôm, con ốc, chú chim cò).",
    "activityTitle": "Hoạt động Thực hành nặn hình:Sử dụng đất nặn nhiều màu sắc để tạo hình các con vật quen thuộc miền sông nước (con cá, chú tôm, con ốc, chú chim cò).",
    "teacherAct": "GV làm mẫu các thao tác cơ bản: Vo tròn đất nặn làm thân cá, lăn dài vuốt nhọn làm đuôi, gắn vây và ấn nhẹ tạo mắt cá; giới thiệu các loài thủy sản thân thuộc của đồng quê. quan sát, giúp đỡ HS còn lúng túng; tổ chức triển lãm nhỏ tại bàn học, tuyên dương các tác phẩm ngộ nghĩnh, khéo léo.",
    "studentAct": "HS hào hứng lấy đất nặn nhiều màu thực hành: Nặn chú cá bơi lội, con tôm cong mình, chú ếch xanh; sắp xếp các con vật lên bìa carton tạo thành một \"Hồ nước quê em\" sinh động."
  },
  {
    "id": "gddp_tv_24",
    "grade": 1,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      6
    ],
    "lessonTitle": "Chủ đề 2:Khúc ca tuổi thơ(Hát dân ca & Gõ thanh phách)",
    "topic": "Chủ đề 6 GDĐP 1: Trò chơi dân gian quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 1: Trò chơi dân gian quê em): Học hát lời ca trong trẻo của các điệu Lý, bài đồng dao Nam Bộ kết hợp gõ đệm bằng nhạc cụ thanh phách hoặc xúc xắc theo phách, nhịp.",
    "activityTitle": "Hoạt động Học hát & Gõ đệm:Học hát lời ca trong trẻo của các điệu Lý, bài đồng dao Nam Bộ kết hợp gõ đệm bằng nhạc cụ thanh phách hoặc xúc xắc theo phách, nhịp.",
    "teacherAct": "GV hát mẫu làn điệu dân ca Nam Bộ với giọng điệu ngọt ngào, truyền cảm; gõ thanh phách làm mẫu từng nhịp phách rõ ràng theo câu hát. chia nhóm HS biểu diễn nối tiếp (nhóm hát, nhóm gõ đệm); chỉnh sửa cao độ, nhịp điệu cho HS; giáo dục niềm tự hào về âm vang dân ca sông nước Nam Bộ.",
    "studentAct": "HS lắng nghe, nhại lại từng câu hát theo GV; cả lớp cùng hòa giọng hát vang bài đồng dao kết hợp gõ đệm thanh phách \"cắc - tùng\" đều đặn, rộn ràng."
  },
  {
    "id": "gddp_tv_25",
    "grade": 1,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      25
    ],
    "lessonTitle": "Chủ đề 7:Âm vang quê hương(Vận động cơ thể & Phụ họa)",
    "topic": "Chủ đề 6 GDĐP 1: Trò chơi dân gian quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 1: Trò chơi dân gian quê em): Thực hiện các động tác vận động cơ thể (vỗ tay, giậm chân, nghiêng đầu, chèo thuyền mô phỏng) hòa theo nhịp điệu bài hát ngày hội quê hương.",
    "activityTitle": "Hoạt động Vận động theo nhạc:Thực hiện các động tác vận động cơ thể (vỗ tay, giậm chân, nghiêng đầu, chèo thuyền mô phỏng) hòa theo nhịp điệu bài hát ngày hội quê hương.",
    "teacherAct": "GV hướng dẫn các động tác phụ họa mộc mạc: Động tác 1 - Vỗ tay sang trái, sang phải theo nhịp đôi; Động tác nhận xét tinh thần biểu diễn tự tin, vui tươi của cả lớp; biểu dương các cá nhân và nhóm có động tác mềm mại, đúng nhịp điệu âm nhạc truyền thống.",
    "studentAct": "HS đứng thành hàng ngay ngắn, vừa hát vang bài ca quê hương vừa hào hứng làm động tác khua chèo, giậm chân nhịp nhàng theo tiếng trống hội rộn rã."
  },
  {
    "id": "gddp_tv_26",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      14,
      15
    ],
    "lessonTitle": "Bài 14:Thực vật và động vật sống ở đâu?",
    "topic": "Chủ đề 1 GDĐP 2: Trà Vinh quê hương em (Trang 5 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 2)(Môi trường sống của các loài cây: dừa nước, phi lao, cây bần, vườn cây trái cù lao và động vật thủy sản sông biển).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 2: Trà Vinh quê hương em(Môi trường sống của các loài cây: dừa nước, phi lao, cây bần, vườn cây trái cù lao và động vật thủy sản sông biển).): Nhận biết môi trường sống của động vật, thực vật đặc trưng vùng sông nước quê hương",
    "activityTitle": "Hoạt động Khám phá 1:Nhận biết môi trường sống của động vật, thực vật đặc trưng vùng sông nước quê hương",
    "teacherAct": "GV trình chiếu chùm ảnh rừng đước Long Khánh, rặng dừa Mỏ Cày ven sông Tiền, sông Cổ Chiên và ao cá tra, bè tôm. kết luận về sự phong phú của giới sinh vật miền Tây sông nước và giáo dục tình yêu thiên nhiên đất trời quê hương.",
    "studentAct": "HS thảo luận nhóm 4: Phân loại cây cối, con vật theo nơi sống (trên cạn ở vườn cây miệt vườn hay dưới nước sông rạch cù lao)."
  },
  {
    "id": "gddp_tv_27",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      16,
      17
    ],
    "lessonTitle": "Bài 16:Bảo vệ môi trường sống của thực vật và động vật",
    "topic": "Chủ đề 3 GDĐP 2: Rừng ngập mặn Long Khánh và bờ biển Ba Động Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 2: Rừng ngập mặn Long Khánh và bờ biển Ba Động Trà Vinh): Phân biệt hành động nên làm và không nên làm để bảo vệ môi trường sống của loài vật quanh em",
    "activityTitle": "Hoạt động Luyện tập & Vận dụng:Phân biệt hành động nên làm và không nên làm để bảo vệ môi trường sống của loài vật quanh em",
    "teacherAct": "GV chiếu tranh vẽ tình huống: Bạn nhỏ vứt túi ni-lông xuống sông rạch và bạn nhỏ đang nhặt rác, tưới cây sân trường. tuyên dương các ý thức tự giác bảo vệ môi trường sống của học sinh ngay từ những việc làm nhỏ hằng ngày.",
    "studentAct": "HS sắm vai xử lí tình huống: Giải thích vì sao không được xả rác xuống sông rạch (gây hại tôm cá, ô nhiễm nước sinh hoạt gia đình)."
  },
  {
    "id": "gddp_tv_28",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      20,
      21
    ],
    "lessonTitle": "Bài 20:Chăm sóc cây trồng và vật nuôi",
    "topic": "Chủ đề 1 GDĐP 2: Vườn cây trái cù lao Tân Quy Cầu Kè Trà Vinh (Trang 7 - QĐ 2727/QĐ-BGDĐT)(Kỹ thuật tưới nước, bón phân hữu cơ, chăm sóc chậu hoa kiểng, cây ăn quả và gia súc gia cầm).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 2: Vườn cây trái cù lao Tân Quy Cầu Kè Trà Vinh(Kỹ thuật tưới nước, bón phân hữu cơ, chăm sóc chậu hoa kiểng, cây ăn quả và gia súc gia cầm).): Tìm hiểu công việc chăm sóc cây giống, vườn cây ăn quả và vật nuôi trong gia đình",
    "activityTitle": "Hoạt động Khám phá & Thực hành:Tìm hiểu công việc chăm sóc cây giống, vườn cây ăn quả và vật nuôi trong gia đình",
    "teacherAct": "GV chiếu video các nghệ nhân làng hoa Cái Mơn tỉ mỉ tưới nước, uốn cành cây cảnh và bác nông dân chăm sóc đàn gà, ao cá. nhắc nhở học sinh cần có tình thương yêu đối với cây cỏ, vật nuôi và an toàn khi tiếp xúc với động vật.",
    "studentAct": "HS chia sẻ kinh nghiệm: Kể những việc em đã làm ở nhà để giúp đỡ ông bà tưới cây cảnh, cho thú cưng (chó, mèo, cá) ăn."
  },
  {
    "id": "gddp_tv_29",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      25,
      26
    ],
    "lessonTitle": "Bài 24:Một số sự kiện nổi bật của trường học và địa phương",
    "topic": "Chủ đề 4 GDĐP 2: Lễ hội Óc-om-bóc Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 2: Lễ hội Óc-om-bóc Trà Vinh): Khám phá nét độc đáo của Lễ hội Óc-om-bóc, Lễ Kỳ yên đình làng và hội xuân quê hương",
    "activityTitle": "Hoạt động Khám phá & Trải nghiệm:Khám phá nét độc đáo của Lễ hội Óc-om-bóc, Lễ Kỳ yên đình làng và hội xuân quê hương",
    "teacherAct": "GV mở đoạn video ngày hội Đua ghe Ngo tưng bừng cờ hoa trên dòng sông Long Bình và cảnh đêm cúng Trăng rực rỡ hoa đăng. giáo dục niềm tự hào về truyền thống văn hóa lễ hội đoàn kết gắn bó keo sơn của cộng đồng các dân tộc quê hương.",
    "studentAct": "HS thảo luận: Nêu những hoạt động vui chơi trong lễ hội mà em biết; chia sẻ cảm xúc hào hứng khi được tham gia ngày hội cùng gia đình."
  },
  {
    "id": "gddp_tv_30",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      27,
      28
    ],
    "lessonTitle": "Bài 26:Hoạt động sản xuất nông nghiệp",
    "topic": "Chủ đề 1 GDĐP 2: Cánh đồng lúa Trà Cú và cù lao Tân Quy trĩu quả Trà Vinh (Trang 7, 8 - QĐ 2727/QĐ-BGDĐT)(Các hoạt động gieo trồng lúa nước, thu hoạch dừa, hái trái cây chín và nuôi trồng thủy sản).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 2: Cánh đồng lúa Trà Cú và cù lao Tân Quy trĩu quả Trà Vinh(Các hoạt động gieo trồng lúa nước, thu hoạch dừa, hái trái cây chín và nuôi trồng thủy sản).): Tìm hiểu công việc của bác nông dân trồng lúa, hái dừa, làm vườn trên quê hương",
    "activityTitle": "Hoạt động Khám phá 2:Tìm hiểu công việc của bác nông dân trồng lúa, hái dừa, làm vườn trên quê hương",
    "teacherAct": "GV chiếu tranh ảnh: Bác nông dân gặt lúa trên đồng vàng, chú thợ leo cây dừa hái buồng dừa trĩu quả, cô nông dân hái bưởi, cam. giáo dục học sinh thái độ kính trọng người nông dân và biết quý trọng từng hạt cơm, manh áo.",
    "studentAct": "HS thảo luận nhóm đôi: Nêu những nỗi vất vả dãi dầu mưa nắng của người nông dân để làm ra hạt gạo dẻo thơm, trái ngọt lành."
  },
  {
    "id": "gddp_tv_31",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      29,
      30
    ],
    "lessonTitle": "Bài 27:Hoạt động sản xuất thủ công",
    "topic": "Chủ đề 7 GDĐP 2: Đặc sản bánh tét Trà Cuôn Cầu Ngang (Trang 38 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 2)(Quy trình làm bánh tráng, quấy kẹo dừa, gói đòn bánh tét truyền thống mang hương vị thơm ngon).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 2: Đặc sản bánh tét Trà Cuôn Cầu Ngang(Quy trình làm bánh tráng, quấy kẹo dừa, gói đòn bánh tét truyền thống mang hương vị thơm ngon).): Kể tên các sản phẩm thủ công truyền thống nức tiếng của quê hương",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Kể tên các sản phẩm thủ công truyền thống nức tiếng của quê hương",
    "teacherAct": "GV mang đến lớp các mẫu vật thật hoặc hình ảnh đòn bánh tét Trà Cuôn, trái dừa sáp Cầu Kè, đĩa bánh ống Khmer Trà Vinh thơm ngon. khen ngợi vốn hiểu biết của học sinh và củng cố tình yêu mến các sản vật cổ truyền quê hương Trà Vinh.",
    "studentAct": "HS thảo luận: Kể tên nguyên liệu làm ra từng món bánh kẹo (gạo, nếp, nước cốt dừa, đậu xanh) và sự khéo léo của người thợ."
  },
  {
    "id": "gddp_tv_32",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      31,
      32
    ],
    "lessonTitle": "Bài 29:Di tích lịch sử - văn hóa và cảnh quan thiên nhiên",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 2: Thắng cảnh Ao Bà Om): Sắm vai Hướng dẫn viên du lịch nhí giới thiệu danh lam thắng cảnh, di tích quê em",
    "activityTitle": "Hoạt động Vận dụng:Sắm vai Hướng dẫn viên du lịch nhí giới thiệu danh lam thắng cảnh, di tích quê em",
    "teacherAct": "GV treo tranh ảnh lớn về Ao Bà Om với rễ cây cổ thụ khổng lồ, Văn Xương Các Văn Thánh Miếu, nét cổ kính Đình Phú Lễ. chốt lại trách nhiệm bảo tồn di tích và bồi đắp lòng tự hào về quê hương tươi đẹp.",
    "studentAct": "HS thực hành sắm vai: Giới thiệu địa danh cho du khách, nêu cảm nghĩ tự hào và nhắc nhở mọi người giữ gìn vệ sinh chung."
  },
  {
    "id": "gddp_tv_33",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      2
    ],
    "lessonTitle": "Bài 3:Họa mi hót (Chủ điểm",
    "topic": "Chủ đề 1 GDĐP 2: Trà Vinh quê hương em - Cảnh đẹp thiên nhiên tươi mát (Trang 5 - QĐ 2727/QĐ-BGDĐT)(Cảnh sắc thiên nhiên trong lành, tiếng chim hót líu lo bên rặng dừa, vườn chôm chôm, nhãn chín).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 2: Trà Vinh quê hương em - Cảnh đẹp thiên nhiên tươi mát(Cảnh sắc thiên nhiên trong lành, tiếng chim hót líu lo bên rặng dừa, vườn chôm chôm, nhãn chín).): Cảm nhận âm thanh và vẻ đẹp thiên nhiên vườn cây quê hương",
    "activityTitle": "Hoạt động Luyện đọc & Cảm thụ:Cảm nhận âm thanh và vẻ đẹp thiên nhiên vườn cây quê hương",
    "teacherAct": "GV hướng dẫn HS luyện đọc trôi chảy, diễn cảm bài thơ/bài đọc; kết hợp mở file âm thanh tiếng chim hót trong vườn cây miệt vườn. giáo dục học sinh yêu quý loài vật có ích và giữ gìn môi trường thiên nhiên tươi đẹp.",
    "studentAct": "HS liên hệ bản thân: Kể tên những loài chim, loài cây thân quen trong vườn nhà hoặc công viên quanh em."
  },
  {
    "id": "gddp_tv_34",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      12
    ],
    "lessonTitle": "Bài 12:Cây dừa (Chủ điểm",
    "topic": "Chủ đề 7 GDĐP 2: Đặc sản dừa sáp Cầu Kè Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 2: Đặc sản dừa sáp Cầu Kè Trà Vinh): Tìm hiểu các bộ phận và lợi ích tuyệt vời của cây dừa quê hương",
    "activityTitle": "Hoạt động Luyện đọc & Mở rộng vốn từ:Tìm hiểu các bộ phận và lợi ích tuyệt vời của cây dừa quê hương",
    "teacherAct": "GV hướng dẫn HS ngâm đọc các câu thơ tả cây dừa: 'Cây dừa xanh tỏa nhiều tàu / Dang tay đón gió, gật đầu gọi trăng...'. kết luận về sự gắn bó keo sơn của cây dừa đối với cuộc sống người dân quê hương miền Tây.",
    "studentAct": "HS quan sát tranh các sản phẩm từ dừa: Kẹo dừa, nước dừa xiêm, dầu dừa, đũa dừa; thực hành đặt câu với từ ngữ chỉ cây dừa."
  },
  {
    "id": "gddp_tv_35",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      24
    ],
    "lessonTitle": "Bài 24:Kể chuyện tấm gương danh nhân / Tấm gương anh hùng",
    "topic": "Chủ đề 6 GDĐP 2: Giáo sư Phạm Văn Bạch (Trang 33 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 2)(Tấm gương đạo đức kiên trung, tinh thần dũng cảm vượt khó và cống hiến hết mình cho Tổ quốc).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 2: Giáo sư Phạm Văn Bạch(Tấm gương đạo đức kiên trung, tinh thần dũng cảm vượt khó và cống hiến hết mình cho Tổ quốc).): Nghe và kể lại một đoạn truyện ngắn về tấm gương danh nhân, anh hùng quê hương",
    "activityTitle": "Hoạt động Kể chuyện theo tranh:Nghe và kể lại một đoạn truyện ngắn về tấm gương danh nhân, anh hùng quê hương",
    "teacherAct": "GV kể chuyện ngắn minh họa bằng tranh về tinh thần dũng cảm của Anh hùng Đồng Văn Cống hoặc Bác Hai Phạm Hùng thời niên thiếu. biểu dương các bạn có trí nhớ tốt, giọng kể hay và giáo dục lòng biết ơn sâu sắc đối với cha anh.",
    "studentAct": "HS làm việc theo cặp: Tập kể lại 1 - 2 sự việc trong câu chuyện với cử chỉ tự tin, giọng điệu truyền cảm."
  },
  {
    "id": "gddp_tv_36",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      28
    ],
    "lessonTitle": "Bài 28:Viết đoạn văn giới thiệu một món ăn đặc sản quê hương",
    "topic": "Chủ đề 7 GDĐP 2: Đặc sản bánh tét Trà Cuôn, bún nước lèo Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 2: Đặc sản bánh tét Trà Cuôn, bún nước lèo Trà Vinh): Viết đoạn văn 4 - 5 câu giới thiệu món ăn ngon em yêu thích",
    "activityTitle": "Hoạt động Thực hành Viết đoạn văn:Viết đoạn văn 4 - 5 câu giới thiệu món ăn ngon em yêu thích",
    "teacherAct": "GV hướng dẫn cấu trúc: Tên món ăn là gì? Món ăn gồm nguyên liệu gì? Hương vị như thế nào? Cảm xúc của em khi thưởng thức? gọi HS đọc to bài viết, sửa lỗi dùng từ và khen ngợi đoạn văn giàu hình ảnh.",
    "studentAct": "HS viết đoạn văn vào vở: Miêu tả đòn bánh tét xanh mướt dẻo quánh, chiếc bánh tráng nướng giòn rụm hay tô bún nước lèo thơm phức."
  },
  {
    "id": "gddp_tv_37",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      31
    ],
    "lessonTitle": "Bài 31:Viết đoạn văn kể về một ngày hội / Sự kiện vui mà em được tham gia",
    "topic": "Chủ đề 4 GDĐP 2: Lễ hội Óc-om-bóc và hội Đua ghe Ngo Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 2: Lễ hội Óc-om-bóc và hội Đua ghe Ngo Trà Vinh): Viết đoạn văn 4 - 5 câu kể về không khí rộn rã của ngày hội quê hương",
    "activityTitle": "Hoạt động Viết sáng tạo:Viết đoạn văn 4 - 5 câu kể về không khí rộn rã của ngày hội quê hương",
    "teacherAct": "GV gợi ý câu hỏi: Em được xem ngày hội nào? Không khí ngày hội ra sao? Mọi người tham gia những hoạt động gì? Cảm nghĩ của em? chấm bài, tuyên dương các bài viết sinh động, giàu cảm xúc tự hào quê hương.",
    "studentAct": "HS thực hành viết đoạn văn: Tái hiện lại âm thanh tiếng trống giục giã, tiếng reo hò dậy sóng của đoàn đua ghe Ngo."
  },
  {
    "id": "gddp_tv_38",
    "grade": 2,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      1,
      2
    ],
    "lessonTitle": "Bài 1:Quý trọng thời gian & Chăm chỉ học tập (Chủ đề 1",
    "topic": "Chủ đề 6 GDĐP 2: Giáo sư Phạm Văn Bạch - Say mê học tập nghiên cứu (Trang 33 - QĐ 2727/QĐ-BGDĐT)(Tấm gương sử dụng thời gian hợp lý, miệt mài đọc sách học hành thành tài để giúp ích cho đất nước).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 2: Giáo sư Phạm Văn Bạch - Say mê học tập nghiên cứu(Tấm gương sử dụng thời gian hợp lý, miệt mài đọc sách học hành thành tài để giúp ích cho đất nước).): Học tập tấm gương chăm ngoan, biết sắp xếp thời gian biểu hợp lý",
    "activityTitle": "Hoạt động Khám phá & Liên hệ bản thân:Học tập tấm gương chăm ngoan, biết sắp xếp thời gian biểu hợp lý",
    "teacherAct": "GV kể mẩu chuyện ngắn về Bác Hai Phạm Hùng lúc nhỏ luôn biết lập thời gian biểu khoa học, vừa chăm chỉ học vừa giúp đỡ cha mẹ. củng cố: 'Thời gian là vàng bạc', học sinh cần rèn luyện thói quen đúng giờ và không lãng phí thời gian vào việc vô ích.",
    "studentAct": "HS thảo luận nhóm: Chia sẻ thời gian biểu một ngày của em (giờ học, giờ chơi, giờ ngủ, giờ phụ giúp việc nhà)."
  },
  {
    "id": "gddp_tv_39",
    "grade": 2,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      9,
      10
    ],
    "lessonTitle": "Bài 5:Yêu quý bạn bè và người thân (Chủ đề 4",
    "topic": "Chủ đề 2 GDĐP 2: Truyền thống đoàn kết các dân tộc ở tỉnh Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 2: Truyền thống đoàn kết các dân tộc ở tỉnh Trà Vinh): Thể hiện sự quan tâm, giúp đỡ chân thành đối với bạn bè xung quanh",
    "activityTitle": "Hoạt động Xử lí tình huống & Rèn luyện hành vi:Thể hiện sự quan tâm, giúp đỡ chân thành đối với bạn bè xung quanh",
    "teacherAct": "GV đưa ra tình huống: Bạn học cùng lớp gặp khó khăn khi quên đồ dùng học tập hoặc là bạn học sinh người dân tộc thiểu số còn bỡ ngỡ. khen ngợi hành động đẹp và giáo dục tình đoàn kết gắn bó keo sơn như anh em một nhà giữa các bạn nhỏ.",
    "studentAct": "HS thảo luận sắm vai: Chủ động cho bạn mượn bút, ân cần hướng dẫn bạn cùng chơi trò chơi dân gian đoàn kết."
  },
  {
    "id": "gddp_tv_40",
    "grade": 2,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      13,
      14
    ],
    "lessonTitle": "Bài 7:Kính trọng thầy cô, biết ơn ông bà cha mẹ (Chủ đề 5",
    "topic": "Chủ đề 8 GDĐP 2: Biết ơn tổ tiên, ông bà, cha mẹ",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 2: Biết ơn tổ tiên, ông bà, cha mẹ): Nêu những việc làm cụ thể thể hiện lòng hiếu thảo với ông bà cha mẹ và kính trọng thầy cô",
    "activityTitle": "Hoạt động Khám phá & Bày tỏ lòng biết ơn:Nêu những việc làm cụ thể thể hiện lòng hiếu thảo với ông bà cha mẹ và kính trọng thầy cô",
    "teacherAct": "GV cho HS quan sát tranh gia đình sum vầy bên mâm cơm ấm cúng, cảnh con cháu rót trà dâng ông bà ngày lễ Tết. khắc sâu đạo lý làm con, giáo dục học sinh luôn biết ơn công lao sinh thành dưỡng dục trời biển của cha mẹ.",
    "studentAct": "HS phát biểu: Kể những việc làm ngoan ngoãn em đã làm (chào hỏi lễ phép, bóp vai cho bà, vâng lời thầy cô, chăm học điểm 10)."
  },
  {
    "id": "gddp_tv_41",
    "grade": 2,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      22,
      23
    ],
    "lessonTitle": "Bài 8:Bảo vệ của công và giữ gìn cảnh quan nơi công cộng (Chủ đề 7",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 2: Thắng cảnh Ao Bà Om): Thực hiện nếp sống văn minh nơi công cộng, bảo vệ cảnh quan di tích quê hương",
    "activityTitle": "Hoạt động Luyện tập & Vận dụng:Thực hiện nếp sống văn minh nơi công cộng, bảo vệ cảnh quan di tích quê hương",
    "teacherAct": "GV trình chiếu các bức ảnh đẹp về hàng cây cổ thụ Ao Bà Om và không gian tôn nghiêm của Văn Thánh Miếu, Đình Phú Lễ. tuyên dương học sinh có ý thức giữ gìn của công và bồi dưỡng tình yêu di sản văn hóa dân tộc.",
    "studentAct": "HS thảo luận: Nêu những hành vi không được làm khi đi tham quan (không xả rác, không chạm tay vào hiện vật cổ, không viết tên lên thân cây)."
  },
  {
    "id": "gddp_tv_42",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      6,
      7,
      8
    ],
    "lessonTitle": "Chủ đề 2:Em và những người sống xung quanh (Sinh hoạt lớp & Trải nghiệm)",
    "topic": "Chủ đề 2 GDĐP 2: Truyền thống đoàn kết các dân tộc Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 2: Truyền thống đoàn kết các dân tộc Trà Vinh): Thực hành đóng vai 'Người hàng xóm thân thiện - Bạn bè chan hòa'",
    "activityTitle": "Hoạt động Trải nghiệm giao tiếp:Thực hành đóng vai 'Người hàng xóm thân thiện - Bạn bè chan hòa'",
    "teacherAct": "GV tổ chức trò chơi 'Bông hoa yêu thương', hướng dẫn HS nói những lời khen ngợi, lời cảm ơn và xin lỗi chân thành. nhận xét, khen ngợi cử chỉ đáng yêu, lịch thiệp mang đậm nét văn hóa nghĩa tình Nam Bộ của học sinh.",
    "studentAct": "HS thực hành sắm vai theo cặp: Giúp bạn nhặt đồ rơi, hỏi thăm bạn khi ốm, chào hỏi lễ phép với các bác hàng xóm."
  },
  {
    "id": "gddp_tv_43",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      14,
      15,
      16
    ],
    "lessonTitle": "Chủ đề 4:Tự hào truyền thống quê em (Sinh hoạt dưới cờ & Trải nghiệm)",
    "topic": "Chủ đề 6 GDĐP 2: Giáo sư Phạm Văn Bạch (Trang 33 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 2)(Hội thi 'Kể chuyện danh nhân': Sưu tầm tranh ảnh, kể chuyện về những cống hiến to lớn của các vị tiền bối).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 2: Giáo sư Phạm Văn Bạch(Hội thi 'Kể chuyện danh nhân': Sưu tầm tranh ảnh, kể chuyện về những cống hiến to lớn của các vị tiền bối).): Sinh hoạt câu lạc bộ / Trải nghiệm:Hội thi 'Kể chuyện danh nhân, anh hùng quê em'",
    "activityTitle": "Sinh hoạt câu lạc bộ / Trải nghiệm:Hội thi 'Kể chuyện danh nhân, anh hùng quê em'",
    "teacherAct": "GV hướng dẫn các tổ chuẩn bị tranh ảnh, tư liệu ngắn về Bác Hai Phạm Hùng, Trung tướng Đồng Văn Cống, Giáo sư Phạm Văn Bạch.",
    "studentAct": "HS Quan sát, thảo luận nhóm và liên hệ thực tế quê hương Trà Vinh theo sự hướng dẫn của giáo viên."
  },
  {
    "id": "gddp_tv_44",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      24,
      25,
      26
    ],
    "lessonTitle": "Chủ đề 6:Khéo tay hay làm - Em yêu lao động (Sinh hoạt lớp)",
    "topic": "Chủ đề 7 GDĐP 2: Trải nghiệm thử gói đòn bánh tét mini Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 2: Trải nghiệm thử gói đòn bánh tét mini Trà Vinh): Trải nghiệm 'Khéo tay hay làm' - Sáng tạo đồ chơi từ lá dừa và vật liệu thiên nhiên",
    "activityTitle": "Hoạt động Thực hành sáng tạo:Trải nghiệm 'Khéo tay hay làm' - Sáng tạo đồ chơi từ lá dừa và vật liệu thiên nhiên",
    "teacherAct": "GV phát cho mỗi nhóm học sinh những chiếc lá dừa bánh tẻ tươi xanh, sạch sẽ và hướng dẫn từng bước gấp con cào cào lá dừa.",
    "studentAct": "HS chăm chú thực hành, khéo léo luồn từng mép lá dừa tạo thành chú cào cào, chiếc chong chóng quay tít trong gió."
  },
  {
    "id": "gddp_tv_45",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      31,
      32,
      33
    ],
    "lessonTitle": "Chủ đề 8:Bảo vệ môi trường quê hương (Sinh hoạt dưới cờ & Sinh hoạt lớp)",
    "topic": "Chủ đề 1 & 3 GDĐP 2: Rừng đước và bãi biển Ba Động Trà Vinh xanh sạch",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 & 3 GDĐP 2: Rừng đước và bãi biển Ba Động Trà Vinh xanh sạch): Tổng vệ sinh lớp học, chăm sóc bồn hoa và tuyên truyền 'Trường học xanh - Không rác thải nhựa'",
    "activityTitle": "Hoạt động Hành động vì cộng đồng:Tổng vệ sinh lớp học, chăm sóc bồn hoa và tuyên truyền 'Trường học xanh - Không rác thải nhựa'",
    "teacherAct": "GV phát động phong trào 'Ngày thứ Sáu xanh': Phân công các nhóm nhặt lá rụng, lau bàn ghế, nhổ cỏ bồn hoa khuôn viên trường. tổng kết, đánh giá ý thức tự giác lao động bảo vệ môi trường sạch đẹp của từng tổ.",
    "studentAct": "HS hào hứng tham gia lao động tự giác, bỏ rác đúng nơi quy định và nhắc nhở nhau không mang túi ni-lông dùng 1 lần đến trường."
  },
  {
    "id": "gddp_tv_46",
    "grade": 2,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      10
    ],
    "lessonTitle": "Chủ đề:Sắc màu quê hương (Vẽ tranh phong cảnh quê em)",
    "topic": "Chủ đề 3 GDĐP 2: Cảnh đẹp Ao Bà Om rợp mát bóng cây cổ thụ Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 2: Cảnh đẹp Ao Bà Om rợp mát bóng cây cổ thụ Trà Vinh): Vẽ hoặc xé dán bức tranh cảnh đẹp thiên nhiên quê hương em",
    "activityTitle": "Hoạt động Thực hành sáng tạo:Vẽ hoặc xé dán bức tranh cảnh đẹp thiên nhiên quê hương em",
    "teacherAct": "GV chiếu bộ tranh phong cảnh đẹp về Cầu Mỹ Thuận đêm rực rỡ, hàng cây cổ thụ Ao Bà Om và rặng dừa nước soi bóng dòng kênh. tổ chức trưng bày 'Phòng tranh họa sĩ nhí', học sinh tự tin giới thiệu bức tranh và chia sẻ tình cảm với quê nhà.",
    "studentAct": "HS sử dụng bút sáp màu hoặc giấy màu xé dán bức tranh phong cảnh quê hương theo trí tưởng tượng phong phú."
  },
  {
    "id": "gddp_tv_47",
    "grade": 2,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      26
    ],
    "lessonTitle": "Chủ đề:Đồ vật thân quen (Tạo hình và trang trí đồ thủ công mỹ nghệ)",
    "topic": "Chủ đề 7 GDĐP 2: Hoa văn trang trí đòn bánh tét, chiếc quạt nan Trà Vinh (Trang 40 - QĐ 2727/QĐ-BGDĐT)(Tạo hình đồ vật thân quen từ đất nặn hoặc giấy bìa và trang trí các họa tiết hoa lá sông nước).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 2: Hoa văn trang trí đòn bánh tét, chiếc quạt nan Trà Vinh(Tạo hình đồ vật thân quen từ đất nặn hoặc giấy bìa và trang trí các họa tiết hoa lá sông nước).): Nặn hoặc vẽ trang trí một sản phẩm thủ công mỹ nghệ quê hương",
    "activityTitle": "Hoạt động Cảm nhận & Sáng tạo:Nặn hoặc vẽ trang trí một sản phẩm thủ công mỹ nghệ quê hương",
    "teacherAct": "GV hướng dẫn cách dùng đất nặn tạo dáng chiếc bát gáo dừa nhỏ xinh, đòn bánh tét mini hoặc vẽ trang trí chiếc quạt nan. nhận xét sự sáng tạo, khéo tay của từng học sinh và động viên các em giữ gìn nét đẹp thủ công quê hương.",
    "studentAct": "HS thực hành sáng tạo khéo léo, phối hợp màu sắc hài hòa để làm nổi bật nét đẹp sản phẩm thủ công."
  },
  {
    "id": "gddp_tv_48",
    "grade": 2,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      8
    ],
    "lessonTitle": "Chủ đề 2:Khúc ca quê hương (Học hát & Gõ đệm dân tộc)",
    "topic": "Chủ đề 4 GDĐP 2: Giai điệu múa Lâm-thôn rộn ràng ngày hội Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 2: Giai điệu múa Lâm-thôn rộn ràng ngày hội Trà Vinh): Tập hát bài hát dân ca kết hợp gõ đệm thanh phách, song loan",
    "activityTitle": "Hoạt động Luyện tập & Biểu diễn:Tập hát bài hát dân ca kết hợp gõ đệm thanh phách, song loan",
    "teacherAct": "GV hát mẫu làn điệu dân ca với ngữ điệu ngọt ngào, hướng dẫn HS lấy hơi và phát âm rõ lời từng câu hát. khen ngợi khả năng cảm thụ âm nhạc của học sinh và khuyến khích các em tự tin biểu diễn trước lớp.",
    "studentAct": "HS luyện hát theo nhóm kết hợp gõ thanh phách hoặc song loan đệm theo nhịp điệu rộn ràng."
  },
  {
    "id": "gddp_tv_49",
    "grade": 2,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      20
    ],
    "lessonTitle": "Chủ đề 5:Nhịp điệu ngày hội (Thường thức âm nhạc & Nhạc cụ)",
    "topic": "Chủ đề 4 GDĐP 2: Âm thanh rộn rã của trống Sa-dăm, dàn nhạc Ngũ âm ngày hội Óc-om-bóc",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 2: Âm thanh rộn rã của trống Sa-dăm, dàn nhạc Ngũ âm ngày hội Óc-om-bóc): Lắng nghe và nhận diện âm thanh các loại nhạc cụ dân tộc truyền thống",
    "activityTitle": "Hoạt động Thường thức âm nhạc:Lắng nghe và nhận diện âm thanh các loại nhạc cụ dân tộc truyền thống",
    "teacherAct": "GV mở trích đoạn âm thanh tiếng trống Sa-dăm rộn rã, tiếng sanh tiền lách cách và tiếng đờn Kìm thánh thót. tổng kết, khơi gợi niềm say mê và trân trọng những giá trị âm nhạc cổ truyền độc đáo của quê hương.",
    "studentAct": "HS lắng nghe và đoán tên nhạc cụ qua âm thanh đặc trưng; làm động tác mô phỏng cách đánh trống, gảy đàn theo điệu nhạc."
  },
  {
    "id": "gddp_tv_50",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      13,
      14
    ],
    "lessonTitle": "Bài 13:Một số hoạt động sản xuất nông nghiệp",
    "topic": "Chủ đề 1 GDĐP 3: Nuôi tôm Cù lao Long Hòa, cá tra Trà Cú, hàu Láng Chim (Trang 8 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 3)(Các loại cây trồng chủ lực: cam sành, dừa xiêm và mô hình nuôi thủy sản: tôm sú, cá tra, hàu).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 3: Nuôi tôm Cù lao Long Hòa, cá tra Trà Cú, hàu Láng Chim(Các loại cây trồng chủ lực: cam sành, dừa xiêm và mô hình nuôi thủy sản: tôm sú, cá tra, hàu).): Tìm hiểu các hoạt động trồng trọt và nuôi trồng thủy sản đặc trưng ở địa phương",
    "activityTitle": "Hoạt động Khám phá 2:Tìm hiểu các hoạt động trồng trọt và nuôi trồng thủy sản đặc trưng ở địa phương",
    "teacherAct": "GV trình chiếu hình ảnh vườn cây ăn trái Cầu Kè, cánh đồng lúa trĩu hạt Càng Long và các vuông tôm nước lợ tại Duyên Hải, Cầu Ngang (Trà Vinh). kết luận: Đất đai phù sa màu mỡ và sông nước trù phú đã tạo điều kiện phát triển nông nghiệp xanh bền vững trên quê hương Trà Vinh.",
    "studentAct": "HS thảo luận nhóm 4: Kể tên các sản phẩm nông sản, thủy sản chủ lực của quê hương và ích lợi của chúng đối với đời sống con người."
  },
  {
    "id": "gddp_tv_51",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      15,
      16
    ],
    "lessonTitle": "Bài 14:Một số hoạt động sản xuất thủ công và công nghiệp",
    "topic": "Chủ đề 7 GDĐP 3: Những làng nghề ở Trà Vinh - Làng bánh tét Trà Cuôn, dệt chiếu Cà Hom, Hàm Tân (Trang 35 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 3)(Quy trình sản xuất gốm đỏ, dệt chiếu cói truyền thống, chế tác đồ thủ công mỹ nghệ dừa).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 3: Những làng nghề ở Trà Vinh - Làng bánh tét Trà Cuôn, dệt chiếu Cà Hom, Hàm Tân(Quy trình sản xuất gốm đỏ, dệt chiếu cói truyền thống, chế tác đồ thủ công mỹ nghệ dừa).): Kể tên và tìm hiểu sản phẩm của các làng nghề thủ công truyền thống quê hương",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Kể tên và tìm hiểu sản phẩm của các làng nghề thủ công truyền thống quê hương",
    "teacherAct": "GV cho HS quan sát vật thật và hình ảnh: Chiếc chiếu cói nhiều màu, đồ chơi gáo dừa Cồn Phụng, đòn bánh tét Trà Cuôn, bình gốm đỏ Mang Thít. giáo dục lòng tự hào và trân trọng những sản phẩm thủ công truyền thống mang đậm bản sắc văn hóa dân tộc.",
    "studentAct": "HS thảo luận: Nêu các công đoạn làm ra sản phẩm và sự khéo léo, cần cù, nhẫn nại của các nghệ nhân làng nghề."
  },
  {
    "id": "gddp_tv_52",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      17,
      18
    ],
    "lessonTitle": "Bài 16:Di tích lịch sử - văn hóa và cảnh quan thiên nhiên",
    "topic": "Chủ đề 5 GDĐP 3: Khu di tích thắng cảnh Ao Bà Om & Chùa Âng",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 3: Khu di tích thắng cảnh Ao Bà Om & Chùa Âng): Giới thiệu với bạn bè về một di tích lịch sử hoặc danh lam thắng cảnh quê em",
    "activityTitle": "Hoạt động Vận dụng & Liên hệ thực tế:Giới thiệu với bạn bè về một di tích lịch sử hoặc danh lam thắng cảnh quê em",
    "teacherAct": "GV tổ chức trò chơi 'Du lịch qua màn ảnh nhỏ', chiếu các bức ảnh đẹp về Ao Bà Om, chùa Phước Hậu, khu lưu niệm cụ Đồ Chiểu, bãi biển Ba Động. chốt lại ý nghĩa lịch sử, văn hóa của các di tích và khơi dậy ý thức tự giác bảo vệ di sản quê hương.",
    "studentAct": "HS sắm vai hướng dẫn viên du lịch nhí: Giới thiệu địa chỉ, cảnh quan nổi bật và nhắc nhở những quy tắc giữ gìn vệ sinh khi đến tham quan."
  },
  {
    "id": "gddp_tv_53",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      22,
      23
    ],
    "lessonTitle": "Bài 21:Thực vật và động vật sống ở đâu?",
    "topic": "Chủ đề 3 GDĐP 3: Hệ sinh thái rừng phi lao và sinh vật biển Ba Động",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 3: Hệ sinh thái rừng phi lao và sinh vật biển Ba Động): Nhận biết các loài động vật, thực vật đặc trưng sống ở môi trường nước và trên cạn của quê hương",
    "activityTitle": "Hoạt động Khám phá 1:Nhận biết các loài động vật, thực vật đặc trưng sống ở môi trường nước và trên cạn của quê hương",
    "teacherAct": "GV chiếu bộ tranh sinh động về các loài thực vật ven sông (dừa nước, bần, đước) và các loài thủy sản (tôm càng xanh, cá bống kèo, cua biển, cá tra). mở rộng về sự phong phú, đa dạng của thế giới sinh vật tại vùng châu thổ đồng bằng sông Cửu Long.",
    "studentAct": "HS làm việc theo cặp: Phân loại động vật, thực vật theo môi trường sống (trên cạn, dưới nước ngọt, nước lợ mặn)."
  },
  {
    "id": "gddp_tv_54",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      26,
      27
    ],
    "lessonTitle": "Bài 24:Chăm sóc và bảo vệ sinh vật",
    "topic": "Chủ đề 3 GDĐP 3: Bảo vệ cảnh quan bãi biển Ba Động và rừng ngập mặn",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 3: Bảo vệ cảnh quan bãi biển Ba Động và rừng ngập mặn): Xây dựng bảng cam kết chăm sóc cây xanh trường học và bảo vệ môi trường sinh thái",
    "activityTitle": "Hoạt động Luyện tập & Vận dụng:Xây dựng bảng cam kết chăm sóc cây xanh trường học và bảo vệ môi trường sinh thái",
    "teacherAct": "GV nêu tình huống: Hiện tượng xả rác túi ni-lông ra sông rạch và bãi biển làm ô nhiễm nguồn nước của cá tôm. tuyên dương các ý tưởng bảo vệ môi trường xuất sắc và phát động phong trào 'Mỗi ngày một việc tốt cho thiên nhiên'.",
    "studentAct": "HS thảo luận nhóm: Đưa ra các giải pháp bảo vệ như chăm sóc bồn hoa trường học, không vứt rác xuống ao hồ kênh rạch, tích cực trồng thêm cây xanh."
  },
  {
    "id": "gddp_tv_55",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      32,
      33
    ],
    "lessonTitle": "Bài 27:Ôn tập chủ đề Trái Đất và Bầu trời (Thời tiết & Khí hậu)",
    "topic": "Chủ đề 1 GDĐP 3: Đặc điểm khí hậu 2 mùa mưa - khô của vùng duyên hải Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 3: Đặc điểm khí hậu 2 mùa mưa - khô của vùng duyên hải Trà Vinh): Tìm hiểu đặc điểm thời tiết 2 mùa ở quê hương và cách giữ gìn sức khỏe, tích trữ nước ngọt",
    "activityTitle": "Hoạt động Khám phá & Vận dụng:Tìm hiểu đặc điểm thời tiết 2 mùa ở quê hương và cách giữ gìn sức khỏe, tích trữ nước ngọt",
    "teacherAct": "GV giới thiệu đặc điểm thời tiết đặc thù miền Nam: Mùa mưa (từ tháng 5 đến tháng 11) và mùa khô (từ tháng 1 giáo dục ý thức sử dụng nước ngọt tiết kiệm, không lãng phí tài nguyên nước sạch.",
    "studentAct": "HS chia sẻ kinh nghiệm gia đình: Cách phòng tránh cảm cúm trong mùa mưa, trữ nước mưa trong lu khạp để dùng trong mùa khô hạn mặn."
  },
  {
    "id": "gddp_tv_56",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      5
    ],
    "lessonTitle": "Bài 9:Lời kêu gọi toàn dân tập thể dục (Chủ điểm",
    "topic": "Chủ đề: 3 GDĐP 3: Giáo sư, Viện sĩ Trần Đại Nghĩa - Tấm gương hiếu học, rèn luyện ý chí phi thường",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (: 3 GDĐP 3: Giáo sư, Viện sĩ Trần Đại Nghĩa - Tấm gương hiếu học, rèn luyện ý chí phi thường): Rèn luyện sức khỏe, ý chí theo gương các danh nhân quê hương",
    "activityTitle": "Hoạt động Luyện đọc & Liên hệ bản thân:Rèn luyện sức khỏe, ý chí theo gương các danh nhân quê hương",
    "teacherAct": "GV 1. Sau khi luyện đọc bài, GV kể tóm tắt câu chuyện về Bác Trần Đại Nghĩa kiên trì đọc sách dưới ánh đèn dầu và cụ Đồ Chiểu vượt lên bệnh tật.2. HS phát biểu: Nêu những việc em đã làm hằng ngày để rèn luyện thân thể dẻo dai và tinh thần ham học hỏi.3. GV khích lệ học sinh noi gương các bậc tiền nhân, chăm chỉ tập thể dục mỗi sáng và giữ gìn thân thể khỏe mạnh.",
    "studentAct": "HS phát biểu: Nêu những việc em đã làm hằng ngày để rèn luyện thân thể dẻo dai và tinh thần ham học hỏi."
  },
  {
    "id": "gddp_tv_57",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      13
    ],
    "lessonTitle": "Bài 21:Nghe thầy đọc thơ (Chủ điểm",
    "topic": "Chủ đề 6 GDĐP 3: NSND, Soạn giả Viễn Châu - Tài năng soạn lời ca vọng cổ đậm tình đất Nam Bộ (Trang 31 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 3)(Vẻ đẹp tâm hồn trong sáng, tình yêu quê hương đất nước qua những vần thơ, câu hát ngọt ngào).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 3: NSND, Soạn giả Viễn Châu - Tài năng soạn lời ca vọng cổ đậm tình đất Nam Bộ(Vẻ đẹp tâm hồn trong sáng, tình yêu quê hương đất nước qua những vần thơ, câu hát ngọt ngào).): Lắng nghe và cảm nhận nét đẹp thơ ca, làn điệu vọng cổ quê hương",
    "activityTitle": "Hoạt động Khám phá & Cảm thụ văn học:Lắng nghe và cảm nhận nét đẹp thơ ca, làn điệu vọng cổ quê hương",
    "teacherAct": "GV đọc truyền cảm một đoạn thơ trích trong truyện thơ Lục Vân Tiên hoặc ngâm câu vọng cổ của Soạn giả Viễn Châu. bồi dưỡng tâm hồn yêu tiếng mẹ đẻ và trân quý di sản văn học nghệ thuật quê hương.",
    "studentAct": "HS thảo luận nhóm đôi: Cảm nhận lời thơ khuyên dạy đạo lý làm người 'Trai thời trung hiếu làm đầu / Gái thời tiết hạnh là câu trau mình'."
  },
  {
    "id": "gddp_tv_58",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      15
    ],
    "lessonTitle": "Bài 24:Mở rộng vốn từ Quê hương",
    "topic": "Chủ đề 1 GDĐP 3: Tên gọi các huyện, thị xã, thành phố Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 3: Tên gọi các huyện, thị xã, thành phố Trà Vinh): Đặt câu với các từ ngữ chỉ cảnh sắc, địa danh thân thuộc của quê hương",
    "activityTitle": "Hoạt động Luyện tập 2 & 3:Đặt câu với các từ ngữ chỉ cảnh sắc, địa danh thân thuộc của quê hương",
    "teacherAct": "GV tổ chức trò chơi 'Đố vui tìm từ hay': Cung cấp hình ảnh rặng dừa, con rạch, cù lao, bến đò, giồng cát. nhận xét, tuyên dương các câu văn giàu hình ảnh và tình cảm gắn bó với quê hương.",
    "studentAct": "HS thực hành đặt câu: 'Quê hương em có những rặng dừa xanh soi bóng dòng sông.' hoặc 'Cù lao An Bình rợp bóng cây ăn trái sum sê.'"
  },
  {
    "id": "gddp_tv_59",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      16
    ],
    "lessonTitle": "Bài 26:Viết đoạn văn giới thiệu về một danh lam thắng cảnh / Di tích lịch sử",
    "topic": "Chủ đề 5 GDĐP 3: Thắng cảnh di tích Ao Bà Om rợp bóng cây cổ thụ",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 3: Thắng cảnh di tích Ao Bà Om rợp bóng cây cổ thụ): Thực hành viết đoạn văn giới thiệu cảnh đẹp quê hương giàu cảm xúc",
    "activityTitle": "Hoạt động Viết đoạn văn:Thực hành viết đoạn văn giới thiệu cảnh đẹp quê hương giàu cảm xúc",
    "teacherAct": "GV hướng dẫn cấu trúc đoạn văn: Câu mở đoạn giới thiệu tên cảnh đẹp, các câu thân đoạn tả nét nổi bật, câu kết nêu tình cảm tự hào. gọi 2 - 3 HS đọc bài trước lớp, nhận xét lời văn trau chuốt và cảm xúc chân thật.",
    "studentAct": "HS viết bài vào vở: Lựa chọn tả Ao Bà Om với hàng cây sao dầu trăm tuổi soi bóng nước trong veo hoặc Cồn Phụng rợp mát bóng dừa."
  },
  {
    "id": "gddp_tv_60",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      24
    ],
    "lessonTitle": "Bài 11 (Tập 2):Rộn ràng hội xuân (Chủ điểm",
    "topic": "Chủ đề 8 GDĐP 3: Tết Chôl-Chnăm-Thmây ở Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 3: Tết Chôl-Chnăm-Thmây ở Trà Vinh): Tìm hiểu không khí ngày Tết Chôl-Chnăm-Thmây, Lễ hội Nghinh Ông và phong tục chúc xuân",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Tìm hiểu không khí ngày Tết Chôl-Chnăm-Thmây, Lễ hội Nghinh Ông và phong tục chúc xuân",
    "teacherAct": "GV chiếu video lễ rước Đại lịch, đắp núi cát trong Tết Chôl-Chnăm-Thmây và đoàn tàu rước Ông rực rỡ cờ hoa trên biển Mỹ Long. giáo dục học sinh niềm tự hào về truyền thống văn hóa lễ hội đa dạng, phong phú của quê hương.",
    "studentAct": "HS thảo luận: Nêu ý nghĩa cầu may mắn, ấm no, mùa màng bội thu và tình đoàn kết gắn bó của đồng bào các dân tộc trong ngày hội."
  },
  {
    "id": "gddp_tv_61",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      28
    ],
    "lessonTitle": "Bài 18 (Tập 2):Viết đoạn văn nêu tình cảm đối với người lao động / Nghề truyền thống",
    "topic": "Chủ đề 7 GDĐP 3: Nghệ nhân gói bánh tét Trà Cuôn, dệt chiếu Cà Hom",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 3: Nghệ nhân gói bánh tét Trà Cuôn, dệt chiếu Cà Hom): Viết đoạn văn 5 - 7 câu bày tỏ lòng biết ơn đối với người lao động làng nghề",
    "activityTitle": "Hoạt động Luyện tập viết đoạn văn:Viết đoạn văn 5 - 7 câu bày tỏ lòng biết ơn đối với người lao động làng nghề",
    "teacherAct": "GV gợi ý: Chọn một nghề truyền thống em yêu thích (làm kẹo dừa, dệt chiếu cói, làm gốm đỏ, gói bánh tét) và nêu cảm nghĩ về người thợ. chấm bài, tuyên dương các bài viết có tình cảm chân thành và dùng từ gợi cảm sinh động.",
    "studentAct": "HS viết đoạn văn: Nêu bật sự vất vả, khéo léo của người thợ và lòng biết ơn sâu sắc đối với sản phẩm họ làm ra."
  },
  {
    "id": "gddp_tv_62",
    "grade": 3,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      4
    ],
    "lessonTitle": "Bài 2:Tự hào về truyền thống trường em / Truyền thống quê hương (Chủ đề 2",
    "topic": "Chủ đề: 3 GDĐP 3: Giáo sư, Viện sĩ Trần Đại Nghĩa - Tấm gương hiếu học sáng ngời",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (: 3 GDĐP 3: Giáo sư, Viện sĩ Trần Đại Nghĩa - Tấm gương hiếu học sáng ngời): Tìm hiểu tấm gương hiếu học của danh nhân quê hương và liên hệ bản thân",
    "activityTitle": "Hoạt động Khám phá 2 & Luyện tập:Tìm hiểu tấm gương hiếu học của danh nhân quê hương và liên hệ bản thân",
    "teacherAct": "GV chiếu tranh ảnh Khu di tích Đền thờ Bác Hồ (Long Đức) và gương nữ anh hùng Út Tịch quê hương Trà Vinh. giáo dục học sinh noi gương cha anh, thi đua 'Vượt khó, chăm ngoan, học giỏi'.",
    "studentAct": "HS thảo luận: Kể lại những chi tiết chứng tỏ tinh thần say mê học tập của hai danh nhân và nêu bài học cho bản thân."
  },
  {
    "id": "gddp_tv_63",
    "grade": 3,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      11,
      12
    ],
    "lessonTitle": "Bài 5:Tôn trọng sự khác biệt của người khác (Chủ đề 5",
    "topic": "Chủ đề 8 GDĐP 3: Nét đẹp trang phục, tiếng nói và phong tục Tết Chôl-Chnăm-Thmây",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 3: Nét đẹp trang phục, tiếng nói và phong tục Tết Chôl-Chnăm-Thmây): Tôn trọng trang phục, tiếng nói và phong tục của bạn bè các dân tộc",
    "activityTitle": "Hoạt động Xử lí tình huống & Vận dụng:Tôn trọng trang phục, tiếng nói và phong tục của bạn bè các dân tộc",
    "teacherAct": "GV đưa tình huống: Một bạn học sinh mặc trang phục dân tộc Khmer truyền thống đi dự ngày hội trường nhưng bị một số bạn trêu chọc. kết luận: Tôn trọng bản sắc văn hóa riêng của từng dân tộc là nét đẹp văn minh, thể hiện tình đoàn kết anh em ruột thịt.",
    "studentAct": "HS thảo luận nhóm và đóng vai xử lý: Thể hiện thái độ tôn trọng, khen ngợi trang phục đẹp rực rỡ và cùng bạn tham gia ngày hội vui vẻ."
  },
  {
    "id": "gddp_tv_64",
    "grade": 3,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      28,
      29
    ],
    "lessonTitle": "Bài 7:Giữ gìn cảnh quan thiên nhiên và di tích lịch sử (Chủ đề 7",
    "topic": "Chủ đề 5 GDĐP 3: Bảo vệ cảnh quan cây xanh bóng nước Ao Bà Om",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 3: Bảo vệ cảnh quan cây xanh bóng nước Ao Bà Om): Thực hiện quy tắc văn minh khi tham quan di tích lịch sử và danh lam thắng cảnh",
    "activityTitle": "Hoạt động Vận dụng & Cam kết hành động:Thực hiện quy tắc văn minh khi tham quan di tích lịch sử và danh lam thắng cảnh",
    "teacherAct": "GV chiếu bảng nội quy ứng xử tại các khu di tích lịch sử: Không xả rác, không viết vẽ lên tường, đi nhẹ nói khẽ nơi tôn nghiêm. củng cố thông điệp: Hành động nhỏ của mỗi học sinh góp phần bảo vệ vẻ đẹp vĩnh cửu của di sản quê hương.",
    "studentAct": "HS lập bảng cam kết nhóm: Nhắc nhở người thân và bạn bè cùng giữ gìn cảnh quan xanh, sạch, đẹp khi đi tham quan dã ngoại."
  },
  {
    "id": "gddp_tv_65",
    "grade": 3,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      5,
      6,
      7
    ],
    "lessonTitle": "Chủ đề 2:Em là người thân thiện (Hoạt động",
    "topic": "Chủ đề 2 GDĐP 3: Ấm áp tình người Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 3: Ấm áp tình người Trà Vinh): Rèn luyện thói quen chào hỏi lễ phép và cử chỉ thân thiện với mọi người",
    "activityTitle": "Hoạt động Trải nghiệm theo chủ đề:Rèn luyện thói quen chào hỏi lễ phép và cử chỉ thân thiện với mọi người",
    "teacherAct": "GV tổ chức trò chơi 'Lời chào thân thiện': Hướng dẫn cách chào hỏi lễ phép với người lớn tuổi, thầy cô và cử chỉ chan hòa với bạn bè. khen ngợi phong thái lễ phép, hòa đồng mang đậm nét thuần hậu, chân chất của con người miền Tây Nam Bộ.",
    "studentAct": "HS thực hành đóng vai các tình huống: Chào hỏi khách đến thăm trường, phụ giúp bạn gặp khó khăn trong giờ ra chơi."
  },
  {
    "id": "gddp_tv_66",
    "grade": 3,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      13,
      14,
      15
    ],
    "lessonTitle": "Chủ đề 4:Tự hào truyền thống quê hương (Hoạt động",
    "topic": "Chủ đề 5 GDĐP 3: Danh thắng Ao Bà Om và Chùa Âng (Trang 26 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 3)(Hội thi 'Em yêu quê hương': Kể chuyện danh nhân, thi đố vui về các di tích lịch sử nổi tiếng).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 3: Danh thắng Ao Bà Om và Chùa Âng(Hội thi 'Em yêu quê hương': Kể chuyện danh nhân, thi đố vui về các di tích lịch sử nổi tiếng).): Sinh hoạt câu lạc bộ / Trải nghiệm:Hội thi 'Em yêu quê hương' - Sưu tầm tranh ảnh danh nhân và di tích",
    "activityTitle": "Sinh hoạt câu lạc bộ / Trải nghiệm:Hội thi 'Em yêu quê hương' - Sưu tầm tranh ảnh danh nhân và di tích",
    "teacherAct": "GV chia lớp thành 4 đội thi: Chuẩn bị album ảnh hoặc bài thuyết trình ngắn về một danh nhân hoặc di tích lịch sử quê mình. nhận xét, trao giải thưởng và khích lệ các em tiếp tục tìm hiểu thêm về lịch sử truyền thống quê hương.",
    "studentAct": "HS Quan sát, thảo luận nhóm và liên hệ thực tế quê hương Trà Vinh theo sự hướng dẫn của giáo viên."
  },
  {
    "id": "gddp_tv_67",
    "grade": 3,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      23,
      24,
      25
    ],
    "lessonTitle": "Chủ đề 6:Em yêu lao động (Hoạt động",
    "topic": "Chủ đề 7 GDĐP 3: Thử làm thợ thủ công mini làng nghề bánh tét, dệt chiếu Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 3: Thử làm thợ thủ công mini làng nghề bánh tét, dệt chiếu Trà Vinh): Khéo tay hay làm - Trải nghiệm sáng tạo từ vật liệu thiên nhiên quê hương",
    "activityTitle": "Hoạt động Thực hành trải nghiệm:Khéo tay hay làm - Trải nghiệm sáng tạo từ vật liệu thiên nhiên quê hương",
    "teacherAct": "GV chuẩn bị sẵn một số lá dừa tươi, đất nặn và sợi cói nhiều màu; hướng dẫn mẫu cách thắt chú cào cào lá dừa đơn giản.",
    "studentAct": "HS thực hành theo cặp: Khéo léo gấp các nếp lá, nặn bình gốm mini dưới sự trợ giúp của thầy cô."
  },
  {
    "id": "gddp_tv_68",
    "grade": 3,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      30,
      31,
      32
    ],
    "lessonTitle": "Chủ đề 8:Bảo vệ môi trường quê hương (Hoạt động",
    "topic": "Chủ đề 3 GDĐP 3: Chiến dịch làm sạch bờ biển Ba Động và bến sông quê",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 3: Chiến dịch làm sạch bờ biển Ba Động và bến sông quê): Tổng vệ sinh lớp học, sân trường và tuyên truyền 'Dòng sông xanh - Bến bãi sạch'",
    "activityTitle": "Hoạt động Hành động vì cộng đồng:Tổng vệ sinh lớp học, sân trường và tuyên truyền 'Dòng sông xanh - Bến bãi sạch'",
    "teacherAct": "GV phát động phong trào 'Ngày Chủ nhật xanh / Giờ ra chơi xanh': Hướng dẫn quy trình thu gom và phân loại rác thải. đánh giá, biểu dương tinh thần lao động tự giác vì môi trường xanh của học sinh.",
    "studentAct": "HS các tổ chia khu vực: Nhặt rác, tưới nước bồn hoa sân trường, lau sạch bàn ghế và vẽ tranh cổ động bảo vệ dòng sông quê hương."
  },
  {
    "id": "gddp_tv_69",
    "grade": 3,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      6
    ],
    "lessonTitle": "Bài 3:Sử dụng quạt điện (Chủ đề 1",
    "topic": "Chủ đề 1 GDĐP 3: Khí hậu mùa khô và giải pháp giữ nhà cửa thông thoáng Trà Vinh (Trang 8 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 3)(Sử dụng quạt điện an toàn, tiết kiệm điện năng sinh hoạt; kết hợp tận dụng luồng gió tự nhiên).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 3: Khí hậu mùa khô và giải pháp giữ nhà cửa thông thoáng Trà Vinh(Sử dụng quạt điện an toàn, tiết kiệm điện năng sinh hoạt; kết hợp tận dụng luồng gió tự nhiên).): Thực hành thói quen bật quạt mức gió vừa phải và tắt quạt điện khi ra khỏi phòng",
    "activityTitle": "Hoạt động Luyện tập & Vận dụng:Thực hành thói quen bật quạt mức gió vừa phải và tắt quạt điện khi ra khỏi phòng",
    "teacherAct": "GV chiếu tranh so sánh: Không gian thoáng mát dưới tán cây rặng dừa và căn phòng kín bật quạt công suất lớn liên tục. nhắc nhở học sinh luôn tắt quạt, tắt đèn khi rời khỏi phòng học, phòng ở để tiết kiệm điện cho gia đình và xã hội.",
    "studentAct": "HS thảo luận: Khi nào nên tận dụng gió tự nhiên, khi nào dùng quạt điện và quy tắc an toàn tuyệt đối khi cắm phích điện."
  },
  {
    "id": "gddp_tv_70",
    "grade": 3,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      18
    ],
    "lessonTitle": "Bài 7:Dụng cụ và vật liệu làm thủ công (Chủ đề 2",
    "topic": "Chủ đề 7 GDĐP 3: Sợi cói dệt chiếu Hàm Tân, lá buông, lục bình khô Trà Vinh (Trang 36 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 3)(Nhận biết các vật liệu thủ công tự nhiên sẵn có ở quê hương dùng làm đồ dùng, mỹ nghệ thân thiện môi trường).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 3: Sợi cói dệt chiếu Hàm Tân, lá buông, lục bình khô Trà Vinh(Nhận biết các vật liệu thủ công tự nhiên sẵn có ở quê hương dùng làm đồ dùng, mỹ nghệ thân thiện môi trường).): Nhận diện các vật liệu làm thủ công từ thiên nhiên sông nước quê hương",
    "activityTitle": "Hoạt động Khám phá & Nhận biết vật liệu:Nhận diện các vật liệu làm thủ công từ thiên nhiên sông nước quê hương",
    "teacherAct": "GV cho HS quan sát vật mẫu thực tế: Chiếc giỏ lục bình, muỗng gáo dừa, chiếc chiếu cói mini, bình gốm nhỏ. giải thích tính ưu việt của vật liệu tự nhiên phân hủy sinh học so với rác thải nhựa.",
    "studentAct": "HS nêu tên nguyên liệu tạo nên các sản phẩm đó và chỉ ra tính sẵn có, thân thiện với môi trường của nguyên liệu quê mình."
  },
  {
    "id": "gddp_tv_71",
    "grade": 3,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      10
    ],
    "lessonTitle": "Chủ đề:Sắc màu quê hương (Vẽ tranh phong cảnh thiên nhiên)",
    "topic": "Chủ đề 5 GDĐP 3: Cảnh sắc Ao Bà Om với hàng cây sao dầu cổ thụ soi bóng nước Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 3: Cảnh sắc Ao Bà Om với hàng cây sao dầu cổ thụ soi bóng nước Trà Vinh): Vẽ hoặc xé dán bức tranh cảnh đẹp thiên nhiên quê hương em",
    "activityTitle": "Hoạt động Thực hành sáng tạo:Vẽ hoặc xé dán bức tranh cảnh đẹp thiên nhiên quê hương em",
    "teacherAct": "GV trình chiếu một số tác phẩm hội họa tiêu biểu về phong cảnh sông nước miền Tây để tạo cảm hứng sáng tạo cho HS. tổ chức triển lãm mini 'Góc tranh họa sĩ nhí', cho HS tự tin chia sẻ ý nghĩa bức tranh của mình trước lớp.",
    "studentAct": "HS thực hành vẽ và tô màu bức tranh phong cảnh quê hương theo cảm nhận riêng (dùng màu sáp, màu nước hoặc xé dán giấy màu)."
  },
  {
    "id": "gddp_tv_72",
    "grade": 3,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      26
    ],
    "lessonTitle": "Chủ đề:Đồ vật thân quen (Tạo dáng và trang trí sản phẩm thủ công mỹ nghệ)",
    "topic": "Chủ đề 7 GDĐP 3: Hoa văn trang trí chiếu cói Cà Hom, bánh tét Trà Cuôn Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 3: Hoa văn trang trí chiếu cói Cà Hom, bánh tét Trà Cuôn Trà Vinh): Thực hành tạo dáng và vẽ hoa văn trang trí sản phẩm thủ công mỹ nghệ quê hương",
    "activityTitle": "Hoạt động Cảm nhận & Sáng tạo:Thực hành tạo dáng và vẽ hoa văn trang trí sản phẩm thủ công mỹ nghệ quê hương",
    "teacherAct": "GV hướng dẫn cách tạo dáng bình hoa, chiếc đĩa hoặc chiếc quạt nan trên giấy bìa và vẽ các họa tiết hoa lá cân đối. đánh giá sự khéo léo, nét vẽ sáng tạo và bồi đắp tình yêu thương đối với sản phẩm thủ công quê nhà.",
    "studentAct": "HS lựa chọn màu sắc tươi sáng, trang trí các đường diềm, họa tiết cách điệu mang đậm âm hưởng dân gian Nam Bộ."
  },
  {
    "id": "gddp_tv_73",
    "grade": 3,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      8
    ],
    "lessonTitle": "Chủ đề 2:Khúc ca quê hương (Học hát & Gõ đệm dân tộc)",
    "topic": "Chủ đề 6 GDĐP 3: Giai điệu Vọng cổ quê hương của Soạn giả Viễn Châu Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 3: Giai điệu Vọng cổ quê hương của Soạn giả Viễn Châu Trà Vinh): Tập hát dân ca kết hợp gõ đệm nhạc cụ thanh phách nhịp nhàng",
    "activityTitle": "Hoạt động Luyện tập & Biểu diễn:Tập hát dân ca kết hợp gõ đệm nhạc cụ thanh phách nhịp nhàng",
    "teacherAct": "GV hướng dẫn HS cách hát đúng cao độ, trường độ và luyến láy nhẹ nhàng theo phong cách dân ca sông nước Nam Bộ. củng cố: Âm nhạc dân ca là tài sản văn hóa vô giá của cha ông, mỗi học sinh cần giữ gìn và tự hào phát huy.",
    "studentAct": "HS chia nhóm biểu diễn: Nhóm 1 hát lời ca, Nhóm 2 sử dụng thanh phách, song loan gõ đệm theo phách bài hát nhịp nhàng."
  },
  {
    "id": "gddp_tv_74",
    "grade": 3,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      20
    ],
    "lessonTitle": "Chủ đề 5:Nhịp điệu mùa xuân (Thường thức âm nhạc & Nhạc cụ)",
    "topic": "Chủ đề 8 GDĐP 3: Âm thanh dàn nhạc Ngũ âm rộn ràng ngày Tết Chôl-Chnăm-Thmây Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 3: Âm thanh dàn nhạc Ngũ âm rộn ràng ngày Tết Chôl-Chnăm-Thmây Trà Vinh): Nghe và nhận biết âm sắc độc đáo của các nhạc cụ dân tộc cổ truyền",
    "activityTitle": "Hoạt động Thường thức âm nhạc:Nghe và nhận biết âm sắc độc đáo của các nhạc cụ dân tộc cổ truyền",
    "teacherAct": "GV mở trích đoạn âm thanh tiếng đàn Roneat (mộc cầm Khmer), tiếng sanh tiền Hát sắc bùa và tiếng đàn Kìm Đờn ca tài tử. khuyến khích học sinh tìm hiểu và trân trọng các nghệ nhân âm nhạc dân gian đã giữ gìn hồn cốt quê hương.",
    "studentAct": "HS lắng nghe chăm chú, đoán tên từng loại nhạc cụ qua âm sắc đặc trưng và nêu cảm xúc khi nghe âm nhạc truyền thống."
  },
  {
    "id": "gddp_tv_75",
    "grade": 4,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      1,
      2,
      3
    ],
    "lessonTitle": "Bài 1, 2, 3:Làm quen với phương tiện học tập LS&ĐL; Địa phương em (tỉnh/thành phố)",
    "topic": "Chủ đề 1 GDĐP 4: Địa hình, khí hậu tỉnh Trà Vinh (Trang 6 - QĐ 2727/QĐ-BGDĐT / TLGDĐP Lớp 4)(Vị trí địa lí, địa hình giồng cát - vùng trũng ngập mặn, khí hậu 2 mùa mưa - khô, mạng lưới sông Tiền, sông Hậu, sông Cổ Chiên, sông Hàm Luông).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 4: Địa hình, khí hậu tỉnh Trà Vinh(Vị trí địa lí, địa hình giồng cát - vùng trũng ngập mặn, khí hậu 2 mùa mưa - khô, mạng lưới sông Tiền, sông Hậu, sông Cổ Chiên, sông Hàm Luông).): Xác định vị trí địa lí và đặc điểm tự nhiên quê hương",
    "activityTitle": "Hoạt động Khám phá & Thực hành lược đồ:Xác định vị trí địa lí và đặc điểm tự nhiên quê hương",
    "teacherAct": "GV chiếu bản đồ địa hình và hành chính tỉnh Trà Vinh, hướng dẫn HS nhận biết hệ thống sông Cổ Chiên, sông Hậu và bờ biển dài ven biển Đông. tổng kết, nhấn mạnh lợi thế sông nước cù lao và thổ nhưỡng phù sa trù phú của quê hương Trà Vinh.",
    "studentAct": "HS làm việc theo nhóm: Chỉ trên bản đồ các nhánh sông Cổ Chiên, Hàm Luông, sông Tiền, sông Hậu; trình bày ảnh hưởng của 2 mùa mưa - khô đến đời sống sinh hoạt và sản xuất nông nghiệp."
  },
  {
    "id": "gddp_tv_76",
    "grade": 4,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      23,
      24
    ],
    "lessonTitle": "Bài 20:Thiên nhiên vùng Nam Bộ",
    "topic": "Chủ đề 1 GDĐP 4: Địa hình, khí hậu tỉnh Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 4: Địa hình, khí hậu tỉnh Trà Vinh): Tìm hiểu đặc điểm sông ngòi và hệ sinh thái rừng ngập mặn quê hương",
    "activityTitle": "Hoạt động Khám phá & Liên hệ thực tế:Tìm hiểu đặc điểm sông ngòi và hệ sinh thái rừng ngập mặn quê hương",
    "teacherAct": "GV trình chiếu video flycam về những cánh rừng đước Duyên Hải, dải rừng ngập mặn ven biển Thạnh Phú và miệt vườn Cù lao An Bình. giáo dục ý thức bảo vệ tài nguyên rừng, không chặt phá cây rừng phòng hộ và giữ gìn dòng sông quê hương.",
    "studentAct": "HS thảo luận cặp đôi: Nêu vai trò phòng hộ chắn sóng, chống sạt lở bờ biển của rừng ngập mặn và tiềm năng phát triển du lịch sinh thái nông nghiệp nông thôn."
  },
  {
    "id": "gddp_tv_77",
    "grade": 4,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      24,
      25
    ],
    "lessonTitle": "Bài 21:Dân cư và hoạt động sản xuất ở vùng Nam Bộ",
    "topic": "Chủ đề 7 GDĐP 4: Dừa sáp Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 4: Dừa sáp Trà Vinh): Tìm hiểu các nông sản đặc sản và làng nghề truyền thống quê hương",
    "activityTitle": "Hoạt động Khám phá trọng tâm:Tìm hiểu các nông sản đặc sản và làng nghề truyền thống quê hương",
    "teacherAct": "GV tổ chức trò chơi 'Đặc sản quê mình', trưng bày hình ảnh và clip ngắn về trái dừa sáp Cầu Kè, bánh tét Trà Cuôn, bún nước lèo Trà Vinh, trái chuối tá quạ Cầu Kè. chốt lại giá trị kinh tế to lớn của nông nghiệp đặc sản và niềm tự hào về bàn tay tài hoa của người lao động Trà Vinh.",
    "studentAct": "HS thảo luận nhóm 4: Phân tích điều kiện tự nhiên đất phù sa màu mỡ và thổ nhưỡng phù hợp giúp cây trái sum sê; nêu quy trình sản xuất các sản phẩm thủ công truyền thống."
  },
  {
    "id": "gddp_tv_78",
    "grade": 4,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      26,
      27
    ],
    "lessonTitle": "Bài 22:Một số nét văn hoá ở vùng Nam Bộ",
    "topic": "Chủ đề 4 GDĐP 4: Lễ hội Ka-thi-na",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 4: Lễ hội Ka-thi-na): Tìm hiểu lễ hội truyền thống, trò chơi dân gian và nghệ thuật điêu khắc dân gian",
    "activityTitle": "Hoạt động Khám phá & Trải nghiệm văn hóa:Tìm hiểu lễ hội truyền thống, trò chơi dân gian và nghệ thuật điêu khắc dân gian",
    "teacherAct": "GV chiếu trích đoạn lễ dâng y Ka-thi-na trang trọng, lễ hội Kỳ yên đình làng Long Thanh và các hiện vật điêu khắc gỗ tinh xảo tại Chùa Hang. giáo dục thái độ tôn trọng, gìn giữ bản sắc văn hóa đa dạng của các dân tộc Kinh - Khmer - Hoa trên vùng đất Nam Bộ.",
    "studentAct": "HS thảo luận: Trình bày nét đẹp văn hóa đoàn kết, lòng hiếu thảo và ước vọng mưa thuận gió hòa trong các lễ hội; kể tên các trò chơi dân gian yêu thích."
  },
  {
    "id": "gddp_tv_79",
    "grade": 4,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      27,
      28
    ],
    "lessonTitle": "Bài 23:Di tích lịch sử ở vùng Nam Bộ",
    "topic": "Chủ đề 5 GDĐP 4: Di tích Lưu Cừ II",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 4: Di tích Lưu Cừ II): Tìm hiểu giá trị lịch sử, kiến trúc của các di tích cổ kính trên quê hương",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Tìm hiểu giá trị lịch sử, kiến trúc của các di tích cổ kính trên quê hương",
    "teacherAct": "GV trình chiếu sa bàn di tích khảo cổ Lưu Cừ II (Lưu Nghiệp Anh, Trà Cú), kiến trúc độc đáo chùa Âng (Angkorajaborey) và các gian trưng bày tại Bảo tàng Văn hóa Khmer Trà Vinh. giáo dục ý thức tôn trọng, giữ gìn hiện vật và bảo tồn di sản văn hóa khi đến tham quan các di tích.",
    "studentAct": "HS làm việc nhóm: Nêu giá trị khảo cổ nền văn hóa Óc Eo cổ đại và ý nghĩa lịch sử của các di tích trong tiến trình khai phá, bảo vệ vùng đất phương Nam."
  },
  {
    "id": "gddp_tv_80",
    "grade": 4,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      29,
      30
    ],
    "lessonTitle": "Bài 24:Đấu tranh bảo vệ Tổ quốc ở vùng Nam Bộ",
    "topic": "Chủ đề 6 GDĐP 4: Anh hùng Lực lượng vũ trang nhân dân Nguyễn Thị Út",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 4: Anh hùng Lực lượng vũ trang nhân dân Nguyễn Thị Út): Tìm hiểu tinh thần đấu tranh kiên cường, bất khuất của các anh hùng quê hương",
    "activityTitle": "Hoạt động Khám phá & Kể chuyện lịch sử:Tìm hiểu tinh thần đấu tranh kiên cường, bất khuất của các anh hùng quê hương",
    "teacherAct": "GV kể chuyện về cuộc đời chiến đấu quả cảm của Chị Út Tịch với câu nói bất hủ 'Còn cái lai quần cũng đánh!' và khí phách của Đội quân tóc dài Đồng Khởi. củng cố niềm tự hào truyền thống cách mạng vẻ vang, phát động phong trào thi đua học tốt, rèn luyện chăm.",
    "studentAct": "HS phát biểu cảm nghĩ: Bày tỏ lòng khâm phục trước sự mưu trí, dũng cảm của các thế hệ cha anh kiên cường giữ đất, giữ làng."
  },
  {
    "id": "gddp_tv_81",
    "grade": 4,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      2
    ],
    "lessonTitle": "Bài 3:Anh em sinh đôi (Chủ điểm",
    "topic": "Chủ đề 6 GDĐP 4: Anh hùng LLVTND Nguyễn Thị Út",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 4: Anh hùng LLVTND Nguyễn Thị Út): Cảm nhận vẻ đẹp tâm hồn và phẩm chất cao quý của con người quê hương",
    "activityTitle": "Hoạt động Đọc mở rộng & Viết đoạn văn:Cảm nhận vẻ đẹp tâm hồn và phẩm chất cao quý của con người quê hương",
    "teacherAct": "GV 1. Sau bài học đọc, GV giới thiệu hình ảnh Nữ Anh hùng Út Tịch vừa bồng con vừa tham gia kháng chiến bảo vệ xóm làng Cầu Kè.2. HS viết đoạn văn ngắn (4 - 5 câu) nêu cảm nghĩ về một phẩm chất đáng quý của người mẹ quê hương: dũng cảm, chịu thương chịu khó, giàu tình yêu thương.3. GV nhận xét, khen ngợi các bài viết giàu cảm xúc và liên hệ giáo dục lòng biết ơn đấng sinh thành.",
    "studentAct": "HS viết đoạn văn ngắn (4 - 5 câu) nêu cảm nghĩ về một phẩm chất đáng quý của người mẹ quê hương: dũng cảm, chịu thương chịu khó, giàu tình yêu thương."
  },
  {
    "id": "gddp_tv_82",
    "grade": 4,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      13,
      14
    ],
    "lessonTitle": "Bài 23:Vẽ màu / Đôi bàn tay kì diệu (Chủ điểm",
    "topic": "Chủ đề 8 GDĐP 4: Nghệ thuật điêu khắc gỗ ở Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 4: Nghệ thuật điêu khắc gỗ ở Trà Vinh): Thuyết minh giới thiệu một sản phẩm thủ công mỹ nghệ hoặc nét đẹp làng nghề quê hương",
    "activityTitle": "Hoạt động Nói và nghe:Thuyết minh giới thiệu một sản phẩm thủ công mỹ nghệ hoặc nét đẹp làng nghề quê hương",
    "teacherAct": "GV chiếu video clip nghệ nhân Khmer Chùa Hang đang tỉ mỉ gọt giũa rễ cây khô thành những bức tượng chim muông, tượng Phật sinh động. đánh giá khả năng diễn đạt lưu loát, ngôn từ truyền cảm và sự tự tin của học sinh.",
    "studentAct": "HS thực hành nói theo cặp: Sắm vai người giới thiệu sản phẩm thủ công mỹ nghệ độc đáo của quê hương cho khách phương xa."
  },
  {
    "id": "gddp_tv_83",
    "grade": 4,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      21,
      22
    ],
    "lessonTitle": "Bài 4 (Tập 2):Cây cam làng Ngang / Vườn cây quê em (Chủ điểm",
    "topic": "Chủ đề 7 GDĐP 4: Dừa sáp Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 4: Dừa sáp Trà Vinh): Lập dàn ý và viết bài văn miêu tả cây ăn quả đặc sản của quê hương",
    "activityTitle": "Hoạt động Viết (Tập làm văn):Lập dàn ý và viết bài văn miêu tả cây ăn quả đặc sản của quê hương",
    "teacherAct": "GV hướng dẫn cấu trúc bài văn miêu tả cây cối; gợi ý HS quan sát các nét đặc trưng của cây dừa sáp trĩu quả hay cây bưởi Năm Roi vỏ vàng bóng. gọi HS đọc bài làm, chấm chữa chi tiết và tuyên dương các bài viết có liên hệ thực tế sinh động.",
    "studentAct": "HS thực hành viết bài văn vào vở: Sử dụng biện pháp so sánh, nhân hóa để làm nổi bật vẻ đẹp tràn đầy sức sống của vườn cây ăn trái quê mình."
  },
  {
    "id": "gddp_tv_84",
    "grade": 4,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      27,
      28
    ],
    "lessonTitle": "Bài 15, 16 (Tập 2):Quê hương tươi đẹp - Em làm hướng dẫn viên du lịch (Chủ điểm",
    "topic": "Chủ đề 3 GDĐP 4: Du lịch sinh thái Trà Vinh - Cồn Chim, Cồn Long Trị, Ba Động",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 4: Du lịch sinh thái Trà Vinh - Cồn Chim, Cồn Long Trị, Ba Động): Sắm vai Hướng dẫn viên du lịch nhí giới thiệu tour du lịch quê hương",
    "activityTitle": "Hoạt động Nói và nghe:Sắm vai Hướng dẫn viên du lịch nhí giới thiệu tour du lịch quê hương",
    "teacherAct": "GV tổ chức trò chơi 'Đại sứ du lịch nhí', cung cấp tranh ảnh, bản đồ tuyến du lịch sinh thái Cồn Chim 'thuận thiên' và Cồn Phụng. nhận xét phong thái tự tin, khả năng giao tiếp và vốn hiểu biết phong phú về quê hương của học sinh.",
    "studentAct": "HS Quan sát, thảo luận nhóm và liên hệ thực tế quê hương Trà Vinh theo sự hướng dẫn của giáo viên."
  },
  {
    "id": "gddp_tv_85",
    "grade": 4,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      33,
      34
    ],
    "lessonTitle": "Bài 27 (Tập 2):Ca dao về vẻ đẹp đất nước (Chủ điểm",
    "topic": "Chủ đề 4 GDĐP 4: Nét đẹp văn hóa lễ hội Ka-thi-na (Trang 20 - QĐ 2727/QĐ-BGDĐT)(Vẻ đẹp câu ca dao miền sông nước Cửu Long, tình yêu đồng ruộng, rặng dừa và nét đẹp thuần hậu của con người Nam Bộ).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 4: Nét đẹp văn hóa lễ hội Ka-thi-na(Vẻ đẹp câu ca dao miền sông nước Cửu Long, tình yêu đồng ruộng, rặng dừa và nét đẹp thuần hậu của con người Nam Bộ).): Ngâm đọc ca dao và cảm nhận tình yêu quê hương đất nước qua những câu ca dao Nam Bộ",
    "activityTitle": "Hoạt động Đọc mở rộng & Cảm thụ văn học:Ngâm đọc ca dao và cảm nhận tình yêu quê hương đất nước qua những câu ca dao Nam Bộ",
    "teacherAct": "GV ngâm một số câu ca dao tiêu biểu về vùng đất Trà Vinh: 'Trà Vinh có bến Cung Hầu / Có hàng dừa sáp, có cầu vồng xanh' hay 'Đất Trà Vinh phù sa ngào ngạt / Cửu Long giang tiếng hát êm đềm'. bồi đắp tâm hồn yêu quý văn học dân gian và niềm tự hào về truyền thống quê hương Trà Vinh.",
    "studentAct": "HS thảo luận nhóm đôi: Nêu hình ảnh thiên nhiên và phẩm chất nghĩa tình, mến khách của con người Nam Bộ được thể hiện trong ca dao."
  },
  {
    "id": "gddp_tv_86",
    "grade": 4,
    "subjectKey": "khoa_hoc",
    "subjectName": "Khoa học",
    "weeks": [
      11,
      12,
      13
    ],
    "lessonTitle": "Bài 10, 11:Năng lượng Mặt Trời, gió và nước chảy (Chủ đề 2",
    "topic": "Chủ đề 1 GDĐP 4: Địa hình, khí hậu và tiềm năng năng lượng gió ven biển Duyên Hải Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 4: Địa hình, khí hậu và tiềm năng năng lượng gió ven biển Duyên Hải Trà Vinh): Tìm hiểu mô hình khai thác năng lượng gió và năng lượng mặt trời tại địa phương",
    "activityTitle": "Hoạt động Khám phá & Liên hệ thực tế:Tìm hiểu mô hình khai thác năng lượng gió và năng lượng mặt trời tại địa phương",
    "teacherAct": "GV chiếu video thực tế các dự án nhà máy điện gió ngoài khơi Duyên Hải, Đông Hải (Trà Vinh) với những cánh quạt khổng lồ quay trên mặt biển. giáo dục ý thức sử dụng điện tiết kiệm, hiệu quả trong sinh hoạt gia đình và trường học.",
    "studentAct": "HS thảo luận nhóm: Trình bày ưu điểm của điện gió, điện mặt trời (năng lượng vô tận, không gây khói bụi, thân thiện môi trường) so với nhiệt điện."
  },
  {
    "id": "gddp_tv_87",
    "grade": 4,
    "subjectKey": "khoa_hoc",
    "subjectName": "Khoa học",
    "weeks": [
      23,
      24,
      25,
      26
    ],
    "lessonTitle": "Bài 20, 21:Nấm và sự đa dạng của nấm; Nấm men, nấm mốc và vi khuẩn có ích trong đời sống",
    "topic": "Chủ đề 7 GDĐP 4: Kỹ thuật chế biến và bảo quản các sản phẩm từ dừa sáp (Trang 33 - QĐ 2727/QĐ-BGDĐT)(Ứng dụng quá trình lên men tự nhiên và vi sinh vật có ích trong chế biến nông sản thực phẩm).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 4: Kỹ thuật chế biến và bảo quản các sản phẩm từ dừa sáp(Ứng dụng quá trình lên men tự nhiên và vi sinh vật có ích trong chế biến nông sản thực phẩm).): Tìm hiểu ứng dụng của vi sinh vật có ích và quá trình đông tụ protein trong làng nghề",
    "activityTitle": "Hoạt động Khám phá & Vận dụng đời sống:Tìm hiểu ứng dụng của vi sinh vật có ích và quá trình đông tụ protein trong làng nghề",
    "teacherAct": "GV giới thiệu quy trình đun nóng nước đậu nành để váng đậu đông tụ tự nhiên thành từng lá tàu hủ ky béo ngậy và kỹ thuật ủ men làm bánh phồng. kết luận về vai trò quan trọng của vệ sinh an toàn thực phẩm trong các làng nghề truyền thống.",
    "studentAct": "HS thảo luận: Phân biệt vi sinh vật có ích (lên men thực phẩm) và nấm mốc gây hư hỏng đồ ăn; nêu biện pháp bảo quản khô ráo cho thực phẩm làng nghề."
  },
  {
    "id": "gddp_tv_88",
    "grade": 4,
    "subjectKey": "khoa_hoc",
    "subjectName": "Khoa học",
    "weeks": [
      32,
      33,
      34
    ],
    "lessonTitle": "Bài 27, 28:Chuỗi thức ăn trong tự nhiên & Bảo vệ môi trường sống của sinh vật",
    "topic": "Chủ đề 1 & 3 GDĐP 4: Hệ sinh thái rừng ngập mặn đước, vẹt Duyên Hải & Cồn Long Trị Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 & 3 GDĐP 4: Hệ sinh thái rừng ngập mặn đước, vẹt Duyên Hải & Cồn Long Trị Trà Vinh): Lập sơ đồ chuỗi thức ăn vùng rừng ngập mặn và đề xuất hành động bảo vệ môi trường",
    "activityTitle": "Hoạt động Khám phá & Dự án bảo vệ môi trường:Lập sơ đồ chuỗi thức ăn vùng rừng ngập mặn và đề xuất hành động bảo vệ môi trường",
    "teacherAct": "GV hướng dẫn HS xây dựng sơ đồ chuỗi thức ăn đặc trưng rừng ngập mặn: Lá bần/mùn bã hữu cơ -> Tôm, cua cá nhỏ -> Cá săn mồi -> Chim nước/Cò biển. tổng kết thông điệp 'Bảo vệ rừng ngập mặn là bảo vệ cuộc sống bình yên của quê hương trước biến đổi khí hậu'.",
    "studentAct": "HS thảo luận nhóm lập sơ đồ mắt xích thức ăn và đề xuất giải pháp chống suy thoái hệ sinh thái: không xả rác thải nhựa, bảo vệ rừng phòng hộ."
  },
  {
    "id": "gddp_tv_89",
    "grade": 4,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      1,
      2,
      3,
      4
    ],
    "lessonTitle": "Bài 1:Biết ơn người lao động (Chủ đề 1",
    "topic": "Chủ đề 7 & 8 GDĐP 4: Người nông dân trồng dừa sáp Cầu Kè & Nghệ nhân điêu khắc Chùa Hang",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 & 8 GDĐP 4: Người nông dân trồng dừa sáp Cầu Kè & Nghệ nhân điêu khắc Chùa Hang): Bày tỏ lòng biết ơn và kính trọng đối với người lao động quê hương",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Bày tỏ lòng biết ơn và kính trọng đối với người lao động quê hương",
    "teacherAct": "GV chiếu phóng sự ngắn về một ngày lao động của người thợ leo dừa hái dừa sáp, thợ thức khuya vớt từng lá tàu hủ ky bên chảo lửa đỏ rực. giáo dục học sinh không lãng phí thức ăn, đồ dùng và luôn kính trọng mọi ngành nghề chân chính.",
    "studentAct": "HS chia sẻ cảm xúc: Nêu những việc làm cụ thể thể hiện thái độ tôn trọng, lễ phép và biết quý trọng thành quả lao động của các cô bác công nhân, nông dân."
  },
  {
    "id": "gddp_tv_90",
    "grade": 4,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      5,
      6,
      7,
      8,
      9
    ],
    "lessonTitle": "Bài 2:Cảm thông, giúp đỡ người gặp khó khăn (Chủ đề 2",
    "topic": "Chủ đề 2 GDĐP 4: Kế hoạch nhỏ vì bạn khó",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 4: Kế hoạch nhỏ vì bạn khó): Thực hành dự án sẻ chia giúp đỡ bạn có hoàn cảnh khó khăn",
    "activityTitle": "Hoạt động Dự án nhân ái & Vận dụng:Thực hành dự án sẻ chia giúp đỡ bạn có hoàn cảnh khó khăn",
    "teacherAct": "GV phát động phong trào 'Kế hoạch nhỏ vì bạn khó': Hướng dẫn HS thu gom giấy vụn, vỏ lon nước ngọt hoặc nuôi heo đất tiết kiệm. tuyên dương tinh thần tương thân tương ái 'Lá lành đùm lá rách' của học sinh.",
    "studentAct": "HS thảo luận kế hoạch thực hiện của tổ, cam kết tự nguyện trích tiền tiêu vặt hoặc đóng góp đồ dùng học tập tặng bạn học sinh nghèo, bạn vùng đồng bào Khmer khó khăn."
  },
  {
    "id": "gddp_tv_91",
    "grade": 4,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      22,
      23,
      24,
      25,
      26,
      27
    ],
    "lessonTitle": "Bài 6:Tôn trọng tài sản của người khác & Bảo vệ của công, di tích lịch sử",
    "topic": "Chủ đề 5 GDĐP 4: Di tích khảo cổ Lưu Cừ II",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 4: Di tích khảo cổ Lưu Cừ II): Xây dựng quy tắc ứng xử văn minh và bảo vệ hiện vật tại các di tích, bảo tàng",
    "activityTitle": "Hoạt động Luyện tập & Vận dụng:Xây dựng quy tắc ứng xử văn minh và bảo vệ hiện vật tại các di tích, bảo tàng",
    "teacherAct": "GV chiếu các tình huống thực tế: Hành vi chạm tay vào hiện vật trưng bày, viết vẽ bậy lên cột gỗ đình làng hay vứt rác tại khu di tích khảo cổ. tổng kết, chốt lại thông điệp bảo vệ di sản văn hóa là trách nhiệm và niềm tự hào của mỗi học sinh.",
    "studentAct": "HS sắm vai xử lí tình huống: Đưa ra lời khuyên ngăn và giải thích vì sao phải trân trọng, bảo vệ từng viên gạch cổ, bia đá của tiền nhân để lại."
  },
  {
    "id": "gddp_tv_92",
    "grade": 4,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      10,
      11,
      12
    ],
    "lessonTitle": "Chủ đề 3:Tri ân thầy cô & Gương sáng ngàn đời (Hoạt động",
    "topic": "Chủ đề 6 GDĐP 4: Anh hùng LLVTND Nguyễn Thị Út",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 4: Anh hùng LLVTND Nguyễn Thị Út): Sân khấu hóa hoạt cảnh lịch sử và làm bưu thiếp tri ân thầy cô, các anh hùng",
    "activityTitle": "Hoạt động Sân khấu hóa & Tri ân:Sân khấu hóa hoạt cảnh lịch sử và làm bưu thiếp tri ân thầy cô, các anh hùng",
    "teacherAct": "GV hướng dẫn các tổ chuẩn bị hoạt cảnh ngắn tái hiện tấm gương chiến đấu kiên trung của Chị Út Tịch hoặc Đội quân tóc dài. nhận xét, khen ngợi tinh thần nhập vai xuất sắc và bồi đắp truyền thống 'Uống nước nhớ nguồn'.",
    "studentAct": "HS các tổ biểu diễn tự tin trên sân khấu lớp học; tự tay làm bưu thiếp và viết lời tri ân gửi tặng thầy cô giáo nhân dịp 20/11."
  },
  {
    "id": "gddp_tv_93",
    "grade": 4,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      13,
      14,
      15
    ],
    "lessonTitle": "Chủ đề 4:Tự hào truyền thống quê em (Hoạt động",
    "topic": "Chủ đề 4 GDĐP 4: Lễ hội Ka-thi-na",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 4: Lễ hội Ka-thi-na): Khám phá nét đẹp lễ hội truyền thống và giao lưu trò chơi dân gian",
    "activityTitle": "Hoạt động Ngày hội trải nghiệm:Khám phá nét đẹp lễ hội truyền thống và giao lưu trò chơi dân gian",
    "teacherAct": "GV tổ chức không gian 'Ngày hội văn hóa dân gian quê em': Trưng bày tranh ảnh lễ hội dâng y Ka-thi-na, cúng Kỳ yên và các đạo cụ trò chơi dân gian. tổng kết ngày hội trong không khí vui tươi, gắn kết tình bạn bè và tự hào về bản sắc văn hóa quê hương.",
    "studentAct": "HS tham gia trải nghiệm: Thi múa điệu Lâm-thôn nhịp nhàng, hát đối đáp ca dao xứ Dừa và chơi trò chơi dân gian bịt mắt đập niêu, nhảy bao bố."
  },
  {
    "id": "gddp_tv_94",
    "grade": 4,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      23,
      24,
      25
    ],
    "lessonTitle": "Chủ đề 7:Em và những người sống quanh em (Hoạt động",
    "topic": "Chủ đề 7 & 8 GDĐP 4: Dừa sáp Trà Vinh & Điêu khắc gỗ Chùa Hang",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 & 8 GDĐP 4: Dừa sáp Trà Vinh & Điêu khắc gỗ Chùa Hang): Dựng gian hàng trưng bày và thuyết trình giới thiệu đặc sản quê hương",
    "activityTitle": "Hoạt động Hội chợ sản vật quê hương:Dựng gian hàng trưng bày và thuyết trình giới thiệu đặc sản quê hương",
    "teacherAct": "GV phân công các tổ thiết kế gian hàng mini trưng bày mô hình, hình ảnh đặc sản và sản phẩm thủ công mỹ nghệ của quê hương 3 tỉnh. đánh giá, trao giải cho gian hàng có phần thuyết minh hấp dẫn và bài trí sáng tạo nhất.",
    "studentAct": "HS Quan sát, thảo luận nhóm và liên hệ thực tế quê hương Trà Vinh theo sự hướng dẫn của giáo viên."
  },
  {
    "id": "gddp_tv_95",
    "grade": 4,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      30,
      31,
      32
    ],
    "lessonTitle": "Chủ đề 9:Em bảo vệ môi trường (Hoạt động",
    "topic": "Chủ đề 3 GDĐP 4: Du lịch sinh thái Trà Vinh - Cồn Chim, Cồn Long Trị, Rừng đước",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 4: Du lịch sinh thái Trà Vinh - Cồn Chim, Cồn Long Trị, Rừng đước): Lập cẩm nang tuyên truyền 'Du lịch xanh sông nước miệt vườn'",
    "activityTitle": "Hoạt động Dự án môi trường:Lập cẩm nang tuyên truyền 'Du lịch xanh sông nước miệt vườn'",
    "teacherAct": "GV nêu thực trạng ô nhiễm rác thải nhựa tại các điểm du lịch sông rạch và bãi biển mùa lễ hội. phát động phong trào hành động bảo vệ môi trường xanh - sạch - đẹp tại trường học và địa phương.",
    "studentAct": "HS thảo luận nhóm: Thiết kế áp phích, infographic hoặc bảng quy tắc '5 Không' khi đi du lịch sinh thái (Không xả rác xuống sông rạch, Không bẻ cành bẻ hoa, Không sử dụng túi ni-lông dùng 1 lần...)."
  },
  {
    "id": "gddp_tv_96",
    "grade": 4,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      1,
      2,
      3,
      4
    ],
    "lessonTitle": "Bài 1:Lợi ích của hoa, cây cảnh đối với đời sống (Chủ đề 1",
    "topic": "Chủ đề 8 GDĐP 4: Khuôn viên cây xanh và nghệ thuật cảnh quan tại các chùa cổ Trà Vinh (Trang 36 - QĐ 2727/QĐ-BGDĐT)(Tìm hiểu vai trò thanh lọc không khí, tạo cảnh quan tươi đẹp và giá trị kinh tế của nghề ươm hoa kiểng Cái Mơn).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (8 GDĐP 4: Khuôn viên cây xanh và nghệ thuật cảnh quan tại các chùa cổ Trà Vinh(Tìm hiểu vai trò thanh lọc không khí, tạo cảnh quan tươi đẹp và giá trị kinh tế của nghề ươm hoa kiểng Cái Mơn).): Tìm hiểu lợi ích của hoa kiểng và nghề ươm cây giống quê hương",
    "activityTitle": "Hoạt động Khám phá & Vận dụng:Tìm hiểu lợi ích của hoa kiểng và nghề ươm cây giống quê hương",
    "teacherAct": "GV trình chiếu hình ảnh 'Vương quốc hoa kiểng Chợ Lách' và các bồn hoa rực rỡ tại công viên, sân trường. giáo dục ý thức yêu thiên nhiên, không ngắt hoa bẻ cành tại các khu vực công cộng.",
    "studentAct": "HS thảo luận: Nêu lợi ích của việc trồng cây xanh, hoa kiểng đối với sức khỏe con người, làm đẹp môi trường sống và mang lại nguồn thu nhập cho người dân."
  },
  {
    "id": "gddp_tv_97",
    "grade": 4,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      19,
      20,
      21,
      22
    ],
    "lessonTitle": "Bài 6:Trồng và chăm sóc hoa trong chậu (Chủ đề 1",
    "topic": "Chủ đề 1 GDĐP 4: Đặc điểm thổ nhưỡng đất giồng cát và phù sa màu mỡ Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 4: Đặc điểm thổ nhưỡng đất giồng cát và phù sa màu mỡ Trà Vinh): Thực hành phối trộn giá thể và trồng cây hoa mini trong chậu",
    "activityTitle": "Hoạt động Thực hành & Trải nghiệm:Thực hành phối trộn giá thể và trồng cây hoa mini trong chậu",
    "teacherAct": "GV hướng dẫn các bước kỹ thuật: Trộn đất phù sa với mụn dừa đã xử lí chát và tro trấu theo tỉ lệ thích hợp để tạo giá thể tơi xốp, thoát nước tốt. quan sát, hướng dẫn các thao tác kỹ thuật chuẩn xác và giao nhiệm vụ chăm sóc cây ở góc thiên nhiên của lớp.",
    "studentAct": "HS làm việc theo nhóm 4: Tự tay cho giá thể vào chậu nhựa mini, đặt cây hoa giống vào giữa, ấn nhẹ đất quanh gốc và tưới nước ẩm đều."
  },
  {
    "id": "gddp_tv_98",
    "grade": 4,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      1,
      2,
      3,
      4
    ],
    "lessonTitle": "Chủ đề 1:Âm thanh ngày mới (Hát & Nhạc cụ gõ)",
    "topic": "Chủ đề 4 & 8 GDĐP 4: Âm vang dàn nhạc Ngũ âm Khmer trong Lễ hội Ka-thi-na (Trống Sam-phô, đàn Rô-neát)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 & 8 GDĐP 4: Âm vang dàn nhạc Ngũ âm Khmer trong Lễ hội Ka-thi-na (Trống Sam-phô, đàn Rô-neát)): Lắng nghe âm sắc nhạc cụ dân tộc và gõ đệm thanh phách theo tiết tấu",
    "activityTitle": "Hoạt động Thường thức âm nhạc & Gõ đệm:Lắng nghe âm sắc nhạc cụ dân tộc và gõ đệm thanh phách theo tiết tấu",
    "teacherAct": "GV mở đoạn thu âm tiếng trống Sam-phô rộn rã và tiếng chuông reo của dàn nhạc Ngũ âm Khmer trong ngày hội Ka-thi-na. khen ngợi khả năng cảm thụ nhịp điệu của HS và giới thiệu nét độc đáo của nền âm nhạc dân gian truyền thống.",
    "studentAct": "HS tập trung lắng nghe, nhận diện âm thanh của từng loại nhạc cụ gõ; thực hành dùng thanh phách, trống nhỏ gõ đệm theo phách bài hát mở đầu."
  },
  {
    "id": "gddp_tv_99",
    "grade": 4,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      21,
      22,
      23,
      24
    ],
    "lessonTitle": "Chủ đề 6:Quê hương tươi đẹp (Hát & Nghe nhạc Dân ca Nam Bộ)",
    "topic": "Chủ đề 4 GDĐP 4: Giai điệu múa Lâm-thôn, nhạc cụ dân gian Khmer",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 4: Giai điệu múa Lâm-thôn, nhạc cụ dân gian Khmer): Tập hát và biểu diễn bài hát dân ca Nam Bộ ngọt ngào",
    "activityTitle": "Hoạt động Hát & Cảm thụ âm nhạc:Tập hát và biểu diễn bài hát dân ca Nam Bộ ngọt ngào",
    "teacherAct": "GV hát mẫu làn điệu dân ca Nam Bộ với chất giọng ngọt ngào, hướng dẫn HS cách luyến láy nhẹ nhàng mang đậm âm sắc miền Tây sông nước. nhận xét, khích lệ học sinh nuôi dưỡng tình yêu đối với những làn điệu dân ca quê hương ngọt ngào.",
    "studentAct": "HS luyện hát theo tổ, nhóm và cá nhân kết hợp động tác phụ họa chèo xuồng hoặc múa tay duyên dáng."
  },
  {
    "id": "gddp_tv_100",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      1,
      2
    ],
    "lessonTitle": "Bài 1:Vị trí địa lí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca",
    "topic": "Chủ đề 1 GDĐP 5: Dân cư Trà Vinh (Trang 5 - QĐ 2727/QĐ-BGDĐT)(Vị trí địa lí, mạng lưới sông ngòi cù lao, đơn vị hành chính các huyện, thị xã, thành phố quê hương).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 5: Dân cư Trà Vinh(Vị trí địa lí, mạng lưới sông ngòi cù lao, đơn vị hành chính các huyện, thị xã, thành phố quê hương).): Xác định vị trí địa lí và đơn vị hành chính quê hương",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Xác định vị trí địa lí và đơn vị hành chính quê hương",
    "teacherAct": "GV chiếu bản đồ hành chính tỉnh Trà Vinh, hướng dẫn HS xác định vị trí địa lí tiếp giáp biển Đông, sông Hậu, sông Cổ Chiên và 9 huyện, thị xã, thành phố trong tỉnh. kết luận về vị trí địa lí chiến lược, cửa ngõ giao thương thủy - bộ của vùng ĐBSCL.",
    "studentAct": "HS thảo luận nhóm 4: Chỉ và đọc tên các huyện, thị xã, thành phố trực thuộc quê hương trên lược đồ."
  },
  {
    "id": "gddp_tv_101",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      5,
      6
    ],
    "lessonTitle": "Bài 4:Dân cư và dân tộc ở Việt Nam",
    "topic": "Chủ đề 1 GDĐP 5: Dân cư Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 5: Dân cư Trà Vinh): Tìm hiểu đặc điểm dân tộc và phong tục tập quán quê hương",
    "activityTitle": "Hoạt động Khám phá 2 & Luyện tập:Tìm hiểu đặc điểm dân tộc và phong tục tập quán quê hương",
    "teacherAct": "GV chiếu bảng số liệu dân cư và hình ảnh trang phục, nét văn hóa sinh hoạt đặc trưng của người Kinh, Khmer, Hoa. giáo dục tinh thần đại đoàn kết toàn dân tộc, bình đẳng và tôn trọng bản sắc văn hóa đa dạng.",
    "studentAct": "HS làm việc theo cặp: Nêu những nét đẹp trong đời sống sinh hoạt, phong tục tương thân tương ái giữa các dân tộc anh em trên quê hương."
  },
  {
    "id": "gddp_tv_102",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      7,
      8
    ],
    "lessonTitle": "Bài 5:Nông nghiệp, lâm nghiệp, thủy sản",
    "topic": "Chủ đề 7 GDĐP 5: Mô hình nuôi tôm công nghệ cao",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 5: Mô hình nuôi tôm công nghệ cao): Tìm hiểu các ngành sản xuất nông - lâm - thủy sản thế mạnh của quê hương",
    "activityTitle": "Hoạt động Khám phá & Vận dụng:Tìm hiểu các ngành sản xuất nông - lâm - thủy sản thế mạnh của quê hương",
    "teacherAct": "GV trình chiếu phóng sự ngắn về vùng chuyên canh khoai lang Bình Tân xuất khẩu, mô hình nuôi tôm thẻ chân trắng công nghệ cao duyên hải và vùng cây trái Cái Mơn. giáo dục lòng tự hào về thành tựu đổi mới nông nghiệp, xây dựng nông thôn mới kiểu mẫu trên quê hương.",
    "studentAct": "HS thảo luận nhóm: Lập sơ đồ tư duy về các sản phẩm nông - thủy sản chủ lực và vai trò của việc áp dụng khoa học kỹ thuật hiện đại."
  },
  {
    "id": "gddp_tv_103",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      9,
      10
    ],
    "lessonTitle": "Bài 6:Công nghiệp và dịch vụ (Giao thông - Du lịch)",
    "topic": "Chủ đề: 4 GDĐP 5: Du lịch sinh thái và văn hóa tỉnh Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 5: Du lịch sinh thái và văn hóa tỉnh Trà Vinh): Tìm hiểu các loại hình du lịch sinh thái Cồn Chim, Ao Bà Om và nghề tiểu thủ công nghiệp",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Tìm hiểu các loại hình dịch vụ du lịch sinh thái và nghề tiểu thủ công nghiệp",
    "teacherAct": "GV tổ chức trò chơi 'Hành trình tour du lịch sông nước', chiếu hình ảnh các điểm du lịch cù lao và cơ sở sản xuất hàng thủ công mỹ nghệ xuất khẩu. tổng kết về tiềm năng kinh tế du lịch xanh và giải quyết việc làm cho người lao động địa phương.",
    "studentAct": "HS sắm vai hướng dẫn viên giới thiệu nét độc đáo của tour du lịch sinh thái miệt vườn và các sản phẩm mỹ nghệ từ lục bình, gáo dừa."
  },
  {
    "id": "gddp_tv_104",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      13,
      14
    ],
    "lessonTitle": "Bài 9:Triều Nguyễn (Chính sách khai hoang, xác lập chủ quyền và di tích kiến trúc)",
    "topic": "Chủ đề 2 GDĐP 5: Bảo tồn các di tích ở quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 5: Bảo tồn các di tích ở quê em): Tìm hiểu công cuộc khai phá và bảo tồn di tích cổ tại địa phương",
    "activityTitle": "Hoạt động Khám phá 2 & Vận dụng:Tìm hiểu công cuộc khai phá và bảo tồn di tích cổ tại địa phương",
    "teacherAct": "GV giới thiệu hình ảnh danh thắng Ao Bà Om, Đền thờ Bác Hồ (Long Đức), các ngôi chùa Khmer cổ kính (chùa Âng, chùa Hang) và kiến trúc truyền thống tại Trà Vinh. chốt lại truyền thống tôn sư trọng đạo và tri ân các bậc tiền nhân khai phá quê hương Trà Vinh.",
    "studentAct": "HS thảo luận: Nêu giá trị lịch sử, kiến trúc nghệ thuật của các di tích và trách nhiệm của học sinh trong việc bảo tồn di sản văn hóa dân tộc."
  },
  {
    "id": "gddp_tv_105",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      17
    ],
    "lessonTitle": "Bài 11:Phong trào Cần Vương và cuộc khởi nghĩa chống thực dân Pháp",
    "topic": "Chủ đề 2 GDĐP 5: Bảo tồn các di tích ở quê em (Trang 10 - QĐ 2727/QĐ-BGDĐT)(Khí phách yêu nước, phong trào đấu tranh bất khuất của nghĩa quân và văn thân miền Tây Nam Bộ).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 5: Bảo tồn các di tích ở quê em(Khí phách yêu nước, phong trào đấu tranh bất khuất của nghĩa quân và văn thân miền Tây Nam Bộ).): Tìm hiểu tinh thần yêu nước bất khuất của nhân dân quê hương thời kỳ chống Pháp",
    "activityTitle": "Hoạt động Khám phá & Luyện tập:Tìm hiểu tinh thần yêu nước bất khuất của nhân dân quê hương thời kỳ chống Pháp",
    "teacherAct": "GV đọc đoạn văn thơ yêu nước của cụ Đồ Chiểu ('Chở bao nhiêu đạo thuyền không khẳm / Đâm mấy thằng gian bút chẳng tà') và kể về các cuộc khởi nghĩa địa phương. giáo dục lòng tự hào và trách nhiệm noi gương cha anh.",
    "studentAct": "HS chia sẻ cảm nghĩ về lòng yêu nước, ý chí kiên trung của các bậc chí sĩ tiền bối."
  },
  {
    "id": "gddp_tv_106",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      21,
      22
    ],
    "lessonTitle": "Bài 14:Cuộc kháng chiến chống thực dân Pháp (1945 - 1954)",
    "topic": "Chủ đề 4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường): Tìm hiểu căn cứ kháng chiến và các tấm gương cách mạng kiên trung",
    "activityTitle": "Hoạt động Khám phá 1 & Vận dụng:Tìm hiểu căn cứ kháng chiến và các tấm gương cách mạng kiên trung",
    "teacherAct": "GV chiếu phim tư liệu về Căn cứ Cái Ngang (Tam Bình) - nơi chở che Tỉnh ủy, quân và dân vượt qua bom đạn khốc liệt. liên hệ giáo dục truyền thống 'Uống nước nhớ nguồn', chăm ngoan học giỏi đền đáp công ơn cha anh.",
    "studentAct": "HS kể lại tóm tắt tiểu sử đồng chí Phạm Thái Bường - người cộng sản kiên trung mẫu mực của quê hương."
  },
  {
    "id": "gddp_tv_107",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      23,
      24
    ],
    "lessonTitle": "Bài 15:Phong trào Đồng Khởi (1960) và cuộc kháng chiến chống Mỹ cứu nước",
    "topic": "Chủ đề 2 GDĐP 5: Di tích Bến tiếp nhận vũ khí Cồn Tàu - Đường Hồ Chí Minh trên biển (Trang 11 - QĐ 2727/QĐ-BGDĐT).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 5: Di tích Bến tiếp nhận vũ khí Cồn Tàu - Đường Hồ Chí Minh trên biển.): Tìm hiểu lịch sử Đường Hồ Chí Minh trên biển tại bến Cồn Tàu (Trà Vinh)",
    "activityTitle": "Hoạt động Khám phá trọng tâm:Tìm hiểu lịch sử Đường Hồ Chí Minh trên biển tại bến Cồn Tàu (Trà Vinh)",
    "teacherAct": "GV chiếu thước phim tư liệu lịch sử về Đoàn tàu Không số và Di tích quốc gia Bến tiếp nhận vũ khí Cồn Tàu (thị xã Duyên Hải, Trà Vinh). củng cố: Tự hào về truyền thống anh hùng, bất khuất của quân dân Trà Vinh trong sự nghiệp bảo vệ Tổ quốc.",
    "studentAct": "HS thảo luận nhóm: Trình bày ý nghĩa to lớn của Bến Cồn Tàu trên tuyến đường Hồ Chí Minh trên biển và lòng dũng cảm của các chiến sĩ tàu không số."
  },
  {
    "id": "gddp_tv_108",
    "grade": 5,
    "subjectKey": "lich_su_dia_ly",
    "subjectName": "Lịch sử và Địa lí",
    "weeks": [
      27,
      28
    ],
    "lessonTitle": "Bài 17:Đất nước đổi mới và hội nhập quốc tế",
    "topic": "Chủ đề 6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh): Tìm hiểu tấm gương bác Sáu Dân (Thủ tướng Võ Văn Kiệt) và diện mạo đổi mới quê hương",
    "activityTitle": "Hoạt động Khám phá & Vận dụng:Tìm hiểu tấm gương bác Sáu Dân (Thủ tướng Võ Văn Kiệt) và diện mạo đổi mới quê hương",
    "teacherAct": "GV trình chiếu chùm ảnh Khu tưởng niệm Thủ tướng Võ Văn Kiệt (Vũng Liêm) và các công trình giao thông thế kỷ bắc qua sông Tiền, sông Cổ Chiên. phát động phong trào thi đua học tập, sáng tạo để mai sau góp sức xây dựng quê hương giàu đẹp.",
    "studentAct": "HS chia sẻ cảm nghĩ: Bác Võ Văn Kiệt là tấm gương tiêu biểu cho tinh thần dám nghĩ, dám làm, hết lòng vì nước vì dân."
  },
  {
    "id": "gddp_tv_109",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      1
    ],
    "lessonTitle": "Bài 1:Thanh âm của gió (Chủ điểm",
    "topic": "Chủ đề: 1 GDĐP 5: Nét đẹp văn hóa và cộng đồng các dân tộc tỉnh Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 5: Nét đẹp văn hóa và cộng đồng các dân tộc tỉnh Trà Vinh): Cảm nhận vẻ đẹp thiên nhiên và văn hóa làng quê Trà Vinh",
    "activityTitle": "Hoạt động Luyện đọc & Cảm thụ văn học:Cảm nhận âm thanh và vẻ đẹp thiên nhiên làng quê quê hương",
    "teacherAct": "GV 1. Sau khi HS đọc bài đọc, GV mở file âm thanh tiếng gió thổi qua rặng dừa nước và tiếng sóng vỗ bờ kênh.2. HS liên hệ: Chia sẻ những âm thanh thân thuộc gắn liền với tuổi thơ của em (tiếng mái chèo, tiếng chim hót vườn cây cù lao).3. GV bồi đắp tâm hồn trong sáng, tình yêu thiên nhiên đất trời quê hương xứ sở.",
    "studentAct": "HS liên hệ: Chia sẻ những âm thanh thân thuộc gắn liền với tuổi thơ của em (tiếng mái chèo, tiếng chim hót vườn cây cù lao)."
  },
  {
    "id": "gddp_tv_110",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      3
    ],
    "lessonTitle": "Bài 5:Mở rộng vốn từ Trẻ em - Tuổi thơ",
    "topic": "Chủ đề 3 GDĐP 5: Giữ gìn và phát huy những phong tục tốt đẹp của người Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 5: Giữ gìn và phát huy những phong tục tốt đẹp của người Trà Vinh): Đặt câu với từ ngữ chỉ đức tính, hoạt động của trẻ em",
    "activityTitle": "Hoạt động Luyện tập 2 & 3:Đặt câu với từ ngữ chỉ đức tính, hoạt động của trẻ em",
    "teacherAct": "GV tổ chức trò chơi 'Đoán điệu múa, bắt chữ hay': Chiếu tranh các bạn nhỏ Khmer tập múa Lâm thôn, các bạn thiếu nhi chơi trò chơi dân gian. nhận xét, khen ngợi vốn từ ngữ phong phú và chuẩn xác của học sinh.",
    "studentAct": "HS thực hành đặt câu: 'Các bạn nhỏ say sưa luyện tập điệu múa truyền thống.' hoặc 'Thiếu nhi quê hương luôn chăm ngoan, hiếu học.'"
  },
  {
    "id": "gddp_tv_111",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      5
    ],
    "lessonTitle": "Bài 9:Viết bài văn tả cảnh (Cảnh sông nước / Vườn cây quê hương)",
    "topic": "Chủ đề 2 GDĐP 5: Bảo tồn các danh thắng ở quê em (Miêu tả cảnh vườn cây Cù lao Long Trị trĩu quả, dòng sông Cổ Chiên hoàng hôn, danh thắng Ao Bà Om Trà Vinh).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 5: Bảo tồn các danh thắng ở quê em): Thực hành viết bài văn tả cảnh sinh động",
    "activityTitle": "Hoạt động Luyện tập viết bài văn:Thực hành viết bài văn tả cảnh sinh động",
    "teacherAct": "GV hướng dẫn cấu trúc 3 phần của bài văn miêu tả cảnh sông nước, vườn cây; gợi ý sử dụng biện pháp so sánh, nhân hóa. chọn 2 - 3 bài viết xuất sắc đọc trước lớp, nhận xét lời văn giàu cảm xúc.",
    "studentAct": "HS viết bài văn vào vở, tập trung khắc họa màu sắc dòng nước chở nặng phù sa, hương thơm trái chín vườn cây miệt vườn."
  },
  {
    "id": "gddp_tv_112",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      13
    ],
    "lessonTitle": "Bài 15:Về thăm bà (Chủ điểm",
    "topic": "Chủ đề 3 GDĐP 5: Giữ gìn và phát huy những phong tục tốt đẹp của người Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 5: Giữ gìn và phát huy những phong tục tốt đẹp của người Trà Vinh): Bày tỏ tình cảm hiếu thảo đối với ông bà, tổ tiên",
    "activityTitle": "Hoạt động Đọc hiểu & Liên hệ thực tế:Bày tỏ tình cảm hiếu thảo đối với ông bà, tổ tiên",
    "teacherAct": "GV dẫn dắt: Đạo hiếu là nét đẹp truyền thống ngàn đời của gia đình người dân Nam Bộ. giáo dục học sinh luôn biết quan tâm, chăm sóc, lễ phép với ông bà, cha mẹ.",
    "studentAct": "HS kể lại một kỷ niệm ấm áp khi về thăm quê, phụ giúp ông bà chăm sóc cây cối hoặc thưởng thức món ngon quê nhà."
  },
  {
    "id": "gddp_tv_113",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      19
    ],
    "lessonTitle": "Bài 1 (Tập 2):Người thầy của muôn đời (Chủ điểm",
    "topic": "Chủ đề: 3 GDĐP 5: Tấm gương anh hùng liệt sĩ quê hương Trà Vinh - Nữ Anh hùng Út Tịch",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 5: Tấm gương người con ưu tú của quê hương Trà Vinh): Tìm hiểu tấm gương quả cảm và tinh thần yêu nước kiên cường của người con ưu tú quê hương",
    "activityTitle": "Hoạt động Khám phá & Luyện đọc hiểu:Tìm hiểu tấm gương đạo đức sáng ngời của người thầy trên quê hương",
    "teacherAct": "GV kể câu chuyện về cuộc đời chiến đấu kiên cường của Nữ Anh hùng Lực lượng vũ trang nhân dân Út Tịch (quê hương Tam Ngãi, Cầu Kè, Trà Vinh) với câu nói bất hủ 'Còn cái lai quần cũng đánh'. Giáo dục niềm tự hào và lòng yêu nước sâu sắc.",
    "studentAct": "HS thảo luận nhóm đôi: Nêu những phẩm chất dũng cảm, kiên cường của anh hùng liệt sĩ quê hương khiến mọi thế hệ kính phục."
  },
  {
    "id": "gddp_tv_114",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      22
    ],
    "lessonTitle": "Bài 6 (Tập 2):Kể chuyện danh nhân lịch sử / Tấm gương anh hùng",
    "topic": "Chủ đề 4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường): Thuyết trình giới thiệu về một danh nhân tiêu biểu của quê hương",
    "activityTitle": "Hoạt động Thực hành Nói và nghe:Thuyết trình giới thiệu về một danh nhân tiêu biểu của quê hương",
    "teacherAct": "GV hướng dẫn tiêu chí thuyết trình: Giọng kể truyền cảm, phong thái tự tin, có hình ảnh/infographic minh họa. nhận xét, đánh giá khả năng thuyết trình mạch lạc, truyền cảm hứng của học sinh.",
    "studentAct": "HS Quan sát, thảo luận nhóm và liên hệ thực tế quê hương Trà Vinh theo sự hướng dẫn của giáo viên."
  },
  {
    "id": "gddp_tv_115",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      25
    ],
    "lessonTitle": "Bài 11 (Tập 2):Di sản văn hóa phi vật thể (Chủ điểm",
    "topic": "Chủ đề 5 GDĐP 5: Nghệ thuật múa dân gian của đồng bào Khơ-me",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 5: Nghệ thuật múa dân gian của đồng bào Khơ-me): Tìm hiểu giá trị đặc sắc của các di sản văn hóa phi vật thể quê hương",
    "activityTitle": "Hoạt động Khám phá & Cảm thụ nghệ thuật:Tìm hiểu giá trị đặc sắc của các di sản văn hóa phi vật thể quê hương",
    "teacherAct": "GV mở trích đoạn video biểu diễn nghệ thuật Dù kê, dàn nhạc Ngũ âm và điệu múa Sa-dăm rộn rã trống chiêng của đồng bào Khmer Trà Vinh. khơi gợi niềm tự hào và ý thức giữ gìn bản sắc văn hóa dân tộc.",
    "studentAct": "HS thảo luận: Nêu ý nghĩa cầu chúc bình an, mùa màng bội thu của các loại hình nghệ thuật dân gian."
  },
  {
    "id": "gddp_tv_116",
    "grade": 5,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      31
    ],
    "lessonTitle": "Bài 24 (Tập 2):Viết đoạn văn nêu ý kiến về một hiện tượng / Việc làm bảo vệ môi trường",
    "topic": "Chủ đề 6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh): Viết đoạn văn 6 - 8 câu nêu rõ quan điểm và đề xuất giải pháp",
    "activityTitle": "Hoạt động Thực hành Viết đoạn văn:Viết đoạn văn 6 - 8 câu nêu rõ quan điểm và đề xuất giải pháp",
    "teacherAct": "GV nêu vấn đề: Thực trạng ô nhiễm túi ni-lông tại kênh rạch và giải pháp xây dựng tuyến đường hoa nông thôn mới. chấm chữa, tuyên dương các bài viết có lập luận sắc bén và ý thức công dân cao.",
    "studentAct": "HS thực hành viết đoạn văn lập luận chặt chẽ, đưa ra các dẫn chứng xác thực từ phong trào của địa phương."
  },
  {
    "id": "gddp_tv_117",
    "grade": 5,
    "subjectKey": "khoa_hoc",
    "subjectName": "Khoa học",
    "weeks": [
      6
    ],
    "lessonTitle": "Bài 6:Năng lượng sạch và sử dụng năng lượng tiết kiệm, hiệu quả",
    "topic": "Chủ đề 1 GDĐP 5: Tiềm năng năng lượng gió ven biển Duyên Hải - Trà Vinh (Các dự án điện gió ngoài khơi, điện mặt trời mái nhà thân thiện môi trường).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 5: Tiềm năng năng lượng gió ven biển Duyên Hải - Trà Vinh): Tìm hiểu mô hình khai thác năng lượng gió và năng lượng mặt trời tại địa phương",
    "activityTitle": "Hoạt động Khám phá 2 & Vận dụng:Tìm hiểu mô hình khai thác năng lượng gió và năng lượng mặt trời tại địa phương",
    "teacherAct": "GV chiếu video thực tế các cánh quạt tuabin điện gió sừng sững trên bờ biển Duyên Hải (Trà Vinh). kết luận về định hướng phát triển năng lượng xanh bền vững của quê hương Trà Vinh.",
    "studentAct": "HS thảo luận nhóm: Nêu ưu điểm vượt trội của điện gió (không phát thải khí nhà kính, tái tạo vô tận) so với nhiệt điện than."
  },
  {
    "id": "gddp_tv_118",
    "grade": 5,
    "subjectKey": "khoa_hoc",
    "subjectName": "Khoa học",
    "weeks": [
      14
    ],
    "lessonTitle": "Bài 14:Đất và bảo vệ môi trường đất",
    "topic": "Chủ đề 6 GDĐP 5: Xây dựng Nông thôn mới",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 5: Xây dựng Nông thôn mới): Tìm hiểu các biện pháp bảo vệ và làm giàu đất phù sa, đất cát giồng",
    "activityTitle": "Hoạt động Khám phá & Liên hệ thực tế:Tìm hiểu các biện pháp bảo vệ và làm giàu đất phù sa, đất cát giồng",
    "teacherAct": "GV cho HS quan sát giáo dục ý thức giữ gìn 'tấc đất tấc vàng' của quê hương.",
    "studentAct": "HS đề xuất các biện pháp canh tác bền vững: Luân canh cây trồng (lúa - màu), ủ phân hữu cơ rơm rạ, che phủ gốc cây ăn trái mùa nắng."
  },
  {
    "id": "gddp_tv_119",
    "grade": 5,
    "subjectKey": "khoa_hoc",
    "subjectName": "Khoa học",
    "weeks": [
      19
    ],
    "lessonTitle": "Bài 19:Sự sinh sản và phát triển của động vật thủy sản",
    "topic": "Chủ đề 7 GDĐP 5: Mô hình nuôi tôm công nghệ cao",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 5: Mô hình nuôi tôm công nghệ cao): Tìm hiểu vòng đời phát triển của tôm, cá và kỹ thuật nuôi trồng an toàn sinh học",
    "activityTitle": "Hoạt động Khám phá 1 & Luyện tập:Tìm hiểu vòng đời phát triển của tôm, cá và kỹ thuật nuôi trồng an toàn sinh học",
    "teacherAct": "GV chiếu sơ đồ vòng đời từ trứng - ấu trùng - tôm giống (postlarvae) - tôm trưởng thành trong bể nuôi công nghệ cao. liên hệ giáo dục bảo vệ nguồn nước tự nhiên trên các con sông rạch quê hương.",
    "studentAct": "HS làm việc nhóm: Trình bày vai trò của nguồn nước sạch và chế độ dinh dưỡng đối với tỉ lệ sống của thủy sản."
  },
  {
    "id": "gddp_tv_120",
    "grade": 5,
    "subjectKey": "khoa_hoc",
    "subjectName": "Khoa học",
    "weeks": [
      26
    ],
    "lessonTitle": "Bài 26:Môi trường và tài nguyên thiên nhiên (Rừng ngập mặn & Thích ứng biến đổi khí hậu)",
    "topic": "Chủ đề 7 GDĐP 5: Nuôi tôm công nghệ cao và bảo vệ môi trường nước",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 5: Nuôi tôm công nghệ cao và bảo vệ môi trường nước): Xây dựng giải pháp thích ứng biến đổi khí hậu và xâm nhập mặn tại địa phương",
    "activityTitle": "Hoạt động Khám phá & Vận dụng:Xây dựng giải pháp thích ứng biến đổi khí hậu và xâm nhập mặn tại địa phương",
    "teacherAct": "GV chiếu bản đồ xâm nhập mặn mùa khô và hình ảnh rừng ngập mặn chắn sóng bão tại duyên hải Nam Bộ. nhấn mạnh: Bảo vệ môi trường chính là bảo vệ tương lai bền vững của chính chúng ta.",
    "studentAct": "HS thảo luận: Đề xuất các giải pháp trữ nước ngọt sinh hoạt (hồ chứa, lu bạt) và trồng rừng phòng hộ giữ đất bãi bồi."
  },
  {
    "id": "gddp_tv_121",
    "grade": 5,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      2
    ],
    "lessonTitle": "Bài 1:Biết ơn người có công với quê hương, đất nước",
    "topic": "Chủ đề 4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường): Thực hành lòng biết ơn bằng những hành động cụ thể",
    "activityTitle": "Hoạt động Khám phá & Vận dụng:Thực hành lòng biết ơn bằng những hành động cụ thể",
    "teacherAct": "GV tổ chức cho HS đọc các câu chuyện cảm động về sự cống hiến trọn đời của các danh nhân, anh hùng quê hương. tổng kết, khắc sâu đạo lí cao đẹp của dân tộc Việt Nam.",
    "studentAct": "HS thảo luận nhóm: Lập kế hoạch thực hiện các việc làm 'Đền ơn đáp nghĩa' (viếng nghĩa trang liệt sĩ, giúp đỡ gia đình thương binh, giữ gìn nhà bia tưởng niệm)."
  },
  {
    "id": "gddp_tv_122",
    "grade": 5,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      8
    ],
    "lessonTitle": "Bài 3:Tôn trọng sự khác biệt của người khác",
    "topic": "Chủ đề 1 GDĐP 5: Dân cư Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 5: Dân cư Trà Vinh): Thực hành thái độ hòa đồng, tôn trọng bản sắc văn hóa của bạn bè",
    "activityTitle": "Hoạt động Xử lí tình huống & Sắm vai:Thực hành thái độ hòa đồng, tôn trọng bản sắc văn hóa của bạn bè",
    "teacherAct": "GV đưa ra tình huống: Bạn học sinh người dân tộc thiểu số mang món ăn truyền thống hoặc mặc trang phục lễ hội đến lớp. kết luận: Tôn trọng sự khác biệt tạo nên khối đại đoàn kết bền vững và môi trường học đường hạnh phúc.",
    "studentAct": "HS đóng vai thể hiện thái độ tôn trọng, chúc mừng, khen ngợi và cùng chung vui với bạn bè."
  },
  {
    "id": "gddp_tv_123",
    "grade": 5,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      17
    ],
    "lessonTitle": "Bài 6:Bảo tồn và phát huy di sản văn hóa quê hương",
    "topic": "Chủ đề 2 GDĐP 5: Bảo tồn các di tích ở quê em",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (2 GDĐP 5: Bảo tồn các di tích ở quê em): Em là tuyên truyền viên nhí bảo vệ di sản quê hương",
    "activityTitle": "Hoạt động Khám phá & Cam kết hành động:Em là tuyên truyền viên nhí bảo vệ di sản quê hương",
    "teacherAct": "GV chiếu hình ảnh các di tích quốc gia và lễ hội truyền thống đang được trùng tu, bảo tồn trên quê hương.",
    "studentAct": "HS thảo luận: Xây dựng quy tắc ứng xử văn minh khi tham quan di tích (không viết vẽ bậy, giữ gìn vệ sinh, trang phục lịch sự)."
  },
  {
    "id": "gddp_tv_124",
    "grade": 5,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      24
    ],
    "lessonTitle": "Bài 8:Bảo vệ môi trường nơi công cộng và môi trường nước",
    "topic": "Chủ đề 6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh): Hành động thiết thực vì dòng sông xanh - đường làng sạch đẹp",
    "activityTitle": "Hoạt động Vận dụng & Tuyên truyền:Hành động thiết thực vì dòng sông xanh - đường làng sạch đẹp",
    "teacherAct": "GV tổ chức trò chơi 'Đúng - Sai' phân tích các hành vi tác động đến nguồn nước sông rạch và môi trường công cộng. khen ngợi ý thức trách nhiệm cộng đồng của các em học sinh.",
    "studentAct": "HS viết cam kết hành động: Không vứt rác bừa bãi, thu gom bao bì phân bón/thuốc BVTV đúng nơi quy định, chăm sóc cây xanh quanh trường."
  },
  {
    "id": "gddp_tv_125",
    "grade": 5,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      11
    ],
    "lessonTitle": "Chủ đề 3:Tự hào truyền thống quê hương (Sinh hoạt dưới cờ & HĐGD theo CĐ)",
    "topic": "Chủ đề 3 GDĐP 5: Giữ gìn và phát huy những phong tục tốt đẹp",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (3 GDĐP 5: Giữ gìn và phát huy những phong tục tốt đẹp): Sân khấu hóa nét đẹp văn hóa dân gian và lễ hội quê hương",
    "activityTitle": "Hoạt động Trải nghiệm tập thể:Sân khấu hóa nét đẹp văn hóa dân gian và lễ hội quê hương",
    "teacherAct": "GV phối hợp tổ chức hội thi sân khấu hóa: Các tổ biểu diễn tiết mục múa Lâm thôn, trình diễn trang phục dân tộc hoặc hát dân ca Nam Bộ. tổng kết, trao thưởng và khơi dậy lòng tự hào về di sản văn hóa phong phú của quê hương.",
    "studentAct": "HS hào hứng tham gia biểu diễn văn nghệ và thuyết minh ý nghĩa nét đẹp văn hóa quê mình."
  },
  {
    "id": "gddp_tv_126",
    "grade": 5,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      15
    ],
    "lessonTitle": "Chủ đề 4:Uống nước nhớ nguồn (Sinh hoạt lớp)",
    "topic": "Chủ đề 4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (4 GDĐP 5: Bí thư Tỉnh ủy Phạm Thái Bường): Làm thiệp tri ân và lao động vệ sinh di tích lịch sử địa phương",
    "activityTitle": "Hoạt động Tri ân & Đền ơn đáp nghĩa:Làm thiệp tri ân và lao động vệ sinh di tích lịch sử địa phương",
    "teacherAct": "GV phát động phong trào 'Hành trình đến các địa chỉ đỏ': Tổ chức làm vệ sinh khuôn viên bia tưởng niệm liệt sĩ xã/phường. đánh giá tinh thần trách nhiệm và lòng biết ơn của học sinh.",
    "studentAct": "HS tỉ mỉ cắt dán thiệp hoa ghi những lời tri ân sâu sắc gửi tặng các gia đình có công với cách mạng."
  },
  {
    "id": "gddp_tv_127",
    "grade": 5,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      23
    ],
    "lessonTitle": "Chủ đề 6:Em và môi trường sống (Sinh hoạt dưới cờ & HĐGD theo CĐ)",
    "topic": "Chủ đề 6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh): Triển khai chiến dịch 'Dòng sông xanh - Tuyến đường hoa nông thôn mới'",
    "activityTitle": "Hoạt động Dự án xanh vì cộng đồng:Triển khai chiến dịch 'Dòng sông xanh - Tuyến đường hoa nông thôn mới'",
    "teacherAct": "GV phân công các nhóm dự án: Nhóm 1 vẽ tranh cổ động bảo vệ nguồn nước; Nhóm tuyên dương các tập thể nhỏ có sáng kiến bảo vệ môi trường xuất sắc.",
    "studentAct": "HS các tổ hào hứng thực hiện nhiệm vụ, báo cáo kết quả bằng hình ảnh sinh động."
  },
  {
    "id": "gddp_tv_128",
    "grade": 5,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      29
    ],
    "lessonTitle": "Chủ đề 8:Em tìm hiểu nghề truyền thống quê hương (Sinh hoạt lớp)",
    "topic": "Chủ đề 7 GDĐP 5: Mô hình nuôi tôm công nghệ cao",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (7 GDĐP 5: Mô hình nuôi tôm công nghệ cao): Thực hành làm sản phẩm thủ công mỹ nghệ đơn giản từ lục bình / xơ dừa",
    "activityTitle": "Hoạt động Trải nghiệm nghề nghiệp:Thực hành làm sản phẩm thủ công mỹ nghệ đơn giản từ lục bình / xơ dừa",
    "teacherAct": "GV mời nghệ nhân đan lục bình hoặc chuẩn bị sẵn sợi lục bình khô/cọng dừa hướng dẫn học sinh kỹ thuật tết sam đơn giản. trưng bày sản phẩm tại 'Góc bàn tay vàng', giáo dục tình yêu lao động và trân trọng nghề truyền thống.",
    "studentAct": "HS thực hành theo cặp, khéo léo đan tết chiếc đế lót ly hoặc chiếc quạt mini xinh xắn."
  },
  {
    "id": "gddp_tv_129",
    "grade": 5,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      33
    ],
    "lessonTitle": "Chủ đề 9:Ngày hội tự hào quê hương em (Sinh hoạt dưới cờ & Sinh hoạt lớp)",
    "topic": "Chủ đề 1, 2, 4, 5 GDĐP 5: Dân cư, Di tích, Du lịch và Đặc sản quê hương (Trang 5, 10, 21, 26 - QĐ 2723; Trang 5, 30, 45, 50 - QĐ 4346; Trang 5, 9, 23, 28, 32 - QĐ 2727).",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1, 2, 4, 5 GDĐP 5: Dân cư, Di tích, Du lịch và Đặc sản quê hương.): Gian hàng trưng bày 'Hương sắc quê hương Trà Vinh'",
    "activityTitle": "Hoạt động Ngày hội Festival quê hương:Gian hàng trưng bày 'Hương sắc quê hương Trà Vinh'",
    "teacherAct": "GV cùng HS trang trí các gian hàng đặc sản Trà Vinh: Bánh tét Trà Cuôn, dừa sáp Cầu Kè, bún nước lèo, bánh ống Khmer, tranh ảnh lễ hội Ok Om Bok và danh thắng Ao Bà Om. tổng kết, trao giải gian hàng ấn tượng, khép lại năm học tràn đầy tự hào.",
    "studentAct": "HS đóng vai thuyết minh viên giới thiệu văn hóa ẩm thực và tiềm năng phát triển của quê hương Trà Vinh đến phụ huynh và thầy cô."
  },
  {
    "id": "gddp_tv_130",
    "grade": 5,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      5
    ],
    "lessonTitle": "Bài 3:Sử dụng điện thoại an toàn và văn minh (hoặc Thiết bị công nghệ gia đình)",
    "topic": "Chủ đề 6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh - Chuyển đổi số nông thôn",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (6 GDĐP 5: Nông thôn mới trên quê hương Trà Vinh - Chuyển đổi số nông thôn): Ứng dụng công nghệ số phục vụ học tập và đời sống nông thôn mới",
    "activityTitle": "Hoạt động Vận dụng:Ứng dụng công nghệ số phục vụ học tập và đời sống nông thôn mới",
    "teacherAct": "GV hướng dẫn học sinh nhận biết các tiện ích của điện thoại thông minh: Tìm kiếm tư liệu học tập, xem dự báo thời tiết hạn mặn phục vụ sản xuất. giáo dục văn hóa ứng xử văn minh trên không gian mạng.",
    "studentAct": "HS thảo luận: Quy tắc sử dụng điện thoại thông minh an toàn, không lạm dụng chơi game, bảo mật thông tin cá nhân."
  },
  {
    "id": "gddp_tv_131",
    "grade": 5,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      16
    ],
    "lessonTitle": "Bài 7:Lắp ráp mô hình kỹ thuật (Mô hình tuabin gió / Xe chở hàng)",
    "topic": "Chủ đề 1 GDĐP 5: Tiềm năng điện gió ngoài khơi Duyên Hải (Trà Vinh)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (1 GDĐP 5: Tiềm năng điện gió ngoài khơi Duyên Hải (Trà Vinh)): Lắp ráp mô hình tuabin điện gió mini",
    "activityTitle": "Hoạt động Thực hành sáng tạo:Lắp ráp mô hình tuabin điện gió mini",
    "teacherAct": "GV chuẩn bị bộ lắp ghép kỹ thuật, hướng dẫn quy trình lắp ráp trụ đỡ, trục quay và cánh quạt tuabin gió. đánh giá kỹ năng khéo léo, tư duy kỹ thuật và liên hệ các công trình điện gió thực tế tại quê hương.",
    "studentAct": "HS làm việc nhóm: Thực hành lắp ráp, dùng quạt gió thổi thử nghiệm để cánh quạt quay đều."
  },
  {
    "id": "gddp_tv_132",
    "grade": 5,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      8
    ],
    "lessonTitle": "Chủ đề 2:Giai điệu quê hương (Học hát & Gõ đệm nhạc cụ dân tộc)",
    "topic": "Chủ đề 5 GDĐP 5: Nghệ thuật múa dân gian Khơ-me",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 5: Nghệ thuật múa dân gian Khơ-me): Hát kết hợp gõ đệm nhạc cụ gõ dân tộc",
    "activityTitle": "Hoạt động Luyện tập & Biểu diễn:Hát kết hợp gõ đệm nhạc cụ gõ dân tộc",
    "teacherAct": "GV bắt nhịp cho cả lớp hát vang giai điệu dân ca Nam Bộ sâu lắng, mượt mà. biểu dương sự tự tin và tình cảm tha thiết của học sinh khi thể hiện làn điệu quê hương.",
    "studentAct": "HS chia 2 nhóm: Nhóm 1 hát hòa bè, Nhóm 2 sử dụng song loan và thanh phách gõ nhịp giòn giã."
  },
  {
    "id": "gddp_tv_133",
    "grade": 5,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      22
    ],
    "lessonTitle": "Chủ đề 6:Âm vang ngày hội (Thường thức âm nhạc & Nhạc cụ)",
    "topic": "Chủ đề 5 GDĐP 5: Nhạc cụ dàn nhạc Ngũ âm Khmer",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (5 GDĐP 5: Nhạc cụ dàn nhạc Ngũ âm Khmer): Nghe và phân biệt âm sắc các nhạc cụ truyền thống dân tộc",
    "activityTitle": "Hoạt động Thường thức âm nhạc:Nghe và phân biệt âm sắc các nhạc cụ truyền thống dân tộc",
    "teacherAct": "GV mở các trích đoạn hòa tấu: Tiếng đàn Roneat rộn rã trong lễ hội Ok Om Bok và tiếng đờn Kìm mùi mẫn trong Dạ cổ hoài lang. khích lệ học sinh tìm hiểu và trân trọng các loại nhạc cụ di sản của cha ông.",
    "studentAct": "HS nghe và đoán đúng tên từng loại nhạc cụ qua âm sắc đặc trưng."
  }
];

  var GDDP_FALLBACK_THEMES = {
    toan: {
      1: {
        topic: 'Bài 7 GDĐP 1: Cảnh sắc thiên nhiên quê em',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh (Bài 7: Cảnh sắc quê em): Nhận biết và đếm số lượng các hình ảnh thân thuộc của quê hương Trà Vinh (cây dừa sáp, con tôm sú, chiếc xuồng ba lá, hàng cây sao Ao Bà Om) qua các bài toán đếm và phép tính đơn giản.',
        teacherAct: 'GV sử dụng hình ảnh trực quan về quê hương Trà Vinh (trái dừa sáp, tôm sú, cây sao quanh Ao Bà Om) làm ngữ liệu cho bài toán; khuyến khích HS hào hứng tính toán.',
        studentAct: 'HS quan sát tranh ảnh quê hương Trà Vinh, thực hiện các phép tính và chia sẻ cảm nhận với bạn bè.'
      },
      2: {
        topic: 'Chủ đề 7 GDĐP 2: Đặc sản quê hương Trà Vinh',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Đặc sản Trà Vinh): Vận dụng số liệu thực tế về trái dừa sáp Cầu Kè, đòn bánh tét Trà Cuôn, số lượng cây sao cổ thụ quanh Ao Bà Om vào bài tập đếm, so sánh và tính toán.',
        teacherAct: 'GV liên hệ bài toán với các sự vật quen thuộc tại Trà Vinh (đòn bánh tét, trái dừa sáp Cầu Kè); hướng dẫn HS đọc kĩ đề bài và tính toán chính xác.',
        studentAct: 'HS làm việc nhóm, vận dụng phép tính để giải bài toán gắn với đời sống thực tế quê hương.'
      },
      3: {
        topic: 'Chủ đề 7 GDĐP 3: Làng nghề và sản vật Trà Vinh',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Làng nghề Trà Vinh): Vận dụng số liệu thực tế về sản phẩm làng nghề bánh tét Trà Cuôn, chiếu Cà Hom, khoảng cách địa lí giữa các huyện ở Trà Vinh vào bài toán.',
        teacherAct: 'GV gợi mở ngữ cảnh bài toán từ các làng nghề truyền thống Trà Vinh; rèn luyện kĩ năng tính toán và giải quyết vấn đề thực tế cho HS.',
        studentAct: 'HS tự giác làm bài, đối chiếu kết quả với bạn và nêu ý nghĩa của việc ứng dụng toán học vào đời sống lao động của quê hương.'
      },
      4: {
        topic: 'Chủ đề 7 GDĐP 4: Dừa sáp và tiềm năng kinh tế Trà Vinh',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Dừa sáp Trà Vinh): Vận dụng các phép tính, đơn vị đo lường và biểu đồ để phân tích số liệu về sản lượng dừa sáp Cầu Kè, diện tích Cồn Chim, Cồn Long Trị, số di tích lịch sử Trà Vinh.',
        teacherAct: 'GV giới thiệu số liệu thực tế về sản lượng nông sản, diện tích cồn bãi hoặc khoảng cách địa lí của tỉnh Trà Vinh; hướng dẫn HS phân tích bài toán khoa học.',
        studentAct: 'HS phân tích số liệu, thực hiện tính toán chính xác và nhận biết giá trị kinh tế của nông sản quê nhà.'
      },
      5: {
        topic: 'Chủ đề 1 & 7 GDĐP 5: Dân cư, Kinh tế và Nông thôn mới Trà Vinh',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 & 7: Dân cư, Kinh tế Trà Vinh): Ứng dụng số liệu thực tế về diện tích, dân số các huyện/thị xã/thành phố của tỉnh Trà Vinh, sản lượng nuôi tôm công nghệ cao Duyên Hải, năng lượng điện gió vào giải toán thực tế.',
        teacherAct: 'GV cung cấp bảng số liệu thực tế về địa bàn tỉnh Trà Vinh (9 huyện, thị xã, thành phố; sản lượng thủy sản nuôi trồng); dẫn dắt HS giải toán thực tiễn.',
        studentAct: 'HS tính toán, so sánh tỉ số phần trăm/số đo và tự hào về sự đổi mới, phát triển kinh tế của quê hương Trà Vinh.'
      }
    },
    tieng_viet: {
      default: {
        topic: 'GDĐP Trà Vinh: Ngôn ngữ, ca dao và nét đẹp quê hương',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh: Mở rộng vốn từ, cảm nhận vẻ đẹp thiên nhiên, con người và truyền thống đoàn kết ba dân tộc Kinh - Khmer - Hoa trên quê hương Trà Vinh qua bài học.',
        teacherAct: 'GV gợi mở từ ngữ, câu văn hoặc hình ảnh gắn với danh thắng, con người Trà Vinh (Ao Bà Om, Biển Ba Động, Cồn Chim, Chùa Hang); khơi gợi cảm xúc yêu quê hương trong từng câu chữ.',
        studentAct: 'HS tích cực phát biểu, đặt câu có hình ảnh quê hương Trà Vinh và thể hiện lòng tự hào với quê hương.'
      }
    },
    dao_duc: {
      default: {
        topic: 'GDĐP Trà Vinh: Nét đẹp tình người và truyền thống đoàn kết',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh: Bồi dưỡng tình yêu quê hương, lòng biết ơn ông bà cha mẹ, tinh thần tương thân tương ái và sự gắn bó keo sơn giữa ba dân tộc Kinh - Khmer - Hoa.',
        teacherAct: 'GV nêu gương sáng về lòng nhân ái, tình làng nghĩa xóm và sự đoàn kết giữa các dân tộc tại tỉnh Trà Vinh; định hướng hành vi đúng đắn cho HS.',
        studentAct: 'HS lắng nghe, tự liên hệ bản thân và cam kết thực hiện những việc làm tốt đẹp với gia đình, bạn bè và mọi người xung quanh.'
      }
    },
    general: {
      default: {
        topic: 'Giáo dục địa phương tỉnh Trà Vinh (QĐ 2727/QĐ-BGDĐT)',
        yccd: '- Tích hợp GDĐP tỉnh Trà Vinh: Tìm hiểu nét đẹp văn hóa, di tích lịch sử, danh lam thắng cảnh và sản vật địa phương; bồi dưỡng lòng tự hào và ý thức xây dựng quê hương Trà Vinh tươi đẹp.',
        teacherAct: 'GV kết nối nội dung bài học với thực tế địa phương Trà Vinh; chiếu hình ảnh, video minh họa và động viên HS tìm hiểu thêm về quê hương.',
        studentAct: 'HS hào hứng theo dõi, thảo luận nhóm và chia sẻ những điều thú vị về mảnh đất và con người Trà Vinh.'
      }
    }
  };

  function normalizeStr(s) {
    if (!s) return '';
    return s.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  var GDDP_STOP_WORDS = {
    'bai': true, 'tiet': true, 'chu': true, 'diem': true, 'tap': true,
    'va': true, 'cua': true, 'trong': true, 'cac': true, 'nhung': true,
    'mot': true, 'hai': true, 'ba': true, 'bon': true, 'nam': true,
    'sau': true, 'bay': true, 'tam': true, 'chin': true, 'muoi': true,
    'so': true, 'la': true, 'o': true, 'cho': true, 've': true,
    'voi': true, 'theo': true, 'de': true, 'phan': true, 'tuan': true,
    'quy': true, 'kntt': true, 'canh': true, 'dieu': true, 'chan': true, 'troi': true
  };

  function extractGddpTokens(s) {
    var norm = normalizeStr(s);
    if (!norm) return [];
    var parts = norm.split(' ');
    var res = [];
    for (var i = 0; i < parts.length; i++) {
      var w = parts[i];
      if (w.length >= 2 && !GDDP_STOP_WORDS[w] && !/^\d+$/.test(w)) {
        res.push(w);
      }
    }
    return res;
  }

  var GddpService = {
    provinces: [
      { id: 'tra_vinh', name: 'Tỉnh Trà Vinh', decision: 'QĐ 2727/QĐ-BGDĐT' }
    ],

    items: GDDP_TRA_VINH_ITEMS,

    /**
     * Tìm kiếm nội dung GDĐP Trà Vinh phù hợp nhất cho 1 bài học
     * TUÂN THỦ NGHIÊM NGẶT 100% THEO KẾ HOẠCH GỐC ĐÃ DUYỆT (QĐ 2727/QĐ-BGDĐT):
     * - Chỉ tích hợp khi đúng Môn, đúng Bài/Tuần được phê duyệt trong Kế hoạch gốc.
     * - TẮT BỎ HOÀN TOÀN FALLBACK: Tuyệt đối không tự chèn sang môn Toán, Tin học, GDTC hoặc các tuần không quy định.
     */
    getTraVinhGddpForLesson: function(grade, subjectKey, week, lessonTitle) {
      var g = parseInt(grade) || 5;
      var sKey = (subjectKey || '').toLowerCase().trim();
      var w = parseInt(week) || 1;
      var rawTitle = (lessonTitle || '').trim();

      // Chuẩn hóa môn học
      var sNorm = sKey;
      if (sNorm === 'mi_thuat') sNorm = 'my_thuat';
      if (sNorm === 'tv') sNorm = 'tieng_viet';
      if (sNorm === 'lsdl' || sNorm === 'ls_dl' || sNorm === 'su_dia') sNorm = 'lich_su_dia_ly';
      if (sNorm === 'kh') sNorm = 'khoa_hoc';
      if (sNorm === 'dd') sNorm = 'dao_duc';
      if (sNorm === 'cn') sNorm = 'cong_nghe';
      if (sNorm === 'an') sNorm = 'am_nhac';

      // 1. Kiểm tra danh mục môn học được phép lồng ghép theo Kế hoạch gốc GDĐP tỉnh Trà Vinh
      // Môn Toán, Tin học, Thể dục (GDTC), Tiếng Anh KHÔNG CÓ trong kế hoạch -> Lập tức trả về null
      var ALLOWED_GDDP_SUBJECTS = [
        'tnxh', 'tieng_viet', 'dao_duc', 'hdtn', 'my_thuat', 'am_nhac', 'cong_nghe', 'khoa_hoc', 'lich_su_dia_ly'
      ];
      if (ALLOWED_GDDP_SUBJECTS.indexOf(sNorm) === -1) {
        return null;
      }

      // 2. Lọc danh sách bài được phê duyệt theo đúng Khối lớp và Môn học
      var candidates = GDDP_TRA_VINH_ITEMS.filter(function(it) {
        if (it.grade !== g) return false;
        var itSubj = (it.subjectKey === 'mi_thuat') ? 'my_thuat' : it.subjectKey;
        return itSubj === sNorm;
      });

      if (candidates.length === 0) {
        return null;
      }

      var userTokens = extractGddpTokens(rawTitle);
      var userTokenSet = {};
      userTokens.forEach(function(tok) { userTokenSet[tok] = true; });
      var normRawTitle = normalizeStr(rawTitle);

      var bestItem = null;
      var bestScore = 0;

      for (var i = 0; i < candidates.length; i++) {
        var it = candidates[i];
        var itTokens = extractGddpTokens(it.lessonTitle);
        var itNormTitle = normalizeStr(it.lessonTitle);

        var hasWeek = (it.weeks || []).indexOf(w) !== -1;

        // Đếm số token trùng khớp theo từng từ nguyên vẹn (tránh match substring nhầm)
        var matchedCount = 0;
        for (var j = 0; j < itTokens.length; j++) {
          if (userTokenSet[itTokens[j]]) {
            matchedCount++;
          }
        }

        var matchRatio = itTokens.length > 0 ? (matchedCount / itTokens.length) : 0;

        // Kiểm tra chuỗi con chứa nhau nếu tiêu đề đủ dài
        var isSubstring = (normRawTitle.length >= 8 && itNormTitle.indexOf(normRawTitle) !== -1) ||
                          (itNormTitle.length >= 8 && normRawTitle.indexOf(itNormTitle) !== -1);

        var score = 0;
        if (hasWeek) {
          // Đúng tuần: Bắt buộc phải có sự liên quan về nội dung bài học
          if (matchedCount >= 2 || matchRatio >= 0.25 || isSubstring) {
            score = 60 + (matchRatio * 40);
          }
        } else {
          // Khác tuần: Chỉ chấp nhận nếu tiêu đề trùng khớp rất cao (dịch chuyển tuần dạy thực tế)
          if ((matchedCount >= 3 && matchRatio >= 0.6) || (isSubstring && matchRatio >= 0.5)) {
            score = matchRatio * 50;
          }
        }

        if (score > bestScore) {
          bestScore = score;
          bestItem = it;
        }
      }

      // Chỉ chấp nhận khi khớp bài học chính xác trong Kế hoạch gốc đã phê duyệt (Score >= 40)
      if (bestItem && bestScore >= 40) {
        return {
          id: bestItem.id,
          topic: bestItem.topic,
          yccdText: bestItem.yccdText,
          activityTitle: bestItem.activityTitle,
          teacherAct: bestItem.teacherAct,
          studentAct: bestItem.studentAct,
          isExactMatch: true,
          score: bestScore
        };
      }

      // TUÂN THỦ NGHIÊM NGẶT 100%: Tuyệt đối không fallback tự tạo cho các tuần/môn không quy định
      return null;
    }
  };

  root.GDDP_DATA = GddpService;

})(typeof window !== 'undefined' ? window : global);
