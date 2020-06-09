# api/schema.py
import graphene

from .queries import Query
from .mutations import Mutation
from .types import (
  CommonCodeType, 
  TodoListType,
  HashTagType
)

# Schema 생성
schema = graphene.Schema(
  query=Query,
  mutation=Mutation,
  types=[
    CommonCodeType,
    TodoListType,
    HashTagType
  ],
  auto_camelcase=False
)