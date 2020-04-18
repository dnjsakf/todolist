import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { COMMON_CODE_QUERY } from './../../../graphql/queries/todos';

const StatusSelect = ({ variables }) => {
  const { loading, error, data } = useQuery(COMMON_CODE_QUERY, { variables });

  if( loading ) return <span>Data loading..</span>;
  if( error ) return <span>Something error..</span>;
  
  return (
    <select>
    {
      data.common_code.map(opt=>{
        return <option key={opt.id} value={ opt.code }>{ opt.code_name}</option>
      })
    }
    </select>
  )
}

export default StatusSelect;