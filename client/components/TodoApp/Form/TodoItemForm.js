/* React */
import React, { useRef, useCallback, useEffect } from 'react';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';

/* Reducers */
import { actionSetError } from './../../../reducers/form/DataReducer';

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
  todoForm: { }
}));

const TodoItemForm = ( props ) => {
  /* State */
  const classes = useStyles();
  const elRef = useRef();

  const dispatch = useDispatch();
  const formData = useSelector(({ form })=>( form.data[props.id] ), [ null ]);

  /* Handlers */
  /* Handler: Clear form-data */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    console.log( 'cancle', formData );

  }, [ formData ]);

  /* Handler: Save form-data */
  const handleSave = useCallback((event)=>{
    event.preventDefault();

    const errors = Object.keys( formData ).filter(( key )=>(
      ( formData[key].required && !formData[key].data ) || formData[key].error
    ));

    if( errors.length > 0 ){
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
      console.log("Do Save");
    }
  }, [ formData ]);

  /* For data output */
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
                required={ true }
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