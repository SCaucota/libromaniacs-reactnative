import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ProductsByCategory from '../screens/ProductsByCategory'
import ProductDetail from '../screens/ProductDetail'
import Shop from '../screens/Shop'
import { colors } from '../globals/colors'

const ShopStack = () => {

    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontSize: 20,
        },
      }}
    >
        <Stack.Screen name="Tienda" component={Shop} />
        <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} options={({route}) => ({title:route.params?.category.toUpperCase() || 'Categoría'})}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={({route}) => ({title:route.params?.product.title.toUpperCase()})}/>
    </Stack.Navigator>
  )
}

export default ShopStack

const styles = StyleSheet.create({})