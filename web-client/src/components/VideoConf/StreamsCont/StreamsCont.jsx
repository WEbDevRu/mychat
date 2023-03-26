import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './StreamsCont.module.scss';
import WebRTCConnection from '../../../utils/webRTC/webRTCConnection';
import { emptyFunc } from '../../../utils/function/emptyFunc';
import { useSocket } from '../../../context/SocketContext';
import { Video } from './Video';

const PARTICIPANTS_TYPES = {
    DEFAULT: 'default',
    ME: 'me',
};

export const STREAM_STATES = {
    FETCHING: 'fetching',
    STREAM: 'stream',
};

const StreamsCont = (props) => {
    const {
        streamConstraints,
        chatId,
        onJoinChat,
        chatData,
        me,
    } = props;

    const socket = useSocket();

    const [confParticipants, setConfParticipants] = useState([{
        userData: {
            userId: me.id,
            username: me.username,
        },
        state: STREAM_STATES.FETCHING,
        type: PARTICIPANTS_TYPES.ME,
    }]);

    const [webRTC, setWebRTC] = useState(new WebRTCConnection({
        roomId: chatId,
        socket,
        servers: {
            iceServers: [{
                url: 'stun:stun4.l.google.com:19302',
            }],
        },
        mediaConstraints: {
            video: true,
            audio: true,
        },
    }));

    const [isInit, setIsInit] = useState(false);

    useEffect(() => {

        return () => {
            webRTC.onForceConfLeave();
        };
    }, []);

    if (!isInit) {
        webRTC.joinRoom();
        setIsInit(true);

        webRTC?.onJoinRoom((data) => {
            console.log(data);
        });

        webRTC?.onNewPeer(({ userData }) => {
            setConfParticipants((p) => (
                p.concat({
                    userData: {
                        userId: userData.userId,
                        username: userData.username,
                    },
                    state: STREAM_STATES.FETCHING,
                    type: PARTICIPANTS_TYPES.DEFAULT,
                })
            ));
        });

        webRTC?.onLocalStream((stream) => {
            setConfParticipants((participants) => {
                const myStreamIndex = participants.findIndex((p) => p.type === PARTICIPANTS_TYPES.ME);
                const participantsCopy = [...participants];
                participantsCopy[myStreamIndex] = {
                    ...participantsCopy[myStreamIndex],
                    stream,
                    state: STREAM_STATES.STREAM,
                };
                return participantsCopy;
            });
        });

        webRTC?.onRemoteStream(({ userId }) => {
            setConfParticipants((participants) => {
                const participantIndex = participants.findIndex((p) => p.userData.userId.toString() === userId.toString());
                const participantsCopy = [...participants];
                if (participantIndex !== -1) {
                    participantsCopy[participantIndex] = {
                        ...participantsCopy[participantIndex],
                        stream: webRTC.peerConnections[userId].remoteStream,
                        state: STREAM_STATES.STREAM,
                    };
                }
                return participantsCopy;
            });
        });

        webRTC?.onParticipantLeave(({ userId }) => {
            setConfParticipants((participants) => {
                const participantIndex = participants.findIndex((p) => p.userData.userId.toString() === userId.toString());
                const participantsCopy = [...participants];
                if (participantIndex !== -1) {
                    participantsCopy.splice(participantIndex, 1);
                }
                return participantsCopy;
            });
        });
    }


    return (
        <div className={styles.content}>
            {console.log(confParticipants)}
            {confParticipants.map((p) => {
                return (
                    <Video
                        stream={p.stream}
                        userData={p.userData}
                        type={p.type}
                        state={p.state}
                        key={p.userData.userId + p.state}
                    />
                );
            })}
        </div>
    );
};

StreamsCont.propTypes = {
    streamConstraints: PropTypes.object,
    chatId: PropTypes.string,
    onJoinChat: PropTypes.func,
    chatData: PropTypes.object,
    me: PropTypes.object,
};

StreamsCont.defaultProps = {
    streamConstraints: {},
    chatId: '',
    onJoinChat: emptyFunc,
    chatData: {},
    me: {},
};

export default React.memo(StreamsCont);
