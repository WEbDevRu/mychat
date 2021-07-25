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
                        />
                        <div className={styles.chatCont}>
                            <ChatMessages
                                currentChatHistory={currentChatHistory}
                                onGetChatHistory={onGetChatHistory}
                            />
                            <InputBlock />
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
};

Chat.defaultProps = {
    onGetChatInfo: (f) => f,
    currentChatInfo: {},
    onGetChatHistory: (f) => f,
    currentChatHistory: {},
};

export default React.memo(Chat);
