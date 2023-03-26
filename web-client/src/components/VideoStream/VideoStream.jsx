import React, { useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/react-components';
import { useParams } from 'react-router-dom';
import styles from './VideoStream.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useRequest } from '../../hooks/useRequest';
import { API_LIVE_STREAM_ACCESS_TOKEN } from '../../const/http/routes';
import { HTTP_REQUEST_METHODS } from '../../const/http/HTTP_REQUEST_METHODS';
import { HTTP_REQUEST_STATUSES } from '../../const/http/HTTP_REQUEST_STATUSES';

const VideoStream = () => {
    const {
        me,
    } = useAuth();

    const { chatId } = useParams();

    const [token, setToken] = useState();

    const { state: getAccessTokenRS, onRequest: onGetAccessToken } = useRequest({
        url: `${API_LIVE_STREAM_ACCESS_TOKEN }/${chatId}`,
        method: HTTP_REQUEST_METHODS.GET,
    });

    useEffect(() => {
        onGetAccessToken();
    }, []);

    const url = 'wss://mychat-livekit.whats-better.fun';

    async function onConnected(room) {
        await room.localParticipant.setCameraEnabled(true);
        await room.localParticipant.setMicrophoneEnabled(true);
    }

    useEffect(() => {
        if (getAccessTokenRS.status === HTTP_REQUEST_STATUSES.SUCCEEDED) {
            const { result } = getAccessTokenRS;

            setToken(result.token);
        }
    }, [getAccessTokenRS.status]);

    if (token) {
        return (
            <div className={styles.content}>
                <div className="roomContainer">
                    <LiveKitRoom url={url} token={token} onConnected={(room) => onConnected(room)} />
                </div>
            </div>
        );
    }

    return (<></>);
};

export default React.memo(VideoStream);
