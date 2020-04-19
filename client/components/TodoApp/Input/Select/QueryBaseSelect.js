/* React */
import React, { useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Reducers */
import { onChangeValue } from './../../../../reducers/input/SelectReducer';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';

/* Components */
import { BaseSelect } from '.';


const QueryBaseSelect = ({ parent, name, query, variables, isLabel })=>{
  const dispatch = useDispatch();

  const handleOnChange = useCallback(( ref )=>{
    dispatch(
      onChangeValue({
        parent: parent,
        // name: ref.current.name,
        name: name,
        value: ref.current.value
      })
    );
  }, []);

  /* React Hooks Methods 보다 밑에 있어야됨 */
  const { loading, error, data } = useQuery(query, { variables });

  if( loading ) return null;
  if( error ) {
    console.error( error );
    return null;
  };

  const child_id = `${ name }_${ data.common_code.code.toLowerCase() }`;

  return (
    <>
      <div className="input-col input-label c4">
        { /* Label 설정 */
          isLabel
          ? (
            <label htmlFor={ child_id }>
              { data.common_code.code_name }
            </label>
            )
          : null
        }
      </div>
      <div className="input-col input-select c8">
      { /* 상위 카테고리 */
        Array.isArray(data.common_code.sub_codes) && data.common_code.sub_codes.length > 0
        ? (
          <BaseSelect
            parent={ parent }
            id={ child_id }
            name={ child_id }
            options={
              data.common_code.sub_codes.map(( sub )=>({
                id: sub.id,
                value: sub.code,
                label: sub.code_name
              }))
            }
            onChange={ handleOnChange }
          />
          )
        : null
      }
      </div>
    </>
  )
}

export default QueryBaseSelect;