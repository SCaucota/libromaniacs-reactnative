import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { usePostCartMutation } from '../services/cart';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = ({ route }) => {

    const {product} = route.params;
    const localId = useSelector(state => state.user.localId);
    const [trigger] = usePostCartMutation();
    const navigation = useNavigation();

    const handleAddProduct = () => {
        const cartProduct = {
            ...product,
            quantity: 1,
        }
        trigger({localId, cartProduct})
        navigation.navigate('CartStack')
    }

    return (
        <>
            <View>
                <Text>{product.title}</Text>
                <Text>{product.description}</Text>
                <Text>{product.price}</Text>
                <Text>{product.category}</Text>
                <Pressable onPress={handleAddProduct}>
                    <Text>Agregar al Carrito</Text>
                </Pressable>
            </View>
        </>
    )
}

export default ProductDetail

const styles = StyleSheet.create({})