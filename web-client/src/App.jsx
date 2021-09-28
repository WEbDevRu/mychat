import React, {
    useEffect,
    useRef,
} from 'react';
import socketIOClient from 'socket.io-client';
import './styles/styles.scss';
import { Route } from 'react-router-dom';
import { Messenger } from './components/Messenger';
import { useApp } from './context/AppContext';
import { LoadingPage } from './components/Common/LoadingPage';
import { Registration } from './components/Registration';
import { VideoConf } from './components/VideoConf';
import { MessengerProvider } from './context/MessengerContext';
import { VideoConfProvider } from './context/VideoConfContext';
import config from './config/index';

const App = () => {
    const {
        isInitialized,
    } = useApp();

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(config.socketServerURL);
        socketRef.current.emit('auth/AUTH', {
            token: 'egwtrh',
        });
    }, []);

    return (
        <>
            {!isInitialized && <LoadingPage />}
            {isInitialized && (
                <>
                    <Route
                        path="/chat/:chatId?"
                        render={() => (
                            <MessengerProvider socketRef={socketRef}>
                                <Messenger socketRef={socketRef} />
                            </MessengerProvider>
                        )}
                    />
                    <Route path="/reg" render={() => <Registration />} />
                    <Route
                        path="/conf/:chatId?"
                        render={() => (
                            <VideoConfProvider
                                socketRef={socketRef}
                            >
                                <VideoConf />
                            </VideoConfProvider>
                        )}
                    />
                </>
            )}

        </>
    );
};

export default App;
