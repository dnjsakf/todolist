/* React */
import React, { useRef, useEffect } from 'react';

const BaseSelect = ({ id, name, options, onChange })=>{
  const elRef = useRef();

  // Initial Callback
  useEffect(()=>{
    if( onChange ){
      onChange( elRef );
    }
  },[ elRef ]);

  return (
    <select 
      ref={ elRef }
      id={ id }
      name={ name }
      onChange={ onChange ? ()=>onChange(elRef) : null }
      >
      {
        options.map(({id, value, label})=>(
          <option key={ id } value={ value }>{ label }</option>
        ))
      }
    </select>
  )
}

export default BaseSelect;