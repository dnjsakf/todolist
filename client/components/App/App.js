/* React */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* CSS */
import './App.css';

/* Components */
const TodoApp = lazy(()=>import('./../TodoApp/TodoApp'));


const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>App Loading...</div>}>
        <Switch>
          <Route exact path="/" component={ TodoApp }/>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App;