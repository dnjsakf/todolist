/* React */
import React, { useRef, useState, useCallback, useEffect } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actions } from './../../../../reducers/form/TodoInfo';

/* GraphQL */
import { useMutation } from '@apollo/react-hooks';
import TodoMutation from './../../../../graphql/Mutation/Todo';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/* Components */
import CommonCodeSelect from './../../Input/Select/CommonCode';
import SubmitButton from './../../Input/Button/Submit';
import BaseText from './../../Input/Text/Base';
import BaseTextarea from './../../Input/Textarea/Base';
import DatePicker from './../../Input/Picker/Date';
import TimePicker from './../../Input/Picker/Time';


const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: 50
  },
  todoForm: { }
}));

const TodoInfoForm = ( props ) => {
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const [ 
    saveTodoInfo, 
    { 
      data: created, 
      loading: mutationLoading, 
    }
  ] = useMutation(
    TodoMutation.CREATE_TODO_INFO, {
    onError( error ){
      console.error( error );
    },
    onCompleted({ create_todo_info: { todo_info: { no } } }) {
      props.handleClose();
    }
  });

  const { todoInfo } = useSelector(({ form })=>({
    todoInfo: form.todoInfo
  }))

  /* Handlers */
  /* Handler: Clear form-data */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    console.log( 'cancel' );

  }, []);

  /* Handler: Save form-data */
  const handleSave = useCallback((event)=>{
    event.preventDefault();

    // saveTodoInfo(save_data);
    console.log( 'save' );

  }, []);
  
  if( mutationLoading ) return <span>Now Loading....</span>;
  if( !todoInfo || !todoInfo.no ) return null;

  return (
    <Grid container spacing={ 0 }>
      <form 
        ref={ elRef }
        id={ props.id }
        name={ props.name }
        className={ classes.todoForm}
        noValidate
        autoComplete="off"
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
                parent={ props.id }
                id="title" 
                name="title"
                label="제목"
                placeholder="제목을 입력해주세요."
                maxlength={ 30 }
                required={ true }
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? todoInfo.title : null }
                action={ actions.setTitle }
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
                parent={ props.id }
                name="status"
                code={ todoInfo ? JSON.parse(todoInfo.status).p_code : null }
                required={ true }
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? JSON.parse(todoInfo.status).code : null }
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
                parent={ props.id }
                name="category"
                code={ todoInfo ? JSON.parse(todoInfo.category).p_code : null }
                required={ true }
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? JSON.parse(todoInfo.category).code : null }
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 1 }>
            <Grid item xs={ 6 }>
              <DatePicker 
                parent={ props.id }
                id="date-picker-dialog"
                label="마감일"
                name="due_date"
                format="YYYY-MM-DD"
                valueFormat="YYYYMMDD"
                required={ true }
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? todoInfo.due_date : null }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <TimePicker 
                parent={ props.id }
                id="time-picker-dialog"
                label="마감시간"
                name="due_time"
                format="HH:mm:ss"
                valueFormat="HHmmss"
                required={ true }
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? todoInfo.due_time : null }
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 2 }>
            <Grid item xs={ 12 }>
              <BaseTextarea
                parent={ props.id }
                name="description"
                rows={ 5 }
                maxlength={ 100 }
                placeholder="Description"
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? todoInfo.desc : null }
              />
            </Grid>
          </Grid>
          {
            props.mode === "view"
            ? null
            : <Grid container direction="row">
                <Grid item xs={ 12 }>
                  <SubmitButton
                    cancel={{
                      className: 'btn-save',
                      label: '취소',
                      onClick: handleCancel
                    }}
                    save={{
                      className: 'btn-save',
                      label: '저장',
                      onClick: handleSave
                    }}
                  />
                </Grid>
              </Grid>
          }
      </form>
    </Grid>
  )
}

export default TodoInfoForm;