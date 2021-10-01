import React, {
    createContext,
    useContext, useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useRequest } from '../hooks/useRequest';
import { API_AUTH } from '../const/http/routes';
import { HTTP_REQUEST_METHODS } from '../const/http/HTTP_REQUEST_METHODS';
import { HTTP_REQUEST_STATUSES } from '../const/http/HTTP_REQUEST_STATUSES';

const AppContext = createContext({});
export const useApp = () => useContext(AppContext);

export const AppProvider = (props) => {
    const { children } = props;
    const [isInitialized, setIsInitialized] = useState(false);
    const {
        setMe,
    } = useAuth();
    const history = useHistory();

    const { state: getMeRS, onRequest: getMe } = useRequest({
        url: API_AUTH,
        method: HTTP_REQUEST_METHODS.GET,
    });

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        if (getMeRS.isProcessing) {
            return;
        }
        if (getMeRS.status === HTTP_REQUEST_STATUSES.SUCCEEDED) {
            history.push('/chat');
            setMe(getMeRS.result.user);
            setIsInitialized(true);
        } else {
            history.push('/reg');
            setIsInitialized(true);
        }
    }, [getMeRS]);

    return (
        <AppContext.Provider
            value={{
                isInitialized,
                setIsInitialized,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.any,
};

AppProvider.defaultProps = {
    children: null,
};
