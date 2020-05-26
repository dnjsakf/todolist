/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

/* Component */
const Topbar = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,
    onSidebarOpen,
    ...rest
  } = props;

  /* State */
  const [ notifications ] = useState([]);

  /* Rendering */
  return (
    <AppBar
      {...rest}
      className={ clsx( classes.root, className ) }
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/public/images/logos/logo--white.svg"
          />
        </RouterLink>
        <div className={ classes.flexGrow } />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={ notifications.length }
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={ classes.signOutButton }
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={ onSidebarOpen }
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;