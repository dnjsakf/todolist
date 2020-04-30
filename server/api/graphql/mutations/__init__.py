# api/mutation.py
import graphene

from .TestMutation import (
  CreateRank,
  UpdateRank,
  DeleteRank,
  UploadFile
)

from .TodoMutation import (
  CreateTodoInfo
)

# Mutation Field 정의
class Mutation(graphene.ObjectType):
  create_rank = CreateRank.Field()
  update_rank = UpdateRank.Field()
  delete_rank = DeleteRank.Field()
  upload_file = UploadFile.Field()

  create_todo_info = CreateTodoInfo.Field()
  