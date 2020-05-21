/* React */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useMutation } from '@apollo/react-hooks';
import { TodoListMutation } from 'GraphQL/Mutation';

/* Material */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';

/* Components */
import { 
  CommonCodeSelect,
  HashTagSelect
} from 'Components/Inputs/Select';
import { BaseButton } from 'Components/Inputs/Button';
import { BaseText } from 'Components/Inputs/Text';
import { BaseTextarea } from 'Components/Inputs/Textarea';
import { DatePicker, TimePicker } from 'Components/Inputs/Picker';

/* Another Modules */
import clsx from 'clsx';
import moment from 'moment';;

/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 350
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
  gridContainer: {
    height: 50
  },
  small: {
    width: 400
  },
  middle: {
    width: 500
  },
  large: {
    width: 600
  },
  fullWidth: {
    width: "100%"
  },
}));

function useFormRef(){
  let refs = {};
    
  function options_validate( options ){
    try {
      if( options ){
        switch( options.type ){
          case "date":
          case "time":
          case "datetime":
            if( !options.format ) return [ false, "'format' is undefined." ];
            return [ true, null ];
            
          case "json":
            if( !options.extra ) return [ false, "'extra' is undefined." ];
            return [ true, null ];
            
          case "array":
            if( !options.value ) return [ false, "'value' is undefined." ];
            return [ true, null ];
            
          default:
            return [ true, null ];
        }
      } else {
        return [ true, null ];
      }
    } catch( error ) {
      return [ false, error ];
    }
  }
  
  function setRef( options ){
    const [ isValid, message ] = options_validate( options );
    
    if( !isValid ){
      console.error( message );
      return null;
    }
    
    return function( element ){
      if( !element ) return;
      
      /* Set Variables */
      const name = ( element.node ? element.node.name : element.name );
      
      if( !options ) {
        refs = Object.assign({}, refs, {
          [name]: element.value
        });
      } else {
        const value = ( options.value||element.value );
      
        /* Other Refs */
        if( options.inputRef ){
          options.inputRef.current = element;
        }
        
        /* Set Ref data */
        switch ( options.type ){
          case "date":
          case "time":
          case "datetime":
            refs = Object.assign({}, refs, {
              [name]: moment(value, options.format).format(options.format)
            });
            break;
          case "json":
            refs = Object.assign({}, refs, {
              [name]: {
                ...options.extra,
                [options.name]: value
              }
            });
            break;
          case "array":
            refs = Object.assign({}, refs, {
              [name]: value
            });
            break;
          default:
            refs = Object.assign({}, refs, {
              [name]: value
            });
        }
      }
    }
  }
  
  return {
    refs: setRef,
    getValues: ()=>{
      return refs;
    },
    clear: ()=>{
      refs = {}
    }
  }
}

/* Component */
const TodoInfoRegister = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,
    handleClose,
    small,
    middle,
    large,
    fullWidth,
    ...rest
  } = props;

  /* State */
  const formRef = useRef();
  const { refs, getValues } = useFormRef();

  const [ 
    saveTodoData, 
    { 
      data: created, 
      loading: mutationLoading, 
    }
  ] = useMutation(
    TodoListMutation.CREATE_TODO, {
    onError( error ){
      console.error( error );
    },
    onCompleted({ create_todo_list: { todo_list_field: { no } } }) {
      if( handleClose ){
        handleClose();
      }
    }
  });

  /* Handlers */
  /* Handler: Cancel form-data */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();
    
    if( handleClose ){
      handleClose();
    }
  }, [ handleClose ]);

  /* Handler: Save form-data */
  const handleSave = useCallback(( event )=>{
    event.preventDefault();
    
    const variables = getValues();
    
    console.log( 'save' );
    console.log( variables );

    saveTodoData({
      variables
    });
  }, [ getValues ]);
  
  if( mutationLoading ) return <span>Now Loading....</span>;

  return (
    <Paper
      elevation={ 5 }
      className={ clsx(
        {
          [classes.root]: true,
          [classes.paper]: true,
          [classes.small]: small,
          [classes.middle]: middle,
          [classes.large]: large,
          [classes.fullWidth]: fullWidth,
        },
        className
      )}
    >
      <form
        ref={ formRef }
        id={ props.id }
        name={ props.name }
        noValidate
        autoComplete="off"
      >
        <Grid 
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          spacing={ 1 }
        >
          <Grid item xs={ 12 }>
            <BaseText
              ref={ refs }
              id="title" 
              name="title"
              label="제목"
              placeholder="제목을 입력해주세요."
              maxLength={ 30 }
              required={ true }
              // error={ !!( errors && errors.title ) }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <CommonCodeSelect
              ref={ refs }
              id="status"
              name="status"
              code="TODO_STATUS"
              required={ true }
              // error={ !!( errors && errors.status ) }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <CommonCodeSelect
              ref={ refs }
              id="category"
              name="category"
              code="TODO_CATE"
              required={ true }
              // error={ !!( errors && errors.category ) }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <HashTagSelect
              ref={ refs }
              id="hash_tag"
              name="hash_tag"
            />
          </Grid>
          <Grid item xs={ 12 }>
            <Grid container direction="row" spacing={ 1 }>
              <Grid item xs={ 6 }>
                <DatePicker
                  inputRef={ refs }
                  id="date-picker-dialog"
                  name="due_date"
                  label="마감일"
                  format="YYYY-MM-DD"
                  valueFormat="YYYYMMDD"
                  required={ true }
                  // error={ !!( errors && errors.due_date ) }
                />
              </Grid>
              <Grid item xs={ 6 }>
                <TimePicker
                  inputRef={ refs }
                  id="time-picker-dialog"
                  name="due_time"
                  label="마감시간"
                  format="HH:mm:ss"
                  valueFormat="HHmmss"
                  required={ true }
                  // error={ !!( errors && errors.due_time ) }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={ 12 }>
            <BaseTextarea
              ref={ refs }
              id="description"
              name="description"
              rows={ 5 }
              rowsMax={ 5 }
              maxLength={ 100 }
              placeholder="Description"
            />
          </Grid>
          <Grid item xs={ 12 }>
            <Grid
              container 
              direction="row" 
              justify="center"
              alignItems="center"
            >
              <ButtonGroup>
                <BaseButton
                  id="btn-cancel"
                  label="취소"
                  color="primary"
                  size="sm"
                  onClick={ handleCancel }
                />
                <BaseButton
                  id="btn-save"
                  label="저장"
                  color="primary"
                  size="sm"
                  onClick={ handleSave }
                />
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

TodoInfoRegister.proptypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func
}

export default TodoInfoRegister;