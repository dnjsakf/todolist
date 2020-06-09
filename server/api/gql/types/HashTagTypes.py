# api/models.py
import graphene
from graphene.relay import Node

from .CommonTypes import BaseType
from ..models import HashTagModel

class HashTagType(BaseType):
  class Meta:
    model = HashTagModel
    interfaces = (Node, )
