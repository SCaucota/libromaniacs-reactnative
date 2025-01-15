import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CardCategory = ({category}) => {
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => {
        navigation.navigate("ProductsByCategory", {category})
    }}>
        <View>
            <Text>{category}</Text>
        </View>
    </Pressable>
  )
}

export default CardCategory

const styles = StyleSheet.create({})