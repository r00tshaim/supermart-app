import { View, Text, Image,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ICONS } from '../constants/icons'
import { COLORS } from '../constants/colors'
import { useSelector } from 'react-redux'
import { Badge, useTheme } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

const CartBottomTab = () => {
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const theme = useTheme();
    //get count for unique
    const totalItems = useSelector((state) => state.cart.totalUniqueItems);

    useEffect(() => {
        setCartItemsCount(totalItems)
    }, [totalItems])

  return (
    <View>
        <AntDesign name="shoppingcart" size={28} color="black" />
        { cartItemsCount > 0 &&
            <View style={styles.cartItemCounterContainer}>
                <Badge theme={theme}>{cartItemsCount}</Badge>
                {/*<Text style={styles.cartItemText}>{cartItemsCount}</Text>*/}
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    cartItemCounterContainer: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 9,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItemText: {
        color: COLORS.white, 
        fontSize: 10, 
        fontWeight: 'bold' 
    }
})


export default CartBottomTab