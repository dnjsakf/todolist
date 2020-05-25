/* React */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery, useMutation } from '@apollo/react-hooks';
import Query from 'GraphQL/Query/TodoList';
import Mutation from 'GraphQL/Mutation/TodoList';

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
import { BasePopover } from 'Components/Popover';

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
    data: {
      id: data_id,
    },
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
  const [ readMode, setReadMode ] = useState( !!data_id ); // 읽기: true, 쓰기: false

  /* Query: GET_TODO_LIST_FIELD */
  const { loading, error, data, refetch } = useQuery(
    Query.GET_TODO_LIST_FIELD, { 
      skip: !data_id,
      variables: {
        no: data_id
      },
      onError(error){
        console.error( error );
      },
      onCompleted( loadded ){
        console.log("[TODO_LIST][LOADED]", data_id, loadded );
      }
    }
  );

  /* Mutation: Create */
  const [ 
    createTodoList, 
    { 
      data: created, 
      loading: creating, 
    }
  ] = useMutation(
    Mutation.CREATE_TODO_LIST, {
    onError( error ){
      console.error( error );
    },
    onCompleted({ create_todo_list: { success, todo_list_field: { no } } }) {
      console.log("[TODO_LIST][CREATED]", success, no);
      setReadMode( true );
    }
  });

  /* Mutation: Update */
  const [ 
    updateTodoList, 
    { 
      data: updated, 
      loading: updating, 
    }
  ] = useMutation(
    Mutation.UPDATE_TODO_LIST, {
    onError( error ){
      console.error( error );
    },
    onCompleted({ update_todo_list : { success } }) {
      console.log("[TODO_LIST][UPDATED]", success);
      setReadMode( true );
    }
  });

  /* Handlers */
  /* Handler: Change Mode */
  const handleReadMode = ( mode )=>( event )=>( setReadMode( mode ) );
  
  /* Handler: Change Mode for Read */
  const handleCancel = useCallback((event)=>{
    setReadMode( true );
  }, [ handleClose ]);

  /* Handler: Save form-data */
  const handleSave = useCallback(( event )=>{
    const variables = getValues();
    
    if( !readMode ){
      if( data_id ){
        updateTodoList({
          variables: {
            ...variables,
            no: data_id
          }
        });
      } else {
        createTodoList({
          variables
        });
      }
    }

  }, [ data_id, readMode, getValues ]);

  if( data_id ){
    if( error ){
      console.error( error );
      return <span>Data Load Error...</span>;
    }
    if( loading ){
      return <span>Data Loadding...</span>;
    }
    if( !data ){
      return <span>Data is Null...</span>
    }
  }

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

              defaultValue={ data && data.todo_list_field.title }
              readOnly={ readMode }
              // error={ !!( errors && errors.title ) }
            />
          </Grid>
          <Grid item xs={ 12 }>
          {
            data
            ? <CommonCodeSelect
                ref={ refs }
                id="status"
                name="status"
                code={ data.todo_list_field.status.p_code }
                defaultValue={ data.todo_list_field.status.code }
                data={ data.todo_list_field.status_codes }
                required={ true }
                readOnly={ readMode }
              />
            : <CommonCodeSelect
                ref={ refs }
                id="status"
                name="status"
                code="TODO_STATUS"
                required={ true }
                readOnly={ readMode }
              />
          }
          </Grid>
          <Grid item xs={ 12 }>
          {
            data
            ? <CommonCodeSelect
                ref={ refs }
                id="category"
                name="category"
                code={ data.todo_list_field.category.p_code }
                defaultValue={ data.todo_list_field.category.code }
                data={ data.todo_list_field.category_codes }
                required={ true }
                readOnly={ readMode }
              />
            : <CommonCodeSelect
                ref={ refs }
                id="category"
                name="category"
                code="TODO_CATE"
                required={ true }
                readOnly={ readMode }
              />
          }
          </Grid>
          <Grid item xs={ 12 }>
            <HashTagSelect
              ref={ refs }
              id="hash_tag"
              name="hash_tag"

              defaultValue={ data && data.todo_list_field.hash_tag }
              readOnly={ readMode }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <Grid 
              container 
              direction="row" 
              spacing={ 1 }
            >
              <Grid item xs={ 6 }>
                <DatePicker
                  inputRef={ refs }
                  id="date-picker-dialog"
                  name="due_date"
                  label="마감일"
                  format="YYYY-MM-DD"
                  valueFormat="YYYYMMDD"

                  defaultValue={ data && data.todo_list_field.due_date }
                  readOnly={ readMode }
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

                  defaultValue={ data && data.todo_list_field.due_time }
                  readOnly={ readMode }
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
              placeholder="상세내용"

              defaultValue={ data && data.todo_list_field.description }
              readOnly={ readMode }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <Grid
              container 
              direction="row" 
              justify="center"
              alignItems="center"
            >
            { 
              readMode
              ? <BaseButton
                  id="btn-update"
                  label="수정"
                  color="primary"
                  size="sm"
                  onClick={ handleReadMode(false) }
                />
              : <ButtonGroup>
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
            }
            </Grid>
          </Grid>
        </Grid>
      </form>
      <BasePopover isOpen={ creating }>
        <span>Now Loading....</span>
      </BasePopover>
      <BasePopover isOpen={ !!created } closeInterval={ 3000 }>
        <span>Save Successed!!!</span>
      </BasePopover>
    </Paper>
  )
}

TodoInfoRegister.proptypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func
}

export default TodoInfoRegister;