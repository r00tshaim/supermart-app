import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import Product from "../components/Product";
import { COLORS } from "../constants/colors";

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
            <Text
              style={[
                styles.categoryText,
                { color: expandedCategory === item._id ? COLORS.green : COLORS.black,}, 
              ]}
            >
              {item.name}
            </Text>
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

    return (
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Product prod={item} />}
      />
    );
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
        <Text
          style={[
            styles.subCategoryText,
            { color: selectedSubCategory === subCategory._id ? COLORS.green : COLORS.black, },
          ]}
        >
          {subCategory.name}
        </Text>
        {selectedSubCategory === subCategory._id &&
          renderProduct(subCategory._id)}
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
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Search..."
          onSubmitEditing={handleSearch}
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
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginBottom: 80,
    //backgroundColor: '#fff',
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
    fontSize: 20,
  },
  categoryArrow: {
    fontSize: 16,
  },
  subCategoryContainer: {
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    borderRadius: 20,
  },
  subCategoryItem: {
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    marginVertical: 4,
    paddingVertical: 7,
    //borderWidth: 1,
    //borderRadius: 10,
    borderColor: "#ccc",
    paddingLeft: 30,
  },
  subCategoryText: {
    fontSize: 16,
  },
});

export default SearchScreen;
