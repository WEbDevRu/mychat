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

const MessengerContext = createContext({});
export const useMessenger = () => useContext(MessengerContext);

export const MessengerProvider = (props) => {
    const {
        children,
        socketRef,
    } = props;
    const [chats, setChats] = useState([]);
    const [currentChatInfo, setCurrentChatInfo] = useState({});
    const [currentChatHistory, setCurrentChatHistory] = useState({});
    const onGetChats = async () => {
        const result = await messengerAPI.getChats();
        if (result.status === httpStatus.OK) {
            setChats(result.data);
        }
    };

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

    const onGetSearchChats = async () => {
        const result = await messengerAPI.getSearchChats();
        if (result.status === httpStatus.OK) {
            setChats(result.data);
        }
    };

    const onSendMessage = ({ message, chatId }) => {
        socketRef.current.emit('chat/NEW_MESSAGE', {
            chatId,
            message,
            token: getCookie('AUTHORIZATION'),
        });
    };

    useEffect(() => {
        socketRef.current.on('chat/NEW_MESSAGE_POSTED', (data) => {
            setCurrentChatHistory((h) => ({
                items: h.items.concat(data.newMessage),
            }));
        });
    }, []);

    return (
        <MessengerContext.Provider
            value={{
                onGetChats,
                chats,
                onGetChatInfo,
                currentChatInfo,
                onGetChatHistory,
                currentChatHistory,
                onGetSearchChats,
                onSendMessage,
            }}
        >
            {children}
        </MessengerContext.Provider>
    );
};

MessengerProvider.propTypes = {
    children: PropTypes.any,
    socketRef: PropTypes.object,
};

MessengerProvider.defaultProps = {
    children: null,
    socketRef: {},
};
