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
import { Navigation } from '../Navigation';
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
            <Navigation
                loadParticipants={loadParticipants}
                participants={participants}
                isParticipantsLoaded={isParticipantsLoaded}
                onSubscribeEvent={onSubscribeEvent}
                publishEvent={publishEvent}
                channelIdentifier={channelId}
            />
            <MessagesList
                onLoadMore={loadMoreMessages}
                isLoadingMore={isLoadingHistory}
                className={styles.list}
                scrollToBottomKey={scrollToBottomKey}
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
    wsRef: PropTypes.object,
    channelId: PropTypes.string,
};

Chat.defaultProps = {
    wsRef: null,
    channelId: '',
};

export default React.memo(Chat);
