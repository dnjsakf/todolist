/* React */
import React, { useRef } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Reducers */
import { actions } from './../../../../reducers/form/TodoInfo';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import TodoQuery from './../../../../graphql/Query/Field/Todo'

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/* Components */
import { TodoInfoForm } from './../../Form/Todo';


const useStyles = makeStyles((theme)=>({
  form: {
    padding: 10,
    width: 350
  }
}));

const TodoInfoItem = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(
    TodoQuery.GET_TODO_INFO, { 
      variables: {
        no: props.id
      },
      onError(error){
        console.error( error );
      },
      onCompleted( _data ){
        if( _data && _data.todo_info ){
          dispatch(actions.setTodoInfo(
            _data.todo_info
          ));
        }
      }
    }
  );

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
          <TodoInfoForm
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

export default TodoInfoItem;