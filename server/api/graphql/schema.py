# api/schema.py
import graphene

from server.api.graphql.query import Query
from server.api.graphql.mutation import Mutation
from server.api.graphql.types import RankType, RankModeType, CommonCodeType

# Schema 생성
schema = graphene.Schema(
  query=Query,
  mutation=Mutation,
  types=[
    RankType,
    RankModeType,
    CommonCodeType
  ],
  auto_camelcase=False
)