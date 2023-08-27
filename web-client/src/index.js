import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import StyleContext from 'isomorphic-style-loader/StyleContext'

const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
}

ReactDOM.hydrate(
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
        <SocketProvider>
            <AuthProvider>
                <AppProvider>
                    <StyleContext.Provider value={{ insertCss }}>
                        <App />
                    </StyleContext.Provider>
                </AppProvider>
            </AuthProvider>
        </SocketProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
