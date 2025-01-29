import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Spinner = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({})