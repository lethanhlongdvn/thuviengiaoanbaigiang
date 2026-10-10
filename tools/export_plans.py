# -*- coding: utf-8 -*-
"""
Công cụ xuất file Giáo án ghép tuần theo yêu cầu của giáo viên
Hỗ trợ:
- Chọn Lớp: 1, 2, 3, 4, 5
- Chọn chế độ ghép: 2 tuần (1-2, 3-4,...), 3 tuần, 4 tuần (1-4,...), hoặc khoảng tuần tuỳ ý (from_week - to_week)
- Xuất file Word (.docx) chuẩn chỉnh với Page Break giữa các tuần, giữ nguyên định dạng, bảng biểu, hình ảnh.
"""
import os
import sys
import glob
from docx import Document
from docxcompose.composer import Composer

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_DATA_DIR = os.path.join(PROJECT_DIR, "TINHOC_CHUAN_HOA")
PROJECT_OUTPUT_DIR = os.path.join(PROJECT_DIR, "XUAT_GIAO_AN")

# Uu tien thu muc du an hien tai, neu khong co thi dung o D:
BASE_DATA_DIR = PROJECT_DATA_DIR if os.path.exists(PROJECT_DATA_DIR) else r"D:\Giao án mới\TINHOC_CHUAN_HOA"
OUTPUT_DIR = PROJECT_OUTPUT_DIR

def get_week_file(grade, week):
    """Tìm file TUẦN {week}.docx của lớp tương ứng."""
    # 1. Thu muc du an hien tai
    folder1 = os.path.join(PROJECT_DATA_DIR, f"Lop {grade}")
    if os.path.exists(folder1):
        f = os.path.join(folder1, f"TUẦN {week}.docx")
        if os.path.exists(f):
            return f

    # 2. Thu muc o D: TINHOC_CHUAN_HOA
    folder2 = os.path.join(r"D:\Giao án mới\TINHOC_CHUAN_HOA", f"Lop {grade}")
    if os.path.exists(folder2):
        f = os.path.join(folder2, f"TUẦN {week}.docx")
        if os.path.exists(f):
            return f

    # 3. Thu muc TINHOC\Tin học {grade}
    folder3 = rf"D:\Giao án mới\TINHOC\Tin học {grade}"
    if os.path.exists(folder3):
        f = os.path.join(folder3, f"TUẦN {week}.docx")
        if os.path.exists(f):
            return f
            
    return None

def merge_weeks(grade, week_list, output_filename=None):
    """Ghép danh sách các tuần thành 1 file docx duy nhất."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    valid_files = []
    for w in week_list:
        wf = get_week_file(grade, w)
        if wf and os.path.exists(wf):
            valid_files.append((w, wf))
        else:
            print(f"  [Cảnh báo] Không tìm thấy file giáo án Tuần {w} của Lớp {grade}")
            
    if not valid_files:
        print("  [Lỗi] Không có file tuần nào hợp lệ để ghép!")
        return None
        
    start_w = valid_files[0][0]
    end_w = valid_files[-1][0]
    
    if not output_filename:
        if start_w == end_w:
            output_filename = f"KHBD_TinHoc_{grade}_Tuan_{start_w:02d}.docx"
        else:
            output_filename = f"KHBD_TinHoc_{grade}_Tuan_{start_w:02d}-{end_w:02d}.docx"
            
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    
    # Bắt đầu ghép
    first_week, first_file = valid_files[0]
    base_doc = Document(first_file)
    composer = Composer(base_doc)
    
    for w, fpath in valid_files[1:]:
        composer.doc.add_page_break()
        next_doc = Document(fpath)
        composer.append(next_doc)
        
    composer.save(output_path)
    print(f"  [Thành công] Đã xuất file: {output_path}")
    return output_path

def export_by_bundle(grade, bundle_size=2, max_week=35):
    """Xuất hàng loạt theo gói n tuần (2 tuần, 3 tuần, 4 tuần,...)."""
    print(f"\n--- Đang xuất giáo án Lớp {grade} theo gói {bundle_size} tuần ---")
    exported_files = []
    for start_w in range(1, max_week + 1, bundle_size):
        end_w = min(start_w + bundle_size - 1, max_week)
        w_list = list(range(start_w, end_w + 1))
        out = merge_weeks(grade, w_list)
        if out:
            exported_files.append(out)
    return exported_files

def export_custom_range(grade, start_w, end_w):
    """Xuất khoảng tuần tuỳ chỉnh (ví dụ Tuần 1 đến Tuần 4)."""
    print(f"\n--- Đang xuất giáo án Lớp {grade} từ Tuần {start_w} đến Tuần {end_w} ---")
    w_list = list(range(start_w, end_w + 1))
    return merge_weeks(grade, w_list)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description="Xuất Kế hoạch bài dạy (Giáo án) theo tuần")
    parser.add_argument("--grade", type=int, default=1, help="Khối lớp (1-5)")
    parser.add_argument("--bundle", type=int, default=0, help="Gói tuần (2, 3, 4...). Nếu chọn, sẽ xuất toàn bộ năm học theo gói này")
    parser.add_argument("--start", type=int, default=1, help="Tuần bắt đầu")
    parser.add_argument("--end", type=int, default=2, help="Tuần kết thúc")
    
    args = parser.parse_args()
    if args.bundle > 0:
        export_by_bundle(args.grade, args.bundle)
    else:
        export_custom_range(args.grade, args.start, args.end)
