import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../globals/colors'
import { globalStyles } from '../globals/styles'
import { useNavigation } from '@react-navigation/native'

const BooksList = ({data, title}) => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Text style={[globalStyles.subtitle, styles.title]}>{title}</Text>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => {navigation.navigate("ProductDetail", {product:item})}}
                >
                    <Image style={styles.image} source={{ uri: item.image }} />
                </Pressable>
            )}
            contentContainerStyle={styles.productsContainer} 
        />
    </View>
  )
}

export default BooksList

const styles = StyleSheet.create({
    productsContainer: {
        display: 'flex',
        gap: 10
    },
    container:{
        backgroundColor: colors.secondaryClear,
        padding: 15
    },
    image: {
        height: 150,
        width: 100
    },
    title:{
        borderBottomColor: colors.secondary,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        marginBottom: 10
    }
})