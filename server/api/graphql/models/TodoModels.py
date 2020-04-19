# api/models.py
from mongoengine.fields import (
  StringField, IntField, ReferenceField
)

from .CommonModels import BaseDocument

### ToDo 정보 모델
class TodoItemInfoModel(BaseDocument):
  meta = {
    'collection': 'todo_item_info'
  }

  title = StringField(required=True)
  main_cate = StringField(required=True)
  sub_cate = StringField()
  
  status = StringField()
  desc = StringField()
  
  start_date = StringField()
  due_date = StringField()
  working_day = IntField()


### ToDo 댓글 모델
class TodoItemComments(BaseDocument):
  meta = {
    'collection': 'todo_item_comments'
  }
  
  todo_item = ReferenceField(TodoItemInfoModel)

  commont = StringField(required=True)
  good = IntField(default_value=0)
  bad = IntField(default_value=0)
  