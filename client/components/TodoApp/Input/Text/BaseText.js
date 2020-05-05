/* React */
import React, { useRef, useCallback, useState, useEffect } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actionSetData } from './../../../../reducers/form/DataReducer';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(( theme ) => ({
  
}));

const BaseText = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const dispatch = useDispatch();
  const isError = useSelector(({ form })=>{
    if( form.data[props.parent] && form.data[props.parent][props.name] ){
      return form.data[props.parent][props.name].error;
    }
    return false;
  });

  const [ value, setValue ] = useState( props.defaultValue || "" );
  const [ error, setError ] = useState( isError );

  /* Handlers */
  /* Handler: Reset value, error */
  const handleBlur = useCallback(function(event){
    const value = event.target.value;

    /* Validation */
    if( props.required ){
      if ( !value ){
        setError( true );
      } else if ( props.maxlength && value.length > props.maxlength ){
        setError( true );
      } else {
        setError( false );
      }
    }

    setValue( value );

  }, [ value ]);

  /* Reset error */
  useEffect(()=>{
    setError( isError );
  }, [ isError ]);

  /* Call dispatch */
  useEffect(()=>{
    dispatch(
      actionSetData({
        parent: props.parent,
        name: props.name,
        value: value,
        error: error,
        required: !!props.required
      })
    );
  }, [ value, error ]);

  return (
    <TextField
      type="search"
      ref={ elRef }
      id={ props.id }
      name={ props.name }
      className={ classes.text }
      label={ props.label }

      variant="outlined"
      fullWidth
      size="small"

      onBlur={ handleBlur }
      value={ props.defaultValue || undefined }
      placeholder={ props.placeholder }

      inputProps={{
        readOnly: !!props.readOnly,
        maxLength: props.maxlength
      }}

      required={ props.required && !props.readOnly }
      error={ error }

      autoFocus={ !props.readOnly }
    />
  )
}

export default BaseText;