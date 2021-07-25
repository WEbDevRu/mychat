import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { authAPI } from '../utils/api/api';
import httpStatus from 'http-status';
import { useHistory } from 'react-router-dom';
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const { children } = props;
    const [regError, setRegError] = useState();
    const [isAuthorized, setIsAuthorized] = useState();
    const history = useHistory();

    const onPostMe = async ({ username }) => {
        const result = await authAPI.postMe({ username });
        if (result.status === httpStatus.OK) {
            document.cookie = `AUTHORIZATION=${result.data.accessToken}; max-age=360000; secure; path=/`;
            history.push('/');
        } else {
            setRegError('Username exists');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthorized,
                setIsAuthorized,
                regError,
                setRegError,
                onPostMe,
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
