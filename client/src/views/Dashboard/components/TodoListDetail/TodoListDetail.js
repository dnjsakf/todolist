/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import Query from 'GraphQL/Query/TodoList';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    width: 350
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  gridContainer: {
    height: 50
  },
}));

/* Component */
const TodoListDetail = ( props )=>{
  /* Props */
  const { data: { id: todo_info_id }, className, ...rest } = props;

  /* State */
  const classes = useStyles();

  /* Get Data */
  const { loading, error, data } = useQuery(
    Query.GET_TODO_LIST_FIELD, { 
      skip: !todo_info_id,
      variables: {
        no: todo_info_id
      },
      onError(error){
        console.error( error );
      }
    }
  );

  if( loading ) return <span>Now Loading....</span>;
  if( error ) return null;

  const { todo_info } = data;

  return (
    <Paper 
      elevation={ 5 }
      className={ clsx(
        {
          [classes.root]: true,
          [classes.paper]: true
        }, 
        className
      )}
    >
      <Grid container>
        <Grid item xs={ 12 }>
          <span>{ todo_info.title }</span>
        </Grid>
        <Grid item xs={ 8 }>
          <span>{ todo_info.status.p_code }</span>
        </Grid>
        <Grid item xs={ 4 }>
          <span>{ todo_info.status.code }</span>
        </Grid>
        <Grid item xs={ 8 }>
          <span>{ todo_info.category.p_code }</span>
        </Grid>
        <Grid item xs={ 4 }>
          <span>{ todo_info.category.code }</span>
        </Grid>
        <Grid item xs={ 6 }>
          <span>{ todo_info.due_date }</span>
        </Grid>
        <Grid item xs={ 6 }>
          <span>{ todo_info.due_time }</span>
        </Grid>
        <Grid item xs={ 12 }>
          <label>{ 'Comments' }</label>
        </Grid>
      </Grid>
    </Paper>
  )
}

TodoListDetail.proptypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
}

export default TodoListDetail;