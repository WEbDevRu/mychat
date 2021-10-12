import React, {
    useEffect,
    useRef,
} from 'react';
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
import { useSocket } from './context/SocketContext';

const App = () => {
    const {
        isInitialized,
    } = useApp();

    const socket = useSocket();

    const socketRef = useRef();

    useEffect(() => {
        socket.onConnect({ socketURL: config.socketServerURL });
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
