import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { ICONS } from '../constants/icons'
import { COLORS } from '../constants/colors'

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {

    setTimeout(() => {
      navigation.push('LoginScreen')
    },3000)

  },[])

  return (
    <SafeAreaView style={styles.topContainer}>
      <Image source={ICONS.splashScreenLogo} style={styles.logo}/>
      <Text style={styles.text}>Buys Grocery online now</Text>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  topContainer: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
  },
  logo: {
    height: 250, 
    width: 250,
  },
  text: {
    fontSize: 24, 
    fontWeight: "800",
    color: COLORS.green
  }
})