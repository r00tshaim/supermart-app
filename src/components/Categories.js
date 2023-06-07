import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
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
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {listOfCatgories.map((category, index) => (
                    <TouchableOpacity key={category._id} style={{ padding: 10, margin: 10 }} onPress={() => handleCategorySelect(category._id)}>
                        {/*<Text style={{ padding: 10, borderWidth: 1, margin: 10, borderRadius: 10 }}>
                            {category.name}
                </Text>*/}
                        {/* currently below replace() is a hack, need to remove once image storing is identified for production */}
                        <Image source={{ uri:category.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={{ height: 50, width: 50, alignSelf: "center" }} />
                        <Text style={{paddingTop: 5}}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories