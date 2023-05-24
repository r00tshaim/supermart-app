import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'


const Categories = ({categoriesList, onSelectCategory}) => {

    const listOfCatgories = categoriesList;

    const handleCategorySelect = (id) => {
        //Alert.alert(`Id for selected category is ${id}`);
        onSelectCategory(id);
    }

    return (
        <View>
            <View style={{ paddingTop: 3, paddingLeft: 15 }}>
                <Text style={{ fontSize: 25, fontWeight: 600 }}>Categories</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {listOfCatgories.map((category, index) => (
                    <TouchableOpacity key={category.id} style={{ padding: 10, margin: 10 }} onPress={() => handleCategorySelect(category.id)}>
                        {/*<Text style={{ padding: 10, borderWidth: 1, margin: 10, borderRadius: 10 }}>
                            {category.name}
                </Text>*/}
                        <Image source={category.image} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories