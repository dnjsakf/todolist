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
  const { 
    className,
    handleChange,
    valueFormat,
    format,
    defaultValue,
    ...rest
  } = props;

  /* State */
  const classes = useStyles();
  const [ value, setValue ] = useState(()=>{
    return defaultValue ? moment( defaultValue, valueFormat ) : moment()
  });

  /* Handlers */
  const handleDateChange = useCallback(( date )=>{
    setValue( date );
  }, [ value ]);

  useEffect(()=>{
    handleChange( props.name, moment(value, valueFormat).format(valueFormat) );
  }, [ value ]);

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          { ...rest }
          margin="normal"
          format={ format || "YYYY-MM-DD" }
          value={ value }
          minDate={ moment() }
          onChange={ handleDateChange }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

DatePicker.proptypes = {
  className: PropTypes.string,
  inputRef: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string,
  format: PropTypes.string,
  error: PropTypes.bool,
  handleChange: PropTypes.func,
}

export default DatePicker;