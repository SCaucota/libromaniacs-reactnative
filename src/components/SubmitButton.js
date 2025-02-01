import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { colors } from '../globals/colors';

const SubmitButton = ({title, onPress, disabled}) => {
  return (
    <View style={styles.btnContainer} >
      <Pressable style={[styles.btn, disabled && styles.btnDisabled]} onPress={onPress} disabled={disabled}>
        <Text style={styles.btnText}>{title}</Text>
      </Pressable>
    </View>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn:{
    backgroundColor: colors.primary,
    padding: 10,
    width: '60%',
    borderRadius: 10,
    marginTop: 10,
  },
  btnText:{
    color: colors.secondary,
    fontSize: 20,
    textAlign: 'center'
  },
  btnDisabled: {
    backgroundColor: colors.primaryClear,
    opacity: 0.5
  }
})