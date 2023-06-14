import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from "../constants/colors";
import { ORDER_STATE_COLOR } from "../constants/order";

const Order = ({ item }) => {
    item = item.item
    const itemsInOrder = item.orderItems;
    const orderState = item.state;
    const orderStateColor = ORDER_STATE_COLOR[orderState];
    //console.log("item=",item)
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
                <Text>{orderState.toLowerCase()}</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "600" }}>Date: {item.datePlaced}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text>Order Total {`(${itemsInOrder.length} items)`}</Text>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              ₹{item.orderTotal} {`(${item.payment})`}
            </Text>
          </View>
        </View>
        <View style={styles.productList}>
          {itemsInOrder.slice(0, 2).map((product) => (
            <View style={{ flexDirection: "row", paddingBottom: 8 }}>
              <Image
                source={{ uri: product.image }}
                style={{ height: 35, width: 35 }}
              />
              <Text
                key={product.id}
                style={{ paddingLeft: 10, alignSelf: "center" }}
              >
                {product.name} {product.quantity}{product.quantityUnit}
              </Text>
            </View>
          ))}
          {itemsInOrder.length > 2 && (
            <Text>+{itemsInOrder.length - 2} more</Text>
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