# api/mutation.py
import graphene
import datetime
import json

from ..models import TodoListModel, HashTagModel, TodoListHashTagModel
from ..types import TodoListType, HashTagType

from ..utils.decorators import session_user

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
    
    #hash_tag = graphene.List(InputHashTag)
    hash_tags = graphene.List(graphene.String)

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
      hash_tags=input.get("hash_tags"),
      reg_user=user.name,
      reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    ).save()
    
    hash_tags = input.get("hash_tags", None)
    if hash_tags is not None:
      _models = []
      for hash_tag in hash_tags:
        hash_tag_model = HashTagModel.objects(tag=hash_tag).first()
        
        if hash_tag_model is None: # Insert
          hash_tag_model = HashTagModel(
            tag=hash_tag,
            tag_name=hash_tag,
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

class UpdateTodoList(graphene.Mutation):  
  class Arguments:
    no = graphene.Int(required=True)

    title = graphene.String(required=True)
    status = JsonType(required=True)
    category = JsonType(required=True)

    due_date = graphene.String()
    due_time = graphene.String()

    description = graphene.String()
    star = graphene.Boolean()
    
    #hash_tag = graphene.List(InputHashTag)
    hash_tags = graphene.List(graphene.String)

  # 반환 Field 정의
  success = graphene.Boolean()
  
  @session_user
  def mutate(root, info, user, no, **input):
    todo_list_model = TodoListModel.objects(no=no).first()

    updated = TodoListModel.objects(no=no).update(
      set__title=input.get("title"),
      set__status=input.get("status"),
      set__category=input.get("category"),
      set__description=input.get("description"),
      set__due_date=input.get("due_date"),
      set__due_time=input.get("due_time"),
      set__star=input.get("star"),
      set__hash_tags=input.get("hash_tags"),
      set__upd_user=user.name,
      set__upd_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
    )
    
    hash_tags = input.get("hash_tags", None)
    if hash_tags is not None:
      _models = []

      TodoListHashTagModel.objects(todo_list=todo_list_model).delete()

      for hash_tag in hash_tags:
        hash_tag_model = HashTagModel.objects(tag=hash_tag).first()
        
        if hash_tag_model is None: # Insert
          hash_tag_model = HashTagModel(
            tag=hash_tag,
            tag_name=hash_tag,
            reg_user=user.name,
            reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
          ).save()

        TodoListHashTagModel(
          todo_list=todo_list_model,
          hash_tag=hash_tag_model,
          reg_user=user.name,
          reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        ).save()

    print( updated )
    
    return UpdateTodoList(
      success=bool(updated)
    )
    
    
class DeleteTodoList(graphene.Mutation):  
  class Arguments:
    no = graphene.Int(required=True)

  # 반환 Field 정의
  success = graphene.Boolean()
  
  @session_user
  def mutate(root, info, user, no, **input):
    deleted = TodoListModel.objects(no=no).delete()
    
    #deleted = TodoListHashTagModel.objects(todo_list=todo_list_model).delete()

    return DeleteTodoList(
      success=bool(deleted)
    )