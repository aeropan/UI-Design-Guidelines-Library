"""静态规范预览；不读取或运行原始宠物医疗项目，不对外暴露工作区。"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import webbrowser
ROOT = Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        route = unquote(urlsplit(path).path)
        if route.startswith('/theme/'):
            base, relative = ROOT / 'packages/theme/dist', route[len('/theme/'):]
        else:
            base, relative = ROOT / 'packages/docs', route.lstrip('/')
        base = base.resolve()
        target = (base / relative).resolve()
        if not target.is_relative_to(base):
            return str(base / '__not_found__')
        return str(target)
    def list_directory(self, path):
        self.send_error(404)
        return None
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8081)
    parser.add_argument('--open', action='store_true')
    args = parser.parse_args()
    with ThreadingHTTPServer(('127.0.0.1', args.port), Handler) as server:
        url = f'http://127.0.0.1:{args.port}'
        print(f'暖杏奶油风设计规范 → {url}', flush=True)
        if args.open: webbrowser.open(url)
        try: server.serve_forever()
        except KeyboardInterrupt: pass
