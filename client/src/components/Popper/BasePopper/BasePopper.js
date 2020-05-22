/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

/* Component */
const BasePopper = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    open,
    className,
    placement,
    anchorEl,
    ...rest
  } = props;
  
  /* State */
  const [ isOpen, setIsOpen ] = useState( open );
 
  useEffect(()=>{
    setIsOpen( open );
    return ()=>( setTimeout(()=>( setIsOpen( false ) ), 300) );
  }, [ open ]);

  return (
    <div className={ clsx(classes.root, className) }>
      <Popper
        open={ open }
        anchorEl={ anchorEl }
        placement={ placement }
        transition
      >
        {
          ({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography className={classes.typography}>The content of the Popper.</Typography>
              </Paper>
            </Fade>
        )}
      </Popper>
    </div>
  );
}

BasePopper.propTypes = {
  open: PropTypes.bool.isRequired,
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top'
  ]),
  anchorEl: PropTypes.any,
}

export default BasePopper;