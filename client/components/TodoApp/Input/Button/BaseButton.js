/* React */
import React, { useRef, useEffect } from 'react';

const BaseButton = ( props )=>{
  const elRef = useRef();

  // Initial Callback
  useEffect(()=>{
    // if( onClick ){
    //   onClick( elRef );
    // }
  },[ elRef ]);

  return (
    <button
      ref={ elRef }
      id={ props.id }
      name={ props.name }
      className={ props.className }
      onClick={ props.onClick }
      >
      { props.label }
    </button>
  )
}

export default BaseButton;