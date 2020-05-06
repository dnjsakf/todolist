# api/query.py
import graphene

from graphene_mongo import MongoengineConnectionField

from ..models import TodoInfoModel
from ..types import TodoInfoType
from ..connections import OrderedConnectionField


class TodoInfoQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  todo_info_edges = OrderedConnectionField(
    TodoInfoType
    , orderBy=graphene.List(graphene.String)
  )
  todo_info = graphene.Field(
    TodoInfoType,
    no=graphene.Int()
  )
  todo_info_list = graphene.List(
    TodoInfoType,
    user=graphene.String()
  )

  @classmethod
  def resolve_todo_info(cls, root, info, no):
    return TodoInfoModel.objects(no=no).first()

  @classmethod
  def resolve_todo_info_list(cls, root, info, **input):
    return TodoInfoModel.objects(**input).all()