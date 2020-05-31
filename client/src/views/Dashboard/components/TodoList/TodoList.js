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
import { SnackbarProvider } from 'notistack';

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
    initVariables,
    ...rest
  } = props;
  
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
        console.log('[GET_TODO_LIST_EDGES][COMPLETED]',completed );
        searchRef.current.focus();
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
  
  const handleDelete = ( success )=>{
    if( success ){
      refetch();
    }
  }
  
  const handleRefresh = ( event )=>{
    setVariables( initVariables );
    
    searchRef.current.value = "";
    searchRef.current.focus();
  }
  
  const handleSearchSubmit = ( type )=>{
    const searchText = searchRef.current.value;
    
    if( type === "hash" ){
        console.log("[SEARCH][HASH]", searchText);
        setVariables({
          ...variables,
          title: null,
          hash_tags: searchText === "" ?  null : searchText
        });
    } else {
      console.log("[SEARCH][TEXT]", searchText);
      setVariables({
        ...variables,
        title: searchText,
        hash_tags: null,
      });
    }
  }
  
  const handleClickHashTag = ( tag, event )=>{    
    const hash_tag = "#"+tag;
    const current_text = searchRef.current.value;
    
    let searchText = current_text;
    if( current_text.indexOf(hash_tag) > -1 ){
      searchText = current_text.replace(RegExp(hash_tag), "")
    }
    searchRef.current.value = searchText+hash_tag;
    
    handleSearchSubmit( event );
  }
  
  const handleFetchMore = ( event )=>{
    if( !data ) return false;
    
    const { hasNextPage, endCursor } = data.todo_list_edges.pageInfo;

    if( hasNextPage ){
      fetchMore({
        variables: Object.assign({}, initVariables, {
          after: endCursor
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
  }

  const handleScroll = ( event )=>{
    const scrollEl = document.scrollingElement;
    const maxScrollTop = scrollEl.scrollHeight - window.innerHeight;
    const currentScrollTop = window.scrollY;

    if( currentScrollTop === maxScrollTop ){
      handleFetchMore( event );
    }
  }

  useEffect(()=>{
    if( !loading ){
      refetch({ variables });
    }
  }, [ variables ]);

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll, false);
    return ()=>{
      window.removeEventListener('scroll', handleScroll, false);
    }
  }, [ data ]);

  if( error ) return null;

  return (
    <SnackbarProvider maxSnack={3}>
      <GridContainer>
        <GridItem xs={ 12 }>
          <SearchText
            inputRef={ searchRef }
            onSubmit={ handleSearchSubmit }
            onRefresh={ handleRefresh }
            onEdit={ handleOpenWriteModal }
          />
        </GridItem>
        <GridItem xs={ 12 }>
          <TodoListContent
            onDelete={ handleDelete }
            onClickTitle={ handleOpenReadModal }
            onClickHashTag={ handleClickHashTag }
            data={ data && data.todo_list_edges.edges }
          />
        </GridItem>
        {
          data && data.todo_list_edges.pageInfo.hasNextPage && (
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
          id="todo_list_modal"
          name="todo_list_modal"
          data={{
            id: id
          }}
          open={ open }
          mode={ mode }
          large
          handleClose={ handleClose }
          component={ TodoListRegister }
        />
      </GridContainer>
    </SnackbarProvider>
  )
}

TodoList.proptypes = {
  initVariables: PropTypes.object,
}

TodoList.defaultProps = {
  initVariables: {
    first: 5,
    orderBy: [ "-no", "-sort_order" ]
  }
}

export default TodoList;