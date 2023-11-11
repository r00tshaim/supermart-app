import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import { Provider } from "react-redux";
import Toast from 'react-native-toast-message';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Switch,
} from 'react-native-paper';
import merge from 'deepmerge';

import { setIsDarkTheme } from './src/redux/userSlice';


const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

//const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
//const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};


export default function _App() {
    const isThemeDarkFromUserSlice = useSelector(state => state.user.isDarkTheme);
    const dispatch = useDispatch();

    useEffect(() => {

    },[isThemeDarkFromUserSlice])

    const handleThemeToggle = () => {
        dispatch(setIsDarkTheme(!isThemeDarkFromUserSlice))
    }

  return (
      <PaperProvider theme={isThemeDarkFromUserSlice ? CombinedDarkTheme : CombinedDefaultTheme}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <MainNavigation theme={isThemeDarkFromUserSlice ? CombinedDarkTheme : CombinedDefaultTheme} />
        {/*<Switch
          color={'red'}
          value={isThemeDarkFromUserSlice}
          onValueChange={handleThemeToggle}
  />*/}
        <Toast />
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
