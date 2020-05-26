/* React */
import React, { Suspense, forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { NavLink as RouterLink } from 'react-router-dom';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import { blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    color: blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

/* Component */
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

/* Component */
const SidebarNav = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    pages,
    className,
    ...rest
  } = props;
  
  /* Rendering */
  return (
    <List
      {...rest}
      className={ clsx(classes.root, className )}
    >
    {
      pages.map(({ title, href, Icon })=>(
        <ListItem
          key={ title }
          className={classes.item}
          disableGutters
        >
          <Button
            activeClassName={ classes.active }
            className={ classes.button }
            component={ CustomRouterLink }
            to={ href }
          >
            <div className={ classes.icon }>
              <Icon />
            </div>
            { title }
          </Button>
        </ListItem>
      ))
    }
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;