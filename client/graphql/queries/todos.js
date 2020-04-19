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