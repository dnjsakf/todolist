/* React */
import React, { forwardRef } from 'react';
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
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();

  return (
    <FormControl 
      variant="outlined"
      fullWidth 
      size="small"
    >
      <TextareaAutosize
        { ...rest }
        ref={ ref }
        id={ props.id }
        name={ props.name }
        className={ clsx(classes.textarea, className) }
        
        label={ props.label }
        defaultValue={ props.defaultValue }

        rows={ props.rows }
        rowsMax={ props.rowsMax }

        readOnly={ props.readOnly }

        aria-label="maximum height"
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