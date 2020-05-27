/* React */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //padding: '2px 4px',
    alignItems: 'center',
    //width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

/* Component */
const SearchText = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,
    inputRef,
    onSubmit,
    onRefresh,
    onEdit,
    ...rest
  } = props;
  
  /* handlers */
  const handleKeyDown = ( event )=>{
    if( event.key === "Enter" && onSubmit ){
      event.currentTarget.focus();
    
      onSubmit( event );
    }
  }

  /* Rendering */
  return (
    <Paper className={ classes.root }>
      {
        onEdit && (
          <IconButton 
            className={ classes.iconButton } 
            aria-label="edit"
            onClick={ onEdit }
          >
            <EditIcon />
          </IconButton>
        )        
      }
      {
        onRefresh && (
          <IconButton 
            className={ classes.iconButton } 
            aria-label="refresh"
            onClick={ onRefresh }
          >
            <RefreshIcon />
          </IconButton>
        )
      }
      <InputBase
        type="search"
        className={ classes.input }
        placeholder="Search ToDo"
        inputRef={ inputRef }
        inputProps={{
          'aria-label': 'search todo'
        }}
        onKeyDown={ handleKeyDown }
      />
      <IconButton
        className={ classes.iconButton } 
        aria-label="search"
        onClick={ onSubmit }
      >
        <Divider className={ classes.divider } orientation="vertical" />
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

SearchText.propTypes = {
  className: PropTypes.string,
  inputRef: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
  onEdit: PropTypes.func,
}

export default SearchText;