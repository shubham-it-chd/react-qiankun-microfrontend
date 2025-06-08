import React from 'react';

const Settings = ({ globalContext }) => {
  const theme = globalContext?.state?.theme || 'light';

  const handleLanguageChange = (language) => {
    if (globalContext) {
      globalContext.actions.setLanguage(language);
    }
  };

  return (
    <div className={`settings theme-${theme}`} style={{
      padding: '2rem',
      minHeight: '100vh',
      background: theme === 'light' ? '#f8f9fa' : '#1a202c',
      color: theme === 'light' ? '#2d3748' : '#e2e8f0'
    }}>
      <h2>Settings & Preferences</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Language Settings</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={() => handleLanguageChange('en')}
            style={{
              padding: '0.5rem 1rem',
              background: globalContext?.state?.language === 'en' ? '#667eea' : '#e2e8f0',
              color: globalContext?.state?.language === 'en' ? 'white' : '#2d3748',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            English
          </button>
          <button 
            onClick={() => handleLanguageChange('es')}
            style={{
              padding: '0.5rem 1rem',
              background: globalContext?.state?.language === 'es' ? '#667eea' : '#e2e8f0',
              color: globalContext?.state?.language === 'es' ? 'white' : '#2d3748',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Español
          </button>
          <button 
            onClick={() => handleLanguageChange('fr')}
            style={{
              padding: '0.5rem 1rem',
              background: globalContext?.state?.language === 'fr' ? '#667eea' : '#e2e8f0',
              color: globalContext?.state?.language === 'fr' ? 'white' : '#2d3748',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Français
          </button>
        </div>
      </div>

      {globalContext && (
        <div style={{
          background: theme === 'light' ? '#ffffff' : '#2d3748',
          border: '2px solid #667eea',
          borderRadius: '12px',
          padding: '1.5rem',
          marginTop: '2rem'
        }}>
          <h3>Current Settings</h3>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <strong>Theme:</strong> {globalContext.state.theme}
            </div>
            <div>
              <strong>Language:</strong> {globalContext.state.language}
            </div>
            <div>
              <strong>User Role:</strong> {globalContext.state.user.role || 'user'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 