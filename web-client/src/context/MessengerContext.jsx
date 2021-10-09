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
import { SIDEBAR_STATES } from '../const/messenger/SIDEBAR_STATES';
import { NEW_MESSAGE_POSTED, POST_NEW_MESSAGE } from '../const/socket/EVENTS';

const MessengerContext = createContext({});
export const useMessenger = () => useContext(MessengerContext);

export const MessengerProvider = (props) => {
    const {
        children,
        socketRef,
    } = props;
    const [chats, setChats] = useState({});
    const [sidebarState, setSideBarState] = useState(SIDEBAR_STATES.CHATS);

    const onGetChats = async () => {
        const result = await messengerAPI.getChats();
        if (result.status === httpStatus.OK) {
            setChats(result.data);
        }
    };

    const onGetSearchChats = async ({ searchString }) => {
        const result = await messengerAPI.getSearchChats(searchString);
        if (result.status === httpStatus.OK) {
            setChats(result.data);
        }
    };

    useEffect(() => {
        setChats({});
        if (sidebarState === SIDEBAR_STATES.CHATS) {
            onGetChats();
        }
    }, [sidebarState]);

    return (
        <MessengerContext.Provider
            value={{
                onGetChats,
                chats,
                onGetSearchChats,
                sidebarState,
                setSideBarState,
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
