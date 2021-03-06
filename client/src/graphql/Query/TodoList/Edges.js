import gql from 'graphql-tag';

export default {
  GET_TODO_LIST_EDGES: gql(`
  query getTodoListEdges(
    $first: Int
    $last: Int
    $before: String
    $after: String
    
    $title: String
    $hash_tags: String

    $orderBy: [String]
  ) {
    todo_list_edges(
      first: $first
      last: $last
      before: $before
      after: $after

      title: $title
      hash_tags: $hash_tags

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
          description
          star
          hash_tags
          sort_order
          reg_user
          reg_dttm
          upd_user
          upd_dttm
        }
      }
    }
  }
  `),
  
}