import { StyleSheet } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import ImageSeclector from '../screens/ImageSeclector'
import LocationSelector from '../screens/LocationSelector'

const ProfileStack = () => {

    const Stack = createNativeStackNavigator();
    
  return (
    <Stack.Navigator>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='ImageSelector' component={ImageSeclector} />
        <Stack.Screen name='LocationSelector' component={LocationSelector} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})