import axios from "./axios.customize.js";

export const registerAPI = (name, email, phone_number, password) => {
    const urlBackend = "/auth/register";
    const data = {
        name,
        email,
        phone_number,
        password,
    };
    return axios.post(urlBackend, data);
};

export const loginAPI = (email, password) => {
    const urlBackend = "/auth/login";
    const data = {
        email,
        password,
    };
    return axios.post(urlBackend, data);
};

export const getProfileAPI = () => {
    const urlBackend = "/auth/profile";
    return axios.get(urlBackend);
};

export const handleRefreshTokenAPI = () => {
    const urlBackend = "/auth/refresh-token";
    return axios.post(urlBackend, {
        refreshToken: localStorage.getItem("refreshToken"),
    });
};

export const getUsersAPI = () => {
    const urlBackend = "/users";
    return axios.get(urlBackend);
};

export const createUserAPI = (name, email, phone_number, password) => {
    const urlBackend = "/users";
    const data = {
        name,
        email,
        phone_number,
        password,
    };
    return axios.post(urlBackend, data);
};

export const deleteUserAPI = (userId) => {
    const urlBackend = `/users/${userId}`;
    return axios.delete(urlBackend);
};
