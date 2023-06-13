import { View, Text, Image, TouchableOpacity ,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../constants/colors'
import {REST_API_SERVER} from "@env"

import { addToCart, removeFromCart } from "../redux/cartSlice";

const Product = ({ prod }) => {
    const [itemCount, setItemCount] = useState(0)
    const [customName, setCustomName] = useState("")

    const dispatch = useDispatch();

    //getting cart state to check if item already in cart
    const cartItems = useSelector((state) => state.cart.data)

    const addToCartHandler = (item) => {
        //console.log("addToCartHandler item=",item)
        dispatch(addToCart(item))
      }
    
      const removeFromCartHandler = (item) => {
        dispatch(removeFromCart(item))
      }

    const isItemInCart = (id) => {
        return cartItems.some((item) => item._id === id)
    }

    useEffect(() => {
        const itemInCart = isItemInCart(prod._id)
        const customName = `${prod.name} ${prod.quantity}${prod.quantityUnit}`
        setItemCount(itemInCart)
        setCustomName(customName)
    },[itemCount, cartItems])
     
  return (
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: prod.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={styles.image} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.name}>{customName}</Text>
          <Text style={styles.description}>{prod.description}</Text>
          
          { prod.offerPrice !== -1 && 
            (<View style={styles.priceContainer}>
              <Text style={styles.offerPrice}>₹{prod.offerPrice}</Text>
              <Text style={styles.originalPrice}>₹{prod.mrpPrice}</Text>
              </View>
            )
          }

          { //when offerPrice is not available, display only actual price of item
            prod.offerPrice === -1 && 
            <Text style={styles.offerPrice}>₹{prod.mrpPrice}</Text>
          }
          
          {itemCount > 0 && (
            <TouchableOpacity 
            style={styles.removeButton} 
            onPress={()=>removeFromCartHandler(prod)}
          >
            <Text style={styles.removeButtonLabel}>Remove from cart</Text>
          </TouchableOpacity>
          )}

          {itemCount == 0 && (
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={()=>addToCartHandler(prod)}
          >
            <Text style={styles.addButtonLabel}>Add to cart</Text>
          </TouchableOpacity>
          )}

        </View>
      </View>
    );
}

export default Product

const styles = StyleSheet.create({
    container: {
      marginBottom: 150,
    },
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
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 12,
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