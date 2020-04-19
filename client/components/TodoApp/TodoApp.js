/* React */
import React, { Suspense, lazy } from 'react';

/* Components */
const TodoItemList = lazy(()=>import('./List/TodoItemList'));
const TodoItem = lazy(()=>import('./Item/TodoItem'));

/* CSS */
import './TodoApp.css';


const TodoList = () => {
  return (
    <Suspense fallback={<div>Todo List Loading...</div>}>
      <div className="input-row">
        <div className="input-col _blank c4"></div>
        <div className="input-col c4">
          <TodoItem
            mode={ 'insert' }
            title={ 'ToDo Insert' }
            size={{
            }}
          />
        </div>
        <div className="input-col _blank c4"></div>
      </div>
      {/* 
        <TodoItemList
          variables={{
            order: ["-score"],
            count_for_rows: 3
          }}
        />
      */}
    </Suspense>
  )
}

export default TodoList;