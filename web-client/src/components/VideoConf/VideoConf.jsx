import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './VideoConf.module.scss';
import { ControlBar } from './ControlBar';
import { StreamsCont } from './StreamsCont';
import { useVideoConf } from '../../context/VideoConfContext';

const VideoConf = () => {
    const {
        streamConstraints,
        setStreamConstraints,
        socketRef,
    } = useVideoConf();

    const { chatId } = useParams();

    return (
        <div className={styles.content}>
            <StreamsCont
                streamConstraints={streamConstraints}
                chatId={chatId}
                socketRef={socketRef}
            />
            <ControlBar
                setStreamConstraints={setStreamConstraints}
                streamConstraints={streamConstraints}
            />
        </div>
    );
};

export default React.memo(VideoConf);
