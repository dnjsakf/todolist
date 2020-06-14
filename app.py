# app/app.py
import dotenv

from server.app import create_app

app = create_app()

if __name__ == '__main__':
  dotenv.load_dotenv(dotenv_path=".env")

  app.run(host="0.0.0.0", port=3002)