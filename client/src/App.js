/* React */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

/* HOC */
import {
  Main as MainLayout,
  RouteWithLayout
} from 'Layouts';

/* Views */
import {
  Dashboard as DashboardView,
  NotFound as NotFoundView
} from 'Views';

const App = ( props ) => {
  return (
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
      />
      <Route
        path="/not-found"
        exact
        component={ NotFoundView }
      />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default App;