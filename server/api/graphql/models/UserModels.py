# api/models.py
from mongoengine import Document
from mongoengine.fields import (
  StringField, IntField, EmailField
)

class UserModel(Document):
  meta = {
    'collection': 'user_info'
  }
  email = EmailField(required=True, unique=True)
  pwd = StringField(required=True)
  name = StringField(required=True)
  age = IntField()
  cell_phone = StringField()