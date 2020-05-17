/* React */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';

/* Redux */
import { useDispatch } from 'react-redux';

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
  StatusSelect,
  CategorySelect
} from 'Components/Inputs/Select';
import { BaseButton } from 'Components/Inputs/Button';
import { BaseText } from 'Components/Inputs/Text';
import { BaseTextarea } from 'Components/Inputs/Textarea';
import { DatePicker, TimePicker } from 'Components/Inputs/Picker';

/* Another Modules */
import clsx from 'clsx';


/* Materialize Styles */
const useStyles = makeStyles((theme)=>({
  root: {
    width: 350
  },
  form: {

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
}));

/* Component */
const TodoInfoRegister = ( props )=>{
  /* Props */
  const { className, handleClose, ...rest } = props;

  /* State */
  const classes = useStyles();
  const elRef = useRef();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, errors } = useForm();

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
    onCompleted({ create_todo_info: { todo_info: { no } } }) {
      if( handleClose ){
        handleClose();
      }
    }
  });

  /* Handlers */
  /* Handler: Clear form-data */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    if( handleClose ){
      handleClose();
    }
  }, []);

  /* Handler: Save form-data */
  const handleSave = useCallback(( formData )=>{
    event.preventDefault();

    // saveTodoData(save_data);
    console.log( 'save' );
    console.log( formData );

  }, [ register ]);
  
  if( mutationLoading ) return <span>Now Loading....</span>;

  return (
    <Paper 
      elevation={ 5 }
      className={ clsx(
        {
          [classes.root]: true,
          [classes.paper]: true
        }, 
        className
      )}
    >
      <Grid container>
        <form 
          ref={ elRef }
          id={ props.id }
          name={ props.name }
          className={ classes.form }
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleSave)}
          >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={ classes.gridContainer }
          >
            <Grid item xs={ 12 }>
              <BaseText
                inputRef={ register({ required: true }) }
                parent={ props.id }
                id="title" 
                name="title"
                label="제목"
                placeholder="제목을 입력해주세요."
                maxLength={ 30 }
                required={ true }
                error={ !!(errors && errors.title) }
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={ classes.gridContainer }
          >
            <Grid item xs={ 12 }>
              <StatusSelect
                inputRef={ register({ required: true }) }
                parent={ props.id }
                name="status"
                code="TODO_STATUS"
                required={ true }
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={ classes.gridContainer }
          >
            <Grid item xs={ 12 }>
              <CategorySelect
                parent={ props.id }
                name="category"
                code="TODO_CATE"
                required={ true }
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 1 }>
            <Grid item xs={ 6 }>
              <DatePicker
                inputRef={ register({ required: true }) }
                parent={ props.id }
                id="date-picker-dialog"
                label="마감일"
                name="due_date"
                format="YYYY-MM-DD"
                // valueFormat="YYYYMMDD"
                required={ true }
                error={ !!( errors && errors.due_date ) }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <TimePicker
                inputRef={ register({ required: true }) }
                parent={ props.id }
                id="time-picker-dialog"
                label="마감시간"
                name="due_time"
                format="HH:mm:ss"
                // valueFormat="HHmmss"
                required={ true }
                error={ !!( errors && errors.due_time ) }
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 2 }>
            <Grid item xs={ 12 }>
              <BaseTextarea
                ref={ register }
                parent={ props.id }
                name="description"
                rows={ 5 }
                rowsMax={ 5 }
                maxLength={ 100 }
                placeholder="Description"
              />
            </Grid>
          </Grid>
          <Grid container 
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
                type="submit"
              />
            </ButtonGroup>
          </Grid>
        </form>
      </Grid>
    </Paper>
  )
}

TodoInfoRegister.proptypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func
}

export default TodoInfoRegister;