import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDeleteProductCartMutation } from '../services/cart';
import Entypo from 'react-native-vector-icons/Entypo';
import { Pressable } from 'react-native';
import { formatPrice } from '../globals/functions';
import { globalStyles } from '../globals/styles';
import { colors } from '../globals/colors';
import { useNavigation } from '@react-navigation/native';

const CardProductCart = ({cartProduct}) => {
    const localId = useSelector(state => state.user.localId)
    const [trigger] = useDeleteProductCartMutation();
    const navigation = useNavigation()

    const deleteProduct = () => {
        trigger({localId, productId:cartProduct.id})
    }

    const totalPriceXproduct = cartProduct.price * cartProduct.quantity;

  return (
    <View style={styles.container}>
        <Image style={styles.img} source={{uri: cartProduct.image}}/>
        <View style={styles.dataContainer}>
            <Text numberOfLines={5} style={[globalStyles.subtitle, {flexWrap: 'wrap', marginBottom: 0}]}>{cartProduct.title}</Text>
            <Text style={styles.priceSingle}>${formatPrice(cartProduct.price)} c/u</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>${formatPrice(totalPriceXproduct)}</Text>
            {cartProduct.quantity && <Text>Cantidad: {cartProduct.quantity}</Text>}
        </View>
        {
            cartProduct.quantity ?
                <Pressable style={styles.btn} onPress={deleteProduct}>
                    <Entypo name='trash' size={25} color={colors.secondary}/>
                </Pressable>
            : null
        }
    </View>
  )
}

export default CardProductCart

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.secondary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        margin: 10,
    },
    dataContainer:{
        width: '50%',
        display: 'flex',
        gap: 10
    },
    img:{
        height: 120,
        width: 80,
    },
    priceSingle:{
        color: 'white'
    },
    btn: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        padding: 10
    }
})