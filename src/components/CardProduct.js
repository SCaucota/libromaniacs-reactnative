import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../globals/styles';
import { formatPrice } from '../globals/functions';

const CardProduct = ({product}) => {
    const navigation = useNavigation();

  return (
      <Pressable style={styles.btn} onPress={() => {
        navigation.navigate("ProductDetail", {product})
      }}>
        <Image style={styles.img} source={{uri: product.image}}/>
        <View>
          <Text style={globalStyles.subtitle}>{product.title}</Text>
          <Text>{product.author}</Text>
          <Text style={[globalStyles.subtitle, {fontWeight: 0}]} >${formatPrice(product.price)}</Text>
        </View>
      </Pressable>
  )
}

export default CardProduct

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  img:{
    height: 150,
    width: 100
  }
})