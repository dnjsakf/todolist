# api/schema.py
import graphene

from server.api.graphql.queries import Query
from server.api.graphql.mutations import Mutation
from server.api.graphql.types import (
  RankType, 
  RankModeType, 
  CommonCodeType, 
  TodoInfoType
)

# Schema 생성
schema = graphene.Schema(
  query=Query,
  mutation=Mutation,
  types=[
    RankType,
    RankModeType,
    CommonCodeType,
    TodoInfoType
  ],
  auto_camelcase=False
)