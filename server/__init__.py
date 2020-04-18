# api/__init__.py
from flask import Flask
from flask_cors import CORS

from server.api import set_api_graphql
from server.app import set_routes

def create_app():
  # Flask Application 생성
  app = Flask(
    __name__,
    static_url_path="/public/",
    static_folder="../client/dist",
    template_folder="app/templates"
  )

  CORS(app=app, resources={
    r"/*": { "origin": "*" }
  })
  
  app.config.from_pyfile('config/flask.config.py')
  
  # /graphql EndPoint 설
  set_api_graphql(app)

  # /* set routes
  set_routes(app)
  
  return app