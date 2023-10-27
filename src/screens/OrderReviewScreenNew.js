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
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import { useEffect, useState } from "react";
import { addToCart, reduceItemQty, removeFromCart } from "../redux/cartSlice";
import Header from "../common/Header";
import { Entypo } from "@expo/vector-icons";
import { REST_API_SERVER } from "@env";
import axiosClient from "../axios/axiosClient";
import { emptyCart } from "../redux/cartSlice";

const OrderReviewScreenNew = ({route}) => {

    const [cartItemsState, setcartItemsState] = useState(route.params.items);
    const [totalAmount, setTotalAmount] = useState(route.params.orderTotal);
    const [totalSaved, setTotalSaved] = useState(route.params.totalSaved);

    const userInfo = useSelector(state => state.user.userInfo)

  const dispatch = useDispatch();
  const navigation = useNavigation();
 

  useEffect(() => {
    
  }, []);


  const createOrder = async (orderObj) => {
    try {
      const data = await axiosClient.post(`/v1/orders`, orderObj);
      return data.data;
    } catch (err) {
      console.log(
        `error while placing order message=${err.message} code=${err.code}`
      );
    }
  };

  //gets the format
  //[{"productId": "6485797a2323dd63d0fe2413", "qty": 1}, {"productId": "6485797c2323dd63d0fe241c", "qty": 2}]
  const getCartItemsList = (cartItems) => {
    let cartItemsList = [];
    cartItems.forEach((item) => {
      cartItemsList.push({
        productId: item._id,
        qty: item.qty,
      });
    });
    return cartItemsList;
  };

  const handleCheckout = async () => {
    console.log("checkout pressed");

    const cartItemsTemp = getCartItemsList(cartItems);
    //console.log("cartItemsTemp=", cartItemsTemp)
    const order = {
      orderItems: cartItemsTemp,
      orderTotal: totalAmount,
      savedTotal: totalSaved,
      deliveryAddress: "Mumbai, Maharashtra", //need to revisit this once delivery address feature is done
      paymentMethod: "cod", //need to revisit this once payment feature is done
    };

    console.log(`cartItems=${cartItems}`);

    //const newOrder = await createOrder(order)

    //if(newOrder.success === true) {
    //  console.log("newOrder=", newOrder)
    //  dispatch(emptyCart());
    //} else {
    //something went wrong order not created
    //}
  };

  const handleTotalAndSavedContainerPress = () => {
    console.log("total and saved container pressed");
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image.replace(/localhost/g, `${REST_API_SERVER}`),
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.quantity} {item.quantityUnit}</Text>

          {
            //when offerPrice is not available, display only actual price of item
            item.offerPrice === -1 && (
              <Text style={styles.offerPrice}>₹{item.mrpPrice}</Text>
            )
          }

          {item.offerPrice !== -1 && (
            <View style={styles.priceContainer}>
              <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
              <Text style={styles.originalPrice}>₹{item.mrpPrice}</Text>
            </View>
          )}

        </View>

        <View style={{}}>
            <Text>Qty: {item.qty}</Text>
        </View>
      </View>
    );
  };

  //execution starts here
  if (cartItemsState.length === 0) {
    return (
      <View style={styles.AndroidSafeArea}>
        <Header title={"Your Cart"} isBack={true} />
        <Text style={styles.emptyCartText}>No Items in Cart</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.AndroidSafeArea}>
          <Header title={"Checkout"} isBack={true} />

          <View
            style={{
              flexDirection: "row",
              paddingTop: 15,
              paddingBottom: 15,
              justifyContent: "space-between",
              marginHorizontal: 17,
            }}
          >
            {/*<View style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Cart Items: {cartUniqueItemsCount}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Cart Total: {totalAmount}
              </Text>
        </View>*/}

        {/* Delivery Address */}
        <View style={styles.deliveryAddressContainer}>
            <Text style={styles.deliveryAddressTitle}>Delivery Address</Text>
            {console.log("userInfo=",userInfo)}
            <Text style={styles.deliveryAddressText}>{userInfo.address}</Text>
        </View>
          </View>

        {/*Cart Items*/}
          <SafeAreaView>
            <FlatList
              data={cartItemsState}
              renderItem={renderProduct}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
            />
          </SafeAreaView>
        </View>

        <View style={styles.checkOutContainer}>
          <View style={styles.checkOutBottomTabContainer}>
            <TouchableOpacity
              style={styles.orderTotalAndSavedContainer}
              onPress={() => handleTotalAndSavedContainerPress()}
            >
              <Text style={styles.orderTotalText}>₹{totalAmount}</Text>
              <Text style={styles.orderSavedText}>You Saved ₹{totalSaved}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.placeOrderContainer}
              onPress={() => handleCheckout()}
            >
              <Text style={styles.placeOrderText}>
                Place Order
                <Entypo
                  name="chevron-small-right"
                  size={24}
                  color={COLORS.white}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  deliveryAddressContainer: {
    marginBottom: 16,
    borderWidth: 0.2,
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  deliveryAddressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryAddressText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 350, //adjust this property to control the space below the list of cart items
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingTop: 0,
    //borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageContainer: {
    width: 50,
    height: 50,
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
  qtyContainer: {

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
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    fontWeight: "bold",
  },
  checkOutContainer: {
    flex: 1,
  },
  checkOutBottomTabContainer: {
    position: "absolute",
    bottom: 165,
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeOrderContainer: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.green,
    height: 45,
    width: 160,
    borderRadius: 15,
    marginRight: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  placeOrderText: {
    alignSelf: "center",
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "500",
  },
  orderTotalAndSavedContainer: {
    marginHorizontal: 12,
    flexDirection: "column",
  },
  orderTotalText: {
    fontSize: 17,
    fontWeight: "800",
  },
  orderSavedText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.green,
  },
});

export default OrderReviewScreenNew;
