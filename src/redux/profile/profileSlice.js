import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    tempAvatar: null,
    user: {
        id: '',
        email: '',
        phone_number: '',
        name: '',
        role: '',
        avatar: '',
    }
};

const profileSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doGetProfileAction: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        doLogoutAction: (state) => {
            state.isAuthenticated = false
            state.user = initialState.user
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    },
});

export const { doGetProfileAction, doLogoutAction } = profileSlice.actions;

export default profileSlice.reducer;
