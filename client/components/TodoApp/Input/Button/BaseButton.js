/* React */
import React, { useRef, useEffect } from 'react';

/* Material */
import Button from '@material-ui/core/Button';

const BaseButton = ( props )=>{
  const elRef = useRef();

  // Initial Callback
  useEffect(()=>{
    // if( onClick ){
    //   onClick( elRef );
    // }
  },[ elRef ]);

  return (
    <Button
      ref={ elRef }
      id={ props.id }
      name={ props.name }
      className={ props.className }
      onClick={ props.onClick }
      variant="contained"
      color="primary"
      >
      { props.label }
    </Button>
  )
}

export default BaseButton;