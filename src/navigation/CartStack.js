import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from '../screens/Cart';
import { colors } from '../globals/colors';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
      }}
    >
        <Stack.Screen name='Carrito' component={Cart} />
    </Stack.Navigator>
  )
}

export default CartStack

const styles = StyleSheet.create({})