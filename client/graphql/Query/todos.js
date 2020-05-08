import gql from 'graphql-tag';

/**
 * DETAIL
 */
export const COMMON_CODE_QUERY = gql(`
query commonCodeQuery(
  $code: String!
){
	common_code (
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
    status
    category
    due_date
    due_time
    description
    star
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
query commonCodeListQuery(
  $code: String!
  $order: [String]
) {
  common_code_list(
    code: $code
    order: $order
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


/**
 * EDGES
 */
export const TODO_INFO_EDGES_QUERY = gql(`
query todoInfoEdgesQuery(
  $first: Int
  $last: Int
  $before: String
  $after: String
  $orderBy: [String]
) {
  todo_info_edges(
    first: $first
    last: $last
    before: $before
    after: $after
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
        status
        category
        due_date
        due_time
        star
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
  $title: String!
  $status: JsonString!
  $category: JsonString!
  $due_date: String
  $due_time: String
  $description: String
  $star: Boolean
){
  create_todo_info(
    title: $title
    status: $status
    category: $category
    due_date: $due_date
    due_time: $due_time
    description: $description
    star: $star
  ){
    success
    todo_info {
      no
     	title
      status
      category
      due_date
      due_time
      description
      reg_user
      reg_dttm
    }
  }
}
`);