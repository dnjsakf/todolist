/* React */
import React, { useRef, useEffect } from 'react';

const BaseSelect = ( props )=>{
  const elRef = useRef();

  // Initial Callback
  useEffect(()=>{
    if( props.onChange ){
      props.onChange( elRef );
    }
  },[ elRef ]);

  return (
    <select 
      ref={ elRef }
      id={ props.id }
      name={ props.name }
      onChange={ props.onChange ? ()=> props.onChange(elRef) : null }
      >
      {
        props.options.map(({ id, value, label })=>(
          <option key={ id } value={ value }>{ label }</option>
        ))
      }
    </select>
  )
}

export default BaseSelect;