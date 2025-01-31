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
import CardProductCart from '../components/CardProductCart';
import { colors } from '../globals/colors';
import { formatPrice } from '../globals/functions';
import { globalStyles } from '../globals/styles';
import EmptyMessage from '../components/EmptyMessage';

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

    if(!cart) return <EmptyMessage message={'Tu carrito está vacío'}/>

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
    <View style={styles.container}>
      <FlatList
        data={cartProducts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardProductCart cartProduct={item}/>}
        contentContainerStyle={styles.listContent}
      />
      <Pressable style={styles.btnEmpty} onPress={clearCart}>
          <Text style={styles.btnEmptyText}>Vaciar carrito</Text>
        </Pressable>
      <View style={styles.totalContainer}>
        <Text style={styles.total} >Total: ${formatPrice(total)}</Text>
        <Pressable style={styles.btnPurchase} onPress={completePurchase}>
          <Text style={styles.btnPurchaseText}>Finalizar compra</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  totalContainer:{
    backgroundColor: colors.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center'
  },
  total:{
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 18
  },
  btnPurchase:{
    backgroundColor: colors.primaryClear,
    padding: 15,
    borderRadius: 10,
  },
  btnPurchaseText:{
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15
  },
  btnEmpty:{
    backgroundColor: colors.primaryClear,
    position: 'absolute',
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 10,
    bottom: 95,
    right: 10
  },
  btnEmptyText:{
    color: colors.secondary,
    fontSize: 15,
  },
  listContent:{
    paddingBottom: 150,
    marginBottom: 20,
  }
})