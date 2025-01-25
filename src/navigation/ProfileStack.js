import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import ImageSeclector from '../screens/ImageSeclector'

const ProfileStack = () => {

    const Stack = createNativeStackNavigator();
    
  return (
    <Stack.Navigator>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='ImageSelector' component={ImageSeclector} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})