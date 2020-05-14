import gql from 'graphql-tag';

export default {
  GET_COMMON_CODE_LIST: gql(`
  query getCommonCodeList(
    $code: String!
    $order: [String]
  ) {
    common_code_list(
      code: $code
      order: $order
    ) {
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
  `),
}