/* React */
import React, { useState, useEffect } from 'react';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import CodeQuery from './../../../../../graphql/Query/Field/Code';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import BaseSelect from './../Base';


const useStyles = makeStyles(( theme ) => ({
  gridContainer: {
    height: 50
  }
}));

const CommonCodeSelect = ( props )=>{
  /* State */
  const classes = useStyles();

  /* React Hooks Methods 보다 밑에 있어야됨 */
  const { loading, error, data } = useQuery(
    CodeQuery.GET_COMMON_CODE, {
      skip: !props.code,
      variables: {
        code: props.code,
        order: [
          "sort_order"
        ]
      },
      onError(error){
        console.error( error );
      }
    }
  );

  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;

  return (
    <>
    {
      Array.isArray(data.common_code.sub_codes) && data.common_code.sub_codes.length > 0
      ? (
        <BaseSelect 
          label={ data.common_code.code_name}
          options={
            data.common_code.sub_codes.map(( sub )=>({
              id: sub.id,
              value: sub.code,
              label: sub.code_name
            }))
          }
          { ...props }
        />
        )
      : null
    }
    </>
  )
}

export default CommonCodeSelect;