import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import TabBarIcon from '../components/TabBarIcon'
import ShopStack from './ShopStack'
import Home from '../screens/Home'
import ProfileStack from './ProfileStack'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelPosition: 'beside-icon',
            }}
        >
            <Tab.Screen 
                name="ShopStack" 
                component={ShopStack}
                options={{
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon text="Shop" icon="shop" focused={focused}/>
                    )
                }}
            />
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon text="Home" icon="home" focused={focused}/>
                    )
                }}
            />
            <Tab.Screen 
                name="ProfileStack" 
                component={ProfileStack}
                options={{
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon text="Perfil" icon="user" focused={focused}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "red",
        height: 70
    }
})

export default TabNavigation