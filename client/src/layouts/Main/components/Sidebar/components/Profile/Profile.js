/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

/* Component */
const Profile = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,
    ...rest
  } = props;

  const user = {
    name: 'Dochi',
    avatar: '/public/images/avatars/avatar_11.png',
    bio: 'Developer'
  };

  /* Rendering */
  return (
    <div
      {...rest}
      className={ clsx(classes.root, className) }
    >
      <Avatar
        alt="Person"
        className={ classes.avatar }
        component={ RouterLink }
        src={ user.avatar }
        to="/settings"
      />
      <Typography
        className={ classes.name }
        variant="h4"
      >
        { user.name }
      </Typography>
      <Typography variant="body2">{ user.bio }</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;