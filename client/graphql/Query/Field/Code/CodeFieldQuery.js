import gql from 'graphql-tag';

export const GET_COMMON_CODE = gql(`
query getCommonCode(
  $code: String!
){
	common_code (
    code: $code
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