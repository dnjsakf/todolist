import gql from 'graphql-tag';

export const GET_TODO_INFO = gql(`
query getTodoInfo(
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
    status_codes {
      id
      full_code
      depth
      code
      code_name
      sub_codes {
        id
        full_code
        depth
        code
        code_name
      }
    }
    category_codes {
      id
      full_code
      depth
      code
      code_name
      sub_codes {
        id
        full_code
        depth
        code
        code_name
      }
    }
  }
}
`);