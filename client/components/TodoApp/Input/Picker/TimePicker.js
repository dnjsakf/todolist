/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

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


const useStyles = makeStyles(( theme )=>{

});

const TimePicker = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const dispatch = useDispatch();

  const [ value, setValue ] = useState(()=>(
    props.defaultValue ? moment( props.defaultValue, "HHmmss" ) : moment().second(0)
  ), [ props.defaultValue ]);
  const [ error,  setError ] = useState( false );

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
        <KeyboardTimePicker
          margin="normal"
          inputRef={ elRef }
          id={ props.id }
          label={ props.label }
          format={ props.format || "HH:mm:ss" }
          value={ value }
          onChange={ handleDateChange }
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          readOnly={ props.readOnly }
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default TimePicker;