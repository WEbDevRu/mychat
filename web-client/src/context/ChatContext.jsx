import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { messengerAPI } from '../utils/api/api';
import { getCookie } from '../utils/auth/getCookie';
import { NEW_MESSAGE_POSTED, POST_NEW_MESSAGE } from '../const/socket/EVENTS';

const ChatContext = createContext({});
export const useChat = () => useContext(ChatContext);

export const ChatProvider = (props) => {
    const {
        children,
        socketRef,
    } = props;
    const [currentChatInfo, setCurrentChatInfo] = useState({});
    const [currentChatHistory, setCurrentChatHistory] = useState({});

    const onGetChatInfo = async (chatId) => {
        const result = await messengerAPI.getChatInfo(chatId);
        if (result.status === httpStatus.OK) {
            setCurrentChatInfo(result.data?.chatInfo);
        }
    };

    const onGetChatHistory = async (chatId) => {
        const result = await messengerAPI.getChatHistory(chatId);
        if (result.status === httpStatus.OK) {
            setCurrentChatHistory(result.data);
        }
    };

    const onSendMessage = ({ message, chatId }) => {
        socketRef.current.emit(POST_NEW_MESSAGE, {
            chatId,
            message,
            token: getCookie('AUTHORIZATION'),
        });
    };

    const onJoinUserToChat = async ({ chatId }) => {
        const result = await messengerAPI.joinUserToChat(chatId);
        if (result.status === httpStatus.OK) {
            setCurrentChatInfo(result.data?.chatInfo);
        }
    };

    useEffect(() => {
        socketRef.current.on(NEW_MESSAGE_POSTED, (data) => {
            setCurrentChatHistory((h) => ({
                items: h.items.concat(data.message),
            }));
        });
    }, []);

    return (
        <ChatContext.Provider
            value={{
                onGetChatInfo,
                currentChatInfo,
                onGetChatHistory,
                currentChatHistory,
                onSendMessage,
                onJoinUserToChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

ChatProvider.propTypes = {
    children: PropTypes.any,
    socketRef: PropTypes.object,
};

ChatProvider.defaultProps = {
    children: null,
    socketRef: {},
};
