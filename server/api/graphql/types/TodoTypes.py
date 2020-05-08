# api/models.py
import graphene
from graphene.relay import Node
from graphene.types import Scalar
from graphene_mongo import MongoengineObjectType

from .CommonTypes import BaseType, CommonCodeType
from ..models import TodoInfoModel, CommonCodeModel


class StringToJson(Scalar):
  @staticmethod
  def serialize( value ):
    return value

class TodoInfoType(BaseType):
  class Meta:
    model = TodoInfoModel
    interfaces = (Node, )

  category = graphene.Field(StringToJson)
  status = graphene.Field(StringToJson)

  category_codes = graphene.Field(CommonCodeType)
  status_codes = graphene.Field(CommonCodeType)

  def resolve_category_codes(parent, info, **input):
    codes = parent.category.get("p_code").split(":")
    p_codes = codes[:-1]
    code = codes[-1]

    p_model = None
    for p_code in p_codes:
      p_cond = { 
        "p_code": p_model if p_model is not None else None,
        "code": p_code
      }

      p_model = CommonCodeModel.objects(**p_cond).first()
    
    cond = {
      "p_code": p_model,
      "code": code
    }
    return CommonCodeModel.objects(**cond).first()

  def resolve_status_codes(parent, info, **input):
    codes = parent.status.get("p_code").split(":")
    p_codes = codes[:-1]
    code = codes[-1]

    p_model = None
    for p_code in p_codes:
      p_cond = { 
        "p_code": p_model if p_model is not None else None,
        "code": p_code
      }

      p_model = CommonCodeModel.objects(**p_cond).first()
    
    cond = {
      "p_code": p_model,
      "code": code
    }
    return CommonCodeModel.objects(**cond).first()