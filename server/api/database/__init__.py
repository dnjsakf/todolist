# api/datdabase.py
from mongoengine import connect

# Database Connection 함수
def connect_db(database, host, init=False, **kwargs):
  connect(database, host=host, alias="default")

  if init == True: init_db()

# 기초 데이터 Insert 함수
def init_db():
  import datetime
  from server.api.graphql.models import (
    RankModel, RankModeModel,
    UserModel, HierarchyCodeModel, CommonCodeModel,
    TodoItemModel
  )

  reg_user = "admin"
  reg_dttm = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
      
  UserModel(email="admin@gmail.com", pwd="1234", name="admin", age=999, cell_phone="01012345678", reg_user=reg_user, reg_dttm=reg_dttm).save()
  UserModel(email="admin2@gmail.com", pwd="1234", name="admin2", age=999, cell_phone="01012345678", reg_user=reg_user, reg_dttm=reg_dttm).save()
  
  CommonCodeModel(code_grp="TODO_STATUS", code="FINISH", code_name="완료", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code="WORKING", code_name="진행중", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code="READY", code_name="대기", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code="GIVE_UP", code_name="포기", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code="CANCEL", code_name="취소", reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code="DELETE", code_name="삭제", reg_user=reg_user, reg_dttm=reg_dttm).save()

  HierarchyCodeModel(code="DEVELOPMENT", code_name="개발", is_top=True, reg_user=reg_user, reg_dttm=reg_dttm).save()

  HierarchyCodeModel(p_code="DEVELOPMENT", p_code_name="개발", code="JAVA", code_name="Java", reg_user=reg_user, reg_dttm=reg_dttm).save()
  HierarchyCodeModel(p_code="DEVELOPMENT", p_code_name="개발", code="PYTHON", code_name="Python", reg_user=reg_user, reg_dttm=reg_dttm).save()
  HierarchyCodeModel(p_code="DEVELOPMENT", p_code_name="개발", code="JAVASCRIPT", code_name="Javascript", reg_user=reg_user, reg_dttm=reg_dttm).save()

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