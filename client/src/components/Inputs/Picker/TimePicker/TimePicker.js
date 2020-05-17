/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

/* Other Modules */
import moment from 'moment';;
import MomentUtils from '@date-io/moment';
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme )=>{

});

/* Component */
const TimePicker = ( props )=>{
  /* Props */
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();
  const [ value, setValue ] = useState(()=>(
    props.defaultValue ? moment( props.defaultValue, "HHmmss" ) : moment().second(0)
  ), [ props.defaultValue ]);

  /* Handlers */
  const handleDateChange = useCallback(( date )=>{
    setValue( date );
  }, [ value ]);

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Grid container justify="space-around">
        <KeyboardTimePicker
          { ...rest }
          margin="normal"
          format={ props.format || "HH:mm:ss" }
          value={ value }
          onChange={ handleDateChange }
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

TimePicker.proptypes = {
  className: PropTypes.string,
  inputRef: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string,
  format: PropTypes.string,
  error: PropTypes.bool,
}

export default TimePicker;