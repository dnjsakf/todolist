/* React */
import React, { useCallback } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';

/* Reducers */
import { onChangeValue } from './../../../../reducers/input/SelectReducer';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';

/* Material */
import Grid from '@material-ui/core/Grid';

/* Components */
import { BaseSelect } from '.';


const QueryBaseSelect = ({ parent, name, query, variables, isLabel })=>{
  const dispatch = useDispatch();

  const handleOnChange = useCallback(( value )=>{
    dispatch(
      onChangeValue({
        parent: parent,
        name: name,
        value: value
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
    <Grid 
      container 
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: 50 }}
    >
      <Grid item xs={3}>
        { /* Label 설정 */
          isLabel
          ? (
            <label htmlFor={ child_id }>
              { data.common_code.code_name }
            </label>
            )
          : null
        }
      </Grid>
      <Grid item xs={8}>
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
      </Grid>
    </Grid>
  )
}

export default QueryBaseSelect;