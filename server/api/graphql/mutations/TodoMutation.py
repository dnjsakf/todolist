# api/mutation.py
import datetime
import graphene

from ..models import TodoInfoModel, UserModel
from ..types import TodoInfoType

from server.api.graphql.utils.decorators import session_user


class CreateTodoInfo(graphene.Mutation):  
  class Arguments:
    title = graphene.String(required=True)
    status = graphene.JSONString(required=True)
    category = graphene.JSONString(required=True)

    due_date = graphene.String()
    due_time = graphene.String()

    description = graphene.String()
    star = graphene.Boolean()

  # 반환 Field 정의
  todo_info = graphene.Field(TodoInfoType)
  success = graphene.Boolean()
  
  @session_user
  def mutate(root, info, user, **input):
    model = TodoInfoModel(
      title=input.get("title"),
      status=input.get("status"),
      category=input.get("category"),
      description=input.get("description"),
      due_date=input.get("due_date"),
      due_time=input.get("due_time"),
      star=input.get("start"),
      reg_user=user.name,
      reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    ).save()
    
    return CreateTodoInfo(
      todo_info=model,
      success=True
    )