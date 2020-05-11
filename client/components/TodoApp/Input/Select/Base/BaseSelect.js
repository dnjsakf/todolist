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

  const [ children, setChildren ] = useState( props.children );
  const [ group, setGroup ] = useState( props.group );
  const [ options, setOptions ] = useState( props.options||[] );
  const [ value, setValue ] = useState( props.defaultValue||"" );
  const [ error, setError ] = useState( false );
  
  const callbackRef = useCallback(( element )=>{
    console.log("Element", element);
  }, []);

  /* Handler: Handle when selectd option. */
  const handleSelect = useCallback((event)=>{
    const selected = event.target.value;
    const do_update = selected && selected !== value;
    const is_back = selected === group;

    console.group("["+props.name.toUpperCase()+"][handleSelect]")
    console.log("[event]:", event);
    console.log("[current]:", selected);
    console.log("[group]:", group);
    console.log("[prev]:", value);
    console.log("[do_update]:", do_update);
    console.log("[is_back]:", is_back);
    console.groupEnd("["+props.name.toUpperCase()+"][handleSelect]")

    if( props.handleSelect && do_update ){
      props.handleSelect( event, selected, is_back );
    }
    
    setValue( selected );
    
  }, [ value, group, props.handleSelect ]);


  /* Reset State: value, options */
  useEffect(()=>{
    const do_update = JSON.stringify(props.options) !== JSON.stringify(options);
    
    console.group("["+props.name.toUpperCase()+"][Effect][options]");
    console.log("[do_update]:", do_update);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][options]");

    if( do_update ){
      setOptions( props.options );
    }
  }, [ props.options ]);
  
  /* Reset State: group */
  useEffect(()=>{
    const do_update = group !== props.group;
    
    console.group("["+props.name.toUpperCase()+"][Effect][group]");
    console.log("[do_update]:", do_update);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][group]");
    
    if( do_update ){
      setValue( props.group );
      setGroup( props.group );
    }
  }, [ props.group ]);
  
  /* Reset State: children */
  useEffect(()=>{
    const do_update = children !== props.children;
    
    console.group("["+props.name.toUpperCase()+"][Effect][children]");
    console.log("[do_update]:", do_update);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][children]");
    
    if( do_update ){
      setChildren( props.children );
    }
  }, [ props.children ]);

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
        inputRef={ callbackRef }
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
        { children }
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
  group: PropTypes.string.isRequired,
  defaultOption: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }),
  defaultValue: PropTypes.string,
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