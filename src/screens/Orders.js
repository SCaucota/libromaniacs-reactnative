import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersUserQuery } from '../services/orders';
import CardProduct from '../components/CardProduct';
import Spinner from '../components/Spinner';

const Orders = () => {

    const localId = useSelector(state => state.user.localId);
    const {data:orders, isLoading} = useGetOrdersUserQuery({localId});

    if(isLoading) return <Spinner/>
    if(!orders) return <Text>No hay ordenes</Text>

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardProduct order={item}/>}
      />
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({})