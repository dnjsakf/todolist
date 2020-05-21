/* React */
import React, { forwardRef, useState, useEffect, useCallback } from 'react';
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
  const classes = useStyles();
  const {
    inputRef,
    className,
    format,
    defaultValue,
    valueFormat,
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
      <Grid container justify="space-around">
        <KeyboardTimePicker
          { ...rest }
          inputRef={
            inputRef({
              type: "date",
              format: valueFormat
            })
          }
          value={ value }
          format={ format||"HH:mm:ss" }
          margin="normal"
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          onChange={ handleChange }
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

TimePicker.proptypes = {
  inputRef: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  format: PropTypes.string,
  error: PropTypes.bool,
}

export default TimePicker;