/* React */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import CommonCodeQuery from './../../../../graphql/Query/Common/CommonCode';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

/* Components */
import BaseSelect from './../BaseSelect';
import { common } from '@material-ui/core/colors';


/* Functions */
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

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  gridContainer: {
    height: 50
  }
}));

/* Component */
const StatusSelect = ( props )=>{
  /* State */
  const classes = useStyles();

  const [ depth, setDeopth ] = useState( 1 );
  const [ backCode, setBackCode ] = useState( props.code||"" );
  
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
        console.groupCollapsed("["+props.name.toUpperCase()+"][error]");
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
    const lask_full_code = removeLastCode(code, 1);
    
    console.groupCollapsed("["+props.name.toUpperCase()+"][onSelect]");
    console.log("[commonCode]:", commonCode);
    console.log("[last_code][prev]:", commonCode.full_code);
    console.log("[last_code][crnt]:", code);
    console.log("[lask_full_code][prev]:", backCode);
    console.log("[lask_full_code][crnt]:", lask_full_code);
    console.log("[depth][prev]:", commonCode.depth);
    console.log("[depth][crnt]:", code.split(":").length);
    console.log("[is_last][prev]:", commonCode.sub_codes.length === 0);
    console.groupEnd("["+props.name.toUpperCase()+"][onSelect]");
    

    setBackCode( lask_full_code );

    if( true ){
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
  }, [ backCode, commonCode ]);

  
  /* Reset State: commonCode */
  useEffect(()=>{
    console.groupCollapsed("["+props.name.toUpperCase()+"][useEffect][data]");
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
  
  
  /* Check Render */
  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;
  if( !commonCode || !commonCode.code ) return <span>No Data...</span>;


  return (
    <BaseSelect 
      label={ commonCode.code_name }
      group={ commonCode.full_code }
      handleSelect={ handleSelect }
      defaultOptions={[
        {
          id: commonCode.id+"_back",
          value: backCode,
          label: `뒤로가기:${ backCode }`,
        },
        {
          id: commonCode.id+"_default",
          value: commonCode.full_code,
          label: "선택",
        }
      ]}
      options={
        commonCode.sub_codes.map(( sub )=>({
          id: sub.id,
          value: sub.full_code,
          label: sub.code_name,
        }))
      }
      { ...props }
    />
  )
}

StatusSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleSelect: PropTypes.func,
  data: PropTypes.shape({
    code: PropTypes.string,
    code_name: PropTypes.string,
    sub_codes: PropTypes.array,
  }),
}

export default StatusSelect;