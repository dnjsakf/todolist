/* React */
import React, { useRef, useState, useCallback, useEffect } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actionSetError } from './../../../reducers/form/DataReducer';
import * as actions from './../../../reducers/form/TodoInfoReducer';

/* GraphQL */
import { useMutation } from '@apollo/react-hooks';
import { 
  CREATE_TODO_INFO_QUERY 
} from './../../../graphql/queries/todos';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/* Components */
import { CommonCodeSelect } from './../Input/Select';
import { SaveButton } from './../Input/Button';
import { BaseText } from './../Input/Text';
import { BaseTextarea } from './../Input/Textarea';
import { DatePicker, TimePicker } from './../Input/Picker';


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
  const dispatch = useDispatch();

  const { todoInfo } = useSelector(({ form })=>({
    todoInfo: form.todoInfo
  }));

  const [ 
    createTodoInfo, 
    { 
      data: created, 
      loading: mutationLoading, 
      error: mutationError
    }
  ] = useMutation( CREATE_TODO_INFO_QUERY, {
    onCompleted({ create_todo_info: { todo_info: { no } } }) {
      props.handleClose();
    }
  });

  /* Handlers */
  /* Handler: Clear form-data */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    console.log( 'cancle', todoInfo );

  }, [ todoInfo ]);

  /* Handler: Save form-data */
  const handleSave = useCallback((event)=>{
    event.preventDefault();

    const invalid = Object.keys( todoInfo ).filter(( key )=>(
      ( todoInfo[key].required && !todoInfo[key].data ) || todoInfo[key].error
    ));

    if( invalid.length > 0 ){
      console.log( invalid );
      invalid.forEach(( name )=>(
        dispatch(
          actionSetError({
            parent: props.id,
            name: name,
            error: true
          })
        )
      ));
    } else {
      const save_data = {
        variables: {
          title: todoInfo.title.data,
          main_cate: todoInfo.category.data,
          status: todoInfo.status.data,
          desc: todoInfo.description.data,
          due_date: todoInfo.due_date.data,
          due_time: todoInfo.due_time.data,
        }
      }
      console.log("Do Save", save_data);

      /* Save todo-info: return promise */
      createTodoInfo(save_data);
    }
  }, [ todoInfo ]);

  /* For data output */
  useEffect(()=>{
    console.log( 'created', created );
  }, [ created ]);

  /* For data output */
  useEffect(()=>{
    console.log( 'todoInfo', todoInfo );
  }, [ todoInfo ]);
  
  if( mutationLoading || !todoInfo ) return <span>Now Loading....</span>;
  if( mutationError ) console.error( mutationError );

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
                variables={{
                  code: "TODO_STATUS",
                  order: [
                    "sort_order"
                  ]
                }}
                required={ true }
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? todoInfo.status : null }
                action={ actions.setStatus }
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
                variables={{ 
                  p_code: "TODO_CATE",
                  code: "LANGUAGE",
                  order: [
                    "sort_order"
                  ]
                }}
                required={ true }
                readOnly={ props.mode === "view" }
                defaultValue={ todoInfo ? todoInfo.sub_cate : null }
                action={ actions.setSubCate }
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
                action={ actions.setDueDate }
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
                  <SaveButton
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