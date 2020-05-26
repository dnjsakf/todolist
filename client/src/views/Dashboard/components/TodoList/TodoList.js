/* React */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import Query from 'GraphQL/Query/TodoList';

/* Materialize */
import { makeStyles, useTheme } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';

/* Components */
import { SearchText } from 'Components/Inputs/Text';
import { BaseModal } from 'Components/Modals';
import { GridContainer, GridItem } from 'Components/Grid';

import TodoListRegister from './TodoListRegister';
import TodoListContent from './TodoListContent';

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
  loadButton: {
    
  },
}));

/* Component */
const TodoList = ( props )=>{
  /* Props */
  const classes = useStyles();
  const theme = useTheme();
  const searchRef = useRef();
  const {
    className,
    defaultCount,
    ...rest
  } = props;
  
  const initVariables = {
    first: defaultCount||5,
    orderBy: [ "-no", "-sort_order" ]
  }
  /* State */
  const [ open, setOpen ] = useState( false );
  const [ mode, setMode ] = useState( "create" );
  const [ id, setId ] = useState( null );
  const [ variables, setVariables ] = useState( initVariables );

  /* Query: Get TodoList Datas */
  const { loading, error, data, fetchMore, refetch, } = useQuery(
    Query.GET_TODO_LIST_EDGES, {
      fetchPolicy: "cache-and-network",
      variables,
      onError(error){
        console.error( error );
      },
      onCompleted( completed ){
        console.log( completed );
      }
    }
  );

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

    refetch();
  }
  
  const handleRefresh = (event)=>{
    setVariables( initVariables );
  }
  
  const handleDelete = ( success )=>{
    if( success ){
      refetch();
    }
  }
  
  const handleSubmit = ( event )=>{
    const searchText = searchRef.current.value;
    
    if( searchText ){
      const isHash = searchText.charAt(0) === "#";
      if( isHash ){
        console.log("[SEARCH][HASH]", searchText);
        console.log({
          variables: {
            ...variables,
            hashTags: searchText.split("#")
          }
        });
      } else {
        console.log("[SEARCH][TEXT]", searchText);
        setVariables({
          ...variables,
          title: searchText
        });
      }
    }
  }
  
  const handleFetchMore = ( event )=>{
    const { pageInfo } = data.todo_list_edges;

    fetchMore({
      variables: Object.assign({}, initVariables, {
        after: pageInfo.endCursor
      }),
      updateQuery: ( prev, { fetchMoreResult: { todo_list_edges : crnt } })=>{
        return Object.assign({}, prev, {
          todo_list_edges: {
            ...prev.todo_list_edges,
            edges: [
              ...prev.todo_list_edges.edges,
              ...crnt.edges
            ],
            pageInfo: crnt.pageInfo,
          }
        });
      }
    });
  }

  useEffect(()=>{
    console.log( variables );
    if( !loading ){
      refetch({ variables });
    }
  }, [ variables ]);

  if( error ) return null;

  console.log( data );

  return (
    <GridContainer>
      <GridItem xs={ 12 }>
        <SearchText
          inputRef={ searchRef }
          onSubmit={ handleSubmit }
          onRefresh={ handleRefresh }
          onEdit={ handleOpenWriteModal }
        />
      </GridItem>
      <GridItem xs={ 12 }>
        <TodoListContent
          handleDelete={ handleDelete }
          handleClick={ handleOpenReadModal }
          data={ !loading && data.todo_list_edges.edges }
        />
      </GridItem>
      {
        !loading && data.todo_list_edges.pageInfo.hasNextPage && (
          <GridItem xs={ 12 }>
            <GridItem 
              container 
              direction="row"
              justify="center"
              alignItems="center"
            >
              <IconButton
                id="btn-load-new-todolist"
                label="Load"
                aria-label="Load"
                onClick={ handleFetchMore }
                className={ classes.loadButton }
              >
                <SyncIcon fontSize="large"/>
              </IconButton>
            </GridItem>
          </GridItem>
        )
      }
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
    </GridContainer>
  )
}

TodoList.proptypes = {

}

export default TodoList;