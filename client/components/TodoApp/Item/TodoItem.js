/* React */
import React, { useEffect, useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import { TODO_ITEM_QUERY } from './../../../graphql/queries/todos';

/* Components */
import { TodoItemForm } from './../Form';


const TodoItem = ({ title, mode, size })=>{

  return (
    <>
      <div className="input-item input-row" style={{
        width: size.width ? size.width : null,
        height: size.height ? size.height : null
      }}>
        {
          title
          ? (
            <div className="input-row">
              <div className="input-col c12">
                <p>{ title }</p>
              </div>
            </div>
            )
          : null
        }
        <div className="input-row">
          <div className="input-col c12">
            <TodoItemForm 
              id={ 'todo_item_form' }
              mode={ mode ? mode : 'insert' }
              query={ null } 
              variables={ null }
            />
          </div>
        </div>
        {
          false
          ? (
            <div>
              { 'comments' }
            </div>
            )
          : null
        }
      </div>
    </>
  )
}

export default TodoItem;