# api/models.py
from mongoengine import Document, EmbeddedDocument
from mongoengine.fields import (
  StringField, IntField, BooleanField, EmailField, 
  ListField, ReferenceField, LazyReferenceField
)

class BaseDocument(Document):
  meta = {
    'allow_inheritance': True,
    'abstract': True
  }

  sort_order = IntField()

  reg_user = StringField(required=True)
  reg_dttm = StringField(required=True)
  upd_user = StringField()
  upd_dttm = StringField()
  
class UserModel(Document):
  meta = {
    'collection': 'user_info'
  }
  email = EmailField(required=True, unique=True)
  pwd = StringField(required=True)
  name = StringField(required=True)
  age = IntField()
  cell_phone = StringField()

class CommonCodeModel(BaseDocument):
  meta = {
    "collection": "common_code_mst"
  }
  p_code = ReferenceField('self')

  full_code = StringField(required=True)
  depth = IntField(required=True)
  code = StringField(required=True, unique=True)
  code_name = StringField(required=True)
  

  desc = StringField()
