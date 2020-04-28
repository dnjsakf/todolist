/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Reducers */
import { onChangeValue } from './../../../../reducers/form/SelectReducer';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles((theme) => ({
  textarea: {
    resize: "none"
  }
}));

const BaseTextarea = ( props )=>{
  /* State */
  const classes = useStyles();
  const dispatch = useDispatch();
  const elRef = useRef();
  const [ value, setValue ] = useState( props.defaultValue || "" );

  /* Handlers */
  const handleBlur = useCallback((event)=>{
    setValue( event.target.value );
  }, [ value ]);

  useEffect(()=>{
    dispatch(
      onChangeValue({
        parent: props.parent,
        name: props.name,
        value: value
      })
    )
  },[ value ]);

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
        maxLength={ 500 }
        onBlur= { handleBlur }
      />
    </FormControl>
  )
}

export default BaseTextarea;