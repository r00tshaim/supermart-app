import {ICONS} from "./constants/icons"

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
    { id: 1, categoryId: 1, name: 'Apples', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 1", },
    { id: 2, categoryId: 1, name: 'Milk', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 2", },
    { id: 3, categoryId: 2, name: 'Paper Towels', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 3", },
    { id: 4, categoryId: 2, name: 'Laundry Detergent', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 4", },
    { id: 5, categoryId: 3, name: 'Toothpaste', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 5", },
    { id: 6, categoryId: 3, name: 'Shampoo', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 6", },
    { id: 7, categoryId: 4, name: 'Apples', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 7", },
    { id: 8, categoryId: 4, name: 'Milk', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 8", },
    { id: 9, categoryId: 2, name: 'Paper Towels', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 9", },
    { id: 10, categoryId: 2, name: 'Laundry Detergent', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 10", },
    { id: 11, categoryId: 3, name: 'Toothpaste', price: 19.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 11", },
    { id: 12, categoryId: 3, name: 'Shampoo', price: 14.99, image: 'https://dummyimage.com/300x200/000/fff', description: "Decription for Product 12", },
];

export const users = [
    {id: 100, name: "user1", mobile: "9999999", savedAddress: [ {id: 11, address: "1, jumma masjid, himmatnagar"} ,{id: 22, address:"Mehtapura, himmatnagar"}] },
    {id: 101, name: "user2", mobile: "8888888", savedAddress: [ {id: 33, address: "65, manik chok, ahmedabad"} ,{id: 44, address:"RTO, Mumbai"}] },
    {id: 102, name: "user3", mobile: "7777777", savedAddress: [ {id: 55, address: "30, Panpur Patiya, Zahirabad"} ,{id: 66, address:"RTO, Himmatnagar"}] },
]

export const admin = [
    {id: 200, name: "admin1", mobile: "1234567", email: "admin1@gmail.com"},
    {id: 201, name: "admin2", mobile: "7654321", email: "admin2@gmail.com"},
]

/*
const ORDER_STATE = {
    PROCESSING: "PROCESSING",
    PLACED: "PLACED",
    CONFIRMED: "CONFIRMED",
    OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED"
}
refer src/constants/order.js
*/
export const orders = [
    {id: 1000, userId: 100, itemsId: [3,6,9,12], datePlaced: "12/12/2022", dateDelivered: "13/12/2022", state: "PROCESSING", payment: "cod", },
    {id: 1001, userId: 101, itemsId: [2,4,6,8], datePlaced: "12/11/2022", dateDelivered: "13/11/2022", state: "CONFIRMED", payment: "paid", },
    {id: 1002, userId: 100, itemsId: [1,2,3,4], datePlaced: "12/10/2022", dateDelivered: "13/10/2022", state: "OUT_FOR_DELIVERY", payment: "cod", },
    {id: 1003, userId: 102, itemsId: [12,11,10,9], datePlaced: "12/9/2022", dateDelivered: "13/9/2022", state: "DELIVERED", payment: "paid", },
    {id: 1004, userId: 101, itemsId: [7,8,9,10], datePlaced: "12/12/2023", dateDelivered: "13/12/2023", state: "CANCELLED", payment: "paid", },
    {id: 1005, userId: 100, itemsId: [3,6,9,12], datePlaced: "12/11/2023", dateDelivered: "13/11/2023", state: "OUT_FOR_DELIVERY", payment: "paid", },
    {id: 1006, userId: 100, itemsId: [3,6,9,12], datePlaced: "24/12/2023", dateDelivered: "25/12/2023", state: "PROCESSING", payment: "cod", },
    {id: 1007, userId: 102, itemsId: [2,4,6,8], datePlaced: "12/5/2022", dateDelivered: "13/5/2022", state: "CONFIRMED", payment: "cod", },
    {id: 1008, userId: 101, itemsId: [1,2,3,4], datePlaced: "12/5/2023", dateDelivered: "13/5/2023", state: "OUT_FOR_DELIVERY", payment: "paid", },
    {id: 1009, userId: 100, itemsId: [12,11,10,9], datePlaced: "12/3/2022", dateDelivered: "13/3/2022", state: "DELIVERED", payment: "paid",},
    {id: 10010, userId: 101, itemsId: [7,8,9,10], datePlaced: "12/4/2023", dateDelivered: "13/4/2023", state: "CANCELLED", payment: "paid", },
    {id: 10011, userId: 100, itemsId: [3,6,9,12], datePlaced: "12/7/2022", dateDelivered: "13/7/2022", state: "OUT_FOR_DELIVERY", payment: "cod", },
]


//-------------------------------------------------------------------------------------------------

//offers for products
//format: offerId, productId, productMRPPrice, offerPrice, offerImage
//productMRPPrice - this can be fetched from products data using productId
export const productOffers = [
    { id: 1, productId: 1, label: 'Upto 30% off', price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 2, productId: 2, label: 'Upto 30% off', price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 3, productId: 3, label: 'Upto 30% off', price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 4, productId: 4, label: 'Upto 30% off', price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 5, productId: 5, label: 'Upto 30% off', price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 6, productId: 6, label: 'Upto 30% off', price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 7, productId: 7, label: 'Upto 30% off', price: 9.99, offerPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 8, productId: 8, label: 'Upto 30% off', price: 19.99, offerPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 9, productId: 9, label: 'Upto 30% off', price: 14.99, offerPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
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


export const ordersLists = [
    {
      id: 1000,
      userId: 100,
      datePlaced: "12/12/2022",
      dateDelivered: "13/12/2022",
      state: "DELIVERED",
      orderTotal: "1234.90",
      payment: "cod",
      orderItems: [
        {
          id: 1,
          categoryId: 1,
          name: "Apples",
          price: 9.99,
          image: "https://dummyimage.com/300x200/000/fff",
          quantity: 1, 
          quantityUnit: "Kg"
        },
        {
          id: 2,
          categoryId: 1,
          name: "Milk",
          price: 19.99,
          image: "https://dummyimage.com/300x200/000/fff",
          quantity: 1, 
          quantityUnit: "L"
        },
        {
          id: 3,
          categoryId: 2,
          name: "Paper Towels",
          price: 14.99,
          image: "https://dummyimage.com/300x200/000/fff",
          quantity: 1, 
          quantityUnit: "Pack"
        },
      ],
    },


    {
        id: 2000,
        userId: 100,
        datePlaced: "12/12/2023",
        dateDelivered: "",
        state: "PLACED",
        orderTotal: "4000.00",
        payment: "cod",
        orderItems: [
          {
            id: 1,
            categoryId: 1,
            name: "Apples",
            price: 9.99,
            image: "https://dummyimage.com/300x200/000/fff",
            quantity: 1, 
            quantityUnit: "Kg"
          },
          {
            id: 2,
            categoryId: 1,
            name: "Milk",
            price: 19.99,
            image: "https://dummyimage.com/300x200/000/fff",
            quantity: 1, 
            quantityUnit: "L"
          },
          {
            id: 3,
            categoryId: 2,
            name: "Paper Towels",
            price: 14.99,
            image: "https://dummyimage.com/300x200/000/fff",
            quantity: 1, 
            quantityUnit: "Pack"
          },
        ],
      },


      {
        id: 3000,
        userId: 100,
        datePlaced: "12/12/2023",
        dateDelivered: "",
        state: "OUT_FOR_DELIVERY",
        orderTotal: "599.00",
        payment: "cod",
        orderItems: [
          {
            id: 1,
            categoryId: 1,
            name: "Apples",
            price: 9.99,
            image: "https://dummyimage.com/300x200/000/fff",
            quantity: 1, 
            quantityUnit: "Kg"
          },
          {
            id: 2,
            categoryId: 1,
            name: "Milk",
            price: 19.99,
            image: "https://dummyimage.com/300x200/000/fff",
            quantity: 1, 
            quantityUnit: "L"
          },
          {
            id: 3,
            categoryId: 2,
            name: "Paper Towels",
            price: 14.99,
            image: "https://dummyimage.com/300x200/000/fff",
            quantity: 1, 
            quantityUnit: "Pack"
          },
        ],
      },
    
]