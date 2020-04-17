/* React */
import React, { Suspense, lazy } from 'react';

/* Components */
const TodoItemList = lazy(()=>import('./../List/TodoItemList'));


const TodoList = () => {
  return (
    <>
      <div>
        <h3>TodoList</h3>
      </div>
      <Suspense fallback={<div>Todo List Loading...</div>}>
        <TodoItemList variables={{
          order: ["-score"],
          count_for_rows: 3
        }}/>
      </Suspense>
    </>
  )
}

export default TodoList;