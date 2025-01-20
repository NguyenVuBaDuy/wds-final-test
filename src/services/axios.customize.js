import axios from "axios";
import { handleRefreshTokenAPI } from "./api.service";

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true,
});

const handleRefreshToken = async () => {
    const res = await handleRefreshTokenAPI()
    console.log(res)
    if (res && res.data) {
        return res.data.accessToken
    } else null
}

const NO_RETRY_HEADER = 'x-no-retry'

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent

    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data) return response.data
    return response
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.config && error.response
        && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        const accessToken = await handleRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = 'true'
        if (accessToken) {
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            localStorage.setItem('accessToken', accessToken)
            return instance.request(error.config);
        }
    }

    if (
        error.config && error.response
        && +error.response.status === 400
        && error.config.url === '/auth/refresh-token'
    ) {
        if (
            window.location.pathname !== '/'
            && !window.location.pathname.startsWith('/product')
        ) {
            window.location.href = '/login';
        }
    }
    return error?.response?.data ?? Promise.reject(error);
});

export default instance
