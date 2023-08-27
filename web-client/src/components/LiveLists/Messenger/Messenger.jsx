import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
    useChannelsAggregation,
    ChannelsList,
} from 'livelists-react-sdk';
import styles from './Messenger.module.scss';
import { Chat } from './Chat';

const Messenger = (props) => {
    const [selectedChannelId, setSelectedChannelId] = useState(undefined);
    const {
        wsRef,
    } = props;

    const {
        loadChannels,
        channels,
    } = useChannelsAggregation({
        wsConnector: wsRef,
    });

    useEffect(() => {
        loadChannels({
            messagesLimit: 1,
        });
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.messagesRow}>
                <div className={styles.channelsList}>
                    <ChannelsList
                        onSelect={({ channelId }) => setSelectedChannelId(channelId)}
                        channels={channels.map((c) => c)}
                    />
                </div>
                {selectedChannelId && (
                    <Chat
                        key={selectedChannelId}
                        wsRef={wsRef}
                        channelId={selectedChannelId}
                    />
                )}
            </div>
        </div>
    );
};

Messenger.propTypes = {
    wsRef: PropTypes.object,
};

Messenger.defaultProps = {
    wsRef: null,
};

export default React.memo(Messenger);
