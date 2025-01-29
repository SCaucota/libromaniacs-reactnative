import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { usePostCartMutation } from '../services/cart';
import { useNavigation } from '@react-navigation/native';
import Counter from '../components/Counter';

const ProductDetail = ({ route }) => {

    const {product} = route.params;
    const localId = useSelector(state => state.user.localId);
    const [trigger] = usePostCartMutation();
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);

    const handleAddProduct = () => {
        const cartProduct = {
            ...product,
            quantity
        }
        trigger({localId, cartProduct})
        navigation.navigate('CartStack')
    }

    const increment = () => {
        if(quantity === product.stock) return
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
                <Counter quantity={quantity} increment={increment} decrement={decrement}/>
                <Pressable onPress={handleAddProduct}>
                    <Text>Agregar al Carrito</Text>
                </Pressable>
            </View>
        </>
    )
}

export default ProductDetail

const styles = StyleSheet.create({})