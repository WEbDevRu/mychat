import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatMessages.module.scss';
import { useParams } from 'react-router-dom';

const ChatMessages = (props) => {
    const {
        currentChatHistory,
        onGetChatHistory,
    } = props;
    const { chatId } = useParams();

    useEffect(() => {
        if (chatId) {
            onGetChatHistory(chatId);
        }
    }, [chatId]);
    console.log(currentChatHistory);
    return (
        <div className={styles.content}>
            messages
        </div>
    );
};

ChatMessages.propTypes = {
    currentChatHistory: PropTypes.object,
    onGetChatHistory: PropTypes.func,
};

ChatMessages.defaultProps = {
    currentChatHistory: {},
    onGetChatHistory: (f) => f,
};

export default React.memo(ChatMessages);
