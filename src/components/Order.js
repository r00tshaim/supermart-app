import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from "../constants/colors";
import { ORDER_STATE_COLOR } from "../constants/order";
import {REST_API_SERVER} from "@env"

const Order = ({ item }) => {
    item = item.item
    const itemsInOrder = item.orderItems;
    const orderState = item.status;
    const orderStateColor = ORDER_STATE_COLOR[orderState];
    //console.log("item=",item)

    const formatDate = (date) => {
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString();
      const formattedTime = dateObj.toLocaleTimeString();
      const result = `${formattedDate}  ${formattedTime}`
      return result;
    }

    return (
      <View style={styles.card} key={item._id}>
        <View style={styles.orderInfoContainer}>
          <View styles={styles.orderStatus}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "700" }}>Status: </Text>
              <View
                style={{
                  backgroundColor: orderStateColor,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>{orderState}</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "600" }}>Date: {formatDate(item.placedAt)}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text>Order Total {`(${itemsInOrder.length} items)`}</Text>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              ₹{item.orderTotal} {`(${item.paymentMethod})`}
            </Text>
          </View>
        </View>
        <View style={styles.productList}>
          {itemsInOrder.slice(0, 2).map((product) => (
            <View style={{flexDirection: "row", marginBottom: 8}}>
              <Image
                source={{ uri: product.productId.image.replace(/localhost/g, `${REST_API_SERVER}`) }}
                style={{ height: 60, width: 60 }}
              />

              <Text
                key={product.productId._id}
                style={{ paddingLeft: 10, alignSelf: "center", fontSize: 15 }}
              >
                {product.productId.name} {product.productId.quantity}{product.productId.quantityUnit}
              </Text>
            </View>
            
          ))}
          </View>

          <View style={{marginTop:8, marginBottom: 10, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center'}}>
          {itemsInOrder.length > 2 && (
            <>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{width: 90, textAlign: 'center'}}>+{itemsInOrder.length - 2} more</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </>
          )}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: COLORS.black,
            }}
          >
            <Text style={{ color: COLORS.white }}>View Order Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: COLORS.black,
            }}
          >
            <Text style={{ color: COLORS.white }}>Need Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default Order

const styles = StyleSheet.create({
    card: {
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      padding: 10,
    },
    orderInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    orderStatus: {
      justifyContent: "center",
      paddingTop: 20,
      alignItems: "center",
      marginTop: 10,
    },
    productList: {
      marginTop: 10,
      marginHorizontal: 10, 
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
  });