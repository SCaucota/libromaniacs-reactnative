import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubmitButton = ({title, onPress}) => {
  return (
    <View >
      <Pressable style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>{title}</Text>
      </Pressable>
    </View>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  btn:{
    backgroundColor: 'black',
  },
  btnText:{
    color: 'white'
  }
})