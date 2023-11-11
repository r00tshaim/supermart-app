import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import {REST_API_SERVER} from "@env"


const Categories = ({categoriesList, onSelectCategory}) => {

    const listOfCatgories = categoriesList;
    //console.log("listOfCat=", listOfCatgories)

    const handleCategorySelect = (id) => {
        //Alert.alert(`Id for selected category is ${id}`);
        onSelectCategory(id);
    }

    return (
        <View style={{ marginVertical: 5 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {listOfCatgories.map((category, index) => (
                    <TouchableOpacity key={category._id} style={{ paddingHorizontal: 10, margin: 5 }} onPress={() => handleCategorySelect(category._id)}>
                        {/* currently below replace() is a hack, need to remove once image storing is identified for production */}
                        <Image source={{ uri:category.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={{ height: 35, width: 35, alignSelf: "center" }} />
                        <Text variant="bodyMedium" style={{paddingTop: 5}}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories