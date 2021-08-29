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
        onVideoConfJoin,
        streams,
        foreignStream,
    } = useVideoConf();

    const { chatId } = useParams();

    useEffect(() => {
        onVideoConfJoin({ chatId });
    }, []);
    return (
        <div className={styles.content}>
            <StreamsCont
                streamConstraints={streamConstraints}
                streams={streams}
                foreignStream={foreignStream}
            />
            <ControlBar
                setStreamConstraints={setStreamConstraints}
                streamConstraints={streamConstraints}
            />
        </div>
    );
};

export default React.memo(VideoConf);
