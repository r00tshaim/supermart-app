import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from "../src/constants/colors";

import Tabs from "./Tabs";

import ProductsScreen from "../src/screens/ProductsScreen";
import CartBottomTab from "../src/components/CartBottomTab";
import CartScreen from "../src/screens/CartScreen";
import SplashScreen from "../src/screens/SplashScreen";
import LoginScreen from "../src/screens/LoginScreen";
import OTPScreen from "../src/screens/OTPScreen";
import RegisterScreen from "../src/screens/RegisterScreen";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
            name="SplashScreen"
            options={{ 
                headerShown: false 
            }}
            component={SplashScreen}
        />

        <Stack.Screen
            name="LoginScreen"
            options={{ 
                headerShown: false 
            }}
            component={LoginScreen}
        />

        <Stack.Screen
            name="OTPScreen"
            options={{ 
                headerShown: false 
            }}
            component={OTPScreen}
        />

        <Stack.Screen
            name="CartScreen"
            options={{ 
                headerShown: false 
            }}
            component={CartScreen}
        />

        <Stack.Screen
            name="ProductsScreen"
            component={ProductsScreen}            
            options={({ navigation }) => ({
                title: 'Products',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <View style={styles.leftHeader}>
                      <Ionicons name="arrow-back-circle" size={40} color={COLORS.green} onPress={() => navigation.goBack()} />
                    </View>
                ),
                headerRight: () => (
                  <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('CartScreen')}>
                    <CartBottomTab isFocused={false} />
                  </TouchableOpacity>
                )
              })}
        />

        <Stack.Screen
            name="RegisterScreen"
            options={{ 
                headerShown: false 
            }}
            component={RegisterScreen}
          />

        <Stack.Screen
            name="Tabs"
            options={{ 
                headerShown: false 
            }}
            component={Tabs}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  leftHeader: {
    paddingLeft: 10
  },
  rightHeader: {
    paddingRight: 15,
  }
})

export default MainNavigation;
