/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';

/* Components */
import { GridItem } from 'Components/Grid';
import { TodoListCard } from './components';

/* Another Moudles */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    padding: theme.spacing(1),
    margin: "0!important"
  },
}));

/* Component */
const TodoListContent = ( props )=>{
  /* Props */
  const classes = useStyles();
  const theme = useTheme();
  const {
    type,
    className,
    handleClick,
    handleDelete,
    handleHashTag,
    data,
    ...rest
  } = props;
  
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });
  
  const cols = isDesktop ? 3 : isTablet ? 2 : 1;

  /* Rendering */
  return (
    <GridList
      className={ classes.root }
      cols={ cols }
      spacing={ 5 }
    >
    {
      data
      ? data.map(({ cursor, node })=>(
          <GridItem key={ cursor }>
            <TodoListCard
              data={ node }
              deletable={ true }
              onClick={ handleClick }
              onDelete={ handleDelete }
              onHashTag={ handleHashTag }
            />
          </GridItem>
        ))
      : <GridItem>
          <Typography variant="body1">
            No Data
          </Typography>
        </GridItem>
    }
    </GridList>
  )
}

TodoListContent.proptypes = {
  type: PropTypes.oneOf([
    "card",
    "item"
  ]),
  className: PropTypes.string,
  data: PropTypes.array,
  handleClick: PropTypes.func,
  handleDelete: PropTypes.func,
  handleHashTag: PropTypes.func,
}

TodoListContent.defaultProps = {
  type: "card",
  data: [],
}

export default TodoListContent;