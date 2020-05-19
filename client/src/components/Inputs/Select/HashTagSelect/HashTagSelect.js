/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';

/* Another Modules */
import clsx from 'clsx';
import { uuid } from 'uuidv4';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  root: {
    minWidth: 300,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));


const DeleteChip = ( props )=>{
  const {
    key,
    handleDelete,
    ...rest
  } = props;
  
  return (
    <Chip
      { ...rest }
      clickable
      onDelete={ (event)=>( handleDelete(event, key) ) }
      deleteIcon={<DeleteIcon />}
    />
  )
}


/* Component */
const HashTagSelect = ( props )=>{
  /* Props */
  const { className, ...rest } = props;
  
  /* State */
  const classes = useStyles();
  const [ inputValue, setInputValue ] = useState("");
  const [ value, setValue ] = useState([]);
  
  const handleChange = useCallback(( event )=>{
    setInputValue( event.target.value );
  }, [ inputValue ]); 
  
  const handleKeyDown = useCallback(( event )=>{
    if( !inputValue ) return false;
    switch( event.key ){
      case "Enter":
      case "Tab":
        setValue([
          ...value,
          inputValue
        ]);
        setInputValue("");
        event.preventDefault();
    }
  }, [ value, inputValue ]);
  
  const handleDelete = useCallback((event, a, b, c)=>{
    console.info( a, b, c );
  }, [ value ]);

  return (
    <div className={ classes.root }>
      <Input
        onChange={ handleChange }
        onKeyDown={ handleKeyDown }
        value={ inputValue }
      />
      {
        value.map(( label )=>(
          <DeleteChip
            key={ uuid() }
            label={ label }
            handleDelete={ handleDelete }
            size="small"
            color="primary"
            //variant="outlined"
          />
        ))
      }
    </div>
  )
}


HashTagSelect.propTypes = {
  
}

export default HashTagSelect;