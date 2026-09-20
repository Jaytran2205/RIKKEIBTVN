# =========================================================================
# NINH BINH DIGITAL - LOCALHOST WEB SERVER (PRO ULTRA FAST)
# Ho tro toan dien: index.html, landingpages.html, images, audio, js, css
# Tu dong mo trinh duyet, tu dong doi cong neu trung, da luong khong giat lag
# =========================================================================
import http.server
import socketserver
import os
import sys
import webbrowser
import threading
import time

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

WEB_DIR = os.path.dirname(os.path.abspath(__file__))

class ProjectHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (ConnectionResetError, BrokenPipeError, ConnectionAbortedError):
            pass

# Tao server da luong
try:
    from http.server import ThreadingHTTPServer as BaseServer
except ImportError:
    class BaseServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
        daemon_threads = True

class MultiThreadedServer(BaseServer):
    daemon_threads = True
    allow_reuse_address = True

def find_available_server(start_port=5000):
    ports_to_try = [5000, 5001, 8000, 8080, 3000]
    for p in ports_to_try:
        try:
            srv = MultiThreadedServer(("", p), ProjectHandler)
            return srv, p
        except OSError:
            continue
    # Thu cong ngau nhien neu tat ca cong tren deu ban
    srv = MultiThreadedServer(("", 0), ProjectHandler)
    return srv, srv.server_address[1]

if __name__ == '__main__':
    httpd, port = find_available_server(5000)
    url = f"http://localhost:{port}"

    print("=" * 64)
    print("   NINH BINH DIGITAL - LOCALHOST WEB SERVER DA KHOI CHAY")
    print(f"   -> Dia chi trang:  {url}")
    print(f"   -> Trang chu:      {url}/index.html")
    print(f"   -> Landing page:   {url}/landingpages.html")
    print("=" * 64)
    print("   [Luu y] Giu nguyen cua so den (Command Prompt) nay!")
    print("   Neu ban tat (dong) cua so nay, server se ngung hoat dong.")
    print("   (Nhan Ctrl+C de dung server khi can)\n")

    # Tu dong bat trinh duyet sau 0.6 giay truc tiep vao chuc nang Van Ban
    def open_browser():
        time.sleep(0.6)
        try:
            webbrowser.open(f"{url}/index.html#vanban")
        except Exception:
            pass

    threading.Thread(target=open_browser, daemon=True).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nDa dung server.")
