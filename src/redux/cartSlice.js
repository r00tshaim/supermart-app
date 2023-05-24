import { createSlice } from '@reduxjs/toolkit'

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload)          //state.push -> pushes to 'cart'
            console.log("-----NEW CART STATE-----", state)
        },
        removeFromCart: (state, action) => {
            return state.filter((item, index) => index != action.payload)
        }
    },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;