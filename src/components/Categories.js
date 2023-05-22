import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

import { ICONS } from '../constants/icons';

const categories = [
    { id: 1, name: 'Groceries', image: ICONS.groceries },
    { id: 2, name: 'Household', image: ICONS.household },
    { id: 3, name: 'Personal Care', image: ICONS.personal_care },
    { id: 4, name: 'Groceries', image: ICONS.groceries },
    { id: 5, name: 'Household', image: ICONS.household },
    { id: 6, name: 'Personal Care', image: ICONS.personal_care },
]

const products = [
    { id: 1, categoryId: 1, name: 'Apples', price: 0.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 2, categoryId: 1, name: 'Milk', price: 2.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 3, categoryId: 2, name: 'Paper Towels', price: 5.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 4, categoryId: 2, name: 'Laundry Detergent', price: 9.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 5, categoryId: 3, name: 'Toothpaste', price: 3.99, image: 'https://dummyimage.com/300x200/000/fff' },
    { id: 6, categoryId: 3, name: 'Shampoo', price: 7.99, image: 'https://dummyimage.com/300x200/000/fff' },
];

const Categories = () => {
    return (
        <View>
            <View style={{ paddingTop: 3, paddingLeft: 15 }}>
                <Text style={{ fontSize: 25, fontWeight: 600 }}>Categories</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => (
                    <View key={category.id} style={{ padding: 10, margin: 10 }}>
                        {/*<Text style={{ padding: 10, borderWidth: 1, margin: 10, borderRadius: 10 }}>
                            {category.name}
                </Text>*/}
                        <Image source={category.image} style={{ height: 50, width: 50 }} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories