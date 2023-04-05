import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useRequest } from '../../../hooks/useRequest';
import { API_LIVE_LISTS_CHAT } from '../../../const/http/routes';
import { HTTP_REQUEST_METHODS } from '../../../const/http/HTTP_REQUEST_METHODS';
import { HTTP_REQUEST_STATUSES } from '../../../const/http/HTTP_REQUEST_STATUSES';
import { Chat } from '../Chat';
import { LoadingPage } from '../../Common/LoadingPage';

const Loader = () => {
    const { chatId } = useParams();

    const { state: getAccessTokenRS, onRequest: onGetAccessToken } = useRequest({
        url: `${API_LIVE_LISTS_CHAT}/${chatId}`,
        method: HTTP_REQUEST_METHODS.GET,
    });

    useEffect(() => {
        if (chatId) {
            onGetAccessToken();
        }
    }, [chatId]);

    if (getAccessTokenRS.status === HTTP_REQUEST_STATUSES.SUCCEEDED) {
        return (
            <Chat
                livelistsToken={getAccessTokenRS.result.accessToken}
            />
        );
    }
    return (
        <LoadingPage />
    );
};

export default React.memo(Loader);
