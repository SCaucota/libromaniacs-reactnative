import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigation from './TabNavigation'
import React from 'react'

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})