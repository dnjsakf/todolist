# api/query.py
import graphene

from ..models import HashTagModel
from ..types import HashTagType

class HashTagQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  hash_tag_field = graphene.Field(
    HashTagType,
    tag=graphene.String()
  )
  hash_tag_fields = graphene.List(HashTagType)

  @classmethod
  def resolve_hash_tag_field(cls, root, info, tag):
    return HashTagModel.objects(tag=tag).first()

  @classmethod
  def resolve_hash_tag_fields(cls, root, info, **input):
    return HashTagModel.objects(**input).all()
    