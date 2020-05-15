import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const withRoute = props => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={ ( _props )=>( <Component {..._props} />) }
    />
  );
};

withRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default withRoute;
