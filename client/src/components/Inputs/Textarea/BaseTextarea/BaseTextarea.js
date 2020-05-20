/* React */
import React, { forwardRef, useCallback } from 'react';
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

const BaseTextarea = forwardRef(( props, ref )=>{
  /* Props */
  const { 
    className,
    handleChange,
    ...rest
  } = props;

  /* State */
  const classes = useStyles();

  const handleBlur = useCallback(( event )=>{
    handleChange( props.name, event.target.value );
  }, []);

  return (
    <FormControl 
      variant="outlined"
      fullWidth 
      size="small"
    >
      <TextareaAutosize
        { ...rest }
        ref={ ref }
        className={ clsx(classes.textarea, className) }
        aria-label="maximum height"
        onBlur={ handleBlur }
      />
    </FormControl>
  )
});

BaseTextarea.proptypes = {
  ref: PropTypes.any,
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