import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <MainNavigation />
      </ToastProvider>
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
