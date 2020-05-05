# api/models.py
from mongoengine.fields import (
  StringField, IntField, ReferenceField, SequenceField, BooleanField
)

from .CommonModels import BaseDocument

### ToDo 정보 모델
class TodoInfoModel(BaseDocument):
  meta = {
    "collection": "todo_info"
  }
  no = SequenceField(collection_name="todo_info")

  title = StringField(required=True)
  main_cate = StringField(required=True)
  sub_cate = StringField()
  
  status = StringField()
  desc = StringField()

  star = BooleanField(default=False)
  
  due_date = StringField()
  due_time = StringField()


### ToDo 댓글 모델
class TodoCommentModel(BaseDocument):
  meta = {
    "collection": "todo_comments"
  }
  
  todo_info = ReferenceField("TodoInfoModel")

  commont = StringField(required=True)
  good = IntField(default_value=0)
  bad = IntField(default_value=0)
  