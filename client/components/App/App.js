import React from 'react';

import { ApolloProvider } from 'react-apollo';
import client from './../../graphql/client';

import TodoList from './../List/TodoList';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h3>React Hot Loader</h3>
      </div>
      <TodoList variables={{
        order: ["-score"],
        count_for_rows: 3
      }}/>
    </ApolloProvider>
  )
}

export default App;