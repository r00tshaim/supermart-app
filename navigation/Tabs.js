import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet } from 'react-native';

import HomeScreen from '../src/screens/HomeScreen';
import CartScreen from '../src/screens/CartScreen';
import OrdersScreen from '../src/screens/OrdersScreen';
import AccountScreen from '../src/screens/AccountScreen';
import SearchScreen from '../src/screens/SearchScreen';
import CartBottomTab from '../src/components/CartBottomTab';

import { ICONS } from '../src/constants/icons';
import { COLORS } from '../src/constants/colors';

const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    borderRadius: 15,
                    backgroundColor: COLORS.white,
                    height: 70,
                    elevation: 10,
                    shadowColor: COLORS.black,
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 3 },
                    shadowRadius: 3,
                },

                tabBarItemStyle: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: Platform.OS === "android" ? 0 : 20,
                }

            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ICONS.home}
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ICONS.search}
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ICONS.orders}
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ICONS.account}
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                        />
                    ),
                }}
            />
        </Tab.Navigator >
    );
};

const styles = StyleSheet.create({
})

export default Tabs;
