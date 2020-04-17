import React from 'react';
import { useQuery } from '@apollo/react-hooks';

const StatusSelect = ({ query, variables }) => {
  const { loading, error, data } = useQuery(query, { variables });
  
  if( loading ) return <span>Data loading..</span>;
  if( error ) return <span>Something error..</span>;
  
  return (
    <select>
    {
      data.common_codes.map(opt=>{
        return <option key={opt.id} value={ opt.code_value }>{ opt.code_name}</option>
      })
    }
    </select>
  )
}

export default StatusSelect;