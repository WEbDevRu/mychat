import React, {
    useEffect,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Route, useParams } from 'react-router-dom';
import styles from './Chat.module.scss';
import { ChatMessages } from './ChatMessages';
import { InputBlock } from './InputBlock';
import { Navbar } from './Navbar';
import { useChat } from '../../../context/ChatContext';

const Chat = (props) => {
    const {
        me,
    } = props;

    const {
        onGetChatInfo,
        currentChatInfo,
        onGetChatHistory,
        currentChatHistory,
        onSendMessage,
        onJoinUserToChat,
        onChatEnter,
        onChatLeave,
    } = useChat();
    const { chatId } = useParams();
    const prevChatId = useRef();

    useEffect(() => {
        if (prevChatId.current) {
            onChatLeave({ chatId: prevChatId.current });
        }
        if (chatId) {
            onGetChatInfo(chatId);
            onChatEnter({ chatId });
            prevChatId.current = chatId;
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
                            chatId={chatId}
                            me={me}
                            onJoinUserToChat={onJoinUserToChat}
                        />
                        <div className={styles.chatCont}>
                            <ChatMessages
                                currentChatHistory={currentChatHistory}
                                onGetChatHistory={onGetChatHistory}
                                chatId={chatId}
                                me={me}
                            />
                            {currentChatInfo?.isSubscribed && (
                                <InputBlock
                                    onSendMessage={onSendMessage}
                                    chatId={chatId}
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
    me: PropTypes.object,
};

Chat.defaultProps = {
    me: {},
};

export default React.memo(Chat);
