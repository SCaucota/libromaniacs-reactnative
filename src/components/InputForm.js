import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { globalStyles } from '../globals/styles'
import { colors } from '../globals/colors'
import Entypo from 'react-native-vector-icons/Entypo'

const InputForm = ({label, value, onChangeText, isSecure, error, icon, styleAdded}) => {
  return (
    <View>
      <View style={[styles.formContainer, styleAdded]}>
        <Entypo name={icon} size={30} color={colors.primaryClear}/>
        <TextInput style={styles.input} placeholder={label} placeholderTextColor={colors.primaryClear} vlue={value} onChangeText={onChangeText} secureTextEntry={isSecure}/>
      </View>
      {
        error ? <View><Text style={styles.error}>{error}</Text></View> : null
      }
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
  formContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.secondaryClear,
    borderRadius: 10,
    paddingVertical: 5,
    width: '90%',
    gap: 10
  },
  input:{
    fontSize: 20,
    display: 'flex',
    gap: 10,
    width: '80%'
  },
  error:{
    color: colors.primary,
    paddingTop: 15,
    paddingLeft: 5
  }
})