import gql from 'graphql-tag';

export const GET_COMMON_CODE_LIST = gql(`
query getCommonCodeList(
  $code: String!
  $order: [String]
) {
  common_code_list(
    code: $code
    order: $order
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