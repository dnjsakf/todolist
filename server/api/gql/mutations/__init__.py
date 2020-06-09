# api/mutation.py
import graphene

from .TodoListMutation import (
  CreateTodoList,
  UpdateTodoList,
  DeleteTodoList
)

# Mutation Field 정의
class Mutation(graphene.ObjectType):
  create_todo_list = CreateTodoList.Field()
  update_todo_list = UpdateTodoList.Field()
  delete_todo_list = DeleteTodoList.Field()
  