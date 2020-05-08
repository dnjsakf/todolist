# api/mutation.py
import graphene

from .TodoMutation import (
  CreateTodoInfo
)

# Mutation Field 정의
class Mutation(graphene.ObjectType):
  create_todo_info = CreateTodoInfo.Field()
  