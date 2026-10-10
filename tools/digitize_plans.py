# -*- coding: utf-8 -*-
"""
Script so hoa va chuan hoa giao an Tin hoc 1 va 2 theo tuan (1-35)
theo dung PPCT cua Bo sach Vui hoc Tin hoc.
"""
import os
import sys
import shutil
import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

def create_sem2_doc(filepath, grade, week, topic, lesson, period_str, objectives):
    """Tao file giao an khung chuan CV 2345 cho Hoc ky 2 khi chua co file goc."""
    doc = docx.Document()
    
    # Header Tuan
    p_tuan = doc.add_paragraph()
    r_tuan = p_tuan.add_run(f"TUẦN {week}")
    r_tuan.font.bold = True
    r_tuan.font.size = Pt(14)
    r_tuan.font.name = "Times New Roman"
    
    p_topic = doc.add_paragraph()
    r_topic = p_topic.add_run(topic)
    r_topic.font.bold = True
    r_topic.font.size = Pt(13)
    r_topic.font.name = "Times New Roman"
    
    p_lesson = doc.add_paragraph()
    r_lesson = p_lesson.add_run(lesson)
    r_lesson.font.bold = True
    r_lesson.font.size = Pt(13)
    r_lesson.font.name = "Times New Roman"
    
    # Phan tieu de ke hoach
    p_kh = doc.add_paragraph()
    r_kh = p_kh.add_run("KẾ HOẠCH BÀI DẠY")
    r_kh.font.bold = True
    r_kh.font.size = Pt(14)
    r_kh.font.name = "Times New Roman"
    p_kh.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    p_info = doc.add_paragraph()
    p_info.add_run(f"Môn học: Tin học\tLớp: {grade}\nTên bài học: {lesson}\tSố tiết: {period_str}\nThời gian thực hiện: Tuần {week}").font.name = "Times New Roman"
    
    # Yeu cau can dat
    doc.add_paragraph().add_run("A. YÊU CẦU CẦN ĐẠT").font.bold = True
    p_obj = doc.add_paragraph()
    p_obj.add_run(objectives).font.name = "Times New Roman"
    
    doc.add_paragraph().add_run("1. Năng lực chung:").font.bold = True
    doc.add_paragraph("- Năng lực tự chủ và tự học: Tự giác tham gia học tập, lắng nghe và hoàn thành nhiệm vụ được giao.\n- Năng lực giao tiếp và hợp tác: Tích cực trao đổi nhóm đôi, hỗ trợ bạn bè cùng thực hành.\n- Năng lực giải quyết vấn đề và sáng tạo: Chủ động áp dụng kiến thức để thao tác trên phần mềm.").paragraph_format.left_indent = Inches(0.2)
    
    doc.add_paragraph().add_run("2. Năng lực tin học, năng lực số:").font.bold = True
    doc.add_paragraph(f"- Nhận biết và thực hành thành thạo nội dung bài học {lesson}.\n- Rèn luyện kĩ năng sử dụng máy tính an toàn, hiệu quả, đúng mục đích.").paragraph_format.left_indent = Inches(0.2)
    
    doc.add_paragraph().add_run("3. Phẩm chất:").font.bold = True
    doc.add_paragraph("- Chăm chỉ: Hoàn thành tốt các bài tập thực hành trên máy tính.\n- Trách nhiệm: Giữ gìn phòng máy tính và thiết bị cẩn thận; ngồi đúng tư thế.").paragraph_format.left_indent = Inches(0.2)
    
    doc.add_paragraph().add_run("B. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU").font.bold = True
    doc.add_paragraph("1. Giáo viên: Phòng máy vi tính hoạt động tốt, máy chiếu/màn hình tương tác, bài trình chiếu PowerPoint, tệp thực hành mẫu.\n2. Học sinh: Sách giáo khoa, vở ghi chép, máy vi tính cá nhân/nhóm đôi.").paragraph_format.left_indent = Inches(0.2)
    
    doc.add_paragraph().add_run("C. TIẾN TRÌNH DẠY HỌC").font.bold = True
    
    # Bang tien trinh hoat dong
    table = doc.add_table(rows=1, cols=2)
    table.style = 'Table Grid'
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = "Hoạt động của giáo viên"
    hdr_cells[1].text = "Hoạt động của học sinh"
    for cell in hdr_cells:
        for p in cell.paragraphs:
            for r in p.runs:
                r.font.bold = True
                r.font.name = "Times New Roman"
    
    activities = [
        ("1. Khởi động (5 phút):\n- Trò chơi/câu đố kết nối vào bài học mới.\n- Dẫn dắt, giới thiệu mục tiêu bài học.", 
         "- Học sinh tham gia trò chơi hứng thú.\n- Lắng nghe và xác định mục tiêu học tập."),
        ("2. Khám phá / Hình thành kiến thức mới (12 phút):\n- Hướng dẫn học sinh quan sát giao diện, công cụ.\n- Giáo viên làm mẫu thao tác chậm, rõ ràng.", 
         "- Học sinh chú ý quan sát thao tác mẫu của GV.\n- Nhận diện các nút lệnh, thao tác trên màn hình."),
        ("3. Luyện tập - Thực hành (13 phút):\n- Phân công vị trí máy, giao nhiệm vụ thực hành.\n- Theo dõi, uốn nắn tư thế ngồi, giúp đỡ học sinh lúng túng.", 
         "- Học sinh thực hành theo hướng dẫn trên máy tính cá nhân/nhóm đôi.\n- Báo cáo kết quả khi hoàn thành thao tác."),
        ("4. Vận dụng - Đánh giá (5 phút):\n- Nhận xét tiết học, tuyên dương học sinh tích cực.\n- Dặn dò chuẩn bị cho tiết học tuần tiếp theo.", 
         "- Học sinh lắng nghe nhận xét, rút kinh nghiệm.\n- Thoát phần mềm và tắt máy tính đúng quy trình.")
    ]
    
    for gv, hs in activities:
        row_cells = table.add_row().cells
        row_cells[0].text = gv
        row_cells[1].text = hs
        for cell in row_cells:
            for p in cell.paragraphs:
                for r in p.runs:
                    r.font.name = "Times New Roman"
                    r.font.size = Pt(11)
                    
    doc.add_paragraph()
    doc.add_paragraph().add_run("D. ĐIỀU CHỈNH SAU BÀI DẠY (NẾU CÓ)").font.bold = True
    doc.add_paragraph("...................................................................................................................................................................")
    
    doc.save(filepath)

