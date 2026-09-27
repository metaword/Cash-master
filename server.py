import http.server
import socketserver
import os
import json
import urllib.parse

PORT = int(os.environ.get("PORT", 8080))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/down/get_apk":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = {
                "code": 1,
                "url": "https://mastercash777.com/download/apkfb/2001/CashMasterV1.apk"
            }
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return
        elif parsed.path == "/down/get_url":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = {
                "code": 1,
                "url": "https://h5.mastercash777.com/index.html?a1=2001"
            }
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return
        self.send_error(404, "Not Found")

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Cash Master site serving at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
