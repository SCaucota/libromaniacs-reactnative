import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../globals/colors';

const TabBarIcon = ({text, icon}) => {
  return (
    <View style={styles.container}>
      <Entypo name={icon} size={25} color={colors.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({
    container: {
        width: 60,
        alignItems: 'center',
        gap: 5
    },
    text: {
        color: colors.primary
    }
})