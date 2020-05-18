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
  CommonCodeSelect,
  HierarchySelect
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

  const { register, errors, handleSubmit, control } = useForm();

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
    
    //const formData = getValues();

    // saveTodoData(save_data);
    console.log( 'save' );
    console.log( formData );
    console.log( errors );    

  }, [ errors ]);
  
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
                id="title" 
                name="title"
                label="제목"
                placeholder="제목을 입력해주세요."
                maxLength={ 30 }
                required={ true }
                ref={ register({ required: true }) }
                error={ !!( errors && errors.title ) }
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
              <CommonCodeSelect
                control={ control }
                id="status"
                name="status"
                code="TODO_STATUS"
                required={ true }
                error={ !!( errors && errors.status ) }
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
              <CommonCodeSelect
                control={ control }
                id="category"
                name="category"
                code="TODO_CATE"
                required={ true }
                error={ !!( errors && errors.category ) }
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
              <HierarchySelect
                control={ control }
                id="hierarchy"
                name="hierarchy"
                code="TODO_CATE"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 1 }>
            <Grid item xs={ 6 }>
              <DatePicker
                id="date-picker-dialog"
                name="due_date"
                label="마감일"
                format="YYYY-MM-DD"
                // valueFormat="YYYYMMDD"
                required={ true }
                inputRef={ register({ required: true }) }
                error={ !!( errors && errors.due_date ) }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <TimePicker
                id="time-picker-dialog"
                name="due_time"
                label="마감시간"
                format="HH:mm:ss"
                // valueFormat="HHmmss"
                required={ true }
                inputRef={ register({ required: true }) }
                error={ !!( errors && errors.due_time ) }
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 2 }>
            <Grid item xs={ 12 }>
              <BaseTextarea
                id="description"
                name="description"
                rows={ 5 }
                rowsMax={ 5 }
                maxLength={ 100 }
                placeholder="Description"
                ref={ register }
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
                //onClick={ handleSave }
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