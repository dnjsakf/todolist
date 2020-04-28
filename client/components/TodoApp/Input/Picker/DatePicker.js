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
  KeyboardDatePicker,
} from '@material-ui/pickers';

/* Other Modules */
import moment from 'moment';;
import MomentUtils from '@date-io/moment';


const useStyles = makeStyles((theme) => ({

}));

const DatePicker = ( props )=>{
  /* State */
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ value, setValue ] = useState(()=>{
    return props.defaultValue ? moment(props.defaultValue, "YYYYMMDD") : moment()
  });

  /* Handlers */
  const handleDateChange = useCallback(( date )=>{
    setValue( date );
  }, [ value ]);

  useEffect(()=>{
    dispatch(
      onChangeValue({
        parent: props.parent,
        name: props.name,
        value: value.format( props.valueFormat || "YYYYMMDD" )
      })
    );
  }, [ value ]);

  return (
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      <Grid container justify="space-around">
        {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="MM/dd/yyyy"
          label="Date picker inline"
          value={ value }
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        <KeyboardDatePicker
          margin="normal"
          id={ props.id }
          label={ props.label }
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

export default DatePicker;