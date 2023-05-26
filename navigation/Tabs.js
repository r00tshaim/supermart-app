import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, View, Text, StyleSheet } from 'react-native';

import HomeScreen from '../src/screens/HomeScreen';
import CartScreen from '../src/screens/CartScreen';
import OrdersScreen from '../src/screens/OrdersScreen';
import AccountScreen from '../src/screens/AccountScreen';

import { ICONS } from '../src/constants/icons';
import { COLORS } from '../src/constants/colors';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const items = useSelector((state) => state.cart);

    useEffect(() => {
        if(items)
            setCartItemsCount(items.length)
    }, [items])

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
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={ICONS.cart}
                                style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                            />
                            <View style={styles.cartItemCounterContainer}>
                                <Text style={styles.cartItemText}>
                                    {cartItemsCount}
                                </Text>
                            </View>
                        </View>
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
    cartItemCounterContainer: {
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: COLORS.darkGreen,
            borderRadius: 9,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
    },
    cartItemText: {
         color: COLORS.white, 
         fontSize: 10, 
         fontWeight: 'bold' 
    }
})

export default Tabs;
