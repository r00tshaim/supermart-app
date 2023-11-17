import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from "../src/constants/colors";

//import Tabs from "./Tabs";
import Tabs_v2 from "./Tabs_v2";

import ProductsScreen from "../src/screens/ProductsScreen";
import CartBottomTab from "../src/components/CartBottomTab";
import CartScreen from "../src/screens/CartScreen";
import SplashScreen from "../src/screens/SplashScreen";
import LoginScreen from "../src/screens/LoginScreen";
import OTPScreen from "../src/screens/OTPScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import OrderReviewScreen from "../src/screens/OrderReviewScreen";
import OrderReviewScreenNew from "../src/screens/OrderReviewScreenNew";

const Stack = createStackNavigator();

const MainNavigation = ({ theme }) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
      screenOptions={{
        //screen options that we want to keep same with all screens can be placed here
        //if this same option when mentioned in stack.screen it will override this options mentioned here
        title: false,     //title for all tabs disabled
        headerStyle: {
          backgroundColor: theme.colors.secondaryContainer,
        },
        headerTitleAlign: 'center',
      }}
      >

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
            component={CartScreen}
            options= {({ navigation }) => ({ 
                //headerShown: false,
                title: 'My Cart',
                headerLeft: () => (
                  <View style={styles.leftHeader}>
                    <Ionicons name="arrow-back-circle" size={40} color={COLORS.black} onPress={() => navigation.goBack()} />
                  </View>
              ),
            })}   
        />

        <Stack.Screen
            name="ProductsScreen"
            component={ProductsScreen}            
            options={({ navigation }) => ({
                title: 'Products',
                //headerBackground: () => (<Image style={StyleSheet.absoluteFill} source={{ uri:'https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3922575/all-grocery-items-500x500.jpg'}} />),
                headerLeft: () => (
                    <View style={styles.leftHeader}>
                      <Ionicons name="arrow-back-circle" size={40} color={COLORS.black} onPress={() => navigation.goBack()} />
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
            name="OrderReviewScreenNew"
            component={OrderReviewScreenNew}
            options={({  }) => ({
              //headerShown: false
            })}
            
          />

        {/*<Stack.Screen
            name="OrderReviewScreen"
            options={{ 
                headerShown: false 
            }}
            component={OrderReviewScreen}
          />*/}

      

        <Stack.Screen
            name="RegisterScreen"
            options={{ 
                //headerShown: false 
            }}
            component={RegisterScreen}
          />

        <Stack.Screen
            name="Tabs"
            options={{ 
                headerShown: false 
            }}
            component={Tabs_v2}
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
