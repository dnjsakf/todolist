import moment from 'moment';

export default function useFormRef(){
  let refs = {};
    
  function options_validate( options ){
    try {
      if( options ){
        switch( options.type ){
          case "date":
          case "time":
          case "datetime":
            if( !options.format ) return [ false, "'format' is undefined." ];
            return [ true, null ];
            
          case "json":
            if( !options.extra ) return [ false, "'extra' is undefined." ];
            return [ true, null ];
            
          case "array":
            if( !options.value ) return [ false, "'value' is undefined." ];
            return [ true, null ];
            
          default:
            return [ true, null ];
        }
      } else {
        return [ true, null ];
      }
    } catch( error ) {
      return [ false, error ];
    }
  }
  
  function setRef( options ){
    const [ isValid, message ] = options_validate( options );
    
    if( !isValid ){
      console.error( message );
      return null;
    }
    
    return function( element ){
      if( !element ) return;
      
      /* Set Variables */
      const name = ( element.node ? element.node.name : element.name );
      
      if( !options ) {
        refs = Object.assign({}, refs, {
          [name]: element.value
        });
      } else {
        const value = ( options.value||element.value );
      
        /* Other Refs */
        if( options.inputRef ){
          options.inputRef.current = element;
        }
        
        /* Set Ref data */
        switch ( options.type ){
          case "date":
          case "time":
          case "datetime":
            refs = Object.assign({}, refs, {
              [name]: moment(value, options.format).format(options.format)
            });
            break;
          case "json":
            refs = Object.assign({}, refs, {
              [name]: {
                ...options.extra,
                [options.name]: value
              }
            });
            break;
          case "array":
            refs = Object.assign({}, refs, {
              [name]: value
            });
            break;
          default:
            refs = Object.assign({}, refs, {
              [name]: value
            });
        }
      }
    }
  }
  
  return {
    refs: setRef,
    getValues: ()=>{
      return refs;
    },
    clear: ()=>{
      refs = {}
    }
  }
}