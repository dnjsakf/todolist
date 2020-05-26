/* React */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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
    handleSubmit,
    ...rest
  } = props;

  /* Rendering */
  return (
    <Paper component="form" className={ classes.root }>
      <IconButton className={ classes.iconButton } aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={ classes.input }
        placeholder="Search ToDo"
        inputRef={ inputRef }
        inputProps={{
          'aria-label': 'search todo'
        }}
      />
      <IconButton
        className={ classes.iconButton } 
        aria-label="search"
        onClick={ handleSubmit }
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
  handleSubmit: PropTypes.func.isRequired,
}

export default SearchText;