import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import { COLORS } from "../constants/colors";
import { ORDER_STATE_COLOR } from "../constants/order";

import { ordersLists, users } from "../db";

const OrdersScreen = () => {
  const currentUserId = users[0].id;
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    //get current used Id
    //get Orders for current user id
    //get expanded orders
    setPreviousOrders(ordersLists);
  }, []);

  const renderProduct = ({ item }) => {
    const itemsInOrder = item.orderItems;
    const orderState = item.state;
    const orderStateColor = ORDER_STATE_COLOR[orderState];
    //console.log("item=",item)
    return (
      <View style={styles.card}>
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
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <Header title={"Your Orders"} />

      <View>

        <Text style={{ padding: 10, fontSize: 18 }}>
          Total Orders: {previousOrders.length}
        </Text>

        <SafeAreaView>
          <FlatList
            data={previousOrders}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </SafeAreaView>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 350,
  },
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

export default OrdersScreen;
