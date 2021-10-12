import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

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

    const onEmit = useCallback((eventPath, message) => {
        if (socketRef.current) {
            socketRef.current.emit(eventPath, message);
        }
    }, []);

    return (
        <SocketContext.Provider
            value={{
                onConnect,
                onSubscribe,
                onEmit,
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
