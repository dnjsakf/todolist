/* React */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';

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
    className,
    handleDelete,
    handleClick,
    data,
    ...rest
  } = props;
  
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  /* State */
  const [ list, setList ] = useState( data );

  useEffect(()=>{
    console.log( data );
    setList( data );
  }, [ data ]);

  return (
    <GridList
      className={ classes.root }
      cols={ isDesktop ? 3 : isTablet ? 2 : 1 }
      spacing={ 5 }
    >
    {
      list && list.map(({ cursor, node })=>(
        <GridItem key={ cursor }>
          <TodoListCard
            data={ node }
            deletable={ true }
            onDelete={ handleDelete }
            onClick={ handleClick }
          />
        </GridItem>
      ))
    }
    </GridList>
  )
}

TodoListContent.proptypes = {
  className: PropTypes.string,
  handleDelete: PropTypes.func,
  handleOpenReadModal: PropTypes.func,
  data: PropTypes.array
}

export default TodoListContent;