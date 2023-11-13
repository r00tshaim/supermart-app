import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation } from 'react-native-paper';

import { ICONS } from '../src/constants/icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../src/screens/HomeScreen';
import SearchScreen from '../src/screens/SearchScreen';
import OrdersScreen from '../src/screens/OrdersScreen';
import AccountScreen from '../src/screens/AccountScreen';

import CartBottomTab from '../src/components/CartBottomTab';


const Tab = createBottomTabNavigator();

export default function Tabs_v2() {
  return (
    <Tab.Navigator
      screenOptions={{
        //headerShown: false,
        title: false,     //title for all tabs disabled
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
         safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ size,color }) => {
             return <AntDesign name="home" size={size} color={color} />
          },
          headerLeft: () => (
            <View style={styles.homeLeftHeader}>
              <Image
                source={ICONS.splashScreenLogo}
                style={{ width: 100, height: 70, paddingLeft: 20 }} />
            
              {/*<Text style={{paddingLeft: 5, fontSize: 16}}>
                MHK Mart
          </Text>*/}
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.homeRightHeader} onPress={() => navigation.navigate('CartScreen')}>
              <CartBottomTab />
            </TouchableOpacity>
          )
      })}
        /*options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}*/
      />
      <Tab.Screen
        name="Search" 
        component={SearchScreen}
        options={({ navigation }) => ({
          tabBarLabel: 'Search',
          //headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="search1" size={size} color={color} />
          },
          headerLeft: () => (
            <View style={styles.homeLeftHeader}>
              <Image
                source={ICONS.splashScreenLogo}
                style={{ width: 100, height: 70, paddingLeft: 20 }} />
            
              {/*<Text style={{paddingLeft: 5, fontSize: 16}}>
                MHK Mart
          </Text>*/}
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.homeRightHeader} onPress={() => navigation.navigate('CartScreen')}>
              <CartBottomTab />
            </TouchableOpacity>
          )
        })}
        
      />

      <Tab.Screen
        name="My Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="history" size={24} color="black" />;
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          },
        }}
      />

      {/*<Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      /> */}

    </Tab.Navigator>
  );
}

/*function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
}*/

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeRightHeader: {
    paddingRight: 15,
  },
  homeLeftHeader: {
    flexDirection: "row", 
    alignItems: "center",
    //borderColor: "red",       for debugging
    //borderWidth: 1,
    width: 300
  }
});