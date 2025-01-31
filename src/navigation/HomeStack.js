import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
      }}
    >
        <Stack.Screen name='Inicio' component={Home} />
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={({route}) => ({title:route.params?.product.title.toUpperCase()})}/>
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})