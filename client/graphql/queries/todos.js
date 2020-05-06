import gql from 'graphql-tag';


/**
 * DETAIL
 */
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

export const TODO_INFO_QUERY = gql(`
query todoInfoQuery(
  $no: Int!
){
  todo_info(
    no: $no
  ){
    id
    no
    title
    desc
    main_cate
    sub_cate
    status
    star
    due_date
    due_time
    sort_order
    reg_user
    reg_dttm
    upd_user
    upd_dttm
  }
}
`);


/**
 * LIST
 */
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

export const TODO_LIST_QUERY = gql(`
query rankingQuery(
  $mode: String, 
  $order: [String], 
  $count_for_rows: Int
){
  modes(
    mode: $mode
  ){
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


/**
 * EDGES
 */
export const TODO_INFO_EDGES_QUERY = gql(`
query todoInfoEdgesQuery(
  $first: Int,
  $last: Int,
  $before: String,
  $after: String,
  $orderBy: [String]
) {
  todo_info_edges(
    first: $first,
    last: $last,
    before: $before,
    after: $after,
    orderBy: $orderBy
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        no
        title
        main_cate
        sub_cate
        status
        star
        due_date
        due_time
        sort_order
        reg_user
        reg_dttm
        upd_user
        upd_dttm
      }
    }
  }
}
`)



/**
 * CRUD
 */
export const CREATE_TODO_INFO_QUERY = gql(`
mutation createTodoInfoMutation(
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
      no
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