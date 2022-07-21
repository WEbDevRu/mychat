import config from '../../config/index';

export const BASE_API = `${config.backendURL}/api`;
export const API_MESSENGER = `${BASE_API}/v1/messenger`;

export const API_AUTH = `${BASE_API}/v1/auth`;

export const API_LIVE_STREAM_ACCESS_TOKEN = `${BASE_API}/v1/stream/access_token`;
