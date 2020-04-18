import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { onChangeValue } from './../../../reducers/input/SelectReducer';


const BaseSelect = ({ options })=>{
  const dispatch = useDispatch();

  const elRef = useRef();

  const handleChangeValue = useCallback((event)=>{
    event.preventDefault();
    dispatch(
      onChangeValue({
        value: event.target.value
      })
    );
  }, [ elRef ]);

  /* Set Default Value */
  useEffect(()=>{
    dispatch(
      onChangeValue({
        value: elRef.current.value
      })
    );
  }, [ elRef ])

  return (
    <>
      <select ref={ elRef } onChange={ handleChangeValue }>
      {
        options.map(({id, value, label})=>(
          <option key={ id } value={ value }>{ label }</option>
        ))
      }
      </select>
    </>
  )
}

export default BaseSelect;