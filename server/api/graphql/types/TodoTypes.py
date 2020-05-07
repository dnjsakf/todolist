# api/models.py
import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineObjectType

from .CommonTypes import BaseType, CommonCodeType
from ..models import TodoInfoModel, CommonCodeModel


class CategoryType(graphene.ObjectType):
  p_code = graphene.String()
  code = graphene.String()

class TodoInfoType(BaseType):
  class Meta:
    model = TodoInfoModel
    interfaces = (Node, )

    # exclude_fields = (
    #   "category"
    # )

  category_codes = graphene.Field(CommonCodeType)
  test = graphene.Field(CategoryType)

  def resolve_test(parent, info, **input):
    return CategoryType(p_code=parent.category.get("p_code"), code=parent.category.get("code"))
  
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
    return CommonCodeModel.objects(code=p_code).first()