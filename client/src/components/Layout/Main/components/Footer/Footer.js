import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

import clsx from 'clsx';


const useStyles = makeStyles((theme)=>({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = ( props )=>{
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://github.com/dnjsakf/todolist"
          target="_blank"
        >
          허도치
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        나의 첫번째 투두리스트!
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;