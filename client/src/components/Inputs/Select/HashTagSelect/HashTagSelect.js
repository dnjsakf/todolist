/* React */
import React, { useRef, useState, useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

/* Another Modules */
import clsx from 'clsx';
import { uuid } from 'uuidv4';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  root: {
    minWidth: 300,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  inputRoot: {
    flexWrap: 'wrap',
    '& $input': {
      width: 0,
      minWidth: 30,
    },
    '&[class*="MuiInput-root"]': {
      paddingBottom: 1,
      '& $input': {
        padding: 4,
      },
      '& $input:first-child': {
        padding: '6px 0',
      },
    },
    '&[class*="MuiInput-root"][class*="MuiInput-marginDense"]': {
      '& $input': {
        padding: '4px 4px 5px',
      },
      '& $input:first-child': {
        padding: '3px 0 6px',
      },
    },
    '&[class*="MuiOutlinedInput-root"]': {
      padding: 9,
      '& $input': {
        padding: '9.5px 4px',
      },
      '& $input:first-child': {
        paddingLeft: 6,
      },
    },
    '&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
      padding: 6,
      '& $input': {
        padding: '4.5px 4px',
      },
    },
    '&[class*="MuiFilledInput-root"]': {
      paddingTop: 19,
      paddingLeft: 8,
      '& $input': {
        padding: '9px 4px',
      },
    },
    '&[class*="MuiFilledInput-root"][class*="MuiFilledInput-marginDense"]': {
      paddingBottom: 1,
      '& $input': {
        padding: '4.5px 4px',
      },
    },
  },
  input: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0,
  },
  inputFocused: {
    opacity: 1,
  },
}));

const InnerInput = forwardRef(( props, ref )=>{
  const { className, ...rest } = props;

  return (
    <Input 
      { ...rest }
    />
  )
});

/* Component */
const HashTagSelect = ( props )=>{
  /* Props */
  const { className, ...rest } = props;
  
  /* State */
  const classes = useStyles();
  const inputRef = useRef();
  const [ inputValue, setInputValue ] = useState("");
  const [ value, setValue ] = useState([]);
  const [ chips, setChips ] = useState([]);
  
  const handleChange = useCallback(( event )=>{
    setInputValue( event.target.value );
  }, [ inputValue ]); 
  
  const handleKeyDown = useCallback(( event )=>{
    const inputKey = event.key;

    if( inputValue ){
      if( ["Enter", "Tab"].indexOf(inputKey) > -1 ){
        setValue([
          ...value,
          {
            id: uuid(),
            label: inputValue
          }
        ]);
        setInputValue("");
        event.preventDefault();
      }
    } else {
      if( inputKey === "Backspace" ){
        if( value.length > 0 ){
          console.log( value.slice(0, value.length-1) )
          setValue(value.slice(0, value.length-1));
        }
        event.preventDefault();
      } else if ( inputKey === "" ){
        event.preventDefault();
      }
    }
  }, [ value, inputValue ]);
  
  const handleDelete = useCallback((event, del_id)=>{
    const del_value = value.filter(({ id })=>( id !== del_id ));

    if( del_value.length !== value.length ){
      setValue(del_value);
    }

    inputRef.current.focus();
  }, [ value ]);

  const handleClear = useCallback((event)=>{
    setInputValue("");
    setValue([]);

    inputRef.current.focus();
  }, [ value ]);

  return (
    <div className={ classes.root }>
      <FormControl
        fullWidth
      >
        <Input
          inputRef={ inputRef }
          className={clsx({
            [classes.inputRoot]: true,
          })}
          inputProps={{
            className: clsx({
              [classes.input]: true,
              [classes.inputFocused]: true
            })
          }}
          onChange={ handleChange }
          onKeyDown={ handleKeyDown }
          value={ inputValue }
          startAdornment={
            value.map(({ id, label })=>(
              <InputAdornment 
                key={ id }
                position="start"
              >
                <Chip
                  label={ label }
                  clickable
                  deleteIcon={ <DeleteIcon /> }
                  onDelete={ (event)=>(handleDelete(event, id)) }
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </InputAdornment>
            ))
          }
          endAdornment={
            <IconButton
              aria-label={ "삭제" }
              title={ "삭제" }
              onClick={ handleClear }
            >
              <CloseIcon fontSize="small"/>
            </IconButton>
          }
        />
      </FormControl>
    </div>
  )
}


HashTagSelect.propTypes = {
  
}

export default HashTagSelect;