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
    UserModel, CommonCodeModel,
    TodoInfoModel
  )

  reg_user = "admin"
  reg_dttm = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
  
  ### 유저 데이터
  admin = UserModel(email="admin@gmail.com", pwd="1234", name="admin", age=999, cell_phone="01012345678").save()
  admin2 = UserModel(email="admin2@gmail.com", pwd="1234", name="admin2", age=999, cell_phone="01012345678").save()
  

  ### 공통코드 그룹 데이터
  todo_status = CommonCodeModel(code="TODO_STATUS", code_name="상태코드", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  todo_cate = CommonCodeModel(code="TODO_CATE", code_name="카테고리", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 공통코드 데이터 'TODO 상태'
  CommonCodeModel(p_code=todo_status, code="READY", code_name="대기", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(p_code=todo_status, code="WORKING", code_name="진행중", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(p_code=todo_status, code="FINISH", code_name="완료", sort_order=3, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(p_code=todo_status, code="GIVE_UP", code_name="포기", sort_order=4, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(p_code=todo_status, code="CANCEL", code_name="취소", sort_order=5, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(p_code=todo_status, code="DELETE", code_name="삭제", sort_order=6, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 공통코드 데이터 'TODO 카테고리'
  todo_cate_develop = CommonCodeModel(p_code=todo_cate, code="LANGUAGE", code_name="개발언어", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()

  CommonCodeModel(p_code=todo_cate_develop, code="JAVA", code_name="Java", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  todo_cate_develop_python = CommonCodeModel(p_code=todo_cate_develop, code="PYTHON", code_name="Python", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()
  todo_cate_develop_javascript = CommonCodeModel(p_code=todo_cate_develop, code="JAVASCRIPT", code_name="Javascript", sort_order=3, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 3 Depth 데이터
  todo_cate_develop_javascript_es6 = CommonCodeModel(p_code=todo_cate_develop_javascript, code="ES6", code_name="ES6", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(p_code=todo_cate_develop_python, code="PYTHON2", code_name="Python2", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(p_code=todo_cate_develop_python, code="PYTHON3", code_name="Python3", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 4 Depth 데이터
  CommonCodeModel(p_code=todo_cate_develop_javascript_es6, code="TEST", code_name="TEST", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()


  ### Todo 샘플 데이터
  TodoInfoModel(
    title="ToDo List 만들기", 
    main_cate="LANGUAGE",
    sub_cate="JAVA",
    status="READY", 
    desc="나의 첫번째 ToDo List 만들기.",
    due_date="20201231",
    due_time="000000",
    reg_user=reg_user,
    reg_dttm=reg_dttm
  ).save()
  

  ### 랭킹 테스트 데이터
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