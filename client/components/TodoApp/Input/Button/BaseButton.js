/* React */
import React, { useRef, useEffect } from 'react';

const BaseButton = ({ id, name, className, label, onClick })=>{
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
      id={ id }
      name={ name }
      className={ className }
      onClick={ onClick ? onClick : null }
      >
      { label }
    </button>
  )
}

export default BaseButton;