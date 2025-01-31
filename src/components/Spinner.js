import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react';
import { colors } from '../globals/colors';

const Spinner = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({})