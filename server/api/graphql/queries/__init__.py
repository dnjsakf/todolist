# api/query.py
from .TestQuery import RankQuery, ModeQuery
from .TodoQuery import *

class Query(RankQuery, ModeQuery):
  pass