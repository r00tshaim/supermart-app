import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { ICONS } from "../constants/icons";
import { useToast } from "react-native-toast-notifications";

import axiosClient from "../axios/axiosClient";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const toast = useToast();

  const sendOTP = async () => {
    try {
      console.log("mobilenumber=", mobileNumber);
      const mobileNo = mobileNumber;
      const data = await axiosClient.get(`/v1/auth/sendotp/${mobileNo}`);
      navigation.push("OTPScreen", { mobileNumber: mobileNumber });
    } catch (err) {
      console.log("Error while requesting for OTP=", err);

      toast.show("Error while requesting OTP, please try again", {
        type: "danger",// normal | success | warning | danger | custom",
        placement: "bottom",// | top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in"// | zoom-in",
      });

    }
  };

  const handleMobileNumberChange = (text) => {
    const formattedInput = text.replace(/\D/g, ""); // Remove non-numeric characters

    if (formattedInput.length <= 10) {
      setMobileNumber(formattedInput);
    }
  };

  const handleSubmit = () => {
    // Perform any necessary actions with the mobile number
    console.log("Mobile Number:", mobileNumber);

    setLoading(true);
    sendOTP();
    setLoading(false);
  };

  isMobileNoValid = mobileNumber.length === 10;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvodingView}
    >
    <View style={styles.container}>
      <Image source={ICONS.splashScreenLogo} style={styles.logo} />
      <Text style={styles.text}>Login or Sign Up</Text>
      <View style={styles.mobileNumberContainer}>
        <TextInput
          style={styles.mobileNumberInput}
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={(text) => handleMobileNumberChange(text)}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          isMobileNoValid ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!isMobileNoValid}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvodingView: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mobileNumberContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  mobileNumberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#8e8e8e",
    borderRadius: 8,
    height: 50,
    width: "80%",
    padding: 10,
    marginRight: 8,
    fontSize: 22,
    paddingLeft: 20,
  },
  button: {
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonEnabled: {
    backgroundColor: "green",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    //fontWeight: "bold",
  },
});

export default LoginScreen;
