import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import NetInfo from "@react-native-community/netinfo";
import axiosClient from '../axios/axiosClient';

import { ICONS } from "../constants/icons";
import { COLORS } from "../constants/colors";
import { loginSuccess } from "../redux/userSlice";

const LOGIN_SCREEN = "LoginScreen";
const HOME_SCREEN = "Tabs";

const SplashScreen = () => {
  const [connected, setConnected] = useState(false); 
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //refer https://stackoverflow.com/questions/52805879/re-render-component-when-navigating-the-stack-with-react-navigation
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const isNetworkAvailable = async () => {
        console.log("isNetworkAvailable")
        const response = await NetInfo.fetch();
        console.log("response=",response.isConnected)
        setConnected(response.isConnected)
        //return response.isConnected;
      }

      const isTokenValid = (tokenInfo) => {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds

        // Check if the token has expired
        if (tokenInfo.expiresAt < currentTimestamp) {
          return false;
        }  
        // Check if the token is not yet valid (created in the future)
        if (tokenInfo.createdAt > currentTimestamp) {
          return false;
        }    
        // Token is valid if it is not expired and not created in the future
        return true;
      };
      

      const fetchData = async () => {
        try {
          // Fetch the token and userInfo from AsyncStorage
          const tokenInfo = await AsyncStorage.getItem("tokenInfo");
          const userInfo = await AsyncStorage.getItem("userInfo");

          console.log(`fethData tokenInfo=${tokenInfo} userInfo=${userInfo}`)

          if(!tokenInfo || !userInfo) {
            navigation.replace(LOGIN_SCREEN);
            return;
          }

          if(!isTokenValid(JSON.parse(tokenInfo))) {
              console.log(`token expired`)
              Toast.show({
                type: "error",// success | error | info",
                text1 : "Session expired",
                text2: "Please login again",
                position: "bottom",//bottom | top",
              });
            
              navigation.replace(LOGIN_SCREEN);
              return;
          } else {
            console.log(`token valid`)
            // If token and userInfo exist, dispatch the loginSuccess action
            dispatch(loginSuccess({ userInfo: JSON.parse(userInfo), tokenInfo: JSON.parse(tokenInfo) }));
            
            navigation.replace(HOME_SCREEN);
            return;
          }

        } catch (err) {
          console.log(`erorr while fetching token and userInfo from AsyncStorage`)

          Toast.show({
            type: "error",// success | error | info",
            text1 : "Unable to fetch data",
            text2: "Please try again",
            position: "bottom",//bottom | top",
          });

          navigation.replace(LOGIN_SCREEN);
          return;
        }
      };

      const clearAsyncStorage = async () => {
        AsyncStorage.clear();
      };
      //clearAsyncStorage();

      setTimeout(() => {
        isNetworkAvailable();
        if(connected){
          Toast.hide();
          fetchData();
        } else {
          console.log(`No Internet connection`);
          Toast.show({
            type: "error",// success | error | info",
            text1 : "No Internet Connection",
            text2: "please try again",
            position: "bottom",//bottom | top",
          });

        }
      }, 3000);
    }
  }, [isFocused, connected]);

  return (
    <SafeAreaView style={styles.topContainer}>
      <Image source={ICONS.splashScreenLogo} style={styles.logo} />
      <Text style={styles.text}>Buys Grocery online now</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 250,
    width: 300,
  },
  text: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.green,
  },
});
