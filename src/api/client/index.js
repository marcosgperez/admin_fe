import axios from 'axios';

const axiosWithTokenCheck = () => {
    const instance = axios.create({
        baseURL: 'http://localhost',
    });
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('Authorization');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                window.location.href = '/auth';
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return instance;
};

export const client = axiosWithTokenCheck();
