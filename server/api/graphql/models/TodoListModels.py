# api/models.py
from mongoengine import fields
from .CommonModels import BaseDocument
from .HashTagModels import HashTagModel

### TodoList 정보 모델
class TodoListModel(BaseDocument):
  meta = {
    "collection": "todo_list"
  }
  no = fields.SequenceField(collection_name="todo_list")

  title = fields.StringField(required=True)
  status = fields.DictField(required=True)
  category = fields.DictField(required=True)
  
  due_date = fields.StringField()
  due_time = fields.StringField()
  
  description = fields.StringField()
  star = fields.BooleanField(default=False)

### TodoList 댓글 모델
class TodoListCommentModel(BaseDocument):
  meta = {
    "collection": "todo_list_comments"
  }
  
  todo_list = fields.ReferenceField("TodoListModel")

  commont = fields.StringField(required=True)
  good = fields.IntField(default_value=0)
  bad = fields.IntField(default_value=0)
  
  
### TodoList & HashTag Mapping 모델
class TodoListHashTagModel(BaseDocument):
  meta = {
    "collection": "todo_list_hash_tag_map"
  }
  
  todo_list = fields.ReferenceField("TodoListModel")
  hash_tag = fields.ReferenceField("HashTagModel")
  