import { Text, View, TextInput, SafeAreaView, StyleSheet,Platform, StatusBar, ScrollView } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import OffersSlider from '../components/Carousel';
import Categories from '../components/Categories';
import Deals from '../components/Deals';

import { ICONS } from '../constants/icons';
import { COLORS } from '../constants/colors';

const offers = [
    { id: 1, name: 'Product 1', price: 9.99, discountedPrice: 5.55, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 2, name: 'Product 2', price: 19.99, discountedPrice: 10.00, image: 'https://dummyimage.com/250x250/000/fff' },
    { id: 3, name: 'Product 3', price: 14.99, discountedPrice: 7.55, image: 'https://dummyimage.com/250x250/000/fff' },
];

const deals = [
    { id: 1, offer: 'Upto 30% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 1', description: 'Short description of Product 1', originalPrice: 9.99, offerPrice: 6.99 },
    { id: 2, offer: 'Upto 20% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 2', description: 'Short description of Product 2', originalPrice: 19.99, offerPrice: 15.99 },
    { id: 3, offer: 'Upto 40% off', image: 'https://dummyimage.com/300x200/000/fff', name: 'Product 3', description: 'Short description of Product 3', originalPrice: 12.99, offerPrice: 8.99 },
];

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

const HomeScreen = ({navigation}) => {

    const handleCategorySelect = (id) => {
        navigation.navigate('ProductsScreen', {categoryId: id});
    }

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
                <View style={{ paddingLeft: 80 }}>
                    <EvilIcons name="search" size={34} color={COLORS.black} />
                </View>
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
            <OffersSlider offers={offers}/>

            {/* Categories */}
            <Categories categoriesList={categories} onSelectCategory={handleCategorySelect}/>

            {/* Deals of the day */}
  <         Deals deals={deals} />

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

