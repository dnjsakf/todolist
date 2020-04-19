# api/query.py
import graphene

from graphene_mongo import MongoengineConnectionField

from ..models import TodoItemInfoModel
from ..types import TodoItemInfoType

class TodoItemInfoQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  todo_item_info_list = graphene.List(
    TodoItemInfoType,
    user=graphene.String()
  )

  @classmethod
  def resolve_todo_item_info_list(cls, root, info, **input):
    return TodoItemInfoModel.objects(**input).all()
