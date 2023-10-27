import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
                //headerShown: false,
                //headerStyle: {
                //  backgroundColor :"yellow"
                //},
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
                options={({ navigation }) => ({
                    title:false,
                    position: "absolute",
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ICONS.home}
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: COLORS.green
                    },
                    headerLeft: () => (
                        <View style={styles.homeLeftHeader}>
                            <Image
                                source={ICONS.splashScreenLogo}
                                style={{ width: 70, height: 60, paddingLeft: 10 }} />
                            
                            <Text style={{paddingLeft: 5, fontSize: 16}}>
                                MHK Mart
                            </Text>
                            
                        </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('CartScreen')}>
                        <CartBottomTab isFocused={false} />
                      </TouchableOpacity>
                    )
                })}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: COLORS.green
                    },
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ICONS.search}
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('CartScreen')}>
                          <CartBottomTab isFocused={false} />
                        </TouchableOpacity>
                    )
                })}
            />
            <Tab.Screen
                name="My Orders"
                component={OrdersScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: COLORS.green
                    },
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={ICONS.orders}
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.green : COLORS.silver }}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('CartScreen')}>
                          <CartBottomTab isFocused={false} />
                        </TouchableOpacity>
                    )
                })}
            />
            <Tab.Screen
                name="My Account"
                component={AccountScreen}
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.green,
                    },
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
    leftHeader: {
        paddingLeft: 10
    },
    rightHeader: {
        paddingRight: 15,
    },
    homeLeftHeader: {
        flexDirection: "row", 
        alignItems: "center",
        //borderColor: "red",       for debugging
        //borderWidth: 1,
        width: 300
    }
})

export default Tabs;
