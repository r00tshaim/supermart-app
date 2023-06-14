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

import Order from "../components/Order";

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
            renderItem={(item) => (
              <Order item={item}/>
            )}
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
