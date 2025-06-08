import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const [globalContext, setGlobalContext] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Access Context7 from main app
    if (window.__GLOBAL_CONTEXT__) {
      setGlobalContext(window.__GLOBAL_CONTEXT__);
      setTheme(window.__GLOBAL_CONTEXT__.state.theme);
      
      // Listen for theme changes
      const checkTheme = () => {
        if (window.__GLOBAL_CONTEXT__) {
          setTheme(window.__GLOBAL_CONTEXT__.state.theme);
          document.body.className = `theme-${window.__GLOBAL_CONTEXT__.state.theme}`;
        }
      };
      
      const interval = setInterval(checkTheme, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // Use basename for sub-routing in micro app
  const basename = window.__POWERED_BY_QIANKUN__ ? '/micro-app-1' : '/';

  return (
    <div className={`dashboard-app theme-${theme}`}>
      <Router basename={basename}>
        <div className="app-header">
          <h1>📊 Dashboard</h1>
          <div className="context-info">
            {globalContext && (
              <div className="global-state-display">
                <span>User: {globalContext.state.user.name || 'Guest'}</span>
                <span>Theme: {globalContext.state.theme}</span>
              </div>
            )}
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={<Dashboard globalContext={globalContext} />} />
          <Route path="/analytics" element={<Analytics globalContext={globalContext} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 