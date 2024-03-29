import { Text, View, TextInput, SafeAreaView, StyleSheet,Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import OffersSlider from '../components/Carousel';
import Categories from '../components/Categories';
import Deals from '../components/Deals';
import CartBottomTab from '../components/CartBottomTab';

import { COLORS } from '../constants/colors';
import { useEffect, useState } from 'react';

import { categoreyOffers } from '../db';

import axiosClient from '../axios/axiosClient';
import { setCategoriesInventory, setProductsInventory, setBrandsInventory } from '../redux/inventorySlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [categoreyOffersList, setCategoreyOffersList] = useState([]);
    const [productsOfferList, setProductsOfferList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const handleCategorySelect = (categoryId) => {
        const selectedCategory = categoriesList.find((cat) => cat._id === categoryId);
        const products = productsList.filter((prod) => prod.category === categoryId)
        const subCategories = selectedCategory.subCategories;
        navigation.navigate('ProductsScreen', {productList: products, subCategoriesList: subCategories});
    }

    const handleBrandSelect = (brandId) => {
        const products = productsList.filter((prod) => prod.brand === brandId)
        navigation.navigate('ProductsScreen', {productList: products});
    }

    const handleCartPress = () => {
        navigation.navigate('CartScreen');
    }

    const getProducts = async () => {
        try {
            const data = await axiosClient.get("/v1/products")
            dispatch(setProductsInventory(data.data.products))
            //dispatch(setBrandsInventory(data.data.brands))
            setProductsList(data.data.products)
            //setBrandsList(data.data.brands)
        } catch(err) { 
            console.log("Get Products failed")

            Toast.show({
                type: "error",// success | error | info",
                text1 : "Unable to fetch products",
                text2: "please try again",
                position: "bottom",//bottom | top",
            });
        }
    }

    const getCategories = async () => {
        try {
            const data = await axiosClient.get("/v1/categories")
            dispatch(setCategoriesInventory(data.data.categories))
            setCategoriesList(data.data.categories);
        } catch(err) { 
            console.log("Get Categories failed")

            Toast.show({
                type: "error",// success | error | info",
                text1 : "Unable to fetch categories",
                text2: "please try again",
                position: "bottom",//bottom | top",
            });
        }
    }



    useEffect(() => {

        const test = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo')
            const token = await AsyncStorage.getItem('tokenInfo')
            console.log(`HomeScreen userInfo=${userInfo}  tokenInfo=${token}`)
        }

        //test();
        if(isLoading) {
            getProducts();
            getCategories();
            setIsLoading(false);
        } else {
            setCategoreyOffersList(categoreyOffers);
            //products with no offers have offerPrice == -1 (by default from REST API)
            const productsWithOffers = productsList.filter((prod) => prod.offerPrice !== -1)
            setProductsOfferList(productsWithOffers); 
        } 
    }, [productsList, categoriesList]) 

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <ScrollView>
            {/* Location and Search */}
            {/*<View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ paddingLeft: 10 }}>
                <Entypo name="location-pin" size={35} color={COLORS.green} />
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
    </View>*/}

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
            <OffersSlider offers={categoreyOffersList}/>

            {/* Categories */}
            <View style={{ paddingTop: 3, paddingLeft: 15 }}>
                <Text style={{ fontSize: 25, fontWeight: 600 }}>Categories</Text>
            </View>
            <Categories categoriesList={categoriesList} onSelectCategory={handleCategorySelect}/>

            {/* Deals of the day */}
            <Deals deals={productsOfferList} />

            <View style={{ paddingTop: 15, paddingLeft: 15 }}>
                <Text style={{ fontSize: 25, fontWeight: 600 }}>Shop by Brands</Text>
            </View>
            <Categories categoriesList={brandsList} onSelectCategory={handleBrandSelect}/>

  </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginBottom: 80
    },
})

export default HomeScreen;

