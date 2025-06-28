// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

// Importer Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
// Importer Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Importer les icônes Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* BrowserRouter must wrap the entire application that uses routing */}
    <BrowserRouter>
      {/* AuthProvider must wrap components that need authentication context */}
      <AuthProvider>
        <App /> {/* App is now a direct child of AuthProvider */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);