import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatPrice } from '../globals/functions'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../globals/colors'
import { globalStyles } from '../globals/styles'
import Entypo from 'react-native-vector-icons/Entypo'

const CardOrder = ({order}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.btnContainer}>
      <Pressable>
          <Text style={[globalStyles.subtitle, {color: colors.secondary}]}>{order.id}</Text>
          <Text style={styles.text}>Fecha: {order.date}</Text>
          <Text style={styles.text}>Total: ${formatPrice(order.total)}</Text>
      </Pressable>
      <Pressable 
        onPress={() => navigation.navigate('OrderDetail', {order})}
      >
        <Entypo name='magnifying-glass' size={25} color={colors.secondary}/>
      </Pressable>
    </View>
  )
}

export default CardOrder

const styles = StyleSheet.create({
  btnContainer:{
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 20,
    marginBottom: 5,
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text:{
    color: colors.secondary
  }
})