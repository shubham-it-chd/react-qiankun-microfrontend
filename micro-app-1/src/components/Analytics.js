import React from 'react';

const Analytics = ({ globalContext }) => {
  const theme = globalContext?.state?.theme || 'light';

  return (
    <div className={`analytics theme-${theme}`}>
      <h2>Analytics Page</h2>
      <p>Advanced analytics and reporting will be displayed here.</p>
      
      {globalContext && (
        <div className="context-info">
          <h3>Context7 State</h3>
          <p>User: {globalContext.state.user.name || 'Guest'}</p>
          <p>Theme: {globalContext.state.theme}</p>
        </div>
      )}
    </div>
  );
};

export default Analytics; 