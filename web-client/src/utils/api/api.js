import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

export const authAPI = {
    getMe() {
        return axiosInstance.get('/auth', { withCredentials: true })
            .then((res) => (res))
            .catch((err) => (err.response));
    },
    postMe(data) {
        return axiosInstance.post('/auth', data)
            .then((res) => (res))
            .catch((err) => (err));
    },
};

export const messengerAPI = {
    getChats() {
        return axiosInstance.get('/messenger', { withCredentials: true })
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
};
