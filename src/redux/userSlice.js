import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE_USER = {
    isLoggedIn: false,
    userInfo: null,
    tokenInfo: null,
    isDarkTheme: false
}

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE_USER,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
            state.tokenInfo = action.payload.tokenInfo;
            
            console.log(`loginSuccess() USER STATE UPDATED\nUser logged in=${state.isLoggedIn}\nUser info=${state.userInfo}\nToken info=${state.tokenInfo}`);
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.userInfo = null;
            state.tokenInfo = null;
            
            console.log(`logout() USER STATE UPDATED\nUser logged in=${state.isLoggedIn}\nUser info=${state.userInfo}`);
        },
        setIsDarkTheme: (state, action) => {
            state.isDarkTheme = action.payload;

            console.log(`setIsDarkTheme() USER STATE UPDATED\nisDarkTheme=${state.isDarkTheme}`);
        }
    },
});

export const { loginSuccess, logout, setIsDarkTheme} = userSlice.actions;
export default userSlice.reducer;