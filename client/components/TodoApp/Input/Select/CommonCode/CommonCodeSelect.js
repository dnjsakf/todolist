/* React */
import React, { useState, useEffect, useCallback } from 'react';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import CommonCodeQuery from './../../../../../graphql/Query/Field/CommonCode';
import CommonCodeListQuery from './../../../../../graphql/Query/List/CommonCode';

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

  const [ fullCode, setFullCode ] = useState( props.code );
  const { loading, error, data, fetchMore } = useQuery(
    CommonCodeQuery.GET_COMMON_CODE, {
      skip: !props.code,
      variables: {
        code: props.code,
        order: [
          "sort_order"
        ]
      },
      onError(error){
        console.error( error );
      },
      onCompleted(data){
        console.log("[completed]", data);
      }
    }
  );


  const handleSelect = useCallback((event)=>{
    const code = event.target.value;
    
    let full_code = fullCode.split(":");
    if( !code || code == 0 || code == "" ){
      if( full_code.length > 1 ){
        full_code = full_code.slice(0, -1);
      }
    } else {
      if ( full_code.length > 0 && full_code[full_code.length-1] !== code ) {
        full_code = full_code.concat( code );
      }
    }
    full_code = full_code.join(":");

    console.log( code, full_code );
    
    setFullCode(full_code);

    fetchMore({
      variables: {
        code: full_code
      },
      updateQuery: ( prev, { fetchMoreResult: { common_code } })=>{
        console.log( common_code );
        if( !common_code || !common_code.sub_codes || common_code.sub_codes.length === 0 ) return prev;

        return Object.assign({}, prev, {
          common_code
        });
      }
    });
  }, [ fullCode, data, fetchMore ]);

  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;
  if( !data && !props.data ) return <span>No Data...</span>;

  const { common_code } = data ? data : props.data;

  return (
    <>
    {
      <BaseSelect 
        group={ common_code.code }
        label={ common_code.code_name }
        options={
          common_code.sub_codes.map(( sub )=>({
            id: sub.id,
            value: sub.code,
            label: sub.code_name
          }))
        }
        handleSelect={ handleSelect }
        { ...props }
      />
    }
    </>
  )
}

export default CommonCodeSelect;