import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

export const authAPI = {
    getMe() {
        return axiosInstance.get('/auth')
            .then((res) => (res.response))
            .catch((err) => (err.response));
    },
};
