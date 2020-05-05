/* React */
import React, { useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

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

const TodoInfoList = ({ variables })=>{
  const classes = useStyles();

  const { loading, error, data } = useQuery(TODO_INFO_EDGES_QUERY, { variables });

  const [ edges, setEdges ] = useState(null);
  const [ pageInfo, setPageInfo ] = useState(null);
  const [ openModal, setOpenModal ] = useState( -1 );

  const handleClickItem = useCallback((event, no)=>{
    setOpenModal( no );
  }, [ openModal ]);

  const handleModalClose = useCallback(()=>{
    setOpenModal( -1 );
  }, [ openModal ]);
  
  useEffect(()=>{
    console.log("[data]", data);

    if( data && !error ){
      const info = data[Object.keys(data)[0]];
      
      setEdges( info.edges );
      setPageInfo( info.pageInfo );
    }
  }, [ data ]);

  useEffect(()=>{
    console.log( "[pageInfo]", pageInfo );
  }, [ pageInfo ]);

  useEffect(()=>{
    console.log( "[edges]", edges );
  }, [ edges ]);

  if( error ){
    console.error( error );
    return null;
  }

  return (
    loading
    ? <span>Data loading....</span>
    : <Grid container>
        {/* Some Component... */}
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
                    handleClick={ handleClickItem }
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
          open={ openModal !== -1 }
          onClose={ handleModalClose }
          closeAfterTransition
          BackdropComponent={ Backdrop }
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={ openModal !== -1 }>
            <div>
              <TodoInfoItem
                mode={ 'view' }
                handleCancel={ handleModalClose }
                variables={{
                  no: openModal
                }}
              />
            </div>
          </Fade>
        </Modal>
      </Grid>
  )
}

export default TodoInfoList;