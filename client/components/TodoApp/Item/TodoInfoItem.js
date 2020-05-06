/* React */
import React, { useRef, useEffect, useState } from 'react';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';

/* Reducers */
import * as actions from './../../../reducers/form/TodoInfoReducer';

/* GraphQL */
import { useLazyQuery } from '@apollo/react-hooks';
import {
  TODO_INFO_QUERY
} from './../../../graphql/queries/todos'

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/* Components */
import { TodoInfoForm } from './../Form';


const useStyles = makeStyles((theme)=>({

}));

const TodoInfoItem = ( props )=>{
  const classes = useStyles();
  const dispatch = useDispatch();

  const [
    getData,
    { 
      loading, 
      error, 
      data
    }
  ] = useLazyQuery( TODO_INFO_QUERY, { variables: props.variables } );

  useEffect(()=>{
    if( props.mode === "view" ){
      getData();
    }
  }, []);

  useEffect(()=>{
    if( props.mode === "view" && data ){
      dispatch(actions.setData( data.todo_info ));
    }
  }, [ data ]);

  if( loading ) return <span>Now Loading....</span>;
  if( error ) return null;

  console.log( data );

  return (
    <Paper 
      elevation={ 5 }
      className={ `w350 p10 ${ props.className }` }
    >
      <Grid container>  
        <Grid item xs={ 12 }>
          <TodoInfoForm
            data={ data ? data.todo_info : data }
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