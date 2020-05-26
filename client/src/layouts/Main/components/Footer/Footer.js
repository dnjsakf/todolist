/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    padding: theme.spacing(4)
  }
}));

/* Component */
const Footer = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,
    ...rest
  } = props;

  /* Rendering */
  return (
    <div
      {...rest}
      className={ clsx(classes.root, className) }
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://github.com/dnjsakf/todolist"
          target="_blank"
        >
        { "허도치" }
        </Link>
        { ". 2020" }
      </Typography>
      <Typography variant="caption">
      { "나의 첫번째 투두리스트!" }
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;