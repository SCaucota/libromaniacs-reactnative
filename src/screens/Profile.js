import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import SubmitButton from '../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserQuery } from '../services/user'
import AntDesign from '@expo/vector-icons/AntDesign';
import { deleteSession } from '../config/dbSQL'
import { deleteUser } from '../features/userSlice'

const Profile = () => {

    const navigation = useNavigation();
    const localId = useSelector(state => state.user.localId);
    const {data:user} = useGetUserQuery({localId})
    const dispatch = useDispatch()

    const onLogout = () => {
        deleteSession()
        dispatch(deleteUser())
    }

  return (
    <View>
        <View style={styles.logOut}>
            <Pressable style={styles.btnLogOut} onPress={onLogout}>
                <AntDesign name='logout' size={24} color='black'/>
                <Text>Cerrar Sesión</Text>
            </Pressable>
        </View>
        <View style={styles.imageAddressContainer}>
            <Image
                source={user?.image ? {uri:user.image} : require('../../assets/profile-img-default.png')}
                resizeMode='cover'
                style={styles.image}
            />
            {
                user?.address ?
                <View>
                    <Text>{user.address}</Text>
                </View>
                : <View></View>
            }
        </View>
        <SubmitButton title={'Agregar imagen de perfil'} onPress={() => navigation.navigate('ImageSelector')}/>
        <SubmitButton title={'Agregar la localización'} onPress={() => navigation.navigate('LocationSelector')}/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    logOut:{
        padding: 20,
        display: 'flex',
        alignItems: 'flex-start'
    },
    btnLogOut:{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    imageAddressContainer:{
        display: 'flex',
        alignItems: 'center',
        gap: 25,
        marginBottom: 25
    },
    image:{
        width: 150,
        height: 150,
        borderRadius: 100
    }
})