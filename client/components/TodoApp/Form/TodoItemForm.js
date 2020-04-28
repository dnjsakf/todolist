/* React */
import React, { useRef, useCallback, useEffect } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { COMMON_CODE_QUERY } from './../../../graphql/queries/todos';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/* Components */
import { QueryBaseSelect } from './../Input/Select';
import { SaveButton } from './../Input/Button';
import { BaseText } from './../Input/Text';
import { BaseTextarea } from './../Input/Textarea';
import { DatePicker, TimePicker } from './../Input/Picker';


const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: 50
  },
  todoForm: {

  }
}));

const TodoItemForm = ( props ) => {
  /* State */
  const classes = useStyles();
  const formRef = useRef();
  const formData = useSelector(( reducer )=>( reducer.form.select[props.id] ), [ ]);

  /* Handlers */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    console.log( 'cancle', formData );

  }, [ formData ]);

  const handleSave = useCallback((event)=>{
    event.preventDefault();

    console.log( 'save', formData );

  }, [ formData ]);

  useEffect(()=>{ 
    console.log( 'formData', formData );
  }, [ formData ]);
  

  /* Request GraphQL Data */
  if( props.mode !== 'save' && props.query && props.variables ){
    /* React Hooks Methods 보다 밑에 있어야됨 */
    const { loading, error, data } = useQuery(props.query, { variables: props.variables });

    if( loading ) return null;
    if( error ) {
      console.error( error );
      return null;
    };
  }

  return (
    <Grid container spacing={ 0 }>
      <form 
        ref={ formRef }
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
                invalid={ true }
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
              <QueryBaseSelect
                parent={ props.id }
                name="status"
                query={ COMMON_CODE_QUERY }
                variables={{
                  code: "TODO_STATUS",
                  order: [
                    "sort_order"
                  ]
                }}
                validation={ true }
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
              <QueryBaseSelect
                parent={ props.id }
                name="category"
                query={ COMMON_CODE_QUERY }
                variables={{ 
                  p_code: "TODO_CATE",
                  code: "DEVELOPMENT",
                  order: [
                    "sort_order"
                  ]
                }}
                validation={ true }
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
                validation={ true }
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
                validation={ true }
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 2 }>
            <Grid item xs={ 12 }>
              <BaseTextarea
                parent={ props.id }
                name="description"
                rows={ 5 }
                placeholder="Description"
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
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
      </form>
    </Grid>
  )
}

export default TodoItemForm;