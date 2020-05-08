# api/query.pyf
from graphene.relay import Node
from .CommonQuery import CommonCodeQuery
from .TodoQuery import TodoInfoQuery

Inherits = [
  TodoInfoQuery,
  CommonCodeQuery,
]

class Query(*Inherits):
  node = Node.Field()
  pass