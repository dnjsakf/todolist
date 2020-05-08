/* React */
import React, { useRef, useEffect } from 'react';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(( theme ) => ({
  button: {
    minWidth: 80,
  },
}));

const BaseButton = ( props )=>{
  const classes = useStyles();
  const elRef = useRef();

  return (
    <Button
      ref={ elRef }
      id={ props.id }
      name={ props.name }
      className={ classes.button }
      onClick={ props.handleClick }
      variant="contained"
      color="primary"
      disabled={ !!props.disabled }
      >
      { props.label }
    </Button>
  )
}

export default BaseButton;