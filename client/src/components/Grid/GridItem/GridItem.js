/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import Grid from '@material-ui/core/Grid';

/* Component */
const GridItem = ( props )=>{
  /* Props */
  const {
    children,
    ...rest
  } = props;
  
  return (
    <Grid item
      { ...rest }
    >
      { children }
    </Grid>
  )
}

GridItem.proptypes = {
  className: PropTypes.string,
  lg: PropTypes.oneOf([
    true, false, 'auto',
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ]),
  md: PropTypes.oneOf([
    true, false, 'auto',
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ]),
  sm: PropTypes.oneOf([
    true, false, 'auto',
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ]),
  xs: PropTypes.oneOf([
    true, false, 'auto',
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ]),
  xl: PropTypes.oneOf([
    true, false, 'auto',
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ]),
  spacing: PropTypes.oneOf([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ])
}

export default GridItem;