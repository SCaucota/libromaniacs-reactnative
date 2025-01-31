import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Orders from '../screens/Orders';
import OrderDetail from '../screens/OrderDetail';

const Stack = createNativeStackNavigator();

const OrdersStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: true,
      tabBarShowLabel: false,
      tabBarLabelPosition: 'beside-icon',
    }}
    >
        <Stack.Screen name='Ordenes' component={Orders} />
        <Stack.Screen name='OrderDetail' component={OrderDetail} options={({route}) => ({title:route.params?.order.id})}/>
    </Stack.Navigator>
  )
}

export default OrdersStack

const styles = StyleSheet.create({})