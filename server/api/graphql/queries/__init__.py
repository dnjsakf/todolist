# api/query.pyf
from .CommonQuery import CommonCodeQuery
from .TestQuery import RankQuery, ModeQuery
from .TodoQuery import TodoItemInfoQuery

Inherits = [
  CommonCodeQuery,
  RankQuery,
  ModeQuery
]

class Query(*Inherits):
  pass