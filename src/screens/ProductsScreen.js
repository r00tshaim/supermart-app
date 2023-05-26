import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/cartSlice";

import { COLORS } from '../constants/colors'

import { getProductsbyCategoryId } from "../utils/productsUtil"

const ProductsScreen = ({route}) => {
  const categoryId = route.params.categoryId;
  const products = getProductsbyCategoryId(categoryId);

  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    //console.log("addToCartHandler item=",item)
    dispatch(addToCart(item))
  }

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          
          { item.offerPrice && 
            (<View style={styles.priceContainer}>
              <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
              <Text style={styles.originalPrice}>₹{item.price}</Text>
              </View>
            )
          }

          { //when offerPrice is not available, display only actual price of item
            item.offerPrice === undefined && 
            <Text style={styles.offerPrice}>₹{item.price}</Text>
          }
          
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={()=>addToCartHandler(item)}
          >
            <Text style={styles.addButtonLabel}>Add +</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productDetailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: 'red',
    textDecorationLine: 'line-through',
  },
  addButton: {
    //backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.2,
    alignSelf: 'flex-end',
    marginHorizontal: 20,

  },
  addButtonLabel: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default ProductsScreen