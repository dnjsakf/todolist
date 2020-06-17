# server/api.py
import os

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

from server.api.database import connect_db
from server.api.gql import schema


def create_app(*args, **kwargs):
  APP_PATH = os.path.dirname(os.path.abspath(__file__))  
  ROOT_PATH = kwargs.get("ROOT_PATH", os.path.join(APP_PATH, "../../"))
  STATIC_PATH = kwargs.get("STATIC_PATH", os.path.join(ROOT_PATH, 'static'))
  TEMPLATE_PATH = os.path.join(APP_PATH, "templates")

  # Application
  app = Flask(
    __name__,
    static_url_path="/public/",
    static_folder=STATIC_PATH,
    template_folder=TEMPLATE_PATH
  )
  
  with app.app_context():
    # Set Configuration
    config_py = os.environ.get( "FLAKS_API_CONFIG_PY", None )
    if config_py is not None and os.path.exists( config_py ):
      app.config.from_pyfile( config_py )
    
    if "FILE_UPLOAD_PATH" not in app.config:
      app.config["FILE_UPLOAD_PATH"] = os.environ.get("FLASK_FILE_UPLOAD_PATH", STATIC_PATH)

    # Set GraphQL Middleware - /graphql EndPoint 설정
    app.add_url_rule(
      '/graphql',
      view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
      )
    )

    # Set CORS Middleware
    CORS(app=app, resources={
      r"*": { "origin": "*" }
    })
    
    # Set Routes
    from server.api import routes
    
    MONGO_HOST=os.environ.get("FLASK_API_MONGO_URL", app.config.get("API_MONGO_URL", None))
    MONGO_DATABASE=os.environ.get("FLASK_API_MONGO_DATABASE", app.config.get("API_MONGO_DATABASE", None))

    connect_db(MONGO_DATABASE, MONGO_HOST, mockup=True)
  
  return app