import { StyleSheet, Text, View, FlatList, Pressable  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDeleteCartMutation, useGetCartQuery } from '../services/cart'
import { useSelector } from 'react-redux'; 
import Spinner from '../components/Spinner';
import { usePostOrdersMutation } from '../services/orders';
import { useNavigation } from '@react-navigation/native';
import { usePatchQuantityProductMutation } from '../services/shop';
import CardProductCart from '../components/CardProductCart';
import { colors } from '../globals/colors';
import { formatPrice } from '../globals/functions';
import { globalStyles } from '../globals/styles';
import Message from '../components/Message';

const Cart = () => {
    const navigation = useNavigation();
    const localId = useSelector(state => state.user.localId);
    const { data: cart, isLoading } = useGetCartQuery({ localId });
    const [total, setTotal] = useState(0);
    const [triggerPostOrder] = usePostOrdersMutation()
    const [triggerDeleteCart] = useDeleteCartMutation();
    const [triggerChangeQuantityProduct] = usePatchQuantityProductMutation()
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
      if(cart){
        const productsArray = Object.values(cart).filter(item => item !== null);
        setCartProducts(productsArray);
        const calculatedTotal = productsArray.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(calculatedTotal);
      }
    }, [cart])

    if (isLoading) {
        return (
            <View style={globalStyles.centerComponent}><Spinner/></View>
        );
    }

    if(!cart) return <Message message={'Tu carrito está vacío'}/>

    const completePurchase = async() => {
      const date = new Date().toLocaleString();
      const order = {
        products:cartProducts,
        date,
        total
      }
      triggerPostOrder({order, localId});
      
      const updates = cartProducts.reduce((acc, product) => {
        const { quantity, ...productWithoutQuantity } = product;
        acc[product.id] = {
          ...productWithoutQuantity,
          stock: product.stock - quantity};
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
    alignItems: 'center',
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