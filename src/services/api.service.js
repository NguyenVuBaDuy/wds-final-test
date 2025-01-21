import axios from "./axios.customize.js";

export const registerAPI = (name, email, phone_number, password) => {
    const urlBackend = "/auth/register";
    const data = {
        name,
        email,
        phone_number,
        password,
    };
    return axios.post(urlBackend, data)
}

export const loginAPI = (email, password) => {
    const urlBackend = "/auth/login"
    const data = {
        email,
        password,
    };
    return axios.post(urlBackend, data)
}

export const getProfileAPI = () => {
    const urlBackend = "/auth/profile"
    return axios.get(urlBackend)
}

export const handleRefreshTokenAPI = () => {
    const urlBackend = "/auth/refresh-token"
    return axios.post(urlBackend, {
        refreshToken: localStorage.getItem("refreshToken"),
    })
}

export const getUsersAPI = () => {
    const urlBackend = "/users"
    return axios.get(urlBackend)
}

export const createUserAPI = (name, email, phone_number, password) => {
    const urlBackend = "/users"
    const data = {
        name,
        email,
        phone_number,
        password,
    };
    return axios.post(urlBackend, data)
}

export const deleteUserAPI = (userId) => {
    const urlBackend = `/users/${userId}`
    return axios.delete(urlBackend)
}

export const getAllCategoriesAPI = () => {
    const urlBackend = '/categories'
    return axios.get(urlBackend)
}

export const createCategoryAPI = (name, description) => {
    const urlBackend = '/categories'
    const data = {
        name,
        description
    }
    return axios.post(urlBackend, data)
}

export const uploadProductImageAPI = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return axios({
        method: 'post',
        url: '/uploads/file',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const createProductAPI = (image_url, name, description, price, sizes, colors,
    stock, stock_quantity, ratings_number, code, category_id) => {
    const urlBackend = '/products'
    const data = {
        image_url, name, description, price, sizes, colors,
        stock, stock_quantity, ratings_number, code, category_id
    }
    return axios.post(urlBackend, data)
}

export const getAllProductAPI = () => {
    const urlBackend = '/products'
    return axios.get(urlBackend)
}

export const updateProductAPI = (id, image_url, name, description, code, stock_quantity, price) => {
    const urlBackend = `/products/${id}`
    const data = {
        image_url, name, description, code, stock_quantity, price
    }
    return axios.patch(urlBackend, data)
}