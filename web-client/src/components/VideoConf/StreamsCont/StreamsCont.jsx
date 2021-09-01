import React, {
    useEffect,
    useRef,
} from 'react';
import PropTypes from 'prop-types';

import styles from './StreamsCont.module.scss';
import useWebRTC from '../../../utils/useWebRTC';

const StreamsCont = (props) => {
    const myVideoRef = useRef();
    const {
        myStream,
        streamConstraints,
        socketRef,
        chatId,
    } = props;

    const { clients, provideMediaRef } = useWebRTC(chatId, socketRef);

    return (
        <div className={styles.content}>
            {clients.map((clientID) => (
                <div key={clientID}>
                    <video
                        width="100%"
                        height="100%"
                        ref={(instance) => {
                            provideMediaRef(clientID, instance);
                        }}
                        autoPlay
                        playsInline
                    />
                </div>
            ))}
        </div>
    );
};

StreamsCont.propTypes = {
    myStream: PropTypes.object,
    streamConstraints: PropTypes.object,
    socketRef: PropTypes.object,
    chatId: PropTypes.string,
};

StreamsCont.defaultProps = {
    myStream: {},
    streamConstraints: {},
    socketRef: {},
    chatId: '',
};

export default React.memo(StreamsCont);
