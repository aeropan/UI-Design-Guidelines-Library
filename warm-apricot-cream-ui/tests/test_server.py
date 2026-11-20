import importlib.util
from pathlib import Path
from http.server import ThreadingHTTPServer
import threading
import unittest
from urllib.request import urlopen
from urllib.error import HTTPError
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('wac_preview', ROOT / 'scripts/serve_docs.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
class ServerTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), module.Handler)
        cls.url = 'http://127.0.0.1:' + str(cls.server.server_port)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
    def test_preview_and_tokens(self):
        for path in ['/', '/app.js', '/docs.css', '/theme/tokens.css', '/theme/components.css', '/theme/tokens.json']:
            with urlopen(self.url + path) as response:
                self.assertEqual(response.status, 200)
                self.assertGreater(len(response.read()), 10)
    def test_workspace_and_source_are_not_exposed(self):
        for path in ['/.env', '/README.md', '/theme/%2e%2e/src/tokens.json', '/theme/%2e%2e/%2e%2e/%2e%2e/fip-causal-reasoning/.env']:
            with self.assertRaises(HTTPError) as caught:
                urlopen(self.url + path)
            self.assertEqual(caught.exception.code, 404)
            caught.exception.close()
if __name__ == '__main__':
    unittest.main()
