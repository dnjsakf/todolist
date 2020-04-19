/* React */
import React, { useRef, useCallback, useEffect } from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* GraphQL */
import { COMMON_CODE_QUERY } from './../../../graphql/queries/todos';

/* Components */
import { QueryBaseSelect } from './../Input/Select';
import { SaveButton } from './../Input/Button';


const TodoItemForm = ({ id, name, mode, query, variables }) => {
  /* State */
  const formRef = useRef();
  const formData = useSelector(( reducer )=>( reducer.input.select[id] ), [ ]);

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
  if( mode !== 'save' && query && variables ){
    /* React Hooks Methods 보다 밑에 있어야됨 */
    const { loading, error, data } = useQuery(query, { variables });

    if( loading ) return null;
    if( error ) {
      console.error( error );
      return null;
    };
  }

  return (
    <form 
      ref={ formRef }
      id={ id }
      name={ name }
      className="todo-form"
      >
      <div className="input-row">
        <QueryBaseSelect
          parent={ id }
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
          parent={ id }
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