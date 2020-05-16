/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

/* Another Moudles */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const BaseModal = ( props )=>{
  const { component: Component, open, className, handleClose, ...rest } = props;

  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={ clsx(classes.root, className) }
      open={ open }
      onClose={ handleClose }
      closeAfterTransition
      BackdropComponent={ Backdrop }
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={ open }>
        <div>
          <Component { ...rest } />
        </div>
      </Fade>
    </Modal>
  )
}

BaseModal.proptypes = {
  component: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default BaseModal;