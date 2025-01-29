import { StyleSheet, Text, View, FlatList, Pressable  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDeleteCartMutation, useGetCartQuery } from '../services/cart'
import { useSelector } from 'react-redux'; 
import CardProduct from '../components/CardProduct';
import Spinner from '../components/Spinner';
import { usePostOrdersMutation } from '../services/orders';
import { useNavigation } from '@react-navigation/native';
import { usePatchQuantityProductMutation } from '../services/shop';
import ProductDetail from './ProductDetail';

const Cart = () => {
    const navigation = useNavigation();
    const localId = useSelector(state => state.user.localId);
    const { data: cart, isLoading, isError } = useGetCartQuery({ localId });
    const [total, setTotal] = useState(0);
    const [triggerPostOrder] = usePostOrdersMutation()
    const [triggerDeleteCart] = useDeleteCartMutation();
    const [triggerChangeQuantityProduct] = usePatchQuantityProductMutation()

    useEffect(() => {
      if(cart){
        const cartProducts = Object.values(cart);
        setTotal(cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0))
      }
    }, [cart])

    if (isLoading) {
        return (
            <Spinner/>
        );
    }

    if(!cart) return <Text>Tu carrito está vacío</Text>

    const cartProducts = Object.values(cart);

    const completePurchase = async() => {
      const date = new Date().toLocaleString();
      const order = {
        products:cart,
        date,
        total
      }
      triggerPostOrder({order, localId});
      
      const updates = cartProducts.reduce((acc, product) => {
        acc[product.id] = {
          ...product,
          stock: product.stock - product.quantity};
        return acc;
      }, {});

      console.log(updates)

      await Promise.all(
        Object.keys(updates).map((productId) => {
          triggerChangeQuantityProduct({
            productId,
            productData: updates[productId]
          })
        })
      )

      triggerDeleteCart({localId})
      navigation.navigate('OrdersStack')
    }

    const clearCart = () => {
      triggerDeleteCart({localId})
    }

  return (
    <View>
      <FlatList
        data={cartProducts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardProduct product={item}/>}
      />
      <View>
        <Text>Total: {total}</Text>
        <Pressable onPress={completePurchase}>
          <Text>Finalizar compra</Text>
        </Pressable>
        <Pressable onPress={clearCart}>
          <Text>Vaciar carrito</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})