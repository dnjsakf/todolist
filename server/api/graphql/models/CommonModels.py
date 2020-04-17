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
  code_grp = StringField(required=True, unique=True, unique_with='code')
  code = StringField(required=True)
  code_name = StringField(required=True)
  desc = StringField()
  
  
class HierarchyCodeModel(BaseDocument):
  meta = {
    'collection': 'hierarcy_code_mst'
  }

  code=StringField(required=True)
  code_name=StringField(required=True)

  p_code=StringField()
  p_code_name=StringField()

  is_top = BooleanField(default_value=False)

  full_code=StringField()

  desc = StringField()
  

class UserModel(BaseDocument):
  meta = {
    'collection': 'user_info'
  }
  email = EmailField(required=True, unique=True)
  pwd = StringField(required=True)
  name = StringField(required=True)
  age = IntField()
  cell_phone = StringField()