/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BaseSelect = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();
  const dispatch = useDispatch();

  const [ value, setValue ] = useState( props.defaultValue ? props.defaultValue : "" );
  const [ error, setError ] = useState( false );

  /* Handlers */
  /* Handler: Reset value, error */
  const handleChange = useCallback((event)=>{
    const value = event.target.value;

    /* Validation */
    if( props.required ){
      if( !value ){
        setError( true );
      } else {
        setError( false );
      }
    }

    if( props.action ){
      dispatch(props.action( value ));
    }

    setValue( value );

  }, [ value ]);

  return (
    <FormControl
      component="fieldset"
      variant="outlined"
      className={ classes.formControl }
      fullWidth 
      size="small"
    >
      <InputLabel id={ `${props.id}-label` }>{ props.label }</InputLabel>
      <Select
        ref={ elRef }
        labelId={ `${props.id}-label` }
        id={ props.id }
        name={ props.name }
        value={ value }
        onChange={ handleChange }
        label={ props.label }
        className={ classes.selectBox }
        error={ error }
        required={ props.required && !props.readOnly }
        inputProps={{
          readOnly: !!props.readOnly
        }}
      >
        <MenuItem value="">
          <em>선택</em>
        </MenuItem>
        {
          props.options.map(({ id, value, label })=>(
            <MenuItem key={ id } value={ value }>{ label }</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default BaseSelect;