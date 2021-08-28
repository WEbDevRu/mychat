import React, {
    createContext,
    useContext, useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { useHistory } from 'react-router-dom';
import { authAPI } from '../utils/api/api';
import { useAuth } from './AuthContext';

const AppContext = createContext({});
export const useApp = () => useContext(AppContext);

export const AppProvider = (props) => {
    const { children } = props;
    const [isInitialized, setIsInitialized] = useState(false);
    const {
        setMe,
    } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const getMe = async () => {
            const result = await authAPI.getMe();
            setIsInitialized(true);
            if (result.status === httpStatus.OK) {
                history.push('/chat');
                setMe(result.data.user);
            } else {
                history.push('/reg');
            }
        };
        getMe();
    }, []);

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
