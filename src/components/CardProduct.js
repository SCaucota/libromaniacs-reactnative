import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { useDeleteProductCartMutation } from '../services/cart';
import Entypo from 'react-native-vector-icons/Entypo'

const CardProduct = ({product, order}) => {

    const navigation = useNavigation();
    const localId = useSelector(state => state.user.localId)
    const [trigger] = useDeleteProductCartMutation()

    const deleteProduct = () => {
      trigger({localId, productId:product.id})
    }

  return (
      order ? (
        <View>
          <Text>Fecha: {order.date}</Text>
          <Text>Total: {order.total}</Text>
        </View>
      ):(
        <Pressable onPress={() => {
          navigation.navigate("ProductDetail", {product})
        }}>
          <View>
              <Text>{product.title}</Text>
              {
                product.quantity ? 
                  <Pressable onPress={deleteProduct}>
                    <Entypo name='trash' size={30} color='red'/>
                  </Pressable>
                : <View></View>
              }
          </View>
        </Pressable>
      )
  )
}

export default CardProduct

const styles = StyleSheet.create({})