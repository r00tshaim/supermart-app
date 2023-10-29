import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from 'react-native-toast-message';
import { AppRegistry } from 'react-native';
import _App from './_App';


export default function App() {
  return (
    <Provider store={store}>
      <_App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
