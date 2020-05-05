/* React */
import React, { useEffect, useState } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import { TODO_INFO_QUERY } from './../../../graphql/queries/todos'

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/* Components */
import { TodoInfoForm } from './../Form';

const useStyles = makeStyles((theme)=>({

}));

const TodoInfoItem = ({ variables, className, mode })=>{
  const classes = useStyles();
  const [ info, setInfo ] = useState(null);
  
  const { loading, error, data } = useQuery( TODO_INFO_QUERY, { variables } );

  useEffect(()=>{
    if( data && !error ){
      setInfo(data[Object.keys(data)[0]]);
    }
  }, [ data ]);

  useEffect(()=>{
    // console.log("[info]", info);
  }, [ info ]);

  if( error ){
    console.error( error );
    return null;
  }

  return (
    loading
    ? <span>Now Loading....</span>
    : <Paper 
        elevation={ 5 }
        className={ `w350 p10 ${ className }` }
      >
        <Grid container>  
          <Grid item xs={ 12 }>
            <TodoInfoForm
              id={ 'todo_item_form' }
              mode={ mode ? mode : 'insert' }
              info={ info }
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