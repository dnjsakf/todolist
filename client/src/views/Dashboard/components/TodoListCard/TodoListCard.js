/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

/* Another Moudles */
import clsx from 'clsx';
import moment from 'moment';

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
const TodoListCard = props => {
  const classes = useStyles();
  const { 
    className,
    data,
    onDelete,
    ...rest
  } = props;

  if( !data ){
    return <span>Data is None...</span>
  }

  const now_dttm = moment();
  const start_dttm = moment(data.reg_dttm, 'YYYY-MM-DD HH:mm:ss');
  const end_dttm = moment(data.due_date+data.due_time, 'YYYYMMDDHHmmss');
  
  const end_days = end_dttm.diff( start_dttm, 'days' );
  const now_days = now_dttm.diff( start_dttm, 'days' );

  return (
    <Card
      {...rest}
      className={ clsx(classes.root, className) }
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
          {
            onDelete && (
              <Grid item>
                <IconButton
                  aria-label={ "삭제" }
                  title={ "삭제" }
                  onClick={ onDelete }
                >
                  <DeleteIcon fontSize="small"/>
                </IconButton>
              </Grid>
            )
          }
        </Grid>
        <LinearProgress
          className={ classes.progress }
          value={ now_days/end_days*100 }
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
};

export default TodoListCard;