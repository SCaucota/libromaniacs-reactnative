import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigation from './TabNavigation'
import React from 'react'
import AuthStack from './AuthStack'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator();

export default function Navigator() {

  const idToken = useSelector(state => state.user.idToken)

  return (
    <NavigationContainer>
      {idToken ? <TabNavigation/> : <AuthStack/>}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})