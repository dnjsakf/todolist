import gql from 'graphql-tag';

export const GET_TODO_EDGES = gql(`
query getTodoEdges(
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