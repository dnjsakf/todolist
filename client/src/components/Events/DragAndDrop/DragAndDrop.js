/* React */
import React, { useState, useEffect, useCallback, ReactPortal } from 'react';
import PropTypes from 'prop-types';

/* Materialize */
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme)=>({
  root: {

  }
}));

const DragAndDrop = ( props )=>{
  /* Props */
  const classes = useStyle();
  const {
    component: Component,
    scrollEl,
    ...rest
  } = props;
  
  /* State */
  const [ grep, setGrep ] = useState( false );
  const [ mouseX, setMouseX ] = useState( 0 );
  const [ scrollY, setScrollY ] = useState( 0 );
  
  const handleMouseMove = ( event )=>{
    if( grep && scrollEl ){
      scrollEl.scrollTop = scrollY - ( event.clientY - mouseX )
    }
  }

  const handleMouseUp = ( event )=>{
    console.log('handleMouseUp')
    setGrep(false);
  }
  
  const handleMouseLeave = ( event )=>{
    console.log('handleMouseLeave')
    setGrep(false);
  }
  
  const handleMouseDown = ( event )=>{
    console.log('handleMouseDown')
    setGrep(true);
    setMouseX( event.clientY );
    setScrollY( scrollEl.scrollTop );
  }
  
  return (
    <div
      className={ classes.root }
      onMouseMove={ grep ? handleMouseMove : undefined }
      onMouseUp={ grep ? handleMouseUp : undefined }
      onMouseLeave={ grep ? handleMouseLeave : undefined }
      onMouseDown={ handleMouseDown }
    >
      <Component { ...rest } />
    </div>
  )
}

DragAndDrop.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any.isRequired,
  scrollEl: PropTypes.any.isRequired,
}

export default DragAndDrop;