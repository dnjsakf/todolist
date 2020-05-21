/* React */
import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
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
import Avatar from '@material-ui/core/Avatar';

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
    '&[class*="MuiOutlinedInput-root"]': {
      padding: 9,
      '& $input': {
        padding: '9.5px 4px',
      },
      '& $input:first-child': {
        paddingLeft: 6,
      },
    },
    '&[class*="MuiFilledInput-root"]': {
      paddingTop: 19,
      paddingLeft: 8,
      '& $input': {
        padding: '9px 4px',
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

/* Component */
const HashTagSelect = forwardRef(( props, ref )=>{
  /* Props */
  const classes = useStyles();
  const inputRef = useRef();
  const { 
    className,
    defaultValue,
    readOnly,
    disabled,
    ...rest
  } = props;
  
  /* State */
  const [ inputValue, setInputValue ] = useState("");
  const [ value, setValue ] = useState( defaultValue||[] );

  /* Handler */
  const handleChangeValue = useCallback(( event )=>{
    setInputValue( event.target.value );
  }, [ inputValue ]); 
  
  const handleKeyDown = useCallback(( event )=>{
    const inputKey = event.key;

    if( inputValue ){
      // Todo: 한글&특수문자 처리
      if( ["Enter", "Tab"].indexOf(inputKey) > -1 ){
        setValue([
          ...value,
          {
            id: uuid(),
            tag: inputValue,
            tag_name: inputValue,
          }
        ]);
        setInputValue("");
        event.preventDefault();
      }
    } else {
      if( inputKey === "Backspace" ){
        if( value.length > 0 ){
          setValue(value.slice(0, value.length-1));
        }
        event.preventDefault();
      } else if ( inputKey === "" ){
        event.preventDefault();
      }
    }
  }, [ value, inputValue ]);
  
  const handleDelete = (event, del_id)=>{
    const del_value = value.filter(({ id })=>( id !== del_id ));

    if( del_value.length !== value.length ){
      setValue(del_value);
    }
    
    inputRef.current.focus();
  };

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
          { ...rest }
          disableUnderline={ !!readOnly }
          className={clsx({
            [classes.inputRoot]: true,
          })}
          inputProps={{
            ref: ref({
              type: "array",
              value: value.map(({ tag, tag_name })=>({ tag, tag_name })),
              inputRef
            }),
            className: clsx({
              [classes.input]: true,
              [classes.inputFocused]: true
            }),
          }}
          value={ inputValue }
          startAdornment={
            value.map(({ id, tag, tag_name })=>(
              <InputAdornment 
                key={ id }
                position="start"
              >
                <Chip
                  label={ tag_name }
                  size="small"
                  color="secondary"
                  variant="default"
                  avatar={<Avatar>#</Avatar>}
                  { 
                    ...Object.assign({}, 
                      !readOnly && {
                        clickable: true,
                        onDelete: (event)=>( handleDelete(event, id) ),
                        deleteIcon: <DeleteIcon />
                      }
                    ) 
                  }
                />
              </InputAdornment>
            ))
          }
          endAdornment={
            !readOnly && (
              <IconButton
              aria-label={ "삭제" }
              title={ "삭제" }
              onClick={ handleClear }
            >
              <CloseIcon fontSize="small"/>
            </IconButton>
            )
          }
          onChange={ handleChangeValue }
          onKeyDown={ handleKeyDown }

          readOnly={ !!readOnly }
        />
      </FormControl>
    </div>
  )
});

HashTagSelect.propTypes = {
  defaultValue: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    tag_name: PropTypes.string.isRequired,
  })),
  readOnly: PropTypes.bool,
}

export default HashTagSelect;