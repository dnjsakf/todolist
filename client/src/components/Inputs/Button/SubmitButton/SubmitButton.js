/* React */
import React, { useRef, useEffect } from 'react';

/* Materialize */
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';

/* Components */
import { makeStyles } from '@material-ui/core/styles';
import BaseButton from './../BaseButton';


const useStyles = makeStyles((theme) => ({
  saveButton: {
    padding: 10
  }
}));

const SubmitButton = ({ cancel, save })=>{
  const classes = useStyles();
  const elRef = useRef();

  return (
    <ButtonGroup >
      {
        cancel
        ? (
            <BaseButton 
              className={ cancel.className }
              label={ cancel.label }
              handleClick={ cancel.onClick }
            />
          )
        : null
      }
      <BaseButton 
          className={ save.className }
          label={ save.label }
          handleClick={ save.onClick }
        />
    </ButtonGroup>
  )
}

export default SubmitButton;