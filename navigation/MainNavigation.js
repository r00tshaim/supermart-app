import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';


const Stack = createStackNavigator();

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
};

export default MainNavigation;
