/* React */
import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

/* Components */
import { GridContainer, GridItem } from 'Components/Grid'

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  root: {
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
  fullWidth: {
    width: "100%"
  },
  input: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0,
  },
  inputFocused: {
    opacity: 1,
  },
  clearButton: {
    position: "absolute",
    right: 0,
    padding: theme.spacing(1)
  },
  inputAdornment: {
    marginTop: theme.spacing(1.75),
    marginBottom: theme.spacing(1.75),
    marginRight: theme.spacing(0.5),
  }
}));

/* Component */
const HashTagText = forwardRef(( props, ref )=>{
  /* Props */
  const classes = useStyles();
  const inputRef = useRef();
  const { 
    className,
    defaultValue,
    readOnly,
    disabled,
    fullWidth,
    onSubmit,
    maxLength,
    maxHashTag,
    ...rest
  } = props;
  
  /* State */
  const [ inputValue, setInputValue ] = useState("");
  const [ value, setValue ] = useState( defaultValue||[] );
  const [ focused, setFocused ] = useState( false );
  const [ placeholder, setPlaceholder ] = useState("");

  /* Handler */
  const handleChange = useCallback(( event )=>{
    if( value.length < maxHashTag ){
      setInputValue( event.currentTarget.value );
    }
  }, [ value, inputValue ]); 
  
  const handleKeyPress = ( event )=>{
    switch( event.key ){
      case "Enter":
      case "Tab":
      case " ":
        if( inputValue ){
          setValue([
            ...value,
            inputValue
          ]);
          setInputValue("");
        }
        event.preventDefault();
        break;
    }
  }

  const handleKeyDown = ( event )=>{
    switch( event.key ){
      case "Backspace":
        if( !inputValue ){
          if( value.length > 0 ){
            setValue(value.slice(0, value.length-1));
          }
          event.preventDefault();
        }
        break;
    }
  }

  const handleFocus = ( event )=>{
    setFocused( true );
  }
  const handleBlur = ( event )=>{
    setFocused( false );
  }
  
  const handleDelete = (del_tag, del_idx, event)=>{
    const del_value = value.filter(( tag, idx )=>( !(tag === del_tag && idx === del_idx) ));

    if( del_value.length !== value.length ){
      setValue(del_value);
    }
    
    inputRef.current && inputRef.current.focus();
  };

  const handleClear = useCallback((event)=>{
    setInputValue("");
    setValue([]);

    inputRef.current && inputRef.current.focus();
  }, [ value ]);

  /* Effects */
  useEffect(()=>{
    onSubmit && onSubmit( value );

    if( value.length < maxHashTag ){
      setPlaceholder("");
    } else {
      setPlaceholder("더이상 입력할 수 없습니다.");
    }
  }, [ value ]);

  useEffect(()=>{
    if( !focused ){
      setPlaceholder("");
      setInputValue("");
    }
  }, [ focused ]);

  /* Rendering */
  return (
    <>
      <Input
        { ...rest }
        disableUnderline={ !!readOnly }
        className={ clsx({
          [classes.root]: true,
          [classes.fullWidth]: fullWidth,
        })}
        inputProps={{
          ref: ref && ref({
            type: "array",
            value: value,
            inputRef
          }),
          className: clsx({
            [classes.input]: true,
            [classes.inputFocused]: focused,
          }),
          maxLength: maxLength,
          placeholder: placeholder,
        }}
        value={ inputValue }
        startAdornment={
          value.map(( hash_tag, idx )=>(
            <InputAdornment
              key={ hash_tag+idx }
              position="start"
              className={ classes.inputAdornment}
            >
              <Chip
                label={ hash_tag }
                size="small"
                color="primary"
                variant="default"
                avatar={<Avatar>#</Avatar>}
                { 
                  ...Object.assign({}, 
                    !readOnly && {
                      clickable: true,
                      onDelete: handleDelete.bind( null, hash_tag, idx ),
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
              className={ classes.clearButton }
            >
              <CloseIcon fontSize="small"/>
            </IconButton>
          )
        }

        {
          ...Object.assign({},
            !readOnly && {
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onKeyPress: handleKeyPress
            }
          )
        }
        onFocus={ handleFocus }
        onBlur={ handleBlur }

        readOnly={ !!readOnly || !focused }
      />
    </>
  )
});

HashTagText.propTypes = {
  defaultValue: PropTypes.array,
  readOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onSubmit: PropTypes.func,
  maxLength: PropTypes.number,
  maxHashTag: PropTypes.number,
}

HashTagText.defaultProps = {
  readOnly: false,
  fullWidth: true,
  maxLength: 10,
  maxHashTag: 15,
}

export default HashTagText;