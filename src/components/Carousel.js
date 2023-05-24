import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { COLORS } from "../constants/colors";

const horizontalMargin = 20;
const slideWidth = 280;

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = slideWidth + horizontalMargin * 4;
const itemHeight = 200;

const OffersSlider = ({ offers }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderOfferItem = ({ item }) => {
    return (
      <View style={styles.offerItem}>

        <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.price}>₹{item.price}   </Text>
              <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
            </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={offers}
        renderItem={renderOfferItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        layout={"default"}
        loop={true}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.9}
        onSnapToItem={(index) => setActiveSlide(index)}
      />

      <Pagination
        dotsLength={offers.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 5,
  },
  offerItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: 150,
    justifyContent: "space-between",
    backgroundColor: COLORS.green
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  detailsContainer: {

  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.white
  },
  price: {
    fontSize: 13,
    color: COLORS.white,
    textDecorationLine: "line-through",
  },
  offerPrice: {
    fontSize: 15,
    color: COLORS.white
  },
  paginationContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: COLORS.green
  },
});

export default OffersSlider;