import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE_INVENTORY = {
    products: [],
    categories: [],
    isInventoryLoading: 1,
    isProductsInventoryLoading: 1,
    isCategoriesInventoryLoading: 1
}

// Slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState: INITIAL_STATE_INVENTORY,
    reducers: {
        setProductsInventory: (state, action) => {
            state.products = action.payload
            state.isProductsInventoryLoading = 0;
            if(isProductsInventoryLoading == 0 && isCategoriesInventoryLoading == 0)
                isInventoryLoading = 0

            console.log(`setProductsInventory() INVENTORY STATE UPDATED\nInventory is loading=${state.isInventoryLoading}\tProducts is loading=${state.isProductsInventoryLoading}\nProducts=${state.products}`);
        },
        setCategoriesInventory: (state, action) => {
            state.categories = action.payload
            state.isCategoriesInventoryLoading = 0;
            if(isProductsInventoryLoading == 0 && isCategoriesInventoryLoading == 0)
                isInventoryLoading = 0

            console.log(`setCategoriesInventory() INVENTORY STATE UPDATED\nInventory is loading=${state.isInventoryLoading}\tCategories is loading=${state.isProductsInventoryLoading}\nProducts=${state.categories}`);
        },
    },
});

export const { setProductsInventory, setCategoriesInventory } = inventorySlice.actions;
export default inventorySlice.reducer;