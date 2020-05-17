import React from 'react';
import PropTypes from 'prop-types';

import {
  BaseModal  
} from 'Components/Modals';

import TodoInfoRegister from '../TodoInfoRegister';
import TodoInfoDetail from '../TodoInfoDetail';

const TodoInfoModal = ( props )=>{
  const { mode, className, ...rest } = props;

  return (
    <BaseModal
      { ...rest }
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

