/* React */
import React, { useRef, useCallback, useEffect } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actionSetError } from './../../../reducers/form/DataReducer';

/* GraphQL */
import { useQuery, useMutation } from '@apollo/react-hooks';
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
  const form_data = useSelector(({ form })=>( form.data[props.id] ));

  const [ createTodoInfo, {
    data: created, 
    loading: mutationLoading, 
    error: mutationError 
  }] = useMutation( CREATE_TODO_INFO_QUERY, {
    onCompleted({ create_todo_info: { todo_info: { no } } }) {
      alert(`Todo가 추가되었습니다. (ID: ${no})`);
      
      props.handleClose();
    }
  });

  /* Handlers */
  /* Handler: Clear form-data */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    console.log( 'cancle', form_data );

  }, [ form_data ]);

  /* Handler: Save form-data */
  const handleSave = useCallback((event)=>{
    event.preventDefault();

    const errors = Object.keys( form_data ).filter(( key )=>(
      ( form_data[key].required && !form_data[key].data ) || form_data[key].error
    ));

    if( errors.length > 0 ){
      console.log( errors );
      errors.forEach(( name )=>(
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
          title: form_data.title.data,
          main_cate: form_data.category.data,
          status: form_data.status.data,
          desc: form_data.description.data,
          due_date: form_data.due_date.data,
          due_time: form_data.due_time.data,
        }
      }
      console.log("Do Save", save_data);

      /* Save todo-info: return promise */
      createTodoInfo(save_data);
    }
  }, [ form_data ]);

  /* For data output */
  useEffect(()=>{
    console.log( 'created', created );
  }, [ created ]);

  
  if( mutationError ){
    console.error( mutationError );
  }

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
                defaultValue={ props.info ? props.info.title : null }
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
                defaultValue={ props.info ? props.info.status : null }
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
                defaultValue={ props.info ? props.info.sub_cate : null }
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
                defaultValue={ props.info ? props.info.due_date : null }
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
                defaultValue={ props.info ? props.info.due_time : null }
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
                defaultValue={ props.info ? props.info.desc : null }
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