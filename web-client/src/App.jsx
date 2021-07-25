import React from 'react';
import './styles/styles.scss';
import { Route } from 'react-router-dom';
import { Messenger } from './components/Messenger';
import { useApp } from './context/AppContext';
import { LoadingPage } from './components/Common/LoadingPage';
import { Registration } from './components/Registration';
import { VideoConf } from './components/VideoConf';
import { MessengerProvider } from './context/MessengerContext';

const App = () => {
    const {
        isInitialized,
    } = useApp();
    return (
        <>
            {!isInitialized && <LoadingPage />}
            {isInitialized && (
                <>
                    <Route path="/chat/:chatId?" render={() => <MessengerProvider><Messenger /></MessengerProvider>} />
                    <Route path="/reg" render={() => <Registration />} />
                    <Route path="/conf" render={() => <VideoConf />} />
                </>
            )}

        </>
    );
};

export default App;
