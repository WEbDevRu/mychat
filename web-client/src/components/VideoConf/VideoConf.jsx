import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './VideoConf.module.scss';
import { ControlBar } from './ControlBar';
import { StreamsCont } from './StreamsCont';
import { useVideoConf } from '../../context/VideoConfContext';
import { useAuth } from '../../context/AuthContext';

const VideoConf = () => {
    const {
        streamConstraints,
        setStreamConstraints,
        onJoinChat,
        chatData,
    } = useVideoConf();

    const {
        me,
    } = useAuth();

    const { chatId } = useParams();

    return (
        <div className={styles.content}>
            <StreamsCont
                streamConstraints={streamConstraints}
                chatId={chatId}
                onJoinChat={onJoinChat}
                chatData={chatData}
                me={me}
            />
            <ControlBar
                setStreamConstraints={setStreamConstraints}
                streamConstraints={streamConstraints}
            />
        </div>
    );
};

export default React.memo(VideoConf);
