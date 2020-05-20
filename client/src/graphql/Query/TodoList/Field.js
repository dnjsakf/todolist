import gql from 'graphql-tag';


export default {
  GET_TODO_LIST_FIELD: gql(`
  query getTodoListField(
    $no: Int!
  ){
    todo_list_field(
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
      hash_tag {
        id
        tag
        tag_name
      }
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
  `),
}