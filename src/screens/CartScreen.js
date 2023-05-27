import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/colors";
import { useEffect, useState } from "react";
import { addToCart, reduceItemQty, removeFromCart } from "../redux/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.data);
  const [cartItemsState, setcartItemsState] = useState([]);

  useEffect(() => {
    setcartItemsState(cartItems);
  }, [cartItems]);

  const handleIncrementItemQty = (item) => {
    //console.log("handleIncrementItemQty");
    //addToCart increases qty of item if already in cart
    dispatch(addToCart(item));
  };

  const handleReduceItemQty = (item) => {
    //console.log("handleReduceItemQty");
    if (item.qty === 1) {
      //console.log("item.qty is 1 so removing from cart");
      dispatch(removeFromCart(item));
    } else if (item.qty > 1) {
      dispatch(reduceItemQty(item));
    }
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {item.offerPrice && (
            <View style={styles.priceContainer}>
              <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
              <Text style={styles.originalPrice}>₹{item.price}</Text>
            </View>
          )}

          {
            //when offerPrice is not available, display only actual price of item
            item.offerPrice === undefined && (
              <Text style={styles.offerPrice}>₹{item.price}</Text>
            )
          }

          {item.qty === undefined || item.qty == 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCartHandler(item)}
            >
              <Text style={styles.addButtonLabel}>Add +</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.adjustQtyContainer}>
              <TouchableOpacity
                style={styles.signContainer}
                onPress={() => handleReduceItemQty(item)}
              >
                <Text style={styles.addButtonLabel}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.qty}</Text>

              <TouchableOpacity
                style={styles.signContainer}
                onPress={() => handleIncrementItemQty(item)}
              >
                <Text style={styles.addButtonLabel}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  //execution starts here
  if (cartItemsState.length === 0) {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Text style={styles.emptyCartText}>
          No Items in Cart
        </Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <FlatList
          data={cartItemsState}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productDetailsContainer: {
    flex: 1,
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
    marginBottom: 5,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: "red",
    textDecorationLine: "line-through",
  },
  addButton: {
    //backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.2,
    alignSelf: "flex-end",
    marginHorizontal: 20,
  },
  addButtonLabel: {
    color: COLORS.black,
    fontWeight: "bold",
  },
  adjustQtyContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 100,
  },
  signContainer: {
    borderColor: COLORS.silver,
    borderWidth: 0.5,
    borderRadius: 12,
    padding: 5,
    paddingHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  emptyCartText: {
     fontSize: 16, textAlign: "center", marginTop: 24, fontWeight: "bold"
  }
});

export default CartScreen;
