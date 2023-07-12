import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE_USER = {
    isLoggedIn: false,
    userInfo: null,
    token: null
}

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE_USER,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            
            console.log(`loginSuccess() USER STATE UPDATED\nUser logged in=${state.isLoggedIn}\nUser info=${state.userInfo}`);
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.userInfo = null;
            state.token = null;
            
            console.log(`logout() USER STATE UPDATED\nUser logged in=${state.isLoggedIn}\nUser data=${state.userInfo}`);
        },
    },
});

export const { loginSuccess, logout, } = userSlice.actions;
export default userSlice.reducer;