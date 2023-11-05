import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import {
    ChatInput,
    useChannel,
    MessagesList,
    RecentMessages,
    HistoryMessages,
    ChannelInfo,
} from 'livelists-react-sdk';
import styles from './Chat.module.scss';
import { LoadingPage } from '../../../Common/LoadingPage';

const Chat = (props) => {
    const {
        wsRef,
        channelId,
    } = props;

    const {
        join,
        publishMessage,
        recentMessages,
        historyMessages,
        connectionState,
        isLoadingHistory,
        loadMoreMessages,
        loadParticipants,
        participants,
        isParticipantsLoaded,
        onSubscribeEvent,
        publishEvent,
        scrollToBottomKey,
        readMessage,
    } = useChannel({
        channelId,
        wsConnector: wsRef,
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

    return (
        <div className={styles.content}>
            <ChannelInfo />
            <MessagesList
                onLoadMore={loadMoreMessages}
                isLoadingMore={isLoadingHistory}
                scrollToBottomKey={scrollToBottomKey}
            >
                <HistoryMessages
                    readMessage={readMessage}
                    messages={historyMessages}
                />
                <RecentMessages
                    readMessage={readMessage}
                    messages={recentMessages}
                />
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
    wsRef: PropTypes.object,
    channelId: PropTypes.string,
};

Chat.defaultProps = {
    wsRef: null,
    channelId: '',
};

export default React.memo(Chat);
