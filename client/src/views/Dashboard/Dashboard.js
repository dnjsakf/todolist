/* React */
import React, { Suspense, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import TodoListQuery from 'GraphQL/Query/TodoList';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

/* Components */
import { BaseButton } from 'Components/Inputs/Button';
import {
  TodoListCard,
  TodoListModal
} from './components';

/* Another Moudles */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    padding: theme.spacing(2)
  },
}));

/* Component */
const Dashboard = ( props )=>{
  /* Props */
  const { ...rest } = props;
  const variables = {
    first: 3,
    orderBy: ["-no"]
  }

  /* State */
  const classes = useStyles();

  const [ open, setOpen ] = useState( false );
  const [ mode, setMode ] = useState( "create" );
  const [ id, setId ] = useState( null );

  const { loading, error, data: list, fetchMore, refetch } = useQuery(
    TodoListQuery.GET_TODO_LIST_EDGES, {
      variables,
      onError(error){
        console.error( error );
      }
    }
  );

  /* Handlers */
  const handleOpenDetail = useCallback((event, no)=>{
    setMode("detail");
    setOpen(true);
    setId(no);
  }, [ mode, open, id ]);

  const handleOpenCreate = useCallback((event)=>{
    setMode("create");
    setOpen(true);
    setId(null);
  }, [ mode, open, id ]);

  const handleClose = useCallback((event)=>{
    setOpen(false);
    refetch();
  }, [ open ]);
  
  const handleFetchMore = (event)=>{
    fetchMore({
      variables: Object.assign({}, variables, {
        after: pageInfo.endCursor
      }),
      updateQuery: ( prev, { fetchMoreResult: { todo_list_edges : crnt } })=>{
        const updated = Object.assign({}, prev, {
          todo_list_edges: {
            ...prev.todo_list_edges,
            edges: [
              ...prev.todo_list_edges.edges,
              ...crnt.edges
            ],
            pageInfo: crnt.pageInfo,
          }
        });
        return updated;
      }
    });
  }

  if( loading ) return <span>Data loading....</span>;
  if( error ) return null;
  
  const { edges, pageInfo } = list.todo_list_edges;

  return (
    <Suspense fallback={<div>Todo List Loading...</div>}>
      <Grid container>
        <Grid item xs={ 12 }>
          <BaseButton
            id="add-todolist"
            label="추가"
            size="sm"
            color="primary"
            onClick={ handleOpenCreate }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <GridList className={ classes.gridList } cols={ 2 } spacing={ 5 }>
          {
            edges.map((edge)=>(
              <Grid item key={ edge.cursor }>
                <TodoListCard
                  data={ edge.node }
                  handleClick={ (event)=>( handleOpenDetail(event, edge.node.no) ) }
                />
              </Grid>
            ))
          }
          </GridList>
        </Grid>
        <Grid item xs={ 12 }>
          <BaseButton
            id="btn-load-todolist"
            label="Load"
            color="primary"
            size="sm"
            disabled={ pageInfo && !pageInfo.hasNextPage }
            onClick={ handleFetchMore }
          />
        </Grid>
      </Grid>
      <TodoListModal
        open={ open }
        mode={ mode }
        id="todo_list_modal"
        name="todo_list_modal"
        data={{
          id: id
        }}
        large
        handleClose={ handleClose }
      />
    </Suspense>
  )
}

Dashboard.proptypes = {

}

export default Dashboard;