import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductDetail = ({ route }) => {

    const {product} = route.params;

    return (
        <>
            <View>
                <Text>{product.title}</Text>
                <Text>{product.description}</Text>
                <Text>{product.price}</Text>
                <Text>{product.category}</Text>
            </View>
        </>
    )
}

export default ProductDetail

const styles = StyleSheet.create({})