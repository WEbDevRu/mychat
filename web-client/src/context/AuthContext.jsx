import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { useHistory } from 'react-router-dom';
import { authAPI } from '../utils/api/api';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const { children } = props;
    const [regError, setRegError] = useState();
    const [me, setMe] = useState();
    const history = useHistory();

    const onPostMe = async ({ username }) => {
        const result = await authAPI.postMe({ username });
        if (result.status === httpStatus.OK) {
            document.cookie = `AUTHORIZATION=${result.data.accessToken}; max-age=360000; secure; path=/`;
            history.push('/chat');
        } else {
            setRegError('Username exists');
        }
    };

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
