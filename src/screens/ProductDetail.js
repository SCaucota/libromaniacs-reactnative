import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetProductCartQuery, usePostCartMutation } from '../services/cart';
import { useNavigation } from '@react-navigation/native';
import Counter from '../components/Counter';

const ProductDetail = ({ route }) => {

    const {product} = route.params;
    const localId = useSelector(state => state.user.localId);
    const [trigger] = usePostCartMutation();
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const {data:productCart} = useGetProductCartQuery({localId, productId:product.id})

    const cartQuantity = productCart ? productCart.quantity : 0;
    const sinStock = quantity + cartQuantity > product.stock

    const handleAddProduct = () => {
        const newQuantity = quantity + cartQuantity;
        const cartProduct = {
            ...product,
            quantity:newQuantity
        }
        trigger({localId, cartProduct})
        setQuantity(1);
        navigation.navigate('CartStack')
    }

    const increment = () => {
        if(sinStock) return;
        if(quantity === product.stock - cartQuantity) return
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        if(quantity === 1) return
        setQuantity(quantity - 1)
    }

    return (
        <>
            <View>
                <Text>{product.id}</Text>
                <Text>{product.title}</Text>
                <Text>{product.description}</Text>
                <Text>{product.price}</Text>
                <Text>{product.category}</Text>
                <Counter disabled={sinStock} quantity={quantity} increment={increment} decrement={decrement}/>
                <Pressable disabled={sinStock} onPress={handleAddProduct}>
                    <Text>Agregar al Carrito</Text>
                </Pressable>
            </View>
        </>
    )
}

export default ProductDetail

const styles = StyleSheet.create({})