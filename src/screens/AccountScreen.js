import {
    View,
    Text,
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
  } from "react-native";
  import React from "react";
  
  const AccountScreen = () => {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Text>AccountScreen</Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    AndroidSafeArea: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  
  export default AccountScreen;
  