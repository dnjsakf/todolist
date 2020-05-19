import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import {
  BaseModal  
} from 'Components/Modals';

import TodoInfoRegister from '../TodoInfoRegister';
import TodoInfoDetail from '../TodoInfoDetail';

import clsx from 'clsx';

const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 350
  }
}));

const TodoInfoModal = ( props )=>{
  /* Props */
  const { mode, className, ...rest } = props;
  
  /* State */
  const classes = useStyles();

  return (
    <BaseModal
      { ...rest }
      className={ clsx(classes.root, className) }
      component={
        mode === "detail"
        ? TodoInfoDetail
        : TodoInfoRegister
      }
    />
  )
}

TodoInfoModal.proptypes = {
  mode: PropTypes.oneOf([
    "detail",
    "create",
    "update"
  ]).isRequired,
  data: PropTypes.object,
  className: PropTypes.string,
  handleClode: PropTypes.func.isRequired,
}

export default TodoInfoModal;

