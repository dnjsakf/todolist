/* React */
import React, { useCallback } from 'react';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import { BaseSelect } from '.';


const useStyles = makeStyles(( theme ) => ({
  gridContainer: {
    height: 50
  }
}));

const QueryBaseSelect = ( props )=>{
  /* State */
  const classes = useStyles();

  /* React Hooks Methods 보다 밑에 있어야됨 */
  const { loading, error, data } = useQuery(props.query, { variables: props.variables });

  if( loading ) return null;
  if( error ) {
    console.error( error );
    return null;
  };

  return (
    <>
      { /* 상위 카테고리 */
        Array.isArray(data.common_code.sub_codes) && data.common_code.sub_codes.length > 0
        ? (
          <BaseSelect
            parent={ props.parent }
            id={ props.id }
            name={ props.name }
            label={ data.common_code.code_name }
            options={
              data.common_code.sub_codes.map(( sub )=>({
                id: sub.id,
                value: sub.code,
                label: sub.code_name
              }))
            }
            defaultValue={ props.defaultValue }
            required={ props.required }
          />
          )
        : null
      }
    </>
  )
}

export default QueryBaseSelect;