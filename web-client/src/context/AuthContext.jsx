import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const { children } = props;
    const [isAuthorized, setIsAuthorized] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (isAuthorized) {
            history.push('/');
        } else {
            history.push('/reg');
        }
    }, [isAuthorized]);

    return (
        <AuthContext.Provider
            value={{
                isAuthorized,
                setIsAuthorized,
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
