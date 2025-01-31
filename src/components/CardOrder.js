import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardOrder = ({order}) => {
  return (
    <View>
        <Text>Fecha: {order.date}</Text>
        <Text>Total: {order.total}</Text>
    </View>
  )
}

export default CardOrder

const styles = StyleSheet.create({})