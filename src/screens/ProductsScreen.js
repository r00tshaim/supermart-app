import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const ProductsScreen = ({route}) => {
    const categoryId = route.params.categoryId;
  return (
    <SafeAreaView>
      <Text>Products</Text>
      <Text>categoryId: {categoryId}</Text>
    </SafeAreaView>
  )
}

export default ProductsScreen