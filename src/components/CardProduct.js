import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../globals/styles';

const CardProduct = ({product}) => {
    const navigation = useNavigation();

    const formatPrice = (price) => {
      return new Intl.NumberFormat('es-ES').format(price);
    }

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