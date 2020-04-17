import gql from 'graphql-tag';


export const COMMON_CODE_QUERY = gql(`
query commonCodeQuery($code_grp: String!) {
  common_codes(code_grp: $code_grp){
    id
    code_grp
    code_value
    code_name
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