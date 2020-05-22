/* React */
import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

/* Other Modules */
import moment from 'moment';;
import MomentUtils from '@date-io/moment';
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme )=>({
  root: {
    width: "100%"
  }
}));

/* Component */
const TimePicker = ( props )=>{
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
  const [ value, setValue ] = useState(()=>(
    defaultValue ? moment( defaultValue, valueFormat ) : moment().second(0)
  ), [ defaultValue ]);

  /* Handlers */
  const handleChange = ( date )=>( setValue( date ) );

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <KeyboardTimePicker
        { ...rest }
        value={ value }
        className={ classes.root }
        format={ format||"HH:mm:ss" }
        margin="normal"
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
        inputRef={
          inputRef({
            type: "date",
            format: valueFormat
          })
        }
        inputProps={{
          readOnly: !!readOnly,
        }}
        readOnly={ !!readOnly }
        onChange={ handleChange }
      />
    </MuiPickersUtilsProvider>
  );
}

TimePicker.propTypes = {
  inputRef: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  format: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,

  // inputProps
  readOnly: PropTypes.bool,
}

export default TimePicker;