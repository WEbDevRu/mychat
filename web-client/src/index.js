import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
        <SocketProvider>
            <AuthProvider>
                <AppProvider>
                    <App />
                </AppProvider>
            </AuthProvider>
        </SocketProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
