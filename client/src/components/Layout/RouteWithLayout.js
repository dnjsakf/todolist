import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import MainLayout from './Main';

const RouteWithLayout = ( props )=>{
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;