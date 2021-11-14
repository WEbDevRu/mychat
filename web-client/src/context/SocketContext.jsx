import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { getCookie } from '../utils/auth/getCookie';

const SocketContext = createContext({});
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = (props) => {
    const {
        children,
    } = props;

    const socketRef = useRef();

    const onConnect = useCallback(({ socketURL }) => {
        socketRef.current = socketIOClient(socketURL);
    }, []);

    const onSubscribe = useCallback((eventPath, func) => {
        if (socketRef.current) {
            socketRef.current.on(eventPath, func);
        }
    }, []);

    const onUnSubscribe = useCallback((eventPath, func) => {
        if (socketRef.current) {
            socketRef.current.removeListener(eventPath, func);
        }
    }, []);

    const onUnSubscribeFromEvent = useCallback((eventPath) => {
        if (socketRef.current) {
            socketRef.current.removeAllListeners(eventPath);
        }
    }, []);

    const onEmit = useCallback((eventPath, message) => {
        if (socketRef.current) {
            socketRef.current.emit(eventPath, {
                headers: {
                    authToken: getCookie('AUTHORIZATION'),
                },
                data: {
                    ...message,
                },
            });
        }
    }, []);

    return (
        <SocketContext.Provider
            value={{
                onConnect,
                onSubscribe,
                onEmit,
                onUnSubscribe,
                onUnSubscribeFromEvent,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.any,
};

SocketProvider.defaultProps = {
    children: null,
};
