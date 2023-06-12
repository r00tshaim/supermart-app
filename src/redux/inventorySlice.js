import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE_INVENTORY = {
    products: [],
    categories: [],
    brands: [],
}

// Slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState: INITIAL_STATE_INVENTORY,
    reducers: {
        setProductsInventory: (state, action) => {
            state.products = action.payload
            console.log(`setProductsInventory() INVENTORY STATE UPDATED\nProducts length=${state.products.length}`);
        },
        setCategoriesInventory: (state, action) => {
            state.categories = action.payload
            console.log(`setCategoriesInventory() INVENTORY STATE UPDATED\nCategories length=${state.categories.length}`);
        },
        setBrandsInventory: (state, action) => {
            state.brands = action.payload
            console.log(`setBrandsInventory() INVENTORY STATE UPDATED\nBrands length=${state.brands.length}`);
        }
    },
});

export const { setProductsInventory, setCategoriesInventory, setBrandsInventory } = inventorySlice.actions;
export default inventorySlice.reducer;