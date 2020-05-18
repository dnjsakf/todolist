/* React */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import CommonCodeQuery from 'GraphQL/Query/Common/CommonCode';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

/* Components */
import CommonCodeSelect from './../CommonCodeSelect';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/* Component */
const HierarchySelect = ( props )=>{
  /* Props */
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();

  const { loading, error, data, fetchMore } = useQuery(
    CommonCodeQuery.GET_COMMON_CODE_LIST, {
      skip: !props.code,
      variables: {
        code: props.code,
        order: [
          "depth"
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
  const handleChange = useCallback((event, depth)=>{
    const selected = event.target.value;
    console.log( selected, depth );
    
    /*
    fetchMore({
      variables: {
        code: selected,
        order: [
          "depth"
        ]
      },
      updateQuery: ({ prev, fetchMoreResult: { common_code_list } })=>{
        return Object.assign({}, prev, {
          common_code_list: [
            ...prev.common_code_list,
            ...common_code_list
          ]
        })
      }
    });
    */

    return event;
  }, [ fetchMore ]);
  
  /* Check Render */
  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;
  if( !data ) return <span>No Data</span>;

  const { common_code_list } = data;

  return (
    <Grid container>
    {
      common_code_list && common_code_list.map(( common_code )=>(
        <CommonCodeSelect
          key={ common_code.id }
          control={ props.control }
          id={ `${ props.id }_${ common_code.code.toLowerCase() }` }
          name={ common_code.code }
          label={ common_code.code_name }
          data={ common_code }
          handleChange={ (event)=>(handleChange(event, common_code.depth)) }
        />
      ))
    }
    </Grid>
  )
}

HierarchySelect.propTypes = {
  control: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,

  label: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.string,

  data: PropTypes.shape({
    code: PropTypes.string.isRequired,
    code_name: PropTypes.string.isRequired,
    sub_codes: PropTypes.array.isRequired,
  }),
}

export default HierarchySelect;