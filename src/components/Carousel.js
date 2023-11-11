import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { COLORS } from "../constants/colors";
import { getCategorybyId } from "../utils/categoriesUtil";
import { Text } from "react-native-paper";

const IMAGES_DIR = "../../assets/carousel";

const horizontalMargin = 20;
const slideWidth = 280;

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = slideWidth + horizontalMargin * 4;
const itemHeight = 200;

const OffersSlider = ({ offers }) => {
  //const [activeSlide, setActiveSlide] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      id: 1,
      title: 'Title 1',
      image: require(`${IMAGES_DIR}/offer1.jpg`),
    },
    {
      id: 2,
      title: 'Title 2',
      image: require(`${IMAGES_DIR}/offer2.webp`),
    },
    {
      id: 3,
      title: 'Title 3',
      image: require(`${IMAGES_DIR}/offer3.webp`),
    },
    {
      id: 4,
      title: 'Title 4',
      image: require(`${IMAGES_DIR}/offer4.jpg`),
    },
    {
      id: 5,
      title: 'Title 5',
      image: require(`${IMAGES_DIR}/offer5.jpg`),
    },
  ];
  
  /*
  const renderOfferItem = ({ item }) => {
    const categorey = getCategorybyId(item.categoreyId)
    return (
      <View style={styles.offerItem} key={item.id}>

        <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>{categorey.name}</Text>

            <View style={{flexDirection: "row"}}>
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

      </View>
    );
  };*/

  const renderItem = ({ item }) => {
    return (
      <View style={styles.offerItem}>
        <Image source={item.image} style={styles.image} />
        {/*<Text style={{ fontSize: 20 }}>{item.title}</Text>*/}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setActiveIndex(index)}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
      />
      {/*<Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={{ paddingVertical: 10 }}
  />*/}
    </View>
    /*<View style={styles.container}>
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
  </View>*/
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 10,
  },
  offerItem: {
    width: ITEM_WIDTH, 
    borderRadius: 10,
    //overflow: "hidden",
    //flexDirection: "row",
    //alignItems: "center",
    //padding: 10,
    marginHorizontal: 5,
    //shadowColor: "#000",
    //shadowOffset: {
    //  width: 0,
    //  height: 2,
    //},
    //shadowOpacity: 0.23,
    //shadowRadius: 2.62,
    //elevation: 4,
    height: 150,
    //justifyContent: "space-between",
    //backgroundColor: COLORS.green
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: itemHeight,
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
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.white
  },
  price: {
    fontSize: 13,
    color: COLORS.white,
    textDecorationLine: "line-through",
  },
  labelText: {
    fontSize: 19,
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