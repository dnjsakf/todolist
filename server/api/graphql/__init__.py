# api/schema.py
import graphene

from server.api.graphql.queries import Query
from server.api.graphql.mutations import Mutation
from server.api.graphql.types import (
  CommonCodeType, 
  TodoInfoType
)

# Schema 생성
schema = graphene.Schema(
  query=Query,
  mutation=Mutation,
  types=[
    CommonCodeType,
    TodoInfoType
  ],
  auto_camelcase=False
)