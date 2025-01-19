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

export {
    registerAPI
}