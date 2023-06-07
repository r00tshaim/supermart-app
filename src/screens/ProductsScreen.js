import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { addToCart, removeFromCart } from "../redux/cartSlice";

import { COLORS } from '../constants/colors'

import { getProductsbyCategoryId } from "../utils/productsUtil"

const ProductsScreen = ({route}) => {
  //getting cart state to check if item already in cart
  const cartItems = useSelector((state) => state.cart.data)

  //list of products provided to this component
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsList = route.params.productList; 
    setProducts(productsList);
  },[])
  
  
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    //console.log("addToCartHandler item=",item)
    dispatch(addToCart(item))
  }

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item))
  }

  const isItemInCart = (id) => {
    return cartItems.some((item) => item.id === id)
  }

  const renderProduct = ({ item }) => {
    const itemCount = isItemInCart(item.id)
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
          
          {itemCount > 0 && (
            <TouchableOpacity 
            style={styles.removeButton} 
            onPress={()=>removeFromCartHandler(item)}
          >
            <Text style={styles.removeButtonLabel}>Remove from cart</Text>
          </TouchableOpacity>
          )}

          {itemCount == 0 && (
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={()=>addToCartHandler(item)}
          >
            <Text style={styles.addButtonLabel}>Add to cart</Text>
          </TouchableOpacity>
          )}

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
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.2,
    alignSelf: 'flex-end',
    marginHorizontal: 0,

  },
  addButtonLabel: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#EB3C3C',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    //borderWidth: 0.2,
    alignSelf: 'flex-end',
    marginHorizontal: 0,
  },
  removeButtonLabel: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ProductsScreen