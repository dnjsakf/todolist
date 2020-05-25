/* React */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

/* Materialize */
import { makeStyles } from '@material-ui/styles';

/* HOC */
import {
  Main as MainLayout,
  RouteWithLayout
} from 'Layouts';
import { DragAndDrop } from 'Components/Events';

/* Views */
import {
  Dashboard as DashboardView,
  NotFound as NotFoundView
} from 'Views';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    zIndex: 0,
    position: "relative",
  },
  alert: {
    zIndex: 10000,
    position: "fixed",
    minWidth: "500px",
    backgroundColor: "darkgray",
  },
  top: { top: 0 },
  right: { right: 0 },
  bottom: { bottom: 0 },
  left: { left: 0 }
}));


const AlertArea = ( props )=>{
  const classes = useStyles();  
  const {
    className,
    top,
    right,
    bottom,
    left,
    ...rest
  } = props;
  
  return (
    <div
      id="alert-area" 
      className={ clsx(
        {
          [classes.alert]: true,
          [classes.top]: top,
          [classes.right]: right,
          [classes.bottom]: bottom,
          [classes.left]: left,
        },
        className
      )}
    />
  )
}

/* Component */
const App = ( props ) => {
  const classes = useStyles();
  
  return (
    <>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <RouteWithLayout
          exact
          path="/dashboard"
          layout={ MainLayout }
          component={ DashboardView }
          className={ classes.root }
        />
        <Route
          path="/not-found"
          exact
          component={ NotFoundView }
        />
        <Redirect to="/not-found" />
      </Switch>
      <AlertArea bottom right/>
    </>
  )
}

export default App;