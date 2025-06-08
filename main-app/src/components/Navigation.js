import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import './Navigation.css';

const Navigation = () => {
  const { state, actions } = useGlobalContext();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/micro-app-1', label: 'Dashboard' },
    { path: '/micro-app-2', label: 'Profile' }
  ];

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    actions.setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  const handleLogin = () => {
    actions.setUser({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    });
  };

  const handleLogout = () => {
    actions.setUser({
      id: null,
      name: '',
      email: '',
      role: 'user'
    });
  };

  return (
    <nav className={`navigation theme-${state.theme}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Qiankun MicroFE</h2>
          <span className="context7-badge">Context7</span>
        </div>
        
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                (item.exact && location.pathname === item.path) ||
                (!item.exact && location.pathname.startsWith(item.path) && item.path !== '/')
                  ? 'active'
                  : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-controls">
          <div className="theme-toggle">
            <button onClick={toggleTheme} className="theme-btn">
              {state.theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
          
          <div className="user-section">
            {state.user.id ? (
              <div className="user-info">
                <span className="user-name">Hello, {state.user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={handleLogin} className="login-btn">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="micro-apps-status">
        <span>Loaded Apps: </span>
        {state.loadedMicroApps.length > 0 ? (
          state.loadedMicroApps.map(app => (
            <span key={app} className="app-badge">{app}</span>
          ))
        ) : (
          <span className="no-apps">None</span>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 