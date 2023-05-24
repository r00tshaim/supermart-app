import { products } from "../db";

import { getCategoryIdbyName } from "./categoriesUtil";

export const getProducts = () => {
    return products;
};

export const getProductbyId = (prodId) => {
    var result = products.find((prod) => prod.id === prodId);
    if(!result)
        return "";
    return result;
}

export const getProductsbyCategoryId = (catId) => {
    var result = products.filter((prod) => { 
        return prod.categoryId === catId 
    } );
    return result;
}

export const getProductsbyCategoryName = (catName) => {
    var catId = getCategoryIdbyName(catName)
    var result = products.filter((prod) => { 
        return prod.categoryId === catId;
    } );
    return result;
}
