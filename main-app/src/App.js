import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';
import { GlobalContextProvider, useGlobalContext } from './context/GlobalContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MicroAppContainer from './components/MicroAppContainer';
import './App.css';

// Qiankun configuration
const microApps = [
  {
    name: 'micro-app-1',
    entry: '//localhost:3001',
    container: '#micro-app-1-container',
    activeRule: '/micro-app-1',
  },
  {
    name: 'micro-app-2',
    entry: '//localhost:3002',
    container: '#micro-app-2-container',
    activeRule: '/micro-app-2',
  },
];

const QiankunApp = () => {
  const { actions } = useGlobalContext();

  useEffect(() => {
    // Register micro applications
    registerMicroApps(microApps, {
      beforeLoad: [
        app => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
          return Promise.resolve();
        },
      ],
      beforeMount: [
        app => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
          actions.markMicroAppLoaded(app.name);
          return Promise.resolve();
        },
      ],
      afterUnmount: [
        app => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
          actions.markMicroAppUnloaded(app.name);
          return Promise.resolve();
        },
      ],
    });

    // Add global error handler
    addGlobalUncaughtErrorHandler((event) => {
      console.error('Micro app error:', event);
    });

    // Start qiankun
    start({
      prefetch: 'all',
      sandbox: {
        strictStyleIsolation: true,
        experimentalStyleIsolation: true,
      },
    });

    console.log('🚀 Qiankun MicroFrontend started with Context7!');
  }, [actions]);

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/micro-app-1/*" 
              element={<MicroAppContainer containerId="micro-app-1-container" />} 
            />
            <Route 
              path="/micro-app-2/*" 
              element={<MicroAppContainer containerId="micro-app-2-container" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

function App() {
  return (
    <GlobalContextProvider>
      <QiankunApp />
    </GlobalContextProvider>
  );
}

export default App; 