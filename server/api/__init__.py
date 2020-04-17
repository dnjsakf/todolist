# api/__init__.py
from flask_graphql import GraphQLView

from .database import connect_db
from .graphql import schema

# Add GraphQL plugin
def set_api_graphql(app):
  # MongoDB 접속 및 기초 데이터 입력
  MONGO_HOST=app.config.get("API_MONGO_URL")
  MONGO_DATABASE=app.config.get("API_MONGO_DATABASE")

  connect_db(MONGO_DATABASE, MONGO_HOST, init=True)
  
  # /graphql EndPoint 설정
  app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
      'graphql',
      schema=schema,
      graphiql=True
    )
  )
  