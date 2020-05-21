/* React */
import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  textarea: {
    resize: "none"
  }
}));

/* Component */
const BaseTextarea = forwardRef(( props, ref )=>{
  /* Props */
  const classes = useStyles();
  const { 
    className,
    defaultValue,
    ...rest
  } = props;

  /* State */
  const [ value, setValue ] = useState( defaultValue||"" );

  /* Handler */
  const handleChange = ( event )=>( setValue( event.target.value ) );

  return (
    <FormControl 
      variant="outlined"
      fullWidth 
      size="small"
    >
      <TextareaAutosize
        { ...rest }
        ref={ ref() }
        className={ clsx(classes.textarea, className) }
        aria-label="maximum height"
        onChange={ handleChange }
      />
    </FormControl>
  )
});

BaseTextarea.proptypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,

  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
}

export default BaseTextarea;