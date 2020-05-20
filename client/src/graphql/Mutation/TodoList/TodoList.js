import gql from 'graphql-tag';

export const CREATE_TODO = gql(`
mutation createTodo(
  $title: String!
  $status: JsonType!
  $category: JsonType!
  $due_date: String
  $due_time: String
  $description: String
  $star: Boolean
  $hash_tag: [InputHashTag]
){
  create_todo_list(
    title: $title
    status: $status
    category: $category
    due_date: $due_date
    due_time: $due_time
    description: $description
    star: $star
    hash_tag: $hash_tag
  ){
    success
    todo_list_field {
      no
     	title
      status
      category
      due_date
      due_time
      description
      star
      hash_tag {
        tag
        tag_name
      }
      reg_user
      reg_dttm
    }
  }
}
`);