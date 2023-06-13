import { SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Product from '../components/Product';


const ProductsScreen = ({route}) => {

  //list of products provided to this component
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategoriesList] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState(null);

  useEffect(() => {
    const productsList = route.params.productList; 
    //subCategoriesList is not passed when ProductsScreen is navigatied by Brands selection, hence [] in such cases
    const subCategoriesList = route.params.subCategoriesList || [];

    if(selectedSubCat !== null) {
      const showProducts = productsList.filter((prod) => prod.subcategory === selectedSubCat)
      setProducts(showProducts);
    } else {
      setProducts(productsList);
      setSubCategoriesList(subCategoriesList);
    }

  },[selectedSubCat])
  

  return (
    <SafeAreaView style={styles.container}>

      {/* Do not render sub categories filter, when ProductsScreen is navigatied by Brands selection,
        since subCategories=[] in such cases, hence we can easily decide to render sub categories or not */}
      {subCategories.length > 0 &&
       <Categories categoriesList={subCategories} onSelectCategory={(id) => setSelectedSubCat(id)} /> }

        <FlatList
          data={products}
          renderItem={ ({item}) => (
            <Product prod={item} />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 150,
  },
});

export default ProductsScreen