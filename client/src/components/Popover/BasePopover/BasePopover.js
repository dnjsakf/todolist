/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

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

  const handleCloseSnack = ( event, reason )=>{
    if( reason == 'clickaway' ){
      return;
    }
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
    <SnackBar
      open={ open }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      onClose={ handleCloseSnack }
      TransitionComponent={ <Slide direction="up" /> }
      action={
        <Button color="secondary" size="small">
          UNDO
        </Button>
      }
      message={ children }
    />
  );
}

BasePopover.propTypes = {
  isOpen: PropTypes.bool,
  closeInterval: PropTypes.number,
}

export default BasePopover;