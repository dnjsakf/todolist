/* React */
import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  
}));

const BaseText = forwardRef(( props, ref )=>{
  /* Props */
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();
  
  return (
    <>
      <TextField
        { ...rest }
        type="search"
        variant="outlined"
        size="small"
        fullWidth

        inputRef={ ref }
        id={ props.id }
        name={ props.name }
        className={ clsx(classes.text, className) }

        label={ props.label }

        defaultValue={ props.defaultValue }
        placeholder={ props.placeholder }

        inputProps={{
          readOnly: !!props.readOnly,
          maxLength: props.maxLength
        }}

        required={ props.required && !props.readOnly }
        autoFocus={ !props.readOnly }
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
}

export default BaseText;