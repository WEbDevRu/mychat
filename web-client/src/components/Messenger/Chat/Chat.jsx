import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useParams } from 'react-router-dom';
import styles from './Chat.module.scss';
import { ChatMessages } from './ChatMessages';
import { InputBlock } from './InputBlock';
import { Navbar } from './Navbar';
import { useChat } from '../../../context/ChatContext';

const Chat = (props) => {
    const {
        socketRef,
        me,
    } = props;

    const {
        onGetChatInfo,
        currentChatInfo,
        onGetChatHistory,
        currentChatHistory,
        onSendMessage,
        onJoinUserToChat,
    } = useChat();
    const { chatId } = useParams();

    useEffect(() => {
        if (chatId) {
            onGetChatInfo(chatId);
        }
    }, [chatId]);
    let isJoinedToChat = false;

    if (currentChatInfo?.participants?.find(((i) => i.participant.id === me.id))) {
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
    socketRef: PropTypes.object,
    me: PropTypes.object,
};

Chat.defaultProps = {
    socketRef: {},
    me: {},
};

export default React.memo(Chat);
