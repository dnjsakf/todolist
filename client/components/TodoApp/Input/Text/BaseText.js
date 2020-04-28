/* React */
import React, { useRef, useCallback, useState, useEffect } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Reducers */
import { onChangeValue } from './../../../../reducers/form/SelectReducer';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  
}));

const BaseText = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();
  const dispatch = useDispatch();
  const [ value, setValue ] = useState( props.defaultValue || "" );

  /* Handlers */
  const handleBlur = useCallback(function(event){
    setValue( event.target.value );
  }, [ value ]);

  useEffect(()=>{
    dispatch(
      onChangeValue({
        parent: props.parent,
        name: props.name,
        value: value
      })
    );
  }, [ value ]);

  return (
    <TextField
      type="search"
      ref={ elRef }
      id={ props.id }
      name={ props.name }
      className={ classes.text }
      label={ props.label }

      variant="outlined"
      fullWidth
      size="small"

      placeholder={ props.placeholder }
      onBlur={ handleBlur }
      value={ props.defaultValue }
      
      InputProps={{
        readOnly: !!props.defaultValue,
      }}
      required={ true }
      error={ false }
    />
  )
}

export default BaseText;