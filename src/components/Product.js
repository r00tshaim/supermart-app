import { View, Image, TouchableOpacity ,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, IconButton, Badge, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../constants/colors'
import {REST_API_SERVER} from "@env"

import { addToCart, reduceItemQty ,removeFromCart } from "../redux/cartSlice";

const Product = ({ prod }) => {
    const [itemCartObj, setItemCartObj] = useState(undefined)
    const [customName, setCustomName] = useState("")

    const dispatch = useDispatch();
    const theme = useTheme();

    //getting cart state to check if item already in cart
    const cartItems = useSelector((state) => state.cart.data)

    const addToCartHandler = (item) => {
        //console.log("addToCartHandler item=",item)
        dispatch(addToCart(item))
      }

    const handleIncrementItemQty = (item) => {
        //console.log("handleIncrementItemQty");
        //addToCart increases qty of item if already in cart
        dispatch(addToCart(item));
    };
    
    const handleReduceItemQty = (item) => {
        //console.log("handleReduceItemQty item=",item.qty);
        if (item.qty === 1) {
          //console.log("item.qty is 1 so removing from cart");
          dispatch(removeFromCart(item));
        } else if (item.qty > 1) {
          dispatch(reduceItemQty(item));
        }
    };

    const getItemObjFromCart = (id) => {
        const prodInCart = cartItems.find((item) => item._id === id)
        return prodInCart     
    }

    useEffect(() => {
        const prodObj = getItemObjFromCart(prod._id)
        const customName = `${prod.name} ${prod.quantity}${prod.quantityUnit}`
        setItemCartObj(prodObj)
        setCustomName(customName)
    },[cartItems])
     
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: prod.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={styles.image} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text variant="titleSmall" style={styles.name}>{customName}</Text>
          <Text variant="labelSmall" style={styles.description}>{prod.description.length > 65 ? prod.description.slice(0,60) + '...' : prod.description}</Text>
          
          { prod.offerPrice !== -1 && 
            (<View style={styles.priceContainer}>
              <Text variant="bodyLarge" style={styles.offerPrice}>₹{prod.offerPrice}</Text>
              <Text variant="bodyMedium" style={{...styles.originalPrice, color: theme.colors.error}}>₹{prod.mrpPrice}</Text>
              </View>
            )
          }

          { //when offerPrice is not available, display only actual price of item
            prod.offerPrice === -1 && 
            <Text variant="bodyLarge" style={styles.offerPrice}>₹{prod.mrpPrice}</Text>
          }


        {itemCartObj === undefined || itemCartObj.qty == 0 ? (

          <View style={styles.addButton}>
            <IconButton
              icon="cart-plus"
              iconColor={"black"}
              size={25}
              onPress={() => addToCartHandler(prod)}
            />
          </View>

          ) : (
            <View style={styles.adjustQtyContainer}>

                <IconButton
                  icon="minus"
                  iconColor={"black"}
                  size={18}
                  onPress={() => handleReduceItemQty(itemCartObj)}
                />

                <Badge size={22} style={styles.qtyText}>{itemCartObj.qty}</Badge>

                <IconButton
                  icon="plus"
                  iconColor={"black"}
                  size={18}
                  onPress={() => handleIncrementItemQty(itemCartObj)}
                />
            
              {/*<TouchableOpacity
                style={styles.signContainer}
                onPress={() => handleReduceItemQty(itemCartObj)}
              >
                <Text style={styles.addButtonLabel}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{itemCartObj.qty}</Text>

              <TouchableOpacity
                style={styles.signContainer}
                onPress={() => handleIncrementItemQty(itemCartObj)}
              >
                <Text style={styles.addButtonLabel}>+</Text>
          </TouchableOpacity>*/}
            </View>
          )}

        </View>
      </View>
    );
}

export default Product

const styles = StyleSheet.create({
    productContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginHorizontal: 10,
      padding: 4,
      borderBottomWidth: 0.5,
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
      //fontSize: 14,
      //fontWeight: 'bold',
      marginBottom: 2,
    },
    description: {
      //fontSize: 12,
      marginBottom: 2,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    offerPrice: {
      //fontSize: 16,
      fontWeight: 'bold',
      //color: 'green',
      marginRight: 10,
    },
    originalPrice: {
      //fontSize: 14,
      //color: 'red',
      textDecorationLine: 'line-through',
    },
    addButton: {
      //backgroundColor: '#007bff',
      //paddingHorizontal: 8,
      //paddingVertical: 5,
      //borderRadius: 10,
      //borderWidth: 0.2,
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
    adjustQtyContainer: {
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 100,
      },
      signContainer: {
        borderColor: COLORS.silver,
        borderWidth: 0.5,
        borderRadius: 12,
        padding: 5,
        paddingHorizontal: 10,
      },
      qtyText: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
      },

  });