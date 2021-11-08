import React from 'react';
import PropTypes from 'prop-types';
import styles from './StreamsCont.module.scss';
import WebRTCConnection from '../../../utils/webRTC/webRTCConnection';

const StreamsCont = (props) => {
    const {
        streamConstraints,
        chatId,
    } = props;

    const webRTC = new WebRTCConnection({
        roomId: chatId,
        streamConstraints,
    });

    webRTC.joinRoom();

    webRTC.onJoinRoom((data) => {
        console.log(data);
    });

    return (
        <div className={styles.content} />
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
