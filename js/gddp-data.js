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
      12
    ],
    "lessonTitle": "Bài 11: Hoạt động mua bán hàng hóa",
    "topic": "Chủ đề 7 GDĐP 2: Đặc sản quê em (Trang 38 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Đặc sản quê em - Trang 38): Nhận biết và kể tên các món ăn đặc sản nổi tiếng của quê hương Trà Vinh (bánh tét Trà Cuôn, bún nước lèo, dừa sáp Cầu Kè) được buôn bán nhộn nhịp tại các chợ truyền thống.",
    "activityTitle": "Hoạt động Khám phá & Thực hành: Đóng vai mua bán các món ăn đặc sản địa phương Trà Vinh",
    "teacherAct": "GV trình chiếu tranh ảnh phiên chợ quê Trà Vinh với các quầy bán bánh tét Trà Cuôn, dừa sáp Cầu Kè. Hướng dẫn HS sắm vai người bán và người mua: Giới thiệu nét ngon, xuất xứ, hỏi giá và thanh toán tiền văn minh, niềm nở. Nhận xét, khen ngợi và giáo dục học sinh niềm tự hào về sản vật quê hương.",
    "studentAct": "HS quan sát tranh, thảo luận nhóm đôi và sắm vai: Giới thiệu đòn bánh tét Trà Cuôn dẻo thơm nức tiếng, quả dừa sáp Cầu Kè béo ngậy; thực hành giao tiếp mua bán thân thiện, lễ phép."
  },
  {
    "id": "gddp_tv_27",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      15,
      16
    ],
    "lessonTitle": "Bài 15: Ôn tập chủ đề Cộng đồng địa phương",
    "topic": "Chủ đề 1 GDĐP 2: Trà Vinh quê hương em (Trang 5) & Chủ đề 4: Lễ hội Óc-om-bóc (Trang 21 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 & 4 - Trang 5, 21): Giới thiệu cảnh quan phố phường rợp bóng cây xanh và không khí tưng bừng của ngày hội đua ghe Ngo truyền thống quê hương Trà Vinh.",
    "activityTitle": "Hoạt động Luyện tập: Trưng bày tranh ảnh và giới thiệu một nét đẹp tiêu biểu của quê hương em",
    "teacherAct": "GV chiếu video ngắn về Thành phố Trà Vinh - đô thị cây xanh và ngày hội đua ghe Ngo trên sông Long Bình. Hướng dẫn các nhóm trưng bày và thuyết trình.",
    "studentAct": "HS làm việc nhóm 4: Dán tranh ảnh sưu tầm lên bảng nhóm, đại diện thuyết trình về cảnh đẹp hoặc ngày hội quê em với niềm tự hào sâu sắc."
  },
  {
    "id": "gddp_tv_28",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      17
    ],
    "lessonTitle": "Bài 16: Thực vật sống ở đâu?",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om (Trang 16 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Thắng cảnh Ao Bà Om - Trang 16): Tìm hiểu môi trường sống của thực vật tại di tích Ao Bà Om: Hàng trăm cây sao, cây dầu cổ thụ sống trên cạn và hoa sen, hoa súng sống dưới mặt hồ nước.",
    "activityTitle": "Hoạt động Khám phá: Quan sát và phân loại nơi sống của các loài thực vật tại Thắng cảnh Ao Bà Om",
    "teacherAct": "GV chiếu ảnh toàn cảnh Thắng cảnh Ao Bà Om, hướng dẫn HS quan sát cây sao, cây dầu cổ thụ (rễ trồi trên cạn) và hoa sen, hoa súng (nở dưới mặt nước).",
    "studentAct": "HS điền vào phiếu học tập tên thực vật sống trên cạn và dưới nước ở Ao Bà Om; chia sẻ kết quả cùng bạn."
  },
  {
    "id": "gddp_tv_29",
    "grade": 2,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      19,
      20
    ],
    "lessonTitle": "Bài 18: Cần làm gì để bảo vệ môi trường sống của thực vật và động vật?",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om (Trang 16 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Thắng cảnh Ao Bà Om - Trang 16): Bảo vệ môi trường sinh thái Ao Bà Om và vùng ven biển Trà Vinh (không vứt rác xuống hồ, không bẻ cành cây cổ thụ, không săn bắt chim chóc).",
    "activityTitle": "Hoạt động Vận dụng: Xây dựng thông điệp Chung tay giữ sạch mặt nước và hàng cây cổ thụ Ao Bà Om",
    "teacherAct": "GV nêu tình huống du khách đi tham quan Ao Bà Om vứt túi ni-lông xuống hồ và trèo lên rễ cây cổ thụ. Hướng dẫn HS thảo luận cách xử lý.",
    "studentAct": "HS thảo luận đề xuất việc làm đúng: Bỏ rác đúng nơi quy định, nhắc nhở người thân cùng giữ gìn cảnh quan Ao Bà Om sạch đẹp."
  },
  {
    "id": "gddp_tv_30",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      20
    ],
    "lessonTitle": "Bài 3: Họa mi hót",
    "topic": "Chủ đề 1 GDĐP 2: Trà Vinh quê hương em (Trang 5 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1: Trà Vinh quê hương em - Trang 5): Cảm nhận vẻ đẹp thiên nhiên mùa xuân tươi sáng, vườn cây ăn trái sum sê và tiếng chim muông ríu rít tại các miệt vườn sinh thái Trà Vinh.",
    "activityTitle": "Hoạt động Khám phá & Luyện đọc: Liên hệ tiếng hót chim họa mi với cảnh sắc vườn cây trái quê hương Trà Vinh",
    "teacherAct": "Sau khi luyện đọc bài Họa mi hót, GV chiếu hình ảnh những vườn chôm chôm, nhãn sum sê trĩu quả rộn ràng tiếng chim ở cù lao Trà Vinh.",
    "studentAct": "HS chia sẻ cảm nhận về vẻ đẹp thanh bình, trù phú của vườn cây trái quê hương Trà Vinh vào mùa xuân."
  },
  {
    "id": "gddp_tv_31",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      31
    ],
    "lessonTitle": "Bài 24: Chiếc rễ đa tròn",
    "topic": "Chủ đề 6 GDĐP 2: Giáo sư Phạm Văn Bạch (Trang 33 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 6: Giáo sư Phạm Văn Bạch - Trang 33): Tìm hiểu danh nhân quê hương Trà Vinh: Giáo sư Phạm Văn Bạch - Nhà trí thức cách mạng lớn, Chánh án TAND tối cao đầu tiên; tấm gương hiếu học suốt đời vì dân vì nước.",
    "activityTitle": "Hoạt động Luyện tập: Mở rộng vốn từ về người tốt việc tốt và viết câu bày tỏ lòng kính trọng danh nhân Trà Vinh",
    "teacherAct": "GV giới thiệu chân dung và cuộc đời Giáo sư Phạm Văn Bạch gắn với truyền thống hiếu học quê hương Trà Vinh.",
    "studentAct": "HS tìm các từ ngữ chỉ phẩm chất đáng quý (chăm học, tài năng, yêu nước, trung thực, khiêm tốn); viết 1-2 câu noi gương danh nhân."
  },
  {
    "id": "gddp_tv_32",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      32
    ],
    "lessonTitle": "Bài 26: Trên các miền đất nước",
    "topic": "Chủ đề 7 GDĐP 2: Đặc sản quê em (Trang 38 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Đặc sản quê em - Trang 38): Mở rộng vốn từ về sản phẩm truyền thống; viết đoạn văn giới thiệu món đặc sản Bánh tét Trà Cuôn Trà Vinh thơm ngon nức tiếng.",
    "activityTitle": "Hoạt động Luyện viết đoạn: Viết đoạn văn (từ 3 đến 4 câu) giới thiệu món bánh đặc sản quê hương em",
    "teacherAct": "GV chiếu video nghệ nhân làng nghề Trà Cuôn gói bánh tét, hướng dẫn HS dàn ý viết đoạn văn giới thiệu đặc sản quê mình.",
    "studentAct": "HS thực hành viết đoạn văn 3-4 câu miêu tả màu sắc, nguyên liệu và hương vị đậm đà của đòn bánh tét Trà Cuôn."
  },
  {
    "id": "gddp_tv_33",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      33
    ],
    "lessonTitle": "Bài 28: Khám phá đáy biển ở Trường Sa",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om (Trang 16 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Thắng cảnh Ao Bà Om - Trang 16): Viết đoạn văn ngắn kể về trải nghiệm tham quan, ngắm cảnh Thắng cảnh Ao Bà Om cùng gia đình hoặc bạn bè.",
    "activityTitle": "Hoạt động Luyện viết đoạn: Viết đoạn văn (3 - 4 câu) kể về một chuyến đi tham quan Thắng cảnh Ao Bà Om",
    "teacherAct": "GV gợi ý: Em đi Ao Bà Om khi nào? Đi cùng ai? Cảnh sắc ở đó có gì làm em thích thú nhất? Cảm xúc sau chuyến đi?",
    "studentAct": "HS viết bài vào vở, đổi bài cho bạn góp ý và tự tin đọc bài trước lớp."
  },
  {
    "id": "gddp_tv_34",
    "grade": 2,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      34
    ],
    "lessonTitle": "Bài 30: Cánh đồng quê em",
    "topic": "Chủ đề 1 GDĐP 2: Trà Vinh quê hương em (Trang 5) & Chủ đề 4: Lễ hội Óc-om-bóc (Trang 21 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 & 4 - Trang 5, 21): Nói về vẻ đẹp thanh bình của cánh đồng lúa, dòng sông quê hương và không khí ngày hội Óc-om-bóc náo nức trên quê hương Trà Vinh.",
    "activityTitle": "Hoạt động Luyện nói: Nói từ 2 đến 3 câu giới thiệu cảnh đẹp hoặc một ngày hội rộn ràng của quê hương em",
    "teacherAct": "GV gợi mở: Quê hương Trà Vinh có những cảnh đẹp và ngày hội nào làm em nhớ nhất? Hướng dẫn HS luyện nói theo cặp.",
    "studentAct": "HS luyện nói theo cặp: Kể cho bạn nghe về cánh đồng lúa xanh mướt hoặc cảnh đoàn người rộn ràng cổ vũ đua ghe Ngo."
  },
  {
    "id": "gddp_tv_35",
    "grade": 2,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      1,
      2
    ],
    "lessonTitle": "Bài 1: Vẻ đẹp quê hương em",
    "topic": "Chủ đề 1 GDĐP 2: Trà Vinh quê hương em (Trang 5) & Chủ đề 3: Thắng cảnh Ao Bà Om (Trang 16 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 & 3 - Trang 5, 16): Nhận biết và yêu mến các danh thắng tiêu biểu của Trà Vinh: Thắng cảnh Ao Bà Om, Chùa Âng cổ kính, bờ biển Ba Động, những hàng cây sao cổ thụ rợp mát.",
    "activityTitle": "Hoạt động Khám phá & Luyện tập: Nhận diện cảnh đẹp quê hương và bày tỏ cảm xúc tự hào về mảnh đất Trà Vinh",
    "teacherAct": "GV tổ chức trò chơi Nhìn hình đoán địa danh: Chiếu ảnh Ao Bà Om, Chùa Âng, biển Ba Động để HS đoán tên và chia sẻ cảm nghĩ.",
    "studentAct": "HS quan sát tranh, hào hứng gọi tên địa danh quê mình và bày tỏ tình yêu tha thiết với quê hương Trà Vinh."
  },
  {
    "id": "gddp_tv_36",
    "grade": 2,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      8,
      9
    ],
    "lessonTitle": "Bài 4: Yêu quý bạn bè",
    "topic": "Chủ đề 2 GDĐP 2: Truyền thống đoàn kết các dân tộc ở tỉnh Trà Vinh (Trang 11 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 2: Truyền thống đoàn kết các dân tộc Trà Vinh - Trang 11): Giáo dục truyền thống đoàn kết keo sơn giữa 3 dân tộc anh em Kinh - Khmer - Hoa cùng sinh sống chan hòa; học sinh biết yêu thương, tôn trọng phong tục, giúp đỡ bạn bè cùng tiến bộ.",
    "activityTitle": "Hoạt động Khám phá & Vận dụng: Xây dựng tình bạn thân ái, chan hòa giữa các bạn học sinh các dân tộc trong lớp",
    "teacherAct": "GV chiếu ảnh học sinh người Kinh, Khmer, Hoa nắm tay nhau múa hát dưới sân trường; giáo dục tình đoàn kết gắn bó.",
    "studentAct": "HS chia sẻ: Kể về bạn thân của em trong lớp; thực hành bắt tay, nói lời thân ái và giúp đỡ bạn cùng tiến bộ."
  },
  {
    "id": "gddp_tv_38",
    "grade": 2,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      33
    ],
    "lessonTitle": "Bài 15: Em tuân thủ quy định nơi công cộng",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om (Trang 16) & Chủ đề 5: Di tích nhà cổ Cầu Kè (Trang 27 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3 & 5 - Trang 16, 27): Thực hiện nếp sống văn minh khi tham quan danh thắng và di tích: Không vứt rác bừa bãi, không leo trèo bẻ cành cây cổ thụ, không viết vẽ bậy lên tường, cột gỗ di tích cổ.",
    "activityTitle": "Hoạt động Luyện tập & Vận dụng: Xử lý tình huống giữ gìn của công và bảo vệ cảnh quan di tích quê hương Trà Vinh",
    "teacherAct": "GV đưa ra tình huống một bạn nhỏ lấy phấn viết tên mình lên thân cây cổ thụ Ao Bà Om và tường Nhà cổ Cầu Kè. Hướng dẫn HS nhận xét.",
    "studentAct": "HS thảo luận nhóm: Nhận xét hành vi sai và đưa ra lời khuyên ngăn đúng đắn; cam kết giữ gìn di tích sạch đẹp."
  },
  {
    "id": "gddp_tv_39",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      9
    ],
    "lessonTitle": "Có bạn thật vui",
    "topic": "Chủ đề 2 GDĐP 2: Truyền thống đoàn kết các dân tộc Trà Vinh (Trang 11 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 2: Truyền thống đoàn kết các dân tộc Trà Vinh - Trang 11): Thực hành giao lưu bạn bè các dân tộc Kinh - Khmer - Hoa: Trao nhau nụ cười thân thiện, học lời chào mừng lễ phép, cùng tham gia các trò chơi dân gian đoàn kết.",
    "activityTitle": "Hoạt động Trải nghiệm giao tiếp: Trò chơi Vòng tay bè bạn - Học câu chào thân thiện giữa các dân tộc",
    "teacherAct": "GV hướng dẫn HS học câu chào hỏi giao tiếp đơn giản bằng tiếng Khmer (Chum reap sour - Chào bạn, Or kun - Cảm ơn).",
    "studentAct": "HS thực hành sắm vai kết bạn, bắt tay, nói lời cảm ơn và khen ngợi bạn bè chan hòa, vui vẻ."
  },
  {
    "id": "gddp_tv_40",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      18
    ],
    "lessonTitle": "Người trong một nhà",
    "topic": "Chủ đề 8 GDĐP 2: Biết ơn tổ tiên, ông bà, cha mẹ (Trang 45 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 8: Biết ơn tổ tiên, ông bà, cha mẹ - Trang 45): Thực hành làm thiệp chúc mừng năm mới hoặc món quà nhỏ ý nghĩa bày tỏ lòng biết ơn sâu sắc đối với ông bà, cha mẹ nhân dịp Tết đến xuân về.",
    "activityTitle": "Hoạt động Thực hành sáng tạo: Tự làm tấm thiệp Con yêu gia đình gửi gắm lời chúc hiếu thảo",
    "teacherAct": "GV chuẩn bị giấy màu, kéo thủ công, bút sáp hướng dẫn HS gấp thiệp mừng năm mới và viết lời chúc yêu thương.",
    "studentAct": "HS nắn nót viết lời chúc: Kính chúc ông bà sống lâu trăm tuổi, con hứa sẽ luôn chăm ngoan; mang thiệp về tặng người thân."
  },
  {
    "id": "gddp_tv_41",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      28
    ],
    "lessonTitle": "Cảnh đẹp quê em",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om (Trang 16) & Chủ đề 5: Di tích nhà cổ Cầu Kè (Trang 27 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3 & 5 - Trang 16, 27): Sưu tầm tranh ảnh, giới thiệu về danh lam thắng cảnh Ao Bà Om và di tích kiến trúc độc đáo Nhà cổ Huỳnh Kỳ (Cầu Kè) của tỉnh Trà Vinh.",
    "activityTitle": "Hoạt động Trưng bày & Thuyết trình: Triển lãm ảnh Trà Vinh trong mắt em - Giới thiệu di tích, cảnh đẹp",
    "teacherAct": "GV tổ chức các nhóm dán tranh ảnh sưu tầm lên bảng và phân công thuyết trình về địa danh quê hương.",
    "studentAct": "Đại diện mỗi tổ đóng vai Hướng dẫn viên du lịch nhí tự tin giới thiệu với cả lớp về vẻ đẹp thắng cảnh Ao Bà Om và nhà cổ Cầu Kè."
  },
  {
    "id": "gddp_tv_42",
    "grade": 2,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      29
    ],
    "lessonTitle": "Bảo vệ cảnh quan quê em",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om (Trang 16 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Thắng cảnh Ao Bà Om - Trang 16): Hành động cụ thể giữ gìn cảnh quan thiên nhiên: Tham gia phong trào làm sạch đẹp trường lớp, nhặt rác bảo vệ bồn hoa, bảo vệ cảnh quan Ao Bà Om xanh - sạch - đẹp.",
    "activityTitle": "Hoạt động Hành động vì cộng đồng: Kế hoạch Một giờ làm sạch đẹp quê hương - Nói không với rác thải nhựa",
    "teacherAct": "GV phát động phong trào Ngày thứ Sáu xanh, phân công các nhóm dọn dẹp vệ sinh khuôn viên trường lớp.",
    "studentAct": "HS hào hứng lao động tự giác; cam kết không vứt rác ra đường phố, ao hồ khi đi tham quan cùng gia đình."
  },
  {
    "id": "gddp_tv_43",
    "grade": 2,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      15,
      16
    ],
    "lessonTitle": "Chủ đề 6: Sắc màu thiên nhiên",
    "topic": "Chủ đề 3 GDĐP 2: Thắng cảnh Ao Bà Om (Trang 16 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Thắng cảnh Ao Bà Om - Trang 16): Quan sát vẻ đẹp thiên nhiên Thắng cảnh Ao Bà Om (hồ nước tĩnh lặng, hoa sen khoe sắc, bóng mát hàng cây cổ thụ xanh mát) để thực hành vẽ tranh hoặc xé dán tranh phong cảnh quê hương.",
    "activityTitle": "Hoạt động Thực hành sáng tạo: Vẽ hoặc xé dán bức tranh cảnh đẹp Thắng cảnh Ao Bà Om Trà Vinh",
    "teacherAct": "GV chiếu bộ ảnh phong cảnh Ao Bà Om mùa trổ hoa sen và hàng cây cổ thụ soi bóng lung linh, hướng dẫn HS phối màu.",
    "studentAct": "HS dùng bút màu sáp hoặc giấy màu xé dán bức tranh phong cảnh theo trí tưởng tượng phong phú; trưng bày góc lớp."
  },
  {
    "id": "gddp_tv_44",
    "grade": 2,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      32,
      33
    ],
    "lessonTitle": "Chủ đề 10: Đồ chơi từ tạo hình con vật",
    "topic": "Chủ đề 4 GDĐP 2: Lễ hội Óc-om-bóc (Trang 21 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 4: Lễ hội Óc-om-bóc - Trang 21): Tìm hiểu hình ảnh chiếc ghe Ngo rực rỡ sắc màu trang trí hoa văn rồng rắn truyền thống tham gia ngày hội đua ghe Ngo trên sông Long Bình trong dịp Lễ hội Óc-om-bóc.",
    "activityTitle": "Hoạt động Cảm nhận & Sáng tạo: Tạo dáng mô hình chiếc ghe Ngo thu nhỏ từ đất nặn hoặc giấy bìa",
    "teacherAct": "GV hướng dẫn cách tạo dáng chiếc thuyền thuôn dài, đầu vút nhọn và vẽ họa tiết hoa văn sặc sỡ mô phỏng chiếc ghe Ngo.",
    "studentAct": "HS khéo léo dùng đất nặn phối hợp màu sắc tươi sáng tạo hình chiếc ghe Ngo nhỏ xinh, tham gia triển lãm sản phẩm."
  },
  {
    "id": "gddp_tv_45",
    "grade": 2,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      8
    ],
    "lessonTitle": "Tiết 8 - Luyện tập và biểu diễn",
    "topic": "Chủ đề 4 GDĐP 2: Lễ hội Óc-om-bóc (Trang 21 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 4: Lễ hội Óc-om-bóc - Trang 21): Cảm nhận nét đẹp giai điệu múa Rom-vong, Lâm-thôn rộn ràng của đồng bào Khmer Trà Vinh trong những đêm hội trăng rằm Óc-om-bóc; kết hợp vận động cơ thể vui tươi, nhịp nhàng.",
    "activityTitle": "Hoạt động Luyện tập & Vận động: Biểu diễn bài hát dân ca kết hợp động tác múa Lâm-thôn nhịp nhàng",
    "teacherAct": "GV hướng dẫn các động tác cuộn bàn tay, nhún chân nhịp nhàng theo bước múa Lâm-thôn truyền thống.",
    "studentAct": "HS hát bài hát dân ca kết hợp gõ thanh phách hoặc làm động tác múa vòng tròn vui vẻ, rộn rã."
  },
  {
    "id": "gddp_tv_46",
    "grade": 2,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      24
    ],
    "lessonTitle": "Thường thức âm nhạc: Giới thiệu nhạc cụ",
    "topic": "Chủ đề 4 GDĐP 2: Lễ hội Óc-om-bóc (Trang 21 - QĐ 2727/QĐ-BGDĐT)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 4: Lễ hội Óc-om-bóc - Trang 21): Lắng nghe và nhận diện âm thanh độc đáo, rộn rã của tiếng trống Sa-dăm và dàn nhạc Ngũ âm trong ngày hội Óc-om-bóc và các lễ hội truyền thống tỉnh Trà Vinh.",
    "activityTitle": "Hoạt động Thường thức âm nhạc: Lắng nghe, nhận biết âm sắc trống Sa-dăm và nhạc cụ dân tộc Trà Vinh",
    "teacherAct": "GV mở trích đoạn âm thanh tiếng trống Sa-dăm bập bùng và giai điệu dàn nhạc Ngũ âm tưng bừng ngày hội.",
    "studentAct": "HS lắng nghe, đoán tên nhạc cụ qua âm sắc đặc trưng và làm động tác mô phỏng gõ trống, đánh đàn theo nhịp."
  },
  {
    "id": "gddp_tv_50",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      10,
      11
    ],
    "lessonTitle": "BÀI 9: HOẠT ĐỘNG SẢN XUẤT NÔNG NGHIỆP",
    "topic": "Chủ đề 1 GDĐP 3: Các huyện, thị xã, thành phố của tỉnh Trà Vinh (Trang 5 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1: Các huyện, thị xã, thành phố của tỉnh Trà Vinh): Kể tên và nêu được một số hoạt động sản xuất nông nghiệp, trồng trọt và nuôi trồng thuỷ sản tiêu biểu tại các huyện thuộc tỉnh Trà Vinh (trồng lúa ở Càng Long, Cầu Kè; trồng dừa ở Châu Thành, Tiểu Cần; nuôi tôm, cua ở Cầu Ngang, Duyên Hải).",
    "activityTitle": "Hoạt động Khám phá & Vận dụng: Tìm hiểu các hoạt động sản xuất nông nghiệp và nuôi trồng thuỷ hải sản tiêu biểu tại các huyện của tỉnh Trà Vinh.",
    "teacherAct": "GV trình chiếu bản đồ hành chính tỉnh Trà Vinh và hình ảnh sản xuất nông nghiệp: cánh đồng lúa Càng Long, vườn cây ăn trái Cầu Kè, vùng nuôi tôm công nghiệp Duyên Hải, Cù lao Long Hòa. Đặt câu hỏi: Em hãy kể tên các sản phẩm nông sản, thuỷ hải sản nổi tiếng ở quê hương em hoặc huyện lân cận? Giáo dục học sinh trân trọng công sức của người nông dân Trà Vinh.",
    "studentAct": "HS quan sát hình ảnh, thảo luận nhóm đôi và chia sẻ: Quê em trồng lúa, trồng dừa, nuôi tôm sú, cua biển; các bạn ở Cầu Kè có bưởi da xanh, chôm chôm; ở Càng Long có cánh đồng lúa trĩu hạt."
  },
  {
    "id": "gddp_tv_51",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      12
    ],
    "lessonTitle": "BÀI 10: HOẠT ĐỘNG SẢN XUẤT THỦ CÔNG VÀ CÔNG NGHIỆP",
    "topic": "Chủ đề 7 GDĐP 3: Những làng nghề ở Trà Vinh (Trang 35 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Những làng nghề ở Trà Vinh): Nhận biết một số làng nghề sản xuất thủ công truyền thống nổi tiếng của tỉnh Trà Vinh: làng dệt chiếu Cà Hom (xã Hàm Tân, Trà Cú), làng bánh tét Trà Cuôn (xã Kim Hoà, Cầu Ngang), nghề đan đát mây tre; nêu được ý nghĩa kinh tế và văn hoá của làng nghề truyền thống.",
    "activityTitle": "Hoạt động Khám phá: Khám phá các làng nghề thủ công truyền thống độc đáo của quê hương Trà Vinh.",
    "teacherAct": "GV chiếu video/hình ảnh nghệ nhân dệt chiếu Cà Hom với hoa văn tinh xảo và cảnh gói bánh tét Trà Cuôn thơm dẻo ngày Tết. Hướng dẫn HS nhận biết nguyên liệu làm ra sản phẩm (lác, bố, gạo nếp, đậu xanh, thịt mỡ, lá chuối). Đặt câu hỏi: Những làng nghề này mang lại lợi ích gì cho người dân quê mình?",
    "studentAct": "HS chú ý xem tranh, trả lời: Làng nghề tạo việc làm cho bà con, tạo ra chiếc chiếu Cà Hom bền đẹp và đòn bánh tét Trà Cuôn nức tiếng xa gần; em thấy rất tự hào về sự khéo tay của người Trà Vinh."
  },
  {
    "id": "gddp_tv_52",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      13
    ],
    "lessonTitle": "BÀI 11: DI TÍCH LỊCH SỬ – VĂN HOÁ VÀ CẢNH QUAN THIÊN NHIÊN",
    "topic": "Chủ đề 5 GDĐP 3: Khu di tích Ao Bà Om (Trang 26 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 5: Khu di tích Ao Bà Om): Nhận biết thắng cảnh Khu di tích Ao Bà Om (Phường 8, thành phố Trà Vinh) là di tích lịch sử - văn hoá cấp quốc gia gắn với Chùa Âng cổ kính; nêu được ý thức giữ gìn, bảo vệ cảnh quan thiên nhiên và môi trường di tích xanh - sạch - đẹp.",
    "activityTitle": "Hoạt động Khám phá & Luyện tập: Tìm hiểu cảnh quan và di tích lịch sử Ao Bà Om - viên ngọc xanh giữa lòng thành phố Trà Vinh.",
    "teacherAct": "GV trình chiếu hình ảnh mặt nước phẳng lặng của Ao Bà Om, những gốc cây sao, dầu cổ thụ hàng trăm năm tuổi có bộ rễ trồi lên mặt đất hình thù kỳ thú, cùng ngôi Chùa Âng lộng lẫy bên cạnh. Hướng dẫn HS tìm hiểu nguồn gốc tên gọi và ý nghĩa lịch sử. Nhắc nhở HS không leo trèo làm gãy cành cây cổ thụ, không vứt rác xuống ao.",
    "studentAct": "HS quan sát, thảo luận nhóm và phát biểu: Ao Bà Om có nhiều cây cổ thụ to lớn che bóng mát, nước ao trong xanh; khi đến thăm em sẽ giữ gìn vệ sinh, bỏ rác đúng nơi quy định để bảo vệ di tích quê hương."
  },
  {
    "id": "gddp_tv_53",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      14
    ],
    "lessonTitle": "BÀI 12: ÔN TẬP CHỦ ĐỀ CỘNG ĐỒNG ĐỊA PHƯƠNG",
    "topic": "Chủ đề 1 GDĐP 3: Các huyện, thị xã, thành phố của tỉnh Trà Vinh & Chủ đề 5: Khu di tích Ao Bà Om",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 & 5 GDĐP 3): Hệ thống hoá được tên gọi các đơn vị hành chính (7 huyện, 1 thị xã, 1 thành phố) và các di tích, cảnh quan tiêu biểu của tỉnh Trà Vinh; thể hiện tình yêu quê hương qua lời giới thiệu, tranh vẽ.",
    "activityTitle": "Hoạt động Ôn tập & Triển lãm: Em yêu quê hương Trà Vinh giàu đẹp, nghĩa tình.",
    "teacherAct": "GV tổ chức trò chơi 'Đố vui địa danh Trà Vinh': đố tên các huyện, thị xã, thành phố và các di tích danh thắng (Ao Bà Om, Chùa Hang, Biển Ba Động, Đền thờ Bác Hồ). Nhận xét, tổng kết và khơi gợi niềm tự hào của HS về quê hương Trà Vinh.",
    "studentAct": "HS hào hứng tham gia trả lời các câu đố, thi đua giới thiệu về huyện/thành phố nơi mình đang sống và học tập."
  },
  {
    "id": "gddp_tv_54",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      20
    ],
    "lessonTitle": "BÀI 16: SỬ DỤNG HỢP LÍ THỰC VẬT VÀ ĐỘNG VẬT",
    "topic": "Chủ đề 3 GDĐP 3: Khu du lịch biển Ba Động (Trang 16 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Khu du lịch biển Ba Động): Nêu được vai trò của rừng phi lao phòng hộ ven biển Ba Động (thị xã Duyên Hải) và các loài sinh vật biển đối với đời sống con người; có hành động thiết thực bảo vệ cây xanh và sinh vật biển địa phương.",
    "activityTitle": "Hoạt động Vận dụng: Sử dụng hợp lí và bảo vệ nguồn lợi sinh vật biển, rừng phi lao Ba Động Trà Vinh.",
    "teacherAct": "GV giới thiệu hình ảnh dải rừng phi lao ngút ngàn chắn gió bão cát ven biển Ba Động và các loài hải sản phong phú (nghêu, tôm, cua biển). Đặt câu hỏi: Hàng phi lao và nguồn hải sản có ích lợi gì? Em cần làm gì để bảo vệ các loài thực vật, động vật nơi đây?",
    "studentAct": "HS thảo luận và nêu ý kiến: Rừng phi lao chắn cát bay, chắn gió bão bảo vệ nhà cửa xóm làng ven biển; tôm cá mang lại thức ăn và nguồn thu nhập cho ngư dân; chúng em không bẻ cành cây phi lao và không bắt các loài sinh vật biển non."
  },
  {
    "id": "gddp_tv_55",
    "grade": 3,
    "subjectKey": "tnxh",
    "subjectName": "Tự nhiên và Xã hội",
    "weeks": [
      30
    ],
    "lessonTitle": "BÀI 27: TRÁI ĐẤT VÀ CÁC ĐỚI KHÍ HẬU",
    "topic": "Chủ đề 1 GDĐP 3: Các huyện, thị xã, thành phố của tỉnh Trà Vinh (Trang 8 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 GDĐP 3): Nhận biết tỉnh Trà Vinh thuộc đới khí hậu nhiệt đới gió mùa ven biển với hai mùa mưa và mùa khô rõ rệt; liên hệ sự thích nghi của con người trong lao động sản xuất và bảo vệ sức khoẻ.",
    "activityTitle": "Hoạt động Liên hệ thực tế: Tìm hiểu đặc điểm hai mùa mưa - khô của vùng đất Trà Vinh.",
    "teacherAct": "GV hướng dẫn HS liên hệ đặc điểm thời tiết địa phương: mùa khô từ tháng 11 đến tháng 4 năm sau nắng nhiều, gió mát; mùa mưa từ tháng 5 đến tháng 10. Hướng dẫn cách phòng tránh say nắng trong mùa khô và che mưa, phòng ngừa dịch bệnh trong mùa mưa.",
    "studentAct": "HS liên hệ thực tế cuộc sống ở gia đình: Mùa khô ba mẹ phơi lúa, tưới rau; mùa mưa thì chuẩn bị nước ngọt canh tác; khi đi học mùa nắng em đội mũ nón, mùa mưa em đem theo áo mưa."
  },
  {
    "id": "gddp_tv_56",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      5
    ],
    "lessonTitle": "BÀI 9: ĐI HỌC VUI SAO - TIẾT 1, 2: Đọc - Đi học vui sao; Nói và nghe - Tới lớp, tới trường",
    "topic": "Chủ đề 2 GDĐP 3: Ấm áp tình người Trà Vinh (Trang 11 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 2: Ấm áp tình người Trà Vinh): Rèn kĩ năng nói và nghe; kể được những việc làm ấm áp, sẻ chia giúp đỡ bạn bè cùng tiến bộ, thăm hỏi người già neo đơn, giúp đỡ gia đình chính sách tại quê hương Trà Vinh.",
    "activityTitle": "Nói và nghe: Kể về những việc làm chan chứa tình người, giúp đỡ bạn bè và mọi người xung quanh.",
    "teacherAct": "GV gợi ý cho HS nhớ lại những phong trào ý nghĩa ở trường như 'Đôi bạn cùng tiến', 'Kế hoạch nhỏ', tặng tập vở cho bạn có hoàn cảnh khó khăn ở vùng sâu Trà Vinh. Khuyến khích HS tự tin chia sẻ trước lớp.",
    "studentAct": "HS nối tiếp nhau kể: Em cùng các bạn gom sách vở cũ tặng bạn nghèo ở điểm trường lẻ; em giúp bạn học bài; em chào hỏi và giúp đỡ bà con lối xóm. Lớp học tràn ngập niềm vui và tình thương yêu."
  },
  {
    "id": "gddp_tv_57",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      15
    ],
    "lessonTitle": "BÀI 28: CON ĐƯỜNG CỦA BÉ - Tiết 3: Luyện tập - Mở rộng vốn từ về nghề nghiệp. Câu hỏi",
    "topic": "Chủ đề 7 GDĐP 3: Những làng nghề ở Trà Vinh (Trang 35 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Những làng nghề ở Trà Vinh): Mở rộng vốn từ ngữ về nghề thủ công truyền thống ở địa phương Trà Vinh (nghệ nhân dệt chiếu Cà Hom, thợ gói bánh tét Trà Cuôn, thợ đan lát mây tre); biết đặt câu hỏi về công việc của người lao động ở quê hương.",
    "activityTitle": "Luyện từ và câu: Mở rộng vốn từ về nghề truyền thống quê hương Trà Vinh.",
    "teacherAct": "GV đưa tranh ảnh nghệ nhân Trà Cú đang thoăn thoắt dệt chiếu hoa Cà Hom và nghệ nhân Cầu Ngang gói đòn bánh tét Trà Cuôn. Hướng dẫn HS tìm các từ chỉ nghề nghiệp, dụng cụ (nghệ nhân, thợ dệt, khung dệt, sợi lác, nếp, lá chuối) và đặt câu hỏi tìm hiểu về nghề.",
    "studentAct": "HS tìm từ và đặt câu: 'Nghệ nhân dệt chiếu Cà Hom làm việc như thế nào?', 'Bác thợ đã dệt nên những chiếc chiếu hoa thật rực rỡ.'. HS thể hiện sự kính trọng người thợ thủ công."
  },
  {
    "id": "gddp_tv_58",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      16
    ],
    "lessonTitle": "BÀI 30: NHỮNG NGỌN HẢI ĐĂNG - Tiết 1, 2: Đọc - Những ngọn hải đăng; Viết - Ôn chữ hoa M, N",
    "topic": "Chủ đề 3 GDĐP 3: Khu du lịch biển Ba Động (Trang 16 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Khu du lịch biển Ba Động): Bồi dưỡng tình yêu quê hương đất nước qua hình ảnh ngọn hải đăng, bờ biển Ba Động và các công trình ven biển của thị xã Duyên Hải; cảm phục sự cống hiến thầm lặng của các chiến sĩ và người canh đèn biển.",
    "activityTitle": "Khám phá & Liên hệ: Biển Ba Động và ngọn hải đăng soi sáng dẫn lối tàu thuyền Trà Vinh.",
    "teacherAct": "Sau khi HS đọc bài văn, GV chiếu hình ảnh ngọn hải đăng Ba Động (Duyên Hải, Trà Vinh) vươn cao bên bờ sóng vỗ. Giới thiệu vai trò của hải đăng chỉ đường cho ngư dân vươn khơi bám biển đánh bắt thuỷ hải sản. Khơi dậy lòng tự hào về biển quê hương.",
    "studentAct": "HS lắng nghe, quan sát tranh ảnh và hào hứng phát biểu: Ngọn hải đăng Ba Động như con mắt thần soi đường trong đêm tối giúp tàu thuyền của bà con Trà Vinh về bến an toàn."
  },
  {
    "id": "gddp_tv_59",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      28
    ],
    "lessonTitle": "Bài 17: ĐẤT NƯỚC LÀ GÌ? - Tiết 2: Đọc hiểu câu 3, 4 - Luyện đọc lại - Nói và nghe: Cảnh đẹp đất nước",
    "topic": "Chủ đề 3 GDĐP 3: Khu du lịch biển Ba Động & Chủ đề 5: Khu di tích Ao Bà Om",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3 & 5 GDĐP 3): Giới thiệu được những nét đặc sắc về danh lam thắng cảnh tiêu biểu của tỉnh Trà Vinh (Ao Bà Om, biển Ba Động); thể hiện cảm xúc tự hào, yêu quý cảnh đẹp quê hương.",
    "activityTitle": "Nói và nghe: Giới thiệu cảnh đẹp quê hương em - Ao Bà Om và Biển Ba Động Trà Vinh.",
    "teacherAct": "GV chia lớp thành các nhóm, phát tranh ảnh về thắng cảnh Ao Bà Om rợp bóng cây cổ thụ và bãi biển Ba Động lộng gió. Gợi ý HS nói về: Tên cảnh đẹp, vị trí, vẻ đẹp nổi bật và tình cảm của em đối với nơi đó.",
    "studentAct": "Đại diện nhóm tự tin đứng trước lớp giới thiệu: 'Quê em ở Trà Vinh có Ao Bà Om rất đẹp, hồ nước trong xanh, cây sao cổ thụ rễ ngoằn ngoèo như đàn trăn... Em rất yêu và tự hào về quê hương em.'."
  },
  {
    "id": "gddp_tv_60",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      28
    ],
    "lessonTitle": "Bài 18: NÚI QUÊ TÔI - Tiết 4: Luyện tập - Viết đoạn văn nêu tình cảm, cảm xúc về một cảnh đẹp của đất nước",
    "topic": "Chủ đề 5 GDĐP 3: Khu di tích Ao Bà Om (Trang 26 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 5: Khu di tích Ao Bà Om): Viết được đoạn văn (4-5 câu) nêu tình cảm, cảm xúc chân thành về cảnh sắc Khu di tích Ao Bà Om (mặt hồ phẳng lặng, hàng cây cổ thụ trăm tuổi, Chùa Âng cổ kính).",
    "activityTitle": "Luyện viết đoạn: Viết đoạn văn cảm xúc về thắng cảnh Ao Bà Om Trà Vinh.",
    "teacherAct": "GV hướng dẫn dàn ý gợi mở: Câu 1 giới thiệu Ao Bà Om; Câu 2-3 tả chi tiết ấn tượng (gốc cây cổ thụ rễ to uốn lượn, mặt nước biếc, tiếng chim hót); Câu 4-5 nêu cảm xúc, ước mong giữ gìn cảnh đẹp. Đọc mẫu một số đoạn văn hay.",
    "studentAct": "HS độc lập thực hành viết vào vở. Nhiều bài viết giàu cảm xúc: 'Ao Bà Om là danh lam thắng cảnh nổi tiếng của tỉnh Trà Vinh quê em... Em mong mọi người luôn giữ cho nơi đây xanh mát, thanh bình.'."
  },
  {
    "id": "gddp_tv_61",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      31
    ],
    "lessonTitle": "BÀI 24: CÙNG BÁC QUA SUỐI - Tiết 3: Luyện tập - Mở rộng vốn từ về lễ hội. Dấu ngoặc kép, dấu gạch ngang",
    "topic": "Chủ đề 4: Lễ hội Nghinh Ông & Chủ đề 8: Tết Chôl-Chnăm-Thmây ở Trà Vinh (Trang 21, 40 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 4 & 8 GDĐP 3): Tìm và sử dụng được các từ ngữ về lễ hội truyền thống Trà Vinh: Lễ hội Nghinh Ông (Cúng biển Mỹ Long - Cầu Ngang), Tết Chôl-Chnăm-Thmây (lễ đón năm mới của đồng bào Khmer), múa Sa-dăm, múa Rom-vong, đắp núi cát, đua ghe Ngo.",
    "activityTitle": "Luyện từ và câu: Mở rộng vốn từ về các lễ hội độc đáo trên quê hương Trà Vinh.",
    "teacherAct": "GV cho HS xem hình ảnh rực rỡ của lễ rước Nghinh Ông tại biển Mỹ Long và không khí tưng bừng đón Tết Chôl-Chnăm-Thmây tại các ngôi chùa Khmer Trà Vinh. Yêu cầu HS phân loại từ ngữ: Tên lễ hội, hoạt động trong lễ hội, cảm xúc khi tham gia.",
    "studentAct": "HS hào hứng thảo luận và tìm từ: 'Lễ hội Nghinh Ông', 'Tết Chôl-Chnăm-Thmây', 'đắp núi cát', 'múa Rom-vong', 'cầu an', 'náo nức'. HS đặt câu đúng cấu trúc với từ ngữ vừa tìm được."
  },
  {
    "id": "gddp_tv_62",
    "grade": 3,
    "subjectKey": "tieng_viet",
    "subjectName": "Tiếng Việt",
    "weeks": [
      34
    ],
    "lessonTitle": "BÀI 29: BÁC SĨ Y-ÉC-XANH - Tiết 1, 2: Đọc - Bác sĩ Y-éc-xanh; Nói và nghe - Người nổi tiếng",
    "topic": "Chủ đề 6 GDĐP 3: Nghệ sĩ nhân dân, soạn giả Viễn Châu (Trang 31 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 6: Nghệ sĩ nhân dân, soạn giả Viễn Châu): Nói và nghe về nhân vật nổi tiếng quê hương Trà Vinh: Nghệ sĩ nhân dân - Soạn giả Viễn Châu, người con ưu tú của vùng đất Đôn Châu (Duyên Hải, Trà Vinh), bậc thầy sáng tác vọng cổ tài hoa.",
    "activityTitle": "Nói và nghe: Kể về Soạn giả - NSND Viễn Châu, người con tài hoa của quê hương Trà Vinh.",
    "teacherAct": "GV giới thiệu chân dung NSND Viễn Châu (1924 - 2016), người sáng lập thể loại tân cổ giao duyên và vọng cổ hài, tác giả của hơn 2000 bài ca vọng cổ bất hủ. Kể cho HS nghe về tinh thần đam mê nghệ thuật và lao động sáng tạo bền bỉ của ông.",
    "studentAct": "HS lắng nghe một trích đoạn tân cổ giao duyên mượt mà; thảo luận nhóm và xung phong kể lại những hiểu biết của mình về bác Viễn Châu với lòng cảm phục sâu sắc đối với người nghệ sĩ tài hoa của tỉnh nhà."
  },
  {
    "id": "gddp_tv_63",
    "grade": 3,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      3,
      4,
      5
    ],
    "lessonTitle": "BÀI 2: TỰ HÀO TỔ QUỐC VIỆT NAM",
    "topic": "Chủ đề 1 GDĐP 3: Các huyện, thị xã, thành phố của tỉnh Trà Vinh & Chủ đề 5: Khu di tích Ao Bà Om",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 & 5 GDĐP 3): Tự hào về quê hương Trà Vinh - một phần máu thịt của Tổ quốc Việt Nam với 9 đơn vị hành chính trù phú; có ý thức tìm hiểu lịch sử, bảo tồn di tích văn hoá Ao Bà Om, Đền thờ Bác Hồ và đền ơn đáp nghĩa các thế hệ đi trước.",
    "activityTitle": "Khám phá & Luyện tập: Tự hào về vẻ đẹp và truyền thống lịch sử vẻ vang của quê hương Trà Vinh.",
    "teacherAct": "GV kết hợp giới thiệu hình ảnh Tổ quốc Việt Nam với bản đồ tỉnh Trà Vinh và Đền thờ Bác Hồ ở xã Long Đức, Khu di tích Ao Bà Om. Đặt câu hỏi: Là học sinh Trà Vinh, em cảm thấy tự hào về điều gì nhất ở quê hương mình? Cần làm gì để xứng đáng là con ngoan trò giỏi?",
    "studentAct": "HS thảo luận nhóm, bày tỏ niềm tự hào: Em tự hào vì Trà Vinh có Đền thờ Bác Hồ tôn nghiêm, có Ao Bà Om tuyệt đẹp và nhiều cánh đồng xanh tươi; em hứa sẽ chăm chỉ học tập để sau này xây dựng quê hương."
  },
  {
    "id": "gddp_tv_64",
    "grade": 3,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      6,
      7,
      8,
      9
    ],
    "lessonTitle": "BÀI 3: QUAN TÂM HÀNG XÓM LÁNG GIỀNG",
    "topic": "Chủ đề 2 GDĐP 3: Ấm áp tình người Trà Vinh (Trang 11 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 2: Ấm áp tình người Trà Vinh): Nhận biết nét đẹp đoàn kết, gắn bó nghĩa tình keo sơn giữa đồng bào các dân tộc Kinh - Khmer - Hoa ở Trà Vinh; thực hiện những hành vi quan tâm, kính trọng, giúp đỡ bà con lối xóm trong cuộc sống hằng ngày.",
    "activityTitle": "Xử lí tình huống & Vận dụng: Nét đẹp 'Tối lửa tắt đèn có nhau' - Ấm áp nghĩa tình xóm giềng Trà Vinh.",
    "teacherAct": "GV đưa ra các tình huống thực tế ở thôn xóm Trà Vinh: Nhà bác Hai hàng xóm phơi lúa bất chợt trời đổ mưa; gia đình cô Ba có người ốm; ngày lễ tết bà con xóm ấp chia nhau từng đòn bánh tét, bánh ít. Hướng dẫn HS cách ứng xử thân thiện, lễ phép và tương trợ.",
    "studentAct": "HS sôi nổi đóng vai xử lí tình huống: Chạy sang phụ bác gom lúa; chào hỏi lễ phép khi gặp người lớn tuổi trong xóm; mang đĩa bánh tét mẹ gói sang biếu ông bà hàng xóm chung vui."
  },
  {
    "id": "gddp_tv_65",
    "grade": 3,
    "subjectKey": "dao_duc",
    "subjectName": "Đạo đức",
    "weeks": [
      11,
      12,
      13
    ],
    "lessonTitle": "BÀI 4: HAM HỌC HỎI",
    "topic": "Chủ đề 6 GDĐP 3: Nghệ sĩ nhân dân, soạn giả Viễn Châu (Trang 31 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 6: Nghệ sĩ nhân dân, soạn giả Viễn Châu): Nêu được tấm gương tự học, niềm đam mê tìm tòi sáng tạo và tinh thần học hỏi không ngừng của NSND Viễn Châu để tạo nên những tác phẩm âm nhạc để đời; noi theo tinh thần ham học hỏi trong học tập.",
    "activityTitle": "Kể chuyện tấm gương: Tấm gương say mê tự học và sáng tạo nghệ thuật của NSND Viễn Châu.",
    "teacherAct": "GV kể câu chuyện về tuổi thơ của cậu bé Huỳnh Trí Bá (tên thật của NSND Viễn Châu) mê tiếng đờn tranh, tự mày mò học đờn, học chữ, gom nhặt từng vần thơ để sau này trở thành 'Vua vọng cổ'. Nhắc nhở HS tinh thần chủ động tìm hiểu kiến thức mới.",
    "studentAct": "HS chăm chú lắng nghe, rút ra bài học: Em học được ở bác Viễn Châu đức tính kiên trì, không nản chí khi gặp khó khăn, luôn ham thích học hỏi để đạt được ước mơ."
  },
  {
    "id": "gddp_tv_66",
    "grade": 3,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      5
    ],
    "lessonTitle": "BÀI 5: THỜI GIAN BIỂU CỦA EM - QUÝ TRỌNG THỜI GIAN",
    "topic": "Chủ đề 2 GDĐP 3: Ấm áp tình người Trà Vinh (Trang 11 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 2: Ấm áp tình người Trà Vinh): Biết sắp xếp thời gian biểu hợp lí để vừa học tốt vừa dành thời gian làm việc có ích thể hiện tình người: giúp đỡ cha mẹ, thăm hỏi ông bà, tham gia công tác thiện nguyện vì cộng đồng tại Trà Vinh.",
    "activityTitle": "Sinh hoạt lớp & Hoạt động giáo dục: Thời gian biểu yêu thương - Dành thời gian sẻ chia cùng mọi người.",
    "teacherAct": "GV hướng dẫn HS thiết kế bảng thời gian biểu một ngày, gợi ý dành khung giờ cuối tuần để làm những việc tốt: tưới cây giúp mẹ, đọc báo cho bà nghe, gom giấy vụn nuôi heo đất giúp bạn nghèo. Khích lệ tinh thần sống đẹp, sống có trách nhiệm của người con Trà Vinh.",
    "studentAct": "HS lập thời gian biểu của riêng mình, trang trí thật đẹp và trình bày trước tổ nhóm cam kết thực hiện đúng thời gian đã định."
  },
  {
    "id": "gddp_tv_67",
    "grade": 3,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      25
    ],
    "lessonTitle": "BÀI 25: TRUYỀN THỐNG QUÊ HƯƠNG EM – TỰ HÀO VỀ TRUYỀN THỐNG QUÊ HƯƠNG",
    "topic": "Chủ đề 7 GDĐP 3: Những làng nghề ở Trà Vinh & Chủ đề 4: Lễ hội Nghinh Ông",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7 & 4 GDĐP 3): Tìm hiểu và tự hào về các truyền thống tốt đẹp của quê hương Trà Vinh: truyền thống cần cù làm nên các làng nghề nổi tiếng (chiếu Cà Hom, bánh tét Trà Cuôn) và nét đẹp văn hoá lễ hội Nghinh Ông Mỹ Long.",
    "activityTitle": "Sinh hoạt dưới cờ & HĐGD theo chủ đề: Em yêu truyền thống làng nghề và lễ hội quê hương Trà Vinh.",
    "teacherAct": "GV phối hợp tổ chức buổi triển lãm thu nhỏ: trưng bày chiếu hoa Cà Hom, tranh ảnh đòn bánh tét Trà Cuôn và mô hình thuyền rồng rước Nghinh Ông. Mời HS kể tên những nét truyền thống nổi bật của quê hương.",
    "studentAct": "HS tham quan triển lãm, hào hứng chia sẻ cảm nghĩ: Em rất tự hào vì quê hương Trà Vinh có nhiều làng nghề lâu đời và lễ hội rộn ràng, em sẽ cố gắng gìn giữ truyền thống tốt đẹp đó."
  },
  {
    "id": "gddp_tv_68",
    "grade": 3,
    "subjectKey": "hdtn",
    "subjectName": "Hoạt động trải nghiệm",
    "weeks": [
      30
    ],
    "lessonTitle": "BÀI 30: MÔI TRƯỜNG KÊU CỨU - BẢNG THÔNG TIN MÔI TRƯỜNG",
    "topic": "Chủ đề 3 GDĐP 3: Khu du lịch biển Ba Động (Trang 16 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3: Khu du lịch biển Ba Động): Xây dựng bảng thông tin và áp phích tuyên truyền giữ gìn vệ sinh môi trường bờ biển Ba Động, không xả rác thải nhựa, bảo vệ rừng phòng hộ và cảnh quan thiên nhiên quê hương Trà Vinh.",
    "activityTitle": "Thực hành sáng tạo: Làm bảng thông tin nhí 'Chung tay giữ sạch bờ biển Ba Động quê em'.",
    "teacherAct": "GV chiếu phóng sự ngắn về tình trạng rác thải trôi dạt bờ biển và tầm quan trọng của việc bảo vệ bãi biển Ba Động trong lành thu hút khách du lịch. Chia nhóm HS làm bảng thông tin, vẽ tranh cổ động thông điệp môi trường.",
    "studentAct": "Các nhóm phối hợp vẽ tranh, dán khẩu hiệu: 'Hãy nhặt một cọng rác - Trả lại bãi biển Ba Động sạch trong', 'Không vứt túi ni lông xuống biển'. Từng nhóm lên thuyết trình bảng thông tin đầy tự tin."
  },
  {
    "id": "gddp_tv_69",
    "grade": 3,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      5,
      6
    ],
    "lessonTitle": "Bài 3: Sử dụng quạt điện",
    "topic": "Chủ đề 1 GDĐP 3: Các huyện, thị xã, thành phố của tỉnh Trà Vinh (Trang 8 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 1 GDĐP 3): Vận dụng kĩ năng sử dụng quạt điện đúng cách, an toàn và tiết kiệm điện năng phù hợp với điều kiện thời tiết mùa khô hanh nóng kéo dài ở tỉnh Trà Vinh; kết hợp mở cửa sổ đón gió mát tự nhiên.",
    "activityTitle": "Vận dụng: Sử dụng thiết bị điện an toàn, tiết kiệm điện năng trong mùa khô ở Trà Vinh.",
    "teacherAct": "GV liên hệ thời tiết mùa khô từ tháng 11 đến tháng 4 tại Trà Vinh với nền nhiệt khá cao. Nhắc nhở HS bật quạt số vừa phải, tắt quạt khi rời khỏi phòng, tận dụng luồng gió mát lành từ kênh rạch, sông nước để tiết kiệm điện cho gia đình.",
    "studentAct": "HS liên hệ thói quen ở nhà: Mở cửa đón gió sông, chỉ bật quạt khi thực sự cần thiết, không ngồi quá gần quạt khi đang ướt mồ hôi để bảo vệ sức khoẻ."
  },
  {
    "id": "gddp_tv_70",
    "grade": 3,
    "subjectKey": "cong_nghe",
    "subjectName": "Công nghệ",
    "weeks": [
      21,
      22
    ],
    "lessonTitle": "Bài 7: Dụng cụ và vật liệu làm thủ công",
    "topic": "Chủ đề 7 GDĐP 3: Những làng nghề ở Trà Vinh (Trang 35 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 7: Những làng nghề ở Trà Vinh): Nhận biết các vật liệu thủ công tự nhiên thân thiện với môi trường đặc trưng của vùng quê Trà Vinh (sợi lác dệt chiếu Cà Hom, mây tre đan lát, lá dừa, cọng dừa, lục bình khô) dùng làm đồ thủ công mỹ nghệ và đồ chơi dân gian.",
    "activityTitle": "Khám phá: Khám phá các vật liệu tự nhiên độc đáo từ cây cỏ quê hương Trà Vinh.",
    "teacherAct": "GV cho HS xem mẫu vật thật hoặc hình ảnh: sợi lác đã nhuộm màu rực rỡ, nan tre chuốt nhẵn, cọng dừa, lục bình phơi khô. Giới thiệu cách nghệ nhân Trà Vinh tận dụng những cây cỏ quanh nhà tạo nên sản phẩm thủ công xuất khẩu nổi tiếng.",
    "studentAct": "HS chạm tay quan sát các mẫu vật, nhận biết sợi lác mềm dẻo, nan tre cứng cáp; hào hứng bày tỏ mong muốn làm ra những món đồ chơi thủ công đẹp mắt từ vật liệu thiên nhiên."
  },
  {
    "id": "gddp_tv_71",
    "grade": 3,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      2,
      3
    ],
    "lessonTitle": "CHỦ ĐỀ 2:HOA VĂN TRÊN TRANG PHỤC - CỦA MỘT SỐ DÂN TỘC",
    "topic": "Chủ đề 8 GDĐP 3: Tết Chôl-Chnăm-Thmây ở Trà Vinh (Trang 40 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 8: Tết Chôl-Chnăm-Thmây ở Trà Vinh): Quan sát, cảm nhận và vẽ trang trí được hoa văn đặc sắc trên trang phục truyền thống (áo tầm vông, xà-rông) của đồng bào Khmer Trà Vinh thường mặc trong dịp Tết Chôl-Chnăm-Thmây.",
    "activityTitle": "Khám phá & Sáng tạo: Hoa văn rực rỡ trên trang phục truyền thống Khmer Trà Vinh.",
    "teacherAct": "GV trình chiếu hình ảnh đồng bào Khmer Trà Vinh xúng xính trang phục truyền thống đi lễ chùa ngày Tết Chôl-Chnăm-Thmây với những dải hoa văn vàng óng, hoạ tiết ngọn lửa, hoa cúc cách điệu tinh tế. Hướng dẫn HS cách vẽ hoa văn đối xứng, phối màu hài hoà.",
    "studentAct": "HS quan sát, chọn mẫu hoa văn yêu thích và thực hành trang trí vào bài vẽ của mình với gam màu tươi vui, rạng rỡ chào đón năm mới."
  },
  {
    "id": "gddp_tv_72",
    "grade": 3,
    "subjectKey": "my_thuat",
    "subjectName": "Mĩ thuật",
    "weeks": [
      18,
      19
    ],
    "lessonTitle": "CHỦ ĐỀ 7:CẢNH VẬT QUANH EM",
    "topic": "Chủ đề 3 GDĐP 3: Khu du lịch biển Ba Động & Chủ đề 5: Khu di tích Ao Bà Om",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 3 & 5 GDĐP 3): Thể hiện được tình yêu quê hương đất nước qua tranh vẽ phong cảnh thiên nhiên Trà Vinh: rặng phi lao đón nắng biển Ba Động hoặc mặt nước thanh bình soi bóng hàng cây sao cổ thụ Ao Bà Om.",
    "activityTitle": "Thực hành sáng tạo: Vẽ tranh phong cảnh quê hương Trà Vinh mến yêu.",
    "teacherAct": "GV gợi ý không gian nghệ thuật: Vẽ bờ biển Ba Động với cát mịn, sóng vỗ, hàng phi lao xanh ngắt hoặc vẽ danh thắng Ao Bà Om rợp bóng cây đại thụ, bầu trời cao trong vắt. Khuyến khích HS sáng tạo mảng màu đậm nhạt thể hiện chiều sâu không gian.",
    "studentAct": "HS say sưa phác hoạ nét vẽ và tô màu bức tranh phong cảnh quê hương theo cảm nhận của riêng mình; tự hào giới thiệu tác phẩm trước thầy cô và bạn bè."
  },
  {
    "id": "gddp_tv_73",
    "grade": 3,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      3
    ],
    "lessonTitle": "ÔN TẬP BÀI ĐỌC NHẠC BÀI SỐ 1 - THƯỜNG THỨC ÂM NHẠC: DÀN TRỐNG DÂN TỘC",
    "topic": "Chủ đề 4 GDĐP 3: Lễ hội Nghinh Ông & Chủ đề 8: Tết Chôl-Chnăm-Thmây (Trang 21, 40 - TLGDĐP Lớp 3)",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 4 & 8 GDĐP 3): Nhận biết âm sắc rộn rã của dàn trống hội trong lễ hội Nghinh Ông Mỹ Long và tiếng trống Sa-dăm rộn ràng của đồng bào Khmer Trà Vinh trong ngày hội lớn; biết gõ đệm theo tiết tấu.",
    "activityTitle": "Thường thức âm nhạc: Khám phá nhịp trống hội Nghinh Ông và tiếng trống Sa-dăm rộn ràng Trà Vinh.",
    "teacherAct": "GV mở đoạn âm thanh tiếng trống hội rước cá Ông bên bờ biển Mỹ Long hào hùng và điệu trống múa Sa-dăm linh hoạt, vui nhộn của nghệ nhân Khmer Trà Vinh. Hướng dẫn HS vỗ tay theo tiết tấu dồn dập, vui tươi.",
    "studentAct": "HS lắng nghe say mê, vỗ tay và gõ song loan nhịp nhàng theo tiết tấu điệu trống; cảm nhận không khí tưng bừng, náo nức của ngày hội làng quê Trà Vinh."
  },
  {
    "id": "gddp_tv_74",
    "grade": 3,
    "subjectKey": "am_nhac",
    "subjectName": "Âm nhạc",
    "weeks": [
      20
    ],
    "lessonTitle": "ÔN BÀI HÁT ĐÓN XUÂN VỀ - ĐỌC NHẠC BÀI SỐ 3",
    "topic": "Chủ đề 6 GDĐP 3: Nghệ sĩ nhân dân, soạn giả Viễn Châu & Chủ đề 8: Tết Chôl-Chnăm-Thmây",
    "yccdText": "- Tích hợp GDĐP tỉnh Trà Vinh (Chủ đề 6 & 8 GDĐP 3): Cảm nhận được giai điệu tươi vui, ấm áp tình xuân của các làn điệu dân ca Nam Bộ, ngón đờn tranh tài hoa của Soạn giả Viễn Châu và giai điệu múa Rom-vong đón mùa xuân mới trên quê hương Trà Vinh.",
    "activityTitle": "Vận dụng - Sáng tạo: Giai điệu mùa xuân quê hương và ngón đờn tài hoa người Trà Vinh.",
    "teacherAct": "GV đệm đàn cho HS ôn hát bài Đón xuân về kết hợp động tác múa phụ hoạ nhẹ nhàng. Mở một trích đoạn độc tấu đàn tranh điệu lí dân ca của NSND Viễn Châu. Nhắc nhở HS gìn giữ các làn điệu âm nhạc cổ truyền của dân tộc.",
    "studentAct": "HS cùng hoà ca tiếng hát trong trẻo đón xuân về, nhún nhảy động tác múa tay Rom-vong duyên dáng và chăm chú lắng nghe tiếng đàn tranh ngọt ngào sâu lắng của quê hương Trà Vinh."
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
