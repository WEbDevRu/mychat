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
    } = useMessenger();

    const {
        me,
    } = useAuth()

    const {
        socketRef
    } = props

    useEffect(() => {
        onGetChats();
    }, []);
    return (
        <div className={styles.content}>
            <SideBar
                chats={chats}
                onGetSearchChats={onGetSearchChats}
            />
            <Chat
                onGetChatInfo={onGetChatInfo}
                currentChatInfo={currentChatInfo}
                onGetChatHistory={onGetChatHistory}
                currentChatHistory={currentChatHistory}
                socketRef={socketRef}
                onSendMessage={onSendMessage}
                me={me}
            />
        </div>
    );
};

export default React.memo(Messenger);
