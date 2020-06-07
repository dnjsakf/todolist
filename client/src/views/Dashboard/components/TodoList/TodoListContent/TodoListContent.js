/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';

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
  loadButton: {
    
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
    onClickTitle,
    onClickHashTag,
    onDelete,
    onReload,
    data,
    pageInfo,
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
    <>
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
                onClickTitle={ onClickTitle }
                onClickHashTag={ onClickHashTag }
                onDelete={ onDelete }
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
      {
        pageInfo && pageInfo.hasNextPage && (
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
              onClick={ onReload }
              className={ classes.loadButton }
            >
              <SyncIcon fontSize="large"/>
            </IconButton>
          </GridItem>
        )
      }
    </>
  )
}

TodoListContent.proptypes = {
  type: PropTypes.oneOf([
    "card",
    "item"
  ]),
  className: PropTypes.string,
  data: PropTypes.array,
  pageInfo: PropTypes.object,
  onClickTitle: PropTypes.func,
  onClickHashTag: PropTypes.func,
  onDelete: PropTypes.func,
  onReload: PropTypes.func,
}

TodoListContent.defaultProps = {
  type: "card",
  data: [],
}

export default TodoListContent;