import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersUserQuery } from '../services/orders';
import Spinner from '../components/Spinner';
import CardOrder from '../components/CardOrder';
import Message from '../components/Message';

const Orders = () => {

    const localId = useSelector(state => state.user.localId);
    const {data:orders, isLoading} = useGetOrdersUserQuery({localId});

    if(isLoading) return <Spinner/>
    if(!orders) return <Message message='No haz hecho ordenes'/>

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardOrder order={item}/>}
      />
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({
  container:{
    marginVertical: 15
  }
})