import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetProductCartQuery, usePostCartMutation } from '../services/cart';
import { useNavigation } from '@react-navigation/native';
import Counter from '../components/Counter';
import { formatPrice } from '../globals/functions';
import { globalStyles } from '../globals/styles';
import Label from '../components/Label';
import SubmitButton from '../components/SubmitButton';

const ProductDetail = ({ route }) => {

    const {product} = route.params;
    const localId = useSelector(state => state.user.localId);
    const [trigger] = usePostCartMutation();
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const {data:productCart} = useGetProductCartQuery({localId, productId:product.id})

    const cartQuantity = productCart ? productCart.quantity : 0;
    const sinStock = quantity + cartQuantity > product.stock

    const handleAddProduct = () => {
        const newQuantity = quantity + cartQuantity;
        const cartProduct = {
            ...product,
            quantity:newQuantity
        }
        trigger({localId, cartProduct})
        setQuantity(1);
        navigation.navigate('CartStack')
    }

    const increment = () => {
        if(sinStock) return;
        if(quantity === product.stock - cartQuantity) return
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        if(quantity === 1) return
        setQuantity(quantity - 1)
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imgData}>
                        <Image style={styles.img} source={{uri: product.image}}/>
                        <View style={styles.dataContainer}>
                            <Text numberOfLines={5} style={[globalStyles.subtitle, {flexWrap: 'wrap', fontSize: 25}]}>{product.title}</Text>
                            <Label text={product.category}/>
                            <Label text={product.author}/>
                            <Label text={product.season}/>
                            {
                                product.saga ? <Text>{product.saga}</Text> : null
                            }
                        </View>
                    </View>
                    <Text>{product.description}</Text>
                    <Text style={[globalStyles.subtitle, {fontSize: 23}]}>${formatPrice(product.price)}</Text>
                    <Counter disabled={sinStock} quantity={quantity} increment={increment} decrement={decrement}/>
                    <SubmitButton style={{marginBottom: 50}} title='Agregar al Carrito' onPress={handleAddProduct} disabled={sinStock}/>
                </View>
            </ScrollView>
        </>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    dataContainer:{
        width: '50%',
        gap: 20
    },
    img:{
        height: 230,
        width: 150,
        borderRadius: 15
    },
    imgData: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 30
    },
})