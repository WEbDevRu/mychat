import React, { useEffect } from 'react';
import styles from './Messenger.module.scss';
import { Chat } from './Chat';
import { SideBar } from './SideBar';
import { useMessenger } from '../../context/MessengerContext';
import { useAuth } from '../../context/AuthContext';
import { ChatProvider } from '../../context/ChatContext';

const Messenger = (props) => {
    const {
        onGetChats,
        chats,
        onGetSearchChats,
        sidebarState,
        setSideBarState,
        sidebarBlock,
        setSidebarBlock,
    } = useMessenger();

    const {
        me,
    } = useAuth();

    const {
        socketRef,
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
                sidebarBlock={sidebarBlock}
                setSidebarBlock={setSidebarBlock}
            />
            <ChatProvider
                socketRef={socketRef}
            >
                <Chat
                    socketRef={socketRef}
                    me={me}
                />
            </ChatProvider>
        </div>
    );
};

export default React.memo(Messenger);
