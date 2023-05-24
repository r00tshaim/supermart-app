import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

import Tabs from "./Tabs";

import ProductsScreen from "../src/screens/ProductsScreen";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
            name="Tabs"
            options={{ 
                headerShown: false 
            }}
            component={Tabs}
        />

        <Stack.Screen
            name="ProductsScreen"
            component={ProductsScreen}            
            options={({ navigation }) => ({
                //title: 'Products',
                //headerTitleAlign: 'center',
                headerLeft: () => (
                    <Ionicons name="arrow-back-circle" size={24} color="black" onPress={() => navigation.goBack()} />
                ),
              })}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default MainNavigation;
