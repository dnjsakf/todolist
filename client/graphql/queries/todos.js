import gql from 'graphql-tag';


export const COMMON_CODE_LIST_QUERY = gql(`
query subCommonCodeListQuery(
  $p_code: String!,
  $p_order: [String]
  $code: String,
) {
  common_code_list(
    p_code: $p_code
    code: $code
    order: $p_order
  ) {
    id
    code
    code_name
    sub_codes {
      id
      code
      code_name
    }
  }
}
`);

export const COMMON_CODE_QUERY = gql(`
query commonCodeQuery(
  $p_code: String
  $code: String!
){
	common_code (
    p_code: $p_code
    code: $code
  ) {
    id
    code
    code_name
    sub_codes {
      id
      code
      code_name
    }
  }
}
`);

export const TODO_LIST_QUERY = gql(`
query ranking($mode: String, $order: [String], $count_for_rows: Int){
  modes(mode: $mode){
    id
    mode
    ranking(
      order: $order
      count_for_rows: $count_for_rows
    ) {
      edges {
        node {
          id
          mode
          name
          score
          is_mobile
          reg_dttm
        }
      }
    }
  }
}
`);


export const TODO_ITEM_QUERY = gql(`
query getTodoItem($id: String!){
  rank(id: $id){
    id
    name
    mode
    is_mobile
    score
    reg_dttm
    upd_dttm
  }
}
`);


export const CREATE_TODO_ITEM_QUERY = gql(`
mutation createTodoInfo(
  $title: String!,
  $main_cate: String!,
  $sub_cate: String,
  $status: String!,
  $desc: String,
  $due_date: String,
  $due_time: String
){
  create_todo_info(
    title: $title,
    main_cate: $main_cate,
    sub_cate: $sub_cate,
    status: $status,
    desc: $desc,
    due_date: $due_date,
    due_time: $due_time
  ){
    success
    todo_info {
     	title
      main_cate
      sub_cate
      status
      desc
      due_date
      due_time
      reg_user
      reg_dttm
    }
  }
}
`);