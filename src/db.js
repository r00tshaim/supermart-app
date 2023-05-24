import {ICONS} from "./constants/icons"

export const offers = [
    { id: 1, name: 'Product 1', price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 2, name: 'Product 2', price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 3, name: 'Product 3', price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
];

export const deals = [
    { id: 1, offer: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 1', description: 'Short description of Product 1', price: 9.99, offerPrice: 6.99 },
    { id: 2, offer: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 2', description: 'Short description of Product 2', price: 19.99, offerPrice: 15.99 },
    { id: 3, offer: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 3', description: 'Short description of Product 3', price: 12.99, offerPrice: 8.99 },
];

export const categories = [
    { id: 1, name: 'Groceries', image: ICONS.groceries },
    { id: 2, name: 'Household', image: ICONS.household },
    { id: 3, name: 'Personal Care', image: ICONS.personal_care },
    { id: 4, name: 'Groceries', image: ICONS.groceries },
    { id: 5, name: 'Household', image: ICONS.household },
    { id: 6, name: 'Personal Care', image: ICONS.personal_care },
]

export const products = [
    { id: 1, categoryId: 1, name: 'Apples', price: 0.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 2, categoryId: 1, name: 'Milk', price: 2.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 3, categoryId: 2, name: 'Paper Towels', price: 5.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 4, categoryId: 2, name: 'Laundry Detergent', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 5, categoryId: 3, name: 'Toothpaste', price: 3.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 6, categoryId: 3, name: 'Shampoo', price: 7.99, image: 'https://dummyimage.com/300x200/000/fff' },
];