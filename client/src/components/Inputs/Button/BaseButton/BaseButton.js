/* React */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/* Another Modueles */
import clsx from 'clsx';


/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  root: {
    //minWidth: 80,
    fontWeight: 500,
  },
  sm: {
    height: theme.spacing(4),
    width: theme.spacing(10)
  },
  md: {
    height: theme.spacing(6),
    width: theme.spacing(12)
  },
  lg: {
    height: theme.spacing(8),
    width: theme.spacing(14)
  },
  neutral: {
    backgroundColor: theme.palette.neutral
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white
  },
  info: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.white
  },
  warning: {
    backgroundColor: theme.palette.warning.main
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white
  },
  success: {
    backgroundColor: theme.palette.success.main
  }
}));

/* Component */
const BaseButton = ( props )=>{
  const { className, label, size, color, ...rest } = props;
  
  const classes = useStyles();
  const elRef = useRef();

  return (
    <Button
      { ...rest }
      ref={ elRef }
      className={clsx(
        {
          [classes.root]: true,
          [classes[size]]: size,
          [classes[color]]: color
        },
        className
      )}
      variant="contained"
      >
      { label }
    </Button>
  )
}

BaseButton.proptypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'neutral',
    'primary',
    'info',
    'success',
    'warning',
    'danger'
  ]),
  size: PropTypes.oneOf([
    'sm',
    'md',
    'lg'
  ]),
}

export default BaseButton;