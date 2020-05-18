import gql from 'graphql-tag';

export const CREATE_TODO = gql(`
mutation createTodo(
  $title: String!
  $status: JSONString!
  $category: JSONString!
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