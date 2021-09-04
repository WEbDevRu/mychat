import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useParams } from 'react-router-dom';
import styles from './Chat.module.scss';
import { ChatMessages } from './ChatMessages';
import { InputBlock } from './InputBlock';
import { Navbar } from './Navbar';

const Chat = (props) => {
    const {
        onGetChatInfo,
        currentChatInfo,
        onGetChatHistory,
        currentChatHistory,
        socketRef,
        onSendMessage,
        me,
        onJoinUserToChat,
    } = props;
    const { chatId } = useParams();

    useEffect(() => {
        if (chatId) {
            onGetChatInfo(chatId);
        }
    }, [chatId]);
    let isJoinedToChat = false;
    console.log(me);
    if (currentChatInfo.participants?.find(((i) => i.participant.id === me.id))) {
        isJoinedToChat = true;
    }
    return (
        <div className={styles.content}>
            <Route
                path="/chat/:chatId"
                render={() => (
                    <>
                        <Navbar
                            currentChatInfo={currentChatInfo}
                            socketRef={socketRef}
                            chatId={chatId}
                            me={me}
                            isJoinedToChat={isJoinedToChat}
                            onJoinUserToChat={onJoinUserToChat}
                        />
                        <div className={styles.chatCont}>
                            <ChatMessages
                                currentChatHistory={currentChatHistory}
                                onGetChatHistory={onGetChatHistory}
                                chatId={chatId}
                                me={me}
                            />
                            {isJoinedToChat && (
                                <InputBlock
                                    onSendMessage={onSendMessage}
                                    chatId={chatId}
                                    isJoinedToChat={isJoinedToChat}
                                />
                            )}
                        </div>
                    </>
                )}
            />

        </div>
    );
};

Chat.propTypes = {
    onGetChatInfo: PropTypes.func,
    currentChatInfo: PropTypes.object,
    onGetChatHistory: PropTypes.func,
    currentChatHistory: PropTypes.object,
    socketRef: PropTypes.object,
    onSendMessage: PropTypes.func,
    me: PropTypes.object,
    onJoinUserToChat: PropTypes.func,
};

Chat.defaultProps = {
    onGetChatInfo: (f) => f,
    currentChatInfo: {},
    onGetChatHistory: (f) => f,
    currentChatHistory: {},
    socketRef: {},
    onSendMessage: (f) => f,
    me: {},
    onJoinUserToChat: (f) => f,
};

export default React.memo(Chat);
