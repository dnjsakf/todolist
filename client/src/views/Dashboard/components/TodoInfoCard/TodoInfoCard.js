import React from 'react';
import PropTypes from 'prop-types';

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

import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
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
    marginTop: theme.spacing(3)
  }
}));

const TodoInfoCard = props => {
  const { className, data, handleClick, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      onClick={ handleClick }
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
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={75.5}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TodoInfoCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.any.isRequired,
    category: PropTypes.any.isRequired,
    due_date: PropTypes.string.isRequired,
    due_time: PropTypes.string.isRequired,
    star: PropTypes.bool,
  })
};

export default TodoInfoCard;