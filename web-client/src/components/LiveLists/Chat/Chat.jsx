import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ChatInput,
    useChannel,
    MessagesList,
    RecentMessages,
    HistoryMessages,
} from 'livelists-react-sdk';
import styles from './Chat.module.scss';
import { LoadingPage } from '../../Common/LoadingPage';

const Chat = (props) => {
    const {
        livelistsToken,
    } = props;
    const {
        join,
        publishMessage,
        recentMessages,
        historyMessages,
        connectionState,
        isLoadingHistory,
        loadMoreMessages,
    } = useChannel({
        url: 'ws://localhost:7771/ws',
        accessToken: livelistsToken,
    });

    useEffect(() => {
        join();
    }, []);

    if (connectionState === 'connecting') {
        return (
            <LoadingPage />
        );
    }

    if (connectionState === 'connectionError') {
        return (
            <p>
                Connection error
            </p>
        );
    }

    console.log(historyMessages.map((m) => m.message.message));
    return (
        <div className={styles.content}>
            <MessagesList
                onLoadMore={loadMoreMessages}
                isLoadingMore={isLoadingHistory}
            >
                <HistoryMessages messages={historyMessages} />
                <RecentMessages messages={recentMessages} />
            </MessagesList>
            <ChatInput
                placeholder="Type something..."
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
