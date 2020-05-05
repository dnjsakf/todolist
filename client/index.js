/* React */
import React from 'react';
import { render as RouterDomRender } from 'react-dom';
import { hot } from 'react-hot-loader/root';

/* Redux */
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

/* GraphQL */
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

/* Components */
import App from './components/App/App';

/* Set Middleware */
const store = createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

function render(Component){
  const root = document.getElementById('root');

	Component = module.hot ? hot( Component ) : Component;
  
	RouterDomRender(
    <ApolloProvider client={client}>
      <Provider store={ store }>
        <Component/>
      </Provider>
    </ApolloProvider>
    , root
  );
}

render(App);