/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actionSetData } from './../../../../reducers/form/DataReducer';

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


const useStyles = makeStyles(( theme ) => ({

}));

const DatePicker = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const dispatch = useDispatch();
  const isError = useSelector(({ form })=>{
    if( form.data[props.parent] && form.data[props.parent][props.name] ){
      return form.data[props.parent][props.name].error;
    }
    return false;
  });

  const [ value, setValue ] = useState(()=>{
    return props.defaultValue ? moment( props.defaultValue, "YYYYMMDD" ) : moment()
  });
  const [ error, setError ] = useState( isError );

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

    setValue( date );

  }, [ value, error ]);

  /* Reset error */
  useEffect(()=>{
    setError( isError );
  }, [ isError ]);

  /* Call dispatch */
  useEffect(()=>{
    dispatch(
      actionSetData({
        parent: props.parent,
        name: props.name,
        value: value ? value.format( props.valueFormat || "YYYYMMDD" ) : value,
        error: error,
        required: !!props.required
      })
    );
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