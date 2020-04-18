# api/query.py
import graphene

from mongoengine import QuerySet
from graphene_mongo import MongoengineConnectionField

from ..models import CommonCodeModel, HierarchyCodeModel
from ..types import CommonCodeType, HierarchyCodeType

class CommonCodeQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  common_code_grp = graphene.List(
    CommonCodeType,
    code=graphene.String()
  )

  common_code = graphene.List(
    CommonCodeType,
    p_code=graphene.String(),
    code=graphene.String(),
    order=graphene.List(graphene.String)
  )

  # 공통 코드 그룹 목록 조회
  def resolve_common_code_grp(parent, info, **input):
    return CommonCodeModel.objects(p_code=None, **input).all()

  # 공통 코드 목록 조회
  def resolve_common_code(parent, info, p_code=None, code=None, order=list()):
    cond = dict()

    if p_code is not None:
      p_codes = p_code.split(":")
      
      p_model = None
      for _p_code in p_codes:
        p_cond = { "code": _p_code }

        if p_model is not None:
          p_cond["p_code"] = p_model

        p_model = CommonCodeModel.objects(**p_cond).first()
      
      cond["p_code"] = p_model

      if not p_model:
        return []
        
    if code is not None:
      cond["code"] = code

    return CommonCodeModel.objects(**cond).order_by(*order).all()