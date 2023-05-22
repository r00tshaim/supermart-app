import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Platform,
  } from "react-native";
  import React from "react";
  
  const CartScreen = () => {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Text>CartScreen</Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    AndroidSafeArea: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  
  export default CartScreen;
  