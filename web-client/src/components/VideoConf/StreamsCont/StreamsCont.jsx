import React from 'react';
import PropTypes from 'prop-types';
import { cnb } from 'cnbuilder';
import { Typography } from '@material-ui/core';
import styles from './StreamsCont.module.scss';
import useWebRTC from '../../../utils/useWebRTC';

const StreamsCont = (props) => {
    const {
        streamConstraints,
        socketRef,
        chatId,
    } = props;

    const { clients, provideMediaRef } = useWebRTC({
        roomId: chatId,
        socketRef,
        streamConstraints,
    });

    return (
        <div className={styles.content}>
            <div className={cnb(styles.streamsCont, {
                [styles.oneStream]: clients.length === 1,
                [styles.twoStreams]: clients.length === 2,
                [styles.threeStreams]: clients.length === 3,
                [styles.fourStreams]: clients.length === 4,
            })}
            >
                {clients.map((c) => (
                    <div
                        key={c.peerID}
                        className={cnb(styles.streamBlock, {
                            [styles.oneStream]: clients.length === 1,
                            [styles.twoStreams]: clients.length === 2,
                            [styles.threeStreams]: clients.length === 3,
                            [styles.fourStreams]: clients.length === 4,
                        })}
                    >
                        <>
                            <video
                                width="100%"
                                height="100%"
                                ref={(instance) => {
                                    provideMediaRef(c.peerID, instance);
                                }}
                                autoPlay
                                playsInline
                                className={styles.video}
                            />
                            <div
                                className={styles.streamDesc}
                            >
                                {c.isMe ? (
                                    <Typography>
                                        You
                                    </Typography>
                                ) : (
                                    <Typography>
                                        {c.username}
                                    </Typography>
                                )}
                            </div>
                        </>
                    </div>
                ))}
            </div>

        </div>
    );
};

StreamsCont.propTypes = {
    streamConstraints: PropTypes.object,
    socketRef: PropTypes.object,
    chatId: PropTypes.string,
};

StreamsCont.defaultProps = {
    streamConstraints: {},
    socketRef: {},
    chatId: '',
};

export default React.memo(StreamsCont);
