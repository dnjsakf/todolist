/* React */
import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery, useMutation } from '@apollo/react-hooks';
import Query from 'GraphQL/Query/TodoList';
import Mutation from 'GraphQL/Mutation/TodoList';

/* Materialize */
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

/* Components */
import { BaseButton } from 'Components/Inputs/Button';
import { BaseModal } from 'Components/Modals';
import TodoListCard from './TodoListCard';
import TodoListRegister from './TodoListRegister';

/* Another Moudles */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    padding: theme.spacing(1),
    margin: "0!important"
  },
}));

/* Component */
const TodoList = ( props )=>{
  /* Props */
  const classes = useStyles();
  const theme = useTheme();
  const {
    className,
    defaultCount,
    ...rest
  } = props;
  
  const variables = {
    first: defaultCount||3,
    orderBy: [ "-no", "-sort_order" ]
  }
  
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });

  /* State */
  const [ open, setOpen ] = useState( false );
  const [ mode, setMode ] = useState( "create" );
  const [ id, setId ] = useState( null );

  /* Query: Get TodoList Datas */
  const { loading, error, data: list, fetchMore, refetch } = useQuery(
    Query.GET_TODO_LIST_EDGES, {
      variables,
      onError(error){
        console.error( error );
      },
      onCompleted( data ){
        console.log( data );
      }
    }
  );
  
  /* Mutation: Delete TodoList */
  const [ 
    deleteTodoList, 
    { 
      data: deleted, 
      loading: deleting, 
    }
  ] = useMutation(
    Mutation.DELETE_TODO_LIST, {
    onError( error ){
      console.error( error );
    },
    onCompleted({ delete_todo_list: { success } }) {
      console.log("[TODO_LIST][DELETED]", success);
      refetch();
    }
  });

  const handleDelete = (no, event)=>{
    event.stopPropagation();

    deleteTodoList({
      variables: {
        no: no
      }
    });
  }

  /* Handlers */
  const handleOpenReadModal = (no, event)=>{
    event.preventDefault();
    console.log('handleOpenReadModal');
    
    setMode("detail");
    setOpen(true);
    setId(no);
  }

  const handleOpenWriteModal = (event)=>{
    event.preventDefault();
    console.log('handleOpenWriteModal');
    
    setMode("create");
    setOpen(true);
    setId(null);
  }

  const handleClose = (event)=>{
    event.preventDefault();
    console.log('handleClose');
    
    setOpen(false);
  }
  
  const handleReload = (event)=>{
    refetch();
  }
  
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
    <Grid container>
      <Grid item xs={ 12 }>
        <BaseButton
          id="add-todolist"
          label="추가"
          size="sm"
          color="primary"
          onClick={ handleOpenWriteModal }
        />
      </Grid>
      <Grid item xs={ 12 }>
        <BaseButton
          id="btn-load-prev-todolist"
          label="Reload"
          color="primary"
          size="sm"
          disabled={ loading }
          onClick={ handleReload }
        />
      </Grid>
      <Grid item xs={ 12 }>
        <GridList
          className={ classes.gridList }
          cols={ isDesktop ? 3 : 1 }
          spacing={ 5 }
        >
        {
          edges.map((edge)=>(
            <Grid item key={ edge.cursor }>
              <TodoListCard
                data={ edge.node }
                onClick={ handleOpenReadModal }
                onDelete={ handleDelete }
              />
            </Grid>
          ))
        }
        </GridList>
      </Grid>
      <Grid item xs={ 12 }>
        <BaseButton
          id="btn-load-new-todolist"
          label="Load"
          color="primary"
          size="sm"
          disabled={ pageInfo && !pageInfo.hasNextPage }
          onClick={ handleFetchMore }
        />
      </Grid>
      <BaseModal
        open={ open }
        mode={ mode }
        id="todo_list_modal"
        name="todo_list_modal"
        data={{
          id: id
        }}
        large
        handleClose={ handleClose }
        component={ TodoListRegister }
      />
    </Grid>
  )
}

TodoList.proptypes = {

}

export default TodoList;