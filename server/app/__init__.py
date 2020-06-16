from flask import Flask
from flask_cors import CORS

def create_app(*args, **kwargs):
  app = Flask(
    __name__,
    static_url_path="/public/",
    static_folder="../../client/dist",
    template_folder="templates"
  )

  with app.app_context():
    app.config.from_pyfile('config/flask.config.py')
    
    CORS(app=app, resources={
      r"*": { "origin": "*" }
    })
    
    from server.app import routes
  
  return app