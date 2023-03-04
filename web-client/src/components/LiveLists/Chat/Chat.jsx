import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChatInput, useChannel } from 'livelists-react-sdk';
import styles from './Chat.module.scss';

const Chat = (props) => {
    const {
        livelistsToken,
    } = props;
    const { messages, join, pubslishMessage } = useChannel({
        url: 'ws://localhost:7771/ws',
        channelId: 'objectId',
        authToken: livelistsToken,
    });

    useEffect(() => {
        join();
    }, []);

    return (
        <div className={styles.content}>
            Chat live lists
            <ChatInput
                onPublish={pubslishMessage}
            />
        </div>
    );
};

Chat.propTypes = {
    livelistsToken: PropTypes.string,
};

Chat.defaultProps = {
    livelistsToken: '',
};

export default React.memo(Chat);
