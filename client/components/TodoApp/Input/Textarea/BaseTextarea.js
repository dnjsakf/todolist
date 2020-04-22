/* React */
import React, { useRef, useEffect, useCallback } from 'react';

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
  textarea: {
    resize: "none"
  }
}));

const BaseTextarea = ( props )=>{
  const classes = useStyles();
  const elRef = useRef();

  const handleChange = useCallback((event)=>{
    if( props.onChange ){
      props.onChange(elRef, event);
    }
  }, [ ]);

  // Initial Callback
  useEffect(()=>{
    if( props.onChange ){
      props.onChange( elRef, null );
    }
  },[ elRef ]);

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
        placeholder={ props.placeholder }
        defaultValue={ props.defaultValue }
        rows={ 5 }
        rowsMax={ 5 }
        onChange= { handleChange }
        maxLength={ 500 }
      />
    </FormControl>
  )
}

export default BaseTextarea;