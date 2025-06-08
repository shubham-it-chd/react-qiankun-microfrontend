import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Store the root instance globally
let root = null;

// Qiankun lifecycle methods
function render(props = {}) {
  const { container } = props;
  const containerElement = container 
    ? container.querySelector('#micro-app-1-root') 
    : document.querySelector('#micro-app-1-root');
  
  if (containerElement) {
    root = ReactDOM.createRoot(containerElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

// Mount when not in qiankun environment
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// Qiankun lifecycle hooks
export async function bootstrap() {
  console.log('🚀 [micro-app-1] bootstrapped');
}

export async function mount(props) {
  console.log('🔗 [micro-app-1] mounted', props);
  render(props);
}

export async function unmount(props) {
  console.log('🔌 [micro-app-1] unmounted');
  if (root) {
    root.unmount();
    root = null;
  }
} 