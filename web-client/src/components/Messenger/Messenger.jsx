import React, { useEffect } from 'react';
import styles from './Messenger.module.scss';
import { Chat } from './Chat';
import { SideBar } from './SideBar';
import { useMessenger } from '../../context/MessengerContext';

const Messenger = () => {
    const {
        onGetChats,
        chats,
        onGetChatInfo,
        currentChatInfo,
        onGetChatHistory,
        currentChatHistory,
    } = useMessenger();

    useEffect(() => {
        onGetChats();
    }, []);
    return (
        <div className={styles.content}>
            <SideBar
                chats={chats}
            />
            <Chat
                onGetChatInfo={onGetChatInfo}
                currentChatInfo={currentChatInfo}
                onGetChatHistory={onGetChatHistory}
                currentChatHistory={currentChatHistory}
            />
        </div>
    );
};

export default React.memo(Messenger);
