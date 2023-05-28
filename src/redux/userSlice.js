import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE_USER = {
    data: [],
    isLoggedIn: 0,
}

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE_USER,
    reducers: {
        userLogIn: (state, action) => {
            state.isLoggedIn = 1;
            console.log(`logIn() USER STATE UPDATED\nUser logged in=${state.isLoggedIn}\nUser data=${JSON.stringify(state.data)}`);
        },
        userLogOut: (state, action) => {
            state.isLoggedIn = 0;
            console.log(`logOut() USER STATE UPDATED\nUser logged in=${state.isLoggedIn}\nUser data=${JSON.stringify(state.data)}`);
        },
    },
});

export const { userLogIn, userLogOut, } = userSlice.actions;
export default userSlice.reducer;