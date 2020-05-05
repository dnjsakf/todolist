/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actionSetData } from './../../../../reducers/form/DataReducer';

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

    setValue( value );

  }, [ value, error ]);

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