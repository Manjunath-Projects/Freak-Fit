import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Import ReactDOM correctly
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// ✅ Use createRoot directly (not via ReactDOM)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);