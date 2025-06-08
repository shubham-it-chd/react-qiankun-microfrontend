import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import './Home.css';

const Home = () => {
  const { state } = useGlobalContext();

  return (
    <div className={`home-page theme-${state.theme}`}>
      <div className="home-container">
        <header className="hero-section">
          <h1>Welcome to Qiankun Microfrontend</h1>
          <p className="hero-subtitle">
            Powered by <span className="context7-highlight">Context7</span> global state management
          </p>
          <div className="feature-badges">
            <span className="badge">🚀 Qiankun</span>
            <span className="badge">⚛️ React</span>
            <span className="badge">🔄 Context7</span>
            <span className="badge">🎨 Modern UI</span>
          </div>
        </header>

        <section className="info-grid">
          <div className="info-card">
            <div className="card-icon">🏠</div>
            <h3>Main Application</h3>
            <p>This is the host application that manages and orchestrates micro frontends using Qiankun.</p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">📊</div>
            <h3>Dashboard App</h3>
            <p>Navigate to the Dashboard to see the first micro application with charts and analytics.</p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">👤</div>
            <h3>Profile App</h3>
            <p>Visit the Profile section to interact with the second micro application for user management.</p>
          </div>
        </section>

        <section className="context-demo">
          <h2>Context7 State Demo</h2>
          <div className="state-display">
            <div className="state-item">
              <strong>Current Theme:</strong> {state.theme}
            </div>
            <div className="state-item">
              <strong>User Status:</strong> {state.user.id ? `Logged in as ${state.user.name}` : 'Not logged in'}
            </div>
            <div className="state-item">
              <strong>Language:</strong> {state.language}
            </div>
            <div className="state-item">
              <strong>Loaded Micro Apps:</strong> {state.loadedMicroApps.length > 0 ? state.loadedMicroApps.join(', ') : 'None'}
            </div>
          </div>
        </section>

        <section className="getting-started">
          <h2>Getting Started</h2>
          <ol className="steps-list">
            <li>Click on <strong>Dashboard</strong> to load the first micro application</li>
            <li>Try <strong>Profile</strong> to interact with the second micro application</li>
            <li>Toggle the theme using the 🌙/☀️ button in the navigation</li>
            <li>Login/Logout to see state changes reflected across all micro apps</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Home; 