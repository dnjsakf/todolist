# api/__init__.py
import dotenv

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

from server.api.database import connect_db
from server.api.gql import schema


def create_app():
  app = Flask(__name__)

  CORS(app=app, resources={
    r"*": { "origin": "*" }
  })

  app.config.from_pyfile('config/flask.config.py')

  # /graphql EndPoint 설정
  app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
      'graphql',
      schema=schema,
      graphiql=True
    )
  )

  # MongoDB 접속 및 기초 데이터 입력
  MONGO_HOST=app.config.get("API_MONGO_URL")
  MONGO_DATABASE=app.config.get("API_MONGO_DATABASE")

  connect_db(MONGO_DATABASE, MONGO_HOST, mockup=True)

  return app