def standardize_sem1_doc(src_file, dst_file, week, topic, lesson_title):
    """Doc file goc va chen header Tuan/Chu de chuan vao dau file."""
    shutil.copy2(src_file, dst_file)
    doc = docx.Document(dst_file)
    
    # Chen header vao truoc doan van dau tien
    header_text = f"TUẦN {week}\n{topic}\n{lesson_title}\n"
    p = doc.paragraphs[0].insert_paragraph_before(header_text)
    for r in p.runs:
        r.font.name = "Times New Roman"
        r.font.bold = True
        r.font.size = Pt(13)
        
    doc.save(dst_file)

def digitize_grade_1():
    print("=== DANG SO HOA TIN HOC 1 ===")
    src_dir = r"D:\Giao án mới\TINHOC\GA TIN HỌC 1"
    dst_dir_std = r"D:\Giao án mới\TINHOC_CHUAN_HOA\Lop 1"
    dst_dir_tin = r"D:\Giao án mới\TINHOC\Tin học 1"
    
    os.makedirs(dst_dir_std, exist_ok=True)
    os.makedirs(dst_dir_tin, exist_ok=True)
    
    # Mapping HK1
    hk1_map = {
        1: ("TIN 1 - B01_MÁY TÍNH - NHỮNG NGƯỜI BẠN MỚI - 2026.docx", "CHỦ ĐỀ 1: MÁY TÍNH - NGƯỜI BẠN MỚI", "BÀI 1: MÁY TÍNH QUANH EM"),
        2: ("TIN 1 - B02_KHÁM PHÁ MÁY TÍNH - 2026.docx", "CHỦ ĐỀ 1: MÁY TÍNH - NGƯỜI BẠN MỚI", "BÀI 2: KHÁM PHÁ MÁY TÍNH"),
        3: ("TIN 1 - B03_LÀM QUEN VỚI CHUỘT MÁY TÍNH -  2026.docx", "CHỦ ĐỀ 1: MÁY TÍNH - NGƯỜI BẠN MỚI", "BÀI 3: LÀM QUEN VỚI CHUỘT MÁY TÍNH"),
        4: ("TIN 1 - B04_LÀM QUEN VỚI BÀN PHÍM - 2026.docx", "CHỦ ĐỀ 1: MÁY TÍNH - NGƯỜI BẠN MỚI", "BÀI 4: LÀM QUEN VỚI BÀN PHÍM"),
        5: ("TIN 1 - B05_SỬ DỤNG MÁY TÍNH ĐÚNG CÁCH.docx", "CHỦ ĐỀ 1: MÁY TÍNH - NGƯỜI BẠN MỚI", "BÀI 5: SỬ DỤNG MÁY TÍNH ĐÚNG CÁCH (TIẾT 1)"),
        6: ("TIN 1 - B05_SỬ DỤNG MÁY TÍNH ĐÚNG CÁCH.docx", "CHỦ ĐỀ 1: MÁY TÍNH - NGƯỜI BẠN MỚI", "BÀI 5: SỬ DỤNG MÁY TÍNH ĐÚNG CÁCH (TIẾT 2)"),
        7: ("TIN 1 - B06_ÔN TẬP.docx", "CHỦ ĐỀ 1: MÁY TÍNH - NGƯỜI BẠN MỚI", "BÀI 6: ÔN TẬP"),
        8: ("TIN 1 - CĐ2-B07-Thao tac nhay chuot, cuon chuot.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 7: THAO TÁC NHÁY CHUỘT, CUỘN CHUỘT"),
        9: ("TIN 1 - CĐ2-B08-Thao tac nhay dup chuot.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 8: THAO TÁC NHÁY ĐÚP CHUỘT"),
        10: ("TIN 1 - CĐ2-B09-Thao tac keo tha chuot.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 9: THAO TÁC KÉO THẢ CHUỘT (TIẾT 1)"),
        11: ("TIN 1 - CĐ2-B09-Thao tac keo tha chuot.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 9: THAO TÁC KÉO THẢ CHUỘT (TIẾT 2)"),
        12: ("TIN 1 - B10_Các khu vực chính của bàn phím.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 10: KHU VỰC CHÍNH CỦA BÀN PHÍM (TIẾT 1)"),
        13: ("TIN 1 - B10_Các khu vực chính của bàn phím.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 10: KHU VỰC CHÍNH CỦA BÀN PHÍM (TIẾT 2)"),
        14: ("TIN 1 - B11_ KHU VỰC PHÍM MŨI TÊN-PHÍM SỐ.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 11: KHU VỰC PHÍM MŨI TÊN, PHÍM SỐ (TIẾT 1)"),
        15: ("TIN 1 - B11_ KHU VỰC PHÍM MŨI TÊN-PHÍM SỐ.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 11: KHU VỰC PHÍM MŨI TÊN, PHÍM SỐ (TIẾT 2)"),
        16: ("TIN 1 - B12_ GÕ PHÍM ĐÚNG CÁCH.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 12: GÕ PHÍM ĐÚNG CÁCH (TIẾT 1)"),
        17: ("TIN 1 - B12_ GÕ PHÍM ĐÚNG CÁCH.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 12: GÕ PHÍM ĐÚNG CÁCH (TIẾT 2)"),
        18: ("TIN 1 - B13_ÔN TẬP.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 13: ÔN TẬP HỌC KỲ I")
    }
    
    for w, (fname, topic, lesson) in hk1_map.items():
        src_path = os.path.join(src_dir, fname)
        dst_path = os.path.join(dst_dir_std, f"TUẦN {w}.docx")
        standardize_sem1_doc(src_path, dst_path, w, topic, lesson)
        shutil.copy2(dst_path, os.path.join(dst_dir_tin, f"TUẦN {w}.docx"))
        print(f"  [Lop 1] Da tao TUAN {w}: {lesson}")
        
    # HK2 Map
    hk2_map = {
        19: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 14: KHÁM PHÁ HÌNH KHỐI (TIẾT 1)", "1 tiết", "- Nhận biết các hình khối cơ bản trên phần mềm đồ họa."),
        20: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 14: KHÁM PHÁ HÌNH KHỐI (TIẾT 2)", "1 tiết", "- Thực hành vẽ và ghép các hình khối đơn giản."),
        21: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 15: KHÁM PHÁ ĐƯỜNG ĐI (TIẾT 1)", "1 tiết", "- Khám phá điều khiển đường đi của nhân vật trên máy tính."),
        22: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 15: KHÁM PHÁ ĐƯỜNG ĐI (TIẾT 2)", "1 tiết", "- Thực hành bài tập tìm đường đi trên trò chơi học tập."),
        23: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 16: KHÁM PHÁ MÀU SẮC (TIẾT 1)", "1 tiết", "- Nhận biết hộp màu và các thao tác chọn màu trên phần mềm."),
        24: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 16: KHÁM PHÁ MÀU SẮC (TIẾT 2)", "1 tiết", "- Thực hành tô màu tranh vẽ có sẵn."),
        25: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 17: KHÁM PHÁ ÂM THANH", "1 tiết", "- Nhận biết âm thanh phát ra từ máy tính, điều chỉnh âm lượng."),
        26: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 18: ÔN TẬP CHỦ ĐỀ 3", "1 tiết", "- Củng cố kĩ năng vẽ hình khối, tô màu và sử dụng âm thanh."),
        27: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 19: VUI HỌC CHỮ CÁI CÙNG MÁY TÍNH (TIẾT 1)", "1 tiết", "- Làm quen với phần mềm nhận biết và luyện gõ chữ cái."),
        28: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 19: VUI HỌC CHỮ CÁI CÙNG MÁY TÍNH (TIẾT 2)", "1 tiết", "- Thực hành gõ các chữ cái tiếng Việt cơ bản."),
        29: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 20: VUI HỌC TOÁN CÙNG MÁY TÍNH (TIẾT 1)", "1 tiết", "- Sử dụng máy tính thực hiện các phép đếm và so sánh số."),
        30: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 20: VUI HỌC TOÁN CÙNG MÁY TÍNH (TIẾT 2)", "1 tiết", "- Luyện tập giải toán vui cùng phần mềm tương tác."),
        31: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 22: VUI HỌC KHOA HỌC CÙNG MÁY TÍNH (TIẾT 1)", "1 tiết", "- Khám phá thế giới động thực vật qua hình ảnh và video."),
        32: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 22: VUI HỌC KHOA HỌC CÙNG MÁY TÍNH (TIẾT 2)", "1 tiết", "- Thực hành tương tác với bài học khoa học trực quan."),
        33: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 23: VUI HỌC TIẾNG ANH CÙNG MÁY TÍNH (TIẾT 1)", "1 tiết", "- Làm quen với từ vựng tiếng Anh qua hình ảnh sinh động."),
        34: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 23: VUI HỌC TIẾNG ANH CÙNG MÁY TÍNH (TIẾT 2)", "1 tiết", "- Luyện nghe và phát âm từ vựng tiếng Anh trên phần mềm."),
        35: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 24: BÀI ÔN TẬP CUỐI NĂM", "1 tiết", "- Tổng kết kiến thức và kĩ năng thực hành môn Tin học lớp 1.")
    }
    
    for w, (topic, lesson, period_str, obj) in hk2_map.items():
        dst_path = os.path.join(dst_dir_std, f"TUẦN {w}.docx")
        create_sem2_doc(dst_path, 1, w, topic, lesson, period_str, obj)
        shutil.copy2(dst_path, os.path.join(dst_dir_tin, f"TUẦN {w}.docx"))
        print(f"  [Lop 1] Da tao TUAN {w}: {lesson}")

