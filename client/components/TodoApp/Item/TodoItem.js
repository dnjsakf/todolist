/* React */
import React, { useEffect, useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';

/* Material */
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/* Components */
import { TodoItemForm } from './../Form';

const TodoItem = ({ className, mode })=>{
  return (
    <Paper 
      elevation={ 5 }
      className={ `w350 p10 ${ className }` }
    >
      <Grid container>  
        <Grid item xs={ 12 }>
          <TodoItemForm 
            id={ 'todo_item_form' }
            mode={ mode ? mode : 'insert' }
            query={ null } 
            variables={ null }
          />
        </Grid> 
        <Grid item xs={ 12 }>
          <label>{ 'Comments' } </label>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TodoItem;