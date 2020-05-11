/* React */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import CommonCodeQuery from './../../../../../graphql/Query/Field/CommonCode';
import CommonCodeListQuery from './../../../../../graphql/Query/List/CommonCode';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

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
      onError: (error)=>{
        console.group("["+props.name.toUpperCase()+"][error]");
        console.error(error);
        console.group("["+props.name.toUpperCase()+"][error]");
      },
      onCompleted: (data)=>{
        console.log("["+props.name.toUpperCase()+"][onCompleted]", data);
      }
    }
  );

  /* Handler: Handle when selectd option. */
  const handleSelect = useCallback((event, code, is_back)=>{
    const current_code = commonCode.code;
    const last_parent_code = popCode(parentCode);
    const new_depth = current_code !== last_parent_code;
    
    const parent_code = removeLastCode(code, 1);
    
    console.group("["+props.name.toUpperCase()+"][handleSelect]");
    console.log("[code][prev]:", last_parent_code);
    console.log("[code][crnt]:", current_code);
    console.log("[code][new]:", code);
    console.log("[parent_code][prev]:", parentCode);
    console.log("[parent_code][crnt]:", parent_code);
    console.log("[commonCode]:", commonCode);
    console.log("[fetchMore]:", new_depth);
    console.groupEnd("["+props.name.toUpperCase()+"][handleSelect]");
    
    setParentCode(parent_code);
    
    if( true || new_depth ){
      fetchMore({
        variables: {
          code: code
        },
        updateQuery: ( prev, { fetchMoreResult: { common_code } })=>{
          console.log("["+props.name.toUpperCase()+"][updateQuery]", !common_code || !common_code.sub_codes || common_code.sub_codes.length === 0, common_code);
          if( !common_code || !common_code.sub_codes || common_code.sub_codes.length === 0 ) return prev;
          return Object.assign({}, prev, {
            common_code
          });
        }
      });
    }

  }, [ parentCode, commonCode ]);

  
  /* Reset State: commonCode */
  useEffect(()=>{
    console.group("["+props.name.toUpperCase()+"][useEffect][data]");
    if( data ){
      const do_update = JSON.stringify(data.common_code) !== JSON.stringify(commonCode);
      console.log("[commonCode][do_update]", do_update);
      if( do_update ){
        console.log("[commonCode]", data.common_code);
        setCommonCode( data.common_code );
      }
    }
    console.groupEnd("["+props.name.toUpperCase()+"][useEffect][data]");
  }, [ data ]);
  
  useEffect(()=>{
    console.group("["+props.name.toUpperCase()+"][useEffect][data]");
    console.log("[loading]:", loading);
    console.log("[error]:", error);
    console.groupEnd("["+props.name.toUpperCase()+"][useEffect][data]");
  }, [ loading, error ]);
  
  
  /* Check Render */
  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;
  if( !commonCode || !commonCode.code ) return <span>No Data...</span>;
  
  console.group("["+props.name.toUpperCase()+"][render][data]");
  console.log( data );
  console.groupEnd("["+props.name.toUpperCase()+"][render][data]");

  return (
    <BaseSelect 
      label={ parentCode }
      group={ commonCode.full_code }
      options={
        commonCode.sub_codes.map(( sub )=>({
          id: sub.id,
          value: sub.full_code,
          label: sub.code_name
        }))
      }
      handleSelect={ handleSelect }
      { ...props }
    >
      <MenuItem value={ commonCode.full_code }>
        <em>{ "뒤로가기:"+commonCode.code }</em>
      </MenuItem>
      <MenuItem value={ "" }>
        <em>선택</em>
      </MenuItem>
    </BaseSelect>
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