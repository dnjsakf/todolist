# api/mutation.py
import graphene

from .TodoListMutation import (
  CreateTodoList
)

# Mutation Field 정의
class Mutation(graphene.ObjectType):
  create_todo_list = CreateTodoList.Field()
  