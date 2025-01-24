import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native'
import React from 'react'

const CarouselItem = ({item}) => {

    const {width} = useWindowDimensions();

  return (
    <View style={[{width}]}>
      <Image source={item.image} style={[styles.image, {width}]} resizeMode='cover' />
    </View>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
    image: {
        flex: 0.7,
        justifyContent: 'center'
    }
})