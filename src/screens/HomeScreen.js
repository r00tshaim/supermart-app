import { Text, View, TextInput, SafeAreaView, StyleSheet,Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import OffersSlider from '../components/Carousel';
import Categories from '../components/Categories';
import Deals from '../components/Deals';
import CartBottomTab from '../components/CartBottomTab';

import { ICONS } from '../constants/icons';
import { COLORS } from '../constants/colors';
import { useEffect, useState } from 'react';

import { deals, offers, categories, products } from '../db';

const HomeScreen = ({navigation}) => {
    const [offersData, setOffers] = useState([]);
    const [dealsData, setDeals] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [products, setProducts] = useState([]);

    const handleCategorySelect = (id) => {
        navigation.navigate('ProductsScreen', {categoryId: id});
    }

    const handleCartPress = () => {
        navigation.navigate('CartScreen');
    }

    useEffect(() => {
        setOffers(offers);
        setDeals(deals);
        setCategoriesData(categories);
        setProducts(products);
    }, [offers, deals, categories, products]) 

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <ScrollView>
            {/* Location and Search */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ paddingLeft: 10 }}>
                    <EvilIcons name="location" size={35} color={COLORS.green} />
                </View>
                <View>
                    <Text style={{color:COLORS.green, fontWeight: "bold"}}>
                        Home
                    </Text>
                    <Text style={{color:COLORS.green}}>
                        Parabda Himmatnagar, 383001
                    </Text>
                </View>
                <TouchableOpacity style={{ paddingLeft: 80 }} onPress={() => handleCartPress()}>
                    <CartBottomTab isFocused={false} />
                </TouchableOpacity>
            </View>

            {/* Search Bar
            <View style={{
                padding: 10,
                margin: 10,
                marginTop: 30,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 17,
                backgroundColor: "#D3D3D3",
                height: 50
            }}>
                <EvilIcons name="search" size={34} color="black" />
                <TextInput style={{ fontSize: 16 }} placeholder='Search Store' />
            </View>*/}

            {/* Offers Carousel */}
            <OffersSlider offers={offersData}/>

            {/* Categories */}
            <Categories categoriesList={categoriesData} onSelectCategory={handleCategorySelect}/>

            {/* Deals of the day */}
  <         Deals deals={dealsData} />

  </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
})

export default HomeScreen;

