import React, {
    createContext,
    useContext,
} from 'react';
import PropTypes from 'prop-types';

const ChatContext = createContext({});
export const useChat = () => useContext(ChatContext);

export const ChatProvider = (props) => {
    const { children } = props;
    const test = 'test';

    return (
        <ChatContext.Provider
            value={{
                test,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

ChatProvider.propTypes = {
    children: PropTypes.any,
};

ChatProvider.defaultProps = {
    children: null,
};
