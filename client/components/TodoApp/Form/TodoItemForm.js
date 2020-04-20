/* React */
import React, { useRef, useCallback, useEffect } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { COMMON_CODE_QUERY } from './../../../graphql/queries/todos';

/* Components */
import { QueryBaseSelect } from './../Input/Select';
import { SaveButton } from './../Input/Button';
import { BaseTextarea } from './../Input/Textarea';


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
    <form 
      ref={ formRef }
      id={ props.id }
      name={ props.name }
      className="todo-form"
      >
      <div className="input-row">
        <div className="input-col c5 text-center">
          <a>2020-01-01</a>
        </div>
        <div className="input-col c2 text-center">
          <a>~</a>
        </div>
        <div className="input-col c5 text-center">
          <a>2020-12-31</a>
        </div>
      </div>
      <div className="input-row">
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
      </div>
      <div className="input-row">
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
      </div>
      <div className="input-row">
        <div className="input-col c12">
          <BaseTextarea
            parent={ props.id }
            name={ 'description' }
            rows={ 5 }
            defaultValue={ 'Todo List' }
            placeholder={ 'Description' }
            onChange={ (ref, event)=>{ console.log( ref, event ) }}
          />
        </div>
      </div>
      <div className="input-row">
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
      </div>
    </form>
  )
}

export default TodoItemForm;