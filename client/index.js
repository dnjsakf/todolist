/* React */
import React from 'react';
import { render as RouterDomRender } from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

/* Redux */
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

/* GraphQL */
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

/* Components */
import { App } from './components';

/* Webpack */
import { hot } from 'react-hot-loader/root';


/* Set Middleware */
const store = createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

/* Set BrowserHistory */
const browserHistory = createBrowserHistory();


function render(Component){
  const root = document.getElementById('root');

	Component = module.hot ? hot( Component ) : Component;
  
	RouterDomRender(
    <ApolloProvider client={client}>
      <Provider store={ store }>
        <Router history={ browserHistory }>
          <Component/>
        </Router>
      </Provider>
    </ApolloProvider>
    , root
  );
}

render(App);