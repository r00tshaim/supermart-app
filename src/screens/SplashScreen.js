import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";

import { ICONS } from "../constants/icons";
import { COLORS } from "../constants/colors";
import { loginSuccess } from "../redux/userSlice";

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  //refer https://stackoverflow.com/questions/52805879/re-render-component-when-navigating-the-stack-with-react-navigation
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          // Fetch the token and userInfo from AsyncStorage
          const token = await AsyncStorage.getItem("token");
          const userInfo = await AsyncStorage.getItem("userInfo");

          console.log("token=", token);
          console.log("userInfo=", userInfo);

          if (token && userInfo) {
            // If token and userInfo exist, dispatch the loginSuccess action
            dispatch(loginSuccess({ userInfo: JSON.parse(userInfo), token }));
          }

          // Navigate to the appropriate screen based on user authentication
          navigation.navigate(token && userInfo ? "Tabs" : "LoginScreen");
        } catch (err) {
          console.log(`erorr while fetching token and userInfo from AsyncStorage`)

          toast.show( "Unable to fetch data, please try again", {
            type: "danger",// normal | success | warning | danger | custom",
            placement: "bottom",// | top",
            duration: 4000,
            offset: 30,
            animationType: "slide-in"// | zoom-in",
          });

        }
      };

      const clearAsyncStorage = async () => {
        AsyncStorage.clear();
      };
      // clearAsyncStorage();

      setTimeout(() => {
        fetchData();
        //navigation.navigate(userLoggedIn ? 'Tabs' : 'LoginScreen')
      }, 3000);
    }
  }, [isFocused]);

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
    width: 250,
  },
  text: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.green,
  },
});
