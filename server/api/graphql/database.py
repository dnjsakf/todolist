# api/datdabase.py
import datetime

from mongoengine import connect
from server.api.graphql.models import (
  RankModel, RankModeModel, # Tseter
  CommonCodeModel, UserModel, # Common
  TodoCateModel, TodoItemModel # Todo
)

MONGO_DTATBASE="graphql-example"
MONGO_HOST="mongomock://localhost"

# Database 연결
conn = connect(MONGO_DTATBASE, host=MONGO_HOST, alias="default")
print( conn.server_info() )

# 기초 데이터 Insert 함수
def init_db():
  reg_user = "admin"
  reg_dttm = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
      
  UserModel(email="admin@gmail.com", pwd="1234", name="admin", age=999, cell_phone="01012345678", reg_user=reg_user, reg_dttm=reg_dttm).save()
  UserModel(email="admin2@gmail.com", pwd="1234", name="admin2", age=999, cell_phone="01012345678", reg_user=reg_user, reg_dttm=reg_dttm).save()
  
  CommonCodeModel(code_grp="TODO_STATUS", code_value="FINISH", code_name="완료", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="WORKING", code_name="진행중", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="READY", code_name="대기", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="GIVE_UP", code_name="포기", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="CANCEL", code_name="취소", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="DELETE", code_name="삭제", reg_user=reg_user, reg_dttm=reg_dttm).save()
  
  TodoCateModel(cate_grp="WEB_DEVELOPMENT", cate_value="JAVA", cate_name="Java", reg_user=reg_user, reg_dttm=reg_dttm).save()
  TodoCateModel(cate_grp="WEB_DEVELOPMENT", cate_value="PYTHON", cate_name="Python", reg_user=reg_user, reg_dttm=reg_dttm).save()
  TodoCateModel(cate_grp="WEB_DEVELOPMENT", cate_value="JAVASCRIPT", cate_name="Javascript", reg_user=reg_user, reg_dttm=reg_dttm).save()

  TodoItemModel(
    title="ToDo List 만들기", 
    main_cate="WEB_DEVELOPMENT", 
    sub_cate=None,
    status="READY", 
    desc="나의 첫번째 ToDo List 만들기.",
    start_date=datetime.datetime.now().strftime("%Y%m%d"),
    due_date="20201231",
    working_day=None,
    reg_user=reg_user,
    reg_dttm=reg_dttm
  ).save()
  

  for idx in range(1, 5):
    mode = f"{ idx }x{ idx }"

    RankModeModel(
      mode=mode,
      reg_user=reg_user,
      reg_dttm=reg_dttm
    ).save()
  
    for idx in range(50):
      RankModel(
        name="heo",
        mode=mode,
        score=idx,
        is_mobile=False, 
        reg_user=reg_user,
        reg_dttm=reg_dttm
      ).save()