# -*- coding: utf-8 -*-
"""
Web Server tich hop API xuat giao an docx va phuc vu Web UI
"""
import os
import sys
import json
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Ensure tools directory is in sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(CURRENT_DIR)
sys.path.append(CURRENT_DIR)

from export_plans import export_by_bundle, export_custom_range, OUTPUT_DIR

class PlanExportHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PARENT_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/export':
            params = urllib.parse.parse_qs(parsed.query)
            try:
                grade = int(params.get('grade', ['1'])[0])
                bundle = int(params.get('bundle', ['0'])[0])
                start_w = int(params.get('start', ['1'])[0])
                end_w = int(params.get('end', ['2'])[0])
                
                exported = []
                if bundle > 0:
                    exported = export_by_bundle(grade, bundle_size=bundle)
                else:
                    out = export_custom_range(grade, start_w, end_w)
                    if out:
                        exported = [out]
                        
                res_data = {
                    "success": True,
                    "grade": grade,
                    "files": [os.path.basename(f) for f in exported if f],
                    "output_dir": OUTPUT_DIR
                }
            except Exception as e:
                res_data = {
                    "success": False,
                    "error": str(e)
                }
                
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(res_data, ensure_ascii=False).encode('utf-8'))
            return
            
        elif parsed.path == '/api/open_folder':
            os.makedirs(OUTPUT_DIR, exist_ok=True)
            os.system(f'explorer "{OUTPUT_DIR}"')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"success": true}')
            return
            
        return super().do_GET()

def run_server(port=8000):
    try:
        server_address = ('', port)
        httpd = HTTPServer(server_address, PlanExportHandler)
    except OSError:
        port = 8080
        server_address = ('', port)
        httpd = HTTPServer(server_address, PlanExportHandler)
        
    print(f"=====================================================")
    print(f" Web Server đang chạy tại: http://localhost:{port}")
    print(f" Thư viện chính: http://localhost:{port}/index.html")
    print(f" Công cụ xuất KHBD: http://localhost:{port}/xuat_giao_an.html")
    print(f"=====================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nĐã dừng server.")

if __name__ == '__main__':
    run_server(8000)
