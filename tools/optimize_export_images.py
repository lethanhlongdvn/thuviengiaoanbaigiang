#!/usr/bin/env python3
"""
Tạo bộ ảnh tối ưu cho XUẤT WORD từ assets/khbd_images -> assets/khbd_images_export.

- Thu nhỏ tối đa MAX_W px chiều rộng (ảnh trong Word chỉ hiển thị ~8,1 cm), không phóng to.
- Ảnh có trong suốt thật  -> PNG (RGBA)
- Ảnh ít màu (<= 256, hình vẽ/sơ đồ) -> PNG-8 (không mất chữ)
- Còn lại (ảnh chụp/màu đầy đủ) -> JPEG chất lượng JPEG_Q
- Chỉ ghi ảnh mới nếu NHẸ HƠN ảnh gốc; ngược lại dùng lại ảnh gốc (không vào manifest).
- Sinh manifest: assets/khbd_images_export/manifest.json
      { "assets/khbd_images/lop5/toan/tuan_1/image1.png": "assets/khbd_images_export/lop5/toan/tuan_1/image1.jpg", ... }
- Chạy lại được nhiều lần (bỏ qua file đã tối ưu và còn mới hơn bản gốc). Ảnh gốc KHÔNG bị sửa.

Dùng:  python tools/optimize_export_images.py [--force] [--max-width 800] [--quality 85]
"""
import argparse
import json
import os
import sys
from concurrent.futures import ProcessPoolExecutor

from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC_DIR = os.path.join(ROOT, 'assets', 'khbd_images')
DST_DIR = os.path.join(ROOT, 'assets', 'khbd_images_export')
MANIFEST = os.path.join(DST_DIR, 'manifest.json')
EXTS = ('.png', '.jpg', '.jpeg')


def rel_posix(path):
    return os.path.relpath(path, ROOT).replace(os.sep, '/')


def has_real_alpha(im):
    if im.mode in ('RGBA', 'LA'):
        return im.getchannel('A').getextrema()[0] < 255
    if im.mode == 'P' and 'transparency' in im.info:
        return im.convert('RGBA').getchannel('A').getextrema()[0] < 255
    return False


def process(args):
    src, max_w, quality, force = args
    rel = os.path.relpath(src, SRC_DIR)
    stem = os.path.splitext(rel)[0]
    src_key = rel_posix(src)
    # Nếu đã có kết quả (png hoặc jpg) mới hơn ảnh gốc thì dùng lại
    if not force:
        for ext in ('.jpg', '.png'):
            cand = os.path.join(DST_DIR, stem + ext)
            if os.path.exists(cand) and os.path.getmtime(cand) >= os.path.getmtime(src):
                return src_key, rel_posix(cand), os.path.getsize(src), os.path.getsize(cand)
    try:
        im = Image.open(src)
        im.load()
        w, h = im.size
        if w > max_w:
            im = im.resize((max_w, max(1, round(h * max_w / w))), Image.LANCZOS)

        os.makedirs(os.path.dirname(os.path.join(DST_DIR, stem)), exist_ok=True)
        if has_real_alpha(im):
            ext, out = '.png', im.convert('RGBA')
            target = os.path.join(DST_DIR, stem + ext)
            out.save(target, 'PNG', optimize=True)
        else:
            rgb = im.convert('RGB')
            # ít màu -> PNG-8 lossless; nhiều màu -> JPEG
            colors = rgb.resize((min(rgb.width, 256), min(rgb.height, 256))).getcolors(maxcolors=300)
            if colors is not None and len(colors) <= 256:
                ext = '.png'
                target = os.path.join(DST_DIR, stem + ext)
                rgb.quantize(256).save(target, 'PNG', optimize=True)
            else:
                ext = '.jpg'
                target = os.path.join(DST_DIR, stem + ext)
                rgb.save(target, 'JPEG', quality=quality, optimize=True, progressive=False)

        src_size, dst_size = os.path.getsize(src), os.path.getsize(target)
        if dst_size >= src_size:  # không có lợi -> giữ ảnh gốc
            os.remove(target)
            return src_key, None, src_size, src_size
        # dọn bản cũ khác đuôi (nếu có)
        other = os.path.join(DST_DIR, stem + ('.png' if ext == '.jpg' else '.jpg'))
        if os.path.exists(other):
            os.remove(other)
        return src_key, rel_posix(target), src_size, dst_size
    except Exception as e:  # ảnh lỗi -> dùng ảnh gốc
        return src_key, None, os.path.getsize(src), os.path.getsize(src), str(e)


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    ap.add_argument('--max-width', type=int, default=800)
    ap.add_argument('--quality', type=int, default=85)
    ap.add_argument('--force', action='store_true')
    a = ap.parse_args()

    files = []
    for dp, _, fn in os.walk(SRC_DIR):
        for f in fn:
            if f.lower().endswith(EXTS):
                files.append(os.path.join(dp, f))
    files.sort()
    print(f'Tìm thấy {len(files)} ảnh gốc trong {rel_posix(SRC_DIR)}')

    manifest, orig_total, new_total, skipped, errors = {}, 0, 0, 0, []
    with ProcessPoolExecutor() as ex:
        for i, res in enumerate(ex.map(process, [(f, a.max_width, a.quality, a.force) for f in files], chunksize=8), 1):
            key, out, so, sn = res[:4]
            if len(res) > 4:
                errors.append((key, res[4]))
            orig_total += so
            new_total += sn
            if out:
                manifest[key] = out
            else:
                skipped += 1
            if i % 300 == 0:
                print(f'  ... {i}/{len(files)}')

    os.makedirs(DST_DIR, exist_ok=True)
    with open(MANIFEST, 'w', encoding='utf-8') as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=0, sort_keys=True)

    print(f'Ảnh gốc : {orig_total / 1048576:8.1f} MB')
    print(f'Sau tối ưu: {new_total / 1048576:8.1f} MB  ({new_total / max(orig_total, 1) * 100:.0f}%)')
    print(f'Manifest : {len(manifest)} ảnh tối ưu, {skipped} ảnh giữ nguyên gốc, {len(errors)} lỗi')
    for k, e in errors[:10]:
        print('  LỖI', k, e)
    return 0


if __name__ == '__main__':
    sys.exit(main())
