#!/usr/bin/env python3
"""
DB正規化ツール v1.1 - Gemini CLI統合サーバー
"""

import json
import subprocess
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import logging

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiCLIHandler(SimpleHTTPRequestHandler):
    """Gemini CLIを呼び出すカスタムハンドラー"""
    
    def do_POST(self):
        """POST リクエストの処理"""
        if self.path == '/api/gemini-cli':
            self.handle_gemini_cli()
        else:
            self.send_error(404, "API endpoint not found")
    
    def handle_gemini_cli(self):
        """Gemini CLI呼び出し処理"""
        try:
            # Content-Lengthヘッダーからデータサイズを取得
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # JSONデータをパース
            data = json.loads(post_data.decode('utf-8'))
            prompt = data.get('prompt', '')
            max_length = data.get('maxLength', 3500)
            
            logger.info(f"Gemini CLI 呼び出し開始 (prompt length: {len(prompt)})")
            
            # プロンプトの長さを制限
            if len(prompt) > max_length:
                prompt = prompt[:max_length] + "..."
                logger.warning(f"プロンプトを{max_length}文字に制限しました")
            
            # Gemini CLIを実行
            result = self.call_gemini_cli(prompt)
            
            # レスポンスを返す
            response_data = {
                "success": True,
                "response": result,
                "prompt_length": len(prompt)
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            response_json = json.dumps(response_data, ensure_ascii=False, indent=2)
            self.wfile.write(response_json.encode('utf-8'))
            
            logger.info("Gemini CLI 呼び出し完了")
            
        except Exception as e:
            logger.error(f"Gemini CLI 呼び出しエラー: {e}")
            self.send_error_response(str(e))
    
    def call_gemini_cli(self, prompt):
        """実際のGemini CLI呼び出し"""
        try:
            # CLIコマンドを準備
            # 注: 実際の環境に応じてコマンドを調整してください
            cmd = ["gemini", prompt]
            
            # プロセス実行
            logger.info(f"実行コマンド: {' '.join(cmd)}")
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=30,  # 30秒でタイムアウト
                encoding='utf-8'
            )
            
            if result.returncode == 0:
                response = result.stdout.strip()
                logger.info(f"Gemini CLI 成功: {len(response)} 文字")
                return response
            else:
                error_msg = result.stderr.strip()
                logger.error(f"Gemini CLI エラー: {error_msg}")
                raise Exception(f"Gemini CLI 実行エラー: {error_msg}")
                
        except subprocess.TimeoutExpired:
            logger.error("Gemini CLI タイムアウト")
            raise Exception("Gemini CLI がタイムアウトしました")
        except FileNotFoundError:
            logger.error("Gemini CLI が見つかりません")
            raise Exception("Gemini CLI がインストールされていません")
        except Exception as e:
            logger.error(f"予期しないエラー: {e}")
            raise
    
    def send_error_response(self, error_message):
        """エラーレスポンスを送信"""
        error_data = {
            "success": False,
            "error": error_message,
            "fallback": "サンプルER図を使用してください"
        }
        
        self.send_response(500)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        error_json = json.dumps(error_data, ensure_ascii=False, indent=2)
        self.wfile.write(error_json.encode('utf-8'))
    
    def do_OPTIONS(self):
        """プリフライトリクエストの処理"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def main():
    """メイン関数"""
    port = 8000
    server_address = ('', port)
    
    try:
        httpd = HTTPServer(server_address, GeminiCLIHandler)
        logger.info(f"DB正規化ツール v1.1 サーバー開始")
        logger.info(f"ポート: {port}")
        logger.info(f"URL: http://localhost:{port}")
        logger.info("Gemini CLI統合サーバーが起動しました")
        
        httpd.serve_forever()
        
    except KeyboardInterrupt:
        logger.info("サーバーを停止します...")
        httpd.shutdown()
    except Exception as e:
        logger.error(f"サーバーエラー: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()