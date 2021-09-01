import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import styles from './ChatMessages.module.scss';
import { MessageGroup } from './MessageGroup';

const ChatMessages = (props) => {
    const {
        currentChatHistory,
        onGetChatHistory,
        chatId,
        me,
    } = props;

    useEffect(() => {
        if (chatId) {
            onGetChatHistory(chatId);
        }
    }, [chatId]);

    return (
        <div className={styles.content}>
            <Scrollbar>
                {
                    currentChatHistory?.items?.map((m) => (
                        <MessageGroup
                            key={m.createdAt}
                            data={m}
                            me={me}
                        />
                    ))
                }
            </Scrollbar>
        </div>
    );
};

ChatMessages.propTypes = {
    currentChatHistory: PropTypes.object,
    onGetChatHistory: PropTypes.func,
    chatId: PropTypes.string,
    me: PropTypes.object,
};

ChatMessages.defaultProps = {
    currentChatHistory: {},
    onGetChatHistory: (f) => f,
    chatId: '',
    me: {},
};

export default React.memo(ChatMessages);
