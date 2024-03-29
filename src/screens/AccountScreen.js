import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native'

import { COLORS } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = () => {
  const userInfo = useSelector(state => state.user.userInfo)
  const navigation = useNavigation();

  const handleLogoutAsync = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userInfo')
    navigation.navigate('SplashScreen')
  }

  const handleLogout = () => {
    handleLogoutAsync();
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileInfoContainer}>
            <Image
              source={{ uri: "https://dummyimage.com/150x150/000/fff" }}
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.name}>{userInfo ? userInfo.name : ""}</Text>
              <Text style={styles.mobileNumber}>Mobile: {userInfo ? userInfo.mobile : ""}</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab}>
            <FontAwesome name="shopping-bag" size={24} color="#555555" />
            <Text style={styles.tabText}>Previous Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab}>
            <FontAwesome name="bell" size={24} color="#555555" />
            <Text style={styles.tabText}>My Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab}>
            <FontAwesome name="map-marker" size={24} color="#555555" />
            <Text style={styles.tabText}>Saved Delivery Address</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={24} color="#555555" />
            <Text style={styles.tabText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    //flex: 1,
    //backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    backgroundColor: COLORS.green,
    padding: 20,
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  profileTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  mobileNumber: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
  },
  tabsContainer: {
    //flex: 1,
    padding: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tabText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#555555",
  },
});

export default AccountScreen;
