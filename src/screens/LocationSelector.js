import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubmitButton from '../components/SubmitButton'
import MapPreview from '../components/MapPreview'
import * as Location from 'expo-location'
import { googleapi } from '../googleApi'
import { useSelector } from 'react-redux'
import { usePatchLocationMutation } from '../services/user'
import { useNavigation } from '@react-navigation/native'

const LocationSelector = () => {
    const navigation = useNavigation();
    const localId = useSelector(state => state.user.localId)

    const [trigger] = usePatchLocationMutation()

    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({
      lat:'',
      long:''
    });
    
    useEffect(() => {
      (async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if(status != "granted") return
            const newLocation = await Location.getCurrentPositionAsync()
            setLocation({
                lat:newLocation.coords.latitude,
                long:newLocation.coords.longitude
            })
        } catch (error) {
            console.log(error)
        }
     
       })()
    },[])

    useEffect(() => {
      (
        async () => {
          if(location.lat) {
            const urlReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=${googleapi}`
            try {
              const response = await fetch(urlReverseGeocoding)
              const data = await response.json()
              setAddress(data.results[0].formatted_address)
            } catch (error) {
              console.log(error)
            }
          }
        }
      )()
    }, [location])

    const handleConfirmLocation = () => {
      trigger({localId, address, location});
      navigation.navigate('Profile');
    }

  return (
    <View>
      <Text>Dirección: {address}</Text>
      <MapPreview location={location}/>
      <SubmitButton title='Confirmar Ubicación' onPress={handleConfirmLocation} />
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({})