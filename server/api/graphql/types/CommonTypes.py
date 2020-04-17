# api/models.py
import datetime

from graphene import relay, Int, String, List
from graphene_mongo import MongoengineObjectType

from ..connections import CountableConnection
from ..models import CommonCodeModel, HierarchyCodeModel


# BaseType Object
class BaseType(MongoengineObjectType):
  class Meta:
    abstract = True
  
  # reg_dttm을 출력할 때, 처리하는 로직
  def resolve_reg_dttm(parent, info, **input):
    return datetime.datetime.strptime(parent.reg_dttm, "%Y%m%d%H%M%S").strftime("%Y-%m-%d %H:%M:%S")

  # upd_dttm을 출력할 때, 처리하는 로직
  def resolve_upd_dttm(parent, info, **input):
    if parent.upd_dttm is not None:
      return datetime.datetime.strptime(parent.upd_dttm, "%Y%m%d%H%M%S").strftime("%Y-%m-%d %H:%M:%S")
    else:
      return parent.upd_dttm
    

# CommonCode Object
class CommonCodeType(BaseType):
  class Meta:
    model = CommonCodeModel
  
# HierarchyCode Object
class HierarchyCodeType(BaseType):
  class Meta:
    model = HierarchyCodeModel
  