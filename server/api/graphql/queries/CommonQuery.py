# api/query.py
import graphene

from mongoengine import QuerySet
from graphene_mongo import MongoengineConnectionField

from ..models import CommonCodeModel
from ..types import CommonCodeType

class CommonCodeQuery(graphene.ObjectType):
  class Meta:
    abstract = True
    
  common_code_list = graphene.List(
    CommonCodeType,
    code=graphene.String(required=True),
    order=graphene.List(graphene.String)
  )

  common_code = graphene.Field(
    CommonCodeType,
    code=graphene.String(required=True)
  )

  # 공통 코드 목록 조회
  def resolve_common_code_list(parent, info, code, order=list()):

    codes = code.split(":")
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

    return CommonCodeModel.objects(**cond).order_by(*order).all()

  # 공통 코드 상세 조회
  def resolve_common_code(parent, info, code=None, **input):

    codes = code.split(":")
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


  