/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

/* Components */
import { TodoList } from './components';
import { DragAndDrop } from 'Components/Events'

/* Another Moudles */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    userSelect: "none"
  },
}));

/* Component */
const Dashboard = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,  
    ...rest
  } = props;
  
  return (
    <Grid
      container
      className={ classes.root }
    >
      <Grid item xs={ 12 }>
        <TodoList />
      </Grid>
    </Grid>
  )
}

Dashboard.proptypes = {

}

export default Dashboard;