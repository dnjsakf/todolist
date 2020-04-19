# api/query.pyf
from .CommonQuery import CommonCodeQuery
from .TestQuery import RankQuery, ModeQuery
from .TodoQuery import TodoItemInfoQuery

Inherits = [
  TodoItemInfoQuery,
  CommonCodeQuery,
  RankQuery,
  ModeQuery
]

class Query(*Inherits):
  pass