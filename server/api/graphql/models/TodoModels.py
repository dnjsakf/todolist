# api/models.py
from mongoengine.fields import (
  StringField, IntField, BooleanField, EmailField
)

from .CommonModels import BaseDocument

  
class TodoItemModel(BaseDocument):
  meta = {
    'collection': 'todo_item'
  }
  title = StringField(required=True)
  main_cate = StringField(required=True)
  sub_cate = StringField()
  
  status = StringField()
  desc = StringField()
  
  start_date = StringField()
  due_date = StringField()
  working_day = IntField()
  