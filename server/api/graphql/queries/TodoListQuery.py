# api/query.py
import graphene

from graphene_mongo import MongoengineConnectionField

from ..models import TodoListModel
from ..types import TodoListType
from ..connections import OrderedConnectionField


class TodoListQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  todo_list_edges = OrderedConnectionField(
    TodoListType
    , orderBy=graphene.List(graphene.String)
  )
  todo_list_field = graphene.Field(
    TodoListType,
    no=graphene.Int()
  )
  todo_list_fields = graphene.List(
    TodoListType,
    user=graphene.String()
  )

  @classmethod
  def resolve_todo_list_field(cls, root, info, no):
    return TodoListModel.objects(no=no).first()

  @classmethod
  def resolve_todo_list_fields(cls, root, info, **input):
    return TodoListModel.objects(**input).all()
    