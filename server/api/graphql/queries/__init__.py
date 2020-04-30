# api/query.pyf
from graphene.relay import Node
from .CommonQuery import CommonCodeQuery
from .TestQuery import RankQuery, ModeQuery
from .TodoQuery import TodoInfoQuery

Inherits = [
  TodoInfoQuery,
  CommonCodeQuery,
  RankQuery,
  ModeQuery
]

class Query(*Inherits):
  node = Node.Field()
  pass