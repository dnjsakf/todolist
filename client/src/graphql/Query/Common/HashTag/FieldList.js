import gql from 'graphql-tag';

export default {
  GET_HASH_TAG_FIELDS: gql(`
  query getHashTagFields(
    $tag: String
  ){
    hash_tag_fields(
      tag: $tag
    ){
      id
      tag
      tag_name
      sort_order
      reg_dttm
      reg_user
      upd_dttm
      upd_user
    }
  }
  `),
}