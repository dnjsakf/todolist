/* React */
import React, { useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actions } from './../../../reducers/modal/TodoInfoModal';

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const { open, mode, data } = useSelector(({ modal })=>( modal.todoInfo ));
  const [ variables, setVariables ] = useState({ first: 5 });
  const { loading, error, data: list, refetch } = useQuery(
    TODO_INFO_EDGES_QUERY, {
      variables,
      onError(error){
        console.error( error );
      }
    }
  );

  /* Handlers */
  const handleViewItem = useCallback((event, no)=>{
    dispatch(
      actions.openModal({
        mode: "view",
        data: {
          id: no
        },
      })
    );
  }, [ open, mode, data ]);

  const handleCreateItem = useCallback((event)=>{
    dispatch(
      actions.openModal({
        mode: "create",
        data: null,
      })
    );
  }, [ open, mode, data ]);

  const handleModalClose = useCallback(()=>{
    dispatch(actions.closeModal());

    refetch();
  }, [ open ]);

  if( loading ) return <span>Data loading....</span>;
  if( error ) return null;
  
  const { edges, pageInfo } = list.todo_info_edges;

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
        open={ open }
        onClose={ handleModalClose }
        closeAfterTransition
        BackdropComponent={ Backdrop }
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={ open }>
          <div>
            <TodoInfoItem
              mode={ mode }
              id={ data && data.id }
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