import React from 'react';
import './styles/styles.scss';
import { Route } from 'react-router-dom';
import { Messenger } from './components/Messenger';
import { useApp } from './context/AppContext';
import { LoadingPage } from './components/Common/LoadingPage';
import { Registration } from './components/Registration';
import { VideoConf } from './components/VideoConf';

const App = () => {
    const {
        isInitialized,
    } = useApp();
    return (
        <>
            {!isInitialized && <LoadingPage />}
            {isInitialized && (
                <>
                    <Route exact path="/" render={() => <Messenger />} />
                    <Route path="/reg" render={() => <Registration />} />
                    <Route path="/conf" render={() => <VideoConf />} />
                </>
            )}

        </>
    );
};

export default App;
