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
    } = props;
    const { chatId } = useParams();

    useEffect(() => {
        if (chatId) {
            onGetChatInfo(chatId);
        }
    }, [chatId]);
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
                        />
                        <div className={styles.chatCont}>
                            <ChatMessages
                                currentChatHistory={currentChatHistory}
                                onGetChatHistory={onGetChatHistory}
                                chatId={chatId}
                                me={me}
                            />
                            <InputBlock
                                onSendMessage={onSendMessage}
                                chatId={chatId}
                            />
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
};

Chat.defaultProps = {
    onGetChatInfo: (f) => f,
    currentChatInfo: {},
    onGetChatHistory: (f) => f,
    currentChatHistory: {},
    socketRef: {},
    onSendMessage: (f) => f,
    me: {},
};

export default React.memo(Chat);
