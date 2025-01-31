import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import TabBarIcon from '../components/TabBarIcon'
import ShopStack from './ShopStack'
import Home from '../screens/Home'
import ProfileStack from './ProfileStack'
import CartStack from './CartStack'
import OrdersStack from './OrdersStack';
import { colors } from '../globals/colors'

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
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon text="Inicio" icon="home" focused={focused}/>
                    )
                }}
            />
            <Tab.Screen 
                name="ShopStack" 
                component={ShopStack}
                options={{
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon text="Buscar" icon="magnifying-glass" focused={focused}/>
                    )
                }}
            />
            <Tab.Screen 
                name="CartStack" 
                component={CartStack}
                options={{
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon text="Carrito" icon="shopping-bag" focused={focused}/>
                    )
                }}
            />
            <Tab.Screen 
                name="OrdersStack" 
                component={OrdersStack}
                options={{
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon text="Ordenes" icon="list" focused={focused}/>
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
        backgroundColor: colors.secondary,
        height: 70
    }
})

export default TabNavigation