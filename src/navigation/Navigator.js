import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigation from './TabNavigation'
import React, { useEffect } from 'react'
import AuthStack from './AuthStack'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSession, init } from '../config/dbSQL'
import { deleteUser, setUser } from '../features/userSlice'

const Tab = createBottomTabNavigator();

export default function Navigator() {

  const idToken = useSelector(state => state.user.idToken)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await init()
        dispatch(deleteUser());
        const sessionUser = await fetchSession()
        console.log(sessionUser)
        if(sessionUser){
          dispatch(setUser(sessionUser))
        }
      } catch (error) {
        console.log(error)
      }
    }
    )()
  }, [])

  return (
    <NavigationContainer>
      {idToken ? <TabNavigation/> : <AuthStack/>}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})