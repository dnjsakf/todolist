/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import Grid from '@material-ui/core/Grid';

/* Component */
const GridContainer = ( props )=>{
  /* Props */
  const {
    children,
    ...rest
  } = props;
  
  return (
    <Grid container
      { ...rest }
    >
      { children }
    </Grid>
  )
}

GridContainer.proptypes = {
  className: PropTypes.string,
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around'
  ]),
  alignItems: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline'
  ]),
  direction: PropTypes.oneOf([
    'row',
    'row-reverse',
    'column',
    'column-reverse'
  ]),
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly'
  ]),
  
}

export default GridContainer;