import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetCartQuery } from '../services/cart'
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-web';
import CardProduct from '../components/CardProduct';

const Cart = () => {
    const localId = useSelector(state => state.user.localId);
    const { data: cart, isLoading, isError } = useGetCartQuery({ localId });
    const [total, setTotal] = useState(0);

    useEffect(() => {
      if(cart){
        const cartProducts = Object.values(cart);
        setTotal(cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0))
      }
    })

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (isError || !cart) {
        return (
            <View>
                <Text>Error: No se pudo cargar el carrito</Text>
            </View>
        );
    }

    const cartProducts = Object.values(cart);

    console.log(cartProducts)
  return (
    <View>
      {
        cartProducts.length === 0 ?
        (
          <Text>Tu carrito está vacío</Text>
        ) : (
          <FlatList
            data={cartProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => <CardProduct product={item}/>}
          />
        )
      }

      <View>
        <Text>Total: {total}</Text>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})