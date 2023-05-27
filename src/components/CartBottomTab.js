import { View, Text, Image,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ICONS } from '../constants/icons'
import { COLORS } from '../constants/colors'
import { useSelector } from 'react-redux'

const CartBottomTab = ( {isFocused} ) => {
    const [cartItemsCount, setCartItemsCount] = useState(0)
    //get count for unique
    const totalItems = useSelector((state) => state.cart.totalUniqueItems);

    useEffect(() => {
        setCartItemsCount(totalItems)
    }, [totalItems])

  return (
    <View>
        <Image
            source={ICONS.cart}
            style={{ width: 25, height: 25, tintColor: isFocused ? COLORS.green : COLORS.silver }}
        />
        { cartItemsCount > 0 &&
            <View style={styles.cartItemCounterContainer}>
                <Text style={styles.cartItemText}>{cartItemsCount}</Text>
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