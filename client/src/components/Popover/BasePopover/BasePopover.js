/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

/* Component */
const BasePopover = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    id,
    isOpen,
    children,
    closeInterval,
    ...rest
  } = props;
  
  /* State */
  const [ open, setOpen ] = useState( isOpen );

  /* Handlers */
  const handleClose = ( event )=>{
    setOpen( false );
  }
  
  useEffect(()=>{
    setOpen( isOpen );
  }, [ isOpen ]);
  
  useEffect(()=>{
    if( open && closeInterval ){
      setTimeout(()=>{
        setOpen( false );
      }, closeInterval);
    }
  }, [ open ]); 
  
  return (
    <Popover
      open={ open }
      anchorReference="anchorPosition"
      anchorPosition={{
        top: document.body.offsetHeight,
        left: document.body.offsetWidth,
      }}
      onClose={ handleClose }
    >
      <Typography className={ classes.typography }>
        { children }
      </Typography>
    </Popover>
  );
}

BasePopover.propTypes = {
  isOpen: PropTypes.bool,
  closeInterval: PropTypes.number,
}

export default BasePopover;