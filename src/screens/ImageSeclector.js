import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import SubmitButton from '../components/SubmitButton'
import * as ImagePicker from 'expo-image-picker'
import { usePatchImageProfileMutation } from '../services/user'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const ImageSeclector = () => {

    const localId = useSelector(state => state.user.localId)
    const [image, setImage] = useState('');
    const [trigger] = usePatchImageProfileMutation();
    const navigation = useNavigation();

    const pickImage = async (method) => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return

        const config = {
            aspect:[2,1],
            quality:0.2,
            base64:true,
            allowsEditing:true
        }

        const result = (method == 'camera') ? await ImagePicker.launchCameraAsync(config) : await ImagePicker.launchImageLibraryAsync(config)

        if(result.canceled)result
        setImage('data:image/jpg;base64,' + result.assets[0].base64)
    }

    const confirmImage = () => {
        trigger({localId, image})
        navigation.navigate('Profile')
    }

  return (
    <View>
      <View style={styles.imgContainer}>
        <Image
          source={ image ? {uri:image} : require('../../assets/profile-img-default.png')}
          resizeMethod='cover'
          style={styles.image}
        />
      </View>
      <SubmitButton title='Tomar Foto con camara' onPress={() => pickImage('camera')}/>
      <SubmitButton title='Tomar Foto de galeria' onPress={() => pickImage('')}/>
      <SubmitButton title='Confirmar' onPress={confirmImage} />
    </View>
  )
}

export default ImageSeclector

const styles = StyleSheet.create({
  imgContainer:{
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 20
  },
    image:{
        height: 150,
        width: 150,
        borderRadius: 100
    }
})