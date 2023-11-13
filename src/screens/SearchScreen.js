import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import Product from "../components/Product";
import { COLORS } from "../constants/colors";
import {REST_API_SERVER} from "@env"

import { Searchbar, useTheme, Text } from 'react-native-paper';

import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const productsList = useSelector((state) => state.inventory.products);
  const categoriesList = useSelector((state) => state.inventory.categories);

  const theme = useTheme();

  const options = {
    keys: ["name"],
    includeScore: true,
    threshold: 0.3,
  };

  const fuse = new Fuse(products, options);

  const searchProducts = (query) => {
    const result = fuse.search(query);
    return result;
  };

  const handleSearch = () => {
    // Perform search logic based on searchQuery
    // Update searchResults state with the matching products
    const results = searchProducts(searchQuery);
    //console.log("results=",results)
    setSearchResults(results);
  };

  const navigation = useNavigation();

  useEffect(() => {
    //reset local states everytime ScreenScreen icon is clicked
    const unsubscribe = navigation.addListener("tabPress", () => {
      //console.log("SearchScreen pressed")
      setSearchQuery("");
      setSearchResults([]);
      setSelectedCategory(null);
      setExpandedCategory(null);
      setSelectedSubCategory(null);
    });

    setCategories(categoriesList);
    setProducts(productsList);
    return unsubscribe;
  }, [searchQuery, categoriesList, navigation]);

  //---------------------------------------------------

  // Render categories dropdown
  const renderCategories = () => {
    return (
      <FlatList
        //horizontal
        //numColumns={}
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              if (expandedCategory === item._id) {
                setExpandedCategory(null);
              } else {
                setExpandedCategory(item._id);
              }
            }}
          >
            <View style={{flexDirection: "row"}}>
              <Image source={{ uri: item.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={{ height: 35, width: 35 }} />
              <Text
                variant="titleLarge"
                style={[
                  styles.categoryText,
                  { color: expandedCategory === item._id ? theme.colors.primary : COLORS.black,}, 
                ]}
              >
              {item.name}
            </Text>
            </View>
            {expandedCategory === item._id && (
              <View style={styles.subCategoryContainer}>
                {renderSubCategories(item.subCategories)}
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    );
  };

  //Render products list for a sub-categorey
  const renderProduct = (subCategoryId) => {
    const products = productsList.filter(
      (prod) =>
        prod.category === expandedCategory && prod.subcategory === subCategoryId
    );

      //There is some warning when this navigation is done.
      //TODO: fix the warning
      navigation.navigate('ProductsScreen', {productList: products})
      /*<FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Product prod={item} />}
      />*/
  };

  // Render sub-categories list for a category
  const renderSubCategories = (subCategories) => {
    return subCategories.map((subCategory) => (
      <TouchableOpacity
        key={subCategory._id}
        style={styles.subCategoryItem}
        onPress={() => {
          setSelectedCategory(null);
          if (selectedSubCategory === subCategory._id)
            setSelectedSubCategory(null);
          else setSelectedSubCategory(subCategory._id);
        }}
      >
        <Image source={{ uri: subCategory.image.replace(/localhost/g, `${REST_API_SERVER}`) }} style={{ height: 40, width: 40 }} />
        <Text
          variant="titleMedium"
          style={[
            styles.subCategoryText,
            { color: selectedSubCategory === subCategory._id ? theme.colors.primary : COLORS.black, },
          ]}
        >
          {subCategory.name}
        </Text>

        {selectedSubCategory === subCategory._id && (
          <View>
          {renderProduct(subCategory._id)}
          </View>
        )}

      </TouchableOpacity>
    ));
  };

  // Render search results
  const renderSearchResults = () => {
    if (searchQuery.length === 0) {
      // Render categories if no search query
      return renderCategories();
    }

    return (
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Product prod={item} />}
      />
    );
  };

  //---------------------------------------------------

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={""}>
        {/*<TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Search..."
          onSubmitEditing={handleSearch}
  />*/}
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          elevation={5}
          theme={theme}
        />
      </View>

      {searchQuery.length === 0 ? (
        <View style={styles.categoryContainer}>
          {renderCategories()}
        </View>
      ) : (
        <View>{renderSearchResults()}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    marginTop: 10,
  },
  searchBarContainer: {
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
  },
  searchInput: {
    height: 40,
    //borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 30,
    borderRadius: 20,
  },
  categoryItem: {
    //flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  categoryText: {
    paddingLeft: 10,
    //fontSize: 20,
  },
  categoryArrow: {
    fontSize: 16,
  },
  subCategoryContainer: {
    padding: 10,
    //backgroundColor: "#fff",
    //shadowColor: "#000",
    //shadowOffset: {
    //  width: 0,
    //  height: 2,
    //},
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,
    //elevation: 5,
    marginBottom: 20,
    borderRadius: 20,
  },
  subCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    marginVertical: 1,
    paddingVertical: 4,
    //borderWidth: 1,
    //borderRadius: 10,
    borderColor: "#ccc",
    paddingLeft: 30,
  },
  subCategoryText: {
    //fontSize: 16,
    paddingLeft: 10,
  },
});

export default SearchScreen;
