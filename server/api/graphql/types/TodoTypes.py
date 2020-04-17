# api/models.py
import datetime

from graphene_mongo import MongoengineObjectType

from .CommonTypes import BaseType
from ..models import TodoItemModel

class TodoItemType(BaseType):
  class Meta:
    model = TodoItemModel