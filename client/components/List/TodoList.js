import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { todoListQuery } from './../../graphql/queries/todos';

const TodoList = ({ variables })=>{
  const { loading, error, data } = useQuery(todoListQuery, { variables });

  if( loading ) return <span>'now loadding...'</span>;
  if( error ) return <span>Something error...</span>;

  return (
    <>
    {
      data.modes.map(({ id, ranking, mode })=>{
        return (
          <div key={ id }>
            <span>{ mode }</span>
            <ul>
            {
              ranking.edges.map(({ node })=>{
                return <li key={ node.id }>{ node.name }/{ node.score }</li>
              })
            }
            </ul>
          </div>
        )
      })
    }
    </>
  )
}

export default TodoList;