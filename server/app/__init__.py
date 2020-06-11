# app/app.py
import dotenv

from flask import Flask
from flask_cors import CORS

from .routes.home import bp_home

app = Flask(
  __name__,
  static_url_path="/public/",
  static_folder="../../client/dist",
  template_folder="app/templates"
)
app.config.from_pyfile('../config/flask.config.py')
app.register_blueprint(bp_home, url_prefix="/")

CORS(app=app, resources={
  r"*": { "origin": "*" }
})

if __name__ == '__main__':
  dotenv.load_dotenv(dotenv_path="config/.env")

  app.run(host="0.0.0.0", port=3002)