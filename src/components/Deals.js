import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/colors";

const Deals = ({ deals }) => {

  const renderDeal = ({ item }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.offerLabelContainer}>
        <Text style={styles.offerLabel}>{item.offer}</Text>
      </View>

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.strikethroughPrice}>₹{item.price}</Text>
          <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => Alert.alert("Add to cart pressed!")}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={{ paddingTop: 5, paddingLeft: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: 600 }}>Deals of the day</Text>
      </View>
      <FlatList
        data={deals}
        renderItem={renderDeal}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  card: {
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    //padding: 0,
    paddingTop: 10,
    width: 200,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  offerLabelContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: COLORS.green,
    padding: 5,
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  offerLabel: {
    color: COLORS.white,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  detailsContainer: {
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  strikethroughPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: COLORS.darkSilver,
    marginRight: 5,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkGreen,
  },
  addButtonContainer: {
    backgroundColor: COLORS.green,
    width: "80%",
    marginLeft: 20,
    marginTop: 5,
    borderRadius: 10,
    bottom: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: COLORS.white,
  }
});

export default Deals;
