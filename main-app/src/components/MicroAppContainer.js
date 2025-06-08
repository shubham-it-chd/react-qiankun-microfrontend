import React from 'react';
import './MicroAppContainer.css';

const MicroAppContainer = ({ containerId }) => {
  return (
    <div className="micro-app-wrapper">
      <div id={containerId} className="micro-app-container">
        {/* Micro app will be mounted here by Qiankun */}
      </div>
    </div>
  );
};

export default MicroAppContainer; 