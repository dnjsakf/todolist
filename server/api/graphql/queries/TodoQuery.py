# api/query.py
import graphene

from graphene_mongo import MongoengineConnectionField

from ..models import TodoInfoModel
from ..types import TodoInfoType

class TodoInfoQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  todo = MongoengineConnectionField(TodoInfoType)
  todo_info = graphene.Field(TodoInfoType)
  todo_info_list = graphene.List(
    TodoInfoType,
    user=graphene.String()
  )

  @classmethod
  def resolve_todo_info(cls, root, info, **input):
    return TodoInfoModel.objects(**input).first()

  @classmethod
  def resolve_todo_info_list(cls, root, info, **input):
    return TodoInfoModel.objects(**input).all()
