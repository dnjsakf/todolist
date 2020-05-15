import gql from 'graphql-tag';

export default {
  GET_COMMON_CODE: gql(`
  query getCommonCode(
    $code: String!
  ){
    common_code (
      code: $code
    ) {
      id
      full_code
      depth
      code
      code_name
      sub_codes {
        full_code
        depth
        id
        code
        code_name
      }
    }
  }
  `),
}