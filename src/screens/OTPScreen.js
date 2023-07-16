import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, {useState} from "react";
import { ICONS } from "../constants/icons";
import axiosClient from "../axios/axiosClient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";

const OTPScreen = ({route}) => {
  const mobileNo = route.params.mobileNumber;
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // move focus to next input
    if (text && index < otp.length - 1) {
      inputRefs[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // move focus to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    try {
      console.log("otp=", otp.join(''))
      const data = await axiosClient.get(`/v1/auth/verifyotp/${mobileNo}/${otp}`);
      const userExists = data.data.userExists;
      const userInfo = data.data.userInfo;
      const token = data.data.token;
      if(userExists === true){
        console.log("userExists=",userExists)
      
        dispatch(loginSuccess({userInfo, token}));

        await AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
        await AsyncStorage.setItem('token',token);

        Toast.show({
          type: "success",// success | error | info,
          text1: "OTP verified successfully",
          position: "bottom",// | top",
        });

        navigation.replace('Tabs');

      } else {
        console.log("userExists does not exists, needs to register")
        navigation.replace('RegisterScreen');
      }

    } catch (err) {
      console.log("Error while verifying OTP, please try again=", err);

      Toast.show({
        type: "error",// success | error | info,
        text1: "Error while verifying OTP",
        text2: "please try again",
        position: "bottom",// | top",
      });

    }
  };

  const handleSubmit = () => {
    // Perform any necessary actions with the mobile number
    console.log("Verify OTP");

    setLoading(true);
    verifyOTP();
    setLoading(false);
    //navigation.push("OTPScreen");

  };

  let inputRefs = [];

  isOtpValid = otp.every(item => item !== '' && !isNaN(item));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvodingView}
    >
    <View style={styles.container}>
      <Image source={ICONS.splashScreenLogo} style={styles.logo} />
      <Text style={styles.text}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            style={styles.otpInput}
            key={index}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            ref={ref => (inputRefs[index] = ref)}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isOtpValid ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!isOtpValid}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
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
  otpContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 5,
    textAlign: "center",
    fontSize: 22,
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

export default OTPScreen;
