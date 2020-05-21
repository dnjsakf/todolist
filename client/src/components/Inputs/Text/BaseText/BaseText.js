/* React */
import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  root: {

  }
}));

/* Component */
const BaseText = forwardRef(( props, ref )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,
    defaultValue,
    ...rest
  } = props;

  /* State */
  const [ value, setValue ] = useState(defaultValue||"");
  
  /* Handler */
  const handleChange = (event)=>( setValue(event.target.value) );

  return (
    <>
      <TextField
        { ...rest }
        type="search"
        variant="outlined"
        size="small"
        fullWidth

        id={ props.id }
        name={ props.name }
        className={ clsx(classes.root, className) }

        label={ props.label }

        placeholder={ props.placeholder }

        inputRef={ ref() }
        inputProps={{
          readOnly: !!props.readOnly,
          maxLength: props.maxLength
        }}

        required={ props.required && !props.readOnly }
        autoFocus={ !props.readOnly }
        
        value={ value }

        onChange={ handleChange }
      />
    </>
  )
});

BaseText.proptypes = {
  ref: PropTypes.any,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
}

export default BaseText;