import React from 'react';
import { useQuery } from '@apollo/react-hooks';

const TodoItem = ({ query, variables }) => {
  const { loading, error, data } = useQuery(query, { variables });
  
  if( loading ) return <span>Data loading..</span>;
  if( error ) return <span>Something error..</span>;
  
  return (
    <div className="todo-item">
      <span>{ data.rank.name }</span>
    </div>
  )
}

export default TodoItem;