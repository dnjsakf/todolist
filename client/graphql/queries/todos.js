import gql from 'graphql-tag';

export const todoListQuery = gql(`
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