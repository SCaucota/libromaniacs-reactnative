import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ProductsByCategory from '../screens/ProductsByCategory'
import ProductDetail from '../screens/ProductDetail'
import Shop from '../screens/Shop'

const ShopStack = () => {

    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  )
}

export default ShopStack

const styles = StyleSheet.create({})