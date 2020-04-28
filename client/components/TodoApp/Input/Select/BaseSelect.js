/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Reducers */
import { onChangeValue } from './../../../../reducers/form/SelectReducer';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BaseSelect = ( props )=>{
  /* State */
  const classes = useStyles();
  const elRef = useRef();
  const dispatch = useDispatch();
  const [ value, setValue ] = useState( props.defaultValue ? props.defaultValue : "" );

  /* Handlers */
  const handleOnChange = useCallback((event)=>{
    setValue( event.target.value );
  }, [ value ]);

  useEffect(()=>{
    dispatch(
      onChangeValue({
        parent: props.parent,
        name: props.name,
        value: value
      })
    )
  }, [ value ]);

  return (
    <FormControl 
      variant="outlined"
      className={ classes.formControl }
      fullWidth 
      size="small"
    >
      <InputLabel id={ `${props.id}-label` }>{ props.label }</InputLabel>
      <Select
        ref={ elRef }
        labelId={ `${props.id}-label` }
        id={ props.id }
        name={ props.name }
        value={ value }
        onChange={ (event)=>handleOnChange(event) }
        label={ props.label }
        className={ classes.selectBox }
      >
        <MenuItem value="">
          <em>선택</em>
        </MenuItem>
        {
          props.options.map(({ id, value, label })=>(
            <MenuItem key={ id } value={ value }>{ label }</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default BaseSelect;