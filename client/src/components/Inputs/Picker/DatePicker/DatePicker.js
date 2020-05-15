/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

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


/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({

}));

/* Component */
const DatePicker = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const dispatch = useDispatch();

  const [ value, setValue ] = useState(()=>{
    return props.defaultValue ? moment( props.defaultValue, "YYYYMMDD" ) : moment()
  });
  const [ error, setError ] = useState( false );

  /* Handlers */
  /* Handler: Reset value, error */
  const handleDateChange = useCallback(( date )=>{

    /* Validation */
    if( props.required ){
      if( !date ){
        setError( true );
      } else {
        setError( false );
      }
    }

    if( props.action ){
      dispatch( props.action( value ) );
    }

    setValue( date );

  }, [ value, error ]);

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          inputRef={ elRef }
          id={ props.id }
          label={ props.label }
          format={ props.format || "YYYY-MM-DD" }
          value={ value }
          minDate={ moment() }
          onChange={ handleDateChange }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          error={ error }
          readOnly={ props.readOnly }
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;