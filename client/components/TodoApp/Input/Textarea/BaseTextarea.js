/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles(( theme ) => ({
  textarea: {
    resize: "none"
  }
}));

const BaseTextarea = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const dispatch = useDispatch();

  const [ value, setValue ] = useState( props.defaultValue || "" );
  const [ error, setError ] = useState( false );

  /* Handlers */
  /* Handler: Reset value, error */
  const handleBlur = useCallback(( event )=>{
    const value = event.target.value;

    /* Validation */
    if( props.required ){
      if( !value ){
        setError( true );
      } else if ( props.maxlength && value.length > props.maxlength ){
        setError( true );
      } else {
        setError( false );
      }
    }

    if( props.action ){
      dispatch( props.action( value ) );
    }

    setValue( value );

  }, [ value, error ]);


  return (
    <FormControl 
      variant="outlined"
      fullWidth 
      size="small"
    >
      <TextareaAutosize
        ref={ elRef }
        id={ props.id }
        name={ props.name }
        className={ classes.textarea }
        aria-label="maximum height"

        rows={ 5 }
        rowsMax={ 5 }
        maxLength={ props.maxlength }

        onBlur= { handleBlur }
        defaultValue={ props.defaultValue }
        placeholder={ props.placeholder }
        readOnly={ props.readOnly }
      />
    </FormControl>
  )
}

export default BaseTextarea;