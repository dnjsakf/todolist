/* React */
import React from 'react';
import { render as RouterDomRender } from 'react-dom';
import { hot } from 'react-hot-loader/root';

/* GraphQL */
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

/* Components */
import App from './components/App/App';


function render( Component, isHot=false ){
  const root = document.getElementById('root');
  
	Component = isHot ? hot( Component ) : Component;
  
	RouterDomRender(
    <ApolloProvider client={client}>
      <Component/>
    </ApolloProvider>
    , root
  );
}

render(App, true);