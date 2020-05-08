/* React */
import React, { useRef, useCallback, useState, useEffect } from 'react';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(( theme ) => ({
  
}));

const BaseText = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const [ value, setValue ] = useState( props.defaultValue || undefined );
  const [ error, setError ] = useState( false );

  /* Handlers */
  /* Handler: Reset value, error */
  const handleBlur = useCallback(function(event){
    setValue( event.target.value );
  }, [ value, error ]);

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

      onBlur={ handleBlur }
      defaultValue={ value }
      placeholder={ props.placeholder }

      inputProps={{
        readOnly: !!props.readOnly,
        maxLength: props.maxlength
      }}

      required={ props.required && !props.readOnly }
      error={ error }

      autoFocus={ !props.readOnly }
    />
  )
}

export default BaseText;