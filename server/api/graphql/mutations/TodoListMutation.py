# api/mutation.py
import graphene
import datetime
import json

from ..models import TodoListModel, HashTagModel, TodoListHashTagModel
from ..types import TodoListType, HashTagType

from server.api.graphql.utils.decorators import session_user


class JsonType(graphene.types.json.JSONString):
  @staticmethod
  def parse_value(value):
    return value
    
class InputHashTag(graphene.InputObjectType):
  tag = graphene.String()
  tag_name = graphene.String()

class CreateTodoList(graphene.Mutation):  
  class Arguments:
    title = graphene.String(required=True)
    status = JsonType(required=True)
    category = JsonType(required=True)

    due_date = graphene.String()
    due_time = graphene.String()

    description = graphene.String()
    star = graphene.Boolean()
    
    hash_tag = graphene.List(InputHashTag)

  # 반환 Field 정의
  todo_list_field = graphene.Field(TodoListType)
  success = graphene.Boolean()
  
  @session_user
  def mutate(root, info, user, **input):
    todo_list_model = TodoListModel(
      title=input.get("title"),
      status=input.get("status"),
      category=input.get("category"),
      description=input.get("description"),
      due_date=input.get("due_date"),
      due_time=input.get("due_time"),
      star=input.get("star"),
      reg_user=user.name,
      reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    ).save()
    
    hash_tag_items = input.get("hash_tag", None)
    if hash_tag_items is not None:
      _models = []
      for item in hash_tag_items:
        hash_tag_model = HashTagModel.objects(tag=item.tag).first()
        
        if hash_tag_model is None: # Insert
          hash_tag_model = HashTagModel(
            tag=item.tag,
            tag_name=item.tag_name,
            reg_user=user.name,
            reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
          ).save()
          
        TodoListHashTagModel(
          todo_list=todo_list_model,
          hash_tag=hash_tag_model,
          reg_user=user.name,
          reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        ).save() 
    
    return CreateTodoList(
      todo_list_field=todo_list_model,
      success=True
    )