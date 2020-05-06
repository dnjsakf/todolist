/* React */
import React, { Suspense, lazy } from 'react';

/* Components */
const TodoInfoList = lazy(()=>import('./List/TodoInfoList'));
const TodoInfoItem = lazy(()=>import('./Item/TodoInfoItem'));

/* CSS */
import './TodoApp.css';


const TodoList = () => {
  return (
    <Suspense fallback={<div>Todo List Loading...</div>}>
      <div className="p5">
        <TodoInfoList 
          variables={{
            first: 5,
            orderBy: ["-no"]
          }}
        />
        {/* <TodoInfoItem
          mode={ 'insert' }
          className={ "w350 center" }
          title={ 'ToDo Insert' }
          size={{
          }}
        /> */}
      </div>
    </Suspense>
  )
}

export default TodoList;