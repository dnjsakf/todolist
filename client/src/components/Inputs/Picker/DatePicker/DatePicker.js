/* React */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/* Other Modules */
import moment from 'moment';;
import MomentUtils from '@date-io/moment';
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({

}));

/* Component */
const DatePicker = ( props )=>{
  /* Props */
  const classes = useStyles();
  const { 
    className,
    format,
    valueFormat,
    defaultValue,
    inputRef, 
    ...rest
  } = props;

  /* State */
  const [ value, setValue ] = useState(()=>{
    return defaultValue ? moment( defaultValue, valueFormat ) : moment()
  });

  /* Handlers */
  const handleChange = ( date )=>( setValue( date ) );

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          { ...rest }
          inputRef={
            inputRef({
              type: "date",
              format: valueFormat
            })
          }
          value={ value }
          format={ format||"YYYY-MM-DD" }
          minDate={ moment() }
          margin="normal"
          onChange={ handleChange }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

DatePicker.proptypes = {
  inputRef: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  format: PropTypes.string,
  error: PropTypes.bool,
  handleChange: PropTypes.func,
}

export default DatePicker;