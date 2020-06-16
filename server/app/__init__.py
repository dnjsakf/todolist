# server/app/__init__.py
import os

from flask import Flask
from flask_cors import CORS

def create_app(*args, **kwargs):
  # Application
  app = Flask(
    __name__,
    static_url_path="/public/",
    static_folder="../../client/dist",
    template_folder="templates"
  )

  with app.app_context():
    # Set Configuration
    config_py = os.environ.get( "FLAKS_APP_CONFIG_PY" )
    if config_py is not None and os.path.exists( config_py ):
      app.config.from_pyfile(config_py)
    
    # Set CORS Middleware
    CORS(app=app, resources={
      r"*": { "origin": "*" }
    })
    
    # Set Routes
    from server.app import routes
  
  return app