/* React */
import React, { useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { actionSetData } from './../../../reducers/list/DataReducer';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import { TODO_INFO_EDGES_QUERY } from './../../../graphql/queries/todos';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

/* Components */
import { TodoListItem } from './../Item';
import { TodoInfoItem } from './../Item';
import { BaseButton } from './../Input/Button';

/* CSS */
import './TodoInfoList.css';


const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const TodoInfoList = ( props )=>{
  /* State */
  const [ variables, setVariables ] = useState( props.variables );
  const { loading, error, data, refetch } = useQuery(TODO_INFO_EDGES_QUERY, { variables });

  const classes = useStyles();
  const dispatch = useDispatch();

  const [ mode, setMode ] = useState("view");
  const [ itemNo, setItemNo ] = useState(-1);

  /*
  const { edges, pageInfo } = useSelector(({ list })=>(
    list.data.todo_info_edges || { edges: [], pageInfo: {}}
  ));
  */
  
  /* Handlers */
  const handleViewItem = useCallback((event, no)=>{
    setMode("view");
    setItemNo( no );
  }, [ itemNo, mode ]);

  const handleCreateItem = useCallback((event)=>{
    setMode("create");
    setItemNo( 0 );
  }, [ itemNo, mode ]);

  const handleModalClose = useCallback(()=>{
    setItemNo( -1 );
    
    refetch()
  }, [ itemNo ]);


  /* Set edges, pageInfo */
  useEffect(()=>{
    if( data && !error ){
      const info = data[Object.keys(data)[0]];

      //dispatch(actionSetData(data));
    }
  }, [ data ]);


  if( loading ){
    return <span>Data loading....</span>;
  }
  if( error ){
    console.error( error );
    return null;
  }
  
  const { edges, pageInfo } = data.todo_info_edges;

  return (
    <Grid container>
      {/* Some Component... */}
      <Grid>
        <BaseButton
          label="추가"
          handleClick={ handleCreateItem }
        />
      </Grid>
      <Grid item xs={ 12 }>
        <List
          component="nav" 
          className={classes.root} 
          aria-label="contacts"
        >
          {
            edges
            ? edges.map((edge)=>(
                <TodoListItem
                  key={ edge.cursor }
                  item={ edge.node }
                  handleClick={ handleViewItem }
                />
              ))
            : <span>Now Loading...</span>
          }
        </List>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ classes.modal }
        open={ itemNo !== -1 }
        onClose={ handleModalClose }
        closeAfterTransition
        BackdropComponent={ Backdrop }
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={ itemNo !== -1 }>
          <div>
            <TodoInfoItem
              mode={ mode }
              variables={{
                no: itemNo
              }}
              handleClose={ handleModalClose }
            />
          </div>
        </Fade>
      </Modal>
      <BaseButton
        label={ "Load..."}
        disabled={ pageInfo && !pageInfo.hasNextPage }
        handleClick={()=>{
          setVariables({
            after: pageInfo.endCursor,
            first: 5
          })
        }}
      />
    </Grid>
  )
}

export default TodoInfoList;