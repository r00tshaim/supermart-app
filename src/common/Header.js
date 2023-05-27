import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onPressLeftHandler,
  onPressRightHandler,
  isBack,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        
        {isBack && (
          <TouchableOpacity style={styles.leftContainer}>
            <Ionicons
              name="arrow-back-circle"
              size={40}
              color={COLORS.green}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        )}
        {!isBack && (
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={onPressLeftHandler}
          >
            <Image source={leftIcon} style={styles.icon} />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.rightContainer}
          onPress={onPressRightHandler}
        >
          <Image source={rightIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    //todo take care of below padding for different devices StatusBar.currentHeight not working for IOS
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: "silver",
  },
  leftContainer: {
    marginRight: 10,
  },
  rightContainer: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.green,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
});

export default Header;
