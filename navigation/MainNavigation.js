import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from "../src/constants/colors";

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
                title: 'Products',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <View style={styles.backArrowContainer}>
                      <Ionicons name="arrow-back-circle" size={40} color={COLORS.green} onPress={() => navigation.goBack()} />
                    </View>
                ),
              })}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backArrowContainer: {
    paddingLeft: 10
  }
})

export default MainNavigation;
