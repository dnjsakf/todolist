/* React */
import React, { useRef, useEffect } from 'react';

/* Materialize */
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';

/* Components */
import { makeStyles } from '@material-ui/core/styles';
import { BaseButton } from '.';


const useStyles = makeStyles((theme) => ({
  saveButton: {
    padding: 10
  }
}));

const SaveCancelButton = ({ cancel, save })=>{
  const classes = useStyles();
  const elRef = useRef();

  return (
    <Grid 
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={ classes.saveButton }
    >
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
    </Grid>
  )
}

export default SaveCancelButton;