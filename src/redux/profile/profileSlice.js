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
        },
        doUpdateUserAction: (state, action) => {
            state.user.name = action.payload.name
            state.user.phone_number = action.payload.phone_number
        },
        doSetTempAvatarAction: (state, action) => {
            state.tempAvatar = action.payload
        },
        doChangeAvatar: (state, action) => {
            state.user.avatar_url = action.payload
        }
    },
});

export const { doGetProfileAction, doLogoutAction, doUpdateUserAction, doSetTempAvatarAction, doChangeAvatar } = profileSlice.actions;

export default profileSlice.reducer;
