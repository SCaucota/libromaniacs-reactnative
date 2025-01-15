import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native'
import React from 'react'
/* import Carousel from 'react-native-snap-carousel'; */

const CarouselProducts = ({ products }) => {

    /* const { width } = Dimensions.get('window'); */

    /* const renderItem = () => {
        <View>
          <Image source={{ uri: item.image }} style={{ width, height: 200 }} />
          <Text>{item.title}</Text>
        </View>
    } */

    return (
        <FlatList
            data={products}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Text>{item.title}</Text>
            )}
        />
    )
}

export default CarouselProducts

const styles = StyleSheet.create({})