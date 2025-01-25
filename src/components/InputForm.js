import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const InputForm = ({label, value, onChangeText, isSecure, error}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput vlue={value} onChangeText={onChangeText} secureTextEntry={isSecure}/>
      {
        error ? <View><Text>{error}</Text></View> : null
      }
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({})