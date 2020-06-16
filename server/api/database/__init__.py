# api/datdabase.py
from mongoengine import connect

connection = None

# Database Connection 함수
def connect_db(database, host, mockup=False, **kwargs):
  global connection

  if connection is None:
    connection = connect(database, host=host, alias="default")

    if mockup == True: 
      init_mockup()

# 기초 데이터 Insert 함수
def init_mockup():
  import datetime
  from server.api.gql.models import (
    UserModel,
    CommonCodeModel,
    TodoListModel,
    HashTagModel,
    TodoListHashTagModel
  )

  reg_user = "admin"
  # reg_dttm = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
  reg_dttm = "20200513000000"
  
  ### 유저 데이터
  admin = UserModel(email="admin@gmail.com", pwd="1234", name="admin", age=999, cell_phone="01012345678").save()
  admin2 = UserModel(email="admin2@gmail.com", pwd="1234", name="admin2", age=999, cell_phone="01012345678").save()
  

  ### 공통코드 그룹 데이터
  todo_status = CommonCodeModel(full_code="TODO_STATUS", depth=1, code="TODO_STATUS", code_name="상태코드", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  todo_cate = CommonCodeModel(full_code="TODO_CATE", depth=1, code="TODO_CATE", code_name="카테고리", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 공통코드 데이터 'TODO 상태'
  CommonCodeModel(full_code="TODO_STATUS:READY", depth=2, p_code=todo_status, code="READY", code_name="대기", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(full_code="TODO_STATUS:WORKING", depth=2, p_code=todo_status, code="WORKING", code_name="진행중", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(full_code="TODO_STATUS:FINISH", depth=2, p_code=todo_status, code="FINISH", code_name="완료", sort_order=3, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(full_code="TODO_STATUS:GIVE_UP", depth=2, p_code=todo_status, code="GIVE_UP", code_name="포기", sort_order=4, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(full_code="TODO_STATUS:CANCEL", depth=2, p_code=todo_status, code="CANCEL", code_name="취소", sort_order=5, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(full_code="TODO_STATUS:DELETE", depth=2, p_code=todo_status, code="DELETE", code_name="삭제", sort_order=6, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 공통코드 데이터 'TODO 카테고리'
  todo_cate_develop = CommonCodeModel(full_code="TODO_CATE:LANGUAGE", depth=2, p_code=todo_cate, code="LANGUAGE", code_name="개발언어", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()

  CommonCodeModel(full_code="TODO_CATE:LANGUAGE:JAVA", depth=3, p_code=todo_cate_develop, code="JAVA", code_name="Java", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  todo_cate_develop_python = CommonCodeModel(full_code="TODO_CATE:LANGUAGE:PYTHON", depth=3, p_code=todo_cate_develop, code="PYTHON", code_name="Python", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()
  todo_cate_develop_javascript = CommonCodeModel(full_code="TODO_CATE:LANGUAGE:JAVASCRIPT", depth=3, p_code=todo_cate_develop, code="JAVASCRIPT", code_name="Javascript", sort_order=3, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 3 Depth 데이터
  todo_cate_develop_javascript_es6 = CommonCodeModel(full_code="TODO_CATE:LANGUAGE:JAVASCRIPT:ES6", depth=4, p_code=todo_cate_develop_javascript, code="ES6", code_name="ES6", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(full_code="TODO_CATE:LANGUAGE:PYTHON:PYTHON2", depth=4, p_code=todo_cate_develop_python, code="PYTHON2", code_name="Python2", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  CommonCodeModel(full_code="TODO_CATE:LANGUAGE:PYTHON:PYTHON3", depth=4, p_code=todo_cate_develop_python, code="PYTHON3", code_name="Python3", sort_order=2, reg_user=reg_user, reg_dttm=reg_dttm).save()

  ### 4 Depth 데이터
  CommonCodeModel(full_code="TODO_CATE:LANGUAGE:JAVASCRIPT:ES6:TEST", depth=5, p_code=todo_cate_develop_javascript_es6, code="TEST", code_name="TEST", sort_order=1, reg_user=reg_user, reg_dttm=reg_dttm).save()
  
  ### HashTag 데이터
  # hash_1 = HashTagModel(tag="개발", tag_name="개발", reg_user=reg_user, reg_dttm=reg_dttm)
  # hash_2 = HashTagModel(tag="투두리스트", tag_name="투두리스트", reg_user=reg_user, reg_dttm=reg_dttm)
  # hash_3 = HashTagModel(tag="파이썬", tag_name="파이썬", reg_user=reg_user, reg_dttm=reg_dttm)
  # hash_4 = HashTagModel(tag="graphQL", tag_name="graphQL", reg_user=reg_user, reg_dttm=reg_dttm)
  # hash_5 = HashTagModel(tag="몽고DB", tag_name="몽고DB", reg_user=reg_user, reg_dttm=reg_dttm)
  # hash_6 = HashTagModel(tag="React", tag_name="React", reg_user=reg_user, reg_dttm=reg_dttm)
  
  # HashTagModel.objects.insert([ hash_1, hash_2, hash_3, hash_4, hash_5, hash_6 ])
  
  ### Todo 샘플 데이터
  for idx in range(1, 51):

    reg_dttm = (datetime.datetime.now() - datetime.timedelta(days=idx)).strftime("%Y%m%d%H%M%S")
    hash_tags = [ "개발", "투두리스트", "ToDo", "List", "만들기", f"{ idx }" ]

    todo_list = TodoListModel(
      title=f"ToDo List 만들기 { idx }",
      status={
        "p_code": "TODO_STATUS",
        "code": "READY"
      },
      category={
        "p_code": "TODO_CATE:LANGUAGE:PYTHON",
        "code": "PYTHON3"
      },
      due_date=(datetime.datetime.now() + datetime.timedelta(days=idx)).strftime("%Y%m%d"),
      due_time="000000",
      description="ToDoList MockUp Data",
      star=True,
      
      hash_tags=hash_tags,
      
      reg_user=reg_user,
      reg_dttm=reg_dttm
    ).save()

    for tag in hash_tags:
      hash_tag = HashTagModel.objects(tag=tag).first()
      
      if hash_tag is None:
        hash_tag = HashTagModel(tag=tag, tag_name=tag, reg_user=reg_user, reg_dttm=reg_dttm).save()
      else:
        hash_tag.update(set__upd_user=reg_user, set__upd_dttm=reg_dttm)
        hash_tag = HashTagModel.objects(tag=tag).first()

      TodoListHashTagModel(
        todo_list=todo_list,
        hash_tag=hash_tag,
        reg_user=reg_user,
        reg_dttm=reg_dttm
      ).save()

  