def digitize_grade_2():
    print("=== DANG SO HOA TIN HOC 2 ===")
    src_dir = r"D:\Giao án mới\TINHOC\GA TIN HỌC 2"
    dst_dir_std = r"D:\Giao án mới\TINHOC_CHUAN_HOA\Lop 2"
    dst_dir_tin = r"D:\Giao án mới\TINHOC\Tin học 2"
    
    os.makedirs(dst_dir_std, exist_ok=True)
    os.makedirs(dst_dir_tin, exist_ok=True)
    
    # Mapping HK1
    hk1_map = {
        1: ("TIN 2 - B01_MÁY TÍNH TRONG ĐỜI SỐNG.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 1: MÁY TÍNH TRONG ĐỜI SỐNG"),
        2: ("TIN 2 - B02_KHÁM PHÁ MÁY TÍNH.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 2: KHÁM PHÁ MÁY TÍNH (TIẾT 1)"),
        3: ("TIN 2 - B02_KHÁM PHÁ MÁY TÍNH.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 2: KHÁM PHÁ MÁY TÍNH (TIẾT 2)"),
        4: ("TIN 2 - B03_MÁY TÍNH - VUI GẶP LẠI.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 3: SỬ DỤNG MÁY TÍNH ĐÚNG CÁCH (TIẾT 1)"),
        5: ("TIN 2 - B03_MÁY TÍNH - VUI GẶP LẠI.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 3: SỬ DỤNG MÁY TÍNH ĐÚNG CÁCH (TIẾT 2)"),
        6: ("TIN 2 - B04_Sử dụng chuột máy tính thành thạo.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 4: SỬ DỤNG CHUỘT MÁY TÍNH THÀNH THẠO"),
        7: ("TIN 2 - B05_Xem video với Windows Media Player.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 5: XEM VIDEO VỚI WINDOWS MEDIA PLAYER"),
        8: ("TIN 2 - B06_Ôn tập.docx", "CHỦ ĐỀ 1: MÁY TÍNH - VUI GẶP LẠI", "BÀI 6: ÔN TẬP CHỦ ĐỀ 1"),
        9: ("TIN 2 - B07_HÀNG PHÍM CƠ SỞ.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 7: HÀNG PHÍM CƠ SỞ (TIẾT 1)"),
        10: ("TIN 2 - B07_HÀNG PHÍM CƠ SỞ.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 7: HÀNG PHÍM CƠ SỞ (TIẾT 2)"),
        11: ("TIN 2 - B08_HÀNG PHÍM TRÊN.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 8: HÀNG PHÍM TRÊN (TIẾT 1)"),
        12: ("TIN 2 - B08_HÀNG PHÍM TRÊN.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 8: HÀNG PHÍM TRÊN (TIẾT 2)"),
        13: ("TIN 2 - B09_HÀNG PHÍM DƯỚI.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 9: HÀNG PHÍM DƯỚI (TIẾT 1)"),
        14: ("TIN 2 - B09_HÀNG PHÍM DƯỚI.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 9: HÀNG PHÍM DƯỚI (TIẾT 2)"),
        15: ("TIN 2 - B10_LUYỆN GÕ PHÍM ĐÚNG VÀ NHANH.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 10: LUYỆN GÕ PHÍM NHANH VÀ ĐÚNG (TIẾT 1)"),
        16: ("TIN 2 - B10_LUYỆN GÕ PHÍM ĐÚNG VÀ NHANH.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 10: LUYỆN GÕ PHÍM NHANH VÀ ĐÚNG (TIẾT 2)"),
        17: ("TIN 2 - B11_GÕ CHỮ IN HOA VÀ XUỐNG DÒNG.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 11: GÕ CHỮ HOA VÀ XUỐNG DÒNG (TIẾT 1)"),
        18: ("TIN 2 - B12_ÔN TẬP.docx", "CHỦ ĐỀ 2: MÁY TÍNH - NGƯỜI BẠN NHANH NHẠY", "BÀI 12: ÔN TẬP HỌC KỲ I")
    }
    
    for w, (fname, topic, lesson) in hk1_map.items():
        src_path = os.path.join(src_dir, fname)
        dst_path = os.path.join(dst_dir_std, f"TUẦN {w}.docx")
        standardize_sem1_doc(src_path, dst_path, w, topic, lesson)
        shutil.copy2(dst_path, os.path.join(dst_dir_tin, f"TUẦN {w}.docx"))
        print(f"  [Lop 2] Da tao TUAN {w}: {lesson}")
        
    # HK2 Map
    hk2_map = {
        19: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 13: LÀM QUEN VỚI PHẦN MỀM PAINT (TIẾT 1)", "1 tiết", "- Khởi động và làm quen với giao diện phần mềm Paint."),
        20: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 13: LÀM QUEN VỚI PHẦN MỀM PAINT (TIẾT 2)", "1 tiết", "- Thực hành sử dụng công cụ bút vẽ và tẩy."),
        21: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 14: VẼ CỜ TỔ QUỐC", "1 tiết", "- Vẽ hình chữ nhật, hình ngôi sao năm cánh và tô màu đỏ, vàng."),
        22: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 15: VẼ NGÔI NHÀ (TIẾT 1)", "1 tiết", "- Sử dụng các hình khối hình học để phác thảo ngôi nhà."),
        23: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 15: VẼ NGÔI NHÀ (TIẾT 2)", "1 tiết", "- Hoàn thiện chi tiết cửa, mái ngói và tô màu bức tranh ngôi nhà."),
        24: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 16: VẼ CON VẬT EM YÊU QUÝ (TIẾT 1)", "1 tiết", "- Lựa chọn công cụ thích hợp để vẽ hình dáng con vật cưng."),
        25: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 16: VẼ CON VẬT EM YÊU QUÝ (TIẾT 2)", "1 tiết", "- Tô màu và trang trí bức tranh con vật sinh động."),
        26: ("CHỦ ĐỀ 3: MÁY TÍNH - CÙNG EM VUI HỌC", "BÀI 17: ÔN TẬP CHỦ ĐỀ 3", "1 tiết", "- Củng cố các kĩ năng vẽ tranh hoàn chỉnh với phần mềm Paint."),
        27: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 18: NHÀ TOÁN HỌC TÀI BA (TIẾT 1)", "1 tiết", "- Sử dụng máy tính ôn tập phép cộng, phép trừ trong phạm vi 100."),
        28: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 18: NHÀ TOÁN HỌC TÀI BA (TIẾT 2)", "1 tiết", "- Thi đua làm toán nhanh trên phần mềm."),
        29: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 19: NHÀ BÁC HỌC TÀI BA (TIẾT 1)", "1 tiết", "- Khám phá kiến thức khoa học tự nhiên thông qua bài học tương tác."),
        30: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 19: NHÀ BÁC HỌC TÀI BA (TIẾT 2)", "1 tiết", "- Thực hiện các thí nghiệm ảo đơn giản."),
        31: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 20: NHÀ PHIÊN DỊCH TÀI BA (TIẾT 1)", "1 tiết", "- Luyện tập từ vựng, ngữ pháp Tiếng Anh chủ đề gia đình, trường học."),
        32: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 20: NHÀ PHIÊN DỊCH TÀI BA (TIẾT 2)", "1 tiết", "- Luyện nghe và phản xạ tiếng Anh qua trò chơi tương tác."),
        33: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 21: VUI CÙNG MÁY TÍNH (TIẾT 1)", "1 tiết", "- Rèn luyện tư duy logic qua trò chơi xếp hình thông minh."),
        34: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 21: VUI CÙNG MÁY TÍNH (TIẾT 2)", "1 tiết", "- Rèn luyện phản xạ nhanh với bàn phím và chuột."),
        35: ("CHỦ ĐỀ 4: MÁY TÍNH - NGƯỜI BẠN THÂN CỦA EM", "BÀI 24: BÀI ÔN TẬP CUỐI NĂM", "1 tiết", "- Đánh giá tổng hợp kiến thức và kĩ năng Tin học lớp 2.")
    }
    
    for w, (topic, lesson, period_str, obj) in hk2_map.items():
        dst_path = os.path.join(dst_dir_std, f"TUẦN {w}.docx")
        create_sem2_doc(dst_path, 2, w, topic, lesson, period_str, obj)
        shutil.copy2(dst_path, os.path.join(dst_dir_tin, f"TUẦN {w}.docx"))
        print(f"  [Lop 2] Da tao TUAN {w}: {lesson}")

if __name__ == '__main__':
    digitize_grade_1()
    digitize_grade_2()
    print("HOAN THANH SO HOA 35 TUAN CHO TIN HOC 1 VA TIN HOC 2!")
