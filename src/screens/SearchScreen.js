import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Platform,
  } from "react-native";
  import React from "react";
  
  const SearchScreen = () => {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Text>SearchScreen</Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    AndroidSafeArea: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  
  export default SearchScreen;
  