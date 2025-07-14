import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

try {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} catch (error) {
    console.error('Error rendering app:', error);
    // Fallback rendering without StrictMode
    try {
        root.render(<App />);
    } catch (fallbackError) {
        console.error('Fallback rendering also failed:', fallbackError);
        rootElement.innerHTML = '<div>Error loading application. Please refresh the page.</div>';
    }
}