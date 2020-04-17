# api/models.py
from mongoengine import Document
from mongoengine.fields import (
  StringField, IntField, BooleanField, EmailField
)

class BaseDocument(Document):
  meta = {
    'allow_inheritance': True,
    'abstract': True
  }

  reg_user = StringField(required=True)
  reg_dttm = StringField(required=True)
  upd_user = StringField()
  upd_dttm = StringField()
  

  
class CommonCodeModel(BaseDocument):
  meta = {
    "collection": "common_code_mst"
  }
  code_grp = StringField(required=True, unique=True, unique_with='code_value')
  code_value = StringField(required=True)
  code_name = StringField(required=True)
  desc = StringField()
  
  
  
class TodoCateModel(BaseDocument):
  meta = {
    'collection': 'todo_cate'
  }
  cate_grp = StringField(required=True, unique=True, unique_with='cate_value')
  cate_value = StringField(required=True)
  cate_name = StringField(required=True)
  desc = StringField()
  

  
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


class UserModel(BaseDocument):
  meta = {
    'collection': 'user_info'
  }
  email = EmailField(required=True, unique=True)
  pwd = StringField(required=True)
  name = StringField(required=True)
  age = IntField()
  cell_phone = StringField()
  

  
  
  
  
  
  
  
  
  
  
  
  
  
'''
  Test Models
'''
class RankModeModel(BaseDocument):
  meta = {
    'collection': 'game_rank_modes'
  }
  mode = StringField(description='2048 grame mode.')


class RankModel(BaseDocument):
  meta = {
    'collection': 'game_ranking'
  }
  mode = StringField(description='2048 grame ranking.')
  name = StringField()
  score = IntField()
  is_mobile = BooleanField()