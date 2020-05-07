# api/models.py
from mongoengine import fields
from .CommonModels import BaseDocument

### ToDo 정보 모델
class TodoInfoModel(BaseDocument):
  meta = {
    "collection": "todo_info"
  }
  no = fields.SequenceField(collection_name="todo_info")

  title = fields.StringField(required=True)
  status = fields.DictField(required=True)
  category = fields.DictField(required=True)
  
  due_date = fields.StringField()
  due_time = fields.StringField()
  
  description = fields.StringField()
  star = fields.BooleanField(default=False)


### ToDo 댓글 모델
class TodoCommentModel(BaseDocument):
  meta = {
    "collection": "todo_comments"
  }
  
  todo_info = fields.ReferenceField("TodoInfoModel")

  commont = fields.StringField(required=True)
  good = fields.IntField(default_value=0)
  bad = fields.IntField(default_value=0)
  