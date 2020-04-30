# api/models.py
import datetime

from graphene.relay import Node
from graphene_mongo import MongoengineObjectType

from .CommonTypes import BaseType
from ..models import TodoInfoModel

class TodoInfoType(BaseType):
  class Meta:
    model = TodoInfoModel
    interfaces = (Node, )