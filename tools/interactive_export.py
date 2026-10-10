# -*- coding: utf-8 -*-
"""
Giao dien tuong tac xuat giao an bang Tieng Viet tren Console
"""
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Import core exporter
from export_plans import export_by_bundle, export_custom_range, OUTPUT_DIR

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def main_menu():
    while True:
        clear_screen()
        print("=" * 60)
        print("   HỆ THỐNG XUẤT KẾ HOẠCH BÀI DẠY (GIÁO ÁN) THEO TUẦN")
        print("         Trường Tiểu học Đỗ Văn Nại - Môn Tin học")
        print("=" * 60)
        print(" 1. Xuất giáo án LỚP 1")
        print(" 2. Xuất giáo án LỚP 2")
        print(" 3. Xuất giáo án LỚP 3")
        print(" 4. Xuất giáo án LỚP 4")
        print(" 5. Xuất giáo án LỚP 5")
        print(" 6. Mở thư mục chứa file đã xuất")
        print(" 0. Thoát chương trình")
        print("-" * 60)
        
        choice = input("👉 Nhập lựa chọn của bạn (0-6): ").strip()
        if choice == '0':
            print("\nCảm ơn thầy/cô đã sử dụng hệ thống!")
            break
        elif choice == '6':
            os.makedirs(OUTPUT_DIR, exist_ok=True)
            os.system(f'explorer "{OUTPUT_DIR}"')
            continue
        elif choice in ['1', '2', '3', '4', '5']:
            grade = int(choice)
            sub_menu(grade)
        else:
            input("\nLựa chọn không hợp lệ. Nhấn Enter để thử lại...")

def sub_menu(grade):
    while True:
        clear_screen()
        print("=" * 60)
        print(f"      TÙY CHỌN XUẤT GIÁO ÁN - KHỐI LỚP {grade}")
        print("=" * 60)
        print(" [1] Xuất toàn bộ năm học theo GÓI 2 TUẦN (Tuần 1-2, 3-4,...)")
        print(" [2] Xuất toàn bộ năm học theo GÓI 3 TUẦN (Tuần 1-3, 4-6,...)")
        print(" [3] Xuất toàn bộ năm học theo GÓI 4 TUẦN (Tuần 1-4, 5-8,...)")
        print(" [4] Xuất khoảng tuần tùy chỉnh (Ví dụ: từ Tuần A đến Tuần B)")
        print(" [0] Quay lại menu chính")
        print("-" * 60)
        
        c = input("👉 Chọn chế độ xuất (0-4): ").strip()
        if c == '0':
            break
        elif c == '1':
            print(f"\nĐang tiến hành xuất gói 2 tuần cho Lớp {grade}...")
            files = export_by_bundle(grade, bundle_size=2)
            print(f"\n=> Đã xuất thành công {len(files)} file!")
            open_folder = input("Bạn có muốn mở thư mục chứa file không? (c/k): ").strip().lower()
            if open_folder in ['c', 'y']:
                os.system(f'explorer "{OUTPUT_DIR}"')
            input("\nNhấn Enter để tiếp tục...")
        elif c == '2':
            print(f"\nĐang tiến hành xuất gói 3 tuần cho Lớp {grade}...")
            files = export_by_bundle(grade, bundle_size=3)
            print(f"\n=> Đã xuất thành công {len(files)} file!")
            open_folder = input("Bạn có muốn mở thư mục chứa file không? (c/k): ").strip().lower()
            if open_folder in ['c', 'y']:
                os.system(f'explorer "{OUTPUT_DIR}"')
            input("\nNhấn Enter để tiếp tục...")
        elif c == '3':
            print(f"\nĐang tiến hành xuất gói 4 tuần cho Lớp {grade}...")
            files = export_by_bundle(grade, bundle_size=4)
            print(f"\n=> Đã xuất thành công {len(files)} file!")
            open_folder = input("Bạn có muốn mở thư mục chứa file không? (c/k): ").strip().lower()
            if open_folder in ['c', 'y']:
                os.system(f'explorer "{OUTPUT_DIR}"')
            input("\nNhấn Enter để tiếp tục...")
        elif c == '4':
            try:
                start_w = int(input("Nhập Tuần bắt đầu (1-35): ").strip())
                end_w = int(input("Nhập Tuần kết thúc (1-35): ").strip())
                if start_w < 1 or end_w > 35 or start_w > end_w:
                    print("Khoảng tuần không hợp lệ!")
                else:
                    out = export_custom_range(grade, start_w, end_w)
                    if out:
                        open_folder = input("\nBạn có muốn mở thư mục chứa file không? (c/k): ").strip().lower()
                        if open_folder in ['c', 'y']:
                            os.system(f'explorer "{OUTPUT_DIR}"')
            except ValueError:
                print("Vui lòng nhập số nguyên hợp lệ!")
            input("\nNhấn Enter để tiếp tục...")

if __name__ == '__main__':
    main_menu()
