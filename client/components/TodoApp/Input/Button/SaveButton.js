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
      <div className="input-col _blank c3"></div>
      <div className="input-col _blank c6">
        <div className="input-row">
          {
            cancel
            ? (
              <div className="input-col input-button c6">
                <BaseButton 
                  className={ cancel.className }
                  label={ cancel.label }
                  onClick={ cancel.onClick }
                />
              </div>
              )
            : null
          }
          <div className="input-col input-button c6">
            <BaseButton 
              className={ save.className }
              label={ save.label }
              onClick={ save.onClick }
            />
          </div>
        </div>
      </div>
      <div className="input-col _blank c3"></div>
    </>
  )
}

export default SaveCancelButton;