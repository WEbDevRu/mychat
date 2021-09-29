import axios from 'axios';
import { useState } from 'react';
import { HTTP_REQUEST_STATUSES } from '../const/http/HTTP_REQUEST_STATUSES';

const DEFAULT_STATE = {
    status: HTTP_REQUEST_STATUSES.INITIAL,
    isProcessing: false,
    result: {},
    errors: {},
};

export const useRequest = ({ url, method }) => {
    const [state, setState] = useState();
    const onRequest = async (data) => {
        setState({
            ...DEFAULT_STATE,
            isProcessing: false,
            status: HTTP_REQUEST_STATUSES.PROCESSING,
        });
        try {
            const response = await axios({
                url,
                method,
                data,
            });
            setState({
                ...DEFAULT_STATE,
                status: HTTP_REQUEST_STATUSES.SUCCEEDED,
                result: response,
            });
        } catch (e) {
            setState({
                ...DEFAULT_STATE,
                status: HTTP_REQUEST_STATUSES.FAILED,
                errors: e,
            });
        }
    };

    return {
        state,
        onRequest,
    };
};
