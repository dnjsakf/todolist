/* React */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme)=>({
  
}));

const DragAndDrop = ( props )=>{
  /* Props */
  const classes = useStyle();
  const {
    render,
    children,
    ...rest
  } = props;
  
  /* State */
  const [ grep, setGrep ] = useState( false );
  const [ drag, setDrag ] = useState( false );
  
  const handleMouseMove = ( event )=>{
    console.log('handleMouseMove');
  }
  
  const handleMouseUp = ( event )=>{
    console.log('handleMouseUp');
  }
  
  const handleMouseLeave = ( event )=>{
    console.log('handleMouseLeave');
  }
  
  const handleMouseDown = ( event )=>{
    console.log('handleMouseDown');
  }
  
  return (
    <div
      onMouseMove={ handleMouseMove }
      onMouseUp={ handleMouseUp }
      onMouseLeave={ handleMouseLeave }
      onMouseDown={ handleMouseDown }      
    >
    { render({ grep, drag }) }
    </div>
  )
}

DragAndDrop.propTypes = {
  className: PropTypes.string,
  render: PropTypes.func,
}

export default DragAndDrop;