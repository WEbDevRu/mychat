import React, {
    createContext,
    useContext, useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useRequest } from '../hooks/useRequest';
import { HTTP_REQUEST_METHODS } from '../const/http/HTTP_REQUEST_METHODS';
import { API_AUTH } from '../const/http/routes';
import { HTTP_REQUEST_STATUSES } from '../const/http/HTTP_REQUEST_STATUSES';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const { children } = props;
    const [regError, setRegError] = useState();
    const [me, setMe] = useState();
    const history = useHistory();
    const { state: postMeRS, onRequest: onPostMe } = useRequest({
        url: API_AUTH,
        method: HTTP_REQUEST_METHODS.POST,
    });

    useEffect(() => {
        if (postMeRS.status === HTTP_REQUEST_STATUSES.SUCCEEDED) {
            console.log(postMeRS.result);
            document.cookie = `AUTHORIZATION=${postMeRS.result.accessToken}; max-age=360000; secure; path=/`;
            window.location.reload();
            history.push('/chat');
        } else {
            setRegError('Username exists');
        }
    }, [postMeRS]);

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
