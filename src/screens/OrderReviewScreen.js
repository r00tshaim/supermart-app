import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Platform, StatusBar } from 'react-native';
import {REST_API_SERVER} from "@env"

const OrderReviewScreen = ({ deliveryAddress, cartItems, orderTotal, productDiscount, deliveryFee, total }) => {
    console.log(`orderReviewScreen cartItems=${cartItems}`)
  
    useEffect(()=>{
        

    },[])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={styles.image} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {
            //when offerPrice is not available, display only actual price of item
            item.offerPrice === -1 && (
              <Text style={styles.offerPrice}>₹{item.mrpPrice}</Text>
            )
          }

          {item.offerPrice !== -1 && (
            <View style={styles.priceContainer}>
              <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
              <Text style={styles.originalPrice}>₹{item.mrpPrice}</Text>
            </View>
          )}

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Delivery Address */}
      <View style={styles.deliveryAddressContainer}>
        <Text style={styles.deliveryAddressTitle}>Delivery Address</Text>
        <Text style={styles.deliveryAddressText}>{deliveryAddress}</Text>
      </View>

      {/* Order Items */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.orderItemsContainer}
      />

      {/* Order Summary */}
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.orderSummaryTitle}>Order Summary</Text>
        <Text style={styles.orderSummaryText}>MRP Total: ${orderTotal}</Text>
        <Text style={styles.orderSummaryText}>Product Discount: ${productDiscount}</Text>
        <Text style={styles.orderSummaryText}>Delivery Fee: ${deliveryFee}</Text>
        <Text style={styles.orderSummaryTotal}>Total: ${total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    paddingHorizontal: 16,
    //paddingTop: 16,
  },
  deliveryAddressContainer: {
    marginBottom: 16,
  },
  deliveryAddressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryAddressText: {
    fontSize: 16,
  },
  orderItemsContainer: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
  },
  orderSummaryContainer: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 16,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderSummaryText: {
    fontSize: 16,
  },
  orderSummaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },




  listContainer: {
    flexGrow: 1,
    paddingBottom: 350, //adjust this property to control the space below the list of cart items
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productDetailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: "red",
    textDecorationLine: "line-through",
  },
});

export default OrderReviewScreen;