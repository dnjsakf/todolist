# api/models.py
from mongoengine import fields
from .CommonModels import BaseDocument

### HashTag 모델
class HashTagModel(BaseDocument):
  meta = {
    "collection": "hash_tags"
  }
  
  tag = fields.StringField(required=True, unique=True)
  tag_name = fields.StringField(required=True)