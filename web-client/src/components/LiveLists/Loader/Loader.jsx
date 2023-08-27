import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useWsConnection } from 'livelists-react-sdk';
import { useRequest } from '../../../hooks/useRequest';
import { API_LIVE_LISTS_CHAT } from '../../../const/http/routes';
import { HTTP_REQUEST_METHODS } from '../../../const/http/HTTP_REQUEST_METHODS';
import { HTTP_REQUEST_STATUSES } from '../../../const/http/HTTP_REQUEST_STATUSES';
import { Messenger } from '../Messenger';
import { LoadingPage } from '../../Common/LoadingPage';

const Loader = () => {
    const { chatId } = useParams();

    const [ws, setWs] = useState(null);

    const { state: getAccessTokenRS, onRequest: onGetAccessToken } = useRequest({
        url: `${API_LIVE_LISTS_CHAT}/${chatId}`,
        method: HTTP_REQUEST_METHODS.GET,
    });

    const {
        onGetConnection,
    } = useWsConnection({
        url: 'ws://localhost:7771/ws',
        accessToken: getAccessTokenRS?.result?.accessToken || '',
    });

    useEffect(() => {
        if (chatId) {
            onGetAccessToken();
        }
    }, [chatId]);

    useEffect(() => {
        const handleGetConnection = async () => {
            const wsConnection = (await onGetConnection()).current;
            setWs(wsConnection);
        };

        if (getAccessTokenRS.status === HTTP_REQUEST_STATUSES.SUCCEEDED) {
            handleGetConnection();
        }
    }, [getAccessTokenRS.status]);

    if (ws) {
        return (
            <Messenger
                wsRef={ws}
            />
        );
    }
    return (
        <LoadingPage />
    );
};

export default React.memo(Loader);
