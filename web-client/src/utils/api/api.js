import * as axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
    baseURL: `${config.backendURL}/api`,
});

export const messengerAPI = {
    getChats() {
        return axiosInstance.get('/messenger', { withCredentials: true })
            .then((res) => (res))
            .catch((err) => (err));
    },
    getSearchChats(searchString) {
        return axiosInstance.get(`/messenger/chats?searchString=${searchString}`, { withCredentials: true })
            .then((res) => (res))
            .catch((err) => (err));
    },
    getChatInfo(chatId) {
        return axiosInstance.get(`/messenger/chat/${chatId}`, { withCredentials: true })
            .then((res) => (res))
            .catch((err) => (err));
    },
    getChatHistory(chatId) {
        return axiosInstance.get(`/messenger/chat/history/${chatId}`, { withCredentials: true })
            .then((res) => (res))
            .catch((err) => (err));
    },
    joinUserToChat(chatId) {
        return axiosInstance.put(`/messenger/chat/${chatId}/join`, '', { withCredentials: true })
            .then((res) => (res))
            .catch((err) => (err));
    },
};
