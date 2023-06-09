import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE_CART = {
    data: [],
    totalItems: 0,
    totalUniqueItems: 0
}
// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE_CART,
    reducers: {
        addToCart: (state, action) => {
            //state.push(action.payload)          //state.push -> pushes to 'cart'
            let tempData = state.data;
            let isItemExist = false;
            let newItem={};
            tempData.map(item => {
                if (item._id == action.payload._id) {
                    isItemExist = true;
                    item.qty = item.qty + 1;
                    newItem = item;
                }
            });

            if (!isItemExist) {
                newItem = {...action.payload, qty: 1};
                tempData.push(newItem);
                state.totalUniqueItems = state.totalUniqueItems + 1;
            }
            state.totalItems = state.totalItems + 1;
            console.log(`addToCart() CART STATE UPDATED\nTotal items=${state.totalItems}\nTotal unique items=${state.totalUniqueItems}\nitem added=${JSON.stringify(newItem)}`);
        },
        removeFromCart: (state, action) => {
            let tempData = []
            let itemData = "";
            state.data.map(item => {
                if (item._id !== action.payload._id) {
                    tempData.push(item)
                } else {
                    itemData = item
                    const totalCountForTheItem = itemData.qty
                    state.totalItems = state.totalItems - totalCountForTheItem;
                    state.totalUniqueItems = state.totalUniqueItems - 1;
                }
            });
            state.data = tempData
            console.log(`removeFromCart() CART STATE UPDATED\nTotal items=${state.totalItems}\nTotal unique items=${state.totalUniqueItems}\ndeleted item=${JSON.stringify(itemData)}`);
        },
        reduceItemQty: (state, action) => {
            let tempData = state.data;
            let itemData = "";
            tempData.map(item => {
                if (item._id == action.payload._id) {
                    itemData = item;
                    item.qty = item.qty - 1;
                    if(item.qty == 0)
                        state.totalUniqueItems = state.totalUniqueItems - 1;
                }
            });
            state.totalItems = state.totalItems - 1;
            console.log(`reduceItemQty() CART STATE UPDATED\nTotal items=${state.totalItems}\nTotal unique items=${state.totalUniqueItems}\nqty reduced for item=${JSON.stringify(itemData)}\nqty=${itemData.qty}`);
        },
        emptyCart: (state, action) => {
            state.data = [];
            state.totalItems = 0;
            state.totalUniqueItems = 0;
            console.log(`emptyCart() CART STATE UPDATED\nTotal items=${state.totalItems}\nTotal unique items=${state.totalUniqueItems}`);
        }
    },
});

export const {addToCart, removeFromCart, reduceItemQty, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;