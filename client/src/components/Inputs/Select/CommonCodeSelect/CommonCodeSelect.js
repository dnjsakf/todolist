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
const CommonCodeSelect = ( props )=>{
  /* Props */
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();

  /* Handler: Handle when selectd option. */
  const handleChange = useCallback(([event, info])=>{
    if( props.handleChange ){
      props.handleChange(event);
    }
    return event.target.value;
  }, [ props.handleChange ]);

  const { loading, error, data } = useQuery(
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
  
  /* Check Render */
  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;
  if( !data && !props.data ) return <span>No Data</span>;

  const { code, code_name, sub_codes } = data ? data.common_code : props.data;

  return (
    <FormControl
      component="fieldset"
      variant="outlined"
      className={ clsx(classes.formControl, className) }
      size="small"
      fullWidth 
    >
      <InputLabel id={ `${props.name}-${code}-select-label` }>{ props.label||code_name }</InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="">
              <em>선택</em>
            </MenuItem>
            {
              sub_codes.map(({ id: key, code: value, code_name: label })=>(
                <MenuItem key={ key } value={ value }>{ label }</MenuItem>
              ))
            }
          </Select>
        }
        control={ props.control }
        rules={{
          required: props.required
        }}

        id={ props.id }
        name={ props.name }
        label={ props.label||code_name }
        className={ classes.selectBox }

        labelId={ `${props.name}-${code}-select-label` }
        defaultValue={ props.defafultValue||"" }
        onChange={ handleChange }

        required={ props.required && !props.readOnly }
        inputProps={{
          readOnly: !!props.readOnly,
        }}
      />
    </FormControl>
  )
}

CommonCodeSelect.propTypes = {
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

export default CommonCodeSelect;