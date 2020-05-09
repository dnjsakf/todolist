/* React */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

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

function combineCodes({ p_code, code }, delimiter){
  const _delimiter = delimiter||":";
  const codes = Object.assign({}, {
    p_code,
    code
  });
  
  let combined = codes.p_code||codes.code;
  if( codes.p_code && codes.code ){
    const splited = codes.p_code.split(_delimiter);
    const last_code = splited.length > 1 ? splited[splited.length-1] : splited[0];

    if( last_code !== codes.code ){
      combined = [].concat(splited, codes.code).join(_delimiter);
    }
  }
  return combined;
}

function removeLastCode( str_codes, min_index, delimiter ){
  if( str_codes ){
    const _delimiter = delimiter||":";
    const splited = str_codes.split(_delimiter);
    if( splited.length > ( min_index||0 ) ){
      splited.pop();
    }
    return splited.join(_delimiter);
  }
  return str_codes;
}

function popCode( str_codes, delimiter ){
  return str_codes && str_codes.split(delimiter||":").pop();
}


const CommonCodeSelect = ( props )=>{
  /* Initialize State */
  const classes = useStyles();

  const [ depth, setDeopth ] = useState( 1 );
  const [ parentCode, setParentCode ] = useState( props.code );
  const [ commonCode, setCommonCode ] = useState( props.data||{
    code: null,
    code_name: null,
    sub_codes: []
  });
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
        console.log("["+props.name.toUpperCase()+"][onCompleted]", data);
      }
    }
  );

  /* Handler: Handle when selectd option. */
  const handleSelect = useCallback((event, code, is_back)=>{
    const current_code = commonCode.code;
    const last_parent_code = popCode(parentCode);
    const new_depth = current_code !== last_parent_code;
    
    console.group("["+props.name.toUpperCase()+"][parent_code][history]");
    console.log("code:", code);
    let parent_code = parentCode;

    console.log("prev:", parent_code);

    console.log("is_remove:", new_depth);
    if( new_depth ){
      parent_code = removeLastCode(parent_code, 1);
      console.log("removed:", parent_code);
    }
    console.log("is_back:", is_back);
    if( is_back ){
      parent_code = removeLastCode(parent_code, 1);
      console.log("removed:", parent_code);
    } else {
      parent_code = combineCodes({ p_code: parent_code, code: code });
    }
    console.log("current:", parent_code);
    console.groupEnd("["+props.name.toUpperCase()+"][parent_code][history]");

    // console.groupCollapsed("["+props.name.toUpperCase()+"][handleSelect]");
    console.group("["+props.name.toUpperCase()+"][handleSelect]");
    console.log("code:", code);
    console.log("current_code:", current_code);
    console.log("last_parent_code:", last_parent_code);
    console.log("parent_code:", parent_code);
    console.log("commonCode:", commonCode);
    console.log("fetchMore:", new_depth);
    console.groupEnd("["+props.name.toUpperCase()+"][handleSelect]");

    fetchMore({
      variables: {
        code: parent_code
      },
      updateQuery: ( prev, { fetchMoreResult: { common_code } })=>{
        console.log("["+props.name.toUpperCase()+"][updateQuery]", !common_code || !common_code.sub_codes || common_code.sub_codes.length === 0, common_code);
        if( !common_code || !common_code.sub_codes || common_code.sub_codes.length === 0 ) return prev;
        return Object.assign({}, prev, {
          common_code
        });
      }
    });
    
    setParentCode(parent_code);

  }, [ parentCode, commonCode, depth ]);

  /* Reset State: commonCode */
  useEffect(()=>{
    if( data ){
      const is_same = JSON.stringify(data.common_code) === JSON.stringify(commonCode);
      console.log("["+props.name.toUpperCase()+"][data][is_same]", is_same);
      if( !is_same ){
        console.log("["+props.name.toUpperCase()+"][data]", data.common_code);
        setCommonCode( data.common_code );
      }
    }
  }, [ data ]);

  /* Logging State: commonCode */
  // useEffect(()=>{
  //   console.log("["+props.name.toUpperCase()+"][commonCode][CURRENT]", commonCode);
  //   return ()=>{
  //     console.log("["+props.name.toUpperCase()+"][commonCode][PREV]", commonCode);
  //   }
  // }, [ commonCode ]);

  /* Check Render */
  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;
  if( !commonCode ) return <span>No Data...</span>;

  console.log( commonCode );

  return (
    <BaseSelect 
      group={ commonCode.code }
      label={ commonCode.code_name }
      options={
        commonCode.sub_codes.map(( sub )=>({
          id: sub.id,
          value: sub.code,
          label: sub.code_name
        }))
      }
      handleSelect={ handleSelect }
      { ...props }
    />
  )
}

CommonCodeSelect.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({
    common_code: PropTypes.shape({
      code: PropTypes.string,
      code_name: PropTypes.string,
      sub_codes: PropTypes.array
    })
  }),
}

export default CommonCodeSelect;