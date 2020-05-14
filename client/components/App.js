/* React */
import React, { Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

/* Views */
import {
 TodoList as TodoListView
} from './Views';

const App = ( props ) => {
  return (
    <Suspense fallback={<div>App Loading...</div>}>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/todolist"
        />
        <Route 
          exact 
          path="/todolist"
          component={ ( routeProps )=>( <TodoListView { ...routeProps }/> ) }
        />
        <Route
          path="/not-found"
          exact
          component={ ()=>( <span>Not Found...</span>) }
        />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  )
}

export default App;