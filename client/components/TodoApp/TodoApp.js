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
      <div className="p5">
        <TodoItem
          mode={ 'insert' }
          className={ "w350 center" }
          title={ 'ToDo Insert' }
          size={{
          }}
        />
      </div>
    </Suspense>
  )
}

export default TodoList;