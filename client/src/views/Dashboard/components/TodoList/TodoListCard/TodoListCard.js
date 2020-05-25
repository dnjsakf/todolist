/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useMutation } from '@apollo/react-hooks';
import Mutation from 'GraphQL/Mutation/TodoList';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

/* Another Moudles */
import clsx from 'clsx';
import moment from 'moment';

const calcProgress = (start_date, end_date)=>{
  const now_dttm = moment();
  const start_dttm = moment(start_date, 'YYYY-MM-DD HH:mm:ss');
  const end_dttm = moment(end_date, 'YYYYMMDDHHmmss');
  
  const end_days = end_dttm.diff( start_dttm, 'days' );
  const now_days = now_dttm.diff( start_dttm, 'days' );

  return end_days === 0 ? 100 : now_days / end_days * 100;
}

/* Materialize Styles */
const useStyles = makeStyles(( theme )=>({
  root: {
    height: "100%",
    opacity: "80%",
    cursor: "pointer",
    "&:hover": {
      opacity: "100%"
    }
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 700
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
  progress: {
    marginTop: theme.spacing(3),
    height: "1em",
    borderTopLeftRadius: "1em",
    borderTopRightRadius: "1em",
    borderBottomLeftRadius: "1em",
    borderBottomRightRadius: "1em",
  }
}));

/* Component */
const TodoListCard = ( props )=>{
  const classes = useStyles();
  const { 
    className,
    data,
    onClick,
    onDelete,
    ...rest
  } = props;

  if( !data ){
    return <span>Data is None...</span>
  }

  const [ progress, setProgress ] = useState(()=>{
    const start_date = data.reg_dttm;
    const end_date = data.due_date+data.due_time;

    return calcProgress( start_date, end_date);
  }, 0 );

  useEffect(()=>{
    const start_date = data.reg_dttm;
    const end_date = data.due_date+data.due_time;

    setProgress( calcProgress( start_date, end_date ) );
 
  }, [ data ]);

  return (
    <Card
      { ...rest }
      className={ clsx(classes.root, className) }
      onClick={ onClick ? onClick.bind( null, data.no ) : null }
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={ classes.title }
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              { `${data.category.p_code}:${data.category.code}` }
            </Typography>
            <Typography variant="h3">{ data.title }</Typography>
            <Typography variant="h3">{ data.status.code }</Typography>
            <Typography variant="h5">{`${data.due_date}-${data.due_time}`}</Typography>
          </Grid>
          <Grid item>
          {
            onDelete && (
              <IconButton
                aria-label={ "삭제" }
                title={ "삭제" }
                onClick={ onDelete.bind( null, data.no ) }
              >
                <DeleteIcon fontSize="small"/>
              </IconButton>
            )
          }
          </Grid>
        </Grid>
        <LinearProgress
          className={ classes.progress }
          value={ progress }
          variant="determinate"
        />
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
};

export default TodoListCard;