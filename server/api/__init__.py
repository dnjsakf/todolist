# api/__init__.py
from flask_graphql import GraphQLView
from server.api.graphql.schema import schema
from server.api.graphql.database import init_db

# Add GraphQL plugin
def set_api_graphql(app):
  # MongoDB 접속 및 기초 데이터 입력
  init_db()
  
  # /graphql EndPoint 설정
  app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
      'graphql',
      schema=schema,
      graphiql=True   # GraphQL UI 제공
    )
  )
  