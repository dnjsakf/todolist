/* React */
import React, { useState, useEffect } from 'react';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import { 
  COMMON_CODE_QUERY
} from './../../../../graphql/queries/todos';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import { BaseSelect } from '.';


const useStyles = makeStyles(( theme ) => ({
  gridContainer: {
    height: 50
  }
}));

const CommonCodeSelect = ( props )=>{
  /* State */
  const classes = useStyles();

  /* React Hooks Methods 보다 밑에 있어야됨 */
  const { loading, error, data } = useQuery(COMMON_CODE_QUERY, { variables: props.variables });

  if( loading ){
    return <span>Data Loadding...</span>;
  }
  if( error ) {
    console.error( error );
    return null;
  };

  return (
    <>
    {
      Array.isArray(data.common_code.sub_codes) && data.common_code.sub_codes.length > 0
      ? (
        <BaseSelect 
          { ...props }
          label={ data.common_code.code_name}
          options={
            data.common_code.sub_codes.map(( sub )=>({
              id: sub.id,
              value: sub.code,
              label: sub.code_name
            }))
          }
        />
        )
      : null
    }
    </>
  )
}

export default CommonCodeSelect;