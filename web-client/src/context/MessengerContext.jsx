import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { messengerAPI } from '../utils/api/api';

const MessengerContext = createContext({});
export const useMessenger = () => useContext(MessengerContext);

export const MessengerProvider = (props) => {
    const { children } = props;
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

    return (
        <MessengerContext.Provider
            value={{
                onGetChats,
                chats,
                onGetChatInfo,
                currentChatInfo,
                onGetChatHistory,
                currentChatHistory,
            }}
        >
            {children}
        </MessengerContext.Provider>
    );
};

MessengerProvider.propTypes = {
    children: PropTypes.any,
};

MessengerProvider.defaultProps = {
    children: null,
};
