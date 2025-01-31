import { StyleSheet } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import ImageSeclector from '../screens/ImageSeclector'
import LocationSelector from '../screens/LocationSelector'
import { colors } from '../globals/colors'

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
        <Stack.Screen name='ImageSelector' component={ImageSeclector} options={{title: 'Elegir Foto'}}/>
        <Stack.Screen name='LocationSelector' component={LocationSelector} options={{title: 'Elegir Localidad'}}/>
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})