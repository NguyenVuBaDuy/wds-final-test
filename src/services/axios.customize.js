import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true,
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
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
    return error?.response?.data ?? Promise.reject(error);
});

export default instance
