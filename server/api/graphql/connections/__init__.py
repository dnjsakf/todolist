# api/connections.py
import graphene

from graphene import relay
from graphene_mongo import MongoengineConnectionField

class CountableConnection(relay.Connection):
  class Meta:
    abstract = True

  total_count = graphene.Int()
  edge_count = graphene.Int()

  def resolve_total_count(root, info, **input):
    if root.total_count is not None:
      return root.total_count
    else:
      return root.iterable.count()
  
  def resolve_edge_count(root, info, **input):
    return len(root.edges)


class OrderedConnectionField(MongoengineConnectionField):
  def __init__(self, type, *args, **kwargs):
    kwargs.update({
      "get_queryset": self.get_queryset
    })
    super(OrderedConnectionField, self).__init__(type, *args, **kwargs)

  def get_queryset(cls, model, info, *args, **kwargs):
    if "orderBy" in kwargs:
      order = kwargs.pop("orderBy")
      return model.objects(**kwargs).order_by(*order)

    return model.objects(**kwargs)
    
