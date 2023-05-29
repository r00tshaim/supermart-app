import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE_PRODUCTS = {
    data: [],
    isLoading: 0,
}

// Slice
const productsSlice = createSlice({
    name: 'products',
    initialState: INITIAL_STATE_PRODUCTS,
    reducers: {
        succesfullyLoaded: (state, action) => {
            state.isLoading = 1;
            console.log(`succesfullyLoaded() PRODUCTS STATE UPDATED\nProducts is loading=${state.isLoading}`);
        },
    },
});

export const { succesfullyLoaded, } = productsSlice.actions;
export default productsSlice.reducer;