/* React */
import React, { useEffect, useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';

/* Components */
import { TodoItemForm } from './../Form';

const TodoItem = ({ className, title, mode, size })=>{
  return (
    <>
      <div 
        className={ `input-item ${className}` }
        style={{
          width: size.width ? size.width : null,
          height: size.height ? size.height : null
        }}
      >
        <div className="input-row">
          <div className="input-col c12">
            {
              title 
              ? ( <h3 className="m5">{ title }</h3> )
              : null
            }
          </div>
        </div>
        <div className="input-row">
          <TodoItemForm 
            id={ 'todo_item_form' }
            mode={ mode ? mode : 'insert' }
            query={ null } 
            variables={ null }
          />
        </div>
        <div className="input-row">
          <div className="input-col c12">
            <label>{ 'Comments' } </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoItem;