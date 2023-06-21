import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { ICONS } from "../constants/icons";
import axiosClient from "../axios/axiosClient";

const OTPScreen = ({route}) => {
  const mobileNo = route.params.mobileNumber;
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);

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
      console.log("data=",data.data)
    } catch (err) {
      console.log("error=", err);
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
  );
};

const styles = StyleSheet.create({
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
