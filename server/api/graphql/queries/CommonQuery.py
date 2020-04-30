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
    p_code=graphene.String(),
    code=graphene.String(),
    order=graphene.List(graphene.String)
  )

  common_code = graphene.Field(
    CommonCodeType,
    p_code=graphene.String(),
    code=graphene.String(default_value=None)
  )

  # 공통 코드 목록 조회
  def resolve_common_code_list(parent, info, order=list(), **input):
    cond = dict()

    if 'p_code' in input:
      p_codes = input.get('p_code').split(":")
      
      p_model = None
      for _p_code in p_codes:
        p_cond = { "code": _p_code }

        if p_model is not None:
          p_cond["p_code"] = p_model

        p_model = CommonCodeModel.objects(**p_cond).first()
      
      cond["p_code"] = p_model

      if not p_model:
        return []

    if 'code' in input:
      cond["code"] = input.get('code')

    return CommonCodeModel.objects(**cond).order_by(*order).all()

  # 공통 코드 상세 조회
  def resolve_common_code(parent, info, code=None, **input):
    cond = dict()

    if 'p_code' in input:
      p_codes = input.get('p_code').split(":")
      
      p_model = None
      for _p_code in p_codes:
        p_cond = { "code": _p_code }

        if p_model is not None:
          p_cond["p_code"] = p_model

        p_model = CommonCodeModel.objects(**p_cond).first()

      p_code = p_model

    return CommonCodeModel.objects(**cond, code=code).first()


  