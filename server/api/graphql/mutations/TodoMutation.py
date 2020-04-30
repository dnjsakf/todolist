# api/mutation.py
import datetime
import graphene

from ..models import TodoInfoModel, UserModel
from ..types import TodoInfoType

from server.api.graphql.utils.decorators import session_user


class CreateTodoInfo(graphene.Mutation):  
  class Arguments:
    title = graphene.String(required=True)
    main_cate = graphene.String(required=True)
    sub_cate = graphene.String()

    status = graphene.String()
    desc = graphene.String()

    due_date = graphene.String()
    due_time = graphene.String()

  # 반환 Field 정의
  todo_info = graphene.Field(TodoInfoType)
  success = graphene.Boolean()
  
  @session_user
  def mutate(root, info, user, **input):
    model = TodoInfoModel(
      title=input.get("title"),
      main_cate=input.get("title"),
      sub_cate=input.get("sub_cate"),
      status=input.get("status"),
      desc=input.get("desc"),
      due_date=input.get("due_date"),
      due_time=input.get("due_time"),
      reg_user=user.name,
      reg_dttm=datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    ).save()
    
    return CreateTodoInfo(
      todo_info=model,
      success=True
    )