import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { messengerAPI } from '../utils/api/api';
import { SIDEBAR_STATES } from '../const/messenger/SIDEBAR_STATES';

const MessengerContext = createContext({});
export const useMessenger = () => useContext(MessengerContext);

export const MessengerProvider = (props) => {
    const {
        children,
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
};

MessengerProvider.defaultProps = {
    children: null,
};
