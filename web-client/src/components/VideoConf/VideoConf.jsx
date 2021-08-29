import React from 'react';
import PropTypes from 'prop-types';
import styles from './VideoConf.module.scss';
import { ControlBar } from './ControlBar';
import { StreamsCont } from './StreamsCont';
import { useVideoConf } from '../../context/VideoConfContext';

const VideoConf = () => {
    const {
        streamConstraints,
        setStreamConstraints,
    } = useVideoConf();
    return (
        <div className={styles.content}>
            <StreamsCont
                streamConstraints={streamConstraints}
            />
            <ControlBar
                setStreamConstraints={setStreamConstraints}
                streamConstraints={streamConstraints}
            />
        </div>
    );
};

export default React.memo(VideoConf);
