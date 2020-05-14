/* React */
import React, { useRef, useState, useCallback, useEffect } from 'react';

/* GraphQL */
import { useMutation } from '@apollo/react-hooks';
import { TodoListMutation } from './../../../../graphql/Mutation';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/* Components */
import { 
  StatusSelect,
  CategorySelect
} from './../../../Inputs/Select';
import { SubmitButton } from './../../../Inputs/Button';
import { BaseText } from './../../../Inputs/Text';
import { BaseTextarea } from './../../../Inputs/Textarea';
import { DatePicker, TimePicker } from './../../../Inputs/Picker';


/* Materialize Styles */
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: 50
  },
  todoDetailForm: { }
}));

/* Component */
const TodoDetailForm = ( props ) => {
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const [ todoData, setTodoData ] = useState( props.data );
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
      props.handleClose();
    }
  });


  /* Handlers */
  /* Handler: Clear form-data */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    console.log( 'cancel' );

  }, []);

  /* Handler: Save form-data */
  const handleSave = useCallback((event)=>{
    event.preventDefault();

    // saveTodoData(save_data);
    console.log( 'save' );

  }, []);
  
  if( mutationLoading ) return <span>Now Loading....</span>;

  console.log( todoData );

  return (
    <Grid container spacing={ 0 }>
      <form 
        ref={ elRef }
        id={ props.id }
        name={ props.name }
        className={ classes.todoDetailForm}
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
                defaultValue={ todoData ? todoData.title : null }
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
            {
              todoData
              ? <StatusSelect
                  parent={ props.id }
                  name="status"
                  data={ todoData.status_codes }
                  required={ true }
                  readOnly={ props.mode === "view" }
                  defaultValue={ todoData.status.code }
                />
              : <StatusSelect
                  parent={ props.id }
                  name="status"
                  code="TODO_STATUS"
                  required={ true }
                />
            }
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
            {
              todoData
              ? <CategorySelect
                  parent={ props.id }
                  name="category"
                  data={ todoData.category_codes }
                  required={ true }
                  readOnly={ props.mode === "view" }
                  defaultValue={ todoData.category.code }
                />
              : <CategorySelect
                  parent={ props.id }
                  name="category"
                  code="TODO_CATE"
                  required={ true }
                />
            }
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
                defaultValue={ todoData ? todoData.due_date : null }
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
                defaultValue={ todoData ? todoData.due_time : null }
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
                defaultValue={ todoData ? todoData.desc : null }
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

export default TodoDetailForm;