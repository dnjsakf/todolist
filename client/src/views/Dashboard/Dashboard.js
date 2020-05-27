/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/styles';

/* Components */
import { GridContainer, GridItem } from 'Components/Grid'
import { TodoList } from './components';

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
    <GridContainer className={ clsx(classes.root, className) }>
      <GridItem xs={ 12 }>
        <TodoList defaultCount={ 4 } />
      </GridItem>
    </GridContainer>
  )
}

Dashboard.propTypes = {
  className: PropTypes.string
}

export default Dashboard;