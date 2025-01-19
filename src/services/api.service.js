import axios from './axios.customize.js'

const registerAPI = (name, email, phone_number, password) => {
    const urlBackend = '/auth/register'
    const data = {
        name,
        email,
        phone_number,
        password
    }
    return axios.post(urlBackend, data)
}

const loginAPI = (email, password) => {
    const urlBackend = '/auth/login'
    const data = {
        email,
        password
    }
    return axios.post(urlBackend, data)
}

const getProfileAPI = () => {
    const urlBackend = '/auth/profile'
    return axios.get(urlBackend)
}

export {
    registerAPI,
    loginAPI,
    getProfileAPI
}