import React, { createRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'

import { useQuery } from '@apollo/react-hooks';

import { COMMON_CODE_WITH_SUB_QUERY } from './../../../graphql/queries/todos';

import BaseSelect from './BaseSelect';

const CategorySelect = ({ variables }) => {
  const { value } = useSelector(({ select })=>( select ), [ ]);

  useEffect(()=>{
    console.log( value );    
  }, [ value ])

  /* React Hooks Methods 보다 밑에 있어야됨 */
  const { loading, error, data } = useQuery(COMMON_CODE_WITH_SUB_QUERY, { variables });

  if( loading ) return <span>Data loading..</span>;
  if( error ) return <span>Something error..</span>;

  return (
    <>
    {
      data.common_code.map(( main )=>(
        <div key={ main.id }>
          <h3>{ main.code_name }</h3>
          {
            <BaseSelect
              options={
                main.sub_codes && main.sub_codes.map(( sub )=>({
                  id: sub.id,
                  value: sub.code,
                  label: sub.code_name
                }))
              }
            />
            
          }
        </div>
      ))
    }
    </>
  )
}

export default CategorySelect;