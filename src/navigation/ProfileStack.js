import { StyleSheet } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import ImageSeclector from '../screens/ImageSeclector'
import LocationSelector from '../screens/LocationSelector'

const ProfileStack = () => {

    const Stack = createNativeStackNavigator();
    
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
        backgroundColor: colors.secondary,
      },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontSize: 20,
        },
      }}
    >
        <Stack.Screen name='Perfil' component={Profile}/>
        <Stack.Screen name='Elegir foto' component={ImageSeclector} />
        <Stack.Screen name='Elegir localidad' component={LocationSelector} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})