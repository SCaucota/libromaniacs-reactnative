import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CardProduct = ({product}) => {

    const navigation = useNavigation();

  return (
    <Pressable onPress={() => {
        navigation.navigate("ProductDetail", {product})
    }}>
        <View>
            <Text>{product.title}</Text>
        </View>
    </Pressable>
  )
}

export default CardProduct

const styles = StyleSheet.create({})