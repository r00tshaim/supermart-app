import { categories } from "../db";

export const getCategories = () => {
    return categories;
}

export const getCategorybyId = (catId) => {
    var result = categories.find((cat) => cat.id === catId);
    return result;
}

export const getCategoryNamebyId = (catId) => {
    var result = categories.find((cat) => cat.id === catId);
    if(!result)
        return ""
    return result.name;
} 

export const getCategoryIdbyName = (catName) => {
    var result = categories.find((cat) => cat.name === catName);
    if(!result)
        return ""
    return result.id;
}