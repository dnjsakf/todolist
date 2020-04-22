/* React */
import React, { useRef, useEffect, useCallback } from 'react';

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  text: {

  }
}));

const BaseText = ( props )=>{
  const classes = useStyles();
  const elRef = useRef();

  // Initial Callback
  useEffect(()=>{
    if( props.onChange ){
      props.onChange( elRef, null );
    }
  },[ elRef ]);

  return (
    <TextField
      id={ props.id }
      name={ props.name }
      label={ props.label }
      className={ classes.text }
      variant="outlined"
      fullWidth
      size="small"
      disabled={ !!props.label }
      placeholder={ props.placeholder }
    />
  )
}

export default BaseText;