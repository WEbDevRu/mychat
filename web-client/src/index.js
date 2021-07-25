import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
        <AuthProvider>
            <AppProvider>
                <App />
            </AppProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
