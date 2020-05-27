/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useMutation } from '@apollo/react-hooks';
import Mutation from 'GraphQL/Mutation/TodoList';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import { green, grey } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteIcon from '@material-ui/icons/Delete';

/* Components */
import { GridContainer, GridItem } from 'Components/Grid';

/* Another Moudles */
import clsx from 'clsx';
import moment from 'moment';

/* Functions */
import { minutesProgress as calcProgress } from './Utils/progress';

/* Materialize Styles */
const useStyles = makeStyles(( theme )=>({
  root: {
    height: "100%",
    opacity: "90%",
    backgroundColor: theme.palette.card.background.main,
    "&:hover": {
      opacity: "100%",
      backgroundColor:  theme.palette.card.background.hover,
    }
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 600,
    cursor: "pointer",
    "&:hover": {
      fontWeight: 900,
      textDecoration: "underline",
    },
  },
  hashTag: {
    color: theme.palette.hash.secondary,
    marginRight: "1px",
    fontWeight: 600,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.hash.primary,
      textDecoration: "underline",
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progressBar: {
    marginTop: theme.spacing(3),
    height: "1em",
    borderTopLeftRadius: "1em",
    borderTopRightRadius: "1em",
    borderBottomLeftRadius: "1em",
    borderBottomRightRadius: "1em",
  },
  buttonWrapper: {
    position: "relative",
    height: "100%",
    width: "100%",
    margin: theme.spacing(1),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -34,
    marginLeft: -34,
  },
}));

/* Component */
const TodoListCard = ( props )=>{
  /* Props */
  const classes = useStyles();
  const { 
    className,
    data,
    deletable,
    onClickTitle,
    onClickHashTag,
    onDelete,
    ...rest
  } = props;

  if( !data ){
    return <span>Data is None...</span>
  }

  /* State */
  const [ progress, setProgress ] = useState(()=>{
    const start_date = data.reg_dttm;
    const end_date = data.due_date+data.due_time;

    return calcProgress( start_date, end_date );
  }, 0 );
  
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
      
      if( onDelete ){
        onDelete( success );
      }
    }
  });
  
  /* Handlers */
  const handleDelete = (no, event)=>{
    event.stopPropagation();

    deleteTodoList({
      variables: {
        no: no
      }
    });
  }

  /* Effects */
  useEffect(()=>{
    const start_date = data.reg_dttm;
    const end_date = data.due_date+data.due_time;

    setProgress( calcProgress( start_date, end_date ) );
 
  }, [ data ]);
  
  /* Rendering */
  if( deleting ){
    return (
      <Card className={ clsx(classes.root, className) }>
        <CardContent className={ classes.buttonWrapper }>
          <CircularProgress size={ 68 } className={ classes.buttonProgress } />
        </CardContent>
      </Card>
    )
  }

  /* Rendering */
  return (
    <Card
      { ...rest }
      className={ clsx(classes.root, className) }
    >
      <CardContent>
        <GridContainer
          justify="space-between"
        >
          <GridItem>
            <Typography
              aria-label="todo-title"
              variant="h3"
              className={ classes.title }
              onClick={ onClickTitle ? onClickTitle.bind( null, data.no ) : null }
            >
            { data.title }
            </Typography>
            <Typography
              aria-label="todo-status"
              variant="h4"
              color="textSecondary"
            >
            { data.status.code }
            </Typography>
            <Typography
              aria-label="due-datetime"
              variant="h5"
              color="textSecondary"
            >
            { `${data.due_date}-${data.due_time}` }
            </Typography>
          </GridItem>
          <GridItem>
          {
            deletable && (
              <IconButton
                aria-label={ "delete-todolist" }
                title={ "delete-todolist" }
                onClick={ handleDelete.bind( null, data.no ) }
              >
                <DeleteIcon fontSize="small"/>
              </IconButton>
            )
          }
          </GridItem>
        </GridContainer>
        <LinearProgress
          className={ classes.progressBar }
          value={ progress }
          variant="determinate"
        />
        <GridContainer justify="flex-start">
        {
          onClickHashTag && (
            data.hash_tags.map(( hash_tag, idx )=>(
              <GridItem key={ hash_tag+idx }>
                <Typography
                  aria-label="todo-hashtag"
                  className={ classes.hashTag }
                  variant="body2"
                  onClick={ onClickHashTag.bind( null, hash_tag ) }
                >
                { `#${hash_tag}` }
                </Typography>
              </GridItem>
            ))
          )
        }
        </GridContainer>
      </CardContent>
    </Card>
  );
};

TodoListCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.any.isRequired,
    category: PropTypes.any.isRequired,
    due_date: PropTypes.string.isRequired,
    due_time: PropTypes.string.isRequired,
    star: PropTypes.bool,
    hash_tag: PropTypes.array,
  }),
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onClickHashTag: PropTypes.func
};

TodoListCard.defaultProps = {
  deletable: false,
}

export default TodoListCard;