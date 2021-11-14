import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './StreamsCont.module.scss';
import WebRTCConnection from '../../../utils/webRTC/webRTCConnection';
import { emptyFunc } from '../../../utils/function/emptyFunc';
import { useSocket } from '../../../context/SocketContext';

const StreamsCont = (props) => {
    const {
        streamConstraints,
        chatId,
        onJoinChat,
        chatData,
    } = props;

    const socket = useSocket();

    useEffect(() => {
        const webRTC = new WebRTCConnection({
            roomId: chatId,
            socket,
        });

        webRTC.joinRoom();

        webRTC.onJoinRoom((data) => {
            console.log('join video  conf', data);
        });
        return () => {
            webRTC.onForceConfLeave();
        };
    }, []);

    return (
        <div className={styles.content} />
    );
};

StreamsCont.propTypes = {
    streamConstraints: PropTypes.object,
    chatId: PropTypes.string,
    onJoinChat: PropTypes.func,
    chatData: PropTypes.object,
};

StreamsCont.defaultProps = {
    streamConstraints: {},
    chatId: '',
    onJoinChat: emptyFunc,
    chatData: {},
};

export default React.memo(StreamsCont);
