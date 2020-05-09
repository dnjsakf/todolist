/* React */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

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
  /* Initialize State */
  const classes = useStyles();
  const elRef = useRef();

  const [ options, setOptions ] = useState( props.options || [] );
  const [ value, setValue ] = useState( props.defaultValue||"@@SELECT@@" );
  const [ error, setError ] = useState( false );


  /* Handler: Handle when selectd option. */
  const handleSelect = useCallback((event)=>{
    let selected = String(elRef.current.value||"@@SELECT@@");

    if( props.handleSelect && selected !== "@@SELECT@@" ){
      props.handleSelect( event, selected, selected === "@@BACK@@" );
    }

    console.group("["+props.name.toUpperCase()+"][handleSelect]")
    console.log("["+props.name.toUpperCase()+"][group]", props.group);
    console.log("["+props.name.toUpperCase()+"][prev]", value);
    console.log("["+props.name.toUpperCase()+"][current]", selected);
    console.log("["+props.name.toUpperCase()+"][is_same]", value !== selected);
    console.groupEnd("["+props.name.toUpperCase()+"][handleSelect]")

    if( value !== selected ){
      setValue( selected );
    }

  }, [ value, props.handleSelect, props.group ]);


  /* Reset State: options, value */
  useEffect(()=>{
    const is_same = JSON.stringify(props.options) === JSON.stringify(options);
    
    console.group("["+props.name.toUpperCase()+"][Effect][options]")
    console.log("is_same:", is_same);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][options]")

    if( !is_same ){
      setValue( "@@SELECT@@" );
      setOptions( props.options );
    }
  }, [ props.options ]);


  /* Logging State: value */
  // useEffect(()=>{
  //   console.log("["+props.name.toUpperCase()+"][value][current]", value);
  //   return ()=>{
  //     console.log("["+props.name.toUpperCase()+"][value][previous]", value);
  //   }
  // }, [ value ]);

  /* Check Render */

  return (
    <FormControl
      component="fieldset"
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
        className={ classes.selectBox }
        name={ props.name }
        label={ props.label }
        
        value={ value }
        onClick={ handleSelect }
        
        error={ error }
        required={ props.required && !props.readOnly }
        inputProps={{
          readOnly: !!props.readOnly
        }}
        autoFocus={ false }
      >
        <MenuItem value={ "@@BACK@@" }>
          <em>이전</em>
        </MenuItem>
        <MenuItem value={ "@@SELECT@@" }>
          <em>선택</em>
        </MenuItem>
        {
          options.map(({ id, value, label })=>(
            <MenuItem key={ id } value={ value }>{ label }</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

BaseSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.string.isRequired
  })),
}

export default BaseSelect;