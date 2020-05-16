/* React */
import React from 'react';
import { render as RouterDomRender } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

/* Redux */
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

/* GraphQL */
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

/* Components */
import App from './App';

/* Webpack */
import { hot } from 'react-hot-loader/root';

/* Materialize */
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

/* ServiceWorker */
import * as serviceWorker from './serviceWorker';


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
        <ThemeProvider theme={ theme }>
          <Router history={ browserHistory }>
            <Component/>
          </Router>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
    , root
  );
}

render( App );

serviceWorker.unregister();
