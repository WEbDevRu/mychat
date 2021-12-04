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
import { useSocket } from './SocketContext';

const ChatContext = createContext({});
export const useChat = () => useContext(ChatContext);

export const ChatProvider = (props) => {
    const {
        children,
    } = props;

    const socket = useSocket();

    const [currentChatInfo, setCurrentChatInfo] = useState({});
    const [currentChatHistory, setCurrentChatHistory] = useState({});

    const onGetChatInfo = async (chatId) => {
        const result = await messengerAPI.getChatInfo(chatId);
        if (result.status === httpStatus.OK) {
            setCurrentChatInfo(result.data);
        }
    };

    const onGetChatHistory = async (chatId) => {
        const result = await messengerAPI.getChatHistory(chatId);
        if (result.status === httpStatus.OK) {
            setCurrentChatHistory(result.data);
        }
    };

    const onSendMessage = ({ message, chatId }) => {
        socket.onEmit(POST_NEW_MESSAGE, {
            chatId,
            message,
        });
    };

    const onJoinUserToChat = async ({ chatId }) => {
        const result = await messengerAPI.joinUserToChat(chatId);
        if (result.status === httpStatus.OK) {
            setCurrentChatInfo(result.data?.chatInfo);
        }
    };

    useEffect(() => {
        socket.onSubscribe(NEW_MESSAGE_POSTED, (data) => {
            setCurrentChatHistory((h) => ({
                items: h.items.concat(data.message),
            }));
        });
    }, []);

    const onChatEnter = ({ chatId }) => {
        socket.onEmit('chat/ENTER', {
            chatId
        });
    };

    const onChatLeave = ({ chatId }) => {
        socket.onEmit('chat/LEAVE', {
            chatId
        });
    };

    return (
        <ChatContext.Provider
            value={{
                onGetChatInfo,
                currentChatInfo,
                onGetChatHistory,
                currentChatHistory,
                onSendMessage,
                onJoinUserToChat,
                onChatEnter,
                onChatLeave,
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
