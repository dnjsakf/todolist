# api/models.py
from mongoengine import Document
from mongoengine.fields import (
  StringField, IntField, BooleanField
)

from .CommonModels import BaseDocument
  
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