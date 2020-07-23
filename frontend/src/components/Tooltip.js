import React from 'react';

export default function Tooltip({children, tooltip, position}) {
  return (
    <div className={`tooltip`}>
      <div
        style={{
          width: '100%',
          position: 'fixed',
          top: '2vw',
        }}
        className={`tooltiptext`}>
        {tooltip}
      </div>
      {children}
    </div>
  );
}
