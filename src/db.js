import {ICONS} from "./constants/icons"

export const offers = [
    { id: 1, name: 'Product 1', price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 2, name: 'Product 2', price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 3, name: 'Product 3', price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 4, name: 'Product 4', price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 5, name: 'Product 5', price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 6, name: 'Product 6', price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 7, name: 'Product 7', price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 8, name: 'Product 8', price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 9, name: 'Product 9', price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },

];

export const deals = [
    { id: 1, offer: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 1', description: 'Short description of Product', price: 9.99, offerPrice: 6.99 },
    { id: 2, offer: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 2', description: 'Short description of Product', price: 19.99, offerPrice: 15.99 },
    { id: 3, offer: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 3', description: 'Short description of Product', price: 12.99, offerPrice: 8.99 },
    { id: 4, offer: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 4', description: 'Short description of Product', price: 9.99, offerPrice: 6.99 },
    { id: 5, offer: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 5', description: 'Short description of Product', price: 19.99, offerPrice: 15.99 },
    { id: 6, offer: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 6', description: 'Short description of Product', price: 12.99, offerPrice: 8.99 },
    { id: 7, offer: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 7', description: 'Short description of Product', price: 9.99, offerPrice: 6.99 },
    { id: 8, offer: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 8', description: 'Short description of Product', price: 19.99, offerPrice: 15.99 },
    { id: 9, offer: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 9', description: 'Short description of Product', price: 12.99, offerPrice: 8.99 },
];

//format: categoreyId, categoreyName, categoreyImage
export const categories = [
    { id: 1, name: 'Groceries', image: ICONS.groceries },
    { id: 2, name: 'Household', image: ICONS.household },
    { id: 3, name: 'Personal Care', image: ICONS.personal_care },
    { id: 4, name: 'Groceries', image: ICONS.groceries },
    { id: 5, name: 'Household', image: ICONS.household },
    { id: 6, name: 'Personal Care', image: ICONS.personal_care },
    { id: 7, name: 'Groceries', image: ICONS.groceries },
    { id: 8, name: 'Household', image: ICONS.household },
    { id: 9, name: 'Personal Care', image: ICONS.personal_care },
]

//format: productId, categoreyId, productName, productMRPPrice, productImage
export const products = [
    { id: 1, categoryId: 1, name: 'Apples', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 2, categoryId: 1, name: 'Milk', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 3, categoryId: 2, name: 'Paper Towels', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 4, categoryId: 2, name: 'Laundry Detergent', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 5, categoryId: 3, name: 'Toothpaste', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 6, categoryId: 3, name: 'Shampoo', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 7, categoryId: 4, name: 'Apples', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 8, categoryId: 4, name: 'Milk', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 9, categoryId: 2, name: 'Paper Towels', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 10, categoryId: 2, name: 'Laundry Detergent', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 11, categoryId: 3, name: 'Toothpaste', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 12, categoryId: 3, name: 'Shampoo', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff' },
];



//-------------------------------------------------------------------------------------------------

//offers for products
//format: offerId, productId, productMRPPrice, offerPrice, offerImage
//productMRPPrice - this can be fetched from products data using productId
export const productOffers = [
    { id: 1, productId: 1, price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 2, productId: 2, price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 3, productId: 3, price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 4, productId: 4, price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 5, productId: 5, price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 6, productId: 6, price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 7, productId: 7, price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 8, productId: 8, price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 9, productId: 9, price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
];

//offers on categories
//format: offerId, offerLabel, offerImage, categoreyId, offerDescription
export const categoreyOffers = [
    { id: 1, label: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 1, description: 'Short description of categoreyOffers' },
    { id: 2, label: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 2, description: 'Short description of categoreyOffers' },
    { id: 3, label: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 3, description: 'Short description of categoreyOffers' },
    { id: 4, label: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 4, description: 'Short description of categoreyOffers' },
    { id: 5, label: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 5, description: 'Short description of categoreyOffers' },
    { id: 6, label: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 6, description: 'Short description of categoreyOffers' },
    { id: 7, label: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 7, description: 'Short description of categoreyOffers' },
    { id: 8, label: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 8, description: 'Short description of categoreyOffers' },
    { id: 9, label: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', categoreyId: 9, description: 'Short description of categoreyOffers' },
];