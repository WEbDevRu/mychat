import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ChatInput,
    useChannel,
    MessagesList,
    RecentMessages,
} from 'livelists-react-sdk';
import styles from './Chat.module.scss';

const Chat = (props) => {
    const {
        livelistsToken,
    } = props;
    const { join, publishMessage, recentMessages } = useChannel({
        url: 'ws://localhost:7771/ws',
        accessToken: livelistsToken,
    });

    useEffect(() => {
        join();
    }, []);

    return (
        <div className={styles.content}>
            <MessagesList>
                <RecentMessages messages={recentMessages} />
            </MessagesList>
            <ChatInput
                placeholder="Message"
                onSubmit={({ value }) => publishMessage({
                    text: value,
                })}
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
