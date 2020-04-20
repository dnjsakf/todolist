/* React */
import React, { useRef, useEffect } from 'react';

/* Components */
import { BaseButton } from '.';


const SaveCancelButton = ({ cancel, save })=>{
  const elRef = useRef();

  // Initial Callback
  useEffect(()=>{
    // if( onClick ){
    //   onClick( elRef );
    // }
  },[ elRef ]);

  return (
    <>
      <div className="input-col c3 _blank"></div>
      <div className="input-col c6 _blank">
        <div className="input-row">
          {
            cancel
            ? (
              <div className="input-col c6 input-button">
                <BaseButton 
                  className={ cancel.className }
                  label={ cancel.label }
                  onClick={ cancel.onClick }
                />
              </div>
              )
            : null
          }
          <div className="input-col c6 input-button">
            <BaseButton 
              className={ save.className }
              label={ save.label }
              onClick={ save.onClick }
            />
          </div>
        </div>
      </div>
      <div className="input-col c3 _blank"></div>
    </>
  )
}

export default SaveCancelButton;