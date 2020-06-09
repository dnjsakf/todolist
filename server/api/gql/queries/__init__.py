# api/query.pyf
from graphene.relay import Node
from .CommonQuery import CommonCodeQuery
from .TodoListQuery import TodoListQuery
from .HashTagQuery import HashTagQuery

Inherits = [
  CommonCodeQuery,
  HashTagQuery,
  TodoListQuery,
]

class Query(*Inherits):
  node = Node.Field()
  pass