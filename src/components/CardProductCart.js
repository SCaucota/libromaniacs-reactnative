import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDeleteProductCartMutation } from '../services/cart';
import Entypo from 'react-native-vector-icons/Entypo';
import { Pressable } from 'react-native';

const CardProductCart = ({cartProduct}) => {
    const localId = useSelector(state => state.user.localId)
    const [trigger] = useDeleteProductCartMutation()

    const deleteProduct = () => {
        trigger({localId, productId:cartProduct.id})
      }
  return (
    <View>
        <Text>{cartProduct.title}</Text>
        {cartProduct.quantity && <Text>Cantidad: {cartProduct.quantity}</Text>}
        {
            cartProduct.quantity ? 
                <Pressable onPress={deleteProduct}>
                    <Entypo name='trash' size={30} color='red'/>
                </Pressable>
            : null
        }
    </View>
  )
}

export default CardProductCart

const styles = StyleSheet.create({})