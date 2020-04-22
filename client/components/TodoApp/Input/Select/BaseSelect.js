/* React */
import React, { useRef, useEffect, useState } from 'react';

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BaseSelect = ( props )=>{
  const classes = useStyles();
  const elRef = useRef();
  const [ value, setValue ] = useState("");

  const handleChange = (event)=>{
    if( props.onChange ){
      props.onChange( event.target.value );
    }
    setValue(event.target.value);
  };

  // Initial Callback
  useEffect(()=>{
    if( props.onChange ){
      props.onChange( value );
    }
  },[ elRef ]);

  return (
    <FormControl 
      variant="outlined"
      className={ classes.formControl }
      fullWidth 
      size="small"
    >
      <InputLabel id={ `${props.id}-label` }>{ props.name }</InputLabel>
      <Select
        ref={ elRef }
        labelId={ `${props.id}-label` }
        id={ props.id }
        name={ props.name }
        value={ value }
        onChange={ handleChange }
        label={ props.name }
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