/* React */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
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
  root: {
    width: "100%"
  },
  input: {
    textAlign: "right"
  }
}));

/* Component */
const DatePicker = ( props )=>{
  /* Props */
  const classes = useStyles();
  const { 
    inputRef,
    className,
    format,
    valueFormat,
    defaultValue,
    readOnly,
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
      <KeyboardDatePicker
        { ...rest }
        className={ clsx(
          {
            [classes.root]: true,
          },
          className
        )}
        value={ value }
        format={ format||"YYYY-MM-DD" }
        minDate={ moment() }
        margin="normal"
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        inputRef={
          inputRef({
            type: "date",
            format: valueFormat
          })
        }
        inputProps={{
          readOnly: !!readOnly,
          className: classes.input
        }}
        readOnly={ !!readOnly }
        onChange={ handleChange }
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  inputRef: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  format: PropTypes.string,
  error: PropTypes.bool,
  handleChange: PropTypes.func,
}

export default DatePicker;