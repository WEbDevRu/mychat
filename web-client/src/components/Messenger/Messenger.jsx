import React, { useEffect } from 'react';
import styles from './Messenger.module.scss';
import { Chat } from './Chat';
import { SideBar } from './SideBar';
import { useMessenger } from '../../context/MessengerContext';
import { useAuth } from '../../context/AuthContext';

const Messenger = (props) => {
    const {
        onGetChats,
        chats,
        onGetChatInfo,
        currentChatInfo,
        onGetChatHistory,
        currentChatHistory,
        onGetSearchChats,
        onSendMessage,
        sidebarState,
        setSideBarState,
        onJoinUserToChat,
    } = useMessenger();

    const {
        me,
    } = useAuth();

    const {
        socketRef
    } = props;

    useEffect(() => {
        onGetChats();
    }, []);
    return (
        <div className={styles.content}>
            <SideBar
                chats={chats}
                onGetSearchChats={onGetSearchChats}
                sidebarState={sidebarState}
                setSideBarState={setSideBarState}
                me={me}
            />
            <Chat
                onGetChatInfo={onGetChatInfo}
                currentChatInfo={currentChatInfo}
                onGetChatHistory={onGetChatHistory}
                currentChatHistory={currentChatHistory}
                socketRef={socketRef}
                onSendMessage={onSendMessage}
                me={me}
                onJoinUserToChat={onJoinUserToChat}
            />
        </div>
    );
};

export default React.memo(Messenger);
