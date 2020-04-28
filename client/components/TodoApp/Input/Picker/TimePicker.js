/* React */
import React, { useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Reducers */
import { onChangeValue } from './../../../../reducers/form/SelectReducer';

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


const useStyles = makeStyles((theme)=>{

});

const TimePicker = ( props )=>{
  /* State */
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ value, setValue ] = useState(()=>{
    return props.defaultValue ? moment(props.defaultValue, "HHmmss") : moment().second(0)
  });

  /* Handlers */
  const handleDateChange = (date) => {
    setValue( date );
  };

  useEffect(()=>{
    dispatch(
      onChangeValue({
        parent: props.parent,
        name: props.name,
        value: value.format( props.valueFormat || "HHmmss")
      })
    )
  }, [ value ]);

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Grid container justify="space-around">
        <KeyboardTimePicker
          margin="normal"
          id={ props.id }
          label={ props.label }
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

export default TimePicker;