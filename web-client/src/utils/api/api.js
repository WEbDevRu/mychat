import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

export const authAPI = {
    getMe() {
        return axiosInstance.get('/auth', { withCredentials: true })
            .then((res) => (res))
            .catch((err) => (err));
    },
    postMe(data) {
        return axiosInstance.post('/auth', data)
            .then((res) => (res))
            .catch((err) => (err));
    },
};
