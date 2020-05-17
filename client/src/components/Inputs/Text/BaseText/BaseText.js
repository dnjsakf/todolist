/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  
}));

const BaseText = ( props )=>{
  /* Props */
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();
  const [ value, setValue ] = useState( props.defaultValue || undefined );

  return (
    <TextField
      { ...rest }
      type="search"
      className={ clsx(classes.text, className) }
      label={ props.label }

      variant="outlined"
      fullWidth
      size="small"

      defaultValue={ value }
      placeholder={ props.placeholder }

      inputProps={{
        readOnly: !!props.readOnly,
        maxLength: props.maxLength
      }}

      required={ props.required && !props.readOnly }
      autoFocus={ !props.readOnly }
    />
  )
}

BaseText.proptypes = {
  ref: PropTypes.any,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
}

export default BaseText;