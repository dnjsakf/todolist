/* React */
import React, { Suspense, lazy } from 'react';

/* Components */
const TodoList = lazy(()=>import('./List/Todo/TodoList'));

/* CSS */
import './TodoApp.css';


const TodoApp = () => {
  return (
    <Suspense fallback={<div>Todo List Loading...</div>}>
      <div className="p5">
        <TodoList 
          variables={{
            first: 5,
            orderBy: ["-no"]
          }}
        />
      </div>
    </Suspense>
  )
}

export default TodoApp;