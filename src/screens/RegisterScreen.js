import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import axiosClient from '../axios/axiosClient';
import { useNavigation } from "@react-navigation/native";
import { loginSuccess } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateMobile = (mobile) => {
    let re = /^\d{10}$/;
    return re.test(mobile);
  };

  const registerUser = async() => {
    try {
        console.log("registerUser")
        const userData = {
            name,
            mobile,
            address,
            email
        }
        const data = await axiosClient.post(`/v1/auth/register`, userData);
        console.log("registerUser response=",data.data)
        const userInfo = data.data.userInfo;
        const token = data.data.token;
        dispatch(loginSuccess({userInfo, token}));

        await AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
        await AsyncStorage.setItem('token',token);

        Toast.show({
          type: "success",// success | error | info,
          text1: "Registration is successfull",
          position: "bottom",// | top",
        });

        //Toast.hide();
        navigation.replace("Tabs");

      } catch (err) {
        console.log("Error while doing registration=", err.response.status);

        if(err.response.status === 500) {
          Toast.show({
            type: "error",// success | error | info,
            text1: "Email or mobile number already used",
            text2: "Please try with different again",
            position: "bottom",// | top",
          });
        } else {
          Toast.show({
            type: "error",// success | error | info,
            text1: "Error while registering user",
            text2: "please try again",
            position: "bottom",// | top",
          });
      }

      }
  }

  const handleRegister = () => {
    let newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!mobile) newErrors.mobile = 'Mobile is required';
    if (!validateMobile(mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!address) newErrors.address = 'Address is required';
    if (!email) newErrors.email = 'Email is required';
    if (!validateEmail(email)) newErrors.email = 'Invalid email address';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // submit the form
      console.log("DATA IS OKAY TO REGISTER USER");
      registerUser();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvodingView}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        keyboardType="numeric"
      />
      {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      {errors.address && <Text style={styles.error}>{errors.address}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
