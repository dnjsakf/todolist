# app.py
import dotenv
from server import create_app

if __name__ == '__main__':
  # 환경변수 설정
  dotenv.load_dotenv(dotenv_path=".env")
  
  # Flask App 실행
  app = create_app()
  app.run(host="localhost", port=3000)