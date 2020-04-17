import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { COMMON_CODE_QUERY, TODO_LIST_QUERY, TODO_ITEM_QUERY } from './../../graphql/queries/todos';

import StatusSelect from './../Input/StatusSelect';
import TodoItem from './../Item/TodoItem';

import './TodoItemList.css';


const TodoItemList = ({ variables })=>{
  const { loading, error, data } = useQuery(TODO_LIST_QUERY, { variables });

  if( loading ) return <span>Data loading..</span>;
  if( error ) return <span>Something error..</span>;

  return (
    <>
    <div>
      <StatusSelect query={ COMMON_CODE_QUERY } variables={{ code_grp: "TODO_STATUS" }}/>
    </div>
    {
      data.modes.map(({ id, ranking, mode })=>{
        return (
          <div key={ id }>
            <span>{ mode }</span>
            <ul>
            {
              ranking.edges.map(({ node })=>(
                <li key={ node.id }>
                  <TodoItem 
                    query={ TODO_ITEM_QUERY } 
                    variables={{ id: node.id.split(':')[1] }}
                  />
                </li>
              ))
            }
            </ul>
          </div>
        )
      })
    }
    </>
  )
}

export default TodoItemList;