/* React */
import React, { useEffect, useState, useCallback } from 'react';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';


const useStyles = makeStyles((theme)=>({

}));

const TodoListItem = ({ item, handleClick })=>{
  const classes = useStyles();

  return (
    <ListItem button>
      {
        item.star
        ? <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
        : null
      }
      <ListItemText
        primary={ `${ item.no } - ${ item.title }` }
        inset={ false }
        onClick={ (event)=>( handleClick(event, item.no) ) }
      />
    </ListItem>
  )
}

export default TodoListItem;