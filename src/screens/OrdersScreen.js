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
import { useIsFocused } from "@react-navigation/native";

import Header from "../common/Header";

import Order from "../components/Order";

import axiosClient from "../axios/axiosClient";
import { users } from "../db";

const OrdersScreen = () => {
  const currentUserId = users[0].id;
  const [previousOrders, setPreviousOrders] = useState([]);

  //refer https://stackoverflow.com/questions/52805879/re-render-component-when-navigating-the-stack-with-react-navigation
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      //Update the state you want to be updated

      //console.log("Order Screen rendered");
      //get current used Id
      //get Orders for current user id
      //get expanded orders

      const getAllOrders = async () => {
        try {
          const data = await axiosClient.get(`/v1/orders`);
          console.log("data.data=", data.data.orders);
          setPreviousOrders(data.data.orders)
        } catch (err) {
          console.log(
            `error while fetching orders=${err.message} code=${err.code}`
          );
        }
      };

      getAllOrders();
      //const ordersLists = getAllOrders();
      //console.log("ordersLists=",ordersLists)
      //setPreviousOrders(ordersLists);
    }
  }, [isFocused]);

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
            renderItem={(item) => <Order item={item} />}
            keyExtractor={(item) => item._id}
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
});

export default OrdersScreen;
