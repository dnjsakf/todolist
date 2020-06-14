from flask import Flask
from flask_cors import CORS

from server.app.routes.home import bp_home

def create_app():
  app = Flask(
    __name__,
    static_url_path="/public/",
    static_folder="../../client/dist",
    template_folder="templates"
  )
  app.config.from_pyfile('config/flask.config.py')
  app.register_blueprint(bp_home, url_prefix="/")

  CORS(app=app, resources={
    r"*": { "origin": "*" }
  })

  return app