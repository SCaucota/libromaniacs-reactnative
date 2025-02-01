import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../globals/colors'
import Entypo from 'react-native-vector-icons/Entypo'

const InputForm = ({label, value, onChangeText, isSecure, error, icon, styleAdded}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(isSecure);
  return (
    <View>
      <View style={[styles.formContainer, styleAdded]}>
        <Entypo name={icon} size={30} color={colors.primaryClear}/>
        <TextInput 
          style={[styles.input, isSecure && styles.passwordInput]} 
          placeholder={label} 
          placeholderTextColor={colors.primaryClear} 
          value={value} 
          onChangeText={onChangeText} 
          secureTextEntry={isSecure && isPasswordVisible}
        />
        {
          isSecure && (
            <Pressable style={styles.btnEye} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Entypo name={!isPasswordVisible ? 'eye-with-line' : 'eye'} size={24} color={colors.primaryClear}/>
            </Pressable>
          )
        }
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
  passwordInput:{
    width: '60%'
  },
  error:{
    color: colors.primary,
    paddingTop: 15,
    paddingLeft: 5
  },
  btnEye:{
    marginRight: 20
  }
})