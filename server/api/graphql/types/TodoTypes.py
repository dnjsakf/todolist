# api/models.py
import datetime

from graphene_mongo import MongoengineObjectType

from .CommonTypes import BaseType
from ..models import TodoItemInfoModel

class TodoItemInfoType(BaseType):
  class Meta:
    model = TodoItemInfoModel
