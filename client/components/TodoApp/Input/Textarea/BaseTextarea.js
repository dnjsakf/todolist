/* React */
import React, { useRef, useEffect } from 'react';


const BaseTextarea = ( props )=>{
  const elRef = useRef();

  // Initial Callback
  useEffect(()=>{
    if( props.onChange ){
      props.onChange( elRef, null );
    }
  },[ elRef ]);

  return (
    <textarea 
      ref={ elRef }
      id={ props.id }
      name={ props.name }
      className={ props.className }
      cols={ props.cols }
      rows={ props.rows }
      onChange= { props.onChange ? (event)=>props.onChange(elRef, event) : null }
      defaultValue={ props.defaultValue }
      placeholder={ props.placeholder }
    />
  )
}

export default BaseTextarea;