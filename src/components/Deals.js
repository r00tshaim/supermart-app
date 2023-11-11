import React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { COLORS } from "../constants/colors";
import {REST_API_SERVER} from "@env"

import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const Deals = ({ deals }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  //var itemsInCart = useSelector(state => state.cart.data);
  //console.log("itemsInCart =", itemsInCart);

  const addToCartHandler = (item) => {
    //console.log("addToCartHandler item=",item)
    dispatch(addToCart(item))
  }

  const renderDeal = ({ item }) => {
    //calculate percentage from mrpPrice and offerPrice
    const percentageDiscount = (item.mrpPrice - item.offerPrice) / item.mrpPrice * 100
    //get round off value which is greater and in muliples of 10
    //ie if percentageDiscount is 27 -> roundOffPercentage will be 30
    //note: use Math.round if you want roundOffPercentage to be 20 in case percentageDiscount is 27
    const roundOffPercentage = Math.ceil(percentageDiscount / 10) * 10
    const offerLabel = `Upto ${roundOffPercentage}% off`
    const customName = `${item.name} ${item.quantity}${item.quantityUnit}`
  return (
    <View key={item.id} style={styles.card}>
      <View style={{...styles.offerLabelContainer, backgroundColor: theme.colors.inversePrimary}}>
        <Text variant="labelSmall" style={styles.offerLabel}>{offerLabel}</Text>
      </View>

      <Image source={{ uri: item.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text variant="labelSmall" style={styles.name}>{customName}</Text>
        {/*<Text style={styles.description}>{item.description}</Text>*/}

        <View style={styles.priceContainer}>
          <Text variant="labelSmall" style={styles.strikethroughPrice}>₹{item.mrpPrice}</Text>
          <Text variant="labelLarge" style={{...styles.offerPrice, color: theme.colors.primary}}>₹{item.offerPrice}</Text>
        </View>

        {/*<View style={styles.addButtonContainer}>
          <Button icon="cart" mode="contained" onPress={() => addToCartHandler(item)}>
            Add
          </Button>
  </View>*/}
      </View>
      
    </View>
  );
      }

  return (
    <>
      <FlatList
        data={deals}
        renderItem={renderDeal}
        keyExtractor={(item) => item._id}
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
    marginTop: 5,
    paddingBottom: 10,
  },
  card: {
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    //padding: 0,
    paddingTop: 10,
    width: 180,
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
    //backgroundColor: theme.colors.primary,
    padding: 5,
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  offerLabel: {
    //color: COLORS.white,
    //fontWeight: "bold",
    paddingHorizontal: 10,
  },
  image: {
    width: "80%",
    height: 120,
    alignSelf: "center"
  },
  detailsContainer: {
    padding: 5,
  },
  name: {
    //fontSize: 13,
    //fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  strikethroughPrice: {
    //fontSize: 14,
    textDecorationLine: "line-through",
    //color: COLORS.darkSilver,
    marginRight: 5,
  },
  offerPrice: {
    //fontSize: 16,
    //fontWeight: "bold",
    //color: COLORS.darkGreen,
  },
  addButtonContainer: {
    //backgroundColor: COLORS.green,
    width: "80%",
    marginLeft: 20,
    //marginTop: 5,
    //borderRadius: 10,
    //bottom: 5,
    paddingBottom: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: COLORS.white,
  }
});

export default Deals;
