import React, {
    createContext,
    useContext, useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { useHistory } from 'react-router-dom';
import { authAPI } from '../utils/api/api';
import { useRequest } from '../hooks/useRequest';
import { HTTP_REQUEST_METHODS } from '../const/http/HTTP_REQUEST_METHODS';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const { children } = props;
    const [regError, setRegError] = useState();
    const [me, setMe] = useState();
    const history = useHistory();
    const { state: authRS, onRequest: onAuthMe } = useRequest({
        url: 'localhost:3000/api/auth',
        method: HTTP_REQUEST_METHODS.POST,
    });

    const onPostMe = async ({ username }) => {
        const result = await authAPI.postMe({ username });
        onAuthMe({ username });
        if (result.status === httpStatus.OK) {
            document.cookie = `AUTHORIZATION=${result.data.accessToken}; max-age=360000; secure; path=/`;
            window.location.reload();
            history.push('/chat');
        } else {
            setRegError('Username exists');
        }
    };

    useEffect(() => {
        console.log(authRS);
    }, [authRS]);

    return (
        <AuthContext.Provider
            value={{
                regError,
                setRegError,
                onPostMe,
                setMe,
                me,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.any,
};

AuthProvider.defaultProps = {
    children: null,
};
