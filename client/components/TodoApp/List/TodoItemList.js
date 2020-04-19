/* React */
import React, { useEffect, useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import { TODO_LIST_QUERY, TODO_ITEM_QUERY } from './../../../graphql/queries/todos';

/* Components */
import { TodoItemForm } from './../Form';

/* CSS */
import './TodoItemList.css';


const TodoItemList = ({ variables })=>{
  // const { loading, error, data } = useQuery(TODO_LIST_QUERY, { variables });

  // if( loading ) return <span>Data loading..</span>;
  // if( error ) {
  //   console.error( error );
  //   return null;
  // };

  return (
    <>
      <div className="input-item input-row" style={{ width: '400px' }}>
        <div className="input-row">
          <div className="input-col c12">
            <p>Insert Form</p>
          </div>
        </div>
        <div className="input-row">
          <div className="input-col c12">
            <TodoItemForm 
              id={ 'todo_item_form' }
              mode={ 'insert' }
              query={ null } 
              variables={ null }
            />
          </div>
        </div>
        <div>
          { 'comments' }
        </div>
      </div>
    </>
  )
}

export default TodoItemList;