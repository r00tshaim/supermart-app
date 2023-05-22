import {
    View,
    Text,
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
  } from "react-native";
  import React from "react";
  
  const OrdersScreen = () => {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Text>OrdersScreen</Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    AndroidSafeArea: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  
  export default OrdersScreen;
  