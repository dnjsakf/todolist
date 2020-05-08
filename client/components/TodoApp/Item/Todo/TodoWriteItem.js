/* React */
import React, { useRef } from 'react';

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/* Components */
import { TodoForm } from './../../Form/Todo';


const useStyles = makeStyles((theme)=>({
  form: {
    padding: 10,
    width: 350
  }
}));

const TodoWriteItem = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();
  const dispatch = useDispatch();

  if( loading ) return <span>Now Loading....</span>;
  if( error ) return null;

  const { todo_info } = data;

  return (
    <Paper 
      elevation={ 5 }
      className={ classes.form }
    >
      <Grid container>  
        <Grid item xs={ 12 }>
          <TodoForm
            data={ todo_info }
            { ...props }
          />
        </Grid> 
        <Grid item xs={ 12 }>
          <label>{ 'Comments' } </label>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TodoWriteItem;