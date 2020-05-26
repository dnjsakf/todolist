/* React */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import Query from 'GraphQL/Query/TodoList';

/* Materialize */
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';

/* Components */
import { BaseButton } from 'Components/Inputs/Button';
import { SearchText } from 'Components/Inputs/Text';
import { BaseModal } from 'Components/Modals';
import { GridContainer, GridItem } from 'Components/Grid';

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
  
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  /* State */
  const [ open, setOpen ] = useState( false );
  const [ mode, setMode ] = useState( "create" );
  const [ id, setId ] = useState( null );
  const [ variables, setVariables ] = useState( initVariables );

  /* Query: Get TodoList Datas */
  const { loading, error, data: list, fetchMore, refetch, } = useQuery(
    Query.GET_TODO_LIST_EDGES, {
      fetchPolicy: "no-cache",
      variables,
      onError(error){
        console.error( error );
      },
      onCompleted( data ){
        console.log( data );
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
    fetchMore({
      variables: Object.assign({}, variables, {
        after: list.todo_list_edges.pageInfo.endCursor
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

  useEffect(()=>{
    console.log( variables );
    if( !loading ){
      refetch({ variables });
    }
  }, [ variables ]);

  if( error ) return null;

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
      {
        !loading && (
          <GridList
            className={ classes.gridList }
            cols={ isDesktop ? 3 : isTablet ? 2 : 1 }
            spacing={ 5 }
          >
          {
            list.todo_list_edges.edges.map((edge)=>(
              <GridItem key={ edge.cursor }>
                <TodoListCard
                  data={ edge.node }
                  deletable={ true }
                  onDelete={ handleDelete }
                  onClick={ handleOpenReadModal }
                />
              </GridItem>
            ))
          }
          </GridList>
        )
      }
      </GridItem>
      {
        !loading && list.todo_list_edges.pageInfo.hasNextPage && (
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