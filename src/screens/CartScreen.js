import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Text, useTheme, Surface, IconButton, Badge } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import { useEffect, useState } from "react";
import { addToCart, reduceItemQty, removeFromCart } from "../redux/cartSlice";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {REST_API_SERVER} from "@env"
import axiosClient from "../axios/axiosClient";
import { emptyCart } from "../redux/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();
  const {width, height} = Dimensions.get('window')

  const cartItems = useSelector((state) => state.cart.data);
  const cartUniqueItemsCount = useSelector(
    (state) => state.cart.totalUniqueItems
  );
  const [cartItemsState, setcartItemsState] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  const getTotal = (items) => {
    let total = 0;
    let youSaved = 0;
    if (items === undefined || items.length === 0) {
      setTotalAmount(total);
      return;
    }
    items.map((item) => {
      // -1 in offer price means offer is not there on this product
      if (item.offerPrice !== -1) {
        total = total + item.qty * item.offerPrice;
        //no of qty for item * ( difference b/w actual price and offer price )
        youSaved = youSaved + item.qty * (item.mrpPrice - item.offerPrice);
      } else {
        total = total + item.qty * item.mrpPrice;
      }
    });
    setTotalAmount(total.toFixed(2));
    setTotalSaved(youSaved.toFixed(2));
  };

  useEffect(() => {
    setcartItemsState(cartItems);
    getTotal(cartItems);
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

  const createOrder = async (orderObj) => {
    try{
      const data = await axiosClient.post(`/v1/orders`, orderObj);
      return data.data
    }catch(err) {
      console.log(`error while placing order message=${err.message} code=${err.code}`)
    }
  }

  //gets the format
  //[{"productId": "6485797a2323dd63d0fe2413", "qty": 1}, {"productId": "6485797c2323dd63d0fe241c", "qty": 2}]
  const getCartItemsList = (cartItems) => {
    let cartItemsList = [];
    cartItems.forEach(item => {
        cartItemsList.push({
            productId: item._id,
            qty: item.qty,
        });
    });
    return cartItemsList;
  }

  const handleCheckout = async () => {
    console.log("checkout pressed");

    const cartItemsTemp = getCartItemsList(cartItems);
    //console.log("cartItemsTemp=", cartItemsTemp)
    const order = {
      orderItems: cartItemsTemp,
      orderTotal: totalAmount,
      savedTotal: totalSaved,
      deliveryAddress: "Mumbai, Maharashtra",        //need to revisit this once delivery address feature is done
      paymentMethod: "cod"                          //need to revisit this once payment feature is done
    }

    console.log(`cartItems=${cartItems}`)
    navigation.navigate('OrderReviewScreenNew', {deliveryAddress: "Parabda, Himmatnagar", items: cartItems, orderTotal: totalAmount, totalSaved: totalSaved})
      
    //const newOrder = await createOrder(order)

    //if(newOrder.success === true) {
    //  console.log("newOrder=", newOrder)
    //  dispatch(emptyCart());
    //} else {
      //something went wrong order not created
    //}
    
  };

  const handleTotalAndSavedContainerPress = () => {
    console.log("total and saved container pressed")
  }


  const renderProduct = ({ item }) => {
    return (
      <Surface style={styles.productContainer} elevation={3}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={styles.image} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text variant="titleSmall" style={styles.name}>{item.name}</Text>
          <Text variant="labelSmall" style={styles.description}>{item.description.length > 65 ? item.description.slice(0,60) + '...' : item.description}</Text>

          {
            //when offerPrice is not available, display only actual price of item
            item.offerPrice === -1 && (
              <Text variant="bodyLarge" style={styles.offerPrice}>₹{item.mrpPrice}</Text>
            )
          }

          {item.offerPrice !== -1 && (
            <View style={styles.priceContainer}>
              <Text variant="bodyLarge" style={styles.offerPrice}>₹{item.offerPrice}</Text>
              <Text variant="bodyMedium" style={{...styles.originalPrice, color: theme.colors.error}}>₹{item.mrpPrice}</Text>
            </View>
          )}
  

          {item.qty === undefined || item.qty == 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCartHandler(item)}
            >
              <Text style={styles.addButtonLabel}>Add +</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.adjustQtyContainer}>
              {/*
              <TouchableOpacity
                style={styles.signContainer}
                onPress={() => handleReduceItemQty(item)}
              >
                <Text style={styles.addButtonLabel}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.qty}</Text>

              <TouchableOpacity  
                onPress={() => handleIncrementItemQty(item)}
              >
                <Text style={styles.addButtonLabel}>+</Text>
              </TouchableOpacity>
           */}
                <IconButton
                  icon="minus"
                  iconColor={"black"}
                  size={18}
                  onPress={() => handleReduceItemQty(item)}
                />

                <Badge size={22} style={styles.qtyText}>{item.qty}</Badge>
                <IconButton
                  icon="plus"
                  iconColor={"black"}
                  size={18}
                  onPress={() => handleIncrementItemQty(item)}
                />
            </View>
          )}
        </View>
      </Surface>
    );
  };

  //execution starts here
  if (cartItemsState.length === 0) {
    return (
      <View style={styles.AndroidSafeArea}>
        {/*<Header title={"Your Cart"} isBack={true} />*/}
        <Text style={styles.emptyCartText}>No Items in Cart</Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <View style={{width: width, height: height - 160}}>
          {/*<Header title={"Your Cart"} isBack={true} />  */}

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 5,
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginBottom: 10,
            }}
          >
            <View style={{ alignSelf: "center" }}>
              <Text variant="titleMedium">
                Cart Items: {cartUniqueItemsCount}
              </Text>
            </View>
            <View style={{}}>
              <Text variant="titleLarge">
                Cart Total: {totalAmount}
              </Text>
            </View>
          </View>

          <SafeAreaView>
            <FlatList
              data={cartItemsState}
              renderItem={renderProduct}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
            />
          </SafeAreaView>
        </View>

        <View style={{...styles.checkOutContainer, width: width, height: 160}}>
          <View style={styles.checkOutBottomTabContainer}>

            <TouchableOpacity style={styles.orderTotalAndSavedContainer} onPress={() => handleTotalAndSavedContainerPress()}>
              <Text variant="titleMedium" style={styles.orderTotalText}>₹{totalAmount}</Text>
              <Text variant="bodyMedium" style={styles.orderSavedText}>You Saved ₹{totalSaved}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{...styles.placeOrderContainer, backgroundColor: theme.colors.primary}}
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
    //backgroundColor: "red"
    //flex:1,
  },
  listContainer: {
    //flexGrow: 1,
    //paddingBottom: 350, //adjust this property to control the space below the list of cart items
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 4,
    borderBottomWidth: 0.3,
    borderBottomColor: "#ddd",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10,
    borderRadius: 20,
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
    //fontSize: 16,
    //fontWeight: "bold",
    marginBottom: 2,
  },
  description: {
    //fontSize: 14,
    marginBottom: 2,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  offerPrice: {
    //fontSize: 16,
    fontWeight: "bold",
    //color: "green",
    marginRight: 10,
  },
  originalPrice: {
    //fontSize: 14,
    //color: "red",
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
    fontSize: 12,
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
    //flex: 1,
    //bottom: 190,
    //bottom: 50,
    //backgroundColor: "yellow",
  },
  checkOutBottomTabContainer: {
    position: "absolute",
    //bottom: 165,
    left: 20,
    right: 20,
    borderRadius: 15,
    backgroundColor: "white",
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
    //backgroundColor: COLORS.green,
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
    //fontSize: 17,
    fontWeight: "800",
  },
  orderSavedText: {
    //fontSize: 12,
    fontWeight: "500",
  },
});

export default CartScreen;
