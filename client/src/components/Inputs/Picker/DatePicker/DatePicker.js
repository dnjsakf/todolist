/* React */
import React, { useState, useCallback } from 'react';
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
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();
  const [ value, setValue ] = useState(()=>{
    return props.defaultValue ? moment( props.defaultValue, "YYYYMMDD" ) : moment()
  });

  /* Handlers */
  const handleDateChange = useCallback(( date )=>{
    setValue( date );
  }, [ value ]);

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          { ...rest }
          margin="normal"
          format={ props.format || "YYYY-MM-DD" }
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
}

export default DatePicker;