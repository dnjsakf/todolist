/* React */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BaseSelect = ( props )=>{
  /* Props */
  const {
    parent,
    className, 
    handleSelect, 
    defaultOptions: _defaultOptions, 
    options: _options, 
    defaultValue: _deafultValue, 
    ...rest
  } = props;

  /* State */
  const classes = useStyles();

  const [ group, setGroup ] = useState( props.group );
  const [ depth, setDepth ] = useState( 1 );
  const [ defaultOptions, setDefaultOptions ] = useState( props.defaultOptions||[] );
  const [ options, setOptions ] = useState( props.options||[] );
  const [ value, setValue ] = useState( props.defaultValue||"" );
  const [ error, setError ] = useState( false );

  /* Handler: Handle when selectd option. */
  const onSelect = useCallback((event)=>{
    const selected = event.target.value;

    if( selected === undefined || selected === 0 ) return false;

    const selected_depth = selected.split(":").length;
    const do_update = selected !== value;
    const is_back = depth > selected_depth;

    console.groupCollapsed("["+props.name.toUpperCase()+"][handleSelect]")
    console.log("[event.target]:"   , event.target);
    console.log("[current]:"        , selected);
    console.log("[group]:"          , group);
    console.log("[prev]:"           , value);
    console.log("[do_update]:"      , do_update);
    console.log("[is_back]:"        , is_back);
    console.log("[depth][prev]:"    , depth);
    console.log("[depth][crnt]:"    , selected_depth);
    console.groupEnd("["+props.name.toUpperCase()+"][handleSelect]")
    
    if( handleSelect && do_update ){
      handleSelect( event, selected, is_back );
    }
    
    setValue( selected );
    setDepth( selected_depth );
    
  }, [ value, group, handleSelect ]);

  
  /* Reset State: group */
  useEffect(()=>{
    const do_update = group !== props.group;
    
    console.groupCollapsed("["+props.name.toUpperCase()+"][Effect][group]");
    console.log("[do_update]:", do_update);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][group]");
    
    if( do_update ){
      setGroup( props.group );
    }
  }, [ props.group ]);
  
  /* Reset State: depth */
  useEffect(()=>{
    const do_update = depth !== props.depth;
    
    console.groupCollapsed("["+props.name.toUpperCase()+"][Effect][depth]");
    console.log("[do_update]:", do_update);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][depth]");
    
    if( do_update ){
      setDepth( props.depth );
    }
  }, [ props.depth ]);

  /* Reset State: children */
  useEffect(()=>{
    const do_update = defaultOptions !== props.defaultOptions;
    
    console.groupCollapsed("["+props.name.toUpperCase()+"][Effect][defaultOptions]");
    console.log("[do_update]:", do_update);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][defaultOptions]");
    
    if( do_update ){
      setDefaultOptions( props.defaultOptions );
    }
  }, [ props.defaultOptions ]);

  /* Reset State: value, options */
  useEffect(()=>{
    const do_update = JSON.stringify(props.options) !== JSON.stringify(options);
    
    console.groupCollapsed("["+props.name.toUpperCase()+"][Effect][options]");
    console.log("[do_update]:", do_update);
    console.groupEnd("["+props.name.toUpperCase()+"][Effect][options]");

    if( do_update ){
      setOptions( props.options );
    }
  }, [ props.options ]);


  /* Check Render */

  return (
    <FormControl
      component="fieldset"
      variant="outlined"
      className={ clsx(classes.formControl, className) }
      fullWidth 
      size="small"
    >
      <InputLabel id={ `${props.id}-label` }>{ props.label }</InputLabel>
      <Select
        { ...rest }
        labelId={ `${props.id}-label` }
        className={ classes.selectBox }
        
        value={ value }
        onClick={ onSelect }
        
        required={ props.required && !props.readOnly }
        inputProps={{
          readOnly: !!props.readOnly
        }}
        autoFocus={ false }
      >
        {
          defaultOptions && defaultOptions.map(({ id, value, label })=>(
            <MenuItem key={ id } value={ value }>{ label }</MenuItem>
          ))
        }
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
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  group: PropTypes.string,
  defaultValue: PropTypes.string,
  defaultOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.string.isRequired
  })),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  error: PropTypes.bool,
}

export default BaseSelect;