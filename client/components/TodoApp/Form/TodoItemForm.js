/* React */
import React, { useRef, useCallback, useEffect } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { COMMON_CODE_QUERY } from './../../../graphql/queries/todos';

/* Material */
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/* Components */
import { QueryBaseSelect } from './../Input/Select';
import { SaveButton } from './../Input/Button';
import { BaseText } from './../Input/Text';
import { BaseTextarea } from './../Input/Textarea';
import { DatePicker, TimePicker } from './../Input/Picker';


const TodoItemForm = ( props ) => {
  /* State */
  const formRef = useRef();
  const formData = useSelector(( reducer )=>( reducer.input.select[props.id] ), [ ]);

  /* Handlers */
  const handleCancel = useCallback((event)=>{
    event.preventDefault();

    console.log( 'cancle', formData );

  }, [ formData ]);

  const handleSave = useCallback((event)=>{
    event.preventDefault();

    console.log( 'save', formData );

  }, [ formData ]);

  /* Life Cycle */
  useEffect(()=>{ 
    console.log( 'formData', formData );
  }, [ formData ]);
  
  /* Request Data */
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
        className="todo-form"
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={ 12 }>
              <BaseText
                id="title" 
                name="title"
                placeholder="주제를 입력해주세요."
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={ 12 }>
              <QueryBaseSelect
                parent={ props.id }
                name={ 'status' }
                query={ COMMON_CODE_QUERY }
                variables={{ 
                  code: "TODO_STATUS",
                  order: [
                    "sort_order"
                  ]
                }}
                isLabel={ true }
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={ 12 }>
              <QueryBaseSelect
                parent={ props.id }
                name={ 'category' }
                query={ COMMON_CODE_QUERY }
                variables={{ 
                  p_code: "TODO_CATE",
                  code: "DEVELOPMENT",
                  order: [
                    "sort_order"
                  ]
                }}
                isLabel={ true }
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 1 }>
            <Grid item xs={ 6 }>
              <DatePicker />
            </Grid>
            <Grid item xs={6}>
              <TimePicker />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={ 2 }>
            <Grid item xs={ 12 }>
              <BaseTextarea
                parent={ props.id }
                name={ 'description' }
                rows={ 5 }
                defaultValue={ 'Todo List' }
                placeholder={ 'Description' }
                onChange={ (ref, event)=>{ console.log( ref, event ) }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={ 12 }>
              <SaveButton
                cancel={{
                  className: 'input-button btn-save',
                  label: '취소',
                  onClick: handleCancel
                }}
                save={{
                  className: 'input-button btn-save',
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